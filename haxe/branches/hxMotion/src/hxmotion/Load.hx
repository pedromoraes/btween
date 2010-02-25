package hxmotion;
import hxmotion.events.BTweenEvent;
import hxmotion.events.LoadEvent;
import flash.events.EventDispatcher;
import flash.net.URLLoader;
import flash.display.Loader;
import flash.events.Event;
import flash.events.IOErrorEvent;
import flash.events.ProgressEvent;
import flash.events.SecurityErrorEvent;
import flash.net.URLRequest;
import flash.system.LoaderContext;

enum LoadType {
	TYPE_XML;
	TYPE_BITMAP;
	TYPE_SWF;
	TYPE_SOUND;
	TYPE_NETSTREAM;
	TYPE_UNKNOWN_BINARY;
	TYPE_UNKNOWN_TEXT;
}

class Load extends Sequenceable {
	public static function batch( jobs : Dynamic, ?basePath : String, ?context : LoaderContext ) : Load {
		var l : Load = new Load();
		if ( basePath != null ) l.basePath = basePath;
		var list : Array<String> = Std.is( jobs, Array ) ? jobs : [ jobs ];
		for ( job in list )
		{
			context == null ? l.add( job ) : l.add( job, context );
		}
		l.start();
		return l;
	}

	public var stack : Hash<ALoader>;
	public var log : Dynamic;
	public var basePath : String;
	public var maxConnections : Int;
	public var noCache : Bool;
	public var onComplete : Dynamic;
	
	public var progress( getProgress, null ) : Float;
	
	private var activeConnections : Int;

	public function new( ?maxConnections : Int = 2, ?noCache : Bool = false )  {
		super();
		this.maxConnections = maxConnections;
		this.noCache = noCache;
		this.activeConnections = 0;
		this.stack = new Hash<ALoader>();
	}
	
	function getSortedJobs() : Array<ALoader> {
		var sorted : Array<ALoader> = new Array();
		for ( job in stack )
		{
			if ( job.started ) continue;
			for ( i in 0 ... sorted.length )
			{
				if ( sorted[ i ].priority < job.priority )
				{
					sorted.insert( i, job );
					job = null;
					break;
				}
			}
			if ( job != null ) sorted.push( job );
			
		}
		return sorted;
	}

	function getProgress() : Float {
		var progress : Float = 0;
		var count : Int = 0;
		for ( job in stack )
		{
			progress += job.progress;
			count ++;
		}
		return progress / count;
	}
	
	public override function start( ?params : Dynamic ) : ISequenceable {
		var jobs : Array<ALoader> = getSortedJobs();
		if ( progress == 0 )
		{
			dispatchEvent( new LoadEvent( LoadEvent.START ) );
		}

		if ( jobs.length > 0 )
		{

			for ( conn in activeConnections ... maxConnections )
			{
				if ( conn == jobs.length ) break;
				var loader : ALoader = jobs[ conn ];
				loader.addEventListener( LoadEvent.COMPLETE, onJobComplete );
				loader.addEventListener( LoadEvent.PROGRESS, onJobProgress );
				loader.start();
				activeConnections ++;
			}
			
		}
		return this;
	}
	
	private function onJobError( event : LoadEvent ) : Void {
		dispatchEvent( event );
	}

	private function onJobProgress( event : LoadEvent ) : Void {
		dispatchEvent( new LoadEvent( LoadEvent.PROGRESS, false, false, progress ) );
	}
	
	private function onJobComplete( event : LoadEvent ) : Void {
		activeConnections --;
		start();
		if ( activeConnections == 0 )
		{
			dispatchEvent( new LoadEvent( LoadEvent.COMPLETE, false, false, progress ) );
			dispatchEvent( new BTweenEvent( BTweenEvent.STOP ) );
		}
	}
	
	public override function update( listener : Dynamic ) : ISequenceable {
		addEventListener( LoadEvent.PROGRESS, listener );
		return this;
	}
	
	public override function stop( ?premature : Bool = false ) : ISequenceable {
		for ( job in stack )
		{
			if ( job.started && job.progress < 1 ) job.cancel();
		}
		return this;
	}
	
	public function add( path : String, ?type : LoadType, ?key : String, ?priority : Int, ?context : LoaderContext ) : ALoader {
		if ( basePath != null && path.indexOf( 'http' ) != 0 ) path = basePath + path;
		return addReq( new URLRequest( path ), type, key, priority, context );
	}
	
	public function addReq( req : URLRequest, ?type : LoadType, ?key : String, ?priority : Int = 0, ?context : LoaderContext ) : ALoader {
		var loader : ALoader;
		if ( type == null ) type = inferType( req.url );
		if ( key == null ) key = pickKey( req.url );
		switch ( type )
		{
			case TYPE_SWF:
				loader = new DisplayObjectLoader( type, req, context );
			case TYPE_BITMAP:
				loader = new DisplayObjectLoader( type, req, context );
			case TYPE_XML:
				loader = new TextLoader( type, req );
			default:
				loader = new TextLoader( type, req );
		}

		loader.priority = priority;
		stack.set( key, loader );

		loader.addEventListener( LoadEvent.ERROR, onJobError );
		
		return loader;
	}

