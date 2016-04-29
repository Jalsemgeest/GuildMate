import React from 'react';
import {Link} from 'react-router'
import EventStore from '../../stores/event-store'
import EventActions from '../../actions/event-actions'

// function getDefaultState(startDate) {
// 	return {
// 		start:startDate,
// 		end:startDate,
// 		description:'',
// 		title:'Event'
// 	}
// }

class EditEventModal extends React.Component {

  constructor(props) {
    super(props);

    this._onChange = this._onChange.bind(this);
    this.goBack = this.goBack.bind(this);
    this.changeTitle = this.changeTitle.bind(this);
    this.saveEvent = this.saveEvent.bind(this);

    // this.state = this.props.event;
  }

  changeTitle(e) {
  	this.setState({title:e.target.value});
  }

  saveEvent() {
  	// EventActions.saveEvent(this.state);
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
  	console.log(this.props);
    return  (<div>
    			<button onClick={this.goBack}>Go Back</button>
    			<input type="text" onChange={this.changeTitle} value={this.props.title}/>
    			<p>Start Date:<span>{this.props.start.toString()}</span></p>
    			<p>End Date:<span>{this.props.end.toString()}</span></p>
    			<button onClick={this.saveEvent}>Save</button>
    		 </div>	
    	)
  }
}

export default EditEventModal;