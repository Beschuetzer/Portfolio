import { useEffect, useState } from "react";

export const useGetBridgeCards = () => {
	const [bridgeCards, setBridgeCards] = useState<Array<HTMLElement>>([]);

    useEffect(() => {
		setBridgeCards(document.querySelectorAll(".card") as any);
	}, [])

    return bridgeCards;
}