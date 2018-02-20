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
        this.state = {
            top5Filter: 24,
            percentInactiveFilter: 24
        };
    
        // Gotta bind 'this' for it to correctly reference the correct object in the callback
        this.handleTop5 = this.handleTop5.bind(this);
        this.handlePercentInactive = this.handlePercentInactive.bind(this);
      }

      handleTop5(event) {
        this.setState({top5Filter: event.target.value});
      }

      handlePercentInactive(event) {
        this.setState({...this.state, percentInactiveFilter: event.target.value});
      }
      

    render() {
        // use this to pass state down thru props
        const filterTop5 = this.state.top5Filter;
        const filterPercentInactive = this.state.percentInactiveFilter;

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

        let totalConversations = getTotalConversationsByMonth(companies, conversations, users, filterTop5);
 
        return (
            <div>
                <section className="section">
                    <div className="level">
                        <div class="level-item has-text-centered">
                            <div>
                            <p class="heading">{`Total Conversations | Last ${filterTop5} Months`}</p>
                            <p class="title">{totalConversations}</p>
                            </div>
                        </div>
                    </div>
                </section>
                <section class="section hero is-primary">
                    <h4 className="title has-text-centered">Most Active Companies</h4>
                    <div className="level">
                        <div className="level-center">
                            <p className="">Filter by:</p>
                            <div className="select">
                                <select value={filterTop5} onChange={this.handleTop5}>
                                    <option value={1}>Last Month</option>
                                    <option value={2}>Last 2 Months</option>
                                    <option value={3}>Last 3 Months</option>
                                    <option value={4}>Last 4 Months</option>
                                    <option value={5}>Last 5 Months</option>
                                    <option value={6}>Last 6 Months</option>
                                <   option value={24}>All Time</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <TopFive 
                        numMonths={filterTop5}  
                    />
                </section>
                <section className="section hero">
                    <h4 className="title has-text-centered">Best Buds</h4>
                    <Buddies />
                </section>
                <section className="section">
                    <h4 className="title is-4">Percentage of Inactive Users by Company</h4>
                    <div className="select">
                        <select value={filterPercentInactive} onChange={this.handlePercentInactive}>
                            <option value={1}>Last Month</option>
                            <option value={2}>Last 2 Months</option>
                            <option value={3}>Last 3 Months</option>
                            <option value={4}>Last 4 Months</option>
                            <option value={5}>Last 5 Months</option>
                            <option value={6}>Last 6 Months</option>
                            <option value={24}>All Time</option>
                        </select>
                    </div>
                    <PercentInactiveUsers 
                        numMonths={filterPercentInactive}/>
                </section>
            </div>
        )
    }
}

export default Dashboard;