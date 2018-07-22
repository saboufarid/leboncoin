import React from "react";
import axios from "axios";

class SignUp extends React.Component {
  state = {
    email: "",
    password: "",
    username: "",
    partenaires: false,
    conditions: false
  };

  handleChange = event => {
    const target = event.target;
    const name = target.name;
    const value = target.type === "checkbox" ? target.checked : target.value;

    this.setState({
      [name]: value
    });
  };

  onSubmit = event => {
    axios
      .post(`/api/user/sign_up`, {
        email: this.state.email,
        password: this.state.password,
        username: this.state.username
      })
      .then(response => {
        // console.log(response.data);
        // {
        //   account: { username: "Farid" },
        //   token: "Ii0HYfXTN7L2SMoL",
        //   _id: "5b4ceb668c2a9a001440b2fb"
        // };

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
          <div className="left_elts">
            <h2>Pourquoi créer un compte ?</h2>
            <div className="elt">
              <i className="far fa-clock" />
              <div>
                <h3>Gagnez du temps</h3>
                <h4>
                  Publiez vos annonces rapidement, avec vos informations
                  pré-remplies chaque fois que vous souhaitez déposer une
                  nouvelle annonce.
                </h4>
              </div>
            </div>

            <div className="elt">
              <i className="fas fa-bell" />
              <div>
                <h3>Soyez les premiers informés</h3>
                <h4>
                  Créez des alertes immo ou Emploi et ne manquez jamais
                  l'annonce qui vous intéresse.
                </h4>
              </div>
            </div>

            <div className="elt">
              <i className="fas fa-eye" />
              <div>
                <h3>Visibilité</h3>
                <h4>
                  Suivez les statistiques de vos annonces (nombre de fois où
                  votre annonce a été vue, nombre de contacts reçus).
                </h4>
              </div>
            </div>
          </div>

          <form onSubmit={this.onSubmit} className="form form-signup">
            <h2>Créer un compte</h2>
            <hr />
            <label htmlFor="pseudo">Pseudo</label>
            <input
              className="input"
              id="pseudo"
              name="username"
              type="text"
              required
              value={this.state.username}
              onChange={this.handleChange}
            />
            <label htmlFor="email">Email</label>
            <input
              className="input"
              id="email"
              name="email"
              type="email"
              required
              value={this.state.email}
              onChange={this.handleChange}
            />
            <label htmlFor="password">password</label>
            <input
              className="input"
              id="password"
              name="password"
              type="password"
              required
              value={this.state.password}
              onChange={this.handleChange}
            />
            <div>
              <input
                id="parteners"
                name="parteners"
                type="checkbox"
                value={this.state.parteners}
                onChange={this.handleChange}
              />
              Je souhaite recevoir des offres des partenaires du site leboncoin
              susceptibles de m'intéresser
            </div>
            <div>
              <input
                id="conditions"
                name="conditions"
                type="checkbox"
                required
                value={this.state.conditions}
                onChange={this.handleChange}
              />
              « J'accepte les <span>Conditions Générales de Vente</span> »
            </div>
            <input
              className="input submit"
              type="submit"
              value="Créer mon Compte Personnel"
            />
          </form>
        </div>
      </div>
    );
  }
}

export default SignUp;
