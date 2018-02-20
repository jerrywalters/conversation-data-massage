import React from 'react';
import moment from 'moment';
import {companies, users, conversations} from '../ConversationTest.json';

const TopFive = (props) => {
    function getCompaniesWithUsers(companies, conversations, users, numMonths) {
        return companies
        .map((company)=>{
            const allUsers = users
            .filter((user)=>{
                return user.company_id === company.id;
            })
            .map((user)=>{
                const numConversations = conversations.filter((conversation)=>{
                    return user.email === conversation.from && moment().subtract(numMonths, 'months').diff(conversation.date) < 0;
                }).length;
                return {
                    name: `${user.name.first} ${user.name.last}`,
                    email: user.email,
                    numConversations
                }
            })
            .sort((a,b) => b.numConversations - a.numConversations)

            let totalConversations = allUsers.reduce((a,b)=>a+b.numConversations, 0)

            return {
                name: company.name,
                totalConversations,
                allUsers
            }
        })
    }

    function getTop5CompaniesByMonth(companies, conversations, users, numMonths) {
        return getCompaniesWithUsers(companies, conversations, users, numMonths)
        .sort((a, b) => b.totalConversations - a.totalConversations)
        .slice(0,5)
        .map((company)=>{
            return {
                ...company,
                allUsers: company.allUsers.slice(0,5),
            }
        })
    }

    let top5Companies = getTop5CompaniesByMonth(companies, conversations, users, props.numMonths);
    let top5List = top5Companies.map((company)=>{
        const name = company.name;
        const users = company.allUsers.map((user)=>{
            return <li>{user.name}</li>
        })
        return (
            <li>
                {name}
                <h5>Most Active Users:</h5>
                <ol>
                    {users}
                </ol>
            </li>
            )
    })

    return (
        <ol>
            {top5List}
        </ol>
    )
}

export default TopFive;