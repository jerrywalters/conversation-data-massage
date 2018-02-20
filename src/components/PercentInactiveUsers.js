import React from 'react';
import moment from 'moment';
import {companies, users, conversations} from '../ConversationTest.json';

import 'bulma/css/bulma.css';

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
        .sort((a,b)=> b.percentInactive - a.percentInactive)
    }

    let percentInactive = getInactiveUsersByMonth(companies, conversations, users, props.numMonths);
    // it'd be possible to turn this into a component and pass the company through as props, but unnecessary for now
    // this could also honestly use a search filter
    let percentInactiveList = percentInactive.map((company)=> {
        return (
            <div className="column is-one-fifth">
                <div className="box">
                    <div className="content">
                        <h1 className="title is-size-6  has-text-grey-dark has-text-centered">{company.name}</h1>
                        <p className="is-size-3 has-text-primary has-text-centered">{`${company.percentInactive}%`}</p>
                    </div>
                </div>
            </div>
        )
    })
    
    return (
        <div className="columns" style={{'flex-wrap':'wrap'}}>
            {percentInactiveList}
        </div>
    )
}

export default PercentInactiveUsers;