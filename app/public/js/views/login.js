$(document).ready(function(){var b=new LoginValidator;new LoginController;$("#login-form").ajaxForm({beforeSubmit:function(a,c,d){if(0==b.validateForm())return!1;a.push({name:"remember-me",value:1==$("input:checkbox:checked").length});return!0},success:function(a,c,d,b){"success"==c&&(window.location.href="/lservices")},error:function(a){b.showLoginError("Login Failure","Please check your username and/or password")}});$("#user-tf").focus();var a=new EmailValidator;$("#get-credentials-form").ajaxForm({url:"/lost-password",
beforeSubmit:function(b,c,d){if(a.validateEmail($("#email-tf").val()))return a.hideEmailAlert(),!0;a.showEmailAlert("<b> Error!</b> Please enter a valid email address");return!1},success:function(b,c,d,e){a.showEmailSuccess("Check your email on how to reset your password.")},error:function(){a.showEmailAlert("Sorry. There was a problem, please try again later.")}})});
