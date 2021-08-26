import React, { useLayoutEffect, useState } from "react";

const check = (host, callback) => {
  fetch(host, {
    method: "GET",
  })
    .then(() => callback(true))
    .catch(err => callback(false))
}

function MicroFrontend({ name, host, history }) {

  const [shouldReturnMain, setShouldReturnMain] = useState(undefined)
  console.log('-Container--MicroFrontend-- name, host, history --',name, host, history)
  useLayoutEffect(() => {
    const scriptId = `render${name}`;

    const renderMicroFrontend = () => {
      console.log('-Container--MicroFrontend--useLayoutEffect--renderMicroFrontend----',`render${name}`,`${name}-container`, history)
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
      setShouldReturnMain(true)

    };
    // script.addEventListener("error", () => {
    //   setShouldReturnMain(false)
    //   console.log('--script load error-----')

    // })

    // script.onError = () => {
    //     setShouldReturnMain(false)
    //     console.log('--script load error-----')

    // }

    check(host, (isServerRunning) => {
      if (isServerRunning) {
        document.head.appendChild(script);
        setShouldReturnMain(true)
      } else {
        setShouldReturnMain(false)

      }
    })

    return () => {
      window[`unmount${name}`] && window[`unmount${name}`](`${name}-container`);
    };
  }, []);

  if (shouldReturnMain === undefined) {
    return null
  }
  return shouldReturnMain ? <main id={`${name}-container`} /> : <div style={{ height: "230px", width: "230px", padding: "200px", background: "#ccc" }}>
    {name} service unavailable!!
  </div>;
}

MicroFrontend.defaultProps = {
  document,
  window,
};

export default MicroFrontend;
