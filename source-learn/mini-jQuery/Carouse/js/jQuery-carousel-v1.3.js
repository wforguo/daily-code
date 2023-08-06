;
(function($, windows, document, undefined) {
	/* @date 2017-12-13 11:40
	 * @author forguo
	 * @version 1.3
	 * @describe Carousel-slider
	 * 实现基本轮播功能
	 * */
	// 面向对象开发

	// 定义该构造函数
	var Carousel = function(ele, opt) {
		this.$element = ele;
		this.defaults = ({
			autoTime: '2000', // 自动播放间隔
			paging: '.paging', // 分页容器
			prevBtn: '.prev-btn', // 前进按钮
			nextBtn: '.next-btn' // 后退按钮
		});
		this.defaults = $.extend({}, this.defaults, opt);
//		console.log(this.defaults);
		this.init();
	}

	// 定义方法
	Carousel.prototype = {
		// 初始化
		init: function() {
			this.initSlider();
			this.autoSlide();
			this.bindEvent();
			this.index = 0;
			this.changePageNum(this.index);
		},
		// 轮播样式初始化
		initSlider: function() {
			var that = this;
			var $container = that.$element;
			var $curouSlide = $container.find('.carousel-slider');
			that.size = $curouSlide.find('.carousel-item').size();
			that.width = $curouSlide.find('.carousel-item').width();
			$container.css('width', that.width);
			$curouSlide.append($curouSlide.find('.carousel-item').first().clone());
			$curouSlide.prepend($curouSlide.find('.carousel-item').last().clone());
			var newSize = $curouSlide.find('.carousel-item').size();
			$curouSlide.css({
				'width': that.width * newSize,
				'left': 0 - that.width
			});

			for(i = 0; i < this.size; i++) {
				$(".paging").append($("<li></li>"));
			}
		},
		// 下一页
		slideNext: function() {
			var that = this;
			var $container = that.$element;
			var $curouSlide = $container.find('.carousel-slider');
			var width = that.width,
				size = that.size;

			$curouSlide.animate({
				'left': '-=' + width
			}, function() {
				that.index += 1;
				that.changePageNum(that.index);
				//				console.log(that.index);
				if(that.index === size) {
					$curouSlide.css({
						left: 0 - width
					});
					that.index = 0;
					that.changePageNum(that.index);
				}
			});
		},
		// 上一页
		slidePrev: function() {
			var that = this;
			var $container = that.$element;
			var $curouSlide = $container.find('.carousel-slider');
			var width = that.width,
				size = that.size;

			$curouSlide.animate({
				'left': '+=' + width
			}, function() {
				that.index -= 1;
				//				console.log(that.index);
				that.changePageNum(that.index);
				if(that.index === (-1)) {
					$curouSlide.css({
						left: 0 - width * size
					});
					that.index = size - 1;
					that.changePageNum(that.index);
				}
			});
		},
		// 自动播放
		autoSlide: function() {
			var that = this;
			that.slideAuto = setInterval(function() {
				that.slideNext();
			}, that.defaults.autoTime);
		},
		// 添加事件
		bindEvent: function() {
			var that = this;
			// 前进
			that.$element.on('click', that.defaults.nextBtn, function() {
				that.slideNext();
			})
			// 后退
			that.$element.on('click', that.defaults.prevBtn, function() {
				that.slidePrev();
			})

			// 停止轮播
			that.$element.on('mouseenter', that.$element.find('.carousel-item'), function() {
				// console.log("stop");
				clearInterval(that.slideAuto);
			})
			// 开始播放
			that.$element.on('mouseleave', that.$element.find('.carousel-item'), function() {
				that.autoSlide();
			})

			// 分页
			that.$element.find(that.defaults.paging).on('click','li',function(){
				var $pageBtn = $(this);
				var linkIndex = $(that.defaults.paging).find("li").index($pageBtn);
				if(linkIndex === that.index) {
					return;
				}
				var $container = that.$element;
				var $curouSlide = $container.find('.carousel-slider');
				var width = $curouSlide.find('.carousel-item').width();
				var size = $curouSlide.find('.carousel-item').size();

				$curouSlide.animate({
					'left': -(linkIndex + 1) * width
				}, function() {
					that.index = linkIndex;
					that.changePageNum(that.index);
				});
			})

		},

		// 改变分页选择器
		changePageNum: function(crrent_page) {
			var $pageBtn = $(this.defaults.paging).find('li');
			$pageBtn.eq(crrent_page).addClass('curr-page').siblings().removeClass('curr-page');
		}
	}

	// 在插件中使用  Carousel 对象
	// $.fn.Carousel = function(options) {
	// 	return new Carousel(this, options);
	// }

    $.fn.extend({
        Carousel(options) {
            return new Carousel(this, options);
        }
    })
})(jQuery, window, document)
