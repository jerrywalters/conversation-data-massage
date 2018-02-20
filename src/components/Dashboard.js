import React, { Component } from 'react';
import moment from 'moment';
import {companies, users, conversations} from '../ConversationTest.json';

import 'bulma/css/bulma.css';

import TopFive from './TopFive';
import PercentInactiveUsers from './PercentInactiveUsers';
import Buddies from './Buddies';

// Make Dashboard a class so I can give it state
class Dashboard extends Component {
    constructor(props) {
        super(props);
        // set a very basic version of application state
        // I'd normally use redux to manage state, but here I only want to track the number of months we are filtering by with no intent to scale
        this.state = {monthsFilter: 24};
    
        // Gotta bind 'this' for it to correctly reference the correct object in the callback
        this.handleChange = this.handleChange.bind(this);
      }

      handleChange(event) {
        this.setState({monthsFilter: event.target.value});
      }

    render() {
        // use this to pass state down thru props
        const numMonths = this.state.monthsFilter;

        // this function takes in the JSON containing companies, conversations, users, and a number of months, and returns a new object containing the company name, id, and total number of conversations over n months
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

        // this function was broken out of getCompaniesConversations... for resusability. it reduces the total conversations by company to an integer containing the total number of conversations for n months
        function getTotalConversationsByMonth(companies, conversations, users, numMonths) {
            return getCompaniesConversationsByMonth(companies, conversations, users, numMonths)
            .reduce((a, b)=>{
                return a + b.numConversations
            }, 0)
        }

        let totalConversations = getTotalConversationsByMonth(companies, conversations, users, numMonths);
 
        return (
            <div>
                <div className="select">
                    <select value={numMonths} onChange={this.handleChange}>
                        <option value={1}>1</option>
                        <option value={2}>2</option>
                        <option value={3}>3</option>
                        <option value={4}>4</option>
                        <option value={5}>5</option>
                        <option value={6}>6</option>
                        <option value={24}>All Time</option>
                    </select>
                </div>
                <h4>total conversations:{totalConversations}</h4>
                <h4>Most Active Companies:</h4>
                <TopFive 
                    numMonths={numMonths}
                />
                <h4>Best Buds</h4>
                <Buddies />
                <h4>Percentage of Inactive Users by Company</h4>
                <PercentInactiveUsers 
                    numMonths={numMonths}/>
            </div>
        )
    }
}

export default Dashboard;