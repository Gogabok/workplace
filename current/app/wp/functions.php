<?php
/**
 * Enqueue scripts and styles.
 */
function ex_scripts() {
	wp_enqueue_style( 'style', get_stylesheet_uri() );
	wp_enqueue_style( 'agrotech', get_template_directory_uri() . '/css/main.min.css' );
	wp_enqueue_script( 'agrotech', get_template_directory_uri() . '/js/scripts.min.js', array(), '', true );
	wp_enqueue_script( 'agrotech', get_template_directory_uri() . '/js/forma.js', array(), '', true );
}

add_action( 'wp_enqueue_scripts', 'ex_scripts' );

remove_action('wp_head', 'rsd_link');
remove_action('wp_head', 'wlwmanifest_link');
remove_action('wp_head', 'wp_generator');

show_admin_bar(false);

require_once ( get_stylesheet_directory() . '/theme-options.php' );

add_theme_support('post-thumbnails');
add_theme_support('custom-logo');
remove_filter( 'the_content', 'wpautop' );

function new_excerpt_length($length) {
	return 8;
}

add_filter('excerpt_length', 'new_excerpt_length');
add_filter('excerpt_more', function($more) {
	return '...';
});

## Отключаем Emojis в WordPress
if(1){
	## отключаем DNS prefetch
	add_filter('emoji_svg_url', '__return_empty_string');

	/**
	 * Disable the emoji's
	 */
	add_action( 'init', 'disable_emojis' );
	function disable_emojis() {
		remove_action( 'wp_head', 'print_emoji_detection_script', 7 );
		remove_action( 'admin_print_scripts', 'print_emoji_detection_script' );
		remove_action( 'wp_print_styles', 'print_emoji_styles' );
		remove_action( 'admin_print_styles', 'print_emoji_styles' );
		remove_filter( 'the_content_feed', 'wp_staticize_emoji' );
		remove_filter( 'comment_text_rss', 'wp_staticize_emoji' );
		remove_filter( 'wp_mail', 'wp_staticize_emoji_for_email' );
		add_filter( 'tiny_mce_plugins', 'disable_emojis_tinymce' );
	}

	/**
	 * Filter function used to remove the tinymce emoji plugin.
	 *
	 * @param    array  $plugins
	 * @return   array             Difference betwen the two arrays
	 */
	function disable_emojis_tinymce( $plugins ) {
		if ( is_array( $plugins ) ) {
			return array_diff( $plugins, array( 'wpemoji' ) );
		} else {
			return array();
		}
	}
}

add_action( 'after_setup_theme', 'theme_register_nav_menu' );
function theme_register_nav_menu() {
	register_nav_menu( 'main-top', 'main-top' );
	
}

add_action( 'widgets_init', 'metrica_widjet' );
function metrica_widjet(){
	register_sidebar( array(
		'name'          => 'metrica_widjet',
		'id'            => "metrica_widjet",
		'description'   => 'Виджет для счетчиков FB Google Яндекс и т.д.',
		'before_widget' => '',
		'after_widget'  => "",
		'before_title'  => '',
		'after_title'   => "",
	) );
}

add_theme_support( 'post-formats', array('aside', 'gallery', 'link', 'image', 'quote', 'status', 'video', 'chat', 'audio') );

add_filter( 'widget_title', 'hide_widget_title' );
function hide_widget_title( $title ) {
    if ( empty( $title ) ) return '';
    if ( $title[0] == '!' ) return '';
    return $title;
}
add_filter('how_dolar', 'count_dolar');
function count_dolar($grn){
	$options = get_option('sample_theme_options');
	$kurs = $options['kurs'];
	$grn = round($grn / $kurs);
	$grn = $grn . ' USD/м2';
	return $grn;
}

function my_feed_rss2( $for_comments ) {
	$rss_template = get_template_directory() . '/feed/myfeed-rss2.php';
	if( file_exists( $rss_template ) )
	   load_template( $rss_template );
	else
	   do_feed_rss2( $for_comments ); // вызов функции по умолчанию
 }
 remove_all_actions( 'do_feed_rss2' );
 add_action( 'do_feed_rss2', 'my_feed_rss2', 10, 1 );