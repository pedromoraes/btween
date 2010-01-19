/**
 * ...
 * @author pedromoraes@gmail.com
 */

package jshelpers;
import haxe.Timer;
import hxmotion.Types;

class FrameDispatcher extends EventDispatcher
{

	public function new() : Void
	{
		super();
		dispatch();
	}
	
	private function dispatch() : Void
	{
		this.dispatchEvent( new Event( 'enterFrame' ) );
		Timer.delay( dispatch, 25 );
	}
	
}