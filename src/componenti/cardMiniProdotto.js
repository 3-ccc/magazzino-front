import { DarkModeContext } from "../tema/DarkModeContext";
import { useContext } from "react";
import { InnerCard } from "./innerCard";
import { useWindowDimensions } from "../altro/windowDimensions";
import { useNavigate } from "react-router-dom";
//import { deleteProduct } from "../api/indexApi";

function CardMiniProdotto({ prodotto, indice, click, noresize }) {
  const { darkMode } = useContext(DarkModeContext);
  const { wi } = useWindowDimensions();
  const navigate = useNavigate();

//console.log(click)
//console.log(prodotto)
//no va popolato

  function internalDelete() {
    /*deleteProduct(prodotto.id_product).then((element) => {
      if (element.isError) {
      } else {
        deleteItem();
      }
    });*/
  }

  //a questo punto davvero conviene nome separato
  //riutilizzavile
  //poi 'codice' generato automaticamente  in creazione e modifica ->nome completo
  //potrebbe anche non servire ma...
  //pero a questo punto tutto obbligatorio e solo se tutto uguale noon creabile
  //tutto 'cose con id' 
  //possibilita nome nuovo al volo      ->in questo caso sempre ok xke id nome nuovo
//->sarebbero 2 chiamate diverse?
//fai prima salva poi scegli

//tutti campi obbligatori

//get tutti prodotti    popolati? direi si tanto non modificabili
//get prod singolo      popolati? no? tatno mi servono tendine--pero 
//                          se si riesce entrambi meglio-> no tanto devo 
                //  recuperarli e in tendina serve id



//in back
//mod resta uguale -> sarà solo da aggiungere codice/nomecompleto
//crea -> controlli che campi corretti ci sono già  
//          -> da aggiungere obbligo che ci siano tutti

/*
        azioni non serve + solo carico scarico su click (bottone?)  ++ filtri!
        colore??? se si anche in back!!! 
        nome diventa x univoco  camino rame aperto tondo d10 colore
*/

  return (
    <div onClick={()=>click(prodotto)}>

      <div
        className={"card mb-1 " + (darkMode ? "sfondocard1" : "sfondocard3")}
        style={{ width: "100%" }}
        data-toggle="modal"
        data-target="#exampleModal"
      >
        <div className="d-flex flex-wrap justify-content-center row m-0">
          <div
            className={"card col-sm-4 col-md-3 col-lg-3 col-xl-2 p-0 innercardorders"}
          >
            <InnerCard
              w={noresize ? 1 :wi}
              i={indice}
              title={"Nome"}
              description={prodotto?.nome?.nome}
            ></InnerCard>
          </div>
          <div
            className={
              "card col-sm-4 col-md-3 col-lg-2 p-0 innercardorders"
            }
          >
            <InnerCard
              w={noresize ? 1 :wi}
              i={indice}
              title={"Categoria"}
              description={prodotto?.categoria?.nome}
            ></InnerCard>
          </div>
          <div
            className={"card col-sm-4 col-md-3 col-lg-2 p-0 innercardorders"}
          >
            <InnerCard
              w={noresize ? 1 :wi}
              i={indice}
              title={"Sottocategoria"}
              description={prodotto?.sottocategoria?.nome}
            ></InnerCard>
          </div>
          <div
            className={
              "card col-sm-3 col-md-2 col-lg-2 p-0 innercardorders"
            }
          >
            <InnerCard
              w={noresize ? 1 :wi}
              i={indice}
              title={"Materiale"}
              description={prodotto?.materiale?.nome}
            ></InnerCard>
          </div>
          <div
            className={"card col-sm-4 col-md-3 col-lg-2 col-xl-1 p-0 innercardorders"}
          >
            <InnerCard
              w={noresize ? 1 :wi}
              i={indice}
              title={"Quantità"}
              description={prodotto?.quantita}
              red={(prodotto?.quantita<prodotto?.limitescorta) ? -1 : (prodotto?.quantita==prodotto?.limitescorta ? 0 : 1)}
            ></InnerCard>
          </div>
          <div
            className={"card col-sm-4 col-md-3 col-lg-2  p-0 innercardorders"}
          >
            <InnerCard
              w={noresize ? 1 :wi}
              i={indice}
              title={"Misura"}
              description={prodotto?.misura?.nome}
            ></InnerCard>
          </div>
          <div
            className={"card col-sm-3 col-md-2 col-lg-2 col-xl-1  p-0 innercardorders"}
          >
            <InnerCard
              w={noresize ? 1 :wi}
              i={indice}
              title={"Colore"}
              description={prodotto?.colore?.nome}
            ></InnerCard>
          </div>
          {/*indice !== -1 && (
            <div
              className={
                "card col-sm-3 col-md-2 col-lg-2 col-xl-1 p-0 innercardorders"
              }
            >
              <div className="card-body p-1 row">*/}
                {/*<p className="card-title col-sm-6 col-6 m-0 pr-0">
                  <button
                    type="button"
                    className={
                      "btn btn-outline-success " +
                      (darkMode ? "nav2button" : "nav2buttonl")
                    }
                    onClick={() => {
                      navigate("/store/detail/" + prodotto.id_product);
                    }}
                  >
                  <i className="bi bi-pencil"></i>*/}
                    {/*" modifica"*/}
                  {/*</button>
                </p>*/}
                {/*<p className="card-text col-sm-6 col-6 pl-0">
                  <button
                    type="button"
                    className={
                      "btn btn-outline-danger " +
                      (darkMode ? "nav2button" : "nav2buttonl")
                    }
                    onClick={internalDelete}
                  >
                  <i className="bi bi-trash3"></i>*/}
                    {/*" elimina"*/}
                  {/*</button>
                </p>*/}
              {/*</div>
            </div>
              )*/}
          {/*indice === -1 && (
            <div
              className={
                "card col-sm-3 col-md-2 col-lg-2 col-xl-1 p-0 innercardorders"
              }
            >
              <InnerCard
                w={wi}
                title={"Colore"}
                description={prodotto?.colore/*" "*/}
                {/*i={indice}
              ></InnerCard>
            </div>
          )*/}
        </div>
        {/*immagine + dati 
      <div className="m-2" style={{ width: "100%" }}>
        <div className=" text flex-column" style={{}}>
          <div className="row flex-wrap align-items-center pb-3">
            <div
              className="form-group row col-12"
              style={{ backgroundColor: "gray" }}
            >
              <div className="col-12">
                <div
                  className="col-sm-6 col-12"
                  style={{ backgroundColor: "dodgerblue" }}
                >
                  <label
                    htmlFor="telefonoaccount"
                    className=" col-form-label"
                    style={{ backgroundColor: "black" }}
                  >
                    Telefono
                  </label>
                  <div className="" style={{ backgroundColor: "gray" }}>
                    <p id="telefonoaccount">1234567</p>
                  </div>
                </div>
                <div className="col-sm-6" style={{ backgroundColor: "orange" }}>
                  <label
                    htmlFor="telefonoaccount"
                    className=" col-form-label"
                    style={{ backgroundColor: "gray" }}
                  >
                    corr
                  </label>
                  <div className="" style={{ backgroundColor: "dodgerblue" }}>
                    <p id="telefonoaccount">brt</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>*/}
      </div>
      {/*modal */}
      {/*<DialogOrderDetail ordine={prodotto}></DialogOrderDetail>*/}
    </div>
  );
}

export default CardMiniProdotto;
