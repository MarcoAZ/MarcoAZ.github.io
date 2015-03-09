$( document ).ready(function() {
	//start hidden
	$('.headerShrink').hide();
	$('.navShrink').hide();

	//control header shrink
	$(window).scroll(function() {
    if ($(document).scrollTop() > 100) 
    {
        $('.header').hide();
        $('.headerShrink').show();
        $('.ribbon').hide();
        $('.nav').addClass('navExpand');
    }
    else 
    {
        $('.header').show();
        $('.headerShrink').hide();
        $('.ribbon').show();
        $('.nav').removeClass('navExpand');
    }
	//control nav shrink
    if ($(document).scrollTop() > 200) 
    {
		$('.navShrink').show();
		$('.nav').hide();
		$('.navExpand').hide();
    }
    else
    {
   		 $('.navShrink').hide();
   		 $('.nav').show();
    }
    
	});
});
