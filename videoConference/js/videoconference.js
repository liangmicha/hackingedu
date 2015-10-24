function sendTextMessageToJu(){
	jQuery.ajax({
		url:"twiliotest.php",
		type:"GET",dataType:"html",
		data:{},
		success:function(response){
			console.log(response);
		},error:function(error){
			console.error(error)
		}
	});
}


