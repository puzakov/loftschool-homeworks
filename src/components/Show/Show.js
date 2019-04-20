import React, { Component } from 'react';
import { getShowInfo } from '../../api';
import './Show.css';

class Show extends Component {
  state = {
    showId: '',
    data: {
      genres: [],
      name: '',
      summary: '',
      image: []
    }
  };

  static getDerivedStateFromProps(props, state) {
    console.log('gDSFP props');
    console.log(props);

    const { showId: stateShowId } = state;
    const { showId: propShowId } = props;

    let newState = null;
    if (propShowId !== stateShowId) {
      newState = { ...props };
    }
    return newState;
  }
  
  componentDidUpdate(prevProps, { showId: prevShowId}) {
    const { showId } = this.state;
    if (prevShowId === showId) {
      return
    }
    getShowInfo(showId).then(({ genres, name, summary, image }) => {
      this.setState({
        data: { genres, name, summary, image }
      });
    });
  }

  render() {
    const { showId, data } = this.state;
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
