# adfreeVideoplayers
Removes flash (object) video players from a bunch of known websites and replaces them with an ad-free HTML5 player.

## Contents
* [[How to use]]
* [[Where it works]]
* [[How it works]]
* [[Contribution(s)]]

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

## Contribution(s)
Nope.
