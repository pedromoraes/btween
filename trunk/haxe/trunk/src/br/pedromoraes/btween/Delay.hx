package br.pedromoraes.btween;

import flash.display.Sprite;
import flash.events.Event;
import flash.Lib;

class Delay extends Sequenceable, implements ISequenceable
{

	public static var sprite:Sprite = new Sprite();

	public static function call( ?time:Int = 0, callee:Dynamic, ?args:Dynamic ) : ISequenceable {
		var delay : ISequenceable = new Delay( time ).start();
		var arr : Array<Dynamic> = [ callee ];
		if ( args != null )
		{
			arr = arr.concat( Std.is( args, Array ) ? [ args ] : [ [ args ] ] );
		}
		Reflect.callMethod( delay, delay.queue, arr );
		return delay;
	}

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
		sprite.addEventListener(Event.ENTER_FRAME, onEnterFrame);
		dispatchEvent(new BTweenEvent(BTweenEvent.START));
		return this;
	}
	
	public override function stop():ISequenceable
	{
		sprite.removeEventListener(Event.ENTER_FRAME, onEnterFrame);
		return this;
	}
	
	private function onEnterFrame(?evt) : Void
	{
		if (Lib.getTimer() - startTime >= time)
		{
			stop();
			dispatchEvent(new BTweenEvent(BTweenEvent.COMPLETE));
		}
	}
}