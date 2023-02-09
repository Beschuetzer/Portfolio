import { BRIDGE_CARD_SECTION_CLASSNAME, BRIDGE_CLASSNAME } from "./utils";

interface BridgeCardSectionProps {
  title: string,
  children: any,
}

const BridgeCardSection: React.FC<BridgeCardSectionProps> = ({title, children}) => {
  return (
    <section className={BRIDGE_CARD_SECTION_CLASSNAME}>
      <h3>{title}</h3>
      <article className={`${BRIDGE_CLASSNAME}__subsection-content`}>
        {children}
      </article>
    </section>
  );
}

export default BridgeCardSection;