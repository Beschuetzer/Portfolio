import { BRIDGE_CARD_SECTION_CLASSNAME, BRIDGE_CLASSNAME } from "./utils";

const BridgeCardSection = ({title, children}) => {
  return (
    <div className={BRIDGE_CARD_SECTION_CLASSNAME}>
      <h3>{title}</h3>
      <article className={`${BRIDGE_CLASSNAME}__subsection-content`}>
        {children}
      </article>
    </div>
  );
}

export default BridgeCardSection;