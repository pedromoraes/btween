package;

import haxe.Log;
import hxmotion.Ease;
import hxmotion.modifiers.CSS;
import js.Lib;

using hxmotion.shortcuts.HxM;

/**
 * ...
 * @author 
 */

class MainJS
{
	
	static function main() 
	{
		Lib.window.onload = init;
	}
	
	static function init( e ) : Void {
		var div = Lib.document.getElementById( 'square' );
		div.style.tween( { ease : Ease.inCirc, time: 300, mod : [ CSS.setPos, 'top', 300 ] } ).start()
		.queue( div.style.tween( { time: 300, mod : [ CSS.setPos, 'top', 100 ] } ) )
		.queue( Log.trace, 'done, callback' );
	}
	
}