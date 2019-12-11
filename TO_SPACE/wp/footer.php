<?php
if( !is_page_template( 'template-ok.php' ) ){ ?>
	<section class="send-form">
	<div class="container">
		<form action="">
			<?php echo do_shortcode( '[contact-form-7 id="102" title="Consult"]'); ?>
			<!-- <h2>Получить консультацию</h2>
		<div class="row align-items-center">
			<div class="col-md-4">
				<input type="text" placeholder="Ваше имя">
			</div>
			<div class="col-md-4">
			<input type="text" placeholder="Ваше имя">
			</div>
			<div class="col-md-4">
				<input type="text" class="want" value="Отправить">
			</div>
		</div> -->
		</form>
	</div>
</section>
<?php }
?>



<section class="contact-line d-none d-sm-block">
	<h2>Контакты</h2>
	<div class="container">
		<div class="row">
			<div class="col-md-4 contact-line-item">Адрес: г. Киев</div>
			<div class="col-md-4 contact-line-item">Телефон: <?php	$options = get_option('sample_theme_options');
							echo $options['phonetext']; ?></div>
			<div class="col-md-4 contact-line-item">E-mail: <?php	$options = get_option('sample_theme_options');
							echo $options['email']; ?></div>
		</div>
	</div>
</section>
	

<footer>
	<div class="container-fluid">
		<div class="row align-items-center ">
			<div class="col-md-3">
					<div class="logo">
							<p><img src="<?php echo get_template_directory_uri(); ?>/img/logo.png" alt="" class="img-responsive" width="150">	</p>	
							<span>Мото техника</span>
					</div>
			</div>
			<div class="col-md-3">
				<div class="info">
						<p>Адрес: г. Киев</p>
						<p>Телефон: <?php	$options = get_option('sample_theme_options');
							echo $options['phonetext']; ?></p>
						<p>E-mail: <?php	$options = get_option('sample_theme_options');
							echo $options['email']; ?></p>
				</div>
				
			</div>
			<div class="col-md-3 d-none d-lg-block">
				<div class="footer-mnu">
					<ul>
							<li><a href="/mototsikly/">Мотоциклы</a></li>
							<li><a href="/skutera/">Скутеры</a></li>
							<li><a href="/mopedy/">Мопеды</a></li>
							<li><a href="/kvadrotsikly/">Квадроциклы</a></li>
					</ul>
				</div>
			</div>
			<div class="col-md-3">
				<h3>Связаться с нами:</h3>
				<? echo do_shortcode('[contact-form-7 id="61" title="Покупка"]'); ?>

			</div>
		</div>
	</div>
	<div class="copy">© 2019 | ALL RIGHTS RESERVED</div>
</footer>

	<?php wp_footer(); ?>
</body>
</html>