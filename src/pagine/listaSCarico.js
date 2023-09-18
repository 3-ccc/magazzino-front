import { DarkModeContext } from "../tema/DarkModeContext";
import { useContext, useEffect, useState } from "react";
import { getProductsfsp } from "../api/indexApi";
import CardMiniProdotto from "../componenti/cardMiniProdotto";
import { useNavigate } from "react-router-dom";
import { useWindowDimensions } from "../altro/windowDimensions.js";
import { PaginationNum } from "../componenti/paginationNum";
import { TendinaPerPag } from "../componenti/tendinaPerPag";
import FiltriProd from "../componenti/filtri/filtriProd";
import { PaginSiNo } from "../componenti/paginSiNo";

const ListaSCarico = ({ mode }) => {
  const { darkMode } = useContext(DarkModeContext);
  const [products, setProducts] = useState([]); //lista tutti prodotti
  const [error, setError] = useState("Caricamento dei dati in corso!");
  const { wi } = useWindowDimensions();
  const navigate = useNavigate();
  const [numperpag, setNumperpag] = useState(5);//?
  const [pagtot, setPagtot] = useState([]);
  const [numpag, setNumpag] = useState(0);//?
  const [pagin, setPagin] = useState(false);
  const [filtri, setFiltri] = useState({
    nome: 'tutti',
    materiale: 'tutti',
    misura: 'tutte',
    categoria: 'tutte',
    colore: 'tutti',
    sottocategoria: 'tutte',
    sottoscorta: 'tutti',
    limitescorta: null,
    quantita: null,
    codice: null,
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

    getProductsfsp(p).then((element) => {
      if (!element.isError) {
        //se pagina sbagliata vedi []
        //console.log(element.data)//pagtot 0
        setProducts(element.data.prodotti);
        setError('')
        const pt=[]
        for (let index = 1; index <= element.data.paginetot; index++) {
          pt.push(index)
        }
        //console.log(pt)
        setPagtot(pt)
        //console.log(element)
      } else {
        console.error("errore durante il recupero ");
      }
    });
    /*retrieveAllProducts().then((element) => {
      if (element.isError) {
        setError(element.messageError);
      } else {
        setError("");
        setProducts(element.data);
      }
    });*/
    /*setProducts([
        {
          _id:'t',
          nome:"camino rame aperto tondo d10 verde muschio",
          sottocategoria:"sottocategria1",
          categoria:"cat1",
          materiale:"rame",
          misura:"d10",
          colore:"rosso",
          quantita:5,
          limitescorta:10,
          sottoscorta:true,
          img:"",
        },
        {
          _id:'u',
          nome:"bbb",
          categoria:"cat2",
          materiale:"alluminio",
          colore:'verde',
          quantita:1,
          limitescorta:0,
          sottoscorta:false,
          img:"",
        }
    ])*/
  }, []);

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
    const p={
      filtro:filtri,
      pagina:{
          numpag:numpag,
          perpag:numperpag
      },
      pagin:pagin
  }

  getProductsfsp(p).then((element) => {
    if (!element.isError) {
      //se pagina sbagliata vedi []
      //console.log(element.data)//pagtot 0
      setProducts(element.data.prodotti);
      setError('')
      const pt=[]
      for (let index = 1; index <= element.data.paginetot; index++) {
        pt.push(index)
      }
      //console.log(pt)
      setPagtot(pt)
      //console.log(element)
    } else {
      console.error("errore durante il recupero");
    }
  });

  //setPagtot([1,2])

  //console.log(p)
  }, [filtri , numpag, numperpag ]);

  const vaiscarico=(p)=>{
    console.log('click')
    //navigate ma passa roba come?
    if(mode=='carico'){
      navigate('/carico', {state:p})      
    }else{
    navigate('/scarico', {state:p})

    }

  }

  function deleteItem(productToBeDeleted) {
    const tempArray = JSON.parse(JSON.stringify(products));
    //console.log({ tempArray });
    const index = tempArray
      .map((e) => e.id_product)
      .indexOf(productToBeDeleted.id_product);

    if (index > -1) {
      // only splice array when item is found
      tempArray.splice(index, 1); // 2nd parameter means remove one item only
    }
    setProducts(tempArray);
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
        
        <div style={{marginLeft:'2em', marginRight:'2em'}}>
        <div style={{}}>
      <PaginSiNo p={pagin} setp={setPagin} ></PaginSiNo>
      </div>
      <FiltriProd filtri={filtri} setFiltri={setFiltri} ></FiltriProd>

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
      </div>

        <div className="row">
          <h2 className={"col-6 " + (darkMode ? "testolight" : "testodark")} style={{ textAlign: "left" }}>
            {mode} Magazzino
          </h2>
          <p className="col-6" style={{ textAlign: "right" }}>
            <button
              type="button"
              className={
                "btn btn-outline-success " +
                (darkMode ? "nav2button" : "nav2buttonl")
              }
              onClick={() => {
                navigate("/magazzino/new");
              }}
            >
              <i className="bi bi-plus"></i>
              {" Aggiungi"}
            </button>
          </p>
        </div>
        <div className="m-0 p-0"><small>Clicca il prodotto da caricare</small></div>
        <div className=" text flex-column" style={{}}>
          <div className="row flex-wrap align-items-center">
            <div
              className={
                "col-12 text-center pt-3  pb-3 " +
                (darkMode ? "sfondo3" : "sfondo1")
              }
            >
              {!(products.length > 0) && (
                <p className={!darkMode ? "testolight" : "testodark"}>
                  Non ci sono prodotti
                </p>
              )}
              {wi > 1199 && <CardMiniProdotto indice={-1} key={-1}></CardMiniProdotto>}
              {products.length && products.length > 0 &&
                products.map((product) => {
                  /*const order = orders.find(
                    //(singleProd) => singleProd.id === element.productId
                    (singleProd) => {
                      return singleProd.id_product === element.id_product;
                    }
                  );*/

                  return (
                    <CardMiniProdotto
                      prodotto={product}
                      //key={element.id}
                      key={product._id}
                      deleteItem={() => {}}
                      click={vaiscarico}
                    ></CardMiniProdotto>
                  );
                })}
              {/*!orders.length > 0 && <p>Non hai ancora ordinato nulla</p>*/}
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};

export { ListaSCarico };
