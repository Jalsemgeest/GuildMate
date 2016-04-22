import React from 'react';
import {Link} from 'react-router'

function getState() {
  return {
    name:'Jake'
  }
}

class App extends React.Component {

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
    return <div className="scribble-container">
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
            <li>Dashboard</li>
          </ul>
        </div>
      </div>
      <div className="content container-fluid">
        // {this.props.children}
      </div>
    </div>
  }
}

export default App;