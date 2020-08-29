
    let prices =[
      {
        price: '499.00',
        realPrice: 499,
        id: 0,
        amount: 1,
      },
      {
        price: '998.00',
        realPrice: 998,
        id: 1,
        amount: 2,
      },
      {
        price: '1497.00',
        realPrice: 1497,
        id: 2,
        amount: 3,
      },
      {
        price: '1996.00',
        realPrice: 1996,
        id: 3,
        amount: 4,
      },
    ]

let activeItem = null
let canAnimate = false
  function priceCalculate(id, isFocus) {
    if (id || id === 0) {
      let item = prices.find(i => i.id === id)
      console.log(item)
      $(`.form-selector-item`).removeClass('active')
      if (localStorage.getItem('active-item')) {
        let DOMitem = $(`#${item.id}`).addClass('active')
        $("a.btn").removeClass('disabled')
      }
      activeItem = item
      $(".amount").html(item.amount)
      $(".price-span").html(item.price)
      localStorage.setItem('active-item', JSON.stringify(activeItem))
      if (canAnimate) {
        setTimeout(() => {
          $([document.documentElement, document.body]).animate({
            scrollTop: $("#pricing").offset().top - 50
          }, 500);
        }, 500);
      }
      canAnimate = true

      console.log(item.price); //цена
      console.log(activeItem.amount); //количество

      $("#price_form").val(item.price);
      $("#number_form").val(activeItem.amount);


      amountOfBuyingSet()
    }
  }


function amountOfBuyingSet () {
  let amount = activeItem.amount
  let text = ''
  if (amount === 0) {
    text = 'упаковок'
  } else if (amount === 1) {
    text = 'упаковка'
  } else if (amount >= 2) {
    text = 'упаковки'
  }
  $("#amountOfBuying").html(text)


}

  const monthes = [
    'Янв', 'Фев', 'Мар', 'Апр','Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'
  ]

$(document).ready(function () {
  $("a.btn").addClass('disabled')
  priceCalculate(localStorage.getItem('active-item') ? JSON.parse(localStorage.getItem('active-item')).id : 0, true)
  


  console.log($("#today"))

  if($("#today") && $("#tomorrow")) {
    let today = new Date();
    let tomorrow = new Date(today.getTime() + (24 * 60 * 60 * 1000));
    let afterTomorrow = new Date(tomorrow.getTime() + (24 * 60 * 60 * 1000));
    let dateTomorrow = `${tomorrow.getDate()} ${monthes[tomorrow.getMonth()]}`
    let dateAfterTomorrow = `${afterTomorrow.getDate()} ${monthes[afterTomorrow.getMonth()]}` 

    $("#today").html(dateTomorrow)
    $("#tomorrow").html(dateAfterTomorrow)
  }

  $('#amount-thanks').html(JSON.parse(localStorage.getItem('active-item')).amount)


  $("#input5").blur(function () {
    if ($("#input5").val().length < 10) {
      $(".tel-err").css('display', 'flex')
      $("#input5").css('border-color', '#e30000')
      $("#input-5-placeholder").css('color', '#e30000')
      $(".text-err").text("Введите не менее 10 цифр.")
      $(".form-btn").addClass('disabled')
    } else {
      $(".tel-err").css('display', 'none')
      $("#input5").css('border-color', '#d6d6d6')
      $("#input-5-placeholder").css('color', '#86868b')
      $(".form-btn").removeClass('disabled')
    }
  })
  

  $("#input5").keyup(function () {
    if ($("#input5").val().length >= 10) {
      $(".tel-err").css('display', 'none')
      $("#input5").css('border-color', '#d6d6d6')
      $("#input-5-placeholder").css('color', '#86868b')
      $(".form-btn").removeClass('disabled')
    }

  })


})



$(document).on('scroll', function () {
  let height = $(".navigate-icon").outerHeight()
  let scrollHeight = $(document).scrollTop()
  if (height < scrollHeight) {
    $(".navigation").css('position', 'fixed')
    $("body").css('padding-top', '50px')
  } else {
    $(".navigation").css('position', 'relative')
    $("body").css('padding-top', '0px')
  }
})