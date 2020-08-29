<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Оформление заказа</title>
  <link type="text/css" rel="stylesheet" href="./style.css">
  <script src="https://code.jquery.com/jquery-1.12.4.min.js"
    integrity="sha256-ZosEbRLbNQzLpnKIkEdrPv7lOy9C27hHQ+Xp8a4MxAQ=" crossorigin="anonymous"></script>
  <script src="./main.js"></script>
  <?php include '/home/k/kafunsy/isuperface.website/public_html/code.php'; ?>
</head>

<body>

  <div class="thanks-wrapper">
    <p class="thanks-title">
      Спасибо за заказ.
    </p>
    <p class="thanks-desc">
      Мы уведомим вас об отправке заказанных товаров
    </p>
    <img class="thanks-preview" ondragstart="return false" src="./images/preview.png" alt="">
    <p class="thanks-title">
      Доставка <span id="today">1</span> - <span id="tomorrow"></span>
    </p>
    <p class="thanks-desc">
      Achromin
    </p>
    <p class="thanks-desc">
      Количество: <span id="amount-thanks"></span>
    </p>
  </div>

</body>

</html>