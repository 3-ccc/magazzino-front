//chi quando cosa qunatita ...?
/*
tipo: ['carico', 'scarico']
    prodotto: ObjectId
    agente: ObjectId
    quantita:  Number, min:0},
    data: Date
*/
//aggiungere campi dati -> se mod prodtotto qui salvato cmq al tempo?
//forse utile che si ? solo codice?
import { DarkModeContext } from "../tema/DarkModeContext";
import { useContext, useEffect, useState } from "react";
import { getOperationsfsp } from "../api/indexApi";
import CardMiniProdotto from "../componenti/cardMiniProdotto";
import { useNavigate } from "react-router-dom";
import { useWindowDimensions } from "../altro/windowDimensions.js";
import CardOperazione from "../componenti/cardOperazione";
import { PaginationNum } from "../componenti/paginationNum";
import { filterArray, sortArray } from "../altro/filtriOrdinam";
import FiltriOpe from "../componenti/filtri/filtriOpe";
import { PaginSiNo } from "../componenti/paginSiNo";
import { TendinaPerPag } from "../componenti/tendinaPerPag";


const Operazioni = () => {
  const { darkMode } = useContext(DarkModeContext);
  const [operazioni, setOperazioni] = useState([]); //lista tutti prodotti
  const [error, setError] = useState("Caricamento dei dati in corso!");
  const { wi } = useWindowDimensions();
  const [numperpag, setNumperpag] = useState(5);//?
  const [pagtot, setPagtot] = useState([]);
  const [numpag, setNumpag] = useState(0);//?
  const [pagin, setPagin] = useState(false);
  const navigate = useNavigate();

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
    const p={
      filtro:filtri,
      pagina:{
          numpag:numpag,
          perpag:numperpag
      },
      pagin:pagin
  }

    getOperationsfsp(p).then((element) => {
      if (element.isError) {
        setError(element.messageError);
      } else {
        setError("");
        setOperazioni(element.data.operazioni);
        const pt=[]
          for (let index = 1; index <= element.data.paginetot; index++) {
            pt.push(index)
          }
          //console.log(pt)
          setPagtot(pt)
      }
    });
    /*setOperazioni([
        {
            _id:'id1',
            tipo: 'scarico',
            prodotto: {
                codice:'cmaino'
            },
            agente: {
                username:'pluto'
            },
            quantita: 1,
            data: Date.now(),
        },
        {
            _id:'id2',
            tipo: 'carico',
            prodotto: {
                codice:'aletta 2'
            },
            agente: {
                username:'pippo'
            },
            quantita: 5,
            data: Date.now(),
        }
    ])*/
  }, []);

  
  const [filtri, setFiltri] = useState({
    ffdata: null,
    fidata: null,
    prodotto: null,
    tipo: "tutte",
    agente: null,
  });


  useEffect(() => {
    if(pagin == false){//se no paginaz -> resetta tutto
      setFiltri({
        ffdata: null,
        fidata: null,
        prodotto: null,
        tipo: "tutte",
        agente: null,
      });
      setPagtot([])
      setNumpag(0)
      setNumperpag(5)
    }else{
      //se attivata pagina 1 default 
      setNumpag(1)
      setPagtot([1])
      setNumperpag(5)
    }
  }, [pagin]);



  useEffect(() => {

//diventano chiamate

    const p={
      filtro:filtri,
      pagina:{
          numpag:numpag,
          perpag:numperpag
      },
      pagin:pagin
  }

  getOperationsfsp(p).then((element) => {
    if (element.isError) {
      setError(element.messageError);
    } else {
      setError("");
      setOperazioni(element.data.operazioni);
      const pt=[]
        for (let index = 1; index <= element.data.paginetot; index++) {
          pt.push(index)
        }
        //console.log(pt)
        setPagtot(pt)
    }
  });
  //console.log(p)


  //setPagtot([1,2,3,4,5,6,7,8,9,10])

  //reimpostare cose in agina??? ->fa altra chiamata o.o
  //no cambiare solo il totale...



  /*  let nuovoarray = [];
    //filter
    //filter da rivedere
    //non controlliamo mai torre.is_public o come si chiama
    if (filtri.fattiva === "tutte") {
      nuovoarray = JSON.parse(JSON.stringify(operazioni));
    }

    if (filtri.fattiva === "pubbliche") {
      nuovoarray = filterArray(
        JSON.parse(JSON.stringify(operazioni)),
        filtri,
        "fattiva",
        "pubbliche",
        "is_public",
        true
      );
    }
    if (filtri.fattiva === "private") {
      nuovoarray = filterArray(
        JSON.parse(JSON.stringify(operazioni)),
        filtri,
        "fattiva",
        "private",
        "is_public",
        false
      );
    }
    if (filtri.fdesc) {
      nuovoarray = sortArray(nuovoarray, filtri, "fdesc", "description");
    }

    if (filtri.fcodice) {
      nuovoarray = sortArray(nuovoarray, filtri, "fcodice", "id_tower");
    }

    if (filtri.findirizzo) {
      nuovoarray = sortArray(nuovoarray, filtri, "findirizzo", "address");
    }

    if (filtri.finfo) {
      nuovoarray = sortArray(nuovoarray, filtri, "finfo", "title");
    }
*/
    //setTowerSorted(nuovoarray);       chiamata?
  }, [filtri/*, pagin*/, numpag, numperpag/*, operazioni*/]);/////mh


  function deleteItem(productToBeDeleted) {
    /*//console.log(2);
    const tempArray = JSON.parse(JSON.stringify(operazioni));
    //console.log({ tempArray });
    const index = tempArray
      .map((e) => e.id_product)
      .indexOf(productToBeDeleted.id_product);

    if (index > -1) {
      // only splice array when item is found
      tempArray.splice(index, 1); // 2nd parameter means remove one item only
    }
    setOperazioni(tempArray);*/
  }

  return (
    <div>
      <div className="detailsPage">
        {error && (
          <div style={{ textAlign: "left", width: "100%" }}>
            <p className="alert alert-danger mt-3">
              <b>Attenzione!</b>
              <br></br>
              <span>{error}</span>
            </p>
          </div>
        )}
        <FiltriOpe filtri={filtri} setFiltri={setFiltri}></FiltriOpe>
        <div className="row">
          <h2 className={"col " + (darkMode ? "testolight" : "testodark")} style={{ textAlign: "left" }}>
            Operazioni
          </h2>

        </div>
        {/*<div className="m-0 p-0"><small>Clicca il prodotto da caricare</small></div>
filtri per periodo/ codice? o agente per es
ordina per data?
+++ paginazione?
<br></br>
per pagina?
totale/per pagina --approssima eccesso = num paginazione    16/5 -3,2-4
chiama se mod per pagina -- get numero pgine torna alla 1?
poi se clic su num pagina chiedi perpag - numpag

pagina 2
elem perpag*numpag    5*2=10  max
perpag*(numpag-1)+1     5*1+1=6 min

5per pag tot 16
1-5
6-10
7-11
12-16

controlli se pagina fuori erenge ok da vuoto?
se uno manca errore...

prova impost aper ogni getlista ma lascia la base!
<br></br>
        <br></br>*/}

{pagin && 

<div className="row mb-2" style={{}}>
fickera in quelli cima fondo--
solo se piccolo pero!
fa vedere ultimo/primo poi lo toglie

<TendinaPerPag num={numperpag} setNum={setNumperpag}></TendinaPerPag>

{pagtot.length>0 && pagin && <nav style={{maxHeight:'38px', overflow:'hidden'}} aria-label="Page navigation example" className={"col-10 m-0"} >
  <ul className="pagination justify-content-center flex-wrap">
{/* 
anche filtri dovrebberp chiamare 


map componente a parte x selezionato con set da qui
neanche map? non ho arrai? solo num pagine? nono volgio array di numpagine con indice? 
a caso

disabilita quando
prepag  pag 1 selezionata
postpag pag.lenght

*/}

    <li className="page-item disabled">
      <button style={{borderRadius:'5px 0px 0px 5px '}}
        onClick={()=>setNumpag(numpag-1)}
      disabled={numpag==1 ? true : false}
        className={
              "btn btn-outline-success " +
                  (darkMode ? "nav1buttonl" : "nav1button")
            }>{'<'}</button>
    </li>

    
    {pagtot.length && pagtot.length>0 && pagtot.map((npag)=>{
        return(
            <PaginationNum i={npag} selez={numpag} tot={pagtot.length} setselez={setNumpag} key={npag}></PaginationNum>
        )
    })}

    <li className="page-item">
        <button style={{borderRadius:'0px 5px 5px 0px '}}
        disabled={numpag==pagtot.length ? true : false}
        onClick={()=>setNumpag(numpag+1)}
        className={
            "btn btn-outline-success " +
                  (darkMode ? "nav1buttonl" : "nav1button")
            }>{'>'}</button>
    </li>
  </ul>
</nav>}
</div>}
        <div className=" text flex-column" style={{}}>
          <div className="row flex-wrap align-items-center">
            <div
              className={
                "col-12 text-center pt-3  pb-3 " +
                (darkMode ? "sfondo3" : "sfondo1")
              }
            >
              {!(operazioni.length > 0) && (
                <p className={!darkMode ? "testolight" : "testodark"}>
                  Non ci sono operazioni
                </p>
              )}
              {wi > 1199 && <CardOperazione indice={-1} key={-1}></CardOperazione>}
              {operazioni.length && operazioni.length > 0 &&
                operazioni.map((ope) => {
                  /*const order = orders.find(
                    //(singleProd) => singleProd.id === element.productId
                    (singleProd) => {
                      return singleProd.id_product === element.id_product;
                    }
                  );*/

                  return (
                    <CardOperazione
                      ope={ope}
                      //key={element.id}
                      key={ope._id}
                    ></CardOperazione>
                  );
                })}
              {/*!orders.length > 0 && <p>Non hai ancora operazioni</p>*/}
            </div>
          </div>
        </div>
          <PaginSiNo p={pagin} setp={setPagin} ></PaginSiNo>
      </div>

    </div>
  );
};

export { Operazioni };
