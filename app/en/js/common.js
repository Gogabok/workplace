$(function() {

	$('.owl-main').owlCarousel({
		autoplay: true,
		autoplayTimeout: 3000,
		loop:true,
		margin:10,
		nav:false,
		responsive:{
			0:{
				items:1
			},
			600:{
				items:1
			},
			1000:{
				items:1
			}
		}
	})

	setTimeout(function() {
			$('.wrap-loader').fadeOut(1900);
	}, 2000);

	$( ".graf .dig img.img-responsive" ).each(function( i, el ) {
		var rand = Math.floor(Math.random()*(14-1)+1);
		//console.log(rand);
		$(this).attr('src', 'img/grafik/' + rand + '.png');
	});
		

	$('#table-history-eos tr td:first-child').addClass('red');	

	$(".history-wrap, .three-table-scroll").niceScroll({cursorcolor:"#00E8D4"});

$(".maths").on('click', function(){
	$(".table-common").css('display', 'table');
	$(".table-red").css('display', 'none');
	$(".table-green").css('display', 'none');
});
$(".plus").on('click', function(){
	$(".table-common").css('display', 'none');
	$(".table-red").css('display', 'none');
	$(".table-green").css('display', 'table');
});
$(".minus").on('click', function(){
	$(".table-common").css('display', 'none');
	$(".table-red").css('display', 'table');
	$(".table-green").css('display', 'none');
});
	
$(".f-container-a a, #ch-col, #ob-col, .main-buts-ch, .main-star").on('click', function(e){
 	e.preventDefault();
 });  
 $(" #ob-col").on('click', function(e){
	$('.ch').css('display', 'none');
	$('.ob').css('display', 'table-cell');
}); 
$(" #ch-col").on('click', function(e){
	$('.ch').css('display', 'table-cell');
	$('.ob').css('display', 'none');
});   



$("#main-eos").on('click', function(e){
	$('#section-eos').css('display', 'block');
	$('#section-eth').css('display', 'none');
	$('#section-iost').css('display', 'none');
	$('#section-tron').css('display', 'none');
	$('#section-star').css('display', 'none');
	$('.main-star').removeClass('light');
	
	
});
$("#main-eth").on('click', function(e){
	$('#section-eos').css('display', 'none');
	$('#section-eth').css('display', 'block');
	$('#section-iost').css('display', 'none');
	$('#section-tron').css('display', 'none');
	$('#section-star').css('display', 'none');
	$('.main-star').removeClass('light');
	
});
$("#main-iost").on('click', function(e){
	$('#section-eos').css('display', 'none');
	$('#section-eth').css('display', 'none');
	$('#section-iost').css('display', 'block');
	$('#section-tron').css('display', 'none');
	$('#section-star').css('display', 'none');
	$('.main-star').removeClass('light');

});
$("#main-tron").on('click', function(e){
	$('#section-eos').css('display', 'none');
	$('#section-eth').css('display', 'none');
	$('#section-iost').css('display', 'none');
	$('#section-tron').css('display', 'block');
	$('#section-star').css('display', 'none');
	$('.main-star').removeClass('light');
	
});

  $("#eos").on('click', function(e){
	$('#eth-table').css('display', 'none');
	$('#iost-table').css('display', 'none');
	$('#tron-table').css('display', 'none');
	$('#eos-table').css('display', 'table');
	$('.bold-v').text('ATHENA ');
	$('.bye-btc').text('Купить ATHENA');
	$('.sel-btc').text('Продать ATHENA');
	$('.left-table-blvl').text('Amount ATHENA');

	$('#eth-three').css('display', 'none');
	$('#eos-three').css('display', 'block');
	$('#iost-three').css('display', 'none');
	$('#tron-three').css('display', 'none');


	$('#table-history-eos').css('display', 'table');
	$('#table-history-eth').css('display', 'none');
	$('#table-history-iost').css('display', 'none');
	$('#table-history-tron').css('display', 'none');
	
	
	
	
	$('.sale-btc').text('- EOS');
	$('.thin-v').text('/ EOS');
	$('.bit-stripe-1').find('img').attr('src', 'img/EOS/ATHENA.png');
	$('.bb11').attr("placeholder", 'ATHENA');
	$('.bb1, .blcahin').attr("placeholder", 'EOS');
	$('.bitlex-wrap .bit-stripe-4 span:last-child').text('10 000 EOS');
	$('.left-table-blch').text('Цена (EOS)');

	var lastPriceSpan = '<span class="red">0.1140</span>';
	$('.table-history tr td:first-child').html(lastPriceSpan);
	$('.three-tables tr td:first-child').html(lastPriceSpan);
	$('.bit-stripe-2-ch').html(lastPriceSpan);
	$('.bit-stripe-3-ch').html('<td class="red ch">-1.21%</td>');
	$('.bit-stripe-3>div').html('<span>0.1140</span>');

	$('#star-table').css('display', 'none');
	$('.star').attr('src', 'img/star.svg');
		$('.star').removeClass('light');
});

$("#eth").on('click', function(e){
	$('#eth-table').css('display', 'table');
	$('#iost-table').css('display', 'none');
	$('#tron-table').css('display', 'none');
	$('#eos-table').css('display', 'none');
	$('.bold-v').text('LGO ');
	$('.bye-btc').text('Купить LGO');
	$('.sel-btc').text('Продать LGO');
	$('.bitlex-wrap .bit-stripe-4 span:last-child').text('10 000 ETH');
	$('.left-table-blch').text('Цена (ETH)');
	$('.left-table-blvl').text('Amount (LGO)');
	
	$('#eth-three').css('display', 'block');
	$('#eos-three').css('display', 'none');
	$('#iost-three').css('display', 'none');
	$('#tron-three').css('display', 'none');

	$('#table-history-eos').css('display', 'none');
	$('#table-history-eth').css('display', 'table');
	$('#table-history-iost').css('display', 'none');
	$('#table-history-tron').css('display', 'none');

	$('.sale-btc').text('- ETH');
	$('.thin-v').text('/ ETH');
	$('.bit-stripe-1').find('img').attr('src', 'img/ETH/LGO.png');
	$('.bb11').attr("placeholder", 'LGO');
	$('.bb1, .blcahin').attr("placeholder", 'ETH');

	var lastPriceSpan = '<span class="red">0,00017000</span>';
	$('.table-history tr td:first-child').html(lastPriceSpan);
	$('.three-tables tr td:first-child').html(lastPriceSpan);
	$('.bit-stripe-2-ch').html(lastPriceSpan);
	$('.bit-stripe-3-ch').html('<td class="red ch">-27.69%</td>');
	$('.bit-stripe-3>div').html('<span>0.00017000</span>');

	$('#star-table').css('display', 'none');
	$('.star').attr('src', 'img/star.svg');
		$('.star').removeClass('light');
});

$("#iost").on('click', function(e){
	$('#eth-table').css('display', 'none');
	$('#iost-table').css('display', 'table');
	$('#tron-table').css('display', 'none');
	$('#eos-table').css('display', 'none');
	$('.bold-v').text('WIN ');
	$('.bye-btc').text('Купить WIN');
	$('.sel-btc').text('Продать WIN');
	$('.bitlex-wrap .bit-stripe-4 span:last-child').text('10 000 IOST');
	$('.left-table-blch').text('Цена (IOST)');
	$('.left-table-blvl').text('Amount (WIN)');

	$('#eth-three').css('display', 'none');
	$('#eos-three').css('display', 'none');
	$('#iost-three').css('display', 'block');
	$('#tron-three').css('display', 'none');


	$('#table-history-eos').css('display', 'none');
	$('#table-history-eth').css('display', 'none');
	$('#table-history-iost').css('display', 'table');
	$('#table-history-tron').css('display', 'none');
	
	$('.sale-btc').text('- IOST');
	$('.thin-v').text('/ IOST');
	$('.bit-stripe-1').find('img').attr('src', 'img/IOST/WIN.png');
	$('.bb11').attr("placeholder", 'WIN');
	$('.bb1, .blcahin').attr("placeholder", 'IOST');

	var lastPriceSpan = '<span class="red">0.003831</span>';
	$('.table-history tr td:first-child').html(lastPriceSpan);
	$('.three-tables tr td:first-child').html(lastPriceSpan);
	$('.bit-stripe-2-ch').html(lastPriceSpan);
	$('.bit-stripe-3-ch').html('<td class="red ch">-49.59%</td>');
	$('.bit-stripe-3>div').html('<span>0.003831</span>');

	$('#star-table').css('display', 'none');
	$('.star').attr('src', 'img/star.svg');
		$('.star').removeClass('light');
});

$("#tron").on('click', function(e){
	$('#eth-table').css('display', 'none');
	$('#iost-table').css('display', 'none');
	$('#tron-table').css('display', 'table');
	$('#eos-table').css('display', 'none');
	$('.bold-v').text('WIN ');
	$('.bye-btc').text('Купить WIN');
	$('.sel-btc').text('Продать WIN');
	$('.bitlex-wrap .bit-stripe-4 span:last-child').text('10 000 TRON');
	$('.left-table-blch').text('Цена (TRON)');
	$('.left-table-blvl').text('Amount (WIN)');

	$('#eth-three').css('display', 'none');
	$('#eos-three').css('display', 'none');
	$('#iost-three').css('display', 'none');
	$('#tron-three').css('display', 'block');

	$('#table-history-eos').css('display', 'none');
	$('#table-history-eth').css('display', 'none');
	$('#table-history-iost').css('display', 'none');
	$('#table-history-tron').css('display', 'table');
	
	$('.sale-btc').text('- TRON');
	$('.thin-v').text('/ TRON');
	$('.bit-stripe-1').find('img').attr('src', 'img/TRON/WIN.jpg');
	$('.bb11').attr("placeholder", 'WIN');
	$('.bb1, .blcahin').attr("placeholder", 'TRON');

	var lastPriceSpan = '<span class="red">0.018090</span>';
	$('.table-history tr td:first-child').html(lastPriceSpan);
	$('.three-tables tr td:first-child').html(lastPriceSpan);
	$('.bit-stripe-2-ch').html(lastPriceSpan);
	$('.bit-stripe-3-ch').html('<td class="red ch">-0.22%</td>');
	$('.bit-stripe-3>div').html('<span>0.018090</span>');

	$('#star-table').css('display', 'none');
	$('.star').attr('src', 'img/star.svg');
		$('.star').removeClass('light');
	
});


$('.table-with-ico tr').on('click', function(){
	var imgPath = $(this).find('img').not('.favorite').attr('src');
	$('.bit-stripe-1').find('img').attr('src', imgPath);
	var btcName = $(this).find('td:first-child').text();
	var firstName = btcName.split('/');
	$('.bold-v').text(firstName[0] );
	$('.bb11').attr("placeholder", firstName[0]);
	$('.bye-btc').text('Купить'+ firstName[0]);
	$('.sel-btc').text('Продать'+ firstName[0]);
	$('.left-table-blvl').text('Amount'+ firstName[0]);
	


//Последняя цена
	var lastPrice = $(this).find('td:nth-child(2)').text();
	var lastPriceSpan = '<span class="red">'+ lastPrice +'</span>';
	
	$('.bit-stripe-3>div').html('<span>'+ lastPrice +'</span>');


//Изменения за 24ч
	var htmlCh = $(this).children('td:nth-child(3)').html();
	//var htmlChCont;
	$('.bit-stripe-3-ch').html('');
	$('.bit-stripe-2-ch').html('');
	validRegEx = /\+/;
	//alert(htmlCh.match(validRegEx));
	if(htmlCh.match(validRegEx)){
		htmlChCont = '<span class="green">'+htmlCh+'</span>';
		$('.bit-stripe-2-ch').html('<span class="green">'+ lastPrice +'</span>');
//for history
		$('.table-history tr td:first-child').html('<span >'+ lastPrice +'</span>');	
		//$('.table-history tr td:first-child').html('<span class="green">'+ lastPrice +'</span>');	

//For +/-
		$('.three-tables tr td:first-child:not(.total)').html('<span class="green">'+ lastPrice +'</span>');
		$('.three-tables tr td.total span:first-child').html('<span class="green">'+ lastPrice +'</span>');
	}else{
		htmlChCont = '<span class="red">'+htmlCh+'</span>';
		$('.bit-stripe-2-ch').html('<span class="red">'+ lastPrice +'</span>');
//for history
		$('.table-history tr td:first-child').html('<span >'+ lastPrice +'</span>');
		//$('.table-history tr td:first-child').html('<span class="red">'+ lastPrice +'</span>');
//For +/-
		$('.three-tables tr td:first-child:not(.total)').html('<span class="red">'+ lastPrice +'</span>');
		$('.three-tables tr td.total span:first-child').html('<span class="green">'+ lastPrice +'</span>');
	}
	$('.bit-stripe-3-ch').html(htmlChCont);
	console.log(htmlCh);
//placeholder

});


$('.star').on('click', function(){
	//$(this).toggleClass('light');
	if(!$(this).hasClass('light')){
		$(this).attr('src', 'img/star-active.svg');
		$(this).addClass('light');

		$('#star-table').css('display', 'table');
		$('#iost-table').css('display', 'none');
		$('#tron-table').css('display', 'none');
		$('#eth-table').css('display', 'none');
		$('#eos-table').css('display', 'none');
	}
	// }else{
	// 	$(this).attr('src', '../img/star.svg');
	// }
});

$('.main-star').on('click', function(){
	//$(this).toggleClass('light');
	if(!$(this).hasClass('light')){
		$(this).attr('src', 'img/star-active.svg');
		$(this).addClass('light');

		$('#section-star').css('display', 'block');
		$('#section-eos').css('display', 'none');
		$('#section-eth').css('display', 'none');
		$('#section-iost').css('display', 'none');
		$('#section-tron').css('display', 'none');
	}
	// }else{
	// 	$(this).attr('src', '../img/star.svg');
	// }
});
$('#section-star ').on('click', '.main-star-item', function(){

	
	var regImg = $(this).parents('.dig').find('.b11').text();
	console.log(regImg);
		//$("#star-table tbody").find('tr').children('img').not(.favorite).attr('src');

		$( ".graf .dig" ).each(function( i, el ) {
			if($(el).find('.b11').text() == regImg){
				$(el).find('.main-star-item').removeClass('light').attr('src', 'img/star.svg');
			}

		  });
	
		  $(this).parents('.dig').remove();
});


$('.main-star-item').on('click', function(){
	//$(this).toggleClass('light');
	if(!$(this).hasClass('light')){
		$(this).attr('src', 'img/star-active.svg');
		$(this).addClass('light');
		//Create fav-block
		var favSection = $(this).parents('.dig').html();
		//console.log(favSection);
		$("#section-star").append('<div class="row dig align-items-center">' + favSection + '</div>');

		
	
	}else{
		$(this).attr('src', 'img/star.svg');
		$(this).removeClass('light');
		
	}
});

$(".nav-link #oco").on('click', function(e){
	e.preventDefault();
	$(".oco-content").fadeOut();
	$(".stop-limit-content").fadeOut();
	$(".oco-content").fadeToggle();
});
$(".nav-link #stop-limit").on('click', function(e){
	e.preventDefault();
	$(".oco-content").fadeOut();
	$(".stop-limit-content").fadeOut();
	$(".stop-limit-content").fadeToggle();
});

$(document).click(function(){
	$(".oco-content").fadeOut();
	$(".stop-limit-content").fadeOut();
});


$('.oco-content, .stop-limit-content, #stop-limit, #oco').click(function(e){
	e.stopPropagation();
  });


$('#star-table').on('click', 'img.favorite', function(){
	var regImgAll = $(this).siblings('img').attr('src');
	console.log(regImgAll);
	$(this).parents('tr').remove();
	$( ".table-with-ico tr" ).each(function( i, el ) {
		if($(this).find('img:last-child').attr('src') == regImgAll){
			$(this).find('.favorite').removeClass('light-str');
			$(this).find('.favorite').attr('src', 'img/star.svg');
		}

	  });

	
});
$('.favorite').on('click', function(){
	if(!$(this).hasClass('light-str')){
		$(this).attr('src', 'img/star-active.svg');
		$(this).addClass('light-str');

		var tr = $(this).parents('tr').html();
		//tr = tr.children('td:nth-child(1)').html()
		$("#star-table tbody").append('<tr>' + tr + '</tr>');
		


	}else{
		$(this).attr('src', 'img/star.svg');
		$(this).removeClass('light-str');
		var regImg = $(this).siblings('img').attr('src');
		//$("#star-table tbody").find('tr').children('img').not(.favorite).attr('src');

		$( "#star-table tbody tr" ).each(function( i, el ) {
			if($(this).find('img:last-child').attr('src') == regImg){
				$(this).remove();
			}

		  });
	}
});

	var nav = $('.nav-container');

	//.history-wrap tr:nth-child(3) td:nth-child(1) span


 
	// $(window).scroll(function () {
	// 	if ($(this).scrollTop() > 136) {
	// 		$('header').addClass("f-nav");
	// 	} else {
	// 		$('header').removeClass("f-nav");
	// 	}
	// });



	// $('.how-item').equalHeights();


	
	  
	  // $(document).click(function(){
		//   $('.mob').removeClass('open');
		  
	  // });
	  // $('.mob, .menu').click(function(e){
		//   e.stopPropagation();
		// });
		

	//	$("a.to-id").mPageScroll2id();
// 	$(".fa-times").on('click', function(){
// 		$(".mob").css('top', '-150%');
// });
// $(".moby").on('click', function(){
// 	$(".mob").css('top', '0');
// });
// 	$('.fotorama').fotorama();  
// 	 $('.open-popup-link').magnificPopup({
// 		type:'inline',
// 		midClick: true // Allow opening popup on middle mouse click. Always set it to true if you don't provide alternative source in href.
// 	  });
});



