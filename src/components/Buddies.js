import React from 'react';
import moment from 'moment';
import {companies, users, conversations} from '../ConversationTest.json';

const Buddies = () => {
    // takes duplicates and stores them in an object with the name as the key and a value of the number of duplicates
    function groupByDuplicates(acc, value) {
        !acc[value] ? acc[value] = 1 : acc[value] += 1
        return acc;
    }

    // get an object of buddies with their number of conversations
    const buddiesObj = users.map((user)=>{
        return conversations.filter((conversation)=>{
            return user.email === conversation.from;
        })
        .map((conversation)=>{
            return {
                recipients: [...conversation.to, ...conversation.bcc]
            }
        })
        .reduce((acc, value)=>{
            return acc.concat(value.recipients);
        }, [])
        .map((recipient)=>{
            // turn this into a little function?
            const buddy = [recipient, user.email].sort().join('%');
            return buddy;
        })
    })
    .reduce((acc, value)=>{
        return acc.concat(value)
    }, [])
    .reduce(groupByDuplicates, [])

    // converty buddiesObj to an array of buddies sorted by the most conversations
    // might need to convert it into a string and get rid of value?
    const buddiesArray = Object.keys(buddiesObj)
        .map(key => ({[key] : buddiesObj[key]}))
        .sort((a,b)=>{
            return Object.values(b)[0] - Object.values(a)[0]
        })
        .slice(0,5);

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