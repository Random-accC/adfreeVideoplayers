(function(DEBUG){
    // configuration
    var autoplay = false;
    
    // sub functions
    var createNode = createNode;
    var htmlPlayer = htmlPlayer;
    var removeObjectPlayer = removeObjectPlayer;
    
    // compute the website we're working on
    var URL = window.location.hostname;
    if(DEBUG){console.log('Running on: '+URL);}
    // the pattern we're looking for
    var pattern = null, res = null, destination = null;
    var doc = document.body.innerHTML;
    switch(URL){
        case 'www.winfuture.de':
        case 'winfuture.de':
            pattern = /video_id=([0-9]){0,}/i;
            res = "http://videos.winfuture.de/" + (pattern.exec(doc)[0]).replace('video_id=', '') + ".mp4"; // id only
            destination = document.getElementsByClassName('video_content')[0];
            break;
        case 'www.focus.de':
        case 'focus.de':
            pattern = /videourl = (.){0,}\.mp4/i;
            res = (pattern.exec(doc)[0]).replace('videourl = "', '');
            destination = document.getElementById('videoPlayer');
            break;
        default:
            if(DEBUG){console.log('No pattern known for this page.');}
            return;
    }
    console.log('Known pattern: ' + pattern);
    
    // activities
    
    removeObjectPlayer();
    if(res.length > 0){
        htmlPlayer(destination, res, autoplay);
        if(DEBUG){console.log('Video found: '+res);}
    }else{
        if(DEBUG){console.log('No video found.');}
    }
    
    // functions defined below
    
    function removeObjectPlayer(){
        if(DEBUG){console.log('Removing object-Nodes via CSS.');}
        var style = document.createElement('style');
        style.innerHTML = "object{display: none!important;}";
        style.setAttribute('type', 'text/css');
        document.head.appendChild(style);
    }
    
    function htmlPlayer(destination, videoURL, autoplay){
        if(DEBUG){console.log('Adding HTML Player');}
        // define video node
        var v = document.createElement('video');
        v.setAttribute('src', videoURL);
        v.setAttribute('controls', 'controls');
        if(autoplay){v.setAttribute('autoplay', 'autoplay');}
        v.setAttribute('preload', 'auto');
        v.setAttribute('width', '750px');
        v.setAttribute('height', '450px');
        v.setAttribute('style', 'display: block!important;');
        // append new child (player)
        destination.innerHTML = 'Playing: <a href="'+videoURL+'" target="_self">'+videoURL+'</a>';
        destination.setAttribute('style', 'display: block!important;');
        destination.appendChild(v);
    }
})(false);
