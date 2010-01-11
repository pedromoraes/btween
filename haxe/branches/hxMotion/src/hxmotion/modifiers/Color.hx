/**
 * ...
 * @author Pedro Moraes <pedromoraes@gmail.com>
 */

package hxmotion.modifiers;
import flash.display.DisplayObject;
import flash.geom.ColorTransform;

class Color 
{
	public static function tint( ix : Float, round : Bool, target : DisplayObject, params : Dynamic ) : Void
	{
		if ( params.ammount == null ) params.ammount = 1.0;
		if ( params.redMultiplier == null )
		{
			params.redMultiplier = 1 - params.ammount;
			params.greenMultiplier = 1 - params.ammount;
			params.blueMultiplier = 1 - params.ammount;
			params.redOffset = ( params.color >> 16 ) * params.ammount;
			params.greenOffset = ( params.color >> 8 & 0xFF ) * params.ammount;
			params.blueOffset = ( params.color & 0xFF ) * params.ammount;
			params.initValue = { redMultiplier : 1, greenMultiplier : 1, blueMultiplier : 1, redOffset : 0, greenOffset : 0, blueOffset : 0 };
		}
		if (ix > 0)
		{
			var ct = new ColorTransform();
			ct.redMultiplier = params.initValue.redMultiplier + (params.redMultiplier - params.initValue.redMultiplier) * ix;
			ct.greenMultiplier = params.initValue.greenMultiplier + (params.greenMultiplier - params.initValue.greenMultiplier) * ix;
			ct.blueMultiplier = params.initValue.blueMultiplier + (params.blueMultiplier - params.initValue.blueMultiplier) * ix;
			ct.redOffset = params.initValue.redOffset + (params.redOffset - params.initValue.redOffset) * ix;
			ct.greenOffset = params.initValue.greenOffset + (params.greenOffset - params.initValue.greenOffset) * ix;
			ct.blueOffset = params.initValue.blueOffset + (params.blueOffset - params.initValue.blueOffset) * ix;
			target.transform.colorTransform = ct;
		}
	}

	public static function fade( ix : Float, round : Bool, target : DisplayObject, params : Dynamic ) : Void
	{
		if ( params.initValue == null ) params.initValue = { alpha : target.alpha };
		var delta : Float = params.alpha - params.initValue.alpha;
		target.alpha = params.initValue.alpha + delta * ix;
		if ( target.alpha == 0 && ix == 1 ) target.visible = false;
		else if ( target.alpha > 0 && !target.visible ) target.visible = true;
	}
}