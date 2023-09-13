import "./App.css";
import { useContext, useEffect, useState } from "react";
import { DarkModeContext } from "./tema/DarkModeContext";
import { NavSopra } from "./navbar/navSopra.js";
import { NavSotto } from "./navbar/navSotto.js";
import { RouterHandler } from "./rotte/routeHandler";
import { Mess } from './componenti/mess.js'
//import { ErrorBoundary } from "react-error-boundary";
import { ScrollContext } from "./tema/ScrollContext.js";

function App() {
  const { darkMode } = useContext(DarkModeContext);
  const { heightText, seth } = useContext(ScrollContext)

  const [selezionato, setSelezionato] = useState("home");
  const [navs, setNavs] = useState();
  /*const [heightText, setHeightText] = useState({
    text: 0,
    block: 0,
    scroll: 0,
  });*/
  /*const [msg, setMsg] = useState({
    stile:'',//?
    mess:''
  });*/
  /**
   * andrebbe come darkteme
   */

  //ricordarsi colorare pulsanti da route?

  const set = (id) => {
   /*
    const hText = document.getElementById(id)?.scrollHeight
    ? document.getElementById(id).scrollHeight
    : 1;
  const offsetMax = document.getElementById(id)?.offsetHeight
    ? document.getElementById(id)?.offsetHeight
    : 1;
  const prova = document.getElementById(id)?.scrollTop
    ? document.getElementById(id)?.scrollTop
    : 1;
console.log(hText, offsetMax, prova)
*/
  seth(id);

  setNavs(document.getElementById('navsopra').offsetHeight)

/*console.log(navs)
console.log(heightText)
console.log(document.getElementById('navsopra').offsetHeight)
*/
  };

  useEffect(() => {
    window.addEventListener("resize", ()=>set('scrollableText'));
    window.addEventListener("scroll", ()=>set('scrollableText'));
    setNavs(document.getElementById('navsopra').offsetHeight)
  }, []);

  
  return (
    <div
      className={
        "App App-background " +
        (darkMode ? "light-mode" : "dark-mode")
      }
      
    >
      <NavSopra
        selezionato={selezionato}
        setSelezionato={setSelezionato}
      ></NavSopra>
<div id="scrollableText" onScroll={()=>set('scrollableText')}
onResize={()=>set('scrollableText')}
style={{ overflowY: "scroll", maxHeight:  `calc(100vh - ${navs}px)`,}}>
      <NavSotto
        selezionato={selezionato}
        setSelezionato={setSelezionato}
      ></NavSotto>

      <Mess /*msg={msg}*/></Mess>

      <RouterHandler setSelezionato={setSelezionato} /*setMsg={setMsg} */ />
</div>
    </div>
  );
}

export default App;