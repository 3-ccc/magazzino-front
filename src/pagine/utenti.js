import { getUsersfsp } from "../api/indexApi";
import { useContext, useEffect, useState } from "react";
import { DarkModeContext } from "../tema/DarkModeContext";
import { useWindowDimensions } from "../altro/windowDimensions";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import CardUtente from "../componenti/cardUtente";
import FiltriUte from "../componenti/filtri/filtriUte";
import { PaginationNum } from "../componenti/paginationNum";
import { TendinaPerPag } from "../componenti/tendinaPerPag";
import { PaginSiNo } from "../componenti/paginSiNo";

function Utenti({ type }) {
  const { darkMode } = useContext(DarkModeContext);
  const [elements, setElements] = useState([]);
  const { wi } = useWindowDimensions();
  const [selected, setSelected] = useState({
    id: 0,
    quantity: 1,
  });
  const params = useParams();
  const navigate = useNavigate();

  const [numperpag, setNumperpag] = useState(5);//?
  const [pagtot, setPagtot] = useState([]);
  const [numpag, setNumpag] = useState(1);//?
  const [pagin, setPagin] = useState(false);
  const [agg, setAgg] = useState(false);

  const [filtri, setFiltri] = useState({
    username: null,
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
    getUsersfsp(p).then((element) => {
      if (!element.isError) {
        //se pagina sbagliata vedi []
        //console.log(element.data)//pagtot 0
        setElements(element.data.utenti);
        const pt=[]
        for (let index = 1; index <= element.data.paginetot; index++) {
          pt.push(index)
        }
        //console.log(pt)
        setPagtot(pt)
        //console.log(element)
      } else {
        console.error("errore durante il recupero degli utenti");
      }
    });
    /*setElements([
      {
        _id:'q',
        username:'utente 1',
      },
      {
        _id:'w',
        username:'ser 2',
      },
    ])*/
    //setProducts([{},{}])
  }, []);//iniziale diverso?!?!?!?!??!?!


  useEffect(() => {
    //console.log(pagin)
    if(pagin == false){//se no paginaz -> resetta tutto
      setFiltri({
        username: null,
      });
      setPagtot([])
      setNumpag(0)
      setNumperpag(5)
      setAgg(false)
    }else{
      //se attivata pagina 1 default 
      setNumpag(1)    //non cambia--- sol pag tot che non legato
      setPagtot([1])
      setNumperpag(5)
      setAgg(true)
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
      getUsersfsp(p).then((element) => {
        if (!element.isError) {
          //se pagina sbagliata vedi []
          //console.log(element.data)//pagtot 0
          setElements(element.data.utenti);

          //pagina non dovrebbe andare a 0! cmq 
          

          const pt=[]
          for (let index = 1; index <= element.data.paginetot; index++) {
            pt.push(index)
          }
          setPagtot(pt)
        } else {
          console.error("errore durante il recupero degli utenti");
        }
      });

 
      }, [filtri/*, pagin*/, numpag, numperpag, agg/*, operazioni*/]);/////mh

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

  useEffect(() => {
    //console.log({ selected });
    /*const value = parseInt(selected.quantity);
    if (selected.id && value >= 1) {
      setSaveEnabled(true);
    } else {
      setSaveEnabled(false);
    }*/
  }, [selected]);

  return (
    <div style={{marginTop:'2em', marginBottom:'2em'}}>
                <div style={{marginRight:'2em'}}>
          <PaginSiNo p={pagin} setp={setPagin} ></PaginSiNo>
          </div>
      <FiltriUte filtri={filtri} setFiltri={setFiltri}></FiltriUte>

      {pagin && 

<div className="row mt-2" style={{marginLeft:'2em', marginRight:'2em'}}>
<TendinaPerPag num={numperpag} setNum={setNumperpag}></TendinaPerPag>

{pagtot.length>0 && pagin && <nav style={{maxHeight:'38px', overflow:'hidden'}} aria-label="Page navigation example" className={"col-10 m-0 flex-wrap"} >
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

      <div className="row mt-2 mb-0" style={{width:'100%'}}>
          <h2 className={"col-6 " + (darkMode ? "testolight" : "testodark")}>
            Utenti
          </h2>
          <p className="col-6" style={{ textAlign: "right" }}>
            <button
              type="button"
              className={
                "btn btn-outline-success " +
                (darkMode ? "nav2button" : "nav2buttonl")
              }
              onClick={() => {
                navigate("/account/new");
              }}
            >
              <i className="bi bi-plus"></i>
              {" Aggiungi"}
            </button>
          </p>
        </div>
        <small>*modificabili solo dal superutente</small>

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
              <div className="col-8">username</div>
              <div className="col-4"></div>
            </div>
            {elements.length && elements.length > 0 &&
              elements.map((prod, i) => {

                return (
                  <CardUtente elem={prod} key={prod._id} i={i}></CardUtente>
                );
              })}

          </div>

        </div>
      )}

    </div>
  );
}

export { Utenti };
