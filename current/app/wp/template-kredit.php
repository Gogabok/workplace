<?php
/**
 * Template Name: Template Kredit (Kredit)
 */
get_header(); ?>



</header>
   <?php
    get_template_part( 'template-parts/nav-ul' );
?>

<section class="utp single-header" style="background-image: url(<?php echo get_template_directory_uri(); ?>/img/deliv.jpg);
	echo $large_image_url[0]; ?>)">
	
	<div class="container d-none d-md-block">
            <div class="row">
                    <div class="col-md-3">
                        <a href="/mototsikly/" class="cat-item">
                                <img src="<?php echo get_template_directory_uri(); ?>/img/moto.png" alt="sitename" class="img-responsive">
                                <p>Мотоциклы</p>
                        </a>
                    </div>
                    <div class="col-md-3">
                            <a href="/skutera/" class="cat-item">
                                    <img src="<?php echo get_template_directory_uri(); ?>/img/skuter.png" alt="sitename" class="img-responsive">
                                    <p>Скутеры</p>
                            </a>
                    </div>
                    <div class="col-md-3">
                            <a href="/mopedy/" class="cat-item">
                                    <img src="<?php echo get_template_directory_uri(); ?>/img/moped.png" alt="sitename" class="img-responsive">
                                    <p>Мопеды</p>
                            </a>
                    </div>
                    <div class="col-md-3">
                            <a href="/kvadrotsikly/" class="cat-item">
                                    <img src="<?php echo get_template_directory_uri(); ?>/img/kvadro.png" alt="sitename" class="img-responsive">
                                    <p>Квадроциклы</p>
                            </a>
                    </div>
                </div>
	</div>
	<h1 class="col-md-none fz-44"><?php the_title(); ?></h1>
</section>

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

<div class="serv-blocks">
<?php while( have_posts() ) : the_post();

the_content(); // выводим контент
endwhile; ?>
</div>



<?php get_footer(); ?>