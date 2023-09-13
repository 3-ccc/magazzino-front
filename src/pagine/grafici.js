import { useContext, useEffect } from "react";
import "./login.css";
import { DarkModeContext } from "../tema/DarkModeContext";
import Linechart from "../componenti/grafici/lineChart";
import Doughnutchart from "../componenti/grafici/doughnutChart";

function Grafici() {
  const { darkMode } = useContext(DarkModeContext);
  useEffect(()=>{
    var toastfarcitov = [].slice.call(document.querySelectorAll(".popover"));     
      toastfarcitov.map((t)=>{
        document.getElementById(t.id).remove()
      })
    var toastfarcito = [].slice.call(document.querySelectorAll('[data-toggle="popover"]'));
    toastfarcito.map((t)=>{
      new window.bootstrap.Popover(t/*,options */);
    })
  },[])

  return (
    <div className="detailsPage">
{/*sfondo sempre cosi xke altrimenti da cmabiare tutti colori del grafico
e non so se si puo
  <br></br>*/}
{/*controlla se sono piu dati che colori cosa succede
tutto ok ricomincia

<br></br>*/}
<small>scegli nome per far comparire il grafico usati al mese per nome</small>

<Linechart></Linechart>

{!darkMode && <div className="holder mb-1 mt-3">
    <div className="smallLine1"></div>
    <div className="smallLine2"></div>
</div>}
{darkMode && <div className="holder mb-1 mt-3">
    <div className="smallLine3"></div>
    <div className="smallLine4"></div>
</div>}

<Doughnutchart></Doughnutchart>
    </div>
  );
}

export { Grafici };
