import { useEffect, useState } from "react";

const useMicrofrontend = (id, url) => {
    const scriptId = `${id}Bundle`;
    const [isLoaded, setLoaded] = useState(window[id]);

    const handleLoad = () => setLoaded(true);
    useEffect(() => {
        const existingScript = document.getElementById(scriptId);
        console.log(existingScript);
        if (existingScript) {
            existingScript.addEventListener("load", handleLoad);

            return () => existingScript.removeEventListener("load", handleLoad);
        }
        const script = document.createElement("script");

        script.id = scriptId;
        script.src = url;

        document.body.appendChild(script);
        script.onload = handleLoad;
    }, []); // eslint-disable-line
    console.log({ isLoaded, [id]: window[id] }, id);
    return { isLoaded, [id]: window[id] };
};

export default useMicrofrontend;
