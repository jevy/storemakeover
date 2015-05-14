
function scroll_to(clicked_link, nav_height) {
	var element_class = clicked_link.attr('href').replace('#', '.');
	var scroll_to = 0;
	if(element_class != '.top-content') {
		element_class += '-container';
		scroll_to = $(element_class).offset().top - nav_height;
	}
	if($(window).scrollTop() != scroll_to) {
		$('html, body').stop().animate({scrollTop: scroll_to}, 1000);
	}
}


jQuery(document).ready(function() {
	
	/*
	    Navigation
	*/
	$('a.scroll-link').on('click', function(e) {
		e.preventDefault();
		scroll_to($(this), 0);
	});	
	
    /*
        Background slideshow
    */
    $('.top-content').backstretch("img/backgrounds/1.jpg");
    $('.how-it-works-container').backstretch("img/backgrounds/1.jpg");
    $('.call-to-action-container').backstretch("img/backgrounds/1.jpg");
    
    $('#top-navbar-1').on('shown.bs.collapse', function(){
    	$('.top-content').backstretch("resize");
    });
    $('#top-navbar-1').on('hidden.bs.collapse', function(){
    	$('.top-content').backstretch("resize");
    });
    
    /*
        Wow
    */
    new WOW().init();
    
	/*
	    Modals
	*/
	$('.launch-modal').on('click', function(e){
		e.preventDefault();
		$( '#' + $(this).data('modal-id') ).modal();
	});

    /*
        Fancybox
    */
    var width = $(window).width();
    if (width > 945) width = 945;
    height = width * 0.65;


    $("a.fancybox").fancybox({
        //width: 945,
        //height: 556
        width: width,
        height: height,
        autoDimensions: false
    });

    /*
        Subscription form (Mailchimp)
    */  
    $('.subscribe form').submit(function(e) {
        e.preventDefault();
        var postdata = $('.subscribe form').serialize();
        $.ajax({
            type: 'POST',
            url: '//quickjack.us2.list-manage.com/subscribe/post-json?u=5a9c805af5eb623a67d39e8dd&amp;id=29e009049d&c=?',
            data: postdata,
            dataType: 'jsonp',
            success: function(data) {
                if(data['result'] != "success") {
                    var index = -1;
                    var msg;

                    try {
                        var parts = data['msg'].split(' - ', 2);
                        if (parts[1]==undefined){
                            msg = data['msg'];
                        } else {
                            i = parseInt(parts[0]);
                            if (i.toString() == parts[0]){
                                index = parts[0];
                                msg = parts[1];
                            } else {
                                index = -1;
                                msg = data['msg'];
                            }
                        }
                    } catch(e) {
                        index = -1;
                        msg = data['msg'];
                    }

                    try {
                        switch(parseInt(index)) {
                            case 0:
                                if (msg == "Please enter a value") msg = "Please enter your email address";
                                break;
                            case 1:
                                if (msg == "Please enter a value") msg = "Please enter your first name";
                                break;
                            default:
                                break;
                        }
                    } catch (e) {
                        msg = data['msg'];
                    }

                    $('.success-message').hide();
                    $('.error-message').hide();
                    $('.error-message').html(msg);
                    $('.error-message').fadeIn('fast', function(){
                        $('.subscribe form').addClass('animated shake').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
                            $(this).removeClass('animated shake');
                        });
                    });
                }
                else {
                    $('.error-message').hide();
                    $('.success-message').hide();
                    $('.subscribe form').hide();
                    $('.success-message').html(data['msg']);
                    $('.success-message').fadeIn('fast', function(){
                        $('.top-content').backstretch("resize");
                    });
                }
            }
        });
    });
	
});


jQuery(window).load(function() {
	
	/*
		Loader
	*/
	$(".loader-img").fadeOut();
	$(".loader").delay(1000).fadeOut("slow");
	
	/*
		Hidden images
	*/
	$(".modal-body img, .testimonial-image img, #slider-1 img").attr("style", "width: auto !important; height: auto !important;");
	
});

