<?php
header('Content-Type: text/html; charset=utf-8');

$filename_refresh_token = "refresh_token";
$refresh_token = file_get_contents($filename_refresh_token);
$filename_access_token = "access_token";
$access_token =  file_get_contents($filename_access_token);

$subdomain = 'kafunsy'; //Поддомен нужного аккаунта


function update_tokens(){
    global $subdomain, $refresh_token;
   
    $link = 'https://' . $subdomain . '.amocrm.ru/oauth2/access_token'; //Формируем URL для запроса

    $data = [
        'client_id' => '528b282a-0152-47f0-b427-e17e533db4a2',
        'client_secret' => 'lxhQ1gWvPhoK4AqTdg5nbH46cVqpXwmTkRl9vsqzWPLFy1l7KACkHJ6uH4szhu4y',
        'grant_type' => 'refresh_token',
        'refresh_token' => $refresh_token,
        'redirect_uri' => 'https://isuperface.website/amocrm/exemple.php',
    ];

    $curl = curl_init(); //Сохраняем дескриптор сеанса cURL
    /** Устанавливаем необходимые опции для сеанса cURL  */
    curl_setopt($curl,CURLOPT_RETURNTRANSFER, true);
    curl_setopt($curl,CURLOPT_USERAGENT,'amoCRM-oAuth-client/1.0');
    curl_setopt($curl,CURLOPT_URL, $link);
    curl_setopt($curl,CURLOPT_HTTPHEADER,['Content-Type:application/json']);
    curl_setopt($curl,CURLOPT_HEADER, false);
    curl_setopt($curl,CURLOPT_CUSTOMREQUEST, 'POST');
    curl_setopt($curl,CURLOPT_POSTFIELDS, json_encode($data));
    curl_setopt($curl,CURLOPT_SSL_VERIFYPEER, 1);
    curl_setopt($curl,CURLOPT_SSL_VERIFYHOST, 2);
    $out = curl_exec($curl); //Инициируем запрос к API и сохраняем ответ в переменную
    $code = curl_getinfo($curl, CURLINFO_HTTP_CODE);
    curl_close($curl);
    /** Теперь мы можем обработать ответ, полученный от сервера. Это пример. Вы можете обработать данные своим способом. */
    $code = (int)$code;
    $errors = [
        400 => 'Bad request',
        401 => 'Unauthorized',
        403 => 'Forbidden',
        404 => 'Not found',
        500 => 'Internal server error',
        502 => 'Bad gateway',
        503 => 'Service unavailable',
    ];

    try
    {
        /** Если код ответа не успешный - возвращаем сообщение об ошибке  */
        if ($code < 200 || $code > 204) {
            throw new Exception(isset($errors[$code]) ? $errors[$code] : 'Undefined error', $code);
        }
    }
    catch(\Exception $e)
    {
        die('Ошибка: ' . $e->getMessage() . PHP_EOL . 'Код ошибки: ' . $e->getCode());
    }

    /**
     * Данные получаем в формате JSON, поэтому, для получения читаемых данных,
     * нам придётся перевести ответ в формат, понятный PHP
     */
    $response = json_decode($out, true);

    $access_token = $response['access_token']; //Access токен
    $refresh_token = $response['refresh_token']; //Refresh токен
    $token_type = $response['token_type']; //Тип токена
    $expires_in = $response['expires_in']; //Через сколько действие токена истекает

    //print_r($response);

    $filename1 = "refresh_token";
    file_put_contents($filename1, $response['refresh_token']);

    $filename2 = "access_token";
    file_put_contents($filename2, $response['access_token']);
}

