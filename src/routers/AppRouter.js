import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Header from '../components/Header';

const React = require('react')
const { default: ExpenseDashboardPage } = require("../components/ExpenseDashboardPage");
const { default: AddExpensePage } = require("../components/AddExpensePage");
const { default: EditExpensePage } = require("../components/EditExpensePage");
const { default: HelpPage } = require("../components/HelpPage");
const { default: NotFoundPage } = require("../components/NotFoundPage");


export default () => (
    <BrowserRouter>
        <div>
            <Header />
            <Switch>
                <Route path="/" component={ExpenseDashboardPage} exact={true} />
                <Route path="/create" component={AddExpensePage} exact={true} />
                <Route path="/edit/:id" component={EditExpensePage} exact={true} />
                <Route path="/help" component={HelpPage} exact={true} />

                <Route component={NotFoundPage} />
            </Switch>
        </div>
    </BrowserRouter>
)