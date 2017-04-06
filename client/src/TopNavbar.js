import React, { PropTypes } from 'react';
import { Navbar, Nav, NavDropdown, MenuItem } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const TopNavbar = (props) => {
  return (
    <Navbar inverse collapseOnSelect id="myNav">
      <Navbar.Header>
        <Navbar.Brand>
          <Link to="/">Auth App</Link>
        </Navbar.Brand>
        { props.showNavItems ? <Navbar.Toggle /> : null }
      </Navbar.Header>
      {
        props.showNavItems ?
          <Navbar.Collapse>
            <Nav pullRight>
              <NavDropdown eventKey={1} title="My Account" id="basic-nav-dropdown"t>
                <MenuItem eventKey={1.1} onClick={props.onSignOut}>Sign Out</MenuItem>
                <MenuItem eventKey={1.2}>
                  <Link className="linkTo" to="/secret">Secret</Link>
                </MenuItem>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse> :
          null
      }
    </Navbar>
  );
};

TopNavbar.propTypes = {
  onSignOut: PropTypes.func.isRequired,
  // showNavItems: PropTypes.boolean.isRequired
};

export default TopNavbar;
