import React from 'react';
import moment from 'moment';
import {companies, users, conversations} from '../ConversationTest.json';

const TopFive = (props) => {

    // gets an array of companies, containing all of their users with conversations, sorted by number of conversations in n months
    function getCompaniesWithUsers(companies, conversations, users, numMonths) {
        return companies
        .map((company)=>{
            // get only the users belonging to a given company
            const allUsers = users.filter((user)=>{
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

            // assign the company a totalConversations property to filter by
            let totalConversations = allUsers.reduce((a,b)=>a+b.numConversations, 0)

            return {
                name: company.name,
                totalConversations,
                allUsers
            }
        })
    }

    // sort companies by their number of conversations
    function getTop5CompaniesByMonth(companies, conversations, users, numMonths) {
        return getCompaniesWithUsers(companies, conversations, users, numMonths)
        .sort((a, b) => b.totalConversations - a.totalConversations)
        // now only get the top 5 most active companies
        .slice(0,5)
        // additionally, only get the top 5 most active users in a given company
        .map((company)=>{
            return {
                ...company,
                allUsers: company.allUsers.slice(0,5),
            }
        })
    }

    let top5Companies = getTop5CompaniesByMonth(companies, conversations, users, props.numMonths);
    // this is another example of where I could probably pass the props into a component to abstract some of this logic
    let top5List = top5Companies.map((company)=>{
        const name = company.name;
        const users = company.allUsers.map((user)=>{
            return (
                <li className="is-size-6">
                    <p className="is-size-6">{user.name}</p>
                </li>
            )
        })
        return (
            <li className="column is-one-fifth">
                <div className="card">
                    <div className="card-header">
                        <h2 className="card-header-title is-size-5">{name}</h2>
                    </div>
                    <div className="card-content content">
                        <h5 className="is-size-6 has-text-grey-dark">Top Users:</h5>
                        <ol>
                            {users}
                        </ol>
                    </div>
                </div>
            </li>
            )
    })

    return (
        <ol className="columns">
            {top5List}
        </ol>
    )
}

export default TopFive;