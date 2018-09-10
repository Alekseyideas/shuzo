<?php

function create_post_type() {
  wp_register_style( 'slider-settings', get_template_directory_uri() . '/layouts/plugins/slider-settings.css' );
  wp_enqueue_style( 'slider-settings' );

  $labels = [
    'name' => __( 'Слайдер' ),
    'singular_name' => __( 'Слайд' ),
    'add_new' => __( 'Добавить новый' ),
    'add_new_item' => __( 'Добавить новый слайд' ),
    'edit_item' => __( 'Изменить слайд' ),
  ];
  $args = [
    'labels' => $labels,
    'public' => true,
    'show_in_rest' => true,
    'show_ui' => true,
    'supports' => ['title','editor','thumbnail','post-formats'],
    'menu_position' => 2
  ];

  register_post_type( 'slides', $args );


}
add_action( 'init', 'create_post_type' );

add_action('admin_menu', 'register_my_custom_submenu_page');


function register_my_custom_submenu_page() {
  add_submenu_page( 'edit.php?post_type=slides', 'Настрока слайдера', 'Настройка', 'manage_options', 'slides-settings', 'slidesSettingsCallback' );

}
?>
<?php
function slidesSettingsCallback()
{
  ?>
  <div class="wrap">
    <h2>Настройки слайдера</h2>
    <form method="post" action="options.php">
      <?php wp_nonce_field('update-options') ?>
      <br>
      <br>
      <div class='flex f-a-c'>
        <span style='display: block; line-height: 26px'>Скорость слайдов(в секундах):</span>
        <input type="text" name="slidesSpeed" class='def-input' value="<?php echo get_option('slidesSpeed'); ?>" />
      </div>
      <br>
      <div class='flex f-a-c'>
        <span style='display: block; line-height: 26px'>Время задержки(в секундах):</span>
        <input type="text" name="autoplaySpeed" class='def-input' value="<?php echo get_option('autoplaySpeed'); ?>" />
      </div>
      <p>
        <strong>Fade in</strong><br />
        <label>Да</label>
        <input type='radio' name='fadeIn' value='1' <?php echo get_option('fadeIn') === '1' ? 'checked' : null ?>>
        <label>Нет</label>
        <input type='radio' name='fadeIn' value='0' <?php echo get_option('fadeIn') === '0' ? 'checked' : null ?>>
      </p>

      <p>
        <strong>Анимация текста:</strong><br />
        <label>Да</label>
        <input type='radio' name='textAnimation' value='true' <?php echo get_option('textAnimation') === 'true' ? 'checked' : null ?>>
        <label>Нет</label>
        <input type='radio' name='textAnimation' value='false' <?php echo get_option('textAnimation') === 'false' ? 'checked' : null ?>>
      </p>

      <input type="hidden" name="action" value="update" />
      <input type="hidden"
             name="page_options"
             value=" slidesSpeed,
             textAnimation,
             autoplaySpeed,
             fadeIn" />

      <p><input type="submit" name="Submit" class='button button-primary' value="Сохранить настройки" /></p>

    </form>
  </div>
  <?php
}
?>

<?php
//add_action( 'rest_api_init', 'slug_register_starship' );
//function slug_register_starship() {
//  register_rest_field( 'slides',
//    'settings',
//    array(
//      'get_callback'    => 'slug_get_starship',
//      'update_callback' => null,
//      'schema'          => null,
//    )
//  );
//}


// Register the rest route
add_action( 'rest_api_init', function () {

  register_rest_route( 'wp/v2', 'slider-settings',array(
    'callback' => 'slug_get_starship'
  ) );

} );
function slug_get_starship(){
  return [
    'speed' => get_option('slidesSpeed'),
    'animation' => get_option('textAnimation'),
    'fadeIn' => get_option('fadeIn'),
    'autoplaySpeed' => get_option('autoplaySpeed')
  ];
}
