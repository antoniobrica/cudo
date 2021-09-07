import React, { useLayoutEffect, useState, useEffect } from "react";

const check = (host, callback) => {
  fetch(host, {
    method: "GET",
  })
    .then(() => callback(true))
    .catch(err => callback(false))
}

function MicroFrontend({ name, host, history }) {

  const [shouldReturnMain, setShouldReturnMain] = useState(undefined)

  useEffect(() => {
    const scriptId = `render${name}`;

    const renderMicroFrontend = () => {
      console.log('--renderMicroFrontend--name---', name)
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

    check(host, (isServerRunning) => {
      if (isServerRunning) {
        document.head.appendChild(script);
        setShouldReturnMain(true)
      } else {
        setShouldReturnMain(false)

      }
    })

    // document.head.appendChild(script);

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

// =============Above modified and below old code - both running====================================================================

// import React, { useEffect } from "react";

// function MicroFrontend({ name, host, history }) {
//   console.log('MicroFrontend',history);
  
//   useEffect(() => {
//     const scriptId = `render${name}`;
//     const renderMicroFrontend = () => {
//       window[`render${name}`](`${name}-container`, history);
//     };

//     if (document.getElementById(scriptId)) {
//       renderMicroFrontend();
//       return;
//     }
//     const main = "main.js";
//     const script = document.createElement("script");
//     script.id = scriptId;
//     script.crossOrigin = "";
//     script.src = `${host}/${main}`;
//     script.onload = () => {
//       renderMicroFrontend();
//     };
//     console.log(script.src);
//     document.head.appendChild(script);
//     return () => {
//       window[`unmount${name}`] && window[`unmount${name}`](`${name}-container`);
//     };
//   });

//   return <main id={`${name}-container`} />;
// }

// MicroFrontend.defaultProps = {
//   document,
//   window,
// };

// export default MicroFrontend;

