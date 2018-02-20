import React from 'react';
import moment from 'moment';
import {companies, users, conversations} from '../ConversationTest.json';

const Dashboard = () => {
    function getCompaniesConversationsByMonth(companies, conversations, users, numMonths) {
        return companies
        .map((company)=>{
            const numConversations = users.filter((user)=>{
                return user.company_id === company.id;
            })
            .map((user)=>{
                return conversations.filter((conversation)=>{
                    return user.email === conversation.from && moment().subtract(numMonths, 'months').diff(conversation.date) < 0;
                })
            })
            .reduce((a,b)=>a+b.length, 0);
            
            return {
                companyId: company.id,
                numConversations, 
            };
        })
    }

    console.time('sort')
    function rankCompaniesByAmountOfMonths(companies, conversations, users, numMonths) {
        return getCompaniesConversationsByMonth(companies, conversations, users, numMonths)
        .sort((a, b) => b.numConversations - a.numConversations)
        .slice(0,5);
    }
    console.log(rankCompaniesByAmountOfMonths(companies, conversations, users, 6))
    console.timeEnd('sort')

    console.time('reduce')
    function getTotalConversationsByMonth(companies, conversations, users, numMonths) {
        return getCompaniesConversationsByMonth(companies, conversations, users, numMonths)
        .reduce((a, b)=>{
            return a + b.numConversations
        }, 0)
    }
    console.log(getTotalConversationsByMonth(companies, conversations, users, 3 ))
    console.timeEnd('reduce')

    function getTopFiveUsers(companies, conversations, users) {
        return companies.map((company)=>{
            return users
            .filter((user)=>{
                return user.company_id === company.id;
            })
            .map((user)=>{
                const userConversationAmount = conversations.filter((conversation)=>{
                    return user.email === conversation.from;
                }).length;
                return {
                    companyId: company.id,
                    email: user.email,
                    userConversationAmount
                }
            })
            .sort((a,b) => b.userConversationAmount - a.userConversationAmount)
            .slice(0,5);    
        });
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

    console.log('buddies', buddiesArray)
    
    // get the percentage of inactive users by company in any given month
    function getInactiveUsersByMonth(companies, conversations, users, numMonths) {
        return companies
        .map((company)=>{
            const userConversations = users.filter((user)=>{
                return user.company_id === company.id;
            })
            .map((user)=>{
                return conversations.filter((conversation)=>{
                    return user.email === conversation.from && moment().subtract(numMonths, 'months').diff(conversation.date) < 0;
                })
            })

            const numUsers = userConversations.length;
            const numInactive = userConversations.filter(convo=>convo.length===0).length;

            return {
                companyId: company.id,
                percentInactive: getPercentageAsInteger(numUsers, numInactive),
            };
        })
    }

    // takes duplicates and stores them in an object with the name as the key and a value of the number of duplicates
    function groupByDuplicates(acc, value) {
        !acc[value] ? acc[value] = 1 : acc[value] += 1
        return acc;
    }
    // gets percentage as integer
    function getPercentageAsInteger(total, diff) {
        return (diff/total)*100;
    }

    return (
        <div>
            Hi
        </div>
    )
}

export default Dashboard;