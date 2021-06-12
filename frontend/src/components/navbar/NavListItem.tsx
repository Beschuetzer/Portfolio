import React from "react";
import { Link } from 'react-router-dom';
import { NAVBAR_CLASSNAME } from "./utils";

interface NavListItemProps {
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

const NavListItem: React.FC<NavListItemProps> = ({
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


//PureComponent version
// import React from "react";
// import { Link } from 'react-router-dom';
// import { NAVBAR_CLASSNAME } from "./utils";

// interface NavListItemProps {
// 	isLink?: boolean
//   to: string;
//   label: string;
//   children?: any;
//   className?: string;
//   triangle?: any;
//   imageAlt?: string;
//   imageSource?: string;
//   rank?: string,
//   onMouseEnter: (e: any) => void;
//   onClick: (e: any) => void;
// }

// interface NavListItemState {
  
// }

// class NavListItem extends React.PureComponent<NavListItemProps, NavListItemState> {
//   defaults = {
//     liClassName: `${NAVBAR_CLASSNAME}__item`,
//     linkClassName: `${NAVBAR_CLASSNAME}__link`,
//     imageClassName: `${NAVBAR_CLASSNAME}__link-image`,
//   };

//   isLink?: boolean
//   to: string;
//   label: string;
//   children?: any;
//   className?: string;
//   triangle?: any;
//   imageAlt?: string;
//   imageSource?: string;
//   rank?: string;
//   onMouseEnter: (e: any) => void;
//   onClick: (e: any) => void;
//   classNamesToUse = this.props.className ? this.props.className : this.defaults.liClassName;

//   constructor(props: any) {
//     super(props);
//     this.isLink = this.props.isLink;
//     this.to = this.props.to;
//     this.label = this.props.label;
//     this.children = this.props.children;
//     this.className = this.props.className;
//     this.triangle = this.props.triangle;
//     this.imageAlt = this.props.imageAlt;
//     this.imageSource = this.props.imageSource;
//     this.rank = this.props.rank;
//     this.onMouseEnter = this.props.onMouseEnter;
//     this.onClick = this.props.onClick;
//   }
  
//   getContent = () => {
//     let content = (
//       <React.Fragment>
//         <div className={`${NAVBAR_CLASSNAME}__dropdown-group`}>
//           {this.props.label}
//           {this.props.triangle}
//         </div>
//         {this.props.children}
//       </React.Fragment>
//     );

//     if (!this.props.triangle) {
//       content = (
//         <React.Fragment>
//           {this.props.label}
//           {this.props.children}
//         </React.Fragment>
//       );
//     }

//     return content;
//   };

//   render() {
//     return (
//       <li
//         onMouseEnter={this.props.onMouseEnter}
//         onClick={this.props.onClick}
//         className={`${this.classNamesToUse}  ${
//           this.props.isLink && this.props.imageSource ? "overflow-hidden" : ""
//         }`}>
          
//         {this.props.isLink && this.props.imageSource ? (
//           <img
//             className={this.defaults.imageClassName}
//             src={this.props.imageSource}
//             alt={this.props.imageAlt}
//           />
//         ) : null}

//         {this.props.isLink ? (
//           <Link className={this.defaults.linkClassName} to={this.props.to}>
//             {this.getContent()}
//           </Link>
//         ) : (
//           <div
//             className={`${this.defaults.linkClassName} ${
//               !this.props.isLink && this.props.imageSource ? "overflow-hidden" : ""
//             }`}>
//             {!this.props.isLink && this.props.imageSource ? (
//               <img
//                 className={this.defaults.imageClassName}
//                 src={this.props.imageSource}
//                 alt={this.props.imageAlt}
//               />
//             ) : null}
//             {this.getContent()}
//           </div>
//         )}
//       </li>
//     );
//   }
// }

// export default NavListItem;
