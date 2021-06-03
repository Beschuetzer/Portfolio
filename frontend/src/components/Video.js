import React from 'react';

class Video extends React.Component {
  render() {
    const { className, src, type, autoPlay = true, muted = true, loop = true, reference = null, onClick = null } = this.props;
    return (
      <div className={className} onClick={onClick}>
          <video ref={reference} autoPlay={autoPlay} muted={muted} loop={loop}>
              <source src={src} type={`video/${type}`}/>
          </video>
          {this.props.children ? 
            <div className={`${className}__children`}>
              {this.props.children}
            </div>
          :
            null
          }
      </div>
    );
  }
}

export default Video;