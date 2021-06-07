import React from "react";

interface  SourceCodeLinkProps { 
  href: string,
  blockName?: string,
  msg?: string,
}

const SourceCodeLink: React.FC<SourceCodeLinkProps> = ({ 
  href,
  blockName = "source-link",
  msg = "Code",
}) => {
	return (
		<a
			target="_blank"
			rel="noreferrer"
			href={href}
			className={`${blockName}__source`}>
			<svg className={`${blockName}__source-svg`}>
				<use xlinkHref="/sprite.svg#icon-code"></use>
			</svg>
			<span className={`${blockName}__source-label`}>{msg}</span>
		</a>
	);
};

export default SourceCodeLink;
