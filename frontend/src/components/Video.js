import React from 'react';

class Video extends React.Component {
  render() {
    const { className, src, type, autoPlay = true, muted = true, loop = true, reference = null } = this.props;
    return (
      <div className={className}>
          <video ref={reference} autoPlay={autoPlay} muted={muted} loop={loop}>
              <source src={src} type={`video/${type}`}/>
          </video>
          <div className={`${className}__children`}>
            {this.props.children}
          </div>
      </div>
    );
  }
}

export default Video;