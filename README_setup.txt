
0) skip this step if tokens are still active: 
	- go to twilio.com/user/account/video/testing-tools after login to your account.
	- enter an Endpoint name and press generate token. This is the teacher stuff.
	- in base.js, replace the teacher endpointName and the teacher token
	- refresh the twilio page and regenerate a token with a different endpoint name. (the name doesn't matter this time)
	- in base.js, replace the student token with the one you just generated.


1) run the following command: node server.js (main folder)
2) in your browser go to localhost:3000/teacher.html or localhost:3000/student.html
   teacher needs to be loaded first.
