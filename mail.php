<?php 
if(isset($_POST["user_name"])){
	$user_name = $_POST["user_name"];
}

if(isset($_POST["user_phone"])){
	$user_phone = $_POST["user_phone"];
}

if(isset($_POST["user_comment"])){
	$user_comment = $_POST["user_comment"];
	$comment = true;
}

// Очищение от ненужного
function clean($value = "") {
    $value = trim($value);
    $value = stripslashes($value);
    $value = strip_tags($value);
    $value = htmlspecialchars($value);
    
    return $value;
}

// Проверка длины строки
function check_length($value = "", $min, $max) {
    $result = (mb_strlen($value) < $min || mb_strlen($value) > $max);
    return !$result;
}


if(!empty($user_name) && !empty($user_phone)) {
	if(check_length($user_name, 2, 15) && check_length($user_phone, 6, 14)) {
        $headers = 'From: My Name <myname@mydomain.com>' . "\r\n";
        $content = "Имя: " . $user_name . "<br>" 
        	. "Телефон: " . $user_phone . "<br>";

        if(isset($comment)){
        	$content .= "Комментарий: " . $user_comment;
        } 

		wp_mail('test@test.com', 'Заявка с сайта ...', $content, $headers);
    }
}














?>