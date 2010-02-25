/**
 * ...
 * @author Pedro Moraes <pedromoraes@gmail.com>
 */

package hxmotion;
#if flash
import flash.display.DisplayObjectContainer;
import hxmotion.events.LoadEvent;
#end

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
	#if flash
	public static function load( target : Dynamic, path : String, ?name : String ) : ISequenceable
	{
		var loader = Load.batch( path );
		loader.queue(
			function() : Void {
				var obj = Lambda.array( loader.stack )[ 0 ].data;
				target.addChild( obj );
				if ( name != null ) Reflect.setField( target, name, obj );
			}
		);
		return loader; 
	}
	#end
}