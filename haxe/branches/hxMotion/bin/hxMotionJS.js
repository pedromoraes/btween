$estr = function() { return js.Boot.__string_rec(this,''); }
Reflect = function() { }
Reflect.__name__ = ["Reflect"];
Reflect.hasField = function(o,field) {
	$s.push("Reflect::hasField");
	var $spos = $s.length;
	if(o.hasOwnProperty != null) {
		var $tmp = o.hasOwnProperty(field);
		$s.pop();
		return $tmp;
	}
	var arr = Reflect.fields(o);
	{ var $it0 = arr.iterator();
	while( $it0.hasNext() ) { var t = $it0.next();
	if(t == field) {
		$s.pop();
		return true;
	}
	}}
	{
		$s.pop();
		return false;
	}
	$s.pop();
}
Reflect.field = function(o,field) {
	$s.push("Reflect::field");
	var $spos = $s.length;
	var v = null;
	try {
		v = o[field];
	}
	catch( $e1 ) {
		{
			var e = $e1;
			{
				$e = [];
				while($s.length >= $spos) $e.unshift($s.pop());
				$s.push($e[0]);
				null;
			}
		}
	}
	{
		$s.pop();
		return v;
	}
	$s.pop();
}
Reflect.setField = function(o,field,value) {
	$s.push("Reflect::setField");
	var $spos = $s.length;
	o[field] = value;
	$s.pop();
}
Reflect.callMethod = function(o,func,args) {
	$s.push("Reflect::callMethod");
	var $spos = $s.length;
	{
		var $tmp = func.apply(o,args);
		$s.pop();
		return $tmp;
	}
	$s.pop();
}
Reflect.fields = function(o) {
	$s.push("Reflect::fields");
	var $spos = $s.length;
	if(o == null) {
		var $tmp = new Array();
		$s.pop();
		return $tmp;
	}
	var a = new Array();
	if(o.hasOwnProperty) {
		
					for(var i in o)
						if( o.hasOwnProperty(i) )
							a.push(i);
				;
	}
	else {
		var t;
		try {
			t = o.__proto__;
		}
		catch( $e2 ) {
			{
				var e = $e2;
				{
					$e = [];
					while($s.length >= $spos) $e.unshift($s.pop());
					$s.push($e[0]);
					t = null;
				}
			}
		}
		if(t != null) o.__proto__ = null;
		
					for(var i in o)
						if( i != "__proto__" )
							a.push(i);
				;
		if(t != null) o.__proto__ = t;
	}
	{
		$s.pop();
		return a;
	}
	$s.pop();
}
Reflect.isFunction = function(f) {
	$s.push("Reflect::isFunction");
	var $spos = $s.length;
	{
		var $tmp = typeof(f) == "function" && f.__name__ == null;
		$s.pop();
		return $tmp;
	}
	$s.pop();
}
Reflect.compare = function(a,b) {
	$s.push("Reflect::compare");
	var $spos = $s.length;
	{
		var $tmp = ((a == b)?0:((((a) > (b))?1:-1)));
		$s.pop();
		return $tmp;
	}
	$s.pop();
}
Reflect.compareMethods = function(f1,f2) {
	$s.push("Reflect::compareMethods");
	var $spos = $s.length;
	if(f1 == f2) {
		$s.pop();
		return true;
	}
	if(!Reflect.isFunction(f1) || !Reflect.isFunction(f2)) {
		$s.pop();
		return false;
	}
	{
		var $tmp = f1.scope == f2.scope && f1.method == f2.method && f1.method != null;
		$s.pop();
		return $tmp;
	}
	$s.pop();
}
Reflect.isObject = function(v) {
	$s.push("Reflect::isObject");
	var $spos = $s.length;
	if(v == null) {
		$s.pop();
		return false;
	}
	var t = typeof(v);
	{
		var $tmp = (t == "string" || (t == "object" && !v.__enum__) || (t == "function" && v.__name__ != null));
		$s.pop();
		return $tmp;
	}
	$s.pop();
}
Reflect.deleteField = function(o,f) {
	$s.push("Reflect::deleteField");
	var $spos = $s.length;
	if(!Reflect.hasField(o,f)) {
		$s.pop();
		return false;
	}
	delete(o[f]);
	{
		$s.pop();
		return true;
	}
	$s.pop();
}
Reflect.copy = function(o) {
	$s.push("Reflect::copy");
	var $spos = $s.length;
	var o2 = { }
	{
		var _g = 0, _g1 = Reflect.fields(o);
		while(_g < _g1.length) {
			var f = _g1[_g];
			++_g;
			o2[f] = Reflect.field(o,f);
		}
	}
	{
		$s.pop();
		return o2;
	}
	$s.pop();
}
Reflect.makeVarArgs = function(f) {
	$s.push("Reflect::makeVarArgs");
	var $spos = $s.length;
	{
		var $tmp = function() {
			$s.push("Reflect::makeVarArgs@378");
			var $spos = $s.length;
			var a = new Array();
			{
				var _g1 = 0, _g = arguments.length;
				while(_g1 < _g) {
					var i = _g1++;
					a.push(arguments[i]);
				}
			}
			{
				var $tmp = f(a);
				$s.pop();
				return $tmp;
			}
			$s.pop();
		}
		$s.pop();
		return $tmp;
	}
	$s.pop();
}
Reflect.prototype.__class__ = Reflect;
if(typeof neash=='undefined') neash = {}
if(!neash.events) neash.events = {}
neash.events.IEventDispatcher = function() { }
neash.events.IEventDispatcher.__name__ = ["neash","events","IEventDispatcher"];
neash.events.IEventDispatcher.prototype.RemoveByID = null;
neash.events.IEventDispatcher.prototype.addEventListener = null;
neash.events.IEventDispatcher.prototype.dispatchEvent = null;
neash.events.IEventDispatcher.prototype.hasEventListener = null;
neash.events.IEventDispatcher.prototype.removeEventListener = null;
neash.events.IEventDispatcher.prototype.willTrigger = null;
neash.events.IEventDispatcher.prototype.__class__ = neash.events.IEventDispatcher;
neash.events.EventDispatcher = function(target) { if( target === $_ ) return; {
	$s.push("neash.events.EventDispatcher::new");
	var $spos = $s.length;
	if(this.mTarget != null) this.mTarget = target;
	else this.mTarget = this;
	this.mEventMap = new Hash();
	$s.pop();
}}
neash.events.EventDispatcher.__name__ = ["neash","events","EventDispatcher"];
neash.events.EventDispatcher.prototype.DispatchCompleteEvent = function() {
	$s.push("neash.events.EventDispatcher::DispatchCompleteEvent");
	var $spos = $s.length;
	var evt = new neash.events.Event(neash.events.Event.COMPLETE);
	this.dispatchEvent(evt);
	$s.pop();
}
neash.events.EventDispatcher.prototype.DispatchIOErrorEvent = function() {
	$s.push("neash.events.EventDispatcher::DispatchIOErrorEvent");
	var $spos = $s.length;
	var evt = new neash.events.IOErrorEvent(neash.events.IOErrorEvent.IO_ERROR);
	this.dispatchEvent(evt);
	$s.pop();
}
neash.events.EventDispatcher.prototype.DumpListeners = function() {
	$s.push("neash.events.EventDispatcher::DumpListeners");
	var $spos = $s.length;
	haxe.Log.trace(this.mEventMap,{ fileName : "EventDispatcher.hx", lineNumber : 154, className : "neash.events.EventDispatcher", methodName : "DumpListeners"});
	$s.pop();
}
neash.events.EventDispatcher.prototype.RemoveByID = function(inType,inID) {
	$s.push("neash.events.EventDispatcher::RemoveByID");
	var $spos = $s.length;
	if(!this.mEventMap.exists(inType)) {
		$s.pop();
		return;
	}
	var list = this.mEventMap.get(inType);
	{
		var _g1 = 0, _g = list.length;
		while(_g1 < _g) {
			var i = _g1++;
			if(list[i].mID == inID) {
				list.splice(i,1);
				{
					$s.pop();
					return;
				}
			}
		}
	}
	$s.pop();
}
neash.events.EventDispatcher.prototype.addEventListener = function(type,inListener,useCapture,inPriority,useWeakReference) {
	$s.push("neash.events.EventDispatcher::addEventListener");
	var $spos = $s.length;
	var capture = (useCapture == null?false:useCapture);
	var priority = (inPriority == null?0:inPriority);
	var list = this.mEventMap.get(type);
	if(list == null) {
		list = new Array();
		this.mEventMap.set(type,list);
	}
	var l = new neash.events.Listener(inListener,capture,priority);
	list.push(l);
	{
		var $tmp = l.mID;
		$s.pop();
		return $tmp;
	}
	$s.pop();
}
neash.events.EventDispatcher.prototype.dispatchEvent = function(event) {
	$s.push("neash.events.EventDispatcher::dispatchEvent");
	var $spos = $s.length;
	if(event.target == null) event.target = this.mTarget;
	var list = this.mEventMap.get(event.type);
	var capture = event.eventPhase == neash.events.EventPhase.CAPTURING_PHASE;
	if(list != null) {
		var idx = 0;
		while(idx < list.length) {
			var listener = list[idx];
			if(listener.mUseCapture == capture) {
				listener.dispatchEvent(event);
				if(event.IsCancelledNow()) {
					$s.pop();
					return true;
				}
			}
			if(idx < list.length && listener != list[idx]) null;
			else idx++;
		}
		{
			$s.pop();
			return true;
		}
	}
	{
		$s.pop();
		return false;
	}
	$s.pop();
}
neash.events.EventDispatcher.prototype.hasEventListener = function(type) {
	$s.push("neash.events.EventDispatcher::hasEventListener");
	var $spos = $s.length;
	{
		var $tmp = this.mEventMap.exists(type);
		$s.pop();
		return $tmp;
	}
	$s.pop();
}
neash.events.EventDispatcher.prototype.mEventMap = null;
neash.events.EventDispatcher.prototype.mTarget = null;
neash.events.EventDispatcher.prototype.removeEventListener = function(type,listener,inCapture) {
	$s.push("neash.events.EventDispatcher::removeEventListener");
	var $spos = $s.length;
	if(!this.mEventMap.exists(type)) {
		$s.pop();
		return;
	}
	var list = this.mEventMap.get(type);
	var capture = (inCapture == null?false:inCapture);
	{
		var _g1 = 0, _g = list.length;
		while(_g1 < _g) {
			var i = _g1++;
			if(list[i].Is(listener,capture)) {
				list.splice(i,1);
				{
					$s.pop();
					return;
				}
			}
		}
	}
	$s.pop();
}
neash.events.EventDispatcher.prototype.willTrigger = function(type) {
	$s.push("neash.events.EventDispatcher::willTrigger");
	var $spos = $s.length;
	{
		var $tmp = this.hasEventListener(type);
		$s.pop();
		return $tmp;
	}
	$s.pop();
}
neash.events.EventDispatcher.prototype.__class__ = neash.events.EventDispatcher;
neash.events.EventDispatcher.__interfaces__ = [neash.events.IEventDispatcher];
if(typeof jshelpers=='undefined') jshelpers = {}
jshelpers.FrameDispatcher = function(p) { if( p === $_ ) return; {
	$s.push("jshelpers.FrameDispatcher::new");
	var $spos = $s.length;
	neash.events.EventDispatcher.apply(this,[]);
	this.dispatch();
	$s.pop();
}}
jshelpers.FrameDispatcher.__name__ = ["jshelpers","FrameDispatcher"];
jshelpers.FrameDispatcher.__super__ = neash.events.EventDispatcher;
for(var k in neash.events.EventDispatcher.prototype ) jshelpers.FrameDispatcher.prototype[k] = neash.events.EventDispatcher.prototype[k];
jshelpers.FrameDispatcher.prototype.dispatch = function() {
	$s.push("jshelpers.FrameDispatcher::dispatch");
	var $spos = $s.length;
	this.dispatchEvent(new neash.events.Event("enterFrame"));
	haxe.Timer.delay($closure(this,"dispatch"),33);
	$s.pop();
}
jshelpers.FrameDispatcher.prototype.__class__ = jshelpers.FrameDispatcher;
if(typeof haxe=='undefined') haxe = {}
haxe.Log = function() { }
haxe.Log.__name__ = ["haxe","Log"];
haxe.Log.trace = function(v,infos) {
	$s.push("haxe.Log::trace");
	var $spos = $s.length;
	js.Boot.__trace(v,infos);
	$s.pop();
}
haxe.Log.clear = function() {
	$s.push("haxe.Log::clear");
	var $spos = $s.length;
	js.Boot.__clear_trace();
	$s.pop();
}
haxe.Log.prototype.__class__ = haxe.Log;
if(typeof hxmotion=='undefined') hxmotion = {}
hxmotion.ISequenceable = function() { }
hxmotion.ISequenceable.__name__ = ["hxmotion","ISequenceable"];
hxmotion.ISequenceable.prototype.back = null;
hxmotion.ISequenceable.prototype.chain = null;
hxmotion.ISequenceable.prototype.change = null;
hxmotion.ISequenceable.prototype.dontRecycle = null;
hxmotion.ISequenceable.prototype.hold = null;
hxmotion.ISequenceable.prototype.next = null;
hxmotion.ISequenceable.prototype.previous = null;
hxmotion.ISequenceable.prototype.queue = null;
hxmotion.ISequenceable.prototype.start = null;
hxmotion.ISequenceable.prototype.stop = null;
hxmotion.ISequenceable.prototype.update = null;
hxmotion.ISequenceable.prototype.__class__ = hxmotion.ISequenceable;
hxmotion.ISequenceable.__interfaces__ = [neash.events.IEventDispatcher];
neash.events.Event = function(inType,inBubbles,inCancelable) { if( inType === $_ ) return; {
	$s.push("neash.events.Event::new");
	var $spos = $s.length;
	if(inCancelable == null) inCancelable = false;
	if(inBubbles == null) inBubbles = false;
	this.type = inType;
	this.bubbles = inBubbles;
	this.cancelable = inCancelable;
	this.mIsCancelled = false;
	this.mIsCancelledNow = false;
	this.target = null;
	this.currentTarget = null;
	this.eventPhase = neash.events.EventPhase.AT_TARGET;
	$s.pop();
}}
neash.events.Event.__name__ = ["neash","events","Event"];
neash.events.Event.prototype.IsCancelled = function() {
	$s.push("neash.events.Event::IsCancelled");
	var $spos = $s.length;
	{
		var $tmp = this.mIsCancelled;
		$s.pop();
		return $tmp;
	}
	$s.pop();
}
neash.events.Event.prototype.IsCancelledNow = function() {
	$s.push("neash.events.Event::IsCancelledNow");
	var $spos = $s.length;
	{
		var $tmp = this.mIsCancelledNow;
		$s.pop();
		return $tmp;
	}
	$s.pop();
}
neash.events.Event.prototype.SetPhase = function(inPhase) {
	$s.push("neash.events.Event::SetPhase");
	var $spos = $s.length;
	this.eventPhase = inPhase;
	$s.pop();
}
neash.events.Event.prototype.bubbles = null;
neash.events.Event.prototype.cancelable = null;
neash.events.Event.prototype.clone = function() {
	$s.push("neash.events.Event::clone");
	var $spos = $s.length;
	{
		var $tmp = new neash.events.Event(this.type,this.bubbles,this.cancelable);
		$s.pop();
		return $tmp;
	}
	$s.pop();
}
neash.events.Event.prototype.currentTarget = null;
neash.events.Event.prototype.eventPhase = null;
neash.events.Event.prototype.mIsCancelled = null;
neash.events.Event.prototype.mIsCancelledNow = null;
neash.events.Event.prototype.stopImmediatePropagation = function() {
	$s.push("neash.events.Event::stopImmediatePropagation");
	var $spos = $s.length;
	if(this.cancelable) this.mIsCancelledNow = this.mIsCancelled = true;
	$s.pop();
}
neash.events.Event.prototype.stopPropagation = function() {
	$s.push("neash.events.Event::stopPropagation");
	var $spos = $s.length;
	if(this.cancelable) this.mIsCancelled = true;
	$s.pop();
}
neash.events.Event.prototype.target = null;
neash.events.Event.prototype.toString = function() {
	$s.push("neash.events.Event::toString");
	var $spos = $s.length;
	{
		$s.pop();
		return "Event";
	}
	$s.pop();
}
neash.events.Event.prototype.type = null;
neash.events.Event.prototype.__class__ = neash.events.Event;
if(!hxmotion.events) hxmotion.events = {}
hxmotion.events.BTweenEvent = function(type,bubbles,cancelable) { if( type === $_ ) return; {
	$s.push("hxmotion.events.BTweenEvent::new");
	var $spos = $s.length;
	if(cancelable == null) cancelable = false;
	if(bubbles == null) bubbles = false;
	neash.events.Event.apply(this,[type,bubbles,cancelable]);
	$s.pop();
}}
hxmotion.events.BTweenEvent.__name__ = ["hxmotion","events","BTweenEvent"];
hxmotion.events.BTweenEvent.__super__ = neash.events.Event;
for(var k in neash.events.Event.prototype ) hxmotion.events.BTweenEvent.prototype[k] = neash.events.Event.prototype[k];
hxmotion.events.BTweenEvent.prototype.clone = function() {
	$s.push("hxmotion.events.BTweenEvent::clone");
	var $spos = $s.length;
	{
		var $tmp = new hxmotion.events.BTweenEvent(this.type,this.bubbles,this.cancelable);
		$s.pop();
		return $tmp;
	}
	$s.pop();
}
hxmotion.events.BTweenEvent.prototype.__class__ = hxmotion.events.BTweenEvent;
MainJS = function() { }
MainJS.__name__ = ["MainJS"];
MainJS.main = function() {
	$s.push("MainJS::main");
	var $spos = $s.length;
	js.Lib.window.onload = $closure(MainJS,"init");
	$s.pop();
}
MainJS.init = function(e) {
	$s.push("MainJS::init");
	var $spos = $s.length;
	var div = js.Lib.document.getElementById("square");
	div.style.top = "0px";
	hxmotion.Shortcuts.tween(div.style,{ ease : $closure(hxmotion.Ease,"inCirc"), time : 300, mod : [$closure(hxmotion.modifiers.CSS,"pos"),{ top : 300}]}).start().update($closure(haxe.Log,"trace")).queue(hxmotion.Shortcuts.tween(div.style,[{ time : 300, mod : [$closure(hxmotion.modifiers.CSS,"pos"),{ top : 100}]}])).queue($closure(haxe.Log,"trace"),"done, callback");
	$s.pop();
}
MainJS.prototype.__class__ = MainJS;
StringBuf = function(p) { if( p === $_ ) return; {
	$s.push("StringBuf::new");
	var $spos = $s.length;
	this.b = new Array();
	$s.pop();
}}
StringBuf.__name__ = ["StringBuf"];
StringBuf.prototype.add = function(x) {
	$s.push("StringBuf::add");
	var $spos = $s.length;
	this.b[this.b.length] = x;
	$s.pop();
}
StringBuf.prototype.addChar = function(c) {
	$s.push("StringBuf::addChar");
	var $spos = $s.length;
	this.b[this.b.length] = String.fromCharCode(c);
	$s.pop();
}
StringBuf.prototype.addSub = function(s,pos,len) {
	$s.push("StringBuf::addSub");
	var $spos = $s.length;
	this.b[this.b.length] = s.substr(pos,len);
	$s.pop();
}
StringBuf.prototype.b = null;
StringBuf.prototype.toString = function() {
	$s.push("StringBuf::toString");
	var $spos = $s.length;
	{
		var $tmp = this.b.join("");
		$s.pop();
		return $tmp;
	}
	$s.pop();
}
StringBuf.prototype.__class__ = StringBuf;
hxmotion.Sequenceable = function(target) { if( target === $_ ) return; {
	$s.push("hxmotion.Sequenceable::new");
	var $spos = $s.length;
	neash.events.EventDispatcher.apply(this,[target]);
	$s.pop();
}}
hxmotion.Sequenceable.__name__ = ["hxmotion","Sequenceable"];
hxmotion.Sequenceable.__super__ = neash.events.EventDispatcher;
for(var k in neash.events.EventDispatcher.prototype ) hxmotion.Sequenceable.prototype[k] = neash.events.EventDispatcher.prototype[k];
hxmotion.Sequenceable.prototype.back = function(trans) {
	$s.push("hxmotion.Sequenceable::back");
	var $spos = $s.length;
	{
		$s.pop();
		return null;
	}
	$s.pop();
}
hxmotion.Sequenceable.prototype.chain = function() {
	$s.push("hxmotion.Sequenceable::chain");
	var $spos = $s.length;
	var ref = this;
	var chain = new hxmotion.Chain();
	chain.push(ref);
	while((ref = ref.previous) != null) {
		chain.push(ref);
	}
	{
		$s.pop();
		return chain;
	}
	$s.pop();
}
hxmotion.Sequenceable.prototype.change = function(params) {
	$s.push("hxmotion.Sequenceable::change");
	var $spos = $s.length;
	var fields = Reflect.fields(params);
	{
		var _g = 0;
		while(_g < fields.length) {
			var field = fields[_g];
			++_g;
			this[field] = Reflect.field(params,field);
		}
	}
	{
		$s.pop();
		return this;
	}
	$s.pop();
}
hxmotion.Sequenceable.prototype.dontRecycle = null;
hxmotion.Sequenceable.prototype.hold = function() {
	$s.push("hxmotion.Sequenceable::hold");
	var $spos = $s.length;
	var ref = this;
	while((ref = ref.previous) != null) {
		ref.dontRecycle = true;
	}
	{
		$s.pop();
		return this;
	}
	$s.pop();
}
hxmotion.Sequenceable.prototype.next = null;
hxmotion.Sequenceable.prototype.previous = null;
hxmotion.Sequenceable.prototype.queue = function(obj,params) {
	$s.push("hxmotion.Sequenceable::queue");
	var $spos = $s.length;
	var seq;
	if(Std["is"](obj,hxmotion.ISequenceable)) {
		seq = obj;
		this.addEventListener("stop",$closure(seq,"start"));
	}
	else if(Reflect.isFunction(obj)) {
		if(params != null && Std["is"](params,Array)) {
			seq = new hxmotion.Call(obj,params);
		}
		else if(params != null) {
			seq = new hxmotion.Call(obj,[params]);
		}
		else {
			seq = new hxmotion.Call(obj);
		}
		this.addEventListener("stop",$closure(seq,"start"));
	}
	else if(Std["is"](obj,Int)) {
		seq = new hxmotion.Delay(obj);
		this.addEventListener("stop",$closure(seq,"start"));
	}
	else {
		seq = new hxmotion.BTween(obj);
		this.addEventListener("stop",$closure(seq,"start"));
	}
	seq.previous = this;
	if(this.next == null) this.next = seq;
	{
		$s.pop();
		return seq;
	}
	$s.pop();
}
hxmotion.Sequenceable.prototype.start = function(params) {
	$s.push("hxmotion.Sequenceable::start");
	var $spos = $s.length;
	{
		$s.pop();
		return null;
	}
	$s.pop();
}
hxmotion.Sequenceable.prototype.stop = function(premature) {
	$s.push("hxmotion.Sequenceable::stop");
	var $spos = $s.length;
	if(premature == null) premature = false;
	{
		$s.pop();
		return null;
	}
	$s.pop();
}
hxmotion.Sequenceable.prototype.toString = function() {
	$s.push("hxmotion.Sequenceable::toString");
	var $spos = $s.length;
	{
		$s.pop();
		return "Object Sequenceable";
	}
	$s.pop();
}
hxmotion.Sequenceable.prototype.update = function(listener) {
	$s.push("hxmotion.Sequenceable::update");
	var $spos = $s.length;
	{
		$s.pop();
		return this;
	}
	$s.pop();
}
hxmotion.Sequenceable.prototype.__class__ = hxmotion.Sequenceable;
hxmotion.Sequenceable.__interfaces__ = [neash.events.IEventDispatcher,hxmotion.ISequenceable];
hxmotion.Delay = function(time) { if( time === $_ ) return; {
	$s.push("hxmotion.Delay::new");
	var $spos = $s.length;
	if(time == null) time = 0;
	this.time = time;
	hxmotion.Sequenceable.apply(this,[]);
	$s.pop();
}}
hxmotion.Delay.__name__ = ["hxmotion","Delay"];
hxmotion.Delay.__super__ = hxmotion.Sequenceable;
for(var k in hxmotion.Sequenceable.prototype ) hxmotion.Delay.prototype[k] = hxmotion.Sequenceable.prototype[k];
hxmotion.Delay.call = function(time,callee,args) {
	$s.push("hxmotion.Delay::call");
	var $spos = $s.length;
	if(time == null) time = 0;
	var delay = new hxmotion.Delay(time).start();
	var arr = [callee];
	if(args != null) arr = arr.concat((Std["is"](args,Array)?[args]:[[args]]));
	$closure(delay,"queue").apply(delay,arr);
	{
		$s.pop();
		return delay;
	}
	$s.pop();
}
hxmotion.Delay.prototype.onRun = function() {
	$s.push("hxmotion.Delay::onRun");
	var $spos = $s.length;
	this.stop();
	this.dispatchEvent(new hxmotion.events.BTweenEvent("stop"));
	$s.pop();
}
hxmotion.Delay.prototype.start = function(params) {
	$s.push("hxmotion.Delay::start");
	var $spos = $s.length;
	this.startTime = Std["int"](jshelpers.Lib.getTimer());
	if(this.timer == null) this.timer = new haxe.Timer(this.time);
	this.timer.run = $closure(this,"onRun");
	this.dispatchEvent(new hxmotion.events.BTweenEvent("start"));
	{
		$s.pop();
		return this;
	}
	$s.pop();
}
hxmotion.Delay.prototype.startTime = null;
hxmotion.Delay.prototype.stop = function(premature) {
	$s.push("hxmotion.Delay::stop");
	var $spos = $s.length;
	if(premature == null) premature = false;
	this.timer.stop();
	{
		$s.pop();
		return this;
	}
	$s.pop();
}
hxmotion.Delay.prototype.time = null;
hxmotion.Delay.prototype.timer = null;
hxmotion.Delay.prototype.__class__ = hxmotion.Delay;
hxmotion.Delay.__interfaces__ = [hxmotion.ISequenceable];
neash.events.Listener = function(inListener,inUseCapture,inPriority) { if( inListener === $_ ) return; {
	$s.push("neash.events.Listener::new");
	var $spos = $s.length;
	this.mListner = inListener;
	this.mUseCapture = inUseCapture;
	this.mPriority = inPriority;
	this.mID = neash.events.Listener.sIDs++;
	$s.pop();
}}
neash.events.Listener.__name__ = ["neash","events","Listener"];
neash.events.Listener.prototype.Is = function(inListener,inCapture) {
	$s.push("neash.events.Listener::Is");
	var $spos = $s.length;
	{
		var $tmp = Reflect.compareMethods(this.mListner,inListener) && this.mUseCapture == inCapture;
		$s.pop();
		return $tmp;
	}
	$s.pop();
}
neash.events.Listener.prototype.dispatchEvent = function(event) {
	$s.push("neash.events.Listener::dispatchEvent");
	var $spos = $s.length;
	this.mListner(event);
	$s.pop();
}
neash.events.Listener.prototype.mID = null;
neash.events.Listener.prototype.mListner = null;
neash.events.Listener.prototype.mPriority = null;
neash.events.Listener.prototype.mUseCapture = null;
neash.events.Listener.prototype.__class__ = neash.events.Listener;
neash.events.EventPhase = function() { }
neash.events.EventPhase.__name__ = ["neash","events","EventPhase"];
neash.events.EventPhase.prototype.__class__ = neash.events.EventPhase;
hxmotion.Call = function(method,params) { if( method === $_ ) return; {
	$s.push("hxmotion.Call::new");
	var $spos = $s.length;
	this.method = method;
	this.params = (params == null?[]:params);
	hxmotion.Sequenceable.apply(this,[]);
	$s.pop();
}}
hxmotion.Call.__name__ = ["hxmotion","Call"];
hxmotion.Call.__super__ = hxmotion.Sequenceable;
for(var k in hxmotion.Sequenceable.prototype ) hxmotion.Call.prototype[k] = hxmotion.Sequenceable.prototype[k];
hxmotion.Call.prototype.method = null;
hxmotion.Call.prototype.onCalleeComplete = function(evt) {
	$s.push("hxmotion.Call::onCalleeComplete");
	var $spos = $s.length;
	this.dispatchEvent(new hxmotion.events.BTweenEvent("stop"));
	$s.pop();
}
hxmotion.Call.prototype.params = null;
hxmotion.Call.prototype.start = function(params) {
	$s.push("hxmotion.Call::start");
	var $spos = $s.length;
	if(params != null && Std["is"](params,hxmotion.events.BTweenEvent)) {
		var caller = (function($this) {
			var $r;
			var tmp = (function($this) {
				var $r;
				var tmp = params;
				$r = (Std["is"](tmp,hxmotion.events.BTweenEvent)?tmp:(function($this) {
					var $r;
					throw "Class cast error";
					return $r;
				}($this)));
				return $r;
			}($this)).target;
			$r = (Std["is"](tmp,hxmotion.ISequenceable)?tmp:(function($this) {
				var $r;
				throw "Class cast error";
				return $r;
			}($this)));
			return $r;
		}(this));
		caller.removeEventListener("stop",$closure(this,"start"));
	}
	var result = null;
	result = this.method.apply(this,this.params);
	if(result != null && Std["is"](result,hxmotion.ISequenceable)) {
		var nextStep = (function($this) {
			var $r;
			var tmp = result;
			$r = (Std["is"](tmp,hxmotion.ISequenceable)?tmp:(function($this) {
				var $r;
				throw "Class cast error";
				return $r;
			}($this)));
			return $r;
		}(this));
		nextStep.addEventListener("stop",$closure(this,"onCalleeComplete"));
		{
			$s.pop();
			return nextStep;
		}
	}
	else {
		this.dispatchEvent(new hxmotion.events.BTweenEvent("stop"));
		{
			$s.pop();
			return this;
		}
	}
	$s.pop();
}
hxmotion.Call.prototype.__class__ = hxmotion.Call;
hxmotion.Call.__interfaces__ = [hxmotion.ISequenceable];
neash.events.IOErrorEvent = function(type,bubbles,cancelable,inText) { if( type === $_ ) return; {
	$s.push("neash.events.IOErrorEvent::new");
	var $spos = $s.length;
	if(inText == null) inText = "";
	neash.events.Event.apply(this,[type,bubbles,cancelable]);
	this.text = inText;
	$s.pop();
}}
neash.events.IOErrorEvent.__name__ = ["neash","events","IOErrorEvent"];
neash.events.IOErrorEvent.__super__ = neash.events.Event;
for(var k in neash.events.Event.prototype ) neash.events.IOErrorEvent.prototype[k] = neash.events.Event.prototype[k];
neash.events.IOErrorEvent.prototype.text = null;
neash.events.IOErrorEvent.prototype.__class__ = neash.events.IOErrorEvent;
if(typeof js=='undefined') js = {}
js.Lib = function() { }
js.Lib.__name__ = ["js","Lib"];
js.Lib.isIE = null;
js.Lib.isOpera = null;
js.Lib.document = null;
js.Lib.window = null;
js.Lib.alert = function(v) {
	$s.push("js.Lib::alert");
	var $spos = $s.length;
	alert(js.Boot.__string_rec(v,""));
	$s.pop();
}
js.Lib.eval = function(code) {
	$s.push("js.Lib::eval");
	var $spos = $s.length;
	{
		var $tmp = eval(code);
		$s.pop();
		return $tmp;
	}
	$s.pop();
}
js.Lib.setErrorHandler = function(f) {
	$s.push("js.Lib::setErrorHandler");
	var $spos = $s.length;
	js.Lib.onerror = f;
	$s.pop();
}
js.Lib.prototype.__class__ = js.Lib;
jshelpers.Lib = function() { }
jshelpers.Lib.__name__ = ["jshelpers","Lib"];
jshelpers.Lib.__super__ = js.Lib;
for(var k in js.Lib.prototype ) jshelpers.Lib.prototype[k] = js.Lib.prototype[k];
jshelpers.Lib.getTimer = function() {
	$s.push("jshelpers.Lib::getTimer");
	var $spos = $s.length;
	{
		var $tmp = Std["int"](Date.now().getTime());
		$s.pop();
		return $tmp;
	}
	$s.pop();
}
jshelpers.Lib.prototype.__class__ = jshelpers.Lib;
IntIter = function(min,max) { if( min === $_ ) return; {
	$s.push("IntIter::new");
	var $spos = $s.length;
	this.min = min;
	this.max = max;
	$s.pop();
}}
IntIter.__name__ = ["IntIter"];
IntIter.prototype.hasNext = function() {
	$s.push("IntIter::hasNext");
	var $spos = $s.length;
	{
		var $tmp = this.min < this.max;
		$s.pop();
		return $tmp;
	}
	$s.pop();
}
IntIter.prototype.max = null;
IntIter.prototype.min = null;
IntIter.prototype.next = function() {
	$s.push("IntIter::next");
	var $spos = $s.length;
	{
		var $tmp = this.min++;
		$s.pop();
		return $tmp;
	}
	$s.pop();
}
IntIter.prototype.__class__ = IntIter;
haxe.Timer = function(time_ms) { if( time_ms === $_ ) return; {
	$s.push("haxe.Timer::new");
	var $spos = $s.length;
	this.id = haxe.Timer.arr.length;
	haxe.Timer.arr[this.id] = this;
	this.timerId = window.setInterval(("haxe.Timer.arr[" + this.id) + "].run();",time_ms);
	$s.pop();
}}
haxe.Timer.__name__ = ["haxe","Timer"];
haxe.Timer.delay = function(f,time_ms) {
	$s.push("haxe.Timer::delay");
	var $spos = $s.length;
	var t = new haxe.Timer(time_ms);
	t.run = function() {
		$s.push("haxe.Timer::delay@78");
		var $spos = $s.length;
		t.stop();
		f();
		$s.pop();
	}
	{
		$s.pop();
		return t;
	}
	$s.pop();
}
haxe.Timer.stamp = function() {
	$s.push("haxe.Timer::stamp");
	var $spos = $s.length;
	{
		var $tmp = Date.now().getTime() / 1000;
		$s.pop();
		return $tmp;
	}
	$s.pop();
}
haxe.Timer.prototype.id = null;
haxe.Timer.prototype.run = function() {
	$s.push("haxe.Timer::run");
	var $spos = $s.length;
	null;
	$s.pop();
}
haxe.Timer.prototype.stop = function() {
	$s.push("haxe.Timer::stop");
	var $spos = $s.length;
	if(this.id == null) {
		$s.pop();
		return;
	}
	window.clearInterval(this.timerId);
	haxe.Timer.arr[this.id] = null;
	if(this.id > 100 && this.id == haxe.Timer.arr.length - 1) {
		var p = this.id - 1;
		while(p >= 0 && haxe.Timer.arr[p] == null) p--;
		haxe.Timer.arr = haxe.Timer.arr.slice(0,p + 1);
	}
	this.id = null;
	$s.pop();
}
haxe.Timer.prototype.timerId = null;
haxe.Timer.prototype.__class__ = haxe.Timer;
Std = function() { }
Std.__name__ = ["Std"];
Std["is"] = function(v,t) {
	$s.push("Std::is");
	var $spos = $s.length;
	{
		var $tmp = js.Boot.__instanceof(v,t);
		$s.pop();
		return $tmp;
	}
	$s.pop();
}
Std.string = function(s) {
	$s.push("Std::string");
	var $spos = $s.length;
	{
		var $tmp = js.Boot.__string_rec(s,"");
		$s.pop();
		return $tmp;
	}
	$s.pop();
}
Std["int"] = function(x) {
	$s.push("Std::int");
	var $spos = $s.length;
	if(x < 0) {
		var $tmp = Math.ceil(x);
		$s.pop();
		return $tmp;
	}
	{
		var $tmp = Math.floor(x);
		$s.pop();
		return $tmp;
	}
	$s.pop();
}
Std.parseInt = function(x) {
	$s.push("Std::parseInt");
	var $spos = $s.length;
	var v = parseInt(x);
	if(Math.isNaN(v)) {
		$s.pop();
		return null;
	}
	{
		$s.pop();
		return v;
	}
	$s.pop();
}
Std.parseFloat = function(x) {
	$s.push("Std::parseFloat");
	var $spos = $s.length;
	{
		var $tmp = parseFloat(x);
		$s.pop();
		return $tmp;
	}
	$s.pop();
}
Std.random = function(x) {
	$s.push("Std::random");
	var $spos = $s.length;
	{
		var $tmp = Math.floor(Math.random() * x);
		$s.pop();
		return $tmp;
	}
	$s.pop();
}
Std.prototype.__class__ = Std;
hxmotion.CollectionHelper = function() { }
hxmotion.CollectionHelper.__name__ = ["hxmotion","CollectionHelper"];
hxmotion.CollectionHelper.toTypedArray = function(v) {
	$s.push("hxmotion.CollectionHelper::toTypedArray");
	var $spos = $s.length;
	{
		$s.pop();
		return v;
	}
	$s.pop();
}
hxmotion.CollectionHelper.prototype.__class__ = hxmotion.CollectionHelper;
hxmotion.Ease = function() { }
hxmotion.Ease.__name__ = ["hxmotion","Ease"];
hxmotion.Ease.merge = function(easeIn,easeOut,swapPoint) {
	$s.push("hxmotion.Ease::merge");
	var $spos = $s.length;
	if(swapPoint == null) swapPoint = .5;
	{
		var $tmp = function(t,b,c,d) {
			$s.push("hxmotion.Ease::merge@7");
			var $spos = $s.length;
			var cs = c * swapPoint;
			var ds = d * swapPoint;
			if(t < ds) {
				var $tmp = easeIn(t,b,cs,ds);
				$s.pop();
				return $tmp;
			}
			var diff = 1 - swapPoint;
			{
				var $tmp = easeOut(t - ds,b + cs,c * diff,d * diff);
				$s.pop();
				return $tmp;
			}
			$s.pop();
		}
		$s.pop();
		return $tmp;
	}
	$s.pop();
}
hxmotion.Ease.inBack = function(t,b,c,d) {
	$s.push("hxmotion.Ease::inBack");
	var $spos = $s.length;
	var s = 1.70158;
	{
		var $tmp = ((c * (t /= d)) * t) * ((s + 1) * t - s) + b;
		$s.pop();
		return $tmp;
	}
	$s.pop();
}
hxmotion.Ease.outBack = function(t,b,c,d) {
	$s.push("hxmotion.Ease::outBack");
	var $spos = $s.length;
	var s = 1.70158;
	{
		var $tmp = c * (((t = t / d - 1) * t) * ((s + 1) * t + s) + 1) + b;
		$s.pop();
		return $tmp;
	}
	$s.pop();
}
hxmotion.Ease.inOutBack = function(t,b,c,d) {
	$s.push("hxmotion.Ease::inOutBack");
	var $spos = $s.length;
	var s = 1.70158;
	if((t /= d / 2) < 1) {
		var $tmp = (c / 2) * ((t * t) * (((s *= 1.525) + 1) * t - s)) + b;
		$s.pop();
		return $tmp;
	}
	{
		var $tmp = (c / 2) * (((t -= 2) * t) * (((s *= 1.525) + 1) * t + s) + 2) + b;
		$s.pop();
		return $tmp;
	}
	$s.pop();
}
hxmotion.Ease.outBounce = function(t,b,c,d) {
	$s.push("hxmotion.Ease::outBounce");
	var $spos = $s.length;
	if((t /= d) < (1 / 2.75)) {
		var $tmp = c * ((7.5625 * t) * t) + b;
		$s.pop();
		return $tmp;
	}
	else if(t < (2 / 2.75)) {
		var $tmp = c * ((7.5625 * (t -= (1.5 / 2.75))) * t + .75) + b;
		$s.pop();
		return $tmp;
	}
	else if(t < (2.5 / 2.75)) {
		var $tmp = c * ((7.5625 * (t -= (2.25 / 2.75))) * t + .9375) + b;
		$s.pop();
		return $tmp;
	}
	else {
		var $tmp = c * ((7.5625 * (t -= (2.625 / 2.75))) * t + .984375) + b;
		$s.pop();
		return $tmp;
	}
	$s.pop();
}
hxmotion.Ease.inBounce = function(t,b,c,d) {
	$s.push("hxmotion.Ease::inBounce");
	var $spos = $s.length;
	{
		var $tmp = (c - hxmotion.Ease.outBounce(d - t,0,c,d)) + b;
		$s.pop();
		return $tmp;
	}
	$s.pop();
}
hxmotion.Ease.inOutBounce = function(t,b,c,d) {
	$s.push("hxmotion.Ease::inOutBounce");
	var $spos = $s.length;
	if(t < d / 2) {
		var $tmp = (c - hxmotion.Ease.outBounce(d - t * 2,0,c,d)) * .5 + b;
		$s.pop();
		return $tmp;
	}
	else {
		var $tmp = (hxmotion.Ease.outBounce(t * 2 - d,0,c,d) * .5 + c * .5) + b;
		$s.pop();
		return $tmp;
	}
	$s.pop();
}
hxmotion.Ease.inCirc = function(t,b,c,d) {
	$s.push("hxmotion.Ease::inCirc");
	var $spos = $s.length;
	{
		var $tmp = -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b;
		$s.pop();
		return $tmp;
	}
	$s.pop();
}
hxmotion.Ease.outCirc = function(t,b,c,d) {
	$s.push("hxmotion.Ease::outCirc");
	var $spos = $s.length;
	{
		var $tmp = c * Math.sqrt(1 - (t = t / d - 1) * t) + b;
		$s.pop();
		return $tmp;
	}
	$s.pop();
}
hxmotion.Ease.inOutCirc = function(t,b,c,d) {
	$s.push("hxmotion.Ease::inOutCirc");
	var $spos = $s.length;
	if((t /= d / 2) < 1) {
		var $tmp = (-c / 2) * (Math.sqrt(1 - t * t) - 1) + b;
		$s.pop();
		return $tmp;
	}
	{
		var $tmp = (c / 2) * (Math.sqrt(1 - (t -= 2) * t) + 1) + b;
		$s.pop();
		return $tmp;
	}
	$s.pop();
}
hxmotion.Ease.inCubic = function(t,b,c,d) {
	$s.push("hxmotion.Ease::inCubic");
	var $spos = $s.length;
	{
		var $tmp = ((c * (t /= d)) * t) * t + b;
		$s.pop();
		return $tmp;
	}
	$s.pop();
}
hxmotion.Ease.outCubic = function(t,b,c,d) {
	$s.push("hxmotion.Ease::outCubic");
	var $spos = $s.length;
	{
		var $tmp = c * (((t = t / d - 1) * t) * t + 1) + b;
		$s.pop();
		return $tmp;
	}
	$s.pop();
}
hxmotion.Ease.inOutCubic = function(t,b,c,d) {
	$s.push("hxmotion.Ease::inOutCubic");
	var $spos = $s.length;
	if((t /= d / 2) < 1) {
		var $tmp = (((c / 2) * t) * t) * t + b;
		$s.pop();
		return $tmp;
	}
	{
		var $tmp = (c / 2) * (((t -= 2) * t) * t + 2) + b;
		$s.pop();
		return $tmp;
	}
	$s.pop();
}
hxmotion.Ease.inElastic = function(t,b,c,d) {
	$s.push("hxmotion.Ease::inElastic");
	var $spos = $s.length;
	if(t == 0) {
		$s.pop();
		return b;
	}
	if((t /= d) == 1) {
		var $tmp = b + c;
		$s.pop();
		return $tmp;
	}
	var p = d * .3;
	var s;
	var a = c;
	s = p / 4;
	{
		var $tmp = -((a * Math.pow(2,10 * (t -= 1))) * Math.sin(((t * d - s) * (2 * Math.PI)) / p)) + b;
		$s.pop();
		return $tmp;
	}
	$s.pop();
}
hxmotion.Ease.outElastic = function(t,b,c,d) {
	$s.push("hxmotion.Ease::outElastic");
	var $spos = $s.length;
	if(t == 0) {
		$s.pop();
		return b;
	}
	if((t /= d) == 1) {
		var $tmp = b + c;
		$s.pop();
		return $tmp;
	}
	var p = d * .3;
	var s;
	var a = c;
	s = p / 4;
	{
		var $tmp = (((a * Math.pow(2,-10 * t)) * Math.sin(((t * d - s) * (2 * Math.PI)) / p) + c) + b);
		$s.pop();
		return $tmp;
	}
	$s.pop();
}
hxmotion.Ease.inOutElastic = function(t,b,c,d) {
	$s.push("hxmotion.Ease::inOutElastic");
	var $spos = $s.length;
	if(t == 0) {
		$s.pop();
		return b;
	}
	if((t /= d / 2) == 2) {
		var $tmp = b + c;
		$s.pop();
		return $tmp;
	}
	var s;
	var p = d * (.3 * 1.5);
	var a = c;
	s = p / 4;
	if(t < 1) {
		var $tmp = -0.5 * ((a * Math.pow(2,10 * (t -= 1))) * Math.sin(((t * d - s) * (2 * Math.PI)) / p)) + b;
		$s.pop();
		return $tmp;
	}
	{
		var $tmp = (((a * Math.pow(2,-10 * (t -= 1))) * Math.sin(((t * d - s) * (2 * Math.PI)) / p)) * .5 + c) + b;
		$s.pop();
		return $tmp;
	}
	$s.pop();
}
hxmotion.Ease.inExpo = function(t,b,c,d) {
	$s.push("hxmotion.Ease::inExpo");
	var $spos = $s.length;
	{
		var $tmp = ((t == 0)?b:c * Math.pow(2,10 * (t / d - 1)) + b);
		$s.pop();
		return $tmp;
	}
	$s.pop();
}
hxmotion.Ease.outExpo = function(t,b,c,d) {
	$s.push("hxmotion.Ease::outExpo");
	var $spos = $s.length;
	{
		var $tmp = ((t == d)?b + c:c * (-Math.pow(2,(-10 * t) / d) + 1) + b);
		$s.pop();
		return $tmp;
	}
	$s.pop();
}
hxmotion.Ease.inOutExpo = function(t,b,c,d) {
	$s.push("hxmotion.Ease::inOutExpo");
	var $spos = $s.length;
	if(t == 0) {
		$s.pop();
		return b;
	}
	if(t == d) {
		var $tmp = b + c;
		$s.pop();
		return $tmp;
	}
	if((t /= d / 2) < 1) {
		var $tmp = (c / 2) * Math.pow(2,10 * (t - 1)) + b;
		$s.pop();
		return $tmp;
	}
	{
		var $tmp = (c / 2) * (-Math.pow(2,-10 * --t) + 2) + b;
		$s.pop();
		return $tmp;
	}
	$s.pop();
}
hxmotion.Ease.linear = function(t,b,c,d) {
	$s.push("hxmotion.Ease::linear");
	var $spos = $s.length;
	{
		var $tmp = (c * t) / d + b;
		$s.pop();
		return $tmp;
	}
	$s.pop();
}
hxmotion.Ease.inQuad = function(t,b,c,d) {
	$s.push("hxmotion.Ease::inQuad");
	var $spos = $s.length;
	{
		var $tmp = (c * (t /= d)) * t + b;
		$s.pop();
		return $tmp;
	}
	$s.pop();
}
hxmotion.Ease.outQuad = function(t,b,c,d) {
	$s.push("hxmotion.Ease::outQuad");
	var $spos = $s.length;
	{
		var $tmp = (-c * (t /= d)) * (t - 2) + b;
		$s.pop();
		return $tmp;
	}
	$s.pop();
}
hxmotion.Ease.inOutQuad = function(t,b,c,d) {
	$s.push("hxmotion.Ease::inOutQuad");
	var $spos = $s.length;
	if((t /= d / 2) < 1) {
		var $tmp = ((c / 2) * t) * t + b;
		$s.pop();
		return $tmp;
	}
	{
		var $tmp = (-c / 2) * ((--t) * (t - 2) - 1) + b;
		$s.pop();
		return $tmp;
	}
	$s.pop();
}
hxmotion.Ease.inQuart = function(t,b,c,d) {
	$s.push("hxmotion.Ease::inQuart");
	var $spos = $s.length;
	{
		var $tmp = (((c * (t /= d)) * t) * t) * t + b;
		$s.pop();
		return $tmp;
	}
	$s.pop();
}
hxmotion.Ease.outQuart = function(t,b,c,d) {
	$s.push("hxmotion.Ease::outQuart");
	var $spos = $s.length;
	{
		var $tmp = -c * ((((t = t / d - 1) * t) * t) * t - 1) + b;
		$s.pop();
		return $tmp;
	}
	$s.pop();
}
hxmotion.Ease.inOutQuart = function(t,b,c,d) {
	$s.push("hxmotion.Ease::inOutQuart");
	var $spos = $s.length;
	if((t /= d / 2) < 1) {
		var $tmp = ((((c / 2) * t) * t) * t) * t + b;
		$s.pop();
		return $tmp;
	}
	{
		var $tmp = (-c / 2) * ((((t -= 2) * t) * t) * t - 2) + b;
		$s.pop();
		return $tmp;
	}
	$s.pop();
}
hxmotion.Ease.inQuint = function(t,b,c,d) {
	$s.push("hxmotion.Ease::inQuint");
	var $spos = $s.length;
	{
		var $tmp = ((((c * (t /= d)) * t) * t) * t) * t + b;
		$s.pop();
		return $tmp;
	}
	$s.pop();
}
hxmotion.Ease.outQuint = function(t,b,c,d) {
	$s.push("hxmotion.Ease::outQuint");
	var $spos = $s.length;
	{
		var $tmp = c * (((((t = t / d - 1) * t) * t) * t) * t + 1) + b;
		$s.pop();
		return $tmp;
	}
	$s.pop();
}
hxmotion.Ease.inOutQuint = function(t,b,c,d) {
	$s.push("hxmotion.Ease::inOutQuint");
	var $spos = $s.length;
	if((t /= d / 2) < 1) {
		var $tmp = (((((c / 2) * t) * t) * t) * t) * t + b;
		$s.pop();
		return $tmp;
	}
	{
		var $tmp = (c / 2) * (((((t -= 2) * t) * t) * t) * t + 2) + b;
		$s.pop();
		return $tmp;
	}
	$s.pop();
}
hxmotion.Ease.inSine = function(t,b,c,d) {
	$s.push("hxmotion.Ease::inSine");
	var $spos = $s.length;
	{
		var $tmp = (-c * Math.cos((t / d) * (Math.PI / 2)) + c) + b;
		$s.pop();
		return $tmp;
	}
	$s.pop();
}
hxmotion.Ease.outSine = function(t,b,c,d) {
	$s.push("hxmotion.Ease::outSine");
	var $spos = $s.length;
	{
		var $tmp = c * Math.sin((t / d) * (Math.PI / 2)) + b;
		$s.pop();
		return $tmp;
	}
	$s.pop();
}
hxmotion.Ease.inOutSine = function(t,b,c,d) {
	$s.push("hxmotion.Ease::inOutSine");
	var $spos = $s.length;
	{
		var $tmp = (-c / 2) * (Math.cos((Math.PI * t) / d) - 1) + b;
		$s.pop();
		return $tmp;
	}
	$s.pop();
}
hxmotion.Ease.prototype.__class__ = hxmotion.Ease;
List = function(p) { if( p === $_ ) return; {
	$s.push("List::new");
	var $spos = $s.length;
	this.length = 0;
	$s.pop();
}}
List.__name__ = ["List"];
List.prototype.add = function(item) {
	$s.push("List::add");
	var $spos = $s.length;
	var x = [item];
	if(this.h == null) this.h = x;
	else this.q[1] = x;
	this.q = x;
	this.length++;
	$s.pop();
}
List.prototype.clear = function() {
	$s.push("List::clear");
	var $spos = $s.length;
	this.h = null;
	this.q = null;
	this.length = 0;
	$s.pop();
}
List.prototype.filter = function(f) {
	$s.push("List::filter");
	var $spos = $s.length;
	var l2 = new List();
	var l = this.h;
	while(l != null) {
		var v = l[0];
		l = l[1];
		if(f(v)) l2.add(v);
	}
	{
		$s.pop();
		return l2;
	}
	$s.pop();
}
List.prototype.first = function() {
	$s.push("List::first");
	var $spos = $s.length;
	{
		var $tmp = (this.h == null?null:this.h[0]);
		$s.pop();
		return $tmp;
	}
	$s.pop();
}
List.prototype.h = null;
List.prototype.isEmpty = function() {
	$s.push("List::isEmpty");
	var $spos = $s.length;
	{
		var $tmp = (this.h == null);
		$s.pop();
		return $tmp;
	}
	$s.pop();
}
List.prototype.iterator = function() {
	$s.push("List::iterator");
	var $spos = $s.length;
	{
		var $tmp = { h : this.h, hasNext : function() {
			$s.push("List::iterator@196");
			var $spos = $s.length;
			{
				var $tmp = (this.h != null);
				$s.pop();
				return $tmp;
			}
			$s.pop();
		}, next : function() {
			$s.push("List::iterator@199");
			var $spos = $s.length;
			if(this.h == null) {
				$s.pop();
				return null;
			}
			var x = this.h[0];
			this.h = this.h[1];
			{
				$s.pop();
				return x;
			}
			$s.pop();
		}}
		$s.pop();
		return $tmp;
	}
	$s.pop();
}
List.prototype.join = function(sep) {
	$s.push("List::join");
	var $spos = $s.length;
	var s = new StringBuf();
	var first = true;
	var l = this.h;
	while(l != null) {
		if(first) first = false;
		else s.b[s.b.length] = sep;
		s.b[s.b.length] = l[0];
		l = l[1];
	}
	{
		var $tmp = s.b.join("");
		$s.pop();
		return $tmp;
	}
	$s.pop();
}
List.prototype.last = function() {
	$s.push("List::last");
	var $spos = $s.length;
	{
		var $tmp = (this.q == null?null:this.q[0]);
		$s.pop();
		return $tmp;
	}
	$s.pop();
}
List.prototype.length = null;
List.prototype.map = function(f) {
	$s.push("List::map");
	var $spos = $s.length;
	var b = new List();
	var l = this.h;
	while(l != null) {
		var v = l[0];
		l = l[1];
		b.add(f(v));
	}
	{
		$s.pop();
		return b;
	}
	$s.pop();
}
List.prototype.pop = function() {
	$s.push("List::pop");
	var $spos = $s.length;
	if(this.h == null) {
		$s.pop();
		return null;
	}
	var x = this.h[0];
	this.h = this.h[1];
	if(this.h == null) this.q = null;
	this.length--;
	{
		$s.pop();
		return x;
	}
	$s.pop();
}
List.prototype.push = function(item) {
	$s.push("List::push");
	var $spos = $s.length;
	var x = [item,this.h];
	this.h = x;
	if(this.q == null) this.q = x;
	this.length++;
	$s.pop();
}
List.prototype.q = null;
List.prototype.remove = function(v) {
	$s.push("List::remove");
	var $spos = $s.length;
	var prev = null;
	var l = this.h;
	while(l != null) {
		if(l[0] == v) {
			if(prev == null) this.h = l[1];
			else prev[1] = l[1];
			if(this.q == l) this.q = prev;
			this.length--;
			{
				$s.pop();
				return true;
			}
		}
		prev = l;
		l = l[1];
	}
	{
		$s.pop();
		return false;
	}
	$s.pop();
}
List.prototype.toString = function() {
	$s.push("List::toString");
	var $spos = $s.length;
	var s = new StringBuf();
	var first = true;
	var l = this.h;
	s.b[s.b.length] = "{";
	while(l != null) {
		if(first) first = false;
		else s.b[s.b.length] = ", ";
		s.b[s.b.length] = Std.string(l[0]);
		l = l[1];
	}
	s.b[s.b.length] = "}";
	{
		var $tmp = s.b.join("");
		$s.pop();
		return $tmp;
	}
	$s.pop();
}
List.prototype.__class__ = List;
hxmotion.Chain = function(p) { if( p === $_ ) return; {
	$s.push("hxmotion.Chain::new");
	var $spos = $s.length;
	hxmotion.Sequenceable.apply(this,[]);
	this.length = 0;
	$s.pop();
}}
hxmotion.Chain.__name__ = ["hxmotion","Chain"];
hxmotion.Chain.__super__ = hxmotion.Sequenceable;
for(var k in hxmotion.Sequenceable.prototype ) hxmotion.Chain.prototype[k] = hxmotion.Sequenceable.prototype[k];
hxmotion.Chain.prototype.add = function(item) {
	$s.push("hxmotion.Chain::add");
	var $spos = $s.length;
	var x = [item];
	if(this.h == null) this.h = x;
	else this.q[1] = x;
	this.q = x;
	this.length++;
	$s.pop();
}
hxmotion.Chain.prototype.back = function(trans) {
	$s.push("hxmotion.Chain::back");
	var $spos = $s.length;
	var c = new hxmotion.Chain();
	{
		$s.pop();
		return c;
	}
	$s.pop();
}
hxmotion.Chain.prototype.clear = function() {
	$s.push("hxmotion.Chain::clear");
	var $spos = $s.length;
	this.h = null;
	this.q = null;
	this.length = 0;
	$s.pop();
}
hxmotion.Chain.prototype.clone = function() {
	$s.push("hxmotion.Chain::clone");
	var $spos = $s.length;
	var c = new hxmotion.Chain();
	{
		var _g1 = 0, _g = this.length;
		while(_g1 < _g) {
			var i = _g1++;
			c.add(this.q[i]);
		}
	}
	{
		$s.pop();
		return c;
	}
	$s.pop();
}
hxmotion.Chain.prototype.filter = function(f) {
	$s.push("hxmotion.Chain::filter");
	var $spos = $s.length;
	var l2 = new List();
	var l = this.h;
	while(l != null) {
		var v = l[0];
		l = l[1];
		if(f(v)) l2.add(v);
	}
	{
		$s.pop();
		return l2;
	}
	$s.pop();
}
hxmotion.Chain.prototype.first = function() {
	$s.push("hxmotion.Chain::first");
	var $spos = $s.length;
	{
		var $tmp = (this.h == null?null:this.h[0]);
		$s.pop();
		return $tmp;
	}
	$s.pop();
}
hxmotion.Chain.prototype.h = null;
hxmotion.Chain.prototype.isEmpty = function() {
	$s.push("hxmotion.Chain::isEmpty");
	var $spos = $s.length;
	{
		var $tmp = (this.h == null);
		$s.pop();
		return $tmp;
	}
	$s.pop();
}
hxmotion.Chain.prototype.iterator = function() {
	$s.push("hxmotion.Chain::iterator");
	var $spos = $s.length;
	{
		var $tmp = { h : this.h, hasNext : function() {
			$s.push("hxmotion.Chain::iterator@168");
			var $spos = $s.length;
			{
				var $tmp = (this.h != null);
				$s.pop();
				return $tmp;
			}
			$s.pop();
		}, next : function() {
			$s.push("hxmotion.Chain::iterator@171");
			var $spos = $s.length;
			if(this.h == null) {
				$s.pop();
				return null;
			}
			var x = this.h[0];
			this.h = this.h[1];
			{
				$s.pop();
				return x;
			}
			$s.pop();
		}}
		$s.pop();
		return $tmp;
	}
	$s.pop();
}
hxmotion.Chain.prototype.join = function(sep) {
	$s.push("hxmotion.Chain::join");
	var $spos = $s.length;
	var s = new StringBuf();
	var first = true;
	var l = this.h;
	while(l != null) {
		if(first) first = false;
		else s.b[s.b.length] = sep;
		s.b[s.b.length] = l[0];
		l = l[1];
	}
	{
		var $tmp = s.b.join("");
		$s.pop();
		return $tmp;
	}
	$s.pop();
}
hxmotion.Chain.prototype.last = function() {
	$s.push("hxmotion.Chain::last");
	var $spos = $s.length;
	{
		var $tmp = (this.q == null?null:this.q[0]);
		$s.pop();
		return $tmp;
	}
	$s.pop();
}
hxmotion.Chain.prototype.length = null;
hxmotion.Chain.prototype.map = function(f) {
	$s.push("hxmotion.Chain::map");
	var $spos = $s.length;
	var b = new List();
	var l = this.h;
	while(l != null) {
		var v = l[0];
		l = l[1];
		b.add(f(v));
	}
	{
		$s.pop();
		return b;
	}
	$s.pop();
}
hxmotion.Chain.prototype.pop = function() {
	$s.push("hxmotion.Chain::pop");
	var $spos = $s.length;
	if(this.h == null) {
		$s.pop();
		return null;
	}
	var x = this.h[0];
	this.h = this.h[1];
	if(this.h == null) this.q = null;
	this.length--;
	{
		$s.pop();
		return x;
	}
	$s.pop();
}
hxmotion.Chain.prototype.push = function(item) {
	$s.push("hxmotion.Chain::push");
	var $spos = $s.length;
	var x = [item,this.h];
	this.h = x;
	if(this.q == null) this.q = x;
	this.length++;
	$s.pop();
}
hxmotion.Chain.prototype.q = null;
hxmotion.Chain.prototype.queue = function(obj,params) {
	$s.push("hxmotion.Chain::queue");
	var $spos = $s.length;
	if(obj == null) {
		var $tmp = this.clone();
		$s.pop();
		return $tmp;
	}
	else if(this.last() != null) {
		var $tmp = this.last().queue(obj,params);
		$s.pop();
		return $tmp;
	}
	else {
		$s.pop();
		return null;
	}
	$s.pop();
}
hxmotion.Chain.prototype.remove = function(v) {
	$s.push("hxmotion.Chain::remove");
	var $spos = $s.length;
	var prev = null;
	var l = this.h;
	while(l != null) {
		if(l[0] == v) {
			if(prev == null) this.h = l[1];
			else prev[1] = l[1];
			if(this.q == l) this.q = prev;
			this.length--;
			{
				$s.pop();
				return true;
			}
		}
		prev = l;
		l = l[1];
	}
	{
		$s.pop();
		return false;
	}
	$s.pop();
}
hxmotion.Chain.prototype.stop = function(premature) {
	$s.push("hxmotion.Chain::stop");
	var $spos = $s.length;
	if(premature == null) premature = false;
	var l = this.h;
	while(l != null) {
		var v = l[0];
		l = l[1];
		v.stop(true);
	}
	{
		$s.pop();
		return this;
	}
	$s.pop();
}
hxmotion.Chain.prototype.toString = function() {
	$s.push("hxmotion.Chain::toString");
	var $spos = $s.length;
	var s = new StringBuf();
	var first = true;
	var l = this.h;
	s.b[s.b.length] = "{";
	while(l != null) {
		if(first) first = false;
		else s.b[s.b.length] = ", ";
		s.b[s.b.length] = l[0];
		l = l[1];
	}
	s.b[s.b.length] = "}";
	{
		var $tmp = s.b.join("");
		$s.pop();
		return $tmp;
	}
	$s.pop();
}
hxmotion.Chain.prototype.__class__ = hxmotion.Chain;
hxmotion.BTween = function(args) { if( args === $_ ) return; {
	$s.push("hxmotion.BTween::new");
	var $spos = $s.length;
	hxmotion.Sequenceable.apply(this,[]);
	this.init();
	this.consume(args);
	$s.pop();
}}
hxmotion.BTween.__name__ = ["hxmotion","BTween"];
hxmotion.BTween.__super__ = hxmotion.Sequenceable;
for(var k in hxmotion.Sequenceable.prototype ) hxmotion.BTween.prototype[k] = hxmotion.Sequenceable.prototype[k];
hxmotion.BTween.prototype.back = function(trans) {
	$s.push("hxmotion.BTween::back");
	var $spos = $s.length;
	if(trans != null) this.ease = trans;
	var prop;
	{
		var _g = 0, _g1 = this.props;
		while(_g < _g1.length) {
			var prop1 = _g1[_g];
			++_g;
			var v = prop1.targetValue;
			prop1.targetValue = prop1.initValue;
			prop1.initValue = v;
		}
	}
	if(this.modifier) {
		if(Reflect.field(this.modifierArgs,"initValue") == null) {
			this.modifierArgs["__reversion_pending"] = true;
		}
		else {
			this.reverseModArgs(this.modifierArgs);
		}
	}
	{
		$s.pop();
		return this;
	}
	$s.pop();
}
hxmotion.BTween.prototype.clone = function() {
	$s.push("hxmotion.BTween::clone");
	var $spos = $s.length;
	var clone = new hxmotion.BTween();
	clone.modifier = this.modifier;
	clone.modifierArgs = this.modifierArgs;
	clone.target = this.target;
	clone.ease = this.ease;
	clone.time = this.time;
	{
		var _g = 0, _g1 = this.props;
		while(_g < _g1.length) {
			var prop = _g1[_g];
			++_g;
			clone.props[clone.props.length] = Reflect.copy(prop);
		}
	}
	{
		$s.pop();
		return clone;
	}
	$s.pop();
}
hxmotion.BTween.prototype.consume = function(args) {
	$s.push("hxmotion.BTween::consume");
	var $spos = $s.length;
	if(args != null) {
		if(Reflect.hasField(args,"time")) {
			this.time = args.time;
			Reflect.deleteField(args,"time");
		}
		if(Reflect.hasField(args,"ease")) {
			this.ease = args.ease;
			Reflect.deleteField(args,"ease");
		}
		if(Reflect.hasField(args,"rounded")) {
			this.rounded = args.rounded;
			Reflect.deleteField(args,"rounded");
		}
		if(Reflect.hasField(args,"target")) {
			this.target = args.target;
			Reflect.deleteField(args,"target");
		}
		if(Reflect.hasField(args,"from")) {
			this.fromProps = args.from;
			Reflect.deleteField(args,"from");
		}
		if(Reflect.hasField(args,"mod")) {
			if(!Std["is"](args.mod,Array)) {
				this.modifier = args.mod;
				this.modifierArgs = [{ }];
			}
			else {
				this.modifier = args.mod[0];
				this.modifierArgs = args.mod[1];
			}
			Reflect.deleteField(args,"mod");
		}
		{
			var _g = 0, _g1 = Reflect.fields(args);
			while(_g < _g1.length) {
				var arg = _g1[_g];
				++_g;
				this.props.push({ name : arg, targetValue : Reflect.field(args,arg), initValue : 0});
			}
		}
	}
	$s.pop();
}
hxmotion.BTween.prototype.ease = null;
hxmotion.BTween.prototype.fromProps = null;
hxmotion.BTween.prototype.init = function() {
	$s.push("hxmotion.BTween::init");
	var $spos = $s.length;
	this.updateListeners = null;
	this.ease = hxmotion.BTween.DEFAULT_EASE;
	this.rounded = hxmotion.BTween.DEFAULT_ROUNDED;
	this.time = hxmotion.BTween.DEFAULT_TIME;
	this.props = new Array();
	$s.pop();
}
hxmotion.BTween.prototype.modifier = null;
hxmotion.BTween.prototype.modifierArgs = null;
hxmotion.BTween.prototype.props = null;
hxmotion.BTween.prototype.queue = function(obj,params) {
	$s.push("hxmotion.BTween::queue");
	var $spos = $s.length;
	if(obj == null) {
		var tween;
		if(params != null) tween = new hxmotion.BTween(params);
		else tween = this.clone();
		hxmotion.Sequenceable.prototype.queue.apply(this,[tween]);
		{
			$s.pop();
			return tween;
		}
	}
	{
		var $tmp = hxmotion.Sequenceable.prototype.queue.apply(this,[obj,params]);
		$s.pop();
		return $tmp;
	}
	$s.pop();
}
hxmotion.BTween.prototype.reverseModArgs = function(args,deleteFlag) {
	$s.push("hxmotion.BTween::reverseModArgs");
	var $spos = $s.length;
	if(deleteFlag == null) deleteFlag = false;
	if(deleteFlag) Reflect.deleteField(args,"__reversion_pending");
	{
		var _g = 0, _g1 = Reflect.fields(args);
		while(_g < _g1.length) {
			var s = _g1[_g];
			++_g;
			if(s != "initValue" && Reflect.field(args.initValue,s) != null) {
				var value = Reflect.field(args,s);
				args[s] = Reflect.field(args.initValue,s);
				args.initValue[s] = value;
			}
		}
	}
	$s.pop();
}
hxmotion.BTween.prototype.rounded = null;
hxmotion.BTween.prototype.start = function(args) {
	$s.push("hxmotion.BTween::start");
	var $spos = $s.length;
	if(args != null && !Std["is"](args,hxmotion.events.BTweenEvent)) this.consume(args);
	this.startTime = jshelpers.Lib.getTimer();
	{
		var _g = 0, _g1 = Reflect.fields(this.fromProps);
		while(_g < _g1.length) {
			var prop = _g1[_g];
			++_g;
			this.target[prop] = Reflect.field(this.fromProps,prop);
		}
	}
	{
		var _g = 0, _g1 = this.props;
		while(_g < _g1.length) {
			var prop = _g1[_g];
			++_g;
			prop.initValue = Reflect.field(this.target,prop.name);
		}
	}
	if(this.modifier != null && Reflect.field(this.modifierArgs,"__reversion_pending") != null) this.reverseModArgs(this.modifierArgs,true);
	this.dispatchEvent(new hxmotion.events.BTweenEvent("start"));
	hxmotion.BTween.enterFrameDispatcher.addEventListener("enterFrame",$closure(this,"step"));
	{
		$s.pop();
		return this;
	}
	$s.pop();
}
hxmotion.BTween.prototype.startTime = null;
hxmotion.BTween.prototype.step = function(evt) {
	$s.push("hxmotion.BTween::step");
	var $spos = $s.length;
	var t = jshelpers.Lib.getTimer() - this.startTime;
	var index;
	var finished = false;
	if(t >= this.time) {
		index = 1.0;
		finished = true;
	}
	else index = this.ease(t,0.0,1.0,this.time);
	if(this.modifier != null) this.modifier.apply(null,[index,this.rounded,this.target,this.modifierArgs]);
	{
		var _g = 0, _g1 = this.props;
		while(_g < _g1.length) {
			var prop = _g1[_g];
			++_g;
			if(this.rounded) this.target[prop.name] = Math.round(prop.initValue + (prop.targetValue - prop.initValue) * index);
			else this.target[prop.name] = prop.initValue + (prop.targetValue - prop.initValue) * index;
		}
	}
	if(this.updateListeners != null) this.dispatchEvent(new hxmotion.events.BTweenEvent("update"));
	if(finished) this.stop();
	$s.pop();
}
hxmotion.BTween.prototype.stop = function(premature) {
	$s.push("hxmotion.BTween::stop");
	var $spos = $s.length;
	if(premature == null) premature = false;
	if(!premature) this.dispatchEvent(new hxmotion.events.BTweenEvent("stop"));
	hxmotion.BTween.enterFrameDispatcher.removeEventListener("enterFrame",$closure(this,"step"));
	if(this.updateListeners != null) {
		var _g = 0, _g1 = this.updateListeners;
		while(_g < _g1.length) {
			var listener = _g1[_g];
			++_g;
			this.removeEventListener("update",listener);
		}
	}
	{
		$s.pop();
		return this;
	}
	$s.pop();
}
hxmotion.BTween.prototype.target = null;
hxmotion.BTween.prototype.time = null;
hxmotion.BTween.prototype.toString = function() {
	$s.push("hxmotion.BTween::toString");
	var $spos = $s.length;
	{
		var $tmp = ((((((("BTween: target:" + this.target) + ",time=") + this.time) + ",modifier:") + this.modifier) + ",modifierArgs:") + this.modifierArgs);
		$s.pop();
		return $tmp;
	}
	$s.pop();
}
hxmotion.BTween.prototype.update = function(listener) {
	$s.push("hxmotion.BTween::update");
	var $spos = $s.length;
	if(this.updateListeners == null) this.updateListeners = new Array();
	this.updateListeners.push(listener);
	this.addEventListener("update",listener);
	{
		$s.pop();
		return this;
	}
	$s.pop();
}
hxmotion.BTween.prototype.updateListeners = null;
hxmotion.BTween.prototype.__class__ = hxmotion.BTween;
if(!hxmotion.modifiers) hxmotion.modifiers = {}
hxmotion.modifiers.CSS = function() { }
hxmotion.modifiers.CSS.__name__ = ["hxmotion","modifiers","CSS"];
hxmotion.modifiers.CSS.pos = function(ix,round,target,params) {
	$s.push("hxmotion.modifiers.CSS::pos");
	var $spos = $s.length;
	if(params.unit == null) params.unit = "px";
	if(params.initValue == null) params.initValue = { }
	{
		var _g = 0, _g1 = Reflect.fields(params);
		while(_g < _g1.length) {
			var prop = _g1[_g];
			++_g;
			if(prop != "initValue" && prop != "unit") {
				var initValue;
				if(Reflect.field(params.initValue,prop) != null) {
					initValue = Reflect.field(params.initValue,prop);
				}
				else {
					var rawValue = Reflect.field(target,prop);
					if(rawValue == null) {
						initValue = 0;
					}
					else {
						initValue = Std["int"](rawValue.split(params.unit).join(""));
					}
					params.initValue[prop] = initValue;
				}
				var value = Reflect.field(params,prop);
				var delta = value - initValue;
				target[prop] = Std["int"](initValue + delta * ix) + params.unit;
			}
		}
	}
	$s.pop();
}
hxmotion.modifiers.CSS.prototype.__class__ = hxmotion.modifiers.CSS;
js.Boot = function() { }
js.Boot.__name__ = ["js","Boot"];
js.Boot.__unhtml = function(s) {
	$s.push("js.Boot::__unhtml");
	var $spos = $s.length;
	{
		var $tmp = s.split("&").join("&amp;").split("<").join("&lt;").split(">").join("&gt;");
		$s.pop();
		return $tmp;
	}
	$s.pop();
}
js.Boot.__trace = function(v,i) {
	$s.push("js.Boot::__trace");
	var $spos = $s.length;
	var msg = (i != null?((i.fileName + ":") + i.lineNumber) + ": ":"");
	msg += js.Boot.__unhtml(js.Boot.__string_rec(v,"")) + "<br/>";
	var d = document.getElementById("haxe:trace");
	if(d == null) alert("No haxe:trace element defined\n" + msg);
	else d.innerHTML += msg;
	$s.pop();
}
js.Boot.__clear_trace = function() {
	$s.push("js.Boot::__clear_trace");
	var $spos = $s.length;
	var d = document.getElementById("haxe:trace");
	if(d != null) d.innerHTML = "";
	else null;
	$s.pop();
}
js.Boot.__closure = function(o,f) {
	$s.push("js.Boot::__closure");
	var $spos = $s.length;
	var m = o[f];
	if(m == null) {
		$s.pop();
		return null;
	}
	var f1 = function() {
		$s.push("js.Boot::__closure@67");
		var $spos = $s.length;
		{
			var $tmp = m.apply(o,arguments);
			$s.pop();
			return $tmp;
		}
		$s.pop();
	}
	f1.scope = o;
	f1.method = m;
	{
		$s.pop();
		return f1;
	}
	$s.pop();
}
js.Boot.__string_rec = function(o,s) {
	$s.push("js.Boot::__string_rec");
	var $spos = $s.length;
	if(o == null) {
		$s.pop();
		return "null";
	}
	if(s.length >= 5) {
		$s.pop();
		return "<...>";
	}
	var t = typeof(o);
	if(t == "function" && (o.__name__ != null || o.__ename__ != null)) t = "object";
	switch(t) {
	case "object":{
		if(o instanceof Array) {
			if(o.__enum__ != null) {
				if(o.length == 2) {
					var $tmp = o[0];
					$s.pop();
					return $tmp;
				}
				var str = o[0] + "(";
				s += "\t";
				{
					var _g1 = 2, _g = o.length;
					while(_g1 < _g) {
						var i = _g1++;
						if(i != 2) str += "," + js.Boot.__string_rec(o[i],s);
						else str += js.Boot.__string_rec(o[i],s);
					}
				}
				{
					var $tmp = str + ")";
					$s.pop();
					return $tmp;
				}
			}
			var l = o.length;
			var i;
			var str = "[";
			s += "\t";
			{
				var _g = 0;
				while(_g < l) {
					var i1 = _g++;
					str += ((i1 > 0?",":"")) + js.Boot.__string_rec(o[i1],s);
				}
			}
			str += "]";
			{
				$s.pop();
				return str;
			}
		}
		var tostr;
		try {
			tostr = o.toString;
		}
		catch( $e3 ) {
			{
				var e = $e3;
				{
					$e = [];
					while($s.length >= $spos) $e.unshift($s.pop());
					$s.push($e[0]);
					{
						$s.pop();
						return "???";
					}
				}
			}
		}
		if(tostr != null && tostr != Object.toString) {
			var s2 = o.toString();
			if(s2 != "[object Object]") {
				$s.pop();
				return s2;
			}
		}
		var k = null;
		var str = "{\n";
		s += "\t";
		var hasp = (o.hasOwnProperty != null);
		for( var k in o ) { ;
		if(hasp && !o.hasOwnProperty(k)) continue;
		if(k == "prototype" || k == "__class__" || k == "__super__" || k == "__interfaces__") continue;
		if(str.length != 2) str += ", \n";
		str += ((s + k) + " : ") + js.Boot.__string_rec(o[k],s);
		}
		s = s.substring(1);
		str += ("\n" + s) + "}";
		{
			$s.pop();
			return str;
		}
	}break;
	case "function":{
		{
			$s.pop();
			return "<function>";
		}
	}break;
	case "string":{
		{
			$s.pop();
			return o;
		}
	}break;
	default:{
		{
			var $tmp = String(o);
			$s.pop();
			return $tmp;
		}
	}break;
	}
	$s.pop();
}
js.Boot.__interfLoop = function(cc,cl) {
	$s.push("js.Boot::__interfLoop");
	var $spos = $s.length;
	if(cc == null) {
		$s.pop();
		return false;
	}
	if(cc == cl) {
		$s.pop();
		return true;
	}
	var intf = cc.__interfaces__;
	if(intf != null) {
		var _g1 = 0, _g = intf.length;
		while(_g1 < _g) {
			var i = _g1++;
			var i1 = intf[i];
			if(i1 == cl || js.Boot.__interfLoop(i1,cl)) {
				$s.pop();
				return true;
			}
		}
	}
	{
		var $tmp = js.Boot.__interfLoop(cc.__super__,cl);
		$s.pop();
		return $tmp;
	}
	$s.pop();
}
js.Boot.__instanceof = function(o,cl) {
	$s.push("js.Boot::__instanceof");
	var $spos = $s.length;
	try {
		if(o instanceof cl) {
			if(cl == Array) {
				var $tmp = (o.__enum__ == null);
				$s.pop();
				return $tmp;
			}
			{
				$s.pop();
				return true;
			}
		}
		if(js.Boot.__interfLoop(o.__class__,cl)) {
			$s.pop();
			return true;
		}
	}
	catch( $e4 ) {
		{
			var e = $e4;
			{
				$e = [];
				while($s.length >= $spos) $e.unshift($s.pop());
				$s.push($e[0]);
				if(cl == null) {
					$s.pop();
					return false;
				}
			}
		}
	}
	switch(cl) {
	case Int:{
		{
			var $tmp = Math.ceil(o%2147483648.0) === o;
			$s.pop();
			return $tmp;
		}
	}break;
	case Float:{
		{
			var $tmp = typeof(o) == "number";
			$s.pop();
			return $tmp;
		}
	}break;
	case Bool:{
		{
			var $tmp = o === true || o === false;
			$s.pop();
			return $tmp;
		}
	}break;
	case String:{
		{
			var $tmp = typeof(o) == "string";
			$s.pop();
			return $tmp;
		}
	}break;
	case Dynamic:{
		{
			$s.pop();
			return true;
		}
	}break;
	default:{
		if(o == null) {
			$s.pop();
			return false;
		}
		{
			var $tmp = o.__enum__ == cl || (cl == Class && o.__name__ != null) || (cl == Enum && o.__ename__ != null);
			$s.pop();
			return $tmp;
		}
	}break;
	}
	$s.pop();
}
js.Boot.__init = function() {
	$s.push("js.Boot::__init");
	var $spos = $s.length;
	js.Lib.isIE = (typeof document!='undefined' && document.all != null && typeof window!='undefined' && window.opera == null);
	js.Lib.isOpera = (typeof window!='undefined' && window.opera != null);
	Array.prototype.copy = Array.prototype.slice;
	Array.prototype.insert = function(i,x) {
		$s.push("js.Boot::__init@205");
		var $spos = $s.length;
		this.splice(i,0,x);
		$s.pop();
	}
	Array.prototype.remove = (Array.prototype.indexOf?function(obj) {
		$s.push("js.Boot::__init@208");
		var $spos = $s.length;
		var idx = this.indexOf(obj);
		if(idx == -1) {
			$s.pop();
			return false;
		}
		this.splice(idx,1);
		{
			$s.pop();
			return true;
		}
		$s.pop();
	}:function(obj) {
		$s.push("js.Boot::__init@213");
		var $spos = $s.length;
		var i = 0;
		var l = this.length;
		while(i < l) {
			if(this[i] == obj) {
				this.splice(i,1);
				{
					$s.pop();
					return true;
				}
			}
			i++;
		}
		{
			$s.pop();
			return false;
		}
		$s.pop();
	});
	Array.prototype.iterator = function() {
		$s.push("js.Boot::__init@225");
		var $spos = $s.length;
		{
			var $tmp = { cur : 0, arr : this, hasNext : function() {
				$s.push("js.Boot::__init@225@229");
				var $spos = $s.length;
				{
					var $tmp = this.cur < this.arr.length;
					$s.pop();
					return $tmp;
				}
				$s.pop();
			}, next : function() {
				$s.push("js.Boot::__init@225@232");
				var $spos = $s.length;
				{
					var $tmp = this.arr[this.cur++];
					$s.pop();
					return $tmp;
				}
				$s.pop();
			}}
			$s.pop();
			return $tmp;
		}
		$s.pop();
	}
	var cca = String.prototype.charCodeAt;
	String.prototype.cca = cca;
	String.prototype.charCodeAt = function(i) {
		$s.push("js.Boot::__init@239");
		var $spos = $s.length;
		var x = cca.call(this,i);
		if(isNaN(x)) {
			$s.pop();
			return null;
		}
		{
			$s.pop();
			return x;
		}
		$s.pop();
	}
	var oldsub = String.prototype.substr;
	String.prototype.substr = function(pos,len) {
		$s.push("js.Boot::__init@246");
		var $spos = $s.length;
		if(pos != null && pos != 0 && len != null && len < 0) {
			$s.pop();
			return "";
		}
		if(len == null) len = this.length;
		if(pos < 0) {
			pos = this.length + pos;
			if(pos < 0) pos = 0;
		}
		else if(len < 0) {
			len = (this.length + len) - pos;
		}
		{
			var $tmp = oldsub.apply(this,[pos,len]);
			$s.pop();
			return $tmp;
		}
		$s.pop();
	}
	$closure = js.Boot.__closure;
	$s.pop();
}
js.Boot.prototype.__class__ = js.Boot;
hxmotion.Shortcuts = function() { }
hxmotion.Shortcuts.__name__ = ["hxmotion","Shortcuts"];
hxmotion.Shortcuts.tween = function(target,params) {
	$s.push("hxmotion.Shortcuts::tween");
	var $spos = $s.length;
	if(Std["is"](params,Array)) {
		var longestTween = null;
		{
			var _g = 0, _g1 = (function($this) {
				var $r;
				var tmp = params;
				$r = (Std["is"](tmp,Array)?tmp:(function($this) {
					var $r;
					throw "Class cast error";
					return $r;
				}($this)));
				return $r;
			}(this));
			while(_g < _g1.length) {
				var t = _g1[_g];
				++_g;
				t.target = target;
				var tween = new hxmotion.BTween(t);
				if(longestTween == null || tween.time > longestTween.time) longestTween = tween;
			}
		}
		{
			$s.pop();
			return longestTween;
		}
	}
	params.target = target;
	{
		var $tmp = new hxmotion.BTween(params);
		$s.pop();
		return $tmp;
	}
	$s.pop();
}
hxmotion.Shortcuts.delay = function(interval) {
	$s.push("hxmotion.Shortcuts::delay");
	var $spos = $s.length;
	{
		var $tmp = new hxmotion.Delay(interval).start();
		$s.pop();
		return $tmp;
	}
	$s.pop();
}
hxmotion.Shortcuts.prototype.__class__ = hxmotion.Shortcuts;
Hash = function(p) { if( p === $_ ) return; {
	$s.push("Hash::new");
	var $spos = $s.length;
	this.h = {}
	if(this.h.__proto__ != null) {
		this.h.__proto__ = null;
		delete(this.h.__proto__);
	}
	else null;
	$s.pop();
}}
Hash.__name__ = ["Hash"];
Hash.prototype.exists = function(key) {
	$s.push("Hash::exists");
	var $spos = $s.length;
	try {
		key = "$" + key;
		{
			var $tmp = this.hasOwnProperty.call(this.h,key);
			$s.pop();
			return $tmp;
		}
	}
	catch( $e5 ) {
		{
			var e = $e5;
			{
				$e = [];
				while($s.length >= $spos) $e.unshift($s.pop());
				$s.push($e[0]);
				
				for(var i in this.h)
					if( i == key ) return true;
			;
				{
					$s.pop();
					return false;
				}
			}
		}
	}
	$s.pop();
}
Hash.prototype.get = function(key) {
	$s.push("Hash::get");
	var $spos = $s.length;
	{
		var $tmp = this.h["$" + key];
		$s.pop();
		return $tmp;
	}
	$s.pop();
}
Hash.prototype.h = null;
Hash.prototype.iterator = function() {
	$s.push("Hash::iterator");
	var $spos = $s.length;
	{
		var $tmp = { ref : this.h, it : this.keys(), hasNext : function() {
			$s.push("Hash::iterator@214");
			var $spos = $s.length;
			{
				var $tmp = this.it.hasNext();
				$s.pop();
				return $tmp;
			}
			$s.pop();
		}, next : function() {
			$s.push("Hash::iterator@215");
			var $spos = $s.length;
			var i = this.it.next();
			{
				var $tmp = this.ref["$" + i];
				$s.pop();
				return $tmp;
			}
			$s.pop();
		}}
		$s.pop();
		return $tmp;
	}
	$s.pop();
}
Hash.prototype.keys = function() {
	$s.push("Hash::keys");
	var $spos = $s.length;
	var a = new Array();
	
			for(var i in this.h)
				a.push(i.substr(1));
		;
	{
		var $tmp = a.iterator();
		$s.pop();
		return $tmp;
	}
	$s.pop();
}
Hash.prototype.remove = function(key) {
	$s.push("Hash::remove");
	var $spos = $s.length;
	if(!this.exists(key)) {
		$s.pop();
		return false;
	}
	delete(this.h["$" + key]);
	{
		$s.pop();
		return true;
	}
	$s.pop();
}
Hash.prototype.set = function(key,value) {
	$s.push("Hash::set");
	var $spos = $s.length;
	this.h["$" + key] = value;
	$s.pop();
}
Hash.prototype.toString = function() {
	$s.push("Hash::toString");
	var $spos = $s.length;
	var s = new StringBuf();
	s.b[s.b.length] = "{";
	var it = this.keys();
	{ var $it6 = it;
	while( $it6.hasNext() ) { var i = $it6.next();
	{
		s.b[s.b.length] = i;
		s.b[s.b.length] = " => ";
		s.b[s.b.length] = Std.string(this.get(i));
		if(it.hasNext()) s.b[s.b.length] = ", ";
	}
	}}
	s.b[s.b.length] = "}";
	{
		var $tmp = s.b.join("");
		$s.pop();
		return $tmp;
	}
	$s.pop();
}
Hash.prototype.__class__ = Hash;
$Main = function() { }
$Main.__name__ = ["@Main"];
$Main.prototype.__class__ = $Main;
$_ = {}
js.Boot.__res = {}
$s = [];
$e = [];
js.Boot.__init();
{
	Date.now = function() {
		$s.push("@Main::new@124");
		var $spos = $s.length;
		{
			var $tmp = new Date();
			$s.pop();
			return $tmp;
		}
		$s.pop();
	}
	Date.fromTime = function(t) {
		$s.push("@Main::new@127");
		var $spos = $s.length;
		var d = new Date();
		d["setTime"](t);
		{
			$s.pop();
			return d;
		}
		$s.pop();
	}
	Date.fromString = function(s) {
		$s.push("@Main::new@136");
		var $spos = $s.length;
		switch(s.length) {
		case 8:{
			var k = s.split(":");
			var d = new Date();
			d["setTime"](0);
			d["setUTCHours"](k[0]);
			d["setUTCMinutes"](k[1]);
			d["setUTCSeconds"](k[2]);
			{
				$s.pop();
				return d;
			}
		}break;
		case 10:{
			var k = s.split("-");
			{
				var $tmp = new Date(k[0],k[1] - 1,k[2],0,0,0);
				$s.pop();
				return $tmp;
			}
		}break;
		case 19:{
			var k = s.split(" ");
			var y = k[0].split("-");
			var t = k[1].split(":");
			{
				var $tmp = new Date(y[0],y[1] - 1,y[2],t[0],t[1],t[2]);
				$s.pop();
				return $tmp;
			}
		}break;
		default:{
			throw "Invalid date format : " + s;
		}break;
		}
		$s.pop();
	}
	Date.prototype["toString"] = function() {
		$s.push("@Main::new@165");
		var $spos = $s.length;
		var date = this;
		var m = date.getMonth() + 1;
		var d = date.getDate();
		var h = date.getHours();
		var mi = date.getMinutes();
		var s = date.getSeconds();
		{
			var $tmp = (((((((((date.getFullYear() + "-") + ((m < 10?"0" + m:"" + m))) + "-") + ((d < 10?"0" + d:"" + d))) + " ") + ((h < 10?"0" + h:"" + h))) + ":") + ((mi < 10?"0" + mi:"" + mi))) + ":") + ((s < 10?"0" + s:"" + s));
			$s.pop();
			return $tmp;
		}
		$s.pop();
	}
	Date.prototype.__class__ = Date;
	Date.__name__ = ["Date"];
}
{
	js.Lib.document = document;
	js.Lib.window = window;
	onerror = function(msg,url,line) {
		var stack = $s.copy();
		var f = js.Lib.onerror;
		$s.splice(0,$s.length);
		if( f == null ) {
			var i = stack.length;
			var s = "";
			while( --i >= 0 )
				s += "Called from "+stack[i]+"\n";
			alert(msg+"\n\n"+s);
			return false;
		}
		return f(msg,stack);
	}
}
{
	String.prototype.__class__ = String;
	String.__name__ = ["String"];
	Array.prototype.__class__ = Array;
	Array.__name__ = ["Array"];
	Int = { __name__ : ["Int"]}
	Dynamic = { __name__ : ["Dynamic"]}
	Float = Number;
	Float.__name__ = ["Float"];
	Bool = { __ename__ : ["Bool"]}
	Class = { __name__ : ["Class"]}
	Enum = { }
	Void = { __ename__ : ["Void"]}
}
{
	Math.NaN = Number["NaN"];
	Math.NEGATIVE_INFINITY = Number["NEGATIVE_INFINITY"];
	Math.POSITIVE_INFINITY = Number["POSITIVE_INFINITY"];
	Math.isFinite = function(i) {
		$s.push("@Main::new@73");
		var $spos = $s.length;
		{
			var $tmp = isFinite(i);
			$s.pop();
			return $tmp;
		}
		$s.pop();
	}
	Math.isNaN = function(i) {
		$s.push("@Main::new@85");
		var $spos = $s.length;
		{
			var $tmp = isNaN(i);
			$s.pop();
			return $tmp;
		}
		$s.pop();
	}
	Math.__name__ = ["Math"];
}
neash.events.EventDispatcher.mIDBase = 0;
neash.events.Event.ACTIVATE = "activate";
neash.events.Event.ADDED = "added";
neash.events.Event.ADDED_TO_STAGE = "addedToStage";
neash.events.Event.CANCEL = "cancel";
neash.events.Event.CHANGE = "change";
neash.events.Event.CLOSE = "close";
neash.events.Event.COMPLETE = "complete";
neash.events.Event.CONNECT = "connect";
neash.events.Event.DEACTIVATE = "deactivate";
neash.events.Event.ENTER_FRAME = "enterFrame";
neash.events.Event.ID3 = "id3";
neash.events.Event.INIT = "init";
neash.events.Event.MOUSE_LEAVE = "mouseLeave";
neash.events.Event.OPEN = "open";
neash.events.Event.REMOVED = "removed";
neash.events.Event.REMOVED_FROM_STAGE = "removedFromStage";
neash.events.Event.RENDER = "render";
neash.events.Event.RESIZE = "resize";
neash.events.Event.SCROLL = "scroll";
neash.events.Event.SELECT = "select";
neash.events.Event.SOUND_COMPLETE = "soundComplete";
neash.events.Event.TAB_CHILDREN_CHANGE = "tabChildrenChange";
neash.events.Event.TAB_ENABLED_CHANGE = "tabEnabledChange";
neash.events.Event.TAB_INDEX_CHANGE = "tabIndexChange";
neash.events.Event.UNLOAD = "unload";
hxmotion.events.BTweenEvent.START = "start";
hxmotion.events.BTweenEvent.STOP = "stop";
hxmotion.events.BTweenEvent.UPDATE = "update";
neash.events.Listener.sIDs = 1;
neash.events.EventPhase.CAPTURING_PHASE = 0;
neash.events.EventPhase.AT_TARGET = 1;
neash.events.EventPhase.BUBBLING_PHASE = 2;
neash.events.IOErrorEvent.IO_ERROR = "IO_ERROR";
js.Lib.onerror = null;
haxe.Timer.arr = new Array();
hxmotion.BTween.DEFAULT_EASE = $closure(hxmotion.Ease,"linear");
hxmotion.BTween.DEFAULT_TIME = 300;
hxmotion.BTween.DEFAULT_ROUNDED = false;
hxmotion.BTween.ENTER_FRAME = "enterFrame";
hxmotion.BTween.FLAG_MODARGS_REVERSION = "__reversion_pending";
hxmotion.BTween.timeProp = "time";
hxmotion.BTween.easeProp = "ease";
hxmotion.BTween.modifierProp = "mod";
hxmotion.BTween.roundedProp = "rounded";
hxmotion.BTween.targetProp = "target";
hxmotion.BTween.fromProp = "from";
hxmotion.BTween.enterFrameDispatcher = new jshelpers.FrameDispatcher();
$Main.init = MainJS.main();
