package hxmotion;

class Ease
{
	
	public static function merge( ?easeIn : Dynamic, ?easeOut : Dynamic, ?swapPoint : Float = .5 ) : Dynamic {
		return function( t : Float, b : Float, c : Float, d : Float ) : Float {
			var cs:Float = c*swapPoint;
			var ds:Float = d*swapPoint;
			
			if (t < ds) return easeIn(t, b, cs, ds);
			
			var diff:Float = 1 - swapPoint;
			return easeOut(t - ds, b + cs, c * diff, d * diff);
		}
	}
	
	// BACK ------------------------------------------------------------------------------------------------------------------
	public inline static function inBack ( t : Float, b : Float, c : Float, d : Float ) : Float {
		var s = 1.70158;
		return c * ( t /= d ) * t * ( ( s + 1 ) * t - s ) + b;
	}

	public inline static function outBack ( t : Float, b : Float, c : Float, d : Float ) : Float {
		var s = 1.70158;
		return c * ( ( t = t / d - 1 ) * t * ( ( s + 1 ) * t + s) + 1 ) + b;
	}
	
	public inline static function inOutBack ( t : Float, b : Float, c : Float, d : Float ) : Float {
		var s = 1.70158; 
		if ( ( t /= d / 2 ) < 1 )
			return c / 2 * ( t * t * ( ( ( s *= ( 1.525 ) ) + 1 ) * t - s ) ) + b;
		return c / 2 * ( ( t -= 2 ) * t * ( ( ( s *= ( 1.525 ) ) + 1 ) * t + s ) + 2 ) + b;
	}
	
	// BOUNCE ------------------------------------------------------------------------------------------------------------------
	public inline static function outBounce ( t : Float, b : Float, c : Float, d : Float ) : Float {
		if ( ( t /= d ) < ( 1 / 2.75 ) )
			return c * ( 7.5625 * t * t ) + b;
		else if ( t < ( 2 / 2.75 ) )
			return c * ( 7.5625 * ( t -= ( 1.5 / 2.75 ) ) * t + .75 ) + b;
		else if ( t < ( 2.5 / 2.75 ) )
			return c * ( 7.5625 * ( t -= ( 2.25 / 2.75 ) ) * t + .9375 ) + b;
		else
			return c * ( 7.5625 * ( t -= ( 2.625 / 2.75 ) ) * t + .984375 ) + b;
	}
	
	public inline static function inBounce ( t : Float, b : Float, c : Float, d : Float ) : Float {
		return c - outBounce ( d - t, 0, c, d ) + b;
	}
	
	public inline static function inOutBounce ( t : Float, b : Float, c : Float, d : Float ) : Float {
		if ( t < d / 2 )
			return inBounce ( t * 2, 0, c, d ) * .5 + b;
		else
			return outBounce ( t * 2 - d, 0, c, d ) * .5 + c *.5 + b;
	}
	
	// CIRC ------------------------------------------------------------------------------------------------------------------
	public inline static function inCirc ( t : Float, b : Float, c : Float, d : Float ) : Float {
		return -c * ( Math.sqrt( 1 - ( t /= d ) * t ) - 1 ) + b;
	}
	
	public inline static function outCirc ( t : Float, b : Float, c : Float, d : Float ) : Float {
		return c * Math.sqrt( 1 - ( t = t / d - 1 ) * t ) + b;
	}
	
	public inline static function inOutCirc ( t : Float, b : Float, c : Float, d : Float ) : Float {
		if ( ( t /= d / 2 ) < 1 )
			return -c / 2 * ( Math.sqrt( 1 - t * t ) - 1 ) + b;
		return c / 2 * ( Math.sqrt( 1 - ( t -= 2 ) * t ) + 1 ) + b;
	}
	
	// CUBIC ------------------------------------------------------------------------------------------------------------------
	public inline static function inCubic ( t : Float, b : Float, c : Float, d : Float ) : Float {
		return c * ( t /= d ) * t * t + b;
	}
	
	public inline static function outCubic ( t : Float, b : Float, c : Float, d : Float ) : Float {
		return c * ( ( t = t / d - 1 ) * t * t + 1 ) + b;
	}
	
	public inline static function inOutCubic ( t : Float, b : Float, c : Float, d : Float ) : Float {
		if ( ( t /= d / 2 ) < 1 )
			return c / 2 * t * t * t + b;
		return c / 2 * ( ( t -= 2 ) * t * t + 2) + b;
	}
	
	// ELASTIC ------------------------------------------------------------------------------------------------------------------
	public inline static function inElastic ( t : Float, b : Float, c : Float, d : Float ) : Float {
		if ( t == 0 )
			return b;
		if ( ( t /= d ) == 1 )
			return b + c;
			var p = d * .3;
		var s;
			var a = c;
			s = p / 4;

		return -( a * Math.pow( 2, 10 * ( t -= 1 ) ) * Math.sin( ( t * d - s ) * ( 2 * Math.PI ) / p ) ) + b;
	}

