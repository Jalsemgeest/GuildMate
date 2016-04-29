import React from 'react';
import {Link} from 'react-router'
import EventStore from '../../stores/event-store'
import EventActions from '../../actions/event-actions'

function getDefaultState(startDate) {
	return {
		start:startDate,
		end:startDate,
		description:'',
		title:'Event'
	}
}

class NewEventModal extends React.Component {

  constructor(props) {
    super(props);

    this._onChange = this._onChange.bind(this);
    this.goBack = this.goBack.bind(this);
    this.changeTitle = this.changeTitle.bind(this);
    this.saveEvent = this.saveEvent.bind(this);

    this.state = getDefaultState(this.props.date);
  }

  changeTitle(e) {
  	this.setState({title:e.target.value});
  }

  saveEvent() {
  	EventActions.saveEvent(this.state);
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
    return  (<div>
    			<button onClick={this.goBack}>Go Back</button>
    			<input type="text" onChange={this.changeTitle} value={this.state.title}/>
    			<p>Start Date:<span>{this.state.startDate}</span></p>
    			<button onClick={this.saveEvent}>Save</button>
    		 </div>	
    	)
  }
}

export default NewEventModal;