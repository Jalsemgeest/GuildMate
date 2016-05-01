import React from 'react';
import {Link} from 'react-router'
import EventStore from '../../stores/event-store'
import EventActions from '../../actions/event-actions'
import EventInfo from '../../enums/event-info'
import moment from 'moment'
import BigCalendar from 'react-big-calendar'
import NewEventModal from './new-event-modal'
import EditEventModal from './edit-event-modal'

function getState() {
  return {
    events: EventStore.getEvents(),
    newEvent: EventStore.getNewEvent(),
    selectedEvent: EventStore.getSelectedEvent()
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
    if (this.state.selectedEvent === e) {
      console.log("DOUBLE CLICKED IT");
      // EventActions.viewSelectedEvent(e);
    } else {
      this.setState({selectedEvent:e});
    }
  }

  selectDate(dateInfo) {
    if (this.state.selectedDate === dateInfo.start.toString()) {
      EventActions.setNewEventDate(this.state.selectedDate);
      this.setState({isNewEventOpen:true});
    } else {
      this.setState({selectedDate: dateInfo.start.toString()});
    }
  }

  _onChange() {
    this.setState(getState());
  }

  render() {
    console.log(this.state.selectedEvent);
    if (this.state.newEvent.start) {
      return  (<NewEventModal
                        date={this.state.newEvent.start.toString()} />
                        );
    } else if (this.state.selectedEvent.start) {
      return (<EditEventModal
                        event={this.state.selectedEvent} />);
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