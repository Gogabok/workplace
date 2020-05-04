<?php
if (isset($_SERVER['HTTP_REFERER'])) 
{
	$sendto  = 'fox.mik@yandex.ru';
	$from  = 'fox.mik@yandex.ru';
	$subject  = 'Заявка (Клининговые услуги)';
	$headers  = "From: ".$from."\r\n";
	$headers .= "Reply-To: ".$from."\r\n";
	$headers .= "MIME-Version: 1.0\r\n";
	$headers .= "Content-Type: text/html;charset=utf-8 \r\n";
	$msg  = "<html><body style='font-family:Arial,sans-serif;'>";
	$msg .= "<h2 style='font-weight:bold;border-bottom:1px dotted #ccc;'>".$subject."</h2>\r\n";
	$data['status'] = "OK";
	$data['msg'] = "Спасибо. Ваша заявка успешно отправлена!";
	if (isset($_POST['name']))
	{
		if ($_POST['name']!=='') {
			$msg .= "<p><strong>Имя:</strong> ".$_POST['name']."</p>\r\n";
		}
	}
	if (isset($_POST['phone']))
	{
		if ($_POST['phone']!=='') {
			$msg .= "<p><strong>Телефон:</strong> ".$_POST['phone']."</p>\r\n";
		}
	}
	$msg .= "</body></html>";
	if (@mail($sendto, $subject, $msg, $headers))   {
		echo json_encode($data);
	} else {
		echo "false";
	}
}
?>