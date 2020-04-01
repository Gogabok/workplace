$(document).ready(function () {
  let currentOption = 1;
  let steps = 4
  let calculation = {
    1: '',
    2: '',
    3: '',
    4: {
      name: '',
      phone: '',
      programm: ''
    },
  }

  var swiper1 = new Swiper('.swiper-container', {
    direction: 'horizontal',
    slidesPerView: 4,
    spaceBetween: 30,
  })

  var swiper2 = new Swiper('.swiper-parthers-container', {
    direction: 'horizontal',
    slidesPerView: 5,
    spaceBetween: 60,
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 10
      },
      460: {
        slidesPerView: 2,
        spaceBetween: 20
      },
      620: {
        slidesPerView: 3,
        spaceBetween: 30
      },
      800: {
        slidesPerView: 4,
        spaceBetween: 40
      },
      1100: {
        slidesPerView: 5,
        spaceBetween: 60
      }
    }
  })

  $(".section-6-questions-item-text").slideUp()

  $(".section-6-questions-item").on("click", function (e) {
    $('img.section-6-questions-item-close').css("transform", "rotate(0deg)")
    $(".section-6-questions-item-text").slideUp(300)
    let item = $(this).find('div.section-6-questions-item-text')
    item.stop(true)
    if (item.css('display') == 'none') {
      $(this).find('img.section-6-questions-item-close').css("transform", "rotate(-180deg)")
    } else {
      $(this).find('img.section-6-questions-item-close').css("transform", "rotate(0deg)")
    }
    item.slideToggle(300)
  })

  function RENDER_BLOCK () {
    for (let i = 0; i < steps; i++) {
      if (i + 1 !== currentOption) {
        $(`#step-${i + 1}`).css('visibility', 'hidden')
        $(`#step-${i + 1}`).css('position', 'absolute')
        $(`#step-${i + 1}`).css('transform', 'scale(.1)')
        $(`#step-${i + 1}`).css('opacity', '0')
        $(`#step-${i + 1}`).css('top', '0')
        $(`#step-${i + 1}`).css('right', '0')
        $(`#step-${i + 1}`).css('left', '0')
      } else {
        $(`#step-${i + 1}`).css('visibility', 'visible')
        $(`#step-${i + 1}`).css('position', 'relative')
        $(`#step-${i + 1}`).css('transform', 'scale(1)')
        $(`#step-${i + 1}`).css('opacity', '1')
      }
    }
    $(".options-item").css("border", "1px solid #fff")
    $(".calculation-currentPage").html(currentOption)
  }

  RENDER_BLOCK()

  $(".options-item").on('click', function (e) {
    calculation[currentOption] = $(e.currentTarget).attr("data-value")
    $(`#step-${currentOption} .options-item`).removeClass("active")
    $(e.currentTarget).addClass("active")
  })

  $(".calculation-phone-input").on("input", function (e) {
    calculation[currentOption][e.target.name] = e.target.value
  })

  $(".calculation-btn-back").on('click', function () {
    if (currentOption > 1) {
      currentOption--;
      RENDER_BLOCK()
    }
  })

  $(".calculation-btn").on('click', function () {
    if (currentOption === 4) {
      if (calculation[4].phone !== '' && calculation[4].name !== '' && calculation[4].programm !== '') {
        let token = '933209183:AAEvaow7dnnLvlTFNN0b_aO6TiuASfVhDdw'
        let chatid = '-1001208157407'
        let text = `
Вид обучения: <b>${calculation[1]}</b> 
Количество человек: <b>${calculation[2]}</b> 
Образование: <b>${calculation[3]}</b> 
Номер телефона: <b>${calculation[4].phone}</b> 
Имя: <b>${calculation[4].name}</b> 
Программа обучения: <b>${calculation[4].programm}</b> 
        `
        $.ajax({
          url: "send.php",
          type: "post",
          dataType: "html",
          data: {text: text},
          success: function () {
            alert("Спасибо за вашу заявку!")
          }
        });
      } else {
        alert("Пожалуйста, заполните поля")
      }
    }
    if (currentOption < 4) {
      if (calculation[currentOption].length > 0) {
        currentOption++;
        RENDER_BLOCK()
      } else {
        $(".options-item").css("border", "1px solid red")
      }
    }
    if (currentOption == 4) {
      $(".calculation-btn").text('Рассчитать')
    }
  })

  $(".scroll-down-btn").on("click", function (e) {
    e.preventDefault();
    let target = $(this).attr('href');
    let destination = $(target).offset().top;

    $('body,html').animate({ scrollTop: destination }, 200);
  })

  $(".contacts-list-item").on("click", function (e) {
    e.preventDefault();
    let target = $(this).attr('href');
    let destination = $(target).offset().top;

    $('body,html').animate({ scrollTop: destination }, 200);
  })

  $(".login-form-btn").on("click", function () {
    let name = $("#form-login").val()
    let pass = $("#form-pass").val()
    if(name.length < 1 && pass.length < 1) {
      $("#form-login").css("border", "1px solid red")
      $("#form-pass").css("border", "1px solid red")
      alert('Ошибка!')
    }
  })


})