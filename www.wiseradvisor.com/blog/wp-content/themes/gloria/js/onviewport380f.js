(function($){"use strict";

  /**
   * Copyright 2012, Digital Fusion
   * Licensed under the MIT license.
   * http://teamdf.com/jquery-plugins/license/
   *
   * @author Sam Sehnert
   * @desc A small plugin that checks whether elements are within
   *     the user visible viewport of a web browser.
   *     only accounts for vertical position, not horizontal.
   */

  $.fn.visible = function(partial) {
    if (typeof ($(this).offset()) !== 'undefined') {
        
        var $t            = $(this),
          $w            = $(window),
          viewTop       = $w.scrollTop(),
          viewBottom    = viewTop + $w.height(),
          _top          = $t.offset().top,
          _bottom       = _top + $t.height(),
          compareTop    = partial === true ? _bottom : _top,
          compareBottom = partial === true ? _top : _bottom;
        
        return (((compareBottom <= viewBottom) && (compareTop >= viewTop)) || ((compareBottom <= viewBottom) && (compareTop >= viewTop)));
    }

  };
  jQuery(document).ready(function($) {
    
        var bkWindow = $(window),
            bkRatingBars = $('.bk-overlay').find('.bk-zero-trigger'),
            bkthumbnail;
        
        $('#body-wrapper').imagesLoaded(function(){
            setTimeout(function() {
                bkthumbnail = $('#page-wrap').find('.thumb');
                $.each(bkthumbnail, function(i, value) {
                    var bkValue = $(value);
                    if (( bkValue.visible(true) )&& ( bkValue.hasClass('hide-thumb'))) {
                        bkValue.removeClass('hide-thumb');                
                    } 
                });
                $.each(bkRatingBars, function(i, value) {
                    var bkValue = $(value);
                    if ( bkValue.visible(true) ) {
                        bkValue.removeClass('bk-zero-trigger'); 
                        bkValue.removeClass ('user-score-initial');
                        bkValue.addClass('bk-bar-ani'); 
                        setTimeout(function() {
                            bkValue.find('.bk-criteria-score').removeClass('hide');
                        },200);
                    } 
                });
            },1200);
        });   
     
        setTimeout(function() {
            bkWindow.scroll(function(event) {
                bkthumbnail = $('#page-wrap').find('.thumb');
                if (bkthumbnail != '') {
                    $.each(bkthumbnail, function(i, value) {
                        var bkValue = $(value);
                        if ( ( bkValue.visible(true) ) && ( bkValue.hasClass('hide-thumb') ) ) {
                            bkValue.removeClass('hide-thumb');  
                        } 
                    });     
                    $.each(bkRatingBars, function(i, value) {
                        var bkValue = $(value);
                        if ( ( bkValue.visible(true) ) && ( bkValue.hasClass('bk-zero-trigger') ) ) {
            
                            bkValue.removeClass('bk-zero-trigger'); 
                            bkValue.removeClass ('user-score-initial');
                            bkValue.addClass('bk-bar-ani'); 
                            setTimeout(function() {
                                bkValue.find('.bk-criteria-score').removeClass('hide');
                            },200);
                        } 
                    });
                }
            });
        },2000);  
        
          	/* Show bottom single post recommend box */
    	if ($('.recommend-box')[0]) {
    		var recommend_box = $('.recommend-box');
            bkWindow.scroll(function(event) {
        		if ($('.footer').visible(true)){
        			recommend_box.addClass('recommend-box-on');
        		} else {
        			recommend_box.removeClass('recommend-box-on');
        		}
            });
    		
    		$('.recommend-box .close').click(function(e){
    			e.preventDefault();
    			$('.recommend-box').toggleClass('recommend-box-on recommend-box-off');
    		});
    	}
        
        if($('.share-sticky')[0]) {
            var share_sticky = $('.share-sticky');
    		if (share_sticky.hasClass('enable')) {
  		        share_sticky.addClass('sticky-share-on');
    		}
    		$('.share-sticky-close').click(function(e){
    			e.preventDefault();
    			share_sticky.removeClass('sticky-share-on');
                $('.share-sticky-open').css('left','0');
                share_sticky.addClass('disable-scroll-effect');
    		});
            $('.share-sticky-open').click(function(e){
    			e.preventDefault();
    			share_sticky.addClass('sticky-share-on');
                $('.share-sticky-open').css('left','-50px');
                share_sticky.removeClass('disable-scroll-effect');
    		});
        }
    }); 
})(jQuery);