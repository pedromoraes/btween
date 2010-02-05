package br.pedromoraes.btween;

import flash.events.IEventDispatcher;

interface ISequenceable implements IEventDispatcher
{

	function start(?params:Dynamic):ISequenceable;

	function stop():ISequenceable;
	
	function queue(obj:Dynamic = null, ?params:Dynamic):ISequenceable;
	
	function back(?trans:Dynamic = null):ISequenceable;

	function change(params:Dynamic):ISequenceable;

}