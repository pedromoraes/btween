package hxmotion.events;

#if flash9
import flash.events.Event;
#else
import neash.events.Event;
#end

class LoadEvent extends Event {
	
	public static inline var COMPLETE : String = "complete";
	public static inline var ERROR : String = "error";
	public static inline var PROGRESS : String = "progress";
	public static inline var START : String = "start";
	public var progress : Float;

	public function new( type : String, ?bubbles : Bool = false, ?cancelable : Bool = false, ?progress : Float = 0.0 ) : Void {
		super( type, bubbles, cancelable );
		this.progress = progress;
	}
	
	override public function clone() : Event
	{
		return new LoadEvent( type, bubbles, cancelable );
	}
}
