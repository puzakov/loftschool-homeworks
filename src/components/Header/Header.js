import React, { PureComponent } from 'react';
import { AuthConsumer } from '../../contexts/Auth';
import Button from '../Button';

import './Header.css';

class Header extends PureComponent {
  render() {
    return (
      <AuthConsumer>
        {({ isAuthorized, email, logout }) => {
          return isAuthorized ? (
            <div className="header__content">
              <div className="header-menu">
                <p className="header-menu__email header-email t-header-email">
                  {email}
                </p>
                <Button
                  className="header-menu__button t-logout"
                  onClick={logout}
                >
                  Выйти
                </Button>
              </div>
            </div>
          ) : null;
        }}
      </AuthConsumer>
    );
  }
}

export default Header;
