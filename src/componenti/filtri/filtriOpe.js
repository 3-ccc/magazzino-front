import { DarkModeContext } from "../../tema/DarkModeContext";
import { useContext, useEffect, useState } from "react";
import { useWindowDimensions } from "../../altro/windowDimensions";

function FiltriOpe({ filtri, setFiltri }) {
  const { darkMode } = useContext(DarkModeContext);
  const { wi } = useWindowDimensions();
  const [buttonState, setButtonState] = useState(false);

  //console.log(filtri);

  useEffect(() => {
    if (wi >= 992 && buttonState === false) {
      document.getElementById("buttoncollapse").click();
    }
  }, [wi, buttonState]);
  useEffect(() => {
    if (wi >= 992 /*&& buttonState === false*/) {
      document.getElementById("collapsefilter").classList.add('show');
    }
    //console.log('cambio tema')

  }, [darkMode]);

  /*
filtri
  tipo  -> tendina tutte carico scarico
  ffdata  ->data
  fidata  ->data
  prodotto  ->asc-desc
  agente    ->asc-desc
  */

  
  //tra 2 date sara complesso---
  
  return (
    <div>

      {
        <button
          id="buttoncollapse"
          className={
            "btn btn-outline-success " + (darkMode ? "nav2button" : "nav2buttonl")
          }
          type="button"
          style={{ display: wi >= 992 ? "none" : "block" }}
          data-toggle="collapse"
          data-target="#collapsefilter"
          aria-expanded="false"
          aria-controls="collapsefilter"
          onClick={() => {
            setButtonState(!buttonState);
          }}
        >
          <i className="bi bi-list"></i>
        </button>
      }
      {
        <div
          className={
            "collapse card mb-1 " + (darkMode ? "sfondocard1" : "sfondocard3")
          }
          style={{ width: "100%" }}
          id="collapsefilter"
        >
          {
            <div className="d-flex flex-wrap justify-content-center row m-0">
              <div
                className={
                  "card col-sm-4 col-md-3 col-lg-2 col-xl-2 p-0 innercardorders"
                }
                onClick={() => {
                  if (filtri.agente === "asc") {
                    setFiltri({
                      ffdata: filtri.ffdata,
                      fidata: filtri.fidata,
                      prodotto: null,
                      tipo: filtri.tipo,
                      agente: "desc",
                    });
                  } else {
                    setFiltri({
                      ffdata: filtri.ffdata,
                      fidata: filtri.fidata,
                      prodotto: null,
                      tipo: filtri.tipo,
                      agente: "asc",
                    });
                  }
                }}
              >
                <div
                  className="card-body p-1 row"
                  style={{ maxHeight: "50vh" }}
                >
                  <p className="card-title col-12 ">
                    <b>Agente</b>

                    {filtri.agente === "asc" && (
                      <i
                        style={{
                          color: darkMode
                            ? "rgba(0,0,0,0.5)"
                            : "rgba(255,255,255,0.5)",
                        }}
                        className="bi bi-arrow-up-short"
                      ></i>
                    )}
                    {filtri.agente === "desc" && (
                      <i
                        style={{
                          color: darkMode
                            ? "rgba(0,0,0,0.5)"
                            : "rgba(255,255,255,0.5)",
                        }}
                        className="bi bi-arrow-down-short"
                      ></i>
                    )}
                  </p>
                </div>
              </div>
              <div
                className={
                  "card col-sm-4 col-md-3 col-lg-3 col-xl-3 p-0 innercardorders"
                }
                onClick={() => {
                  if (filtri.prodotto === "asc") {
                    setFiltri({
                      ffdata: filtri.ffdata,
                      fidata: filtri.fidata,
                      prodotto: "desc",
                      tipo: filtri.tipo,
                      agente: null,
                    });
                  } else {
                    setFiltri({
                      ffdata: filtri.ffdata,
                      fidata: filtri.fidata,
                      prodotto: "asc",
                      tipo: filtri.tipo,
                      agente: null,

                    });
                  }
                }}
              >
                <div
                  className="card-body p-1 row "
                  style={{ maxHeight: "50vh" }}
                >
                  <p className="card-title col-12 ">
                    <b>Prodotto</b>

                    {filtri.prodotto === "asc" && (
                      <i
                        style={{
                          color: darkMode
                            ? "rgba(0,0,0,0.5)"
                            : "rgba(255,255,255,0.5)",
                        }}
                        className="bi bi-arrow-up-short"
                      ></i>
                    )}
                    {filtri.prodotto === "desc" && (
                      <i
                        style={{
                          color: darkMode
                            ? "rgba(0,0,0,0.5)"
                            : "rgba(255,255,255,0.5)",
                        }}
                        className="bi bi-arrow-down-short"
                      ></i>
                    )}
                  </p>
                </div>
              </div>

              {
                <div
                  className={
                    "card col-sm-5 col-md-4 col-lg-3 col-xl-3 p-0 innercardorders"
                  }
                >
                  <select
                    className="custom-select col-6 col-lg-8 mx-auto my-auto"
                    onChange={(el) => {
                      setFiltri({
                        ...filtri,
                        tipo: el.target.value,
                      });
                    }}
                  >
                    <option value={"tutte"}>Tutte</option>
                    <option value={"carico"}>Carico</option>
                    <option value={"scarico"}>Scarico</option>
                  </select>
                </div>
              }
              <div
                className={
                  "card col-sm-6 col-md-5 col-lg-4 col-xl-4 p-0 innercardorders"
                }
                onClick={() => {
                  //set date
                }}
              >
                <div
                  className="card-body p-1 row my-auto "
                  style={{ maxHeight: "50vh" }}
                >
                  <p className="card-title col-6 my-auto">
                  <input type="text" className="form-control" placeholder="da"
                   onFocus={(e) => (e.target.type = "date")}
                   onBlur={(e) => {
                    //solo se data non valida null ecc
                    if(filtri.fidata=='' || filtri.fidata==undefined){
                      e.target.type = "text"
                    }
                }}
                   onChange={(el) => {
                    setFiltri({
                      ...filtri,
                      fidata: el.target.value,
                    });
                    //console.log(filtri.fidata)
                  }}></input>
                  </p>
                  <p className="card-title col-6 my-auto">
                  <input type="text" className="form-control" placeholder="a"
                   onFocus={(e) => {
                    e.target.type = "date"
                    //console.log(filtri.ffdata)
                  }}
                   onBlur={(e) => {
                    //solo se data non valida null ecc
                    if(filtri.ffdata=='' || filtri.ffdata==undefined){
                      e.target.type = "text"
                    }
                }}
                   onChange={(el) => {
                    setFiltri({
                      ...filtri,
                      ffdata: el.target.value,
                    });
                    //console.log(filtri.ffdata)
                  }}
                   ></input>
                  </p>
                </div>
              </div>
            </div>
            
          }
        </div>
      }
      {/*modal */}
      {/*<DialogOrderDetail ordine={torre}></DialogOrderDetail>*/}
    </div>
  );
}

export default FiltriOpe;
