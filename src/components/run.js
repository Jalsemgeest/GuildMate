require('bootstrap-webpack');
require('font-awesome-webpack');
require('./style.scss');

import React from 'react'
import ReactDOM from 'react-dom'
import {Router, Route, IndexRoute, Link, browserHistory, IndexRedirect} from 'react-router'
import Dashboard from './dashboard/dashboard'
import App from './app'
import Login from './authentication/login'

function loadSettings() {
	console.log("Awesome");
}

ReactDOM.render(
	<Router history={browserHistory}>
		<Route path="/" component={App} onEnter={loadSettings}>
			<Route path="login" component={Login}/>
			<Route path="dashboard" component={Dashboard}>

			</Route>
		</Route>
	</Router>, 
	document.getElementById('app'));