$(function () {

  var persentArr = {
    4: 1.0368,
    5: 1.0478,
    6: 1.0591,
    7: 1.0706,
    8: 1.0824,
    9: 1.0944,
    10: 1.1067,
    11: 1.1193,
    12: 1.1321,
    13: 1.1453,
    14: 1.1588,
    15: 1.1726,
    16: 1.1867,
    17: 1.2012,
    18: 1.216,
    19: 1.2312,
    20: 1.2468,
    21: 1.2628,
    22: 1.2792,
    23: 1.296,
    24: 1.3133,
    25: 1.331,
    26: 1.3493,
    27: 1.368,
    28: 1.3873,
    29: 1.4071,
    30: 1.4275,
    31: 1.4485,
    32: 1.4701,
    33: 1.4924,
    34: 1.5153,
    35: 1.539,
    36: 1.5634,
    37: 1.5887,
    38: 1.6147,
    39: 1.6416,
    40: 1.6694,
    41: 1.6982,
    42: 1.728,
    43: 1.7589,
    44: 1.7909,
    45: 1.824,
    46: 1.8584,
    47: 1.8942,
    48: 1.9313,
    49: 1.97,
    50: 2.0102,
    51: 2.052,
    52: 2.0957,
    53: 2.1413,
    54: 2.1888,
    55: 2.2386,
    56: 2.2906,
    57: 2.3452,
    58: 2.4024,
    59: 2.4625,
    60: 2.5256,
    61: 2.5921,
    62: 2.6621,
    63: 2.7361,
    64: 2.8142,
    65: 2.897,
    66: 2.9848,
    67: 3.0781,
    68: 3.1774,
    69: 3.2833,
    70: 3.3965,
    71: 3.5178,
    72: 3.6481,
    73: 3.7884,
    74: 3.94,
    75: 4.1041,
    76: 4.2826,
    77: 4.4772,
    78: 4.6904,
    79: 4.925,
    80: 5.1842,
    81: 5.4722,
    82: 5.7941,
    83: 6.1562,
    84: 6.5666,
    85: 7.0357,
    86: 7.5769,
    87: 8.2083,
    88: 8.9545,
    89: 9.85,
    90: 10.9444,
    91: 12.3125,
    92: 14.0714,
    93: 16.4166,
    94: 19.7,
    95: 24.625,
    96: 32.8333,
    97: 49.25,
    98: 98.5,
  }

  var rounded = function (number) {
    return +number.toFixed(2);
  }

  function doPayout(persent) {
    var amount = $("#bet-amount").val();
    var coeficient;
    for (key in persentArr) {
      if (persent == key)
        // //alert(typeof persent);
        // alert(typeof persentArr[key]);
        // var a = parseInt(persent);
        // var b = parseInt(persentArr[key]);
        // var betAmount = a*b;
        // //console.log(betAmount);
        // $("#payout").val(persentArr[key]);
        coeficient = persentArr[key];
    }
    return coeficient * amount;

  }

  function doMultiple(persent) {

    for (key in persentArr) {
      if (persent == key)

        return persentArr[key] + 'X';
    }

  }
  function countPersent(persent) {
    var res = 100 - persent - 1;
    return res + '%';
  }
  var handle = $("#custom-handle");

  $("#slider1").slider({
    value: 50,
    min: 4,
    max: 98,
    create: function () {
      handle.text($(this).slider("value"));
      $(".prediction .num").text($(this).slider("value"));
    },
    slide: function (event, ui) {
      handle.text(ui.value);
      $(".prediction .num").text(ui.value);
      //countPersent(ui.value);

      $("#win-chance").val(countPersent(ui.value));
      $("#multiplier").val(doMultiple(ui.value));
      // var a = $(".bet-amount").val();
      $("#payout").val(rounded(doPayout(ui.value)));
    }
  });

  $("#bet-amount").on('keyup', function () {
    var current = $(this).val();
    //console.log(current);
    var multi = $("#multiplier").val();
    multi = multi.slice(0, -1);
    //console.log(multi);
    $("#payout").val(rounded(multi * current));
  });

  $(".ch-coin").on('click', function () {
    var link = $(this).find('img').attr('src');
    $(".input-obj").find('img').attr('src', link);
    $(".frame").find('img').attr('src', link);
    $(".jackpot").find('img').attr('src', link);
    $(".wagered").find('img').attr('src', link);
    $(".profit").find('img').attr('src', link);
  });

  var trx = false;
  var lex = true;
  var btt = false;

  $(".trx-coin").on('click', function () {
    trx = true;
    lex = false;
    btt = false;
    $("#bet-amount").val('10');
    var persentCurrent = $("#custom-handle").text();
    console.log(persentCurrent);
    $("#payout").val(rounded(doPayout(persentCurrent)));
  });

  $(".lex-coin").on('click', function () {
    trx = false;
    lex = true;
    btt = false;
    $("#bet-amount").val('1');
    var persentCurrent = $("#custom-handle").text();
    console.log(persentCurrent);
    $("#payout").val(rounded(doPayout(persentCurrent)));
  });

  $(".btt-coin").on('click', function () {
    trx = false;
    lex = false;
    btt = true;
    $("#bet-amount").val('500');
    var persentCurrent = $("#custom-handle").text();
    console.log(persentCurrent);
    $("#payout").val(rounded(doPayout(persentCurrent)));
  });



  function randomInteger(min, max) {
    // получить случайное число от (min-0.5) до (max+0.5)
    let rand = min - 0.5 + Math.random() * (max - min + 1);
    return Math.round(rand);
  }

var subOdometr = document.querySelector(".subs-odometer");
var odometr = new Odometer({
  el: subOdometr,
  minIntegerLen: 2,
  format: 'dd',
  //animation: 'count'

});
//odometr.update(randomInteger(0, 99));
  $("#roll").on('click', function () {
    var rand = randomInteger(0, 99);
    $(".odometer").html(rand);
    var myAudioWin = $('#audio2')[0];
     setTimeout(function () {
      //var a = $(".odometer").text();
      var b = $(".prediction .num").text();
     
      var b1 = $("#bet-amount").val(); 
        var b2 = $(".wagered span").text(); 
        var wagered = +b1 + +b2;
        $(".wagered span").text(wagered); 
      if (rand > b || rand == b) {
        myAudioWin.play();
        var a1 = $("#payout").val();
        var a2 = $(".profit span").text();
        var res = +a1 + +a2;
        // console.log('a ' + a1);
        // console.log('b' + a2);
        // console.log('res ' + res);
        $(".frame .plus").text(a1);
        $(".profit span").text(rounded(res));
      }
   }, 2500);
  
  });


  $('.jackpot a').magnificPopup({
    type: 'inline',
    midClick: true // Allow opening popup on middle mouse click. Always set it to true if you don't provide alternative source in href.
  });


  $("a.bet-2x").on('click', function (e) {
    if (trx) {
      if($("#bet-amount").val() == 10000 || $("#bet-amount").val() > 4999) return false;
    }
    if (lex) {
      if($("#bet-amount").val() == 1000 || $("#bet-amount").val() > 500) return false;
    }
    if (btt) {
      if($("#bet-amount").val() == 10000 || $("#bet-amount").val() > 4999) return false;
    }
    var current = $("#bet-amount").val() * 2;
    $("#bet-amount").val(current);
    //console.log(current);
    var multi = $("#multiplier").val();
    multi = multi.slice(0, -1);
    //console.log(multi);
    $("#payout").val(rounded(multi * current));

  });

  $("a.bet-half").on('click', function (e) {
    if (trx) {
      if($("#bet-amount").val() == 10 || $("#bet-amount").val() < 20) return false;
    }
    if (lex) {
      if($("#bet-amount").val() == 1 || $("#bet-amount").val() < 2) return false;
    }
    if (btt) {
      if($("#bet-amount").val() == 500 || $("#bet-amount").val() < 1000) return false;
    }
    var current = $("#bet-amount").val() / 2;
    $("#bet-amount").val(current);
    var multi = $("#multiplier").val();
    multi = multi.slice(0, -1);
    $("#payout").val(rounded(multi * current));
  });

  $("a.bet-min").on('click', function (e) {
    var current = 1;
    if (trx) {
      current = 10;
    }
    if (lex) {
      current = 1;
    }
    if (btt) {
      current = 500;
    }
    //e.preventDefault();
    //var current = 1;
    $("#bet-amount").val(current);
    //console.log(current);
    var multi = $("#multiplier").val();
    multi = multi.slice(0, -1);
    //console.log(multi);
    $("#payout").val(rounded(multi * current));
  });

  $("a.bet-max").on('click', function (e) {
  
    var current = 10000;
    if (trx) {
      current = 10000;
    }
    if (lex) {
      current = 1000;
    }
    if (btt) {
      current = 10000;
    }
    $("#bet-amount").val(current);
    //console.log(current);
    var multi = $("#multiplier").val();
    multi = multi.slice(0, -1);
    //console.log(multi);
    $("#payout").val(rounded(multi * current));
  });
});
