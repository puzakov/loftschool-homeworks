// Реализуйте компонент InboxList
// Он должен показывать список входящих писем.
// Используйте HOC withData из `/context/Data` чтобы получить данные.

// Этот компонент должен использовать MailList для отображения данных.
import React from 'react';
import { withData } from '../../context/Data';
import MailList from '../MailList';

const InboxList = props => {
  return <MailList itemsKey="inbox" {...props} />;
};

export default withData(InboxList);
