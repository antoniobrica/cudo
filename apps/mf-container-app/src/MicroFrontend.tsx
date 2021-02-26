import React, { useEffect } from "react";

function MicroFrontend({ name, host, history }) {
  console.log('name==>',name)
  useEffect(() => {
    const scriptId = `render${name}`;
    console.log(host, `render${name}`, `${name}-container`);
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
    console.log(script.src);
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
