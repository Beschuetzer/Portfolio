import React, { useEffect } from 'react';

interface useChangeCurrentUrlProps {
  currentUrl: string,
  previousUrl: string,
  setCurrentUrl: (value: string) => void,
  match: {url: string},
}

const useChangeCurrentUrl: React.FC<useChangeCurrentUrlProps> = ({
  currentUrl,
  previousUrl,
  setCurrentUrl,
  match,
}) => {
  //When url changes
	useEffect(() => {
		if (!currentUrl || currentUrl !== match.url) {
			setCurrentUrl(match.url);
		}
	}, [match, currentUrl, previousUrl, setCurrentUrl]);

  return null;
}

export default useChangeCurrentUrl;