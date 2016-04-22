var Home = React.createClass({ 
	displayName:'Home',
	componentWillMount: function() {
		// Check if the user is already logged in.
	},
	render: function() {

		return (
				<div className="main_container">
					<h1>GuildMate</h1>
					<p>Ready to make an awesome community for your gaming guild/clan?</p>
				</div>
			);
	}
});

ReactDOM.render(<Home />, document.getElementById('app'));