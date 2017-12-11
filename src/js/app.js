
$('#navi_open').click(function(){
    $('.header_menu, #navi_close').fadeIn(400); //показываем всплывающее окно
    $('#navi_open').toggle(); //показываем всплывающее окно
  });
$('.header_menu ul li a, #navi_close').click(function(){
    $('.header_menu, #navi_open').toggle(); //показываем всплывающее окно
    $('#navi_close').toggle(); //показываем всплывающее окно
});

$(function(){
    $('.modall').click(function(){
        $('.nova').fadeIn(500);
    });
    $('.click-popap').click(function(){
        $('.nova').fadeIn(500);
    });
    $('.close_modalka').click(function(){
        $('.nova').fadeOut(500);
    });
});

$('.owl-carousel').owlCarousel({
        loop:true,
    margin:10,
    nav:false,
        autoplay:true,
        autoplayTimeout:5000,
        autoplayHoverPause:false,
    responsive:{
        0:{
            items:1
        },
        600:{
            items:1
        },
        1000:{
            items:1
        }
    }
});