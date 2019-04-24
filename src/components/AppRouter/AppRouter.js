// Реализуйте роутер приложения.
// Здесь должны быть обьявлены роуты,
// которые будут доступны авторизованному пользователю.
// - Home
// - InboxList
// - InboxMail
// - OutboxList
// - OutboxMail

// Так же в этом файле обьявите лейаут,
// используйте стили из AppRouter.module.css
import React, { Component } from 'react';
import Home from '../Home';
import InboxList from '../InboxList';
import InboxMail from '../InboxMail';
import OutboxList from '../OutboxList';
import OutboxMail from '../OutboxMail';
import { Link, Switch, Route } from 'react-router-dom';
import styles from './AppRouter.module.css';

const appPages = [
  {
    id: 'Home',
    path: '',
    pageComponent: Home
  },
  {
    id: 'Inbox',
    path: '/inbox',
    pageComponent: InboxList
  },
  {
    id: 'Inbox-mail',
    path: '/inbox/:id',
    pageComponent: InboxMail,
    isHidden: true
  },
  {
    id: 'Outbox',
    path: '/outbox',
    pageComponent: OutboxList
  },
  {
    id: 'Outbox-mail',
    path: '/outbox/:id',
    pageComponent: OutboxMail,
    isHidden: true
  }
];

class AppRouter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: this.findTitle(props.location.pathname)
    };
    props.history.listen(this.handleRouteChange);
  }

  findTitle = (pathname) => { 
    let newTitle = 'Home';
    if (pathname.includes('inbox')) newTitle = 'Inbox';
    if (pathname.includes('outbox')) newTitle = 'Outbox';

    return newTitle;
  }

  handleRouteChange = ({ pathname }) => {
    this.setState({ title: this.findTitle(pathname) });
  };

  renderRoutes = () => {
    return appPages.map(({ path, id, pageComponent }) => {
      const { match } = this.props;
      const fullItemPath = `${match.path}${path}`;
      return (
        <Route exact path={fullItemPath} component={pageComponent} key={id} />
      );
    });
  };

  render() {
    const { location, match } = this.props;

    const { title } = this.state;
    return (
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <nav className={styles.nav}>
            <ul className={styles.navList + ' t-nav-list'}>
              {appPages.map(({ id, path, isHidden }) => {
                if (isHidden) return null;
                const fullItemPath = `${match.path}${path}`;
                const active =
                  fullItemPath === location.pathname ? 'active' : '';
                return (
                  <li className={styles.navElement} key={id}>
                    <Link
                      to={fullItemPath}
                      className={
                        styles.link + ` t-link-${id.toLowerCase()} ${active}`
                      }
                    >
                      {id}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
          <div className={styles.content}>
            <h3 className={styles.title}>{title}</h3>
            <Switch>{this.renderRoutes()}</Switch>
          </div>
        </div>
      </div>
    );
  }
}

export default AppRouter;
