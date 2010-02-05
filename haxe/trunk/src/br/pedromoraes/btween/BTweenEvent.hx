package br.pedromoraes.btween;

import flash.events.Event;

class BTweenEvent extends Event
{
	
	public static inline var START:String = 'start';
	public static inline var UPDATE:String = 'update';
	public static inline var COMPLETE:String = 'complete';
	
	public function new(type:String, ?bubbles:Null<Bool>, ?cancelable:Null<Bool> )
	{
		super(type, bubbles, cancelable);
	}

	public override function clone() : Event 
	{
		var copy:BTweenEvent = new BTweenEvent(type, bubbles, cancelable);
		return copy;
	}
}