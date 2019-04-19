import React, { Component } from 'react';
import './Show.css';

const showKeyMatcher = {
  house: 118,
  santaBarbara: 5909,
  bigBang: 66
};

class Show extends Component {
  state = {
    showId: null,
    data: {
      genres: [],
      name: '',
      summary: '',
      image: []
    }
  };

  componentDidUpdate = (
    { showId: prevPropShowId },
    { showId: prevStateShowId }
  ) => {
    const { showId } = this.props;
    if (prevPropShowId === showId) {
      return;
    }
    console.log(prevPropShowId + '=>' + showId);

    fetch(`http://api.tvmaze.com/shows/${showKeyMatcher[showId]}`)
      .then(response => response.json())
      .then(({ genres, name, summary, image }) => {
        this.setState({
          showId: showId,
          data: { genres, name, summary, image }
        });
      });
  };

  render() {
    const { showId, data } = this.state;
    console.log(data);
    return showId ? (
      <div className="show">
        <img className="show-image" src={data.image.original} alt={data.name} />
        <h2 className="show-label t-show-name">{data.name}</h2>
        <p className="show-text t-show-genre">
          <b>Жанр: </b>
          {data.genres.join(', ')}
        </p>
        <p
          className="show-text t-show-summary"
          dangerouslySetInnerHTML={{ __html: data.summary }}
        />
      </div>
    ) : (
      <p className="show-inforation t-show-info">Шоу не выбрано</p>
    );
  }
}

export default Show;
