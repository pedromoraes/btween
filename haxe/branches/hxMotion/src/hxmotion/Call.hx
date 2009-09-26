package hxmotion;
import hxmotion.events.BTweenEvent;

class Call extends Sequenceable, implements ISequenceable
{

	public var method : Dynamic;
	public var params : Array<Dynamic>;

	public function new( method : Dynamic, ?params : Array<Dynamic> ) : Void {
		this.method = method;
		if ( params != null ) this.params = params;
		super();
	}

	public override function start( ?params : Dynamic ) : ISequenceable {
		if ( Std.is( params, BTweenEvent ) ) {
			var caller : ISequenceable = cast( cast( params, BTweenEvent ).target, ISequenceable );
			caller.removeEventListener( BTweenEvent.STOP, cast start );
		}
		var result:Dynamic = Reflect.callMethod(this, method, this.params);
		if ( Std.is( result, ISequenceable ) ) {
			var nextStep:ISequenceable = cast( result, ISequenceable );
			//nextStep.addEventListener(BTweenEvent.COMPLETE, onCalleeComplete);
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