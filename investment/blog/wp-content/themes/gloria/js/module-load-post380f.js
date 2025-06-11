(function($) {
  "use strict";
    $=jQuery;
    jQuery(document).ready(function(){
        var module_id, offset;
        
        jQuery('.masonry-ajax').on('click','.ajax-load-btn.active',function(){
            var $this = jQuery(this);
            if($this.hasClass('nomore')){
                $this.text(ajax_btn_str['nomore']);
                return;
            }
            var module_id = $this.parents('.module-masonry').attr('id');
            var entries = ajax_c[module_id]['entries'];
            var args =  ajax_c[module_id]['args'];
            var columns = ajax_c[module_id]['columns'];
            if($this.parents('.module-masonry').find('.bk-tabs').length > 0) {
                var tabActive = $this.parents('.module-masonry').find('.bk-tabs.active').attr('class').split(" ")[0].split("-")[2];
                var currentCatID = ajax_c[module_id]['tab'+tabActive]['cat'];
            }else {
                var tabActive = 1;
                var currentCatID = ajax_c[module_id]['tab'+tabActive]['cat'];
            }
                    
            jQuery('.ajax-load-btn').removeClass('active');
            $this.css("display", "none");
            $this.siblings('.loading-animation').css("display", "inline-block")
             
            var $container = $this.parent('.masonry-ajax').siblings('.bk-masonry-wrap').children().children('.bk-masonry-content');     
            var offset = $container.find('.item').length + parseInt(ajax_c[module_id]['tab'+tabActive]['offset']); 
             
            //console.log(offset);
            var data = {
    				action			: 'masonry_load',
                    post_offset     : offset,
                    module_id       : module_id,
                    entries         : entries,
                    columns         : columns,
                    currentCatID    : currentCatID,
                    ajax_c          : ajax_c,
                    tabActive       : tabActive,
    			};
    		jQuery.post( ajaxurl, data, function( respond ){
                var el = $(respond).hide().fadeIn('1500');
                var respond_length = el.find('.bk-mask').length;
                $container.append(el).masonry( 'appended', el );
                $container.imagesLoaded(function(){
                    setTimeout(function() {
            			var postionscroll = jQuery(window).scrollTop();
                            $container.masonry('destroy');
                            $container.masonry({
                                itemSelector: '.item',
                                columnWidth: 1,
                                isAnimated: true,
                                isFitWidth: true,
                             });
            			window.scrollTo(0,postionscroll);
                        jQuery($container).find('.post-c-wrap').removeClass('sink');
                        jQuery($container).find('.post-category').removeClass('sink');
                        jQuery($container).find('.thumb').removeClass('hide-thumb');
                        jQuery('.ajax-load-btn').addClass('active');
                        $this.find('.ajax-load-btn').text(ajax_btn_str['loadmore']);
                        
                        if(respond_length < entries){
                            $this.text(ajax_btn_str['nomore']);
                            $this.addClass('no-more');
                            $this.removeClass('active');
                            ajax_c[module_id]['nomore-'+tabActive] = 1;
                        } 
                        $this.css("display", "inline-block");
                        $this.siblings('.loading-animation').css("display", "none");
                        $('.sidebar').trigger("sticky_kit:recalc");
                    }, 500);
                    var canvasArray  = el.find('.rating-canvas');
                    $.each(canvasArray, function(i,canvas){
                        var percent = $(canvas).data('rating');
                        var ctx     = canvas.getContext('2d');
            
                        canvas.width  = $(canvas).parent().width();
                        canvas.height = $(canvas).parent().height();
                        if ($(canvas).parent().hasClass('rating-wrap')) {
                            var lineWidth = 2;
                        } else {
                            var lineWidth = 4;
                        }
              
                        var x = (canvas.width) / 2;
                        var y = (canvas.height) / 2;
                        if ($(canvas).parent().hasClass('rating-wrap')) {
                            var radius = (canvas.width - 6) / 2;
                        } else {
                            var radius = (canvas.width - 10) / 2;
                        }
                                
                        var endAngle = (Math.PI * percent * 2 / 100);
                        ctx.beginPath();
                        ctx.arc(x, y, radius, -(Math.PI/180*90), endAngle - (Math.PI/180*90), false);   
                        ctx.lineWidth = lineWidth;
                        ctx.strokeStyle = "#fff";
                        ctx.stroke(); 
                    });
                });
    
            });
        });
    // Blog Load Post
        jQuery('.blog-ajax').on('click','.ajax-load-btn.active',function(){
            var $this = jQuery(this);
            if($this.hasClass('nomore')){
                $this.text(ajax_btn_str['nomore']);
                return;
            }
            var module_id = $this.parents('.module-blog').attr('id');
            var module_type = module_id.split("-")[0];
            var entries = ajax_c[module_id]['entries'];
            var args =  ajax_c[module_id]['args'];
            if($this.parents('.module-blog').find('.bk-tabs').length > 0) {
                var tabActive = $this.parents('.module-blog').find('.bk-tabs.active').attr('class').split(" ")[0].split("-")[2];
                var currentCatID = ajax_c[module_id]['tab'+tabActive]['cat'];
            }else {
                var tabActive = 1;
                var currentCatID = ajax_c[module_id]['tab'+tabActive]['cat'];
            }
                    
            jQuery('.ajax-load-btn').removeClass('active');
            $this.css("display", "none");
            $this.siblings('.loading-animation').css("display", "inline-block")
             
            var $container = $this.parent('.blog-ajax').siblings('.row').children('.bk-blog-content');     
            offset = $container.find('.item').length + parseInt(ajax_c[module_id]['tab'+tabActive]['offset']);
            if (module_type == 'classic_blog') {
                var data = {
    				action			: 'classic_blog_load',
                    post_offset     : offset,
                    module_id       : module_id,
                    entries         : entries,
                    currentCatID    : currentCatID,
                    ajax_c          : ajax_c,
                    tabActive       : tabActive,
    			};
            }else if (module_type == 'large_blog') {
                var data = {
    				action			: 'large_blog_load',
                    post_offset     : offset,
                    module_id       : module_id,
                    entries         : entries,
                    args            : args,
                    currentCatID    : currentCatID,
                    ajax_c          : ajax_c,
                    tabActive       : tabActive,
    			};
            }
    		jQuery.post( ajaxurl, data, function( respond ){
                var el = $(respond).hide().fadeIn('1500');
                var respond_length = el.find('.content_out').length;
                $container.append(el);
                $container.imagesLoaded(function(){
                    setTimeout(function() {
                        jQuery($container).find('.thumb').removeClass('hide-thumb');
                        jQuery('.ajax-load-btn').addClass('active');
                        $this.find('.ajax-load-btn').text(ajax_btn_str['loadmore']);
                        if(respond_length < entries){
                            $this.text(ajax_btn_str['nomore']);
                            $this.addClass('no-more');
                            $this.removeClass('active');
                            ajax_c[module_id]['nomore-'+tabActive] = 1;
                        } 
                        $this.css("display", "inline-block");
                        $this.siblings('.loading-animation').css("display", "none");
                    }, 500);
                    var canvasArray  = el.find('.rating-canvas');
                    $.each(canvasArray, function(i,canvas){
                        var percent = $(canvas).data('rating');
                        var ctx     = canvas.getContext('2d');
            
                        canvas.width  = $(canvas).parent().width();
                        canvas.height = $(canvas).parent().height();
                        if ($(canvas).parent().hasClass('rating-wrap')) {
                            var lineWidth = 2;
                        } else {
                            var lineWidth = 4;
                        }
              
                        var x = (canvas.width) / 2;
                        var y = (canvas.height) / 2;
                        if ($(canvas).parent().hasClass('rating-wrap')) {
                            var radius = (canvas.width - 6) / 2;
                        } else {
                            var radius = (canvas.width - 10) / 2;
                        }
                                
                        var endAngle = (Math.PI * percent * 2 / 100);
                        ctx.beginPath();
                        ctx.arc(x, y, radius, -(Math.PI/180*90), endAngle - (Math.PI/180*90), false);   
                        ctx.lineWidth = lineWidth;
                        ctx.strokeStyle = "#fff";
                        ctx.stroke(); 
                    });
                });
    
            });
        });
        
        // square-grid Load Post
        jQuery('.square-grid-ajax').on('click','.ajax-load-btn.active',function(){
            var $this = jQuery(this);
            if($this.hasClass('nomore')){
                $this.text(ajax_btn_str['nomore']);
                return;
            }
            var module_id = $this.parents('.module-square-grid').attr('id');
            var module_type = module_id.split("-")[0];
            var entries = ajax_c[module_id]['entries'];
            var columns = ajax_c[module_id]['columns'];
            var args =  ajax_c[module_id]['args'];
            
            if($this.parents('.module-square-grid').find('.bk-tabs').length > 0) {
                var tabActive = $this.parents('.module-square-grid').find('.bk-tabs.active').attr('class').split(" ")[0].split("-")[2];
                var currentCatID = ajax_c[module_id]['tab'+tabActive]['cat'];
            }else {
                var tabActive = 1;
                var currentCatID = ajax_c[module_id]['tab'+tabActive]['cat'];
            }
            
            jQuery('.ajax-load-btn').removeClass('active');
            $this.css("display", "none");
            $this.siblings('.loading-animation').css("display", "inline-block")
             
            var container = $this.parent('.square-grid-ajax').siblings('.bk-module-inner').children('.bk-square-grid-content');     
            offset = container.find('.content_in').length + parseInt(ajax_c[module_id]['tab'+tabActive]['offset']);
            //console.log(args);
            if (module_type == 'square_grid') {
                var data = {
    				action			: 'square_grid_load',
                    module_id       : module_id,
                    post_offset     : offset,
                    entries         : entries,
                    columns         : columns,
                    ajax_c          : ajax_c,
                    tabActive       : tabActive,
                    currentCatID    : currentCatID,
    			};
            }
    		jQuery.post( ajaxurl, data, function( respond ){
                var el = $(respond).hide().fadeIn('1500');
                var respond_length = el.find('.content_in_wrapper').length;

                container.append(el);
                container.imagesLoaded(function(){
                    setTimeout(function() {
                        jQuery(container).find('.thumb').removeClass('hide-thumb');
                        jQuery('.ajax-load-btn').addClass('active');
                        $this.find('.ajax-load-btn').text(ajax_btn_str['loadmore']);
                        if(respond_length < entries){
                            $this.text(ajax_btn_str['nomore']);
                            $this.addClass('no-more');
                            $this.removeClass('active');
                            ajax_c[module_id]['nomore-'+tabActive] = 1;
                        } 
                        $this.css("display", "inline-block");
                        $this.siblings('.loading-animation').css("display", "none");
                    }, 500);
                    var canvasArray  = el.find('.rating-canvas');
                    $.each(canvasArray, function(i,canvas){
                        var percent = $(canvas).data('rating');
                        var ctx     = canvas.getContext('2d');
            
                        canvas.width  = $(canvas).parent().width();
                        canvas.height = $(canvas).parent().height();
                        if ($(canvas).parent().hasClass('rating-wrap')) {
                            var lineWidth = 2;
                        } else {
                            var lineWidth = 4;
                        }
              
                        var x = (canvas.width) / 2;
                        var y = (canvas.height) / 2;
                        if ($(canvas).parent().hasClass('rating-wrap')) {
                            var radius = (canvas.width - 6) / 2;
                        } else {
                            var radius = (canvas.width - 10) / 2;
                        }
                                
                        var endAngle = (Math.PI * percent * 2 / 100);
                        ctx.beginPath();
                        ctx.arc(x, y, radius, -(Math.PI/180*90), endAngle - (Math.PI/180*90), false);   
                        ctx.lineWidth = lineWidth;
                        ctx.strokeStyle = "#fff";
                        ctx.stroke(); 
                    });
                });
    
            });
        });
        
        jQuery('.bk-tabs').on('click',function(e){
            e.preventDefault();
            if(($(this).hasClass('active')) || ($(this).hasClass('disable-click'))) {
                return;
            }
            $('.bk-tabs').each(function(){
                $(this).addClass('disable-click');
            });
            var $bk_tab_content = $(this).find('a').html();
            $(this).parent().siblings().find('span').empty();
            $(this).parent().siblings().find('span').append($bk_tab_content);
            var previous_tab = $(this).siblings('.bk-tabs.active').attr('class').split(" ")[0].split("-")[2];  //Save Previous tab number
            $(this).siblings('.bk-tabs').removeClass('active');
            $(this).addClass('active');
            var blockID = $(this).parents('.bkmodule').attr('id');
            var blockName = blockID.split("-")[0];
            var tabClicked = $(this).attr('class').split(" ")[0].split("-")[2];
    //Check load more button
            if(ajax_c[blockID]['tab'+tabClicked]['order'] != 'rand') {
                if ($(this).parents('.module-title').siblings('.loadmore').hasClass('hide')) {
                    $(this).parents('.module-title').siblings('.loadmore').removeClass('hide');
                }
                if (ajax_c[blockID]['nomore-'+tabClicked] == 1) {
                    $(this).parents('.module-title').siblings('.loadmore').find('.ajaxtext').text(ajax_btn_str['nomore']);
                    $(this).parents('.module-title').siblings('.loadmore').find('.ajaxtext').addClass('no-more');
                    $(this).parents('.module-title').siblings('.loadmore').find('.ajaxtext').removeClass('active');
                }else {
                    $(this).parents('.module-title').siblings('.loadmore').find('.ajaxtext').text(ajax_btn_str['loadmore']);
                    $(this).parents('.module-title').siblings('.loadmore').find('.ajaxtext').removeClass('no-more');
                    $(this).parents('.module-title').siblings('.loadmore').find('.ajaxtext').addClass('active');
                }
            }else {
                if (!($(this).parents('.module-title').siblings('.loadmore').hasClass('hide'))) {
                    $(this).parents('.module-title').siblings('.loadmore').addClass('hide');
                }
            }
            if(blockName === 'masonry') {
                var container = $(this).parents('.module-title').siblings('.bk-masonry-wrap').children().children();
            }else if((blockName === 'classic_blog') || (blockName === 'large_blog')){
                var container = $(this).parents('.module-title').siblings('.bk-blog-wrapper').children();
            }else if(blockName === 'square_grid') {
                var container = $(this).parents('.module-title').siblings('.bk-module-inner').children();
            }else {    
                var container = $(this).parents('.module-title').siblings('.bk-module-inner');
            }
            container.append('<div class="bk-preload"></div><div class="bk-preload-wrapper"><div>');

            if ((ajax_c[blockID]['tab'+previous_tab]['content'] == '') || (ajax_c[blockID]['tab'+previous_tab]['content'] !== container[0].innerHTML)) {
                ajax_c[blockID]['tab'+previous_tab]['content'] = container[0].innerHTML;
            }
            //console.log(ajax_c);
            if (ajax_c[blockID]['tab'+tabClicked]['content'] == '') {
                var data = {
        				action			: blockName,
                        ajax_c          : ajax_c,
                        blockID         : blockID,
                        tabClicked      : tabClicked
        			};
                jQuery.post( ajaxurl, data, function( respond ){
                    var el = $(respond).hide().fadeIn('1500');
                    var respond_length = el.find('.content_out').length;
                    container.empty();
                    container.append(el);
                    
                    container.parents('.bkmodule ').find('.module-title').find('h2').attr('class','');
                    container.parents('.bkmodule ').find('.module-title').find('h2').addClass('bk-color-term-'+ajax_c[blockID]['tab'+tabClicked]['cat']);
                    
                    container.find('.bk-preload-wrapper').remove();
                    container.find('.bk-preload').remove();
                    container.imagesLoaded(function(){
                        setTimeout(function() {
                            jQuery(container).find('.thumb').removeClass('hide-thumb');
                            if(blockName === 'masonry') {
                                jQuery(container).find('.post-c-wrap').removeClass('sink');
                                jQuery(container).find('.post-category').removeClass('sink');
                                var postionscroll = jQuery(window).scrollTop();
                                container.masonry('destroy');
                                container.masonry({
                                    itemSelector: '.item',
                                    columnWidth: 1,
                                    isAnimated: true,
                                    isFitWidth: true,
                                });
                                window.scrollTo(0,postionscroll);
                            }
                            $('.bk-tabs').each(function(){
                                $(this).removeClass('disable-click');
                            });
                        }, 500);
                        var canvasArray  = el.find('.rating-canvas');
                        $.each(canvasArray, function(i,canvas){
                            var percent = $(canvas).data('rating');
                            var ctx     = canvas.getContext('2d');
                
                            canvas.width  = $(canvas).parent().width();
                            canvas.height = $(canvas).parent().height();
                            if ($(canvas).parent().hasClass('rating-wrap')) {
                                var lineWidth = 2;
                            } else {
                                var lineWidth = 4;
                            }
                  
                            var x = (canvas.width) / 2;
                            var y = (canvas.height) / 2;
                            if ($(canvas).parent().hasClass('rating-wrap')) {
                                var radius = (canvas.width - 6) / 2;
                            } else {
                                var radius = (canvas.width - 10) / 2;
                            }
                                    
                            var endAngle = (Math.PI * percent * 2 / 100);
                            ctx.beginPath();
                            ctx.arc(x, y, radius, -(Math.PI/180*90), endAngle - (Math.PI/180*90), false);   
                            ctx.lineWidth = lineWidth;
                            ctx.strokeStyle = "#fff";
                            ctx.stroke(); 
                        });
                    });
                });
            }else {
                var el = $(ajax_c[blockID]['tab'+tabClicked]['content']).hide().fadeIn('1500');
                container.empty();
                container.append(el);
                
                container.parents('.bkmodule ').find('.module-title').find('h2').attr('class','');
                container.parents('.bkmodule ').find('.module-title').find('h2').addClass('bk-color-term-'+ajax_c[blockID]['tab'+tabClicked]['cat']);
                    
                container.find('.bk-preload-wrapper').remove();
                container.find('.bk-preload').remove();
                container.imagesLoaded(function(){
                    setTimeout(function() {
                        jQuery(container).find('.thumb').removeClass('hide-thumb');
                        if(blockName === 'masonry') {
                            jQuery(container).find('.post-c-wrap').removeClass('sink');
                            jQuery(container).find('.post-category').removeClass('sink');
                            var postionscroll = jQuery(window).scrollTop();
                            container.masonry('destroy');
                            container.masonry({
                                itemSelector: '.item',
                                columnWidth: 1,
                                isAnimated: true,
                                isFitWidth: true,
                            });
                            window.scrollTo(0,postionscroll);
                        }
                        $('.bk-tabs').each(function(){
                            $(this).removeClass('disable-click');
                        });
                    }, 500);
                });
                var canvasArray  = el.find('.rating-canvas');
                $.each(canvasArray, function(i,canvas){
                    var percent = $(canvas).data('rating');
                    var ctx     = canvas.getContext('2d');
        
                    canvas.width  = $(canvas).parent().width();
                    canvas.height = $(canvas).parent().height();
                    if ($(canvas).parent().hasClass('rating-wrap')) {
                        var lineWidth = 2;
                    } else {
                        var lineWidth = 4;
                    }
          
                    var x = (canvas.width) / 2;
                    var y = (canvas.height) / 2;
                    if ($(canvas).parent().hasClass('rating-wrap')) {
                        var radius = (canvas.width - 6) / 2;
                    } else {
                        var radius = (canvas.width - 10) / 2;
                    }
                            
                    var endAngle = (Math.PI * percent * 2 / 100);
                    ctx.beginPath();
                    ctx.arc(x, y, radius, -(Math.PI/180*90), endAngle - (Math.PI/180*90), false);   
                    ctx.lineWidth = lineWidth;
                    ctx.strokeStyle = "#fff";
                    ctx.stroke(); 
                });
            }

        });
        jQuery('.related-tab').on('click',function(e){
            e.preventDefault();
            if($(this).hasClass('active')) {
                return;
            }
            $(this).siblings('.related-tab').removeClass('active');
            $(this).addClass('active');
            var $currentpostID = ($(this).attr('class').split(" ")[1]);
            var $container = $(this).parent().siblings('.bk-related-posts');
            var $current_tab = $(this).attr('id');
            var $previous_tab = $(this).siblings().attr('id');
            $container.append('<div class="bk-preload"></div><div class="bk-preload-wrapper"><div>');
            if ((ajax_c[$currentpostID][$previous_tab]['content'] == '') || (ajax_c[$currentpostID][$previous_tab]['content'] !== $container[0].innerHTML)) {
                ajax_c[$currentpostID][$previous_tab]['content'] = $container[0].innerHTML;
            }
            if(ajax_c[$currentpostID][$current_tab]['content'] == ''){
                var data = {
        				action			: 'author_posts_load',
                        author_id       : ajax_c['current_author'],
        			};
                jQuery.post( ajaxurl, data, function( respond ){
                    var el = $(respond).hide().fadeIn('1500');
                    $container.empty();
                    $container.append(el);
                    $container.find('.bk-preload-wrapper').remove();
                    $container.find('.bk-preload').remove();
                    $container.imagesLoaded(function(){
                        setTimeout(function() {
                            jQuery($container).find('.thumb').removeClass('hide-thumb');
                        }, 500);
                    });
                });
            }else {
                var el = $(ajax_c[$currentpostID][$current_tab]['content']).hide().fadeIn('1500');
                $container.empty();
                $container.append(el);
                $container.find('.bk-preload-wrapper').remove();
                $container.find('.bk-preload').remove();
                $container.imagesLoaded(function(){
                    setTimeout(function() {
                        jQuery($container).find('.thumb').removeClass('hide-thumb');
                    }, 500);
                });
            }
        });
    });
})(jQuery);