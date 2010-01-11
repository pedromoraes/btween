package;

import haxe.Log;
import hxmotion.Ease;
import hxmotion.modifiers.CSS;
import js.Lib;

using hxmotion.Shortcuts;

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
		#if debug
		var div = Lib.document.getElementById( 'square' );
		div.style.top = "0px";
		
		div.style.tween( { ease : Ease.inCirc, time: 300, mod : [ CSS.pos, { top : 300 } ] } ).start()
		.queue( div.style.tween( [ { time: 300, mod : [ CSS.pos, { top : 100 } ] } ] ) )
		.queue( Log.trace, 'done, callback' );
		#else
		hxmotion.Refs.ref();
		#end
	}
	
}