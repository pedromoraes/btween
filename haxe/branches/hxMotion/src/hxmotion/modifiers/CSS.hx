/**
 * 
 * @author pedromoraes@gmail.com 
 */

package hxmotion.modifiers;
import js.Dom;

class CSS
{
	public static function setPos( ix : Float, round : Bool, target, pers : Dynamic, prop : String, value : Int, ?unit : String = "px" ) : Void
	{
		var initValue : Int;
		if ( pers.initValue != null ) initValue = pers.initValue;
		else {
			var prop : String = Reflect.field( target, prop );
			if ( prop == null ) initValue = pers.initValue = 0;
			else initValue = pers.initValue = Std.parseInt( prop.split(unit).join("") );
		}
		if ( initValue == null ) initValue = pers.initValue = 0;
		var delta : Int = value - initValue;
		Reflect.setField( target, prop, Std.int( initValue + delta * ix ) + unit );
	}
	
}