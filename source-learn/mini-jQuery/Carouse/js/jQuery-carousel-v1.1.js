;(function($) {
	/* @date 2017-12-11 20:40
	 * @author forguo
	 * @version 1.1
	 * @describ css change(color,font-size);
	 * */
	// 面向对象开发
	
	// 定义该构造函数
	var Carousel = function(ele, opt) {
		this.$element = ele,
		this.defaults = ({
			'color': 'red',
			'fontSize': '16px'
		}),
		this.defaults = $.extend({}, this.defaults, opt);
	}
	
	// 定义方法
	Carousel.prototype =  {
		slide: function() {
			return this.$element.css({
				'color': this.options.color,
				'font-size': this.options.fontSize
			})
		}
	}
	
	// 在插件中使用  Carousel 对象
	$.fn.Carousel = function(options) {
		
		var carousel = new Carousel(this,options);
		
		return carousel.slide();
		
	}
})(jQuery)