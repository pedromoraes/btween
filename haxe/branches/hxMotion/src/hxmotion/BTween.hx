/**
 * ...
 * @author pedromoraes@gmail.com
 * 
 * Licensed under the MIT license: http://www.opensource.org/licenses/mit-license.php
 */

package hxmotion;
import hxmotion.events.BTweenEvent;
#if flash9
import flash.display.Sprite;
import flash.Lib;
#else
import jsflash.display.Sprite;
import jsflash.Lib;
#end

class BTween extends Sequenceable {

	public static var DEFAULT_EASE : Dynamic = Ease.linear;
	public static var DEFAULT_TIME : Int = 300;
	public static var DEFAULT_ROUNDED : Bool = false;

	inline static var ENTER_FRAME : String = 'enterFrame';

	inline static var timeProp : String = 'time';
	inline static var easeProp : String = 'ease';
	inline static var modifierProp : String = 'mod';
	inline static var roundedProp : String = 'rounded';
	inline static var targetProp : String = 'target';

	public var ease : Dynamic;
	public var rounded : Bool;
	public var target : Dynamic;
	public var time : Int;
	public var props : Array<BTweenProp>;
	public var modifier : Dynamic;
	public var modifierArgs : Array<Dynamic>;

	var startTime : Int;
	var updateListeners : Array<Dynamic>;

	public static var enterFrameDispatcher : Sprite = new Sprite();

	public function new( ?args : Dynamic ) {
		super();
		init();
		consume( args );
	}

	override public function start( ?args : Dynamic ) : ISequenceable {
		if ( !Std.is( args, BTweenEvent ) ) consume( args );
		startTime = Lib.getTimer();
		for ( prop in props ) prop.initValue = Reflect.field( target, prop.name );
		dispatchEvent( new BTweenEvent( BTweenEvent.START ) );
		enterFrameDispatcher.addEventListener( ENTER_FRAME, step );
		return this;
	}

	override public function stop( ?premature : Bool = false ) : ISequenceable {
		if ( !premature ) dispatchEvent( new BTweenEvent( BTweenEvent.STOP ) );
		enterFrameDispatcher.removeEventListener( ENTER_FRAME, step );
		if ( updateListeners != null )
			for ( listener in updateListeners ) removeEventListener( BTweenEvent.UPDATE, listener );
		return this;
	}
	
	override public function update( listener : Dynamic ) : ISequenceable {
		if ( updateListeners == null ) updateListeners = [];
		updateListeners.push( listener );
		addEventListener( BTweenEvent.UPDATE, listener );
		return this;
	}
	
	override public function queue( ?obj : Dynamic = null, ?params : Dynamic  ) : ISequenceable {
		if ( obj == null ) {
			var tween;
			if ( params != null ) tween = new BTween( params );
			else tween = this.clone();
			super.queue( tween );
			return tween;
		}
		return super.queue( obj, params );
	}
	
	override public function back( trans : Dynamic = null ) : ISequenceable {
		if ( trans != null ) ease = trans;
		var prop : Dynamic;
		for ( prop in props )
		{
			var v = prop.targetValue;
			prop.targetValue = prop.initValue;
			prop.initValue = v;
		}
		return this;
	}
	
	public function clone() : BTween {
		var clone = new BTween();				
		clone.modifier = modifier; clone.modifierArgs = modifierArgs;
		clone.target = target; clone.ease = ease; clone.time = time;
		for ( prop in props ) clone.props[ clone.props.length ] = Reflect.copy( prop );
		return clone;
	}

	private function init() : Void {
		updateListeners = null;
		ease = DEFAULT_EASE;
		rounded = DEFAULT_ROUNDED;
		time = DEFAULT_TIME;
		props = [];
	}

	private function consume( args : Dynamic ) {
		if ( args != null ) {
			if ( Reflect.hasField( args, timeProp ) ) {
				time = args.time;
				Reflect.deleteField( args, timeProp );
			}
			if ( Reflect.hasField( args, easeProp ) ) {
				ease = args.ease;
				Reflect.deleteField( args, easeProp );
			}
			if ( Reflect.hasField( args, roundedProp ) ) {
				rounded = args.rounded;
				Reflect.deleteField( args, roundedProp );
			}
			if ( Reflect.hasField( args, targetProp ) ) {
				target = args.target;
				Reflect.deleteField( args, targetProp );
			}
			if ( Reflect.hasField( args, modifierProp ) ) {
				modifierArgs = [ {} ]; //persistence obj
				if ( !Std.is( args.mod, Array ) )
					modifier = args.mod;
				else {
					modifier = args.mod.shift();
					modifierArgs = modifierArgs.concat( args.mod );
				}
				Reflect.deleteField( args, modifierProp );
			}
			for ( arg in Reflect.fields( args ) ) props.push( { name : arg, targetValue : Reflect.field( args, arg ), initValue : 0 } );
		}
	}

	private function step( ?evt ) : Void {
		var t : Float = Lib.getTimer() - startTime;
		var index : Float;
		var finished : Bool = false;
		if ( t >= time ) {
			index = 1.0;
			finished = true;
		} else index = ease( t, 0.0, 1.0, time );

		if ( modifier != null ) {
			var stepArgs : Array<Dynamic> = [ index, rounded, target ];
			if ( modifierArgs != null ) stepArgs = stepArgs.concat( modifierArgs );
			Reflect.callMethod( null, modifier, stepArgs );
		}
		for ( prop in props ) {
			if ( rounded )
				Reflect.setField( target, prop.name, Math.round( prop.initValue + ( prop.targetValue - prop.initValue ) * index ) );
			else
				Reflect.setField( target, prop.name, prop.initValue + ( prop.targetValue - prop.initValue ) * index );
		}
		if ( finished ) stop();
	}

	override public function toString():String {
		var propsList : String = ""; Lambda.foreach( props, function( prop:BTweenProp ) : Bool { propsList += prop.name + "=" + prop.targetValue + ","; return true; } );
		return( "BTween: target:" + target + ",time=" + time + ",props:" + propsList + " modifier:" + modifier + ",modifierArgs:" + modifierArgs );
	}
}

typedef BTweenProp = {
	var name : String;
	var initValue : Int;
	var targetValue : Int;
}