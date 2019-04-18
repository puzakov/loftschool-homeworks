import React, { Fragment, PureComponent } from 'react';
import SectionTitle from '../SectionTitle';
import PropTypes from 'prop-types';
import './Layout.css';

class Layout extends PureComponent {
  static propTypes = {
    header: PropTypes.func,
    footer: PropTypes.func
  };

  render() {
    const { header, footer, children } = this.props;
    const mainBlokClass = `main ${header && 'main--with-header'} ${footer && 'main--with-footer'}`;

    return (
      <Fragment>
        {header && this.renderHeader(header)}
        <main className={mainBlokClass}>
          <SectionTitle className="main__title">Main</SectionTitle>
          {children}
        </main>
        {footer && this.renderFooter(footer)}
      </Fragment>
    );
  }

  renderHeader(HeaderChild) {
    return (
      <header className="header">
        <SectionTitle className="header__title">Header</SectionTitle>
        <HeaderChild {...this.props} />
      </header>
    );
  }

  renderFooter(FooterChild) {
    return (
      <footer className="footer">
        <SectionTitle className="header__title">Footer</SectionTitle>
        <FooterChild {...this.props} />
      </footer>
    );
  }
}

export default Layout;
