<!DOCTYPE html>
<html lang="ru">

<head>

	<meta charset="utf-8">
	<!-- <base href="/"> -->

	<title><?php the_title(); ?></title>
	<meta name="description" content="<?php the_title(); ?>">

	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
	
	<!-- Template Basic Images Start -->
	<meta property="og:image" content="path/to/image.jpg">
	<link rel="icon" href="img/favicon/favicon.ico">
	<link rel="apple-touch-icon" sizes="180x180" href="img/favicon/apple-touch-icon-180x180.png">
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.css">
	<!-- Template Basic Images End -->
	
	<!-- Custom Browsers Color Start -->
	<meta name="theme-color" content="#000">
	<!-- Custom Browsers Color End -->

	<link href="https://fonts.googleapis.com/css?family=Montserrat:300,400,500,600,700&amp;subset=cyrillic-ext" rel="stylesheet">



  <?php wp_head(); ?>
</head>

<body>

		<div class="mob">
				<i class="fa fa-times" aria-hidden="true"></i>
				<a href="/" class="">	<img src="<?php echo get_template_directory_uri(); ?>/img/logo.png" alt="sitename" width="250"></a>
				<?php
    get_template_part( 'template-parts/nav-ul-for-mob' );
?>
			<!-- <ul>
				
					<li><a href="/mototsikly/">Мотоциклы</a></li>
					<li><a href="/skutera/">Скутеры</a></li>
					<li><a href="/mopedy/">Мопеды</a></li>
					<li><a href="/kvadrotsikly/">Квадроциклы</a></li>
			
			
				<li><a href="#tocontact" class="to-id">Контакты</a></li>
			</ul> -->
			<div class="contact-line-item">Адрес: г. Киев</div>
			<div class="contact-line-item">Телефон: <?php	$options = get_option('sample_theme_options');
							echo $options['phonetext']; ?></div>
			<div class="contact-line-item">E-mail: <?php	$options = get_option('sample_theme_options');
							echo $options['email']; ?></div>
		</div>
	<div id="to-call" class="white-popup mfp-hide">
		<h3>Заполните форму</h3>
		<? echo do_shortcode('[contact-form-7 id="61" title="Покупка"]'); ?>
	</div>
	
	
	<header>
			
		<div class="container-fluid">
			<div class="row align-items-center">

			


				<div class=" col-4 col-md-2 offset-md-1">
					<div class="logo">
					<a href="/" class="">	<img src="<?php echo get_template_directory_uri(); ?>/img/logo.png" alt="" class="img-responsive" width="150">	</a>
							
					</div>
				</div>



				<div class="col-md-3 d-none d-md-block">
					<div class="grafik">
						<h5>График работы:</h5>
						<p>Пн-Сб - 10:00 - 19:00</p>
						<p>Вс - выходной</p>
					</div>
				</div>




				<div class="col-md-2 col-5 col-sm-4 d-none d-sm-block">
						<div class="tels">

								<h5>Телефоны:</h5>
								
								<p><?php	$options = get_option('sample_theme_options');
							echo $options['phonetext']; ?></p>
								<p><?php	$options = get_option('sample_theme_options');
							echo $options['phonetext2']; ?></p>

							</div>
				</div>


				<div class="col-3 offset-5 offset-sm-0 col-sm-4 d-md-none moby">
						
					<a href="#" class="want bye ">Меню</a>
				</div>


				<div class="col-md-3 d-none d-md-block">
					<div class="want-block">
							
					    <a href="#to-call" class="want open-popup-link">Заказать звонок</a>
						<div class="soc">
							<a href="<?php	$options = get_option('sample_theme_options');
							echo $options['facebook']; ?>">
								<img src="<?php echo get_template_directory_uri(); ?>/img/facebook.png" alt="sitename">
							</a>
							<a href="<?php	$options = get_option('sample_theme_options');
							echo $options['telega']; ?>">
								<img src="<?php echo get_template_directory_uri(); ?>/img/instagram.png" alt="sitename">
							</a>
						</div>
					</div>
				</div>
				<div class="col-12 d-sm-none d-flex justify-content-around top-tels">
			<p><?php	$options = get_option('sample_theme_options');
							echo $options['phonetext']; ?></p>
								<p><?php	$options = get_option('sample_theme_options');
							echo $options['phonetext2']; ?></p>
			</div>
			</div>
		</div>