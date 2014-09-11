$(function () {
    var iframeEmbed = $('#iframeEmbed');
    var channelPull = $('#channelPull');
    var pageTitle = $('#pageTitle');
    var vidTitle = $('#vidTitle');
    var vidDesc = $('#vidDesc');
    var key = 'AIzaSyDPap0KQhzUiqFtvPD4u1uArwgL5kKT5rs';
    var channelId = 'UC_x5XG1OV2P6uZZ5FSM9Ttw';
    var apiCall = 'https://www.googleapis.com/youtube/v3/search?key=' + key + '&channelId=' + channelId + '&part=id,snippet&order=date&maxResults=1';
    var playerSettings = '?showinfo=0&controls=0&rel=0';
    var playerSrc = '//www.youtube.com/embed/';

    $.ajax({
        url: apiCall,
        dataType: 'json',
        type: 'get'
    })
        .done(function (data) {
            var pageTitleTxt = pageTitle.text();
            var ChannelTitle = data.items[0].snippet.channelTitle;
            var videoTitle = data.items[0].snippet.title;
            var latestVid = data.items[0].id.videoId;
            var videoDescription = data.items[0].snippet.description;
            if (latestVid) {
                iframeEmbed.attr('src', playerSrc + latestVid + playerSettings);
                pageTitle.empty();
                pageTitle.text(pageTitleTxt + ChannelTitle);
                vidTitle.text(videoTitle);
                vidDesc.text(videoDescription);
            } else {
                channelPull.remove();
            };
        })
        .fail(function () {
            channelPull.remove();
        });
});