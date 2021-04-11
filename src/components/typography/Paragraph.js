import React from 'react';

class Paragraph extends React.Component {
  render() {
    const { size, children } = this.props;
    return (
      <p className={`paragraph paragraph--${size}`}>
        {children}
      </p>
    );
  }
}

export default Paragraph;