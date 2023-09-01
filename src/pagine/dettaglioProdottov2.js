import "./pagine.css";
import { DarkModeContext } from "../tema/DarkModeContext";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { 
  getSingleProduct,
  createProduct,
  modifyProduct,
  getTendine,
} from "../api/indexApi";

function ProductNewModPage({ mod }) {
  const params = useParams();

  const { darkMode } = useContext(DarkModeContext);
  const [isOnModify, setIsOnModify] = useState(mod === "detail" ? false : true);
  const [error, setError] = useState(null);
  const [nomep, setNomep] = useState({nome:'',_id:''});
  const [msgConferma, setMsgConferma] = useState(false);
  const [over, setOver] = useState(false);
  const [px, setPx] = useState();
  const [tendine, setTendine] = useState({nomi:[],categorie:[], misure:[],materiali:[], colori:[], sottocategorie:[]});
  const [product, setProduct] = useState({
    nome: "",
    categoria: "",
    description: "",
    limitescorta: 0,
    sottoscorta: "",
    quantita: 1,
    img: "",
    sottocategoria:"",
    materiale:"",
    colore:"",
    misura:"",
    //pezzi magazzino
  });


/*

codice da agg se servira
qui non credo non modificabile

*/

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

  const [productorig, setProductorig] = useState({
    nome: "",
    categoria: "",
    description: "",
    limitescorta: 0,
    sottoscorta: true,
    quantita: 1,
    img: "",
    sottocategoria:"",
    materiale:"",
    misura:"",
    colore:"",
    //pezzi magazzino
  });
  var idOfProduct = undefined;

  if (params.id) {
    idOfProduct = params.id//parseInt(params?.id);//mica int qui!
  }

  useEffect(() => {
    if (idOfProduct) {
      getSingleProduct(idOfProduct).then((element) => {
      //retrieveSingleProduct(idOfProduct).then((element) => {
        if (element.isError) {
          setError(element.messageError);
        } else {
          setError("");
          setProduct(element.data);
          setProductorig(element.data);
        }
      });
      const tn=tendine.nomi.find((e)=>{
        if(e._id==product.nome){
          return true
        }else{
          return false
        }
        
      })
      //console.log(tn)
      setNomep(tn)
      /*
      setProduct(        {
        nome:'z',//"camino rame tondo d10 aaa bb",
        sottocategoria:"h",
        categoria:"aaa",
        materiale:"ddd",
        misura:"e",
        colore:'y',
        quantita:5,
        limitescorta:10,
        sottoscorta:true,
        img:"",
      })
      setProductorig(        {
        nome:'z',//"camino rame tondo d10 aaa bb",
        sottocategoria:"h",
        categoria:"aaa",
        materiale:"ddd",
        misura:"e",
        colore:"y",
        quantita:5,
        limitescorta:10,
        sottoscorta:true,
        img:"",
      })
*/
    }
    /*setTendine({
      nomi:[{_id:'z', nome:'camino tondo'},{_id:'x', nome:'aletta'}],
      colori:[{_id:'y', nome:'verde'},{_id:'k', nome:'rosso'}],
      categorie:[{_id:'aaa', nome:'cat1'},{_id:'bbb', nome:'cat12'}],
      materiali:[{_id:'ccc', nome:'rame'},{_id:'ddd', nome:'alluminio'}],
      misure:[{_id:'e', nome:'d10'},{_id:'f', nome:'d08'}],
      sottocategorie:[{_id:'g', nome:'aperte', categoria:'aaa'},{_id:'h', nome:'chiuse', categoria:'bbb'}]
      //ma solo di categ selezionata---> se non selez categoria no sottocat
    })*/

  }, [idOfProduct]);

  useEffect(() => {
    const tn=tendine.nomi.find((e)=>{
      if(e._id==product.nome){
        return true
      }else{
        return false
      }
      
    })
    //console.log(tn)
    setNomep(tn)

  }, [product.nome]);

  useEffect(() => {
    getTendine().then((element) => {
      if(!element.isError){
      //console.log(element.data)
      setTendine(element.data)
    }else{
      console.log('errore gettendine')
    }
    });

  }, []);

  const modifyInfo = () => {
    setIsOnModify(true);
    setMsgConferma("");
  };

  useEffect(() => {
    setError(null);
    //console.log(product)

    if(mod=='new'){
      if(/*!product.quantita ||*/ product.quantita<0 || product.quantita==''){
        setError('Inserire quantità valida')
      }
      if((''+product.quantita).includes('.') || (''+product.quantita).includes(',')){
        setError('Inserire quantità intera')
      }
    }
    //solo interi           +o-

    //se non c'è limitescorta problemi?
    if(/*!product.limitescorta ||*/ product.limitescorta<0 || product.limitescorta==''){//rivedere interi
      setError('Inserire limitescorta valido')
    }
    if((''+product.limitescorta).includes('.') || (''+product.limitescorta).includes(',')){
      setError('Inserire limitescorta intero')
    }

    if (!product.colore) {
      setError("Selezionare colore");
    }

    if (!product.materiale) {
      setError("Selezionare materiale");
    }

    if (!product.categoria) {
      setError("Selezionare categoria");
    }

    if (!product.nome /*|| product.nome.trimEnd().trimStart()==''*/) {
      setError("Inserire nome");
    }

  }, [product.nome, product.quantita, product.limitescorta, product.categoria, product.materiale, product.colore]);

  const confirmSave = () => {
    if (
      product.nome && //product.nome.trimEnd().trimStart()!='' &&
      product.categoria  &&
      product.materiale &&
      product.colore 

    ) {
      console.log(product)
      if (error === null) {
        //chiamata di api di salvataggio

        //se corretto
        setIsOnModify(false);
        //dispatch(setSessionUser({ user: product }));
        if (mod === "new") {
          //console.log({ product });
          createProduct(product).then((element) => {
            if (element.isError) {
              setError(element.messageError);
            } else {
              setProduct({
                nome: "",
                categoria: "",
                description: "",
                limitescorta: "",
                sottoscorta: "",
                quantita: 1,
                img: "",
                sottocategoria:"",
                materiale:"",
                misura:"",
                colore:"",
              });
              setMsgConferma(true);
            }
          });
        } else {
          modifyProduct(product).then((element) => {
            if (element.isError) {
              setError(element.messageError);
            } else {
              setMsgConferma(true);
            }
          });
        }
      }
    }
  };

  useEffect(()=>{
    setPx(document.getElementById('m').offsetHeight)
  },[over])

  return (
    <div className="detailsPage">
      <h2
        className={darkMode ? "testolight" : "testodark"}
        style={{ width: "100%" }}
      >
        {idOfProduct
          ? "Modifica di " + nomep?.nome 
          : "Aggiunta di un nuovo prodotto"}
          
      </h2>
      da cell funziona? alrimenti on clik---
      <div className="row flex-wrap align-items-center">
        <div className={"col-10 text-center "} id="m">
          {over && <small>Il 'codice' viene generato automaticamente nel seguente modo: </small>}
          {over && <small>nome + materiale + misura + sottocategoria + colore </small>}
        </div>
        <div className={"flex-wrap col-2 text-center"} id="l" style={{ height:(px ? px+'px' : '100%' )}} 
        onMouseOver={()=>setOver(true)} 
        onMouseOut={()=>setOver(false)}>
          <div className="d-flex p-0 m-0 align-items-center justify-content-center" style={{ height: '100%'}}>
          <i className="bi bi-question-circle" ></i>
          </div>
        </div>
      </div>

      {/* e la categoria?*/}<br></br>

      <div className=" text flex-column" style={{}}>
        <div className="row flex-wrap align-items-center pb-3">
          <div
            style={{ width: "49%" }}
            className={
              "col-sm-8 col-12 text-center pt-3 " +
              (darkMode ? "sfondo3" : "sfondo1")
            }
          >
            {/*immagine + dati */}
            <div className="m-2">
              {/*<h2 className={darkMode ? "testolight" : "testodark"}>product</h2>*/}
              <div className=" text flex-column" style={{}}>
                <div className="row flex-wrap align-items-center pb-3">
                  <div
                    style={
                      {
                        //maxHeight: "150px",
                      }
                    }
                    className={
                      "col-sm-3 col-12 text-center pt-3 "
                      //  (darkMode ? "sfondo3" : "sfondo1")
                    }
                  >
                    <i className="bi bi-box-seam"
                      style={{
                        width: "100%",
                        height: "100%",
                        maxHeight: "200px",
                        maxWidth: "200px",
                        borderRadius: 100,
                        fontSize: '2em',
                        alignSelf:'center'
                      }}
                      /*src={
                        product.img
                          ? require(`../../img/${product.img}`)
                          : require(`../../img/intero.png`)
                      }*/
                      alt="product placeholder"
                    ></i>
                  </div>
                  <div
                    style={{ width: "49%" }}
                    className={
                      "col-sm-9 col-12 align-self-start text-center " +
                      (darkMode
                        ? "testolight sfondocard1"
                        : "testodark sfondocard3")
                    }
                  >
                    <div style={{ textAlign: "left" }}>
                      {/*<div className="form-group row mt-3">
                        <label
                          htmlFor="idproduct"
                          className="col-md-3 col-form-label"
                        >
                          Id*
                        </label>
                        <div className="col-md-9">
                          <input
                            type="text"
                            disabled={true}
                            className={
                              true
                                ? "w-100" // "form-control-plaintext toglie sfondo ma responsive"
                                : "form-control"
                            }
                            id="idproduct"
                            value={product.id_product}
                          />
                        </div>
                          </div>*/}
                      <div className="form-group row mt-3">
                        <label
                          htmlFor="titoloproduct"
                          className="col-md-3 col-form-label"
                        >
                          Nome*
                        </label>
                        <div className="col-md-9">
                        <select
                          disabled={!isOnModify}
                          className={
                            (!isOnModify
                              ? "form-control-plaintext"
                              : "form-control") + " custom-select"
                          }
                          value={product.nome}
                          onChange={(el) => {

                            setProduct({
                              ...product,
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
                      <div  className="form-group row ">
                      <label
                        htmlFor="pubblicaPrivata"
                        className="col-md-3 col-form-label"
                      >
                        Categoria*
                      </label>
                      <div className="col-md-9">
                        <select
                          disabled={!isOnModify}
                          className={
                            (!isOnModify
                              ? "form-control-plaintext"
                              : "form-control") + " custom-select"
                          }
                          id="pubblicaPrivata"
                          value={product.categoria}
                          onChange={(el) => {

                            setProduct({
                              ...product,
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
                      
                      <div  className="form-group row ">
                      <label
                        htmlFor="pubblicaPrivata"
                        className="col-md-3 col-form-label"
                      >
                        Materiale*
                      </label>
                      <div className="col-md-9">
                        <select
                          disabled={!isOnModify}
                          className={
                            (!isOnModify
                              ? "form-control-plaintext"
                              : "form-control") + " custom-select"
                          }
                          id="pubblicaPrivata"
                          value={product.materiale}
                          onChange={(el) => {
                            setProduct({
                              ...product,
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
                      <div  className="form-group row ">
                      <label
                        htmlFor="pubblicaPrivata"
                        className="col-md-3 col-form-label"
                      >
                        Colore*
                      </label>
                      <div className="col-md-9">
                        <select
                          disabled={!isOnModify}
                          className={
                            (!isOnModify
                              ? "form-control-plaintext"
                              : "form-control") + " custom-select"
                          }
                          id="pubblicaPrivata"
                          value={product.colore}
                          onChange={(el) => {
                            setProduct({
                              ...product,
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
                      {/*<div className="form-group row">
                        <label
                          htmlFor="descrizioneproduct"
                          className="col-md-4 col-form-label"
                        >
                          Note?
                        </label>
                        <div className="col-md-8">
                          <textarea
                            type="text"
                            rows={3}
                            disabled={!isOnModify}
                            className={
                              !isOnModify
                                ? "w-100" // "form-control-plaintext toglie sfondo ma responsive"
                                : "form-control"
                            }
                            id="descrizioneproduct"
                            value={product.description}
                            onChange={(el) => {
                              setProduct({
                                ...product,
                                description: el.target.value,
                              });
                            }}
                          />
                        </div>
                          </div>*/}
                    </div>
                  </div>
                  {/*riga sotto img */}
                  <div
                    style={{ textAlign: "left" }}
                    className={
                      " p-3 col-12 " +
                      (darkMode
                        ? "testolight sfondocard1"
                        : "testodark sfondocard3")
                    }
                  >
                    <div className="form-group row">
                    <label
                        htmlFor="cittaproduct"
                        className="col-md-3 col-sm-3 col-form-label"
                      >
                        Limitescorta
                      </label>
                      <div className="col-md-3 col-sm-9">
                        <input
                          type="number"
                          min={0}
                          disabled={!isOnModify}
                          className={
                            !isOnModify
                              ? "w-100" // "form-control-plaintext toglie sfondo ma responsive"
                              : "form-control"
                          }
                          id="cittaproduct"
                          value={product.limitescorta}
                          onChange={(el) => {
                            setProduct({
                              ...product,
                              limitescorta: el.target.value,
                            });
                          }}
                        />
                      </div>
                      <label
                        htmlFor="pubblicaPrivata"
                        className="col-md-2 col-sm-4 col-form-label"
                      >
                        Misura
                      </label>
                      <div className="col-md-4 col-sm-8">
                        <select
                          disabled={!isOnModify}
                          className={
                            (!isOnModify
                              ? "form-control-plaintext"
                              : "form-control") + " custom-select"
                          }
                          id="pubblicaPrivata"
                          value={product.misura}
                          onChange={(el) => {
                            setProduct({
                              ...product,
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
                    <div className="form-group row">
                      <label
                        htmlFor="cittaproduct"
                        className="col-md-2 col-sm-3 col-form-label"
                      >
                        Quantita' {/*non mod da qui*/}
                      </label>
                      <div className="col-md-3 col-sm-9">
                        <input
                          type="number"
                          min={0}
                          disabled={mod==='detail' || !isOnModify}
                          className={
                            mod==='detail' || !isOnModify
                              ? "w-100" // "form-control-plaintext toglie sfondo ma responsive"
                              : "form-control"
                          }
                          id="cittaproduct"
                          value={product.quantita}
                          onChange={(el) => {
                            setProduct({
                              ...product,
                              quantita: el.target.value,
                            });
                            console.log(el.target.value)
                          }}
                        />
                      </div>
                      <label
                        htmlFor="pubblicaPrivata"
                        className="col-md-3 col-sm-4 col-form-label"
                      >
                        Sottocategoria
                      </label>
                      <div className="col-md-4 col-sm-8">
                        <select
                          disabled={!isOnModify}
                          className={
                            (!isOnModify
                              ? "form-control-plaintext"
                              : "form-control") + " custom-select"
                          }
                          id="pubblicaPrivata"
                          value={product.sottocategoria}
                          onChange={(el) => {
                            setProduct({
                              ...product,
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
                </div>
              </div>
            </div>
          </div>
          <div
            style={{ width: "49%" }}
            className={
              "col-sm-4 col-12 text-center sfondo2 " +
              (darkMode ? "testolight" : "testodark")
            }
          >
            {!isOnModify && (
              <button
                type="button"
                className={
                  "btn btn-outline-success mt-3 " +
                  (darkMode ? "nav2button" : "nav2buttonl")
                }
                onClick={modifyInfo}
              >
                <i className="bi bi-pencil"></i>
                {" modifica"}
              </button>
            )}
            {!!isOnModify && (
              <button
                type="button"
                disabled={error}
                className={
                  "btn btn-outline-success mt-3 " +
                  (darkMode ? "nav2button" : "nav2buttonl")
                }
                onClick={confirmSave}
              >
                <i className="bi bi-check"></i>
                {" salva"}
              </button>
            )}

            {error && (
              <div style={{ textAlign: "left" }}>
                <p className="alert alert-danger mt-3">
                  <b>Errore!</b>
                  <br></br>
                  <span>{error}</span>
                </p>
              </div>
            )}

            {msgConferma && (
              <div style={{ textAlign: "left" }}>
                <p className="alert alert-success mt-3">
                  <b>Creato!</b>
                  <br></br>
                  <span>
                    Il prodotto è stato{" "}
                    {mod === "new" ? "creato" : "modificato"} con successo!
                    Tornare alla pagina dei prodotti per vederne i dettagli
                  </span>
                </p>
              </div>
            )}

            <p>
              <button
                disabled={!isOnModify}
                type="button"
                onClick={() =>
                  setProduct({
                    nome: "",
                    categoria: "",
                    description: "",
                    limitescorta: 0,
                    sottoscorta: "",
                    quantita: 1,
                    img: "",
                    sottocategoria:"",
                    materiale:"",
                    misura:"",
                    colore:"",
                  })
                }
                className={
                  "btn btn-outline-success mr-1 " +
                  (darkMode ? "nav2buttonl" : "nav2button")
                }
              >
                <i className="bi bi-trash3"></i>
              </button>
              <button
                disabled={!isOnModify}
                type="button"
                onClick={() => {
                  setProduct(productorig);
                }}
                className={
                  "btn btn-outline-success ml-1 " +
                  (darkMode ? "nav2buttonl" : "nav2button")
                }
              >
                <i className="bi bi-arrow-clockwise"></i>
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export { ProductNewModPage };
