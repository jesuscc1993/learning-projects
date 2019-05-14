function initializeScrollingNav () {
    $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function () {
        if (location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') && location.hostname === this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');

            if (target.length) {
                $('html, body').animate({
                    scrollTop: (target.offset().top - $(this).parents('.nav').outerHeight())
                }, 1000, "easeInOutExpo");
            }
        }
    });

    $('.js-scroll-trigger').click(function () {
        $('.navbar-collapse').collapse('hide');
    });
}

window.ScrollingNav = {
    initializeScrollingNav: initializeScrollingNav
};