const timerTime = 5000; //Время таймера






/*
*  Canvas
*/
let canvas = document.getElementById('crash-canvas');
let ctx = canvas.getContext('2d');
ctx.clearRect(0, 0, canvas.width, canvas.height);
/*
*  Рисуем оси
*/
ctx.strokeStyle = '#e4c358';
ctx.lineWidth = "1"; //Ширина линий ОСИ

ctx.beginPath();
ctx.moveTo(20,canvas.height - 20);
ctx.lineTo(20, 20 );
ctx.moveTo(20,canvas.height - 20);
ctx.lineTo(canvas.width - 20, canvas.height - 20 );
ctx.stroke();
ctx.save();

function textOX(l,s){
	//OX
	ctx.fillStyle= '#fff';
	// ctx.fillText("1x",4,canvas.height - 30);
  // ctx.fillText("1.5x", 0, canvas.height - 150);
  // ctx.fillText("2x", 4, canvas.height - 270);
  // for (let i = 1; i < s; i++) {//Отрисовываем количество секунд
  //   ctx.fillText(i + "s", (canvas.width / s) * i, canvas.height - 5);
  // }
	//OY
	ctx.fillText("0",canvas.width - (canvas.width - 20), canvas.height - 5);// 0 оси
	for (let i = 1; i < s; i++){//Отрисовываем количество секунд
    	ctx.fillText(i+"s",(canvas.width / s)*i, canvas.height - 5);
    }
}
function textOY(l, s) {
  ctx.fillStyle = '#fff';
  // ctx.fillText("1x", 4, canvas.height - 30);
  // ctx.fillText("1.5x", 0, canvas.height - 150);
  // ctx.fillText("2x", 4, canvas.height - 270);
  // ctx.fillText("1x", 4, canvas.height - pad);
  for (let i = 1; i < s; i++) {
    console.log((canvas.height / s) * i)
    ctx.fillText(i + "x", 4, i === 1 ? canvas.height - pad : (canvas.height - 110 * (i - 1) ));
    
  }

}


/*
*  Canvas
*/

let h = canvas.height;
let w = canvas.width;
ctx.strokeStyle = '#e4c358';
//ctx.fillStyle = '#e4c358ad';
let pad = 20;
let axes = [[pad, pad], [pad, h-pad], [w-pad, h-pad]];
let x = 0;
let points = []; //Данные для отрисовки графика
let roundCondition = "waiting"
//Таймер обратного отсчета
var intervalX = (canvas.width + x / (1000 / 400)) / ((1000 / 30) * 5)
var intervalY = ((canvas.height + x) / 100) + 1
let mutShow = $('#mutShow');
let diagonal = Math.pow(canvas.width, 2) + Math.pow(canvas.height, 2)

textOY(1, intervalY);
textOX(1, intervalX);

