// Реализуйте страницу шоу.

// Используйте метод connect и mapStateToProps, mapDispatchToProps,
// чтобы получить ссылку на поле show вашего стейта
// и экшн showRequest.

// В методе componentDidMount вам нужно будет диспатчить showRequest action
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchShowRequest } from '../../actions';
import { getIsFetching, getEntities } from '../../reducers/shows';
import styles from './ShowPage.module.css';

class ShowPage extends Component {
  componentDidMount = () => {
    const {
      match: {
        params: { id }
      },
      fetchShowRequest
    } = this.props;
    fetchShowRequest(id);
  };

  render() {
    const {
      match: {
        params: { id }
      }
    } = this.props;
    const { entities, isFetching } = this.props;

    return (
      <>
        {isFetching && <p>Загузка</p>}
        {!isFetching &&
          entities.length > 0 &&
          entities.map(entity => {
            if (entity.id != id) return null;
            return (
              <div key={entity.id}>
                <p>{entity.name}</p>
                <img src={entity.image.medium} alt={entity.name} />
                <div dangerouslySetInnerHTML={{ __html: entity.summary }} />
                <div className={styles.cast}>
                  {entity._embedded.cast.map(item => (
                    <div className="t-person" key={item.person.id}>
                      <p>{item.person.name}</p>
                      <img
                        src={item.person.image.medium}
                        alt={item.person.name}
                      />
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
      </>
    );
  }
}

const mapStateToProps = state => ({
  isFetching: getIsFetching(state),
  entities: getEntities(state)
});

const mapDispatchToProps = { fetchShowRequest };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ShowPage);
