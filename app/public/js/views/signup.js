function rpHash(c){for(var a=5381,b=0;b<c.length;b++)a=(a<<5)+a+c.charCodeAt(b);return a}
$(document).ready(function(){var c=new AccountValidator;$("#account-form h1").text("Signup");$("#account-form #sub1").text("Please tell us a little about yourself");$("#account-form #sub2").text("Choose your username & password");$("#account-form-btn1").html("Cancel");$("#account-form-btn2").html("Submit");$.salt="#salt";$("#real11").realperson();$("#name-tf").focus();$("#account-form").ajaxForm({beforeSubmit:function(a,b,d){return c.validateForm()},success:function(a,b,c,e){"success"==b&&$(".modal-alert").modal("show")},
error:function(a){"email-taken"==a.responseText?c.showInvalidEmail():"username-taken"==a.responseText&&c.showInvalidUserName()}});$("#real11").keyup(function(){var a=$("#real11").val(),b=$("#real11").realperson("getHash"),a=rpHash(a+$.salt);b==a?($("#account-form-btn2").addClass("btn-primary"),$("#account-form-btn2").removeAttr("disabled")):$("#account-form-btn2").attr("disabled","disabled")});$(".modal-alert").modal({show:!1,keyboard:!1,backdrop:"static"});$(".modal-alert .modal-header h3").text("Success!");
$(".modal-alert .modal-body p").html("Your account has been created.An email has been sent to your email ID.Click on the link in the email to activate your account.")});