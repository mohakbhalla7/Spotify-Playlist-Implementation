# Spotify-Playlist-Implementation

### Project Description

This JS code is an implementation of a playlist on Spotify. It sign's in the specified account  
automatically and reads the name of the songs stored in an array in the file `playlist.js`.  
It then adds them in the play queue on its own. Now you an listen to songs of your choice  
without even needing to press a single key.

### Dependencies Required

Install puppeteer using the command - `npm install puppeteer`

### Usage Instructions

* Clone the repository in your local machine and install the dependencies  
in your present working directory.  
* Add the songs you want to play in `playlist.js`.
* Run the code using the command `node script.js`.

**Note:** Puppeteer uses Chromium browser by default, but I am using Chrome browser to run my   
code here since the media files that Spotify uses aren't supportd by Chromium browser. So, just make  
sure that you copy the correct `executablePath` of Chrome browser in the code in the file `script.js`  
before running the code.
