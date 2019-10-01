<?php get_header(); ?>


   <?php
    // Start the loop.
    while ( have_posts() ) : the_post();?>

   </header>
   <?php
    get_template_part( 'template-parts/nav-ul' );
?>

<section class="utp single-header" style="background-image: url(<?php $large_image_url = wp_get_attachment_image_src( get_post_thumbnail_id(), 'large' );
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
	<h1 class="col-md-none"><?php the_title(); ?></h1>
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
            
        <div class="row">
            <div class="col-md-7">
            <div class="itemdetails_aside">
                            <a class="fancybox" data-fancybox="images" rel="gallery1" href="<?php $large_image_url = wp_get_attachment_image_src( get_post_thumbnail_id(), 'large' );
	echo $large_image_url[0]; ?>">
                                <img src="<?php $large_image_url = wp_get_attachment_image_src( get_post_thumbnail_id(), 'large' );
	echo $large_image_url[0]; ?>" alt="<?php the_title(); ?>"  class="img-responsive">
                            </a>
                        </div>
                        <div class="thumbnails">
                        <?php
  if ( get_post_meta( $post->ID, 'gal', false ) ){ //images название вашего произвольного поля
    $image_array = get_post_meta( $post->ID, 'gal', false ); //images название вашего произвольного поля
}
if ( $image_array ) {

    foreach ( $image_array as $image ) {
        
       // $thumbimg = wp_get_attachment_image( $image['ID'], 'thumbnail');
        $fullimg = pods_image_url( $image['ID'], 'large');
        echo '<a href="'.  $fullimg . '" rel="gallery1" data-fancybox="images"> <img src="'.  $fullimg . '" rn="ar1" alt="ar1" title="Click thumbnail to enlarge" width="107" height="107" class="fancybox"/></a>';
        
    }
}

?>
                        </div>

            </div>
            <div class="col-md-5">
										<h2 class="d-none d-md-block"><?php the_title(); ?></h2>
                    <?php if(get_post_meta($post->ID, 'acz', true)){ ?>
									<img src="<?php echo get_template_directory_uri(); ?>/img/acz.png" alt="sitename" class="cond">
								<?php }
								?>

									
								<?php if(get_post_meta($post->ID, 'delivery', true)){ ?>
									<img src="<?php echo get_template_directory_uri(); ?>/img/dostavka.png" alt="sitename" class="cond">
								<?php }
								?>
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
                                <div class="data-line">
                                        <span>В наличии:</span>
                                        <span><?php echo get_post_meta($post->ID, 'exist', true); ?></span>
                                    </div>
                            </div>
               
                                           
                                <div class="price-single"><?php
											$options = get_option('sample_theme_options');
											 $kurs = $options['kurs'];
											 $price = get_post_meta($post->ID, 'price', true);
											 $res = $kurs *  $price;
                       echo ceil($res);
                         ?>
                          грн</div>
                                <div class="price-single">
                                    <a href="#to-call" class="bye want open-popup-link">Купить</a>


                                    <?php
				
      $idn = $post->ID;
      $name = get_the_title();  

      $cena = str_replace(' ', '', get_post_meta($post->ID, 'price', true)); 

       
   $product_id= $idn; //код товара на сайте магазина
   $product_name= $name; //название товара на сайте магазина
   $product_price= $cena; //цена товара на сайте магазина
   $product_url= get_page_link(); //ссылка на товар на сайте магазина

   $credit_link="http://agents.kreditmarket.ua/partners/_general/v01cart/?uid=9ck4558354065957";
   $credit_link.="&product_id=".$product_id;
   $credit_link.="&product_name=".urlencode($product_name);
   $credit_link.="&product_price=".$product_price;
   $credit_link.="&product_url=".urlencode($product_url);
   
?>   
                                    <a href="<?php echo $credit_link; ?>" class="b-openpopup bye want">Купить в кредит</a>



                                         
                                           
                                </div>

            </div>
            <div class="single-text">

                    <ul class="nav nav-tabs" role="tablist">
                            <li class="nav-item">
                              <a class="nav-link active" data-toggle="tab" href="#home">Описание:</a>
                            </li>
                            <li class="nav-item">
                              <a class="nav-link" data-toggle="tab" href="#menu1">Характеристики:</a>
                            </li>
                        
                          </ul>
                        
                          <!-- Tab panes -->
                          <div class="tab-content">
                            <div id="home" class="container tab-pane active"><br>
                              
                            <p><?php echo get_post_meta($post->ID, 'descr', true); ?></p>
                            </div>
                            <div id="menu1" class="container tab-pane fade"><br>
                              
                            <p><?php echo get_post_meta($post->ID, 'chars', true); ?></p>
                            </div>
                            
                          </div>
                
                </div>
        </div>
    </div>
    <? endwhile; wp_reset_query(); ?>
</section>


<?php get_footer(); ?>

	
