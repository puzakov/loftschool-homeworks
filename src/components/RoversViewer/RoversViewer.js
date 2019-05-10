// Здесь вам нужно реализовать вью

// Подключите его к редакс роутеру
// Вам потребуются селекторы для получения выбранного сола
// и списка фотографий

// Так же вы будете диспатчить экшены CHANGE_SOL и FETCH_PHOTOS_REQUEST
// Эти экшены находятся в модуле ROVER PHOTOS
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPhotosRequest, changeSol } from '../../modules/RoverPhotos';
import SelectSol from '../SelectSol';
import RoverPhotos from '../RoverPhotos';
import styles from './RoversViewer.module.css';
import {
  getCurrentSol,
  getMaxSol,
  getMinSol
} from '../../modules/RoverPhotos/reducers/sol';
import { getRovers } from '../../modules/RoverPhotos/reducers/photos';

class RoversViewer extends Component {
  componentDidMount = () => {
    this.handleSolDataRequest();
  };

  handleChangeSol = data => {
    const { changeSol, rovers } = this.props;
    changeSol(data);

    const isExistedSol = Object.keys(rovers).reduce((result, name) => {
      return result || !!rovers[name][data];
    }, false);
    if (!isExistedSol) this.handleSolDataRequest();
  };

  handleSolDataRequest = () => {
    const { rovers, currentSol: sol, fetchPhotosRequest } = this.props;
    Object.keys(rovers).forEach(name => {
      fetchPhotosRequest({ name, sol });
    });
  };

  render() {
    const { rovers, currentSol, minSol, maxSol } = this.props;
    return (
      <div className={styles.root}>
        <SelectSol
          changeSol={this.handleChangeSol}
          minSol={minSol}
          maxSol={maxSol}
          selectedSol={currentSol}
        />
        <div className={styles.сontainer}>
          {Object.keys(rovers).map(name => {
            const roverSolItems = rovers[name][currentSol];
            if (!roverSolItems) return null;

            return (
              <RoverPhotos
                name={name}
                photos={roverSolItems.photos}
                key={name}
              />
            );
          })}
        </div>
      </div>
    );
  }
}

export default connect(
  state => ({
    currentSol: getCurrentSol(state),
    minSol: getMinSol(state),
    maxSol: getMaxSol(state),
    rovers: getRovers(state)
  }),
  { fetchPhotosRequest, changeSol }
)(RoversViewer);
