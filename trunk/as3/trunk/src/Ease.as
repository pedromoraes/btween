package
{
	
	public class Ease
	{
		
		public static function merge( easeIn : Function, easeOut : Function, swapPoint : Number = .5 ) : Function {
			return function( t : Number, b : Number, c : Number, d : Number ) : Number {
				var cs:Number = c*swapPoint;
				var ds:Number = d*swapPoint;
				
				if (t < ds) return easeIn(t, b, cs, ds);
				
				var diff:Number = 1 - swapPoint;
				return easeOut(t - ds, b + cs, c * diff, d * diff);
			}
		}
		
		// BACK ------------------------------------------------------------------------------------------------------------------
		public  static function inBack ( t : Number, b : Number, c : Number, d : Number ) : Number {
			var s : Number = 1.70158;
			return c * ( t /= d ) * t * ( ( s + 1 ) * t - s ) + b;
		}
		
		public  static function outBack ( t : Number, b : Number, c : Number, d : Number ) : Number {
			var s : Number = 1.70158;
			return c * ( ( t = t / d - 1 ) * t * ( ( s + 1 ) * t + s) + 1 ) + b;
		}
		
		public  static function inOutBack ( t : Number, b : Number, c : Number, d : Number ) : Number {
			var s : Number = 1.70158;
			if ( ( t /= d / 2 ) < 1 )
				return c / 2 * ( t * t * ( ( ( s *= ( 1.525 ) ) + 1 ) * t - s ) ) + b;
			return c / 2 * ( ( t -= 2 ) * t * ( ( ( s *= ( 1.525 ) ) + 1 ) * t + s ) + 2 ) + b;
		}
		
		// BOUNCE ------------------------------------------------------------------------------------------------------------------
		public  static function outBounce ( t : Number, b : Number, c : Number, d : Number ) : Number {
			if ( ( t /= d ) < ( 1 / 2.75 ) )
				return c * ( 7.5625 * t * t ) + b;
			else if ( t < ( 2 / 2.75 ) )
				return c * ( 7.5625 * ( t -= ( 1.5 / 2.75 ) ) * t + .75 ) + b;
			else if ( t < ( 2.5 / 2.75 ) )
				return c * ( 7.5625 * ( t -= ( 2.25 / 2.75 ) ) * t + .9375 ) + b;
			else
				return c * ( 7.5625 * ( t -= ( 2.625 / 2.75 ) ) * t + .984375 ) + b;
		}
		
		public  static function inBounce ( t : Number, b : Number, c : Number, d : Number ) : Number {
			return c - outBounce ( d - t, 0, c, d ) + b;
		}
		
		public  static function inOutBounce ( t : Number, b : Number, c : Number, d : Number ) : Number {
			if ( t < d / 2 )
				return inBounce ( t * 2, 0, c, d ) * .5 + b;
			else
				return outBounce ( t * 2 - d, 0, c, d ) * .5 + c *.5 + b;
		}
		
		// CIRC ------------------------------------------------------------------------------------------------------------------
		public  static function inCirc ( t : Number, b : Number, c : Number, d : Number ) : Number {
			return -c * ( Math.sqrt( 1 - ( t /= d ) * t ) - 1 ) + b;
		}
		
		public  static function outCirc ( t : Number, b : Number, c : Number, d : Number ) : Number {
			return c * Math.sqrt( 1 - ( t = t / d - 1 ) * t ) + b;
		}
		
		public  static function inOutCirc ( t : Number, b : Number, c : Number, d : Number ) : Number {
			if ( ( t /= d / 2 ) < 1 )
				return -c / 2 * ( Math.sqrt( 1 - t * t ) - 1 ) + b;
			return c / 2 * ( Math.sqrt( 1 - ( t -= 2 ) * t ) + 1 ) + b;
		}
		
		// CUBIC ------------------------------------------------------------------------------------------------------------------
		public  static function inCubic ( t : Number, b : Number, c : Number, d : Number ) : Number {
			return c * ( t /= d ) * t * t + b;
		}
		
		public  static function outCubic ( t : Number, b : Number, c : Number, d : Number ) : Number {
			return c * ( ( t = t / d - 1 ) * t * t + 1 ) + b;
		}
		
		public  static function inOutCubic ( t : Number, b : Number, c : Number, d : Number ) : Number {
			if ( ( t /= d / 2 ) < 1 )
				return c / 2 * t * t * t + b;
			return c / 2 * ( ( t -= 2 ) * t * t + 2) + b;
		}
		
		// ELASTIC ------------------------------------------------------------------------------------------------------------------
		public  static function inElastic ( t : Number, b : Number, c : Number, d : Number ) : Number {
			if ( t == 0 )
				return b;
			if ( ( t /= d ) == 1 )
				return b + c;
			var p : Number = d * .3;
			var s : Number;
			var a : Number = c;
			s = p / 4;
			
			return -( a * Math.pow( 2, 10 * ( t -= 1 ) ) * Math.sin( ( t * d - s ) * ( 2 * Math.PI ) / p ) ) + b;
		}
		
		public  static function outElastic ( t : Number, b : Number, c : Number, d : Number ) : Number {
			if ( t == 0 )
				return b;
			if ( ( t /= d ) == 1 )
				return b + c;
			var p : Number = d * .3;
			var s : Number;
			var a : Number = c;
			s = p / 4;
			
			return ( a * Math.pow( 2, -10 * t ) * Math.sin( ( t * d - s ) * ( 2 * Math.PI ) / p ) + c + b );
		}
		
		public  static function inOutElastic ( t : Number, b : Number, c : Number, d : Number ) : Number {
			if ( t == 0 )
				return b;
			if ( ( t /= d / 2 ) == 2 )
				return b + c;
			var s : Number;
			var p : Number = d * ( .3 * 1.5 );
			var a : Number = c;
			s =p / 4;
			
			if ( t < 1 )
				return -.5 * ( a * Math.pow( 2, 10 * ( t -= 1 ) ) * Math.sin( ( t * d - s ) * ( 2 * Math.PI ) / p ) ) + b;
			return a * Math.pow( 2, -10 * ( t -= 1 ) ) * Math.sin( ( t * d - s ) * ( 2 * Math.PI ) / p ) * .5 + c + b;
		}
		
		// EXPO ------------------------------------------------------------------------------------------------------------------
		public  static function inExpo ( t : Number, b : Number, c : Number, d : Number ) : Number {
			return ( t == 0 ) ? b : c * Math.pow( 2, 10 * ( t / d - 1 ) ) + b;
		}
		
		public  static function outExpo ( t : Number, b : Number, c : Number, d : Number ) : Number {
			return ( t == d ) ? b + c : c * ( -Math.pow( 2, -10 * t / d ) + 1 ) + b;
		}
		
		public  static function inOutExpo ( t : Number, b : Number, c : Number, d : Number) : Number {
			if ( t == 0 )
				return b;
			if ( t == d )
				return b + c;
			if ( ( t /= d / 2 ) < 1 )
				return c / 2 * Math.pow( 2, 10 * ( t - 1 ) ) + b;
			return c / 2 * ( -Math.pow( 2, -10 * --t ) + 2 ) + b;
		}
		
		// LINEAR ------------------------------------------------------------------------------------------------------------------
		public  static function linear ( t : Number, b : Number, c : Number, d : Number ) : Number {
			return c * t / d + b;
		}
		
		// QUAD ------------------------------------------------------------------------------------------------------------------
		public  static function inQuad ( t : Number, b : Number, c : Number, d : Number ) : Number {
			return c * ( t /= d ) * t + b;
		}
		
		public  static function outQuad ( t : Number, b : Number, c : Number, d : Number ) : Number {
			return -c * ( t /= d ) * ( t - 2 ) + b;
		}
		
		public  static function inOutQuad ( t : Number, b : Number, c : Number, d : Number ) : Number {
			if ( ( t /= d / 2 ) < 1 )
				return c / 2 * t * t + b;
			return -c / 2 * ( ( --t ) * ( t - 2 ) - 1 ) + b;
		}
		
		// QUART ------------------------------------------------------------------------------------------------------------------
		public  static function inQuart ( t : Number, b : Number, c : Number, d : Number ) : Number {
			return c * ( t /= d ) * t * t * t + b;
		}
		
		public  static function outQuart ( t : Number, b : Number, c : Number, d : Number ) : Number {
			return -c * ( ( t = t / d - 1 ) * t * t * t - 1 ) + b;
		}
		
		public  static function inOutQuart ( t : Number, b : Number, c : Number, d : Number ) : Number {
			if ( ( t /= d / 2 ) < 1 )
				return c / 2 * t * t * t * t + b;
			return -c / 2 * ( ( t -= 2 ) * t * t * t - 2) + b;
		}
		
		// QUINT ------------------------------------------------------------------------------------------------------------------
		public  static function inQuint ( t : Number, b : Number, c : Number, d : Number ) : Number {
			return c * ( t /= d ) * t * t * t * t + b;
		}
		
		public  static function outQuint ( t : Number, b : Number, c : Number, d : Number ) : Number {
			return c * ( ( t = t / d - 1 ) * t * t * t * t + 1 ) + b;
		}
		
		public  static function inOutQuint ( t : Number, b : Number, c : Number, d : Number ) : Number {
			if ( ( t /= d / 2 ) < 1 )
				return c / 2 * t * t * t * t * t + b;
			return c / 2 * ( ( t -= 2 ) * t * t * t * t + 2 ) + b;
		}
		
		// SINE ------------------------------------------------------------------------------------------------------------------
		public  static function inSine ( t : Number, b : Number, c : Number, d : Number ) : Number {
			return -c * Math.cos ( t / d * ( Math.PI / 2 ) ) + c + b;
		}
		
		public  static function outSine ( t : Number, b : Number, c : Number, d : Number ) : Number {
			return c * Math.sin( t / d * ( Math.PI / 2 ) ) + b;
		}
		
		public  static function inOutSine ( t : Number, b : Number, c : Number, d : Number ) : Number {
			return -c / 2 * ( Math.cos( Math.PI * t / d ) - 1 ) + b;
		}
	}
}