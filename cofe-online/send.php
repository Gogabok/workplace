<?php
$to = 'gogabok123@gmail.com';
$subject = 'Заявка с сайта';
$headers  = "Content-type: text/html; charset=utf-8 \r\n";
$headers .= "From: Отправитель <from@example.com>\r\n";
mail($to, $subject, $_POST['text'], $headers);
?>