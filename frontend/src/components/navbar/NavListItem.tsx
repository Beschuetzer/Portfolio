import React from "react";
import { Link } from 'react-router-dom';
import { OVERFLOW_HIDDEN_ALWAYS_CLASSNAME } from "../constants";
import { NAVBAR_CLASSNAME } from "./utils";

type NavListItemImage = {
  alt?: string;
  source?: string;
}
type NavListItemProps = {
  isEmail?: boolean
  to?: string; //is a link if this is truthy
  label: string;
  children?: any;
  className?: string;
  triangle?: any;
  image?: NavListItemImage;
  rank?: string,
  onMouseEnter: (e: any) => void;
  onClick: (e: any) => void;
}

export const NavListItem: React.FC<NavListItemProps> = ({
	isEmail = false,
  onMouseEnter,
  onClick,
  to = '',
  label,
  children,
  className,
  triangle,
  rank,
  image = {
    alt: '',
    source: '',
  }
}) => {
	
  const defaults = {
		liClassName: `${NAVBAR_CLASSNAME}__item`,
		linkClassName: `${NAVBAR_CLASSNAME}__link`,
		imageClassName: `${NAVBAR_CLASSNAME}__link-image`,
	};

  const classNamesToUse = className ? className : defaults.liClassName;
  const getContent = () => {
    let content = (
      <React.Fragment>
        <div className={`${NAVBAR_CLASSNAME}__dropdown-group`}>
          {label}
          {triangle}
        </div>
        {children}
      </React.Fragment>
    );

    if (!triangle) {
      content = (
        <React.Fragment>
          {label}
          {children}
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
      className={`${classNamesToUse}  ${
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