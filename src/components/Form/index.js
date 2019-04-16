import React, { Component } from 'react';
import Field from './components/Field';
import './Form.css';

const errors = {
  firstname: {
    empty: 'Нужно указать имя',
    wrong: 'Имя указано не верно'
  },
  lastname: {
    empty: 'Нужно указать фамилию',
    wrong: 'Фамилия указана не верно'
  },
  password: {
    empty: 'Нужно указать пароль',
    wrong: 'Пароль указан не верно'
  }
};

const success = {
  firstname: 'james',
  lastname: 'bond',
  password: '007'
};

class Form extends Component {
  state = {
    firstname: {
      title: 'Имя',
      type: 'text',
      value: '',
      error: ''
    },
    lastname: {
      title: 'Фамилия',
      type: 'text',
      value: '',
      error: ''
    },
    password: {
      title: 'Пароль',
      type: 'password',
      value: '',
      error: ''
    },
    isValid: false,
    isSubmitted: false
  };

  resetErrors = () => {
    Object.keys(errors).map(item => this.setFieldError('', item));
  };

  setFieldError = (error, fieldName) => {
    const field = { ...this.state[fieldName] };
    field.error = error;
    this.setState({ [fieldName]: field });
  };

  handleFieldChange = (value, fieldName) => {
    const field = { ...this.state[fieldName] };
    field.value = value;
    this.setState({ [fieldName]: field }, () => { 
      if (this.state.isSubmitted) {
        this.resetErrors();
        this.setState({ isSubmitted: false });
      }
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    const results = Object.keys(errors).map(item => {
      const { value } = this.state[item];
      const { empty, wrong } = errors[item];
      if (value === success[item]) {
        return true;
      }

      if (value.length === 0) {
        this.setFieldError(empty, item);
      } else {
        this.setFieldError(wrong, item);
      }

      return false;
    });

    this.setState({
      isValid: results.reduce((isValid, item) => isValid && item),
      isSubmitted: true
    });
  };

  checkEmpty = (value, fieldName) => {
    if (value.length === 0) {
      this.setFieldError('' + this.state[fieldName].toLowerCase(), fieldName);
    }
  };

  render() {
    return (
      <div className="app-container">
        {!this.state.isValid ? (
          <form className="form" onSubmit={this.handleSubmit}>
            <h1>Введите свои данные, агент</h1>
            {Object.keys(errors).map(item => (
              <Field
                {...this.state[item]}
                name={item}
                onChange={this.handleFieldChange}
                key={item}
              />
            ))}
            <div className="form__buttons">
              <input
                type="submit"
                className="button t-submit"
                value="Проверить"
              />
            </div>
          </form>
        ) : (
          <img
            src={require('./assets/bond_approve.jpg')}
            alt="bond approve"
            className="t-bond-image"
          />
        )}
      </div>
    );
  }
}

export default Form;
