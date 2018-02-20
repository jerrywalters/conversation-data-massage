import React from 'react';
import moment from 'moment';
import {companies, users, conversations} from '../ConversationTest.json';

const PercentInactiveUsers = (props) => {

    // gets percentage, then round it to nearest integer
    function getPercentageAsInteger(total, diff) {
        return Math.round((diff/total)*100);
    }

    // get the percentage of inactive users by company in any given month
    function getInactiveUsersByMonth(companies, conversations, users, numMonths) {
        return companies
        .map((company)=>{
            // get only the users belonging to a given company
            const userConversations = users.filter((user)=>{
                return user.company_id === company.id;
            })
            .map((user)=>{
                // get only conversations within the last n months from current date
                return conversations.filter((conversation)=>{
                    return user.email === conversation.from && moment().subtract(numMonths, 'months').diff(conversation.date) < 0;
                })
            })

            // use these to calculate percentage of inactive users
            const numUsers = userConversations.length;
            const numInactive = userConversations.filter(convo=>convo.length===0).length;

            return {
                id: company.id,
                name: company.name,
                percentInactive: getPercentageAsInteger(numUsers, numInactive),
            };
        })
    }

    let percentInactive = getInactiveUsersByMonth(companies, conversations, users, props.numMonths);
    // it'd be possible to turn this into a component and pass the company through as props, but unnecessary for now
    let percentInactiveList = percentInactive.map((company)=> {
        return (
            <li className="card">
                <div className="card-content">
                    <h1 className="title is-4">{company.name}</h1>
                    <h2 className="title is-5">{company.percentInactive}</h2>
                </div>
            </li>
        )
    })
    
    return (
        <ul>
            {percentInactiveList}
        </ul>
    )
}

export default PercentInactiveUsers;