import React from 'react';
import {Link} from 'react-router'
import EventStore from '../../stores/event-store'
import EventActions from '../../actions/event-actions'
import moment from 'moment'
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
    this.changeDescription = this.changeDescription.bind(this);
    this.changeStartTime = this.changeStartTime.bind(this);
    this.changeEndTime = this.changeEndTime.bind(this);
    this.toggleAllDay = this.toggleAllDay.bind(this);
    this.saveEvent = this.saveEvent.bind(this);

    this.state = this.props.event;
  }

  changeTitle(e) {
  	if (e.target.value !== "") {
  		this.setState({title:e.target.value});
  	}
  }

  changeDescription(e) {
    this.setState({description:e.target.value});
  }

  changeStartTime(e) {
    this.setState({start:e.target.value.toString()});
  }

  changeEndTime(e) {
    this.setState({end:e.target.value.toString()});
  }

  toggleAllDay() {
    var allDay = !this.state.allDay;
    this.setState({allDay:allDay});
  }

  goToMember(e) {
    console.log(e.target.dataset.memberId);
  }

  saveEvent() {
  	EventActions.saveExistingEvent(this.state);
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
    var self = this;
  	var endTime = null;
    var allDayClass = "event_allday";
    allDayClass += (this.state.allDay ? " checked" : "");
    console.log(allDayClass);
    if (!this.state.allDay) {
      endTime = (<div className="event_enddate_area">
           <p>End Date:</p>
           <input className="event_enddate" type="datetime-local" onChange={this.changeEndTime} value={moment(this.state.end).format("YYYY-MM-DDThh:mm:ss.ms")}/>
          </div>);
    }
    return  (<div className="event">
    			<a className="go_back" onClick={this.goBack}></a>
    			<input className="event_title" type="text" onChange={this.changeTitle} value={this.state.title}/>
          <div className="event_startdate_area">
           <p>Start Date:</p>
           <input className="event_startdate" type="datetime-local" onChange={this.changeStartTime} value={moment(this.state.start).format("YYYY-MM-DDThh:mm:ss.ms")}/>
          </div>
          <a className={allDayClass} onClick={this.toggleAllDay}>All Day</a>
          {endTime}
    			<div className="event_description_area">
            <p>Description:</p>
            <input className="event_description" type="text" onChange={this.changeDescription} value={this.state.description}/>
          </div>
          <div className="event_member_area">
          <p>Members:</p>
          <ul className="event_member_list">
          {
            this.state.members.map(function(member) {
              console.log(member.id);
              return (<li><a onClick={self.goToMember} data-member-id={member.id}>{member.name}</a></li>);
            })
          }
          </ul>
          </div>
    			<a className="save_event" onClick={this.saveEvent}>Save</a>
    		 </div>	
    	)
  }
}

export default EditEventModal;