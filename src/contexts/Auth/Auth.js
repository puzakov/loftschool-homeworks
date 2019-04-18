import React, { PureComponent } from 'react';

const { Provider, Consumer: AuthConsumer } = React.createContext('');

const successCredentials = {
  email: 'stu@dent.com',
  password: '123'
};

class AuthProvider extends PureComponent {
  state = {
    isAuthorized: false,
    email: '',
    authorizeError: '',
  };

  getProviderValue = () => {
    return {
      ...this.state,
      authorize: this.authorize,
      logout: this.logout,
    }
  };

  authorize = (email, password) => {
    if (email === successCredentials.email && password === successCredentials.password) { 
      this.setState({
        isAuthorized: true,
        email: email,
        authorizeError: ''
      });
      return;
    }

    this.setState({authorizeError: 'Email или пароль введён не верно'});
  };

  logout = () => {
    this.setState({ isAuthorized: false });
  };

  render() {
    const { children } = this.props;
    return <Provider value={this.getProviderValue()}>{children}</Provider>;
  }
}

const TestProvider = Provider;

export { AuthProvider, AuthConsumer, TestProvider };
