// Реализуйте страницу поиска.

// Используйте метод connect и mapStateToProps, mapDispatchToProps,
// чтобы получить ссылку на поле search вашего стейта
// и экшн searchRequest.

import React, { Component } from 'react';
import ShowPreview from '../ShowPreview';
import styles from './Search.module.css';
import { connect } from 'react-redux';
import { getIsFetching, getResult, getError } from '../../reducers/search';
import { fetchSearchRequest } from '../../actions';

class Search extends Component {
  state = {
    searchText: ''
  };

  handelSearchSubmit = event => {
    const { fetchSearchRequest } = this.props;
    const { searchText } = this.state;
    if (searchText.trim() === '') return;
    fetchSearchRequest(searchText);
  };

  handleSearchInputChange = event => {
    this.setState({ searchText: event.target.value });
  };

  render() {
    const { searchText } = this.state;
    const { isFetching, result, error } = this.props;
    return (
      <>
        {isFetching && <p>Выполняется поиск</p>}
        {!isFetching && !error && (
          <div>
            <div className={styles.previewList}>
              <input
                className={styles.input + ' t-input'}
                placeholder="Название сериала"
                value={searchText}
                onChange={this.handleSearchInputChange}
              />
              <div className={styles.buttonWrapper}>
                <button
                  className={styles.button + ' t-search-button'}
                  onClick={this.handelSearchSubmit}
                >
                  Найти
                </button>
              </div>
            </div>
            <div className={styles.searchPanel + ' t-search-result'}>
              {result.length > 0 &&
                result.map(item => <ShowPreview key={item.id} {...item} />)}
            </div>
          </div>
        )}
        {error && <p>Произошла ошибка: {error}</p>}
      </>
    );
  }
}

const mapStateToProps = state => ({
  isFetching: getIsFetching(state),
  result: getResult(state),
  error: getError(state)
});

const mapDispatchToProps = { fetchSearchRequest };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Search);
