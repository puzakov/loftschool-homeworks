import React, { Component } from 'react';
import { withAuth } from '../../context/Auth';
import { Redirect } from 'react-router-dom';

import styles from './LoginForm.module.css';

class LoginForm extends Component {
  state = {
    email: '',
    password: ''
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleSubmit = () => {
    const { email, password } = this.state;
    const { authorize } = this.props;
    authorize(email, password);
  };

  render() {
    const { email, password } = this.state;
    const { authError, isAuthorized } = this.props;

    if (isAuthorized) return <Redirect to="/" />;

    return (
      <div className={styles.bg}>
        <div className={styles.form + ' t-form'}>
          <p>
            <label htmlFor="email">
              <span className={styles.labelText}>Почта</span>
            </label>
            <input
              type="text"
              name="email"
              className={styles.input + ' t-input-email'}
              value={email}
              onChange={this.handleChange}
            />
          </p>
          <p>
            <label htmlFor="password">
              <span className={styles.labelText}>Пароль</span>
            </label>
            <input
              type="password"
              name="password"
              className={styles.input + ' t-input-password'}
              value={password}
              onChange={this.handleChange}
            />
          </p>
          {authError !== '' && <p className={styles.error}>{authError}</p>}
          <div className={styles.buttons}>
            <button className={styles.button + ' t-login'} onClick={this.handleSubmit}>
              Войти
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default withAuth(LoginForm);
