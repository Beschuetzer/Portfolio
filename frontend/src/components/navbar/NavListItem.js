import React from 'react';
import { Link } from 'react-router-dom';

class NavItem extends React.Component {
  defaults = {
    liClassName: "navbar__item",
    linkClassName: "navbar__link",
  } 
  render() {
    const { isLink=true, onMouseEnter, onClick, to, label, label2, children, className, triangle } = this.props;
    const classNamesToUse = className ? className : this.defaults.liClassName;

    const getContent = () => {
      let content =  
      <React.Fragment>
        <div className="navbar__dropdown-group">
          {label}
          {triangle}
        </div>
        {children}
      </React.Fragment>

      if (!triangle) {
        content = 
        <React.Fragment>
          {label}
          {children}
        </React.Fragment>
      }

      return content;
    }

    return (
      <li 
        onMouseEnter={onMouseEnter} 
        onClick={onClick} 
        className={classNamesToUse}
      >
        {isLink ? 
          <Link 
            className={this.defaults.linkClassName} 
            to={to}
          >
            {getContent()}
          </Link>
        :
          <div className={this.defaults.linkClassName}>
            {getContent()}
          </div>
        }
      </li>
    );
  }
}

export default NavItem;