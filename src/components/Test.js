   // const users = [];
    // Conversations.conversations.map((convo)=>{
    //     let user = convo.from;
    //     users.push(user);
    // })
    // let months = [];

    // just returns an array of all the months individually by convo including duplicates
    // Conversations.conversations.map((convo)=>{
    //     const date = convo.date;
    //     months.push(moment(date).format('MMMM'));
    // })
    // console.log('months:', months);
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

    // works for something
    // function count(arr) {
    //     return arr.reduce((a,b) => (a[b] = a[b] + 1 || 1) && a, {})
    //   }

    // const numConvos = count(users);
    // console.log('nums', numConvos);

    // look thru nums
    // look thru users
    // if a user.email matches num[1] then get the company
    // get num occurences of a company
        // console.time('loops');
        // let companies = [];

        // lets get the most active company. period.
        // so to do that I will need the number of conversations each user sent :check
        // now I need to look at each user and get company id
        // if their company id matches a certain companies id, then that company gets the number of messages the user sent added to their total messages?
        //

        // give the companies array a list of companies with a new users array
    //     for(let a=0; a < Conversations.companies.length; a++) {
    //         companies.push(
    //             {
    //                 "name": Conversations.companies[a].name,
    //                 "id": Conversations.companies[a].id,
    //                 "users": [],
    //                 "messagesPerMonth": {
    //                     'january': {
    //                         "numSent" : 0,
    //                         "percentInactive" : 0
    //                     },
    //                     'february': {
    //                         "numSent" : 0,
    //                         "percentInactive" : 0
    //                     },
    //                     'march': {
    //                         "numSent" : 0,
    //                         "percentInactive" : 0
    //                     },
    //                     'april': {
    //                         "numSent" : 0,
    //                         "percentInactive" : 0
    //                     },
    //                     'may': {
    //                         "numSent" : 0,
    //                         "percentInactive" : 0
    //                     },
    //                     'june': {
    //                         "numSent" : 0,
    //                         "percentInactive" : 0
    //                     },
    //                     'july': {
    //                         "numSent" : 0,
    //                         "percentInactive" : 0
    //                     },
    //                     'august': {
    //                         "numSent" : 0,
    //                         "percentInactive" : 0
    //                     },
    //                     'september': {
    //                         "numSent" : 0,
    //                         "percentInactive" : 0
    //                     },
    //                     'october': {
    //                         "numSent" : 0,
    //                         "percentInactive" : 0
    //                     },
    //                     'november': {
    //                         "numSent" : 0,
    //                         "percentInactive" : 0
    //                     },
    //                     'december': {
    //                         "numSent" : 0,
    //                         "percentInactive" : 0
    //                     },
    //                 },
    //             }
    //         )
    //         // push each user to its respective company's array with a new conversations array
    //         for(let b=0; b < Conversations.users.length; b++) {
    //             if(Conversations.users[b].company_id === companies[a].id) {
    //                 companies[a].users.push(
    //                     {
    //                         "name": {
    //                             "first": Conversations.users[b].name.first,
    //                             "last": Conversations.users[b].name.last
    //                         },
    //                         "company_id": Conversations.users[b].company_id,
    //                         "email": Conversations.users[b].email,
    //                         "conversations": []
    //                         //"numConversations" : 0
    //                     }
    //                 )
    //             }
    //             // for(let c=0; c < Conversations.conversations.length; c++) {
    //             //     if(Conversations.conversations[c].from === Conversations.users[b].email) {
    //             //         companies[a].users[b].num
    //             //     }
    //             // }
    //         }
    //         // if userId === companies[i].id then add user to company.users[]
    //         // now each company has a list of users
    //         // loop through array of conversations
    //         // if the email matches the users.email then users messagesNum++
    //         // company totalMessages = users.messageNum all added together
    //     }
        
    //     // push respective conversations to each companies individual user
    //     for(let a=0; a < companies.length; a++) {
    //         for(let b=0; b < companies[a].users.length; b++) {
    //             for(let c =0; c < Conversations.conversations.length; c++) {
    //                 if(Conversations.conversations[c].from === companies[a].users[b].email) {
    //                     companies[a].users[b].conversations.push(Conversations.conversations[c]);
    //                     // companies[a].users[b].numConversations++;
    //                 }
    //             }
    //         }
    //     }

    //     // for every companys conversations by month, loop thru each month
    //     // loop thru every individuals conversations.
    //     // if the conversation.date === month, increment conversations by month of that month by 1

    //     // loop thru every conversation
    //     // push each conversation to a companies array of months

    //     // use this to run the messages per month against
    //     const sampleObj = {
    //     "messagesPerMonth": {
    //             'january': 0,
    //             'february': 0,
    //             'march': 0,
    //             'april': 0,
    //             'may': 0,
    //             'june': 0,
    //             'july':0,
    //             'august':0,
    //             'september':0,
    //             'october': 0,
    //             'november': 0,
    //             'december':0
    //         }
    //     }
    //     const monthKeys = Object.keys(sampleObj.messagesPerMonth)

    //     // for every month, go thru every company and increment messages per month if the date matches
    //     for(let i = 0; i < monthKeys.length; i++) {
    //         for(let a=0; a < companies.length; a++) {
    //             for(let b=0; b < companies[a].users.length; b++) {
    //                 for(let c =0; c < companies[a].users[b].conversations.length; c++) {
    //                     let date = moment(companies[a].users[b].conversations[c].date).format('MMMM').toLowerCase();
    //                     // let convoByDate = companies[a].users[b].conversations.sort((a,b) => a.date - b.date);
    //                     if(date === monthKeys[i]) {
    //                         companies[a].messagesPerMonth[monthKeys[i]].numSent++;
    //                     } 
    //                 }
    //             }
    //         }
    //     }
    //     console.timeEnd('loops');
    //     console.log('companies:', companies)
    //     // for every month, loop thru all the conversations dates
    //     // if their dates are equal to the current month (key), then increment value

    // console.time('maps')
    // // make an array of all the companies.
    // let companyList = Conversations.companies.map((index)=>{
    //     return index;
    // })

    // // make an array of all the users and add conversations to them
    // let usersWithConvos = Conversations.users.filter((user)=>{
    //     // if this users company id is the same as this index.id then add the user to the company
    //     let conversations = Conversations.conversations.filter((convo)=>{
    //         return convo.from === user.email
    //     })
    //     user.conversations = conversations;
    //     return user;
    // })

    // // add all users with convos to their companies
    // let companiesWithUsers = companyList.map((company, index)=>{
    //     let users = usersWithConvos.filter((user)=>user.company_id === company.id);
    //     company.users = users;
    //     company.messagesPerMonth = {
    //         'january': {
    //             "numSent" : 0,
    //             "percentInactive" : 0
    //         },
    //         'february': {
    //             "numSent" : 0,
    //             "percentInactive" : 0
    //         },
    //         'march': {
    //             "numSent" : 0,
    //             "percentInactive" : 0
    //         },
    //         'april': {
    //             "numSent" : 0,
    //             "percentInactive" : 0
    //         },
    //         'may': {
    //             "numSent" : 0,
    //             "percentInactive" : 0
    //         },
    //         'june': {
    //             "numSent" : 0,
    //             "percentInactive" : 0
    //         },
    //         'july': {
    //             "numSent" : 0,
    //             "percentInactive" : 0
    //         },
    //         'august': {
    //             "numSent" : 0,
    //             "percentInactive" : 0
    //         },
    //         'september': {
    //             "numSent" : 0,
    //             "percentInactive" : 0
    //         },
    //         'october': {
    //             "numSent" : 0,
    //             "percentInactive" : 0
    //         },
    //         'november': {
    //             "numSent" : 0,
    //             "percentInactive" : 0
    //         },
    //         'december': {
    //             "numSent" : 0,
    //             "percentInactive" : 0
    //         },
    //     }
    //     // now look thru company.users.conversations
    //     return company;
    // })

    // how do i do the equivalent of this with map or reduce and way lest nesting?
    // for(let i = 0; i < monthKeys.length; i++) {
    //     for(let a=0; a < companiesWithUsers.length; a++) {
    //         for(let b=0; b < companiesWithUsers[a].users.length; b++) {
    //             for(let c =0; c < companiesWithUsers[a].users[b].conversations.length; c++) {
    //                 let date = moment(companiesWithUsers[a].users[b].conversations[c].date).format('MMMM').toLowerCase();
    //                 // let convoByDate = companies[a].users[b].conversations.sort((a,b) => a.date - b.date);
    //                 if(date === monthKeys[i]) {
    //                     companiesWithUsers[a].messagesPerMonth[monthKeys[i]].numSent++;
    //                 }
    //             }
    //         }
    //     }
    // }

    // console.timeEnd('maps');
    // console.log('list', companiesWithUsers);

    //Top 5 of the most active companies in the last N months (N = 1 through 6). We measure how active a company    is by their number of conversations.

    

    // SOMETHING LIKE THIS FOR NUMACTIVE
    // var dates = [
    //     this will be a list of all of the dates a user sent some shit including duplicated
    // ]

    // var initialValue = {}; we want it to return an object
    // var reducer = function(tally, vote) {
    //     if(!tally[vote]) {
    //         tally[vote] = 1
    //     } else {
    //         tally[vote] += 1
    //     }

    //     return tally;
    // }

    // var result = dates.reduce(reducer, initialValue)


    // for every conversation in every user in every company get the date of the conversation. then increment the company's conversations by month based on the date.


    // somehow this actually gives me the "correct data"
    // I also need:
        // messages total
            // all users messages tallied
            // maybe push whole message to user and then get the .date :CHECK
        // messages per month : CHECK
        // most active users
            // user with most conversations
        // percent of inactive users BY MONTH
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
    
    // USE REDUCE TO BE A WIZARD AND MAKE ALL OF THIS AWESOME

    // make a new array of companies

    // map thru company