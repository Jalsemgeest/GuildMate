import AppDispatcher from '../dispatcher/dispatcher'
import EventConstants from '../constants/event-constants'
// import Configs from 'config'

export default {
  getEvents(){
    AppDispatcher.send(EventConstants.GET_EVENTS);
  },

  startEvent(date) {
  	AppDispatcher.send(EventConstants.START_EVENT, {
  		date:date
  	});
  },

  closeEventView() {
  	AppDispatcher.send(EventConstants.CLOSE_NEW_EVENT_VIEW);
  },

  setNewEventDate(date) {
  	AppDispatcher.send(EventConstants.SET_NEW_EVENT_DATE, {
  		date:date
  	});
  },

  saveEvent(eventInfo) {
  	AppDispatcher.send(EventConstants.SAVE_NEW_EVENT, {
  		event:eventInfo
  	});
  },

  viewSelectedEvent(eventInfo) {
  	AppDispatcher.send(EventConstants.VIEW_SELECTED_EVENT, {
  		event:eventInfo
  	});
  }
}