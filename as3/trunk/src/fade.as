package
{
	import br.pedromoraes.btween.BTween;
	import br.pedromoraes.btween.properties.color.FadeProperty;
	import flash.display.DisplayObject;

	public function fade( target : DisplayObject, value : Number, time : int = -1, transition : Function = null, delay : int = 0, rounded : Boolean = false, name : String = "" ) : BTween
	{
		return new BTween( time, transition, delay, rounded, name ).add( new FadeProperty( target, value ) );
	}
}