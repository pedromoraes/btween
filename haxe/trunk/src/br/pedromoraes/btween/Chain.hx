package br.pedromoraes.btween;
import flash.net.IDynamicPropertyOutput;

class Chain extends Sequenceable, implements ISequenceable
{

	public var list(getList, setList):Array<Dynamic>;
	private var _list:Array<Dynamic>;
	
	public function new(paList:Array<Dynamic>)
	{
		super();
		list = paList;
	}

	private function getList():Array<Dynamic>
	{
		return _list;
	}

	private function setList(paList:Array<Dynamic>):Array<Dynamic>
	{
		_list = paList;
		recurse(_list);
		return _list;
	}

	public override function start(?params:Dynamic):ISequenceable
	{
		if ( Std.is( params, Array ) )
		{
			list = cast( params, Array<Dynamic> );
		}
		if (_list.length > 0)
		{
			_list[0].start();
			dispatchEvent( new BTweenEvent( BTweenEvent.START ) );
		}
		return this;
	}
	
	public override function stop() : ISequenceable
	{
		var item : ISequenceable = null;
		var current : ISequenceable = this;  
		for ( i in 0 ... _list.length )
		{
			item = _list[i];
			current.removeEventListener(BTweenEvent.COMPLETE, item.start);
			item.removeEventListener(BTweenEvent.UPDATE, onUpdate);
			item.stop();
			current = item;
		}
		if ( item != null ) item.removeEventListener(BTweenEvent.COMPLETE, onComplete);
		return this;
	}
	
	private function recurse(paList:Array<Dynamic>, pStarter:ISequenceable = null):ISequenceable
	{
		var l:Array<Dynamic> = paList;
		var item:Dynamic = null;
		var current:ISequenceable = pStarter;  
		for ( i in 0 ... l.length )
		{
			item = l[i];
			if (Reflect.isFunction(item))
			{
				item = new Call(item, []);
			}
			else if (Std.is(item, Float) || Std.is(item, Int))
			{
				item = new Delay( item );
			}
			else if (Std.is( item, Array ) )
			{
				item = recurse(item, current != null ? current : this); 
			}

			if (Std.is( item, ISequenceable ))
			{
				item.addEventListener(BTweenEvent.UPDATE, onUpdate);
				if ( pStarter != null )
				{
					pStarter.queue(item);
				}
				else if ( current != null )
				{
					current.queue(item);
				}
				current = item;
			}
			l[i] = item;
		}
		if ( item != null ) item.addEventListener(BTweenEvent.COMPLETE, onComplete);
		return item;
	}
	
	private function onUpdate(pEvt:BTweenEvent):Void
	{
		dispatchEvent(new BTweenEvent(BTweenEvent.UPDATE));
	}
	
	private function onComplete(pEvt:BTweenEvent):Void
	{
		dispatchEvent(new BTweenEvent(BTweenEvent.COMPLETE));
	}

}
