import React from 'react';
import { Link } from 'react-router-dom';

class NavItem extends React.Component {
  defaults = {
    liClassName: "navbar__item",
    linkClassName: "navbar__link",
  } 
  render() {
    const { onMouseEnter, onClick, to, label, children, className } = this.props;
    const classNamesToUse = className ? className : this.defaults.liClassName;

    return (
      <li 
        onMouseEnter={onMouseEnter} 
        onClick={onClick} 
        className={classNamesToUse}
      >
        <Link 
          className={this.defaults.linkClassName} 
          to={to}
        >
          {label}
          {children}
        </Link>
      </li>
    );
  }
}

export default NavItem;