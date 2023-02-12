import React from "react";
import { Link } from 'react-router-dom';
import { Exclusive } from "../../types";
import { OVERFLOW_HIDDEN_ALWAYS_CLASSNAME } from "../constants";
import { NavListItemExpanded, NavListItemExpandedDirections } from "./NavListItemExpanded";
import { NAVBAR_CLASSNAME } from "./utils";

type NavListItemImage = {
  alt?: string;
  source?: string;
}

type NavListItemLinkAndExpandedMenuExclusivity = Exclusive< {
  /*
   * the link to go to.  A expanded menu can not be a link
   */
  to: string;
}, {
    /*
   * if this is specified, the item becomes an expandable menu.  This item can not be a link, so specify a 'to' prop will throw a type error
   */
  expandedItemOptions: {
    items: NavListItemProps[];
    direction?: NavListItemExpandedDirections;
  };
}>; 

type NavListItemProps = {
  className?: string;
  image?: NavListItemImage;
  isEmail?: boolean;
  label: string;
  onClick: (e: any) => void;
  onMouseEnter: (e: any) => void;
} & NavListItemLinkAndExpandedMenuExclusivity;

const defaults = {
  liClassName: `${NAVBAR_CLASSNAME}__item`,
  linkClassName: `${NAVBAR_CLASSNAME}__link`,
  imageClassName: `${NAVBAR_CLASSNAME}__link-image`,
};

export const NavListItem: React.FC<NavListItemProps> = ({
  expandedItemOptions = null,
	isEmail = false,
  onMouseEnter,
  onClick,
  to = '',
  label,
  className = '',
  image = {
    alt: '',
    source: '',
  }
}) => {
  const expandedMenuClassname = `${NAVBAR_CLASSNAME}__item ${NAVBAR_CLASSNAME}__dropdown-container flex align-center justify-content-center`;
  const classNameToUse = className || expandedItemOptions ? expandedMenuClassname : defaults.liClassName;
  const triangle = <div className="triangle-down"/>;
  const getContent = () => {
    let content = (
      <React.Fragment>
        {label}
      </React.Fragment>
    );

    if (expandedItemOptions) {
      content = (
        <React.Fragment>
          <div className={`${NAVBAR_CLASSNAME}__dropdown-group`}>
            {label}
            {triangle}
          </div>
          <NavListItemExpanded direction={expandedItemOptions ? expandedItemOptions.direction : NavListItemExpandedDirections.vertical}>
            {expandedItemOptions.items?.map((itemProps, index) => <NavListItem key={index} {...itemProps}/>)}
          </NavListItemExpanded>
        </React.Fragment>
      );
    }

    return content;
  };

  const renderLink = () => {
    if (isEmail) {
      return (
        <a className={defaults.linkClassName} href={to}>
          {getContent()}
        </a>
      )
    }
    else if (!!to) return (
      <Link className={defaults.linkClassName} to={to}>
        {getContent()}
      </Link>
    ) 
    
    return (
      <div
        className={`${defaults.linkClassName} ${
          !to && image.source ? "overflow-hidden" : ""
        }`}>
        {!to && image.source ? (
          <img
            className={defaults.imageClassName}
            src={image.source}
            alt={image.alt}
          />
        ) : null}
        {getContent()}
      </div>
    )
  }

  return (
    <li
      aria-label={label}
      onMouseEnter={onMouseEnter}
      onClick={onClick}
      className={`${classNameToUse}  ${
        !!to && image.source ? OVERFLOW_HIDDEN_ALWAYS_CLASSNAME : ""
      }`}>
        
      {!!to && image.source ? (
        <img
          aria-hidden="true"
          className={defaults.imageClassName}
          src={image.source}
          alt={image.alt}
        />
      ) : null}

      {renderLink()}
    </li>
  );
}