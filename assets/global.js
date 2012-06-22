function initTracks() {
    $('#lastfm .track').click(function(){
        $('#lastfm .track').removeClass('current');
        $(this).addClass('current');
        var a = $(this).attr('data-artist');
        var t = $(this).attr('data-title');
        Youtube.getTracks(a,t);
    });
    $('.descr').fadeOut();
    $('.search').animate({top:'15%'},function(){
        $('#lastfm').css('height',$(window).height()+'px').fadeIn();
        $('#lastfm .track').eq(0).click();
    });

}

function initSimilar() {
    $('#similar').css('height',$(window).height()+'px').fadeIn();
    $('#similar .artist').hover(function(){
        $(this).find('div').animate({right:0});
    }, function(){
        $(this).find('div').animate({right:-150});
    });
    $('#similar .artist').click(function(){
       $('.search input').val($(this).attr('data-artist'));
       $('button.only').click(); 
    });
}

