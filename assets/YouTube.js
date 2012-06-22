var Youtube = {
    artist: null,
    title: null,
    
    api: 'https://gdata.youtube.com/feeds/api/videos',
    found: [],
    
    getTracks: function(a,t) {
        var q = a +' '+ t;
        $.getJSON(this.api+'?alt=json-in-script&orderby=relevance&q='+ q.enc() +'&callback=?', Youtube.onGetTracks);
    },
    
    onGetTracks: function(j) {
        console.log(j);
        var id = j.feed.entry[0].id['$t'].replace('http://gdata.youtube.com/feeds/api/videos/','');
        //console.log(id);
        player.loadVideoById(id);
        $(player).css('visibility','visible').css('left','27%');
        //$('#youtube').html('<iframe width="640" height="360" src="http://www.youtube.com/embed/'+ id +'?rel=0&autoplay=1" frameborder="0" allowfullscreen></iframe>');
    }
    
}

var player = null;
var params = { allowScriptAccess: "always",  allowfullscreen: "true" };
var atts = { id: "youtube" };
swfobject.embedSWF("http://www.youtube.com/v/tJcm4uoCzW8?rel=0&enablejsapi=1&playerapiid=youtube&version=3","youtube", "640", "360", "8", null, null, params, atts);
//swfobject.embedSWF("http://www.youtube.com/apiplayer?enablejsapi=1&version=3","youtube", "640", "360", "8", null, null, params, atts);


function onYouTubePlayerReady(playerId) {
    console.log(playerId);
    player = document.getElementById("youtube");
    $(player).css('visibility','hidden');
    setTimeout(function(){
        player.addEventListener('onStateChange', 'onPlayerStateChange');
    }, 1000);
    
}


function onPlayerStateChange(newState) {
    console.log(newState);
    if (newState == 0) {
        $('#lastfm .current').next().click();  
    }
   
}
