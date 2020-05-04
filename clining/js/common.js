                        window.tobiz = {"project_id":"132290","rep_id":"197879","user_id":"2","owner_email":"mail@mail.ru","user_email":"templates@tobiz.net","bs":true,"t":"5","products_on":"0","page_config":{"link_color":"#006699"},"w":1,"basket_conf":null}







$(function () {


    //    section1008

    var ua = window.navigator.userAgent;
    var isIE = /MSIE|Trident/.test(ua);

    if (isIE) {
        $('body').addClass('ie');
    } else {
        $('body').addClass('not_ie');
    }


    window.SetVideoBG = function (el) {

        var ratio = 16 / 9;

        function resize() {
            var cWidth = Math.floor(el.width());
            var cHeight = Math.floor(el.outerHeight());
            var pWidth = Math.floor($(window).width());
            if (pWidth < cWidth) {
                pWidth = cWidth;
            }
            var pHeight = Math.floor(pWidth / ratio);
            if (pHeight < cHeight) {
                pHeight = cHeight;
                pWidth = Math.floor(pHeight * ratio);
            }
            var position_top = 0,
                    position_left = 0;

            if ((cHeight - pHeight) < 0) {
                position_top = Math.floor((cHeight - pHeight) / 2);
            }
            if ((cWidth - pWidth) < 0) {
                position_left = Math.floor((cWidth - pWidth) / 2);
            }

            el.find('.video_bg').css({
                height: pHeight,
                width: pWidth,
                left: position_left,
                top: position_top,
            });
        }
        resize();
        $(window).resize(function () {
            resize()
        })



    }
	
	function not_menu(){

		if ($(window).width() <= 970) {
			$('.section311').each(function (i, e) {
				if ($(this).find('.menu1 li').length == 0 || $(this).find('.menu1').length == 0 )  {
					$(this).addClass('not_menu');
				}
			})
		}

	}
    $('.section').each(function () {
        if ($(this).find('.video_bg').size()) {
            SetVideoBG($(this));
        }




    })


    $('#wrapper').find('iframe').each(function () {
        var src = $(this).attr('src');

        if ($(this).parents('.form_html, .html').size()) {
            return false;

        }



        if (src.indexOf('https://www.youtube.com/embed/') > -1) {
            var video_id = src.substring(30);
            var yt_quality = 'hqdefault';
            var self = this;
            $.ajax({url: '/system/check_video.php?videoId=' + video_id,
                type: 'HEAD',
                success: function () {
                    yt_quality = 'maxresdefault';
                },
                complete: function () {
                    $(self).replaceWith('<div class="video_holder" data-video="' + $(self).attr('src') + '" style="width:' + $(self).width() + 'px; height:' + $(self).height() + 'px; background-image: url(https://i.ytimg.com/vi/' + video_id + '/' + yt_quality + '.jpg);"></div>')
                }
            });

            //$(this).replaceWith('<div class="video_holder" data-video="' + $(this).attr('src') + '" style="width:' + $(this).width() + 'px; height:' + $(this).height() + 'px; background-image: url(https://i.ytimg.com/vi/' + video_id + '/hqdefault.jpg);"></div>')



        }
    })


    $('body').on('click', '.video_holder', function () {
        var src = $(this).data('video');
        $(this).replaceWith('<iframe  allowfullscreen src="' + src + '?autoplay=1"></iframe>');
    })
    $('body').on('click', '.close_video_btn', function () {
        $('#wrapper').children('.popup_video').remove();
        $('body').removeClass('modal');
    })
    $('body').on('click', '.play_btn', function () {
        var parent = $(this).closest('.section');
        $('body').addClass('modal');
        var src = $(this).parent().siblings().find('.video_holder').data('video');
        parent.parent().append('<div class="popup_video"><div class="close_video_btn"></div><div class="video_this"></div></div>')
        $('.video_this').replaceWith('<iframe  allowfullscreen src="' + src + '?autoplay=1"></iframe>');

    })

    $('body').on('touchstart', '.video_holder', function () {
        var src = $(this).data('video');
        $(this).replaceWith('<iframe  allowfullscreen src="' + src + '?autoplay=1"></iframe>');
    })


    $('.section318 .accordion .line.caption, .section319 .accordion .line.caption').click(function () {
        $(this).parent().parent().find('.line.option, .line.btn').hide();
        $(this).parent().find('.line.option, .line.btn').show();
    })







    $('body').on('click', '.extra_info_block .close', function () {
		 $('body').removeClass('noscroll');
        if ($(this).parent().parent().siblings().find('.btn1').hasClass('open_card_was')) {//fix для открытия карточки товара
            console.log('close');
            $(this).parent().parent().siblings().children('.btn1').addClass('open_card');

            if ($(this).parents('.arr1 ').find('.btns_wrapp').children('.btn1')) {
                $(this).parents('.arr1 ').find('.btns_wrapp').children('.btn1').addClass('open_card');
            }
        } else {

        }
        if ($(this).parent().parent().siblings().children('.open_card_was')) {//fix для открытия карточки товара
            console.log('close');
        }

        // удаляем пометку о открытой карточке в редакторе.

        if (tobiz.editor == true) {

            var this_section = $(this).closest('.section');
            var id = this_section.data('id');
            console.log(id);
            if (this_section.hasClass('section1130')) {
                delete window.tobiz.slider1130array[id];
            }
        }


    })

    $('body').on('click', '.popup_thanks_close, .popup_form_close', function () {
        if ($(this).parent().parent().siblings('.btn1').hasClass('open_card_was')) {//fix для открытия карточки товара
            $(this).parent().parent().siblings('.btn1').addClass('open_card');
        }
        $('.popup_thanks').hide();
        $('.popup_form').hide().animate({'opacity': '0'}, 300);
        $('body').removeClass('modal');
    });

    $('body').on('click', '.basket_thanks_close', function () {
        $('#basket_bg_thanks').hide();
    });

    $('body').on('click', '.section1009 .widget_form_close', function () {
        $('.section1009 .form_wrapper').hide();
    });

    $('body').on('click', '.section1010 .widget_form_close', function () {
        $('.section1010 .arr1').hide();
    });

    $('body').on('click', '.choose_btns label', function () {
        $('.choose_btns label').removeClass('current_btn');
        $(this).addClass('current_btn');
    });

    $('body').on('click', '.all_form_close', function () {
        $('.section1009 .all_forms').hide();
    });

    $('body').on('click', '.section1009 .ico1', function (e) {


        if ($(this).children('a').is(':visible')) {
            return;
        }
//		if($(this).find('a').length>0){
//			//e.preventDefault();
//			//e.stopPropagation();
//			console.log('rerurn11');
//			return;
//
//		}
        $('.section1009 .field_input_textarea').parent().addClass('field_textarea');
        $('.section1009 .pop_form').toggle();
        $('.section1009 .social_icons').toggle();
        $('.section1009 .form_wrapper').show();
        $('.section1009 .all_forms').show();
    });

    $('body').on('click', '.section1009 .image2', function () {
        $('.section1009 .field_input_textarea').parent().addClass('field_textarea');
        $('.section1009 .pop_form').toggle();
        $('.section1009 .social_icons').toggle();
        $('.section1009 .form_wrapper').show();
        $('.section1009 .all_forms').show();
    });

//    $(document).click(function(event) {
//        if ($(event.target).closest(".all_forms").length) return;
//        $(".all_forms").hide("slow");
//        event.stopPropagation();
//    });



    $('body').on('click', '.popup_form', function (event) {
        if ($(event.target).closest(".popup_form_inner").length === 0) {
            if ($(this).siblings('.btn1').hasClass('open_card_was')) {
                $(this).siblings('.btn1').addClass('open_card');
            }
            $('.popup_form').hide();
            $('body').removeClass('modal');
        }
    });



    $('body').on('mouseup', '#wrapper', function (event) {
        var container = $(".section1009 .section_inner > .form_wrapper");
        if (container.has(event.target).length === 0) {
            container.hide();

        }
    });
    $('body').on('mouseup', '#wrapper', function (event) {
        var container = $(".section1009 .all_forms");
        if (container.has(event.target).length === 0) {
            container.hide();

        }
    });
    $('body').on('mouseup', '#wrapper', function (event) {
        var container = $(" .section1009 .section_inner > .social_icons");
        if (container.has(event.target).length === 0) {
            container.hide();

        }
    });
    $('body').on('click', '.popup_thanks', function (event) {
        if ($(event.target).closest(".popup_thanks_inner").length === 0) {
            $('.popup_thanks').hide();
        }
    });

    if ($('.section153').size()) {
        $('.section153').each(function () {
            SetVideoBG($(this));
        })
    }
    if ($('.section155').size()) {
        $('.section155').each(function () {
            SetVideoBG($(this));
        })
    }

    if ($('.section52').size()) {

        $('.section52 .logo').hover(function () {
            $(this).children('img').removeClass('grayscale')
        }, function () {
            $(this).children('img').addClass('grayscale')
        });

    }
    if ($('.section19').size()) {
        $('.section19 .policy').click(function () {
            $('#policy').remove();
            $('body').append('<div id="policy">\n\
				<div class="close  close_x">X</div>\n\
				<h1>Политика конфиденциальности</h1>\n\
				<p>\n\
				Данный сайт уважает Ваше право и соблюдает конфиденциальность при заполнении, передаче и хранении Ваших конфиденциальных сведений.\n\
				Размещение заявки на данном сайте означает Ваше согласие на обработку данных и дальнейшей передачи ваших контактных данных нашей компании.\n\
				Под персональными данными подразумевается информация, относящаяся к субъекту персональных данных, в частности имя, контактные реквизиты (адрес электронной почты) и иные данные, относимые Федеральным законом от 27 июля 2006 года № 152-ФЗ «О персональных данных» к категории персональных данных.\n\
				Целью обработки персональных данных является информирование об оказываемых услугах нашей компании.\n\
				Есть вопросы? Пишите нам на ' + window.tobiz.owner_email + '.</p>\n\
				<div class="close close_btn">Закрыть</div></div>');
            $('#policy .close_x, #policy .close_btn').click(function () {
                $('#policy').remove();
            })
        });
    }

    if ($('.section119').size()) {
        $('.section119 .policy').click(function () {
            $('#policy').remove();
            $('body').append('<div id="policy">\n\
				<div class="close  close_x">X</div>\n\
				<h1>Политика конфиденциальности</h1>\n\
				<p>\n\
				Данный сайт уважает Ваше право и соблюдает конфиденциальность при заполнении, передаче и хранении Ваших конфиденциальных сведений.\n\
				Размещение заявки на данном сайте означает Ваше согласие на обработку данных и дальнейшей передачи ваших контактных данных нашей компании.\n\
				Под персональными данными подразумевается информация, относящаяся к субъекту персональных данных, в частности имя, контактные реквизиты (адрес электронной почты) и иные данные, относимые Федеральным законом от 27 июля 2006 года № 152-ФЗ «О персональных данных» к категории персональных данных.\n\
				Целью обработки персональных данных является информирование об оказываемых услугах нашей компании.\n\
				Есть вопросы? Пишите нам на ' + window.tobiz.owner_email + '.</p>\n\
				<div class="close close_btn">Закрыть</div></div>');
            $('#policy .close_x, #policy .close_btn').click(function () {
                $('#policy').remove();
            })
        });
    }

    $('body').on('click', '.section119 .policy2', function () {
//        console.log('click');
        $(this).parent().parent().children('.policy2_popup').toggle();
    })


    $('body').on('click', '.product_card', function () {
        if ($(this).parent().parent().children('.extra_info_block_wrapper').eq($(this).data('id')).is(':visible')) {
            $(this).parent().parent().children('.extra_info_block_wrapper').hide();
        } else {
            $(this).parent().parent().children('.extra_info_block_wrapper').hide();
            $(this).parent().parent().children('.extra_info_block_wrapper').eq($(this).data('id')).show();
            $('body').addClass('modal');

        }

        var this_section = $(this).closest('.section');
        if (this_section.hasClass('section1130') && tobiz.editor == true) {
            var id = this_section.data('id');
            window.tobiz.slider1130array[id] = $(this).closest('.arr1').data('varBoxId');
        }
        ;
    })





    $('body').on('click', '.extra_info_block .close', function () {
        $(this).parent().parent().hide();
        $('body').removeClass('modal');

    })

    $('body').on('click', '#basket_form_close', function () {
        $('body').removeClass('modal');

    })

    $('body').on('click', '.btn_text2', function () {
        $(this).parent().parent().hide();
        $('body').removeClass('modal');

    })

    $('body').on('click', '.btn1x', function () {
        $('body').removeClass('modal');
    });




    $('body').on('click', '.extra_info_block_wrapper', function (event) {
        if ($(event.target).closest(".extra_info_block").length === 0) {
            if (typeof (window.tobiz.editor) === 'undefined') {

                if ($(this).siblings().children('.btn1').hasClass('open_card_was')) { //фикс для манипуляции с классами при открытии карточки товара
                    $(this).siblings().children('.btn1').addClass('open_card');
                }

                $('.extra_info_block_wrapper').hide();
                $('body').removeClass('modal');
            }
        }
    });


    if ($('.section143 .overlay_image_box, .section334 .overlay_image_box, .section144 .overlay_image_box, .section145 .overlay_image_box, .section1144 .overlay_image_box, .section148 .overlay_image_box, .section147 .overlay_image_box, .section313 .overlay_image_box, .section315 .overlay_image_box, .section128 .overlay_image_box, .section1152 .overlay_image_box, .section1153 .overlay_image_box, .section146 .overlay_image_box, .section1145 .overlay_image_box, .section1155 .overlay_image_box, .section2156 .overlay_image_box, .section2157 .overlay_image_box ').size()) {
        $('.section143 .overlay_image_box, .section334 .overlay_image_box, .section144 .overlay_image_box, .section145 .overlay_image_box, .section1144 .overlay_image_box, .section148 .overlay_image_box, .section147 .overlay_image_box, .section313 .overlay_image_box, .section315 .overlay_image_box, .section128 .overlay_image_box, .section1152 .overlay_image_box, .section1153 .overlay_image_box, .section146 .overlay_image_box, .section1145 .overlay_image_box, .section1155 .overlay_image_box, .section2156 .overlay_image_box, .section2157 .overlay_image_box ').click(function () {
            if ($(this).attr('data-link') != '' && $(this).attr('data-link') != 'undefined') {
                console.log($(this).attr('data-link'));
                if (parseInt($(this).attr('data-link-target')) == 1) {

                    window.open($(this).attr('data-link'), '_blank');
                } else {

                    window.open($(this).attr('data-link'), '_self');

                }
                return false;
            }
        });
    }
    if ($('.link_on.image1, .link_on.image2, .link_on.s_image').size()) {
        $('body').on('click', '.link_on.image1, .link_on.image2, .link_on.s_image', function () {
            if ($(this).attr('data-link') != '' && $(this).attr('data-link') != 'undefined') {
				if($(this).parents('.section').hasClass('get_item_from_category')){
					$(this).siblings('.gotoitempage').click();
				}else{
					
					if (parseInt($(this).attr('data-link-target')) == 1) {

						window.open($(this).attr('data-link'), '_blank');
					} else {

						window.open($(this).attr('data-link'), '_self');

					}
				}
                return false;
            }
        });
    }




    $('body').on('submit', '.section1117 form.search', function (e) {
        e.preventDefault();
        if (window.tobiz.editor) {
            return false;
        }

        var $self_block = $(this).closest('.section');

        var search_result = '';
        var search_str = $(this).children('input[type="search"]').val();
		
		
			
		if ($(this).parents('.section').hasClass('search_in_page')) {
			var dom_el = $('.arr1 .title1');
			var array = dom_el.map(function(){
				   return $.trim($(this).text());
				}).get();
			$self_block.find('.find_popup').hide();
			$.each(dom_el, function (i, el) {
		
				$(this).parents('.arr1').removeClass('finded_in_page');
				var elem_text = $.trim($(this).text()).toLowerCase();
				if (elem_text.indexOf(search_str.toLowerCase()) !== -1) {
					$(this).parents('.arr1').addClass('finded_in_page');
				}
				if($('.arr1.finded_in_page').length == 0){
					$self_block.find('.find_popup').show().text('Ничего не найдено');
				}
			})
			if($('.arr1.finded_in_page').length != 0){
				$('html,body').stop().animate({scrollTop: $('.finded_in_page').offset().top}, 1000);
			}
		} else {
		
        $.ajax({
            url: '/search.php',
            dataType: "json",
            method: "POST",
            data: {search: search_str},
            cache: false,
            success: function (data) {
                search_result = data;
                $self_block.find('.find_popup').empty();
                var html = '';


                $.each(search_result, function (index, element) {
                    html += '<div class="find_item"><a href="' + element.link + '" target="_blank">' + element.title + '</a><p>' + element.description + '</p></div>';
                });
                $self_block.find('.find_popup').append(html);
                if (html == '') {

                    $self_block.find('.find_popup').append('Ничего не найдено.');

                }


                $self_block.find('.find_popup').fadeIn();
                $self_block.find('.find_popup').prepend('<div class="result_title">Результаты вашего поиска</div><div class="close"></div>');
            }
        });
	}

    });
    $('body').on('submit', '.section120 form.search', function (e) {
        e.preventDefault();

        if (window.tobiz.editor) {
            return false;
        }


        var $self_block = $(this).closest('.section');

        var search_result = '';
        var search_str = $(this).children('input[type="search"]').val();
		if ($(this).parents('.section').hasClass('search_in_page')) {
			var dom_el = $('.arr1 .title1');
			$self_block.find('.find_popup').hide();
			var array = dom_el.map(function(){
				   return $.trim($(this).text());
				}).get();
			$.each(dom_el, function (i, el) {
				$(this).parents('.arr1').removeClass('finded_in_page');
				var elem_text = $.trim($(this).text()).toLowerCase();
				if (elem_text.indexOf(search_str.toLowerCase()) !== -1) {
					$(this).parents('.arr1').addClass('finded_in_page');
				}
				if($('.arr1.finded_in_page').length == 0){
					$self_block.find('.find_popup').show().text('Ничего не найдено');
				}
			})
			if($('.arr1.finded_in_page').length != 0){
				$('html,body').stop().animate({scrollTop: $('.finded_in_page').offset().top}, 1000);
			}
		} else {

        $.ajax({
            url: '/search.php',
            dataType: "json",
            method: "POST",
            data: {search: search_str},
            cache: false,
            success: function (data) {
                search_result = data;
                $self_block.find('.find_popup').empty();
                var html = '';


                $.each(search_result, function (index, element) {
                    html += '<div class="find_item"><a href="' + element.link + '" target="_blank">' + element.title + '</a><p>' + element.description + '</p></div>';
                });
                $self_block.find('.find_popup').append(html);
                if (html == '') {

                    $self_block.find('.find_popup').append('Ничего не найдено.');

                }


                $self_block.find('.find_popup').fadeIn();
                $self_block.find('.find_popup').prepend('<div class="result_title">Результаты вашего поиска</div><div class="close"></div>');
            }
        });
		}
    });
    $('body').on('submit', '.section1120 form.search, .section2120 form.search', function (e) {
        e.preventDefault();

        if (window.tobiz.editor) {
            return false;
        }

        var $self_block = $(this).closest('.section');

        var search_result = '';
        var search_str = $(this).children('input[type="search"]').val();

		if ($(this).parents('.section').hasClass('search_in_page')) {
			var dom_el = $('.arr1 .title1');
			$self_block.find('.find_popup').hide();
			var array = dom_el.map(function(){
				   return $.trim($(this).text());
				}).get();
			$.each(dom_el, function (i, el) {
				$(this).parents('.arr1').removeClass('finded_in_page');
				var elem_text = $.trim($(this).text()).toLowerCase();
				if (elem_text.indexOf(search_str.toLowerCase()) !== -1) {
					$(this).parents('.arr1').addClass('finded_in_page');
				}
				if($('.arr1.finded_in_page').length == 0){
					$self_block.find('.find_popup').show().text('Ничего не найдено');
				}
			})
			if($('.arr1.finded_in_page').length != 0){
				$('html,body').stop().animate({scrollTop: $('.finded_in_page').offset().top}, 1000);
			}
		} else {
        $.ajax({
            url: '/search.php',
            dataType: "json",
            method: "POST",
            data: {search: search_str},
            cache: false,
            success: function (data) {
                search_result = data;
                $self_block.find('.find_popup').empty();
                var html = '';


                $.each(search_result, function (index, element) {
                    html += '<div class="find_item"><a href="' + element.link + '" target="_blank">' + element.title + '</a><p>' + element.description + '</p></div>';
                });
                $self_block.find('.find_popup').append(html);
                if (html == '') {

                    $self_block.find('.find_popup').append('Ничего не найдено.');

                }


                $self_block.find('.find_popup').fadeIn();
                $self_block.find('.find_popup').prepend('<div class="result_title">Результаты вашего поиска</div><div class="close"></div>');
            }
        });
		}
    });
    $('body').on('submit', '.section119 form.search', function (e) {
        e.preventDefault();


        if (window.tobiz.editor) {
            return false;
        }
		
		var self = this;
        var $self_block = $(this).closest('.section');

        var search_result = '';
        var search_str = $(this).children('input[type="search"]').val();


		if ($(this).parents('.section').hasClass('search_in_page')) {
			var dom_el = $('.arr1 .title1');
			$self_block.find('.find_popup').hide();
			var array = dom_el.map(function(){
				   return $.trim($(this).text());
				}).get();
			$.each(dom_el, function (i, el) {
				$(this).parents('.arr1').removeClass('finded_in_page');
				var elem_text = $.trim($(this).text()).toLowerCase();
				if (elem_text.indexOf(search_str.toLowerCase()) !== -1) {
					$(this).parents('.arr1').addClass('finded_in_page');
				}
				if($('.arr1.finded_in_page').length == 0){
					$self_block.find('.find_popup').show().text('Ничего не найдено');
				}
			})
			if($('.arr1.finded_in_page').length != 0){
			$('html,body').stop().animate({scrollTop: $('.finded_in_page').offset().top}, 1000);
			}
		} else {
			$.ajax({
				url: '/search.php',
				dataType: "json",
				cache: false,
				data: {search: search_str},
				success: function (data) {
					search_result = data;
					$self_block.find('.find_popup').empty();
					var html = '';


					$.each(search_result, function (index, element) {
						html += '<div class="find_item"><a href="' + element.link + '" target="_blank">' + element.title + '</a><p>' + element.description + '</p></div>';
					});
					$self_block.find('.find_popup').append(html);
					if (html == '') {

						$self_block.find('.find_popup').append('Ничего не найдено.');

					}


					$self_block.find('.find_popup').fadeIn();
					$self_block.find('.find_popup').prepend('<div class="result_title">Результаты вашего поиска</div><div class="close"></div>');
				}
			});
		}
    });

    $('body').on('click', '.find_popup .close', function () {
        $(this).parent().fadeOut();
    });




    if ($('.section41 .overlay_image_box, .section42 .overlay_image_box, .section43 .overlay_image_box, .section44 .overlay_image_box, .section45 .overlay_image_box, .section46 .overlay_image_box, .section47 .overlay_image_box, .section48 .overlay_image_box').size()) {
        $('.section41 .overlay_image_box, .section42 .overlay_image_box, .section43 .overlay_image_box, .section44 .overlay_image_box, .section45 .overlay_image_box, .section46 .overlay_image_box, .section47 .overlay_image_box, .section48 .overlay_image_box').click(function () {

            var this_section = $(this).closest('.section');
            if (this_section.hasClass('img_zoom')) {
                var image_url = $(this).parent().children().attr('src');
                var t_arr = image_url.split('/');
                var new_image_url = '/img/800x600/' + t_arr[3];

//                console.log(new_image_url);

                if ($('#img_zoomer_bg').size()) {
                    $('#img_zoomer_bg').remove();
                }
                $('body').append('<div id="img_zoomer_bg"><div id="img_zoomer" style="background-image:url(' + new_image_url + ')"></div><div id="img_zoomer_close"></div></div>');

            }
            //console.log('213');
        })
    }

    if ($('.section141 .overlay_image_box,  .section147 .overlay_image_box, .section142 .overlay_image_box, .section1157 .overlay_image_box,  .section146 .overlay_image_box,  .section315 .overlay_image_box, .section315 img ').size()) {
        $('.section141 .overlay_image_box,  .section147 .overlay_image_box, .section142 .overlay_image_box, .section1157 .overlay_image_box,  .section146 .overlay_image_box,  .section315 .overlay_image_box, .section315 img ').click(function () {

            var this_section = $(this).closest('.section');
            if (this_section.hasClass('img_zoom')) {
                var image_url = $(this).parent().children().attr('src');
				console.log(image_url);
                var t_arr = image_url.split('/');
                var new_image_url = '/img/800x600/' + t_arr[3];

                if ($('#img_zoomer_bg').size()) {
                    $('#img_zoomer_bg').remove();
                }
                $('body').append('<div id="img_zoomer_bg"><div id="img_zoomer" style="background-image:url(' + new_image_url + ')"></div><div id="img_zoomer_close"></div></div>');
            }

            //console.log('213');
        })
    }
//
    if ($('.overlay_image_box').parent().hasClass('img_zoom') || $('.image_box').hasClass('img_zoom')) {
        $(window).resize(function () {

            $('#popup_img_wrap img').css('max-height', $(window).height() * 0.98);
        });
        var $all_photo = $('.section .img_zoom');
        var clicked_img_number,
                $preload,
                start,
                $gallery_img_hide,
                $gallery_img;
        var portfolio_img_src = [];
        $all_photo.click(function (e) {
            e.stopPropagation();
            portfolio_img_src.length = 0;
            var all;
            if ($(this).parent().hasClass('item')) {
                all = $(this).parent().parent().find('.img_zoom');
            } else {
                all = $(this).parent().children('.img_zoom');
            }
            all.each(function () {

                var src = ($(this).children('img').data('src') || $(this).children('img').attr('src') ||$(this).children('.img').data('src'));
                var t_arr2 = src.split('/');

                var this_section = $(this).closest('.section');
//                console.log(this_section);
                var image_url = src;
                var t_arr = image_url.split('/');
                var size = '800x600'; //default
                var css_class = ''; //default
                if (this_section.hasClass('img_album')) {
                    size = '800x600';

                }
                if (this_section.hasClass('img_portrait')) {
                    size = '600x840';
                    css_class = 'portret'
                }
                if (this_section.hasClass('img_square')) {
                    size = '600x600';
                    css_class = 'square'
                }

                var new_image_url = '/img/' + size + '/' + t_arr[3];

                portfolio_img_src.push(new_image_url);
            });
            if ($(this).parent().hasClass('item')) {
                clicked_img_number = $(this).parent().index(); // Определяем порядковый номер изображения, по которому кликнули
            } else {
                clicked_img_number = $(this).index(); // Определяем порядковый номер изображения, по которому кликнули
            }
            if (clicked_img_number === -1) {
                clicked_img_number = 0;
            }
            start = true;
            // Открываем галлерею
            $('body').append('<div id="popup_img"> \n\
                    <div id="preload"></div>        \n\
                    <img id="popup_img_hide" src=' + portfolio_img_src[clicked_img_number] + '>\n\
                    <div id="popup_img_prev"><i class="fa fa-chevron-left" aria-hidden="true"></i></div> <div id="popup_img_next"><i class="fa fa-chevron-right" aria-hidden="true"></i></div>   \n\
                    <div id="popup_img_wrap"> <img src="' + portfolio_img_src + '" alt=""> \n\
                    <div id="close_popup_img" title="Закрыть"></div> \n\
                </div>\n\
                </div>');
            $('#popup_img_wrap img').css('max-height', $(window).height() * 0.98);
            $('#popup_img').fadeIn(200);
            $preload = $('#preload');
            $gallery_img = $('#popup_img_wrap img');
            $gallery_img_hide = $('#popup_img_hide');
            load_img();
        });

        $('body').on('click', '#popup_img_wrap', function (e) {
            e.stopPropagation();
            GotoRight();
        });
        $('body').on('click', '#popup_img_next', function (e) {
            e.stopPropagation();
            GotoRight();
        });
        $('body').on('click', '#popup_img_prev', function (e) {
            e.stopPropagation();
            GotoLeft();
        });
        $('body').on('click', '#close_popup_img', function (e) {
            e.stopPropagation();
            CloseGallery();
        });

        //$('body').on()(CloseGallery);

        $('body').on('click', '#popup_img', function (e) {

            e.stopPropagation();
            CloseGallery();

        })


        $(document).keydown(function (eventObject) {
            if (eventObject.which === 37) {
                GotoLeft();
            }
            if (eventObject.which === 39) {
                GotoRight();
            }
        });
        function GotoRight() {
            ++clicked_img_number;
            if (clicked_img_number + 1 > portfolio_img_src.length) {
                clicked_img_number = 0;
            }
            start = false;
            load_img();
        }
        function GotoLeft() {
            --clicked_img_number;
            if (clicked_img_number < 0) {
                clicked_img_number = (portfolio_img_src.length - 1);
            }
            start = false;
            load_img();
        }
        function CloseGallery() {
            $('#popup_img').fadeOut(100, function () {
                $('#popup_img').remove();
            });
        }
        function load_img() {
            var timer = setTimeout(function () {
                $preload.show();
            }, 400);

            if (!start) {
                $gallery_img_hide.attr('src', portfolio_img_src[(clicked_img_number)]).load(function () {
                    $preload.hide();
                    $gallery_img.fadeOut(100, function () {
                        clearTimeout(timer);
                        $gallery_img.attr('src', portfolio_img_src[(clicked_img_number)]).fadeIn(400);
                    });
                });
            } else {
                $gallery_img.attr('src', portfolio_img_src[(clicked_img_number)]).load(function () {
                    clearTimeout(timer);
                    $preload.hide();
                });
                $gallery_img.attr('src', portfolio_img_src[(clicked_img_number)]);
            }
        }
//Закрытие форм по нажатию клавиши "ESC"
        $(document).keydown(function (eventObject) {
            if (eventObject.which === 27) {
                $('.popup_wrap').fadeOut(400);
                $('#popup_img').fadeOut(100, function () {
                    $('#popup_img').remove();
                });
            }
        });

    }

    //Мульти режим

    //400x560
    //800x600
    //940x400
    //600x600

    if ($('.section130 .image1').size()) {
        $('.section130').on('click', '.image1', function () {

//            console.log('multi');

            $('.show_extra_info').removeClass('currnet');
            $(this).addClass('currnet');
            var parent = $(this).closest('.arr1');
            var j = 0;
            $.each(parent.find('.show_extra_info'), function (index, element) {
                if ($(element).hasClass('currnet')) {
                    j = index;
                }
            })
            if ($(this).hasClass('show_extra_info')) {
                //                            if($(window).width()<800){
                //                                return true;
                //                            }
                $(this).parent().parent().children('.extra_info_block_wrapper').eq(j).show();
                $('body').addClass('modal')
                return true;
            }
            if ($(this).hasClass('extra_image')) {
                return false;
            }


            var this_section = $(this).closest('.section');
            if (this_section.hasClass('img_zoom')) {
                var image_url = $(this).children().data('src') || $(this).children().attr('src');
                var t_arr = image_url.split('/');
                var size = '1600x1200'; //default
                var css_class = ''; //default
                if (this_section.hasClass('img_album')) {
                    size = '1600x1200';
                }
                if (this_section.hasClass('img_portrait')) {
                    size = '800x1120';
                    css_class = 'portret'
                }
                if (this_section.hasClass('img_square')) {
                    size = '1200x1200';
                    css_class = 'square'
                }


                var new_image_url = '/img/' + size + '/' + t_arr[3];
                if ($('#img_zoomer_bg').size()) {
                    $('#img_zoomer_bg').remove();
                }
                $('body').append('<div id="img_zoomer_bg"><div id="img_zoomer" class="' + css_class + '" style="background-image:url(' + new_image_url + ')"></div><div id="img_zoomer_close"></div></div>');
            }
        })
    }
    
    
    if ($('.section1158 .image1, .section1158 .image2').size()) {
        
        $('.section1158').on('click', '.image1, .image2', function () {

            var this_section = $(this).closest('.section');
            if (this_section.hasClass('img_zoom')) {
                var image_url = $(this).children().data('src') || $(this).children().attr('src');
                var t_arr = image_url.split('/');
                var size = '1600x1200'; //default
                var css_class = 'img_album'; //default
                if (this_section.hasClass('img_album') || 1) {
                    size = '1600x1200';
                }
//                if (this_section.hasClass('img_portrait')) {
//                    size = '800x1120';
//                    css_class = 'portret'
//                }
//                if (this_section.hasClass('img_square')) {
//                    size = '1200x1200';
//                    css_class = 'square'
//                }


                var new_image_url = '/img/' + size + '/' + t_arr[3];
                if ($('#img_zoomer_bg').size()) {
                    $('#img_zoomer_bg').remove();
                }
                $('body').append('<div id="img_zoomer_bg"><div id="img_zoomer" class="' + css_class + '" style="background-image:url(' + new_image_url + ')"></div><div id="img_zoomer_close"></div></div>');
            }
        })
    }
	

    if ($('.section1302 .image1').size()) {
        $('.section1302').on('click', '.image1', function () {

//            console.log('multi');

            $('.show_extra_info').removeClass('currnet');
            $(this).addClass('currnet');
            var parent = $(this).closest('.arr1');
            var j = 0;
            $.each(parent.find('.show_extra_info'), function (index, element) {
                if ($(element).hasClass('currnet')) {
                    j = index;
                }
            })
            if ($(this).hasClass('show_extra_info')) {
                //                            if($(window).width()<800){
                //                                return true;
                //                            }
                $(this).parent().parent().children('.extra_info_block_wrapper').eq(j).show();
                $('body').addClass('modal')
                return true;
            }
            if ($(this).hasClass('extra_image')) {
                return false;
            }


            var this_section = $(this).closest('.section');
            if (this_section.hasClass('img_zoom')) {
                var image_url = $(this).children().data('src') || $(this).children().attr('src');
                var t_arr = image_url.split('/');
                var size = '1600x1200'; //default
                var css_class = ''; //default
                if (this_section.hasClass('img_album')) {
                    size = '1600x1200';
                }
                if (this_section.hasClass('img_portrait')) {
                    size = '800x1120';
                    css_class = 'portret'
                }
                if (this_section.hasClass('img_square')) {
                    size = '1200x1200';
                    css_class = 'square'
                }


                var new_image_url = '/img/' + size + '/' + t_arr[3];
                if ($('#img_zoomer_bg').size()) {
                    $('#img_zoomer_bg').remove();
                }
                $('body').append('<div id="img_zoomer_bg"><div id="img_zoomer" class="' + css_class + '" style="background-image:url(' + new_image_url + ')"></div><div id="img_zoomer_close"></div></div>');
            }
        })
    }

    if ($('.section1130 .image1').size()) {
        $('.section1130').on('click', '.image1', function () {

//            console.log('multi');

            $('.show_extra_info').removeClass('currnet');
            $(this).addClass('currnet');
            var parent = $(this).closest('.arr1');
            var j = 0;
            $.each(parent.find('.show_extra_info'), function (index, element) {
                if ($(element).hasClass('currnet')) {
                    j = index;
                }
            })
            if ($(this).hasClass('show_extra_info')) {
                //                            if($(window).width()<800){
                //                                return true;
                //                            }
                $(this).parent().parent().children('.extra_info_block_wrapper').eq(j).show();
                $('body').addClass('modal')
                return true;
            }
            if ($(this).hasClass('extra_image')) {
                return false;
            }


            var this_section = $(this).closest('.section');
            if (this_section.hasClass('img_zoom')) {
                var image_url = $(this).children().data('src') || $(this).children().attr('src');
                var t_arr = image_url.split('/');
                var size = '1600x1200'; //default
                var css_class = ''; //default
                if (this_section.hasClass('img_album')) {
                    size = '1600x1200';
                }
                if (this_section.hasClass('img_portrait')) {
                    size = '800x1120';
                    css_class = 'portret'
                }
                if (this_section.hasClass('img_square')) {
                    size = '1200x1200';
                    css_class = 'square'
                }


                var new_image_url = '/img/' + size + '/' + t_arr[3];
                if ($('#img_zoomer_bg').size()) {
                    $('#img_zoomer_bg').remove();
                }
                $('body').append('<div id="img_zoomer_bg"><div id="img_zoomer" class="' + css_class + '" style="background-image:url(' + new_image_url + ')"></div><div id="img_zoomer_close"></div></div>');
            }
        })
    }
//    if ($('.section130 .on_btn_popup').size()) {
//        $('.section130').on('click', '.on_btn_popup', function () {
//            $('.show_extra_info').removeClass('currnet');
//            $(this).addClass('currnet');
//            var parent = $(this).closest('.arr1');
//            var j = 0;
//            $.each(parent.find('.show_extra_info'), function (index, element) {
//                if ($(element).hasClass('currnet')) {
//                    j = index;
//                }
//            })
//            if ($(this).hasClass('show_extra_info')) {
//                //                            if($(window).width()<800){
//                //                                return true;
//                //                            }
//                $(this).parent().siblings('.extra_info_block_wrapper').eq(j).show();
//                $('body').addClass('modal')
//                return true;
//            }
//            if ($(this).hasClass('extra_image')) {
//                return false;
//            }
//
//
//            var this_section = $(this).closest('.section');
//            if (this_section.hasClass('img_zoom')) {
//                var image_url = $(this).children().attr('src');
//                var t_arr = image_url.split('/');
//                var size = '1600x1200'; //default
//                var css_class = ''; //default
//                if (this_section.hasClass('img_album')) {
//                    size = '1600x1200';
//                }
//                if (this_section.hasClass('img_portrait')) {
//                    size = '800x1120';
//                    css_class = 'portret'
//                }
//                if (this_section.hasClass('img_square')) {
//                    size = '1200x1200';
//                    css_class = 'square'
//                }
//
//
//                var new_image_url = '/img/' + size + '/' + t_arr[3];
//                if ($('#img_zoomer_bg').size()) {
//                    $('#img_zoomer_bg').remove();
//                }
//                $('body').append('<div id="img_zoomer_bg"><div id="img_zoomer" class="' + css_class + '" style="background-image:url(' + new_image_url + ')"></div><div id="img_zoomer_close"></div></div>');
//            }
//        })
//    }





    if ($(' .section138 .image').size()) {
        $('.section138 .image').click(function () {
            var this_section = $(this).closest('.section');
            if (this_section.hasClass('img_zoom')) {
                var image_url = $(this).children().attr('src');
                var t_arr = image_url.split('/');
                if (this_section.hasClass('big_img')) {
                    var new_image_url = '/img/1880x900/' + t_arr[3];
                    if ($('#img_zoomer_bg').size()) {
                        $('#img_zoomer_bg').remove();
                    }
                    $('body').append('<div id="img_zoomer_bg"><div id="img_zoomer" style="background-image:url(' + new_image_url + ') ;background-repeat: no-repeat; width: 94vw; height: 45vw; max-width: 1880px; max-height: 900px;"></div><div id="img_zoomer_close"></div></div>');
                    ;
                } else if (this_section.hasClass('wide')) {
                    var new_image_url = '/img/1254x600/' + t_arr[3];
                    if ($('#img_zoomer_bg').size()) {
                        $('#img_zoomer_bg').remove();
                    }
                    $('body').append('<div id="img_zoomer_bg"><div id="img_zoomer" style="background-image:url(' + new_image_url + ') ;background-repeat: no-repeat;  width: 1254px; height: 600px;max-width: 94%; "></div><div id="img_zoomer_close"></div></div>');
                    ;

                } else if (this_section.hasClass('fill_img')) {
                    var new_image_url = '/img/1000x702/' + t_arr[3];
                    if ($('#img_zoomer_bg').size()) {
                        $('#img_zoomer_bg').remove();
                    }
                    $('body').append('<div id="img_zoomer_bg"><div id="img_zoomer" style="background-image:url(' + new_image_url + ') ;background-repeat: no-repeat;  width: 1000px; height: 702px;max-width: 94%; "></div><div id="img_zoomer_close"></div></div>');
                    ;

                } else {
                    var new_image_url = '/img/800x563/' + t_arr[3];
                    if ($('#img_zoomer_bg').size()) {
                        $('#img_zoomer_bg').remove();
                    }
                    $('body').append('<div id="img_zoomer_bg"><div id="img_zoomer" style="background-image:url(' + new_image_url + ') ;background-repeat: no-repeat;  width: 800px; height: 560px; max-width: 94%; "></div><div id="img_zoomer_close"></div></div>');
                    ;

                }
            }
        })
    }
    //Альбомный режим
    if ($('.section128 .image1, .section125 .image1, .section124 .image1, .section149 .image1, .section150 .image1, .section200 .image1, .section201 .image1,.section250 .image1').size()) {
        $('.section128 .image1, .section128 .image2, .section128 .image3,  .section125 .image1,  .section125 .image2,  .section124 .image1,  .section124 .image2,  .section124 .image3, .section149 .image1, .section149 .image2, .section149 .image3, .section150 .image1, .section150 .image2, .section200 .image1, .section200 .image2, .section200 .image3, .section200 .image4, .section201 .image1, .section201 .image2, .section201 .image3, .section201 .image4, .section201 .image5, .section250 .image1, .section250 .image2').click(function () {
            $('.show_extra_info').removeClass('currnet');
            $(this).addClass('currnet');
            var parent = $(this).closest('.arr1');
            var j = 0;
            $.each(parent.find('.show_extra_info'), function (index, element) {
                if ($(element).hasClass('currnet')) {
                    j = index;
                }
            })
            if ($(this).hasClass('show_extra_info')) {
//                            if($(window).width()<800){
//                                return true;
//                            }
                $(this).parent().parent().children('.extra_info_block_wrapper').eq(j).show();
                $('body').addClass('modal')
                return true;
            }
            if ($(this).hasClass('extra_image')) {
                return false;
            }
            var this_section = $(this).closest('.section');
            if (this_section.hasClass('img_zoom')) {
                var image_url = $(this).children().attr('src');
                var t_arr = image_url.split('/');
                if ($(this).hasClass('image_big')) {
                    var new_image_url = '/img/1200x1200/' + t_arr[3];
                    if ($('#img_zoomer_bg').size()) {
                        $('#img_zoomer_bg').remove();
                    }
                    $('body').append('<div id="img_zoomer_bg"><div id="img_zoomer" class="image_big" style="background-image:url(' + new_image_url + ')"></div><div id="img_zoomer_close"></div></div>');
                } else {
                    var new_image_url = '/img/1600x1200/' + t_arr[3];
                    if ($('#img_zoomer_bg').size()) {
                        $('#img_zoomer_bg').remove();
                    }
                    $('body').append('<div id="img_zoomer_bg"><div id="img_zoomer" style="background-image:url(' + new_image_url + ')"></div><div id="img_zoomer_close"></div></div>');
                }
            }
        })
    }

    //Портретный режим
    if ($('.section151 .image1').size()) {
        $('.section151 .image1, .section151 .image2, .section151 .image3, .section151 .image4').click(function () {
            var this_section = $(this).closest('.section');
            if (this_section.hasClass('img_zoom')) {
                var image_url = $(this).children().attr('src');
                var t_arr = image_url.split('/');
                var new_image_url = '/img/400x560/' + t_arr[3];
                if ($('#img_zoomer_bg').size()) {
                    $('#img_zoomer_bg').remove();
                }
                $('body').append('<div id="img_zoomer_bg"><div id="img_zoomer" class="portret" style="background-image:url(' + new_image_url + ')"></div><div id="img_zoomer_close" class="portret"></div></div>');
            }
        })
    }


    $('body').on('click', '#img_zoomer_bg ,#img_zoomer_clocse', function () {
        if ($('#img_zoomer_bg').size()) {
            $('#img_zoomer_bg').remove();
        }

    })




    $('.btn1, .btn2, .btn3, .btn4,  .btn5, .btn6, .btn1x, .btn2x, .btn3x, .btn4x,  .btn5x,  .btn6x').each(function () {

        if ($(this).css('background-color') == 'rgb(255, 255, 255)') {
//            $(this).css({color: '#3D3D3DC'})
        }


    })


    window.basket = {
        status: 0,

        getData: function () {
            var basket = JSON.parse(localStorage.getItem('basket'));
            if (basket == null) {
                return  [];

            } else {
                return basket;
            }

        },
        saveData: function (data) {
            try {
                localStorage.setItem('basket', JSON.stringify(data));
            } catch (e) {
                if (e == QUOTA_EXCEEDED_ERR) {
                    alert('Ошибка добавления товара в корзину');
                }
            }
        },

        addItem: function (item) {
            var basket = this.getData();
            // смотрим нет ли такой позиции
            var ifExist = false;
            $.each(basket, function (index, element) {
                if (element.title == item.title && element.price * 1 == item.price * 1) {
                    // если есть увеличиваем количество
                    ifExist = true;

                    if (typeof (element.quantity) === 'undefined') {
                        element.quantity = 1;


                    } else {
                        element.quantity = (parseInt(element.quantity));
                        element.quantity++;

                    }

                    element.price = element.price * 1;
                }
            })
            // если нет просто добавляем.
            if (!ifExist) {
                basket.push(item);
            }
            this.saveData(basket);
            this.renderForm();
            this.renderBtn();
            this.showBtn();
        },

        removeItem: function (item) {
            var basket = this.getData();
            // смотрим нет ли такой позиции
            var break_each = false;


            if (item.price == null || item.price == 'NaN' || item.price == 'null') {
                item.price = 0;
            }

            if (basket) {
                $.each(basket, function (index, element) {
                    if (break_each) {
                        return true;
                    }

                    if (element.price == null || element.price == 'NaN' || element.price == 'null') {
                        element.price = 0;
                    }



                    if (element.title == item.title && element.price == item.price) {
                        // если есть удаляем

                        basket.splice(index, 1);
                        break_each = true;
                    }
                })
            }
            this.saveData(basket);
        },
        updateItem: function (item) {
            var basket = this.getData();
            // смотрим нет ли такой позиции
            var break_each = false;

            if (basket) {
                $.each(basket, function (index, element) {
                    if (break_each) {
                        return true;
                    }
                    if (element.title == item.title && element.price * 1 == item.price * 1) {
                        // если есть удаляем
                        element.quantity = item.quantity;
                        break_each = true;
                    }
                    element.price = element.price * 1;
                })
            }
            this.saveData(basket);
        },
        clean: function () {
            this.saveData([]);
        },

        countItems: function () {
            return this.getData().length;
        },

        countSum: function () {
            var sum = 0;

            $.each(this.getData(), function (i, el) {
                sum += parseInt(el.quantity) * parseFloat(el.price);

            })

            sum = sum.toFixed(2) * 1

            return sum;

        },

        btnEventListener: function () {
            var self = this;
            $('body').on('click', '#basket_btn', function () {
                self.showForm();
                $('body').addClass('modal');
            })
        },
        renderBtn: function () {
            $('#basket_btn').remove();
            if (this.countItems() > 0) {



                $('body').append('<div id="basket_btn"  style="display:none"><i class="material-icons">shopping_basket</i> Корзина (' + this.countItems() + ')</div>');

            }

            $('#basket_btn').addClass('animate');


            this.init();
        },

        hideBtn: function () {
            $('#basket_btn').hide();
        },
        showBtn: function () {
            $('#basket_btn').show();
        },

        updateForm: function () {


            if (window.tobiz.basket_conf !== null && typeof (window.tobiz.basket_conf) !== 'undefined') {


                var bc = window.tobiz.basket_conf;
                var delivery_amount = 0;
                var promo_k = 1;
                var discount = '';

                if (typeof (bc.basket_free_delivery) !== 'undefined') {

                    var free_delivery_from = bc.basket_free_delivery_from;
                    free_delivery_from = parseFloat(free_delivery_from);
                    free_delivery_from = free_delivery_from.toFixed(2) * 1;

                    if (this.countSum() > free_delivery_from) {
                        $('#basket_delivery').html('Доставка бесплатная');
                        $('#basket_make_order input[name="delivery"]').val('Бесплатная доставка');

                    } else {
                        $('#basket_delivery').html('Стоимость доставки: ' + bc.basket_delivery_price + '\
                        <div>Бесплатная доставка при заказе от ' + bc.basket_free_delivery_from + '</div>\n\
                    ');
                        delivery_amount = bc.basket_delivery_price * 1;

                        $('#basket_make_order input[name="delivery"]').val('Стоимость доставки ' + delivery_amount + '');

                    }
                }
                if (typeof (bc.basket_promo) !== 'undefined') {

                    $('#basket_make_order input[name="promo_code"]').val('');

                    var input_promo = $('#promo_code').val();
                    input_promo = input_promo.trim();
                    input_promo = input_promo.toUpperCase();

                    var valid_promo = bc.basket_promo_code;

                    valid_promo = valid_promo.trim();
                    valid_promo = valid_promo.toUpperCase();

                    if (valid_promo == input_promo) {

                        promo_k = 1 - (bc.basket_promo_discount / 100);

                        var discount_amount = (this.countSum() * (bc.basket_promo_discount / 100));

                        discount_amount = discount_amount.toFixed(2) * 1;
                        discount = '<span class="promo">Код принят! Скидка составляет: ' + discount_amount + '</span><br />';

                        $('#basket_make_order input[name="promo_code"]').val(input_promo);


                    }





                }


                var amount = ((this.countSum() * promo_k) + delivery_amount);
                amount = amount.toFixed(2) * 1;
                $('#basket_form_itogo').html(discount + ' Итого: <span>' + amount + '</span>');
                $('#basket_make_order input[name="amount"]').val(amount);

            }

        },

        formEventListener: function () {
            var self = this;


            $('body').on('click', '#basket_form_close', function () {
                self.hideForm();
                $('body').removeClass('modal');
            })
            $('body').on('click', '#basket_left .remove', function () {
                var title = $(this).parent().children('.title').text();
                var price = $(this).parent().children('.price').text();
                var item = {title: title, price: price};
//                console.log(item);
                self.removeItem(item);
                self.renderForm();
                self.showForm();
                self.updateForm();

            })
            $('body').on('keyup', '#basket_left .quantity input', function (event) {
                this.value = this.value.replace(/\D/gi, '').replace(/^0+/, '');
                if (this.value == '') {
                    this.value = 0;
                }

                var title = $(this).parent().parent().children('.title').text();
                var price = $(this).parent().parent().children('.price').text();
                var quantity = $(this).val();
                var item = {title: title, price: price, quantity: quantity};
                var sum = price * parseInt(quantity);
                sum = sum.toFixed(2) * 1;
                $(this).parent().parent().children('.itogo').text(sum);
                self.updateItem(item);
                $('#basket_make_order textarea[name="order"]').text(JSON.stringify(self.getData()))

                $('#basket_form_itogo').html('Итого: <span>' + self.countSum() + '</span>');
                $('#basket_make_order input[name="amount"]').val(self.countSum());





                self.updateForm();


            })
            $('body').on('keyup', '#promo_code', function (event) {
                self.updateForm();
            })


            $('body').on('click', '#basket_continue', function (event) {
                self.hideForm();
            })


        },
        renderThanks: function () {
            $('#basket_bg_thanks').remove();
            $('body').append('<div id="basket_bg_thanks">\n\
                    <div id="basket_thanks_inner">\n\
						<div class="basket_thanks_close">X</div>\n\
                            <div class="basket_thanks_title">Спасибо за покупку!</div>\n\
                            <div class="basket_thanks_text">Заявка отправлена. Свяжемся с Вами в ближайшее время.</div>\n\
                    </div>\n\
                </div>');


        },
        renderForm: function () {
            var self = this;

            $('#basket_form_bg').remove();
            $('body').append('<div id="basket_form_bg" style="display:none">\n\
                    <div id="basket_form_inner">\n\
                        <div id="basket_form_close">X</div>\n\
                        <div id="basket_left"></div>\n\
                        <div id="basket_right"></div>\n\
                        <div class="clear"></div>\n\
                    </div>\n\
                </div>');
            var basket = this.getData();
            $('#basket_left').append('<div class="item caption">\n\
                        <div class="image">Фото</div>\n\
                        <div class="title">Название</div>\n\
                        <div class="quantity">Количество</div>\n\
                        <div class="price">Цена, за ед.</div>\n\
                        <div class="itogo">Цена</div>\n\
                        <div class="clear"></div>\n\
                    </div>');
            $.each(basket, function (i, el) {

                var image = '';
                if (el.image != '') {
                    image = '<img src="' + el.image + '" />';
                }

                var sum = el.price * el.quantity;
                sum = sum.toFixed(2) * 1;

                $('#basket_left').append('<div class="item" data-id="' + i + '">\n\
                            <div class="image">' + image + '</div>\n\
                            <div class="title">' + el.title + '</div>\n\
                            <div class="quantity"><input type="numper" value="' + el.quantity + '" /></div>\n\
                            <div class="price">' + el.price + '</div>\n\
                            <div class="itogo">' + sum + '</div>\n\
                            <div class="remove"><i class="fa fa-trash"></i></div>\n\
                            <div class="clear"></div>\n\
                        </div>');
            })

            if (window.tobiz.basket_conf !== null && typeof (window.tobiz.basket_conf) !== 'undefined' && typeof (window.tobiz.basket_conf.basket_extra) !== 'undefined') {


                // корзинка с настройками
                var bc = window.tobiz.basket_conf;

                // Промокод:  #basket_promo

                if (typeof (bc.basket_promo) !== 'undefined') {
                    $('#basket_left').append('<div id="basket_promo">Есть промо-код? <input type="text" name="promo_code" id="promo_code" /> </div>');
                }
                // Доставка:  #basket_delivery

                if (typeof (bc.basket_free_delivery) !== 'undefined') {

                    var free_delivery_from = bc.basket_free_delivery_from;
                    free_delivery_from = parseFloat(free_delivery_from);
                    free_delivery_from = free_delivery_from.toFixed(2) * 1;



                    if (this.countSum() > free_delivery_from) {
                        $('#basket_left').append('<div id="basket_delivery">Доставка бесплатная</div>');
                    } else {

                        var devivery_price = parseFloat(bc.basket_delivery_price);
                        devivery_price = devivery_price.toFixed(2) * 1;

                        $('#basket_left').append('<div id="basket_delivery">Стоимость доставки: ' + devivery_price + '\
                                <div>Бесплатная доставка при заказе от ' + bc.basket_free_delivery_from + '</div>\n\
                            </div>');
                    }
                }


                $('#basket_left').append('<div id="basket_form_itogo">Итого: <span>' + this.countSum() + '</span></div>');




                $('#basket_right').append('<div id="basket_title">' + bc.basket_title + '</div>');

                $('#basket_right').append('<div id="basket_make_order"><form action="handler.php" enctype="multipart/form-data" method="post">\n\
                            <input type="hidden" name="action" value="basket" />\n\
                            <input type="hidden" name="promo_code" value="" />\n\
                            <input type="hidden" name="delivery" value="" />\n\
                            <input type="hidden" name="amount" value="' + self.countSum() + '" />\n\
                            <div><textarea name="order" style="display:none">' + JSON.stringify(self.getData()) + '</textarea></div>\n\
                        </form></div>');


                if (typeof (window.tobiz.basket_conf.basket_name) !== 'undefined') {
                    $('#basket_right form').append('<div><input type="text" name="user_name"  required="required" placeholder="Введите Имя" /></div>');

                }
                if (typeof (window.tobiz.basket_conf.basket_redirect) !== 'undefined') {
                    $('#basket_right form').append('<input type="hidden" name="redirect" value="' + window.tobiz.basket_conf.basket_redirect_link + '"  />');

                }


                var phone_mask = '';
                if (typeof (window.tobiz.basket_conf.basket_mask) !== 'undefined' && typeof (window.tobiz.basket_conf.basket_mask_format) !== 'undefined') {
                    phone_mask = window.tobiz.basket_conf.basket_mask_format;
                }

                $('#basket_right form').append('<div><input type="text" data-mask="' + phone_mask + '" name="tel"  required="required" placeholder="Ваш контактный телефон" /></div>');

                if (!(typeof (window.tobiz.basket_conf.hide_email) !== 'undefined')) {
                    $('#basket_right form').append('<!--<div><input type="text" name="email" required="required" placeholder="Введите E-mail" /></div>-->');
                }


                if (typeof (window.tobiz.basket_conf.basket_fio) !== 'undefined') {
                    $('#basket_right form').append('<div><input type="text" name="fio"  required="required" placeholder="ФИО заказчика" /></div>');

                }
                if (typeof (window.tobiz.basket_conf.basket_pasport) !== 'undefined') {
                    $('#basket_right form').append('<div><input type="text" name="passport"  required="required" placeholder="Введите паспортные данные" /></div>');

                }


                if (typeof (window.tobiz.basket_conf.basket_address) !== 'undefined') {
                    $('#basket_right form').append('<div><textarea type="text" name="address"  required="required" placeholder="Адрес доставки"></textarea></div>');
                }

                if (typeof (window.tobiz.basket_conf.basket_comment) !== 'undefined') {
                    $('#basket_right form').append('<div><textarea name="comment" placeholder="Комментарий" ></textarea></div>');
                }



                $('#basket_right form').append('<div><input style=" background-color:' + bc.basket_btn_color + '" type="submit" value="Оформить заказ" /></div>');
                

                if (typeof (window.tobiz.basket_conf.basket_continue_shopping) !== 'undefined') {
                      $('#basket_make_order form').append('<div id="basket_continue">Продолжить покупки</div>');
                }
                
                $('#basket_right').append('<div id="basket_descr">' + bc.basket_descr + '</div>');


            } else {
                // стандартная корзинка
                $('#basket_left').append('<div id="basket_form_itogo">Итого: <span>' + this.countSum() + '</span></div>');
                $('#basket_right').append('<div id="basket_title">Оформить заказ</div>');
                $('#basket_right').append('<div id="basket_make_order"><form action="handler.php" enctype="multipart/form-data" method="post">\n\
                                <input type="hidden" name="action" value="basket" />\n\
                                <input type="hidden" name="amount" value="' + self.countSum() + '" />\n\
                                <!--<div><input type="text" name="email" required="required" placeholder="Введите E-mail" /></div>-->\n\
                                <div><input type="text" name="tel"  required="required" placeholder="Введите телефон" /></div>\n\
                                <div><textarea name="comment" placeholder="Адрес доставки (комментарий)" ></textarea></div>\n\
                                <div><textarea name="order" style="display:none">' + JSON.stringify(self.getData()) + '</textarea></div>\n\
                                <div><input type="submit" value="Оформить заказ" /></div>\n\
                            </form></div>');
                $('#basket_make_order form').append('<div id="basket_continue">Продолжить покупки</div>');


            }
            this.init();
            this.updateForm();
        },
        hideForm: function () {
            $('#basket_form_bg').hide();
            this.renderBtn();
            this.showBtn()
        },
        showForm: function () {
            $('#basket_form_bg').show();
            this.hideBtn()
        },

        sendForm: function () {




        },
        init: function () {

            if (!this.status) {
                this.status = 1;
                this.formEventListener();
                this.btnEventListener();

            }
        }





    }


    if (window.basket.countItems() > 0 && window.tobiz.t >= 3) {
        window.basket.renderForm();
        window.basket.renderBtn();
        window.basket.showBtn();
        window.basket.init();


    }



    $('div.btn1, div.btn2, div.btn3, div.btn4,  div.btn5, div.btn6').click(function () {
        var this_section = $(this).closest('.section');
        var this_button = this;

        if ($(this).hasClass('add_basket') && window.tobiz.t >= 3) {

            // добавление в корзину
            var title = $(this).parent().find('.title1, .title2, .title3, .title4, .title5').text();

            var price = $(this).parent().find('.price1, .price2, .price3, .price4, .price5').text();



            if (this_section.hasClass('section125') || this_section.hasClass('section126') || this_section.hasClass('section1130') || this_section.hasClass('section129')) {
                var image = $(this).parent().parent().find('.image1 img, .image2 img, .image3 img, .image4 img, .image5 img, .left img').attr('src');


            } else {
                var image = $(this).parent().find('.image1 img, .image2 img, .image3 img, .image4 img, .image5 img').attr('src');

            }

            if (this_section.hasClass('section1130')) {
//                $('.extra_info_block_wrapper').hide();
                $('body').removeClass('modal');
                title = $(this).parent().siblings('.title1, .title2, .title3, .title4, .title5').text();
                price = $(this).parent().siblings('.price1, .price2, .price3, .price4, .price5').text();
                if ($(this).parent().hasClass('right')) {
                    title = $(this).siblings('.title1').text();
                    price = $(this).siblings('.price1').text();
                }
            }

            var clear_price = price.replace(/[^-,.0-9]/gim, '');
            clear_price = clear_price.replace(',', '.');
            clear_price = parseFloat(clear_price);
            clear_price = clear_price.toFixed(2) * 1;

            console.log(clear_price);


            price = parseInt(price.replace(/\D+/g, ''));
            price = clear_price;

            if (!image) {
                image = '';
            } else {
                var t_arr = image.split('/');
                image = '/img/100x100/' + t_arr[t_arr.length - 1];
            }


            var item = {
                title: title,
                price: price,
                image: image,
                quantity: 1
            }

            window.basket.addItem(item);
            //console.log(window.basket.getData());

            window.basket.renderForm();

            if (!(window.tobiz.basket_conf !== null && typeof (window.tobiz.basket_conf) !== 'undefined' && typeof (window.tobiz.basket_conf.do_not_show_when_add) !== 'undefined')) {
                window.basket.showForm();
            }


            $('#basket_make_order input[name="tel"]').each(function () {
                var data_mask = $(this).data('mask');
                $(this).mask(data_mask);
            })


        } else if ($(this).hasClass('open_card')) {
            $(this).closest('.arr1').find('.extra_info_block_wrapper').show();
            $(this).addClass('open_card_was');
            $(this).removeClass('open_card');


        } else {
            // стандартное действие
            if (this_section.find('.arr1').size()) {
                if (this_section.hasClass('section312')) {
                    $(this).closest('.arr1').find('.popup_form').show().animate({'opacity': '1'}, 300);
                } else if (this_section.hasClass('section318') || this_section.hasClass('section319')) {

                    $(this_button).parent().find('.popup_form').show().animate({'opacity': '1'}, 300);

                } else {

                    if (this_section.hasClass('section126')) {
                        if ($(this_button).hasClass('btn1')) {
//                            console.log('show_form1')
                            $(this).parent().find('.popup_form').eq(0).show().animate({'opacity': '1'}, 300);
                        }
                        if ($(this_button).hasClass('btn2')) {
//                            console.log('show_form2')
                            $(this).parent().find('.popup_form').eq(1).show().animate({'opacity': '1'}, 300);
                        }

                    } else if (this_section.hasClass('section155')) {
                        if ($(this_button).hasClass('btn1')) {
//                            console.log('show_form1')
                            $(this).parent().find('.popup_form').eq(0).show().animate({'opacity': '1'}, 300);
                        }
                        if ($(this_button).hasClass('btn2')) {
//                            console.log('show_form2')
                            $(this).parent().find('.popup_form').eq(1).show().animate({'opacity': '1'}, 300);
                        }


                    } else if (this_section.hasClass('section1127')) {
                        if ($(this_button).hasClass('btn1')) {
//                            console.log('show_form1')
                            $(this).parent().find('.popup_form').eq(0).show().animate({'opacity': '1'}, 300);
                        }
                        if ($(this_button).hasClass('btn2')) {
//                            console.log('show_form2')
                            $(this).parent().find('.popup_form').eq(1).show().animate({'opacity': '1'}, 300);
                        }


                    } else if (this_section.hasClass('section1250')) {
                        if ($(this_button).hasClass('btn1')) {
//                            console.log('show_form1')
                            $(this).parent().find('.popup_form').eq(0).show().animate({'opacity': '1'}, 300);
                        }
                        if ($(this_button).hasClass('btn2')) {
//                            console.log('show_form2')
                            $(this).parent().find('.popup_form').eq(1).show().animate({'opacity': '1'}, 300);
                        }

                    } else if (this_section.hasClass('section129')) {
                        if ($(this_button).hasClass('btn1')) {
                            $(this).parent().find('.popup_form').eq(0).show().animate({'opacity': '1'}, 300);
                        }
                        if ($(this_button).hasClass('btn2')) {
                            $(this).parent().find('.popup_form').eq(1).show().animate({'opacity': '1'}, 300);
                        }
                    } else if (this_section.hasClass('section1130')) {
                        if ($(this_button).hasClass('btn1')) {
                            $(this).parent().siblings('.popup_form').eq(0).show().animate({'opacity': '1'}, 300);
                        }
                        if ($(this_button).hasClass('btn2')) {
                            $(this).parent().siblings('.popup_form').eq(1).show().animate({'opacity': '1'}, 300);
                        }

                    } else {
                        $(this).parent().find('.popup_form').show().animate({'opacity': '1'}, 300);
                    }

                }

                //this_section.find('.arr1').find('.popup_form').show();
            } else {
                this_section.find('.popup_form').show().animate({'opacity': '1'}, 300);
            }
        }

    })
    $('.section1130 .btn3').click(function () {
		for (i = 0; i <= 5; i++) {
		if ($(this).parent().children('.extra_info' + i).size()) {
                var btn  = $(this).closest('.arr1').find('.btn' + i).eq(0);
                if(btn.attr('href') != undefined){
                    window.location.href=btn.attr('href');
                }else if(!$(this).hasClass('add_basket')){
                    btn.click();
                }
                
            }
         }
	})
	
    $('.btn1x, .btn2x, .btn3x, .btn4x, .btn5x').click(function () {
        for (i = 0; i <= 5; i++) {
            if ($(this).parent().children('.extra_info' + i).size()) {
                var btn  = $(this).closest('.arr1').find('.btn' + i).eq(0);
                if(btn.attr('href') != undefined){
                    window.location.href=btn.attr('href');
                }else{
                    btn.click();
                }
            }
        }
        
        $('.extra_info_block_wrapper').hide();

    })


    $('.btn1, .btn2, .btn3, .btn4,  .btn5, .btn6, .submit_btn, .btn1x, .btn2x, .btn3x, .btn4x,  .btn5x').hover(function () {
        if ($(this).hasClass('surround')) {
			
		
            var this_hover = $(this).data('hcolor');
            var parent = $(this).closest('.section');
            var bg_color = parent.data('hcolor');
            var color = $(this).css('background-color');
            $(this).attr('data-color', color);
            var color2 = '#ffffff';
//				
			if ($(this).parent().parent('.extra_info_block').size()) {
				bg_color = $(this).parents('.arr1').find('.btn1').data('hcolor');
			}
            if (color == 'rgb(255, 255, 255)') {
                color2 = '#3D3D3D';
            }
            if (bg_color == '#ffffff') {
                color2 = '#ffffff';
                bg_color = '#ff6600';
            }
            if (this_hover != undefined) {
                $(this).css({
                    backgroundColor: this_hover
                })
            } else {
                $(this).css({
                    backgroundColor: bg_color
                })
            }
            $(this).css({
                color: color2,
                borderColor: 'transparent',
            })
        } else if ($(this).hasClass('brd_animation')) {

            var color = $(this).css('color');
            $(this).attr('data-color', color);
            $(this).css({
                backgroundColor: 'transparent',
                color: color,
            })
 
        } else {
		
            // не объемный кнопке
            var parent = $(this).closest('.section');
            var bg_color = parent.data('hcolor');
            var color = $(this).css('color');
            $(this).attr('data-color', color);
            var color2 = '#fff';
            var this_hover = $(this).data('hcolor');
				
			if ($(this).parent().parent('.extra_info_block').size()) {
				bg_color = $(this).parents('.arr1').find('.btn1').data('hcolor');
				this_hover = $(this).parents('.arr1').find('.btn1').data('hcolor');
			}
            if (this_hover !== undefined || this_hover !== 'undefined') {
                color2 = this_hover;
            } else {
                color2 = bg_color;
            }
            color = ' transparent'

            if (color == 'rgb(255, 255, 255)') {
//                color2 = '#ff6600';
                color = ' transparent'
            }



            $(this).css({
                backgroundColor: color,
                color: color2,
            })

        }
        $(this).addClass('hover');
    }, function () {

        if ($(this).hasClass('surround')) {

            // обЪемный кнопке
            var color = $(this).data('color');
            $(this).css({
                backgroundColor: color,
                color: '#fff',
//                borderColor: 'transparent',
            })

            if ($(this).css('background-color') == 'rgb(255, 255, 255)') {
//                $(this).css({color: '#3D3D3D'})
                $(this).css({backgroundColor: '#ffffff'})
            }


        } else {
            //$(this).attr('date-color', $(this).css('color'));
            var color = $(this).data('color');
            $(this).css({
                color: color,
                backgroundColor: 'transparent'
            })
        }

        $(this).removeAttr('date-color');
        $(this).removeClass('hover');
    })







    setInterval(function () {
        if ($('.objtimer').size()) {
            $('.objtimer').each(function () {

                var type = $(this).data('type'),
                        dd = $(this).data('dd'),
                        dm = $(this).data('dm'),
                        dy = $(this).data('dy'),
                        monthly = $(this).data('monthly'),
                        weekly = $(this).data('weekly'),
                        hr = $(this).data('hr'),
                        min = $(this).data('min'),
                        date_now = new Date();

                if (type == 'date') {
                    var date_next = new Date(dy, dm - 1, dd, hr, min, 0, 0);
                }
                if (type == 'monthly') {
                    var date_next = new Date(date_now.getFullYear(), date_now.getMonth(), dd, hr, min, 0, 0);
                    if (date_now > date_next) {
                        date_next = new Date(date_now.getFullYear(), date_now.getMonth() + 1, dd, hr, min, 0, 0);
                    }
                }
                if (type == 'weekly') {

                    var date_next = new Date(date_now.getFullYear(), date_now.getMonth(), date_now.getDate(), hr, min, 0, 0);
                    date_next.setDate(date_now.getDate() + (weekly + 7 - date_now.getDay()) % 7);

                }
                if (type == 'daily') {
                    var date_next = new Date(date_now.getFullYear(), date_now.getMonth(), date_now.getDate(), hr, min, 0, 0);
                    if (date_now > date_next) {
                        date_next = new Date(date_now.getFullYear(), date_now.getMonth(), date_now.getDate() + 1, hr, min, 0, 0);
                    }
                }





                if (date_now > date_next) {
                    if (window.tobiz.editor) {
                        $(this).children('.days').text('00');
                        $(this).children('.hrs').text('00');
                        $(this).children('.min').text('00');
                        $(this).children('.sec').text('00');
                    } else {
                        $(this).closest('.section').addClass('invis');

                    }


                } else {
                    var totalSec = parseInt((date_next.getTime() - date_now.getTime()) / 1000),
                            tdays = Math.floor(totalSec / (24 * 3600)),
                            thrs = Math.floor((totalSec - tdays * 24 * 3600) / (3600)),
                            tmin = Math.floor((totalSec - tdays * 24 * 3600 - thrs * 3600) / (3600 / 60)),
                            tsec = Math.floor((totalSec - tdays * 24 * 3600 - thrs * 3600 - tmin * (3600 / 60)) / (3600 / (60 * 60)));

                    if (tdays < 10)
                        tdays = "0" + tdays;
                    if (thrs < 10)
                        thrs = "0" + thrs;
                    if (tmin < 10)
                        tmin = "0" + tmin;
                    if (tsec < 10)
                        tsec = "0" + tsec;


//							console.log('tdays:'+tdays);
//							console.log('thrs:'+thrs);
//							console.log('tmin:'+tmin);
//							console.log('tsec:'+tsec);

                }

                $(this).children('.days').text(tdays);
                $(this).children('.hrs').text(thrs);
                $(this).children('.min').text(tmin);
                $(this).children('.sec').text(tsec);

                //$(this).html('Осталось '+ tdays +' дней,  '+ thrs+ ' часов, '+ tmin+ ' минут, '+tsec);






            })


        }
    }, 1000)


    setInterval(function () {
        if ($('.objtimer_new').size()) {
            $('.objtimer_new').each(function () {

                var type = $(this).data('type'),
                        dd = $(this).data('dd'),
                        dm = $(this).data('dm'),
                        dy = $(this).data('dy'),
                        monthly = $(this).data('monthly'),
                        weekly = $(this).data('weekly'),
                        hr = $(this).data('hr'),
                        min = $(this).data('min'),
                        date_now = new Date();

                if (type == 'date') {
                    var date_next = new Date(dy, dm - 1, dd, hr, min, 0, 0);
                }
                if (type == 'monthly') {
                    var date_next = new Date(date_now.getFullYear(), date_now.getMonth(), dd, hr, min, 0, 0);
                    if (date_now > date_next) {
                        date_next = new Date(date_now.getFullYear(), date_now.getMonth() + 1, dd, hr, min, 0, 0);
                    }
                }
                if (type == 'weekly') {

                    var date_next = new Date(date_now.getFullYear(), date_now.getMonth(), date_now.getDate(), hr, min, 0, 0);
                    date_next.setDate(date_now.getDate() + (weekly + 7 - date_now.getDay()) % 7);

                }
                if (type == 'daily') {
                    var date_next = new Date(date_now.getFullYear(), date_now.getMonth(), date_now.getDate(), hr, min, 0, 0);
                    if (date_now > date_next) {
                        date_next = new Date(date_now.getFullYear(), date_now.getMonth(), date_now.getDate() + 1, hr, min, 0, 0);
                    }
                }





                if (date_now > date_next) {
                    if (window.tobiz.editor) {
                        $(this).children().children('.days').text('00');
                        $(this).children().children('.hrs').text('00');
                        $(this).children().children('.min').text('00');
                        $(this).children().children('.sec').text('00');
                    } else {
                        $(this).closest('.section').addClass('invis');

                    }


                } else {
                    var totalSec = parseInt((date_next.getTime() - date_now.getTime()) / 1000),
                            tdays = Math.floor(totalSec / (24 * 3600)),
                            tdays_svg = tdays * 14,
//                            tdays_svg = Math.floor(totalSec / (24 * 3600)),
                            thrs = Math.floor((totalSec - tdays * 24 * 3600) / (3600)),
                            thrs_svg = thrs * 17.5,
                            tmin = Math.floor((totalSec - tdays * 24 * 3600 - thrs * 3600) / (3600 / 60)),
                            tmin_svg = (tmin * 7),
                            tsec = Math.floor((totalSec - tdays * 24 * 3600 - thrs * 3600 - tmin * (3600 / 60)) / (3600 / (60 * 60))),
                            tsec_svg = (tsec * 7);

                    if (tdays < 10)
                        tdays = "0" + tdays;
                    if (tdays > 30)
                        tdays_svg = 420;
                    if (thrs < 10)
                        thrs = "0" + thrs;
                    if (tmin < 10)
                        tmin = "0" + tmin;
                    if (tsec < 10)
                        tsec = "0" + tsec;


//							console.log('tdays:'+tdays);
//							console.log('thrs:'+thrs);
//							console.log('tmin:'+tmin);
//							console.log('tsec:'+tsec);

                }

                $(this).children().children('.days').text(tdays);
                $(this).children('.day_block').children().children('.outer').css({'stroke-dashoffset': 421 - tdays_svg});
                $(this).children().children('.hrs').text(thrs);
                $(this).children('.hour_block').children().children('.outer').css({'stroke-dashoffset': 421 - thrs_svg});
                $(this).children().children('.min').text(tmin);
                $(this).children('.min_block').children().children('.outer').css({'stroke-dashoffset': 421 - tmin_svg});
                $(this).children().children('.sec').text(tsec);
                $(this).children('.sec_block').children().children('.outer').css({'stroke-dashoffset': 421 - tsec_svg});

                //$(this).html('Осталось '+ tdays +' дней,  '+ thrs+ ' часов, '+ tmin+ ' минут, '+tsec);






            })


        }
    }, 1000)

    /*setInterval(function () {
        if ($('[data-map-obj]').size()) {
            $('[data-map-obj]').each(function (index) {
                var points = JSON.parse(_.unescape($(this).attr('data-map-obj')));
                var center = JSON.parse(_.unescape($(this).attr('data-map-center')));
                var scroll_off = parseInt($(this).attr('data-scroll_off'));
                $(this).removeAttr('data-map-obj');
                $(this).removeAttr('data-map-center');
                $(this).removeAttr('data-scroll_off');
                var this_element = $(this).children('.map_inner')[0];


                ymaps.ready(function () {


                    var map;
                    map = new ymaps.Map(this_element, center);
                    center.controls = ["zoomControl"];

                    if (scroll_off) {
                        map.behaviors.disable('scrollZoom');
                    }


                    _.each(points, function (i, num) {

                        if (_.isArray(i.coordinates)) {

                            var myPlacemark = new ymaps.Placemark(i.coordinates, {}, {
                                preset: 'islands#icon',
                                iconColor: i.color
                            });
                            map.geoObjects.add(myPlacemark);



                        }
//						else{
//							var myGeocoder = ymaps.geocode(i.address);
//							myGeocoder.then(
//									function (res) {
//										var myPlacemark = new ymaps.Placemark(res.geoObjects.get(0).geometry.getCoordinates(), {}, {
//											preset: 'islands#icon',
//											iconColor: i.color
//										});
//										map.geoObjects.add(myPlacemark);
//									},
//									function (err) {
//										//console.log('Ошибка');
//									}
//							);
//                        }




                    })

                })



            })
        }
    }, 200)*/


    setInterval(function () {
        if ($('.fixed_top').size()) {
            var count = $('.fixed_top').size();
            var height = 0;
            var top = 0;
            var index = 100 + count;
            $('.fixed_top').each(function () {
                height += $(this).outerHeight();
                $(this).css({top: top + 'px'});
                $(this).css({zIndex: index});
                top += $(this).outerHeight();
                index--;
            })
            $('#wrapper').css({paddingTop: height + 'px'});
        } else {
            $('#wrapper').css({paddingTop: 0 + 'px'});
        }
    }, 200)



    $(window).scroll(function () {
        $('.fixed_top').css({'left': '-' + $(window).scrollLeft() + 'px'});
    })


    if (window.location.search == '?rk_pay=success') {
        alert('Оплата успешно завершена!');
        window.location.search = '';
    }
    if (window.location.search == '?rk_pay=fail') {
        alert('Оплата не завершена!');
        window.location.search = '';
    }





    $('.section302 .left.style2 ul li a, .section302 .left.style4 ul li a').hover(function () {
        $(this).parent().addClass('hover');
    }, function () {
        $(this).parent().removeClass('hover');
    })


    $('body').on('click', '.section304 .spoiler_toggle', function () {
        if ($(this).parent().hasClass('close')) {
            $(this).text('-')
        }
        if ($(this).parent().hasClass('open')) {
            $(this).text('+')
        }
        $(this).parent().toggleClass('open');
        $(this).parent().toggleClass('close');
    })
    $('body').on('click', '.section305 .spoiler_toggle', function () {
        if ($(this).parent().hasClass('close')) {
            $(this).text('-')
        }
        if ($(this).parent().hasClass('open')) {
            $(this).text('+')
        }
        $(this).parent().toggleClass('open');
        $(this).parent().toggleClass('close');

    })
    $('body').on('click', '.section304 .spoiler_title', function () {
        if (typeof (window.tobiz.editor) === 'undefined') {


            $(this).parent().toggleClass('open');
            $(this).parent().toggleClass('close');
        }
    })
    $('body').on('click', '.section305 .spoiler_title', function () {
        if (typeof (window.tobiz.editor) === 'undefined') {





            $(this).parent().toggleClass('open');
            $(this).parent().toggleClass('close');
        }
    })

    if ($('.section304 .spoiler').size() && typeof (window.tobiz.editor) === 'undefined') {
        $('.section304 .spoiler').each(function () {
            $(this).removeClass('open');
            $(this).addClass('close');
        })
    }
    if ($('.section305 .spoiler').size() && typeof (window.tobiz.editor) === 'undefined') {
        $('.section305 .spoiler').each(function () {
            $(this).removeClass('open');
            $(this).addClass('close');
        })
    }




    if ($('.extra_info_block .extra_image').size() && typeof (window.tobiz.editor) === 'undefined') {
        $('.extra_info_block .extra_image').click(function (e) {
            var way = $(this).children('img').attr('src');
//            console.log(way);
            var t_arr = way.split('/');
            var new_image_url = '/img/320x320/' + t_arr[3];

            $(this).parent().parent().children('img').attr('src', new_image_url);

        })
    }
    if ($('.extra_info_block.s300 .extra_image').size() && typeof (window.tobiz.editor) === 'undefined') {
        $('.extra_info_block.s300 .extra_image').click(function (e) {
            var way = $(this).children('img').attr('src');
//            console.log(way);
            var t_arr = way.split('/');
            var new_image_url = '/img/320x464/' + t_arr[3];

            $(this).parent().parent().children('img').attr('src', new_image_url);

        })
    }
    if ($('.extra_info_block.s150 .extra_image').size() && typeof (window.tobiz.editor) === 'undefined') {
        $('.extra_info_block.s150 .extra_image').click(function (e) {
            var way = $(this).children('img').attr('src');
            var t_arr = way.split('/');
            var new_image_url = '/img/320x220/' + t_arr[3];
            $(this).parent().parent().children('img').attr('src', new_image_url);

        })
    }

    if ($('.extra_images_big .extra_info_block.s200 .extra_image').size() && typeof (window.tobiz.editor) === 'undefined') {
        $('.extra_images_big .extra_info_block.s200 .extra_image').click(function (e) {
            var way = $(this).children('img').attr('src');
            var t_arr = way.split('/');
            var new_image_url = '/img/600x600/' + t_arr[3];
            $(this).parent().parent().children('img').attr('src', new_image_url);
        })
    }

    if ($('.extra_images_big .extra_info_block.s300 .extra_image').size() && typeof (window.tobiz.editor) === 'undefined') {
        $('.extra_images_big .extra_info_block.s300 .extra_image').click(function (e) {
            var way = $(this).children('img').attr('src');
            var t_arr = way.split('/');
            var new_image_url = '/img/400x560/' + t_arr[3];
            $(this).parent().parent().children('img').attr('src', new_image_url);
        })
    }

    if ($('.extra_images_big .extra_info_block.s150 .extra_image').size() && typeof (window.tobiz.editor) === 'undefined') {
        $('.extra_images_big .extra_info_block.s150 .extra_image').click(function (e) {
            var way = $(this).children('img').attr('src');
            var t_arr = way.split('/');
            var new_image_url = '/img/800x600/' + t_arr[3];
            $(this).parent().parent().children('img').attr('src', new_image_url);

        })
    }

    $('body').on('mouseenter mouseleave', '.section302 li.level0', function (e) {

        if (window.tobiz.editor) {
            return true;
        }

        var self = this;
        if (e.type == 'mouseenter') {


            $(this).parent().find('li.level1.visible').hide().removeClass('visible');

            var stop = false;
            var offset = $(self).position();
            var left = offset.left + $(self).outerWidth();
            var top = offset.top;
            var h = $(self).outerHeight();
            var color = $(this).closest('.section').css('background');
            var w = 0;

//                    $(self).nextAll('li').each(function(i,el){
//                        if(!stop){
//
//
//                            if($(el).hasClass('level1')){
//                                if($(el).width()>w){
//                                    w = $(el).width();
//                                }
//                            }else{
//                                stop = true;
//                            }
//                        }
//                    })
//                    var stop  = false;

            w = 250;
            $(self).nextAll('li').each(function (i, el) {
                if (!stop) {
                    if ($(el).hasClass('level1')) {

                        h = $(el).outerHeight();
                        $(el).show().addClass('visible').css({top: top, left: left, width: w, textAlign: 'left'}).hover(function () {
                            //$(this).css({ backgroundColor:'#ccc'})


                        })
                        top += h - 1;
                    } else {
                        stop = true;
                    }
                }
            })
        }
    })
    $('body').on('mouseenter mouseleave', '.section302 .menu1', function (e) {
        if (window.tobiz.editor) {
            return true;
        }

        if (e.type == 'mouseleave') {
            $(this).find('li.level1.visible').hide().removeClass('visible');
        }
    })
//
//	$('body').on('click', '.hide_second_li li.level0 a', function(event){
//		if($(window).width()<800){
//			if($(this).parent().next('li').hasClass('level1')){
//				event.preventDefault();
//			}
//		}
//
//	})
//	$('body').on('click', 'li.level0 a', function(event){
//		if($(window).width()<960){
//			if(!$(this).parent().next('li').hasClass('level1')){
//					$(this).closest('.menu1').hide();
//			}
//		};
//	})

    $('body').on('click', 'li.level1 a', function (event) {
        if (!$(this).closest('.section311')) {
            $(this).closest('.menu1').hide();
        }
    })

//    $('body').on('click', 'li.level0 a', function (event) {
//        if ($(this).parent().next('li').hasClass('level1')) {
//            if ($(window).width() < 1024) {
//                event.preventDefault();
//                event.stopPropagation();
//            }
//        }
//    })


    $('body').on('mouseenter mouseleave', '.section116 li.level0', function (e) {

        if (window.tobiz.editor) {
            return true;
        }

        var self = this;
        if (e.type == 'mouseenter') {

            $(this).parent().find('li.level1.visible').hide().removeClass('visible');

            var stop = false;
            var offset = $(self).position();
            var left = offset.left;
            var top = 10;
            var h = $(self).outerHeight();
            var color = $(this).closest('.section').css('backgroundColor');
            var w = 0;
//
//                    $(self).nextAll('li').each(function(i,el){
//                        if(!stop){
//
//
//                            if($(el).hasClass('level1')){
//                                if($(el).width()>w){
//                                    w = $(el).width();
//                                }
//                            }else{
//                                stop = true;
//                            }
//                        }
//                    })
//                    var stop  = false;

            w = 300;
            $(self).nextAll('li').each(function (i, el) {
                if (!stop) {
                    if ($(el).hasClass('level1')) {
                        top += $(el).outerHeight();
                        if ($(window).width() < 810) {
                            $(el).show().addClass('visible').css({top: top, left: left, background: color, width: w, textAlign: 'left', marginTop: offset.top});
                        } else {
                            $(el).show().addClass('visible').css({top: top, left: left, background: color, width: w, textAlign: 'left'})
                        }
                    } else {
                        stop = true;
                    }
                }
            })
        }
    })

    $('body').on('mouseenter mouseleave', '.section116 .menu1', function (e) {
        if (window.tobiz.editor) {
            return true;
        }

        if (e.type == 'mouseleave') {

            $(this).find('li.level1.visible').hide().removeClass('visible');
        }
    })



    $('body').on('mouseenter mouseleave', '.section2116 li.level0', function (e) {

        if (window.tobiz.editor) {
            return true;
        }

        var self = this;
        if (e.type == 'mouseenter') {

            $(this).parent().find('li.level1.visible').hide().removeClass('visible');

            var stop = false;
            var offset = $(self).position();
            var left = offset.left;
            var h = $(self).outerHeight();

            var top = offset.top + h - 5;
            var color = $(this).closest('.section').css('backgroundColor');
            var w = 0;
//
//                    $(self).nextAll('li').each(function(i,el){
//                        if(!stop){
//
//
//                            if($(el).hasClass('level1')){
//                                if($(el).width()>w){
//                                    w = $(el).width();
//                                }
//                            }else{
//                                stop = true;
//                            }
//                        }
//                    })
//                    var stop  = false;

            w = 300;
            $(self).nextAll('li').each(function (i, el) {
                if (!stop) {
                    if ($(el).hasClass('level1')) {
                        if (i != 0) {
                            top += $(el).outerHeight() - 1;
                        }
                        $(el).show().addClass('visible').css({top: top, left: left, background: color, width: w, textAlign: 'left'})

//						if($(window).width()<810){
//							$(el).show().addClass('visible').css({top: top, left: left, background: color, width: w, textAlign: 'left', marginTop: offset.top-10});
//						}
//						else{
//
//						}
                    } else {
                        stop = true;
                    }
                }
            })
        }
    })



    $('body').on('mouseenter mouseleave', '.section2116 .menu1', function (e) {
        if (window.tobiz.editor) {
            return true;
        }

        if (e.type == 'mouseleave') {

            $(this).find('li.level1.visible').hide().removeClass('visible');
        }
    })




    $('body').on('mouseenter mouseleave', '.section107   li.level0', function (e) {

        if (window.tobiz.editor) {
            return true;
        }

        var self = this;
        if (e.type == 'mouseenter') {


            $(this).parent().find('li.level1.visible').hide().removeClass('visible');

            var stop = false;
            var offset = $(self).position();
            var left = offset.left;
            var h = $(self).outerHeight();
            var top = offset.top;
            var color = $(this).closest('.section').css('backgroundColor');
            var w = 0;

//                    $(self).nextAll('li').each(function(i,el){
//                        if(!stop){
//
//
//                            if($(el).hasClass('level1')){
//                                if($(el).width()>w){
//                                    w = $(el).width();
//                                }
//                            }else{
//                                stop = true;
//                            }
//                        }
//                    })
//                    var stop  = false;

            w = 200;
            $(self).nextAll('li').each(function (i, el) {
                if (!stop) {

                    if ($(el).hasClass('level1')) {

                        top += $(el).outerHeight() - 1;
                        $(el).show().addClass('visible').css({top: top, left: left, background: color, width: w, textAlign: 'left', paddingLeft: '16px'})
                    } else {
                        stop = true;
                    }
                }
            })
        }
    })



    $('body').on('mouseenter mouseleave', '.section120 li.level0', function (e) {

        if (window.tobiz.editor) {
            return true;
        }

        var self = this;
        if (e.type == 'mouseenter') {

            $(this).parent().find('li.level1.visible').hide().removeClass('visible');

            var stop = false;
            var offset = $(self).position();
            var left = offset.left;
            var top = 0;
            var h = $(self).outerHeight();
            var color = $(this).closest('.section').css('backgroundColor');
            var w = 0;

//                    $(self).nextAll('li').each(function(i,el){
//                        if(!stop){
//
//
//                            if($(el).hasClass('level1')){
//                                if($(el).width()>w){
//                                    w = $(el).width();
//                                }
//                            }else{
//                                stop = true;
//                            }
//                        }
//                    })
//                    var stop  = false;

            w = 250;
            $(self).nextAll('li').each(function (i, el) {
                if (!stop) {
                    if ($(el).hasClass('level1')) {
                        top += $(el).outerHeight() - 1;
                        if ($(window).width() < 810) {
                            $(el).show().addClass('visible').css({top: top, left: left, background: color, width: w, textAlign: 'left', marginTop: offset.top});
                        } else {

                            $(el).show().addClass('visible').css({top: top, left: left, background: color, width: w, textAlign: 'left'})
                        }
                    } else {
                        stop = true;
                    }
                }
            })
        }
    })



    //////




    ////



    $('body').on('mouseenter mouseleave', '.section120 .menu1', function (e) {
        if (window.tobiz.editor) {
            return true;
        }

        if (e.type == 'mouseleave') {

            $(this).find('li.level1.visible').hide().removeClass('visible');
        }
    })

    $('body').on('mouseenter mouseleave', '.section107   li.level0', function (e) {

        if (window.tobiz.editor) {
            return true;
        }

        var self = this;
        if (e.type == 'mouseenter') {


            $(this).parent().find('li.level1.visible').hide().removeClass('visible');

            var stop = false;
            var offset = $(self).position();
            var left = offset.left;
            var h = $(self).outerHeight();
            var top = offset.top + 5;
            var color = $(this).closest('.section').css('backgroundColor');
            var w = 0;

//                    $(self).nextAll('li').each(function(i,el){
//                        if(!stop){
//
//
//                            if($(el).hasClass('level1')){
//                                if($(el).width()>w){
//                                    w = $(el).width();
//                                }
//                            }else{
//                                stop = true;
//                            }
//                        }
//                    })
//                    var stop  = false;

            w = 200;
            $(self).nextAll('li').each(function (i, el) {
                if (!stop) {
                    if ($(el).hasClass('level1')) {
                        top += $(el).outerHeight() - 1;
                        $(el).show().addClass('visible').css({top: top, left: left, background: color, width: w, textAlign: 'left', paddingLeft: '16px'})
                    } else {
                        stop = true;
                    }
                }
            })
        }
    })




    $('body').on('mouseenter mouseleave', '.section107 .menu1', function (e) {
        if (window.tobiz.editor) {
            return true;
        }
        if (e.type == 'mouseleave') {
            $(this).find('li.level1.visible').hide().removeClass('visible');
        }
    })


////

    $('body').on('mouseenter mouseleave', '.section109   li.level0', function (e) {

        if (window.tobiz.editor) {
            return true;
        }

        var self = this;
        if (e.type == 'mouseenter') {


            $(this).parent().find('li.level1.visible').hide().removeClass('visible');

            var stop = false;
            var offset = $(self).position();
            var left = offset.left;
            var h = $(self).outerHeight();
            var top = offset.top + 5;
            var color = $(this).closest('.section').css('backgroundColor');
            var w = 0;

            w = 200;
            $(self).nextAll('li').each(function (i, el) {
                if (!stop) {
                    if ($(el).hasClass('level1')) {
                        top += $(el).outerHeight() - 1;
                        $(el).show().addClass('visible').css({top: top, left: left, background: color, width: w, textAlign: 'left', paddingLeft: '5px'});

//						}
                    } else {
                        stop = true;
                    }
                }
            })
        }
    })
    $('body').on('mouseenter mouseleave', '.section109 .menu', function (e) {
        if (window.tobiz.editor) {
            return true;
        }
        if (e.type == 'mouseleave') {
            $(this).find('li.level1.visible').hide().removeClass('visible');
        }
    })




    $('body').on('mouseenter mouseleave', '.section105   li.level0', function (e) {

        if (window.tobiz.editor) {
            return true;
        }

        var self = this;
        if (e.type == 'mouseenter') {


            $(this).parent().find('li.level1.visible').hide().removeClass('visible');

            var stop = false;
            var offset = $(self).position();
            var left = offset.left;
            var h = $(self).outerHeight();
            var top = offset.top - 2;
            var color = $(this).closest('.section').css('backgroundColor');
            var w = 0;

//                    $(self).nextAll('li').each(function(i,el){
//                        if(!stop){
//
//
//                            if($(el).hasClass('level1')){
//                                if($(el).width()>w){
//                                    w = $(el).width();
//                                }
//                            }else{
//                                stop = true;
//                            }
//                        }
//                    })
//                    var stop  = false;

            w = 200;
            $(self).nextAll('li').each(function (i, el) {
                if (!stop) {
                    if ($(el).hasClass('level1')) {
                        top += $(el).outerHeight() - 1;
                        $(el).show().addClass('visible').css({top: top, left: left, background: color, width: w, textAlign: 'left', paddingLeft: '16px'})
                    } else {
                        stop = true;
                    }
                }
            })
        }
    })
    $('body').on('mouseenter mouseleave', '.section105 .menu1', function (e) {
        if (window.tobiz.editor) {
            return true;
        }
        if (e.type == 'mouseleave') {
            $(this).find('li.level1.visible').hide().removeClass('visible');
        }
    })

    $('body').on('mouseenter mouseleave', '.section311   li.level0', function (e) {

        if (window.tobiz.editor) {
            return true;
        }

        var self = this;
        if (e.type == 'mouseenter') {


            $(this).parent().find('li.level1.visible').hide().removeClass('visible');

            var stop = false;
            var offset = $(self).position();
            var left = offset.left;
            var h = $(self).outerHeight();
            var top = offset.top + 0;
            var color = 'rgba(0,0,0,0.5)';
            var w = 0;

//                    $(self).nextAll('li').each(function(i,el){
//                        if(!stop){
//
//
//                            if($(el).hasClass('level1')){
//                                if($(el).width()>w){
//                                    w = $(el).width();
//                                }
//                            }else{
//                                stop = true;
//                            }
//                        }
//                    })
//                    var stop  = false;

            w = 170;
            $(self).nextAll('li').each(function (i, el) {
                if (!stop) {
                    if ($(el).hasClass('level1')) {
                        top += $(el).outerHeight() - 1;
                        $(el).show().addClass('visible').css({top: top, left: left, background: color, width: w, textAlign: 'left', paddingLeft: '10px'})
                    } else {
                        stop = true;
                    }
                }
            })
        }
    })

    $('body').on('mouseenter mouseleave', '.section1156   li.level0', function (e) {

        if (window.tobiz.editor) {
            return true;
        }

        var self = this;
        if (e.type == 'mouseenter') {


            $(this).parent().find('li.level1.visible').hide().removeClass('visible');

            var stop = false;
            var offset = $(self).position();
            var left = offset.left;
            var h = $(self).outerHeight();
            var top = offset.top + 0;
            var color = 'rgba(50,50,50,1)';
            var w = 0;

//                    $(self).nextAll('li').each(function(i,el){
//                        if(!stop){
//
//
//                            if($(el).hasClass('level1')){
//                                if($(el).width()>w){
//                                    w = $(el).width();
//                                }
//                            }else{
//                                stop = true;
//                            }
//                        }
//                    })
//                    var stop  = false;

            w = 170;
            $(self).nextAll('li').each(function (i, el) {
                if (!stop) {
                    if ($(el).hasClass('level1')) {
                        top += $(el).outerHeight() - 1;
                        $(el).show().addClass('visible').css({top: top, left: left, background: color, width: w, textAlign: 'left', paddingLeft: '10px'})
                    } else {
                        stop = true;
                    }
                }
            })
        }
    })

    $('body').on('mouseenter mouseleave', '.section1116   li.level0', function (e) {

        if (window.tobiz.editor) {
            return true;
        }

        var self = this;
        if (e.type == 'mouseenter') {


            $(this).parent().find('li.level1.visible').hide().removeClass('visible');

            var stop = false;
            var offset = $(self).position();
            var left = offset.left;
            var h = $(self).outerHeight();
            var top = offset.top + 0;
            var color = 'rgba(0,0,0,0)';
            var w = 0;

//                    $(self).nextAll('li').each(function(i,el){
//                        if(!stop){
//
//
//                            if($(el).hasClass('level1')){
//                                if($(el).width()>w){
//                                    w = $(el).width();
//                                }
//                            }else{
//                                stop = true;
//                            }
//                        }
//                    })
//                    var stop  = false;

            w = 170;
            $(self).nextAll('li').each(function (i, el) {
                if (!stop) {
                    if ($(el).hasClass('level1')) {
                        top += $(el).outerHeight() - 1;
                        $(el).show().addClass('visible').css({background: color, width: w, textAlign: 'left', paddingLeft: '15px'})
                    } else {
                        stop = true;
                    }
                }
            })
        }
    })



    $('body').on('mouseenter mouseleave', '.section1117   li.level0', function (e) {

        if (window.tobiz.editor) {
            return true;
        }

        var self = this;
        if (e.type == 'mouseenter') {

            $(this).parent().find('li.level1.visible').addClass('visible');
            var stop = false;
            var offset = $(self).position();
            var left = offset.left;
            var h = $(self).outerHeight();
            var top = offset.top + 0;
            var color = 'rgba(0,0,0,0)';
            var w = 0;

            w = 170;
            $(self).nextAll('li').each(function (i, el) {
                if (!stop) {
                    if ($(el).hasClass('level1')) {
                        top += $(el).outerHeight() - 1;
                        $(el).show().addClass('visible').css({background: color, width: w, textAlign: 'left', paddingLeft: '20px'})
                    } else {
                        stop = true;
                    }
                }
            })
        }
    })


    $('body').on('mouseenter mouseleave', '.section1116 .menu1', function (e) {
        if (window.tobiz.editor) {
            return true;
        }
        if (e.type == 'mouseleave') {
            $(this).find('li.level1.visible').hide().removeClass('visible');
        }
    })
//
//    $('body').on('mouseenter mouseleave', '.section1117 .menu1', function (e) {
//        if (window.tobiz.editor) {
//            return true;
//        }
//        if (e.type == 'mouseleave') {
//            $(this).find('li.level1').hide().addClass('unvisible');
//        }
//    })


    $('body').on('mouseenter mouseleave', '.section311 .menu1', function (e) {
        if (window.tobiz.editor) {
            return true;
        }
        if (e.type == 'mouseleave') {
            $(this).find('li.level1.visible').hide().removeClass('visible');
        }
    })




    $('body').on('click', '.section126 .img_1, .section126 .img_2 , .section126 .img_3 , .section126 .img_4 ', function () {

        var image = $(this).children('img').data('image');
        $(this).parent().parent().find('.image1').children('img').attr('src', image);
    })
    $('body').on('click', '.section129 .img_1, .section129 .img_2 , .section129 .img_3 , .section129 .img_4 ', function () {

        var image = $(this).children('img').data('image');
        $(this).parent().parent().find('.image1').children('img').attr('src', image);
    })

    $('body').on('click', '.section310 .image_box', function () {
        var image = $(this).children('img').data('image');
        $(this).parent().parent().parent().parent().find('.viewport').css({
            backgroundImage: 'url(' + image + ')'
        });
    })

    function silder310(block, way) {
        var len = block.find('.image_box').size();

        var mr = block.find('.image_box').eq(0).css('marginRight');
        mr = mr.replace(/px/g, '') * 1;
        var w = block.find('.image_box').eq(0).width() + '';
        w = w.replace(/px/g, '') * 1;


        var width = len * w + (len - 1) * mr + mr;
        block.find('.image_wrapper').css({// обновляем ширину.
            width: width + 'px'
        });


        var max_left = block.find('.section_inner').width() + mr - width;
        var min_left = 0;




        var this_left = block.find('.image_wrapper').css('left');
        this_left = this_left.replace(/px/g, '') * 1;

        if (way == 'left') {
            this_left -= (mr + w);
            if (width <= (-this_left + block.find('.image_screen').width())) {
                this_left = 0;
            }

            if (this_left < (-1) * (len * w + (len - 1) * mr)) {
                return
            }

        }
        if (way == 'right') {
            this_left += (mr + w);
            console.log('r' + this_left);
            if (this_left > 0) {
                this_left = 0;
            }
        }




        block.find('.image_wrapper').css({
            left: this_left + 'px'

        });



    }





    $('body').on('click', '.section310 .iamges .go_left', function () {
        silder310($(this).closest('.section'), 'right');
    })

    $('body').on('click', '.section310 .iamges .go_right', function () {
        silder310($(this).closest('.section'), 'left');
    })



    function silder1155(block, way) {
        var len = block.find('.image_box').size();

        var ml = block.find('.image_box').eq(0).css('marginLeft');
        var mr = block.find('.image_box').eq(0).css('marginRight');
        mr = mr.replace(/px/g, '') * 1;
        ml = ml.replace(/px/g, '') * 1;
        var w = block.find('.image_box').eq(0).width() + '';
        w = w.replace(/px/g, '') * 1;
        var width = len * w + (len - 1) * mr + mr;
        block.find('.image_wrapper').css({// обновляем ширину.
            width: width + 'px'
        });
        var max_left = block.find('.section_inner').width() + mr - width;
        var min_left = 0;

        var this_left = block.find('.image_wrapper').css('left');
        this_left = this_left.replace(/px/g, '') * 1;
        var total_w = len * (mr + w);

        if ($(window).width() < 800) {
            if (way == 'left') {
                if (-(total_w - w) >= (this_left - 10)) {
                    this_left = 0;
                } else {
                    this_left -= (mr + w);
                }

            }
            if (way == 'right') {
                this_left += (mr + w);
                if (this_left > 0) {
                    this_left = 0;
                }

            }


        } else {
            if (way == 'left') {
                if (-(total_w) > (this_left - 1170) - w) {

                    this_left = 0;
                } else {
                    this_left -= (mr + w);
                }

            }
            if (way == 'right') {
                this_left += (mr + w);
                if (this_left > 0) {
                    this_left = 0;
                }

            }
        }

        block.find('.image_wrapper').css({
            left: this_left + 'px'

        });

    }
    $('body').on('click', '.section1155 .go_left', function () {
        silder1155($(this).closest('.section'), 'right');
    })

    $('body').on('click', '.section1155 .go_right', function () {
        silder1155($(this).closest('.section'), 'left');
    })



    function silder1160(block, way) {
        var len = block.find('.arr1').size();
        var view_w = $(window).width();
        var mr = 0;
        var w = block.find('.arr1').eq(0).width() + '';
        w = w.replace(/px/g, '') * 1;
        var width = len * w + (len - 1) * mr + mr;
        block.find('.image_wrapper').css({// обновляем ширину.
            width: width + 'px'
        });
        var max_left = block.find('.section_inner').width() + mr - width;
        var min_left = 0;

        var this_left = block.find('.image_wrapper').css('left');
        this_left = this_left.replace(/px/g, '') * 1;
        var total_w = len * (mr + w);
        var ei = 'px'
        console.log('total_w ' + -(total_w));
        console.log(this_left - 1170);
        if ($(window).width() > 1024) {
            if (way == 'left') {
                if (-(total_w) > (this_left - 1170) - w / len) {
                    this_left = -25;
                    console.log(1);
                    ei = 'vw';
                } else if (this_left > 0) {
                    console.log(2);
                    this_left = 0;
                    ei = 'vw';
                } else {
                    console.log(3);
                    this_left -= (mr + w);

                }

            }

        } else {
            if (way == 'left') {
                if (-(total_w) > (this_left - view_w) - w) {
                    this_left = 0;
                    console.log(11);
                    ei = 'vw';
                } else if (this_left > 0) {
                    console.log(22);
                    this_left = 0;
                    ei = 'vw';
                } else {
                    console.log(33);
                    this_left -= (mr + w);

                }

            }
        }
        if (way == 'right') {
            this_left += (mr + w);
            if (this_left > 0) {
                console.log(4);
                this_left = 0;
                ei = 'vw';
            }

        }
        block.find('.image_wrapper').css({
            left: this_left + ei

        });

    }





    $('body').on('click', '.section1160 .go_left', function () {
        silder1160($(this).closest('.section'), 'right');
    })

    $('body').on('click', '.section1160 .go_right', function () {
        silder1160($(this).closest('.section'), 'left');
    })



    $('body').on('click', '.section105 .menu_mobile_btn', function () {
        var logo = $(this).parent().siblings('.logo_img').clone();
        var logo_text = $(this).parent().siblings('.logo_text').clone();
        var phone = $(this).siblings('.phone1').clone();
        var social = $(this).parent().siblings('.social_icons').clone();
        if (logo != 'underfined') {
            $(this).siblings('.menu1').find('.logo_img').remove();
            $(this).siblings('.menu1').prepend(logo);
        }
        if (logo_text != 'underfined') {
            $(this).siblings('.menu1').find('.logo_text').remove();
            $(this).siblings('.menu1').prepend(logo_text);
        }
        if (phone != 'underfined' && (!phone.hasClass('hidden'))) {
            $(this).siblings('.menu1').find('.phone1').remove();
            $(this).siblings('.menu1').append(phone);
        }
        if (social != 'underfined' && (!social.hasClass('hidden'))) {
            $(this).siblings('.menu1').find('.social_icons').remove();
            $(this).siblings('.menu1').append(social);
        }
    })
    $('body').on('click', '.section107 .menu_mobile_btn', function () {
        var logo = $(this).parent().siblings('.logo_img').clone();
        var logo_text = $(this).parent().siblings('.logo_text').clone();
        var phone = $(this).siblings('.phone1').clone();
        var social = $(this).siblings('.social_icons').clone();
        if (logo != 'underfined') {
            $(this).siblings('.menu1').find('.logo_img').remove();
            $(this).siblings('.menu1').prepend(logo);
        }
        if (logo_text != 'underfined') {
            $(this).siblings('.menu1').find('.logo_text').remove();
            $(this).siblings('.menu1').prepend(logo_text);
        }
        if (phone != 'underfined' && (!phone.hasClass('hidden'))) {
            $(this).siblings('.menu1').find('.phone1').remove();
            $(this).siblings('.menu1').append(phone);
        }
        if (social != 'underfined' && (!social.hasClass('hidden'))) {
            $(this).siblings('.menu1').find('.social_icons').remove();
            $(this).siblings('.menu1').append(social);
        }
    })

    $('body').on('click', '.section116 .menu-toogler', function () {
        $(this).parent().children('.menu1').toggleClass('active');
//        $(this).parent().children('.menu1').toggle();
        $('body').toggleClass('modal');
        $(this).toggleClass('active');
    })
    $('body').on('click', '.section1156 .menu-toogler', function () {
//        $(this).parent().children('.menu1').toggle();
        $(this).parent().children('.menu1').toggleClass('active');
        $(this).toggleClass('active');
        $('body').toggleClass('modal');
    })
    $('body').on('click', '.section120 .menu-toogler', function () {
        $(this).parent().children('.menu1').toggle();
        $(this).parent().children('.menu1').toggleClass('active');
        $(this).closest('.section').toggleClass('menu_open');
        $('body').toggleClass('modal');
        $(this).toggleClass('active');
    })

    $('body').on('click', '.section2116 .menu-toogler', function () {
        var logo = $(this).siblings('.logo').clone();
        if (logo != 'underfined') {
            $(this).siblings('.menu1').find('.logo').remove();
            $(this).siblings('.menu1').prepend(logo);
        }


        var menu2 = $(this).siblings('.menu2').find('li');
        var menu1 = $(this).siblings('.menu1').children('ul').append(menu2);

        $(this).parent().children('.menu_block').toggleClass('active');
        $(this).closest('.section').toggleClass('menu_open');
        $(this).toggleClass('active');
        $(this).siblings('.menu_block').toggle();
        $('body').toggleClass('modal');
    })
    $('body').on('click', '.section2120 .menu-toogler', function () {
        $(this).parent().siblings('.menu_content').toggle();
        $(this).toggleClass('active');
        $(this).closest('.section').toggleClass('menu_open');
        $(this).closest('.section').toggleClass('menu_open_new');
//		$('body').toggleClass('menu_active');
        $('body').toggleClass('modal');
    })
    $('body').on('click', '.section2120 .menu-toogler_fixed', function () {
        $(this).siblings('.menu_content').toggle();
        $(this).siblings('.head').toggleClass('active');
        $(this).toggleClass('active');
        $(this).closest('.section').toggleClass('menu_open_new');
        $('body').toggleClass('modal');
    })

    $('body').on('click', '.section311 .menu1 a', function (e) {
        e.stopPropagation();
        if ($(window).width() <= 970) {
            $(this).closest('.menu-and-phone-and-btn').removeClass('active');
        }
    })
    $('body').on('click', '.section311 .menu-and-phone-and-btn .clear', function (e) {
        if ($(window).width() <= 970) {
            e.preventDefault();
            $('body').toggleClass('modal');
            $(this).toggleClass('active');
            $(this).parent().toggleClass('active');
            $(this).siblings('.menu1').toggleClass('active');
        }
    })




    if ($('.section.animate').size() && typeof (window.tobiz.editor) === 'undefined' && $(window).width() > 1000 && parseInt(window.tobiz.t) >= 3) {
        $('.section.animate').each(function () {


            //$(this).addClass('overflowY');







            if ($(this).hasClass('section118') || $(this).hasClass('section128') || $(this).hasClass('section149') || $(this).hasClass('section124')) {
                var seclector = '.col_3';
                var objects = $(this).find(seclector);
                var parent_selector = '.arr1';
                var parents = $(this).find(parent_selector);
                objects.css({opacity: 0, position: 'relative'});

                var block = $(this);
                var extra_objects = block.find('.title, .sub_title');
                extra_objects.css({opacity: 0, top: '0', position: 'relative'});


                $.each(parents, function (i, el) {
                    $(el).find(seclector).eq(0).css({left: '-200px'})
                    $(el).find(seclector).eq(2).css({left: '200px'})
                })
                $(window).scroll(function () {
                    $.each(objects, function (i, el) {
                        if (($(window).scrollTop() + ($(window).height() / 2)) > ($(el).closest('.arr1').offset().top) || ($(window).scrollTop() + $(window).height() > $(el).closest('.arr1').offset().top + $(el).closest('.arr1').height())) {
                            $(el).animate({opacity: 1.0, left: 0}, 1500);
                            extra_objects.animate({opacity: 1, top: 0}, 1500);
                        }
                    })
                })
            }
            if ($(this).hasClass('section125') || $(this).hasClass('section250')) {
                var seclector = '.col_2';
                var objects = $(this).find(seclector);
                var parent_selector = '.arr1';
                var parents = $(this).find(parent_selector);
                objects.css({opacity: 0, position: 'relative'});
                var block = $(this);
                var extra_objects = block.find('.title, .sub_title');
                extra_objects.css({opacity: 0, top: '0', position: 'relative'});

                $.each(parents, function (i, el) {
                    $(el).find(seclector).eq(0).css({left: '-200px'})
                    $(el).find(seclector).eq(1).css({left: '200px'})
                })
                $(window).scroll(function () {
                    $.each(objects, function (i, el) {
                        if (($(window).scrollTop() + ($(window).height() / 2)) > ($(el).closest('.arr1').offset().top) || ($(window).scrollTop() + $(window).height() > $(el).closest('.arr1').offset().top + $(el).closest('.arr1').height())) {
                            $(el).animate({opacity: 1.0, left: 0}, 1200);
                            extra_objects.animate({opacity: 1, top: 0}, 1200);
                        }
                    })
                })
            }
            if ($(this).hasClass('section1144')) {
                var elem = $('.image_box');
                console.log($(this));
                var objects = $(this).find(elem);
                var block = $(this);
                $.each(objects, function (i, el) {
                    $(el).css({'margin-top': 200 * i + 'px', 'margin-left': 20 * i + 'px', 'opacity': '0'});
                })
                $(window).scroll(function () {
                    $.each(objects, function (i, el) {
                        if (($(window).scrollTop() + ($(window).height() / 2)) > ($(el).parent('.images').offset().top)) {
                            $(el).animate({'margin-top': '0px', 'margin-left': 0 * i + 'px', 'opacity': '1'}, i * 100 + 1000);
                        }
                    })
                })
            }
            if ($(this).hasClass('section1149')) {
                var elem = $('.arr1 ');
                console.log($(this));
                var objects = $(this).find(elem);
                var block = $(this);
                $.each(objects, function (i, el) {
                    $(el).css({'margin-top': 200 * i + 'px', 'margin-left': 20 * i + 'px', 'opacity': '0'});
                })
                $(window).scroll(function () {
                    $.each(objects, function (i, el) {
                        if (($(window).scrollTop() + ($(window).height() / 2)) > ($(el).parent('.items').offset().top)) {
                            $(el).animate({'margin-top': '0px', 'margin-left': 0 * i + 'px', 'opacity': '1'}, i * 200 + 1000);
                        }
                    })
                })
            }
//            if ($(this).hasClass('section1152')) {
//                var elem = $('.arr1');
//                console.log($(this));
//                var objects = $(this).find(elem);
//                var block = $(this);
//                 $.each(objects, function (i, el) {
//                    $(el).css({'margin-top': 200*i+'px','margin-left': 20*i+'px', 'opacity':'0'});
//                 })
//                $(window).scroll(function () {
//                    $.each(objects, function (i, el) {
//                        if (($(window).scrollTop() + ($(window).height() / 2)) > ($(el).parent('.section_inner').offset().top)) {
//                            $(el).animate({'margin-top': '0px','margin-left': 0*i+'px',  'opacity':'1'}, i*200+1000);
//                        }
//                    })
//                })
//            }
            if ($(this).hasClass('section1419')) {
                var elem = $('.arr1');
                console.log($(this));
                var objects = $(this).find(elem);
                var block = $(this);
                $.each(objects, function (i, el) {
                    $(el).css({'margin-top': 200 * i + 'px', 'margin-left': 20 * i + 'px', 'opacity': '0'});
                })
                $(window).scroll(function () {
                    $.each(objects, function (i, el) {
                        if (($(window).scrollTop() + ($(window).height() / 2)) > ($(el).parent('.section_inner').offset().top)) {
                            $(el).animate({'margin-top': '0px', 'margin-left': 0 * i + 'px', 'opacity': '1'}, i * 200 + 1000);
                        }
                    })
                })
            }
            if ($(this).hasClass('section1250')) {
                var elem = $('.section1250 .btn1');
                var elem2 = $('.section1250 .btn2');
                elem.css({'margin-top': 100 + 'px', 'margin-right': 200 + 'px', 'opacity': '0'});
                elem2.css({'margin-top': 100 + 'px', 'margin-left': 200 + 'px', 'opacity': '0'});
                $(window).scroll(function () {
                    if (($(window).scrollTop() + ($(window).height() / 2) + 100) > (elem.parent('.arr1').offset().top)) {
                        elem.animate({'margin-top': '0px', 'margin-right': 20 + 'px', 'opacity': '1'}, 1200);
                    }
                    if (($(window).scrollTop() + ($(window).height() / 2) + 100) > (elem2.parent('.arr1').offset().top)) {
                        elem2.animate({'margin-top': '0px', 'margin-left': 0 + 'px', 'opacity': '1'}, 1200);
                    }
                })
            }
            if ($(this).hasClass('section1145')) {
                var elem = $('.item');
                console.log($(this));
                var objects = $(this).find(elem);
                var block = $(this);
                $.each(objects, function (i, el) {
                    $(el).css({'margin-top': 200 * i / 2 + 'px', 'opacity': '0'});
                })
                $(window).scroll(function () {
                    $.each(objects, function (i, el) {
                        if (($(window).scrollTop() + ($(window).height() / 2)) > ($(el).parent('.images').offset().top)) {
                            $(el).animate({'margin-top': '0px', 'opacity': '1'}, i * 100 + 1500);
                        }
                    })
                })
            }
            if ($(this).hasClass('section1146')) {
                var elem = $('.item');
                console.log($(this));
                var objects = $(this).find(elem);
                var block = $(this);
                $.each(objects, function (i, el) {
                    $(el).css({'margin-top': 200 * i / 2 + 'px', 'opacity': '0'});
                })
                $(window).scroll(function () {
                    $.each(objects, function (i, el) {
                        if (($(window).scrollTop() + ($(window).height() / 2)) > ($(el).parent('.images').offset().top)) {
                            $(el).animate({'margin-top': '0px', 'opacity': '1'}, i * 100 + 1500);
                        }
                    })
                })
            }
            if ($(this).hasClass('section2158')) {
                var elem = $('.anim');
                console.log($(this));
                var objects = $(this).find(elem);
                var block = $(this);
                $.each(objects, function (i, el) {
                    $(el).css({'margin-top': 200 * i / 2 + 'px', 'opacity': '0'});
                })
                $(window).scroll(function () {
                    $.each(objects, function (i, el) {
                        if (($(window).scrollTop() + ($(window).height() / 2)) > ($(el).closest('.arr1').offset().top)) {
                            $(el).animate({'margin-top': '0px', 'opacity': '1'}, i * 100 + 1500);
                        }
                    })
                })
            }
            if ($(this).hasClass('section1130')) {
                var elem = $('.arr1');
                console.log($(this));
                var objects = $(this).find(elem);
                var block = $(this);
                $.each(objects, function (i, el) {
                    $(el).css({'margin-top': 200 * i / 2 + 'px', 'opacity': '0'});
                })
                $(window).scroll(function () {
                    $.each(objects, function (i, el) {
                        if (($(window).scrollTop() + ($(window).height() / 2)) > ($(el).parent('.catalog_items ').offset().top)) {
                            $(el).animate({'margin-top': '0px', 'opacity': '1'}, i * 500 + 500);
                        }
                    })
                })
            }
            if ($(this).hasClass('section307')) {
                var seclector = '.col';
                var objects = $(this).find(seclector);
                var parent_selector = '.section_inner';
                var parents = $(this).find(parent_selector);
                objects.css({opacity: 0, position: 'relative'});

                var block = $(this);
                var extra_objects = block.find('.title, .sub_title');
                extra_objects.css({opacity: 0, top: '0', position: 'relative'});


                $.each(parents, function (i, el) {
                    $(el).find(seclector).eq(0).css({left: '-600px'})
                    $(el).find(seclector).eq(1).css({left: '-400px'})
                    $(el).find(seclector).eq(2).css({left: '-200px'})
                })
                $(window).scroll(function () {
                    $.each(objects, function (i, el) {
                        if (($(window).scrollTop() + ($(window).height() / 2)) > ($(el).closest('.section_inner').offset().top) || ($(window).scrollTop() + $(window).height() > $(el).closest('.section_inner').offset().top + $(el).closest('.section_inner').height())) {
                            $(el).animate({opacity: 1.0, left: 0}, 1500);
                            extra_objects.animate({opacity: 1, top: 0}, 1500);
                        }
                    })
                })
            }
            if ($(this).hasClass('section314')) {
                var seclector = '.col_3';
                var objects = $(this).find(seclector);
                var parent_selector = '.section_inner';
                var parents = $(this).find(parent_selector);
                objects.css({opacity: 0, position: 'relative'});

                var block = $(this);
                var extra_objects = block.find('.title, .sub_title');
                extra_objects.css({opacity: 0, top: '0', position: 'relative'});


                $.each(parents, function (i, el) {
                    $(el).find(seclector).eq(0).css({left: '-600px'})
                    $(el).find(seclector).eq(1).css({left: '-400px'})
                    $(el).find(seclector).eq(2).css({left: '-200px'})
                })
                $(window).scroll(function () {
                    $.each(objects, function (i, el) {
                        if (($(window).scrollTop() + ($(window).height() / 2)) > ($(el).closest('.section_inner').offset().top) || ($(window).scrollTop() + $(window).height() > $(el).closest('.section_inner').offset().top + $(el).closest('.section_inner').height())) {
                            $(el).animate({opacity: 1.0, left: 0}, 1500);
                            extra_objects.animate({opacity: 1, top: 0}, 1500);
                        }
                    })
                })
            }
            if ($(this).hasClass('section309')) {
                var seclector = '.col';
                var objects = $(this).find(seclector);
                var parent_selector = '.section_inner';
                var parents = $(this).find(parent_selector);
                objects.css({opacity: 0, position: 'relative'});

                var block = $(this);
                var extra_objects = block.find('.title, .sub_title');
                extra_objects.css({opacity: 0, top: '0', position: 'relative'});

                $.each(parents, function (i, el) {
                    $(el).find(seclector).eq(0).css({left: '-1000px'})
                    $(el).find(seclector).eq(1).css({left: '-800px'})
                    $(el).find(seclector).eq(2).css({left: '-600px'})
                    $(el).find(seclector).eq(3).css({left: '-400px'})
                    $(el).find(seclector).eq(4).css({left: '-200px'})
                })
                $(window).scroll(function () {
                    $.each(objects, function (i, el) {
                        if (($(window).scrollTop() + ($(window).height() / 2)) > ($(el).closest('.section_inner').offset().top) || ($(window).scrollTop() + $(window).height() > $(el).closest('.section_inner').offset().top + $(el).closest('.section_inner').height())) {
                            $(el).animate({opacity: 1.0, left: 0}, 1500);
                            extra_objects.animate({opacity: 1, top: 0}, 1500);
                        }
                    })
                })
            }

            if ($(this).hasClass('section153') || $(this).hasClass('section154') || $(this).hasClass('section157') || $(this).hasClass('section159') || $(this).hasClass('section258') || $(this).hasClass('section1154') || $(this).hasClass('section311') || $(this).hasClass('section155') || $(this).hasClass('section1258')) {
                var seclector = '.section_inner';
                var objects = $(this).find(seclector);

                var block = $(this);
                var title = objects.find('.title');
                var sub_title = objects.find('.sub_title');
                var arr_block = objects.find('.arr_block');
                var arr1 = objects.find('.arr1');
                var btn = objects.find('.btn1');
                var btn2 = objects.find('.btn2');
                var btn_descr = objects.find('.btn_descr');
                var form = objects.find('.form_wrapper');
                var timer = objects.find('.timer');
                var header = objects.find('.header');
                var play_btn = objects.find('.play');

                title.css({left: '-1000px', opacity: 0, position: 'relative'});
                sub_title.css({right: '-1000px', opacity: 0, position: 'relative'});
                btn.css({bottom: '-200px', opacity: 0, position: 'relative'});
                btn2.css({bottom: '-200px', opacity: 0, position: 'relative'});
                btn_descr.css({bottom: '-200px', opacity: 0, position: 'relative'});
                form.css({bottom: '-300px', opacity: 0, position: 'relative'});
                timer.css({bottom: '-300px', opacity: 0, position: 'relative'});
                header.css({top: '-300px', opacity: 0, position: 'relative'});
                arr_block.css({opacity: 0, position: 'relative'});
                arr1.css({bottom: '-300px', opacity: 0, position: 'relative'});
                play_btn.css({bottom: '-500px', opacity: 0});

                $(window).scroll(function () {
                    $.each(objects, function (i, el) {
                        if (($(window).scrollTop() + ($(window).height() / 4)) > ($(el).closest('.section_inner').offset().top) || ($(window).scrollTop() + $(window).height() > $(el).closest('.section_inner').offset().top + $(el).closest('.section_inner').height())) {
                            title.animate({left: '0', opacity: 1}, 1000);
                            sub_title.animate({right: '0', opacity: 1, position: 'static'}, 1500);
                            btn.animate({bottom: '0', opacity: 1}, 1200);
                            btn2.animate({bottom: '0', opacity: 1}, 1200);
                            btn_descr.animate({bottom: '0', opacity: 1, position: 'static'}, 1200);
                            timer.animate({bottom: '0', opacity: 1, position: 'static'}, 1200);
                            form.animate({bottom: '0', opacity: 1, position: 'static'}, 1500);
                            arr_block.animate({opacity: 1, position: 'relative'}, 1500);
                            header.animate({top: '0', opacity: 1, position: 'relative'}, 1000);
                            arr1.css({bottom: '0', opacity: 1, position: 'relative'}, 1000);
                            play_btn.animate({bottom: '165px', opacity: 1}, 1000);
                        }
                    })
                })
            }

            if ($(this).hasClass('section308')) {
                var seclector = '.col';
                var objects = $(this).find(seclector);
                var parent_selector = '.section_inner';
                var parents = $(this).find(parent_selector);
                objects.css({opacity: 0, position: 'relative'});

                var block = $(this);
                var extra_objects = block.find('.title, .sub_title');
                extra_objects.css({opacity: 0, top: '0', position: 'relative'});

                $.each(parents, function (i, el) {
                    $(el).find(seclector).eq(0).css({left: '-800px'})
                    $(el).find(seclector).eq(1).css({left: '-600px'})
                    $(el).find(seclector).eq(2).css({left: '-400px'})
                    $(el).find(seclector).eq(3).css({left: '-200px'})
                })
                $(window).scroll(function () {
                    $.each(objects, function (i, el) {
                        if (($(window).scrollTop() + ($(window).height() / 2)) > ($(el).closest('.section_inner').offset().top) || ($(window).scrollTop() + $(window).height() > $(el).closest('.section_inner').offset().top + $(el).closest('.section_inner').height())) {
                            $(el).animate({opacity: 1.0, left: 0}, 1500);
                            extra_objects.animate({opacity: 1, top: 0}, 1500);
                        }
                    })
                })
            }
            if ($(this).hasClass('section226')) {
                var seclector = '.arr1';
                var objects = $(this).find(seclector);
                var parent_selector = '.section_inner';
                var parents = $(this).find(parent_selector);
                objects.css({opacity: 0, position: 'relative'});


                var block = $(this);
                var extra_objects = block.find('.title, .sub_title');
                extra_objects.css({opacity: 0, top: '0', position: 'relative'});

                $.each(objects, function (i, el) {
                    $(el).css({left: '-' + ((i + 1) * 400) + 'px'})
                })
                $(window).scroll(function () {
                    $.each(objects, function (i, el) {
                        if (($(window).scrollTop() + ($(window).height() / 2)) > ($(el).closest('.section_inner').offset().top) || ($(window).scrollTop() + $(window).height() > $(el).closest('.section_inner').offset().top + $(el).closest('.section_inner').height())) {
                            $(el).animate({opacity: 1.0, left: 0}, 1500);
                            extra_objects.animate({opacity: 1, top: 0}, 1500);
                        }
                    })
                })
            }
            if ($(this).hasClass('section132')) { //
                var seclector = '.text';
                var objects = $(this).find(seclector);
                var parent_selector = '.section_inner';
                var parents = $(this).find(parent_selector);
                objects.css({opacity: 0, position: 'relative'});
                objects.eq(0).css({left: '-' + (400) + 'px'})

                var block = $(this);
                var extra_objects = block.find('.title, .sub_title');
                extra_objects.css({opacity: 0, top: '0', position: 'relative'});

                $(window).scroll(function () {
                    $.each(objects, function (i, el) {
                        if (($(window).scrollTop() + ($(window).height() / 2)) > ($(el).closest('.section_inner').offset().top) || ($(window).scrollTop() + $(window).height() > $(el).closest('.section_inner').offset().top + $(el).closest('.section_inner').height())) {
                            $(el).animate({opacity: 1.0, left: 0}, 1500);
                            extra_objects.animate({opacity: 1, top: 0}, 1500);
                        }
                    })
                })
            }
            if ($(this).hasClass('section164')) { //
                var seclector = '.pcenter';
                var objects = $(this).find(seclector);
                var parent_selector = '.section_inner';
                var parents = $(this).find(parent_selector);
                objects.css({opacity: 0, position: 'relative'});
                objects.eq(0).css({left: '-' + (400) + 'px'})

                var block = $(this);
                var extra_objects = block.find('.title, .sub_title');
                extra_objects.css({opacity: 0, top: '0', position: 'relative'});
                $(window).scroll(function () {
                    $.each(objects, function (i, el) {
                        if (($(window).scrollTop() + ($(window).height() / 2)) > ($(el).closest('.section_inner').offset().top) || ($(window).scrollTop() + $(window).height() > $(el).closest('.section_inner').offset().top + $(el).closest('.section_inner').height())) {
                            $(el).animate({opacity: 1.0, left: 0}, 1500);
                            extra_objects.animate({opacity: 1, top: 0}, 1500);
                        }
                    })
                })
            }
            if ($(this).hasClass('section310') || $(this).hasClass('section148') || $(this).hasClass('section147') || $(this).hasClass('section143') || $(this).hasClass('section306')) { //
                var seclector = '.viewport, .iamges, .image_box1, .image_box2, .image_box3, .image_box4, .image_box5, .image_box, .form_wrapper';
                var objects = $(this).find(seclector);
                var parent_selector = '.section_inner';
                var parents = $(this).find(parent_selector);
                objects.css({opacity: 0});


                var block = $(this);
                var extra_objects = block.find('.title, .sub_title');
                extra_objects.css({opacity: 0});
                $(window).scroll(function () {
                    $.each(objects, function (i, el) {
                        if (($(window).scrollTop() + ($(window).height() / 2)) > ($(el).closest('.section_inner').offset().top) || ($(window).scrollTop() + $(window).height() > $(el).closest('.section_inner').offset().top + $(el).closest('.section_inner').height())) {
                            $(el).animate({opacity: 1.0}, 1500);
                            extra_objects.animate({opacity: 1}, 1500);
                        }
                    })
                })
            }
            if ($(this).hasClass('section126')) { //



                var seclector = '.image1, .video1, .right';
                var seclector2 = '.extra_images';
                var objects = $(this).find(seclector);
                var objects2 = $(this).find(seclector2);
                var parent_selector = '.arr1';
                var parents = $(this).find(parent_selector);
                objects.css({opacity: 0, position: 'relative'});
                objects2.css({opacity: 0});


                $.each(parents, function (i, el) {
                    $(el).find(seclector).eq(0).css({left: '-200px'})
                    $(el).find(seclector).eq(1).css({left: '200px'})
                })



                var block = $(this);
                var extra_objects = block.find('.title, .sub_title');
                extra_objects.css({opacity: 0, top: '0', position: 'relative'});


                $(window).scroll(function () {
                    $.each(objects, function (i, el) {
                        if (($(window).scrollTop() + ($(window).height() / 2)) > ($(el).closest('.arr1').offset().top) || ($(window).scrollTop() + $(window).height() > $(el).closest('.arr1').offset().top + $(el).closest('.arr1').height())) {
                            $(el).animate({opacity: 1.0, left: 0}, 1500);
                            extra_objects.animate({opacity: 1, top: 0}, 1500);
                        }
                    })
                    $.each(objects2, function (i, el) {
                        if (($(window).scrollTop() + ($(window).height() / 2)) > ($(el).closest('.arr1').offset().top) || ($(window).scrollTop() + $(window).height() > $(el).closest('.arr1').offset().top + $(el).closest('.arr1').height())) {
                            $(el).animate({opacity: 1.0}, 2000);
                        }
                    })
                })
            }
            if ($(this).hasClass('section129')) { //



                var seclector = '.image1, .video1, .right';
                var seclector2 = '.extra_images';
                var objects = $(this).find(seclector);
                var objects2 = $(this).find(seclector2);
                var parent_selector = '.arr1';
                var parents = $(this).find(parent_selector);
                objects.css({opacity: 0, position: 'relative'});
                objects2.css({opacity: 0});


                $.each(parents, function (i, el) {
                    $(el).find(seclector).eq(0).css({left: '-200px'})
                    $(el).find(seclector).eq(1).css({left: '200px'})
                })



                var block = $(this);
                var extra_objects = block.find('.title, .sub_title');
                extra_objects.css({opacity: 0, top: '0', position: 'relative'});


                $(window).scroll(function () {
                    $.each(objects, function (i, el) {
                        if (($(window).scrollTop() + ($(window).height() / 2)) > ($(el).closest('.arr1').offset().top) || ($(window).scrollTop() + $(window).height() > $(el).closest('.arr1').offset().top + $(el).closest('.arr1').height())) {
                            $(el).animate({opacity: 1.0, left: 0}, 1500);
                            extra_objects.animate({opacity: 1, top: 0}, 1500);
                        }
                    })
                    $.each(objects2, function (i, el) {
                        if (($(window).scrollTop() + ($(window).height() / 2)) > ($(el).closest('.arr1').offset().top) || ($(window).scrollTop() + $(window).height() > $(el).closest('.arr1').offset().top + $(el).closest('.arr1').height())) {
                            $(el).animate({opacity: 1.0}, 2000);
                        }
                    })
                })
            }


            if ($(this).hasClass('section301')) { //
                var seclector = '.arr1';
                var objects = $(this).find(seclector);
                var parent_selector = '.section_inner';
                var parents = $(this).find(parent_selector);
                objects.css({opacity: 0, left: '-400px', position: 'relative'});




                var block = $(this);
                var extra_objects = block.find('.title, .sub_title');
                extra_objects.css({opacity: 0, top: '0', position: 'relative'});


                $(window).scroll(function () {
                    $.each(objects, function (i, el) {
                        if (($(window).scrollTop() + ($(window).height() / 2)) > ($(el).closest('.arr1').offset().top) || ($(window).scrollTop() + $(window).height() > $(el).closest('.arr1').offset().top + $(el).closest('.arr1').height())) {
                            $(el).animate({opacity: 1.0, left: 0}, 1500);
                            extra_objects.animate({opacity: 1, top: 0}, 1500);
                        }
                    })
                })
            }


            if ($(this).hasClass('section117')) { //
                var seclector = '.col_2';
                var objects = $(this).find(seclector);
                var parent_selector = '.arr1';
                var parents = $(this).find(parent_selector);
                objects.css({opacity: 0, position: 'relative'});

                var block = $(this);
                var extra_objects = block.find('.title, .sub_title');
                extra_objects.css({opacity: 0, top: '0', position: 'relative'});

                $.each(parents, function (i, el) {
                    if ((i + 1) % 2) {
                        $(el).find(seclector).eq(0).css({left: '-200px'})
                        $(el).find(seclector).eq(1).css({left: '200px'})
                    } else {
                        $(el).find(seclector).eq(0).css({left: '200px'})
                        $(el).find(seclector).eq(1).css({left: '-200px'})
                    }
                })
                $(window).scroll(function () {
                    $.each(objects, function (i, el) {
                        if (($(window).scrollTop() + ($(window).height() / 2)) > ($(el).closest('.arr1').offset().top) || ($(window).scrollTop() + $(window).height() > $(el).closest('.arr1').offset().top + $(el).closest('.arr1').height())) {
                            $(el).animate({opacity: 1.0, left: 0}, 1200);
                            extra_objects.animate({opacity: 1, top: 0}, 1200);
                        }
                    })
                })
            }




            if ($(this).hasClass('section152') || $(this).hasClass('section201')) {
                var seclector = '.image_box1, .image_box2, .image_box3, .image_box4, .image_box5, .col_5 ';
                var objects = $(this).find(seclector);
                var parent_selector = '.arr1';
                var parents = $(this).find(parent_selector);
                objects.css({opacity: 0, position: 'relative'});

                var block = $(this);
                var extra_objects = block.find('.title, .sub_title');
                extra_objects.css({opacity: 0, top: '0', position: 'relative'});


                $.each(parents, function (i, el) {
                    $(el).find(seclector).eq(0).css({left: '-200px'})
                    $(el).find(seclector).eq(1).css({left: '-100px'})
                    $(el).find(seclector).eq(3).css({left: '100px'})
                    $(el).find(seclector).eq(4).css({left: '200px'})
                })
                $(window).scroll(function () {
                    $.each(objects, function (i, el) {
                        if (($(window).scrollTop() + ($(window).height() / 2)) > ($(el).closest('.arr1').offset().top) || ($(window).scrollTop() + $(window).height() > $(el).closest('.arr1').offset().top + $(el).closest('.arr1').height())) {
                            $(el).animate({opacity: 1.0, left: 0, top: 0}, 1500);
                            extra_objects.animate({opacity: 1, top: 0}, 1500);
                        }
                    })
                })
            }
            if ($(this).hasClass('section121') || $(this).hasClass('section151') || $(this).hasClass('section200')) {
                var seclector = '.col_4';
                var objects = $(this).find(seclector);
                var parent_selector = '.arr1';
                var parents = $(this).find(parent_selector);
                objects.css({opacity: 0, position: 'relative'});

                var block = $(this);
                var extra_objects = block.find('.title, .sub_title');
                extra_objects.css({opacity: 0, top: '0', position: 'relative'});

                $.each(parents, function (i, el) {
                    $(el).find(seclector).eq(0).css({left: '-200px'})
                    $(el).find(seclector).eq(1).css({left: '-100px'})
                    $(el).find(seclector).eq(2).css({left: '100px'})
                    $(el).find(seclector).eq(3).css({left: '200px'})
                })
                $(window).scroll(function () {
                    $.each(objects, function (i, el) {
                        if (($(window).scrollTop() + ($(window).height() / 2)) > ($(el).closest('.arr1').offset().top) || ($(window).scrollTop() + $(window).height() > $(el).closest('.arr1').offset().top + $(el).closest('.arr1').height())) {
                            $(el).animate({opacity: 1.0, left: 0, top: 0}, 1500);
                            extra_objects.animate({opacity: 1, top: 0}, 1500);
                        }
                    })
                })
            }




        })
    }



    if ($('.section.widget').size() && typeof (window.tobiz.editor) === 'undefined' && parseInt(window.tobiz.w) == 1) {

        if ($('.section1000').size()) {
            var popup_1000 = 1;
            $('html').mouseleave(function (e) {
                if (popup_1000) {
                    popup_1000 = 0;
                    $('.section1000').find('.extra_info_block_wrapper').show();
                }
            })
        }
        if ($('.section1004').size()) {
            var popup_1000 = 1;
            $('html').mouseleave(function (e) {
                if (popup_1000) {
                    popup_1000 = 0;
                    $('.section1004').find('.extra_info_block_wrapper').show();
                }
            })
        }
        if ($('.section1005').size()) {
            var popup_1000 = 1;
            $('html').mouseleave(function (e) {
                if (popup_1000) {
                    popup_1000 = 0;
                    $('.section1005').find('.extra_info_block_wrapper').show();
                }
            })
        }
        if ($('.section1006').size()) {
            var popup_1000 = 1;
            $('html').mouseleave(function (e) {
                if (popup_1000) {
                    popup_1000 = 0;
                    $('.section1006').find('.extra_info_block_wrapper').show();
                }
            })
        }
        if ($('.section1007').size()) {
            var popup_1000 = 1;
            $('html').mouseleave(function (e) {
                if (popup_1000) {
                    popup_1000 = 0;
                    $('.section1007').find('.extra_info_block_wrapper').show();
                }
            })
        }
        if ($('.section1003').size()) {
            $('.section1003').show();

        }
        if ($('.section1001').size()) {
            var today = new Date();

            $('.section1001').each(function () {

                var lag = parseInt($(this).data('lag'));
                var start = parseInt($(this).data('start'));
                var stop = parseInt($(this).data('stop'));

                if (start < 0 && start > 23) {
                    console.log('Неверные параметры POPUP');
                    return false;
                }
                if (stop < 0 && stop > 23) {
                    console.log('Неверные параметры POPUP');
                    return false;
                }
                if (start > stop) {
                    console.log('Неверные параметры POPUP');
                    return false;
                }

                if (today.getHours() >= start && today.getHours() <= stop) {
                    var block = $(this).find('.extra_info_block_wrapper');
                    setTimeout(function () {
                        block.show();
                    }, lag * 1000)

                }

            })

        }

        if ($('.section1008').size()) {
            var today = new Date();

            $('.section1008').each(function () {

                var lag = parseInt($(this).data('lag'));
                var start = parseInt($(this).data('start'));
                var stop = parseInt($(this).data('stop'));

                if (start < 0 && start > 23) {
                    console.log('Неверные параметры POPUP');
                    return false;
                }
                if (stop < 0 && stop > 23) {
                    console.log('Неверные параметры POPUP');
                    return false;
                }
                if (start > stop) {
                    console.log('Неверные параметры POPUP');
                    return false;
                }

                if (today.getHours() >= start && today.getHours() <= stop) {
                    var block = $(this).find('.extra_info_block_wrapper');
                    setTimeout(function () {
                        block.show();
                        block.addClass('this_show');
                    }, lag * 1000)

                }

            })

        }


//
        if ($('.section1010').size()) {
            var today = new Date();

            $('.section1010').each(function () {

                var lag = parseInt($(this).data('lag'));
                var start = parseInt($(this).data('start'));
                var stop = parseInt($(this).data('stop'));

                if (start < 0 && start > 23) {
                    console.log('Неверные параметры POPUP');
                    return false;
                }
                if (stop < 0 && stop > 23) {
                    console.log('Неверные параметры POPUP');
                    return false;
                }
                if (start > stop) {
                    console.log('Неверные параметры POPUP');
                    return false;
                }

                if (today.getHours() >= start && today.getHours() <= stop) {
                    var block = $(this).find('.extra_info_block');
                    setTimeout(function () {
                        block.show();
                        block.addClass('this_shows');
                    }, lag * 1000)

                }

            })

        }

    }

// ==============================================!!!
//============================
    window.tobiz.slider1130array = new Object();
    window.tobiz.slider1130Init = function (id) {

        console.log('111');
        var product_card_id = 'undefined';

        if (typeof (window.tobiz.slider1130Init[id] != 'undefined')) {
            product_card_id = window.tobiz.slider1130array[id];
            console.log(product_card_id);

            if ($('#b_' + id).size() && window.tobiz.editor) {
                var block_slider = $('#b_' + id);
                block_slider.find('.arr1').eq(product_card_id).find('.extra_info_block_wrapper').show();
            }
        }





    }

    $('.section1130').each(function () {
        window.tobiz.slider1130Init($(this).data('id'))
    })
//
// ==============================================!!!



    //============================
    window.tobiz.slider1011array = new Object();
    window.tobiz.slider1011Init = function (id) {
        var slide_id = 0;
        var slide_selector = '.quiz_wrapper .field';
        var next_selector = '.next';
        var prev_selector = '.prev';
		var smart_quiz = false;

        if (!(typeof (window.tobiz.slider1011array[id]) === 'undefined')) {

            if (!(typeof (window.tobiz.slider1011array[id].current_id) === 'undefined'))
                slide_id = window.tobiz.slider1011array[id].current_id;

            delete window.tobiz.slider1011array[id];
        }

        if ($('#b_' + id).size()) {

            var block_slider = $('#b_' + id);
            block_slider.find('.field').each(function (i, el) {
                var element = $(el);
                element.attr('data-index', (i));
            });
            window.tobiz.slider1011array[id] = {
                len: block_slider.find(slide_selector).size(),
                current_id: 0,
                lag: 5000,
                speed: 300,
                setStatusBar: function () {
                    if (block_slider.find('.progress').length > 0) {
                        var progress = Math.floor((this.current_id + 1) * 100 / (this.len));
                        block_slider.find('.progress').css({'width': progress + '%'});
                        if (!block_slider.find('.discount_text').length > 0) {
                            block_slider.find('.progress').after('<div class="discount_text">Готово: <span>' + progress + '%</span> </div>');
                        } else {
                            block_slider.find('.discount_text span').html(progress + '%');
                        }
                    }
                },
                setSteps: function () {
                    if (block_slider.find('.steps').length > 0) {
                        var all_step = this.len;
                        var this_step = this.current_id + 1;


                        block_slider.find('.steps .all_step').text(all_step);
                        block_slider.find('.steps .this_step').text(this_step);
                    }
                },
                setDiscount: function () {
                    if (block_slider.find('.discount').length > 0) {


                        var progress;
                        if (this.len == 1) {
                            progress = 1;
                        } else {
                            progress = (this.current_id) / (this.len - 1);
                        }

                        var min = block_slider.find('.discount').eq(0).data('min') * 1;
                        var max = block_slider.find('.discount').eq(0).data('max') * 1;
                        var discount = min;
                        discount = Math.floor(min + (max - min) * progress);

                        block_slider.find('.discount span').text(discount + '%');
                    }
                },
                goToSlide: function (id) {
					
                    this.current_id = id;
                    block_slider.find(slide_selector).hide();
                    block_slider.find(slide_selector).removeClass('active');
                    block_slider.find(slide_selector).eq(id).addClass('active');
                    block_slider.find(slide_selector).eq(id).show();
                    block_slider.find('.point').removeClass('current');
                    block_slider.find('.point').eq(id).addClass('current');

                    this.setStatusBar();
                    this.setDiscount();
                    this.setSteps();
                    if (this.current_id !== 0 && !smart_quiz) {
                        block_slider.find('.prev').removeClass('hide');
                    } else {
						$('.steps').hide();
                        block_slider.find('.prev').addClass('hide');
                    }
                },

                eventListener: function () {
                    var self = this;
                    block_slider.unbind("swiperight");
                    block_slider.unbind("swipeleft");
                    $('body').on('click', '#quiz_editor .field_editor_title', function () {
                        var editor_id = $(this).parent().data('index');
                        self.goToSlide(editor_id);
                    })



                    block_slider.find('.point').unbind("click");
                    block_slider.find('.point').click(function () {
                        if (!$(this).hasClass('current')) {
                            self.goToSlide($(this).data('id'));
                        }

                    })


                    if (this.current_id <= 0) {
                        block_slider.find('.prev').addClass('hide');
                    }
					
                    block_slider.find(prev_selector + ', ' + next_selector).unbind("click");

					block_slider.find(prev_selector + ', ' + next_selector).click(function () {
					
					
						function smartId(){
							var input_val = '';
								input_val = $('.field.active').find('input:checked').val();
								block_slider.find(slide_selector).each(function(i, el){
									if($(el).data('sub_question_hook') == input_val && $(el).data('sub_question') == 'active' && self.current_id+1 == $(el).data('sub_question_num') ){
										id = $(el).data('index');
										smart_quiz = true;
									}
								})
								block_slider.find('.prev').addClass('hidden');
						}
						
						var id = self.current_id;
						if ($(this).hasClass(prev_selector.replace('.', ''))) {
							if ($(this).hasClass('hide')){
								return;
							}
							id--;
							if (id < 0) {
								id = 0;

							}
							if ($(this).hasClass('prev')) {
								if (id == 0) {
//								return false;
								} else {
									$(this).siblings('.next').addClass('show');
								}
							}
							if (id > 0 ) {
								block_slider.find('.prev').removeClass('hide');
							}
							block_slider.find('.quiz_wrapper').show();
							block_slider.find('.form_wrapper').hide();

							block_slider.find('.next').removeClass('send');

						} else {
							if (!$(this).hasClass('show') && !$('body').hasClass('editor_true')) {
								return false;
							}

							block_slider.find('.next').removeClass('show');
							
							
							id++;
							smartId();
							if (id > self.len - 1) {
								$(this).addClass('send');
							}



							if (id > self.len - 1) {
								id = self.len - 1;
								if (!$('body').hasClass('editor_true')) {
									block_slider.find('.slides').hide();
									block_slider.find('.form_wrapper').show();
								} else {
									block_slider.find('.quiz_wrapper').hide();
									block_slider.find('.form_wrapper').show();

								}
							}


						}
						
						block_slider.find('.simple__loader').fadeIn(300);
						setTimeout(function(){
							self.goToSlide(id);
							block_slider.find('.simple__loader').fadeOut(100);
						},1000)
					})

                    if ($(window).width() <= 800) {
                        block_slider.on('swiperight', function () {
                            block_slider.find(next_selector).click()
                        })
                        block_slider.on('swipeleft', function () {
                            block_slider.find(prev_selector).click()
                        })
                    }

                },
                init: function (slide_id) {
                    block_slider.find('.point').eq(0).addClass('current');
                    block_slider.find(slide_selector).hide();
                    block_slider.find(slide_selector).eq(0).show();
                    this.setStatusBar();
                    this.setSteps();
                    this.eventListener();
                    this.goToSlide(slide_id);

                }
            }
            window.tobiz.slider1011array[id].init(slide_id);
        }
    }

    $('.section1011').each(function () {
        window.tobiz.slider1011Init($(this).data('id'))
    })
//


    //============================
    window.tobiz.slider126array = new Object();
    window.tobiz.slider126Init = function (id) {
        var slide_id = 0;
        var auto_s = 1;

        if (!$('#b_' + id).hasClass('slider')) {
            return true;
        }
        if ($('#b_' + id).size()) {
            auto_s = $('#b_' + id).data('autoslide') * 1;

        }
        if (!(typeof (window.tobiz.slider126array[id]) === 'undefined')) {

            if (!(typeof (window.tobiz.slider126array[id].current_id) === 'undefined'))
                slide_id = window.tobiz.slider126array[id].current_id;

            auto_s = window.tobiz.slider126array[id].auto_slide;


            if (!(typeof (window.tobiz.slider126array[id].auto_slide_interval) === 'undefined'))
                clearInterval(window.tobiz.slider126array[id].auto_slide_interval);



            delete window.tobiz.slider126array[id];
        }






        if ($('#b_' + id).size()) {

            var block_slider = $('#b_' + id);
            window.tobiz.slider126array[id] = {
                len: block_slider.find('.slide').size(),
                current_id: 0,
                auto_slide: block_slider.data('autoslide') * 1,
                auto_slide_interval: 'timeout',
                lag: 6000,
                speed: 300,
                setScroller: function () {
                    block_slider.find('.scroller').html('');
                    var len = block_slider.find('.slide').size();
                    $.each(block_slider.find('.slide'), function (index, element) {
                        block_slider.find('.scroller').append('<div class="point" data-id="' + index + '"></div>')
                    })
                },
                goToSlide: function (id, fast, way) {
                    var speed = this.speed;
                    if (fast == 1) {
                        speed = 0;
                    }

                    if (way != 'right') {
                        way = 'left';
                    }


                    if (id < 0) {
                        id = this.len - 1;
                    }
                    if (id > this.len - 1) {
                        id = 0;
                    }


                    this.current_id = id;

                    if (way == 'left') {


                        block_slider.find('.point').hide();
                        block_slider.find('.slider_wrapper').animate({left: "-100%"}, speed, function () {
                            block_slider.find('.slider_wrapper').css({left: "100%"})
                            block_slider.find('.slide').hide();
                            block_slider.find('.slide').eq(id).show();
                            block_slider.find('.point').removeClass('current');
                            block_slider.find('.point').eq(id).addClass('current');
                            block_slider.find('.slider_wrapper').animate({left: "0%"}, speed, function () {
                                block_slider.find('.point').show();

                            })

                        });

                    } else {

                        block_slider.find('.point').hide();
                        block_slider.find('.slider_wrapper').animate({left: "+100%"}, speed, function () {

                            block_slider.find('.slider_wrapper').css({left: "-100%"})
                            block_slider.find('.slide').hide();
                            block_slider.find('.slide').eq(id).show();
                            block_slider.find('.point').removeClass('current');
                            block_slider.find('.point').eq(id).addClass('current');
                            block_slider.find('.slider_wrapper').animate({left: "0%"}, speed, function () {
                                block_slider.find('.point').show();

                            })

                        });

                    }

                },
                autoSlide: function () {


                    if (this.auto_slide == 1) {
                        var id = this.current_id;
                        id++;
                        if (id > this.len - 1) {
                            id = 0;
                        }
                        this.goToSlide(id);
                    }
                },
                eventListener: function () {

                    var self = this;
                    block_slider.unbind("swiperight");
                    block_slider.unbind("swipeleft");



                    block_slider.find('.point').unbind("click");

                    block_slider.find('.point').click(function () {
                        if (!$(this).hasClass('current')) {
                            self.goToSlide($(this).data('id'));
                        }
                        self.auto_slide = 0;
                        clearInterval(self.auto_slide_interval);

                    })

                    block_slider.find('.go_left, .go_right').unbind("click");
                    block_slider.find('.go_left, .go_right').click(function () {
                        var id = self.current_id;
                        if ($(this).hasClass('go_left')) {
                            id--;
                            if (id < 0) {
                                id = self.len - 1;
                            }
                        } else {
                            id++;
                            if (id > self.len - 1) {
                                id = 0;
                            }
                        }
                        var way = 'left';

                        if ($(this).hasClass('go_right')) {
                            way = 'right';

                        }

                        self.goToSlide(id, self.speed, way);
                        self.auto_slide = 0;
                        clearInterval(self.auto_slide_interval);
                    })

                    if ($(window).width() <= 800) {
                        block_slider.on('swiperight', function () {
                            block_slider.find('.go_right').click()
                        })
                        block_slider.on('swipeleft', function () {
                            block_slider.find('.go_left').click()
                        })
                    }

                },
                init: function (slide_id, auto_s) {

                    console.log('init');

                    this.auto_slide = auto_s;
                    block_slider.find('.point').eq(0).addClass('current');
                    block_slider.find('.slide').hide();
                    block_slider.find('.slide').eq(0).show();
                    this.setScroller();
                    this.eventListener();
                    this.goToSlide(slide_id, 1);
                    var self = this;
                    if (typeof (window.tobiz.editor) === 'undefined') {





                        self.auto_slide_interval = setInterval(function () {
                            self.autoSlide();
                        }, self.lag)
                    }
                }
            }
            window.tobiz.slider126array[id].init(slide_id, auto_s);
        }
    }

    $('.section126').each(function () {
//        console.log($(this));
        window.tobiz.slider126Init($(this).data('id'))
    })










    window.tobiz.slider129array = new Object();
    window.tobiz.slider129Init = function (id) {
        var slide_id = 0;
        var auto_s = 1;

        if (!$('#b_' + id).hasClass('slider')) {
            return true;
        }
        if ($('#b_' + id).size()) {
            auto_s = $('#b_' + id).data('autoslide') * 1;

        }
        if (!(typeof (window.tobiz.slider129array[id]) === 'undefined')) {

            if (!(typeof (window.tobiz.slider129array[id].current_id) === 'undefined'))
                slide_id = window.tobiz.slider129array[id].current_id;

            auto_s = window.tobiz.slider129array[id].auto_slide;

            if (!(typeof (window.tobiz.slider129array[id].auto_slide_interval) === 'undefined'))
                clearInterval(window.tobiz.slider129array[id].auto_slide_interval);

            delete window.tobiz.slider129array[id];
        }

        if ($('#b_' + id).size()) {

            var block_slider = $('#b_' + id);
            window.tobiz.slider129array[id] = {
                len: block_slider.find('.slide').size(),
                current_id: 0,
                auto_slide: block_slider.data('autoslide') * 1,
                auto_slide_interval: 'timeout',
                lag: 5000,
                speed: 500,
                setScroller: function () {
                    block_slider.find('.scroller').html('');
                    var len = block_slider.find('.slide').size();
                    $.each(block_slider.find('.slide'), function (index, element) {
                        block_slider.find('.scroller').append('<div class="point" data-id="' + index + '"></div>')
                    })
                },
                goToSlide: function (id, fast, way) {
                    var speed = this.speed;
                    if (fast == 1) {
                        speed = 0;
                    }

                    if (way != 'right') {
                        way = 'left';
                    }


                    if (id < 0) {
                        id = this.len - 1;
                    }
                    if (id > this.len - 1) {
                        id = 0;
                    }


                    this.current_id = id;

                    if (way == 'left') {


                        block_slider.find('.point').hide();
                        block_slider.find('.slider_wrapper').animate({left: "-150%"}, speed, function () {
                            block_slider.find('.slider_wrapper').css({left: "150%"})
                            block_slider.find('.slide').hide();
                            block_slider.find('.slide').eq(id).show();
                            block_slider.find('.point').removeClass('current');
                            block_slider.find('.point').eq(id).addClass('current');
                            block_slider.find('.slider_wrapper').animate({left: "0%"}, speed, function () {
                                block_slider.find('.point').show();

                            })

                        });

                    } else {

                        block_slider.find('.point').hide();
                        block_slider.find('.slider_wrapper').animate({left: "150%"}, speed, function () {

                            block_slider.find('.slider_wrapper').css({left: "-150%"})
                            block_slider.find('.slide').hide();
                            block_slider.find('.slide').eq(id).show();
                            block_slider.find('.point').removeClass('current');
                            block_slider.find('.point').eq(id).addClass('current');
                            block_slider.find('.slider_wrapper').animate({left: "0%"}, speed, function () {
                                block_slider.find('.point').show();

                            })

                        });

                    }

                },
                autoSlide: function () {
                    if (this.auto_slide == 1) {
                        var id = this.current_id;
                        id++;
                        if (id > this.len - 1) {
                            id = 0;
                        }
                        this.goToSlide(id);
                    }
                },
                eventListener: function () {
                    var self = this;
                    block_slider.unbind("swiperight");
                    block_slider.unbind("swipeleft");

                    block_slider.find('.point').unbind("click");
                    block_slider.find('.point').click(function () {
                        if (!$(this).hasClass('current')) {
                            self.goToSlide($(this).data('id'));
                        }
                        self.auto_slide = 0;
                        clearInterval(self.auto_slide_interval);

                    })

                    block_slider.find('.go_left, .go_right').unbind("click");
                    block_slider.find('.go_left, .go_right').click(function () {
                        var id = self.current_id;
                        if ($(this).hasClass('go_left')) {
                            id--;
                            if (id < 0) {
                                id = self.len - 1;
                            }
                        } else {
                            id++;
                            if (id > self.len - 1) {
                                id = 0;
                            }
                        }
                        var way = 'left';

                        if ($(this).hasClass('go_right')) {
                            way = 'right';

                        }

                        self.goToSlide(id, self.speed, way);
                        self.auto_slide = 0;
                        clearInterval(self.auto_slide_interval);
                    })

                    if ($(window).width() <= 800) {
                        block_slider.on('swiperight', function () {
                            block_slider.find('.go_right').click()
                        })
                        block_slider.on('swipeleft', function () {
                            block_slider.find('.go_left').click()
                        })
                    }

                },
                init: function (slide_id, auto_s) {
                    this.auto_slide = auto_s;
                    block_slider.find('.point').eq(0).addClass('current');
                    block_slider.find('.slide').hide();
                    block_slider.find('.slide').eq(0).show();
                    this.setScroller();
                    this.eventListener();
                    this.goToSlide(slide_id, 1);
                    var self = this;
                    if (typeof (window.tobiz.editor) === 'undefined') {
                        self.auto_slide_interval = setInterval(function () {
                            self.autoSlide();
                        }, self.lag)
                    }
                }
            }
            window.tobiz.slider129array[id].init(slide_id, auto_s);
        }
    }

    $('.section129').each(function () {
        console.log($(this));
        window.tobiz.slider129Init($(this).data('id'))
    })

    //============================
    window.tobiz.slider151array = new Object();
    window.tobiz.slider151Init = function (id) {
        var slide_id = 0;
        var auto_s = 1;
        if (!$('#b_' + id).hasClass('slider')) {
            return true;
        }



        var slide_class = '.slide';
        var slider_wrapper_class = '.slider_wrapper';

        if ($(window).width() <= 640) {
            $('#b_' + id).find(slide_class).show();
            slide_class = '.col_4';
            slider_wrapper_class = '.slider_wrapper';
        } else {
            $('#b_' + id).find('.col_4').show();
        }

        $('#b_' + id).find(slide_class).eq(0).show();


        if ($('#b_' + id).size()) {
            auto_s = $('#b_' + id).data('autoslide') * 1;

        }
        if (!(typeof (window.tobiz.slider151array[id]) === 'undefined')) {

            if (!(typeof (window.tobiz.slider151array[id].current_id) === 'undefined'))
                slide_id = window.tobiz.slider151array[id].current_id;
            auto_s = window.tobiz.slider151array[id].auto_slide;

            delete window.tobiz.slider151array[id];
        }

        if ($('#b_' + id).size()) {
            var block_slider = $('#b_' + id);
            window.tobiz.slider151array[id] = {
                len: block_slider.find(slide_class).size(),
                current_id: 0,
                auto_slide: block_slider.data('autoslide') * 1,
                auto_slide_interval: 'timeout',
                lag: 5000,
                speed: 750,
                setScroller: function () {
                    block_slider.find('.scroller').html('');
                    var len = block_slider.find(slide_class).size();
                    $.each(block_slider.find(slide_class), function (index, element) {
                        block_slider.find('.scroller').append('<div class="point" data-id="' + index + '"></div>')
                    })
                },
                goToSlide: function (id, fast, way) {
                    var speed = this.speed;
                    if (fast == 1) {
                        speed = 0;
                    }

                    if (way != 'right') {
                        way = 'left';
                    }


                    if (id < 0) {
                        id = this.len - 1;
                    }
                    if (id > this.len - 1) {
                        id = 0;
                    }


                    this.current_id = id;

                    if (way == 'left') {


                        block_slider.find(slider_wrapper_class).animate({left: "-100%"}, speed, function () {

                            block_slider.find(slider_wrapper_class).css({left: "100%"})
                            block_slider.find(slide_class).hide();
                            block_slider.find(slide_class).eq(id).show();
                            block_slider.find('.point').removeClass('current');
                            block_slider.find('.point').eq(id).addClass('current');
                            block_slider.find(slider_wrapper_class).animate({left: "0%"}, speed)

                        });

                    } else {

                        block_slider.find(slider_wrapper_class).animate({left: "+100%"}, speed, function () {

                            block_slider.find(slider_wrapper_class).css({left: "-100%"})
                            block_slider.find(slide_class).hide();
                            block_slider.find(slide_class).eq(id).show();
                            block_slider.find('.point').removeClass('current');
                            block_slider.find('.point').eq(id).addClass('current');
                            block_slider.find(slider_wrapper_class).animate({left: "0%"}, speed)

                        });

                    }

                },
                autoSlide: function () {
                    if (this.auto_slide == 1 && $(window).width() > 900) {
                        var id = this.current_id;
                        id++;
                        if (id > this.len - 1) {
                            id = 0;
                        }
                        this.goToSlide(id);
                    }
                },
                eventListener: function () {
                    var self = this;
                    block_slider.unbind("swiperight");
                    block_slider.unbind("swipeleft");

                    block_slider.find('.point').unbind("click");

                    block_slider.find('.point').click(function () {
                        if (!$(this).hasClass('current')) {
                            self.goToSlide($(this).data('id'));
                        }
                        self.auto_slide = 0;
                        clearInterval(self.auto_slide_interval);

                    })
                    block_slider.find('.go_left, .go_right').unbind("click");

                    block_slider.find('.go_left, .go_right').click(function () {
                        var id = self.current_id;
                        if ($(this).hasClass('go_left')) {
                            id--;
                            if (id < 0) {
                                id = self.len - 1;
                            }
                        } else {
                            id++;
                            if (id > self.len - 1) {
                                id = 0;
                            }
                        }
                        var way = 'left';

                        if ($(this).hasClass('go_right')) {
                            way = 'right';

                        }

                        self.goToSlide(id, self.speed, way);
                        self.auto_slide = 0;
                        clearInterval(self.auto_slide_interval);
                    })

                    if ($(window).width() <= 800) {
                        block_slider.on('swiperight', function () {
                            block_slider.find('.go_right').click()
                        })
                        block_slider.on('swipeleft', function () {
                            block_slider.find('.go_left').click()
                        })
                    }

                },
                init: function (slide_id, auto_s) {
                    this.auto_slide = auto_s;
                    block_slider.find('.point').eq(0).addClass('current');
                    block_slider.find(slide_class).hide();
                    block_slider.find(slide_class).eq(0).show();
                    this.setScroller();
                    this.eventListener();
                    this.goToSlide(slide_id, 1);
                    var self = this;
                    if (typeof (window.tobiz.editor) === 'undefined') {
                        self.auto_slide_interval = setInterval(function () {
                            self.autoSlide();
                        }, self.lag)
                    }
                }
            }
            window.tobiz.slider151array[id].init(slide_id, auto_s);
        }
    }

    $('.section151').each(function () {
//        console.log($(this));
        window.tobiz.slider151Init($(this).data('id'))
    })
    //============================

    //============================
    window.tobiz.slider160array = new Object();
    window.tobiz.slider160Init = function (id) {
        var slide_id = 0;
        var auto_s = 1;
        if (!$('#b_' + id).hasClass('slider')) {
            return true;
        }



        var slide_class = '.slide';
        var slider_wrapper_class = '.slider_wrapper';

        if ($(window).width() <= 640) {
            $('#b_' + id).find(slide_class).show();
            slide_class = '.col_4';
            slider_wrapper_class = '.slider_wrapper';
        } else {
            $('#b_' + id).find('.col_4').show();
        }

        $('#b_' + id).find(slide_class).eq(0).show();


        if ($('#b_' + id).size()) {
            auto_s = $('#b_' + id).data('autoslide') * 1;

        }
        if (!(typeof (window.tobiz.slider160array[id]) === 'undefined')) {

            if (!(typeof (window.tobiz.slider160array[id].current_id) === 'undefined'))
                slide_id = window.tobiz.slider160array[id].current_id;

            auto_s = window.tobiz.slider160array[id].auto_slide;

            if (!(typeof (window.tobiz.slider160array[id].auto_slide_interval) === 'undefined'))
                clearInterval(window.tobiz.slider160array[id].auto_slide_interval);


            delete window.tobiz.slider160array[id];
        }

        if ($('#b_' + id).size()) {
            var block_slider = $('#b_' + id);
            window.tobiz.slider160array[id] = {
                len: block_slider.find(slide_class).size(),
                current_id: 0,
                auto_slide: block_slider.data('autoslide') * 1,
                auto_slide_interval: 'timeout',
                lag: 5000,
                speed: 500,
                setScroller: function () {
                    block_slider.find('.scroller').html('');
                    var len = block_slider.find(slide_class).size();
                    $.each(block_slider.find(slide_class), function (index, element) {
                        block_slider.find('.scroller').append('<div class="point" data-id="' + index + '"></div>')
                    })
                },
                goToSlide: function (id, fast, way) {
                    var speed = this.speed;
                    if (fast == 1) {
                        speed = 0;
                    }

                    if (way != 'right') {
                        way = 'left';
                    }


                    if (id < 0) {
                        id = this.len - 1;
                    }
                    if (id > this.len - 1) {
                        id = 0;
                    }


                    this.current_id = id;

                    if (way == 'left') {


                        block_slider.find(slider_wrapper_class).animate({top: "-10%", opacity: "0"}, speed, function () {

                            block_slider.find(slider_wrapper_class).css({top: "10%", opacity: "0"})
                            block_slider.find(slide_class).hide();
                            block_slider.find(slide_class).eq(id).show();
                            block_slider.find('.point').removeClass('current');
                            block_slider.find('.point').eq(id).addClass('current');
                            block_slider.find(slider_wrapper_class).animate({top: "0%", opacity: "1"}, speed)

                        });

                    } else {

                        block_slider.find(slider_wrapper_class).animate({top: "+10%"}, speed, function () {

                            block_slider.find(slider_wrapper_class).css({top: "-10%"})
                            block_slider.find(slide_class).hide();
                            block_slider.find(slide_class).eq(id).show();
                            block_slider.find('.point').removeClass('current');
                            block_slider.find('.point').eq(id).addClass('current');
                            block_slider.find(slider_wrapper_class).animate({top: "0%"}, speed)

                        });

                    }

                },
                autoSlide: function () {
                    if (this.auto_slide == 1 && $(window).width() > 900) {
                        var id = this.current_id;
                        id++;
                        if (id > this.len - 1) {
                            id = 0;
                        }
                        this.goToSlide(id);
                    }
                },
                eventListener: function () {
                    var self = this;
                    block_slider.find('.point').unbind("click");

                    block_slider.find('.point').click(function () {
                        if (!$(this).hasClass('current')) {
                            self.goToSlide($(this).data('id'));
                        }
                        self.auto_slide = 0;
                        clearInterval(self.auto_slide_interval);

                    })
                    block_slider.find('.go_left, .go_right').unbind("click");

                    block_slider.find('.go_left, .go_right').click(function () {
                        var id = self.current_id;
                        if ($(this).hasClass('go_left')) {
                            id--;
                            if (id < 0) {
                                id = self.len - 1;
                            }
                        } else {
                            id++;
                            if (id > self.len - 1) {
                                id = 0;
                            }
                        }
                        var way = 'left';

                        if ($(this).hasClass('go_right')) {
                            way = 'right';

                        }

                        self.goToSlide(id, self.speed, way);
                        self.auto_slide = 0;
                        clearInterval(self.auto_slide_interval);
                    })

                },
                init: function (slide_id, auto_s) {
                    this.auto_slide = auto_s;
                    block_slider.find('.point').eq(0).addClass('current');
                    block_slider.find(slide_class).hide();
                    block_slider.find(slide_class).eq(0).show();
                    this.setScroller();
                    this.eventListener();
                    this.goToSlide(slide_id, 1);
                    var self = this;
                    if (typeof (window.tobiz.editor) === 'undefined') {
                        self.auto_slide_interval = setInterval(function () {
                            self.autoSlide();
                        }, self.lag)
                    }
                }
            }
            window.tobiz.slider160array[id].init(slide_id, auto_s);
        }
    }

    $('.section160').each(function () {
//        console.log($(this));
        window.tobiz.slider160Init($(this).data('id'))
    })
    //============================


    window.tobiz.slider320array = new Object();
    window.tobiz.slider320Init = function (id) {
        var slide_id = 0;
        var auto_s = 1;
        if (!$('#b_' + id).hasClass('slider')) {
            return true;
        }



        var slide_class = '.slide';

//        if ($(window).width() <= 640) {
//            $('#b_' + id).find(slide_class).show();
//            slide_class = '.col_4';
//        } else {
//            $('#b_' + id).find('.col_4').show();
//        }

        $('#b_' + id).find(slide_class).eq(0).show();


        if ($('#b_' + id).size()) {
            auto_s = $('#b_' + id).data('autoslide') * 1;

        }
        if (!(typeof (window.tobiz.slider320array[id]) === 'undefined')) {

            if (!(typeof (window.tobiz.slider320array[id].current_id) === 'undefined'))
                slide_id = window.tobiz.slider320array[id].current_id;

            auto_s = window.tobiz.slider320array[id].auto_slide;

            if (!(typeof (window.tobiz.slider320array[id].auto_slide_interval) === 'undefined'))
                clearInterval(window.tobiz.slider320array[id].auto_slide_interval);

            delete window.tobiz.slider320array[id];
        }

        if ($('#b_' + id).size()) {
            var block_slider = $('#b_' + id);
            window.tobiz.slider320array[id] = {
                len: block_slider.find(slide_class).size(),
                current_id: 0,
                auto_slide: block_slider.data('autoslide') * 1,
                auto_slide_interval: 'timeout',
                lag: 5000,
                speed: 750,
                setScroller: function () {
                    block_slider.find('.scroller').html('');
                    var len = block_slider.find(slide_class).size();
                    $.each(block_slider.find(slide_class), function (index, element) {
                        block_slider.find('.scroller').append('<div class="point" data-id="' + index + '"></div>')
                    })
                },
                goToSlide: function (id, fast, way) {
                    var speed = this.speed;
                    if (fast == 1) {
                        speed = 0;
                    }
                    if (way != 'right') {
                        way = 'left';
                    }
                    if (id < 0) {
                        id = this.len - 1;
                    }
                    if (id > this.len - 1) {
                        id = 0;
                    }
                    this.current_id = id;
                    if (way == 'left') {
                        block_slider.find('.slider_wrapper').animate({left: "-100%"}, speed, function () {
                            block_slider.find('.slider_wrapper').css({left: "100%"})
                            block_slider.find(slide_class).hide();
                            block_slider.find(slide_class).eq(id).show();
                            block_slider.find('.point').removeClass('current');
                            block_slider.find('.point').eq(id).addClass('current');
                            block_slider.find('.slider_wrapper').animate({left: "0%"}, speed)
                        });
                    } else {

                        block_slider.find('.slider_wrapper').animate({left: "+100%"}, speed, function () {

                            block_slider.find('.slider_wrapper').css({left: "-100%"})
                            block_slider.find(slide_class).hide();
                            block_slider.find(slide_class).eq(id).show();
                            block_slider.find('.point').removeClass('current');
                            block_slider.find('.point').eq(id).addClass('current');
                            block_slider.find('.slider_wrapper').animate({left: "0%"}, speed)
                        });
                    }
                },
                autoSlide: function () {
                    if (this.auto_slide == 1 && $(window).width() > 900) {
                        var id = this.current_id;
                        id++;
                        if (id > this.len - 1) {
                            id = 0;
                        }
                        this.goToSlide(id);
                    }
                },
                eventListener: function () {
                    var self = this;
                    block_slider.find(slide_class).unbind("swiperight");
                    block_slider.find(slide_class).unbind("swipeleft");
                    block_slider.find('.point').unbind("click");
                    block_slider.find('.point').click(function () {
                        if (!$(this).hasClass('current')) {
                            self.goToSlide($(this).data('id'));
                        }
                        self.auto_slide = 0;
                        clearInterval(self.auto_slide_interval);

                    })
                    block_slider.find('.go_left, .go_right').unbind("click");
                    block_slider.find('.go_left, .go_right').click(function () {
                        var id = self.current_id;
                        if ($(this).hasClass('go_left')) {
                            id--;
                            if (id < 0) {
                                id = self.len - 1;
                            }
                        } else {
                            id++;
                            if (id > self.len - 1) {
                                id = 0;
                            }
                        }
                        var way = 'left';

                        if ($(this).hasClass('go_right')) {
                            way = 'right';

                        }

                        self.goToSlide(id, self.speed, way);
                        self.auto_slide = 0;
                        clearInterval(self.auto_slide_interval);
                    })
                    if ($(window).width() <= 800) {
                        block_slider.find(slide_class).on('swiperight', function () {
                            block_slider.find('.go_right').click()
                        })
                        block_slider.find(slide_class).on('swipeleft', function () {
                            block_slider.find('.go_left').click()
                        })
                    }
                },
                init: function (slide_id, auto_s) {
                    this.auto_slide = auto_s;
                    block_slider.find('.point').eq(0).addClass('current');
                    block_slider.find(slide_class).hide();
                    block_slider.find(slide_class).eq(0).show();
                    this.setScroller();
                    this.eventListener();
                    this.goToSlide(slide_id, 1);
                    var self = this;
                    if (typeof (window.tobiz.editor) === 'undefined') {
                        self.auto_slide_interval = setInterval(function () {
                            self.autoSlide();
                        }, self.lag)
                    }
                }
            }
            window.tobiz.slider320array[id].init(slide_id, auto_s);
        }
    }

    $('.section320').each(function () {
//        console.log($(this));
        window.tobiz.slider320Init($(this).data('id'))
    })
    //============================
    window.tobiz.slider149array = new Object();
    window.tobiz.slider149Init = function (id) {
        var slide_id = 0;
        var auto_s = 1;

        if (!$('#b_' + id).hasClass('slider')) {
            return true;
        }

        var slide_class = '.slide';
        if ($(window).width() <= 640) {
            $('#b_' + id).find(slide_class).show();
            slide_class = '.col_3';
        } else {
            $('#b_' + id).find('.col_3').show();
        }

        $('#b_' + id).find(slide_class).eq(0).show();


        if ($('#b_' + id).size()) {
            auto_s = $('#b_' + id).data('autoslide') * 1;

        }
        if (!(typeof (window.tobiz.slider149array[id]) === 'undefined')) {

            if (!(typeof (window.tobiz.slider149array[id].current_id) === 'undefined'))
                slide_id = window.tobiz.slider149array[id].current_id;

            auto_s = window.tobiz.slider149array[id].auto_slide;

            if (!(typeof (window.tobiz.slider149array[id].auto_slide_interval) === 'undefined'))
                clearInterval(window.tobiz.slider149array[id].auto_slide_interval);

            delete window.tobiz.slider149array[id];
        }

        if ($('#b_' + id).size()) {
            var block_slider = $('#b_' + id);
            window.tobiz.slider149array[id] = {
                len: block_slider.find(slide_class).size(),
                current_id: 0,
                auto_slide: block_slider.data('autoslide') * 1,
                auto_slide_interval: 'timeout',
                lag: 5000,
                speed: 750,
                setScroller: function () {
                    block_slider.find('.scroller').html('');
                    var len = block_slider.find(slide_class).size();
                    $.each(block_slider.find(slide_class), function (index, element) {
                        block_slider.find('.scroller').append('<div class="point" data-id="' + index + '"></div>')
                    })
                },
                goToSlide: function (id, fast, way) {
                    var speed = this.speed;
                    if (fast == 1) {
                        speed = 0;
                    }

                    if (way != 'right') {
                        way = 'left';
                    }


                    if (id < 0) {
                        id = this.len - 1;
                    }
                    if (id > this.len - 1) {
                        id = 0;
                    }


                    this.current_id = id;

                    if (way == 'left') {

                        block_slider.find('.point').hide();
                        block_slider.find('.slider_wrapper').animate({left: "-100%"}, speed, function () {
                            block_slider.find('.slider_wrapper').css({left: "100%"})
                            block_slider.find(slide_class).hide();
                            block_slider.find(slide_class).eq(id).show();
                            block_slider.find('.point').removeClass('current');
                            block_slider.find('.point').eq(id).addClass('current');
                            block_slider.find('.slider_wrapper').animate({left: "0%"}, speed, function () {
                                block_slider.find('.point').show();
                            })

                        });

                    } else {
                        block_slider.find('.point').hide();
                        block_slider.find('.slider_wrapper').animate({left: "+100%"}, speed, function () {

                            block_slider.find('.slider_wrapper').css({left: "-100%"})
                            block_slider.find(slide_class).hide();
                            block_slider.find(slide_class).eq(id).show();
                            block_slider.find('.point').removeClass('current');
                            block_slider.find('.point').eq(id).addClass('current');
                            block_slider.find('.slider_wrapper').animate({left: "0%"}, speed, function () {
                                block_slider.find('.point').show();

                            })

                        });

                    }

                },
                autoSlide: function () {
                    if (this.auto_slide == 1) {
                        var id = this.current_id;
                        id++;
                        if (id > this.len - 1) {
                            id = 0;
                        }
                        this.goToSlide(id);
                    }
                },
                eventListener: function () {
                    var self = this;
                    block_slider.unbind("swiperight");
                    block_slider.unbind("swipeleft");
                    block_slider.find('.point').unbind("click");
                    block_slider.find('.point').click(function () {
                        if (!$(this).hasClass('current')) {
                            self.goToSlide($(this).data('id'));
                        }
                        self.auto_slide = 0;
                        clearInterval(self.auto_slide_interval);

                    })
                    block_slider.find('.go_left, .go_right').unbind("click");
                    block_slider.find('.go_left, .go_right').click(function () {
                        var id = self.current_id;
                        if ($(this).hasClass('go_left')) {
                            id--;
                            if (id < 0) {
                                id = self.len - 1;
                            }
                        } else {
                            id++;
                            if (id > self.len - 1) {
                                id = 0;
                            }
                        }
                        var way = 'left';

                        if ($(this).hasClass('go_right')) {
                            way = 'right';

                        }

                        self.goToSlide(id, self.speed, way);
                        self.auto_slide = 0;
                        clearInterval(self.auto_slide_interval);
                    })
                    if ($(window).width() <= 800) {
                        block_slider.on('swiperight', function () {
                            block_slider.find('.go_right').click()
                        })
                        block_slider.on('swipeleft', function () {
                            block_slider.find('.go_left').click()
                        })
                    }

                },
                init: function (slide_id, auto_s) {
                    this.auto_slide = auto_s;
                    block_slider.find('.point').eq(0).addClass('current');
                    block_slider.find(slide_class).hide();
                    block_slider.find(slide_class).eq(0).show();
                    this.setScroller();
                    this.eventListener();
                    this.goToSlide(slide_id, 1);
                    var self = this;
                    if (typeof (window.tobiz.editor) === 'undefined') {
                        self.auto_slide_interval = setInterval(function () {
                            self.autoSlide();
                        }, self.lag)
                    }
                }
            }
            window.tobiz.slider149array[id].init(slide_id, auto_s);
        }
    }

    $('.section149').each(function () {
//        console.log($(this));
        window.tobiz.slider149Init($(this).data('id'))
    })
    //============================
    window.tobiz.slider118array = new Object();
    window.tobiz.slider118Init = function (id) {
        var slide_id = 0;
        var auto_s = 1;

        if (!$('#b_' + id).hasClass('slider')) {
            return true;
        }

        var slide_class = '.slide';
        if ($(window).width() <= 800) {
            $('#b_' + id).find(slide_class).show();
            slide_class = '.col_3';
        } else {
            $('#b_' + id).find('.col_3').show();
        }

        $('#b_' + id).find(slide_class).eq(0).show();



        if ($('#b_' + id).size()) {
            auto_s = $('#b_' + id).data('autoslide') * 1;

        }
        if (!(typeof (window.tobiz.slider118array[id]) === 'undefined')) {

            if (!(typeof (window.tobiz.slider118array[id].current_id) === 'undefined'))
                slide_id = window.tobiz.slider118array[id].current_id;

            auto_s = window.tobiz.slider118array[id].auto_slide;

            if (!(typeof (window.tobiz.slider118array[id].auto_slide_interval) === 'undefined'))
                clearInterval(window.tobiz.slider118array[id].auto_slide_interval);

            delete window.tobiz.slider118array[id];
        }

        if ($('#b_' + id).size()) {
            var block_slider = $('#b_' + id);




            window.tobiz.slider118array[id] = {
                len: block_slider.find(slide_class).size(),
                current_id: 0,
                auto_slide: block_slider.data('autoslide') * 1,
                auto_slide_interval: 'timeout',
                lag: 5000,
                speed: 750,
                setScroller: function () {
                    block_slider.find('.scroller').html('');
                    var len = block_slider.find(slide_class).size();
                    $.each(block_slider.find(slide_class), function (index, element) {
                        block_slider.find('.scroller').append('<div class="point" data-id="' + index + '"></div>')
                    })
                },
                goToSlide: function (id, fast, way) {
                    var speed = this.speed;
                    if (fast == 1) {
                        speed = 0;
                    }

                    if (way != 'right') {
                        way = 'left';
                    }


                    if (id < 0) {
                        id = this.len - 1;
                    }
                    if (id > this.len - 1) {
                        id = 0;
                    }


                    this.current_id = id;

                    if (way == 'left') {

                        block_slider.find('.point').hide();
                        block_slider.find('.slider_wrapper').animate({left: "-100%"}, speed, function () {
                            block_slider.find('.slider_wrapper').css({left: "100%"})
                            block_slider.find(slide_class).hide();
                            block_slider.find(slide_class).eq(id).show();
                            block_slider.find('.point').removeClass('current');
                            block_slider.find('.point').eq(id).addClass('current');
                            block_slider.find('.slider_wrapper').animate({left: "0%"}, speed, function () {
                                block_slider.find('.point').show();
                            })

                        });

                    } else {
                        block_slider.find('.point').hide();
                        block_slider.find('.slider_wrapper').animate({left: "+100%"}, speed, function () {

                            block_slider.find('.slider_wrapper').css({left: "-100%"})
                            block_slider.find(slide_class).hide();
                            block_slider.find(slide_class).eq(id).show();
                            block_slider.find('.point').removeClass('current');
                            block_slider.find('.point').eq(id).addClass('current');
                            block_slider.find('.slider_wrapper').animate({left: "0%"}, speed, function () {
                                block_slider.find('.point').show();

                            })

                        });

                    }

                },
                autoSlide: function () {
                    if (this.auto_slide == 1) {
                        var id = this.current_id;
                        id++;
                        if (id > this.len - 1) {
                            id = 0;
                        }
                        this.goToSlide(id);
                    }
                },
                eventListener: function () {
                    var self = this;
                    block_slider.find(slide_class).unbind("swiperight");
                    block_slider.find(slide_class).unbind("swipeleft");

                    block_slider.find('.point').unbind("click");
                    block_slider.find('.point').click(function () {
                        if (!$(this).hasClass('current')) {
                            self.goToSlide($(this).data('id'));
                        }
                        self.auto_slide = 0;
                        clearInterval(self.auto_slide_interval);

                    })
                    block_slider.find('.go_left, .go_right').unbind("click");
                    block_slider.find('.go_left, .go_right').click(function () {
                        var id = self.current_id;
                        if ($(this).hasClass('go_left')) {
                            id--;
                            if (id < 0) {
                                id = self.len - 1;
                            }
                        } else {
                            id++;
                            if (id > self.len - 1) {
                                id = 0;
                            }
                        }
                        var way = 'left';

                        if ($(this).hasClass('go_right')) {
                            way = 'right';

                        }

                        self.goToSlide(id, self.speed, way);
                        self.auto_slide = 0;
                        clearInterval(self.auto_slide_interval);
                    })
                    if ($(window).width() <= 800) {
                        block_slider.find(slide_class).on('swiperight', function () {
                            block_slider.find('.go_right').click()
                        })
                        block_slider.find(slide_class).on('swipeleft', function () {
                            block_slider.find('.go_left').click()
                        })
                    }

                },
                init: function (slide_id, auto_s) {
                    this.auto_slide = auto_s;
                    block_slider.find('.point').eq(0).addClass('current');
                    block_slider.find(slide_class).hide();
                    block_slider.find(slide_class).eq(0).show();
                    this.setScroller();
                    this.eventListener();
                    this.goToSlide(slide_id, 1);
                    var self = this;
                    if (typeof (window.tobiz.editor) === 'undefined') {
                        self.auto_slide_interval = setInterval(function () {
                            self.autoSlide();
                        }, self.lag)
                    }
                }
            }
            window.tobiz.slider118array[id].init(slide_id, auto_s);
        }
    }

    $('.section118').each(function () {
//        console.log($(this));
        window.tobiz.slider118Init($(this).data('id'))
    })


    //============================


    window.tobiz.slider312array = new Object();
    window.tobiz.slider312Init = function (id) {
        var slide_id = 0;
        var auto_s = 1;
        if ($('#b_' + id).size()) {
            auto_s = $('#b_' + id).data('autoslide') * 1;

        }
        if (!(typeof (window.tobiz.slider312array[id]) === 'undefined')) {

            if (!(typeof (window.tobiz.slider312array[id].current_id) === 'undefined'))
                slide_id = window.tobiz.slider312array[id].current_id;

            auto_s = window.tobiz.slider312array[id].auto_slide;

            if (!(typeof (window.tobiz.slider312array[id].auto_slide_interval) === 'undefined'))
                clearInterval(window.tobiz.slider312array[id].auto_slide_interval);


            delete window.tobiz.slider312array[id];
        }

        if ($('#b_' + id).size()) {
            var block_slider = $('#b_' + id);
            window.tobiz.slider312array[id] = {
                width: block_slider.find('.section_inner').width(),
                height: block_slider.find('.slider').height(),
                len: block_slider.find('.slide').size(),
                current_id: 0,
                auto_slide: block_slider.data('autoslide') * 1,
                auto_slide_interval: 'timeout',
                lag: 6000,
                setScroller: function () {
                    block_slider.find('.scroller').html('');
                    var len = block_slider.find('.slide').size();
                    $.each(block_slider.find('.slide'), function (index, element) {
                        block_slider.find('.scroller').append('<div class="point" data-id="' + index + '"></div>')
                    })
                },
                goToSlide: function (id, fast) {
                    var speed = 500;
                    if (fast == 1) {
                        speed = 0;
                    }

                    if (id < 0) {
                        id = this.len - 1;
                    }
                    if (id > this.len - 1) {
                        id = 0;
                    }


                    block_slider.find('.point').removeClass('current');
                    var pos = (-1 * (id * this.width)) + 'px';
                    block_slider.find('.slider_wrapper').animate({left: pos}, speed);
                    this.current_id = id;
                    block_slider.find('.point').eq(id).addClass('current');


                },
                autoSlide: function () {
                    if (this.auto_slide == 1) {
                        var id = this.current_id;
                        id++;
                        if (id > this.len - 1) {
                            id = 0;
                        }
                        this.goToSlide(id);
                    }
                },
                eventListener: function () {
                    var self = this;
                    block_slider.find('.point').unbind("click");
                    block_slider.find('.point').click(function () {
                        if (!$(this).hasClass('current')) {
                            self.goToSlide($(this).data('id'));
                        }
                        self.auto_slide = 0;
                        clearInterval(self.auto_slide_interval);

                    })
                    block_slider.find('.go_left, .go_right').unbind("click");
                    block_slider.find('.go_left, .go_right').click(function () {
                        var id = self.current_id;
                        if ($(this).hasClass('go_left')) {
                            id--;
                            if (id < 0) {
                                id = self.len - 1;
                            }
                        } else {
                            id++;
                            if (id > self.len - 1) {
                                id = 0;
                            }
                        }
                        self.goToSlide(id);
                        self.auto_slide = 0;
                        clearInterval(self.auto_slide_interval);
                    })
                },
                init: function (slide_id, auto_s) {
                    this.auto_slide = auto_s;
                    block_slider.find('.point').eq(0).addClass('current');
                    block_slider.find('.slider_wrapper').css({width: this.width * this.len, height: this.height});
                    block_slider.find('.slide').css({width: this.width});
                    block_slider.find('.arr1').css({width: this.width});
                    this.setScroller();
                    this.eventListener();
                    this.goToSlide(slide_id, 1);
                    var self = this;
                    if (typeof (window.tobiz.editor) === 'undefined') {
                        self.auto_slide_interval = setInterval(function () {
                            self.autoSlide();
                        }, self.lag)
                    }
                }
            }
            window.tobiz.slider312array[id].init(slide_id, auto_s);
        }
    }

    $('.section312').each(function () {
//        console.log($(this));
        window.tobiz.slider312Init($(this).data('id'))
    })

    window.tobiz.slider334array = new Object();
    window.tobiz.slider334Init = function (id) {
        var slide_id = 0;
        var auto_s = 1;
        if ($('#b_' + id).size()) {
            auto_s = $('#b_' + id).data('autoslide') * 1;

        }
        if (!(typeof (window.tobiz.slider334array[id]) === 'undefined')) {

            if (!(typeof (window.tobiz.slider334array[id].current_id) === 'undefined'))
                slide_id = window.tobiz.slider334array[id].current_id;

            auto_s = window.tobiz.slider334array[id].auto_slide;

            if (!(typeof (window.tobiz.slider334array[id].auto_slide_interval) === 'undefined'))
                clearInterval(window.tobiz.slider334array[id].auto_slide_interval);


            delete window.tobiz.slider334array[id];
        }

        if ($('#b_' + id).size()) {
            var block_slider = $('#b_' + id);
            window.tobiz.slider334array[id] = {
                width: block_slider.find('.section_inner').width(),
                height: block_slider.find('.slider').height(),
                len: block_slider.find('.slide').size(),
                current_id: 0,
                auto_slide: block_slider.data('autoslide') * 1,
                auto_slide_interval: 'timeout',
                lag: 6000,
                setScroller: function () {
                    block_slider.find('.scroller').html('');
                    var len = block_slider.find('.slide').size();
                    $.each(block_slider.find('.slide'), function (index, element) {
                        block_slider.find('.scroller').append('<div class="point" data-id="' + index + '"></div>')
                    })
                },
                goToSlide: function (id, fast) {
                    var speed = 500;
                    if (fast == 1) {
                        speed = 0;
                    }

                    if (id < 0) {
                        id = this.len - 1;
                    }
                    if (id > this.len - 1) {
                        id = 0;
                    }


                    block_slider.find('.point').removeClass('current');
                    var pos = (-1 * (id * this.width)) + 'px';
                    block_slider.find('.slider_wrapper').animate({left: pos}, speed);
                    this.current_id = id;
                    block_slider.find('.point').eq(id).addClass('current');


                },
                autoSlide: function () {
                    if (this.auto_slide == 1) {
                        var id = this.current_id;
                        id++;
                        if (id > this.len - 1) {
                            id = 0;
                        }
                        this.goToSlide(id);
                    }
                },
                eventListener: function () {
                    var self = this;
                    block_slider.find('.point').unbind("click");
                    block_slider.find('.point').click(function () {
                        if (!$(this).hasClass('current')) {
                            self.goToSlide($(this).data('id'));
                        }
                        self.auto_slide = 0;
                        clearInterval(self.auto_slide_interval);

                    })
                    block_slider.find('.go_left, .go_right').unbind("click");
                    block_slider.find('.go_left, .go_right').click(function () {
                        var id = self.current_id;
                        if ($(this).hasClass('go_left')) {
                            id--;
                            if (id < 0) {
                                id = self.len - 1;
                            }
                        } else {
                            id++;
                            if (id > self.len - 1) {
                                id = 0;
                            }
                        }
                        self.goToSlide(id);
                        self.auto_slide = 0;
                        clearInterval(self.auto_slide_interval);
                    })
                },
                init: function (slide_id, auto_s) {
                    this.auto_slide = auto_s;
                    block_slider.find('.point').eq(0).addClass('current');
                    block_slider.find('.slider_wrapper').css({width: this.width * this.len, height: this.height});
                    block_slider.find('.slide').css({width: this.width});
                    block_slider.find('.arr1').css({width: this.width});
                    this.setScroller();
                    this.eventListener();
                    this.goToSlide(slide_id, 1);
                    var self = this;
                    if (typeof (window.tobiz.editor) === 'undefined') {
                        self.auto_slide_interval = setInterval(function () {
                            self.autoSlide();
                        }, self.lag)
                    }
                }
            }
            window.tobiz.slider334array[id].init(slide_id, auto_s);
        }
    }

    $('.section334').each(function () {
//        console.log($(this));
        window.tobiz.slider334Init($(this).data('id'))
    })





    window.tobiz.slider156array = new Object();
    window.tobiz.slider156Init = function (id) {
        var slide_id = 0;
        var auto_s = 1;
        if ($('#b_' + id).size()) {
            auto_s = $('#b_' + id).data('autoslide') * 1;

        }
        if (!(typeof (window.tobiz.slider156array[id]) === 'undefined')) {

            if (!(typeof (window.tobiz.slider156array[id].current_id) === 'undefined'))
                slide_id = window.tobiz.slider156array[id].current_id;

            auto_s = window.tobiz.slider156array[id].auto_slide;

            if (!(typeof (window.tobiz.slider156array[id].auto_slide_interval) === 'undefined'))
                clearInterval(window.tobiz.slider156array[id].auto_slide_interval);

            delete window.tobiz.slider156array[id];
        }

        if ($('#b_' + id).size()) {
            var block_slider = $('#b_' + id);
            window.tobiz.slider156array[id] = {
                width: block_slider.find('.section_inner').width(),
                height: block_slider.find('.slider').height(),
                len: block_slider.find('.slide').size(),
                current_id: 0,
                auto_slide: block_slider.data('autoslide') * 1,
                auto_slide_interval: 'timeout',
                lag: 6000,
                setScroller: function () {
                    block_slider.find('.scroller').html('');
                    var len = block_slider.find('.slide').size();
                    $.each(block_slider.find('.slide'), function (index, element) {
                        block_slider.find('.scroller').append('<div class="point" data-id="' + index + '"></div>')
                    })
                },
                goToSlide: function (id, fast) {
                    var speed = 500;
                    if (fast == 1) {
                        speed = 0;
                    }

                    if (id < 0) {
                        id = this.len - 1;
                    }
                    if (id > this.len - 1) {
                        id = 0;
                    }


                    block_slider.find('.point').removeClass('current');
                    var pos = (-1 * (id * this.width)) + 'px';
                    block_slider.find('.slider_wrapper').animate({left: pos, opacity: 1}, speed);
                    this.current_id = id;
                    block_slider.find('.point').eq(id).addClass('current');


                },
                autoSlide: function () {
                    if (this.auto_slide == 1) {
                        var id = this.current_id;
                        id++;
                        if (id > this.len - 1) {
                            id = 0;
                        }
                        this.goToSlide(id);
                    }
                },
                eventListener: function () {
                    var self = this;
                    block_slider.unbind("swiperight");
                    block_slider.unbind("swipeleft");
                    block_slider.find('.point').unbind("click");
                    block_slider.find('.point').click(function () {
                        if (!$(this).hasClass('current')) {
                            self.goToSlide($(this).data('id'));
                        }
                        self.auto_slide = 0;
                        clearInterval(self.auto_slide_interval);

                    })
                    block_slider.find('.go_left, .go_right').unbind("click");
                    block_slider.find('.go_left, .go_right').click(function () {
                        console.log('fff');
                        var id = self.current_id;
                        if ($(this).hasClass('go_left')) {
                            id--;
                            if (id < 0) {
                                id = self.len - 1;
                            }
                        } else {
                            id++;
                            if (id > self.len - 1) {
                                id = 0;
                            }
                        }
                        self.goToSlide(id);
                        self.auto_slide = 0;
                        clearInterval(self.auto_slide_interval);
                    })

                    if ($(window).width() <= 800) {
                        block_slider.on('swiperight', function () {
                            block_slider.find('.go_right').click()
                        })
                        block_slider.on('swipeleft', function () {
                            block_slider.find('.go_left').click()
                        })
                    }

                },
                init: function (slide_id, auto_s) {
                    this.auto_slide = auto_s;
                    block_slider.find('.point').eq(0).addClass('current');
                    block_slider.find('.slider_wrapper').css({width: this.width * this.len, height: this.height});
                    block_slider.find('.slide').css({width: this.width});
                    block_slider.find('.arr1').css({width: this.width});
                    this.setScroller();
                    this.eventListener();
                    this.goToSlide(slide_id, 1);
                    var self = this;
                    if (typeof (window.tobiz.editor) === 'undefined') {
                        self.auto_slide_interval = setInterval(function () {
                            self.autoSlide();
                        }, self.lag)
                    }
                }
            }
            window.tobiz.slider156array[id].init(slide_id, auto_s);
        }
    }

    $('.section156').each(function () {
//        console.log($(this));
        window.tobiz.slider156Init($(this).data('id'))
    })


    window.tobiz.slider1156array = new Object();
    window.tobiz.slider1156Init = function (id) {
        var slide_id = 0;
        var auto_s = 1;
        if ($('#b_' + id).size()) {
            auto_s = $('#b_' + id).data('autoslide') * 1;

        }
        if (!(typeof (window.tobiz.slider1156array[id]) === 'undefined')) {

            if (!(typeof (window.tobiz.slider1156array[id].current_id) === 'undefined'))
                slide_id = window.tobiz.slider1156array[id].current_id;

            auto_s = window.tobiz.slider1156array[id].auto_slide;

            if (!(typeof (window.tobiz.slider1156array[id].auto_slide_interval) === 'undefined'))
                clearInterval(window.tobiz.slider1156array[id].auto_slide_interval);

            delete window.tobiz.slider1156array[id];
        }

        if ($('#b_' + id).size()) {
            var block_slider = $('#b_' + id);
            window.tobiz.slider1156array[id] = {
                width: block_slider.find('.section_inner').width(),
                height: block_slider.find('.slider').height(),
                len: block_slider.find('.slide').size(),
                current_id: 0,
                auto_slide: block_slider.data('autoslide') * 1,
                auto_slide_interval: 'timeout',
                lag: 6000,
                setScroller: function () {
                    block_slider.find('.scroller').html('');
                    var len = block_slider.find('.slide').size();
                    $.each(block_slider.find('.slide'), function (index, element) {
                        block_slider.find('.scroller').append('<div class="point" data-id="' + index + '"></div>')
                    })
                },
                goToSlide: function (id, fast) {
                    var speed = 500;
                    if (fast == 1) {
                        speed = 0;
                    }

                    if (id < 0) {
                        id = this.len - 1;
                    }
                    if (id > this.len - 1) {
                        id = 0;
                    }


                    block_slider.find('.point').removeClass('current');
                    var pos = (-1 * (id * this.width)) + 'px';
                    block_slider.find('.slider_wrapper').animate({left: pos, opacity: 1}, speed);
                    this.current_id = id;
                    block_slider.find('.point').eq(id).addClass('current');


                },
                autoSlide: function () {
                    if (this.auto_slide == 1) {
                        var id = this.current_id;
                        id++;
                        if (id > this.len - 1) {
                            id = 0;
                        }
                        this.goToSlide(id);
                    }
                },
                eventListener: function () {
                    var self = this;
                    block_slider.unbind("swiperight");
                    block_slider.unbind("swipeleft");
                    block_slider.find('.point').unbind("click");
                    block_slider.find('.point').click(function () {
                        if (!$(this).hasClass('current')) {
                            self.goToSlide($(this).data('id'));
                        }
                        self.auto_slide = 0;
                        clearInterval(self.auto_slide_interval);

                    })
                    block_slider.find('.go_left, .go_right').unbind("click");
                    block_slider.find('.go_left, .go_right').click(function () {

                        var id = self.current_id;
                        if ($(this).hasClass('go_left')) {
                            id--;
                            if (id < 0) {
                                id = self.len - 1;
                            }
                        } else {
                            id++;
                            if (id > self.len - 1) {
                                id = 0;
                            }
                        }
                        self.goToSlide(id);
                        self.auto_slide = 0;
                        clearInterval(self.auto_slide_interval);
                    })

                    if ($(window).width() <= 800) {
                        block_slider.on('swiperight', function () {
                            block_slider.find('.go_left').click()
                        })
                        block_slider.on('swipeleft', function () {
                            block_slider.find('.go_right').click()
                        })
                    }

                },
                init: function (slide_id, auto_s) {
                    this.auto_slide = auto_s;
                    block_slider.find('.point').eq(0).addClass('current');
                    block_slider.find('.slider_wrapper').css({width: this.width * this.len, height: this.height});
                    block_slider.find('.slide').css({width: this.width});
                    block_slider.find('.arr1').css({width: this.width});
                    this.setScroller();
                    this.eventListener();
                    this.goToSlide(slide_id, 1);
                    var self = this;
                    if (typeof (window.tobiz.editor) === 'undefined') {
                        self.auto_slide_interval = setInterval(function () {
                            self.autoSlide();
                        }, self.lag)
                    }
                }
            }
            window.tobiz.slider1156array[id].init(slide_id, auto_s);
        }
    }

    $('.section1156').each(function () {
//        console.log($(this));
        window.tobiz.slider1156Init($(this).data('id'))
    })





    window.tobiz.slider166array = new Object();
    window.tobiz.slider166Init = function (id) {
        var slide_id = 0;
        var auto_s = 1;
        if ($('#b_' + id).size()) {
            auto_s = $('#b_' + id).data('autoslide') * 1;

        }
        if (!(typeof (window.tobiz.slider166array[id]) === 'undefined')) {

            if (!(typeof (window.tobiz.slider166array[id].current_id) === 'undefined'))
                slide_id = window.tobiz.slider166array[id].current_id;

            auto_s = window.tobiz.slider166array[id].auto_slide;

            if (!(typeof (window.tobiz.slider166array[id].auto_slide_interval) === 'undefined'))
                clearInterval(window.tobiz.slider166array[id].auto_slide_interval);

            delete window.tobiz.slider166array[id];
        }

        if ($('#b_' + id).size()) {
            var block_slider = $('#b_' + id);
            window.tobiz.slider166array[id] = {
                width: block_slider.find('.section_inner').width(),
                height: block_slider.find('.slider').height(),
                len: block_slider.find('.slide').size(),
                current_id: 0,
                auto_slide: block_slider.data('autoslide') * 1,
                auto_slide_interval: 'timeout',
                lag: 6000,
                setScroller: function () {
                    block_slider.find('.scroller').html('');
                    var len = block_slider.find('.slide').size();
                    $.each(block_slider.find('.slide'), function (index, element) {
                        block_slider.find('.scroller').append('<div class="point" data-id="' + index + '"></div>')
                    })
                },
                goToSlide: function (id, fast) {
                    var speed = 500;
                    if (fast == 1) {
                        speed = 0;
                    }

                    if (id < 0) {
                        id = this.len - 1;
                    }
                    if (id > this.len - 1) {
                        id = 0;
                    }


                    block_slider.find('.point').removeClass('current');
                    var pos = (-1 * (id * this.width)) + 'px';
                    block_slider.find('.slider_wrapper').animate({left: pos, opacity: 1}, speed);
                    this.current_id = id;
                    block_slider.find('.point').eq(id).addClass('current');


                },
                autoSlide: function () {
                    if (this.auto_slide == 1) {
                        var id = this.current_id;
                        id++;
                        if (id > this.len - 1) {
                            id = 0;
                        }
                        this.goToSlide(id);
                    }
                },
                eventListener: function () {
                    var self = this;
                    block_slider.unbind("swiperight");
                    block_slider.unbind("swipeleft");
                    block_slider.find('.point').unbind("click");
                    block_slider.find('.point').click(function () {
                        if (!$(this).hasClass('current')) {
                            self.goToSlide($(this).data('id'));
                        }
                        self.auto_slide = 0;
                        clearInterval(self.auto_slide_interval);

                    })
                    block_slider.find('.go_left, .go_right').unbind("click");
                    block_slider.find('.go_left, .go_right').click(function () {
                        var id = self.current_id;
                        if ($(this).hasClass('go_left')) {
                            id--;
                            if (id < 0) {
                                id = self.len - 1;
                            }
                        } else {
                            id++;
                            if (id > self.len - 1) {
                                id = 0;
                            }
                        }
                        self.goToSlide(id);
                        self.auto_slide = 0;
                        clearInterval(self.auto_slide_interval);
                    })

                    if ($(window).width() <= 800) {
                        block_slider.on('swiperight', function () {
                            block_slider.find('.go_right').click()
                        })
                        block_slider.on('swipeleft', function () {
                            block_slider.find('.go_left').click()
                        })
                    }

                },
                init: function (slide_id, auto_s) {
                    this.auto_slide = auto_s;
                    block_slider.find('.point').eq(0).addClass('current');
                    block_slider.find('.slider_wrapper').css({width: this.width * this.len, height: this.height});
                    block_slider.find('.slide').css({width: this.width});
                    block_slider.find('.arr1').css({width: this.width});
                    this.setScroller();
                    this.eventListener();
                    this.goToSlide(slide_id, 1);
                    var self = this;
                    if (typeof (window.tobiz.editor) === 'undefined') {
                        self.auto_slide_interval = setInterval(function () {
                            self.autoSlide();
                        }, self.lag)
                    }
                }
            }
            window.tobiz.slider166array[id].init(slide_id, auto_s);
        }
    }

//

    window.tobiz.section1307Init = function (id) {

        var block_calc_id = '#b_' + id;

        var results = $(block_calc_id).find('.calc_result');

        var r = [];
        $.each(results, function (i, el) {

            var formula = $(el).data('formula');

            formula = formula.toLowerCase();
            var data = JSON.parse(decodeURIComponent($(el).data('params')));

            $.each(data, function (j, p) {

                if (p.type == 'select' || p.type == 'checkbox' || p.type == 'radio' || p.type == 'number' || p.type == 'range') {
                    var letter = String.fromCharCode(97 + j);
                    if (p.type == 'number') {
                        var val = parseFloat($(block_calc_id).find('.field').eq(j).find('input').val());
                        if (!val) {
                            val = 0;
                        }
                        val = val + '';
                    }
                    if (p.type == 'checkbox') {
                        var val = 0;
                        _.each($(block_calc_id).find('.field').eq(j).find('input:checked'), function (v) {
                            if ($(v).val()) {
                                val += parseFloat($(v).val());
                            }

                        })
                        val = val + '';

                    }
                    if (p.type == 'radio') {
                        var val = parseFloat($(block_calc_id).find('.field').eq(j).find('input:checked').val());
                        if (!val) {
                            val = 0;
                        }
                        val = val + '';

                    }
                    if (p.type == 'range') {
                        var val = parseFloat($(block_calc_id).find('.field').eq(j).find('input').val());
                        if (!val) {
                            val = 0;
                        }
                        val = val + '';

                    }
                    if (p.type == 'select') {
                        var val = parseFloat($(block_calc_id).find('.field').eq(j).find('option:selected').val());
                        if (!val) {
                            val = 0;
                        }
                        val = val + '';

                    }

                    var regex = new RegExp(letter, "gi");

                    formula = formula.replace(regex, val)


                }


            })

            $.each(r, function (jj, el) {
                var r_letter = 'r' + (jj + 1);
                var regex = new RegExp(r_letter, "gi");
                formula = formula.replace(regex, r[jj]);


            })


            var result = 'Укажите параметры';
            try {
                result = Math.round(parseFloat(eval(formula)) * 100) / 100;

            } catch (e) {

            }
            r[i] = Math.round(parseFloat(result) * 100) / 100;
            $(el).text(result);

        })


        var results_input = $(block_calc_id).find('.total_block input[type="hidden"]');

        var r_i = [];
        $.each(results_input, function (i, el) {

            var formula = $(el).data('formula');

            formula = formula.toLowerCase();
            var data = JSON.parse(decodeURIComponent($(el).data('params')));

            $.each(data, function (j, p) {

                if (p.type == 'select' || p.type == 'checkbox' || p.type == 'radio' || p.type == 'number' || p.type == 'range') {
                    var letter = String.fromCharCode(97 + j);
                    if (p.type == 'number') {
                        var val = parseFloat($(block_calc_id).find('.field').eq(j).find('input').val());
                        if (!val) {
                            val = 0;
                        }
                        val = val + '';
                    }
                    if (p.type == 'checkbox') {
                        var val = 0;
                        _.each($(block_calc_id).find('.field').eq(j).find('input:checked'), function (v) {
                            if ($(v).val()) {
                                val += parseFloat($(v).val());
                            }

                        })
                        val = val + '';

                    }
                    if (p.type == 'radio') {
                        var val = parseFloat($(block_calc_id).find('.field').eq(j).find('input:checked').val());
                        if (!val) {
                            val = 0;
                        }
                        val = val + '';

                    }
                    if (p.type == 'range') {
                        var val = parseFloat($(block_calc_id).find('.field').eq(j).find('input').val());
                        if (!val) {
                            val = 0;
                        }
                        val = val + '';

                    }
                    if (p.type == 'select') {
                        var val = parseFloat($(block_calc_id).find('.field').eq(j).find('option:selected').val());
                        if (!val) {
                            val = 0;
                        }
                        val = val + '';

                    }

                    var regex = new RegExp(letter, "gi");

                    formula = formula.replace(regex, val)


                }


            })
            $.each(r_i, function (jj, el) {
                var r_letter = 'r' + (jj + 1);
                var regex = new RegExp(r_letter, "gi");
                formula = formula.replace(regex, r_i[jj]);


            })
            var results_input = '';
            try {
                results_input = Math.round(parseFloat(eval(formula)) * 100) / 100;

            } catch (e) {

            }
            r_i[i] = Math.round(parseFloat(results_input) * 100) / 100;
            $(el).val(results_input);
            if ($(el).hasClass('default_result')) {
                $(el).parent().parent().find('[data-amount]').eq(0).attr('data-amount', results_input);
            }
        })

        window.tobiz.section1307Descr(id);

    }

    window.tobiz.section1307Descr = function (id) {
        console.log(8);
        var block_calc_id = '#b_' + id;
        var form = $(block_calc_id).find('form');


        form.find('input.select_descr___').remove();
        $.each(form.find('select'), function (index, element) {

            var title = $(element).closest('.field').find('.field_title').text() || 'Выбрана опция ' + index;


            var option_text = $(element).find('option:selected').eq(0).text();
            $(element).after('<input type="hidden" class="select_descr___" name="Выбрана опция (' + title + ')" value="' + option_text + '">')

        })
        form.find('input.radio_descr___').remove();
        $.each(form.find('input[type="radio"]'), function (index, element) {
            if ($(element).prop('checked')) {
                var title = $(element).closest('.field').find('.field_title').text() || 'Выбрана опция ' + index;
                var option_text = $(element).parent().find('.data_title').eq(0).text();
                $(element).siblings('label').after('<input type="hidden" class="radio_descr___" name="Выбрана опция (' + title + ')" value="' + option_text + '">')

            }

        })

    }




    $('.section166').each(function () {
//        console.log($(this));
        window.tobiz.slider166Init($(this).data('id'))
    })

    $('.section1307').each(function () {
        window.tobiz.section1307Init($(this).data('id'))
    })


    $(window).resize(function () {
        if (this.resizeTO)
            clearTimeout(this.resizeTO);
        this.resizeTO = setTimeout(function () {
            $(this).trigger('resizeComplete');
        }, 500);
    })



    $(window).bind('resizeComplete', function () {
//        console.log('!');

        delMobClass();

        
		not_menu();
        if ($(window).width() <= 840) {

            var inner_width = $('.section_inner').width();
            $('.table').each(function (i, e) {
                if ($(e).width() > inner_width) {
                    if (!$(this).parent().hasClass('table_wrap')) {
                        $(e).wrap('<div class="table_wrap table_wrap_' + i + '" style="overflow-y: scroll;overflow-x: visible; padding-top: 25px"></div>');
//                $('.table_wrap_' + i).prepend('<div style="font-size:12px;   line-height:1.3; padding:10px 0 5px;">Для просмотра всей таблицы двигайте пальцем по экрану влево и вправо</div>');
                        $('.table_wrap_' + i).prepend('<div style="display: flex; display: -webkit-flex; display: -webkit-box; position: absolute; top: 0px; left: 50%; -webkit-transform: translateX(-50%); transform: translateX(-50%); align-items: center;"><span style="display:block; -webkit-transform: rotate(90deg); margin-right: 10px;  transform: rotate(90deg); width: 15px; height: 15px; background:url(132290.lp.tobiz.net/img/editor_icons/downwards-pointer_1.svg) no-repeat center;  background-size: 100%;"></span><span class="finger_tap" style="display:block; width: 20px; height: 20px; background:url(132290.lp.tobiz.net/img/editor_icons/finger-tap.svg) no-repeat center; background-size: 100%;"></span><span style="display:block; margin-left: 10px; -webkit-transform: rotate(-90deg);   transform: rotate(-90deg); width: 15px; height: 15px; background:url(132290.lp.tobiz.net/img/editor_icons/downwards-pointer_1.svg) no-repeat center;  background-size: 100%;"></span> </div>');
                    }
                }
            });
        }


        $('.section320').each(function () {
            window.tobiz.slider320Init($(this).data('id'))
        })
        $('.section312').each(function () {
            window.tobiz.slider312Init($(this).data('id'))
        })
        $('.section334').each(function () {
            window.tobiz.slider334Init($(this).data('id'))
        })
        $('.section156').each(function () {
            window.tobiz.slider156Init($(this).data('id'))
        })
        $('.section1156').each(function () {
            window.tobiz.slider1156Init($(this).data('id'))
        })
        $('.section166').each(function () {
            window.tobiz.slider166Init($(this).data('id'))
        })
        $('.section160').each(function () {
            window.tobiz.slider160Init($(this).data('id'))
        })

        $('.section126').each(function () {
            window.tobiz.slider126Init($(this).data('id'))
        })
        $('.section1011').each(function () {
            window.tobiz.slider1011Init($(this).data('id'))
        })
        $('.section129').each(function () {
            window.tobiz.slider129Init($(this).data('id'))
        })
        $('.section151').each(function () {
            window.tobiz.slider151Init($(this).data('id'))
        })
        $('.section149').each(function () {
            window.tobiz.slider149Init($(this).data('id'))
        })
        $('.section118').each(function () {
            window.tobiz.slider118Init($(this).data('id'))
        })


        if ($(window).width() > 640) {

            $('.section116').find('.menu1').show();
        } else {
            $('.section116').find('.menu1').hide();

        }




    });


    setInterval(function () {
        $({temporary_x: -151, temporary_y: 0}).animate({temporary_x: 500, temporary_y: 0}, {
            duration: 1000,
            step: function () {
                var position = Math.round(this.temporary_x) + "px " + Math.round(this.temporary_y) + "px";
                $('.btn.animation, .btn1.animation, .btn2.animation, .btn3.animation, .btn4.animation, .btn5.animation').css("background-position", position);
            }
        });
    }, 2000)




    $('body').on('click', '.menu_mobile_btn', function (e) {
        $(this).next('.menu1').toggleClass('active');
        $('body').toggleClass('modal');
        $(this).toggleClass('active');
    });


    $('body').on('click', '.menu-toogler_widget', function (e) {
        $(this).parent('.section1116').addClass('view_menu');
        $(this).next('.menu-toogler_widget_close').show();
        $(this).hide();
    });


    $('body').on('change', '.section1307 input, .section1307 select', function (e) {
        var id = $(this).closest('.section').data('id') + '';


        window.tobiz.section1307Init(id);
    });

    $('body').on('click', '.menu-toogler_widget_close', function () {
        $(this).parent('.section1116').removeClass('view_menu');
        $(this).prev('.menu-toogler_widget').show();
        $(this).hide();
    });



    $('body').on('click', '.for_view', function () {
        $(this).parent('.section1116').addClass('view_menu');
        $(this).hide();
        $('.type_id_1116 .for_hide').show();
    });

    $('body').on('click', '.for_hide', function () {
        $(this).parent('.section1116').removeClass('view_menu');
        $(this).hide();
        $('.type_id_1116 .for_view').show();
    });

    $('body').on('click', '.section1117 .menu-toogler_widget', function (e) {
        $(this).parent('.section1117').addClass('view_menu');
        $(this).next('.menu-toogler_widget_close').show();
        $(this).siblings('.section_inner').children('.menu1').show();
        $(this).hide();
    });

//

    $('body').on('click', '.menu-toogler_widget_close', function () {
        $(this).parent('.section1117').removeClass('view_menu');
        $(this).prev('.menu-toogler_widget').show();
        $(this).hide();
    });
    $('body').on('click', '.section1302 .level0,.section1302 .level1', function (e) {
        console.log(1);
        $(this).parents('.section_inner').removeClass('active');
        $(this).parents('.menu1').removeClass('active');

    })

    $('body').on('click', '.section1302 .menu_mobile_btn2', function (e) {
        $(this).toggleClass('active');
        $(this).next('.menu1').toggleClass('active');
    });


//    $('body').on('click', '.for_view', function () {
//        $(this).parent('.section1117').addClass('view_menu');
//        $(this).hide();
//        $('.type_id_1117 .for_hide').show();
//    });
//
//    $('body').on('click', '.for_hide', function () {
//        $(this).parent('.section1117').removeClass('view_menu');
//        $(this).hide();
//        $('.type_id_1117 .for_view').show();
//    });





//    $(document).on('click', document, function (event) {
//
//        if ($(event.target).closest('.section1116, .menu_config').length)
//            return;
//
//        $('#wrapper').find('.section1116.view_menu').find('.menu-toogler_widget_close').click();
//
//        event.stopPropagation();
//    });

    $('body').on('click', '.formula', function () {
        $('.formula').removeClass('active');
        $(this).addClass('active');
    });

//     section 159 video play
    var video_block = $('.section159 .video');
    var icon = $('.section159 .play');
    icon.click(function () {
        icon.toggleClass('active');
        video_block.toggleClass('play_active');
        return false;
    });

    function setClassPadding() {
        if ($('.section1117').length) {
            $('#wrapper').addClass('padding_wrapper');
        } else {
            $('#wrapper').removeClass('padding_wrapper');
        }
        if ($('.section1126').length && $(window).width() > 1300) {
            $('#wrapper').addClass('padding_wrapper_right');
        } else {
            $('#wrapper').removeClass('padding_wrapper_right');
        }
    }
    setTimeout(function () {
        setClassPadding()
    }, 300);




    $(document).on('click', '.filter_btns button', function () {

        $('.filter_btns button').removeClass('current_btn');
        $(this).addClass('current_btn');

        var $items = $(this).parent().parent().children('.arr1');
        //Сортировка
        ($(this).data('sort_dir') === 'to_max') ? $items.sort(sort_to_max) : $items.sort(sort_to_min);
        //Вывод
        $(this).parent().parent().children('.arr1').each(function (i, el) {
            $(el).replaceWith(function () {
                return $items.get(i).outerHTML;
            });
        });

    });

    function sort_to_max(a, b) {
        var a_val = parseInt($(a).find('.price1').text());
        var b_val = parseInt($(b).find('.price1').text());
        return (a_val > b_val ? 1 : b_val > a_val ? -1 : 0);
    }
    function sort_to_min(a, b) {
        var a_val = parseInt($(a).find('.price1').text());
        var b_val = parseInt($(b).find('.price1').text());
        return (a_val > b_val ? -1 : b_val > a_val ? 1 : 0);
    }






    $(function () {

        var blockTop = 0;
        try {
            blockTop = $('.table').offset().top;

        } catch (e) {

        }
        var CountUpFlag = 0;
        var $window = $(window);
        $window.on('load scroll', function () {
            var top = $window.scrollTop();
            var height = $window.height();
            if (top + height - 200 >= blockTop && CountUpFlag == 0) {
                CountUp();
                CountUpFlag = 1;
            }
        });
        function CountUp() {
            $('.table').prev().addClass('this');
        }
    });


    $('body').on('click', '.section321 .tab_btn', function () {
        $('.section321 .tab_btn').removeClass('active');
        $(this).addClass('active');
        $('.section321 .tabs__content').removeClass('active');
        $(this).next().addClass('active');
    });


    function textAreaAdjust(o) {
        o.style.height = "1px";
        o.style.height = (25 + o.scrollHeight) + "px";
    }

    $('.calculator textarea').click(function () {
        textAreaAdjust(this);
    });

    function foo() {
        $('.section321 .arr1:nth-of-type(1) .tab_btn').click();
    }
    function txtArea() {
        $('.calculator textarea').click();
    }



    setTimeout(foo, 100);
    setTimeout(txtArea, 100);



    $('body').on('input change mousemove', '.field_input_range input', function () {
        var val = $(this).val();
        var this_block = $(this).siblings('.change_val');
        this_block.text(val);
    });
    $('body').on('mousemove', '#btn_config input[name="btn_radius"]', function () {
        var val = $(this).val();
        $(this).parent().siblings('.val_range').html(' ' + val + ' em');
    });


    $('body').on('click', '.x_pattern_new .spoiler-title, .x_pattern .spoiler-title', function () {
        $(this).siblings('.spoiler-content').toggle();

    })






    $('body').on('change', '.section1011 .slides input[type="checkbox"]', function () {
        $(this).parent('.checkbox_field').toggleClass('active');
    })

    $('body').on('change', '.section1011 .slides input[type="radio"]', function () {
        $(this).parents('.field_input').find('.checkbox_field').removeClass('active');
        $(this).parent('.checkbox_field').addClass('active');
    })

    $('body').on('click', '.section1011 .slides .prev, .section1011 .slides .next', function () {
        var top = $(this).closest('.section1011').offset().top;
        if ($(window).width() < 810) {
            $(window).scrollTop(top);
        }
    })

    $('body').on('change', '.section1011 .slides input', function () {
        $(this).parents('.field_input').children('.checkbox_field').each(function (i, el) {
            if ($(this).children('input').prop('checked')) {
                $('.section1011 .next').addClass('show');
                return false;
            } else {
                $('.section1011 .next').removeClass('show');
            }
        })
    })

    $('body').on('change input', '.section1011 .slides input[type="range"]', function () {
        $('.section1011 .next').addClass('show');

    });

    $('body').on('change input', '.section1011 .slides input[type="text"], .section1011 .slides textarea', function () {
        $(this).parent('.field_input').each(function () {
            if ($(this).children('input[type="text"]').val() !== 0) {
                $('.section1011 .next').addClass('show');
            } else if ($(this).children('textarea').val() !== 0) {
                $('.section1011 .next').addClass('show');
            } else {
                $('.section1011 .next').removeClass('show');
            }
        })
    })


    $('body').on('click', '.data_title', function () {
        $(this).siblings('input').click();
    })
    $('body').on('click', '.x_pattern_new .spoiler-title', function () {
        $(this).parent().siblings('.x_pattern_opacity').toggle();
        $(this).parent().siblings('.x_pattern_fixed').toggle();
    })




    $('body').on('click', '.section2120 .search button', function () {
        $(this).siblings('input').addClass('active');
        $(this).parent().parent().siblings('.logo_img').addClass('search_active');
    });

    $('body').on('click', '.send.next', function () {

        var $block = $(this).closest('.section');
        var quiz_report = '';

        $block.find('.quiz_wrapper .field').each(function () {
            quiz_report += '| Вопрос: ' + $(this).data('question') + ' |\n';
            quiz_report += ' Ответ: ';
            var answers = [];

            $(this).find('input:checked, select option:selected, input[type="range"], input[type="text"], textarea').each(function () {
                answers.push($(this).val());
            })


            quiz_report += answers.join(', ') + '  | | \n\n';
        })


        $block.find('form textarea.quiz_report').remove();
        $block.find('form').append('<textarea style="display:none;" name="QUIZ_RESULT">' + quiz_report + '</textarea>');




    })

    $('.section333 ul li').each(function (i, el) {
        $(this).children('a').html(i + 1);
    })

    $(document).on('click', document, function (event) {
        if ($(window).width() < 810) {
            if ($(event.target).closest('.menu-toogler, .menu_mobile_btn, .menu1, .menu2').length)
                return;
            $('.level1').hide();
            $('.menu1').hide();
            $('.menu2').hide();
            $('.section311 .menu1, .section2120 .menu1, .section2120 .menu2').show();
            $('.section').removeClass('menu_open');
            event.stopPropagation();
        }
    });


    function delMobClass() {
        if ($(window).width() <= 1200) {
            $('.section_inner.width1170').each(function () {
                $(this).addClass('was_width1170');
                $(this).removeClass('width1170');
            })
        } else if ($(window).width() > 1200) {
            $('.section_inner.was_width1170').each(function () {
                $(this).removeClass('was_width1170');
                $(this).addClass('width1170');
            })

        }
    }

    delMobClass();




    function ToTopBtn() {
        var to_top = $('.section1163');
        if ($(window).scrollTop() > 300) {
            to_top.show();
        } else {
            to_top.hide();
        }
    }

    setInterval(ToTopBtn, 300);
    $('.section1163').on('click', function () {
        $('html, body').animate({
            scrollTop: 0
        }, 500);
    });


    $("body").on('click', '.section1130 .btns_wrapp > div', function (e) {
        if (!tobiz.editor) {
			if(e.currentTarget.className.indexOf('open_card') !== -1){
				$("body").addClass('noscroll');
			}else{
				$("body").addClass('modal');
			}
        }
    });



    $("body").on('click', '.section2120 .menu a', function (e) {
        $(this).parents('.section').removeClass('view_menu');
        $(this).parents('.section').removeClass('menu_open_new');
        $(this).parents('.section').removeClass('menu_open');
        $(this).parents('.section').find('.menu_content').hide();
        $('body').removeClass('modal');
        $(this).parents('.section').find('.menu-toogler ').removeClass('active');
    })
    $("body").on('click', '.menu1 a, .menu a', function (e) {
        if ($(window).width() < 960) {
            $(this).parents('.menu1').removeClass('active');
            $('body').removeClass('modal');
            $(this).parents('.section').removeClass('view_menu');
            $(this).parents('.section').removeClass('menu_open_new');
            $(this).parents('.section').removeClass('menu_open');
            $(this).parents('.section').find('.menu_content').hide();
            $(this).parents('.section').find('.menu-toogler_widget').show();
            $(this).parents('.section').find('.menu_mobile_btn').removeClass('active');
            $(this).parents('.section').find('.menu-toogler ').removeClass('active');
        }
    })
    $("body").on('click', '[href^="#"]', function (e) {
        //	e.preventDefault();
        var el_href = $(this).attr('href').substr(1);
        var el = $('a[name="' + el_href + '"]');
        if (el.length > 0 && $(window).width() > 1000) {
            $('html,body').stop().animate({scrollTop: el.offset().top}, 1000);
            return false;
        }
    });

//	$('body').on('mouseenter','.field input', function(){
//		if($(this).attr('type') == 'text' || $(this).attr('type') == 'email' || $(this).attr('type') == 'phone'){
//			$(this).focus();
//
//		}
//	})
    $('.menu1').each(function (i, el) {
        if ($(el).children().children().length) {
        } else {
            $(this).siblings('.menu-toogler').hide();
            $(this).hide();
        }
    })
    setTimeout(function () {

        $('.section1011 .field_input_text input, .section1011 .field_input_textarea textarea').val('');
        $('.field input').attr('autocomplete', 'off');




    }, 300);

    if ($('.section1128').length) {
        setTimeout(function () {
            $('.section1128').hide();
        }, 2200)

        $('.section1128').animate({'opacity': 0}, 2000);
    }



    if ($('.section1400').size()) {
        var ctx;
        $('.section1400').each(function () {
            var id = $(this).attr('id');
            $(this).find('.chart').each(function () {
                ctx = this.getContext('2d');
            })

            var colors = $('#' + id + ' .arr_color');
            var titles = $('#' + id + ' .arr_title');
            var values = $('#' + id + ' .arr_value');
            var type = $('#' + id + ' .graph').data('type');
            function toArray(obj) {
                var arr = new Array();
                for (var i = 0; i < obj.length; i++)
                {
                    arr.push($(obj[i]).text());
                }
                return arr;
            }
            var myChart = new Chart(ctx, {
                type: type,
                data: {
                    labels: toArray(titles),
                    datasets: [{
                            label: '',
                            data: toArray(values),
                            backgroundColor: toArray(colors),
                        }]
                },
                options: {
                    legend: {
                        position: "right",
                        labels: {
                            fontSize: 14
                        }
                    }
                }
            });

        })


    }


    $('#basket_make_order input[name="tel"]').each(function () {
        var data_mask = $(this).data('mask');
        $(this).mask(data_mask);
    })

    if ($('.section1302').size()) {
        var this_location = window.location.href;
        $('.section1302 li').each(function (i, el) {
            var link = $(this).children('a').attr('href');
            if (this_location.indexOf(link) !== -1) {
                $(this).addClass('this_page');
            }else{
                $(this).removeClass('this_page');
				
			}
        })
    }

    $('input[type="search"]').each(function (i, el) {
//		if($(this) !== 'undefined'){
        $(this).blur();
//		}
    })
    $('.field_input_phone input').each(function () {
        var mask = String($(this).data('mask'));
        if (mask !== 'undefined') {
            $(this).mask(mask);
        }
    })

    $('body').on('click', '.tobiz_auth .user', function (e) {
		$('.popup_user').toggleClass('active');
	})
	
    $('.menu1 a').hover(function (e) {

        $(this).removeAttr('title');
    });
//


	
	not_menu();

  $('.section146 .image_box img').click(function (e) {
		var next_link = $(this).next('.overlay_image_box').data('link');
		var next_target = $(this).next('.overlay_image_box').data('link-target');
		if(next_link != ''){
			next_target == 1 ? window.open(next_link, '_blank') : window.open(next_link, '_self');
			
		}
	})


        $('body').find('.gotoitempage').each(function(){
            $(this).attr('style2', $(this).attr('style'));
        })

        
        $('.gotoitempage').click(function(e){
            e.preventDefault();
            var itempage = JSON.parse(localStorage.getItem('itempage'));
            if (itempage == null) {
                itempage = {};
            }
            var item_id = $(this).data('id');
            var style = $(this).attr('style'); // hover
            var style2 = $(this).attr('style2'); // normal
            itempage[item_id] = {style: style, style2: style2,   url: window.location.href };
            localStorage.setItem('itempage', JSON.stringify(itempage));
            window.location.href=$(this).attr('href');
        })

	
});



       
tobiz.blocks = [];

            
                $(function () {


                    (function(){
                        var app = {
                            cookie: {
                                set: function(name,value,days) {
                                    var expires = "";
                                    if (days) {
                                        var date = new Date();
                                        date.setTime(date.getTime() + (days*24*60*60*1000));
                                        expires = "; expires=" + date.toUTCString();
                                    }
                                    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
                                },
                                get: function (name) {
                                    var nameEQ = name + "=";
                                    var ca = document.cookie.split(';');
                                    for(var i=0;i < ca.length;i++) {
                                        var c = ca[i];
                                        while (c.charAt(0)==' ') c = c.substring(1,c.length);
                                        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
                                    }
                                    return null;
                                },
                                remove: function (name) {
                                    document.cookie = name+'=; Max-Age=-99999999;';
                                }
                            },
                            url: {
                                getParams: function(u){
                                    var url = u || window.location.search,
                                        queryString = url.split('?')[1],
                                        urlParams={};
                                    url = url.split('#')[0];
                                    if (!queryString) {
                                        if (url.search('=') !== false) {
                                            queryString = url;
                                        }
                                    }
                                    if (queryString) {
                                        var keyValuePairs = queryString.split('&')
                                        for (var i = 0; i < keyValuePairs.length; i++) {
                                            var keyValuePair = keyValuePairs[i].split('=')
                                            var paramName = keyValuePair[0]
                                            var paramValue = keyValuePair[1] || ''
                                            urlParams[paramName] = decodeURIComponent(paramValue.replace(/\+/g, ' '));
                                        }
                                    }
                                    return urlParams;
                                }
                            },
                            int: function(){
//                                var get = $.extend({}, JSON.parse(app.cookie.get('tobiz_get_params')), app.url.getParams());
//                                app.cookie.set('tobiz_get_params', JSON.stringify(get));


                                if(app.cookie.get('tobiz_enter_point')===null){
                                    app.cookie.set('tobiz_enter_point', window.location.href);
                                }




                            }
                        }
                        app.int();
                        window.app = app;

                    })();


                    $('body').on('submit', 'form[action="handler.php"]', function (event) {
                        event.preventDefault();



                        var send = 1;
                        if (!event.target.checkValidity()) {
                            $('form input:visible[required="required"]').each(function () {
                                if(!send) return false;
                                if (!this.validity.valid) {
                                    $(this).focus();
                                    send = 0;
                                }
                            });
                            if(!send) return;
                        }





                        var this_form = $(this);
                        if (!$(this).children("input[name=project_id]").length)
                            $(this).prepend('<input type="hidden" name="project_id" value="' + window.tobiz.project_id + '">');
                        if (!$(this).children("input[name=page_id]").length)
                            $(this).prepend('<input type="hidden" name="page_id" value="' + window.tobiz.rep_id + '">');
                        if (!$(this).children("input[name=referrer]").length)
                            $(this).prepend('<input type="hidden" name="referrer" value="' + document.referrer + '">');
                        if (!$(this).children("input[name=user_id]").length)
                            $(this).prepend('<input type="hidden" name="user_id" value="' + window.tobiz.user_id + '">');

                        if ($(this).find("[data-action]").size()) {
                            $(this).prepend('<input type="hidden" name="product_name" value="' + $(this).find("[data-product_name]").data('product_name') + '">');
                            $(this).prepend('<input type="hidden" name="action" value="' + $(this).find("[data-action]").data('action') + '">');
                            $(this).prepend('<input type="hidden" name="amount" value="' + $(this).find("[data-action]").data('amount') + '">');
                            $(this).prepend('<input type="hidden" name="url" value="' + $(this).find("[data-action]").data('url') + '">');
                        } else {
                            console.log('not found');
                        }

                        if (typeof(VK) != 'undefined' && $(this).find("[data-vk_pixel]").size() && $(this).find("[data-vk_pixel]").data('vk_pixel')!='undefined' &&  $(this).find("[data-vk_pixel]").data('vk_pixel')!='') {
                            console.log('vk_pixel_event: '+ $(this).find("[data-vk_pixel]").data('vk_pixel'));
                            VK.Retargeting.Event($(this).find("[data-vk_pixel]").data('vk_pixel'));
                        } else {
                            console.log('vk_pixel not found');
                        }



                        if (typeof(fbq) != 'undefined' && $(this).find("[data-fb_pixel]").size() && $(this).find("[data-fb_pixel]").data('fb_pixel')!='undefined' &&  $(this).find("[data-fb_pixel]").data('fb_pixel')!='') {
                            console.log('fb_pixel_event: '+ $(this).find("[data-fb_pixel]").data('fb_pixel'));
                            fbq('trackCustom', $(this).find("[data-fb_pixel]").data('fb_pixel'));
                        } else {
                            console.log('fb_pixel not found');
                        }



                        var ya_counter_id = '';
                        if(ya_counter_id!=''){
                            ya_counter_id = eval(ya_counter_id);
                            if ($(this).find("[data-metrica_event]").size() && $(this).find("[data-metrica_event]").data('metrica_event')!='undefined' &&  $(this).find("[data-metrica_event]").data('metrica_event')!='') {
                                ya_counter_id.reachGoal($(this).find("[data-metrica_event]").data('metrica_event'));
                                console.log('ym_target_event: '+ $(this).find("[data-metrica_event]").data('metrica_event'));
                            } else {
                                console.log('ym_target_event not found');
                            }
                        }


                        var formData = new FormData($(this)[0]);
                        var this_block = $(this).closest('.section');
                        $.ajax({
                            dataType: "json",
                            type: "POST",
                            url: "handler.php",
                            data: formData,
                            async: false,
                            cache: false,
                            contentType: false,
                            processData: false
                        }).done(function (data) {
                            if (data.status == 'OK') {
                                alert(data.msg);
                                this_form.each(function () {
                                    $(this)[0].reset();
                                })
                                $('.popup_form').hide();
                            }
                            if (data.status == 'ERROR') {
                                alert(data.msg);
                            }
                            if (data.status == 'JC') {
                                        $('body').append(data.form);
                                $('#jc_form').submit();
                                this_form.each(function () {
                                    $(this)[0].reset();
                                })
                            }

                            if (data.status == 'PAYEER') {
                                        $('body').append(data.form);
                                $('#payeer_form').submit();
                                this_form.each(function () {
                                    $(this)[0].reset();
                                })
                            }




                            if (data.status == 'SR') {
                                        $('body').append(data.form);
                                $('#sr_form').submit();
                                this_form.each(function () {
                                    $(this)[0].reset();
                                })
                            }
                            if (data.status == 'GR') {
                                        $('body').append(data.form);
                                $('#gr_form').submit();
                                this_form.each(function () {
                                    $(this)[0].reset();
                                })
                            }
                            if (data.status == 'RK') {
                                        this_form.each(function () {
                                    $(this)[0].reset();
                                })
                                window.location.href = data.url;
                            }
                            if (data.status == 'INTERKASSA') {
                                        this_form.each(function () {
                                    $(this)[0].reset();
                                })
                                window.location.href = data.url;
                            }
                            if (data.status == 'redirect') {
                                        this_form.each(function () {
                                    $(this)[0].reset();
                                })


                                window.basket.clean();
                                window.basket.hideForm();
//                                window.basket.renderForm();
//                                window.basket.renderBtn();
//                                window.basket.hideBtn();
                                $('.popup_form').hide();

                                window.location.href = data.url;
                            }
                            if (data.status == 'thanks') {
                                        this_block.find('.popup_thanks').show();
                                this_form.each(function () {
                                    $(this)[0].reset();
                                })
                                $('.popup_form').hide();
                                this_block.find('.extra_info_block_wrapper').hide();
                            }
                            if (data.status == 'thanks_order_complete') {
                                        this_block.find('.popup_thanks').show();
                                this_form.each(function () {
                                    $(this)[0].reset();
                                })
                                window.basket.clean();
                                window.basket.hideForm();
                                window.basket.renderForm();
                                window.basket.renderBtn();
                                window.basket.hideBtn();
                                //alert('Спасибо ваш заказ успешно оформлен!');
                                $('.popup_form').hide();
                                window.basket.renderThanks();
                            }
                            if (data.status == 'already_sent') {
                                this_form.each(function () {
                                    $(this)[0].reset();
                                })
                                $('.popup_form').hide();

                                alert(data.msg);
                            }
                        }).error(function (xhr, ajaxOptions, thrownError) {
                            console.log(xhr.status);
                            console.log(thrownError)
                        });
                    })
                })
           
