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
		'id':456,
		'members':[
      {
        name:"Fury",
        id:1
      },{
        name:"Rukul",
        id:2
      },
      {
        name:"Fury",
        id:1
      },{
        name:"Rukul",
        id:2
      },
      {
        name:"Fury",
        id:1
      },{
        name:"Rukul",
        id:2
      },
      {
        name:"Fury",
        id:1
      },{
        name:"Rukul",
        id:2
      },
      {
        name:"Fury",
        id:1
      }]
	},
	{
		'start': new Date(Date.now() - (24 * 60 * 60 * 1000)),
		'end': new Date(Date.now() - (24 * 60 * 60 * 1000)),
		'title':"Yesterdays Event",
		'allDay':true,
		'id':123,
		'members':[
      {
        name:"Fury",
        id:1
      }]
	}
];

var newEventId = 1;
var newEvent = {};
var selectedEvent = {};
  

class EventStoreClass extends BaseStoreClass {
  getEvents() {
    return _events;
  }
  getNewEvent() {
  	return newEvent;
  }
  getSelectedEvent() {
  	return selectedEvent;
  }
  getEvent(id) {
    for (var i = 0; i < _events.length; i++) {
      if (_events[i].id === id) {
        return _events[i];
      }
    }
    return null;
  }
  getEventIndex(id) {
    for (var i = 0; i < _events.length; i++) {
      if (_events[i].id === id) {
        return i;
      }
    }
    return null;
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
      // _events.push(newEvent);
      newEvent = {};
      EventStore.emitChange();
      break;

    case EventConstants.SET_NEW_EVENT_DATE:
      newEvent.start = new Date(data.date);
      newEvent.end = new Date(newEvent.start);
      newEvent.title = "";
      newEvent.allDay = true;
      newEvent.id = 1;
      newEvent.members = [
        {
          name:"Fury",
          id:1
        }, {
          name:"Rukul",
          id:2
        }];
      EventStore.emitChange();
      break;

    case EventConstants.SAVE_NEW_EVENT:
    	data.event.id = newEventId;
    	newEventId++;
      _events.push(data.event);
      newEvent = {};
      EventStore.emitChange();
      break;

    case EventConstants.SAVE_EXISTING_EVENT:
      _events[getEventIndex(data.event.id)] = data.event;
			break;
    	EventStore.emitChange();
    	break;

    case EventConstants.VIEW_SELECTED_EVENT:
      selectedEvent = data.event;
      EventStore.emitChange();
      break;
  }
});

export default EventStore;

