package br.pedromoraes.btween.properties;

import br.pedromoraes.btween.BTween;
	
interface IProperty
{

	var target(getTarget,setTarget):Dynamic;

	function update(pTween:BTween, piElapsed:Int):Void;
	
	function reverse():Void;
	
	function clone():IProperty;

}