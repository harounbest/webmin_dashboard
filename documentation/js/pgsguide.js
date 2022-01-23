(function($){
	"use strict";
	
	$("body").backTotop({
		isWindow: true,
		text: "<i class='fa fa-chevron-up'></i>",
		buttonPos: {
			top: "",
			left: "",
			right: 40,
			bottom: 40,
		}
	});
	
	$( document ).ready(function() {
		$(window).bind("load", function() {
			$('.document_image_carousel').owlCarousel({
				margin:10,
				loop:false,
				autoWidth:true,
				items:4,
				dots: true,
				nav:true,
				responsiveClass: true,
			});
		});
		
		// Slider Gallery/Popup
		$( ".photoswipe_gallery" ).each(function( index ) {
			var pswpElement = $( '.pswp' )[0],
				items   = [],
				photoswipe_gallery_imgs = $( this ).find( 'img' );
			
			photoswipe_gallery_imgs.each( function( i, el ) {
				var item = {
						src: $(el).attr( 'data-large_image' ),
						w:   $(el).attr( 'data-large_image_width' ),
						h:   $(el).attr( 'data-large_image_height' ),
						title: $(el).attr( 'title' )
					};
				items.push( item );
			} );
				
			$(this).on( 'click', '.photoswipe_item', function( e ) {
				e.preventDefault();
				
				var options = {
					index:                 $( photoswipe_gallery_imgs ).index(this),
					shareEl:               false,
					closeOnScroll:         false,
					history:               false,
					hideAnimationDuration: 0,
					showAnimationDuration: 0
				};

				// Initializes and opens PhotoSwipe.
				var photoswipe = new PhotoSwipe( pswpElement, PhotoSwipeUI_Default, items, options );
				photoswipe.init();
				
			});
		});
		
		// When "entry-content" exists
		if( $(".entry-content").length != 0 ){
			
			var pswpElement = $( '.pswp' )[0],
				entry_content_imgs = [],
				clicked,
				entry_content_img;
				
			jQuery('.entry-content a:has(img)').each(function( index ) {
				
				var current_url             = jQuery(this).attr('href'),
					current_title           = jQuery(this).find('img').attr('title'),
					current_alt             = jQuery(this).find('img').attr('alt'),
					entry_content_img_title = '',
					current_url_data        = false;
				
				var current_url_data = IsValidImageUrl(current_url);
				
				if ( current_url_data ) {
					$(this).addClass('photoswipe_clickable_item');
					if( typeof current_title != 'undefined' ){
						entry_content_img_title = current_title;
					}else if( typeof current_alt != 'undefined' ){
						entry_content_img_title = current_alt;
					}
					
					entry_content_img = {
						src: $(current_url_data).attr('src'),
						w:   current_url_data.width,
						h:   current_url_data.height,
						title: entry_content_img_title
					};
					entry_content_imgs.push( entry_content_img );
				}
			});
			
			$.when.apply(null, entry_content_imgs).done(function() {
				$('.entry-content').on( 'click', 'a:has(img)', function( e ) {
					e.preventDefault();
					
					clicked = $('.entry-content').find( '.photoswipe_clickable_item' )
					
					var options = {
						index:                 $( clicked ).index(this),
						shareEl:               false,
						closeOnScroll:         false,
						history:               false,
						hideAnimationDuration: 0,
						showAnimationDuration: 0
					};

					// Initializes and opens PhotoSwipe.
					var photoswipe = new PhotoSwipe( pswpElement, PhotoSwipeUI_Default, entry_content_imgs, options );
					photoswipe.init();
					
				});
			});
		}
		// Slicknav menu for mobile view
		$('#primary-nav').slicknav({
			label : '',
			prependTo : '#navbar-header-mobile',
			allowParentLinks: true,
			'closedSymbol': '&#9658;', // Character after collapsed parents.
			'openedSymbol': '&#9660;', // Character after expanded parents.
		});
	});
	
	function loadImage(src) {
		var deferred = $.Deferred();
		var image = new Image();
		image.onload = function() {
			deferred.resolve();
		};
		image.src = src;
		return image;
		// return deferred.promise();
	}
	
	function IsValidImageUrl(url) {
		var current_url_data = loadImage(url),
		imgcheck = current_url_data.width;
		
		if ( imgcheck == 0 ) {
			return false;
		}else{
			return current_url_data;
		}
	}
	
	$(".modal_video .modal_video-play-button").modalVideo({
		youtube:{
			nocookie: true,
			autoplay: true,
			rel: 0
		},
		wistia: {
			autoplay: true,
		}
	});
	
})(jQuery);

/*
 * YouTube Lazy Load
 */
/*
( function() {
	var youtube = document.querySelectorAll( ".youtube-lazyload" );
	
	for (var i = 0; i < youtube.length; i++) {
		youtube[i].addEventListener( "click", function() {
			var iframe = document.createElement( "iframe" );
			
			iframe.setAttribute( "frameborder", "0" );
			iframe.setAttribute( "allowfullscreen", "" );
			iframe.setAttribute( "src", "https://www.youtube.com/embed/"+ this.dataset.embed +"?rel=0&showinfo=0&autoplay=1" );

			this.innerHTML = "";
			this.appendChild( iframe );
		} );
	};
} )();
*/