function openUploadPhoto(_src,id){
 "user"==_src?$(".photopopup").load('http://www.cliqueserv.org'+"/ui/profile/photo.jsp"):(_src="group")&&$(".photopopup").load(contextpath+"/ui/profile/photo.jsp?fs=thumb&type=group&EID="+euc(id)),openPhotoPopUp()
 }

 function openPhotoPopUp(){
   $(".photopopup").css("cursor","auto"),$(".photopopup").css("height","auto"),$("#opacity,.photopopup").show()
}

$(document).ready(function(){
	ztopbar ({
		product: "accounts", //No I18N
		homePageLink: "http\x3A\x2F\x2Fcliqueserv.org", //No I18N
		helpMenu: {
			helpLinks: {
				helpLink: "http://www.cliqueserv.org/homepage.html" //No i18N
			}
		},
		userInfo: {
			name: $('#userloginName').val(),
			emailAddress: $('#userEmail').val(),
			photo: "/selectedImage?imageFile=app/public/images/user.png", //NO OUTPUTENCODING //No I18N
			userId: "105621933", //NO OUTPUTENCODING
			appsInUse : [],
			signOutURL: "URL:/logout" //No I18N
		}
		
	});
	$("#ztb-about,#ztb-blogs,#ztb-forums").remove();
	$(".ztb-seperator").remove();
	$("#ztb-topband #ztb-profile>a").removeAttr("href");//no i18n
	$("#ztb-topband #ztb-profile>a").attr("onclick","openUploadPhoto('user','0');");//no i18n
	$("#ztb-myaccount").html("&nbsp;");
	$(document).ztooltip();
	
});
