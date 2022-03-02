# instagram-giveaway-code
Hello! This is the first tutorial that I made at my Youtube channel! 
With this code you can take all the comments of an instagram post and randomly select a winner! 🥳
Hope you enjoy it!

## Start

## Installation
First you have to install all the dependencies:
```
npm i
```

## Environment variable
Then you have to create a file with the name '.env' at the root folder of the project.
Inside this file you have to create a variable with named INSTAGRAM_SESSION_ID.

### Get Session Id
In order to access comments data you need an active session cookie value!
This value can be taken from the instagram web(you need to be authorized in the web version)
- Open inspector (for example in Google Chrome browser) then right click on the web page -> inspector -> Network
- Refresh the page
- In the "Network" section you will see the request, select it, scroll down to the "Request Headers" section and look for the "cookie:" section, there you will find this value "sessionid=BLAHLBAH"
- Use it on your .env file
- The content will be something like this:
```
INSTAGRAM_SESSION_ID = 'sessionid=YourSessionIdHere;'
```

### Update Options to new Post
To scrape comments from specific post, you need to update its id on the code:
- You can get yout id post at the URL, for example: at https://www.instagram.com/p/CZz0MqJFDML/ , CZz0MqJFDML is the id.
- At index.js you should change the line 23, 'CZz0MqJFDML' for id of your post:
```
const comments = await instaTouch.comments('yourPostIdHere', options);
```

## Run
After doing all the configuration, you can run the project using:
```
node index.js
```
The winner will be generate and export at the root of the project as 'goldenTicket.json".

## Authors
The first version of this code was made by [Bruno Couto](https://github.com/BrunoTCouto) and me: Adriana Saty


## Follow me:
I also do content at [Twitch](https://www.twitch.tv/adrianasaty).
[Youtube](https://www.youtube.com/channel/UCPhVBS-1Uy-wIzj4hmjkcmA)
and [Instagram](https://www.instagram.com/adriana.saty/)


