import React, { Fragment } from "react";
import { NavLink, withRouter } from "react-router-dom";
import { Container } from "mdbreact";

class Header extends React.Component {
  onLogOut = event => {
    this.props.logOut();
    this.props.history.push("/");
    event.preventDefault();
  };
  renderNav() {
    if (this.props.user._id) {
      return (
        <Fragment>
          <li>
            <NavLink to="/publish">Déposer une offre</NavLink>
          </li>
          <div className="right_menu">
            <li className="menuItem">
              <NavLink to="/" onClick={this.onLogOut}>
                Déconnexion
              </NavLink>
            </li>
            <li className="menuItem">
              <NavLink to={"/profile/" + this.props.user._id}>
                {this.props.user.username}
              </NavLink>
            </li>
          </div>
        </Fragment>
      );
    }
    return (
      <div className="right_menu">
        <li className="menuItem">
          <NavLink to="/log_in">Se connecter</NavLink>
        </li>
        <li className="menuItem">
          <NavLink to="/sign_up">Créer un compte</NavLink>
        </li>
      </div>
    );
  }
  render() {
    return (
      <React.Fragment>
        <header>
          <Container className="align-items-center d-flex">
            <img src="https://static.leboncoin.fr/img/logo.svg" alt="" />
            <ul className="nav-list">
              <li>
                <NavLink to="/">Offres</NavLink>
              </li>
              {this.renderNav()}
            </ul>
          </Container>
        </header>

        <style jsx>{`
          a {
            color: white;
          }
        `}</style>
      </React.Fragment>
    );
  }
}

export default withRouter(Header);
