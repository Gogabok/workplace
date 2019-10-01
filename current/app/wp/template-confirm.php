<?php
/**
 * Template Name: Template Confirm (Confirm)
 */
get_header(); ?>

<div class="moby-mnu d-md-none">
	<div class="container">
	<ul>
				
				<li><a href="/mototsikly/">Мотоциклы</a></li>
				<li><a href="/skutera/">Скутеры</a></li>
				<li><a href="/mopedy/">Мопеды</a></li>
				<li><a href="/kvadrotsikly/">Квадроциклы</a></li>
		</ul>
	</div>

</div>

<section class="flat delivery">

	<?php while( have_posts() ) : the_post();
         the_content(); // выводим контент
    endwhile; ?>
</section>



<?php get_footer(); ?>