function start(){
  roundCondition = "started"
  $("#crash-btn").attr("disabled", true)
  setTimeout(function(){},1);
  //let rand = Math.random() * 10
  //let rand = Math.random() * 5
  let rand = 15
  let interval = setInterval(() => {
    // points.push([pad+x, h-pad-Math.sin(x/150)*25*Math.cos(x/14)-x/4]) //Тестовые данные для отрисовки, подставляем из базы
    // points.push([pad + x, h - pad - x / 3])
    // console.log(Math.sqrt(diagonal, 2));
    
    
      points.push([pad + x, h - pad - x / 2.7])
      x += 5;

    
    $("#crash-view").css("background-position-y", x / 5)
    let pts = points.filter(p => p[0] > 0);
    let lastPt = pts[pts.length - 1];
    intervalX = ((canvas.width - pad * 5 + x / (1000 / 400) ) / ((1000 / 30) * 5))
    // intervalY = ((canvas.height + x) / 100) + 1
    // 166px каждую секунду (1000 - секунда, 30 интервал, 5px за интервал, в секнду 33.3 интервала => 166px)
    redraw(); //Рисуем график
    if(rand < ((h - lastPt[1]) / 70)) {
      clearInterval(interval)
      $("#crash-btn").attr("disabled", true)
      setTimeout(() => {
        preparing()
      }, 1000);
    }
  }, 30)
  
  // Необходимо динамическое значение поля User
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
    necessaryObj.x = ((h - lastPt[1]) / 70).toFixed(2)
    necessaryObj.profit = (myBet.value * myBet.x).toFixed(1)
    betsUpdating()
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







function preparing () {
  roundCondition = "waiting"
  $("#waitTimeShow").addClass('hide');
  mutShow.removeClass('hide');
  mutShow.find('span').html('Preparing...')
  setTimeout(() => {
    startNextRound()
  }, 3000);
}

function startNextRound() {
  x = 0
  points = []
  redraw();
  mutShow.addClass('hide');
  $("#waitTimeShow").removeClass('hide');
  $("#waitTimeShow").counter('start')
  disableInputs(false)
  $("#crash-btn").text("BET")
  bets = []
  myBet = {
    user: "User",
    coin: null,
    value: null,
    x: null,
    profit: null,
    autostopTiming: null
  }
  valuesUpdating()
  betsUpdating()
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



function redraw(){
  let lastPts = []
  if (canvas.width - x > pad * 4) {
    ctx.clearRect(0, 0, w, h);
    // рисуем оси
    polyline(1, axes)
    textOY(1, intervalY);
    textOX(1, intervalX);
    //рисуем линию

    let pts = points.filter(p => p[0] > 0);
    if (pts.length < 2)
      return;
    lastPts = pts 
    let lastPt = pts[pts.length-1];
    let prevPt = pts[pts.length-2];
    polyline(10, pts); //толщина линии
    mutShow.find('span').html(((h - lastPt[1] + 120) / 120).toFixed(2)+ "x");//Выводим X
    ctx.fillStyle = '#e4c35866';
    // рисуем область под линией
    ctx.lineTo(lastPt[0], h - 20);  
    ctx.fill();
    //ctx.arc(prevPt[0], lastPt[0], 90, 90, 90);
    // рисуем стрелку треугольник на конце
    ctx.save();
    ctx.fillStyle = '#e4c358';
    ctx.translate(...lastPt);
    ctx.rotate(Math.atan2(lastPt[1] - prevPt[1], lastPt[0] - prevPt[0]));
    ctx.beginPath();
    ctx.moveTo(0 , 18);
    ctx.lineTo(36, 0);
    ctx.lineTo(0, -18);
    ctx.fill();
    ctx.restore();
    
  } else {
    ctx.clearRect(0, 0, w, h)
    let pts = points.filter(p => p[0] > 0);
    if (pts.length < 2)
      return;
    let lastPt = [935, 41.111111111111];
    let prevPt = [930, 42.96296296296299];
    ctx.beginPath();       // Начинает новый путь
    ctx.moveTo(20, canvas.height - 20);    // Рередвигает перо в точку (30, 50)
    ctx.lineTo(935, 42.96296296296299);  // Рисует линию до точки (150, 100)
    ctx.stroke();
    ctx.save()
    ctx.rotate(Math.atan2(lastPt[1] - prevPt[1], lastPt[0] - prevPt[0]));
    ctx.beginPath();
    ctx.moveTo(0, 18);
    ctx.lineTo(36, 0);
    ctx.lineTo(0, -18);
    ctx.fill();
    ctx.restore();
    polyline(1, axes)
    textOY(1, intervalY);
    textOX(1, intervalX);
    mutShow.find('span').html(((h - pts[pts.length - 1][1] + 120) / 120).toFixed(2) + "x");
    ctx.restore();
  }
}
// -----------------------------------------------

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
  valuesUpdating(myBet.value, $("#crash-value"))
})

function valuesUpdating(option, elem) {
  if (option && elem) {
    option = elem.val()
  } else {
    myBet.value = $("#crash-value").val()
    myBet.autostopTiming = $("#auto-stop-value").val()
  }
}


function betsUpdating () {
  $("#crash-playerTables").empty()
  let values = 0
  for(bet of bets) {
    let x = bet.x ? bet.x : '???'
    let profit = bet.profit ? bet.profit : '???'
    $("#crash-playerTables").append(
      `<tr>
        <td>` + bet.user + `</td>
        <td>` + x + `</td>
        <td>` + bet.value + `</td>
        <td>` + profit + `</td>
      </tr>`
    )
    values += parseInt(bet.value) 
  }
  $("#crash-playerTables-people").text(bets.length)
  $("#crash-playerTables-values").text(values)
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
    $("#auto-stop-value").val($("#auto-stop-value").val() * $(this).attr("data-value"))
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