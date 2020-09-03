
$('.loader-wrapper').fadeOut('slow', function() {
    $(this).remove();
});

$(window).on('scroll', function() {
    if ($(this).scrollTop() > 600) {
        $('.tap-top').fadeIn();
    } else {
        $('.tap-top').fadeOut();
    }
});
$('.tap-top').click( function() {
    $("html, body").animate({
        scrollTop: 0
    }, 600);
    return false;
});


$(document).ready(function() {

    var scrollLink = $('#myScrollspy .nav-item a[href^="#"]');

    // Smooth scrolling
    scrollLink.click(function(e) {
        e.preventDefault();
        $('body,html').animate({
            scrollTop: $(this.hash).offset().top -100
        }, 500 );
    });

    // Active link switching
    $(window).scroll(function() {
        var scrollbarLocation = $(this).scrollTop();

        scrollLink.each(function() {

            var sectionOffset = $(this.hash).offset().top - 1;

            if ( sectionOffset >= scrollbarLocation ) {
                $(this).parent().addClass('active');
                $(this).parent().siblings().removeClass('active');
            }
        })

    })
    var contentwidth = jQuery(window).width();
if ((contentwidth) > '320') {
    jQuery('.menu-title h5').append('<span class="according-menu"></span>');
    jQuery('.menu-title').click(function () {
        jQuery('.menu-title').removeClass('active');
        jQuery('.menu-content').slideUp('normal');
        if (jQuery(this).next().is(':hidden') == true) {
            jQuery(this).addClass('active');
            jQuery(this).next().slideDown('normal');
        }
    });
    jQuery('.menu-content').hide();
} else {
    jQuery('.menu-content').show();
}

})


function CopyToClipboard(containerid) {
    if (document.selection) { 
        var range = document.body.createTextRange();
        range.moveToElementText(document.getElementById(containerid));
        range.select().createTextRange();
        document.execCommand("copy"); 
    
    } else if (window.getSelection) {
        var range = document.createRange();
         range.selectNode(document.getElementById(containerid));
         window.getSelection().addRange(range);
         document.execCommand("copy");
         alert("text copied") 
    }}

    $(window).on('scroll', function() {
        if ($(this).scrollTop() > 600) {
            $('.tap-top').fadeIn();
        } else {
            $('.tap-top').fadeOut();
        }
    });
    $('.tap-top').on('click', function() {
        $("html, body").animate({
            scrollTop: 0
        }, 600);
        return false;
    });

// active link
