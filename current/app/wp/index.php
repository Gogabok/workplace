<?php get_header(); ?>

</header>
<?php
    get_template_part( 'template-parts/nav-ul' );
?>
<section class="utp" style="background-image: url(<?php echo get_template_directory_uri(); ?>/img/fon.jpg)">
	<div class="container">
		<div class="row align-items-center">
			<div class="col-lg-7 col-md-6 "><h1>Оптимальный выбор в мире мототехники!</h1></div>
			<div class="col-lg-5 col-md-6 d-none d-md-block">
				<div class="row">
				<div class="col-sm-6">
					<a href="/mototsikly/" class="cat-item">
							<img src="<?php echo get_template_directory_uri(); ?>/img/moto.png" alt="sitename" class="img-responsive">
							<p>Мотоциклы</p>
					</a>
				</div>
				<div class="col-sm-6">
						<a href="/skutera/" class="cat-item">
								<img src="<?php echo get_template_directory_uri(); ?>/img/skuter.png" alt="sitename" class="img-responsive">
								<p>Скутера</p>
						</a>
				</div>
				<div class="col-sm-6">
						<a href="/mopedy/" class="cat-item">
								<img src="<?php echo get_template_directory_uri(); ?>/img/moped.png" alt="sitename" class="img-responsive">
								<p>Мопеды</p>
						</a>
				</div>
				<div class="col-sm-6">
						<a href="/kvadrotsikly/" class="cat-item">
								<img src="<?php echo get_template_directory_uri(); ?>/img/kvadro.png" alt="sitename" class="img-responsive">
								<p>Квадроциклы</p>
						</a>
				</div>
			</div>
			</div>
		</div>
	</div>
	
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

	<section id="content">
		<h2>Популярные мотоциклы:</h2>
		<div class="container">
				<div class="row">



				<?php if ( have_posts() ) : query_posts('cat=2&posts_per_page=8');
while (have_posts()) : the_post(); ?>

<?php
	if(get_post_meta($post->ID, 'is-main', true)){ ?>
	<div class="col-md-4 col-lg-3 col-sm-6">





<div class="product-wrap">

<a href="<?php the_permalink(); ?>" class="rozetka d-flex d-sm-none">
				<div class="rozetka-product-img">
						<img src="<?php $large_image_url = wp_get_attachment_image_src( get_post_thumbnail_id(), 'large' );
echo $large_image_url[0]; ?>" alt="sitename" class="img-responsive">
					</div>
				<div class="rozetka-product-data">
						<h4><?php the_title(); ?></h4>
						<div class="price">
								<span class="dig"><?php
			$options = get_option('sample_theme_options');
			 $kurs = $options['kurs'];
			 $price = get_post_meta($post->ID, 'price', true);
			 $res = $kurs *  $price;
			 echo ceil($res);
			   ?></span>
								<span class="valuta">грн</span>
							</div>
							<div class="data">
									<div class="data-line">
										<span>Наличие: <?php echo get_post_meta($post->ID, 'exist', true); ?></span>
										<?php if(get_post_meta($post->ID, 'delivery', true)){ ?>
	<img src="<?php echo get_template_directory_uri(); ?>/img/dostavka.png" alt="sitename" class="cond b-cond ">
<?php }
?>
<?php if(get_post_meta($post->ID, 'acz', true)){ ?>
	<img src="<?php echo get_template_directory_uri(); ?>/img/acz.png" alt="sitename" class="cond">
<?php }
?>
									</div>
								
									
									</div>	
				</div>	
			</a>



<?php if(get_post_meta($post->ID, 'acz', true)){ ?>
	<img src="<?php echo get_template_directory_uri(); ?>/img/acz.png" alt="sitename" class="cond d-none d-sm-inline">
<?php }
?>

	
<?php if(get_post_meta($post->ID, 'delivery', true)){ ?>
	<img src="<?php echo get_template_directory_uri(); ?>/img/dostavka.png" alt="sitename" class="cond b-cond d-none d-sm-inline">
<?php }
?>


<a href="<?php the_permalink(); ?>" class="product d-none d-sm-flex">
	<div class="product-img">
		<img src="<?php $large_image_url = wp_get_attachment_image_src( get_post_thumbnail_id(), 'large' );
echo $large_image_url[0]; ?>" alt="sitename">
	</div>
	
	<h4><?php the_title(); ?> </h4>
	<span class="cat"><?php
	$category = get_the_category(); 
	echo $category[0]->cat_name;
	?></span>
	<div class="gen-info">
		<div class="price">
			<span class="dig">
			
			<?php
			$options = get_option('sample_theme_options');
			 $kurs = $options['kurs'];
			 $price = get_post_meta($post->ID, 'price', true);
			 $res = $kurs *  $price;
			 echo ceil($res);
			   ?>
		
		</span>
			<span class="valuta">грн</span>
		</div>
		<!-- <span class="bye want">Смотреть</span> -->
	</div>
	
	<div class="data">
		<div class="data-line">
			<span>объем:</span>
			<span><?php echo get_post_meta($post->ID, 'ob', true); ?></span>
		</div>
		<div class="data-line">
			<span>мощность:</span>
			<span><?php echo get_post_meta($post->ID, 'power', true); ?></span>
		</div>
		<div class="data-line">
			<span>расход топлива:</span>
			<span><?php echo get_post_meta($post->ID, 'liters', true); ?></span>
		</div>
		<div class="data-line">
				<span>максимальная скорость:</span>
				<span><?php echo get_post_meta($post->ID, 'max-speed', true); ?></span>
			</div>
		
		</div>
	
	
</a>
</div>
</div>
	<?php }
