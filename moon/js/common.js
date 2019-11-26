const timerTime = 5000; //Время таймера



let canvas = document.getElementById('crash-canvas');
let ctx = canvas.getContext('2d');
ctx.clearRect(0, 0, canvas.width, canvas.height);
/*
*  Рисуем оси
*/
ctx.strokeStyle = '#e4c358';
ctx.lineWidth = "1"; //Ширина линий ОСИ

ctx.beginPath();
ctx.moveTo(20, canvas.height - 20);
ctx.lineTo(20, 20);
ctx.moveTo(20, canvas.height - 20);
ctx.lineTo(canvas.width - 20, canvas.height - 20);
ctx.stroke();
ctx.save();

var BgZ = 0 // Положение BG


/*
*  Canvas
*/

let h = canvas.height;
let w = canvas.width;
ctx.strokeStyle = '#e4c358'; // цвет линии
let pad = 20; // canvas padding
let axes = [[pad, pad], [pad, h - pad], [w - pad, h - pad]];
let x = 0; // Основа расчетов (растет по мере увеличения грфика)
let points = []; //Данные для отрисовки графика
let roundCondition = "waiting" // Состояние раунда
var intervalX = ((canvas.width - 65) /  166).toFixed(0) // Интервал оси OX (не актуально)
var intervalY = (canvas.height / 125) + 1 // Интервал оси OY (не актуально)
let mutShow = $('#mutShow');
let diagonal = Math.pow(canvas.width, 2) + Math.pow(canvas.height, 2) // Диагональ (не актуально)
let games = [] // История игр, нижняя таблица
let btnClicked = false // обработчик нажания кнопки Bet
// Звуки
let audioMoonPlaying = $('#audioMoonPlaying')[0];
let audioMoonWin = $('#audioMoonWin')[0];
let audioMoonEnd = $('#audioMoonEnd')[0];


// Отрисовка оси OX, с циклом проблемы
function textOX(zero, first, second, third, fourth, fifth) {
  ctx.fillStyle = '#fff';
  ctx.fillText(zero + "s", pad, canvas.height - 5)
  ctx.fillText(first + "s", pad + 166, canvas.height - 5)
  ctx.fillText(second + "s", pad + 166 * 2, canvas.height - 5)
  ctx.fillText(third + "s", pad + 166 * 3, canvas.height - 5)
  ctx.fillText(fourth + "s", pad + 166 * 4, canvas.height - 5)
  ctx.fillText(fifth + "s", pad + 166 * 5, canvas.height - 5)
}

let xFormule = null // Высчитывает текущий X в start()
// Первоначальная отрисовка значений
textOY(1, 2, 3);
textOX(0, 10, 15, 20, 25, 30);
var gameVal
var stoped = false
function textOY(first, second, third) {
  ctx.fillStyle = '#fff';
  ctx.fillText(first + "x", 4, canvas.height - pad)
  ctx.fillText(second + "x", 4, canvas.height - pad - 130)
  ctx.fillText(third + "x", 4, canvas.height - pad - 260)
}


// Секундомер + рандомайзер выигрыша 
var tick = 0
var tickInterval
var isRoundEnd = false
function ticker (isActive) {
  if (isActive) {
    tickInterval = setInterval(() => {
      let rand = Math.random() * 100
      rand < 5 ? isRoundEnd = true : false // Рандомайзер, сейчас 5% шанс обрывания роста графика
      tick++ // счетчик секунд (в основном для оси OX)
    }, 1000)
  } else {
    setTimeout(() => {
      tick = 0
    }, 1);
    clearInterval(tickInterval)
  }
}

