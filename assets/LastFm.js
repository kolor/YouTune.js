var LastFm = {
    query: null,
    artist: null,
    title: null,
    api: 'http://ws.audioscrobbler.com/2.0/?api_key=7f0ae344d4754c175067118a5975ab15&format=json&',
    
    found: [],
    
    getArtists: function(q){
        $.getJSON(this.api+'method=artist.search&artist='+ q.enc() +'&callback=?', LastFm.onGetArtists);    
    },

    onGetArtists: function(e) {
        var i = 0;
        var result = '';
        $(e.results.artistmatches.artist).each(function(){
            if (++i > 12) return false;
            if (typeof this.image != 'undefined') {
                var img = this.image[4]['#text'];
            } else {
                var img = img2 = '';
            }
            var name = decodeURIComponent(this.name);
            var url = this.url;
            result += '<div class="artist" data-mbid="'+this.mbid+'" data-artist="'+name+'" data-img="'+img+'" style="background-image: url('+img+')"><div class="info">'+name+'</div></div>';
        });
            $('#artist-search').html(result);
            Artist_Search.init();
    },
    
    getTracks: function(mbid, artist) {  
        if (artist == "") return;
        if (mbid == null) {
            $.getJSON(this.api+'method=artist.gettoptracks&artist='+ artist.enc() +'&autocorrect=1&limit=50&callback=?', LastFm.onGetTracks);
        } else {
            $.getJSON(this.api+'method=artist.gettoptracks&mbid='+ mbid +'&limit=50&callback=?', LastFm.onGetTracks);    
        }
         
    },
    
    onGetTracks: function(e) {
        LastFm.found = [];
        var result = ''; //'<div class="head">'+ e.toptracks['@attr'].artist +' Tracks</div>';
        $(e.toptracks.track).each(function(){
            var title = LastFm.cleanTrackName(this.name);
            if (!in_array(title, LastFm.found)) {
                result += "<div class='track' data-artist='"+ this.artist.name +"' data-title='"+ title +"'>"+ cap(title) +"</div>";       
                LastFm.found.push(title);
            }           
            $('#lastfm').html(result);
        });
        initTracks();
    },
    
    
    getSimilar: function(artist) {
        $.getJSON(this.api+'method=artist.getsimilar&artist='+ artist.enc() +'&autocorrect=1&callback=?', LastFm.onGetSimilar);
    },
    
    onGetSimilar: function(e) {
        var result = '';
        $(e.similarartists.artist).each(function(){
            if (typeof this.image != 'undefined') {
                var img = this.image[3]['#text'];
            } else {
                var img = '';
            }
            result += '<div class="artist" data-mbid="'+ this.mbid +'" data-artist="'+ this.name +'" style="background-image: url('+ img +')"><div class="name">'+ this.name +'</div></div>';
        });
        $('#similar').append(result);
        initSimilar();   
    },
    
    cleanTrackName: function(str) {
        str = trimBrackets(str);
        str = str.replace(/[\w]+ (remix|mix|rmx|edit).*/gi,''); // remove (this), 1 word before and everything after
        str = str.replace(/( feat| ft\.| vocals by| vip).*/gi,''); // remove (this) and everything after
        str = str.replace(/(full version|remix|remi| mix|rmx| edit)/gi,''); //remove (this)
        str = str.replace(/(mp3|wav|flac|ogg)/gi,'');
        str = str.replace(/^(A1 |B1 |C1 |D1 |E1 |F1 |G1 |A2 |B2 |C2 |D2 |E2 |F2 )/gi,'');
        return cleanName(str);
    }
    

}
