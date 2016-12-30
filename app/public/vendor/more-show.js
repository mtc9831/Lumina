$(document).ready(function() {
  $('div.remo-show > div').hide();
  $(".morebutton2").hide();
  var el = $("a[class^='more']");  
  $('div.remo-show > h3').click(function() {
    $(this).next().slideToggle('fast');
  });
  $(".morebutton1").click(function () {
    $(this).hide();
	$(this).next().show();
	$(this).next().next().show();
  });
  $(".morebutton2").click(function () {
    $(this).hide();
	$(this).prev().show();
	$(this).next().hide();
  });
});
