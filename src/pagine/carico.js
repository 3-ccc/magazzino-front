import { DarkModeContext } from "../tema/DarkModeContext";
import { useContext, useEffect, useState } from "react";
import { getProductpop } from "../api/indexApi";
import CardMiniProdotto from "../componenti/cardMiniProdotto";
import { useNavigate } from "react-router-dom";
import { useWindowDimensions } from "../altro/windowDimensions.js";
import {useLocation} from 'react-router-dom';
import QuantitySelector from "../componenti/quantitySelector";
import { createLoad, createUnload } from "../api/indexApi";

const SCarico = ({ mode }) => {
  const { darkMode } = useContext(DarkModeContext);
  const [product, setProduct] = useState([]); //lista tutti prodotti
  const [error, setError] = useState("Caricamento dei dati in corso!");
  const [qta, setQta] = useState(1);
  const { wi } = useWindowDimensions();
  const navigate = useNavigate();
  const location = useLocation();

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

  useEffect(() => {
    //console.log(location.state._id)

    //se location.state._id non c'è ---
    if(location.state && location.state._id){

    //navigate('/lista'+(mode=='carico' ? 'carico' : 'scarico'))  //?

    getProductpop(location.state._id).then((element) => {
      if (element.isError) {
        setError(element.messageError);
      } else {
        setError("");
        setProduct(element.data);
      }
    });    
    //setProduct(location.state)
  }else{
    navigate('/lista'+(mode=='carico' ? 'carico' : 'scarico'))
  }
  }, []);


  
const carica=()=>{

  createLoad({prodotto: location.state._id, quantita:qta}).then((element) => {
    if (element.isError) {
      setError(element.messageError);
    } else {
      setError("");
      //setProduct(element.data);
      navigate('/listacarico')
    }
  });    
}

const scarica=()=>{
  createUnload({prodotto: location.state._id, quantita:qta}).then((element) => {
    if (element.isError) {
      setError(element.messageError);
    } else {
      setError("");
      //setProduct(element.data);
      navigate('/listascarico')
    }
  });   
}



  return (
    <div>
      <div className="detailsPage">
        {error && false && (
          <div style={{ textAlign: "left", width: "100%" }}>
            <p className="alert alert-danger mt-3">
              <b>Attenzione!</b>
              <br></br>
              <span>{error}</span>
            </p>
          </div>
        )}
        {/*
        fae cmq chiamata meglio-- 
        serve nuova chiamata in backend popolata -- in url aggiungere id
        
        */}
        <div className="row">
          <h2 className={"col-6 " + (darkMode ? "testolight" : "testodark")} style={{ textAlign: "left" }}>
            {mode} 
          </h2>
          {/*<p className="col-6" style={{ textAlign: "right" }}>
            <button
              type="button"
              className={
                "btn btn-outline-success " +
                (darkMode ? "nav2button" : "nav2buttonl")
              }
              onClick={() => {

              }}
            >
              <i className="bi bi-box-arrow-in-down"></i>
              {" Carica"}
            </button>
            </p>*/}
        </div>
        {/*
        in back scarico se quantita troppo altr??? ho fatto controllo?
in carico no problema anczi no limite max?
serve x forza per pulsanti -- metti cap tipp 9990
attenzione se usata stessa pagina


separato da scarico----?
        */}

        <div className="row">
          <p className={"col-12 col-sm-3 " + (darkMode ? "testolight" : "testodark")} style={{ textAlign: "left", height:'fit-content' }}>
            quantità {mode=='carico' && <small>(max 999)</small>}
          </p>
          <p className="col-12 col-sm-6">
            <QuantitySelector 
            initialQuantity={qta} 
            setUpperQuantity={setQta} //non ricordo a cosa serve -> x sapere valore 
            //del selector
            prodQuantity={mode=='carico' ? 999 : product.quantita}// in teoria sembra ok no non vanno pulsanti
            ></QuantitySelector>
          </p>
          <p className="col-12 col-sm-3" style={{ textAlign: "right" }}>
            {mode=='carico' && <button
              type="button"
              className={
                "btn btn-outline-success " +
                (darkMode ? "nav2button" : "nav2buttonl")
              }
              onClick={() => {
                carica()
              }}
            >
              <i className="bi bi-box-arrow-in-down"></i>
              {" Carica"}
            </button>}
            {mode=='scarico' && <button
              type="button"
              className={
                "btn btn-outline-success " +
                (darkMode ? "nav2button" : "nav2buttonl")
              }
              onClick={() => {
                scarica()
              }}
            >
              <i className="bi bi-box-arrow-up"></i>
              {" Scarica"}
            </button>}
          </p>
        </div>

        <div className=" text flex-column" style={{}}>
          <div className="row flex-wrap align-items-center">
            <div
              className={
                "col-12 text-center pt-3  pb-3 " +
                (darkMode ? "sfondo3" : "sfondo1")
              }
            >
                    <CardMiniProdotto
                      prodotto={product}
                      //key={element.id}
                      key={product._id}
                      noresize={true}
                      click={()=>{}}
                    ></CardMiniProdotto>

              {/*!orders.length > 0 && <p>Non hai ancora ordinato nulla</p>*/}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { SCarico };
