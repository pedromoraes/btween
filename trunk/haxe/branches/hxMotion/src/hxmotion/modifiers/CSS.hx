/**
 * 
 * @author pedromoraes@gmail.com 
 */

package hxmotion.modifiers;
import js.Dom;

class CSS
{
	public static function pos( ix : Float, round : Bool, target, params : Dynamic ) : Void
	{
		if ( params.unit == null ) params.unit = 'px';
		if ( params.initValue == null ) params.initValue = { };
		for ( prop in Reflect.fields( params ) ) {
			if ( prop != 'initValue' && prop != 'unit' ) {
				var initValue : Int;
				if ( Reflect.field( params.initValue, prop ) != null ) {
					initValue = Reflect.field( params.initValue, prop );
				} else {
					var rawValue = Reflect.field( target, prop );
					if ( rawValue == null ) {
						initValue = 0;
					} else {
						initValue = Std.int( rawValue.split(params.unit).join( '' ) );
					}
					Reflect.setField( params.initValue, prop, initValue );
				}
				var value = Reflect.field( params, prop );
				var delta : Int = value - initValue;
				Reflect.setField( target, prop, Std.int( initValue + delta * ix ) + params.unit );
			}
		}
	}
	
}