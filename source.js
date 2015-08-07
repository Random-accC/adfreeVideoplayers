var configuration = {
    autoplay: false,
    customStyling: true,
    controls: false,
    customControls: true
};

// do not change anything below!

(function(configuration, DEBUG){
    // configuration (reasonable auto configuration)
    // how ever, it's up to you setting true/ false
    var autoplay = configuration.autoplay || false,       
        customStyling = configuration.customStyling && configuration.customControls || false,
        controls = configuration.controls || true,
        customControls = configuration.customControls && configuration.customStyling || false;
    
    // personal identifier
    var bva = 'accCBlockVideoAds';
    
    // compute the website we're working on
    var URL = window.location.hostname;
    if(DEBUG){console.log('Running on: '+URL);}
    var pattern = null, res = null, destination = null;
    var doc = document.body.innerHTML;
    
    // dependend on the site, we're on:
    // patter, video-url, injection points, custom styles, custom removings
    switch(URL){
        case 'www.winfuture.de':
        case 'winfuture.de':
            // patter, video url and injection point
            pattern = /video_id=([0-9]){0,}/i;
            res = "http://videos.winfuture.de/" + (pattern.exec(doc)[0]).replace('video_id=', '') + ".mp4"; // id only
            destination = document.getElementsByClassName('video_content')[0];
            
            // custom site modifications
            (function(){
                // removings
                if(DEBUG){console.log('Trying to remove trashy elements.');}
                var pid = 'player'+pattern.exec(doc)[0].replace('video_id=', '');
                if(DEBUG){console.log('Trying to remove Element[id='+pid+']');}
                var rm = document.getElementById(pid); // huge banner
                if(rm && rm.parentNode){rm.parentNode.removeChild(rm);}
                // styles
                if(DEBUG){console.log('Trying to apply custom style.');}
                var style = document.createElement('style');
                style.setAttribute('type', 'text/css');
                style.innerHTML = '.centForm{display:none!important;} .btn-sm{height:30px!important;}';
                document.head.appendChild(style);
            })();
            
            break;
        case 'www.focus.de':
        case 'focus.de':
            // patter, video url and injection point
            pattern = /videourl = (.){0,}\.mp4/i;
            res = (pattern.exec(doc)[0]).replace('videourl = "', '');
            destination = document.getElementById('videoPlayer');
            
            // custom site modifications
            (function(){
                // removings
                if(DEBUG){console.log('Trying to remove trashy elements.');}
                // styles
                if(DEBUG){console.log('Trying to apply custom style.');}
                var style = document.createElement('style');
                style.setAttribute('type', 'text/css');
                style.innerHTML = '#playerflashfwid1, #fwid1{display:none!important;} #videoPlayer{height:600px!important; display:block!important;}';
                document.head.appendChild(style);
            })();
            
            break;
        default:
            if(DEBUG){console.log('No pattern known for this page.');}
            return;
    }
    if(DEBUG){console.log('Using this pattern: ' + pattern);}
    if(DEBUG){console.log('Video found: '+res);}
    
    // check if every required element has been found
    if(!res || !(res.length > 0) || !destination){
        if(DEBUG){console.log('No video found.');} return;
    }
    
    // inject sources, remove default player, inject custom player, inject custom controls
    if(customStyling){injectExternalSource();}
    removeObjectPlayer();
    htmlPlayer(destination, res, autoplay, controls);
    if(customControls){injectControls(destination, customStyling);}
    // end of activities

    
    // functions defined below this point
    // do not change anything below
    
    function humanTime(sec){
        // makes time readable for humans
        // sec -> hh:ii:ss
        var h = Math.floor( sec / 3600 );
        h = h<10? '0' + h.toString() : h;
        var m = Math.floor( (sec%3600) / 60 );
        m = m<10? '0' + m.toString() : m;
        var s = Math.floor( sec%60 );
        s = s<10? '0' + s.toString() : s;
        return h + ' : ' + m + ' : ' + s;
    }
    
    function removeObjectPlayer(){
        // removes the object player
        if(DEBUG){console.log('Removing object-Nodes via CSS.');}
        var style = document.createElement('style');
        style.innerHTML = "object{display: none!important;}";
        style.setAttribute('type', 'text/css');
        document.head.appendChild(style);
    }
    
    function htmlPlayer(destination, videoURL, autoplay, controls){
        // creates and injects the html5 player
        if(DEBUG){console.log('Adding HTML Player');}
        // style definition, configuration
        var v = document.createElement('video');
        v.setAttribute('id', bva);
        v.setAttribute('src', videoURL);
        if(controls){v.setAttribute('controls', 'controls')};
        if(autoplay){v.setAttribute('autoplay', 'autoplay');}
        v.setAttribute('preload', 'auto');
        v.setAttribute('width', '720px');
        v.setAttribute('min-width', '100%');
        v.setAttribute('height', '420px');
        v.setAttribute('min-height', '100%');
        v.setAttribute('style', 'position: relative; margin-left: auto; margin-right: auto; display: block!important;z-index: 100;');
        // injection
        destination.setAttribute('style', 'display: block!important;');
        destination.insertBefore(v, destination.firstChild);
        destination.innerHTML = '<span>Playing: <a href="'+videoURL+'" target="_self">'+videoURL+'</a></span><br>' + destination.innerHTML;
		document.getElementById(bva).volume = 0.5;
    }
	
	function injectExternalSource(){
        // Style and Scripts (look and feel only!)
        if(DEBUG){console.log('Injection vom bootstrapcdn.com and googleapis.com');}
		var externalSources = [
            {href: 'https://ajax.googleapis.com/ajax/libs/jquery/1.11.4/jquery.min.js', type: 'text/javascript'},
            {href: 'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min.js', type: 'text/javascript'},
			{href: 'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css', type: 'text/css', rel: 'stylesheet'},
            {href: 'https://code.jquery.com/ui/1.11.4/themes/smoothness/jquery-ui.css', type: 'text/css', rel: 'stylesheet'},
            {href: 'https://code.jquery.com/ui/1.11.4/jquery-ui.js', type: 'text/javascript'}
        ];
		for(var i=0; i<externalSources.length; i++){
			var l = document.createElement('link');
			l.setAttribute('href', externalSources[i].href);
			l.setAttribute('type', externalSources[i].type);
            if(externalSources[i].rel){l.setAttribute('rel', externalSources[i].rel)};
			document.head.appendChild(l);
		}
	}
	
	function createButton(captionClass, captionText, action){
        // simple button creation
        if(DEBUG){console.log('Creating a button: [.'+captionClass+'] '+captionText);}
		var caption = document.createElement('span');
		caption.setAttribute('class', 'glyphicon '+captionClass);
		caption.setAttribute('aria-hidden', 'true');
		var txt = document.createElement('span');
		txt.innerHTML = captionText;
		var button = document.createElement('button');
        button.setAttribute('class', 'btn btn-sm btn-primary');
		button.appendChild(caption);
		button.appendChild(txt);
        button.onclick = action;
        button.onmouseover = function(){
            this.setAttribute('class', 'btn btn-sm btn-success');
        };
        button.onmouseout = function(){
            this.setAttribute('class', 'btn btn-sm btn-primary');
        };
		return button;
	}
    
    function injectControls(destination, customStyling){
        // injects a custom control panel
        if(DEBUG){console.log('Adding controls.');}
        
        // Control Group
		var fchild = destination.firstChild.nextSibling.nextSibling;
        var btnGroup = document.createElement('div');
        btnGroup.setAttribute('class', 'btn-toolbar');
        btnGroup.setAttribute('role', 'toolbar');
        btnGroup.setAttribute('id', 'accBlockVideoAdsControls');
        btnGroup.setAttribute('style', 'display: block; width: 720px; position: relative; margin-left: auto; margin-right: auto; z-index: 1000; padding: 10px 10px 10px 10px;');
        destination.insertBefore(btnGroup, document.getElementById(bva).nextSibling);
        
        // Group for video position
        var positioningGroup = document.createElement('div');
        positioningGroup.setAttribute('class', 'btn-group');
        positioningGroup.setAttribute('role', 'group');
        
        // Group for video volume
        var volumeGroup = document.createElement('div');
        volumeGroup.setAttribute('class', 'btn-group');
        volumeGroup.setAttribute('role', 'group');
        
        // Group for video size
        var sizeGroup = document.createElement('div');
        sizeGroup.setAttribute('class', 'btn-group');
        sizeGroup.setAttribute('role', 'group');
        
        btnGroup.appendChild(positioningGroup);
        btnGroup.appendChild(volumeGroup);
        btnGroup.appendChild(sizeGroup);

        // video positioning
        appendPositioningElements(positioningGroup);
        // video volume
        appendVolumeElements(volumeGroup);
        // video size
        appendSizingElements(sizeGroup);
    }
    
    function appendSizingElements(sizeGroup){
        // Size down
        sizeGroup.appendChild(createButton('glyphicon-resize-small', customStyling ? '' : '- Size',
		function(){
			var widthOld  = document.getElementById(bva).width;
			var heightOld = document.getElementById(bva).height;
            document.getElementById(bva).width  = Math.round((widthOld/1.1)*100)/100;
            document.getElementById(bva).height = Math.round((heightOld/1.1)*100)/100;
            if(DEBUG){console.log('Toggling Size: '+document.getElementById(bva).width+'x'+document.getElementById(bva).height+'px');}
        }));		
		
		// Size up
        sizeGroup.appendChild(createButton('glyphicon-resize-full', customStyling ? '' : '+ Size',
		function(){
			var widthOld  = document.getElementById(bva).width;
			var heightOld = document.getElementById(bva).height;
            document.getElementById(bva).width  = Math.round((widthOld*1.1)*100)/100;
            document.getElementById(bva).height = Math.round((heightOld*1.1)*100)/100;
            if(DEBUG){console.log('Toggling Size: '+document.getElementById(bva).width+'x'+document.getElementById(bva).height+'px');}
        }));
    }
    
    function appendVolumeElements(volumeGroup){
        // Mute
        volumeGroup.appendChild(createButton('glyphicon-volume-off', customStyling ? '' : 'Mute',
		function(){
			var vol = document.getElementById(bva).volume;
            document.getElementById(bva).volume = vol==0 ? document.getElementById('slider').innerHTML : 0;
            if(DEBUG){console.log('Toggling Loudness: '+document.getElementById(bva).volume);}
        }));
		
		// Volume down
        volumeGroup.appendChild(createButton('glyphicon-volume-down', customStyling ? '' : '- Vol',
		function(){
            var vol = document.getElementById(bva).volume;
            document.getElementById(bva).volume = (vol-0.1 <= 0) ? 0 : Math.round((vol-0.1)*100)/100;
            document.getElementById('slider').innerHTML = document.getElementById(bva).volume==0 ? '0.0' : document.getElementById(bva).volume;
            if(DEBUG){console.log('Toggling Loudness: '+document.getElementById(bva).volume);}
        }));
        
        // Volume Control
        (function(destination){
            var d = document.createElement('button');
            d.setAttribute('class', 'btn btn-sm btn-primary disabled');
            d.setAttribute('disabled', 'disabled');
            var caption = document.createElement('span');
            caption.setAttribute('class', 'glyphicon glyphicon-signal');
            d.appendChild(caption);
            
            var slider = document.createElement('span');
            slider.setAttribute('id', 'slider');
            slider.setAttribute('style', 'padding-left: 6px;');
            slider.innerHTML = '0.5';
            d.appendChild(slider);
            destination.appendChild(d);
        })(volumeGroup);
		
		// Volume up
        volumeGroup.appendChild(createButton('glyphicon-volume-up', customStyling ? '' : '+ Vol',
		function(){
            var vol = document.getElementById(bva).volume;
            document.getElementById(bva).volume = (vol+0.1 >= 1) ? 1 : Math.round((vol+0.1)*100)/100;
            document.getElementById('slider').innerHTML = document.getElementById(bva).volume==1 ? '1.0' : document.getElementById(bva).volume;
            if(DEBUG){console.log('Toggling Loudness: '+document.getElementById(bva).volume);}
        }));
    }
    
    function appendPositioningElements(positioningGroup){
        // Fast Backward
        positioningGroup.appendChild(createButton('glyphicon-fast-backward', customStyling ? '' : 'f Back',
		function tooglePlayPause(){
            var pos = document.getElementById(bva).currentTime;
            document.getElementById(bva).currentTime = (pos-60 >= 0) ? pos-60 : 0;
			if(DEBUG){console.log('Jumping to: '+document.getElementById(bva).currentTime);}
        }));
        
        // Backward
        positioningGroup.appendChild(createButton('glyphicon-backward', customStyling ? '' : 'Back',
		function tooglePlayPause(){
            var pos = document.getElementById(bva).currentTime;
            document.getElementById(bva).currentTime = (pos-1 >= 0) ? pos-1 : 0;
			if(DEBUG){console.log('Jumping to: '+document.getElementById(bva).currentTime);}
        }));
        
		// Play / Pause
        positioningGroup.appendChild(createButton('glyphicon-play', customStyling ? '' : 'Play',
		function tooglePlayPause(){
			if(DEBUG){console.log('Toggling Status: '+document.getElementById(bva).paused);}
            var paused = document.getElementById(bva).paused;
			var c = paused ? 'glyphicon glyphicon-pause' : 'glyphicon glyphicon-play';
			this.firstChild.setAttribute('class', c);
            if(!customStyling){this.firstChild.nextSibling.innerHTML = paused ? 'Pause' : 'Play';}
			return paused ? document.getElementById(bva).play() : document.getElementById(bva).pause();
        }));

        // Playback information
        (function(destination){
            var d = document.createElement('button');
            d.setAttribute('class', 'btn btn-sm btn-primary disbaled');
            d.setAttribute('disabled', 'disabled');
            d.setAttribute('id', 'accBlockVideoAdsProgressbar');
            positioningGroup.appendChild(d);
        })(positioningGroup);
        
        // Forward
        positioningGroup.appendChild(createButton('glyphicon-forward', customStyling ? '' : 'For',
		function tooglePlayPause(){
            var pos = document.getElementById(bva).currentTime;
            var duration = document.getElementById(bva).duration;
            document.getElementById(bva).currentTime = (pos+1 <= duration) ? pos+1 : duration;
			if(DEBUG){console.log('Jumping to: '+document.getElementById(bva).currentTime);}
        }));
        
        // Fast Forward
        positioningGroup.appendChild(createButton('glyphicon-fast-forward', customStyling ? '' : 'f For',
		function tooglePlayPause(){
            var pos = document.getElementById(bva).currentTime;
            var duration = document.getElementById(bva).duration;
            document.getElementById(bva).currentTime = (pos+60 <= duration) ? pos+60 : duration;
			if(DEBUG){console.log('Jumping to: '+document.getElementById(bva).currentTime);}
            
        }));
        
        // Keep refreshing playback information
        (function accBlockVideoAdsRefreshProgressbar(){
			var currentTime = document.getElementById(bva).currentTime;
			var duration = document.getElementById(bva).duration;
			if(DEBUG){console.log('Refreshing progress: '+currentTime+' / '+duration);}
            
			document.getElementById('accBlockVideoAdsProgressbar').innerHTML  = humanTime(Math.round(currentTime*100)/100) + ' / ' + humanTime(duration);
            //document.getElementById('accBlockVideoAdsProgressbar').innerHTML += ' ~ '+ Math.round((currentTime/duration)*100) + '%';
			setTimeout(accBlockVideoAdsRefreshProgressbar, 500);
		})();
    }
})(configuration, false);
