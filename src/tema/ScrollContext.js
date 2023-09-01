import React, { createContext, useState } from "react";

const ScrollContext = createContext();

function ScrollProvider(props) {
  const [heightText, setHeightText] = useState({
    text: 0,
    block: 0,
    scroll: 0,
  });
/*questo dove si usa
  useEffect(() => {
    window.addEventListener("resize", ()=>sth('id'));
    window.addEventListener("scroll", getListSize);
  }, []);
*/
  const seth = (id) => {
    const hText = document.getElementById(id)?.scrollHeight
    ? document.getElementById(id).scrollHeight
    : 1;
  const offsetMax = document.getElementById(id)?.offsetHeight
    ? document.getElementById(id)?.offsetHeight
    : 1;
  const prova = document.getElementById(id)?.scrollTop
    ? document.getElementById(id)?.scrollTop
    : 1;
//console.log(hText, offsetMax, prova)

  setHeightText({ text: hText, block: offsetMax, scroll: prova });

  /*
console.log(id)
console.log(heightText)
*/
  };
  return (
    <div>
      <ScrollContext.Provider value={{ heightText, seth }}>
        {props.children}
      </ScrollContext.Provider>
    </div>
  );
}

export { ScrollContext, ScrollProvider };

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