// Функция старта, запускается в конце скрипта (по завершению счетчика .counter())
function start() {
  audioMoonPlaying.play();
  roundCondition = "started"
  
  ticker(true)
  disableInputs(true)
  setTimeout(function () { }, 1);
  // let rand = Math.random() * (50 - 1) + 1; // предыдущий рандомайзер
  // Генерация графика и его обновление
  let interval = setInterval(() => {
    points.push([pad + x, h - pad -  x / 3.7 ])
    let pts = points.filter(p => p[0] > 0);
    let lastPt = pts[pts.length - 1];
    xFormule = (h - lastPt[1] + 100) / 120
    // скорость роста графика
    if(x < 120) {
      x += .4
    } else if (x < 935) {
      x += 1
    } else {
      x += (5 + (xFormule) / 10)
    }
    // Обработка автостопа
    if (((xFormule).toFixed(2) + "x") >= myBet.autostopTiming) {
      if(!stoped) {
        let necessaryObj = bets.find(x => x.user === 'User')
        if (necessaryObj && roundCondition !== "waiting") {
          $("#crash-btn").attr("disabled", true)
          let pts = points.filter(p => p[0] > 0);
          let lastPt = pts[pts.length - 1];
          necessaryObj.x = (xFormule).toFixed(2)
          necessaryObj.profit = (myBet.value * myBet.x).toFixed(2)
          betsUpdating()
          btnClicked = true
          notice(true, true)
        } else {
          if (myBet.coin === null) {
            myBet.coin = "LEX"
          }
          valuesUpdating()
          if (myBet.value >= 10) {
            $("#crash-btn").text() !== "Вывести" ? bets.push(myBet) : false
            betsUpdating()
            $("#crash-btn").text("Вывести")
            disableInputs(true)
          }
        }
        stoped = true
      }
    }

    redraw(); //Рисуем график
    BgZ += x
    if (isRoundEnd) {
      ticker(false)
      isRoundEnd = false
      audioMoonPlaying.pause()
      audioMoonPlaying.currentTime = 0;
      audioMoonEnd.play()
      myBet.value && !myBet.profit ? notice(true, false) : false
      btnClicked = true
      redraw();
      // let gameVal = (xFormule).toFixed(2)
      clearInterval(interval)
      let profit = 0
      for (let i = 0; i < bets.length; i++) {
        profit += parseInt(bets[i].profit)
      }
      console.log(tick);
      
      if (games.length <= 40) {
        games.unshift({
          val: gameVal,
          bets: bets.length,
          profit: profit ? profit : 0,
          time: tick
        })
      } else {
        games.splice(0, games.length)
        games.unshift({
          val: gameVal,
          bets: bets.length,
          profit: profit ? profit : 0,
          time: tick
        })
      }
      profit = 0
      gamesUpdating(gameVal)
      $("#crash-btn").attr("disabled", true)
      stoped = false
      setTimeout(() => {
        preparing()
      }, 1000);
    } else {
      gameVal = (xFormule).toFixed(2)
      mutShow.find('span').html((xFormule).toFixed(2) + "x");
    }
  }, 30)

  // Необходимо динамическое значение поля User, сейчас ищет юзера с указанным никнеймом и меняет его профит и тд
  let necessaryObj = bets.find(x => x.user === 'User')
  if (necessaryObj) {
    $("#crash-btn").attr("disabled", false)
  }
}



$("#crash-btn").on("click", function () {
  let necessaryObj = bets.find(x => x.user === 'User')
  if (necessaryObj && roundCondition !== "waiting") {
    $("#crash-btn").attr("disabled", true)
    let pts = points.filter(p => p[0] > 0);
    let lastPt = pts[pts.length - 1];
    necessaryObj.x = (xFormule).toFixed(2)
    necessaryObj.profit = (myBet.value * myBet.x).toFixed(2)
    betsUpdating()
    btnClicked = true
    notice(true, true)
  } else {
    if (myBet.coin === null) {
      myBet.coin = "LEX"
    }
    valuesUpdating()
    if (myBet.value >= 10) {
      $("#crash-btn").text() !== "Вывести" ? bets.push(myBet) : false
      betsUpdating()
      $("#crash-btn").text("Вывести")
      disableInputs(true)
    }
  }
})
function preparing() {
  btnClicked = false
  roundCondition = "waiting"
  $("#waitTimeShow").addClass('hide');
  mutShow.removeClass('hide');
  mutShow.find('span').html('Preparing...')
  setTimeout(() => {
    notice(false)
    startNextRound()
  }, 3000);
}

function startNextRound() {
  middleX = 20
  middleY = 380
  x = 0
  points = []
  lastPtAfter = [930, 134.05405405405406]
  tick = 0
  redraw();
  mutShow.addClass('hide');
  $("#waitTimeShow").removeClass('hide');
  $("#waitTimeShow").counter('start')
  disableInputs(false)
  $("#crash-btn").text("BET")
  bets = []
  // Автостоп

  // if(myBet.autostopTiming) {
  //   myBet.x = null,
  //   myBet.profit = null

  //   let necessaryObj = bets.find(x => x.user === 'User')
  //   if (necessaryObj && roundCondition !== "waiting") {
  //     $("#crash-btn").attr("disabled", true)
  //     let pts = points.filter(p => p[0] > 0);
  //     let lastPt = pts[pts.length - 1];
  //     necessaryObj.x = ((h - lastPt[1] + 120) / 120).toFixed(1)
  //     necessaryObj.profit = (myBet.value * myBet.x).toFixed(1)
  //     betsUpdating()
  //     btnClicked = true
  //     notice(true, true)
  //   } else {
  //     if (myBet.coin === null) {
  //       myBet.coin = "LEX"
  //     }
  //     valuesUpdating()
  //     if (myBet.value >= 10) {
  //       $("#crash-btn").text() !== "Вывести" ? bets.push(myBet) : false
  //       betsUpdating()
  //       $("#crash-btn").text("Вывести")
  //       disableInputs(true)
  //     }
  //   }
  // } else {
    myBet = {
      user: "User",
      coin: null,
      value: null,
      x: null,
      profit: null,
      autostopTiming: null
    }
  // }
  betsUpdating()
}

