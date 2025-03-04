import { useState, useEffect } from "react";

export const useGithubData = () => {
    const [data, setData] = useState<null | any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<null | any>(null);
    
    useEffect(() => {
        (async () => {
        try {
            const response = await fetch("/github");
            console.log({response});
            const data = await response.json();
            setData(data);
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
        })();
    }, []);
    
    return { data, loading, error };
}