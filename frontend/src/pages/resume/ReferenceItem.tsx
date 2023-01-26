import React from "react";
import { REFERENCES_CLASSNAME } from "./utils";

interface ReferenceItemProps { 
  number: string,
  name: string,
  phone: string,
  email: string,
  relation: string,
  href?: string
}

const ReferenceItem: React.FC<ReferenceItemProps> = ({ 
  number,
  name,
  phone,
  email,
  relation,
  href
}) => {
	return (
		<React.Fragment>
			<div className={`${REFERENCES_CLASSNAME}__name`}>
				{href ? (
					<React.Fragment>
						<span className={`${REFERENCES_CLASSNAME}__number`}>{number}).</span>
						<a
							target="_blank"
							rel="noreferrer"
							href={href}
							className={`${REFERENCES_CLASSNAME}__name-text ${REFERENCES_CLASSNAME}__name-link`}>
							{name}
						</a>
					</React.Fragment>
				) : (
					<React.Fragment>
						<span
							className={`${REFERENCES_CLASSNAME}__number ${REFERENCES_CLASSNAME}__number--no-link`}>
							{number}).
						</span>
						<div className={`${REFERENCES_CLASSNAME}__name-text`}>{name}</div>
					</React.Fragment>
				)}
			</div>
			<div className={`${REFERENCES_CLASSNAME}__relation`}>
				<span className={`${REFERENCES_CLASSNAME}__tag`}>Relation:</span>
				<span>{relation}</span>
			</div>
			<div className={`${REFERENCES_CLASSNAME}__phone`}>
				<span className={`${REFERENCES_CLASSNAME}__tag`}>Phone:</span>
				<span>{phone}</span>
			</div>
			<div className={`${REFERENCES_CLASSNAME}__email`}>
				<span className={`${REFERENCES_CLASSNAME}__tag`}>Email:</span>
				<a href={`mailto:${email}`}>{email}</a>
			</div>
		</React.Fragment>
	);
};

export default ReferenceItem;
