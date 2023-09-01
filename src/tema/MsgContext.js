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

/*

dove lo devo mettere? xke su pagina iniziale sempre--- app? router?

const [heightText, setHeightText] = useState({
    text: 0,
    block: 0,
    scroll: 0,
  });

const getListSize = () => {
    const heightText = document.getElementById("scrollableText")?.scrollHeight
      ? document.getElementById("scrollableText").scrollHeight
      : 1;
    const offsetMax = document.getElementById("scrollableText")?.offsetHeight
      ? document.getElementById("scrollableText")?.offsetHeight
      : 1;
    const prova = document.getElementById("scrollableText")?.scrollTop
      ? document.getElementById("scrollableText")?.scrollTop
      : 1;

    setHeightText({ text: heightText, block: offsetMax, scroll: prova });

 */