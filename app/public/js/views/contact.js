$(document).ready(function(){$("#submitFeedback").on("click",function(){var a=!0,b=0;"--SELECT ONE--"==$("#fbType").val().trim()?(a=!1,$("#fbType").attr("style","background-color:#EEDD82 !important")):("Feedback"==$("#fbType").val().trim()?b=1:"Query"==$("#fbType").val().trim()&&(b=2),$("#fbType").attr("style","background-color:#FFFFFF !important"));""==$("#fbProvider").val().trim()?(a=!1,$("#fbProvider").attr("style","width: 346px; height: 25px; background-color:#EEDD82 !important")):$("#fbProvider").attr("style",
"width: 346px; height: 25px; background-color:#FFFFFF !important");""==$("#fbProviderContact").val().trim()?(a=!1,$("#fbProviderContact").attr("style","width: 300px; height: 25px; background-color:#EEDD82 !important")):$("#fbProviderContact").attr("style","width: 300px; height: 25px; background-color:#FFFFFF !important");""==$("#fbProviderEmail").val().trim()?(a=!1,$("#fbProviderEmail").attr("style","width: 348px; height: 25px; background-color:#EEDD82 !important")):$("#fbProviderEmail").attr("style",
"width: 348px; height: 25px; background-color:#FFFFFF !important");""==$("#feedbackText").val().trim()?(a=!1,$("#feedbackText").attr("style","width: 450px; height: 150px;background-color:#EEDD82 !important")):$("#feedbackText").attr("style","width: 450px; height: 150px;background-color:#FFFFFF !important");a&&($.ajax({url:"/Contact",type:"POST",data:{fbType:b,fbProvider:$("#fbProvider").val().trim(),fbProviderContact:$("#fbProviderContact").val().trim(),fbProviderEmail:$("#fbProviderEmail").val().trim(),
feedback:$("#feedbackText").val().trim()},success:function(){},error:function(a){console.log(a.responseText+" :: "+a.statusText)}}),alertify.alert("Feedback submitted.",function(){alertify.message("OK")}),window.location.reload())})});