	public function pickKey( path : String ) : String {
		return path.split( '/' ).pop().split( '.' ).shift();
	}
	
	public function inferType( path : String ) : LoadType {
		var ext : String = Std.string( path.split( '.' ).pop() ).toLowerCase();
		switch ( ext )
		{
			case "jpg":	return LoadType.TYPE_BITMAP;
			case "jpeg": return LoadType.TYPE_BITMAP;
			case "png": return LoadType.TYPE_BITMAP;
			case "gif": return LoadType.TYPE_BITMAP;
			case "swf": return LoadType.TYPE_SWF;
			case "flv": return LoadType.TYPE_NETSTREAM;
			case "mp3": return LoadType.TYPE_SOUND;
			case "txt": return LoadType.TYPE_XML;
			default: return LoadType.TYPE_UNKNOWN_TEXT;
		}
	}
}

class ALoader extends EventDispatcher {
	public var started : Bool;
	public var type : LoadType;
	public var progress : Float;
	public var priority : Int;
	public var data : Dynamic;

	public function onError( event : Event ) : Void {
		dispatchEvent( new LoadEvent( LoadEvent.ERROR ) );
		clear();
	}

	public function onProgress( event : ProgressEvent ) : Void {
		progress = event.bytesLoaded / event.bytesTotal;
		dispatchEvent( new LoadEvent( LoadEvent.PROGRESS, false, false, progress ) );
	}
	
	public function cancel() : Void {
	}
	
	public function start() : Void {
	}

	public function clear() : Void {
	}
}

class TextLoader extends ALoader
{
	var loader : URLLoader;
	var req : URLRequest;

	public function new( type : LoadType, req : URLRequest ) : Void {
		super();
		this.type = type;
		this.req = req;
		this.loader = new URLLoader();
		this.progress = 0;
	}

	override public function start() : Void {
		loader.addEventListener( IOErrorEvent.IO_ERROR, onError );
		loader.addEventListener( SecurityErrorEvent.SECURITY_ERROR, onError );
		loader.addEventListener( ProgressEvent.PROGRESS, onProgress );
		loader.addEventListener( Event.COMPLETE, onComplete );
		loader.load( req );
		started = true;
	}
	
	override public function cancel() : Void {
		loader.close();
	}

	override public function clear() : Void {
		loader.removeEventListener( IOErrorEvent.IO_ERROR, onError );
		loader.removeEventListener( SecurityErrorEvent.SECURITY_ERROR, onError );
		loader.removeEventListener( ProgressEvent.PROGRESS, onProgress );
		loader.removeEventListener( Event.COMPLETE, onComplete );
	}

	public function onComplete( event : Event ) : Void {
		data = loader.data;
		progress = 1;
		dispatchEvent( new LoadEvent( LoadEvent.COMPLETE ) );
	}
}

class DisplayObjectLoader extends ALoader
{
	var loader : Loader;
	var req : URLRequest;
	var ctx : LoaderContext;

	public function new( type : LoadType, req : URLRequest, ?ctx : LoaderContext ) : Void {
		super();
		this.type = type;
		this.req = req;
		this.ctx = ctx;
		this.loader = new Loader();
		this.progress = 0;
	}

	override public function start() : Void {
		loader.contentLoaderInfo.addEventListener( IOErrorEvent.IO_ERROR, onError );
		loader.contentLoaderInfo.addEventListener( SecurityErrorEvent.SECURITY_ERROR, onError );
		loader.contentLoaderInfo.addEventListener( ProgressEvent.PROGRESS, onProgress );
		loader.contentLoaderInfo.addEventListener( Event.COMPLETE, onComplete );
		ctx == null ? loader.load( req ) : loader.load( req, ctx );
		started = true;
	}
	
	override public function cancel() : Void {
		loader.close();
		clear();
	}

	override public function clear() : Void {
		loader.contentLoaderInfo.removeEventListener( IOErrorEvent.IO_ERROR, onError );
		loader.contentLoaderInfo.removeEventListener( SecurityErrorEvent.SECURITY_ERROR, onError );
		loader.contentLoaderInfo.removeEventListener( ProgressEvent.PROGRESS, onProgress );
		loader.contentLoaderInfo.removeEventListener( Event.COMPLETE, onComplete );
	}

	public function onComplete( event : Event ) : Void {
		data = loader.contentLoaderInfo.content;
		progress = 1;
		dispatchEvent( new LoadEvent( LoadEvent.COMPLETE ) );
		clear();
	}
}