import React from 'react';
import moment from 'moment';
import Conversations from '../ConversationTest.json';

const Dashboard = () => {
    const users = [];
    Conversations.conversations.map((convo)=>{
        let user = convo.from;
        users.push(user);
    })
    let months = [];

    // just returns an array of all the months individually
    Conversations.conversations.map((convo)=>{
        const date = convo.date;
        months.push(moment(date).format('MMMM'));
    })
    console.log('months:', months);
    // var count = dataset.reduce(function(n, val) {
    //     return n + (val === search);
    // }, 0);

    // loop through all conversations and find the user
    // make an array of all of the users
    // for each user in the array, loop through the array and compare the current user to that index of the array
    // if the user has
    
    // var dataset = [2,2,4,2,6,4,7,8];
    // var search = 2;
    // var occurrences = dataset.filter(function(val) {
    //     return val === search;
    // }).length;
    // console.log(occurrences); // 3

    //result = { };
// for(var i = 0; i < a.length; ++i) {
//     if(!result[a[i]])
//         result[a[i]] = 0;
//     ++result[a[i]];
// }

    // works
    // let result = {};

    // for(var i = 0; i < users.length; i++) {
    //     if(!result[users[i]])
    //         result[users[i]] = 0;
    //     ++result[users[i]];
    // }

    // console.log(result);

    function count(arr) {
        return arr.reduce((a,b) => (a[b] = a[b] + 1 || 1) && a, {})
      }

    const nums = count(users);
    console.log('nums', nums);

    // look thru nums
    // look thru users
    // if a user.email matches num[1] then get the company
    // get num occurences of a company

    const numOccurences = [];

    let companies = [];

    // lets get the most active company. period.
    // so to do that I will need the number of conversations each user sent :check
    // now I need to look at each user and get company id
    // if their company id matches a certain companies id, then that company gets the number of messages the user sent added to their total messages?
    //

    // give the companies array a list of companies with a new users array
    for(let a=0; a < Conversations.companies.length; a++) {
        companies.push(
            {
                "name": Conversations.companies[a].name,
                "id": Conversations.companies[a].id,
                "users": [],
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
                    if(date === monthKeys[i]) {
                        companies[a].messagesPerMonth[monthKeys[i]]++;
                    }
                }
            }
        }
    }

    // for every month, loop thru all the conversations dates
    // if their dates are equal to the current month (key), then increment value
    // 

    // for every conversation in every user in every company get the date of the conversation. then increment the company's conversations by month based on the date.

    console.log('companies:', companies)
    // somehow this actually gives me the "correct data"
    // I also need:
        // messages total
            // all users messages tallied
            // maybe push whole message to user and then get the .date
            // num messages per month
        // messages per month
        // most active users
            // user with most conversations
        // percent of inactive users 
        // num users with 0 messages/total num users

    // most active company in last 1-6 months
      // look thru conversations for users
      // for each users.companyId tally that company++
        // for each company, check if companyId matches user.companyId
        // if so, companyCount++
    // top 5 most active user per company
        // get count of users messages and compare to other users messages in company
        // new object which is company.
        // company contains an array of user objects
        // the user objects each have an email and a numConversations
    // top 5 pairs of work buddies (to&bcc)
    // percent of inactive users per company
    // total conversations per month

    // so i want a list of users for company
    // then i want how many messages that user sent
    // i want total messages of a company. all user.messages added together
    // inactive users. user messages = 0 user is inactive
    

    // 1. get unique users and see what company they are
    
    var uniqueItems = [...new Set(users)]
    // or this
    // var uniqueItems = Array.from(new Set(users))
    // set of unique emails
    console.log(uniqueItems);



    return (
        <div>
            Hi
        </div>
    )
}

export default Dashboard;