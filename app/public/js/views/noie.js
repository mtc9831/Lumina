var isIE=null,ieVersion=null;if("Microsoft Internet Explorer"==navigator.appName){var isIE=!0,ua=navigator.userAgent,re=/MSIE ([0-9]{1,}[.0-9]{0,})/;null!=re.exec(ua)&&(ieVersion=parseInt(RegExp.$1))}else isIE=!1;1==isIE&&8>=ieVersion&&alert("Please use latest version of internet explorer for better user experience");
