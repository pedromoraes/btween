/**
 * ...
 * @author Pedro Moraes <pedromoraes@gmail.com>
 */

package hxmotion;

class Chain extends Sequenceable
{

	private var h : Array<Dynamic>;
	private var q : Array<Dynamic>;

	/**
		The number of elements in this list.
	**/
	public var length(default,null) : Int;

	/**
		Creates a new empty list.
	**/
	public function new() {
		super();
		length = 0;
	}
	
	override public function stop( ?premature : Bool = false ) : ISequenceable {
		var l = h;
		while( l != null ) {
			var v = l[0];
			l = l[1];
			v.stop( true );
		}
		return this;
	}
	
	override public function queue( ?obj : Dynamic = null, ?params : Dynamic ) : ISequenceable {
		if ( obj == null ) return clone();
		else if ( last() != null ) return last().queue( obj, params );
		else return null;
	}

	override public function back(trans:Dynamic = null) : ISequenceable
	{
		var c = new Chain();
		/*for ( item in this )
		{
			var clone = item.clone();
			clone.back( trans );
			c.add( clone );
		}*/
		return c;
	}
	
	public function clone() : Chain
	{
		var c = new Chain();
		for ( i in 0 ... length )
		{
			c.add( q[ i ] );
		}
		return c;
	}

	/**
		Add an element at the end of the list.
	**/
	public function add( item : ISequenceable ) {
		var x = [item];
		if( h == null )
			h = x;
		else
			q[1] = x;
		q = x;
		length++;
	}

	/**
		Push an element at the beginning of the list.
	**/
	public function push( item : ISequenceable ) {
		var x = [item, h];
		h = x;
		if( q == null )
			q = x;
		length++;
	}

	/**
		Returns the first element of the list, or null
		if the list is empty.
	**/
	public function first() : ISequenceable {
		return if( h == null ) null else h[0];
	}

	/**
		Returns the last element of the list, or null
		if the list is empty.
	**/
	public function last() : ISequenceable {
		return if( q == null ) null else q[0];
	}


	/**
		Removes the first element of the list and
		returns it or simply returns null if the
		list is empty.
	**/
	public function pop() : ISequenceable {
		if( h == null )
			return null;
		var x = h[0];
		h = h[1];
		if( h == null )
			q = null;
		length--;
		return x;
	}

	/**
		Tells if a list is empty.
	**/
	public function isEmpty() : Bool {
		return (h == null);
	}

	/**
		Makes the list empty.
	**/
	public function clear() : Void {
		h = null;
		q = null;
		length = 0;
	}

	/**
		Remove the first element that is [== v] from the list.
		Returns [true] if an element was removed, [false] otherwise.
	**/
	public function remove( v : ISequenceable ) : Bool {
		var prev = null;
		var l = h;
		while( l != null ) {
			if( l[0] == v ) {
				if( prev == null )
					h = l[1];
				else
					prev[1] = l[1];
				if( q == l )
					q = prev;
				length--;
				return true;
			}
			prev = l;
			l = l[1];
		}
		return false;
	}

	/**
		Returns an iterator on the elements of the list.
	**/
	public function iterator() : Iterator<ISequenceable> {
		return cast {
			h : h,
			hasNext : function() {
				return untyped (this.h != null);
			},
			next : function() {
				untyped {
					if( this.h == null )
						return null;
					var x = this.h[0];
					this.h = this.h[1];
					return x;
				}
			}
		}
	}

	/**
		Returns a displayable representation of the String.
	**/
	override public function toString() {
		var s = new StringBuf();
		var first = true;
		var l = h;
		s.add("{");
		while( l != null ) {
			if( first )
				first = false;
			else
				s.add(", ");
			s.add(l[0]);
			l = l[1];
		}
		s.add("}");
		return s.toString();
	}

	/**
		Join the element of the list by using the separator [sep].
	**/
	public function join(sep : String) {
		var s = new StringBuf();
		var first = true;
		var l = h;
		while( l != null ) {
			if( first )
				first = false;
			else
				s.add(sep);
			s.add(l[0]);
			l = l[1];
		}
		return s.toString();
	}

	/**
		Returns a list filtered with [f]. The returned list
		will contain all elements [x] for which [f(x) = true].
	**/
	public function filter( f : ISequenceable -> Bool ) {
		var l2 = new List();
		var l = h;
		while( l != null ) {
			var v = l[0];
			l = l[1];
			if( f(v) )
				l2.add(v);
		}
		return l2;
	}

	/**
		Returns a new list where all elements have been converted
		by the function [f].
	**/
	public function map<X>(f : ISequenceable -> X) : List<X> {
		var b = new List();
		var l = h;
		while( l != null ) {
			var v = l[0];
			l = l[1];
			b.add(f(v));
		}
		return b;
	}
	
}