function EmailValidator(){var a=this;a.retrievePassword=$("#get-credentials");a.retrievePassword.modal({show:!1,keyboard:!0,backdrop:!0});a.retrievePasswordAlert=$("#get-credentials .alert");a.retrievePassword.on("show",function(){$("#get-credentials-form").resetForm();a.retrievePasswordAlert.hide()})}EmailValidator.prototype.validateEmail=function(a){return/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(a)};
EmailValidator.prototype.showEmailAlert=function(a){this.retrievePasswordAlert.attr("class","alert alert-error");this.retrievePasswordAlert.html(a);this.retrievePasswordAlert.show()};EmailValidator.prototype.hideEmailAlert=function(){this.retrievePasswordAlert.hide()};EmailValidator.prototype.showEmailSuccess=function(a){this.retrievePasswordAlert.attr("class","alert alert-success");this.retrievePasswordAlert.html(a);this.retrievePasswordAlert.fadeIn(500)};