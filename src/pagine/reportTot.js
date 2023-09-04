import { DarkModeContext } from "../tema/DarkModeContext";
import { Fragment, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import { getListTable } from "../api/indexApi";

const ReportTot = () => {
  const { darkMode } = useContext(DarkModeContext);
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [list, setList] = useState([]);
  const [overon, setOveron] = useState(false);


  useEffect(() => {
    //chiamata
    getListTable().then((element) => {
      //console.log(element)
      if (!element.isError) {
        setList(element.data.prodotti);
        setError("");
        //console.log(element)

      } else {
        setError("errore");
        //sarebbe da testare pero!
                //showmsg('rosso', 'attenzione', element.messageError)
        //setListProduct(element.data);
        //console.log(element);
      }
    });
  }, []);

  //da testare
  const diversi=(a, b)=>{

//    console.log(a)
//    console.log(b)

    //se no 1 no 2 return false else 
    if(!a && !b ){
      return false
    }else{
    //se no 1 si 2 oppure si 2 no 1 return true else
      if((!a && b) || (a && !b)){
        return true
      }else{//(entrambi esistono in teoria)
        //se 1. diverso 2. return true else false
        if(a.nome != b.nome){
          return true
        }else{
          return false
        }
      }
    }
  }


/* maschera
scelta tendina x filtro? o 2? o nome+ altro?
mh




*/


//chiamata fsp ma senza p   ok basta passare filtri bene
//no   quelli tendina invece adesso serve ordinati
//sempre uguale nome cat sottocat mat-col mis

//in teoria basta ordinare per codice (al momento no x vuoti)
//con maschera x scegliere forse va bene    no andrebbero cmq ordinati
//potrei anche gia tornare array pronto con gia somme mh

// nome:[cat1:[sottocat1:]]

//cosi colonne sarebbero variabiili -> potrei fare tab in tab ma---
//a questo punto colore materiale ... numero  ripetizioni ma vabbe potrebbe andare



//forse meglio mat col mis ... metterlo sopra a tutto   controllare come sta

//altrimenti fondo? mhh

//prova butta prova



//to pdf 
//https://hackernoon.com/how-to-export-html-tables-into-pdf-documents-using-javascript-1z223wnq


function downloadPDFWithBrowserPrint() {
  //nope stampa l'intera pagina e basta
  window.print();
}

function downloadPDFWithjsPDF() {
  setOveron(true)
  var doc = new jsPDF('p', 'pt', 'a4');

  doc.html(document.querySelector('#styledTable'), {
    callback: function (doc) {
      doc.save('p.pdf');//si bello ma in user dove lo salva??
                        //scegliere folder?     ok lo fa da solo
      setOveron(false)
    },                  

//ok ma non gli piacciono le righe
//fa bianche /nere

//cambiare prima e dopo
//ricolorare le righe---
//nth-child()

//test senza field facoltativi

    margin: [60, 60, 60, 60],
  });
//  setOveron(false)

}


const prova=[
  {
    nome:{nome:'a'},
    categoria:{nome:'cata'},
    sottocategoria:{nome:'sottocata'},
    materiale:{nome:'rame'},
    colore:{nome:'giallo'},
    misura:{nome:'10'},
  },
  {
    nome:{nome:'a'},
    categoria:{nome:'cata'},
    sottocategoria:{nome:'sottocatb'},
    materiale:{nome:'alluminio'},
    colore:{nome:'giallo'},
    misura:{nome:'10'},
  },
  {
    nome:{nome:'a'},
    categoria:{nome:'cata'},
    sottocategoria:{nome:'sottocatb'},
    materiale:{nome:'alluminio'},
    colore:{nome:'giallo'},
    misura:{nome:'11'},
  },
  {
    nome:{nome:'b'},
    categoria:{nome:'catb'},
    sottocategoria:{nome:'sottocata'},
    materiale:{nome:'rame'},
    colore:{nome:'giallo'},
    misura:{nome:'12'},
  }
]


//quando active display blck
//overlay anche nav???

//ricorda togli
//controlla su cambio pagina se tutto ok      ok
//126 max 56 max  128  style top-

//sistemare on hover righe tab
//595 point-120   475 -> 633 px   nope

  return (
    <div style={{ height:'100%'}} >
      <div className={(overon ? 'overlay active' : '')} style={{top: '-130px'}}></div>
        <div className="d-flex flex-wrap m-2" style={{ alignContent:'center', justifyContent:'center'}}>

<button className={"btn btn-outline-success mb-2 " + (darkMode ? 'nav2button' : "nav2buttonl")} onClick={downloadPDFWithjsPDF}><i className="bi bi-download"></i>{' scarica'}</button>

        {/*<table className="table table-striped table-dark">

  <thead>
    <tr>
      <th scope="col" colSpan={4} style={{ padding: '5px' }}>nome p</th>
    </tr>
    <tr>
      <th scope="col" colSpan={4} style={{ textAlign:'left', padding: '5px' }} >cata</th>
    </tr>

    <tr>
      <th scope="col" colSpan={4} style={{ textAlign:'left', padding: '5px' }} > &emsp; sottocatcata</th>
    </tr>
</thead>

{/*<table className="table table-striped table-hover table-dark">*//*}

  <thead>

    <tr>
      <th scope="col"></th>
      <th scope="col">10</th>
      <th scope="col">11</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">rame-giallo</th>
      <td>Mark</td>
      <td>Otto</td>
    </tr>
    <tr>
      <th scope="row">alluminio-giallo</th>
      <td>Jacob</td>
      <td>Thornton</td>
    </tr>

  </tbody>
{/*</table>*/}{/*}
</table>*/}

{/*<p style={{width: '100%'}}>
totali?
<br></br>
quando cambia sottocat oppure in line?
<br></br>
display none foglio vuoto
</p>*/}
<table className={"table table-striped table-strip-custom table-hover "+(darkMode ? 'table-light' : 'table-dark' )} 
style={{ maxWidth: (overon ? '478px' : '')}} id="styledTable">

{list.map((p, i)=>{//indice da 0 o 1?
//in toeoria tutto obbligatorio tranne sottocat e misura?
  if(i == 0){
//    contcat=1
//    contsott=1

    //non va  avrei ris solo alla fine
    //2 array?    oppure altro map per contare---
    //se faccio ugale 

    //somma quantita

//ma forse meglio di no potrebbe essere confusionario
// totale prodotti o num prodotti diversi?

    return (
      <Fragment key={i}>
      <thead>
      <tr>{/* ripetere??  mhhhhh*/}
      <th scope="col">materiale</th>
      <th scope="col">colore</th>
      <th scope="col">misura</th>
      <th scope="col">numero</th>

    </tr>

    <tr>
      <th scope="col" colSpan={4} style={{ padding: '5px' }}>{((p.nome && p.nome.nome) ? p.nome.nome : '-' )}</th>
    </tr>
    <tr>
      <th scope="col" colSpan={4} style={{ textAlign:'left', padding: '5px' }} >{((p.categoria && p.categoria.nome) ? p.categoria.nome : '-' )}</th>
    </tr>

    <tr>
      <th scope="col" colSpan={4} style={{ textAlign:'left', padding: '5px' }} > &emsp; {((p.sottocategoria && p.sottocategoria.nome) ? p.sottocategoria.nome : '-' )}</th>
    </tr>

    
  </thead>
  <tbody>
  <tr className={darkMode ? (i%2==0 ? "oddstripel" : 'evenstripel') : (i%2==0 ? "oddstriped" : 'evenstriped')}>
      <td>{((p.materiale && p.materiale.nome) ? p.materiale.nome : '-' )}</td>
      <td>{((p.colore && p.colore.nome) ? p.colore.nome : '-' )}</td>
      <td>{((p.misura && p.misura.nome) ? p.misura.nome : '-' )}</td>
      <td>{(p.quantita ? p.quantita  : '-' )}</td>

    </tr>
  </tbody>
  </Fragment>
    )

  }else /*if(se ultimo...)*/{

    //si pero se .x.y x non esiste qui sono pasticci quindi 
    //se entrambi non esistono considera = altrimenti se uno solo manca div 
    //altrimenti confronta      si ma con tutti 
    //                        -> a questo punto logica a parte passando i 2
    //                            return true false

    //if(!(!p.nome && !prova[i-1].nome)/* entrambi non esistono? ma ! almeno uno esiste*/ /*oppure  */){
//no non e no
//al massimo al contrario
//aesiste b esiste e sono diversi
//:'c

    if(diversi(p.nome, list[i-1].nome)){
        return(
          <Fragment key={i}>
      <thead>
    <tr>
      <th scope="col" colSpan={4} style={{ padding: '5px' }}>{((p.nome && p.nome.nome) ? p.nome.nome : '-' )}</th>
    </tr>
    <tr>
      <th scope="col" colSpan={4} style={{ textAlign:'left', padding: '5px' }} >{((p.categoria && p.categoria.nome) ? p.categoria.nome : '-' )}</th>
    </tr>

    <tr>
      <th scope="col" colSpan={4} style={{ textAlign:'left', padding: '5px' }} > &emsp; {((p.sottocategoria && p.sottocategoria.nome) ? p.sottocategoria.nome : '-' )}</th>
    </tr>

    {/*<tr> ripetere?? 
      <th scope="col">materiale</th>
      <th scope="col">colore</th>
      <th scope="col">misura</th>
      <th scope="col">numero</th>

    </tr>*/}
  </thead>
  <tbody>
  <tr className={darkMode ? (i%2==0 ? "oddstripel" : 'evenstripel') : (i%2==0 ? "oddstriped" : 'evenstriped')}>
      <td>{((p.materiale && p.materiale.nome) ? p.materiale.nome : '-' )}</td>
      <td>{((p.colore && p.colore.nome) ? p.colore.nome : '-' )}</td>
      <td>{((p.misura && p.misura.nome) ? p.misura.nome : '-' )}</td>
      <td>{(p.quantita ? p.quantita  : '-' )}</td>

    </tr>
  </tbody>
  </Fragment>
        )
    }else{
      if(diversi(p.categoria, list[i-1].categoria)){
        return (
          <Fragment key={i}>
      <thead>
    <tr>
      <th scope="col" colSpan={4} style={{ textAlign:'left', padding: '5px' }} >{((p.categoria && p.categoria.nome) ? p.categoria.nome : '-' )}</th>
    </tr>

    <tr>
      <th scope="col" colSpan={4} style={{ textAlign:'left', padding: '5px' }} > &emsp; {((p.sottocategoria && p.sottocategoria.nome) ? p.sottocategoria.nome : '-' )}</th>
    </tr>

    {/*<tr> ripetere??
      <th scope="col">materiale</th>
      <th scope="col">colore</th>
      <th scope="col">misura</th>
      <th scope="col">numero</th>

    </tr> */}
  </thead>
  <tbody>
  <tr className={darkMode ? (i%2==0 ? "oddstripel" : 'evenstripel') : (i%2==0 ? "oddstriped" : 'evenstriped')}>
      <td>{((p.materiale && p.materiale.nome) ? p.materiale.nome : '-' )}</td>
      <td>{((p.colore && p.colore.nome) ? p.colore.nome : '-' )}</td>
      <td>{((p.misura && p.misura.nome) ? p.misura.nome : '-' )}</td>
      <td>{(p.quantita ? p.quantita  : '-' )}</td>

    </tr>
  </tbody>
  </Fragment>
        )
      }else{
        if(diversi(p.sottocategoria, list[i-1].sottocategoria)){
          return (
            <Fragment key={i}>
      <thead>
    <tr>
      <th scope="col" colSpan={4} style={{ textAlign:'left', padding: '5px' }} > &emsp; {((p.sottocategoria && p.sottocategoria.nome) ? p.sottocategoria.nome : '-' )}</th>
    </tr>

    {/*<tr> ripetere??
      <th scope="col">materiale</th>
      <th scope="col">colore</th>
      <th scope="col">misura</th>
      <th scope="col">numero</th>

    </tr> */}
  </thead>
  <tbody>
  <tr className={darkMode ? (i%2==0 ? "oddstripel" : 'evenstripel') : (i%2==0 ? "oddstriped" : 'evenstriped')}>
      <td>{((p.materiale && p.materiale.nome) ? p.materiale.nome : '-' )}</td>
      <td>{((p.colore && p.colore.nome) ? p.colore.nome : '-' )}</td>
      <td>{((p.misura && p.misura.nome) ? p.misura.nome : '-' )}</td>
      <td>{(p.quantita ? p.quantita  : '-' )}</td>

    </tr>
  </tbody>
  </Fragment>
          )
        }else{
          //non va---  
          return(
          <Fragment key={i}>
  <tbody style={{borderTop:'none'}}>
  <tr className={darkMode ? (i%2==0 ? "oddstripel" : 'evenstripel') : (i%2==0 ? "oddstriped" : 'evenstriped')}>
      <td>{((p.materiale && p.materiale.nome) ? p.materiale.nome : '-' )}</td>
      <td>{((p.colore && p.colore.nome) ? p.colore.nome : '-' )}</td>
      <td>{((p.misura && p.misura.nome) ? p.misura.nome : '-' )}</td>
      <td>{(p.quantita ? p.quantita  : '-' )}</td>

    </tr>
  </tbody>
  </Fragment>
          )
        }
      }
    }
//facendo tbody sempre chiuso cmq non viene striped
// se %2==0 o viceversa metti tr in piu nascorsto---
//brutto ma funziona---

//oppure provare con append--> dare id univoci con i pero se piu di 2---
//non posso solo prendere  i precedente -> var app per tenere in memo?



    //}

    //se nome diverso else    (come prima)
    //se cat diversa else     (aggiungi nuova cat sottocat)
    //se sottocat diversa else  (aggiungi sottocat)
    //aggiungi solo riga


    
    }


})
}
</table>

{/*
<table className="table table-striped table-hover table-dark">
  <thead>
    <tr>
      <th scope="col" colSpan={4} style={{ padding: '5px' }}>nome p</th>
    </tr>
    <tr>
      <th scope="col" colSpan={4} style={{ textAlign:'left', padding: '5px' }} >cata</th>
    </tr>

    <tr>
      <th scope="col" colSpan={4} style={{ textAlign:'left', padding: '5px' }} > &emsp; sottocatcata</th>
    </tr>

    <tr>{/* ripetere?? *//*}
      <th scope="col">materiale</th>
      <th scope="col">colore</th>
      <th scope="col">misura</th>
      <th scope="col">numero</th>

    </tr>
  </thead>
  <tbody>
    <tr>
      <td>rame</td>
      <td>giallo</td>
      <td>10</td>
      <td>-</td>

    </tr>
  </tbody>
  <tbody>

    <tr>
      <td>rame</td>
      <td>giallo</td>
      <td>11</td>
      <td>-</td>

    </tr>
  </tbody>
  <tbody>

    <tr>
      <td>rame</td>
      <td>verde</td>
      <td>10</td>
      <td>-</td>

    </tr>
    <tr>
      <td>alluminio</td>
      <td>giallo</td>
      <td>11</td>
      <td>-</td>

    </tr>
    <tr>
      <td colSpan={4} style={{padding:'5px', textAlign:'right'}}>totale: -</td>

    </tr>
  </tbody>
</table>*/}
        </div>



    </div>
  );
};

export { ReportTot };

/*

*/