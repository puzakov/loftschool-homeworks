// Изучите файл `/cypress/integration/homework.spec.js`, чтобы понять,
// какие классы должен использовать компонент.
import React from 'react';
import styles from './MailList.module.css';
import { Link } from 'react-router-dom';

const MailList = (props) => {
  const { itemsKey, data, match } = props;
  return (
    <div className={styles.container + ` t-${itemsKey}-list`}>
      {data[itemsKey].map(({ id, body }) => (
        <Link key={id} className={styles.link} to={`${match.path}/${id}`}>{body.substr(0,55)}...</Link>
      ))}
    </div>
  );
};

export default MailList;
