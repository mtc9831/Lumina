function AboutStart() {
    // Initialize overlay and scroller //
    $("input[rel]").overlay({ top: 100, fixed: true, closeOnEsc: true });
    $(".scrollable").scrollable({ circular: true, keyboard: true });
    // Delay effect on People Pics //
    $('#blakehex').fadeIn(300, function () { $('#arielhex').fadeIn(300, function () { $('#timothyhex').fadeIn(300, function () { $('#swifthex').fadeIn(300, function () { $('#kristahex').fadeIn(300, function () { $('#anniehex').fadeIn(300, function () { $('#adihex').fadeIn(300, function () { $('#nickhex').fadeIn(300, function () { $('#copywritershex').fadeIn(300, function () { $('#samhex').fadeIn(300) }); }); }); }); }); }); }); }); });

    $('#hail').hide();
    $('#door').hide();
    $('#spiral').hide();
    $('#board').hide();
    $('#games').hide();
    $('#shelf').hide();
    $('#words').hide();

    $('#hex-row_2').waypoint(function () {
        animateNumbers();
    });
    $('#bythenumbers').waypoint(function () {
        $('#hail').fadeIn(400, function () { $('#door').fadeIn(400, function () { $('#spiral').fadeIn(400, function () { $('#games').fadeIn(400, function () { $('#shelf').fadeIn(400, function () { $('#board').fadeIn(400, function () { $('#words').fadeIn(400); }); }); }); }); }); });
    });
    $('#hex-row_2').waypoint(function () {
        $('.bupt').fadeIn(500);
    });
}

function animateNumbers() {
    if ($('#tweets').text() == "0") {
        $({ value: 0 }).animate({ value: 27144 }, {
            duration: 2600,
            easing: 'swing',
            step: function () {
                $('#tweets').text(Math.ceil(this.value));
            }
        });
    }
    if ($('#age').text() == "0") {
        $({ value: 0 }).animate({ value: 24 }, {
            duration: 2500,
            easing: 'swing',
            step: function () {
                $('#age').text(Math.ceil(this.value));
            }
        });
    }
    if ($('#fifa').text() == "0") {
        $({ value: 0 }).animate({ value: 643 }, {
            duration: 2500,
            easing: 'swing',
            step: function () {
                $('#fifa').text(Math.ceil(this.value));
            }
        });
    }
    if ($('#products').text() == "0") {
        $({ value: 0 }).animate({ value: 19 }, {
            duration: 2500,
            easing: 'swing',
            step: function () {
                $('#products').text(Math.ceil(this.value));
            }
        });
    }
    if ($('#desks').text() == "0") {
        $({ value: 0 }).animate({ value: 9 }, {
            duration: 2500,
            easing: 'swing',
            step: function () {
                $('#desks').text(Math.ceil(this.value));
            }
        });
    }
}

function index(n) {
    $('html, body').stop(true, false).queue(function () { $('#trigger').click(); });  //.animate({ scrollTop: $('.pagetitle').position().top + 150 }, 350)
    setTimeout(function () { $('#mainscroll').scrollable().seekTo(n, 0); }, 10);
}


