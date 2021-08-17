import React, { useRef, useEffect, useLayoutEffect, useContext } from "react";
import usePrevious from "@hooks/usePrevious";
import anime from "animejs";
import "typeface-francois-one";
import "typeface-oswald";

import { DurationContext } from "@contexts/animContext.js";
// import { Card, Ref } from "semantic-ui-react";

export default function Carte({ left, top, value, pos, zIndex, rotate }) {
  const ref = useRef();
  const prevX = usePrevious(left);
  const prevY = usePrevious(top);

  const [duration, setDuration] = useContext(DurationContext);

  useLayoutEffect(() => {
    if (duration > 0) {
      anime({
        targets: ref.current,
        translateX: [prevX - left, 0],
        translateY: [prevY - top, 0],
        duration: duration,
        easing: "easeInOutQuad",
        elasticity: 1,
      });
    }
  }, [left, top]);

  return (
    <div
      style={{
        position: "absolute",
        width: 55,
        height: 90,
        border: "1px solid",
        borderRadius: 10,
        margin: 0,
        paddingTop: 2,
        backgroundColor: "#fff",
        left: left,
        top: top,
        zIndex: zIndex,
      }}
      ref={ref}
    >
      <h1
        style={{
          marginTop: 5,
          marginBottom: 5,
          fontFamily: "Francois One",
          textAlign: "center",
          fontSize: "20pt",
        }}
      >
        {value}
      </h1>
      <h2
        style={{
          marginTop: 5,
          fontFamily: "Oswald",
          color: "#aaaaaa",
          textAlign: "center",
          fontSize: "12pt",
          fontWeight: 300,
        }}
      >
        {pos}
      </h2>
    </div>
  );
}
