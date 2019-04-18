import React, { Fragment, Component, PureComponent } from 'react';
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
    let mainBlokClass = 'main';
    mainBlokClass += header ? ' main--with-header' : '';
    mainBlokClass += footer ? ' main--with-footer' : '';
    const Header = this.renderHeader(header);
    const Footer = this.renderFooter(footer);

    return (
      <Fragment>
        {header && <Header />}
        <main className={mainBlokClass}>
          <SectionTitle className="main__title">Main</SectionTitle>
          {children}
        </main>
        {footer && <Footer />}
      </Fragment>
    );
  }

  renderHeader(HeaderChild) {
    return class extends Component {
      render() {
        console.log('Rendering HEADER');
        return (
          <header className="header">
            <SectionTitle className="header__title">Header</SectionTitle>
            <HeaderChild {...this.props} />
          </header>
        );
      }
    };
  }

  renderFooter(FooterChild) {
    return class extends Component {
      render() {
        return (
          <footer className="footer">
            <SectionTitle className="header__title">Footer</SectionTitle>
            <FooterChild {...this.props} />
          </footer>
        );
      }
    };
  }
}

export default Layout;