function ContactStart() {
    // Initializes Google Map //
    initialize();

    // Make Divs draggable //
    $('.contactform').draggable();
    $('.success').draggable();
    $('.phonepop').draggable();
    $('.fbpopup').draggable();
    $('.twitterpopup').draggable();

    $('#emailicon').click(function () {
        $('#sendbutton').focus();
        if (!$('.wrapper').is(":visible")) {
            $('.wrapper').show();
        }
        if (!$('.success').is(":visible") && !$('.phonepop').is(":visible")) {
            $('#form').show('clip', 500);
        }
    });
    $('.form-close').click(function () {
        $('#sendbutton').focus();
        $('#form').hide('clip', 400);
        setTimeout(function () {
            // If form is closed then reset all fields //
            $('#name').val('name');
            $('#email').val('email');
            $('#company').val('company');
            $('#location').val('location');
            $('#comments').val('comments');
            document.getElementById('name').style["color"] = "#A3A3A3";
            document.getElementById('email').style["color"] = "#A3A3A3";
            document.getElementById('company').style["color"] = "#A3A3A3";
            document.getElementById('location').style["color"] = "#A3A3A3";
            document.getElementById('comments').style["color"] = "#A3A3A3";
            $('.wrapper').hide();
        }, 400);
    });
    $('#success-close').click(function () {
        $('.success').fadeOut(300);
        $('.wrapper').fadeOut(800);
    });
    $('#phoneicon').click(function () {
        if (!$('.wrapper').is(":visible")) {
            $('.wrapper').show();
        }
        if (!$('#form').is(":visible") && !$('.success').is(":visible")) {
            $('.phonepop').fadeIn(400);
        }
    });
    $('#phone-close').click(function () {
        $('.phonepop').fadeOut(400);
        $('.wrapper').fadeOut(800);
    });
    $('#fbicon').click(function () {
        if (!$('.wrapper').is(":visible")) {
            $('.wrapper').show();
        }
        if (!$('#form').is(":visible") && !$('.success').is(":visible")) {
            $('.fbpopup').fadeIn(400);
        }
    });
    $('#fb-close').click(function () {
        $('.fbpopup').fadeOut(400);
        $('.wrapper').fadeOut(800);
    });
    $('#twittericon').click(function () {
        if (!$('.wrapper').is(":visible")) {
            $('.wrapper').show();
        }
        if (!$('#form').is(":visible") && !$('.success').is(":visible")) {
            $('.twitterpopup').fadeIn(400);
        }
    });
    $('#twitter-close').click(function () {
        $('.twitterpopup').fadeOut(400);
        $('.wrapper').fadeOut(800);
    });

    $('#sendbutton').click(function () {
        if ($('#name').val().toString() != 'name' && $('#email').val().toString() != 'email' && $('#company').val().toString() != 'company' && $('#location').val().toString() != 'location' && $('#comments').val().toString() != 'comments') {
            $.post("/ContactJson", { name: $('#name').val().toString(), email: $('#email').val().toString(), company: $('#company').val().toString(), location: $('#location').val().toString(), comments: $('#comments').val().toString() }, function (data, textstatus) {
                if (data == "success") {
                    $('#name').val('name');
                    $('#email').val('email');
                    $('#company').val('company');
                    $('#location').val('location');
                    $('#comments').val('comments');
                    $('#form').hide('clip', 400);
                    setTimeout(function () { $('.success').fadeIn(500); }, 500);
                }
                else {
                    alert("message failed to send  =' (");
                }
            });
        }
        else {
            // Change fields that are not filled out //
            $('#sendbutton').focus();
            $('#form').effect('shake');
            if ($('#name').val().toString() == 'name' || $('#name').val().toString() == '') {
                document.getElementById('name').style["color"] = "red";
                document.getElementById('name').style["font-style"] = "italic";
            }
            if ($('#email').val().toString() == 'email' || $('#email').val().toString() == '') {
                document.getElementById('email').style["color"] = "red";
                document.getElementById('email').style["font-style"] = "italic";
            }
            if ($('#company').val().toString() == 'company' || $('#company').val().toString() == '') {
                document.getElementById('company').style["color"] = "red";
                document.getElementById('company').style["font-style"] = "italic";
            }
            if ($('#location').val().toString() == 'location' || $('#location').val().toString() == '') {
                document.getElementById('location').style["color"] = "red";
                document.getElementById('location').style["font-style"] = "italic";
            }
            if ($('#comments').val().toString() == 'comments' || $('#comments').val().toString() == '') {
                document.getElementById('comments').style["color"] = "red";
                document.getElementById('comments').style["font-style"] = "italic";
            }
        }
    });

    // Facebook widget //
    (function (d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) return;
        js = d.createElement(s); js.id = id;
        js.src = "../connect.facebook.net/en_US/all.js#xfbml=1";
        fjs.parentNode.insertBefore(js, fjs);
    }
    (document, 'script', 'facebook-jssdk'));
    // End Facebook widget //

    // Twitter widget //
    !function (d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (!d.getElementById(id)) {
            js = d.createElement(s); js.id = id; js.src = "../platform.twitter.com/widgets.js";
            fjs.parentNode.insertBefore(js, fjs);
        }
    }
    (document, "script", "twitter-wjs");
    // End Twitter widget //
}

