import React, { PureComponent } from 'react';
import Card from '../Card';
import './Todo.css';
import withLocalstorage from '../../HOCs/withLocalstorage';

class Todo extends PureComponent {
  state = {
    inputValue: ''
  };

  getId() {
    const { savedData } = this.props;
    const biggest = savedData.reduce((acc, el) => Math.max(acc, el.id), 0);
    return biggest + 1;
  }

  handleChange = event => {
    this.setState({ inputValue: event.target.value });
  };

  createNewRecordByEnter = event => {
    if (event.key === 'Enter') {
      this.createNewRecord();
    }
  };

  findItemIndexById = id => {
    const { savedData } = this.props;

    for (let i = 0; i < savedData.length; i++) {
      if (savedData[i]['id'] == id) {
        return i;
      }
    }
  };

  toggleRecordComplete = event => {
    event.persist();
    const { todoId } = event.target.dataset;
    const { saveData, savedData } = this.props;
    const index = this.findItemIndexById(todoId);
    const item = { ...savedData[index] };
    Object.assign(item, { isChecked: !item.isChecked });
    saveData(item, index);
  };

  createNewRecord = () => {
    const { inputValue } = this.state;
    const { saveData } = this.props;

    saveData({
      id: this.getId(),
      text: inputValue,
      isChecked: false
    });

    this.setState({ inputValue: '' });
  };

  render() {
    const { savedData } = this.props;

    return (
      <Card title="Список дел">
        <div className="todo t-todo-list">
          {this.renderEmptyRecord()}
          {savedData.length > 0 &&
            savedData.map(record => this.renderRecord(record))}
        </div>
      </Card>
    );
  }

  renderEmptyRecord() {
    const { inputValue } = this.state;
    return (
      <div className="todo-item todo-item-new">
        <input
          className="todo-input t-input"
          placeholder="Введите задачу"
          value={inputValue}
          onChange={this.handleChange}
          onKeyPress={this.createNewRecordByEnter}
        />
        <span className="plus t-plus" onClick={this.createNewRecord}>
          +
        </span>
      </div>
    );
  }

  renderRecord = record => {
    const { id, text, isChecked } = record;

    return (
      <div key={id} className="todo-item t-todo">
        <p className="todo-item__text">{text}</p>
        <span
          className="todo-item__flag t-todo-complete-flag"
          data-todo-id={id}
          onClick={this.toggleRecordComplete}
        >
          [{isChecked ? 'x' : ' '}]
        </span>
      </div>
    );
  };
}

export default withLocalstorage('todo-app', [])(Todo);
