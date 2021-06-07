import React, { useEffect } from 'react';
import { connect, RootStateOrAny } from 'react-redux';

interface useSetBodyStyleProps {
  currentUrl: string,
}

const useSetBodyStyle: React.FC<useSetBodyStyleProps> = ({
  currentUrl,
}) => {
  useEffect(() => {
    const setBodyStyle = (page: string) => {
      if (page === "") document.body.className = "body-background";
      else {
        document.body.className = `body-background ${page.slice(1)}-page`;
      }
    };

		if (!currentUrl) return;

		let docStyle = getComputedStyle(document.documentElement);
		const colorVarRoot = "--color-primary";
		const colorVarPages = [
			"",
			"/bridge",
			"/resume",
			"/downloader",
			"/playlist-syncer",
		];
		const colorVarNumbers = ["-1", "-2", "-3", "-4"];
		// const colorVarHSL = ['-h', '-s', '-l'];

		const lastIndexOfSlash = (currentUrl as any).lastIndexOf("/");
		const pageName = (currentUrl as any).slice(lastIndexOfSlash);
		const temp = colorVarPages.indexOf(pageName);
		const index = temp !== -1 ? temp : 0;
		setBodyStyle(colorVarPages[index]);
		const colorVarSuffix = colorVarPages[index].slice(1);

		for (let i = 0; i < colorVarNumbers.length; i++) {
			const colorVarNumber = colorVarNumbers[i];
			const colorVarToChange = `${colorVarRoot}${colorVarNumber}`;
			const colorVarTarget = `${colorVarRoot}${
				colorVarSuffix !== "" ? `-${colorVarSuffix}` : ""
			}${colorVarNumber}`;
			const targetValue = docStyle.getPropertyValue(colorVarTarget);
			document.documentElement.style.setProperty(colorVarToChange, targetValue);
		}
	}, [currentUrl]);

  return null;
}

const mapStateToProps = (state: RootStateOrAny) => {
  return {
    currentUrl: state.general.currentUrl,
  }
}

export default connect(mapStateToProps, {})(useSetBodyStyle);