# adfreeVideoplayers
Removes flash (object) video players from a bunch of known websites and replaces them with an ad-free HTML5 player.

## Contents
* How to use
* Where it works
* How it works
* Information
* Contribution(s)

## How to use
Inject the script by installing as userscript or by using any browser addon such as Tampermonkey.
For beginners it's recommended using any addon that deals with userscripts.

### Example addons
* [Violent-Monkey for Opera](https://addons.opera.com/de/extensions/details/violent-monkey/)
* [Greasemonkey for Firefox](https://addons.mozilla.org/en-US/firefox/addon/greasemonkey/)
* [Tampermonkey for Google Chrome](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo)

## Where it works
Currently this script supports focus.de and winfuture.de.
Please report other sites you're interested in.

## How it works
It's a small javascript snippet that
* manipulates the DOM, to hide flash players,
* extracts the actual video url out of the document and
* injects a HTML5 player

## Information

### Compression
The source.js shows the raw code as I wrote it but I used [jscompress.com](http://jscompress.com/) for compressing it.
If there are any differences or if any problems occur, better use the uncompressed version.

### Risks & damages
I'm using this script on my own pc, so I'm quite sure that it wont destroy yours.
Anyway, You're using this script on your own risk. Don't blame me for data loss, earth quakes, dead kitten, exploding computers or whatever. I will not be liable for special, incidental, consequential, indirect or similar damages.

## Problems
Blame me!

## Contribution(s)
Nope.
