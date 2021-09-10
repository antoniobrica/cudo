import React, { useLayoutEffect, useState, useEffect } from "react";

const check = (host, callback) => {
  fetch(host, {
    method: "GET",
  })
    .then(() => callback(true))
    .catch(err => callback(false))
}

function MicroFrontend({ name, host, history }) {
  console.log('MicroFrontend--1--name, host, history---', name, host, history)
  const [shouldReturnMain, setShouldReturnMain] = useState(undefined)

  useEffect(() => {
    const scriptId = `render${name}`;
    console.log('MicroFrontend--2--useEffect--scriptId---', scriptId)
    const renderMicroFrontend = () => {
      console.log('MicroFrontend--3--renderMicroFrontend--useEffect--name--history--', name, history)
      window[`render${name}`](`${name}-container`, history);
    };

    if (document.getElementById(scriptId)) {
      console.log('MicroFrontend--4--useEffect--scriptId---', scriptId)
      renderMicroFrontend();
      return;
    }
    const main = "main.js";
    const script = document.createElement("script");

    script.id = scriptId;
    script.crossOrigin = "";
    script.src = `${host}/${main}`;
    console.log('MicroFrontend--5--useEffect--script---', script)
    script.onload = () => {
      console.log('MicroFrontend-6--Microfrontend--onload--')
      renderMicroFrontend();
      setShouldReturnMain(true)

    };

    check(host, (isServerRunning) => {
      if (isServerRunning) {
        console.log('MicroFrontend--7--check(host, (isServerRunning) --', host, isServerRunning)
        document.head.appendChild(script);
        setShouldReturnMain(true)
      } else {
        console.log('MicroFrontend--8--check(host, (isServerRunning) --', host, isServerRunning)
        setShouldReturnMain(false)

      }
    })

    return () => {
      console.log('MicroFrontend--9--window[`unmount${name}`]--name--', name)
      window[`unmount${name}`] && window[`unmount${name}`](`${name}-container`);
    };
  }, []);

  if (shouldReturnMain === undefined) {
    console.log('MicroFrontend--10--shouldReturnMain--', shouldReturnMain)
    return null
  }

  console.log('MicroFrontend--11--shouldReturnMain--name--', shouldReturnMain, name)
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

