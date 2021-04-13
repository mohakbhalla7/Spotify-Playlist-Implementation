/**********************************************
 * brief    This JS code is an implementation of a playlist in the spotify.
 *          It reads the names of the songs stored in an array in the file
 *          'playlist.js' and then adds them in the play queue on its own.
 **********************************************/



const pup= require("puppeteer");

let id = "comori6049@whyfllj.com";
let pass = "comori6049";
let songs = require("./playlist");



/**********************************************
 * This function provides a delay in the execution of the program 
 **********************************************/

function waitTime(ms){
    return new Promise(function(resolve, reject) {
        setTimeout(function() {
            resolve(ms);
        }, ms);
    });
} /* End of function */



/**********************************************
 * This is the main funtion for the program
 **********************************************/

async function main(){
    /* To launch the chrome browser in maximized window */
    let browser = await pup.launch({
        executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
        headless: false,
        defaultViewport: false,
        args: ["--start-maximized"]
    });

    let pages = await browser.pages();
    let tab = pages[0];
    await tab.goto("https://accounts.spotify.com/en/login?continue=https:%2F%2Fopen.spotify.com%2F");
    
    /* To enter login details and log into the spotify account */
    await tab.type("#login-username", id);
    await tab.type("#login-password", pass);
    await tab.click("#login-button");
    await waitTime(4000);

    /* To close the 'Accept Cookies' popup on the window */
    await tab.waitForSelector(".onetrust-close-btn-handler.onetrust-close-btn-ui.banner-close-button.ot-close-icon", {visible: true});
    await tab.click(".onetrust-close-btn-handler.onetrust-close-btn-ui.banner-close-button.ot-close-icon");

    /* To open the search window and type in the first song name in it */
    await tab.goto("https://open.spotify.com/search");
    await tab.waitForSelector("._748c0c69da51ad6d4fc04c047806cd4d-scss.f3fc214b257ae2f1d43d4c594a94497f-scss", {visible: true});
    await tab.click("._748c0c69da51ad6d4fc04c047806cd4d-scss.f3fc214b257ae2f1d43d4c594a94497f-scss");
    await tab.type("._748c0c69da51ad6d4fc04c047806cd4d-scss.f3fc214b257ae2f1d43d4c594a94497f-scss", songs[0]);
    await waitTime(2000);

    /* To click on the play button to play the song */
    await tab.waitForSelector("._8e7d398e09c25b24232d92aac8a15a81-scss.e8b2fe03d4e4726484b879ed8ff6f096-scss", {visible: true});
    await tab.click("._8e7d398e09c25b24232d92aac8a15a81-scss.e8b2fe03d4e4726484b879ed8ff6f096-scss")
    await waitTime(3000);
    
    /*Entering the loop to add rest of the songs to the play queue */
    for(let i=1; i<songs.length; i++){

        /* Selecting, Clearing and Typing in the song name in the search bar */
        await tab.click("._748c0c69da51ad6d4fc04c047806cd4d-scss.f3fc214b257ae2f1d43d4c594a94497f-scss");
        await tab.click(".ffbed99e56684cab219dddee59f5df38-scss");
        await tab.type("._748c0c69da51ad6d4fc04c047806cd4d-scss.f3fc214b257ae2f1d43d4c594a94497f-scss", songs[i]);
        await waitTime(2000);

        /* Opening the drop down menu of the song */
        await tab.waitForSelector("._605821ce181f6de6632eabd6a46377fb-scss._50a94aaa6bd60a02583729be7f0e4f93-scss", {visible: true});
        let list = await tab.$$("._605821ce181f6de6632eabd6a46377fb-scss._50a94aaa6bd60a02583729be7f0e4f93-scss");
        await list[0].click();

        /* Adding the song to the play queue */
        let menu = await tab.$$(".d2a8e42f26357f2d21c027f30d93fb64-scss");
        await menu[0].click();
    }
   
} /* End of the main function */

/* Calling the main funciton */
main();