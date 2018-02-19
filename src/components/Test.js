import Conversations from '../ConversationTest.json';

// theres 50 companies
// i think 300 unique users
// i think 5000 unique converstions

// 1. Top 5 of the most active companies in the last N months (N = 1 through 6). We measure how active a company is by their number of conversations.
// 2 .Top 5 of the most active users per company for these companies.
// 3. Top 5 pairs of work buddies. We should look at which pair of users talk the most to each other. Be sure to look at both To & Bcc fields.
// 4. Percent of inactive users per company in the last N months (N = 1 through 6). An inactive user is a user who has not initiated any conversation in that time period.
// 5. Total number of conversations sent per month.


let companies = [];

// give the companies array a list of companies with a new users array
for(let a=0; a < Conversations.companies.length; a++) {
    companies.push(
        {
            "name": Conversations.companies[a].name,
            "id": Conversations.companies[a].id,
            "users": [],
            "messagesPerMonth": {
                'january': {
                    "numSent" : 0,
                    "percentInactive" : 0
                },
                'february': {
                    "numSent" : 0,
                    "percentInactive" : 0
                },
                'march': {
                    "numSent" : 0,
                    "percentInactive" : 0
                },
                'april': {
                    "numSent" : 0,
                    "percentInactive" : 0
                },
                'may': {
                    "numSent" : 0,
                    "percentInactive" : 0
                },
                'june': {
                    "numSent" : 0,
                    "percentInactive" : 0
                },
                'july': {
                    "numSent" : 0,
                    "percentInactive" : 0
                },
                'august': {
                    "numSent" : 0,
                    "percentInactive" : 0
                },
                'september': {
                    "numSent" : 0,
                    "percentInactive" : 0
                },
                'october': {
                    "numSent" : 0,
                    "percentInactive" : 0
                },
                'november': {
                    "numSent" : 0,
                    "percentInactive" : 0
                },
                'december': {
                    "numSent" : 0,
                    "percentInactive" : 0
                },
            },
            "numActive": 0
        }
    )
    // push each user to its respective company's array with a new conversations array
    for(let b=0; b < Conversations.users.length; b++) {
        if(Conversations.users[b].company_id === companies[a].id) {
            companies[a].users.push(
                {
                    "name": {
                        "first": Conversations.users[b].name.first,
                        "last": Conversations.users[b].name.last
                    },
                    "company_id": Conversations.users[b].company_id,
                    "email": Conversations.users[b].email,
                    "conversations": []
                    //"numConversations" : 0
                }
            )
        }
        // for(let c=0; c < Conversations.conversations.length; c++) {
        //     if(Conversations.conversations[c].from === Conversations.users[b].email) {
        //         companies[a].users[b].num
        //     }
        // }
    }
    // if userId === companies[i].id then add user to company.users[]
    // now each company has a list of users
    // loop through array of conversations
    // if the email matches the users.email then users messagesNum++
    // company totalMessages = users.messageNum all added together
}

// push respective conversations to each companies individual user
for(let a=0; a < companies.length; a++) {
    for(let b=0; b < companies[a].users.length; b++) {
        for(let c =0; c < Conversations.conversations.length; c++) {
            if(Conversations.conversations[c].from === companies[a].users[b].email) {
                companies[a].users[b].conversations.push(Conversations.conversations[c]);
                // companies[a].users[b].numConversations++;
            }
        }
    }
}

// for every companys conversations by month, loop thru each month
// loop thru every individuals conversations.
// if the conversation.date === month, increment conversations by month of that month by 1

// loop thru every conversation
// push each conversation to a companies array of months

// use this to run the messages per month against
const sampleObj = {
"messagesPerMonth": {
        'january': 0,
        'february': 0,
        'march': 0,
        'april': 0,
        'may': 0,
        'june': 0,
        'july':0,
        'august':0,
        'september':0,
        'october': 0,
        'november': 0,
        'december':0
    }
}
const monthKeys = Object.keys(sampleObj.messagesPerMonth)

// for every month, go thru every company and increment messages per month if the date matches
for(let i = 0; i < monthKeys.length; i++) {
    for(let a=0; a < companies.length; a++) {
        for(let b=0; b < companies[a].users.length; b++) {
            for(let c =0; c < companies[a].users[b].conversations.length; c++) {
                let date = moment(companies[a].users[b].conversations[c].date).format('MMMM').toLowerCase();
                let convoByDate = companies[a].users[b].conversations.sort((a,b) => a.date - b.date);
                if(date === monthKeys[i]) {
                    companies[a].messagesPerMonth[monthKeys[i]].numSent++;
                } 
            }
        }
    }
}

console.log('companies:', companies)