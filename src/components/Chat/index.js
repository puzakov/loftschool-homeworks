import React, { Component } from 'react';
import Message from '../Message';
import './Chat.css';

class Chat extends Component {
  state = {
    messages: [],
    messageInput: ''
  };

  changeInputMessage = event => {
    this.setState({ messageInput: event.target.value });
  };

  sendMessageOnEnter = event => {
    if (event.key === 'Enter') {
      this.setState(
        {
          messages: [...this.state.messages, { text: this.state.messageInput }]
        },
        () => this.setState({ messageInput: '' })
      );
    }
  };

  render() {
    const { messages, messageInput } = this.state;

    return (
      <div className="chat">
        <div className="message-list">
          <div className="messages">
            {messages.length > 0 &&
              messages.map((item, index) => (
                <Message text={item.text} key={index} />
              ))}
          </div>
        </div>
        <input
          className="input-message"
          value={messageInput}
          onChange={this.changeInputMessage}
          onKeyPress={this.sendMessageOnEnter}
          type="text"
        />
      </div>
    );
  }
}

export default Chat;
