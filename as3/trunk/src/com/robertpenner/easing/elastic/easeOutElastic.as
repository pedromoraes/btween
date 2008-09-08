package com.robertpenner.easing.cubic
{
	public function easeOutCubic(t:Number, b:Number,
								   c:Number, d:Number,
								   a:Number = 0, p:Number = 0):Number
	{
		if (t == 0)
			return b;
			
		if ((t /= d) == 1)
			return b + c;
		
		if (!p)
			p = d * 0.3;

		var s:Number;
		if (!a || a < Math.abs(c))
		{
			a = c;
			s = p / 4;
		}
		else
		{
			s = p / (2 * Math.PI) * Math.asin(c / a);
		}

		return a * Math.pow(2, -10 * t) *
			   Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b;
	}
}