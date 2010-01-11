package hxmotion;

//inspired in Niel Drummond's work on sandyhx

#if flash10
typedef TypedArray<T> = flash.Vector<T>;
#else
typedef TypedArray<T> = Array<T>;
#end

#if flash
typedef FrameDispatcher = flash.display.Sprite;
typedef Lib = flash.Lib;
typedef EventDispatcher = flash.events.EventDispatcher;
typedef IEventDispatcher = flash.events.IEventDispatcher;
typedef Event = flash.events.Event;
#else
typedef EventDispatcher = neash.events.EventDispatcher;
typedef IEventDispatcher = neash.events.IEventDispatcher;
typedef FrameDispatcher = jshelpers.FrameDispatcher;
typedef Event = neash.events.Event;
typedef Lib = jshelpers.Lib;
#end

class CollectionHelper {
	public static inline function toTypedArray<T>(v : Array<T>) : TypedArray<T> {
	#if flash10
		return untyped __vector__(v);
	#else
		return v;
	#end
	}
}