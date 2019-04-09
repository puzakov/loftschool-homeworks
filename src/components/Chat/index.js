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
      const { messages } = this.state;
      messages.push({ text: this.state.messageInput });

      this.setState(
        {
          messages: messages
        },
        () => this.setState({ messageInput: '' })
      );
    }
  };

  render() {
    return (
      <div className="chat">
        <div className="message-list">
          <div className="messages">
            {this.state.messages.length > 0 &&
              this.state.messages.map((item, index) => (
                <Message text={item.text} key={index} />
              ))}
          </div>
        </div>
        <input
          className="input-message"
          value={this.state.messageInput}
          onChange={this.changeInputMessage}
          onKeyPress={this.sendMessageOnEnter}
          type="text"
        />
      </div>
    );
  }
}

export default Chat;
