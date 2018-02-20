import React from 'react';
import moment from 'moment';
import {companies, users, conversations} from '../ConversationTest.json';
// import 'bulma/css/bulma.css';

import TopFive from './TopFive';
import PercentInactiveUsers from './PercentInactiveUsers';
import Buddies from './Buddies';

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
                id: company.id,
                name: company.name,
                numConversations, 
            };
        })
    }

    function getTotalConversationsByMonth(companies, conversations, users, numMonths) {
        return getCompaniesConversationsByMonth(companies, conversations, users, numMonths)
        .reduce((a, b)=>{
            return a + b.numConversations
        }, 0)
    }

    let totalConversations = getTotalConversationsByMonth(companies, conversations, users, 6);
 
    return (
        <div>
            <h4>total conversations:{totalConversations}</h4>
            <h4>Most Active Companies:</h4>
            <TopFive />
            <h4>Best Buds</h4>
            <Buddies />
            <h4>Percentage of Inactive Users by Company</h4>
            <PercentInactiveUsers />
        </div>
    )
}

export default Dashboard;