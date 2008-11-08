package br.pedromoraes.btween;

import br.pedromoraes.events.IHxEventDispatcher;

interface ISequenceable implements IHxEventDispatcher
{

	function start(?params:Dynamic):ISequenceable;

	function stop():ISequenceable;
	
	function queue(obj:Dynamic = null, ?params:Dynamic):ISequenceable;
	
	function back(?trans:Dynamic = null):ISequenceable;

	function change(params:Dynamic):ISequenceable;

}