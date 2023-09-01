import { DarkModeContext } from "../../tema/DarkModeContext";
import { useContext, useEffect, useState } from "react";
import { useWindowDimensions } from "../../altro/windowDimensions";
import { getTendine } from "../../api/indexApi";

function FiltriProd({ filtri, setFiltri }) {
  const { darkMode } = useContext(DarkModeContext);
  const { wi } = useWindowDimensions();
  const [buttonState, setButtonState] = useState(false);
  const [tendine, setTendine] = useState({nomi:[],categorie:[], misure:[],materiali:[], colori:[], sottocategorie:[]});

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

  useEffect(() => {

    getTendine().then((element) => {
    if (!element.isError) {

      //console.log(element)
      setTendine(element.data)
    }else{
      console.log('errore gettendine')
    }
    });

/*
  setTendine({
    nomi:[{_id:'z', nome:'camino tondo'},{_id:'x', nome:'aletta'}],
    colori:[{_id:'y', nome:'verde'},{_id:'k', nome:'rosso'}],
    categorie:[{_id:'aaa', nome:'cat1'},{_id:'bbb', nome:'cat12'}],
    materiali:[{_id:'ccc', nome:'rame'},{_id:'ddd', nome:'alluminio'}],
    misure:[{_id:'e', nome:'d10'},{_id:'f', nome:'d08'}],
    sottocategorie:[{_id:'g', nome:'aperte', categoria:'aaa'},{_id:'h', nome:'chiuse', categoria:'bbb'}]
    //ma solo di categ selezionata---> se non selez categoria no sottocat
  })*/
}, []);


  /*
filtri
  nome  ->  id                      -
  materiale  -> id                  -
  misura  ->  id
  categoria    -> id
  colore  ->  id
  sottocategoria  ->  id
  sottoscorta   -> id tendina tutti si no -
  codice prodotto   ->  asc desc    -
  limitescorta    ->  asc desc      - 
  quantita  ->  asc desc            -

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
                  "card col-sm-4 col-md-3 col-lg-2 col-xl-1 p-0 innercardorders"
                }
                onClick={() => {
                  if (filtri.codice === "asc") {
                    setFiltri({
                      nome: filtri.nome,
                      materiale: filtri.materiale,
                      misura: filtri.misura,
                      categoria: filtri.categoria,
                      colore: filtri.colore,
                      sottocategoria: filtri.sottocategoria,
                      sottoscorta: filtri.sottoscorta,
                      limitescorta: null,
                      quantita: null,
                      codice: "desc",
                    });
                  } else {
                    setFiltri({
                      nome: filtri.nome,
                      materiale: filtri.materiale,
                      misura: filtri.misura,
                      categoria: filtri.categoria,
                      colore: filtri.colore,
                      sottocategoria: filtri.sottocategoria,
                      sottoscorta: filtri.sottoscorta,
                      limitescorta: null,
                      quantita: null,
                      codice: "asc",
                    });
                  }
                }}
              >
                <div
                  className="card-body p-1 row"
                  style={{ maxHeight: "50vh" }}
                >
                  <p className="card-title col-12 my-auto ">
                    <b>Codice</b>

                    {filtri.codice === "asc" && (
                      <i
                        style={{
                          color: darkMode
                            ? "rgba(0,0,0,0.5)"
                            : "rgba(255,255,255,0.5)",
                        }}
                        className="bi bi-arrow-up-short"
                      ></i>
                    )}
                    {filtri.codice === "desc" && (
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
                  "card col-sm-4 col-md-3 col-lg-2 col-xl-2 p-0 innercardorders"
                }
                onClick={() => {
                  if (filtri.quantita === "asc") {
                    setFiltri({
                      nome: filtri.nome,
                      materiale: filtri.materiale,
                      misura: filtri.misura,
                      categoria: filtri.categoria,
                      colore: filtri.colore,
                      sottocategoria: filtri.sottocategoria,
                      sottoscorta: filtri.sottoscorta,
                      limitescorta: null,
                      codice: null,
                      quantita: "desc",
                    });
                  } else {
                    setFiltri({
                      nome: filtri.nome,
                      materiale: filtri.materiale,
                      misura: filtri.misura,
                      categoria: filtri.categoria,
                      colore: filtri.colore,
                      sottocategoria: filtri.sottocategoria,
                      sottoscorta: filtri.sottoscorta,
                      limitescorta: null,
                      codice: null,
                      quantita: "asc",
                    });
                  }
                }}
              >
                <div
                  className="card-body p-1 row"
                  style={{ maxHeight: "50vh" }}
                >
                  <p className="card-title col-12 my-auto ">
                    <b>Quantita</b>

                    {filtri.quantita === "asc" && (
                      <i
                        style={{
                          color: darkMode
                            ? "rgba(0,0,0,0.5)"
                            : "rgba(255,255,255,0.5)",
                        }}
                        className="bi bi-arrow-up-short"
                      ></i>
                    )}
                    {filtri.quantita === "desc" && (
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
                  "card col-sm-4 col-md-3 col-lg-2 col-xl-2 p-0 innercardorders"
                }
                onClick={() => {
                  if (filtri.limitescorta === "asc") {
                    setFiltri({
                      nome: filtri.nome,
                      materiale: filtri.materiale,
                      misura: filtri.misura,
                      categoria: filtri.categoria,
                      colore: filtri.colore,
                      sottocategoria: filtri.sottocategoria,
                      sottoscorta: filtri.sottoscorta,
                      codice: null,
                      quantita: null,
                      limitescorta: "desc",
                    });
                  } else {
                    setFiltri({
                      nome: filtri.nome,
                      materiale: filtri.materiale,
                      misura: filtri.misura,
                      categoria: filtri.categoria,
                      colore: filtri.colore,
                      sottocategoria: filtri.sottocategoria,
                      sottoscorta: filtri.sottoscorta,
                      codice: null,
                      quantita: null,
                      limitescorta: "asc",
                    });
                  }
                }}
              >
                <div
                  className="card-body p-1 row"
                  style={{ maxHeight: "50vh" }}
                >
                  <p className="card-title col-12 my-auto ">
                    <b>Limitescorta</b>

                    {filtri.limitescorta === "asc" && (
                      <i
                        style={{
                          color: darkMode
                            ? "rgba(0,0,0,0.5)"
                            : "rgba(255,255,255,0.5)",
                        }}
                        className="bi bi-arrow-up-short"
                      ></i>
                    )}
                    {filtri.limitescorta === "desc" && (
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
                  "card col-sm-4 col-md-3 col-lg-3 col-xl-2 p-0 innercardorders"
                }
              >
                <div className="row card-body m-0 p-1" >
                    <small className="col-12"><b>Nome</b></small>
                    <select
                          className={
                            "custom-select col-10 mx-auto my-auto "
                          }
                          value={filtri.nome}
                          onChange={(el) => {

                            setFiltri({
                              ...filtri,
                              nome: el.target.value,
                            });

                          }}
                        >
                          <option value={""}></option>
                          {tendine.nomi && tendine.nomi.length && tendine.nomi.length > 0 &&
                            tendine.nomi.map((c) => {
                              return (
                                <option value={c._id} key={c._id}>
                                  {c.nome}
                                </option>
                              );
                            })}
                        </select>
                    </div>
              </div>

              {
                <div
                  className={
                    "card col-sm-5 col-md-4 col-lg-3 col-xl-3 p-0 innercardorders"
                  }
                >
                      <div className="row card-body m-0 p-1" >
                    <small className="col-12"><b>Sottoscorta</b></small>
                  <select
                    className="custom-select col-10 mx-auto my-auto"
                    onChange={(el) => {
                      setFiltri({
                        ...filtri,
                        sottoscorta: el.target.value,
                      });
                    }}
                  >
                    <option value={"tutte"}>Tutte</option>
                    <option value={true}>sottoscorta</option>
                    <option value={false}>non sottoscorta</option>
                  </select>
                  </div>
                </div>
              }
              
              <div
                className={
                  "card col-sm-4 col-md-3 col-lg-2 col-xl-2 p-0 innercardorders"
                }
              >
                <div className="row card-body m-0 p-1" >
                    <small className="col-12"><b>Materiale</b></small>
                    <select
                          className={
                            "custom-select col-10 mx-auto my-auto "
                          }
                          value={filtri.materiale}
                          onChange={(el) => {

                            setFiltri({
                              ...filtri,
                              materiale: el.target.value,
                            });

                          }}
                        >
                          <option value={""}></option>
                          {tendine.materiali && tendine.materiali.length && tendine.materiali.length > 0 &&
                            tendine.materiali.map((c) => {
                              return (
                                <option value={c._id} key={c._id}>
                                  {c.nome}
                                </option>
                              );
                            })}
                        </select>
                    </div>
              </div>

              <div
                className={
                  "card col-sm-4 col-md-3 col-lg-2 col-xl-3 p-0 innercardorders"
                }
              >
                <div className="row card-body m-0 p-1" >
                    <small className="col-12"><b>Misura</b></small>
                    <select
                          className={
                            "custom-select col-10 mx-auto my-auto "
                          }
                          value={filtri.misura}
                          onChange={(el) => {

                            setFiltri({
                              ...filtri,
                              misura: el.target.value,
                            });

                          }}
                        >
                          <option value={""}></option>
                          {tendine.misure && tendine.misure.length && tendine.misure.length > 0 &&
                            tendine.misure.map((c) => {
                              return (
                                <option value={c._id} key={c._id}>
                                  {c.nome}
                                </option>
                              );
                            })}
                        </select>
                    </div>
              </div>

              <div
                className={
                  "card col-sm-4 col-md-3 col-lg-3 col-xl-3 p-0 innercardorders"
                }
              >
                <div className="row card-body m-0 p-1" >
                    <small className="col-12"><b>Categoria</b></small>
                    <select
                          className={
                            "custom-select col-10 mx-auto my-auto "
                          }
                          value={filtri.categoria}
                          onChange={(el) => {

                            setFiltri({
                              ...filtri,
                              categoria: el.target.value,
                            });

                          }}
                        >
                          <option value={""}></option>
                          {tendine.categorie && tendine.categorie.length && tendine.categorie.length > 0 &&
                            tendine.categorie.map((c) => {
                              return (
                                <option value={c._id} key={c._id}>
                                  {c.nome}
                                </option>
                              );
                            })}
                        </select>
                    </div>
              </div>

              <div
                className={
                  "card col-sm-4 col-md-3 col-lg-2 col-xl-3 p-0 innercardorders"
                }
              >
                <div className="row card-body m-0 p-1" >
                    <small className="col-12"><b>Colore</b></small>
                    <select
                          className={
                            "custom-select col-10 mx-auto my-auto "
                          }
                          value={filtri.colore}
                          onChange={(el) => {

                            setFiltri({
                              ...filtri,
                              colore: el.target.value,
                            });

                          }}
                        >
                          <option value={""}></option>
                          {tendine.colori && tendine.colori.length && tendine.colori.length > 0 &&
                            tendine.colori.map((c) => {
                              return (
                                <option value={c._id} key={c._id}>
                                  {c.nome}
                                </option>
                              );
                            })}
                        </select>
                    </div>
              </div>

              <div
                className={
                  "card col-sm-4 col-md-3 col-lg-3 col-xl-3 p-0 innercardorders"
                }
              >
                <div className="row card-body m-0 p-1" >
                    <small className="col-12"><b>Sottocategoria</b></small>
                    <select
                          className={
                            "custom-select col-10 mx-auto my-auto "
                          }
                          value={filtri.sottocategoria}
                          onChange={(el) => {

                            setFiltri({
                              ...filtri,
                              sottocategoria: el.target.value,
                            });

                          }}
                        >
                          <option value={""}></option>
                          {tendine.sottocategorie && tendine.sottocategorie.length && tendine.sottocategorie.length > 0 &&
                            tendine.sottocategorie.map((c) => {
                              return (
                                <option value={c._id} key={c._id}>
                                  {c.nome}
                                </option>
                              );
                            })}
                        </select>
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

export default FiltriProd;
