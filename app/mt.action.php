<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
  if ((!empty($_POST['form__email']) || !empty($_POST['form__phone']))){
    if (isset($_POST['form__email'])) {
    	if (!empty($_POST['form__email'])){
	      $uemail = strip_tags($_POST['form__email']) . "<br>";
	      $uemailFieldset = "<b>Почта:</b>";
	 	  }
    }
    if (isset($_POST['form__phone'])) {
    	if (!empty($_POST['form__phone'])){
	      $uphone = strip_tags($_POST['form__phone']) . "<br>";
	      $uphoneFieldset = "<b>Телефон:</b>";
	    }
    }
    if (isset($_POST['form__delivery'])) {
    	if (!empty($_POST['form__delivery'])){
	      $udelivery = strip_tags($_POST['form__delivery']) . "<br>";
	      $udeliveryFieldset = "<b>Способ доставки:</b>";
	    }
    }
    if (isset($_POST['form__payment'])) {
    	if (!empty($_POST['form__payment'])){
	      $upayment = strip_tags($_POST['form__payment']) . "<br>";
	      $upaymentFieldset = "<b>Способ оплаты:</b>";
	    }
    }
    if (isset($_POST['form__cost'])) {
    	if (!empty($_POST['form__cost'])){
	      $ucost = strip_tags($_POST['form__cost']) . "<br>";
	      $ucostFieldset = "<b>Полная стоимость (руб.):</b>";
	    }
    }
    if (isset($_POST['form__name'])) {
    	if (!empty($_POST['form__name'])){
	      $uname = strip_tags($_POST['form__name']) . "<br>";
	      $unameFieldset = "<b>Название:</b>";
	    }
    }
    if (isset($_POST['form__sale'])) {
    	if (!empty($_POST['form__sale'])){
	      $usale = strip_tags($_POST['form__sale']) . "<br>";
	      $usaleFieldset = "<b>Скидка:</b>";
	    }
    }
    if (isset($_POST['form__number'])) {
    	if (!empty($_POST['form__number'])){
	      $unumber = strip_tags($_POST['form__number']) . "<br>";
	      $unumberFieldset = "<b>Артикул:</b>";
	    }
    }
    if (isset($_POST['form__price'])) {
    	if (!empty($_POST['form__price'])){
	      $uprice = strip_tags($_POST['form__price']) . "<br>";
	      $upriceFieldset = "<b>Цена за единицу:</b>";
	    }
    }
    if (isset($_POST['form__amount'])) {
    	if (!empty($_POST['form__amount'])){
	      $uamount = strip_tags($_POST['form__amount']) . "<br>";
	      $uamountFieldset = "<b>Количество:</b>";
	    }
    }
    if (isset($_POST['form__order'])) {
    	if (!empty($_POST['form__order'])){
	      $uorder = strip_tags($_POST['form__order']) . "<br>";
        $uorderFieldset = "<b>Номер заказа:</b>";
	    }
    }
    if (isset($_POST['form__address'])) {
    	if (!empty($_POST['form__address'])){
	      $uaddress = strip_tags($_POST['form__address']);
        $uaddressFieldset = "<b>Адрес доставки:</b>";
	    }
    }



    $to = "mtsymlov@yandex.ru,opahomova2008@yandex.ru"; /*Укажите адрес, на который должно приходить письмо*/
    $sendfrom = "stroy.sale"; /*Укажите адрес, с которого будет приходить письмо */
    $headers  = "From: " . strip_tags($sendfrom) . "\r\n";
    $headers .= "Reply-To: ". strip_tags($sendfrom) . "\r\n";
    $headers .= "MIME-Version: 1.0\r\n";
    $headers .= "Content-Type: text/html;charset=utf-8 \r\n";
    $headers .= "Content-Transfer-Encoding: 8bit \r\n";
    $subject = "STROY.SALE -- новое письмо -- БЫСТРЕЕЕЕ!";
    $message = "$uemailFieldset $uemail
                $uphoneFieldset $uphone
                $unameFieldset $uname
                $unumberFieldset $unumber
                $uamountFieldset $uamount
                $ucostFieldset $ucost
                $upriceFieldset $uprice
                $usaleFieldset $usale
                $udeliveryFieldset $udelivery
                $upaymentFieldset $upayment
                $uorderFieldset $uorder
                $uaddressFieldset $uaddress
                ";

    $send = mail ($to, $subject, $message, $headers);

  } else {
  	echo '<p class="fail">Ошибка. Вы заполнили не все обязательные поля!</p>';
  }
} else {
  header ("Location: http://stroy.sale");
}
