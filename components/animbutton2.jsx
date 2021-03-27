import { jsx } from "theme-ui";

import React, { useLayoutEffect, useState } from "react";
import { FaPlay, FaPause, FaStepForward } from "react-icons/fa";
import { Button, Flex } from "theme-ui";

export function AnimButton({ name, anim, disabled }) {
  const [playDisabled, setPlayDisabled] = useState(false);
  const [pauseDisabled, setPauseDisabled] = useState(true);
  const [stepDisabled, setStepDisabled] = useState(false);
  const [playResolve, setPlayResolve] = useState(() => {});
  const [stepResolve, setStepResolve] = useState(() => {});

  async function loop() {
    while (true) {
      await anim(waiter);
      enable();
    }
  }

  useLayoutEffect(loop, []);

  function enable() {
    setPlayDisabled(false);
    setPauseDisabled(true);
    setStepDisabled(false);
  }

  async function waiter() {
    if (!pauseDisabled) {
      return Promise.resolve(true);
    } else {
      setPlayDisabled(false);
      setPauseDisabled(true);
      setStepDisabled(false);
      let playPromise = new Promise((resolve, _) => {
        setPlayResolve(() => {
          resolve(1);
        });
      });
      let stepPromise = new Promise((resolve, _) => {
        setStepResolve(() => {
          resolve(2);
        });
      });
      return Promise.race([playPromise, stepPromise]).then((value) => {
        if (value === 1) {
          // Play
          setPlayDisabled(true);
          setPauseDisabled(false);
          setStepDisabled(true);
        } else {
          // Step
          setPlayDisabled(true);
          setPauseDisabled(true);
          setStepDisabled(true);
        }
        return true;
      });
    }
  }

  return (
    <Flex>
      {name && (
        <Flex sx={{ placeItems: "center" }}>
          <Button
            sx={{
              display: "flex",
              alignItems: "center",
              borderTopRightRadius: 0,
              borderBottomRightRadius: 0,
            }}
            disabled={playDisabled || disabled}
            onClick={playResolve}
          >
            {name}
          </Button>
        </Flex>
      )}
      <Flex
        sx={{
          border: "0px solid",
          placeItems: "center",
          mr: "1px",
        }}
      >
        <Button
          sx={{ borderRadius: 0 }}
          disabled={playDisabled || disabled}
          onClick={playResolve}
        >
          <FaPlay />
        </Button>
      </Flex>
      <Flex sx={{ placeItems: "center", mr: "1px" }}>
        <Button
          sx={{ borderRadius: 0 }}
          disabled={pauseDisabled || disabled}
          onClick={enable}
        >
          <FaPause />
        </Button>
      </Flex>
      <Flex sx={{ placeItems: "center" }}>
        <Button
          sx={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
          disabled={stepDisabled || disabled}
          onClick={stepResolve}
        >
          <FaStepForward />
        </Button>
      </Flex>
    </Flex>
  );
}
