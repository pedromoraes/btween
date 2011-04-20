package
{
	import br.pedromoraes.btween.Delay;

	public function delay( time : int = 0 ) : Delay
	{
		return new Delay( time );
	}
}