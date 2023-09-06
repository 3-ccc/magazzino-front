import { getElementsfsp, modifyElement, createElement } from "../api/indexApi";
import { useContext, useEffect, useState } from "react";
import { DarkModeContext } from "../tema/DarkModeContext";
import { useWindowDimensions } from "../altro/windowDimensions";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import CardElement from "../componenti/cardElement";
import FiltriNoCat from "../componenti/filtri/filtriNoCat";
import { PaginSiNo } from "../componenti/paginSiNo";
import { PaginationNum } from "../componenti/paginationNum";
import { TendinaPerPag } from "../componenti/tendinaPerPag";

function NoCategorie({ type }) {
  const { darkMode } = useContext(DarkModeContext);
  const [elements, setElements] = useState([]);
  const [nuovo, setNuovo] = useState(false);
  const { wi } = useWindowDimensions();
  const [selected, setSelected] = useState({
    id: 0,
    quantity: 1,
  });
  const params = useParams();
  const navigate = useNavigate();
  const [aggiorna, setAggiorna] = useState(false);


  const [numperpag, setNumperpag] = useState(5);//?
  const [pagtot, setPagtot] = useState([]);
  const [numpag, setNumpag] = useState(0);//?
  const [pagin, setPagin] = useState(false);
  const [filtri, setFiltri] = useState({
    nome: null,
  });

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
    getElementsfsp(p, type).then((element) => {
      if (!element.isError) {
        //se pagina sbagliata vedi []
        //console.log(element.data)//pagtot 0
        setElements(element.data.elem);
        const pt=[]
        for (let index = 1; index <= element.data.paginetot; index++) {
          pt.push(index)
        }
        //console.log(pt)
        setPagtot(pt)
        //console.log(element)
      } else {
        console.error("errore durante il recupero de "+type);
      }
    });
  }, []);//iniziale diverso?!?!?!?!??!?!

  useEffect(() => {
    setPagin(false)
    setNuovo(false)

    const p={     //tanto è fisso -- probabilm aggiorna cmq dopo
      filtro:{
        nome: null,
      },
      pagina:{
          numpag:0,
          perpag:5
      },
      pagin:false
  }

    getElementsfsp(p, type).then((element) => {
      if (!element.isError) {
        //se pagina sbagliata vedi []
        //console.log(element.data)//pagtot 0
        setElements(element.data.elem);
        const pt=[]
        for (let index = 1; index <= element.data.paginetot; index++) {
          pt.push(index)
        }
        //console.log(pt)
        setPagtot(pt)
        //console.log(element)
      } else {
        console.error("errore durante il recupero de "+type);
      }
    });
  }, [type]);//iniziale diverso?!?!?!?!??!?!

  useEffect(() => {
    if(pagin == false){//se no paginaz -> resetta tutto
      setFiltri({
        nome: null,
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

      getElementsfsp(p, type).then((element) => {
        if (!element.isError) {
          //se pagina sbagliata vedi []
          //console.log(element.data)//pagtot 0
          setElements(element.data.elem);
          const pt=[]
          for (let index = 1; index <= element.data.paginetot; index++) {
            pt.push(index)
          }
          //console.log(pt)
          setPagtot(pt)
          //console.log(element)
        } else {
          console.error("errore durante il recupero de "+type);
        }
      });
      //console.log(p)
    
//separare new 
//e mod

      //if type
      //colori
      //materiali
      //misure
      //

      //in realta anche se risposte diverse potri mettere 
      //cmq insieme...
      //poi da response nome diverso---  ma a questo punto mettere uguali?
      //elem 
//se pero type non c'e' ?!  controllare




//passare '/cosa devo chiamare -> type---
//pero ho chiamato con nomi diversi  nelle res...
//if e basta--- + facile da debuggare?






    
      //setPagtot([1,2,3,4,5,6,7,8,9,10])
    
      //reimpostare cose in agina??? ->fa altra chiamata o.o
      //no cambiare solo il totale...
    
      }, [filtri/*, pagin*/, numpag, numperpag/*, operazioni*/, aggiorna]);/////mh


  /*function addToCart() {
    //console.log({products})
    let previous = undefined;
    arrayOfCart.map((el) => {
      if (el.product.id_product === selected.id) {
        previous = el;
        //console.log(el.product.available_quantity, parseInt(selected.quantity))
        if (
          el.product.available_quantity <=
          el.quantity + parseInt(selected.quantity)
        ) {
          el.quantity = el.product.available_quantity;
        } else {
          el.quantity = el.quantity + parseInt(selected.quantity);
        }
      }
      return 0;
    });

    if (previous) {
      //se esiste già nel cart

      setArrayOfCart(JSON.parse(JSON.stringify(arrayOfCart)));
    } else {
      //se non presente nel carrello

      //recupero i dettagli del prodotto
      const object = elements.find((el) => el.id_product === selected.id);
      //console.log(object);
      const maxQuantity = parseInt(object.available_quantity);
      const wantedQuantity = parseInt(selected.quantity);
      let quantityToBeAdded = 0;

      //console.log(maxQuantity, wantedQuantity);
      if (wantedQuantity > maxQuantity) quantityToBeAdded = maxQuantity;
      else quantityToBeAdded = wantedQuantity;

      setArrayOfCart((prevState) => [
        ...prevState,
        { product: object, quantity: parseInt(quantityToBeAdded) },
      ]);
    }
    //console.log({ arrayOfCart });
  }*/

  /*const del = (i) => {
    //console.log(arrayOfCart);
    //console.log(i); //splice non va boooh
    const x = arrayOfCart.filter((e, indice) => {
      if (i === indice) {
        return false;
      } else {
        return true;
      }
    });
    //console.log(x);
    setArrayOfCart(x);
  };*/

  const add=(e)=>{
    //click salva -> chiama se tutto ok ->
    //poi cmq richiamare-> x id (get)
    //altro campo x sapere se nuovo o no -> almeno non i puo mod?

    createElement(e,type).then((element) => {
      if (!element.isError) {
        //se pagina sbagliata vedi []
        //console.log(element.data)//pagtot 0
        //setElements(element.data.elem);
        /*const pt=[]
        for (let index = 1; index <= element.data.paginetot; index++) {
          pt.push(index)
        }*/

        //cambia qualcosa per riaggiornare elementi
        setAggiorna(!aggiorna)
      } else {
        console.error("errore durante la creazione");
      }
    });
  }

  const mod=(e)=>{
    //click salva -> chiama se tutto ok ->
    //poi cmq richiamare-> x id (get)
    //altro campo x sapere se nuovo o no -> almeno non i puo mod?

    modifyElement(e,type).then((element) => {
      if (!element.isError) {
        //se pagina sbagliata vedi []
        //console.log(element.data)//pagtot 0
        //setElements(element.data.elem);
        /*const pt=[]
        for (let index = 1; index <= element.data.paginetot; index++) {
          pt.push(index)
        }*/

        //cambia qualcosa per riaggiornare elementi
        setAggiorna(!aggiorna)
      } else {
        console.error("errore durante la creazione");
      }
    });
  }

  useEffect(() => {
    //console.log({ selected });
    /*const value = parseInt(selected.quantity);
    if (selected.id && value >= 1) {
      setSaveEnabled(true);
    } else {
      setSaveEnabled(false);
    }*/
  }, [selected]);

  //console.log(darkMode);

  return (
    <div className="mt-2">
      {/*}
      controllono nome doppio?
  <br></br>
  <br></br>*/}
      {/*edi sumeglio falro di la?
            cmq poi se insieme distinte anche cìchiamate --sono 2 new-mod per ogni qindi *4
            piu il retrieve dopo quindi +4 fanno 12 chiamate da gestire insieme-----mhh 

  chiamate uguali cambia solo '...'*/}
        <FiltriNoCat filtri={filtri} setFiltri={setFiltri}></FiltriNoCat>

        {pagin && 

<div className="row mb-2" style={{marginLeft:'0.5em', marginRight:'0.5em'}}>
  {/*
fickera in quelli cima fondo--
solo se piccolo pero!
fa vedere ultimo/primo poi lo toglie
        */}
<TendinaPerPag num={numperpag} setNum={setNumperpag}></TendinaPerPag>

{pagtot.length>0 && pagin && <nav style={{maxHeight:'38px', overflow:'hidden'}} aria-label="Page navigation example" className={"col-10 m-0"} >
  <ul className="pagination justify-content-center flex-wrap">

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

      <div className="row" style={{width:'100%'}}>
          <h2 className={"col-6 " + (darkMode ? "testolight" : "testodark")}>
            {type}
          </h2>
          <p className="col-6" style={{ textAlign: "right" }}>
            <button
              type="button"
              className={
                "btn btn-outline-success mt-1 " +
                (darkMode ? "nav2button" : "nav2buttonl")
              }
              onClick={() => {
                setNuovo(true)
                //navigate("/magazzino/new");
              }}
            >
              <i className="bi bi-plus"></i>
              {" Aggiungi"}
            </button>
          </p>
        </div>
      {elements && (
        <div>
          <div
            style={{ display: "flex" }}
            className="justify-content-center flex-wrap"
          >
            <div
              className={" row m-1 "}
              style={{ width: wi > 767 ? "80%" : "100%" }}
            >
              <div className="col-8">nome</div>
              <div className="col-4"></div>
            </div>

            {nuovo && <CardElement elem={{nome:''}} key={-1} i={-1} resetn={setNuovo} funz={add}></CardElement>}

            {elements.length && elements.length > 0 &&
              elements.map((prod, i) => {

                return (
                  <CardElement elem={prod} key={prod.nome} funz={mod}></CardElement>
                );
              })}

          </div>
        </div>
      )}
      <div style={{marginRight:'2em'}}>
      <PaginSiNo p={pagin} setp={setPagin} ></PaginSiNo>
      </div>
    </div>
  );
}

export { NoCategorie };
