package hxmotion;

import hxmotion.Types;

interface ISequenceable implements IEventDispatcher {

	public var dontRecycle : Bool;
	public var previous : ISequenceable;
	public var next : ISequenceable;
	
	public function start( ?params : Dynamic ) : ISequenceable;

	public function stop( ?premature : Bool = false ) : ISequenceable;
	
	public function queue( obj : Dynamic = null, ?params : Dynamic ) : ISequenceable;
	
	public function back( ?trans : Dynamic = null ) : ISequenceable;
	
	public function update( listener : Dynamic ) : ISequenceable;
	
	public function change( params : Dynamic ) : ISequenceable;
	
	public function chain() : Chain;
	
	public function hold() : ISequenceable;
}