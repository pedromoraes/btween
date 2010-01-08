package hxmotion;

import flash.events.EventDispatcher;
import flash.events.IEventDispatcher;
import hxmotion.events.BTweenEvent;

class Sequenceable extends EventDispatcher, implements ISequenceable, implements IEventDispatcher {

	public var previous : ISequenceable;
	public var next : ISequenceable;
	public var dontRecycle : Bool;
		
	//
	//public function previous() : ISequenceable {
		//return this;
	//}
//
	//public function next() : ISequenceable {
		//return this;
	//}
	
	public function start(?params:Dynamic):ISequenceable
	{
		return null;
	}

	public function update( listener : Dynamic ) : ISequenceable {
		return this;
	}

	public function change(params:Dynamic):ISequenceable {
		var fields : Array<String> = Reflect.fields( params );
		for ( field in fields ) {
			Reflect.setField( this, field, Reflect.field( params, field ) );
		}
		return this;
	}

	public function back(trans:Dynamic = null):ISequenceable {
		return null;
	}

	public function stop( ?premature : Bool = false ) : ISequenceable {
		return null;
	}

	public function queue( ?obj : Dynamic = null, ?params : Dynamic ) : ISequenceable {
		var seq : ISequenceable;
		if ( Std.is( obj, ISequenceable ) ) {
			seq = obj;
			addEventListener( BTweenEvent.STOP, cast seq.start );
		} else if ( Reflect.isFunction( obj ) ) {
			if ( Std.is( params, Array ) )
			{
				seq = new Call( obj, params );
			}
			else if ( params != null )
			{
				seq = new Call( obj, [ params ] );
			}
			else
			{
				seq = new Call( obj );
			}
			addEventListener( BTweenEvent.STOP, cast seq.start );
		} else if ( Std.is( obj, Int ) ) {
			seq = new Delay( obj );
			addEventListener( BTweenEvent.STOP, cast seq.start );
		} else {
			seq = new BTween( obj );
			addEventListener( BTweenEvent.STOP, cast seq.start );
		}
		seq.previous = this;
		if ( next == null ) next = seq;
		return seq;
	}

	public function chain() : Chain {
		var ref : ISequenceable = this;
		var chain : Chain = new Chain();
		chain.push( ref );
		while ( ( ref = ref.previous ) != null )
		{
			chain.push( ref );
		}
		return chain;
	}

	public function hold() : ISequenceable {
		var ref : ISequenceable = this;
		while ( ( ref = ref.previous ) != null )
		{
			ref.dontRecycle = true;
		}
		return this;
	}
	
	#if flash9
	override public function toString() : String
	#else
	public function toString() : String
	#end
	{
		return 'Object Sequenceable';
	}
}
