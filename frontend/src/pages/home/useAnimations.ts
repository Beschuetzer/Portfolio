import { useEffect } from 'react';
import { cubeRaiseDuration, introPanDuration, introPanStartWait } from "./OceanSky";

const useAnimations = () => {
  useEffect(() => {
    const animations = [
      {
        classnames: ['home__name-first','home__name-last','home__third-word',],
        animationsToAdd: ['home__animation-top'],
      },
    ];

		setTimeout(() => {
			for (let i = 0; i < animations.length; i++) {
				const animation = animations[i];
				for (let j = 0; j < animation.classnames.length; j++) {
					const classname = animation.classnames[j];
					const element = document.querySelector(`.${classname}`);
					for (let k = 0; k < animation.animationsToAdd.length; k++) {
						const animationClassname = animation.animationsToAdd[k];
						element?.classList.add(animationClassname);
					}
				}
			}
		}, introPanDuration + introPanStartWait + cubeRaiseDuration);
	}, [])

  return (
    null
  )
}

export default useAnimations;