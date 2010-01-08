/* 
 * @author pedromoraes@gmail.com
 * 
 * Licensed under the MIT license: http://www.opensource.org/licenses/mit-license.php
 * */
package br.pedromoraes.btween;

import flash.Lib;
import flash.display.Sprite;
import flash.events.Event;
import br.pedromoraes.btween.properties.IProperty;

class BTween extends Sequenceable, implements ISequenceable
{

	public static var DEFAULT_TIME:Int = 300;
	public static var DEFAULT_TRANSITION:Dynamic = easeOut;
	public static var sprite:Sprite = new Sprite();
	public static var instances:List<BTween> = new List();

	public var tweens:List<Dynamic>;
	public var time:Int;
	public var delay:Int;
	public var name:String;
	public var transition:Dynamic;
	public var rounded:Bool;
	public var cloneOf:BTween;
	public var reversionPending:Bool;

	private var started:Bool;
	private var completed:Bool;
	private var startTime:Float;
	
	public function new(?time:Int, ?trans:Dynamic = null, ?delay:Int = 0, ?rounded:Bool = false, ?name:String = '')
	{
		super();
		this.time = time == null ? DEFAULT_TIME : time;
		this.transition = trans == null ? DEFAULT_TRANSITION : trans;
		this.rounded = rounded;
		this.delay = delay;
		this.name = name;
		this.tweens = new List();
	}


	/**
	 * <p>Creates a BTween instance - static shortcut for constructor.</p>
	 * Here to allow the uglyness of things such as BTween.make().start(something);	
	 * 
	 * @param piTime Tween duration
	 * @param pTransition Easing equation.
	 * @param piDelay Delay to start tweening
	 * @param pbRounded Use Math.round() on values
	 * 
	 * @return created instance
	 */
	public static function make(?piTime:Int, ?pTransition:Dynamic = null, ?piDelay:Int, ?pbRounded:Bool = false, ?psName:String = ''):BTween
	{
		return new BTween(piTime, pTransition, piDelay, pbRounded, psName);
	}

	private static function easeOut(t:Float, b:Float, c:Float, d:Float):Float {
		return -c * (t /= d) * (t - 2) + b;
	}

	/**
	 * Sets action (ISequenceable, delay or method) to be executed on the end of current tween. Numbers are
	 * turned into a Delay as if a new Delay(time in ms) was referred, and methods are turned into a new Call(method).
	 * 
	 * <p>Example:</p>
	 * <p>tween.queue(hideBall, ball); // executes a hideBall(ball); at the end of this tweening.</p>
	 * <p>tween.queue().back(); // enqueues a clone of itself, the reverses that. So, this performs a yo-yo behaviour.</p>
	 * <p>tween.queue(100).queue(tween2); // enqueues a delay of 100ms, the the ISequenceable tween2.</p>
	 * 
	 * @param pObj Dynamic to be placed in the queue 
	 * @param ... paParams arguments - might have diferent meanings, according to the enqueued type
	 * 
	 * @return this instance
	 */
	public override function queue(obj:Dynamic = null, ?params:Dynamic):ISequenceable
	{
		if (Std.is(obj, BTween) || obj == null)
		{
			var instance:BTween = obj == null ? this.clone() : obj;
			if ( Std.is( params, Array ) ) Reflect.callMethod( instance, instance.add, cast( params, Array<Dynamic> ) );
			addEventListener(BTweenEvent.COMPLETE, instance.start);
			return instance;
		}
		else if ( Std.is(obj, ISequenceable) )
		{
			addEventListener(BTweenEvent.COMPLETE, obj.start);
			return cast( obj, ISequenceable );
		}
		else if ( Reflect.isFunction( obj ) )
		{
			var call : Call;
			if ( Std.is( params, Array ) )
			{
				call = new Call( obj, params );
			}
			else if ( params != null )
			{
				call = new Call( obj, [ params ] );
			}
			else
			{
				call = new Call( obj );
			}
			addEventListener(BTweenEvent.COMPLETE, call.start);
			return call;
		}
		else if ( Std.is( obj, Int ) )
		{
			var delay:Delay = new Delay(cast(obj, Int));
			addEventListener(BTweenEvent.COMPLETE, delay.start);
			return delay;
		}
		return null;
		//else 
		//	return Reflect.callMethod( this, queue, [pObj].concat(paParams));
	}
	
