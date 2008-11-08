package br.pedromoraes.btween;

import br.pedromoraes.events.HxEvent;

class BTweenEvent extends HxEvent
{
	
	public static var START:Int = 0;
	public static var UPDATE:Int = 1;
	public static var COMPLETE:Int = 2;
	
	public function new(type:Int, ?target:Dynamic = '', ?data:Dynamic = '' )
	{
		super(type, target, data);
	}

	public override function clone() : HxEvent 
	{
		var copy:BTweenEvent = new BTweenEvent(type, target, data);
		return copy;
	}
}