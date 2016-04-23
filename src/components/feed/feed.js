import React from 'react';
import {Link} from 'react-router'

class Feed extends React.Component {

  constructor(props) {
    super(props);

    this._onChange = this._onChange.bind(this);

    // this.state = getState();
  }

  componentDidMount() {
    // NavStore.addChangeListener(this._onChange);
  }

  componentWillUnmount() {
    // NavStore.removeChangeListener(this._onChange);
  }

  _onChange() {
    // this.setState(getState());
  }

  render() {
    return <div>
      		<h1>Feed</h1>
    	</div>
  }
}

export default Feed;