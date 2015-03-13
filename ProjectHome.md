_**Important note:** development (if any) is now focused on hxMotion branch. It currently compiles to Javascript and Haxe>SWF9, and once it's more complete I'll keep an updated SWC export for use with AS3. It's neat to use it with haxe, though, I love the syntactic sugar that 'using' keyword allows for, such as:_ ball.tween({x:200}).start.queue().back();

**This project is in public repository since Sep 2008. It's been created in the first half of 2007, while flex sdk was still in beta. First deployed project using it was an interface for BBC Scottland, dating back to July 2007. So don't dare calling this 'new', please.**

"If God does not exist, everything is permitted" - Fyodor Dostoevsky, in The Brothers Karamazov

"'Everything is permitted' does not mean that nothing is forbidden..." / "One can be virtuous through a whim" - Albert Camus, in The Absurd Man

BTween is aimed to provide both a very strict and verbose syntax - which motivated me to write this api - and a very loose,
quick'n'dirty one.

First one is intended to comply with the complexity of current flash/flex applications, which will benefit from the
tighter use of good OOP practices and patterns. Second is given to the simple uses we still may have of flash - you certainly
won't want to loose time creating a fully standardized and documented application when coding a simple banner, for example.
I strongly disrecommend the use of long chains of tweens in a single line for a serious application, as well as I recommend
the use of the regular Event model in most cases, and the instantiation of BTween objects instead of the
"static calls" way.

So this looks good to me:
```
var tween:BTween = new BTween();
tween.queue(trace,"I'm a callback");
tween.add({target:blueBall,y:100});
tween.add({target:redBall,y:200});
tween.start();
```
While this might be good for a banner that will be sent to trash after a couple of days of use
```
BTween.make().start({target:blueball,y:10},{target:redBall,y:200}).queue(doSomething);
```
With this being an intermediary approach:
```
var tween:BTween = new BTween();
tween.queue(doSomething);
tween.start({target:blueball,y:10},{target:redBall,y:200});
```
This flexibility haven't made of BTween a sumo fighter, though. The minimal footprint is around 3k, making it light enough
to be used in banners or other weight-sensitive uses. The API is also meant to be easily extensible, you can actually code your own extension in a
few minutes, implementing IProperty or ISequenceable interfaces.

BTween is in ALPHA state, though I've been using it for almost an year, and even its design is being improved each day.
If anyone is interested in helping, I'd be happy to give commit rights. Just contact me.

Please send your thoughts to pedromoraes@gmail.com. No beginner support requests please.