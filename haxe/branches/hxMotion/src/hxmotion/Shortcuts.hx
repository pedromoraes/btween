/**
 * ...
 * @author Pedro Moraes <pedromoraes@gmail.com>
 */

package hxmotion;

class Shortcuts
{
	public static function tween( target : Dynamic, params : Dynamic ) : ISequenceable
	{
		if ( Std.is( params, Array ) )
		{
			var longestTween : BTween = null;
			for ( t in cast( params, Array<Dynamic> ) )
			{
				t.target = target;
				var tween = new BTween( t );
				if ( longestTween == null || tween.time > longestTween.time ) longestTween = tween;
			}
			return longestTween;
		}
		params.target = target;
		return new BTween( params );
	}

	public static function delay( interval : Int ) : ISequenceable
	{
		return new Delay( interval ).start();
	}
}