?>


<? endwhile; endif; wp_reset_query(); ?>

					
			</div>
		</div>
	</section>
<br>
	<section id="content">
		<h2>Популярные скутера:</h2>
		<div class="container">
				<div class="row">



				<?php if ( have_posts() ) : query_posts('cat=3&posts_per_page=8');
while (have_posts()) : the_post(); ?>

<?php
	if(get_post_meta($post->ID, 'is-main', true)){ ?>
	<div class="col-md-4 col-lg-3 col-sm-6">





<div class="product-wrap">

<a href="<?php the_permalink(); ?>" class="rozetka d-flex d-sm-none">
				<div class="rozetka-product-img">
						<img src="<?php $large_image_url = wp_get_attachment_image_src( get_post_thumbnail_id(), 'large' );
echo $large_image_url[0]; ?>" alt="sitename" class="img-responsive">
					</div>
				<div class="rozetka-product-data">
						<h4><?php the_title(); ?></h4>
						<div class="price">
								<span class="dig"><?php
			$options = get_option('sample_theme_options');
			 $kurs = $options['kurs'];
			 $price = get_post_meta($post->ID, 'price', true);
			 $res = $kurs *  $price;
			 echo ceil($res);
			   ?></span>
								<span class="valuta">грн</span>
							</div>
							<div class="data">
									<div class="data-line">
										<span>Наличие: <?php echo get_post_meta($post->ID, 'exist', true); ?></span>
										<?php if(get_post_meta($post->ID, 'delivery', true)){ ?>
	<img src="<?php echo get_template_directory_uri(); ?>/img/dostavka.png" alt="sitename" class="cond b-cond ">
<?php }
?>
<?php if(get_post_meta($post->ID, 'acz', true)){ ?>
	<img src="<?php echo get_template_directory_uri(); ?>/img/acz.png" alt="sitename" class="cond">
<?php }
?>
									</div>
								
									
									</div>	
				</div>	
			</a>



<?php if(get_post_meta($post->ID, 'acz', true)){ ?>
	<img src="<?php echo get_template_directory_uri(); ?>/img/acz.png" alt="sitename" class="cond d-none d-sm-inline">
<?php }
?>

	
<?php if(get_post_meta($post->ID, 'delivery', true)){ ?>
	<img src="<?php echo get_template_directory_uri(); ?>/img/dostavka.png" alt="sitename" class="cond b-cond d-none d-sm-inline">
<?php }
?>


<a href="<?php the_permalink(); ?>" class="product d-none d-sm-flex">
	<div class="product-img">
		<img src="<?php $large_image_url = wp_get_attachment_image_src( get_post_thumbnail_id(), 'large' );
echo $large_image_url[0]; ?>" alt="sitename">
	</div>
	
	<h4><?php the_title(); ?> </h4>
	<span class="cat"><?php
	$category = get_the_category(); 
	echo $category[0]->cat_name;
	?></span>
	<div class="gen-info">
		<div class="price">
			<span class="dig">
			
			<?php
			$options = get_option('sample_theme_options');
			 $kurs = $options['kurs'];
			 $price = get_post_meta($post->ID, 'price', true);
			 $res = $kurs *  $price;
			 echo ceil($res);
			   ?>
		
		</span>
			<span class="valuta">грн</span>
		</div>
		<!-- <span class="bye want">Смотреть</span> -->
	</div>
	
	<div class="data">
		<div class="data-line">
			<span>объем:</span>
			<span><?php echo get_post_meta($post->ID, 'ob', true); ?></span>
		</div>
		<div class="data-line">
			<span>мощность:</span>
			<span><?php echo get_post_meta($post->ID, 'power', true); ?></span>
		</div>
		<div class="data-line">
			<span>расход топлива:</span>
			<span><?php echo get_post_meta($post->ID, 'liters', true); ?></span>
		</div>
		<div class="data-line">
				<span>максимальная скорость:</span>
				<span><?php echo get_post_meta($post->ID, 'max-speed', true); ?></span>
			</div>
		
		</div>
	
	
</a>
</div>
</div>
	<?php }
