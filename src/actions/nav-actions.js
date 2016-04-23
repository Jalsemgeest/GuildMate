import AppDispatcher from '../dispatcher/dispatcher'
import NavConstants from '../constants/nav-constants'
// import Configs from 'config'

export default {
  menuClick(pathName){
    AppDispatcher.send(NavConstants.MENU_CLICKED, {
      path: pathName
    });
  }
}