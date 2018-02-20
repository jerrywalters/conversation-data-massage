import React from 'react';
import moment from 'moment';
import {companies, users, conversations} from '../ConversationTest.json';

const Buddies = () => {
    // takes duplicates and stores them in an object with the name as the key and value pair containing the name and number of duplicates
    function groupByDuplicates(acc, value) {
        !acc[value] ? acc[value] = 1 : acc[value] += 1
        return acc;
    }

    // get a buddies object with their number of conversations together
    const buddiesObj = users.map((user)=>{
        return conversations.filter((conversation)=>{
            return user.email === conversation.from;
        })
        // get all of the recipients, whether they are to or bcc
        .map((conversation)=>{
            return {
                recipients: [...conversation.to, ...conversation.bcc]
            }
        })
        .reduce((acc, value)=>{
            return acc.concat(value.recipients);
        }, [])
        .map((recipient)=>{
            // combine the sender and recipient to an alphabetically sorted string of both their emails
            const buddy = [recipient, user.email].sort().join('%');
            return buddy;
        })
    })
    .reduce((acc, value)=>{
        return acc.concat(value)
    }, [])
    // using the combined buddy name as a key, count and assign a number of conversations as a value
    .reduce(groupByDuplicates, [])

    // converty buddiesObj to an array of buddies sorted by the most conversations
    const buddiesArray = Object.keys(buddiesObj)
        .map(key => ({[key] : buddiesObj[key]}))
        // get only top 5 buddies by number of messages
        .sort((a,b)=>{
            return Object.values(b)[0] - Object.values(a)[0]
        })
        .slice(0,5);

    // get the top 5 buddies and reformat the string to their combined emails
    // maybe refactor this to say their names rather than emails
    let top5Buddies = buddiesArray
        .map((buddy)=>{
            let buddies = Object.keys(buddy)[0]
            .split('%')
            .join(' and ')
            return <li>{buddies}</li>
        })

    return (
        <ol>
            {top5Buddies}
        </ol>
    )
}

export default Buddies;