?>


<? endwhile; endif; wp_reset_query(); ?>

					
			</div>
		</div>
	</section>
<br>
	<section id="content">
		<h2>Популярные мопеды:</h2>
		<div class="container">
				<div class="row">



				<?php if ( have_posts() ) : query_posts('cat=4&posts_per_page=8');
while (have_posts()) : the_post(); ?>

<?php
	if(get_post_meta($post->ID, 'is-main', true)){ ?>
	<div class="col-md-4 col-lg-3 col-sm-6">





<div class="product-wrap">

<a href="<?php the_permalink(); ?>" class="rozetka d-flex d-sm-none">
				<div class="rozetka-product-img">
						<img src="<?php $large_image_url = wp_get_attachment_image_src( get_post_thumbnail_id(), 'large' );
echo $large_image_url[0]; ?>" alt="sitename" class="img-responsive">
					</div>
				<div class="rozetka-product-data">
						<h4><?php the_title(); ?></h4>
						<div class="price">
								<span class="dig"><?php
			$options = get_option('sample_theme_options');
			 $kurs = $options['kurs'];
			 $price = get_post_meta($post->ID, 'price', true);
			 $res = $kurs *  $price;
			 echo ceil($res);
			   ?></span>
								<span class="valuta">грн</span>
							</div>
							<div class="data">
									<div class="data-line">
										<span>Наличие: <?php echo get_post_meta($post->ID, 'exist', true); ?></span>
										<?php if(get_post_meta($post->ID, 'delivery', true)){ ?>
	<img src="<?php echo get_template_directory_uri(); ?>/img/dostavka.png" alt="sitename" class="cond b-cond ">
<?php }
?>
<?php if(get_post_meta($post->ID, 'acz', true)){ ?>
	<img src="<?php echo get_template_directory_uri(); ?>/img/acz.png" alt="sitename" class="cond">
<?php }
?>
									</div>
								
									
									</div>	
				</div>	
			</a>



<?php if(get_post_meta($post->ID, 'acz', true)){ ?>
	<img src="<?php echo get_template_directory_uri(); ?>/img/acz.png" alt="sitename" class="cond d-none d-sm-inline">
<?php }
?>

	
<?php if(get_post_meta($post->ID, 'delivery', true)){ ?>
	<img src="<?php echo get_template_directory_uri(); ?>/img/dostavka.png" alt="sitename" class="cond b-cond d-none d-sm-inline">
<?php }
?>


<a href="<?php the_permalink(); ?>" class="product d-none d-sm-flex">
	<div class="product-img">
		<img src="<?php $large_image_url = wp_get_attachment_image_src( get_post_thumbnail_id(), 'large' );
echo $large_image_url[0]; ?>" alt="sitename">
	</div>
	
	<h4><?php the_title(); ?> </h4>
	<span class="cat"><?php
	$category = get_the_category(); 
	echo $category[0]->cat_name;
	?></span>
	<div class="gen-info">
		<div class="price">
			<span class="dig">
			
			<?php
			$options = get_option('sample_theme_options');
			 $kurs = $options['kurs'];
			 $price = get_post_meta($post->ID, 'price', true);
			 $res = $kurs *  $price;
			 echo ceil($res);
			   ?>
		
		</span>
			<span class="valuta">грн</span>
		</div>
		<!-- <span class="bye want">Смотреть</span> -->
	</div>
	
	<div class="data">
		<div class="data-line">
			<span>объем:</span>
			<span><?php echo get_post_meta($post->ID, 'ob', true); ?></span>
		</div>
		<div class="data-line">
			<span>мощность:</span>
			<span><?php echo get_post_meta($post->ID, 'power', true); ?></span>
		</div>
		<div class="data-line">
			<span>расход топлива:</span>
			<span><?php echo get_post_meta($post->ID, 'liters', true); ?></span>
		</div>
		<div class="data-line">
				<span>максимальная скорость:</span>
				<span><?php echo get_post_meta($post->ID, 'max-speed', true); ?></span>
			</div>
		
		</div>
	
	
</a>
</div>
</div>
	<?php }
