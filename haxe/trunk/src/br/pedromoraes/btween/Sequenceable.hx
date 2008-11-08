package br.pedromoraes.btween;

import br.pedromoraes.events.HxEventDispatcher;

class Sequenceable extends HxEventDispatcher, implements ISequenceable
{

	public function start(?params:Dynamic):ISequenceable
	{
		return null;
	}

	public function change(params:Dynamic):ISequenceable
	{
		var fields : Array<String> = Reflect.fields( params );
		var field : String;
		for ( fields in fields )
		{
			//this[lsProp] = pParams[lsProp];
		}
		return this;
	}

	public function back(trans:Dynamic = null):ISequenceable
	{
		return null;
	}
	
	public function stop():ISequenceable
	{
		return null;
	}

	public function queue(?obj:Dynamic = null, ?params : Dynamic):ISequenceable
	{
		if ( Std.is(obj, ISequenceable) )
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
	}
	
}