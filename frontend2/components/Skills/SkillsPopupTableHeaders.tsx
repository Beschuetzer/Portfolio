import React, { useEffect, useState } from 'react'
import { useAppSelector } from '../../hooks';
import { isMobileSelector, reposToDisplaySelector, viewPortWidthSelector } from '../../slices';
import { SKILLS_CLASSNAME } from '../constants';

type SkillsPopupHeaderMaxWidthMapping = {
    [headerName: string]: number
}

const headers = ["Name", "Description", "Created", "Updated", "Url"];
export function SkillsPopupTableHeaders() {
    const isMobile = useAppSelector(isMobileSelector);
    const viewPortWidth = useAppSelector(viewPortWidthSelector);
    const reposToDisplay = useAppSelector(reposToDisplaySelector);
    const [headerMaxWidthMapping, setHeaderMaxWidthMapping] = useState<SkillsPopupHeaderMaxWidthMapping>({});

    useEffect(() => {
        const items = document.querySelectorAll(`.${SKILLS_CLASSNAME}-popup__table-item`);
        const temp: SkillsPopupHeaderMaxWidthMapping = {};
        items.forEach((item, index) => {
            const header = headers[index % headers.length];
            const width = item.clientWidth;
            const currentWidthValue = temp[header];
            if (!currentWidthValue || width > currentWidthValue) {
                temp[header] = width;
            }
        })
        setHeaderMaxWidthMapping(temp);
    }, [reposToDisplay, viewPortWidth, setHeaderMaxWidthMapping])

    return isMobile
        ? // <div className={`${SKILLS_CLASSNAME}-popup__table-headers`}>
            //   {
            //     headers.map(header => {
            //       return (
            //         <div key={header} className={`${SKILLS_CLASSNAME}-popup__table-header`}>{header}</div>
            //       );
            //     })
            //   }
            // </div>
            null
        : (
            <div className={`${SKILLS_CLASSNAME}-popup__table-headers`}>
                {
                    headers.map((header) => {
                        const width = headerMaxWidthMapping?.[header] || 100;
                        return (
                            <div key={header} className={`${SKILLS_CLASSNAME}-popup__table-header`} style={{
                                width: `${width}px`,
                            }}>
                                {header}
                            </div>
                        );
                    })
                }
            </div>
        )
}
