import React, { PureComponent, Fragment } from 'react';
import styles from './followers.module.css';
import {} from '../../modules/Followers';
import { connect } from 'react-redux';
import cx from 'classnames';
import { getIsLoading, getData } from '../../modules/Followers';

class Followers extends PureComponent {
  render() {
    // Покажите статус загрузки
    // Если данные не были загружены - сообщите об этом пользователю
    const { isLoading, data } = this.props;

    return (
      <Fragment>
        {isLoading && <p>Загрузка информации о подписчиках</p>}
        {!data && !isLoading && (
          <p className="t-no-followers">Нет информации о подписчиках</p>
        )}
        {!isLoading && data && data.length > 0 && (
          <div className={cx(styles.root, 't-followers')}>
            {/* 
              Отобразите список пользователей.
              Для каждого пользователя покажите имя и аватарку.
            */}
            {data.map(item => {
              return (
                <div className={styles.follower}>
                  <img
                    className={styles.followerImg}
                    src={item.avatar_url}
                    alt={item.login}
                  />
                  <p className={styles.followerLogin}>{item.login}</p>
                </div>
              );
            })}
          </div>
        )}
      </Fragment>
    );
  }
}

// Используйте поля data, isLoading из стейта
export default connect(state => ({
  isLoading: getIsLoading(state),
  data: getData(state)
}))(Followers);
