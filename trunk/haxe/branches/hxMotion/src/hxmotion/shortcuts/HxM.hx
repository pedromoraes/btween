/**
 * ...
 * @author Pedro Moraes <pedromoraes@gmail.com>
 */

package hxmotion.shortcuts;

import hxmotion.BTween;
import hxmotion.Delay;
import hxmotion.ISequenceable;

class HxM
{

	public static function tween( target : Dynamic, params : Dynamic ) : ISequenceable
	{
		Reflect.setField( params, 'target', target );
		return new BTween( params ).start();
	}

	public static function delay( interval : Int ) : ISequenceable
	{
		return new Delay( interval ).start();
	}
}