import { useEffect } from "react";
import { cubeRaiseDuration, cubeRaiseStartTime } from "./OceanSky";

export interface ClasslistAdder {
	classnames: string[];
	classesToAdd: string[];
}

const useClasslistAdder = (classListsToAdd: ClasslistAdder[]) => {
	useEffect(() => {
		setTimeout(() => {
			for (let i = 0; i < classListsToAdd.length; i++) {
				const animation = classListsToAdd[i];
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
	}, [classListsToAdd]);

	return null;
};

export default useClasslistAdder;
