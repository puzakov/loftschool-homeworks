import React, { Component } from 'react';
import { load, save } from '../../localstorage';

const APP_DATA_KEY = 'APP_DATA_KEY';

const withLocalstorage = (item, defaultValue) => WrappedComponent => {
  const initData = () => {
    const data = load(APP_DATA_KEY);
    return data ? data : defaultValue;
  };

  return class extends Component {
    state = {
      data: initData()
    };

    saveData = (item, index) => {
      const { data } = this.state;
      
      let resultData;
      if (index === undefined) {
        resultData = [...data, item];
      } else { 
        resultData = [...data];
        resultData[index] = item;
      }
      this.setState({ data: resultData }, () => save(APP_DATA_KEY, resultData));
    };

    render() {
      const { data } = this.state;
      return (
        <WrappedComponent
          saveData={this.saveData}
          savedData={data}
          {...this.props}
        />
      );
    }
  };
};

export default withLocalstorage;
