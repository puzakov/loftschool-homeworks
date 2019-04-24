// Реализуйте компонент OutboxList
// Он должен показывать список писем на отправку.
// Используйте HOC withData из `/context/Data` чтобы получить данные.

// Этот компонент должен использовать MailList для отображения данных.
import React from 'react';
import { withData } from '../../context/Data';
import MailList from '../MailList';

const OutboxList = props => {
  return <MailList itemsKey="outbox" {...props} />;
};

export default withData(OutboxList);
