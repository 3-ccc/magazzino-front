import { getSubcatsfsp, createCategory, modifyCategory, createSubcat, modifySubcat } from "../api/indexApi";
import { useContext, useEffect, useState } from "react";
import { DarkModeContext } from "../tema/DarkModeContext";
import { useWindowDimensions } from "../altro/windowDimensions";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import CardElement from "../componenti/cardElement";
import CardElementcat from "../componenti/cardElementcat";
import CardMiniElement from "../componenti/cardMiniElement";
import { PaginSiNo } from "../componenti/paginSiNo";
import { PaginationNum } from "../componenti/paginationNum";
import { TendinaPerPag } from "../componenti/tendinaPerPag";
import FiltriCat from "../componenti/filtri/filtriCat";

function Categorie({ type }) {
  const { darkMode } = useContext(DarkModeContext);
  const [elements, setElements] = useState([]);
  const [nuovacat, setNuovacat] = useState(false);
  const [nuovasot, setNuovasot] = useState(false);
  const [aggiorna, setAggiorna] = useState(false);
  const { wi } = useWindowDimensions();
  const [selected, setSelected] = useState({
    id: 0,
    quantity: 1,
  });
  const [c, setc] = useState();//?
  const [numperpag, setNumperpag] = useState(5);//?
  const [pagtot, setPagtot] = useState([]);
  const [numpag, setNumpag] = useState(0);//?
  const [pagin, setPagin] = useState(false);
  const [filtri, setFiltri] = useState({
    nome: null,
    categoria: null,
  });
  const params = useParams();
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
  getSubcatsfsp(p).then((element) => {
    //console.log(element.data)
    if (!element.isError) {
      setElements(element.data.sottocategorie);
      const pt=[]
          for (let index = 1; index <= element.data.paginetot; index++) {
            pt.push(index)
          }
          //console.log(pt)
          setPagtot(pt)
    } else {
      console.error("errore durante il recupero dei prodotti disponibili");
    }
  });
//  setPagtot([1,2,3,4,5,6,7,8,9,10])
  }, [filtri/*, pagin*/, numpag, numperpag/*, operazioni*/, aggiorna]);/////mh

  useEffect(() => {

    const p={
      filtro:filtri,
      pagina:{
          numpag:numpag,
          perpag:numperpag
      }, 
      pagin:pagin
    }

    getSubcatsfsp(p).then((element) => {
      //console.log(element.data)
      if (!element.isError) {
        setElements(element.data.sottocategorie);
        const pt=[]
          for (let index = 1; index <= element.data.paginetot; index++) {
            pt.push(index)
          }
          //console.log(pt)
          setPagtot(pt)
      } else {
        console.error("errore durante il recupero dei prodotti disponibili");
      }
    });

    //gia passate bene da back
//come?
    //cat id nome ->lista di sottocat? -id nome

    //sottocat groupby categoria + popola?

    /*
const groupArrayObject = array.reduce((group, arr) => {
 
  const { category } = arr;

  group[category] = group[category] ?? [];

  group[category].push(arr);

  return group;

},

{}); 
mh no non da id + nome categoria



per ogni categoria -> sottocat di quella cat 
ma se sottocat senza cat?
in teoria non possibile ma...

sott sort per categoria? meglio?
se cat diversa da pre allora ...

    */
    /*setElements([
      {
        _id:'q',
        nome:'sottocat 1',
        categoria:{
          _id:'x',
          nome:'cat 1',
        }
      },
      {
        _id:'w',
        nome:'sottocat 2',
        categoria:{
          _id:'x',
          nome:'cat 1',
        }
      },
      {
        _id:'e',
        nome:'sottocat 3',
        categoria:{
          _id:'y',
          nome:'cat 2',
        }
      },
      {
        _id:'r',
        nome:'sottocat 4',
        categoria:{
          _id:'y',
          nome:'cat 2',
        }
      },
    ])*/
    //setProducts([{},{}])
    //console.log()
  }, []);

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

  const newcat=(cat) => {
    setc(cat)
    setNuovasot(true)
    setNuovacat(false)
  }

  const addcat  =(e)=>{
    //poi cmq richiamare-> x id (get)
    //altro campo x sapere se nuovo o no -> almeno non i puo mod?
    createCategory(e).then((element) => {
      if (!element.isError) {
        //cambia qualcosa per riaggiornare elementi
        setAggiorna(!aggiorna)
      } else {
        console.error("errore durante la creazione");
      }
    });
  }
  const addsott  =(e)=>{
    //poi cmq richiamare-> x id (get)
    //altro campo x sapere se nuovo o no -> almeno non i puo mod?
    e.categoria=c._id

    createSubcat(e).then((element) => {
      if (!element.isError) {

        //cambia qualcosa per riaggiornare elementi
        setAggiorna(!aggiorna)
      } else {
        console.error("errore durante la creazione");
      }
    });
  }
  const modcat=(e)=>{
    //click salva -> chiama se tutto ok ->
    //poi cmq richiamare-> x id (get)
    //altro campo x sapere se nuovo o no -> almeno non i puo mod?
console.log('cat mod')
console.log(e)

    modifyCategory(e,type).then((element) => {
      if (!element.isError) {

        //cambia qualcosa per riaggiornare elementi
        setAggiorna(!aggiorna)
      } else {
        console.error("errore durante la creazione");
      }
    });
  }
  const modsott=(e)=>{
    //click salva -> chiama se tutto ok ->
    //poi cmq richiamare-> x id (get)
    //altro campo x sapere se nuovo o no -> almeno non i puo mod?

    console.log('sottocat mod')
    console.log(e)

    modifySubcat(e,type).then((element) => {
      if (!element.isError) {

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
      {/*controllono nome doppio?
<br></br>
  <br></br>*/}
      {/*edi sumeglio falro di la?
            cmq poi se insieme distinte anche cìchiamate --sono 2 new-mod per ogni qindi *4
            piu il retrieve dopo quindi +4 fanno 12 chiamate da gestire insieme-----mhh 

            chiamate uguali cambia solo '...'

            solo una per cat/sottocat

  rivedi colori testo*/}
      <FiltriCat filtri={filtri} setFiltri={setFiltri} ></FiltriCat>

            {pagin && 

<div className="row mb-2" style={{}}>
  {/*
fickera in quelli cima fondo--
solo se piccolo pero!
fa vedere ultimo/primo poi lo toglie
            */}
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
      <div className="row" style={{width:'100%'}}>
          <h2 className={"col-6 m-0 " + (darkMode ? "testolight" : "testodark")}>
            {type}
          </h2>
          <p className="col-6 m-0" style={{ textAlign: "right" }}>
            <button
              type="button"
              className={
                "btn btn-outline-success mt-1 " +
                (darkMode ? "nav2button" : "nav2buttonl")
              }
              onClick={() => {
                setNuovacat(true)
                setNuovasot(false)
                //navigate("/magazzino/new");
              }}
            >
              <i className="bi bi-plus"></i>
              {" Aggiungi categoria"}
            </button>
          </p>
        </div>
        {/*<div className="row " style={{width:'100%'}}>
          <p className={"col-4 " }>
          </p>
          <p className="col-8 m-0" style={{ textAlign: "right" }}>
            <button
              type="button"
              className={
                "btn btn-outline-success mt-1 " +
                (darkMode ? "nav2button" : "nav2buttonl")
              }
              onClick={() => {
                setNuovasot(true)
                setNuovacat(false)
                //navigate("/magazzino/new");
              }}
            >
              <i className="bi bi-plus"></i>
              {" Aggiungi sottocategoria"}
            </button>
            non va!!!!!!!!!!!!!!!!!!1 in che damine di cat la aggiungi?!
            x non mettere altre cose inutili x altri in elem crea nuovo
          </p>
          non va !!! cat senza sottocat non si vedono!!!!!!




modifica cat non funziona
neanche mod sottocat --> non aggionra nemmeno
--->risolto



se sottocat non ha cat si rompe
... no cancell ---non dovrebbe succedere ma maglio controllare cmq???

            </div>*/}
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

            {nuovacat && !nuovasot && <CardElement elem={{nome:''}} key={-1} i={-1} resetn={setNuovacat} funz={addcat} testo={'categoria'}></CardElement>}
            {nuovasot && !nuovacat && <CardElement elem={{nome:''}} key={-1} i={-1} resetn={setNuovasot} funz={addsott} testo={'sottocategoria'}></CardElement>}

            {elements.length && elements.length > 0 &&
              elements.map((prod, i) => {
                //console.log(i)
                const ret=[]
                //primo cmq serve cat
                if(i==0){//0?

                  ret.push(<CardElementcat elem={prod.categoria} key={prod.categoria.nome} funz={modcat} piu={newcat}></CardElementcat>)
                }

                //console.log(elements[i-1])
                if(i>0 && elements[i-1].categoria._id!=prod.categoria._id){//0?
                  //console.log(i)
                  
                  ret.push(<CardElementcat elem={prod.categoria} key={prod.categoria.nome} funz={modcat} piu={newcat}></CardElementcat>)
                }
                if(!prod.hasOwnProperty("nosott")){
                  ret.push(<CardMiniElement elem={prod} key={prod.nome} funz={modsott}></CardMiniElement>)
                }
                  return (
                    ret
                );
              })}

          </div>
        </div>
      )}
      <div style={{marginLeft:'2em', marginRight:'2em'}}>
          <PaginSiNo p={pagin} setp={setPagin} ></PaginSiNo>
      </div>
    </div>
  );
}

export { Categorie };