function notice(isShowed, isWin) {
  isShowed ? $("#crash-wrapper").show() : $("#crash-wrapper").hide()
  if (isWin) {
    audioMoonWin.play();
    $("#crash-wrapper span").text("+ " + (myBet.profit - myBet.value).toFixed(1) + " " + myBet.coin)
    $("#crash-wrapper span").css("color", "#F1CD5B")
  } else {
    $("#crash-wrapper span").text("- " + myBet.value + " " + myBet.coin)
    $("#crash-wrapper span").css("color", "#fff")
  }
}


function polyline(width, pts) { //Перерисовываем ОСИ
  ctx.lineWidth = width;
  ctx.beginPath();
  ctx.moveTo(...pts[0]);
  for (var i = 1; i < pts.length; i++) {
    ctx.lineTo(...pts[i]);
  }
  ctx.stroke();
}

var middleX = 20
var middleY = 380
let rotation = (middleX < 50) ? (middleX / 550) : (middleX / 1000)
var lastPtAfter = [930, 134.05405405405406];
function redraw() {
  ctx.strokeStyle = '#e4c358';
  rotation = (middleX > 850) ? middleX / (middleY * 2.2) : middleX / (middleY * 2.5)
  // до достижения конца игры
  if (canvas.width - x > pad * 4) {
    ctx.clearRect(0, 0, w, h);
    // рисуем оси
    polyline(1, axes)
    let pts = points.filter(p => p[0] > 0);
    if (pts.length < 2)
      return;
    lastPts = pts
    let lastPt = pts[pts.length - 1];
    let prevPt = pts[pts.length - 2];
    textOY(1, 2, 3);
    textOX(0, 10, 15, 20, 25, 30);
    if(x > 100) {
      if (middleX < 685) {
        middleX += .3
      }
    }
    underLinePainting(btnClicked ? "#897A42" : "#e4c35866", btnClicked ? "#897A42" : '#e4c358')
    $("#crash-view").css("background-position-y", BgZ / 500)
  } else {
  // после достижения конца игры
    ctx.clearRect(0, 0, w, h)
    polyline(1, axes)
    let pts = points.filter(p => p[0] > 0);
    if (pts.length < 2)
      return;
    let sX = parseInt((x - ((xFormule / 10)) / 166).toFixed(0))
    let sY = parseInt(((h - pts[pts.length - 1][1] + 120) / 120).toFixed(0))
    lastPtAfter[1] > 40 ? lastPtAfter[1] -= 0.1 : false
    if (middleX < 885) {
      middleX += 1
    }
    if (middleY < 375) {
      middleY += .5
    }
    textOY(xFormule.toFixed(0) - 2, xFormule.toFixed(0) - 1, xFormule.toFixed(0));
    textOX(tick - 5, tick - 4, tick - 3, tick - 2, tick - 1, tick);

    $("#crash-view").css("background-position-y", BgZ / 500)
    ctx.restore();
    let color = btnClicked ? "#897A42" : "#e4c35866"
    let colorStroke = btnClicked ? "#897A42" : '#e4c358'
    ctx.strokeStyle = colorStroke;
    ctx.lineWidth = 10;
    ctx.beginPath();
    ctx.moveTo(20, ctx.height - pad);
    ctx.bezierCurveTo(20, 380, middleX, middleY, lastPtAfter[0], lastPtAfter[1]);
    ctx.stroke();
    ctx.fillStyle = color;
    // рисуем область под линией
    ctx.lineTo(lastPtAfter[0], h - 20);
    ctx.fill();
    ctx.save();
    ctx.fillStyle = colorStroke;
    ctx.translate(lastPtAfter[0], lastPtAfter[1]);
    ctx.rotate(- 0.35 - rotation);
    ctx.beginPath();
    ctx.moveTo(0, 18);
    ctx.lineTo(36, 0);
    ctx.lineTo(0, -18);
    ctx.fill();
    ctx.restore();
  }

}

function underLinePainting(color, colorStroke) {
  ctx.strokeStyle = colorStroke;
  let pts = points.filter(p => p[0] > 0);
  if (pts.length < 2)
    return;
  let lastPt = pts[pts.length - 1];
  let prevPt = pts[pts.length - 2];
  ctx.lineWidth = 10;
  ctx.beginPath();
  ctx.moveTo(20, ctx.height - pad);
  ctx.bezierCurveTo(20, 380, middleX, middleY, lastPt[0], lastPt[1]);
  ctx.stroke();
  ctx.fillStyle = color;
  ctx.lineTo(lastPt[0], h - 20);
  ctx.fill();
  ctx.save();
  ctx.fillStyle = colorStroke;
  ctx.translate(lastPt[0], lastPt[1]);
  ctx.rotate(- 0.35 - rotation);
  ctx.beginPath();
  ctx.moveTo(0, 18);
  ctx.lineTo(36, 0);
  ctx.lineTo(0, -18);
  ctx.fill();
  ctx.restore();

}





