import React from "react";
import { Link } from 'react-router-dom';

interface NavListItemProps {
	isLink?: boolean
  to: string;
  label: string;
  children?: any;
  className?: string;
  triangle?: any;
  imageAlt?: string;
  imageSource?: string;
  onMouseEnter: (e: any) => void;
  onClick: (e: any) => void;
}

const NavListItem: React.FC<NavListItemProps> = ({
	isLink = true,
  onMouseEnter,
  onClick,
  to,
  label,
  children,
  className,
  triangle,
  imageAlt = "A picture",
  imageSource = "",
}) => {
	
  const defaults = {
		liClassName: "navbar__item",
		linkClassName: "navbar__link",
		imageClassName: "navbar__link-image",
	};

  const classNamesToUse = className ? className : defaults.liClassName;
  const getContent = () => {
    let content = (
      <React.Fragment>
        <div className="navbar__dropdown-group">
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

  return (
    <li
      onMouseEnter={onMouseEnter}
      onClick={onClick}
      className={`${classNamesToUse}  ${
        isLink && imageSource ? "overflow-hidden" : ""
      }`}>
      {isLink && imageSource ? (
        <img
          className={defaults.imageClassName}
          src={imageSource}
          alt={imageAlt}
        />
      ) : null}
      {isLink ? (
        <Link className={defaults.linkClassName} to={to}>
          {getContent()}
        </Link>
      ) : (
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
      )}
    </li>
  );
}

export default NavListItem;
