(function ($) {
	$.fn.RightManu = function ( opts ) {
		var options = $.extend( {}, $.fn.RightManu.defaults, opts );
		return this.each( function () {
			var $element = $(this);
			//删除已有的
			$('body').children('.RM').remove();
			//添加现在需要的
			var RM = '<div class="absolute RM"><ul></ul></div>';
			$('body').prepend(RM);
			var $RM = $('body').find('.RM');
			// var x = 
			$RM.css({
				'width' : RMWidth,
				'height' : RMHeight,
				'top': y + 'px',
				'left': x + 'px',
			})

		});
	};
	$.fn.RightManu.defaults = {
		RMWidth: '150px',
		RMHeight: '230px',
	}
	// function RM ( ele, x, y ) {
	$.RM = function ( json, x, y ) {
		//删除已有的
		$('body').children('.RM').remove();
		// console.log( $('body').children('.RM') );
		//添加现在需要的
		var RM = '<div class="absolute RM"><ul></ul></div>';
		$('body').prepend(RM);
		var $RM = $('body').find('.RM');
		$RM.css({
			'width' : '150px',
			'height' : 'auto',
			'top': y,
			'left': x,
			'background': '#356',
		});
		for ( var i = 0; i < json.MI.length; i++ ) {
			// console.log( json.MI[i] );
			var li = '<li>' + json.MI[i] + '</li>';
			$RM.children('ul').append(li);
		}
	}	
})(jQuery)