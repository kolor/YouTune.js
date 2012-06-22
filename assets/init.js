$(function(){
    $('button.only').click(function(){
        LastFm.getTracks(null, $('input').val());
        
    });
    $('button.similar').click(function(){
        LastFm.getSimilar($('input').val());
        
    });
    
    $('.search input').keydown(function(event){
        if (event.keyCode == '13') {
            LastFm.getTracks(null, $('input').val());
        }
    });
    $(window).resize(function() {
        $('#lastfm').css('height',$(window).height()+'px');
        $('#similar').css('height',$(window).height()+'px');
    });
});
