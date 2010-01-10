package;

import haxe.Log;
import hxmotion.BTween;
import hxmotion.Ease;
import hxmotion.events.BTweenEvent;
import flash.display.Sprite;
import flash.Lib;
import haxe.FastList;

using hxmotion.shortcuts.HXm;
/**
 * ...
 * @author 
 */

class MainSWF extends Sprite
{
	
	static function main() 
	{
		Lib.current.addChild( new MainSWF() );
	}
	
	function new()
	{
		super();
		this.graphics.beginFill( 0xff0000, 1 );
		this.graphics.drawCircle( 100, 10, 10 );
		this.graphics.endFill();
		BTween.DEFAULT_EASE = Ease.inOutCubic;
		
		this.tween( { time:2000, x:400 } ).start()
		.queue().back() 
		.queue( Log.trace, "despues" );
		
	}

	private function typeTests() : Void
	{
		var t = Lib.getTimer;
		var size : Int = 99;
		var p : String;
		var stuffClass : Array<Thing> = [];
		var initY : Int = t();
		for ( i in 0...size )
		{
			stuffClass.push( new Thing( "thing", 1000 ) );
		}
		trace( 'class create' );
		trace( t() - initY );
		initY = t();
		
		for ( i in 0...size )
		{
			stuffClass[ i ].name;
		}
		trace( 'class access' );
		trace( t() - initY );
		initY = t();
	
		var stuffTD : Array<ThingTD> = [];
		for ( i in 0...size )
		{
			var t : ThingTD = { name : "thing", years : 1000 };
			stuffTD.push( t );
		}
		trace( 'td create' );
		trace( t() - initY );
		initY = t();	
		
		
		for ( i in 0...size )
		{
			stuffTD[ i ].name;
		}
		trace( 'class access' );
		trace( t() - initY );
		initY = t();
	}
	
	private function collectionTests() : Void
	{
		var t = Lib.getTimer;
		var size : Int = 9999;
		var p : String;
		
		var initY : Int = t();
		var bigtimearr : Array<String> = new Array();
		for ( i in 0...size )
		{
			bigtimearr[i]= "HOOO" ;
		}
		trace( 'arr create' );
		trace( t() - initY );
		initY = t();
		
		for ( i in 0...size )
		{
			p = bigtimearr[ i ];
		}
		trace( 'arr iterate' );
		trace( t() - initY );
		initY = t();
		
		for ( s in bigtimearr )
		{
			p = s;
		}
		trace( 'arr iterate2' );
		trace( t() - initY );
		initY = t();
		
		var bigtimelist : FastList<String> = new FastList<String>();
		for ( i in 0...size )
		{
			bigtimelist.add("HOOO");
		}
		trace( 'list create' );
		trace( t() - initY );
		initY = t();
		
		for ( s in bigtimelist )
		{
			p = s;
		}
		trace( 'list iterate' );
		trace( t() - initY );
		initY = t();
		
		//
		//var bigtimev : flash.Vector<String> = new flash.Vector( size );
		//for ( i in 0...size )
		//{
			//bigtimev[i] = "go";
		//}
		//trace( 'V create' );
		//trace( t() - initY );
		//initY = t();
		//
		//for ( i in 0...size )
		//{
			//p = bigtimev[ i ];
		//}
		//trace( 'V iterate' );
		//trace( t() - initY );
		//initY = t();
	}
	
}

typedef ThingTD = {
	var name : String;
	var years : Int;
}

class Thing {
	public var name : String;
	public var years : Int;
	public function new( name : String, years : Int ) 
	{
		this.name = name;
		this.years = years;
	}
}