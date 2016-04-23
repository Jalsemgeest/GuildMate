require('bootstrap-webpack');
require('font-awesome-webpack');
require('./style.scss');

import React from 'react'
import ReactDOM from 'react-dom'
import {Router, Route, IndexRoute, Link, browserHistory, IndexRedirect} from 'react-router'
import Dashboard from './dashboard/dashboard'
import App from './app'
import Login from './authentication/login'
import Feed from './feed/feed'
import Forums from './forums/forums'
import Calendar from './calendar/calendar'
import Members from './members/members'
import Teams from './teams/teams'
import Settings from './settings/settings'

function loadSettings() {
	console.log("Awesome");
}

ReactDOM.render(
	<Router history={browserHistory}>
		<Route path="/" component={App} onEnter={loadSettings}>
			<Route path="login" component={Login}/>
			<Route path="dashboard" component={Dashboard}>
				<Route path="feed" component={Feed}/>
				<Route path="forums" component={Forums}/>
				<Route path="calendar" component={Calendar}/>
				<Route path="members" component={Members}/>
				<Route path="teams" component={Teams}/>
				<Route path="settings" component={Settings}/>
			</Route>
			
		</Route>
	</Router>, 
	document.getElementById('app'));