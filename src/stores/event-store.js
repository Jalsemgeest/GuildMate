import BaseStoreClass from './base-store';
import AppDispatcher from '../dispatcher/dispatcher';
import BaseConstants from '../constants/base-constants'
import EventConstants from '../constants/event-constants'

const _events = [
	{
		'start': new Date(Date.now()),
		'end': new Date(Date.now()),
		'title':"Todays Event",
		'allDay':false,
		'id':456
	},
	{
		'start': new Date(Date.now() - (24 * 60 * 60 * 1000)),
		'end': new Date(Date.now() - (24 * 60 * 60 * 1000)),
		'title':"Yesterdays Event",
		'allDay':true,
		'id':123
	}
];

var newEvent = {};
  

class EventStoreClass extends BaseStoreClass {
  getEvents() {
    return _events;
  }
  getNewEvent() {
  	return newEvent;
  }
}

const EventStore = new EventStoreClass();

function toggleMenu(pathName) {
  var i;
  var item;

  for (i = 0; item = _store.menuItems[i]; i++) {
    item.active = item.display === pathName ? !item.active : false;
  }

}

AppDispatcher.register((payload) => {
  const action = payload.action;
  const data = payload.payload;

  switch (action) {
    case EventConstants.GET_EVENTS:

      EventStore.emitChange();
      break;

    case EventConstants.START_EVENT:
      EventStore.emitChange();
      break;

    case EventConstants.CLOSE_NEW_EVENT_VIEW:
      _events.push(newEvent);
      newEvent = {};
      EventStore.emitChange();
      break;

    case EventConstants.SET_NEW_EVENT_DATE:
      newEvent.start = new Date(data.date);
      newEvent.end = new Date(newEvent.start);
      newEvent.title = "This new event!";
      newEvent.allDay = true;
      newEvent.id = 1;
      EventStore.emitChange();
      break;
  }
});

export default EventStore;