// Clear text onfocus or return to default onblur //
function text(object) {
    if (object.id == $('#' + object.id).val().toString()) {
        $('#' + object.id).val('');
        document.getElementById(object.id).style["color"] = "black";
        document.getElementById(object.id).style["font-style"] = "normal";
    }
    else if (object.value == "") {
        $('#' + object.id).val(object.id);
        document.getElementById(object.id).style["color"] = "#A3A3A3";
        document.getElementById(object.id).style["font-style"] = "normal";
    }
}

    function initialize() {
        var grayStyles = [
          {
              featureType: "all",
              stylers: [
                { saturation: '-100', gamma: '0.68' }
              ]
          }
        ];
        var hurrdatImage = 'Content/Contact/H.png';
        var genericImage = 'Content/Contact/favoritesicon.png';
        var locations = [
            ["<div style='height: 150px; text-align: left;'><p><b>Hurrdat</b> (That's us)</p>201 North 8th Street<br /> Lincoln, NE 68508</p><p><a href='http://www.hurrdat.com/' target='_blank'>Visit Us!</a></p></div>", 40.81493, -96.7101, 8, hurrdatImage, google.maps.Animation.DROP],
            ["<div style='height: 150px; text-align: left;'><p><b>Barry's</b><br /></p>235 N 9th St<br /> Lincoln, NE 68588</p><p><a href='http://www.barrysbarandgrill.com/' target='_blank'>More info</a></p></div>", 40.81563, -96.7089, 7, genericImage, google.maps.Animation.DROP],
            ["<div style='height: 150px; text-align: left;'><p><b>Memorial Staduim</b> (Go Big Red!)<br /></p>One Stadium Dr.<br /> Lincoln, NE 68588</p><p><a href='http://www.huskers.com/ViewArticle.dbml?DB_OEM_ID=100&ATCLID=734/' target='_blank'>More info</a></p></div>", 40.820457, -96.705485, 6, genericImage, google.maps.Animation.DROP],
            ["<div style='height: 150px; text-align: left;'><p><b>Haymarket Park</b><br /></p>403 Line Dr Cir<br /> Lincoln, NE 68588</p></div>", 40.82251, -96.715123, 5, genericImage, google.maps.Animation.DROP],
            ["<div style='height: 150px; text-align: left;'><p><b>Nebraska State Capitol</b><br /></p>1445 K Street<br /> Lincoln, NE 68508</p><p><a href='http://www.capitol.org/' target='_blank'>More info</a></p></div>", 40.80806, -96.699729, 4, genericImage, google.maps.Animation.DROP],
            ["<div style='height: 150px; text-align: left;'><p><b>Duffy's</b> (You'll find Annie and Ariel performing stand-up comedy here on Monday nights)<br /></p>1412 East O Street<br /> Lincoln, NE 68508</p><p><a href='http://www.duffyslincoln.com/' target='_blank'>More info</a></p></div>", 40.81377, -96.700744, 3, genericImage, google.maps.Animation.DROP],
            ["<div style='height: 150px; text-align: left;'><p><b>Jack's Bar and Grill</b> (Hurrdat's favorite happy hour destination)<br /></p>100 North 8th Street<br /> Lincoln, NE 68510</p><p><a href='http://www.jacks-haymarket.com/' target='_blank'>More info</a></p></div>", 40.813923, -96.709471, 2, genericImage, google.maps.Animation.DROP],
            ["<div style='height: 150px; text-align: left;'><p><b>Ivanna Cone</b> (Our Friday afternoon ice cream spot)<br /></p> 701 P St # 101 <br /> Lincoln, NE 68508</p><p><a href='http://www.ivannacone.com/' target='_blank'>More Info</a></p></div>", 40.81475, -96.710994, 1, genericImage, google.maps.Animation.DROP]
        ];
        var position = new google.maps.LatLng(40.81593, -96.7101);
        var myOptions = {
            zoom: 15,
            center: position,
            styles: grayStyles,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        var map = new google.maps.Map(
            document.getElementById("map_canvas"),
            myOptions);

        var marker, i;

        for (i = 0; i < locations.length; i++) {
            //setTimeout(function () {
            marker = new google.maps.Marker({
                position: new google.maps.LatLng(locations[i][1], locations[i][2]),
                map: map,
                icon: locations[i][4],
                zIndex: locations[i][3],
                animation: locations[i][5]
            });
            //}, i * 2000);
            google.maps.event.addListener(marker, 'click', (function (marker, i) {
                return function () {
                    infowindow.setContent(locations[i][0]);
                    infowindow.open(map, marker);
                }
            })(marker, i));
        }
        var contentString = 'Hello <strong>World</strong>!';
        var infowindow = new google.maps.InfoWindow({
            content: contentString
        });
    }

    function ProjectPlannerStart() {
        $('#name').focus(function () {
            if ($('#name').val().toLowerCase() == "name") {
                $('#name').val("");
            }
        });
        $('#name').blur(function () {
            if ($('#name').val() == "") {
                $('#name').val("NAME");
            }
        });
        $("#name").keydown(function (event) {
            var key = event.keyCode || event.which;
            if (!(key == 8 || key == 9 || key == 27 || key == 46 || key == 37 || key == 39 || key == 32)) {
                key = String.fromCharCode(key);
                var regex = /[a-zA-Z]|\./;
                if (!regex.test(key)) {
                    event.returnValue = false;
                    if (event.preventDefault) event.preventDefault();
                }
            }
        });
        $('#email').focus(function () {
            if ($('#email').val().toLowerCase() == "email") {
                $('#email').val("");
            }
        });
        $('#email').blur(function () {
            if ($('#email').val() == "") {
                $('#email').val("EMAIL");
            }
            if ($('#email').val() != "EMAIL") {
                var regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
                if (!regex.test($("#email").val()) && $("#email").val() != '') {
                    alert("Please enter a valid email address.");
                    $("#email").focus();
                }
            }
        });
        $('#phone').focus(function () {
            if ($('#phone').val().toLowerCase() == "phone") {
                $('#phone').val("");
            }
        });
        $('#phone').blur(function () {
            if ($('#phone').val() == "") {
                $('#phone').val("PHONE");
            }
        });
        $("#phone").keydown(function (event) {
            var key = event.keyCode || event.which;
            if (!(key == 8 || key == 9 || key == 27 || key == 46 || key == 37 || key == 39)) {
                key = String.fromCharCode(key);
                var regex = /[0-9]|\./;
                if (!regex.test(key)) {
                    event.returnValue = false;
                    if (event.preventDefault) event.preventDefault();
                }
            }
            if (event.shiftKey) {
                if (key != 9) {
                    if (event.preventDefault) event.preventDefault();
                }
            }
        });

        $('#strat-planning').mouseover(function () {
            alert("hi");
        });
    }