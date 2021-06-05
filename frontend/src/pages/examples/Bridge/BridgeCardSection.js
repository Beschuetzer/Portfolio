
import {
  BRIDGE_CARD_SECTION_CLASSNAME,
} from '../../../components/constants.js';

const BridgeCardSection = ({title, children}) => {
  return (
    <div className={BRIDGE_CARD_SECTION_CLASSNAME}>
      <h3>{title}</h3>
      <article className="bridge__subsection-content">
        {children}
      </article>
    </div>
  );
}

export default BridgeCardSection;