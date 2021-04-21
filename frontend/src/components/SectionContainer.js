import React from 'react';

class SectionContainer extends React.Component {

  render() {
    const { name, pageName, children } = this.props;
    return (
      <section
        id={name.toLowerCase()}
        data-section={name.toLowerCase()}
        className={`${pageName}__section ${pageName}__section-${name.toLowerCase()}`}
      >
        {children}
      </section>
    );
  }
}

export default SectionContainer;