import React, { useEffect } from "react";

function MicroFrontend({ name, host, history }) {
  console.log('--project--MicroFrontend--',name, host, history);
  
  useEffect(() => {
    const scriptId = `render${name}`;
    const renderMicroFrontend = () => {
      window[`render${name}`](`${name}-container`, history);
    };

    if (document.getElementById(scriptId)) {
      renderMicroFrontend();
      return;
    }
    const main = "main.js";
    const script = document.createElement("script");
    script.id = scriptId;
    script.crossOrigin = "";
    script.src = `${host}/${main}`;
    script.onload = () => {
      renderMicroFrontend();
    };
    console.log('-----project--MicroFrontend--useEffect--script.src---', script.src);
    document.head.appendChild(script);
    return () => {
      window[`unmount${name}`] && window[`unmount${name}`](`${name}-container`);
    };
  });

  return <main id={`${name}-container`} />;
}

MicroFrontend.defaultProps = {
  document,
  window,
};

export default MicroFrontend;
