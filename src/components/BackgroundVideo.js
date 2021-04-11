import React from 'react';
import video from '../css/imgs/video-paint.mp4'

class BackgroundVideo extends React.Component {
  render() {
    return (
      <div className="bg-video">
          <video autoPlay muted loop>
              <source src={video} type="video/mp4"/>
          </video>
      </div>
    );
  }
}

export default BackgroundVideo;