<?php
if(empty($_REQUEST['subject'])) {
  $email = htmlspecialchars(stripslashes(trim($_REQUEST['email'])));
  $message = htmlspecialchars(stripslashes(trim($_REQUEST['message'])));

  if(!isset($email) || empty($email)) {
    $error .= "Моля, попълнете e-mail."; 
  }  
  if(!isset($message) || empty($message)) {
    $error .= "Моля, попълнете съобщение."; 
  }
  if(!preg_match('/(^[a-zA-Z_.+-]+)@([a-zA-Z_-]+).([a-zA-Z]{2,4}$)/i', $email)) {
    $error .= "Моля, попълнете валиден e-mail."; 
  }
  if( isset($error) && !empty($error) ) { echo $error; exit;}

  $additional_headers = "From: ".$email. "\n";
  $additional_headers .= 'MIME-Version: 1.0' . "\n";
  $additional_headers .= 'Content-Type: text/plain; format=flowed; charset=utf-8;'. "\n";
  $additional_headers .= 'Content-Transfer-Encoding: 8bit'. "\n";

  $subject='Message from web site ignisdesign.info';
  $date=date("F j, Y, g:ia");
  $toadress='burmova@yahoo.com';
  $mailcontent='Date: '.$date."\n".'Message: '.$message."\n";

  if ( mail($toadress, $subject, $mailcontent, $additional_headers) ) {
    echo "Съобщението е изпратено успешно.";
  } else {
    echo "Съобщението не е изпратено.";
  }

}
?>