	public inline static function outElastic ( t : Float, b : Float, c : Float, d : Float ) : Float {
		if ( t == 0 )
			return b;
		if ( ( t /= d ) == 1 )
			return b + c;
			var p = d * .3;
		var s;
			var a = c;
			s = p / 4;

		return ( a * Math.pow( 2, -10 * t ) * Math.sin( ( t * d - s ) * ( 2 * Math.PI ) / p ) + c + b );
	}
	
	public inline static function inOutElastic ( t : Float, b : Float, c : Float, d : Float ) : Float {
		if ( t == 0 )
			return b;
		if ( ( t /= d / 2 ) == 2 )
			return b + c;
		var s;
			var p = d * ( .3 * 1.5 );
			var a = c;
			s =p / 4;

		if ( t < 1 )
			return -.5 * ( a * Math.pow( 2, 10 * ( t -= 1 ) ) * Math.sin( ( t * d - s ) * ( 2 * Math.PI ) / p ) ) + b;
		return a * Math.pow( 2, -10 * ( t -= 1 ) ) * Math.sin( ( t * d - s ) * ( 2 * Math.PI ) / p ) * .5 + c + b;
	}
	
	// EXPO ------------------------------------------------------------------------------------------------------------------
	public inline static function inExpo ( t : Float, b : Float, c : Float, d : Float ) : Float {
		return ( t == 0 ) ? b : c * Math.pow( 2, 10 * ( t / d - 1 ) ) + b;
	}
	
	public inline static function outExpo ( t : Float, b : Float, c : Float, d : Float ) : Float {
		return ( t == d ) ? b + c : c * ( -Math.pow( 2, -10 * t / d ) + 1 ) + b;
	}
	
	public inline static function inOutExpo ( t : Float, b : Float, c : Float, d : Float) : Float {
		if ( t == 0 )
			return b;
		if ( t == d )
			return b + c;
		if ( ( t /= d / 2 ) < 1 )
			return c / 2 * Math.pow( 2, 10 * ( t - 1 ) ) + b;
		return c / 2 * ( -Math.pow( 2, -10 * --t ) + 2 ) + b;
	}
	
	// LINEAR ------------------------------------------------------------------------------------------------------------------
	public inline static function linear ( t : Float, b : Float, c : Float, d : Float ) : Float {
		return c * t / d + b;
	}
	
	// QUAD ------------------------------------------------------------------------------------------------------------------
	public inline static function inQuad ( t : Float, b : Float, c : Float, d : Float ) : Float {
		return c * ( t /= d ) * t + b;
	}
	
	public inline static function outQuad ( t : Float, b : Float, c : Float, d : Float ) : Float {
		return -c * ( t /= d ) * ( t - 2 ) + b;
	}
	
	public inline static function inOutQuad ( t : Float, b : Float, c : Float, d : Float ) : Float {
		if ( ( t /= d / 2 ) < 1 )
			return c / 2 * t * t + b;
		return -c / 2 * ( ( --t ) * ( t - 2 ) - 1 ) + b;
	}
	
	// QUART ------------------------------------------------------------------------------------------------------------------	
	public inline static function inQuart ( t : Float, b : Float, c : Float, d : Float ) : Float {
		return c * ( t /= d ) * t * t * t + b;
	}
	
	public inline static function outQuart ( t : Float, b : Float, c : Float, d : Float ) : Float {
		return -c * ( ( t = t / d - 1 ) * t * t * t - 1 ) + b;
	}
	
	public inline static function inOutQuart ( t : Float, b : Float, c : Float, d : Float ) : Float {
		if ( ( t /= d / 2 ) < 1 )
			return c / 2 * t * t * t * t + b;
		return -c / 2 * ( ( t -= 2 ) * t * t * t - 2) + b;
	}
	
	// QUINT ------------------------------------------------------------------------------------------------------------------		
	public inline static function inQuint ( t : Float, b : Float, c : Float, d : Float ) : Float {
		return c * ( t /= d ) * t * t * t * t + b;
	}
	
	public inline static function outQuint ( t : Float, b : Float, c : Float, d : Float ) : Float {
		return c * ( ( t = t / d - 1 ) * t * t * t * t + 1 ) + b;
	}
	
	public inline static function inOutQuint ( t : Float, b : Float, c : Float, d : Float ) : Float {
		if ( ( t /= d / 2 ) < 1 )
			return c / 2 * t * t * t * t * t + b;
		return c / 2 * ( ( t -= 2 ) * t * t * t * t + 2 ) + b;
	}
	
	// SINE ------------------------------------------------------------------------------------------------------------------
	public inline static function inSine ( t : Float, b : Float, c : Float, d : Float ) : Float {
		return -c * Math.cos ( t / d * ( Math.PI / 2 ) ) + c + b;
	}
	
	public inline static function outSine ( t : Float, b : Float, c : Float, d : Float ) : Float {
		return c * Math.sin( t / d * ( Math.PI / 2 ) ) + b;
	}
	
	public inline static function inOutSine ( t : Float, b : Float, c : Float, d : Float ) : Float {
		return -c / 2 * ( Math.cos( Math.PI * t / d ) - 1 ) + b;
	}
}