?>

<? endwhile; endif; wp_reset_query(); ?>

					
			</div>
		</div>
	</section>
<br>
	<section id="content">
		<h2>Популярные квадроциклы:</h2>
		<div class="container">
				<div class="row">



				<?php if ( have_posts() ) : query_posts('cat=5&posts_per_page=8');
while (have_posts()) : the_post(); ?>
<?php
	if(get_post_meta($post->ID, 'is-main', true)){ ?>
	<div class="col-md-4 col-lg-3 col-sm-6">





<div class="product-wrap">

<a href="<?php the_permalink(); ?>" class="rozetka d-flex d-sm-none">
				<div class="rozetka-product-img">
						<img src="<?php $large_image_url = wp_get_attachment_image_src( get_post_thumbnail_id(), 'large' );
echo $large_image_url[0]; ?>" alt="sitename" class="img-responsive">
					</div>
				<div class="rozetka-product-data">
						<h4><?php the_title(); ?></h4>
						<div class="price">
								<span class="dig"><?php
			$options = get_option('sample_theme_options');
			 $kurs = $options['kurs'];
			 $price = get_post_meta($post->ID, 'price', true);
			 $res = $kurs *  $price;
			 echo ceil($res);
			   ?></span>
								<span class="valuta">грн</span>
							</div>
							<div class="data">
									<div class="data-line">
										<span>Наличие: <?php echo get_post_meta($post->ID, 'exist', true); ?></span>
										<?php if(get_post_meta($post->ID, 'delivery', true)){ ?>
	<img src="<?php echo get_template_directory_uri(); ?>/img/dostavka.png" alt="sitename" class="cond b-cond ">
<?php }
?>
<?php if(get_post_meta($post->ID, 'acz', true)){ ?>
	<img src="<?php echo get_template_directory_uri(); ?>/img/acz.png" alt="sitename" class="cond">
<?php }
?>
									</div>
								
									
									</div>	
				</div>	
			</a>



<?php if(get_post_meta($post->ID, 'acz', true)){ ?>
	<img src="<?php echo get_template_directory_uri(); ?>/img/acz.png" alt="sitename" class="cond d-none d-sm-inline">
<?php }
?>

	
<?php if(get_post_meta($post->ID, 'delivery', true)){ ?>
	<img src="<?php echo get_template_directory_uri(); ?>/img/dostavka.png" alt="sitename" class="cond b-cond d-none d-sm-inline">
<?php }
?>


<a href="<?php the_permalink(); ?>" class="product d-none d-sm-flex">
	<div class="product-img">
		<img src="<?php $large_image_url = wp_get_attachment_image_src( get_post_thumbnail_id(), 'large' );
echo $large_image_url[0]; ?>" alt="sitename">
	</div>
	
	<h4><?php the_title(); ?> </h4>
	<span class="cat"><?php
	$category = get_the_category(); 
	echo $category[0]->cat_name;
	?></span>
	<div class="gen-info">
		<div class="price">
			<span class="dig">
			
			<?php
			$options = get_option('sample_theme_options');
			 $kurs = $options['kurs'];
			 $price = get_post_meta($post->ID, 'price', true);
			 $res = $kurs *  $price;
			 echo ceil($res);
			   ?>
		
		</span>
			<span class="valuta">грн</span>
		</div>
		<!-- <span class="bye want">Смотреть</span> -->
	</div>
	
	<div class="data">
		<div class="data-line">
			<span>объем:</span>
			<span><?php echo get_post_meta($post->ID, 'ob', true); ?></span>
		</div>
		<div class="data-line">
			<span>мощность:</span>
			<span><?php echo get_post_meta($post->ID, 'power', true); ?></span>
		</div>
		<div class="data-line">
			<span>расход топлива:</span>
			<span><?php echo get_post_meta($post->ID, 'liters', true); ?></span>
		</div>
		<div class="data-line">
				<span>максимальная скорость:</span>
				<span><?php echo get_post_meta($post->ID, 'max-speed', true); ?></span>
			</div>
		
		</div>
	
	
</a>
</div>
</div>
	<?php }
?>

<? endwhile; endif; wp_reset_query(); ?>

					
			</div>
		</div>
	</section>
<?php get_footer(); ?>
