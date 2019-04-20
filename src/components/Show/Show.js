import React, { Component } from 'react';
import { getShowInfo } from '../../api';
import './Show.css';

class Show extends Component {
  state = {
    showId: '',
    data: null
  };

  componentDidMount() {
    const { showId } = this.props;
    if (!showId) {
      return;
    }
    console.log('componentDidMount ' + showId);
    getShowInfo(showId).then(({ genres, name, summary, image }) => {
      this.setState({
        showId,
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
