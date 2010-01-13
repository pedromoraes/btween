$estr = function() { return js.Boot.__string_rec(this,''); }
Reflect = function() { }
Reflect.__name__ = ["Reflect"];
Reflect.hasField = function(o,field) {
	if(o.hasOwnProperty != null) return o.hasOwnProperty(field);
	var arr = Reflect.fields(o);
	{ var $it0 = arr.iterator();
	while( $it0.hasNext() ) { var t = $it0.next();
	if(t == field) return true;
	}}
	return false;
}
Reflect.field = function(o,field) {
	var v = null;
	try {
		v = o[field];
	}
	catch( $e1 ) {
		{
			var e = $e1;
			null;
		}
	}
	return v;
}
Reflect.setField = function(o,field,value) {
	o[field] = value;
}
Reflect.callMethod = function(o,func,args) {
	return func.apply(o,args);
}
Reflect.fields = function(o) {
	if(o == null) return new Array();
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
	return a;
}
Reflect.isFunction = function(f) {
	return typeof(f) == "function" && f.__name__ == null;
}
Reflect.compare = function(a,b) {
	return ((a == b)?0:((((a) > (b))?1:-1)));
}
Reflect.compareMethods = function(f1,f2) {
	if(f1 == f2) return true;
	if(!Reflect.isFunction(f1) || !Reflect.isFunction(f2)) return false;
	return f1.scope == f2.scope && f1.method == f2.method && f1.method != null;
}
Reflect.isObject = function(v) {
	if(v == null) return false;
	var t = typeof(v);
	return (t == "string" || (t == "object" && !v.__enum__) || (t == "function" && v.__name__ != null));
}
Reflect.deleteField = function(o,f) {
	if(!Reflect.hasField(o,f)) return false;
	delete(o[f]);
	return true;
}
Reflect.copy = function(o) {
	var o2 = { }
	{
		var _g = 0, _g1 = Reflect.fields(o);
		while(_g < _g1.length) {
			var f = _g1[_g];
			++_g;
			o2[f] = Reflect.field(o,f);
		}
	}
	return o2;
}
Reflect.makeVarArgs = function(f) {
	return function() {
		var a = new Array();
		{
			var _g1 = 0, _g = arguments.length;
			while(_g1 < _g) {
				var i = _g1++;
				a.push(arguments[i]);
			}
		}
		return f(a);
	}
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
	if(this.mTarget != null) this.mTarget = target;
	else this.mTarget = this;
	this.mEventMap = new Hash();
}}
neash.events.EventDispatcher.__name__ = ["neash","events","EventDispatcher"];
neash.events.EventDispatcher.prototype.DispatchCompleteEvent = function() {
	var evt = new neash.events.Event(neash.events.Event.COMPLETE);
	this.dispatchEvent(evt);
}
neash.events.EventDispatcher.prototype.DispatchIOErrorEvent = function() {
	var evt = new neash.events.IOErrorEvent(neash.events.IOErrorEvent.IO_ERROR);
	this.dispatchEvent(evt);
}
neash.events.EventDispatcher.prototype.DumpListeners = function() {
	null;
}
neash.events.EventDispatcher.prototype.RemoveByID = function(inType,inID) {
	if(!this.mEventMap.exists(inType)) return;
	var list = this.mEventMap.get(inType);
	{
		var _g1 = 0, _g = list.length;
		while(_g1 < _g) {
			var i = _g1++;
			if(list[i].mID == inID) {
				list.splice(i,1);
				return;
			}
		}
	}
}
neash.events.EventDispatcher.prototype.addEventListener = function(type,inListener,useCapture,inPriority,useWeakReference) {
	var capture = (useCapture == null?false:useCapture);
	var priority = (inPriority == null?0:inPriority);
	var list = this.mEventMap.get(type);
	if(list == null) {
		list = new Array();
		this.mEventMap.set(type,list);
	}
	var l = new neash.events.Listener(inListener,capture,priority);
	list.push(l);
	return l.mID;
}
neash.events.EventDispatcher.prototype.dispatchEvent = function(event) {
	if(event.target == null) event.target = this.mTarget;
	var list = this.mEventMap.get(event.type);
	var capture = event.eventPhase == neash.events.EventPhase.CAPTURING_PHASE;
	if(list != null) {
		{
			var _g1 = 0, _g = list.length;
			while(_g1 < _g) {
				var i = _g1++;
				var listener = list[i];
				if(listener.mUseCapture == capture) {
					listener.dispatchEvent(event);
					if(event.IsCancelledNow()) return true;
				}
			}
		}
		return true;
	}
	return false;
}
neash.events.EventDispatcher.prototype.hasEventListener = function(type) {
	return this.mEventMap.exists(type);
}
neash.events.EventDispatcher.prototype.mEventMap = null;
neash.events.EventDispatcher.prototype.mTarget = null;
neash.events.EventDispatcher.prototype.removeEventListener = function(type,listener,inCapture) {
	if(!this.mEventMap.exists(type)) return;
	var list = this.mEventMap.get(type);
	var capture = (inCapture == null?false:inCapture);
	{
		var _g1 = 0, _g = list.length;
		while(_g1 < _g) {
			var i = _g1++;
			if(list[i].Is(listener,capture)) {
				list.splice(i,1);
				return;
			}
		}
	}
}
neash.events.EventDispatcher.prototype.willTrigger = function(type) {
	return this.hasEventListener(type);
}
neash.events.EventDispatcher.prototype.__class__ = neash.events.EventDispatcher;
neash.events.EventDispatcher.__interfaces__ = [neash.events.IEventDispatcher];
if(typeof jshelpers=='undefined') jshelpers = {}
jshelpers.FrameDispatcher = function(p) { if( p === $_ ) return; {
	neash.events.EventDispatcher.apply(this,[]);
	this.dispatch();
}}
jshelpers.FrameDispatcher.__name__ = ["jshelpers","FrameDispatcher"];
jshelpers.FrameDispatcher.__super__ = neash.events.EventDispatcher;
for(var k in neash.events.EventDispatcher.prototype ) jshelpers.FrameDispatcher.prototype[k] = neash.events.EventDispatcher.prototype[k];
jshelpers.FrameDispatcher.prototype.dispatch = function() {
	this.dispatchEvent(new neash.events.Event("enterFrame"));
	haxe.Timer.delay($closure(this,"dispatch"),25);
}
jshelpers.FrameDispatcher.prototype.__class__ = jshelpers.FrameDispatcher;
if(typeof haxe=='undefined') haxe = {}
haxe.Log = function() { }
haxe.Log.__name__ = ["haxe","Log"];
haxe.Log.trace = function(v,infos) {
	js.Boot.__trace(v,infos);
}
haxe.Log.clear = function() {
	js.Boot.__clear_trace();
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
}}
neash.events.Event.__name__ = ["neash","events","Event"];
neash.events.Event.prototype.IsCancelled = function() {
	return this.mIsCancelled;
}
neash.events.Event.prototype.IsCancelledNow = function() {
	return this.mIsCancelledNow;
}
neash.events.Event.prototype.SetPhase = function(inPhase) {
	this.eventPhase = inPhase;
}
neash.events.Event.prototype.bubbles = null;
neash.events.Event.prototype.cancelable = null;
neash.events.Event.prototype.clone = function() {
	return new neash.events.Event(this.type,this.bubbles,this.cancelable);
}
neash.events.Event.prototype.currentTarget = null;
neash.events.Event.prototype.eventPhase = null;
neash.events.Event.prototype.mIsCancelled = null;
neash.events.Event.prototype.mIsCancelledNow = null;
neash.events.Event.prototype.stopImmediatePropagation = function() {
	if(this.cancelable) this.mIsCancelledNow = this.mIsCancelled = true;
}
neash.events.Event.prototype.stopPropagation = function() {
	if(this.cancelable) this.mIsCancelled = true;
}
neash.events.Event.prototype.target = null;
neash.events.Event.prototype.toString = function() {
	return "Event";
}
neash.events.Event.prototype.type = null;
neash.events.Event.prototype.__class__ = neash.events.Event;
if(!hxmotion.events) hxmotion.events = {}
hxmotion.events.BTweenEvent = function(type,bubbles,cancelable) { if( type === $_ ) return; {
	if(cancelable == null) cancelable = false;
	if(bubbles == null) bubbles = false;
	neash.events.Event.apply(this,[type,bubbles,cancelable]);
}}
hxmotion.events.BTweenEvent.__name__ = ["hxmotion","events","BTweenEvent"];
hxmotion.events.BTweenEvent.__super__ = neash.events.Event;
for(var k in neash.events.Event.prototype ) hxmotion.events.BTweenEvent.prototype[k] = neash.events.Event.prototype[k];
hxmotion.events.BTweenEvent.prototype.clone = function() {
	return new hxmotion.events.BTweenEvent(this.type,this.bubbles,this.cancelable);
}
hxmotion.events.BTweenEvent.prototype.__class__ = hxmotion.events.BTweenEvent;
MainJS = function() { }
MainJS.__name__ = ["MainJS"];
MainJS.main = function() {
	js.Lib.window.onload = $closure(MainJS,"init");
}
MainJS.init = function(e) {
	hxmotion.Refs.ref();
}
MainJS.prototype.__class__ = MainJS;
StringBuf = function(p) { if( p === $_ ) return; {
	this.b = new Array();
}}
StringBuf.__name__ = ["StringBuf"];
StringBuf.prototype.add = function(x) {
	this.b[this.b.length] = x;
}
StringBuf.prototype.addChar = function(c) {
	this.b[this.b.length] = String.fromCharCode(c);
}
StringBuf.prototype.addSub = function(s,pos,len) {
	this.b[this.b.length] = s.substr(pos,len);
}
StringBuf.prototype.b = null;
StringBuf.prototype.toString = function() {
	return this.b.join("");
}
StringBuf.prototype.__class__ = StringBuf;
hxmotion.Sequenceable = function(target) { if( target === $_ ) return; {
	neash.events.EventDispatcher.apply(this,[target]);
}}
hxmotion.Sequenceable.__name__ = ["hxmotion","Sequenceable"];
hxmotion.Sequenceable.__super__ = neash.events.EventDispatcher;
for(var k in neash.events.EventDispatcher.prototype ) hxmotion.Sequenceable.prototype[k] = neash.events.EventDispatcher.prototype[k];
hxmotion.Sequenceable.prototype.back = function(trans) {
	return null;
}
hxmotion.Sequenceable.prototype.chain = function() {
	var ref = this;
	var chain = new hxmotion.Chain();
	chain.push(ref);
	while((ref = ref.previous) != null) {
		chain.push(ref);
	}
	return chain;
}
hxmotion.Sequenceable.prototype.change = function(params) {
	var fields = Reflect.fields(params);
	{
		var _g = 0;
		while(_g < fields.length) {
			var field = fields[_g];
			++_g;
			this[field] = Reflect.field(params,field);
		}
	}
	return this;
}
hxmotion.Sequenceable.prototype.dontRecycle = null;
hxmotion.Sequenceable.prototype.hold = function() {
	var ref = this;
	while((ref = ref.previous) != null) {
		ref.dontRecycle = true;
	}
	return this;
}
hxmotion.Sequenceable.prototype.next = null;
hxmotion.Sequenceable.prototype.previous = null;
hxmotion.Sequenceable.prototype.queue = function(obj,params) {
	var seq;
	if(Std["is"](obj,hxmotion.ISequenceable)) {
		seq = obj;
		this.addEventListener("stop",$closure(seq,"start"));
	}
	else if(Reflect.isFunction(obj)) {
		if(Std["is"](params,Array)) {
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
	return seq;
}
hxmotion.Sequenceable.prototype.start = function(params) {
	return null;
}
hxmotion.Sequenceable.prototype.stop = function(premature) {
	if(premature == null) premature = false;
	return null;
}
hxmotion.Sequenceable.prototype.toString = function() {
	return "Object Sequenceable";
}
hxmotion.Sequenceable.prototype.update = function(listener) {
	return this;
}
hxmotion.Sequenceable.prototype.__class__ = hxmotion.Sequenceable;
hxmotion.Sequenceable.__interfaces__ = [neash.events.IEventDispatcher,hxmotion.ISequenceable];
hxmotion.Delay = function(time) { if( time === $_ ) return; {
	if(time == null) time = 0;
	this.time = time;
	hxmotion.Sequenceable.apply(this,[]);
}}
hxmotion.Delay.__name__ = ["hxmotion","Delay"];
hxmotion.Delay.__super__ = hxmotion.Sequenceable;
for(var k in hxmotion.Sequenceable.prototype ) hxmotion.Delay.prototype[k] = hxmotion.Sequenceable.prototype[k];
hxmotion.Delay.call = function(time,callee,args) {
	if(time == null) time = 0;
	var delay = new hxmotion.Delay(time).start();
	var arr = [callee];
	if(args != null) {
		arr = arr.concat((Std["is"](args,Array)?[args]:[[args]]));
	}
	$closure(delay,"queue").apply(delay,arr);
	return delay;
}
hxmotion.Delay.prototype.onEnterFrame = function(evt) {
	if(jshelpers.Lib.getTimer() - this.startTime >= this.time) {
		this.stop();
		this.dispatchEvent(new hxmotion.events.BTweenEvent("stop"));
	}
}
hxmotion.Delay.prototype.start = function(params) {
	this.startTime = Std["int"](jshelpers.Lib.getTimer());
	hxmotion.BTween.enterFrameDispatcher.addEventListener(neash.events.Event.ENTER_FRAME,$closure(this,"onEnterFrame"));
	this.dispatchEvent(new hxmotion.events.BTweenEvent("start"));
	return this;
}
hxmotion.Delay.prototype.startTime = null;
hxmotion.Delay.prototype.stop = function(premature) {
	if(premature == null) premature = false;
	hxmotion.BTween.enterFrameDispatcher.removeEventListener(neash.events.Event.ENTER_FRAME,$closure(this,"onEnterFrame"));
	return this;
}
hxmotion.Delay.prototype.time = null;
hxmotion.Delay.prototype.__class__ = hxmotion.Delay;
hxmotion.Delay.__interfaces__ = [hxmotion.ISequenceable];
neash.events.Listener = function(inListener,inUseCapture,inPriority) { if( inListener === $_ ) return; {
	this.mListner = inListener;
	this.mUseCapture = inUseCapture;
	this.mPriority = inPriority;
	this.mID = neash.events.Listener.sIDs++;
}}
neash.events.Listener.__name__ = ["neash","events","Listener"];
neash.events.Listener.prototype.Is = function(inListener,inCapture) {
	return Reflect.compareMethods(this.mListner,inListener) && this.mUseCapture == inCapture;
}
neash.events.Listener.prototype.dispatchEvent = function(event) {
	this.mListner(event);
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
	this.method = method;
	if(params != null) this.params = params;
	hxmotion.Sequenceable.apply(this,[]);
}}
hxmotion.Call.__name__ = ["hxmotion","Call"];
hxmotion.Call.__super__ = hxmotion.Sequenceable;
for(var k in hxmotion.Sequenceable.prototype ) hxmotion.Call.prototype[k] = hxmotion.Sequenceable.prototype[k];
hxmotion.Call.prototype.method = null;
hxmotion.Call.prototype.onCalleeComplete = function(evt) {
	this.dispatchEvent(new hxmotion.events.BTweenEvent("stop"));
}
hxmotion.Call.prototype.params = null;
hxmotion.Call.prototype.start = function(params) {
	if(Std["is"](params,hxmotion.events.BTweenEvent)) {
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
	var result = this.method.apply(this,this.params);
	if(Std["is"](result,hxmotion.ISequenceable)) {
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
		return nextStep;
	}
	else {
		this.dispatchEvent(new hxmotion.events.BTweenEvent("stop"));
		return this;
	}
}
hxmotion.Call.prototype.__class__ = hxmotion.Call;
hxmotion.Call.__interfaces__ = [hxmotion.ISequenceable];
neash.events.IOErrorEvent = function(type,bubbles,cancelable,inText) { if( type === $_ ) return; {
	if(inText == null) inText = "";
	neash.events.Event.apply(this,[type,bubbles,cancelable]);
	this.text = inText;
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
	alert(js.Boot.__string_rec(v,""));
}
js.Lib.eval = function(code) {
	return eval(code);
}
js.Lib.setErrorHandler = function(f) {
	js.Lib.onerror = f;
}
js.Lib.prototype.__class__ = js.Lib;
jshelpers.Lib = function() { }
jshelpers.Lib.__name__ = ["jshelpers","Lib"];
jshelpers.Lib.__super__ = js.Lib;
for(var k in js.Lib.prototype ) jshelpers.Lib.prototype[k] = js.Lib.prototype[k];
jshelpers.Lib.getTimer = function() {
	return Std["int"](Date.now().getTime());
}
jshelpers.Lib.prototype.__class__ = jshelpers.Lib;
IntIter = function(min,max) { if( min === $_ ) return; {
	this.min = min;
	this.max = max;
}}
IntIter.__name__ = ["IntIter"];
IntIter.prototype.hasNext = function() {
	return this.min < this.max;
}
IntIter.prototype.max = null;
IntIter.prototype.min = null;
IntIter.prototype.next = function() {
	return this.min++;
}
IntIter.prototype.__class__ = IntIter;
haxe.Timer = function(time_ms) { if( time_ms === $_ ) return; {
	this.id = haxe.Timer.arr.length;
	haxe.Timer.arr[this.id] = this;
	this.timerId = window.setInterval(("haxe.Timer.arr[" + this.id) + "].run();",time_ms);
}}
haxe.Timer.__name__ = ["haxe","Timer"];
haxe.Timer.delay = function(f,time_ms) {
	var t = new haxe.Timer(time_ms);
	t.run = function() {
		t.stop();
		f();
	}
	return t;
}
haxe.Timer.stamp = function() {
	return Date.now().getTime() / 1000;
}
haxe.Timer.prototype.id = null;
haxe.Timer.prototype.run = function() {
	null;
}
haxe.Timer.prototype.stop = function() {
	if(this.id == null) return;
	window.clearInterval(this.timerId);
	haxe.Timer.arr[this.id] = null;
	if(this.id > 100 && this.id == haxe.Timer.arr.length - 1) {
		var p = this.id - 1;
		while(p >= 0 && haxe.Timer.arr[p] == null) p--;
		haxe.Timer.arr = haxe.Timer.arr.slice(0,p + 1);
	}
	this.id = null;
}
haxe.Timer.prototype.timerId = null;
haxe.Timer.prototype.__class__ = haxe.Timer;
Std = function() { }
Std.__name__ = ["Std"];
Std["is"] = function(v,t) {
	return js.Boot.__instanceof(v,t);
}
Std.string = function(s) {
	return js.Boot.__string_rec(s,"");
}
Std["int"] = function(x) {
	if(x < 0) return Math.ceil(x);
	return Math.floor(x);
}
Std.parseInt = function(x) {
	var v = parseInt(x);
	if(Math.isNaN(v)) return null;
	return v;
}
Std.parseFloat = function(x) {
	return parseFloat(x);
}
Std.random = function(x) {
	return Math.floor(Math.random() * x);
}
Std.prototype.__class__ = Std;
hxmotion.CollectionHelper = function() { }
hxmotion.CollectionHelper.__name__ = ["hxmotion","CollectionHelper"];
hxmotion.CollectionHelper.toTypedArray = function(v) {
	return v;
}
hxmotion.CollectionHelper.prototype.__class__ = hxmotion.CollectionHelper;
hxmotion.Ease = function() { }
hxmotion.Ease.__name__ = ["hxmotion","Ease"];
hxmotion.Ease.merge = function(easeIn,easeOut,swapPoint) {
	if(swapPoint == null) swapPoint = .5;
	return function(t,b,c,d) {
		var cs = c * swapPoint;
		var ds = d * swapPoint;
		if(t < ds) return easeIn(t,b,cs,ds);
		var diff = 1 - swapPoint;
		return easeOut(t - ds,b + cs,c * diff,d * diff);
	}
}
hxmotion.Ease.inBack = function(t,b,c,d) {
	var s = 1.70158;
	return ((c * (t /= d)) * t) * ((s + 1) * t - s) + b;
}
hxmotion.Ease.outBack = function(t,b,c,d) {
	var s = 1.70158;
	return c * (((t = t / d - 1) * t) * ((s + 1) * t + s) + 1) + b;
}
hxmotion.Ease.inOutBack = function(t,b,c,d) {
	var s = 1.70158;
	if((t /= d / 2) < 1) return (c / 2) * ((t * t) * (((s *= 1.525) + 1) * t - s)) + b;
	return (c / 2) * (((t -= 2) * t) * (((s *= 1.525) + 1) * t + s) + 2) + b;
}
hxmotion.Ease.outBounce = function(t,b,c,d) {
	if((t /= d) < (1 / 2.75)) return c * ((7.5625 * t) * t) + b;
	else if(t < (2 / 2.75)) return c * ((7.5625 * (t -= (1.5 / 2.75))) * t + .75) + b;
	else if(t < (2.5 / 2.75)) return c * ((7.5625 * (t -= (2.25 / 2.75))) * t + .9375) + b;
	else return c * ((7.5625 * (t -= (2.625 / 2.75))) * t + .984375) + b;
}
hxmotion.Ease.inBounce = function(t,b,c,d) {
	return (c - hxmotion.Ease.outBounce(d - t,0,c,d)) + b;
}
hxmotion.Ease.inOutBounce = function(t,b,c,d) {
	if(t < d / 2) return (c - hxmotion.Ease.outBounce(d - t * 2,0,c,d)) * .5 + b;
	else return (hxmotion.Ease.outBounce(t * 2 - d,0,c,d) * .5 + c * .5) + b;
}
hxmotion.Ease.inCirc = function(t,b,c,d) {
	return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b;
}
hxmotion.Ease.outCirc = function(t,b,c,d) {
	return c * Math.sqrt(1 - (t = t / d - 1) * t) + b;
}
hxmotion.Ease.inOutCirc = function(t,b,c,d) {
	if((t /= d / 2) < 1) return (-c / 2) * (Math.sqrt(1 - t * t) - 1) + b;
	return (c / 2) * (Math.sqrt(1 - (t -= 2) * t) + 1) + b;
}
hxmotion.Ease.inCubic = function(t,b,c,d) {
	return ((c * (t /= d)) * t) * t + b;
}
hxmotion.Ease.outCubic = function(t,b,c,d) {
	return c * (((t = t / d - 1) * t) * t + 1) + b;
}
hxmotion.Ease.inOutCubic = function(t,b,c,d) {
	if((t /= d / 2) < 1) return (((c / 2) * t) * t) * t + b;
	return (c / 2) * (((t -= 2) * t) * t + 2) + b;
}
hxmotion.Ease.inElastic = function(t,b,c,d) {
	if(t == 0) return b;
	if((t /= d) == 1) return b + c;
	var p = d * .3;
	var s;
	var a = c;
	s = p / 4;
	return -((a * Math.pow(2,10 * (t -= 1))) * Math.sin(((t * d - s) * (2 * Math.PI)) / p)) + b;
}
hxmotion.Ease.outElastic = function(t,b,c,d) {
	if(t == 0) return b;
	if((t /= d) == 1) return b + c;
	var p = d * .3;
	var s;
	var a = c;
	s = p / 4;
	return (((a * Math.pow(2,-10 * t)) * Math.sin(((t * d - s) * (2 * Math.PI)) / p) + c) + b);
}
hxmotion.Ease.inOutElastic = function(t,b,c,d) {
	if(t == 0) return b;
	if((t /= d / 2) == 2) return b + c;
	var s;
	var p = d * (.3 * 1.5);
	var a = c;
	s = p / 4;
	if(t < 1) return -0.5 * ((a * Math.pow(2,10 * (t -= 1))) * Math.sin(((t * d - s) * (2 * Math.PI)) / p)) + b;
	return (((a * Math.pow(2,-10 * (t -= 1))) * Math.sin(((t * d - s) * (2 * Math.PI)) / p)) * .5 + c) + b;
}
hxmotion.Ease.inExpo = function(t,b,c,d) {
	return ((t == 0)?b:c * Math.pow(2,10 * (t / d - 1)) + b);
}
hxmotion.Ease.outExpo = function(t,b,c,d) {
	return ((t == d)?b + c:c * (-Math.pow(2,(-10 * t) / d) + 1) + b);
}
hxmotion.Ease.inOutExpo = function(t,b,c,d) {
	if(t == 0) return b;
	if(t == d) return b + c;
	if((t /= d / 2) < 1) return (c / 2) * Math.pow(2,10 * (t - 1)) + b;
	return (c / 2) * (-Math.pow(2,-10 * --t) + 2) + b;
}
hxmotion.Ease.linear = function(t,b,c,d) {
	return (c * t) / d + b;
}
hxmotion.Ease.inQuad = function(t,b,c,d) {
	return (c * (t /= d)) * t + b;
}
hxmotion.Ease.outQuad = function(t,b,c,d) {
	return (-c * (t /= d)) * (t - 2) + b;
}
hxmotion.Ease.inOutQuad = function(t,b,c,d) {
	if((t /= d / 2) < 1) return ((c / 2) * t) * t + b;
	return (-c / 2) * ((--t) * (t - 2) - 1) + b;
}
hxmotion.Ease.inQuart = function(t,b,c,d) {
	return (((c * (t /= d)) * t) * t) * t + b;
}
hxmotion.Ease.outQuart = function(t,b,c,d) {
	return -c * ((((t = t / d - 1) * t) * t) * t - 1) + b;
}
hxmotion.Ease.inOutQuart = function(t,b,c,d) {
	if((t /= d / 2) < 1) return ((((c / 2) * t) * t) * t) * t + b;
	return (-c / 2) * ((((t -= 2) * t) * t) * t - 2) + b;
}
hxmotion.Ease.inQuint = function(t,b,c,d) {
	return ((((c * (t /= d)) * t) * t) * t) * t + b;
}
hxmotion.Ease.outQuint = function(t,b,c,d) {
	return c * (((((t = t / d - 1) * t) * t) * t) * t + 1) + b;
}
hxmotion.Ease.inOutQuint = function(t,b,c,d) {
	if((t /= d / 2) < 1) return (((((c / 2) * t) * t) * t) * t) * t + b;
	return (c / 2) * (((((t -= 2) * t) * t) * t) * t + 2) + b;
}
hxmotion.Ease.inSine = function(t,b,c,d) {
	return (-c * Math.cos((t / d) * (Math.PI / 2)) + c) + b;
}
hxmotion.Ease.outSine = function(t,b,c,d) {
	return c * Math.sin((t / d) * (Math.PI / 2)) + b;
}
hxmotion.Ease.inOutSine = function(t,b,c,d) {
	return (-c / 2) * (Math.cos((Math.PI * t) / d) - 1) + b;
}
hxmotion.Ease.prototype.__class__ = hxmotion.Ease;
List = function(p) { if( p === $_ ) return; {
	this.length = 0;
}}
List.__name__ = ["List"];
List.prototype.add = function(item) {
	var x = [item];
	if(this.h == null) this.h = x;
	else this.q[1] = x;
	this.q = x;
	this.length++;
}
List.prototype.clear = function() {
	this.h = null;
	this.q = null;
	this.length = 0;
}
List.prototype.filter = function(f) {
	var l2 = new List();
	var l = this.h;
	while(l != null) {
		var v = l[0];
		l = l[1];
		if(f(v)) l2.add(v);
	}
	return l2;
}
List.prototype.first = function() {
	return (this.h == null?null:this.h[0]);
}
List.prototype.h = null;
List.prototype.isEmpty = function() {
	return (this.h == null);
}
List.prototype.iterator = function() {
	return { h : this.h, hasNext : function() {
		return (this.h != null);
	}, next : function() {
		if(this.h == null) return null;
		var x = this.h[0];
		this.h = this.h[1];
		return x;
	}}
}
List.prototype.join = function(sep) {
	var s = new StringBuf();
	var first = true;
	var l = this.h;
	while(l != null) {
		if(first) first = false;
		else s.b[s.b.length] = sep;
		s.b[s.b.length] = l[0];
		l = l[1];
	}
	return s.b.join("");
}
List.prototype.last = function() {
	return (this.q == null?null:this.q[0]);
}
List.prototype.length = null;
List.prototype.map = function(f) {
	var b = new List();
	var l = this.h;
	while(l != null) {
		var v = l[0];
		l = l[1];
		b.add(f(v));
	}
	return b;
}
List.prototype.pop = function() {
	if(this.h == null) return null;
	var x = this.h[0];
	this.h = this.h[1];
	if(this.h == null) this.q = null;
	this.length--;
	return x;
}
List.prototype.push = function(item) {
	var x = [item,this.h];
	this.h = x;
	if(this.q == null) this.q = x;
	this.length++;
}
List.prototype.q = null;
List.prototype.remove = function(v) {
	var prev = null;
	var l = this.h;
	while(l != null) {
		if(l[0] == v) {
			if(prev == null) this.h = l[1];
			else prev[1] = l[1];
			if(this.q == l) this.q = prev;
			this.length--;
			return true;
		}
		prev = l;
		l = l[1];
	}
	return false;
}
List.prototype.toString = function() {
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
	return s.b.join("");
}
List.prototype.__class__ = List;
hxmotion.Chain = function(p) { if( p === $_ ) return; {
	hxmotion.Sequenceable.apply(this,[]);
	this.length = 0;
}}
hxmotion.Chain.__name__ = ["hxmotion","Chain"];
hxmotion.Chain.__super__ = hxmotion.Sequenceable;
for(var k in hxmotion.Sequenceable.prototype ) hxmotion.Chain.prototype[k] = hxmotion.Sequenceable.prototype[k];
hxmotion.Chain.prototype.add = function(item) {
	var x = [item];
	if(this.h == null) this.h = x;
	else this.q[1] = x;
	this.q = x;
	this.length++;
}
hxmotion.Chain.prototype.back = function(trans) {
	var c = new hxmotion.Chain();
	return c;
}
hxmotion.Chain.prototype.clear = function() {
	this.h = null;
	this.q = null;
	this.length = 0;
}
hxmotion.Chain.prototype.clone = function() {
	var c = new hxmotion.Chain();
	{
		var _g1 = 0, _g = this.length;
		while(_g1 < _g) {
			var i = _g1++;
			c.add(this.q[i]);
		}
	}
	return c;
}
hxmotion.Chain.prototype.filter = function(f) {
	var l2 = new List();
	var l = this.h;
	while(l != null) {
		var v = l[0];
		l = l[1];
		if(f(v)) l2.add(v);
	}
	return l2;
}
hxmotion.Chain.prototype.first = function() {
	return (this.h == null?null:this.h[0]);
}
hxmotion.Chain.prototype.h = null;
hxmotion.Chain.prototype.isEmpty = function() {
	return (this.h == null);
}
hxmotion.Chain.prototype.iterator = function() {
	return { h : this.h, hasNext : function() {
		return (this.h != null);
	}, next : function() {
		if(this.h == null) return null;
		var x = this.h[0];
		this.h = this.h[1];
		return x;
	}}
}
hxmotion.Chain.prototype.join = function(sep) {
	var s = new StringBuf();
	var first = true;
	var l = this.h;
	while(l != null) {
		if(first) first = false;
		else s.b[s.b.length] = sep;
		s.b[s.b.length] = l[0];
		l = l[1];
	}
	return s.b.join("");
}
hxmotion.Chain.prototype.last = function() {
	return (this.q == null?null:this.q[0]);
}
hxmotion.Chain.prototype.length = null;
hxmotion.Chain.prototype.map = function(f) {
	var b = new List();
	var l = this.h;
	while(l != null) {
		var v = l[0];
		l = l[1];
		b.add(f(v));
	}
	return b;
}
hxmotion.Chain.prototype.pop = function() {
	if(this.h == null) return null;
	var x = this.h[0];
	this.h = this.h[1];
	if(this.h == null) this.q = null;
	this.length--;
	return x;
}
hxmotion.Chain.prototype.push = function(item) {
	var x = [item,this.h];
	this.h = x;
	if(this.q == null) this.q = x;
	this.length++;
}
hxmotion.Chain.prototype.q = null;
hxmotion.Chain.prototype.queue = function(obj,params) {
	if(obj == null) return this.clone();
	else if(this.last() != null) return this.last().queue(obj,params);
	else return null;
}
hxmotion.Chain.prototype.remove = function(v) {
	var prev = null;
	var l = this.h;
	while(l != null) {
		if(l[0] == v) {
			if(prev == null) this.h = l[1];
			else prev[1] = l[1];
			if(this.q == l) this.q = prev;
			this.length--;
			return true;
		}
		prev = l;
		l = l[1];
	}
	return false;
}
hxmotion.Chain.prototype.stop = function(premature) {
	if(premature == null) premature = false;
	var l = this.h;
	while(l != null) {
		var v = l[0];
		l = l[1];
		v.stop(true);
	}
	return this;
}
hxmotion.Chain.prototype.toString = function() {
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
	return s.b.join("");
}
hxmotion.Chain.prototype.__class__ = hxmotion.Chain;
hxmotion.BTween = function(args) { if( args === $_ ) return; {
	hxmotion.Sequenceable.apply(this,[]);
	this.init();
	this.consume(args);
}}
hxmotion.BTween.__name__ = ["hxmotion","BTween"];
hxmotion.BTween.__super__ = hxmotion.Sequenceable;
for(var k in hxmotion.Sequenceable.prototype ) hxmotion.BTween.prototype[k] = hxmotion.Sequenceable.prototype[k];
hxmotion.BTween.prototype.back = function(trans) {
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
	return this;
}
hxmotion.BTween.prototype.clone = function() {
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
	return clone;
}
hxmotion.BTween.prototype.consume = function(args) {
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
}
hxmotion.BTween.prototype.ease = null;
hxmotion.BTween.prototype.init = function() {
	this.updateListeners = null;
	this.ease = hxmotion.BTween.DEFAULT_EASE;
	this.rounded = hxmotion.BTween.DEFAULT_ROUNDED;
	this.time = hxmotion.BTween.DEFAULT_TIME;
	this.props = new Array();
}
hxmotion.BTween.prototype.modifier = null;
hxmotion.BTween.prototype.modifierArgs = null;
hxmotion.BTween.prototype.props = null;
hxmotion.BTween.prototype.queue = function(obj,params) {
	if(obj == null) {
		var tween;
		if(params != null) tween = new hxmotion.BTween(params);
		else tween = this.clone();
		hxmotion.Sequenceable.prototype.queue.apply(this,[tween]);
		return tween;
	}
	return hxmotion.Sequenceable.prototype.queue.apply(this,[obj,params]);
}
hxmotion.BTween.prototype.reverseModArgs = function(args,deleteFlag) {
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
}
hxmotion.BTween.prototype.rounded = null;
hxmotion.BTween.prototype.start = function(args) {
	if(!Std["is"](args,hxmotion.events.BTweenEvent)) this.consume(args);
	this.startTime = jshelpers.Lib.getTimer();
	{
		var _g = 0, _g1 = this.props;
		while(_g < _g1.length) {
			var prop = _g1[_g];
			++_g;
			prop.initValue = Reflect.field(this.target,prop.name);
		}
	}
	if(this.modifier != null && Reflect.field(this.modifierArgs,"__reversion_pending") != null) {
		this.reverseModArgs(this.modifierArgs,true);
	}
	this.dispatchEvent(new hxmotion.events.BTweenEvent("start"));
	hxmotion.BTween.enterFrameDispatcher.addEventListener("enterFrame",$closure(this,"step"));
	return this;
}
hxmotion.BTween.prototype.startTime = null;
hxmotion.BTween.prototype.step = function(evt) {
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
}
hxmotion.BTween.prototype.stop = function(premature) {
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
	return this;
}
hxmotion.BTween.prototype.target = null;
hxmotion.BTween.prototype.time = null;
hxmotion.BTween.prototype.toString = function() {
	return ((((((("BTween: target:" + this.target) + ",time=") + this.time) + ",modifier:") + this.modifier) + ",modifierArgs:") + this.modifierArgs);
}
hxmotion.BTween.prototype.update = function(listener) {
	if(this.updateListeners == null) this.updateListeners = new Array();
	this.updateListeners.push(listener);
	this.addEventListener("update",listener);
	return this;
}
hxmotion.BTween.prototype.updateListeners = null;
hxmotion.BTween.prototype.__class__ = hxmotion.BTween;
if(!hxmotion.modifiers) hxmotion.modifiers = {}
hxmotion.modifiers.CSS = function() { }
hxmotion.modifiers.CSS.__name__ = ["hxmotion","modifiers","CSS"];
hxmotion.modifiers.CSS.pos = function(ix,round,target,params) {
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
}
hxmotion.modifiers.CSS.prototype.__class__ = hxmotion.modifiers.CSS;
js.Boot = function() { }
js.Boot.__name__ = ["js","Boot"];
js.Boot.__unhtml = function(s) {
	return s.split("&").join("&amp;").split("<").join("&lt;").split(">").join("&gt;");
}
js.Boot.__trace = function(v,i) {
	var msg = (i != null?((i.fileName + ":") + i.lineNumber) + ": ":"");
	msg += js.Boot.__unhtml(js.Boot.__string_rec(v,"")) + "<br/>";
	var d = document.getElementById("haxe:trace");
	if(d == null) alert("No haxe:trace element defined\n" + msg);
	else d.innerHTML += msg;
}
js.Boot.__clear_trace = function() {
	var d = document.getElementById("haxe:trace");
	if(d != null) d.innerHTML = "";
	else null;
}
js.Boot.__closure = function(o,f) {
	var m = o[f];
	if(m == null) return null;
	var f1 = function() {
		return m.apply(o,arguments);
	}
	f1.scope = o;
	f1.method = m;
	return f1;
}
js.Boot.__string_rec = function(o,s) {
	if(o == null) return "null";
	if(s.length >= 5) return "<...>";
	var t = typeof(o);
	if(t == "function" && (o.__name__ != null || o.__ename__ != null)) t = "object";
	switch(t) {
	case "object":{
		if(o instanceof Array) {
			if(o.__enum__ != null) {
				if(o.length == 2) return o[0];
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
				return str + ")";
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
			return str;
		}
		var tostr;
		try {
			tostr = o.toString;
		}
		catch( $e3 ) {
			{
				var e = $e3;
				{
					return "???";
				}
			}
		}
		if(tostr != null && tostr != Object.toString) {
			var s2 = o.toString();
			if(s2 != "[object Object]") return s2;
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
		return str;
	}break;
	case "function":{
		return "<function>";
	}break;
	case "string":{
		return o;
	}break;
	default:{
		return String(o);
	}break;
	}
}
js.Boot.__interfLoop = function(cc,cl) {
	if(cc == null) return false;
	if(cc == cl) return true;
	var intf = cc.__interfaces__;
	if(intf != null) {
		var _g1 = 0, _g = intf.length;
		while(_g1 < _g) {
			var i = _g1++;
			var i1 = intf[i];
			if(i1 == cl || js.Boot.__interfLoop(i1,cl)) return true;
		}
	}
	return js.Boot.__interfLoop(cc.__super__,cl);
}
js.Boot.__instanceof = function(o,cl) {
	try {
		if(o instanceof cl) {
			if(cl == Array) return (o.__enum__ == null);
			return true;
		}
		if(js.Boot.__interfLoop(o.__class__,cl)) return true;
	}
	catch( $e4 ) {
		{
			var e = $e4;
			{
				if(cl == null) return false;
			}
		}
	}
	switch(cl) {
	case Int:{
		return Math.ceil(o%2147483648.0) === o;
	}break;
	case Float:{
		return typeof(o) == "number";
	}break;
	case Bool:{
		return o === true || o === false;
	}break;
	case String:{
		return typeof(o) == "string";
	}break;
	case Dynamic:{
		return true;
	}break;
	default:{
		if(o == null) return false;
		return o.__enum__ == cl || (cl == Class && o.__name__ != null) || (cl == Enum && o.__ename__ != null);
	}break;
	}
}
js.Boot.__init = function() {
	js.Lib.isIE = (typeof document!='undefined' && document.all != null && typeof window!='undefined' && window.opera == null);
	js.Lib.isOpera = (typeof window!='undefined' && window.opera != null);
	Array.prototype.copy = Array.prototype.slice;
	Array.prototype.insert = function(i,x) {
		this.splice(i,0,x);
	}
	Array.prototype.remove = (Array.prototype.indexOf?function(obj) {
		var idx = this.indexOf(obj);
		if(idx == -1) return false;
		this.splice(idx,1);
		return true;
	}:function(obj) {
		var i = 0;
		var l = this.length;
		while(i < l) {
			if(this[i] == obj) {
				this.splice(i,1);
				return true;
			}
			i++;
		}
		return false;
	});
	Array.prototype.iterator = function() {
		return { cur : 0, arr : this, hasNext : function() {
			return this.cur < this.arr.length;
		}, next : function() {
			return this.arr[this.cur++];
		}}
	}
	var cca = String.prototype.charCodeAt;
	String.prototype.cca = cca;
	String.prototype.charCodeAt = function(i) {
		var x = cca.call(this,i);
		if(isNaN(x)) return null;
		return x;
	}
	var oldsub = String.prototype.substr;
	String.prototype.substr = function(pos,len) {
		if(pos != null && pos != 0 && len != null && len < 0) return "";
		if(len == null) len = this.length;
		if(pos < 0) {
			pos = this.length + pos;
			if(pos < 0) pos = 0;
		}
		else if(len < 0) {
			len = (this.length + len) - pos;
		}
		return oldsub.apply(this,[pos,len]);
	}
	$closure = js.Boot.__closure;
}
js.Boot.prototype.__class__ = js.Boot;
hxmotion.Refs = function() { }
hxmotion.Refs.__name__ = ["hxmotion","Refs"];
hxmotion.Refs.ref = function() {
	hxmotion.BTween;
	hxmotion.Call;
	hxmotion.Chain;
	hxmotion.Delay;
	hxmotion.Ease;
	hxmotion.Shortcuts;
	hxmotion.ISequenceable;
}
hxmotion.Refs.prototype.__class__ = hxmotion.Refs;
hxmotion.Shortcuts = function() { }
hxmotion.Shortcuts.__name__ = ["hxmotion","Shortcuts"];
hxmotion.Shortcuts.tween = function(target,params) {
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
		return longestTween;
	}
	params.target = target;
	return new hxmotion.BTween(params);
}
hxmotion.Shortcuts.delay = function(interval) {
	return new hxmotion.Delay(interval).start();
}
hxmotion.Shortcuts.prototype.__class__ = hxmotion.Shortcuts;
Hash = function(p) { if( p === $_ ) return; {
	this.h = {}
	if(this.h.__proto__ != null) {
		this.h.__proto__ = null;
		delete(this.h.__proto__);
	}
	else null;
}}
Hash.__name__ = ["Hash"];
Hash.prototype.exists = function(key) {
	try {
		key = "$" + key;
		return this.hasOwnProperty.call(this.h,key);
	}
	catch( $e5 ) {
		{
			var e = $e5;
			{
				
				for(var i in this.h)
					if( i == key ) return true;
			;
				return false;
			}
		}
	}
}
Hash.prototype.get = function(key) {
	return this.h["$" + key];
}
Hash.prototype.h = null;
Hash.prototype.iterator = function() {
	return { ref : this.h, it : this.keys(), hasNext : function() {
		return this.it.hasNext();
	}, next : function() {
		var i = this.it.next();
		return this.ref["$" + i];
	}}
}
Hash.prototype.keys = function() {
	var a = new Array();
	
			for(var i in this.h)
				a.push(i.substr(1));
		;
	return a.iterator();
}
Hash.prototype.remove = function(key) {
	if(!this.exists(key)) return false;
	delete(this.h["$" + key]);
	return true;
}
Hash.prototype.set = function(key,value) {
	this.h["$" + key] = value;
}
Hash.prototype.toString = function() {
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
	return s.b.join("");
}
Hash.prototype.__class__ = Hash;
$Main = function() { }
$Main.__name__ = ["@Main"];
$Main.prototype.__class__ = $Main;
$_ = {}
js.Boot.__res = {}
js.Boot.__init();
{
	Date.now = function() {
		return new Date();
	}
	Date.fromTime = function(t) {
		var d = new Date();
		d["setTime"](t);
		return d;
	}
	Date.fromString = function(s) {
		switch(s.length) {
		case 8:{
			var k = s.split(":");
			var d = new Date();
			d["setTime"](0);
			d["setUTCHours"](k[0]);
			d["setUTCMinutes"](k[1]);
			d["setUTCSeconds"](k[2]);
			return d;
		}break;
		case 10:{
			var k = s.split("-");
			return new Date(k[0],k[1] - 1,k[2],0,0,0);
		}break;
		case 19:{
			var k = s.split(" ");
			var y = k[0].split("-");
			var t = k[1].split(":");
			return new Date(y[0],y[1] - 1,y[2],t[0],t[1],t[2]);
		}break;
		default:{
			throw "Invalid date format : " + s;
		}break;
		}
	}
	Date.prototype["toString"] = function() {
		var date = this;
		var m = date.getMonth() + 1;
		var d = date.getDate();
		var h = date.getHours();
		var mi = date.getMinutes();
		var s = date.getSeconds();
		return (((((((((date.getFullYear() + "-") + ((m < 10?"0" + m:"" + m))) + "-") + ((d < 10?"0" + d:"" + d))) + " ") + ((h < 10?"0" + h:"" + h))) + ":") + ((mi < 10?"0" + mi:"" + mi))) + ":") + ((s < 10?"0" + s:"" + s));
	}
	Date.prototype.__class__ = Date;
	Date.__name__ = ["Date"];
}
{
	js.Lib.document = document;
	js.Lib.window = window;
	onerror = function(msg,url,line) {
		var f = js.Lib.onerror;
		if( f == null )
			return false;
		return f(msg,[url+":"+line]);
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
		return isFinite(i);
	}
	Math.isNaN = function(i) {
		return isNaN(i);
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
hxmotion.BTween.enterFrameDispatcher = new jshelpers.FrameDispatcher();
$Main.init = MainJS.main();