	/**
	 * Starts this instance's transformations. Arguments are equivalent to an .add() call
	 *  
	 * @param ... paParams arguments - tweens to be put into queue prior to starting
	 * 
	 * @return this instance
	 * 
	 * @see add
	 */
	public override function start(?params:Dynamic):ISequenceable
	{
		if ( params == null || Std.is( params, BTweenEvent ) )
		{
			instances.push(this);
			completed = false;
			sprite.addEventListener(Event.ENTER_FRAME, update);
			startTime = Lib.getTimer();
			started = false;

			if (reversionPending)
			{
				copyReversedValues();
			}
			//update();
		}
		else
		{
			//var args : Array<Dynamic> = Std.is( params, Array ) ? params : [ params ];
			if ( started ) tweens.clear();
			Reflect.callMethod( this, add, [ params ] );
			start();
		}
		return this;
	}
	
	/**
	 * Stops the transformations. No further events will be dispathed also.
	 * 
	 * @return this instance
	 */
	public override function stop():ISequenceable
	{
		instances.remove(this);
		sprite.removeEventListener(Event.ENTER_FRAME, update);
		return this;
	}

	/**
	 * Reverses all transformations.
	 * 
	 * @param		pTransition		Easing method (if not provided, current will be kept)
	 * 
	 * @return this instance
	 */
	public override function back(pTransition:Dynamic = null):ISequenceable
	{
		transition = pTransition == null ? transition : pTransition;
		var tween:Dynamic,i:Int;
		for (tween in tweens)
		{
			if ( Reflect.field( tween, 'startValues' ) == null )
			{
				reversionPending = true;
			}
			else
			{
				if (Std.is(tween,IProperty))
				{
					tween.reverse();
				}
				else
				{
					tweens.remove(tween);
					tweens.add(reverse(tween));
				}
			}
		}
		return this;
	}

	public function addTarget(pTarget:Dynamic, ?paTweens:Dynamic):BTween
	{
		var laTweens:Array<Dynamic> = Std.is(paTweens, Array) ? paTweens : [ paTweens ];
		var tween:Dynamic;
		for (tween in laTweens)
		{
			var target:Dynamic = tween.target == null ? pTarget : tween.target;
			if (Std.is(target, Array))
			{
				Reflect.deleteField(tween, 'target');
				var t:Dynamic;
				for (t in cast(target,Array<Dynamic>))
					addTarget(t, tween);
			}
			else
			{
				tweens.push(Std.is(tween, IProperty) ? tween : prepare(pTarget, tween));
			}
		}

		return this;
	}

	/**
	 * Pushes transformations into the array. Dynamics must implement IProperty or, being dynamic have the proper format.
	 * 
	 * @param		paParams		Array of transformations
	 * 
	 * @return this instance
	 */
	public function addTargetArray(params:Array<Dynamic>):BTween
	{
		var t : Dynamic;
		for ( t in params ) tweens.add( t );
		return this;
	}

	/**
	 * Pushes transformations into the array. If the first param has a target property, the subsequent will assume
	 * that same target unless they specify their own
	 * 
	 * @param		... paParams (N) instances of IProperty implementations or Dynamic Dynamics with transformation specs
	 * 
	 * @return this instance
	 */
	public function add(?params:Dynamic):BTween
	{
		//var arr : Array<Dynamic> = Std.is( params, Array ) ? params : [ params ];
		//var obj : Dynamic = arr[ 0 ];
		if ( Std.is( params, Array ) )
			return addTargetArray( params );
		else
			return addTarget( params.target, params );
			
	}
	
	private function reverse(obj:Dynamic):Dynamic
	{
		var s:String;
		var res:Dynamic = {target:obj.target,startValues:{}};
		if (obj.startValues)
		{
			var fields : Array<String> = Reflect.fields( obj.startValues );
			for (s in fields)
			{
				if (isValidProperty(obj, s))
					Reflect.setField( res, s, Reflect.field( obj.startValues, s ) );
			}
			fields = Reflect.fields( obj );
			for (s in fields)
			{
				if (isValidProperty(obj, s))
					Reflect.setField( res, s, Reflect.field( obj, s ) );
			}
		}
		return res;
	}

	private function prepare(pTarget:Dynamic, pTween:Dynamic):Dynamic
	{
		
		var res:Dynamic = {};
		if (pTween.target!=null)
		{
			res.target = Std.is(pTween.target, Array) ? pTarget : pTween.target;
		}
		else
		{
			res.target = pTarget;
		}

		var fields : Array<String> = Reflect.fields( pTween );
		var s : String;
		for (s in fields)
		{
			if (isValidProperty(res.target, s))
			{
				Reflect.setField( res, s, Reflect.field( pTween, s ) );
			}
		}
		return res;
	}

