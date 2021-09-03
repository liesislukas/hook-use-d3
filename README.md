
`npm i hook-use-d3`

https://www.npmjs.com/package/hook-use-d3

Simple ReactJs hook helper to render d3 inside JSX after JSX is done rendering DOM element.

```javascript
import React from "react";
import * as d3 from "d3";
import useD3 from "hook-use-d3";

export default function SomeComponent() {
  const d3ref = useD3((d3Container, dom) => {
    const svg = d3Container
      .append("svg")
      .attr("width", dom.getBoundingClientRect().width)
      .attr("height", dom.getBoundingClientRect().height)
      .call(
        d3.zoom().on("zoom", function (event) {
          svg.attr("transform", event.transform);
        })
      )
      .append("g");

    const circle = svg
      .append("circle")
      .attr("cx", 50)
      .attr("cy", 50)
      .attr("r", 1)
      .attr("fill", "#4CAF50");

    function animate() {
      let radius = 5;
      let distance = 35;
      circle
        .transition()
        .duration(2000)
        .attrTween("r", () => d3.interpolate(radius, radius + distance))
        .on("end", () => {
          radius = circle.attr("r");
          distance = 35;

          circle
            .transition()
            .duration(2000)
            .attrTween("r", () => d3.interpolate(radius, radius - distance))
            .on("end", animate);
        });
    }

    animate();
  }, []);

  return <svg ref={d3ref} style={{height: 100, width: 100}}></svg>;
}
```
