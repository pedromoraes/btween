package br.pedromoraes.btween.properties.sandy;

import br.pedromoraes.btween.BTween;
import br.pedromoraes.btween.properties.IProperty;

import sandy.core.data.Vector;
import sandy.core.scenegraph.ATransformable;

class Move3DProperty implements IProperty
{

	public var index:Float;
	public var destination:Vector;
	private var origin:Vector;
	private var delta:Vector;
	
	public var startValues:Dynamic;
	public var target:Dynamic;
	public var _target:ATransformable;

	public function new(pTarget:ATransformable, pDestination:Vector):Void
	{
		target = _target = pTarget;
		destination = pDestination;
	}

	public function update(pTween:BTween, piElapsed:Int):Void
	{
		if ( origin == null ) init();
		index = pTween.getValue(0, 1, piElapsed);
		_target.setPosition(
			origin.x+delta.x*index,
			origin.y+delta.y*index,
			origin.z+delta.z*index
		);
	}

	public function init():Void
	{
		origin = _target.getPosition();
		delta = destination.clone();
		delta.sub(origin);
		startValues = {};
	}
	
	public function reverse():Void
	{
		origin = _target.getPosition();
		destination = origin.clone();
		init();
	}
	
	public function clone():IProperty
	{
		return new Move3DProperty(_target, destination);
	}

}