package br.pedromoraes.btween.properties.sandy
{
	import br.pedromoraes.btween.BTween;
	import br.pedromoraes.btween.properties.IProperty;
	
	import sandy.core.data.Vector;
	import sandy.core.scenegraph.ATransformable;

	public class Move3DProperty implements IProperty
	{

		public var index:Number;
		public var destination:Vector;
		private var origin:Vector;
		private var delta:Vector;
		
		protected var _target:ATransformable;
		public function get target():Object { return _target }
		public function set target(pTarget:Object):void { _target = pTarget as ATransformable }

		public function Move3DProperty(pTarget:ATransformable, pDestination:Vector):void
		{
			_target = pTarget;
			destination = pDestination;
		}

		public function update(pTween:BTween, piElapsed:int):void
		{
			if (!origin) init();
			index = pTween.getValue(0, 1, piElapsed);
			_target.setPosition(
				origin.x+delta.x*index,
				origin.y+delta.y*index,
				origin.z+delta.z*index
			);
		}

		public function init():void
		{
			origin = _target.getPosition();
			delta = destination.clone();
			delta.sub(origin);
		}
		
		public function reverse():void
		{
			origin = _target.getPosition();
			destination = origin.clone();
		}
		
		public function clone():IProperty
		{
			return new Move3DProperty(_target, destination);
		}

	}
}