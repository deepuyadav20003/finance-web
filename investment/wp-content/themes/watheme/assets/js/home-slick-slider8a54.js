$(document).ready(function(){
  $('.regular').slick({
    dots: false,
    infinite: false,
    arrows: true,
    speed: 300,
    slidesToShow: 3,
    slidesToScroll: 1,
    prevArrow: `<button type="button" class="custom-arrow custom-prev" aria-label="Previous">
      <img src="./wp-content/themes/watheme/assets/images/arrow-left.svg" width="24" alt="Previous Arrow"  height="24" class="icon-pre">
    </button>`,
    nextArrow: `<button type="button" class="custom-arrow custom-next" aria-label="Next">
      <img src="./wp-content/themes/watheme/assets/images/arrow-right.svg" width="24" alt="Next Arrow"  height="24" class="icon-next">
    </button>`,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1
        }
      }
    ]
  });


});