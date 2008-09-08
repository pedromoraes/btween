package br.pedromoraes.btween.properties.movieclip
{
	import br.pedromoraes.btween.BTween;
	import br.pedromoraes.btween.properties.BaseProperty;
	import br.pedromoraes.btween.properties.IProperty;
	
	import flash.display.MovieClip;

	public class FrameProperty extends BaseProperty implements IProperty
	{

		public function FrameProperty(pTarget:MovieClip, piFrame:int):void
		{
			super(pTarget, { frame : piFrame });
		}

		public override function update(pTween:BTween, piElapsed:int):void
		{
			if (!startValues) init();
			index = pTween.getValue(0, 1, piElapsed);

			target.gotoAndStop(startValues.frame + Math.floor((properties.frame - startValues.frame)*index));
		}
		
		public override function init():void
		{
			startValues = new Object();
			startValues.frame = target.currentFrame;
		}

	}

}