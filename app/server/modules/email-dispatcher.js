var api_key="key-65537839e609bd6456874e646f05177f",domain="sandbox517084dd6ee74222adf91a15cf140d92.mailgun.org",mailgun=require("mailgun-js")({apiKey:api_key,domain:domain}),AM=require("./account-manager"),EM={};module.exports=EM;EM.dispatchResetPasswordLink=function(a,c){var b={from:"CliqueLearn Admin <admin@cliquelearn.org>",to:a.email,subject:"Password Reset",html:EM.composeEmail(a)};mailgun.messages().send(b,function(b,a){console.log(a)})};
EM.composeEmail=function(a){var c="http://cliqueserv.org/reset-password?e="+a.email+"&p="+a.pass,b;b="<html><body>"+("Hi "+a.name+",<br><br>");b+="Your username is :: <b>"+a.user+"</b><br><br>";b=b+("<a href='"+c+"'>Please click here to reset your password</a><br><br>")+"Cheers,<br>";b+="Administrator<br><br>";return b+="</body></html>"};
EM.dispatchAccountActivationLink=function(a,c){var b={from:"CliqueLearn Admin <admin@cliquelearn.org>",to:a[0].email,subject:"CliqueLearn Account Activation",html:EM.composeEmail3(a[0])};mailgun.messages().send(b,function(b,a){console.log(a)})};
EM.composeEmail3=function(a){var c="http://cliqueserv.org/activate_user?e="+a.email+"&p="+a.pass,b;b="<html><body>"+("Hi "+a.name+",<br><br>");b+="Your username is :: <b>"+a.user+"</b><br><br>";b=b+("<a href='"+c+"'>Please click here to activate your account</a><br><br>")+"Cheers,<br>";b+="Administrator<br><br>";return b+="</body></html>"};
EM.dispatchStateChangeNotification=function(a,c){var b=a.title,d=a.jobtype,g=a.jobstatus,e=a.employer,f=a.worker;"undefined"===typeof a.worker&&(f="");AM.getAccountByUsername(e,function(a){if(a){var e=a.email;""!=f&&AM.getAccountByUsername(f,function(a){a&&(a={from:"CliqueLearn Admin <admin@cliquelearn.org>",to:[e,a.email],subject:"CliqueLearn - Freelance Job State Change Notification",html:EM.composeEmail2(b,d,c,g)},mailgun.messages().send(a,function(a,b){console.log(b)}))})}})};
EM.composeEmail2=function(a,c,b,d){a="<html><body>"+("Hello,<br>Job status for "+a+" changed from "+EM.getState(c,b)+" to "+EM.getState(c,d)+"<br>");a+="Regards,<br>Administrator<br><br>";return a+="</body></html>"};EM.getState=function(a,c){var b="";999==c?b="NEW_POST":998==c?b="BIDDING_COMPLETE":0==c?b="OPEN_FOR_BIDDING"==a?"APPROVED_POST":"ADVERTISED_POST":1==c?b="CHECKED_OUT":2==c?b="TASK_SUBMITTED":3==c?b="TASK_ACCEPTED":4==c?b="PAYMENT_COMPLETE":5==c&&(b="TASK_CLOSED");return b};