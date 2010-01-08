/**
 * ...
 * @author 
 */

package jsflash.display;
import haxe.Timer;
import js.Lib;

class Sprite extends neash.events.EventDispatcher
{

	public function new() : Void
	{
		super();
		dispatch();
	}
	
	private function dispatch() : Void
	{
		this.dispatchEvent( new flash.events.Event( 'enterFrame' ) );
		Timer.delay( dispatch, 25 );
	}
	
}