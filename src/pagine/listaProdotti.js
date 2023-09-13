import { useEffect, useState, useContext } from "react";
import CardProdotto from "../componenti/cardProdotto.js";
import { getProductsfsp } from "../api/indexApi.js";
import { DarkModeContext } from "../tema/DarkModeContext";
import { MsgContext } from "../tema/MsgContext";
import { ScrollContext } from "../tema/ScrollContext.js";
import { useNavigate } from "react-router-dom";
import FiltriProd from "../componenti/filtri/filtriProd.js";
import { TendinaPerPag } from "../componenti/tendinaPerPag.js";
import { PaginationNum } from "../componenti/paginationNum.js";
import { PaginSiNo } from "../componenti/paginSiNo.js";



function ListaProdotti({/*setMsg*/}) {
  const { darkMode } = useContext(DarkModeContext);
  const  { msg, setmess }  = useContext(MsgContext);
  const { heightText, seth } = useContext(ScrollContext)

  /*
console.log(msg)
console.log(setmess)
console.log(darkMode)
*/

  const [listProduct, setListProduct] = useState(null);
  const [error, setError] = useState("Caricamento in corso,\nAttendere prego!");
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

  //console.log(process.env.REACT_APP_BASE_URL)

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
      //console.log(element)
      if (!element.isError) {
        setListProduct(element.data.prodotti);

          //pagina non dovrebbe andare a 0! cmq

          const pt=[]
          for (let index = 1; index <= element.data.paginetot; index++) {
            pt.push(index)
          }
          //console.log(pt)
          setPagtot(pt)
        setError("");

      } else {
        setError("errore");
        //sarebbe da testare pero!
        showmsg('rosso', 'attenzione', element.messageError)
        //setListProduct(element.data);
        //console.log(element);
      }
    });

    /*setListProduct([
        {
          _id:'a',
          nome:"camino rame tondo d10 aaa bb",
          sottocategoria:"sottocategria1",
          categoria:"cat1",
          materiale:"rame",
          misura:"d10",
          colore:'rosso',
          quantita:5,
          limitescorta:10,
          sottoscorta:true,
          img:"",
        },
        {
          _id:'b',
          nome:"bbb",
          categoria:"cat2",
          materiale:"alluminio",
          colore:'verde',
          quantita:1,
          limitescorta:0,
          sottoscorta:false,
          img:"",
        },{
          _id:'c',
          nome:"camino rame tondo d10 aaa ",
          sottocategoria:"sottocategria1",
          categoria:"cat1",
          materiale:"rame",
          misura:"d10",
          colore:'rosso',
          quantita:5,
          limitescorta:10,
          sottoscorta:true,
          img:"",
        },
    ])

    setPagtot([1,2])*/
  }, []);

  useEffect(() => {
    window.addEventListener("resize", ()=>seth('listaprodotti'));
    window.addEventListener("scroll", ()=>seth('listaprodotti'));
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
    //console.log(element)
    if (!element.isError) {
      setListProduct(element.data.prodotti);

        //pagina non dovrebbe andare a 0! cmq

        const pt=[]
        for (let index = 1; index <= element.data.paginetot; index++) {
          pt.push(index)
        }
        //console.log(pt)
        setPagtot(pt)
        setError("");
    } else {
      setError("errore");
      //setListProduct(element.data);
      //console.log(element);
    }
  });
  
  setPagtot([1,2])

  //console.log(p)
  }, [filtri , numpag, numperpag ]);


  //potri mettere in app-> useeffect ogni colta cambia messaggio
  const showmsg=(s, t, m)=>{
  //console.log(document.getElementById('toast'))
  //document.getElementById('toast').toast('show')
  //$('.toast').toast({data-autohide='true'})
  //setMsg({
  setmess({
  
    stile:s,
    titolo:t,
    mess:m
  })

  //mhhh appare quando cambia msg? 
  //cambi troppo veloci cosa succede?
  //ma soprattutto cmq funziona?

//quando carico pagina appare....   non va
//sara l' onclick---
//fatto nei then

  var toastfarcito = document.querySelector('.toast');
//  toastfarcito.toast('show')
  new window.bootstrap.Toast(toastfarcito/*,options */).show();
  }
  
  return (
    <div /*id="listaprodotti" onScroll={()=>seth('listaprodotti')} onClick={()=>showmsg('info','ciao','prova')}*/>

 {/*     <div aria-live="polite"  id="toast"  aria-atomic="true" style={{position: 'relative', zIndex:'999', top:'-20px'}}>
    <div className="toast" data-autohide="true" data-delay="5000" style={{position: 'absolute', top: 0, right: "0"}}>

{/*<div className="toast" role="alert" aria-live="assertive" aria-atomic="true"> */}
{/*qui lista tutti toast mhhhhh andra su tutte le pagine*/}
    {/*<div className="toast-header" style={{color:"blue", left:'50px'}}>
      <strong className="mr-auto">Bootstrap</strong>
      <small>11 mins ago</small>
      
    </div>
    <div className="toast-body" style={{color:"blue", left:'50px'}}>
    <p className="row" style={{width:'99%'}}>
    <p className="col-11">
      testo troppo lungo sborda a dx!!!!!!!
      Hello, world! This is a toast message.aaaaaaaaaaaaaaaaaaaaaaaaaa
      aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
      </p>
      <button type="button" className="close col-1" data-dismiss="toast" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
      </p>
    </div>
  </div>

{/*</div> */}
{/*
</div>*/}
      {error !== "" && (
        <div
          className="alert alert-danger mx-auto mt-4"
          role="alert"
          style={{ width: "300px", textAlign: "center" }}
          onClick={showmsg}
        >
          <b>Attenzione!</b>
          <p>{error}</p>
        </div>
      )}
      <div style={{marginLeft:'2em', marginRight:'2em', marginTop: error=='' ? '2em' : ''}}>
      
        <div style={{display:"flex", justifyContent:'end'}}>
          <button style={{ alignSelf:'end'}} className={"btn btn-outline-success m-0 p-2 " + (!darkMode ? "nav2buttonl" : "nav2button")}
          onClick={()=>{navigate("/tab");}}><small><i className="bi bi-printer-fill"></i>{' riepilogo'}</small></button>

<button style={{ alignSelf:'end'}} className={"btn btn-outline-success m-0 p-2 " + (!darkMode ? "nav2buttonl" : "nav2button")}
          onClick={()=>{navigate("/graf");}}><small><i className="bi bi-bar-chart-fill"></i>{' grafici'}</small></button>
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
<div className="row" style={{width:'100%', marginLeft:'0em'}}>
          <h2 className={"col-6 " + (darkMode ? "testolight" : "testodark")}>
            Magazzino
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

      <div className="d-flex flex-wrap justify-content-center">
        {listProduct !== null && !(listProduct.length > 0) && (
          <p>al momento prodotti non disponibili</p>
        )}
        {listProduct !== null && listProduct.length && listProduct.length>0 &&
          listProduct.map((p, i) => {
            return (
              <CardProdotto
                singleProduct={p}
                indice={i}
                key={p._id}
                //debug key={p.id}
              ></CardProdotto>
            );
          })}
      </div>
      <div style={{marginRight:'2em'}}>
      <PaginSiNo p={pagin} setp={setPagin} ></PaginSiNo>
      </div>
    </div>
  );
}

export { ListaProdotti };
