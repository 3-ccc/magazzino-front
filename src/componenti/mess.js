
import { DarkModeContext } from "../tema/DarkModeContext";
import { MsgContext } from "../tema/MsgContext";
import { ScrollContext } from "../tema/ScrollContext";
import { useContext } from "react";
//import { retrieveAllProducts } from "../api/indexApi";
import { useNavigate } from "react-router-dom";
import './componenti.css'

const Mess = ({/*msg*/}) => {
  const { darkMode } = useContext(DarkModeContext);
  const { msg } = useContext(MsgContext);
  const { heightText } = useContext(ScrollContext)

//on resize scompare...   ok risolto con onresize fa---

  //console.log(heightText)

  const navigate = useNavigate();

/*
rosso
721c24
f8d7da

giallo
856404
fff3cd

verde
155724
d4edda

info?
0c5460
d1ecf1

grigio?
1b1e21
d6d8d9

mh troppo uguali
... e non piu trasparente...

ok solo titotlo ma rivedere colore testo body

cmq non passo titolo--  in base a stile solo icona + attenzione invo ---
*/

  return (
    <div aria-live="polite"  id="toast"  aria-atomic="true" style={{position: 'relative', zIndex: (!msg.mess || msg.mess=='') ? '-1' : '999', top:'-20px'}}>
    <div className="toast" data-autohide="true" data-delay="5000" style={{position: 'absolute', top: (heightText.scroll>40 ?  (heightText.scroll+'px') : '25px'), right: "0"}}>

{/*<div className="toast" role="alert" aria-live="assertive" aria-atomic="true"> */}
{/*qui lista tutti toast mhhhhh andra su tutte le pagine

toastverde rompe bordi e round!!!
*/}
    <div className={"toast-header "+( msg.stile ? 'toast'+msg.stile : '') + (!darkMode ? 'd' :'')}  style={{left:'50px'}}>
      {msg.stile == 'rosso' && <i className="bi bi-exclamation-octagon" style={{marginRight:'5px'}}></i>}
      {msg.stile == 'giallo' && <i className="bi bi-exclamation-triangle" style={{marginRight:'5px'}}></i>}
      {msg.stile == 'verde' && <i className="bi bi-hand-thumbs-up" style={{marginRight:'5px'}}></i>}
      {msg.stile == 'info' && <i className="bi bi-info-square" style={{marginRight:'5px'}}></i>}
      
      <strong className="mr-auto">  {msg.titolo}</strong>
      {/*<small>11 mins ago</small>*/}
      
    </div>
    <div className={"toast-body "+( msg.stile ? 'toast'+msg.stile : '') + (!darkMode ? 'd' :'')+'body'} style={{left:'50px'}}>
    <div className="row" style={{width:'99%'}}>
    <p className="col-11 testolight">
      {msg.mess}
      </p>
      <button type="button" className="close col-1" data-dismiss="toast" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
      </div>
    </div>
  </div>
  </div>

  );
};

export { Mess };