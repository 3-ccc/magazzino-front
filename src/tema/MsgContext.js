import React, { createContext, useState } from "react";

const MsgContext = createContext();

function MsgProvider(props) {
  const [msg, setMsg] = useState({
    stile:'',
    mess:'',
    titolo:''
  });
  const setmess = (m) => {
    setMsg(m);
  };
  return (
    <div>
      <MsgContext.Provider value={{ msg, setmess }}>
        {props.children}
      </MsgContext.Provider>
    </div>
  );
}

export { MsgContext, MsgProvider };
