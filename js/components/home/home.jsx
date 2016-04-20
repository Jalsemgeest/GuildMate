var Home = React.createClass({ 
	displayName:'Home',
	componentWillMount: function() {
		// Check if the user is already logged in.
	},
	render: function() {

		return (
				<h1>GuildMate</h1>
			);
	}
});

ReactDOM.render(<Home />, document.getElementById('app'));