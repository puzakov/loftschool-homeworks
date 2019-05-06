import React, { PureComponent, Fragment } from 'react';
import styles from './UserInfo.module.css';
import { getIsLoading, getData } from '../../modules/User';

import { connect } from 'react-redux';

class UserInfo extends PureComponent {
  render() {
    // Покажите статус загрузки
    // Если данные не были загружены - сообщите об этом пользователю
    const { isLoading, data } = this.props;
    return (
      <Fragment>
        {isLoading && <p>Загрузка информации о пользователе</p>}
        {!data && !isLoading && (
          <p className="t-no-user-info">Нет информации о пользователе</p>
        )}
        {data && !isLoading && (
          <div className={styles.root}>
            {/* Отобразите данные о пользователе */}
            <div className={styles.imageWrapper}>
              <img
                className={styles.image}
                src={data.avatar_url}
                alt="user info"
              />
            </div>
            <div>
              <p className="t-user-name">{data.name}</p>
              <p className="t-user-bio">{data.bio}</p>
            </div>
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
}))(UserInfo);
