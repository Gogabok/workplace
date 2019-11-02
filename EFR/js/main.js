$(document).ready(function () {
  $(function () {
    $("a[href^='#']").click(function () {
      var _href = $(this).attr("href");
      $("html, body").animate({ scrollTop: $(_href).offset().top + "px" });
      return false;
    });
  });
  $("#btn").click(
    function () {
      sendAjaxForm();
      return false;
    }
  );
});

function sendAjaxForm() {
  $.ajax({
    url: "/send.php",
    type: "POST",
    dataType: "html",
    data: $("#form").serialize(),
    success: function (response) {
      //   result = JSON.parse(response);
      alert('Спасибо за вашу заявку!')
    },
    error: function (response) {
      alert('Произошла ошибка')
    }
  });
}


