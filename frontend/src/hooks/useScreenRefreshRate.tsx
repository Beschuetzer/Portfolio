import { useEffect, useRef, useState } from "react";

type FpsReturned = number[];

const NUMBER_OF_FPS_POINTS_TO_GET = 100;

/**
*Determines how much different each new calculation has to be for setScreenRefreshRate to be called
*E.g. .05 means the difference between the last obtained screen refresh rate
*and the new one has to be at least 5% of the new value otherwise nothing will happen
**/
const PERCENT_DIFFERENCE_ALLOWED = .05;

export const useScreenRefreshRate = () => {
	const [screenRefreshRate, setScreenRefreshRate] = useState(0);
	const fpsReturned = useRef<FpsReturned>([]);
    const lastRefreshRateRef = useRef(0);

    useEffect(() => {
		function getScreenRefreshRate(callback: any, runIndefinitely: boolean){
			let requestId: number | null = null;
			let callbackTriggered = false;
			runIndefinitely = runIndefinitely || false;			
			let DOMHighResTimeStampCollection: any[] = [];
		
            //this was a setTimeout call but appears to work as is
			const cancelTimeout = function(){
				window.cancelAnimationFrame(requestId || 1);
				requestId = null;
			}

			const triggerAnimation = function(DOMHighResTimeStamp: number){
				DOMHighResTimeStampCollection.unshift(DOMHighResTimeStamp);
				
				if (DOMHighResTimeStampCollection.length > 10) {
					let t0 = DOMHighResTimeStampCollection.pop();
					let fps = Math.floor(1000 * 10 / (DOMHighResTimeStamp - t0));
		
					if(!callbackTriggered){
						callback.call(undefined, fps, cancelTimeout, DOMHighResTimeStampCollection);
					}
		
					if(runIndefinitely){
						callbackTriggered = false;
					}else{
						callbackTriggered = true;
					}
				}
			
				requestId = window.requestAnimationFrame(triggerAnimation);
			};
			
			window.requestAnimationFrame(triggerAnimation);
		
			// Stop after half second if it shouldn't run indefinitely
			if(!runIndefinitely){
				cancelTimeout()
			}
		}
		
		if (screenRefreshRate) return;
		getScreenRefreshRate((fps: number, cancelTimeout: () => void) => {
			fpsReturned.current?.push(fps)

			if (fpsReturned.current?.length > NUMBER_OF_FPS_POINTS_TO_GET) {
				cancelTimeout();
				
				if (!screenRefreshRate) {
					const newScreenRefreshRate = Math.max(...fpsReturned.current);
                    
                    if (Math.abs(lastRefreshRateRef.current - newScreenRefreshRate) < newScreenRefreshRate * PERCENT_DIFFERENCE_ALLOWED) return;
                    lastRefreshRateRef.current = newScreenRefreshRate;
					setScreenRefreshRate(newScreenRefreshRate);
				}
			}
		}, true);
	}, [screenRefreshRate])

    return [screenRefreshRate, setScreenRefreshRate] as [number, React.Dispatch<React.SetStateAction<number>>];
}