//https://www.npmjs.com/package/dotenv
require('dotenv').config();

//https://www.npmjs.com/package/instatouch
const instaTouch = require('instatouch');

//https://nodejs.org/api/fs.html
const fs = require('fs');


/**
 * This function is responsible of writing the content of the golden ticket
 * to a file in the system
 * 
 * @property {object} content - Content of the golden ticket
 */
async function getAllParticipants() {
    try {
        const options = {
            count: 1500,
            session: process.env.INSTAGRAM_SESSION_ID
        };
        const comments = await instaTouch.comments('CZz0MqJFDML', options);
        return comments.collector;
    } catch (error) {
        console.log(error);
    }
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
    const participants = await getAllParticipants();
    const goldenTicket = pickWinner(participants);
    writeGoldenTicket(goldenTicket);
}

main();