(function($){
	/* @date 2017-12-11 20:40
	 * @author forguo
	 * @version 1.0
	 * @describ css change(color,font-size);
	 * */
	// 非面向对象开发
	$.fn.Carousel = function(options) {
		// 默认参数
		var defaults = {
			'color': 'red',
			'fontSize': '16px'
		};
		
		//{} 保护默认参数
		var settings = $.extend({}, defaults, options);
		
		// return this 为了链式调用
		return this.css({
			'color': settings.color,
			'font-size': settings.fontSize
		});
	}
})(jQuery)
