import React, { useLayoutEffect } from "react";
import { LoadingSpinner } from "../components/loading/LoadingSpinner";
import { CSharpLayout } from "./examples";

type RedirctProps = {
    /**
    *The url to redirct to
    **/
    url: string;
    texts?: string[];
}

export const Redirect: React.FC<RedirctProps> = (props) => {
    const { texts, url } = props;

    useLayoutEffect(() => {
        window.location.href = url;
    }, [url])

    return (
        <>
            <LoadingSpinner text={texts} />
            <CSharpLayout
                sections={[]}
                pageName={``}
            />
        </>
    );
};