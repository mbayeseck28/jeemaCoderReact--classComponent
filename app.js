// Composant Bouton
class Boutons extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <button
        type="submit"
        className={`btn text-white ${this.props.longueur} ${this.props.btnColor}`}
        onClick={this.props.action}
      >
        {this.props.text}
        <i className={`fa-regular ${this.props.fa}`}></i>
      </button>
    );
  }
}

class Formulaire extends React.Component {
  render() {
    return (
      <div className="d-flex justify-content-center">
        <form
          className="shadow p-4"
          onSubmit={this.props.handleSubmit.bind(this)}
        >
          <div className="row">
            <div className="col-sm-6 mb-4 ">
              <input
                type="text"
                className="form-control"
                placeholder="Prénom"
                value={this.props.prenom}
                onChange={this.props.handleChangePrenom.bind(this)}
                required
              />
            </div>
            <div className="col-sm-6 mb-4">
              <input
                type="text"
                className="form-control"
                placeholder="Nom"
                value={this.props.nom}
                onChange={this.props.handleChangeNom.bind(this)}
                required
              />
            </div>
            <div className="col-sm-6 mb-4">
              <input
                type="email"
                className="form-control"
                placeholder="Email"
                value={this.props.email}
                onChange={this.props.handleChangeEmail.bind(this)}
                required
              />
            </div>
            <div className="col-sm-6 mb-4">
              <input
                type="tel"
                className="form-control"
                placeholder="Téléphone"
                value={this.props.telephone}
                onChange={this.props.handleChangeTel.bind(this)}
                required
              />
            </div>
          </div>
          <div className="col-12">
            <Boutons
              btnColor={this.props.couleur}
              text={this.props.fonction}
              longueur="w-100"
            />
          </div>
        </form>
      </div>
    );
  }
}
// **********Composants Tableau*************
class LigneTable extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <React.Fragment>
        {this.props.table.length === 0 ? (
          <tr>
            <td className="text-center text-danger" colspan="5">
              Le tableau est vide
            </td>
          </tr>
        ) : (
          this.props.table.map((ligne) => (
            <tr key={ligne.id}>
              <td>{ligne.prenom}</td>
              <td>{ligne.nom}</td>
              <td>{ligne.email}</td>
              <td>{ligne.telephone}</td>
              <td className="d-flex gap-2 d-flex align-items-center py-md-2 py-4">
                <Boutons
                  btnColor="btn-warning"
                  // text="Modifier"
                  fa="fa-pen-to-square"
                  action={() => this.props.handleUpdate(ligne.id)}
                />
                <Boutons
                  btnColor="btn-danger"
                  // text="Supprimer"
                  fa="fa-trash-can"
                  action={() => this.props.handleDelete(ligne.id)}
                />
              </td>
            </tr>
          ))
        )}
      </React.Fragment>
    );
  }
}

// Tableau
class Tableau extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="p-3  border-opacity-25 m-auto table-responsive-md">
        <table className="w-100 table table-striped table-hover">
          <thead className="border">
            <tr className="border border-black border-start-0 border-top-0 border-end-0 border-1">
              <td className="fw-bold p-2 ">Prenom</td>
              <td className="fw-bold p-2 ">Nom</td>
              <td className="fw-bold p-2 ">Email</td>
              <td className="fw-bold p-2 ">Telephone</td>
              <td className="fw-bold p-2 text-center">Actions</td>
            </tr>
          </thead>
          <tbody className="">
            <LigneTable
              table={this.props.table}
              handleUpdate={this.props.handleUpdate}
              handleDelete={this.props.handleDelete}
            />
          </tbody>
        </table>
      </div>
    );
  }
}

// Composant de base
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        prenom: '',
        nom: '',
        email: '',
        telephone: '',
      },
      listUsers: [],
      fonction: 'Ajouter',
      couleur: 'btn-success',
      cleAmodifier: '',
    };
  }
  // Handle Change
  handleChangePrenom = (e) => {
    this.setState({
      user: { ...this.state.user, prenom: e.target.value },
    });
  };
  handleChangeNom = (e) => {
    this.setState({
      user: { ...this.state.user, nom: e.target.value },
    });
  };
  handleChangeEmail = (e) => {
    this.setState({
      user: { ...this.state.user, email: e.target.value },
    });
  };
  handleChangeTel = (e) => {
    this.setState({
      user: { ...this.state.user, telephone: e.target.value },
    });
  };

  // Condition de soumission du formulaire
  handleConditionSubmit = (e) => {
    const condition = this.state.fonction == 'Ajouter';
    condition ? this.handleSubmit(e) : this.handleSubmitModif(e);
  };

  // Ajouter les données
  handleSubmit = (e) => {
    e.preventDefault();
    if (
      this.state.user.prenom !== '' &&
      this.state.user.nom !== '' &&
      this.state.user.email !== '' &&
      this.state.user.telephone !== ''
    ) {
      const newUser = {
        id: Math.floor(Math.random() * 100000000000),
        prenom: this.state.user.prenom,
        nom: this.state.user.nom,
        email: this.state.user.email,
        telephone: this.state.user.telephone,
      };
      this.setState((prev) => ({
        listUsers: [...prev.listUsers, newUser],
        user: {
          prenom: '',
          nom: '',
          email: '',
          telephone: '',
        },
      }));
    }
  };

  // Modification de Tache
  handleUpdate = (cle) => {
    const newList = this.state.listUsers.filter((list) => list.id == cle);
    newList.map((list) => {
      this.setState({
        couleur: 'btn-warning',
        fonction: 'Modifier',
        cleAmodifier: list.id,
        user: {
          prenom: list.prenom,
          nom: list.nom,
          email: list.email,
          telephone: list.telephone,
        },
      });
    });
    console.log(this.state.cleAmodifier);
  };

  // Soumettre la modification des taches
  handleSubmitModif = (e) => {
    e.preventDefault();
    const listeAmodifier = this.state.listUsers.map((list) => {
      if (list.id === this.state.cleAmodifier) {
        return {
          ...list,
          nom: this.state.user.nom,
          prenom: this.state.user.prenom,
          email: this.state.user.email,
          telephone: this.state.user.telephone,
        };
      }
      return list;
    });

    this.setState({
      listUsers: listeAmodifier,
      couleur: 'btn-success',
      fonction: 'Ajouter',
      user: {
        prenom: '',
        nom: '',
        email: '',
        telephone: '',
      },
    });
  };

  // Suppression de Tache
  handleDelete = (cle) => {
    const newList = this.state.listUsers.filter((list) => list.id !== cle);
    this.setState({
      listUsers: newList,
    });
  };

  render() {
    return (
      <div className="container my-4">
        <h4 className="text-center my-4">Jeemacoder Gestion Utilisateurs</h4>
        <Formulaire
          prenom={this.state.user.prenom}
          nom={this.state.user.nom}
          email={this.state.user.email}
          telephone={this.state.user.telephone}
          couleur={this.state.couleur}
          fonction={this.state.fonction}
          handleChangePrenom={this.handleChangePrenom}
          handleChangeNom={this.handleChangeNom}
          handleChangeEmail={this.handleChangeEmail}
          handleChangeTel={this.handleChangeTel}
          handleSubmit={this.handleConditionSubmit}
        />
        <div className="my-5">
          <hr />
        </div>
        <Tableau
          table={this.state.listUsers}
          handleUpdate={this.handleUpdate}
          handleDelete={this.handleDelete}
        />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
