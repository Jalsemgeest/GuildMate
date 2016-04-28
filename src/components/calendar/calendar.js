import React from 'react';
import {Link} from 'react-router'
import EventStore from '../../stores/event-store'
import EventActions from '../../actions/event-actions'
import EventInfo from '../../enums/event-info'
import moment from 'moment'
import BigCalendar from 'react-big-calendar'
import NewEventModal from './new-event-modal'

function getState() {
  return {
    events: EventStore.getEvents(),
    newEvent: EventStore.getNewEvent()
  }
}

class Calendar extends React.Component {

  constructor(props) {
    super(props);

    this._onChange = this._onChange.bind(this);
    this.clickEvent = this.clickEvent.bind(this);
    this.selectDate = this.selectDate.bind(this);

    this.state = getState();

    BigCalendar.setLocalizer(
      BigCalendar.momentLocalizer(moment)
    );
  }

  componentDidMount() {
    EventStore.addChangeListener(this._onChange);
  }

  componentWillUnmount() {
    EventStore.removeChangeListener(this._onChange);
  }

  clickEvent(e) {
    console.log(e.title);    
  }

  selectDate(dateInfo) {
    console.log(dateInfo.start);
    console.log(this.state.selectedDate);
    if (this.state.selectedDate === dateInfo.start.toString()) {
      console.log("IT'S THE SAME");
      EventActions.setNewEventDate(this.state.selectedDate);
      this.setState({isNewEventOpen:true});
    } else {
      console.log("Setting selected date");
      this.setState({selectedDate: dateInfo.start.toString()});
    }
  }

  _onChange() {
    this.setState(getState());
  }

  render() {
    // var newEvents = [
    //   {
    //     'title': 'All Day Event',
    //     'allDay': true,
    //     'start': new Date(2016, 4, 26),
    //     'end': new Date(2016, 4, 27)
    //   }
    // ]
    // console.log("EVENTS");
    // console.log(this.state.events);
    if (this.state.newEvent.start) {
      return  (<NewEventModal
                        date={this.state.newEvent.start.toString()} />
                        );
    }
    return  <BigCalendar
                  selectable
                  events={this.state.events}
                  defaultDate={new Date(Date.now())}
                  onSelectEvent={this.clickEvent}
                  onSelectSlot={this.selectDate} />
  }
}

export default Calendar;