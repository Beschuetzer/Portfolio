import React from 'react';
import { Link } from 'react-router-dom';

class NavItem extends React.Component {
  defaults = {
    liClassName: "navbar__item",
    linkClassName: "navbar__link",
  } 
  render() {
    const { onMouseEnter, onClick, to, label, label2, children, className, triangle } = this.props;
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
          {triangle ?
            <React.Fragment>
              <div className="navbar__dropdown-group">
                {label}
                {triangle}
              </div>
              {children}
            </React.Fragment>
          :
            <React.Fragment>
              {label}
              {children}
            </React.Fragment>
          }
        </Link>
      </li>
    );
  }
}

export default NavItem;