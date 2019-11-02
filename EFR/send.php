<?php

if (isset($_POST["name"]) && isset($_POST["phone"]) && isset($_POST["email"]) ) { 
    $headers  = "Content-type: text/html; charset=utf-8 \r\n";
    $headers .= "From: Отправитель <from@example.com>\r\n";
    $name = $_POST["name"];
    $phone = $_POST["phone"];
    $email = $_POST["email"];
    $desc = $_POST["desc"];
    $result = "Имя: " . $name . "\nТелефон: " . $phone . "\nПочта " . $email . "\nОписание " . $desc;
    mail("Theresa.Holiday@efregulator.com", "Заявка с сайта", $result, $headers);
}

?>