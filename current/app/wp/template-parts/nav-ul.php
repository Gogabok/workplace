<!-- <ul class="common-mnu d-none d-md-flex">
			<li><a href="#">Главная</a></li>
			<li><a href="#">О нас</a></li>
			<li><a href="#">Доставка и оплата</a></li>
			<li><a href="#">Кредит</a></li>
			
			<li><a href="#">Контакты</a></li>
		</ul> -->

		<?php 
wp_nav_menu( array(
    'theme_location'=>'main-top',
	'menu_class' => 'common-mnu d-none d-md-flex',
	'container' => 'false',

) );
?>