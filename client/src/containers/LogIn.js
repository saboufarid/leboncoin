import React from "react";
import axios from "axios";

class LogIn extends React.Component {
  state = {
    email: "",
    password: ""
  };

  handleChange = event => {
    const name = event.target.name;
    const value = event.target.value;

    this.setState({
      [name]: value
    });
  };

  createAccount = event => {
    this.props.history.push("/sign_up");
    event.preventDefault();
  };

  onSubmit = event => {
    const { email, password } = this.state;
    axios
      .post(`/api/user/log_in`, {
        email,
        password
      })
      .then(response => {
        if (response.data && response.data.token) {
          this.props.setUser({
            token: response.data.token,
            username: response.data.account.username,
            _id: response.data._id
          });

          this.props.history.push("/");
        }
      })
      .catch(err => {
        console.log(err);
      });
    event.preventDefault();
  };

  render() {
    return (
      <div className="body">
        <div className="box_1024 box_content">
          <div className="box_600">
            <form onSubmit={this.onSubmit} className="form form-login">
              <h2>Connexion</h2>
              <hr />
              <label htmlFor="email">Adresse email</label>
              <input
                className="input"
                id="email"
                name="email"
                type="text"
                required
                value={this.state.email}
                onChange={this.handleChange}
              />
              <label htmlFor="password">Mot de passe</label>
              <input
                className="input"
                id="password"
                name="password"
                type="password"
                required
                value={this.state.password}
                onChange={this.handleChange}
              />
              <input
                className="input submit"
                type="submit"
                value="Se connecter"
              />
            </form>
            <hr />
            <form className="form form-login">
              <h3>Vous n'avez pas de compte ?</h3>
              <input
                onClick={this.createAccount}
                className="input button"
                type="button"
                value="Créer un compte"
              />
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default LogIn;
