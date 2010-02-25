package hxmotion;

import hxmotion.Types;
import haxe.Timer;
import hxmotion.events.BTweenEvent;

class Delay extends Sequenceable, implements ISequenceable {
	
	public static function call( ?time:Int = 0, callee:Dynamic, ?args:Dynamic ) : ISequenceable {
		var delay : ISequenceable = new Delay( time ).start();
		var arr : Array<Dynamic> = [ callee ];
		if ( args != null )
			arr = arr.concat( Std.is( args, Array ) ? [ args ] : [ [ args ] ] );
		Reflect.callMethod( delay, delay.queue, arr );
		return delay;
	}

	public var timer : Timer;
	private var time:Int;
	private var startTime:Int;

	public function new(?time:Int = 0) : Void
	{
		this.time = time;
		super();
	}

	public override function start(?params:Dynamic):ISequenceable
	{
		startTime = Std.int(Lib.getTimer());
		if ( timer == null ) timer = new Timer( time );
		timer.run = onRun;
		dispatchEvent( new BTweenEvent( BTweenEvent.START ) );
		return this;
	}
	
	public override function stop( ?premature : Bool = false ):ISequenceable
	{
		timer.stop();
		return this;
	}
	
	private function onRun() : Void
	{
		stop();
		dispatchEvent( new BTweenEvent( BTweenEvent.STOP ) );
	}
}