import { useEffect } from 'react';
import { animate as animateSky, init, resetAnimations, stopKey as stopSky, timeElapsedInMS } from './OceanSky';

const useSky = () => {
	const HOME_CANVAS_CLASSNAME = 'home__canvas';

  useEffect(() => {
		init();
		animateSky();

		return (() => {
			stopSky();
			let canvasElement = document.querySelector(`.${HOME_CANVAS_CLASSNAME}`);
			if (canvasElement) document.body?.removeChild(canvasElement);

			canvasElement = document.querySelector(`.${HOME_CANVAS_CLASSNAME}`);
			if (canvasElement) document.body?.removeChild(canvasElement);
			resetAnimations();
		})
	}, [])

  return (
    null
  )
}

export default useSky;