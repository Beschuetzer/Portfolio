import React from 'react';

interface ParagraphProps {
  classNameToAdd?: string,
  size: string,
  children: any,
}

const Paragraph: React.FC<ParagraphProps> = ({
  size,
  children,
  classNameToAdd,
}) => {
  return (
    <p className={`paragraph paragraph--${size} ${classNameToAdd}`}>
      {children}
    </p>
  )
}

export default Paragraph;