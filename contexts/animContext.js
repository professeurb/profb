import React, { useState } from "react";

const DurationContext = React.createContext([{}, () => {}]);

const DurationProvider = (props) => {
  const [duration, setDuration] = useState(0);
  return (
    <DurationContext.Provider value={[duration, setDuration]}>
      {props.children}
    </DurationContext.Provider>
  );
};

export { DurationContext, DurationProvider };
