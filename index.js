//https://www.npmjs.com/package/dotenv
require('dotenv').config();

//https://www.npmjs.com/package/instatouch
const instaTouch = require('instatouch');

//https://nodejs.org/api/fs.html
const fs = require('fs');

//https://nodejs.org/docs/latest/api/process.html#processargv
const args = process.argv;

/**
 * This function is responsible of writing the content of the golden ticket
 * to a file in the system
 * 
 * @property {object} content - Content of the golden ticket
 */
async function getAllParticipants(session_id, post_id) {
    try {
        const options = {
            count: 1500,
            session: session_id
        };
        const { collector, auth_error } = await instaTouch.comments(post_id, options);

        if (auth_error) await Promise.reject('Auth error!');

        return collector;
    } catch (error) {
        console.log(error);
    }
}

/**
 * This function gets the arguments from the command line
 * wich are: instagram session id, instagram post id
 * 
 * Session id argument is optional on command line, can also be sent by
 * .env file
 * 
 * @returns {object} - Value of session_id and post_id
 */
function getArgsFromCommandLine() {
    let session_id = '';
    let post_id = '';
    
    args.forEach(arg => {
        if (!arg.includes('node') && !arg.endsWith('.js')) {
            const [ argName, argValue ] = arg.split('=');

            if (argName.includes('session')) {
                session_id = `sessionid=${argValue};`;
                return;
            }

            if (argName.includes('post')) {
                post_id = argValue;
                return;
            }
        }
    });

    return {
        session_id: session_id || process.env.INSTAGRAM_SESSION_ID,
        post_id
    };
}

/**
 * This function picks a winner between all the commenting participants
 * 
 * @property {array} participants - Array of Objecs with participants infos
 * @returns {object} - Info About the winner of the raffle and the golden ticket number
 */
function pickWinner(participants) {
    const allParticipants = participants.length;
    const pickedTicket = Math.floor(Math.random() * allParticipants);
    const pickedWinner = participants[pickedTicket];
    return pickedWinner;
}

/**
 * This function searchs for all the comments in a specified post
 * 
 * @property {string} postId - The post Id to search for
 * @returns {array} - All the comments found in the specified post
 */
function writeGoldenTicket(winner) {
    fs.writeFile('goldenTicket.json', JSON.stringify(winner, null, 2), function (err) {
        if (err) console.log(err);
    })
}

/**
 * Main execution function
 */
async function main() {
    const { session_id, post_id } = getArgsFromCommandLine();
    const participants = await getAllParticipants(session_id, post_id);
    const goldenTicket = pickWinner(participants);
    writeGoldenTicket(goldenTicket);
}

main();