import React from 'react';
import moment from 'moment';
import _ from 'lodash';
import {companies, users, conversations} from '../ConversationTest.json';

const Dashboard = () => {

    function rankCompaniesByAmountOfMonths(companies, conversations, users, numMonths) {
        return companies.map((company)=>{
            let numConversations = users.filter((user)=>{
                return user.company_id === company.id;
            }).map((user)=>{
                return conversations.filter((conversation)=>{
                    return user.email === conversation.from && moment().subtract(numMonths, 'months').diff(conversation.date) < 0;
                })
            }).reduce((a,b)=>a+b.length, 0);
            
            return {
                numConversations, 
                companyId: company.id
            };
        }).sort((a, b) => b.numConversations - a.numConversations);
    }

    function getTopFiveUsers(companies, conversations, users) {
        return companies.map((company)=>{
            return users
            .filter((user)=>{
                return user.company_id === company.id;
            })
            .map((user)=>{
                let userConversationAmount = conversations.filter((conversation)=>{
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

    
    let buddies = users.map((user)=>{
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
        .reduce((tally,vote)=>{
            !tally[vote] ? tally[vote] = 1 : tally[vote] += 1
            // tally[vote].sender = user.email;
            return tally;
        }, [])
    })

    // let babies = _.flatMap(buddies)

    // let babies = buddies.reduce((acc, value)=>{
    //     console.log('value', Object.values(value))
    //     return acc.concat({
    //         count: Object.values(value)[index].count,
    //         buddies: [
    //             Object.values(value).sender, Object.keys(value)[index]
    //         ]
    //     });
    // }, [])

    let babies = buddies.map((user)=>{
        console.log('user:', user);
        user.reduce((acc, value)=>{
            console.log('value:', value);
            return acc.concat(value);
        }, [])
    })

    function groupByDuplicate(tally, vote) {
        !tally[vote] ? tally[vote] = 1 : tally[vote] += 1
        return tally;
    }

    console.log(babies);

    // companies.users.map((user)=>{
    //     let conversations = Conversations.conversations.filter((conversation)=>{
    //         return conversation.from === user.email
    //     })
    //     console.log('conversations', conversations)
    // })

    return (
        <div>
            Hi
        </div>
    )
}

export default Dashboard;