package;

import haxe.Log;
import hxmotion.BTween;
import hxmotion.Ease;
import hxmotion.events.BTweenEvent;
import flash.display.Sprite;
import flash.Lib;
import haxe.FastList;
import hxmotion.modifiers.Color;

using hxmotion.Shortcuts;
/**
 * ...
 * @author 
 */

class MainSWF extends Sprite
{
	
	static function main() 
	{
		Lib.current.addChild( new MainSWF() );
	}
	
	function new()
	{
		super();
		#if debug
		var ball : Sprite = new Sprite();
		ball.graphics.beginFill( 0xff0000, 1 );
		ball.graphics.drawCircle( 100, 10, 10 );
		ball.graphics.endFill();
		BTween.DEFAULT_EASE = Ease.inOutCubic;
		BTween.DEFAULT_TIME = 666;
		addChild( ball );
		ball.tween( { x:400, mod : [ Color.fade, {alpha:0} ] } ).start()
		.queue().back()
		.queue( { target : ball, mod : [ Color.tint, {color: 0x33f006} ] } )
		.queue( Log.trace, "despues" );
		#else
		hxmotion.Refs.ref();
		#end
	}

}