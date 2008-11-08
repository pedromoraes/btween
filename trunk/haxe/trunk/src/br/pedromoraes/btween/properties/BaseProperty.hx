package br.pedromoraes.btween.properties;

import br.pedromoraes.btween.BTween;

class BaseProperty implements IProperty
{

	public var index:Float;
	public var properties:Dynamic;
	public var startValues:Dynamic;

	var _target:Dynamic;
	public var target(getTarget,setTarget):Dynamic;
	public function getTarget():Dynamic { return _target; }
	public function setTarget(pTarget:Dynamic):Void { _target = pTarget; }

	public function new(pTarget:Dynamic, pProperties:Dynamic)
	{
		_target = pTarget;
		properties = pProperties;
	}

	public function update(pTween:BTween, piElapsed:Int):Void
	{
		if (!startValues) init();
		index = pTween.getValue(0, 1, piElapsed);

		var props = Reflect.fields( properties );
		for (lsProp in props)
		{
			if (pTween.rounded)
				Reflect.setField( target, lsProp, Math.round(Reflect.field( startValues, lsProp) + (Reflect.field( properties, lsProp ) - Reflect.field( startValues, lsProp )) * index) );
			else
				Reflect.setField( target, lsProp, Reflect.field( startValues, lsProp ) + (Reflect.field( properties, lsProp ) - Reflect.field( startValues, lsProp ) ) * index );
		}
	}

	public function reverse():Void
	{
		if (!startValues) init();
		var props = Reflect.fields( properties );
		for (lsProp in props)
		{
			Reflect.setField( properties, lsProp, Reflect.field( startValues, lsProp ) );
			Reflect.setField( startValues, lsProp, Reflect.field( target, lsProp ) );
		}
	}

	public function clone():IProperty
	{
		return new BaseProperty(target, cloneObj(properties));
	}

	public function cloneObj(pObj:Dynamic):Dynamic
	{
		return null;
	}

	public function init():Void
	{
		startValues = {};
		var fields = Reflect.fields( properties );
		for (field in fields)
		{
			Reflect.setField( startValues, field, Reflect.field( _target, field ) );
		}
	}

}
