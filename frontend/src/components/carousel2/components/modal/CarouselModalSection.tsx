import React, { ReactNode } from 'react'
import { CarouselModalSectionProps } from '../../types';
import { StylingLogic } from '../../business-logic/StylingLogic';
import { MODAL_TITLE_TAG_DEFAULT, MODAL_TEXT_TAG_DEFAULT, CLASSNAME__MODAL_HEADER } from '../../constants';
import { getCodeSections } from '../../utils/utils';

type Props = {
    button: ReactNode | ReactNode[]
    index: number;
}
export const CarouselModalSection = (props: CarouselModalSectionProps & Props) => {
    const {
        button,
        codeSection,
        title,
        index,
        titleElementType: TitleTag = MODAL_TITLE_TAG_DEFAULT,
        text,
        textElementType: Tag = MODAL_TEXT_TAG_DEFAULT,
        textStyles,
        textContainerStyles,
    } = props;

    const isCodeSection = codeSection?.lines && codeSection.lines.length > 0;

    if (isCodeSection) {
        const codeSections = getCodeSections(codeSection);
        //using recursion to render each code section
        return codeSections?.map((codeSectionObj, index2) => {
            //need to only apply the marginTop value to the first item in the section
            const currentPadding = codeSectionObj?.textContainerStyles?.padding;
            const splitPadding = currentPadding?.toString().split(' ');
            const paddingTop = splitPadding?.shift();
            const newPadding = `${index2 === 0 ? paddingTop : 0} ${splitPadding?.join(' ')}`;
            const codeSectionObjToUse = {
                ...codeSectionObj,
                textContainerStyles: {
                    padding: newPadding,
                }
            }

            //@ts-ignore
            return <CarouselModalSection key={`${index}-${index2}`} button={button} index={index2} {...codeSectionObjToUse} />
        });
    }

    return (
        <div style={{ ...StylingLogic.getCarouselModalChildStyle(index), ...textContainerStyles }}>
            {
                title ? (
                    <div className={CLASSNAME__MODAL_HEADER}>
                        <TitleTag dangerouslySetInnerHTML={{ __html: title || '' }} />
                        {index === 0 ? button : null}
                    </div>
                ) : null
            }
            {
                text ? (
                    <Tag style={textStyles} dangerouslySetInnerHTML={{ __html: text || '' }} />
                ) : null
            }
        </div>
    );
}