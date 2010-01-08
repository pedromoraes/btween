package;

import haxe.Log;
import hxmotion.modifiers.CSSPos;
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
		div.style.tween( { time: 300, modifier : CSSPos.byPixels, args : [ 'top', 300 ] } ).start()
		.queue( div.style.tween( { time: 300, modifier : CSSPos.byPixels, args : [ 'top', 100 ] } ) )
		.queue( Log.trace, 'done, callback' );
	}
	
}