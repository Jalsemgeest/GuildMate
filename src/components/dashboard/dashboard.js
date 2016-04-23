import React from 'react';
import MenuItem from './menu-item'
import NavStore from '../../stores/nav-store'
import {Link} from 'react-router'

function getState() {
  return {
    menu:NavStore.getMenu()
  }
}

class Dashboard extends React.Component {

  constructor(props) {
    super(props);

    this._onChange = this._onChange.bind(this);

    this.state = getState();
  }

  componentDidMount() {
    // NavStore.addChangeListener(this._onChange);
  }

  componentWillUnmount() {
    // NavStore.removeChangeListener(this._onChange);
  }

  _onChange() {
    this.setState(getState());
  }

  render() {
    return <div className="main-container">
      <div className="nav">
        <div className="nav-inner">
          <div className="text-center logo-container">
          </div>
          <div className="user-profile">
            <div className="name-container">
              <Link to="/dashboard/me" className="name">Fury</Link>
            </div>
          </div>
          <ul className="list-unstyled">
            {
              this.state.menu.map(function(item, i) {
                console.log(item.display);
                return <MenuItem 
                  display={item.display}
                  route={item.route}
                  subitems={item.children}
                  active={item.active}
                  key={i}/>
              })
            }
          </ul>
        </div>
      </div>
      <div className="content container-fluid">
        {this.props.children}
      </div>
    </div>
  }
}

export default Dashboard;