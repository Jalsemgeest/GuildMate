import React from 'react';
import {Link} from 'react-router'
import EventStore from '../../stores/event-store'
import EventActions from '../../actions/event-actions'

class NewEventModal extends React.Component {

  constructor(props) {
    super(props);

    this._onChange = this._onChange.bind(this);
    this.goBack = this.goBack.bind(this);

    // this.state = getState();
  }

  componentDidMount() {
    EventStore.addChangeListener(this._onChange);
  }

  componentWillUnmount() {
    EventStore.removeChangeListener(this._onChange);
  }

  _onChange() {
    // this.setState(getState());
  }

  goBack() {
  	EventActions.closeEventView();
  }

  render() {
  	console.log("PROPS");
    console.log(this.props);
    return  (<div>
    			<button onClick={this.goBack}>Go Back</button>
    			<h1>NEW EVENT FTW</h1>
    			<p>Start Date:<span>{this.props.date}</span></p>
    		 </div>	
    	)
  }
}

export default NewEventModal;