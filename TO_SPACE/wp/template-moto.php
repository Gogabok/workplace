<?php
/**
 * Template Name: Template Moto (Moto)
 */
get_header(); ?>




</header>
<?php
    get_template_part( 'template-parts/nav-ul' );
?>
	
<section class="utp single-header" style="background-image: url(<?php echo get_template_directory_uri(); ?>/img/single.jpg)">
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
	<h1>Мотоциклы:</h1>
</section>

<div class="moby-mnu d-md-none">
	<div class="container">
	<ul>
	<li><a href="/">Главная</a></li>
				<li><a href="/mototsikly/">Мотоциклы</a></li>
				<li><a href="/skutera/">Скутеры</a></li>
				<li><a href="/mopedy/">Мопеды</a></li>
				<li><a href="/kvadrotsikly/">Квадроциклы</a></li>
		</ul>
	</div>

</div>

<section class="single">
       
    <div class="container">
            <div class="products-block">
              
                    <div class="row">


                    <?php
$idObj = get_category_by_slug('mototsikly');
$id = $idObj->term_id;
 ?>
<h2><?php echo get_cat_name($id); ?></h2>

	<div class="container-fluid">
		<div class="row">

<?php if ( have_posts() ) : query_posts('cat=' . $id);
while (have_posts()) : the_post(); ?>

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
                           
     <? endwhile; endif; wp_reset_query(); ?>        

                                    
                                    
                    </div>
                </div>
    </div>
    
</section>

<?php get_footer(); ?>