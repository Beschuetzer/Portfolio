import React from "react";
import { Link } from 'react-router-dom';
import { OVERFLOW_HIDDEN_ALWAYS_CLASSNAME } from "../constants";
import { NAVBAR_CLASSNAME } from "./utils";

interface NavListItemProps {
  isEmail?: boolean
	isLink?: boolean
  to: string;
  label: string;
  children?: any;
  className?: string;
  triangle?: any;
  imageAlt?: string;
  imageSource?: string;
  rank?: string,
  onMouseEnter: (e: any) => void;
  onClick: (e: any) => void;
}

export const NavListItem: React.FC<NavListItemProps> = ({
	isEmail = false,
	isLink = true,
  onMouseEnter,
  onClick,
  to,
  label,
  children,
  className,
  triangle,
  rank,
  imageAlt = "A picture",
  imageSource = "",
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
    else if (isLink === true) return (
      <Link className={defaults.linkClassName} to={to}>
        {getContent()}
      </Link>
    ) 
    else if (isLink === false) return (
      <div
        className={`${defaults.linkClassName} ${
          !isLink && imageSource ? "overflow-hidden" : ""
        }`}>
        {!isLink && imageSource ? (
          <img
            className={defaults.imageClassName}
            src={imageSource}
            alt={imageAlt}
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
        isLink && imageSource ? OVERFLOW_HIDDEN_ALWAYS_CLASSNAME : ""
      }`}>
        
      {isLink && imageSource ? (
        <img
          aria-hidden="true"
          className={defaults.imageClassName}
          src={imageSource}
          alt={imageAlt}
        />
      ) : null}

      {renderLink()}
    </li>
  );
}