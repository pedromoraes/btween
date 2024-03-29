﻿package hxmotion;
import hxmotion.events.BTweenEvent;

class Call extends Sequenceable, implements ISequenceable
{

	public var method : Dynamic;
	public var params : Array<Dynamic>;

	public function new( method : Dynamic, ?params : Array<Dynamic> ) : Void {
		this.method = method;
		this.params = params == null ? [] : params;
		super();
	}

	public override function start( ?params : Dynamic ) : ISequenceable {
		if ( params != null && Std.is( params, BTweenEvent ) ) {
			var caller : ISequenceable = cast( cast( params, BTweenEvent ).target, ISequenceable );
			caller.removeEventListener( BTweenEvent.STOP, cast start );
		}
		
		var result : Dynamic = null;
		result = Reflect.callMethod(this, this.method, this.params);
		
		if ( result != null && Std.is( result, ISequenceable ) ) {
			var nextStep:ISequenceable = cast( result, ISequenceable );
			nextStep.addEventListener(BTweenEvent.STOP, onCalleeComplete);
			return nextStep;
		} else {
			dispatchEvent ( new BTweenEvent ( BTweenEvent.STOP ) );
			return this;
		}
	}
	
	private function onCalleeComplete( evt : BTweenEvent ) : Void {
		dispatchEvent( new BTweenEvent( BTweenEvent.STOP ) );
	}
}