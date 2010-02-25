/**
 * ...
 * @author pedromoraes@gmail.com
 * 
 * Licensed under the MIT license: http://www.opensource.org/licenses/mit-license.php
 */

package hxmotion;

import hxmotion.events.BTweenEvent;
import hxmotion.Types;

class BTween extends Sequenceable {

	public static var DEFAULT_EASE : Dynamic = Ease.linear;
	public static var DEFAULT_TIME : Int = 300;
	public static var DEFAULT_ROUNDED : Bool = false;

	inline static var ENTER_FRAME : String = 'enterFrame';
	inline static var FLAG_MODARGS_REVERSION : String = '__reversion_pending';
	inline static var timeProp : String = 'time';
	inline static var easeProp : String = 'ease';
	inline static var modifierProp : String = 'mod';
	inline static var roundedProp : String = 'rounded';
	inline static var targetProp : String = 'target';
	inline static var fromProp : String = 'from';

	public var ease : Dynamic;
	public var rounded : Bool;
	public var target : Dynamic;
	public var time : Int;
	public var props : TypedArray<BTweenProp>;
	public var modifier : Dynamic;
	public var modifierArgs : Dynamic;
	public var fromProps : Dynamic;

	var startTime : Int;
	var updateListeners : TypedArray<Dynamic>;

	public static var enterFrameDispatcher : FrameDispatcher = new FrameDispatcher();

	public function new( ?args : Dynamic ) {
		super();
		init();
		consume( args );
	}

	override public function start( ?args : Dynamic ) : ISequenceable {
		if ( args != null && !Std.is( args, BTweenEvent ) ) consume( args );
		startTime = Lib.getTimer();		
		for ( prop in Reflect.fields( fromProps ) )
			Reflect.setField( target, prop, Reflect.field( fromProps, prop ) );
		for ( prop in props )
			prop.initValue = Reflect.field( target, prop.name );
		if ( modifier != null && Reflect.field( modifierArgs, FLAG_MODARGS_REVERSION ) != null )
			reverseModArgs( modifierArgs, true );
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
		if ( updateListeners == null ) updateListeners = new TypedArray<Dynamic>();
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
		if ( modifier )
		{
			if ( Reflect.field( modifierArgs, 'initValue' ) == null )
			{
				Reflect.setField( modifierArgs, FLAG_MODARGS_REVERSION, true );
			}
			else
			{
				reverseModArgs( modifierArgs );
			}
		}
		return this;
	}
	
	private function reverseModArgs( args : Dynamic, ?deleteFlag : Bool = false ) : Void
	{
		if ( deleteFlag ) Reflect.deleteField( args, FLAG_MODARGS_REVERSION );
		for ( s in Reflect.fields( args ) )
		{
			if ( s != 'initValue' && Reflect.field( args.initValue, s ) != null )
			{
				var value = Reflect.field( args, s );
				Reflect.setField( args, s, Reflect.field( args.initValue, s ) );
				Reflect.setField( args.initValue, s, value );
			}
		}
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
		props = new TypedArray<BTweenProp>();
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
			if ( Reflect.hasField( args, fromProp ) ) {
				fromProps = args.from;
				Reflect.deleteField( args, fromProp );
			}
			if ( Reflect.hasField( args, modifierProp ) ) {
				if ( !Std.is( args.mod, Array ) ) {
					modifier = args.mod;
					modifierArgs = [ { } ];
				} else {
					modifier = args.mod[ 0 ];
					modifierArgs = args.mod[ 1 ];
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

		if ( modifier != null )
			Reflect.callMethod( null, modifier, [ index, rounded, target, modifierArgs ] );

		for ( prop in props ) {
			if ( rounded )
				Reflect.setField( target, prop.name, Math.round( prop.initValue + ( prop.targetValue - prop.initValue ) * index ) );
			else
				Reflect.setField( target, prop.name, prop.initValue + ( prop.targetValue - prop.initValue ) * index );
		}
		if ( updateListeners != null ) dispatchEvent( new BTweenEvent( BTweenEvent.UPDATE ) );
		if ( finished ) stop();
	}

	override public function toString():String {
		//var propsList : String = ""; Lambda.foreach( props, function( prop:BTweenProp ) : Bool { propsList += prop.name + "=" + prop.targetValue + ","; return true; } );
		return( "BTween: target:" + target + ",time=" + time + ",modifier:" + modifier + ",modifierArgs:" + modifierArgs );
	}
}

typedef BTweenProp = {
	var name : String;
	var initValue : Int;
	var targetValue : Int;
}