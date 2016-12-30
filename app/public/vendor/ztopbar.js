/* $Id$ */

(function () {
    var zTopbar = function (data){
        if(window === this && data && data.properWay){
            if(typeof zjQuery === "undefined"){ //No i18n
                zjQuery = window.jQuery;
            }
            var ztopbarObj = new zTopbar(data);
            ztopbarObj.data = data;
            ztopbarObj.isOpen = true;
            ztopbarObj._init(data);
            var mainElement =  zjQuery('#ztb-topband');   //No I18N
            if(mainElement.length){
                ztopbarObj.mainCont = mainElement;
                ztopbarObj.mainCont.addClass("ztb-topband"); //No I18N
            }
            else{
                ztopbarObj.mainCont = zjQuery(".ztb-topband").attr('id',"ztb-topband"); //No I18N
            }
            if(data.position){
                ztopbarObj.mainCont.addClass("ztb-fixed"); //No i18n
            }
            if(!ztopbarObj._isEditor){
                ztopbarObj.mainCont.html(''); //No I18N
                data.placeHolderHTML = "";
            }
            else{
                var innerHTML = ztopbarObj.mainCont.html();
                if( innerHTML && innerHTML.trim().length && ( data.placeHolderHTML === '' || data.placeHolderHTML === undefined)){  //No I18N
                    ztopbarObj.mainCont.html('');   //No I18N
                    data.placeHolderHTML = innerHTML;
                }
            }
            ztopbarObj._displayLogo = ztopbarObj._isEditor ? false : true;
            ztopbarObj._signInStatus = data.userInfo && ( data.userInfo.emailAddress && data.userInfo.userId ) ? true : false;

            ztopbarObj.ztbContainer = zjQuery("<div>").attr("id", "ztb-container").appendTo(ztopbarObj.mainCont); //No i18n
            if(ztopbarObj.product !== "cliqueserv"){ //No i18n
                var menu = zjQuery("<div>").attr({"ztooltip": ztopbarObj._getString("Cliqueserv Apps"), "class" : "ztooltip ztb-font-family", "id": "ztb-switch-menu"}).html("<div class='ztb-switch-to-square'><span></span><span class='two'></span><span></span><span></span><span class='five'></span><span></span><span></span><span class='eight'></span><span></span></div>").appendTo(ztopbarObj.ztbContainer); //No i18n
            }
            ztopbarObj._ztbLogo = zjQuery("<a>").attr("id","ztb-logo").appendTo(ztopbarObj.ztbContainer); //No i18n
            
            ztopbarObj._initRebradingLogo( data.rebranding ? data.rebranding.logo : "" );   //No I18N
            var homePageLink = ztopbarObj._signInStatus ? data.homePageLink : data.websiteHomePageLink;
            if(homePageLink != undefined && homePageLink != ''){
                ztopbarObj._ztbLogo.css("cursor", "pointer"); //No i18n
                if(typeof data.homePageLink === "function"){ //No i18n
                    ztopbarObj._ztbLogo.click(function(){
                        data.homePageLink();
                    });
                }
                else{
                    ztopbarObj._ztbLogo.attr("href",homePageLink); //No i18n
                }
            }
            var ztbMenusCont = zjQuery("<div>").attr({"id": "ztb-menu-container", "class": "ztb-font-family "+( !ztopbarObj._signInStatus ? "ztb-user-signout":"" )}).appendTo(ztopbarObj.ztbContainer); //No i18n
            
            ztopbarObj.ztbOthersTypeCont = zjQuery("<div class='ztb-item-container'>").appendTo(ztbMenusCont); //No I18N
            ztopbarObj.ztbPopoverTypeCont = zjQuery("<div class='ztb-item-container'>").appendTo(ztbMenusCont); //No I18N
            ztopbarObj.ztbMenuTypeCont = zjQuery("<div class='ztb-item-container'>").appendTo(ztbMenusCont); //No I18N
            ztopbarObj.ztbTextTypeCont = zjQuery("<div class='ztb-item-container'>").attr("id", "ztb-textTypeCont")[ztopbarObj._signInStatus ? "prependTo":"appendTo"](ztbMenusCont); //No i18n
            if(ztopbarObj._signInStatus){
                var info = data.userInfo,
                    photoClassName = "",    //No i18n
                    ztbProfileCont = zjQuery("<div>").attr("class", "ztb-profile-container").insertBefore(ztbMenusCont),    //No i18n
                    imgSrc = "", photoLabel = "";   //No i18n
                if(info.photo){
                    imgSrc = info.photo;
                    photoLabel = ztopbarObj._getString("change"); //No i18n
                }
                else{
                    photoLabel = ztopbarObj._getString("upload"); //No i18n
                }
                if(ztopbarObj._isEditor){
                    photoClassName = "ztb-editor"; //No i18n
                }
                var ztbProfile = zjQuery("<div>").attr({"type": "profile", "id": "ztb-profile", "class": photoClassName+" ztb-font-family"}).appendTo(ztbProfileCont); //No i18n
                //  Make changes of below lines(img,a) will affect _changeUserPhoto(). So Please check
                ztbProfile.append("<div id='ztb-profile-header'></div><img id='ztb-profile-image' src='"+ imgSrc +"'/>"); //No i18n
                ztopbarObj.profileHeader = zjQuery("#ztb-profile-header");  //No i18n
                zjQuery("<a>").attr({ "href": ztopbarObj._accountsLink +"u/h#profile/personal", "target":"_blank" }).appendTo(ztbProfile).text(photoLabel); //No i18n
                ztopbarObj.ztbProfileDetails = zjQuery("<div>").attr('id', "ztb-accountInfo").appendTo(ztbProfile); //No i18n
                ztopbarObj._setUsername(info.name);
                ztopbarObj._setEmailAddress(info.emailAddress);
                var profileHeaderElement = "";
                if(info.userId){
                    profileHeaderElement = "<p id='ztb-cliqueserv-uid'><label>"+ ztopbarObj._getString("ID") +": "+info.userId+"</label><span id='ztb-cliqueserv-uid-info' class='ztb-icon-group'></span></p>";  //No i18n
                }
                profileHeaderElement += "<a id='ztb-myaccount' href='"+ ztopbarObj._accountsLink +"' target='_blank'>"+ ztopbarObj._getString("myAccount") +"</a>";  //No i18n
                ztopbarObj.profileHeader.append(profileHeaderElement);
                signOutStr = "<a class='ztb-anchor' id='ztb-signout' onclick='ztopbar.attemptLogout()' >"+ ztopbarObj._getString("Sign Out") +"</a>"; //No i18n
                var ztbSignOut = zjQuery("<span>").append(signOutStr).attr("class", "ztb-signout").appendTo(ztopbarObj.ztbProfileDetails); //No i18n
                
				if(info.signOutURL){
                    if(typeof info.signOutURL === "function"){ //No i18n
                        ztbSignOut.bind("click.signout",function(e){ //No i18n
							info.signOutURL();
                        });
                    }
                }
                ztbProfile.data('imageHeight',ztbProfile.height()); //No I18N
                var initProfile = false;
                ztbProfileCont.bind("click.profile",function(e){ //No i18n
                    if(!initProfile){
                        ztopbarObj._initTooltipEvents( zjQuery("#ztb-user-id") );   //No I18N
                        ztopbarObj._setEmailAddress(ztopbarObj.data.userInfo.emailAddress);
                        initProfile = true;
                    }
                    ztopbarObj._profileToggle();
                });
            }
            
            else {
                // To init tooltip before creating switchTo dropdown.
                delete data.userInfo;
                delete data.helpMenu;
                delete data.settings;
                delete data.portalInfo;
                delete data.subscription;
                delete data.notifications;
                delete data.messages;
                var signUpPageLink = data.signUpPageLink ? data.signUpPageLink : ztopbarObj._websiteLink +"signup.html";    //No I18N
                var signInPageLink = data.signInPageLink ? data.signInPageLink : ztopbarObj._websiteLink +"login.html"; //No I18N

                var ztbLoginCont = zjQuery("<div>").attr({"type" : "text", "class" : "ztb-text-type", "id": "ztb-signin"}),     //No i18n
                    ztbSignupCont = zjQuery("<div>").attr({"type" : "text", "class" : "ztb-text-type", "id": "ztb-signup"});     //No i18n
                ztopbarObj.ztbTextTypeCont.prepend(ztbLoginCont);
                ztopbarObj.ztbTextTypeCont.prepend(ztbSignupCont);
                zjQuery("<a>").attr({"href": signInPageLink, "target":"_self"}).appendTo(ztbLoginCont).text(ztopbarObj._getString("signin"));   //No i18n
                zjQuery("<a>").attr({"href": signUpPageLink, "target":"_self"}).appendTo(ztbSignupCont).text(ztopbarObj._getString("signup"));   //No i18n
            }
            
            if(data.settings){
                if(data.settings.uitype === "button"){ //No i18n
                    ztopbarObj.addItem({
                        "uitype" : "button", //No i18n
                        "id" : "settings", //No i18n
                        "iconClass" : "ztb-icon-group ztb-settings-icon", //No i18n
                        "action" : data.settings.action , //No i18n
                        "title" : (data.settings.type === "myPreferences" ? ztopbarObj._getString("myPreferences") : ztopbarObj._getString("settings")), //No i18n
                        "target": (data.settings.target ? data.settings.target : "_self"), //No i18n
                        "appendTo": ztopbarObj.ztbMenuTypeCont, //No i18n
                        "removable": false //No i18n
                    });
                }
                else{
                    ztopbarObj.addItem({
                        "uitype" : "menu", //No i18n
                        "id" : "settings", //No i18n
                        "title" : ztopbarObj._getString("settings"), //No i18n
                        "menu" : data.settings.menu, //No i18n
                        "iconClass" : "ztb-icon-group ztb-settings-icon", //No i18n
                        "appendTo": ztopbarObj.ztbMenuTypeCont, //No i18n
                        "removable": false //No i18n
                    });
                }
            }
            if(data.helpMenu){
                ztopbarObj.addItem({
                    "uitype" : "menu", //No i18n
                    "id" : "help", //No i18n
                    "title" : ztopbarObj._getString("help"), //No i18n
                    "menu" : data.helpMenu, //No i18n
                    "iconClass" : "ztb-icon-group ztb-help-icon", //No i18n
                    "appendTo": ztopbarObj.ztbMenuTypeCont, //No i18n
                    "removable": false //No i18n
                });
            }
            if(typeof data.messages === "object"){ //No i18n
                ztopbarObj.addItem({
                    "uitype" : "popover", //No i18n
                    "id" : "messages", //No i18n
                    "title" : ztopbarObj._getString("messages"), //No i18n
                    "popover" : { //No i18n
                        "title" : ztopbarObj._getString("messages") , //No i18n
                        "html" : data.messages.html, //No i18n
                        "count" : data.messages.count //No i18n
                    },
                    "iconClass" : "ztb-icon-group ztb-messages-icon", //No i18n
                    "appendTo": ztopbarObj.ztbPopoverTypeCont, //No i18n
                    "removable": false //No i18n
                });
            }
            if(typeof data.notifications === "object"){ //No i18n
                ztopbarObj.addItem({
                    "uitype" : "popover", //No i18n
                    "id" : "notifications", //No i18n
                    "title" : ztopbarObj._getString("notifications"), //No i18n
                    "popover" : { //No i18n
                        "title" : ztopbarObj._getString("notifications"), //No i18n
                        "html" : data.notifications.html, //No i18n
                        "count" : data.notifications.count //No i18n
                    },
                    "iconClass" : "ztb-icon-group ztb-notifications-icon", //No i18n
                    "appendTo": ztopbarObj.ztbPopoverTypeCont, //No i18n
                    "removable": false //No i18n
                });
            }
            var subDetail = data.subscription;
            if(subDetail !== undefined && subDetail.planType){
                ztopbarObj._trialUpgradeLink = subDetail.upgradeLink;
                var canTryOtherEditions = (subDetail.canTryOtherEditions && subDetail.tryOtherEditionsLink) ? true : false;
                var manageSubscriptionLinkIsAdded = false;
                var settingArray = [];
                var settingsObj = zjQuery("#ztb-settings"); //No i18n
                if(settingsObj.attr("type") !== "button"){ //No i18n
                    var menuObj = zjQuery("#ztb-settings-menu .ztb-content ul li").length; //No i18n
                    if(menuObj === 0){
                        if(subDetail.planType === "free"){  //No i18n
                            if(ztopbarObj._trialUpgradeLink){
                                settingArray.push({"id":"ztb-upgrade", "label": ztopbarObj._getString("upgrade"), "URL":ztopbarObj._trialUpgradeLink, "target":"_blank"}); //No i18n
                            }
                        }
                        else{
                            if(subDetail.manageSubscriptionLink !== undefined){
                                if(!canTryOtherEditions){
                                    var ztbOtherEditions = zjQuery("<div>").attr({ "class" : "ztb-text-type", "id" : "ztb-subscriptionText", "type" : "text"}).appendTo(zjQuery("#ztb-textTypeCont")); //No i18n
                                    zjQuery("<a>").attr({"href": subDetail.manageSubscriptionLink, "target":"_blank", "class" : "ztb-anchor"}).appendTo(ztbOtherEditions).text( ztopbarObj._getString("supscription") ); //No i18n
                                    settingsObj.hide();
                                }
                                else{
                                    manageSubscriptionLinkIsAdded = true;
                                    settingArray.push({"id":"ztb-manageSubscription", "label": ztopbarObj._getString("manageSubscription") , "URL":subDetail.manageSubscriptionLink, "target":"_blank"}); //No i18n
                                    settingArray.push({"id":"ztb-tryOtherEditions", "label": ztopbarObj._getString("tryOtherEditions") , "URL":subDetail.tryOtherEditionsLink, "target":"_blank"}); //No i18n
                                }
                            }
                            else{
                                settingArray.push({"id":"ztb-tryOtherEditions", "label": ztopbarObj._getString("tryOtherEditions") , "URL":subDetail.tryOtherEditionsLink, "target":"_blank"}); //No i18n
                            }
                        }
                    }
                    else{
                        if((subDetail.planType === "paid" && subDetail.manageSubscriptionLink) || (subDetail.planType === "free" && ztopbarObj._trialUpgradeLink)){
                            settingArray.push({"id" : "ztb-sep1", "separator":true}); //No i18n
                        }
                        if(subDetail.planType === "free"){  //No i18n
                            if(ztopbarObj._trialUpgradeLink){
                                settingArray.push({"id":"ztb-upgrade", "label": ztopbarObj._getString("upgrade") , "URL":ztopbarObj._trialUpgradeLink, "target":"_blank"}); //No i18n
                            }
                        }
                        else{
                            if(subDetail.manageSubscriptionLink !== undefined){
                                manageSubscriptionLinkIsAdded = true;
                                settingArray.push({"id":"ztb-manageSubscription", "label": ztopbarObj._getString("manageSubscription") , "URL":subDetail.manageSubscriptionLink, "target":"_blank"}); //No i18n
                            }
                            if(canTryOtherEditions){
                                settingArray.push({"id":"ztb-tryOtherEditions", "label": ztopbarObj._getString("tryOtherEditions") , "URL":subDetail.tryOtherEditionsLink, "target":"_blank"}); //No i18n
                            }
                        }
                    }
                }
                if(canTryOtherEditions && subDetail.trialInfo === undefined && subDetail.planType === "free"){  //No i18n
                    var link = zjQuery("<a>").attr("class", "ztb-anchor"); //No i18n
                    var ztbOtherEditionsFree = zjQuery("<div>").attr({"type" : "text", "class" : "ztb-text-type", "id": "ztb-tryOtherEditions"});  //No i18n
                    ztopbarObj.ztbTextTypeCont.prepend(ztbOtherEditionsFree);
                    link.attr({"href":subDetail.tryOtherEditionsLink, "target":"_blank"}).appendTo(ztbOtherEditionsFree).text( ztopbarObj._getString("tryOtherEditions") ); //No i18n
                }
                if(settingArray.length){
                    if(zjQuery("#ztb-settings-menu .ztb-content ul").length === 0){ //No i18n
                        ztopbarObj._createSettingOption(settingArray);
                    }
                    else{
                        ztopbarObj.addMenuItem(settingArray, "ztb-settings"); //No i18n
                    }
                }
                if(subDetail.trialInfo){
                    ztopbarObj.showTrialInfo(subDetail);
                }
            }
            if(data.portalInfo){
                var portals = data.portalInfo.portals;
                if(portals && portals.length !== 1){
                    portals.push({"id": "ztb-portalsep1", "separator":true}); //No i18n
                    var managePortalsLable = ztopbarObj._getString("managePortals"); //No i18n
                    if(ztopbarObj.product === "mail" && data.portalInfo.managePortalsLabel){ //No i18n
                        managePortalsLable = data.portalInfo.managePortalsLabel;
                    }
                    portals.push({"id": "ztb-managePortals","label":managePortalsLable,"action":"URL:"+data.portalInfo.managePortalsLink,"target":"_blank"}); //No i18n
                    ztopbarObj.addItem({
                        "uitype" : "menu", //No i18n
                        "id" : "portals", //No i18n
                        "title" : ztopbarObj._getString("portals") , //No i18n
                        "menu" : portals, //No i18n
                        "textClass" : "ztb-text-type", //No i18n
                        "appendTo": ztopbarObj.ztbTextTypeCont //No i18n
                    });
                }
            }
            if(data.others){
                for(var i in data.others){
                    ztopbarObj.addItem(data.others[i]);
                }
            }
            if(data.serviceInfo){
                var serviceUI = zjQuery("<div>").attr("id", "ztb-service-info").html(data.serviceInfo).prependTo(ztbMenusCont); //No i18n
                if(!zjQuery("#ztb-tryOtherEditions")[0]){ //No i18n
                    serviceUI.css("border-right-width", "1px"); //No i18n
                }
            }
            if(data.search){
                var ztbSearch = zjQuery("<div>").attr({"id": "ztb-search", "class": "ztb-font-family"}).appendTo(ztopbarObj.ztbContainer); //No i18n
                var ztbSearchFilter = zjQuery("<div>").attr({"id" : "ztb-search-filter", "class" : "ztb-icon-group"}).appendTo(ztbSearch); //No i18n
                if(data.search.hasFilter){
                    ztbSearchFilter.addClass("ztb-filter-expand").append("<span class = 'ztb-icon-group ztb-search-dd'></span>"); //No i18n
                }
                ztbSearch.append("<input type = 'text' id = 'ztb-search-field' class='ztb-font-family' /><span id = 'ztb-search-action' ></span>"); //No i18n
                var searchField = zjQuery("#ztb-search-field");  //No i18n
                ztopbarObj._isPlaceholder = searchField[0].placeholder === undefined || searchField[0].placeholder === null;  //No i18n
                if(data.search.placeholder){
                    if(ztopbarObj._isPlaceholder){
                        searchField.before("<label id='ztb-search-placeholder'>"+data.search.placeholder+"</label>");  //No i18n
                        zjQuery("#ztb-search-placeholder").css("left", (searchField.position().left-2));  //No i18n
                    }
                    ztopbarObj._changePlaceholder(data.search.placeholder);
                }
                searchField.bind('focus.ztb', function(){   //No i18n
                    ztbSearch.addClass('ztb-search-focus'); //No i18n
                    zjQuery("#ztb-search-placeholder").css("display", "none"); //No i18n
                }).bind('blur.ztb', function(){ //No i18n
                    ztbSearch.removeClass('ztb-search-focus');  //No i18n
                    if(!searchField.val()){
                        zjQuery("#ztb-search-placeholder").css("display", "block"); //No i18n
                    }
                });
            }            
            if(data.placeHolderHTML){
                var ztbPlaceHolderCont = zjQuery("<div>").attr("id", "ztb-placeholder-container").appendTo(ztopbarObj.ztbContainer); //No i18n
                ztbPlaceHolderCont.append(data.placeHolderHTML);
            }
            ztopbarObj._myApps = false;
            if(ztopbarObj.product !== "cliqueserv"){ //No i18n
                setTimeout(function(){
                    _createSwitchToMenu();
                }, 2);
                var appsShortNameMap = {
                    "cliqueservassg": "Assignment Management", // No I18N
					"cliqueservquery":"Academic Query",
					"cliqueservessay":"Writing Skills",
					"cliqueservlibrary":"E-Library",
					"cliqueservmocktest":"Mock Tests",
					"cliqueservproject":"Project Report Review",
					"cliqueservconselling":"Career Counselling", 
					"cliqueservresume":"Resume Writing",
					"cliqueservfreelance": "Freelance Jobs", 
					"cliqueservrecruitment": "Employment Opportunities",
					"cliqueservabout": "About us", 
					"cliqueservcontact": "Contact Us", 
					"cliqueservblog": "Blogs",
					"cliqueservlitsearch": "Literature Search",
					"cliqueservdiscussionthread":"Discuss Research Proposals",
					"cliqueservresearchrev": "Review Research Paper", 
					"cliqueservsciwriting": "Scientific Paper Writing",
					"cliqueservreport":"Pdf Report Generator", 
					"cliqueserveditor": "Source Code Editor", 
					"cliqueservlocker": "Digital Locker", 
					"cliqueservplot": "Function Plot"
				};
				
                function _createSwitchToMenu(){
                    var myAppsObj = data.userInfo && data.userInfo.appsInUse ? data.userInfo.appsInUse : '/allapps';    //No I18N
                    if(myAppsObj && ztopbarObj._signInStatus){
                        if(typeof myAppsObj === "string"){  //No I18N
                            var myAppsData = {};
                            zjQuery.ajax({
                                url: myAppsObj,
                                type : 'POST',  // No I18N
                                beforeSend: function( xhr ) {
                                    xhr.overrideMimeType( "text/plain; charset=x-user-defined" );   //No I18N
                                },
                                error:function(serverResponse){
                                    zjQuery('#ztb-all-apps .ztb-allApps').addClass('ztb-allApps-only'); //No I18N
                                    zjQuery('#ztb-apps').addClass('ztb-collapse');    //No I18N
                                    createAllAppsContainer();
                                    ztopbarObj._createTooltip();
                                },
                                success: function( responseObj ){
                                    myAppsData = responseObj;
                                    if(typeof myAppsData !== "object"){ //No I18N
                                        myAppsData = zjQuery.parseJSON( myAppsData );
                                    }
                                }
                            }).done(function( data ) {
                                createMyAppsContainer( myAppsData );
                            });
                        }
                        else{
                            createMyAppsContainer( myAppsObj );
                        }
                    }
                    else{
                        zjQuery('#ztb-apps').addClass('ztb-collapse');    //No I18N
                        createAllAppsContainer();
                        ztopbarObj._createTooltip();
                    }
                    menu.data("itemType", "switch-menu");   //No I18N
                    menu.bind("click.menu",function(e){ //No I18N
                        ztopbarObj._toggle( menu, zjQuery('#ztb-apps') ); //No I18N
                    });
                }
                function getConfigMap(configArray) {
                    var output = {};
                    if (configArray) {
                        for ( var j = 0; j < configArray.length; j++) {
                            var config = configArray[j];
                            var confValue = config.config_value;
                            output[config.config_name] = confValue || null;
                        }
                    }
                    return output;
                }
                function createMyAppsContainer ( usedApps ) {
                    var myApps = {};
                    if(usedApps.apps){
                        usedApps = usedApps.apps;
                        var tempJSON = {};
                        zjQuery.each(appsShortNameMap, function(i, value){
                            tempJSON[value] = value;
                        });
                        appsShortNameMap = tempJSON;
                    }
                    var appNames = [];
                    for ( var i = 0; i < usedApps.length; i++) {
                        var app = usedApps[i];
                        var appName = appsShortNameMap[app.app_name.toLowerCase()];
                        if (!appName || zjQuery.inArray(appName, appNames) != -1) {
                            usedApps.splice(i, 1);
                            i--;
                            continue;
                        }
                        ztopbarObj._isAppsInfoMapped = true;
                        var subDomain = app.url ||  app.default_sub_domain;
                        var appURL = app.trynow_url;
                        if(app.configuration !== undefined){
                            var configMap = getConfigMap(app.configuration);
                            appURL = configMap.zh_trynow_url;
                            if (appURL && appURL.indexOf("//") !== 0) {   // No I18N // Relative Try Now URL
                                appURL = subDomain + appURL;
                            }
                        }
                        var home_page = subDomain + (app.home_page.length ? app.home_page : "");    // No I18N
                        myApps[appName] = {
                            "url": app.app_url || home_page,   // No I18N
                            "appURL" : appURL || subDomain, // No I18N
                            "isMyApp" : app.is_used_app, // No I18N
                            "app_name": appName === "livedesk" ? "salesiq" : appName    // No I18N
                        };
                        ztopbarObj._myApps = !ztopbarObj._myApps ? app.is_used_app : ztopbarObj._myApps;
                        appNames.push(appName);
                    }
                    ztopbarObj._myAppsData = myApps;
                    createAllAppsContainer();
                    if( ztopbarObj._myApps ){
                        var appsContainer = zjQuery('#ztb-apps');   // No I18N
                        var allAppsDiv = zjQuery('#ztb-all-apps');  // No I18N
                        var myAppsDiv = zjQuery("<div>").attr("id", "ztb-myapps").css({"height":allAppsDiv.height(), "width":allAppsDiv.width()}).appendTo( appsContainer );    //No I18N
                        appsContainer.css({"width":allAppsDiv.width(), "height": (allAppsDiv.height()+40)});    //No I18N
                        allAppsDiv.css({"margin-top": -(allAppsDiv.height()+8)+"px", "opacity": 0});    //No I18N
                        myAppsDiv.css({"opacity": 1, "margin-left": 0});    //No I18N
                        ztopbarObj._buildMyApps();

                        var gotoMyapps = zjQuery("<div>").attr({"id":"ztb-goto-myapps","class": "ztb-go-to-myapps ztooltip ztb-icon-group", "ztooltip": ztopbarObj._getString("myAppsLabel") }).appendTo(zjQuery("#ztb-myapps-nav"));   //No I18N
                        zjQuery("#ztb-goto-myapps").hide(); //No I18N
                        var myappsContent = zjQuery("#ztb-myapps-list .ztb-myapps-cont").first();   //No I18N

                        zjQuery("#ztb-myapps-list").width( myappsContent.outerWidth() * 3 );  //No I18N
                        var paddingTop = ( (allAppsDiv.height() - myappsContent.height())/2 + 9);
                        zjQuery("#ztb-myapps-list .ztb-myapps-cont").css('padding-top', paddingTop);  //No I18N
                        gotoMyapps.click(function(){
                            zjQuery("#ztb-goto-myapps").hide(); //No I18N
                            zjQuery("#ztb-goto-allapps").show();    //No I18N
                            zjQuery("#ztb-slide-window").show();    //No I18N
                            allAppsDiv.css({"margin-top": -(allAppsDiv.height()+8)+"px", "opacity": 0});    //No i18n
                            zjQuery("#ztb-myapps").css({"opacity": 1, "margin-left": 0});   //No I18N
                        });
                        appsContainer.addClass('ztb-collapse'); //No I18N
                    }
                    else{
                        zjQuery('#ztb-all-apps .ztb-allApps').addClass('ztb-allApps-only'); //No I18N
                    }
                    ztopbarObj._createTooltip();
                }
                function createAllAppsContainer(){
                    var appsContainer = zjQuery("<div>").attr({"id" : "ztb-apps", "class" : "ztb-apps ztb-font-family " + ztopbarObj._ieClass }); //No I18N
                    zjQuery("<div>").attr("class", "ztb-apps-grey").appendTo( appsContainer );  //No I18N
                    var allAppsDiv = zjQuery("<div>").attr("id", "ztb-all-apps").appendTo( appsContainer ), //No I18N
                        table = zjQuery("<div>").attr("class", "ztb-allApps").appendTo(allAppsDiv), //No I18N
                        row = zjQuery("<div>").appendTo(table), //No I18N
                        leftTd = zjQuery("<div>").attr("class", "ztb-leftCol").appendTo(row),   //No I18N
                        centerTd = zjQuery("<div>").attr("class", "ztb-centerCol").appendTo(row),   //No I18N
                        rightTd = zjQuery("<div>").attr("class", "ztb-rightCol").appendTo(row), //No I18N
                        leftAppsTitle = [ ztopbarObj._getString("ACADEMICS")  ],    //No I18N
                        leftApps = [ [ "Assignment Management","Academic Query","Writing Skills","E-Library","Mock Tests","Project Report Review" ] ], //No I18N
                        centerAppsTitle = [ ztopbarObj._getString("CAREER"), ztopbarObj._getString("COLLABORATION")],   //No I18N
                        centerApps = [ [ "Career Counselling", "Resume Writing", "Freelance Jobs", "Employment Opportunities" ], ["About us", "Contact Us", "Blogs"]],   //No I18N
                        rightAppsTitle = [ ztopbarObj._getString("RESEARCH"), ztopbarObj._getString("TOOLS")],    //No I18N
                        rightApps = [[ "Literature Search", "Discuss Research Proposals", "Review Research Paper", "Scientific Paper Writing" ],[ "Pdf Report Generator", "Source Code Editor", "Digital Locker", "Function Plot" ] ]; //No I18N

                    appsContainer.appendTo(zjQuery("body"));    // No I18N
                    ztopbarObj._generateSwitchToMenu(leftAppsTitle, leftApps, leftTd);
                    ztopbarObj._generateSwitchToMenu(centerAppsTitle, centerApps, centerTd);
                    ztopbarObj._generateSwitchToMenu(rightAppsTitle, rightApps, rightTd);
                    zjQuery("#ztb-all-apps .ztb-products").bind("click.apps",function(e){   //No I18N
                        ztopbarObj._closeOpenedItems();
                        if( ztopbarObj.data.product.toLowerCase() === zjQuery(this).data('zapp') ){   //No I18N
                            location.reload();
                        }else{
                            window.open(zjQuery(this).find("a")[0].href, "_blank"); //No I18N
                        }
                        e.preventDefault();
                        e.stopPropagation();
                    });
                }
            }
            else{
                ztopbarObj._createTooltip();
            }
            zjQuery('#ztb-menu-container .ztb-item-container').bind("click.ztb",function(e){  //No I18N
                var targetEle = zjQuery(e.target);
                if( !targetEle.is('div') ){ //No I18N
                    targetEle = targetEle.parent();
                }
                ztopbarObj._toggle( targetEle );
            });
            ztopbarObj._userIdTooltip();
            ztopbarObj._onResize();
            return ztopbarObj;
        }
    };
    zTopbar.prototype = {
        _EVENTS : {
            "ITEMONCLICK" : "itemclick", //No i18n
            "TRIALCLOSE" : "messagebannerclose", //No i18n
            "TRIALOPEN" : "messagebanneropen", //No i18n
            "MENUCLOSE" : "menuclose", //No i18n
            "MENUOPEN" : "menuopen", //No i18n
            "POPOVERCLOSE" : "popoverclose", //No i18n
            "POPOVEROPEN" : "popoveropen",  //No I18N
            "ONCLOSE" : "close", //No I18N
            "ONOPEN" : "open" //No I18N
        },
        _widgetEventPrefix : "ztopbar", //No i18n
        showEle : undefined,
        clickEle : undefined,
        ztooltip : undefined,
        userIdTooltip : undefined,
        _sepPos : 0,
        _init: function(data){
            this._appProtocol = window.location.protocol;
            var domainArray = window.location.hostname.split('.'); //No I18N

            if(domainArray.length > 2){
                domainArray.reverse().pop();
                domainArray.reverse();
            }

            this._lastOpenedItem = undefined;
            this._documentEle = zjQuery(document);
            this._getString = ( typeof ztopbar.i18nKeys != "object" && zjQuery.i18n ) ? getI18NString : getString;  //No i18n
            this._appDomain = domainArray.join('.'); //No i18n
            this._ieClass = ""; //No i18n
            if(navigator.appVersion.indexOf("MSIE 7.") !== -1 || navigator.appVersion.indexOf("MSIE 8.") !== -1){ //No i18n
                this._ieClass = "ztb-ie-browser"; //No i18n
            }
            this._windowWidth = zjQuery(window).width();
            this.product = data.product ? data.product.split(" ").join("").toLowerCase() : ""; //No i18n

            data.mode = data.underlineUI ? data.underlineUI : data.mode;
            this._isEditor = ( data.mode === "editor" || this.product === "writer" || this.product === "sheet" || this.product === "show" ) ? true : false; //No I18N
            
            var productName = this._isEditor ? "docs" : this.product;  //No I18N
            this._protocolScheme = this._appProtocol +"//"; //No I18N

            var blogLink = this._protocolScheme +"blogs.cliqueserv.org/category/"+ productName; //No I18N
            var forumLink = this._protocolScheme +"forums.cliqueserv.org/cliqueserv-"+ productName;   //No I18N
            this._websiteLink = data.cliqueservWebsiteLink && data.cliqueservWebsiteLink.length ? data.cliqueservWebsiteLink : this._protocolScheme +"cliqueserv.org/";  //No I18N
            this._websiteLink = this._checkLink( this._websiteLink );   //No I18N
            var aboutUsLink = this._websiteLink + this.product;

            this._subServices = ['cliqueserv','accounts','contacts','chat']; //No I18N
            if(!zjQuery.inArray(this.product, this._subServices)){
                blogLink = this._protocolScheme +"blogs.cliqueserv.org";    //No I18N
                forumLink = this._protocolScheme +"forums.cliqueserv.org";  //No I18N
                aboutUsLink = this._websiteLink;
            }
            var helpMenu = data.helpMenu ? data.helpMenu : {};
            this._homeLink = this._checkLink( data.cliqueservHomeLink && data.cliqueservHomeLink.length ? data.cliqueservHomeLink : this._protocolScheme +"home.cliqueserv.org");   //No I18N
            this._blogsLink = this._checkLink( helpMenu.blogLink && helpMenu.blogLink.length ? helpMenu.blogLink : blogLink );
            this._forumsLink = this._checkLink( helpMenu.forumLink && helpMenu.forumLink.length ? helpMenu.forumLink : forumLink);
            this._accountsLink = this._checkLink( data.myAccountLink && data.myAccountLink.length ? data.myAccountLink : this._protocolScheme +"accounts.cliqueserv.org"); //No I18N
            this._aboutUsLink = this._checkLink( data.websiteHomePageLink && data.websiteHomePageLink.length ? data.websiteHomePageLink : aboutUsLink );
        },
        _checkLink: function(linkText){
            if(linkText){
                linkText = linkText.substring(linkText.length-2).lastIndexOf("/") !== -1 ? linkText : linkText + "/";   //No I18N
                return  linkText.substring(0,8).indexOf("//") !== -1 ? linkText : this._appProtocol +"//"+ linkText;    //No I18N
            }
            return "";
        },
        item: function (param) {
            if(typeof param === "string"){ //No i18n
                this.parentElement = "ztb-"+param; //No i18n
            }
            return this;
        },
        addItem: function (param) {
            if(typeof param === "object"){ //No i18n
                var base = this, appendTo = ""; //No i18n
                var iconCls = param.iconClass ? param.iconClass : ""; //No i18n
                var tooltip = param.title? param.title :""; //No i18n
                var removable = param.removable !== undefined  ? param.removable : true;
                if(param.uitype === "menu"){ //No i18n
                    var menuId = param.id;
                    appendTo = param.appendTo ? param.appendTo : this.ztbOthersTypeCont;
                    var className = param.textClass ? param.textClass : "ztb-menu-type"; //No i18n
                    var menuObj = zjQuery("<div>").attr({"type":"menu", "id":"ztb-"+menuId, "class" : className, "removable": removable}).data({"values": param.menu, "options": param, "itemType": "menu"}).appendTo(appendTo); //No I18N
                    if(iconCls){
                        zjQuery("<span>").attr("class", "ztb-icons "+iconCls).appendTo(menuObj); //No i18n
                    }
                    else if(param.id === "portals") {
                        // PORTAL SET LABLE ACTION
                        var labelText = "";
                        for(var k in param.menu){
                            labelText = (labelText === "" && param.menu[k].selected === true) ? param.menu[k].label : labelText;
                        }
                        labelText = (!labelText) ?  param.menu[0].label : labelText;
                        zjQuery("<a>").appendTo(menuObj).text(labelText); //No i18n
                        //END PORTAL SET LABLE ACTION
                    }
                    if(tooltip){
                        menuObj.attr("ztooltip", tooltip).addClass("ztooltip"); //No i18n
                    }
                    this._createMenu(menuObj,param.menu);
                }
                else if(param.uitype === "popover"){ //No i18n
                    var popoverId = param.id;
                    appendTo = param.appendTo ? param.appendTo : this.ztbOthersTypeCont;
                    var popoverObj = zjQuery("<div>").attr({"type":"popover","id":"ztb-"+popoverId, "class" : "ztb-popover-type", "removable": removable}).data({"options": param, "itemType": "popover"}).appendTo(appendTo); //No I18N
                    if(param.popover){
                        if( param.popover.title ){
                            popoverObj.data({"label" : param.popover.title }); //No i18n
                        }
                        if( param.popover.html ){
                            popoverObj.data({"html" : param.popover.html }); //No i18n
                        }
                    }
                    if(tooltip){
                        popoverObj.attr("ztooltip", tooltip).addClass("ztooltip"); //No i18n
                    }
                    if(iconCls){
                        zjQuery("<span>").attr("class", "ztb-icons "+iconCls).appendTo(popoverObj); //No i18n
                    }
                    this._createPopover(popoverObj);
                    if(param.popover && param.popover.count ){ //No i18n
                        this.item(popoverId).updateCount(param.popover.count);
                    }
                }
                else if(param.uitype === "button"){ //No i18n
                    this._createButton(param);
                }
                else if(param.uitype === "text"){ //No i18n
                    var textObj = zjQuery("<div>").attr({"type": "text", "id": "ztb-"+param.id, "class": "ztb-text-type", "removable": removable}).prependTo(zjQuery("#ztb-textTypeCont")); //No I18N
                    var action = param.action.indexOf("URL:") !== -1 ? param.action.split("URL:")[1] : param.action; //No i18n
                    zjQuery("<a>").attr("href", action).appendTo(textObj).text(param.label); //No i18n
                    textObj.data({"options": param, "itemType": "text"});   //No I18N
                }
                this._initTooltipEvents();
            }
            return this;
        },
        removeItem: function (id) {
            if(typeof id === "string" ){ //No i18n
                var ele = undefined;
                if(zjQuery("#"+id).attr("type") !== undefined && this.ztbContainer.find("#"+id)[0] !== undefined){ //No i18n
                    ele = zjQuery("#"+id); //No i18n
                }
                else{
                    ele = zjQuery("#ztb-"+id); //No i18n
                }
                if(Boolean(ele.attr("removable"))){ //No i18n
                    ele.remove();
                    zjQuery("#"+ele[0].id+"-"+ele.attr("type")).remove();   //No i18n

                }
            }
        },
        _buildMyApps: function(){
            var base = this;
            var myAppsCont = zjQuery("#ztb-myapps"); //No i18n
            var myAppsListCont = zjQuery("<div>").attr("id", "ztb-myapps-list").appendTo(myAppsCont); //No i18n
            var myAppsTable, contCnt = 0, row = 0, selectedPage = ""; //No i18n
            var pagenationCnt = 0;

            var myAppslist = this._myAppsData;
            var inUseLabel = this._getString("inuse");  //No I18N
            for (app in myAppslist) {
                var appInfo = myAppslist[app];
                if(appInfo && appInfo.isMyApp){
                    zjQuery("#ztb-all-apps .zicon-apps-"+ app).parent().addClass("ztb-opted").append("<div class='ztb-opted-apps ztb-icon-group ztooltip' ztooltip='"+ inUseLabel +"'></div>"); //No I18N
                    if(app !== "meeting"){  //No I18N
                        if(contCnt % 12 === 0){
                            myAppsTable = zjQuery("<div>").attr({"class": "ztb-myapps-cont", "id": ("ztb-myapps-cont"+contCnt/12) }).appendTo(myAppsListCont); //No I18N
                            pagenationCnt+=1;
                        }
                        appHTML = '<div class="ztb-myapps-info"><a class="ztb-myapps-icon" data-zapp="'+ app +'" href="'+ appInfo.url +'" target="_blank"><div class="zicon-apps-48 zicon-apps-'+ app +'"></div></a><a data-zapp="'+ app +'" href="'+ appInfo.url +'" target="_blank"><span class="ztb-myapps-label">'+ this._getString( appInfo.app_name ) + '</span></a></div>';    //No I18N
                        myAppsTable.append(appHTML);
                        contCnt += 1;
                    }
                }
            }
            
            zjQuery("<div>").attr("id", "ztb-myapps-nav").insertAfter(myAppsCont).append("<div id='ztb-gotohome' class='ztooltip ztb-icon-group' ztooltip='"+ this._getString("cliqueservHomeLabel") +"'></div><div id='ztb-goto-allapps' class='ztb-icon-group ztooltip' ztooltip='"+ this._getString("allAppsLabel") +"'></div><div id='ztb-slide-window'></div>"); //No i18n
            if(pagenationCnt > 1){
                var pageNatnNavDivs = ""; //No i18n
                for(i = 0; i < pagenationCnt; i++ ){
                    if(i === 0){
                        pageNatnNavDivs += "<div id='ztb-pageNav-"+i+"' class='ztb-page-navigation ztb-page-selected'></div>";  //No i18n
                    }else{
                        pageNatnNavDivs += "<div id='ztb-pageNav-"+i+"' class='ztb-page-navigation'></div>";  //No i18n
                    }
                }
                zjQuery("#ztb-slide-window").append(pageNatnNavDivs); //No i18n
                selectedPage = zjQuery("#ztb-slide-window .ztb-page-selected"); //No i18n
                /* This is an extra cont for My apps Arrow */
                    var leftCont = zjQuery("<div>").attr({"class": "ztb-myapps-arrow-cont ztb-disable", "id": "ztb-myapps-arrow-left"}).appendTo(myAppsCont).bind("click.nav",function(e){ //No I18N
                        base._ArrowNavigationAction(this, selectedPage);
                    });
                    var rightCont = zjQuery("<div>").attr({"class": "ztb-myapps-arrow-cont", "id": "ztb-myapps-arrow-right"}).appendTo(myAppsCont).bind("click.nav",function(e){ //No I18N
                        base._ArrowNavigationAction(this, selectedPage);
                    });
                /* This is an extra cont for My apps Arrow */
                zjQuery("<div>").attr("class", "ztb-myapps-next ztb-myapps-side-navbar ztb-icon-group").appendTo(rightCont);    //No i18n
                zjQuery("<div>").attr("class", "ztb-myapps-prev ztb-myapps-side-navbar ztb-icon-group").appendTo(leftCont); //No I18N
            }
            zjQuery("#ztb-slide-window .ztb-page-navigation").bind("click.pageNav", function(e){ //No i18n
                selectedPage.removeClass("ztb-page-selected").animate({"left": (-zjQuery(this).width())},200); //No i18n
                selectedPage = zjQuery(this).addClass("ztb-page-selected"); //No i18n
                base._changeSlidePos(selectedPage);
            });
            zjQuery("#ztb-goto-allapps").click(function(){ //No i18n
                zjQuery("#ztb-all-apps").css({ "margin-top": 0, "opacity": 1}); //No I18N
                zjQuery("#ztb-goto-allapps").hide();    //No I18N
                zjQuery("#ztb-goto-myapps").show(); //No I18N
                zjQuery("#ztb-slide-window").css("display", "none"); //No I18N
                myAppsCont.css("opacity", 0); //No i18n
            });
            myAppsListCont.find("a").bind("click.apps",function(e){   //No I18N
                base._closeOpenedItems();
                if( base.data.product === zjQuery(this).data('zapp') ){   //No I18N
                    location.reload();
                }else{
                    window.open(zjQuery(this)[0].href, "_blank"); //No I18N
                }
                e.preventDefault();
                e.stopPropagation();
            }).bind("mouseover.apps",function(e){   //No I18N
                $(this).parent().addClass('ztb-myapps-hover');  //No I18N
            }).bind("mouseout.apps",function(e){    //No I18N
                $(this).parent().removeClass('ztb-myapps-hover');   //No I18N
            });
            zjQuery("#ztb-gotohome").bind("click.eachMyapps", function(e){ //No I18N
                base._closeOpenedItems();
                window.open(base._homeLink, "_blank"); //No I18N
            });
        },
        _ArrowNavigationAction: function(ele, selectedPage){
            if((ele.className.indexOf("ztb-disable") === -1) && (ele.id.indexOf("ztb-myapps-arrow-right") !== -1)){ //No i18n
                zjQuery(selectedPage.next()).trigger("click.pageNav"); //No i18n
            }
            else if((ele.className.indexOf("ztb-disable") === -1) && (ele.id.indexOf("ztb-myapps-arrow-left") !== -1)){ //No i18n
                zjQuery(selectedPage.prev()).trigger("click.pageNav"); //No i18n
            }
        },
        _changeSlidePos: function(selectedPage){
            if(selectedPage[0]){
                var rightNavBar = zjQuery("#ztb-myapps-arrow-right"); //No I18N
                var leftNavBar = zjQuery("#ztb-myapps-arrow-left"); //No I18N
                var splitedArr = selectedPage[0].id.split("-"); //No i18n
                var appsCont = zjQuery("#ztb-myapps-list"); //No i18n
                var idCnt = parseInt(splitedArr[splitedArr.length-1]);
                var childCnt = idCnt > 0 ? idCnt-1 : idCnt;
                if(idCnt === 0){
                    leftNavBar.addClass("ztb-disable"); //No i18n
                    rightNavBar.removeClass("ztb-disable"); //No i18n
                }
                else if(idCnt === (selectedPage.parent().children().length-1)){
                    rightNavBar.addClass("ztb-disable"); //No i18n
                    leftNavBar.removeClass("ztb-disable"); //No i18n
                }
                else{
                    leftNavBar.removeClass("ztb-disable"); //No i18n
                    rightNavBar.removeClass("ztb-disable"); //No i18n
                }
                appsCont.css("margin-left", -(zjQuery(appsCont.children()[childCnt]).outerWidth()*idCnt)); //No i18n
            }
        },
        _createButton:function(ele){
            var removable = ele.removable !== undefined ? ele.removable : true;
            var ID = ele.id !== undefined ? ele.id : ""; //No i18n
            var iconCls = ele.iconClass ? ele.iconClass : ""; //No i18n
            ele.target = ele.target ? ele.target : ""; //No i18n
            var appndTo = ele.appendTo !== undefined ? ele.appendTo : this.ztbOthersTypeCont; //No i18n
            var buttonObj = zjQuery("<div>").attr({"type": "button", "id": "ztb-"+ID, "class" : "ztb-button-type", "removable": removable}).data({"options": ele, "itemType": "button"}).appendTo(appndTo); //No i18n
            if(ele.title){
                buttonObj.attr("ztooltip", ele.title).addClass("ztooltip"); //No i18n
            }
            zjQuery("<span>").attr("class", "ztb-icons "+iconCls).appendTo(buttonObj); //No i18n
        },
        _triggerAnAction: function(action, tgt){
            if(typeof action === "string" && action.indexOf("URL:") !== -1 || typeof action === "string" && action.indexOf("javascript:") !== -1){ //No i18n
                if(action.indexOf("URL:") !== -1){ //No i18n
                    window.open(action.split("URL:")[1],tgt); //No i18n
                }else if(action.indexOf("javascript:") !== -1){ //No i18n
                    window.location.href = action;
                }
            }
            else if(typeof action === "function"){ //No i18n
                action();
            }
        },
        _toggle: function( clickEle, showEle ){
            this.clickEle = clickEle;
            var dataObj = this.clickEle.data();
            var _lastOpenedItem = this._lastOpenedItem;
            if(this._lastOpenedItem !== undefined ){
                this._closeOpenedItems();
            }
            if(dataObj.itemType === undefined || (_lastOpenedItem && _lastOpenedItem[0] === clickEle[0]) ){
                return;
            }
            if(this.clickEle && dataObj && dataObj.options && dataObj.options.uitype === "button"){ //No I18N
                this._triggerAnAction(dataObj.options.action, dataObj.options.target);
                return;
            }
            else{
                this._lastOpenedItem = this.clickEle;
                this.showEle = showEle ? showEle : zjQuery("#"+clickEle[0].id+"-"+this.clickEle.attr("type")); //No I18N
                this._lastShownEle = this.showEle;
            }
            var eleId = this.clickEle[0].id;
            this._triggerEvent(this._EVENTS.ITEMONCLICK);
            if(eleId && eleId.indexOf("ztb-switch-menu") != -1){ //No I18N
                var top = (this.data.position == "fixed") ? ((clickEle.offset().top - zjQuery(window).scrollTop()) + this.ztbContainer.height()) : (clickEle.offset().top + this.ztbContainer.height());   //No I18N
                this.showEle.css("top", top); //No I18N
                if(this.mainCont.hasClass("ztb-fixed")){ //No I18N
                    showEle.addClass("ztb-fixed"); //No I18N
                }
            }
            this.clickEle.addClass("ztb-active");   //No I18N
            this.showEle.removeClass("ztb-collapse").addClass("ztb-expand");   //No I18N
            if(this.clickEle.attr("type") === "popover" || this.clickEle.attr("type") === "menu"){ //No I18N
                if(this.clickEle.attr("type") === "popover"){ //No I18N
                    this._triggerEvent(this._EVENTS.POPOVEROPEN, dataObj.options);
                }
                else if(this.clickEle.attr("type") === "menu"){ //No I18N
                    this._triggerEvent(this._EVENTS.MENUOPEN, dataObj.options);
                }
                this._setPosition(clickEle);
            }
            var base = this;
            this._documentEle.unbind("mouseup.document").bind("mouseup.document",function(e){ //No I18N
                if( base._lastShownEle !== undefined && base._lastOpenedItem !== undefined ){
                    if(zjQuery(e.target).closest("#"+base._lastShownEle[0].id)[0] !== base._lastShownEle[0] //No I18N
                        && zjQuery(e.target).closest("#"+base._lastOpenedItem[0].id)[0] !== base._lastOpenedItem[0])    //No I18N
                    {
                        base._closeOpenedItems();
                    }
                }
            });
        },
        _onResize:function(){
            this._setDropdownHeight();
            var base = this;
            var onReTime = undefined;
            var windowObj = zjQuery(window);
            windowObj.bind("resize.topbar", function() { //No i18n
                base._windowWidth = windowObj.width();
                clearTimeout(onReTime);
                onReTime = setTimeout(function() {
                    base._closeOpenedItems(true);
                }, 30);
            }).bind('keydown.topbar',function( orgEvent ) {    //No i18n
                if (orgEvent.keyCode === 27) {
                    base._closeOpenedItems();
                    if( zjQuery('#ztb-profile').hasClass('ztb-expand') ){   //No I18N
                        base._documentEle.trigger("mouseup.doc");   //No I18N
                    }
                }
            });
        },
        _closeOpenedItems: function( fromResize ){
            if(this._lastOpenedItem){
                var dataObj = this._lastOpenedItem.data();
                this._lastOpenedItem.removeClass("ztb-active");    //No I18N
                if(this._lastShownEle){
                    this._lastShownEle.removeClass("ztb-expand").addClass("ztb-collapse");    //No I18N
                }
                if(this._lastOpenedItem.attr("type") === "popover"){ //No I18N
                    this._triggerEvent(this._EVENTS.POPOVERCLOSE, dataObj.options);
                }
                else if(this._lastOpenedItem.attr("type") === "menu"){ //No I18N
                    this._triggerEvent(this._EVENTS.MENUCLOSE, dataObj.options);
                }
                this._lastOpenedItem = undefined;
                this._lastShownEle = undefined;
            }
            if(fromResize){
                this._setDropdownHeight();
            }
            this._documentEle.unbind("mouseup.document"); //No i18n
        },
        _setDropdownHeight: function () {
            if(this.data.position === "fixed"){ //No i18n
                var menuObjects = zjQuery(".ztb-dropdown"), //No i18n
                    menuEle, index;
                for (index = 0; index < menuObjects.length; index++) {
                    menuEle = zjQuery(menuObjects[index]);
                    menuEle.find(".ztb-content").css("max-height", (60 / 100 * zjQuery(window).height()));  //No i18n
                }
            }
        },
        _createPopover: function( clickEle ){
            this.clickEle = clickEle;
            var popoverEle = zjQuery("#"+this.clickEle[0].id+"-popover"); //No i18n
            if(popoverEle[0] !== undefined){
                this.showEle = popoverEle;
            }
            else{
                var label = clickEle.data("label") ? clickEle.data("label") : this.clickEle.attr("ztooltip"); //No i18n
                var innerHTML = clickEle.data("html") ? clickEle.data("html") : ""; //No i18n
                var popover = zjQuery("<div>").attr({"id": this.clickEle[0].id+"-popover", "class" : "ztb-popover ztb-font-family ztb-collapse"}).insertAfter(this.mainCont); //No i18n
                zjQuery("<div>").attr("class", "ztb-arrow "+ this._ieClass).appendTo(popover); //No i18n
                var topCont = zjQuery("<div>").attr("class", "ztb-label").appendTo(popover); //No i18n
                zjQuery("<label>").appendTo(topCont).attr("class", "ztb-popover-label").text(label); //No i18n
                zjQuery("<span>").attr({"ztooltip": this._getString("close"), "class" : "ztb-popoverClose ztooltip ztb-icon-group"}).appendTo(topCont); //No i18n
                zjQuery("<div>").appendTo(popover).attr({"id" : (this.clickEle[0].id).split("ztb-")[1], "class" : "ztb-popover-content"}).html(innerHTML); //No i18n
                this.showEle = popover;
                if(this.mainCont.hasClass("ztb-fixed")){ //No i18n
                    popover.addClass("ztb-fixed"); //No i18n
                }
            }
            var base = this;
            zjQuery("#"+this.clickEle[0].id+"-popover .ztb-popoverClose").bind("click.close",function(e){ //No i18n
                base._closeOpenedItems();
            });
        },
        _createMenu: function( clickEle, val ){
            this.clickEle = clickEle;
            var menuEle = zjQuery("#"+this.clickEle[0].id+"-"+clickEle.attr("type")); //No i18n
            if(clickEle[0].id === "ztb-help"){ //No i18n
                val = this._createMenuFormat( "ztb-help" , val); //No i18n
            }
            else if(clickEle[0].id === "ztb-settings"){ //No i18n
                val = this._createMenuFormat( "ztb-settings" , val); //No i18n
            }
            this.clickEle = clickEle;
            if(menuEle[0] !== undefined){
                this.showEle = menuEle;
            }
            else{
                var uitype = clickEle.data("uitype") ? "ztb-"+clickEle.data("uitype") : ""; //No i18n
                var dd = zjQuery("<div>").attr({"id" : this.clickEle[0].id+"-menu", "class" : "ztb-dropdown ztb-font-family ztb-collapse "+ uitype}).insertAfter(this.mainCont); //No i18n
                zjQuery("<div>").attr("class", "ztb-arrow " + this._ieClass).appendTo(dd);  //No i18n
                var content = zjQuery("<div>").attr("class", "ztb-content").appendTo(dd); //No i18n
                zjQuery("<ul>").attr("class", "ztb-ul").appendTo(content); //No i18n
                this.addMenuItem(val);
                if(this.mainCont.hasClass("ztb-fixed")){ //No i18n
                    dd.addClass("ztb-fixed"); //No i18n
                }
                this.showEle = dd;
            }
        },
        _createSettingOption: function(menuObj){
            this.ztbSettings.attr({"type":"menu", "ztooltip":  this._getString("settings") , "id": "ztb-settings", "class" : "ztb-menu-type ztooltip"}).data({"values": menuObj }).prependTo(this.ztbMenuTypeCont); //No i18n
            zjQuery("<span>").attr("class", "ztb-icons ztb-icon-group").appendTo(this.ztbSettings); //No i18n
            this._createMenu(this.ztbSettings, menuObj);
        },
        _createMenuFormat:function( optionID , datas ){
            var menu = [];
            if(optionID === "ztb-help"){ //No i18n
                var helpAdded = false;
                var helpLabels = { "helpLink" : this._getString("help") , "helpCenterLink" : this._getString("helpCenter") , "FAQLink" : this._getString("faq") , "gettingStarted" : this._getString("gettingStarted") , "tour" : this._getString("takeATour") }; //No i18n
                var supportLabels = [ this._getString("forums") , this._getString("support") , this._getString("feedback") , this._getString("liveChat") ]; //No i18n
                if (datas.helpLinks) {
                    var helpLinks = datas.helpLinks;
                    var menusLength = 0;
                    for(var link in helpLinks){
                        menusLength += 1;
                        var menuItem = {"id": link, "label": helpLabels[link] }; //No i18n
                        if(helpLinks[link] !== undefined && helpLinks[link] !== ""){ //No i18n
                            if(typeof helpLinks[link] === "string"){ //No i18n
                                if(helpLinks[link].indexOf("javascript:") !== -1){ //No i18n
                                    menuItem.action = helpLinks[link];
                                }else{
                                    menuItem.action = "URL:"+helpLinks[link]; //No i18n
                                    menuItem.target = "_blank"; //No i18n
                                }
                            }else if(typeof helpLinks[link] === "function"){ //No i18n
                                menuItem.action = helpLinks[link];
                            }
                        }
                        if((link === "helpLink" || link === "helpCenterLink") && !helpAdded ){ //No i18n
                            helpAdded = true;
                            menuItem.id = "ztb-"+menuItem.id; //No i18n
                            menu.splice(0,0,menuItem);
                        }else if(link === "FAQLink"){ //No i18n
                            menuItem.id = "ztb-"+menuItem.id; //No i18n
                            menu.splice(1,0,menuItem);
                        }else if(link === "gettingStarted"){ //No i18n
                            menuItem.id = "ztb-"+menuItem.id; //No i18n
                            menu.splice(2,0,menuItem);
                        }else if(link === "tour"){ //No i18n
                            menuItem.id = "ztb-"+menuItem.id; //No i18n
                            menu.splice(3,0,menuItem);
                        }
                    }
                    if(helpLinks.others  !== undefined){
                        for(i=0; i<helpLinks.others.length; i++){
                            menu.push(helpLinks.others[i]);
                        }
                    }
                    if(menusLength !== 0){
                        menu.push({"id" : "ztb-helpsep1", "separator":true}); //No i18n
                    }
                }
                if(datas.otherInfo !== undefined){
                    for(i=0; i<datas.otherInfo.length; i++){
                        menu.push(datas.otherInfo[i]);
                    }
                }
                var aboutUsLabel = this._getString("about") +" "+ this._getString("cliqueserv") +" "+ this._getString(this.product);  //No I18N
                if(!zjQuery.inArray(this.product, this._subServices)){   //No I18N
                    aboutUsLabel = this._getString("about") +" "+ this._getString("cliqueserv");  //No I18N
                }
                menu.push({"id":"ztb-about","label": aboutUsLabel,"action": "URL:"+ this._aboutUsLink, "target":"_blank"}); //No I18N
                menu.push({"id":"ztb-blogs","label": this._getString("blogs") ,"action": "URL:"+ this._blogsLink, "target":"_blank"}); //No I18N
                menu.push({"id" : "ztb-helpsep2","separator":true}); //No i18n
                menu.push({"id":"ztb-forums","label":supportLabels[0],"action": "URL:"+ this._forumsLink, "target":"_blank"}); //No I18N
                if(datas.supportLink !== undefined){
                    menu.push({"id":"ztb-support","label":supportLabels[1],"action":datas.supportURL, "target":"_blank"}); //No I18N
                }
                else if(datas.feedback !== undefined){
                    menu.push({"id":"ztb-feedback", "label":supportLabels[2], "action":datas.feedback, "target":"_blank"}); //No I18N
                }
                if(datas.liveChat !== undefined){
                    menu.push({"id":"ztb-liveChat","label":supportLabels[3],"action":datas.liveChat, "target":"_blank"}); //No I18N
                }
            }else if (optionID === "ztb-settings"){ //No i18n
                var others = false;
                var label = ""; //No i18n
                var settingsLabel = String( this._getString("settings") ).toLowerCase(); //No i18n
                var myPreferencesLabel = String( this._getString("myPreferences") ).toLowerCase(); //No i18n
                var adminPanelLabel = String( this._getString("adminPanel") ).toLowerCase(); //No i18n
                for(var i=0; i < datas.length; i++){
                    label = datas[i].label ? datas[i].label.toLowerCase() : ""; //No i18n
                    if(datas[i].type === "general"){ //No i18n
                        menu.splice(0,0,{"id":"ztb-settings","label": this._getString("settings") ,"action":datas[i].action,"target":"_blank"}); //No i18n
                        this._sepPos++;
                    }
                    if(datas[i].type === "myPreferences"){ //No i18n
                        menu.splice(1,0,{"id":"ztb-myPreferences","label": this._getString("myPreferences") ,"action":datas[i].action,"target":"_blank"}); //No i18n
                        this._sepPos++;
                    }
                    if(datas[i].type === "adminPanel"){ //No i18n
                        menu.splice(2,0,{"id":"ztb-adminPanel","label": this._getString("adminPanel") ,"action":datas[i].action,"target":"_blank"}); //No i18n
                        this._sepPos++;
                    }
                    else if((label || datas[i].separator) && (label !== settingsLabel  && label !== myPreferencesLabel && label !== adminPanelLabel)){ //No i18n
                        menu.push(datas[i]);
                        others = true;
                    }
                }
                if(this._sepPos !== 0 && others){
                    menu.splice(this._sepPos,0,{"id" : "ztb-settingsSep1", "separator" : true}); //No i18n
                }
            }
            return menu;
        },
        _setPosition: function( clickEle ){
            this.clickEle = clickEle;
            var docWidth = this._windowWidth-40,
                itemArrow = zjQuery(this.showEle[0].childNodes[0]),
                clickOffset = clickEle.offset(),
                showEleWidth = this.showEle.width(),
                heightWithBorder = this.ztbContainer.outerHeight(),
                topPos = (this.data.position == "fixed") ? ((clickOffset.top - zjQuery(window).scrollTop() ) + heightWithBorder) : (clickOffset.top + heightWithBorder);
            this.showEle.css({"left":(clickOffset.left + (clickEle.outerWidth()/2) - (this.showEle.outerWidth()/2)),"top": topPos});   //No i18n
            var showOffset =  this.showEle.offset();
            itemArrow.css("left", ((showEleWidth-16)/2));    //No i18n
            if( (showOffset.left + showEleWidth ) > this._windowWidth){
                var dif = showOffset.left+this.showEle.width() - docWidth;
                var itemLeft = ( this.clickEle.offset().left + this.clickEle.outerWidth(true) ) - (this.showEle.outerWidth( true ));
                this.showEle.css("left", itemLeft);  //No I18N
                itemArrow.css("left", this.showEle.outerWidth(true) - (itemArrow.outerWidth()/2 + this.clickEle.outerWidth(true)/2)-1 );   //No I18N
            }
        },
        addMenuItem: function( menuObj , clickEle){
            var optionID = (zjQuery("#"+this.parentElement).attr("type") === "menu") ? this.parentElement : (clickEle ? clickEle : this.clickEle[0].id); //No i18n
            var elementObj = zjQuery("#"+optionID); //No i18n
            if(elementObj.attr("type") === "menu" && menuObj){ //No i18n
                menuObj = (zjQuery.isArray(menuObj)) ? menuObj : [menuObj];
                if(this.data.settings && (this.data.settings.uitype === "menu" || !this.data.settings.uitype) && !zjQuery("#ztb-settings:visible")[0] && optionID === "ztb-settings"){ //No i18n
                    zjQuery("#ztb-subscriptionText").remove(); //No i18n
                    zjQuery("#ztb-settings").show(); //No i18n
                    menuObj.splice(0,0,{"separator" : true, "id" : "ztb-subs1"}); //No i18n
                    menuObj.splice(1,0,{"id":"ztb-manageSubscription", "label": this._getString("manageSubscription") , "URL": this.data.subscription.manageSubscriptionLink, "target":"_blank"}); //No i18n
                }
                var Obj = zjQuery("#"+optionID+"-menu > .ztb-content > .ztb-ul"); //No i18n
                for(i = 0; i < menuObj.length; i++){
                    var itemObj = menuObj[i];
                    var selected = itemObj.selected ? "ztb-selected" : ""; //No i18n
                    var id = itemObj.id ? itemObj.id : ""; //No i18n
                    var li = zjQuery("<li>").attr({"id": id, "class": selected}); //No i18n
                    if((id && !zjQuery("#"+id, Obj)[0])){ //No i18n
                        var iconClass = itemObj.iconClass ? itemObj.iconClass + " ztb-menu-icon " : ""; //No i18n
                        var labl = itemObj.label? itemObj.label : ""; //No i18n
                        var lnk = itemObj.URL? itemObj.URL : ""; //No I18N
                        var targt = itemObj.target? itemObj.target : ""; //No i18n
                        var manageSubs = zjQuery("#manageSubscription"); //No i18n
                        var existsEle = itemObj.position ? Obj[0].childNodes[itemObj.position] : undefined;
                        if(itemObj.separator){
                            li.addClass("ztb-seperator"); //No i18n
                        }else{
                            var anchr = zjQuery("<a>").text(labl).appendTo(li).attr({"href":lnk, "target":targt}).data({"menuItem":itemObj}); //No I18N
                            var span = zjQuery("<span>").attr("class", iconClass ? iconClass: ""); //No i18n
                            anchr.prepend(span);
                        }
                        if(existsEle){
                            li.insertBefore(existsEle);
                        }else if(manageSubs[0] !== undefined && optionID === "ztb-settings" && id !== "tryOtherEditions"){ //No i18n
                            var appndTo = manageSubs.prev()[0] ? manageSubs.prev() : manageSubs;
                            if(optionID === "ztb-settings" && this._sepPos && !zjQuery("#ztb-settingsSep1")[0]){ //No i18n
                                zjQuery("<li>").attr({"id" : "ztb-settingsSep1", "class" : "ztb-seperator"}).insertBefore(appndTo); //No i18n
                            }
                            li.insertBefore(appndTo);
                        }else if(!existsEle){
                            if(this._sepPos !== 0 && optionID === "ztb-settings" && this._sepPos === Obj.find("li").length && !zjQuery("#ztb-settingsSep1")[0] && !this._getString(itemObj.id) && !itemObj.separator){ //No i18n
                                zjQuery("<li>").attr({"id": "ztb-settingsSep1", "class": "ztb-seperator"}).appendTo(Obj); //No i18n
                            }
                            li.appendTo(Obj);
                        }
                        if(itemObj.action){
                            var act = itemObj.action;
                            if(typeof act === "string"){ //No i18n
                                if(act.indexOf("URL:") !== -1){ //No i18n
                                    anchr.attr("href",act.split("URL:")[1]); //No i18n
                                }else if(act.indexOf("javascript:") !== -1){ //No i18n
                                    anchr.attr("href",act); //No i18n
                                    anchr.removeAttr("target"); //No i18n
                                }
                            }else if(typeof act === "function"){ //No i18n
                                anchr.removeAttr("target").removeAttr("href"); //No i18n
                                this._actionBind(anchr);
                            }
                        }
                    }
                }
                var base = this;
                zjQuery(".ztb-dropdown li").unbind("click.menuItem").bind("click.menuItem",function(e){ //No i18n
                    base._closeOpenedItems();
                    // PORTAL ONCHANGE ACTION
                    if(zjQuery(this).closest("#ztb-portals-menu")[0] && this.id != "ztb-managePortals"){ //No i18n
                        zjQuery("#ztb-portals").find("a").text(zjQuery(this).find("a").text()); //No i18n
                    }
                    //END PORTAL ONCHANGE ACTION
                });
                this._refreshMenu(optionID);
                return this;
            }
        },
        hideMenuItem: function( menuObj ){
            this._hideMenuItem( menuObj , false);
        },
        showMenuItem: function( menuObj ){
            this._hideMenuItem( menuObj, true );
        },
        _hideMenuItem: function( menuObj , status){
            var optionID = (zjQuery("#"+this.parentElement).attr("type") === "menu") ? this.parentElement : (this.clickEle[0].id); //No i18n
            if(zjQuery("#"+optionID).attr("type") === "menu"){ //No i18n
                menuObj = (zjQuery.isArray(menuObj)) ? menuObj : [menuObj];
                for(i=0; i < menuObj.length; i++){
                    var selectedDiv = zjQuery("#"+ menuObj[i], "#"+optionID+"-menu"); //No i18n
                    if(selectedDiv.prev().attr("class") === "ztb-seperator" && (selectedDiv.next().attr("class") === "ztb-seperator" || !selectedDiv.next()[0])){ //No i18n
                        selectedDiv.prev()[ status ? show : hide]();
                    }
                    selectedDiv[ status ? 'show' : 'hide']();   //No i18n
                }
                this._refreshMenu(optionID);
                return this;
            }
        },
        removeMenuItem: function( menuObj ){
            var optionID = (zjQuery("#"+this.parentElement).attr("type") === "menu") ? this.parentElement : (this.clickEle[0].id); //No i18n
            if(zjQuery("#"+optionID).attr("type") === "menu"){ //No i18n
                menuObj = (zjQuery.isArray(menuObj)) ? menuObj : [menuObj];
                for(i=0; i < menuObj.length; i++){
                    var selectedDiv = zjQuery("#"+ menuObj[i], "#"+optionID+"-menu"); //No i18n
                    if(selectedDiv.prev().attr("class") === "ztb-seperator" && (selectedDiv.next().attr("class") === "ztb-seperator" || !selectedDiv.next()[0])){ //No i18n
                        selectedDiv.prev().remove();
                    }
                    selectedDiv.remove();
                }
                this._refreshMenu(optionID);
                return this;
            }
        },
        updateMenuItem: function( menuObj ){
            var optionID = (zjQuery("#"+this.parentElement).attr("type") === "menu") ? this.parentElement : (this.clickEle[0].id); //No i18n
            if(zjQuery("#"+optionID).attr("type") === "menu"){ //No i18n
                menuObj = (zjQuery.isArray(menuObj)) ? menuObj : [menuObj];
                for(i=0; i < menuObj.length; i++){
                    var itemObj = menuObj[i];
                    var menuItem = zjQuery("#"+itemObj.id, "#"+optionID+"-menu").find("a"); //No i18n
                    if(menuItem){
                        menuItem.data("menuItem", zjQuery.extend({}, menuItem.data("menuItem") , itemObj)); //No i18n
                        var menuIcon = menuItem.find('span'); //No i18n
                        if(itemObj.label){
                            menuItem.text(itemObj.label);
                            menuItem.prepend(menuIcon);
                        }
                        var attrObj = {};
                        if(itemObj.URL){
                            attrObj.href = itemObj.URL;
                        }
                        if(itemObj.target){
                            attrObj.target = itemObj.target;
                        }
                        if(itemObj.iconClass !== undefined ){
                            if(itemObj.iconClass === "" ){ //No i18n
                                menuIcon.removeAttr('class'); //No i18n
                            }
                            else{
                                menuIcon.attr("class", itemObj.iconClass + " ztb-menu-icon "); //No i18n
                            }
                        }
                        if(itemObj.action){
                            menuItem.unbind('click.ztb'); //No i18n
                            var act = itemObj.action;
                            if(typeof act === "string"){ //No i18n
                                if(act.indexOf("URL:") !== -1){ //No i18n
                                    attrObj.href = act.split("URL:")[1]; //No i18n
                                }
                                else if(act.indexOf("javascript:") !== -1){ //No i18n
                                    menuItem.removeAttr("target"); //No i18n
                                    attrObj.href = act;
                                }
                            }
                            else if(typeof act === "function"){ //No i18n
                                menuItem.removeAttr("target"); //No i18n
                                this._actionBind(menuItem);
                            }
                        }
                        menuItem.attr(attrObj);
                    }
                }
                this._refreshMenu(optionID);
                return this;
            }
        },
        _actionBind: function(menuItem){
            menuItem.bind('click.ztb', function(e){ //No i18n
                var itemAction = zjQuery(this).data("menuItem").action; //No i18n
                if(itemAction){
                    itemAction();
                }
                e.preventDefault();
            });
        },
        updateCount: function( count ){
            var optionID = (zjQuery("#"+this.parentElement).attr("type") === "popover") ? this.parentElement : (this.clickEle[0].id); //No I18N
            var selElement = zjQuery("#"+optionID); //No I18N
            if(selElement.attr("type") === "popover"){ //No I18N
                count = parseInt(count);
                if(count > 0){
                    var countLeft;
                    var beforeTooltip = selElement.attr("ztooltip") ? selElement.attr("ztooltip") : '' ; //No I18N
                    if( count > 99 ){
                        countLeft = 0;
                        selElement.attr("ztooltip" , beforeTooltip+"  ("+count+")"); //No I18N
                        count = "99+"; //No i18n
                    }else{
                        countLeft =  3;
                        if(beforeTooltip.indexOf("(") !== -1){ //No I18N
                            selElement.attr("ztooltip" , beforeTooltip.split("(")[0]); //No I18N
                        }
                    }
                    setTimeout(function(){
                        var notifyElement = zjQuery("#"+optionID+"-count"); //No I18N
                        if(!notifyElement.length){
                            notifyElement = zjQuery("<span>").appendTo(selElement).attr({"id": optionID+"-count", "class": "ztb-notification-alert"}); //No I18N
                        }
                        zjQuery("#"+optionID+"-count").removeClass("ztb-collapse").addClass("ztb-animate"); //No I18N
                        notifyElement.text(count);
                    }, 1000);
                    setTimeout(function(){
                        zjQuery("#"+optionID+"-count").removeClass("ztb-animate"); //No i18n
                    }, 1700)
                }
                else{
                    zjQuery("#"+optionID+"-count").addClass("ztb-collapse").removeClass("ztb-animate"); //No I18N
                }
            }
        },
        _initRebradingLogo: function(rebrandingLogoSrc){
            if(this._displayLogo){
                var ztbLogoSrc = "";
                if(this._ztbLogo.children().length !== 0){
                    this._ztbLogo.children().remove();
                }
                if(rebrandingLogoSrc){
                    var ztbLogoSrc = zjQuery("<img>").attr({"src": rebrandingLogoSrc, "id": "ztb-logo-rebrand" }).appendTo(this._ztbLogo); //No i18n
                    ztbLogoSrc.load(function(ev){
                        ztbLogoSrc.css({"margin-top" : Math.ceil(( ztbLogoSrc.height() > 34) ? 3 : ( (39-ztbLogoSrc.height())/2 ))}); //No i18n
                    });
                }
                else{
                    zjQuery("<span>").attr('class' , "zlogos-22 zlogos-"+ this.product).appendTo(this._ztbLogo); //No I18N
                }
            }
        },
        _changePlaceholder: function(text){
            if(text){
                if(this._isPlaceholder){
                    zjQuery("#ztb-search-placeholder").text(text);  //No i18n
                }else{
                    zjQuery("#ztb-search-field").attr("placeholder", text); //No i18n
                }
            }else{
                if(this._isPlaceholder){
                    return zjQuery("#ztb-search-placeholder").text();  //No i18n
                }else{
                    return zjQuery("#ztb-search-field").attr("placeholder"); //No i18n
                }
            }
        },
        _changePortal: function(portalID){
            if(portalID){
                var _selectedEle = zjQuery("#"+portalID);  //No i18n
                if(_selectedEle && _selectedEle.closest("#ztb-portals-menu")[0]){ //No i18n
                    _selectedEle.trigger("click");  //No i18n
                }
            }
        },
        _changeUserInfo: function(userInfo, value){ // userInfo can be a JSON object {OR} Name of the Attribute.
            if(typeof userInfo === "object"){ //No i18n
                this.data.userInfo = zjQuery.extend({}, this.data.userInfo, userInfo);
                if(userInfo.name){
                    this._setUsername(userInfo.name);
                }
                if(userInfo.emailAddress){
                    this._setEmailAddress(userInfo.emailAddress);
                }
                if(userInfo.photo){
                    this._changeUserPhoto(userInfo.photo);
                }
                this.data.userInfo = zjQuery.extend({}, this.data.userInfo, userInfo);
            }else if(typeof userInfo === "string"){ //No i18n
                if(value){
                    if(userInfo == "name"){ //No i18n
                        this._setUsername(value);
                    }else if(userInfo == "emailAddress"){ //No i18n
                        this._setEmailAddress(value);
                    }else if(userInfo == "photo"){ //No i18n
                        this._changeUserPhoto(value);
                    }
                    this.data.userInfo[userInfo] = value;
                }else{
                    return this.data.userInfo[userInfo];
                }
            }
        },
        _setUsername: function(name){
            if(name){
               var _usernameEle = zjQuery("#ztb-user-name"); //No i18n
               if(_usernameEle.length === 0){
                    _usernameEle = zjQuery("<p>").attr("id" , "ztb-user-name").prependTo(this.profileHeader); //No i18n
                }
                _usernameEle.text(name);
                var temDiv = zjQuery("<p>").css("font-size", 15).attr({"id": "ztb-temp-span", "class": "ztb-font-family"}).appendTo(zjQuery("body")).text(name); //No i18n
                if(temDiv.width() > 182){
                    _usernameEle.attr({"ztooltip" : name, "class" : "ztooltip"}); //No i18n
                }
                else{
                    _usernameEle.removeClass('ztooltip').removeAttr('ztooltip') ;  //No I18N
                }
                temDiv.remove();
            }
        },
        _setEmailAddress: function(emailAddress){
            if(emailAddress){
                var _emailEle = zjQuery("#ztb-user-id"); //No i18n
                if(_emailEle.length === 0){
                    _emailEle = zjQuery("<p>").attr("id", "ztb-user-id").insertAfter( zjQuery("#ztb-user-name") ); //No I18N
                }
                _emailEle.text(emailAddress);
                var temDiv = zjQuery("<div>").css("font-size", 13).attr({"id": "ztb-temp-span", "class": "ztb-font-family"}).appendTo(zjQuery("body")).text(emailAddress); //No i18n
                if(temDiv.width() > 176){
                    _emailEle.attr({"ztooltip" : emailAddress, "class" : "ztooltip"}); //No i18n
                }
                else{
                    _emailEle.removeClass('ztooltip').removeAttr('ztooltip') ;  //No I18N
                }
                temDiv.remove();
            }
        },
        _changeUserPhoto : function(newPhoto){
            if(newPhoto){
                zjQuery("#ztb-profile-image").attr("src" , newPhoto);   //No i18n
                var photoLabel = this._getString("change") ; //No i18n
                zjQuery("#ztb-profile-image").next().text(photoLabel);  //No i18n
            }
        },
        _showClearText: function(){
            zjQuery("#ztb-search-action").addClass("ztb-search-clear ztb-icon-group"); //No I18N
            zjQuery("#ztb-search-action").bind("click.clearText", function(e){ //No I18N
                zjQuery("#ztb-search-field").val(""); //No I18N
            });
        },
        _hideClearText: function(){
            zjQuery("#ztb-search-action").removeClass("ztb-search-clear ztb-icon-group"); //No I18N
        },
        innerHTML: function( htmlString ){
            var optionID = (zjQuery("#"+this.parentElement).attr("type") === "popover") ? this.parentElement : (this.clickEle[0].id); //No i18n
            if(zjQuery("#"+optionID).attr("type") === "popover"){ //No i18n
                zjQuery("#"+optionID+"-popover .ztb-popover-content").append(htmlString); //No i18n
            }
        },
        showTrialInfo:function(subDetail){
            var trialInfo = (subDetail && subDetail.trialInfo) ? subDetail.trialInfo : subDetail;
            var base = this;
            if(trialInfo && base._trialUpgradeLink){
                var notifyBar = zjQuery("#ztb-notify-container"); //No i18n
                if(!notifyBar.length){
                    notifyBar = zjQuery("<div>").attr({"class":"ztb-notify-container ztb-font-family", "id": "ztb-notify-container"}); //No i18n
                    this.mainCont.prepend(notifyBar);
                    var center = zjQuery("<center>").appendTo(notifyBar); //No i18n
                    zjQuery("<span>").appendTo(center); //No i18n
                    zjQuery("<button>").addClass("ztb-font-family").appendTo(center); //No i18n
                    zjQuery("<font>").attr({"id": "ztb-will-do-later", "class": "ztb-collapse"}).appendTo(center).text( this._getString("willDoLater") ); //No i18n
                    var notifybarClose = zjQuery("<div>").attr({"id": "ztb-notifybar-close", "class":"ztb-icon-group ztooltip", "ztooltip": this._getString("close") }).appendTo(notifyBar); //No i18n
                    notifybarClose.add(zjQuery("#ztb-will-do-later")).bind("click.notifybar",function(ev) { //No i18n
                        if(zjQuery("#ztb-upgradeLink").length < 1){ //No i18n
                            var ztbOtherEditions = zjQuery("<div>").attr({"class" : "ztb-text-type", "id" : "ztb-upgradeLink", "type" : "text"}).prependTo(zjQuery("#ztb-textTypeCont")); //No i18n
                            zjQuery("<a>").attr({'class': "ztb-anchor", "href": base._trialUpgradeLink, "target":"_blank"}).appendTo(ztbOtherEditions).text( base._getString("upgrade") ); //No i18n
                            zjQuery("#ztb-service-info").css("border-right-width", "0px");    //No i18n
                        }
                        else{
                            zjQuery("#ztb-upgradeLink").slideDown(100); //No i18n
                        }
                        notifyBar.slideUp(200);
                        setTimeout(function(){
                            notifyBar.addClass("ztb-collapse"); //No i18n
                        }, 300);
                        base._triggerEvent(base._EVENTS.TRIALCLOSE); //No i18n
                    });
                    base._triggerEvent(base._EVENTS.TRIALOPEN); //No i18n
                    zjQuery("#ztb-tryOtherEditions").hide(); //No i18n
                    base._initTooltipEvents();
                }
                var remaingDays = parseInt(trialInfo.remainingDays);
                var  msg = undefined;
                if(remaingDays >= 0){
                    if(remaingDays === 0){
                        msg = this._getString("trialNotifyMessageToday"); //No i18n
                    }
                    else if(remaingDays === 1){
                        msg = this._getString("trialNotifyMessageTomorrow"); //No i18n
                    }
                    else {
                        msg = this._getString("trialNotifyMessage"); //No i18n
                    }
                    zjQuery("#ztb-will-do-later").addClass("ztb-collapse"); //No i18n
                    zjQuery("#ztb-notifybar-close").removeClass("ztb-collapse"); //No i18n
                }
                if(remaingDays < 0){
                    msg = this._getString("trialNotifyMessageExpired"); //No i18n
                    zjQuery("#ztb-will-do-later").removeClass("ztb-collapse"); //No i18n
                    zjQuery("#ztb-notifybar-close").addClass("ztb-collapse"); //No i18n
                }
                if(!msg){
                    notifyBar.addClass("ztb-collapse"); //No i18n
                    return;
                }
                var label = this._replaceMessage(msg , ["<b>"+trialInfo.plan+"</b>", remaingDays]); //No i18n
                notifyBar.find("span").html(label); //No i18n
                notifyBar.find("button").text( this._getString("upgradeNow") ).click(function(e) { //No i18n
                    window.open(base._trialUpgradeLink,"_blank"); //No i18n
                });
                if(notifyBar.hasClass("ztb-collapse")){ //No i18n
                    notifyBar.removeClass("ztb-collapse")
                    notifyBar.slideDown(200);
                    zjQuery("#ztb-upgradeLink").hide(); //No i18n
                }
            }
        },
        hideTrialInfo: function() {
            var notifyBarClose = zjQuery("#ztb-notifybar-close"); //No i18n
            if(notifyBarClose){
                notifyBarClose.trigger("click"); //No i18n
                this._documentEle.trigger("mouseup.document");  //No i18n
                this._documentEle.trigger("mouseup.doc");  //No i18n
            }
        },
        _replaceMessage:function(msg, args){
            if (typeof args !== "undefined" && args.length > 0) { //No i18n
                for(var i=0; i < args.length; i++) {
                    var regEx = new RegExp("\\{" + i + "\\}", "gi"); //No i18n
                    msg = msg.replace(regEx, args[i]);
                }
            }
            return msg;
        },
        _getAppURL: function( appName ){
            var appURL = ""; //No I18N
			
							var urlInfoMap = {
				    "Assignment Management": "/assignment", // No I18N
					"Academic Query": "/query",
					"Writing Skills": "/writeEssay?method=1",
					"E-Library": "/library",
					"Mock Tests": "/lservices",
					"Project Report Review": "/postReport",
					"Career Counselling": "/counselling", 
					"Resume Writing": "/postResume",
					"Freelance Jobs": "/index", 
					"Employment Opportunities": "/advertisedjobs",
					"About us": "/about", 
					"Contact Us": "/contact", 
					"Blogs": "/viewblogs",
					"Literature Search":"/rservices",
					"Discuss Research Proposals": "/startThread",
					"Review Research Paper": "/postPaper?purpose=1", 
					"Scientific Paper Writing": "/postPaper?purpose=2",
					"Pdf Report Generator": "/pdfkit", 
					"Source Code Editor": "/codeedit", 
					"Digital Locker": "/locker", 
					"Function Plot": "/plot"
				
				};

			appURL = urlInfoMap[appName];
			
			/*
            if(this._isAppsInfoMapped && this._myAppsData ){
                var appInfo = this._myAppsData[appName];
                if(typeof appInfo === "object"){    //No I18N
                    if(!appInfo.isMyApp && appInfo.isMyApp !== undefined && appInfo.appURL && appInfo.appURL !== ""){  //No I18N
                        appURL = appInfo.appURL;
                        var queryString = appURL.substring( appURL.indexOf('?') + 1 );
                        if(queryString !== appURL){
                            appURL = appURL +"&src=topbar";   //No I18N
                        }
                        else{
                            appURL = appURL +"?src=topbar";   //No I18N
                        }
                    }
                    else if(appInfo.isMyApp && appInfo.url){
                        appURL = appInfo.url;
                    }
                }
            }
            if(appURL === "" && appName === "site24x7" ){    //No I18N
                appURL = "//site24x7.com/home/Welcome.do";   //No I18N
            }*/
            return appURL !== "" ? appURL : ( this._websiteLink + appName +"?src=topbar");    //No I18N
        },
        _generateSwitchToMenu: function( titleArray, appsArray, appendToEle ){
            for(var i = 0; i < titleArray.length; i++){
                var ulObj = zjQuery("<ul>").attr("class", "ztb-ul"); //No i18n
                var liObj = "<li class='ztb-apps-title'>"+titleArray[i]+"</li>"; //No i18n
                for(var appList = 0; appList < appsArray[i].length; appList++){
                    if(i !== 0){
                        ulObj.css({"margin-top": 33});  //No i18n
                    }
                    var appName = appsArray[i][appList];
                    liObj += "<li data-zapp='"+ appName +"' class='ztb-products'><a class='ztb-anchor' href='"+ this._getAppURL( appName ) +"'><span class='zicon-apps-16 zicon-apps-"+ appName +"'></span><div class='ztb-app-name'>"+ this._getString( appName ) +"</div></a></li>"; //No i18n
                }
                ulObj.append(liObj);
                appendToEle.append(ulObj);
            }
        },
        _profileToggle:function(){
            this.transitionSupport = (zjQuery("body").css("transition") !== undefined)? true : false; //No i18n
            var profileEle = zjQuery('#ztb-profile'), profileImgEle = zjQuery('#ztb-profile img'); //No i18n
            if(this.isOpen){
                if(navigator.appVersion.indexOf("MSIE 7.") !== -1){ //No i18n
                    profileEle.css({"height" : "auto"}).addClass("ztb-expand"); //No i18n
                }else{
                    profileEle.addClass("ztb-expand").css({"height": (this.ztbProfileDetails.outerHeight(true)+ this.profileHeader.outerHeight(true))}); //No i18n
                }
                this.isOpen = false;
                var px = 0, py = 0, base = this;
                this._documentEle.bind("mouseup.doc",function(e){ //No i18n
                    if(zjQuery(e.target).closest('#ztb-profile')[0] === profileEle[0]){ //No i18n
                        if ( px !== e.pageX || py !== e.pageY ) {
                            base.isOpen = true;
                            return;
                        } else {
                            base.isOpen = false;
                        }
                    } else {
                        base.isOpen = true;
                    }
                    profileEle.css("height", profileEle.data('imageHeight')).removeClass("ztb-expand"); //No i18n
                    base._documentEle.unbind("mouseup.doc"); //No i18n
                }).bind("mousedown", function(e) { //No i18n
                    px = e.pageX;
                    py = e.pageY;
                });
            }
            else{
                profileEle.css("height", profileEle.data('imageHeight')).removeClass("ztb-expand"); //No i18n
                this.isOpen = true;
            }
            profileImgEle.add("#ztb-profile > a").mouseenter(function(e){ //No i18n
                if(profileImgEle[0].height !== profileEle.data('imageHeight')){
                    zjQuery("#ztb-profile > a").css("display","block"); //No i18n
                }else{
                    zjQuery("#ztb-profile > a").css("display","none"); //No i18n
                }
            }).mouseout(function(e){
                if(profileImgEle[0].height !== profileEle.data('imageHeight')){
                    zjQuery("#ztb-profile > a").css("display","none"); //No i18n
                }
            });
            return;
        },
        _createTooltip: function(){
            this.ztooltip = zjQuery("<div>").attr({"class":"ztb-ztooltip ztb-font-family"}).html("<span></span><div></div>").appendTo(zjQuery("body")); //No i18n
            this._initTooltipEvents();
        },
        _initTooltipEvents: function(targetEle){
            if(!this.ztooltip){
                return;
            }
            var ztooltip = this.ztooltip;
            var ztooltipTime = 0, fadeOutTime = 0;
            targetEle = targetEle ? targetEle : zjQuery(".ztooltip");   //No I18N
            targetEle.unbind("mouseenter.ztooltip mouseleave.ztooltip click.ztooltip").bind("mouseenter.ztooltip", function(){ //No I18N
                if(!zjQuery(this).hasClass("ztb-active")){    //No i18n
                    var currElement = zjQuery(this);
                    ztooltipTime = setTimeout( function() {
                        if(currElement.attr("ztooltip") != '' && currElement.attr("ztooltip") != undefined ){   //No I18N
                            var body = zjQuery("body"); //No i18n
                            var bodyWidth = body.innerWidth();
                            ztooltip.fadeIn(200).find('div').text( currElement.attr("ztooltip") ); //No i18n
                            var tTop = parseInt( currElement.offset().top + currElement.innerHeight() + 6 );
                            var tLeft = parseInt( currElement.offset().left - ( ztooltip.innerWidth()/2 - currElement.innerWidth()/2));
                            var ztooltipLeft = parseInt((ztooltip.innerWidth()/2 )-5);
                            if(tLeft <= 1){
                                ztooltipLeft += tLeft;
                                tLeft = 1;
                            }else if((tLeft+ztooltip.innerWidth()) > bodyWidth){
                                var checkLeft = (tLeft+ztooltip.innerWidth()) - bodyWidth +1;
                                ztooltipLeft += checkLeft;
                                tLeft -= checkLeft;
                            }
                            ztooltip.css({ 'top': tTop, 'left': tLeft }); //No i18n
                            ztooltip.find('span').css("left", ztooltipLeft); //No i18n
                            fadeOutTime = setTimeout(function(){
                                    clearTimeout(ztooltipTime);
                                    ztooltip.fadeOut(200);
                            }, 5000);
                        }
                    },500);
                }
            }).bind("mouseleave.ztooltip", function(e){ //No i18n
                clearTimeout(ztooltipTime);
                clearTimeout(fadeOutTime);
                ztooltip.fadeOut();
            }).bind("click.ztooltip", function(e){ //No i18n
                clearTimeout(ztooltipTime);
                clearTimeout(fadeOutTime);
                ztooltip.hide();
            });
        },
        _userIdTooltip: function() {
            if(!this.userIdTooltip){
                this.userIdTooltip = zjQuery("<div>").attr({"id":"ztb-user-id-tooltip", "class": "ztb-font-family"}).html("<span></span><span id='ztb-uid-tooltip-arrow'></span><div><p>"+ this._getString("userIdTooltipDefinition") +"</p><p>"+ this._getString("userIdTooltipDescription") +"</p></div>").appendTo(zjQuery("body")); //No i18n
            }
            var userIdTooltip = this.userIdTooltip,
                userTooltipTime = 0,
                fadeOutTime1 = 0,
                body = zjQuery("body"); //No i18n
            zjQuery("#ztb-cliqueserv-uid-info").bind("mouseenter", function(){    //No i18n
                    var currElement = zjQuery(this);
                    userTooltipTime = setTimeout( function() {
                        var bodyWidth = body.innerWidth();
                        userIdTooltip.show();
                        var tTop = parseInt( currElement.offset().top + currElement.innerHeight() + 10 );
                        var tLeft = parseInt( currElement.offset().left - ( userIdTooltip.innerWidth()/2 - currElement.innerWidth()/2));
                        var ztooltipLeft = parseInt((userIdTooltip.innerWidth()/2 ));
                        if(tLeft <= 1){
                            ztooltipLeft += tLeft;
                            tLeft = 1;
                        }else if((tLeft+userIdTooltip.innerWidth()) > bodyWidth){
                            var checkLeft = (tLeft+userIdTooltip.innerWidth()) - bodyWidth +1;
                            ztooltipLeft += checkLeft;
                            tLeft -= checkLeft;
                        }
                        userIdTooltip.css({ 'top': tTop }); //No i18n
                        zjQuery(userIdTooltip.find('span')[0]).css("left", ztooltipLeft); //No i18n
                        zjQuery(userIdTooltip.find('span')[1]).css("left", ztooltipLeft+2); //No i18n
                    },100);
                }
            ).bind("mouseout click", function(e){
                clearTimeout(userTooltipTime);
                clearTimeout(fadeOutTime1);
                userIdTooltip.fadeOut();
            });
            zjQuery("#ztb-cliqueserv-uid").click(function(e){ //No i18n
                userIdTooltip.fadeOut();
            });
        },
        open: function(){
            var eleID = this.parentElement ? this.parentElement : (this.clickEle[0].id);
            var eleObj = zjQuery("#"+eleID); //No i18n
            if((!eleObj.hasClass("ztb-active") && (eleObj.attr("type") === "popover" || eleObj.attr("type") === "menu")) ){ //No i18n
                this._toggle(eleObj); //No i18n
            }
        },
        close: function(){
            var eleID = this.parentElement ? this.parentElement : (this.clickEle[0].id);
            var eleObj = zjQuery("#"+eleID); //No i18n
            if(eleObj.hasClass("ztb-active")){ //No i18n
                if(eleObj.attr("type") === "popover"){ //No i18n
                    this._toggle( eleObj ); //No i18n
                }else if(eleObj.attr("type") === "menu"){ //No i18n
                    this._toggle( eleObj ); //No i18n
                }
            }
        },
        _triggerEvent: function(e, ui){
            this.mainCont.trigger(this._widgetEventPrefix + e, ui);
        },
        _refreshMenu: function(optionID){
            var menuObj = zjQuery("#"+optionID+"-menu");
            var menuContent = menuObj.find("span.ztb-menu-icon"); //No I18N
            if(menuContent.length){
                menuObj.addClass("ztb-menu-icontext"); //No I18N
            }
            else{
                menuObj.removeClass("ztb-menu-icontext"); //No I18N
            }
            this.showEle = menuObj; //No i18n
            this._setPosition(zjQuery("#"+optionID)); //No i18n
        },
        setPosition: function ( positionToToggle ) {
            var curPosition = this.mainCont.css("position"); //No i18n
            if(curPosition !== positionToToggle){
                if(positionToToggle === "relative"){ //No i18n
                    zjQuery(".ztb-fixed").removeClass("ztb-fixed"); //No i18n
                }
                this.mainCont.css({"position": positionToToggle}); //No i18n
                return curPosition;
            }
        },
        show: function( status ){
            if(status){
                this.mainCont.hide();
                this._triggerEvent(this._EVENTS.ONCLOSE);
            }
            else{
                this.mainCont.show();
                this._triggerEvent(this._EVENTS.ONOPEN);
            }
        }
    };
    ztopbar = function(data){
        data.properWay = true;
        topbarObj = zTopbar(data);
    };
    ztopbar.addItem = function (Obj) {
        topbarObj.addItem(Obj);
    };
    ztopbar.removeItem = function (ObjID) {
        topbarObj.removeItem(ObjID);
    };
    ztopbar.item = function (ObjID) {
        topbarObj.item(ObjID);
        return topbarObj;
    };
    ztopbar.hideTrialInfo = function () {
        topbarObj.hideTrialInfo();
    };
    ztopbar.showTrialInfo = function (trialInfo) {
        topbarObj.showTrialInfo(trialInfo);
    };
    ztopbar.updateMessages = function (htmlString) {
        topbarObj.item("messages").innerHTML(htmlString); //No i18n
    };
    ztopbar.updateMessagesCount = function (number) {
        topbarObj.item("messages").updateCount(number); //No i18n
    };
    ztopbar.updateNotifications = function (htmlString) {
        topbarObj.item("notifications").innerHTML(htmlString); //No i18n
    };
    ztopbar.updateNotificationsCount = function (number) {
        topbarObj.item("notifications").updateCount(number); //No i18n
    };
    ztopbar.setPosition = function ( positionToToggle ) {
        topbarObj.setPosition(positionToToggle);
    };
    ztopbar.changeLogo = function ( src ) {
        topbarObj._initRebradingLogo(src);
    };
    ztopbar.selectPortal = function ( portalID ) {
        topbarObj._changePortal(portalID);
    };
    ztopbar.userInfo = function ( userInfo, value ) {
        return topbarObj._changeUserInfo(userInfo, value);
    };
    ztopbar.search = function() {
        return topbarObj;
    };
    ztopbar.search.placeholder = function(text) {
        return topbarObj._changePlaceholder(text);
    };
    ztopbar.search.showClearButton = function() {
        topbarObj._showClearText();
    };
    ztopbar.search.hideClearButton = function() {
        topbarObj._hideClearText();
    };
    ztopbar.open = function() {
        topbarObj.show(true);
    };
    ztopbar.close = function() {
        topbarObj.show(false);
    };
    ztopbar.attemptLogout = function()
    {
        $.ajax({
            url: "/rservices",
            type: "POST",
            data: {logout : true},
            success: function(data){
                ztopbar.showLockedAlert('You are now logged out.<br>Redirecting you back to the homepage.');
            },
            error: function(jqXHR){
                console.log(jqXHR.responseText+' :: '+jqXHR.statusText);
            }
        });
    }

    ztopbar.showLockedAlert = function(msg){
        $('.modal-alert').modal({ show : false, keyboard : false, backdrop : 'static' });
        $('.modal-alert .modal-header h3').text('Success!');
        $('.modal-alert .modal-body p').html(msg);
        $('.modal-alert').modal('show');
        $('.modal-alert button').click(function(){window.location.href = '/';})
        setTimeout(function(){window.location.href = '/';}, 3000);
    }
    function getI18NString(key, stringArray, defaultKeys) {
        return i8nText = zjQuery.i18n('ztopbar', key, stringArray);   //No I18N
    }
    function getString(key, stringArray, defaultKeys) {
		return key;
    }
}());