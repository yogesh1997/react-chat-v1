import React from "react";
import {
  Grid,
  Form,
  segment,
  Button,
  Header,
  Message,
  Icon
} from "semantic-ui-react";
import { Link } from "react-router-dom";
import firebase from "../../firebase";
import "../App.css";

class Login extends React.Component {
  state = {
    email: "",
    password: "",
    errors: [],
    loading: false
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  displayErrors = errors =>
    errors.map((error, i) => {
      return <p key={i}>{error.message}</p>;
    });

  handleSubmit = event => {
    event.preventDefault();
    if (this.isFormValid(this.state)) {
      this.setState({ erros: [], loading: true });
      firebase
        .auth()
        .signInWithEmailAndPassword(this.state.email, this.state.password)
        .then(signedInUser => {
          console.log(signedInUser);
          this.setState({ loading: false });
        })
        .catch(err => {
          console.log(err);
          this.setState({
            errors: this.state.errors.concat(err),
            loading: false
          });
        });
    }
  };

  isFormValid = ({ email, password }) => {
    return email && password;
  };

  render() {
    return (
      <Grid textAlign="center" verticalAlign="middle" className="app">
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as="h2" icon color="violet" textAlign="center" color="violet">
            <Icon name="code branch" color="violet" />
            Login for Chat
          </Header>
          <Form onSubmit={this.handleSubmit} size="large">
            <segment stacked="true">
              <Form.Input
                fluid
                name="email"
                icon="mail"
                iconPosition="left"
                placeholder="Email Address"
                onChange={this.handleChange}
                type="email"
              />
              <Form.Input
                fluid
                name="password"
                icon="lock"
                iconPosition="left"
                placeholder="Password"
                onChange={this.handleChange}
                type="password"
              />

              <Button
                disabled={this.state.loading}
                className={this.state.loading ? "loading" : ""}
                color="violet"
                fluid
                size="large"
              >
                Submit
              </Button>
            </segment>
          </Form>
          {this.state.errors.length > 0 && (
            <Message error>
              <h3>Error</h3>
              {this.displayErrors(this.state.errors)}
            </Message>
          )}
          <Message>
            Don't have account ? <Link to="/register">Register</Link>
          </Message>
        </Grid.Column>
      </Grid>
    );
  }
}

export default Login;
