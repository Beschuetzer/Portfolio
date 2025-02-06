import { useEffect, useState } from "react";
import { BRIDGE_CLASSNAME } from "../components/constants";

export const useGetBridgeSections = () => {
	const [bridgeSections, setBridgeSections] = useState<Array<HTMLElement>>([]);

    useEffect(() => {
		setBridgeSections(document.querySelectorAll(`.${BRIDGE_CLASSNAME}__section`) as any);
	}, [])

    return bridgeSections;
}