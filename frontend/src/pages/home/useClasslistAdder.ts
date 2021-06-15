import { useEffect } from "react";
import { cubeRaiseDuration, cubeRaiseStartTime } from "./OceanSky";

interface ClasslistAdder {
	classnames: string[];
	classesToAdd: string[];
}

const useClasslistAdder = () => {
	useEffect(() => {
		const animations: ClasslistAdder[] = [
			{
				classnames: [
					"home__name-first",
					"home__name-last",
					"home__third-word",
				],
				classesToAdd: ["home__animation-ease-in-out-back"],
			},
			{
				classnames: [
					"home__main-left",
					"home__main-right",
					"home__main-bottom",
				],
				classesToAdd: ["home__animation-ease"],
			},
		];

		setTimeout(() => {
			for (let i = 0; i < animations.length; i++) {
				const animation = animations[i];
				for (let j = 0; j < animation.classnames.length; j++) {
					const classname = animation.classnames[j];
					const element = document.querySelector(`.${classname}`);
					for (let k = 0; k < animation.classesToAdd.length; k++) {
						const animationClassname = animation.classesToAdd[k];
						element?.classList.add(animationClassname);
					}
				}
			}
		}, cubeRaiseStartTime + cubeRaiseDuration / 2);
	}, []);

	return null;
};

export default useClasslistAdder;
