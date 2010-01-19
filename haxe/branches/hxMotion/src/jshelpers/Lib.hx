/**
 * ...
 * @author pedromoraes@gmail.com
 */

package jshelpers;

class Lib extends js.Lib
{

	public static function getTimer() : Int
	{
		return Std.int( Date.now().getTime() );
	}
	
}