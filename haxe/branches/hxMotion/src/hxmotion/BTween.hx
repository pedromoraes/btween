/**
 * ...
 * @author 
 */

package hxmotion;
import hxmotion.events.BTweenEvent;
import flash.display.Sprite;
import flash.Lib;

class BTween extends Sequenceable {

	public static var DEFAULT_EASE : Dynamic = Ease.linear;
	public static var DEFAULT_TIME : Int = 300;
	public static var DEFAULT_ROUNDED : Bool = false;

	inline static var ENTER_FRAME : String = 'enterFrame';

	inline static var timeProp : String = 'time';
	inline static var easeProp : String = 'ease';
	inline static var modifierProp : String = 'modifier';
	inline static var argsProp : String = 'args';
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
		consume( args );
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

	private function init() : Void {
		updateListeners = null;
		ease = DEFAULT_EASE;
		rounded = DEFAULT_ROUNDED;
		time = DEFAULT_TIME;
		props = [];
	}

	private function consume( args : Dynamic ) {
		if ( args == null ) return;
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
			modifier = args.modifier;
			Reflect.deleteField( args, modifierProp );
			if ( Reflect.hasField( args, argsProp ) ) {
				modifierArgs = args.args;
				Reflect.deleteField( args, argsProp );
			}
		}
		for ( arg in Reflect.fields( args ) ) props.push( { name : arg, targetValue : Reflect.field( args, arg ), initValue : 0 } );
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
			var stepArgs : Array<Dynamic> = [ index, rounded ];
			Reflect.callMethod( null, modifier, modifierArgs );
		}
		for ( prop in props ) {
			if ( rounded )
				Reflect.setField( target, prop.name, Math.round( prop.initValue + ( prop.targetValue - prop.initValue ) * index ) );
			else
				Reflect.setField( target, prop.name, prop.initValue + ( prop.targetValue - prop.initValue ) * index );
		}
		if ( finished )
			stop();
	}

	override public function toString():String {
		return( "BTween: time=" + time + ",props=" + props + ",modifier:" + modifier + ",modifierArgs:" + modifierArgs );
	}
}

typedef BTweenProp = {
	var name : String;
	var initValue : Int;
	var targetValue : Int;
}