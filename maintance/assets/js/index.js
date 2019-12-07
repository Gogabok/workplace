setTimeout(function () {
  $('.wrap-loader').fadeOut(1900);
}, 2000);

$(".countdown").each(function () {
  $(this).countdown($(this).attr('data-end'), function (event) {
    $(this).html(
      event.strftime([
        '<div class="countdown-item">',
        '<span><span>%D</span></span>',
        '</div>',
        '<div class="countdown-item">',
        '<span><span>%H</span></span>',
        '</div>',
        '<div class="count-half">',
        '<span>:</span>',
        '</div>',
        '<div class="countdown-item">',
        '<span><span>%M</span></span>',
        '</div>',
        '<div class="countdown-item">',
        '<span><span>%S</span></span>',
        '</div>'
      ].join(''))
    );
  });
})


$(".current-lang").on("mouseenter", function () {
  $(".menu-lang").stop()
  $(".menu-lang").show(300)
})

$(".language").on("mouseleave", function () {
  $(".menu-lang").stop()
  $(".menu-lang").hide(300)
})