	private function storeStartValues():Void
	{
		var tween : Dynamic;
		for ( tween in tweens )
		{
			if ( !Std.is( tween, IProperty ) )
			{
				tween.startValues = {};
				var s:String; var fields:Array<Dynamic> = Reflect.fields( tween );
				for (s in fields)
				{
					if (isValidProperty(tween, s) && tween.target != null)
					{
						Reflect.setField( tween.startValues, s, Reflect.field( tween.target, s ) );
					}
				}
			}
		}
	}

	private function copyReversedValues():Void
	{
		var tween : Dynamic;
		for ( tween in tweens )
		{
			if (!Std.is(tween, IProperty))
			{
				/*
				var s:String;
				var fields:Array<String> = Reflect.fields( tween );
				for (s in fields)
				{
					if (Std.is( cloneOf, BTween ))
					{
						if ( Reflect.field(cloneOf.tweens[i].startValues,s) != null)
							Reflect.setField( tween, s, Reflect.field(cloneOf.tweens[i].startValues,s) );
					}
				}
				Reflect.deleteField( tween, 'startValues' );
				*/
			}
			else
			{
				tween.reverse();
			}
		}
	}

	private function isValidProperty(pTween:Dynamic, s:String):Bool
	{
		if (s == 'target')
			return false;
		else if (pTween.hasOwnProperty(s))
			return !Math.isNaN(Std.parseFloat(Reflect.field(pTween,s)));
		else
			return false;	
	}

	public function update( ?evt ):Void
	{
		if (completed)
		{
			var completeEvt : BTweenEvent = new BTweenEvent( BTweenEvent.COMPLETE );
			dispatchEvent( completeEvt );
			stop();
		}
		
		var t : Float = Lib.getTimer() - (startTime + delay);
		if (t < 0) return;

		if (!started)
		{
			storeStartValues();
			var startEvt:BTweenEvent = new BTweenEvent(BTweenEvent.START);
			dispatchEvent(startEvt);
			started = true;
		}

		var tween : Dynamic;
		for ( tween in tweens )
		{
			if (Std.is(tween, IProperty))
			{
				tween.update(this, t);
			}
			else
			{
				var fields : Array<String> = Reflect.fields( tween );
				var prop:String;
				for (prop in fields)
				{
					if ( ( prop != 'startValues' ) && ( prop != 'target' ) && ( tween.target != null ) )
					{
						Reflect.setField( tween.target, prop, getValue( Reflect.field( tween.startValues, prop ), Reflect.field( tween, prop ), t) );
					}
				}
			}
		}

		if ( hasEventListener( BTweenEvent.UPDATE ) )
		{
			var updateEvt : BTweenEvent = new BTweenEvent( BTweenEvent.UPDATE );
			dispatchEvent(updateEvt);
		}

		if (t >= time)
		{
			completed = true;
		}
	}

	/**
	 * Get value applying selected easing equation
	 * 
	 * @param		pnStart		Transformation start time
	 * @param		pnTarget	Transformation target value
	 * @param		piElapsed	Transformation elapsed time 
	 * 
	 * @return		Result value
	 */
	public inline function getValue(pnStart:Float, pnTarget:Float, piElapsed:Float):Float
	{
		var result:Float,diff:Float;
		if (piElapsed >= time)
		{
			result = pnTarget;
		}
		else
		{
			diff = pnTarget - pnStart;
			result = transition(piElapsed, pnStart, diff, time);
		}
		return rounded ? Math.round(result) : result;
	}
	
	/**
	 * Clones this tween
	 * 
	 * @return		Cloned instance
	 */
	public function clone():BTween
	{
		var instance:BTween = new BTween(time, transition, delay, rounded);
		if ( name != null ) instance.name = name;
		var tween:Dynamic;
		for ( tween in tweens )
		{
			instance.tweens.add(Std.is(tween, IProperty) ? tween.clone() : copy(tween));
		}
		instance.cloneOf = this;
		return instance;
	}
	
	private function copy(obj:Dynamic):Dynamic
	{
		if (Std.is( obj, IProperty ) )
			return obj;
		else
		{
			var res:Dynamic = {};
			var fields:Array<String> = Reflect.fields( obj );
			var s:String;
			for (s in fields)
			{
				Reflect.setField( res, s, Reflect.field( obj, s ) );
			}
			return res;
		}
	}
	/**
	 * Should stop and free all used resources mkl
	 */
	public function dispose():Void
	{
		stop();
		tweens = null;
		transition = null;
		cloneOf = null;
	}
	
	public function toString():String
	{
		var lsDebugTargets:String = "";
		var tween:Dynamic;
		for (tween in tweens) lsDebugTargets += tween.target + " ";
		return("BTween: time=" + time + ",delay=" + delay + ",targets:" + lsDebugTargets);
	}

	
}