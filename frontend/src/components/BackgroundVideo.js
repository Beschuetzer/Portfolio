import React from 'react';

class BackgroundVideo extends React.Component {
  render() {
    const { src, type, autoPlay = true, muted = true, loop = true } = this.props;
    return (
      // <div className="bg-video">
      //     <video autoPlay muted loop>
      //         <source src={src} type={`video/mp4`}/>
      //     </video>
      // </div>

      <div className="bg-video">
          <video autoPlay={autoPlay} muted={muted} loop={loop}>
              <source src={src} type={`video/${type}`}/>
          </video>
      </div>
    );
  }
}

export default BackgroundVideo;