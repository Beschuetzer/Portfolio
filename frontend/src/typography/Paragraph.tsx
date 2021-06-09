import React from 'react';

interface ParagraphProps {
  size: string,
  children: any,
}

const Paragraph: React.FC<ParagraphProps> = ({
  size,
  children,
}) => {
  return (
    <p className={`paragraph paragraph--${size}`}>
      {children}
    </p>
  )
}

export default Paragraph;