function new_lead($name, $price, $num){
    global $subdomain, $access_token;

    $link = 'https://' . $subdomain . '.amocrm.ru/api/v2/leads'; //Формируем URL для запроса

    

    $leads['add'] = array( 
        array(
            'name' => $name."[x".$num."]",
            'sale' => $price,
            'status_id' => 7087609,
            'responsible_user_id' => 215309,
            'custom_fields' => array(
                array(
                    #Нестандартное дополнительное поле типа "мультисписок", которое мы создали
                    'id' => 206787,
                    'values'=>array(
                        array(
                          'value' => $num, 
                        ),
                ),
            ))
    ));

    /** Формируем заголовки */
    $headers = [
        'Authorization: Bearer ' . $access_token
    ];
    /**
     * Нам необходимо инициировать запрос к серверу.
     * Воспользуемся библиотекой cURL (поставляется в составе PHP).
     * Вы также можете использовать и кроссплатформенную программу cURL, если вы не программируете на PHP.
     */
    $curl = curl_init(); //Сохраняем дескриптор сеанса cURL
    /** Устанавливаем необходимые опции для сеанса cURL  */
    curl_setopt($curl,CURLOPT_RETURNTRANSFER, true);
    curl_setopt($curl,CURLOPT_USERAGENT,'amoCRM-oAuth-client/1.0');
    curl_setopt($curl,CURLOPT_URL, $link);
    curl_setopt($curl, CURLOPT_CUSTOMREQUEST, 'POST');
    curl_setopt($curl, CURLOPT_POSTFIELDS, json_encode($leads));
    curl_setopt($curl,CURLOPT_HTTPHEADER, $headers);
    curl_setopt($curl,CURLOPT_HEADER, false);
    curl_setopt($curl,CURLOPT_SSL_VERIFYPEER, 1);
    curl_setopt($curl,CURLOPT_SSL_VERIFYHOST, 2);
    $out = curl_exec($curl); //Инициируем запрос к API и сохраняем ответ в переменную
    $code = curl_getinfo($curl, CURLINFO_HTTP_CODE);
    curl_close($curl);
    /** Теперь мы можем обработать ответ, полученный от сервера. Это пример. Вы можете обработать данные своим способом. */
    $code = (int)$code;

  
    if ($code < 200 || $code > 204) {
        return false;
    }
 
    return json_decode($out, true)["_embedded"]["items"][0]["id"];
}


function new_contact($first_name, $last_name, $city, $num_otdel, $telephone, $id){
    global $subdomain, $access_token;

    if($id == false)
        return false;

    $link = 'https://' . $subdomain . '.amocrm.ru/api/v2/contacts'; //Формируем URL для запроса

    $contacts['add'] = array(
        array(
            'first_name' => $first_name,
            "last_name" => $last_name,
            'leads_id' => array(
                $id,
            ),
            'custom_fields' => array(
                array(
                    'id' => 166901,
                    'values' => array(
                        array(
                            'value' => $city,
                        ),
                    ),
                ),
                
                array(
                    'id' => 166903,
                    'values' => array(
                        array(
                            'value' => $num_otdel,
                        ),
                    ),
                ),
    
                array(
                    'id' => 129379,
                    'values' => array(
                        array(
                            'value' => $telephone,
                            'enum' => "WORK",
                        )
                    ),
                ),
            ),
        ),
    );
    
    
    $headers = [
        'Authorization: Bearer ' . $access_token
    ];
    
    
    $curl = curl_init(); //Сохраняем дескриптор сеанса cURL
    
    curl_setopt($curl,CURLOPT_RETURNTRANSFER, true);
    curl_setopt($curl,CURLOPT_USERAGENT,'amoCRM-oAuth-client/1.0');
    curl_setopt($curl,CURLOPT_URL, $link);
    curl_setopt($curl, CURLOPT_CUSTOMREQUEST, 'POST');
    curl_setopt($curl, CURLOPT_POSTFIELDS, json_encode($contacts));
    curl_setopt($curl,CURLOPT_HTTPHEADER, $headers);
    curl_setopt($curl,CURLOPT_HEADER, false);
    curl_setopt($curl,CURLOPT_SSL_VERIFYPEER, 1);
    curl_setopt($curl,CURLOPT_SSL_VERIFYHOST, 2);
    $out = curl_exec($curl); //Инициируем запрос к API и сохраняем ответ в переменную
    $code = curl_getinfo($curl, CURLINFO_HTTP_CODE);
    curl_close($curl);
    
    $code = (int)$code;

  
    if ($code < 200 || $code > 204)
        return false;
   
    return true;
    
}


if(isset($_POST["btn"]))
{
    if(!new_contact($_POST['firstname'], $_POST['lastname'], $_POST['city'], $_POST['otdel'], $_POST['telephone'], new_lead($_POST['tovar_name'], $_POST['price'], $_POST['number']))){
        update_tokens();
        new_contact($_POST['firstname'], $_POST['lastname'], $_POST['city'], $_POST['otdel'], $_POST['telephone'], new_lead($_POST['tovar_name'], $_POST['price'], $_POST['number']));
    }
}

header('Location: https://isuperface.website/thanks.php');

?>