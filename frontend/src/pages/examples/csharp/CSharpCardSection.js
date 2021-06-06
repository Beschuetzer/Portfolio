
const CSharpCardSection = ({title, children}) => {
  const CARD_SECTION_CLASSNAME = 'csharp__card-section'
  const CARD_SECTION_TITLE_CLASSNAME = 'csharp__card-section-title';
  const CARD_SECTION_CONTENT_CLASSNAME = 'csharp__section-content';

  return (
    <div className={CARD_SECTION_CLASSNAME}>
      <h3 className={CARD_SECTION_TITLE_CLASSNAME}>{title}</h3>
      <div className={CARD_SECTION_CONTENT_CLASSNAME}>
        {children}
      </div>
    </div>
  );
}

export default CSharpCardSection;