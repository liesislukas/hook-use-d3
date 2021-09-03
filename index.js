import React from "react";
import * as d3 from "d3";

export default (renderFunction, dependencies) => {
  const ref = React.useRef();

  React.useEffect(() => {
    if (ref.current) {
      renderFunction(d3.select(ref.current));
    }
    return () => {};
  }, [...dependencies, ref.current]);
  return ref;
};
