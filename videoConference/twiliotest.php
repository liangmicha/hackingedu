<?php 


require('twilio-php-master/Services/Twilio.php'); 
 
$account_sid = 'AC7e12a5146109cf9aeb61a50793a35935'; 
$auth_token = 'b8da5c809ea8194915f733d4ee13fd7a'; 
$client = new Services_Twilio($account_sid, $auth_token); 


$client->account->messages->create(array( 
	'To' => "+14127087438", 
	'From' => "+13156794908", 
	'Body' => 'Yo. this is ju'  
));

