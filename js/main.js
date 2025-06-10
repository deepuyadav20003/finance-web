(function ($) {
    "use strict";

    $(document).ready(function () {
        $(".owl-carousel").owlCarousel({
            loop: true,
            margin: 10,
            nav: false,
            autoplay: true,
            autoplayTimeout: 1500,
            autoplayHoverPause: true,
            responsive: {
                0: {
                    items: 1
                },
                600: {
                    items: 3
                },
                1000: {
                    items: 5
                }
            },
            // Enable drag option
            mouseDrag: true,
            touchDrag: true
        });

        $(".owl-next").click(function () {
            $(".owl-carousel").trigger('next.owl.carousel');
        });

        $(".owl-prev").click(function () {
            $(".owl-carousel").trigger('prev.owl.carousel');
        });
    });



    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner();


    // Initiate the wowjs
    new WOW().init();


    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({ scrollTop: 0 }, 50, 'easeInOutExpo');
        return false;
    });


    // Facts counter
    $('[data-toggle="counter-up"]').counterUp({
        delay: 10,
        time: 2000
    });


    // Date and time picker
    $('.date').datetimepicker({
        format: 'L'
    });
    $('.time').datetimepicker({
        format: 'LT'
    });


    // Header carousel
    $(".header-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1500,
        loop: true,
        nav: false,
        dots: true,
        items: 1,
        dotsData: true,
    });


   $('.testimonial-carousel').owlCarousel({
        center: true,
        items:1,
        loop:true,
        margin:10,
        autoplay: true,
        smartSpeed: 1000,
        responsive:{
            600:{
                items:3
            }
        }
    });

})(jQuery);

// Faq Section 
document.querySelectorAll('.faq-section details').forEach((detail) => {
            detail.addEventListener('toggle', function() {
                if (this.open) {
                    document.querySelectorAll('.faq-section details[open]').forEach((openDetail) => {
                        if (openDetail !== this) {
                            openDetail.removeAttribute('open');
                        }
                    });
                }
            });
        });


const select = document.querySelector('.mobile-select');
const selectDynamicText = () => {
    //mobile select
    Array.from(select.nextElementSibling.children).forEach(li => {
        Array.from(li.children).forEach(child => {
            if (child.classList.contains('active')) {
                let activeText = child.textContent;
                select.textContent = activeText;
            }
        });
    });
}
select.addEventListener('click', function () {
    this.classList.toggle('active');
    this.nextElementSibling.classList.toggle('show');
});

const handleCloseSelect = () => {
    select.classList.remove('active');
    select.nextElementSibling.classList.remove('show');
}

//custom tabs
const tabContainer = document.querySelector('.tab-container');

tabContainer.addEventListener('click', e => {
    e.stopPropagation();
    const tabNavs = document.querySelectorAll('.tab-nav button');
    const tabItems = document.querySelectorAll('.tab-item');
    if (e.target.classList.contains('tab-btn')) {
        tabNavs.forEach(tabNav => tabNav.classList.remove('active'));
        tabItems.forEach(tabItem => {
            tabItem.classList.add('hide');
            let tabId = tabItem.getAttribute('data-id');

            if (e.target.getAttribute('id') === tabId) {
                e.target.classList.add('active');
                tabItem.classList.remove('hide');
            }
        });
        selectDynamicText();
        handleCloseSelect();
    }
});


selectDynamicText();




const feedbackBtn = document.querySelector('.feedback-btn');
const modal = document.querySelector('.modal');

feedbackBtn.addEventListener('pointerdown', () => {
    modal.style.display = 'block';
    setTimeout(() => modal.classList.add('show'), 0)
});

modal.querySelector('.close').addEventListener('pointerdown', () => {
    hideModal();
});

modal.querySelector('.cancel').addEventListener('pointerdown', () => {
    hideModal();
});

document.addEventListener('pointerdown', (e) => {
    if (!e.composedPath().includes(modal)) {
        hideModal();
    }
});

modal.addEventListener('transitionend', function (e) {
    if (!this.classList.contains('show')) {
        if (e.propertyName == 'transform') {
            this.style.display = '';
        }
    }
});

function hideModal() {
    modal.classList.remove('show')
}

// tab section 

