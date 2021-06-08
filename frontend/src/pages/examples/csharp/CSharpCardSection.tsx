import { C_SHARP_CARD_SECTION_CLASSNAME, C_SHARP_CARD_SECTION_CONTENT_CLASSNAME, C_SHARP_CARD_SECTION_TITLE_CLASSNAME } from "./utils";

interface CSharpCardSectionProps {
  title: string,
  children: any,
}

const CSharpCardSection: React.FC<CSharpCardSectionProps> = ({title, children}) => {
  return (
    <div className={C_SHARP_CARD_SECTION_CLASSNAME}>
      <h3 className={C_SHARP_CARD_SECTION_TITLE_CLASSNAME}>{title}</h3>
      <div className={C_SHARP_CARD_SECTION_CONTENT_CLASSNAME}>
        {children}
      </div>
    </div>
  );
}

export default CSharpCardSection;