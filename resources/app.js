$(document).ready(function() {

  var following = [];
  var logo;
  var status;
  var name;
  var displayName;

  const followerUrl = 'https://api.twitch.tv/kraken/users/freecodecamp/follows/channels/';

  $.ajax({
    type: "GET",
    url: 'https://api.twitch.tv/kraken/streams/freecodecamp',
    headers: {
      "Client-ID": "czkilqjsyp87bhwgre4vlave4jatbs"
    },
    success: function(data1) {
      if (data1.stream === null) {
        $("#fccStat").html("freecodecamp is currently OFFLINE!!");
      }
      else {
        $("#fccStat").html("freecodecamp is currently ONLINE!!");
      }
    }
  });

  $.ajax({
    type: "GET",
    url: 'https://api.twitch.tv/kraken/users/freecodecamp/follows/channels/',
    headers: {
      "Client-ID": "czkilqjsyp87bhwgre4vlave4jatbs"
    },
    success: function(data2) {

      for (var i = 0; i < data2.follows.length; i++) {
        displayName = data2.follows[i].channel.display_name;
        logo = data2.follows[i].channel.logo;
        status = data2.follows[i].channel.status;
        following.push();

        if (status === null) {
          status = "OFFLINE";
        }
        if (logo == null) {
          logo = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRInvyXzwGMo5bnbg__IeGPUH0_6IKExa18_aaQ9qTbC0_5fDrs";
        }
        $("#info").prepend( "<div class='cover'>" + "<div class='ldr'>" + "<div class='logo'>" + "<img src='" + logo + "'>" + "</div>" + "</div>" + "<div class='lsr'>" +"<div class='displayName'>" + displayName + "</div>" + "</div>" + "<div class='lr'>" + "<div class='status'>" + status + "</div>" + "</div>" + "</div>");
      }
    }
  });

  var deletedFollowers = ['brunofin', 'comster404'];
  for (var i = 0; i < deletedFollowers.length; i++) {
    $.ajax({
      type: "GET",
      url: 'https://api.twitch.tv/kraken/streams/' + deletedFollowers[i],
      headers: {
        "Client-ID": "czkilqjsyp87bhwgre4vlave4jatbs"
      },
      error: function(data3) {
        logo = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXrASNGXs4onBH4goHdTGOFaj-uDd4iYiLRmNtOA_OQV-ob9Ot";
        displayName = data3.statusText;
        status = data3.status;
        $("#info").prepend( "<div class='cover'>" + "<div class='ldr'>" + "<div class='logo'>" + "<img src='" + logo + "'>" + "</div>" + "</div>" + "<div class='lsr'>" +"<div class='displayName'>" + displayName + "</div>" + "</div>" + "<div class='lr'>" + "<div class='status'>" + status + "</div>" + "</div>" + "</div>");
        if (data3.stream === null) {
          status = "OFFLINE";
          displayName = data3.statusText;
          logo = data3.logo;
          if (logo === null) {
            logo = "http://web.vmc3.com/projects/bufs/branch/marines/logos/NoLogos.jpg";
          }
          $("#info").prepend( "<div class='cover'>" + "<div class='ldr'>" + "<div class='logo'>" + "<img src='" + logo + "'>" + "</div>" + "</div>" + "<div class='lsr'>" +"<div class='displayName'>" + displayName + "</div>" + "</div>" + "<div class='lr'>" + "<div class='status'>" + status + "</div>" + "</div>" + "</div>");
        }
      }
    });
  }

});
