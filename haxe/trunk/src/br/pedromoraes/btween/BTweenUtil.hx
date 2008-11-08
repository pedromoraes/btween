package br.pedromoraes.btween;

class BTweenUtil
{
	
	public static function stopTweens( ?filters : Array<Dynamic> ) : Void
	{
		var instance : BTween;
		if ( filters == null )
		{
			for ( instance in BTween.instances )
			{
				instance.stop();
			}
		}
		else
		{
			for ( instance in BTween.instances )
			{
				var match : Bool = false;
				var tween : Dynamic;
				for ( tween in instance.tweens )
				{
					if ( matchFilters( tween, filters ) )
					{
						match = true;
						return;
					}
				}
				
				if ( match ) instance.stop();
			}
		}
	}
	
	public static function stopTweensByName( name : String ) : Void
	{
		var instance : BTween;
		for ( instance in BTween.instances )
		{
			if ( instance.name == name ) instance.stop();
		}
	}
	
	public static function matchFilters( tween : Dynamic, filters : Array<Dynamic> ) : Bool
	{
		var filter : Dynamic;
		var match : Bool = true;
		for ( filter in filters )
		{
			var fields : Array<String> = Reflect.fields( filter );
			var field : String;
			for ( field in fields )
			{
				match = Reflect.field( filter, field ) == Reflect.field( tween, field );
			}
			if ( match ) break;
		}
		return match;
	}
}
