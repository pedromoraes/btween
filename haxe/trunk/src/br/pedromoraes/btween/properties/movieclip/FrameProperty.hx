package br.pedromoraes.btween.properties.movieclip;

import br.pedromoraes.btween.BTween;
import br.pedromoraes.btween.properties.BaseProperty;
import br.pedromoraes.btween.properties.IProperty;

import flash.display.MovieClip;

class FrameProperty extends BaseProperty
{

	public function new(pTarget:MovieClip, piFrame:Int):Void
	{
		super(pTarget, { frame : piFrame });
	}

	public override function update(pTween:BTween, piElapsed:Int):Void
	{
		if (startValues == null) init();
		index = pTween.getValue(0, 1, piElapsed);

		target.gotoAndStop(startValues.frame + Math.floor((properties.frame - startValues.frame)*index));
	}
	
	public override function init():Void
	{
		startValues = { frame : target.currentFrame };
	}

}

