$(function(){
// $(document).ready(function(){
// 	    var trigger = $('.mobilem'),
// 	    menu = $('header .bottom__header .btn-flex');
// 	    trigger.on('click',function(){
// 	    $(this).toggleClass('open'); 
// 	    menu.toggleClass('open');
// 	  });
// 	});




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
	ctx.fillText("1x",4,canvas.height - 30);
	ctx.fillText("1.5x",-1,canvas.height - 150);

	//OY
	ctx.fillText("0",canvas.width - (canvas.width - 20), canvas.height - 5);// 0 оси
	for (let i = 1; i < s; i++){//Отрисвываем количество секунд
    	ctx.fillText(i+"s",(canvas.width / s)*i, canvas.height - 5);
    }
}

textOX(1,9);


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

//Таймер обратного отсчета
let waitTimeShow = $('#waitTimeShow');
let mutShow = $('#mutShow');

let timerTime = 500; //Время таймера
waitTimeShow.html((timerTime / 1000).toFixed(2) + "s");
function timer(){
  timerTime--;
  waitTimeShow.html((timerTime / 1000).toFixed(2)+ "s");
  if (timerTime === 0){
    waitTimeShow.addClass('hide');//Выводим рейтинг X
    mutShow.removeClass('hide'); //Скрываем время
    setTimeout(function(){},1);
    // fake server data
    let interval = setInterval(() => {
      points.push([pad+x, h-pad-Math.sin(x/150)*25*Math.cos(x/14)-x/4]) //Тестовые данные для отрисовки, подставляем из базы
      x += 5;
      redraw(); //Рисуем график
      x > (w-pad*4) && clearInterval(interval)
    }, 30)

    } else {
      setTimeout(timer,1);
    }
}
setTimeout(timer,1);

function polyline(width, pts) { //Перерисовываем ОСИ
  ctx.lineWidth = width;
  ctx.beginPath(); 

  ctx.moveTo(...pts[0]);
  for (var i = 1; i < pts.length; i++)
    ctx.lineTo(...pts[i]);
  ctx.stroke();
}



function redraw(){
  ctx.clearRect(0, 0, w, h);
   // рисуем оси
  polyline(1, axes)
  
  textOX(1,9);
  //рисуем линию
  let pts = points.filter(p => p[0] > 0);
  if (pts.length < 2)
    return;
  let lastPt = pts[pts.length-1];
  let prevPt = pts[pts.length-2];
  polyline(10, pts); //толщина линии

  mutShow.find('span').html(((h - lastPt[1]) / 70).toFixed(2)+ "x");//Выводим X
  ctx.fillStyle = '#e4c35866';
  // рисуем область под линией
  ctx.lineTo(lastPt[0], h - 20);  
  ctx.fill();
  
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
}

});







// -----------------------------------------------

let myBet = {
  coin: null, 
  value: null,
  autostopTiming: null
}

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


$("#crash-btn").on("click", function () {
  if(myBet.coin === null) {
    myBet.coin = "LEX"
  }
  valuesUpdating()
  if(myBet.value >= 10) {
    $("#crash-playerTables").append(
      `<tr>
        <td>` + 'User' + `</td>
        <td>` + '???' + `</td>
        <td>` + myBet.value + `</td>
        <td>` + '???' + `</td>
      </tr>`
    )
    $(this).attr("disabled", "true")
  }
})

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


