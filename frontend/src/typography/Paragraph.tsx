import React from 'react';

interface ParagraphProps {
  classNamesToAdd?: string,
  size: string,
  children: any,
}

const Paragraph: React.FC<ParagraphProps> = ({
  size,
  children,
  classNamesToAdd,
}) => {
  return (
    <p className={`paragraph paragraph--${size} ${classNamesToAdd}`}>
      {children}
    </p>
  )
}

export default Paragraph;