// Initialize AOS (Animate on Scroll)
AOS.init({
	duration: 800,
	easing: 'slide',
	once: true,
	offset: 80
});

(function ($) {

	"use strict";

	// Loader - hide after page load
	var loader = function () {
		setTimeout(function () {
			if ($('#ftco-loader').length > 0) {
				$('#ftco-loader').removeClass('show');
			}
		}, 1);
	};
	loader();

	// Burger Menu Toggle
	$('body').on('click', '.js-fh5co-nav-toggle', function (event) {
		event.preventDefault();
		if ($('#ftco-nav').is(':visible')) {
			$(this).removeClass('active');
		} else {
			$(this).addClass('active');
		}
	});

	// Smooth Scroll for Nav Links
	$(document).on('click', '#ftco-nav a[href^="#"], .footer-links a[href^="#"], .back-to-top', function (event) {
		event.preventDefault();
		var href = $.attr(this, 'href');
		$('html, body').animate({
			scrollTop: $(href).offset().top - 70
		}, 500);

		// Collapse mobile navbar
		if ($('.navbar-collapse').hasClass('show')) {
			$('.navbar-collapse').collapse('hide');
		}
		$('.js-fh5co-nav-toggle').removeClass('active');
	});

	// Navbar Scroll Effect + Active Nav Highlighting
	$(window).scroll(function () {
		var st = $(this).scrollTop(),
			navbar = $('.ftco_navbar');

		// Add/remove scrolled class
		if (st > 150) {
			navbar.addClass('scrolled');
		} else {
			navbar.removeClass('scrolled sleep');
		}

		if (st > 350) {
			navbar.addClass('awake');
		} else {
			navbar.removeClass('awake').addClass('sleep');
		}

		// Highlight active nav item based on scroll position
		var sections = $('section[id]');
		sections.each(function () {
			var top = $(this).offset().top - 100,
				bottom = top + $(this).outerHeight(),
				id = $(this).attr('id');

			if (st >= top && st < bottom) {
				$('#ftco-nav .nav-link').removeClass('active');
				$('#ftco-nav a[href="#' + id + '"]').addClass('active');
			}
		});
	});

	// Waypoint animations for ftco-animate elements
	var contentWayPoint = function () {
		var i = 0;
		$('.ftco-animate').waypoint(function (direction) {
			if (direction === 'down' && !$(this.element).hasClass('ftco-animated')) {
				i++;
				$(this.element).addClass('item-animate');
				setTimeout(function () {
					$('body .ftco-animate.item-animate').each(function (k) {
						var el = $(this);
						setTimeout(function () {
							var effect = el.data('animate-effect');
							if (effect === 'fadeIn') {
								el.addClass('fadeIn ftco-animated');
							} else if (effect === 'fadeInLeft') {
								el.addClass('fadeInLeft ftco-animated');
							} else if (effect === 'fadeInRight') {
								el.addClass('fadeInRight ftco-animated');
							} else {
								el.addClass('fadeInUp ftco-animated');
							}
							el.removeClass('item-animate');
						}, k * 50, 'easeInOutExpo');
					});
				}, 100);
			}
		}, { offset: '95%' });
	};
	contentWayPoint();

	// Scroll to hash anchor on page load (e.g. arriving from blog pages via ../index.html#blog-section)
	if (window.location.hash) {
		var hash = window.location.hash;
		// Wait for AOS / Stellar / Waypoints to finish initialising before scrolling
		setTimeout(function () {
			var $target = $(hash);
			if ($target.length) {
				$('html, body').stop(true).animate({
					scrollTop: $target.offset().top - 70
				}, 600);
			}
		}, 400);
	}

})(jQuery);

