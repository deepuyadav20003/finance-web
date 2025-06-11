(function($) {
  "use strict";
    $=jQuery;
    jQuery(document).ready(function($){
        $('.price_slider_amount').css('opacity', '1');
/** Tabs Responsive **/
        $('.bk-tabs-wrapper').find('.bk-module-tabs').addClass('mobileoff');
        if($(window).width() <= 639) {
            if(!($('.bk-tabs-wrapper').hasClass('bk-mobile-detect'))) {
                $('.bk-tabs-wrapper').addClass('bk-mobile-detect');
            }
        }else {
            if($('.bk-tabs-wrapper').hasClass('bk-mobile-detect')) {
                $('.bk-tabs-wrapper').removeClass('bk-mobile-detect');
            }
        }
        $(window).resize(function(){
            if ($('.bk-tabs-wrapper').find('.bk-module-tabs').hasClass('mobileon')) {
                $('.bk-tabs-wrapper').find('.bk-module-tabs').removeClass('mobileon');
                $('.bk-tabs-wrapper').find('.bk-module-tabs').addClass('mobileoff');
            }
            if($(window).width() <= 639) {
                if(!($('.bk-tabs-wrapper').hasClass('bk-mobile-detect'))) {
                    $('.bk-tabs-wrapper').addClass('bk-mobile-detect');
                }
            }else {
                if($('.bk-tabs-wrapper').hasClass('bk-mobile-detect')) {
                    $('.bk-tabs-wrapper').removeClass('bk-mobile-detect');
                }
            }
        });
        $('.bk-tabs-wrapper').click(function(){
            if($(this).hasClass('bk-mobile-detect')) {
                if($(this).find('.bk-module-tabs').hasClass('mobileoff')) {
                    $(this).find('.bk-module-tabs').removeClass('mobileoff');
                    $(this).find('.bk-module-tabs').addClass('mobileon');
                }else {
                    $(this).find('.bk-module-tabs').removeClass('mobileon');
                    $(this).find('.bk-module-tabs').addClass('mobileoff');
                }
            }else {
                return false;
            }
        });
/** Ticker **/
        $('#'+ajax_c['tickerid']).ticker({
            titleText: ajax_c['tickertitle'],
            direction: 'ltr',
            controls: false,
        });
        setTimeout(function() {
            var tk_titleW = $('.ticker-title').find('span').width();
            $('.ticker-title').css('width', tk_titleW); 
            $('.bk-ticker-wrapper').css('opacity', '1');  
        },1000);
//video playlist  
        if($('.module-video-playlist').length) {
            var bkvideoDataID, bkvideoHolder;
            $('.module-video-playlist').find('.thumb').removeClass('hide-thumb');
            $('.module-video-playlist').find('.bk-video-item:first-child').addClass('active');
            bkvideoDataID = $('.module-video-playlist').find('.bk-video-item:first-child').attr("data-id").split("&+");
            bkvideoHolder = $('.module-video-playlist').find('.bk-frame-wrap');
            if (bkvideoDataID[0] == 'v') {
                bkvideoHolder.append('<iframe src="//player.vimeo.com/video/'+bkvideoDataID[1]+'?api=1&amp;title=0&amp;byline=0&amp;portrait=0&amp;color=ffffff"></iframe>');
            }else if (bkvideoDataID[0] == 'y') {
                if(gloria_ssl[0] == 1) {
                    bkvideoHolder.append('<iframe width="1050" height="591" src="https://www.youtube.com/embed/'+bkvideoDataID[1]+'" allowFullScreen ></iframe>');
                }else {
                    bkvideoHolder.append('<iframe width="1050" height="591" src="http://www.youtube.com/embed/'+bkvideoDataID[1]+'" allowFullScreen ></iframe>');
                }
            }
            $('.bk-playlist-wrap').find('li').click(function(e){
                e.preventDefault();
                if ($(this).hasClass('active')) {
                    return;
                }
                $('.bk-playlist-wrap').find('li').removeClass('active');
                $(this).addClass('active');
                bkvideoDataID = $(this).attr("data-id").split("&+");
                bkvideoHolder = $(this).parents('.bk-playlist-wrap').siblings().children();
                bkvideoHolder.empty();
                bkvideoHolder.append('<div class="bk-preload"></div>');
                if (bkvideoDataID[0] == 'v') {
                    bkvideoHolder.append('<iframe src="//player.vimeo.com/video/'+bkvideoDataID[1]+'?api=1&amp;title=0&amp;byline=0&amp;portrait=0&amp;color=ffffff"></iframe>');
                }else if (bkvideoDataID[0] == 'y') {
                    if(gloria_ssl[0] == 1) {
                        bkvideoHolder.append('<iframe width="1050" height="591" src="https://www.youtube.com/embed/'+bkvideoDataID[1]+'" allowFullScreen ></iframe>');
                    }else {
                        bkvideoHolder.append('<iframe width="1050" height="591" src="http://www.youtube.com/embed/'+bkvideoDataID[1]+'" allowFullScreen ></iframe>');
                    }
                }
            });
            $(".bk-playlist").mCustomScrollbar({
				theme:"light",
			});
        }      

        $('.bk-links-remember').click(function(){
            event.preventDefault();
            $(this).parents('.bk-form-wrapper').hide();
            $(this).parents('.bk-form-wrapper').siblings('.bk-remember-form-wrapper').fadeIn(500);
        });
        $('.bk-back-login').click(function(){
            event.preventDefault();
            if ($(this).parents('.bk-form-wrapper').hasClass('bk-remember-form-wrapper')) {
                $(this).parents('.bk-form-wrapper').siblings('.bk-register-form-wrapper').hide();
            }else if ($(this).parents('.bk-form-wrapper').hasClass('bk-register-form-wrapper')) {
                $(this).parents('.bk-form-wrapper').siblings('.bk-remember-form-wrapper').hide();  
            }
            $(this).parents('.bk-form-wrapper').hide();
            $(this).parents('.bk-form-wrapper').siblings('.bk-login-form-wrapper').fadeIn(500);
        });
        
        $('.bk-links-register-inline').click(function(){
            event.preventDefault();
            $(this).parents('.bk-form-wrapper').hide();
            $(this).parents('.bk-form-wrapper').siblings('.bk-register-form-wrapper').fadeIn(500);
        });
        
        $("#main-mobile-menu").css("display", "block");    
        $('#mobile-menu > ul > li.menu-item-has-children').prepend('<div class="expand"><i class="fa fa-chevron-down"></i></div>');
        $('#mobile-top-menu > ul > li.menu-item-has-children').prepend('<div class="expand"><i class="fa fa-chevron-down"></i></div>');    
        $('.expand').click(function(){
            $(this).siblings('.sub-menu').toggle(300); 
        });
        //Widget tabs
        $(".widget-tabs .widget-tab-titles li").click(function() {
        	$(this).siblings("li").removeClass('active');
        	$(this).addClass("active");
        	$(this).parents(".widget-tabs").find(".tab-content").hide();
        	var selected_tab = $(this).find("a").attr("href");
        	$(this).parents(".widget-tabs").find(selected_tab).show();
        	return false;
        });   
        // Post Review
        $(".widget-review-tabs .widget-tab-titles li").click(function() {
        	$(this).siblings("li").removeClass('active');
        	$(this).addClass("active");
        	$(this).parents(".widget-review-tabs").find(".reviews-tab-content").hide();
        	var selected_tab = $(this).find("a").attr("href");
        	$(this).parents(".widget-review-tabs").find(selected_tab).show();
        	return false;
        });        
    // display breaking module
        $('.module-carousel').removeClass('hide');
        $('.bk-embed-video').fitVids();
        $('.single .article-content').fitVids();
        var bkWindowWidth = $(window).width(),
            bkWindowHeight = $(window).height();
    // Ajax search 
        $('#ajax-form-search').click(function(){
            if ($('.ajax-form input').height() == 0){
                $('.ajax-form input').css('height','48px');
                $('.ajax-form').css('padding','0 54px 0 0');
                $('.ajax-form input').css('padding','8px 12px');
                $('.ajax-form input').css('font-size','14px'); 
                $('.ajax-form input').val('');
            } else {
                $('.ajax-form input').css('height','0');
                $('.ajax-form').css('padding','0');
                $('.ajax-form input').css('padding','0');
                $('.ajax-form input').css('font-size','0'); 
                $('#ajax-search-result').empty().css('height', 'auto');
                $('#ajax-search-result').css({'box-shadow' : 'none'});
                $('.ajax-search-wrap').css({'width' : '0px'});
            }
            
        });
    
        $('#search-form-text').keyup(function () {
            var value = $(this).val();
            var $container = $('#ajax-search-result');
            $('.ajax-search-wrap').css({'width' : '350px'});
            setTimeout(function() {
                if (value) {
                    var search_class = $('#ajax-search-result');
                    search_class.fadeIn(300).html('<div class="loading-img-wrap"><div class="bk-preload"></div></div>');
                    var data = {
                        action: 'bk_ajax_search',
                        s: value
                    };
                    $.post(ajaxurl, data, function (response) {
                        response = $.parseJSON(response);
                        $('#ajax-search-result').empty().hide().css('height', 'auto').html(response.content).fadeIn(300).css('height', search_class.height());
                        setTimeout(function() {
                            $($container).find('.thumb').removeClass('hide-thumb');
                            $($container).css({'box-shadow' : '0px 1px 3px 1px rgba(0, 0, 0, 0.2)'});
                        }, 150);
                    });
                } else  $('#ajax-search-result').fadeOut(300, function () {
                    $(this).empty().css('height', 'auto');
                    $($container).css({'box-shadow' : 'none'});
                });
    
            }, 450);
        });

        if($('#page-content-wrap').children('.bksection:first-child').find('.bkmodule:first-child').hasClass('module-feature-2') == true) {
            if($('.header-wrap').hasClass('.bk-header-90-sport-2')) {
                $('#page-content-wrap').css('margin-top', '40px');
            }else {
                $('#page-content-wrap').css('margin-top', 0);
            }
        }
        $('.img-popup-link').magnificPopup({
    		type: 'image',
            removalDelay: 300,
            mainClass: 'mfp-fade',
    		closeOnContentClick: true,
    		closeBtnInside: false,
    		fixedContentPos: true,		
    		image: {
    			verticalFit: true
    		}
    	});
        if (typeof justified_ids !== 'undefined') {
            $.each( justified_ids, function( index, justified_id ) {
            	$(".justifiedgall_"+justified_id).justifiedGallery({
            		rowHeight: 200,
            		fixedHeight: false,
            		lastRow: 'justify',
            		margins: 4,
            		randomize: false,
                    sizeRangeSuffixes: {lt100:"",lt240:"",lt320:"",lt500:"",lt640:"",lt1024:""},
            	});
            });
        }        
        $('.zoom-gallery').each(function() { // the containers for all your galleries
            $(this).magnificPopup({
        		delegate: 'a.zoomer',
        		type: 'image',
        		closeOnContentClick: false,
        		closeBtnInside: false,
        		mainClass: 'mfp-with-zoom mfp-img-mobile',
        		image: {
                    tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
        			verticalFit: true,
        			titleSrc: function(item) {
                        //console.log(item.el[0]);
        				return ' <a class="image-source-link" href="'+item.el.attr('data-source')+'" target="_blank">'+ item.el.attr('title') + '</a>';
        			}
        		},
        		gallery: {
        			enabled: true,
                    navigateByImgClick: true,
                    preload: [0,1]
        		},
                zoom: {
        			enabled: true,
        			duration: 600, // duration of the effect, in milliseconds
                    easing: 'ease', // CSS transition easing function
        			opener: function(element) {
        				return element.find('img');
        			}
        		}
        	});	
    	}); 
         $('#bk-gallery-slider').each(function() { // the containers for all your galleries
            $(this).magnificPopup({
        		delegate: 'a.zoomer',
        		type: 'image',
        		closeOnContentClick: false,
        		closeBtnInside: false,
                removalDelay: 300,
        		//mainClass: 'mfp-with-zoom mfp-img-mobile',
                mainClass: 'mfp-fade',
        		image: {
                    tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
        			verticalFit: true,
        			titleSrc: function(item) {
                        //console.log(item.el[0]);
        				return ' <a class="image-source-link" href="'+item.src+'" target="_blank">'+ item.el.attr('title') + '</a>';
        			}
        		},
        		gallery: {
        			enabled: true,
                    navigateByImgClick: true,
                    preload: [0,1]
        		}
        	});	
    	});  
    // tiny helper function to add breakpoints
        function getGridSize() {
            return  (window.innerWidth < 500)  ? 1 :
                    (window.innerWidth < 1000) ? 2 :
                    (window.innerWidth < 1170) ? 3 : 4;
        }

        var topPosition = $(window).height()/2 - $('.share-sticky').height()/2;
        $('.share-sticky').css('top', topPosition);
        $('.share-sticky-open').css('top', $(window).height()/2);
        $(window).resize(function() {
            topPosition = $(window).height()/2 - $('.share-sticky').height()/2;
            $('.share-sticky').css('top', topPosition);
            $('.share-sticky-open').css('top', $(window).height()/2);
            if (typeof flexslider !== 'undefined') {
                var gridSize = getGridSize();
                flexslider.vars.minItems = gridSize;
                flexslider.vars.maxItems = gridSize;
            }
        });
 // Gallery Slider
        var prev_arrow = '<div class="bk-slider-prev bk-control-nav"><i class="fa fa-angle-left"></i></div>';
        var next_arrow = '<div class="bk-slider-next bk-control-nav"><i class="fa fa-angle-right"></i></div>';
        $('.gallery-runner').slick({
            speed: 500,
            centerMode: true,
            infinite: true,
            variableWidth: true,
            autoplay: true,
            autoplaySpeed: 4000,
            prevArrow: prev_arrow,
            nextArrow: next_arrow,        
        });
        $('.gallery-wrap').imagesLoaded(function(){
            setTimeout(function() {
                $('.gallery-runner').siblings('.bk-preload').addClass('hide');
                $('.gallery-runner').removeClass('opacity-zero');
                $('.gallery-wrap').removeClass('background-preload');
            }, 300);
        });
        $('.feature-2-runner').slick({
            speed: 500,
            centerMode: true,
            infinite: true,
            centerPadding: '220px',
            slidesToShow: 1,
            autoplay: true,
            autoplaySpeed: 4000,
            prevArrow: prev_arrow,
            nextArrow: next_arrow,
            responsive:[
                {
                    breakpoint:1200,
                    settings:{
                            centerMode:!0,
                            centerPadding:"145px",
                            slidesToShow:1
                    }
                },
                {
                    breakpoint:992,
                    settings:{
                        centerMode:!0,
                        centerPadding:"90px",
                        slidesToShow:1
                    }
                },
                {
                    breakpoint:768,
                    settings:{
                        centerMode:!0,
                        centerPadding:"0",
                        slidesToShow:1
                    }                        
                },
                {
                    breakpoint:510,
                    settings:{
                        arrows:!1,
                        centerMode:!0,
                        centerPadding:"0",
                        slidesToShow:1                        
                    }                        
                },                
            ]
        });
        $('.bk-header-slickrunner').slick({
            speed: 500,
            centerMode: true,
            infinite: true,
            centerPadding: '300px',
            slidesToShow: 1,
            autoplay: true,
            autoplaySpeed: 4000,
            prevArrow: prev_arrow,
            nextArrow: next_arrow,
            responsive:[
                {
                    breakpoint:1200,
                    settings:{
                            centerMode:!0,
                            centerPadding:"220px",
                            slidesToShow:1
                    }
                },
                {
                    breakpoint:992,
                    settings:{
                        centerMode:!0,
                        centerPadding:"145px",
                        slidesToShow:1
                    }
                },
                {
                    breakpoint:768,
                    settings:{
                        centerMode:!0,
                        centerPadding:"0",
                        slidesToShow:1
                    }                        
                },
                {
                    breakpoint:510,
                    settings:{
                        arrows:!1,
                        centerMode:!0,
                        centerPadding:"0",
                        slidesToShow:1                        
                    }                        
                },                
            ]
        });
        $('.module-feature-2').imagesLoaded(function(){
            setTimeout(function() {
                $('.feature-2-wrapper').siblings('.bk-preload').addClass('hide');
                $('.feature-2-wrapper').removeClass('opacity-zero');
                $('.module-feature-2').removeClass('background-preload');
                $('.module-feature-2').find('.thumb').removeClass('hide-thumb');
                $('.bk-header-slickslider').removeClass('loading');
            }, 300);
        });
    //FW Slider	
        $('.flexslider').imagesLoaded(function(){	
            $('.module-main-feature .flexslider').flexslider({
                animation: 'slide',
                controlNav: false,
                animationLoop: true,
                slideshow: true,
                pauseOnHover: true,
                slideshowSpeed: 8000,
                animationSpeed: 600,
                smoothHeight: true,
                directionNav: true,
                prevText: '',
                nextText: '',
            });
            $('.module-grid .flexslider').flexslider({
                animation: 'slide',
                controlNav: false,
                animationLoop: true,
                slideshow: true,
                pauseOnHover: true,
                slideshowSpeed: 8000,
                animationSpeed: 600,
                smoothHeight: true,
                directionNav: true,
                prevText: '',
                nextText: '',
            });
            $('.bk-slider-module .flexslider').flexslider({
                animation: 'slide',
                controlNav: false,
                animationLoop: true,
                slideshow: true,
                pauseOnHover: true,
                slideshowSpeed: 8000,
                animationSpeed: 600,
                smoothHeight: true,
                directionNav: true,
                prevText: '',
                nextText: '',
            });
            $('.bk-header-slider .flexslider').flexslider({
                animation: 'fade',
                controlNav: false,
                animationLoop: true,
                slideshow: true,
                pauseOnHover: true,
                slideshowSpeed: 8000,
                animationSpeed: 600,
                smoothHeight: true,
                directionNav: true,
                nextText: '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="60px" height="80px" viewBox="0 0 49 77" xml:space="preserve"><polyline fill="none" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" points="0.375,0.375 45.63,38.087 0.375,75.8 "></polyline></svg>',
                prevText: '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="60px" height="80px" viewBox="0 0 49 77" xml:space="preserve"><polyline fill="none" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" points="45.63,75.8 0.375,38.087 45.63,0.375 "></polyline></svg>',
            });
            
            /** Slider Loadding **/
            var $bk_hs_thumbs = new Array();
            $bk_hs_thumbs = $('.bk-header-slider').find('.thumb');
            var $header_flex = $('.bk-header-slider').find('.flexslider');
            $header_flex.css('height', $(window).height());
            $bk_hs_thumbs.each(function(){
                $(this).css('height', $(window).height());
            });
            /** Scroll Down Button **/
            $('.bk-scrolldown-button').click(function(){
                var window_height = $('.bk-destination-point').offset().top; //$(window).height();
                $('body,html').animate({
        			scrollTop: window_height,
        		}, 1000, 'easeInOutQuart');     
            });
            
            $('.bk-header-loader').removeClass('loading');
            $(window).resize(function(){
                $('.bk-scrolldown-button').unbind('click');
                $header_flex.css('height', $(window).height());
                $bk_hs_thumbs.each(function(){
                    $(this).css('height', $(window).height());
                });
                $('.bk-scrolldown-button').click(function(){
                    var window_height = $('.bk-destination-point').offset().top; //$(window).height();
                    $('body,html').animate({
            			scrollTop: window_height,
            		}, 1000, 'easeInOutQuart');     
                });
            });
    //Widget Comment 
            $('.widget_comment').flexslider({
                animation: 'slide',
                controlNav: false,
                animationLoop: true,
                slideshow: true,
                pauseOnHover: true,
                slideshowSpeed: 8000,
                animationSpeed: 600,
                smoothHeight: true,
                directionNav: true,
                prevText: '',
                nextText: '',
            });
    // Twitter 
            $('.widget-twitter .flexslider').flexslider({
                animation: 'slide',
                controlNav: true,
                animationLoop: true,
                slideshow: true,
                pauseOnHover: true,
                slideshowSpeed: 8000,
                animationSpeed: 600,
                smoothHeight: true,
                directionNav: false,
                prevText: '',
                nextText: '',
            });
    // Widget Slider 
            $('.widget_slider .flexslider').flexslider({
                animation: 'slide',
                controlNav: false,
                animationLoop: true,
                slideshow: true,
                pauseOnHover: true,
                slideshowSpeed: 8000,
                animationSpeed: 600,
                smoothHeight: true,
                directionNav: true,
                prevText: '',
                nextText: '',
            });
            //Megamenu
            if (typeof(megamenu_carousel_el) !== 'undefined') {
                var bk_megamenu_item;
                $.each( megamenu_carousel_el, function( id, maxitems ) {         
                    bk_megamenu_item = $('#'+id).find('.bk-sub-post').length;
                    if(bk_megamenu_item >= maxitems) {
                        $('#'+id).flexslider({
                            animation: "slide",
                            animationLoop: true,
                            slideshow: false,
                            itemWidth: 10,
                            minItems: maxitems,
                            maxItems: maxitems,
                            controlNav: false,
                            directionNav: true,
                            slideshowSpeed: 8000,
                            animationSpeed: 600,
                            prevText: '',
                            nextText: '',
                            move: 1,
                            touch: true,
                            useCSS: true,
                        });
                    }else{
                        //console.log(bk_megamenu_item);
                        //console.log(maxitems);
                        $('#'+id).removeClass('flexslider');
                        $('#'+id).addClass('flexslider_destroy');
                    }
                });
            }
            if($('.product.flexslider ul li').length > 3) {
                $('.product.flexslider').flexslider({
                    animation: "slide",
                    animationLoop: false,
                    directionNav: true,
                    controlNav: false,
                    itemWidth: 50,
                    minItems: 1,
                    maxItems: 3,
                    prevText: '',
                    nextText: '',
                });
            }else {
                $('.product').removeClass('flexslider');
            }
        });
    // Module carousel
        $('.carousel_2 .bk-carousel-wrap').flexslider({
            animation: "slide",
            controlNav: false,
            itemWidth: 270,
            columnWidth: 1,
            pauseOnHover: true,
            move: 1,
            animationLoop: true,
            slideshowSpeed: 8000,
            animationSpeed: 600,
            prevText: '',
            nextText: '',
            minItems: 1, // use function to pull in initial value
            maxItems: 2, // use function to pull in initial value
        });
        $('.carousel_3 .bk-carousel-wrap').flexslider({
            animation: "slide",
            controlNav: false,
            itemWidth: 270,
            columnWidth: 1,
            pauseOnHover: true,
            move: 1,
            animationLoop: true,
            slideshowSpeed: 8000,
            animationSpeed: 600,
            prevText: '',
            nextText: '',
            minItems: 1, // use function to pull in initial value
            maxItems: 3, // use function to pull in initial value
        });
        $('.module-grid-carousel .bk-carousel-wrap').flexslider({
            animation: "slide",
            controlNav: false,
            itemWidth: 270,
            columnWidth: 1,
            pauseOnHover: true,
            move: 1,
            animationLoop: true,
            slideshowSpeed: 8000,
            animationSpeed: 600,
            prevText: '',
            nextText: '',
            minItems: 1, // use function to pull in initial value
            maxItems: 4, // use function to pull in initial value
        });
        $('.module-grid-carousel').imagesLoaded(function(){
            setTimeout(function() {
                $('.bk-grid-carousel-inner').children('.bk-preload').addClass('hide');
                $('.bk-grid-carousel-inner').children('.bk-carousel-wrap').removeClass('opacity-zero');
                $('.bk-grid-carousel-inner').removeClass('background-preload');
            }, 300);
        });
    // Masonry Module Init
        $('#page-wrap').imagesLoaded(function(){
            setTimeout(function() {
                if($('.bk-masonry-content').find('.item').length > 2){
                    $('.bk-masonry-content').masonry({
                        itemSelector: '.item',
                        columnWidth: 1,
                        isAnimated: true,
                        isFitWidth: true,
                     });
                }
                $('.ajax-load-btn').addClass('active');
                $('.bk-masonry-content').find('.post-c-wrap').removeClass('sink');
                $('.bk-masonry-content').find('.post-category').removeClass('sink');
    
             },500);
        });
    
        $('.menu-toggle').toggle(function(){
            $('.open-icon').removeClass('hide');
            $('.close-icon').addClass('hide');
            $('.share-label').addClass('hide');
            $('.top-share').removeClass('hide');
    
        },function(){
            $('.close-icon').removeClass('hide');
            $('.open-icon').addClass('hide');
            $('.share-label').removeClass('hide');
            $('.top-share').addClass('hide');
        });
        
        // Back top
    	$(window).scroll(function () {
    		if ($(this).scrollTop() > 500) {
    			$('#back-top').css('bottom','0');
    		} else {
    			$('#back-top').css('bottom','-34px');
    		}
    	});
        
    	// scroll body to top on click
    	$('#back-top').click(function () {
    		$('body,html').animate({
    			scrollTop: 0,
    		}, 1300);
    		return false;
    	});
        if ((typeof fixed_nav !== 'undefined') && (fixed_nav == 2)) {
            var nav = $('nav.main-nav');
            var d = nav.offset().top;
            $(window).scroll(function () {
                if($(window).width() <= 991) {
                    nav.removeClass("fixed");
                    $('.main-nav').css('margin-top','0');
                    return false;
                }
                if ($(this).scrollTop() > d) {
                    nav.addClass("fixed");
                    //menu fixed if have admin bar
                    var ad_bar = $('#wpadminbar');
                    if(ad_bar.length != 0) {
                        $('.main-nav').css('margin-top',ad_bar.height());
                    }
                } else {
                    nav.removeClass("fixed");
                    $('.main-nav').css('margin-top','0');
                }
            });
        }
        // Single Parallax
        var bkParallaxFeatImg =  $('.parallax_enable');
        if ( bkParallaxFeatImg.length !== 0 ) {
            $(window).scroll(function() {
            //console.log(bkParallaxFeatImg.offset().top);
            var bkBgy_p = -( ($(window).scrollTop()) / 3.5),
                bkBgPos = '50% ' + bkBgy_p + 'px';
            
            bkParallaxFeatImg.css( "background-position", bkBgPos );
            
            });
        }
        
        //Rating canvas
        var canvasArray  = $('.rating-canvas');
        $.each(canvasArray, function(i,canvas){
            var percent = $(canvas).data('rating');
            var ctx     = canvas.getContext('2d');
    
            canvas.width  = $(canvas).parent().width();
            canvas.height = $(canvas).parent().height();
    
            var x = (canvas.width) / 2;
            var y = (canvas.height) / 2;
            if ($(canvas).parents().hasClass('rating-wrap')) {
                var radius = (canvas.width - 6) / 2;
                var lineWidth = 2;
            } else {
                var radius = (canvas.width - 10) / 2;
                var lineWidth = 4;
            }
                    
            var endAngle = (Math.PI * percent * 2 / 100);
            ctx.beginPath();
            ctx.arc(x, y, radius, -(Math.PI/180*90), endAngle - (Math.PI/180*90), false);   
            ctx.lineWidth = lineWidth;
            ctx.strokeStyle = "#fff";
            ctx.stroke();  
        });
        $(".bk-tipper-bottom").tipper({
            direction: "bottom"
        });        
    /* Sidebar stick */    
        var win, tick, curscroll, nextscroll; 
        win = $(window);
        var width = $('.sidebar-wrap').width();
        tick = function() {
            nextscroll = win.scrollTop();
            $(".sidebar-wrap.stick").each(function(){
                var bottom_compare, top_compare, screen_scroll, parent_top, parent_h, parent_bottom, scroll_status = 0, topab; 
                var sbID = "#"+$(this).attr(("id"));
                //var sbID = "#bk_sidebar_4";
                //console.log(sbID);
                bottom_compare = $(sbID).offset().top + $(sbID).outerHeight(true);
                screen_scroll = win.scrollTop() + win.height();
                parent_top = $(sbID).parents('.bksection').offset().top;
                parent_h = $(sbID).parents('.bksection').height();
                parent_bottom = parent_top + parent_h;
                if($(sbID).parents('.bksection').hasClass('bk-in-single-page')) {
                    topab =  parent_h - $(sbID).outerHeight(true) - 36;
                }else {
                    topab =  parent_h - $(sbID).outerHeight(true);                            
                }
                
                if(window.innerWidth > 991) {
                    if(parent_h > $(sbID).outerHeight(true)) {
                        //console.log(win.scrollTop()  + "  " +  (parent_bottom - $(sbID).outerHeight(true)) + "   " + scroll_status);
                        if(win.scrollTop() < parent_top) {
                            scroll_status = 0;
                        }else if((win.scrollTop() >= parent_top) && (screen_scroll < parent_bottom)) {
                            //console.log(curscroll+ "    "+nextscroll);
                            if(curscroll <= nextscroll) {
                                scroll_status = 1;
                            }else if(curscroll > nextscroll) {
                                scroll_status = 3;
                            }
                        }else if(screen_scroll >= parent_bottom) {
                            scroll_status = 2;
                        } 
                        //console.log(scroll_status);
                        if(scroll_status == 0) {
                            $(sbID).css({
                                "position"  : "static",
                                "top"       : "auto",
                                "bottom"    : "auto"
                            });
                        }else if (scroll_status == 1) {
                            if(win.height() > $(sbID).outerHeight(true)) {
                                var ad_bar = $('#wpadminbar');
                                if ((typeof fixed_nav !== 'undefined') && (fixed_nav == 2)) {
                                    if(ad_bar.length != 0) {
                                        var sb_height_fixed = 16 + ad_bar.height() + $('.main-nav').height() + 'px';
                                    }
                                    else {
                                        var sb_height_fixed = 16 + $('.main-nav').height() + 'px';
                                    }

                                }else {
                                    if(ad_bar.length != 0) {
                                        var sb_height_fixed = 16 + ad_bar.height() + 'px';
                                    }else {
                                        var sb_height_fixed = 16 + 'px';
                                    }
                                }
                                $(sbID).css({
                                    "position"  : "fixed",
                                    "top"       : sb_height_fixed,
                                    "bottom"    : "auto",
                                    "width"     : width
                                });
                            }else {
                                if (screen_scroll < bottom_compare) {
                                    //console.log($(sbID).offset().top + "   " + parent_top);
                                    if($(sbID).parents('.bksection').hasClass('bk-in-single-page')) {
                                        topab = $(sbID).offset().top - parent_top - 36;  
                                    }else {
                                        topab = $(sbID).offset().top - parent_top;                            
                                    }
                                    $(sbID).css({
                                        "position"  : "absolute",
                                        "top"       : topab,
                                        "bottom"    : "auto",
                                        "width"     : width
                                    });
                                }else {
                                    $(sbID).css({
                                        "position"  : "fixed",
                                        "top"       : "auto",
                                        "bottom"    : "16px",
                                        "width"     : width
                                    });
                                }
                            }
                        }else if (scroll_status == 3) {
                            if (win.scrollTop() > ($(sbID).offset().top)) {
                                if($(sbID).parents('.bksection').hasClass('bk-in-single-page')) {
                                    topab = $(sbID).offset().top - parent_top - 36;  
                                }else {
                                    topab = $(sbID).offset().top - parent_top;                            
                                }
                                $(sbID).css({
                                    "position"  : "absolute",
                                    "top"       : topab,
                                    "bottom"    : "auto",
                                    "width"     : width
                                });
                            }else {
                                var ad_bar = $('#wpadminbar');
                                if ((typeof fixed_nav !== 'undefined') && (fixed_nav == 2)) {
                                    if(ad_bar.length != 0) {
                                        var sb_height_fixed = 16 + ad_bar.height() + $('.main-nav').height() + 'px';
                                    }
                                    else {
                                        var sb_height_fixed = 16 + $('.main-nav').height() + 'px';
                                    }

                                }else {
                                    if(ad_bar.length != 0) {
                                        var sb_height_fixed = 16 + ad_bar.height() + 'px';
                                    }else {
                                        var sb_height_fixed = 16 + 'px';
                                    }
                                }
                                $(sbID).css({
                                    "position"  : "fixed",
                                    "top"       : sb_height_fixed,
                                    "bottom"    : "auto",
                                    "width"     : width
                                });
                            }
                        }else if(scroll_status == 2) {
                            if(win.height() > $(sbID).outerHeight(true)) {
                                var status2_inner = 0;
                                if(curscroll <= nextscroll) {
                                    status2_inner = 1;
                                }else if(curscroll > nextscroll) {
                                    status2_inner = 2;
                                }
                                if(((status2_inner == 1) && (bottom_compare < parent_bottom)) || ((status2_inner == 2) && (win.scrollTop() < $(sbID).offset().top))){
                                    var ad_bar = $('#wpadminbar');
                                    if ((typeof fixed_nav !== 'undefined') && (fixed_nav == 2)) {
                                        if(ad_bar.length != 0) {
                                            var sb_height_fixed = 16 + ad_bar.height() + $('.main-nav').height() + 'px';
                                        }
                                        else {
                                            var sb_height_fixed = 16 + $('.main-nav').height() + 'px';
                                        }
    
                                    }else {
                                        if(ad_bar.length != 0) {
                                            var sb_height_fixed = 16 + ad_bar.height() + 'px';
                                        }else {
                                            var sb_height_fixed = 16 + 'px';
                                        }
                                    }
                                    $(sbID).css({
                                        "position"  : "fixed",
                                        "top"       : sb_height_fixed,
                                        "bottom"    : "auto",
                                        "width"     : width
                                    });
                                }else {
                                    $(sbID).css({
                                        "position"  : "absolute",
                                        "top"       : topab,
                                        "bottom"    : "auto",
                                        "width"     : width
                                    });
                                }
                            }else {
                                $(sbID).css({
                                    "position"  : "absolute",
                                    "top"       : topab,
                                    "bottom"    : "auto",
                                    "width"     : width
                                });
                            }
                        }      
                    }
                }      
                $(sbID).parent().css("height", $(sbID).height());
            });
            curscroll = nextscroll;
        }
        $(".sidebar-wrap.stick").each(function(){
            $(this).wrap("<div class='bk-sticksb-wrapper'></div>");
        });
        setTimeout(function() {
            win.on("scroll", tick);
        }, 2000);
        win.resize(function(){
            $(".sidebar-wrap.stick").each(function(){
                var sbID = "#"+$(this).attr(("id"));
                if(window.innerWidth > 991) {
                    if($(this).parent().hasClass('bk-sticksb-wrapper')){
                        width = $('.bk-sticksb-wrapper').width();
                        $(sbID).css({
                            "width"     : width
                        });
                    }
                }else {
                    $(sbID).css({
                        "position"  : "static",
                        "top"       : "auto",
                        "bottom"    : "auto"
                    });
                }  
            });
        });
    });      
})(jQuery);