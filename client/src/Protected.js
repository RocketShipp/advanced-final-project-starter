import React, {Component} from 'react';
import {} from 'react-bootstrap';
import axios from 'axios';


class Protected extends Component {
  constructor() {
    super();

    this.state = {
      thing: ''
    };
  }
  render() {
    return (
      <div className="flexBoxCenterThis">
        <h1>Protected page baby!</h1>
      </div>
    );
  }
}

export default Protected;
