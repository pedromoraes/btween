/**
 * ...
 * @author Pedro Moraes <pedromoraes@gmail.com>
 */

package hxmotion.events;

import flash.events.Event;
import neash.events.Event;

class BTweenEvent extends Event
{

	public static inline var START : String = "start";
	public static inline var STOP : String = "stop";
	public static inline var UPDATE : String = "update";

	public function new( type : String, bubbles : Bool = false, cancelable : Bool = false ) : Void
	{
		super( type, bubbles, cancelable );
	}
	
	override public function clone() : Event
	{
		return new BTweenEvent( type, bubbles, cancelable );
	}
	
}