import BaseStoreClass from './base-store';
import AppDispatcher from '../dispatcher/dispatcher';
import NavConstants from '../constants/nav-constants'
import BaseConstants from '../constants/base-constants'

const _store = {
  menuItems: [{
    display: 'Feed',
    active:false,
    route:'/feed'
  }, {
    display: 'Forums',
    active:false,
    route:'/forums'
  }, {
    display: 'Calendar',
    active: false,
    route:'/calendar'
  }, {
    display: 'Members',
    active: false,
    route:'/members'
  }, {
    display: 'Teams',
    active:false,
    route: '/teams'
  }, {
    display: 'Settings',
    active:false,
    route:'/settings'
  }, {
    display: 'Logout',
    active:false,
    route: '/logout'
  }]
};

class NavStoreClass extends BaseStoreClass {
  getMenu() {
    return _store.menuItems;
  }
}

const NavStore = new NavStoreClass();

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
    case NavConstants.MENU_CLICKED:
      toggleMenu(data.path);
      NavStore.emitChange();
      break;
  }
});

export default NavStore;