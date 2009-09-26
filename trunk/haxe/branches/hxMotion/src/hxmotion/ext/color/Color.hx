/**
 * ...
 * @author Pedro Moraes <pedromoraes@gmail.com>
 * 
 */

package hxmotion.ext.color;

class Color
{

	public var red : Int;
	public var green : Int;
	public var blue : Int;
	public var alpha : Int;

	public static function fromARGB( argb : Int ) : Color
	{
		return new Color( argb >>> 16 & 0xFF, argb >>>  8 & 0xFF, argb & 0xFF, argb >>> 24 );
	}

	public static function fromRGB( rgb : Int ) : Color
	{
		return new Color( rgb >>> 16, rgb >>>  8 & 0xFF, rgb & 0xFF );
	}

	public function new( r : Int, g : Int, b : Int, a : Int = 1 ) 
	{
		red = r;
		green = g;
		blue = b;
		alpha = a;
	}

	public function toARGB() : UInt
	{
		return alpha << 24 | red << 16 | green << 8 | blue;
	}

	public function toRGB() : UInt
	{
		return red << 16 | green << 8 | blue;
	}

	public function getRGBAverage() : Float
	{
		return ( red + green + blue ) / 3;
	}
	
	public function getARGBAverage() : Float
	{
		return ( alpha + red + green + blue ) / 4;
	}

	public function toString() : String
	{
		return [ red, green, blue, alpha ].toString();
	}

}