let myBet = {
  user: "User",
  coin: null,
  value: null,
  x: null,
  profit: null,
  autostopTiming: null
}

let bets = [

]

$(".btn--link").on("click", function () {
  $(".btn--link").removeClass("active")
  $(this).addClass("active")
  myBet.coin = $(this).text()
})


$(".ivu-switch").on("click", function () {
  $(".ivu-round").toggleClass("ivu-round-checked")
  $(this).toggleClass("ivu-checked")
})

$(".crash *").on("input propertychange", function () {
  var preg = $(this).val().replace(/[^.\d]+/g, "").replace(/^([^\.]*\.)|\./g, '$1');
  $(this).val(preg);
})

function valuesUpdating(option, elem) {
  if (option && elem) {
    option = elem.val()
  } else {
    myBet.value = $("#crash-value").val()
    if ($(".ivu-switch").hasClass("ivu-checked")) {
      myBet.autostopTiming = $("#auto-stop-value").val()
    }
  }
}





function gamesUpdating(gameVal) {
  $("#games-table").empty()
  for (game of games) {
    $("#games-table").append(`
    <div class="table-content table-colored">
      <div class="table-content-item">` + game.val + `x </div>
      <div class="table-content-item">`+ game.bets + `</div>
      <div class="table-content-item">` + game.profit + `</div>
      <div class="table-content-item">???</div>
      <div class="table-content-item">` + game.time + 's' + `</div>
    </div>
  `);
  }
}

function betsUpdating() {
  $(".crash-playerTables").empty()
  let values = 0
  for (bet of bets) {
    let x = bet.x ? bet.x + 1 : '???'
    let profit = bet.profit ? bet.profit : '???'
    
    $(".crash-playerTables").append(
      `<div class="table-content table-colored">
        <div class="table-content-item">` + bet.user + `</div>
        <div class="table-content-item">` + x + `</div>
        <div class="table-content-item">` + bet.value + `</div>
        <div class="table-content-item">` + profit + `</div>
      </div>`
    )
    values += parseInt(bet.value)
  }
  $(".crash-playerTables-people").text(bets.length)
  $(".crash-playerTables-values").text(values)
}

function disableInputs(block) {
  $("#crash-btn").attr("disabled", block)
  $("#auto-stop-value").attr("disabled", block)
  $("#crash-value").attr("disabled", block)
  $(".btn__tab button").attr("disabled", block)
  $(".bet-hotkey").toggleClass("hotkey-disable")
  block ? $(".bet-hotkey").addClass("hotkey-disable") : $(".bet-hotkey").removeClass("hotkey-disable")
  block ? $(".auto-stop-hotkey").addClass("hotkey-disable") : $(".auto-stop-hotkey").removeClass("hotkey-disable")
  block ? $(".ivu-switch").addClass("hotkey-disable") : $(".ivu-switch").removeClass("hotkey-disable")
}

$(".bet-hotkey").on("click", function () {
  $(".bet-hotkey").removeClass("active")
  $(this).addClass("active")
  if (parseInt($(this).attr("data-value")) >= 0) {
    if ($("#crash-value").val() * $(this).attr("data-value") >= 10) {
      let val = $("#crash-value").val() * $(this).attr("data-value")
      $("#crash-value").val(val.toFixed(0))
    }
  } else {
    $(this).attr("data-value") === "min" ? $("#crash-value").val(10) : $("#crash-value").val(10000)
  }
  valuesUpdating(myBet.value, $("#crash-value"))
})




$(".auto-stop-hotkey").on("click", function () {
  $(".auto-stop-hotkey").removeClass("active")
  $(this).addClass("active")
  if (parseInt($(this).attr("data-value")) >= 0) {

  $("#auto-stop-value").val($(this).attr("data-value"))
  } else {
    $(this).attr("data-value") === "min" ? $("#auto-stop-value").val(10) : $("#auto-stop-value").val(10000)
  }
  valuesUpdating(myBet.autostopTiming, $("#auto-stop-value"))
})




$("#waitTimeShow").counter({
  autoStart: false,
  duration: timerTime,
  countFrom: (timerTime / 1000),
  countTo: 0,
  runOnce: false,
  placeholder: (timerTime / 1000) + '.00s',
  easing: "linear",
  onStart: function () { },
  onComplete: function () {
    start()
    $("#waitTimeShow").addClass('hide');
    mutShow.removeClass('hide');
  },
  numberFormatter:
    function (number) {
      return (number.toFixed(2) + 's');
    }
});

$("#waitTimeShow").counter('start')