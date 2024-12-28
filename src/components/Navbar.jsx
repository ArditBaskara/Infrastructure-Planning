import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const Bar = styled.nav`
  font-size: 18px;
  background-image: linear-gradient(260deg, rgb(100, 500, 200, 2) 0%, rgb(255, 255, 255) 100%);
  border: 1px solid rgba(0, 0, 0, 0.2);
  padding: 10px 20px;
  position: relative;
  @media (min-width: 768px) {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 30px;
    height: 70px;
  }
`;

const MainNav = styled.ul`
  list-style-type: none;
  display: ${(props) => props.display};
  flex-direction: column;
  align-items: center;
  margin: 0;
  padding: 0;
  background: white;
  position: absolute;
  top: 70px;
  left: 0;
  right: 0;
  z-index: 100;
  @media (min-width: 768px) {
    display: flex !important;
    position: static;
    flex-direction: row;
    justify-content: flex-end;
    background: transparent;
  }
`;

const NavLi = styled.li`
  text-align: center;
  margin: 10px 0;
  @media (min-width: 768px) {
    margin: 0 15px;
  }
`;

const NavLink = styled.a`
  text-decoration: none;
  color: black;
  font-size: 16px;
  font-weight: bold;
  &:hover {
    color: rgba(0, 0, 0, 0.6);
  }
  @media (min-width: 768px) {
    font-size: 18px;
  }
`;

const Logo = styled(NavLink)`
  font-size: 22px;
  margin-left: 10px;
  font-weight: bold;
  color: black;
  text-transform: uppercase;
  @media (min-width: 768px) {
    font-size: 24px;
  }
`;

const NavBarToggle = styled.span`
  position: absolute;
  top: 20px;
  right: 20px;
  cursor: pointer;
  color: black;
  font-size: 24px;
  z-index: 110;
  @media (min-width: 768px) {
    display: none;
  }
`;

const Hamburger = styled.img`
  content: url(data:image/svg+xml,%3Csvg%20height%3D%2232px%22%20id%3D%22Layer_1%22%20style%3D%22enable-background%3Anew%200%200%2032%2032%3B%22%20version%3D%221.1%22%20viewBox%3D%220%200%2032%2032%22%20width%3D%2232px%22%20xml%3Aspace%3D%22preserve%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%3E%3Cpath%20d%3D%22M4%2C10h24c1.104%2C0%2C2-0.896%2C2-2s-0.896-2-2-2H4C2.896%2C6%2C2%2C6.896%2C2%2C8S2.896%2C10%2C4%2C10z%20M28%2C14H4c-1.104%2C0-2%2C0.896-2%2C2%20%20s0.896%2C2%2C2%2C2h24c1.104%2C0%2C2-0.896%2C2-2S29.104%2C14%2C28%2C14z%20M28%2C22H4c-1.104%2C0-2%2C0.896-2%2C2s0.896%2C2%2C2%2C2h24c1.104%2C0%2C2-0.896%2C2-2%20%20S29.104%2C22%2C28%2C22z%22%2F%3E%3C%2Fsvg%3E);
  @media (min-width: 768px) {
    display: none;
  }
`;

class Navbar extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { displayNav: props.displayNav ? "flex" : "none" };
  }

  toggleNavBar() {
    this.setState((prevState) => ({
      displayNav: prevState.displayNav === "none" ? "flex" : "none",
    }));
  }

  render() {
    return (
      <Bar>
        <NavBarToggle onClick={() => this.toggleNavBar()}>
          <Hamburger />
        </NavBarToggle>
        <Logo href="#">Sistem Pakar</Logo>
        <MainNav display={this.state.displayNav}>
          <NavLi>
            <NavLink href="/">Beranda</NavLink>
          </NavLi>
          <NavLi>
            <NavLink href="#">Data Bencana</NavLink>
          </NavLi>
        </MainNav>
      </Bar>
    );
  }
}

Navbar.propTypes = {
  displayNav: PropTypes.bool,
};

export default Navbar;
