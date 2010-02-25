package;

import flash.display.DisplayObject;
import flash.text.TextField;
import haxe.Log;
import hxmotion.BTween;
import hxmotion.Ease;
import hxmotion.events.BTweenEvent;
import flash.display.Sprite;
import flash.Lib;
import haxe.FastList;
import hxmotion.events.LoadEvent;
import hxmotion.modifiers.Color;

using hxmotion.Shortcuts;
/**
 * ...
 * @author 
 */

class MainSWF extends Sprite
{
	
	#if debug
	var page : DisplayObject;
	var txt : TextField; 
	#end
	
	static function main() 
	{
		Lib.current.addChild( new MainSWF() );
	}
	
	function new() {
		super();
		#if debug
		addChild( txt = new TextField() );
		txt.x = 300;
		
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
		//one-line loader
		this.load( 'page.swf', 'page' ).update( updLoadingProgress ).queue( init );
		#else
		hxmotion.Refs.ref();
		#end
	}

	#if debug
	function updLoadingProgress( evt : LoadEvent ) : Void {
		txt.text = Math.round( evt.progress*100 ) + '%';
	}
	
	function init() : Void {
		page.tween( { time : 999, from : { alpha : 0 }, alpha : 1 } ).start();
	}
	#end
	
}