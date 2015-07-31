// ==UserScript==
// @name         adfreeVideoplayers
// @namespace    https://raw.githubusercontent.com/Random-accC/adfreeVideoplayers/
// @downloadURL  https://raw.githubusercontent.com/Random-accC/adfreeVideoplayers/master/adfreeVideoplayers.js
// @updateURL    https://raw.githubusercontent.com/Random-accC/adfreeVideoplayers/master/adfreeVideoplayers.js
// @version      0.3
// @description  Removes flash (object) video players from a bunch of known websites and replaces them with an ad-free HTML5 player.
// @author       Random-accC
// @match        http://*.focus.de/*
// @match        http://focus.de/*
// @match        https://focus.de/*
// @match        https://*.focus.de/*
// @match        http://*.winfuture.de/*
// @match        http://winfuture.de/*
// @match        https://winfuture.de/*
// @match        https://*.winfuture.de/*
// @grant        none
// ==/UserScript==

!function(e){function t(){e&&console.log("Removing object-Nodes via CSS.");var t=document.createElement("style");t.innerHTML="object{display: none!important;}",t.setAttribute("type","text/css"),document.head.appendChild(t)}function o(t,o,n){e&&console.log("Adding HTML Player");var i=document.createElement("video");i.setAttribute("src",o),i.setAttribute("controls","controls"),n&&i.setAttribute("autoplay","autoplay"),i.setAttribute("preload","auto"),i.setAttribute("width","750px"),i.setAttribute("height","450px"),i.setAttribute("style","display: block!important;"),t.innerHTML='Playing: <a href="'+o+'" target="_self">'+o+"</a>",t.setAttribute("style","display: block!important;"),t.appendChild(i)}var n=!1,o=o,t=t,i=window.location.hostname;e&&console.log("Running on: "+i);var l=null,a=null,d=null,r=document.body.innerHTML;switch(i){case"www.winfuture.de":case"winfuture.de":l=/video_id=([0-9]){0,}/i,a="http://videos.winfuture.de/"+l.exec(r)[0].replace("video_id=","")+".mp4",d=document.getElementsByClassName("video_content")[0];break;case"www.focus.de":case"focus.de":l=/videourl = (.){0,}\.mp4/i,a=l.exec(r)[0].replace('videourl = "',""),d=document.getElementById("videoPlayer");break;default:return void(e&&console.log("No pattern known for this page."))}console.log("Known pattern: "+l),t(),a.length>0?(o(d,a,n),e&&console.log("Video found: "+a)):e&&console.log("No video found.")}(!1);
