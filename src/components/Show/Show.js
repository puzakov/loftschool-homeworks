import React, { Component } from 'react';

const showKeyMatcher = {
  house: 118,
  santaBarbara: 5909,
  bigBang: 66
};

class Show extends Component {
  state = {
    showId: null,
    data: {}
  };

  componentDidUpdate = () => {
    const { showId: showKey } = this.props;
    const { showId } = this.state;
    this.setState(
      {
        showId: showKeyMatcher[showKey]
      },
      () => {
        fetch(`http://api.tvmaze.com/shows/${showId}`)
          .then(response => response.json())
          .then(({ genres, name, summary, image }) => {
            this.setState({ data: { genres, name, summary, image } });
          });
      }
    );
  };

  render() {
    return (
      <div className="show">
        <img
          class="show-image"
          src="http://static.tvmaze.com/uploads/images/original_untouched/43/109527.jpg"
          alt="House"
        />
        <h2 class="show-label t-show-name">House</h2>
        <p class="show-text t-show-genre">
          <b>Жанр: </b>Drama, Mystery, Medical
        </p>
        <p className="show-text t-show-summary">
          <p>
            Sink your teeth into meaty drama and intrigue with <b>House</b>,
            FOX's take on mystery, where the villain is a medical malady and the
            hero is an irreverent, controversial doctor who trusts no one, least
            of all his patients.
          </p>
        </p>
      </div>
    );
  }
}

export default Show;
