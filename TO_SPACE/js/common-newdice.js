$(function () {
  
 var handle = $("#custom-handle3");
    var handle2 = $("#custom-handle2");
  $("#slider-range").slider({
   
    range: true,
    min: 0,
    max: 99,
    step: 1,
    values: [20, 80],
    create: function (event, ui) {
    },
    slide: function (event, ui) {
     
      
      var summary = ui.values[1] - ui.values[0];
      if( summary < 2) {
        
        return false;
      }
    // if(summary == 2 || summary < 2) {
    //   $("#multiplier1").val(doMultiple(ui.values[1] - ui.values[0] - 1));
    //     $("#payout1").val(doPayout1(ui.values[1] - ui.values[0] - 1 ));
    //     $("#win-chance").val(countPersentDouble(0));
    //     console.log(ui.values[1]);
    //     console.log(ui.values[0]);
    //     $( this ).draggable({ cancel: ".ui-slider-handle" });
    //     if(summary == 1){}
    //     $(this).slider("disable");
    //   return false;
    // }
      if (ui.values[0] == ui.values[1]) {
        $("#win-chance1").val(countPersentDouble(0));
        $("#multiplier1").val(doMultiple(1));  
        $("#payout1").val(rounded(doPayout1(1)));     
        handle.text(ui.values[0]);
      handle2.text(ui.values[1]); 
      }else {
        $("#multiplier1").val(doMultiple(ui.values[1] - ui.values[0] - 1));
		console.log(41,ui.values[1],ui.values[0]);
        $("#payout1").val(doPayout1(ui.values[1] - ui.values[0] - 1 ));
        $("#win-chance1").val(countPersentDouble(ui.values[1] - ui.values[0] - 2));
        handle.text(ui.values[0]);
      handle2.text(ui.values[1]);
        $(this).slider("enable");
      }
    },
    stop: function( event, ui ) {
      $(this).slider("enable");
    }
  });

  function countPersentDouble(persent) {
    var res = persent + 1;
    return res + '%';
  }

  var persentArr = {
    100: 1,
    99: 1.005,
    98: 1.011,
    97: 1.019,
    96: 1.025,
    95: 1.0368,
    94: 1.0478,
    93: 1.0706,
    92: 1.0824,
    91: 1.0944,
    90: 1.1067,
    89: 1.1193,
    88: 1.1321,
    87: 1.1453,
    86: 1.1588,
    85: 1.1726,
    84: 1.1867,
    83: 1.2012,
    82: 1.216,
    81: 1.2312,
    80: 1.2468,
    79: 1.2628,
    78: 1.2792,
    77: 1.296,
    76: 1.3133,
    75: 1.331,
    74: 1.3493,
    73: 1.368,
    72: 1.3873,
    71: 1.4071,
    70: 1.4275,
    69: 1.4485,
    68: 1.4701,
    67: 1.4924,
    66: 1.5153,
    65: 1.539,
    64: 1.5634,
    63: 1.5887,
    62: 1.6147,
    61: 1.6416,
    60: 1.6694,
    59: 1.6982,
    58: 1.728,
    57: 1.7589,
    56: 1.7909,
    55: 1.824,
    54: 1.8584,
    53: 1.8942,
    52: 1.9313,
    51: 1.97,
    50: 2.0102,
    49: 2.052,
    48: 2.0957,
    47: 2.1413,
    46: 2.1888,
    45: 2.2386,
    44: 2.2906,
    43: 2.3452,
    42: 2.4024,
    41: 2.4625,
    40: 2.5256,
    39: 2.5921,
    38: 2.6621,
    37: 2.7361,
    36: 2.8142,
    35: 2.897,
    34: 2.9848,
    33: 3.0781,
    32: 3.1774,
    31: 3.2833,
    30: 3.3965,
    29: 3.5178,
    28: 3.6481,
    27: 3.7884,
    26: 3.94,
    25: 4.1041,
    24: 4.2826,
    23: 4.4772,
    22: 4.6904,
    21: 4.925,
    20: 5.1842,
    19: 5.4722,
    18: 5.7941,
    17: 6.1562,
    16: 6.5666,
    15: 7.0357,
    14: 7.5769,
    13: 8.2083,
    12: 8.9545,
    11: 9.85,
    10: 10.9444,
    9: 12.3125,
    8: 14.0714,
    7: 16.4166,
    6: 19.7,
    5: 21.958,
    4: 24.625,
    3: 32.8333,
    2: 49.25,
    1: 98.5,

  }

  var rounded = function (number) {
	//  console.log("number"+number);
    return Number(number).toFixed(2);
  }

  function doPayout1(persent) {
    var amount = $("#bet-amount1").val();

    return rounded(amount * Math.floor(98500/persent)/1000);
  }

  function doMultiple(persent) {

    return Math.floor(98500/persent)/1000 + 'X';
	
  }
  function countPersent(persent) {
    var res = 100 - persent;
    return res + '%';
  }
  var handle = $("#custom-handle3");

  // $("#slider1").slider({
  //   value: 50,
  //   min: 4,
  //   max: 98,
  //   create: function () {
  //     handle.text($(this).slider("value"));
  //     $(".prediction .num").text($(this).slider("value"));
  //   },
  //   slide: function (event, ui) {
  //     handle.text(ui.value);
  //     $(".prediction .num").text(ui.value);
  //     //countPersent(ui.value);

  //     $("#win-chance").val(countPersent(ui.value));
  //     $("#multiplier1").val(doMultiple(ui.value));
  //     // var a = $(".bet-amount1").val();
  //     $("#payout1").val(rounded(doPayout1(ui.value)));
  //   }
  // });

  $("#bet-amount1").on('keyup', function () {
    var current = $(this).val();
    //console.log(current);
    var multi = $("#multiplier1").val();
    multi = multi.slice(0, -1);
    //console.log(multi);
    $("#payout1").val(rounded(multi * current));
  });
/*
  $(".ch-coin").on('click', function () {
    var link = $(this).find('img').attr('src');
    $(".input-obj").find('img').attr('src', link);
    $(".frame").find('img').attr('src', link);
    $(".jackpot").find('img').attr('src', link);
    $(".wagered").find('img').attr('src', link);
    $(".profit").find('img').attr('src', link);
  });
*/
  var trx = true;
  var lex = false;
  var btt = false;

  var dataWinCoin = '.lex-data ';
  // if (trx == true){
  //   dataWinCoin = '.trx-data ';
  // }else if(lex == true){
  //   dataWinCoin = '.lex-data ';
  // }else if(btt == true){
  //   dataWinCoin = '.btt-data ';
  // }
/*
  $(".trx-coin").on('click', function () {
    $('.trx-data').css('display', 'block');
    $('.lex-data').css('display', 'none');
    $('.btt-data').css('display', 'none');
    trx = true;
    lex = false;
    btt = false;
    dataWinCoin = '.trx-data ';
    $("#bet-amount1").val('10');
    var persentCurrent = handle2.text() - handle.text() - 1;
    //console.log(persentCurrent);
    // console.log(handle2.text());
    // console.log(handle.text());
    $("#payout1").val(rounded(doPayout1(persentCurrent)));
  });

  $(".lex-coin").on('click', function () {
    $('.trx-data').css('display', 'none');
    $('.lex-data').css('display', 'block');
    $('.btt-data').css('display', 'none');
    trx = false;
    lex = true;
    btt = false;
    dataWinCoin = '.lex-data ';
    $("#bet-amount1").val('1');
    var persentCurrent = handle2.text() - handle.text() - 1;
    //console.log(persentCurrent);
    // console.log(handle2.text());
    // console.log(handle.text());
    $("#payout1").val(rounded(doPayout1(persentCurrent)));
  });

  $(".btt-coin").on('click', function () {
    $('.trx-data').css('display', 'none');
    $('.lex-data').css('display', 'none');
    $('.btt-data').css('display', 'block');
    trx = false;
    lex = false;
    btt = true;
    dataWinCoin = '.btt-data ';
    $("#bet-amount1").val('500');
    var persentCurrent = handle2.text() - handle.text() - 1;
    //console.log(persentCurrent);
    // console.log(handle2.text());
    // console.log(handle.text());
	//console.log(298);
    $("#payout1").val(rounded(doPayout1(persentCurrent)));
  });

*/

  function randomInteger(min, max) {
    // получить случайное число от (min-0.5) до (max+0.5)
    let rand = min - 0.5 + Math.random() * (max - min + 1);
    return Math.round(rand);
  }

  // var subOdometr = document.querySelector(".subs-odometer");
  // var odometr = new Odometer({
  //   el: subOdometr,
  //   minIntegerLen: 2,
  //   format: 'dd',
  //   //animation: 'count'

  // });
  //odometr.update(randomInteger(0, 99));
  var wCont = $('.scroll-nums').width();
  wCont /= 2;
  var wDefault = '-' + (146 * 45) + 'px';
  //console.log(wDefault);
  $(".scroll-nums-abs").css({ left: wDefault });

  // Roll active
  $(".roll").on('click', function () {

	$("#slider-range").slider("disable");
    //$(".odometer").html(rand);
    var myAudioWin = $('#audio5')[0];

     


	var b1 = $("#bet-amount1").val();
	var range1 = $("#custom-handle3").text();
	var range2 = $("#custom-handle2").text();

		
	if (b1<10) {
		//console.log("MIN BET = 10 TRX!");
		$("#infobox2").html("MIN BET = 10 TRX!");
		$("#infobox2").show();
		setTimeout(function() {
			$("#infobox2").hide();
		}, 6000);	
		return;
	}
	
	if (Number(range1) >= 0 && Number(range2) <= 99 && Number(range2) > Number(range1)) { 
		$(".roll1 button").prop('disabled', true);	
		$(".roll button").prop('disabled', true);	
		//console.log(b1,range1,range2);
		finishBets(b1,range1,range2);
	} else {
		//console.log("Bad values");
	}

  });


  $('.jackpot a').magnificPopup({
    type: 'inline',
    midClick: true // Allow opening popup on middle mouse click. Always set it to true if you don't provide alternative source in href.
  });


  $("a.bet-2x1").on('click', function (e) {
    if (trx) {
      if ($("#bet-amount1").val() == 10000 || $("#bet-amount1").val() > 4999) return false;
    }
    if (lex) {
      if ($("#bet-amount1").val() == 1000 || $("#bet-amount1").val() > 500) return false;
    }
    if (btt) {
      if ($("#bet-amount1").val() == 10000 || $("#bet-amount1").val() > 4999) return false;
    }
    var current = $("#bet-amount1").val() * 2;
    $("#bet-amount1").val(current);
    //console.log(current);
    var multi = $("#multiplier1").val();
    multi = multi.slice(0, -1);
    //console.log(multi);
    $("#payout1").val(rounded(multi * current));

  });

  $("a.bet-half1").on('click', function (e) {
    if (trx) {
      if ($("#bet-amount1").val() == 10 || $("#bet-amount1").val() < 20) return false;
    }
    if (lex) {
      if ($("#bet-amount1").val() == 1 || $("#bet-amount1").val() < 2) return false;
    }
    if (btt) {
      if ($("#bet-amount1").val() == 500 || $("#bet-amount1").val() < 1000) return false;
    }
    var current = $("#bet-amount1").val() / 2;
    $("#bet-amount1").val(current);
    var multi = $("#multiplier1").val();
    multi = multi.slice(0, -1);
    $("#payout1").val(rounded(multi * current));
  });

  $("a.bet-min1").on('click', function (e) {
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
    $("#bet-amount1").val(current);
    //console.log(current);
    var multi = $("#multiplier1").val();
    multi = multi.slice(0, -1);
    //console.log(multi);
    $("#payout1").val(rounded(multi * current));
  });

  $("a.bet-max1").on('click', function (e) {

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
    $("#bet-amount1").val(current);
    //console.log(current);
    var multi = $("#multiplier1").val();
    multi = multi.slice(0, -1);
    //console.log(multi);
    $("#payout1").val(rounded(multi * current));
  });




});
