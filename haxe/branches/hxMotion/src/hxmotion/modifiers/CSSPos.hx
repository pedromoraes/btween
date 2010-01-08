/**
 * ...
 * @author 
 */

package hxmotion.modifiers;
import js.Dom;

class CSSPos 
{
	public static function byPixels( ix : Float, round : Bool, target, prop : String, value : Int, obj : Dynamic ) : Void
	{
		var initValue : Int;
		if ( obj.initValue != null ) initValue = obj.initValue;
		else {
			var prop : String = Reflect.field( target, prop );
			if ( prop == null ) initValue = obj.initValue = 0;
			else initValue = obj.initValue = Std.parseInt( prop.split("px").join("") );
		}
		if ( initValue == null ) initValue = obj.initValue = 0;
		var delta : Int = value - initValue;
		Reflect.setField( target, prop, Std.int( initValue + delta * ix ) + "px" );
	}
	
}