import { useNavigate } from "react-router-dom";
import { DarkModeContext } from "../tema/DarkModeContext";
import { useContext, useEffect, useState } from "react";
import './componenti.css'
import prova from '../img/dotted.png'
import multi from '../img/multi.png'
import { inactiveProduct, activeProduct } from "../api/indexApi";
//quelle con scritta si vede scritta...
//quasi tutte rompono --> centro
//in realta no--> è xke riprende stessa immagine per lo sfondo categoria
//sara da ascegliere migliore


function CardProdotto({ singleProduct, indice, pulsanti, refresh, setrefresh }) {
  const { darkMode } = useContext(DarkModeContext);
  const navigate = useNavigate();
  const [image, setImage] = useState();

  const shadowl='0px 0px 3px #f1f4dc, -2px -2px 3px #f1f4dc, 2px 2px 3px #f1f4dc, 2px -2px 3px #f1f4dc , -2px 2px 3px #f1f4dc' 
  const shadowd= '0px 0px 3px #244e23 , -2px -2px 3px #244e23 , 2px 2px 3px #244e23 , 2px -2px 3px #244e23 , -2px 2px 3px #244e23'

  //sistema immagini
  //non proprio fattibile usare img caricate?
//google? tanto ormai c'è l acc
//dovrei passargliele--- uploader
//ma anche caricandole manualmente su drive?
//quando creato va in cartella e vede se c'è nome
//se c'è prende link?   pubblico

//in front niente credenziali

//oppure mettere link a mano -> a questo punto cmq serve altro input
//si puo fare link con nome e basta? non credo
//https://stackoverflow.com/questions/61673985/how-to-search-for-files-by-name-inside-of-a-specific-folder-google-docs-api
//forse si---
//poi bisogna vedere come arriva -> se posso prendere file ok
//solo in creazione --- prima va caricata immagine altrimenti chiaramente non va

//folder name->folder id    ? direttamente anche folder file's?
//https://stackoverflow.com/questions/45757635/google-drive-api-v3-get-a-folder-id-with-name


/*
log parecchio pesante sembra


noh cmq tanto  per?
cmq se rinominato google non rinomina quindi---

https://www.youtube.com/watch?v=1y0-IfRW114   //?
*/


/*
    nome: 
    categoria: 
    materiale: 
    misura:
    quantita: 
    limitescorta: 
    sottoscorta: 
    img :
*/

useEffect(() => {
  var toastfarcitov = [].slice.call(document.querySelectorAll(".popover"));
   
    toastfarcitov.map((t)=>{

//se faccio freccetta avanti/indietro non va via-> quando cambiata route va fattto
//meglio al caricamento di ogni pagina?
//toglie anche quelli nascosti=
      document.getElementById(t.id).remove()
      //t.
  
    })
  
  var toastfarcito = [].slice.call(document.querySelectorAll('[data-toggle="popover"]'));
  //console.log(toastfarcito)
  //  toastfarcito.toast('show')

  //senza internet no bootstrap
  toastfarcito.map((t)=>{
    new window.bootstrap.Popover(t/*,options */);

  })


  /*document.querySelector('body').on('click', function (e) {
    //only buttons
    /*if ($(e.target).data('toggle') !== 'popover'
        && $(e.target).parents('.popover.in').length === 0) { */
  /*var toastfarcito = [].slice.call(document.querySelectorAll('[data-toggle="popover"]'));
  toastfarcito.map((t)=>{
    new window.bootstrap.Popover('hide');

  })*/
        //$('[data-toggle="popover"]').popover('hide');
    //}
//});

}, []);

const stringToColour = (str) => {//per usarlo sempre se va 
  //ternanrio esterno o sfondo questo colore o url
  //nemmeno xke non va in backgroundimage l hex
  
  //do while se cont !=0 str=str+'a' ?    poi vedi cosa esce
  //se cont==5      calcola verdes calcola verdec quale meglio?
  //while cont <=5    

  let cont =0
  
  let hash = 0;
  str.split('').forEach(char => {
    hash = char.charCodeAt(0) + ((hash << 5) - hash)
  })
  let colour = '#'
  for (let i = 0; i < 3; i++) {
    const value = (hash >> (i * 8)) & 0xff
    colour += value.toString(16).padStart(2, '0')
  }
  return colour

  //se contrasto non buono...

//  brightness = (299*R + 587*G + 114*B) / 1000
  
  //recuperate colore text oppure 'dare * scontato'


  //aggiungi lettera e ripeti
  //do while        potenzialmene infinito--- direi meglio di no

}

const hextorgb=(hexcolor)=>{
  const c={
    r : parseInt(hexcolor.substring(1,3),16),
    g : parseInt(hexcolor.substring(3,5),16),
    b : parseInt(hexcolor.substring(5,7),16),
  }
  return c
}

  useEffect(() => {
    try {
      setImage(require(`../img/${singleProduct.image}`));
      //console.log('img ok')

    } catch (error) {
      //console.log('err')
      setImage(require(`../img/noone.png`));

      if(singleProduct.nome){
        //console.log(singleProduct.nome.nome)

        //console.log(stringToColour(singleProduct.nome.nome))
      }
    }
  }, [singleProduct.image]);

  function naviga(route, state) {//?
    //console.log('a')
    /*const ppp=document.querySelector('.popover-dismiss')
    console.log(ppp)
    ppp.Popover({
      trigger: 'focus'
    })*/
   var toastfarcito = [].slice.call(document.querySelectorAll(".popover"));
  //console.log(toastfarcito)
   
    toastfarcito.map((t)=>{
      //console.log(t.id)



//se faccio freccetta avanti/indietro non va via-> quando cambiata route va fattto
//meglio al caricamento di ogni pagina?
//toglie anche quelli nascosti=
//fare prima di caricare altri nuovi
      document.getElementById(t.id).remove()
      //t.
  
    })
          //$('[data-toggle="popover"]').popover('hide');
      //}
  
    navigate(route, state);
  }

const inactive =()=>{
  //console.log(singleProduct)
    inactiveProduct(singleProduct).then((element) => {
      if (element.isError) {
        ////
      } else {
        /////
        var toastfarcito = [].slice.call(document.querySelectorAll(".popover"));
          toastfarcito.map((t)=>{
            document.getElementById(t.id).remove()
          })
        setrefresh(!refresh)
      }
    });
}
////////////////////////////////////////
//    prima di refresh togliere i toast altrimenti resta li---
/////////////////////////
const active =()=>{
  //console.log(singleProduct)

    activeProduct(singleProduct).then((element) => {
      if (element.isError) {
        ////
      } else {
        /////
        var toastfarcito = [].slice.call(document.querySelectorAll(".popover"));
        toastfarcito.map((t)=>{
          document.getElementById(t.id).remove()
        })
        setrefresh(!refresh)
      }
    });
}

 /* const content = `.${classes.pp}`;
  console.log(content)
*/
//console.log(singleProduct)

//img ok funziona altri 2
//background no---
//nel sens se non c'è ok mette default
//ma se link drive sbagliato?
//non c'è direttamente immagine
//non va bene---
//dovrei fare chiamata x checkare id google--- anche no? troppe chiamate

//vedere on error su div? non sembra funzionare cm

//usare le mostra entrambe

//rimarra cosi---
//cmq non va---
//se id sbagliato rimane vuoto e basta

//se provo caricare altro componente immagine?
//sarebbero cmq 3 tantini
//try catch?



//console.log(document.getElementById('divmate').style)

  return (
    <div
    id="divmate"
      className={ //pp immagine diversa?
        "card m-2 pp " +
        (indice % 2 === 0
          ? darkMode
            ? "sfondocard1"
            : "sfondocard2"
          : darkMode
          ? "sfondocard2"
          : "sfondocard1")
      }///static/media/copper.f61afb9d9e00661aa431.png"
      style={{ width: "18rem", position:"relative" , backgroundImage:  `url(${(singleProduct.materiale && singleProduct.materiale.img) ? 'https://drive.google.com/uc?export=view&id='+singleProduct.materiale.img : prova }), url(${(singleProduct.colore && singleProduct.colore.img) ? 'https://drive.google.com/uc?export=view&id='+singleProduct.colore.img : multi })` }}//'https://drive.google.com/uc?export=view&id=1aJnJHtPAnVR7Ma7WIzAup_-t5uZazjam'      
      //on error set quella base ma cosi funziona?? error su div e no img
      //ma poi src non funziona---
      //serve state ma cmq on error????
      //prova creare immagine a qual punto deve erìssere visibile ..non va 
      onError={({ currentTarget }) => {
        //non passa
        //funziona per errori in componenti dentro div...

        //currentTarget.onerror = null; // prevents looping
        //currentTarget.src=image;
        console.log('errore on err')
        console.log(currentTarget)

      }}
      onClick={() => {
        //naviga(singleProduct.id);
        //naviga(singleProduct.id_product);
      }}
    >
      {/*<div className="pp card">*/}

      <img
        src={(singleProduct.nome && singleProduct.nome.img) ? 'https://drive.google.com/uc?export=view&id='+singleProduct.nome.img : image }//{image}
        className="card-img-top mx-auto mt-1"
        alt={` icon`}
        id='immaginepro'
        style={{ width: "100px", height: "100px",  borderRadius:'10px', backgroundColor: `rgba(${hextorgb(stringToColour('s'+singleProduct.codice)).r}, ${hextorgb(stringToColour('s'+singleProduct.codice)).g}, ${hextorgb(stringToColour('s'+singleProduct.codice)).b}, 0.5)`}}
        onError={({ currentTarget }) => {
          //sembra ok
          currentTarget.onerror = null; // prevents looping
          currentTarget.src=image;
        }}
        //se non tonde-> hanno bground fai anche bordi e arrotonda
      />
      { false && <img
        src={'https://drive.google.com/uc?export=view&id=1aJnJHtPAnVR7Ma7WIzAup_-t5uZzjam' }//{image}
        className="card-img-top mx-auto mt-1"
        alt={` icon`}
        style={{ width: "0px", height: "0px", display:'none'}}
        
        //se non tonde-> hanno bground fai anche bordi e arrotonda
      />}
      {/*<img
        src={prova}
        className="card-img-top mx-auto mt-1"
        style={{ width: "150px", height: "150px", opacity:"0.6" }}
    />*/}

      <div className="card-body" onError={({ currentTarget }) => {
            //sembra ok
            console.log('-----')
          }}>
        <h5 className="card-title">
          {/*singleProduct.name*/}
          {singleProduct.nome ? singleProduct.nome.nome : '-' /* cmq dovra essere obbligatorio.. */}
        </h5>
        <p style={{borderRadius:'5px'}} className={"card-text m-1 "+(singleProduct.quantita<singleProduct.limitescorta ? 'alert-danger ' : '')+(singleProduct.quantita==singleProduct.limitescorta ? 'alert-warning ' : '')+(singleProduct.quantita>singleProduct.limitescorta ? 'alert-success ' : '')}>
          {/*(Math.round(singleProduct.unitPrice * 100) / 100).toFixed(2)*/}{" "}
          {/*€*/}
          {'quantita: '+ (singleProduct.quantita ? singleProduct.quantita : '-')+' / '+(singleProduct.limitescorta ? singleProduct.limitescorta : '-')}
        </p>
        <p className="card-text m-1" >{'materiale: '+((singleProduct.materiale && singleProduct.materiale.nome) ? singleProduct.materiale.nome : '-')}</p>
        {singleProduct.misura && singleProduct.misura.nome && <p className="card-text m-1">{'misura: '+(singleProduct.misura.nome ? singleProduct.misura.nome : '-')}</p>}

        {/*style=borderRadius:'5px', background: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url(${prova})`, backgroundRepeat:'no-repeat',backgroundSize:'150%',backgroundPosition:'center*/}
        {/*<p>*/}
        <div className="card-text m-1" style={{position:'relative'}} >
          <p className="prova m-1" style={ (!singleProduct.categoria || (singleProduct.categoria && !singleProduct.categoria.img)) ? {backgroundColor: (indice%2!=0 ? (darkMode ? '#244e23' : '#f1f4dc') : (darkMode ? '#f1f4dc' : '#244e23'))} : {backgroundImage: `url(${(singleProduct.categoria && singleProduct.categoria.img) ? 'https://drive.google.com/uc?export=view&id='+singleProduct.categoria.img : prova })`}}>
            {'categoria: '+((singleProduct.categoria && singleProduct.categoria.nome) ? singleProduct.categoria.nome : '-')}</p>
          <p className="provai" style={(!singleProduct.categoria || (singleProduct.categoria && !singleProduct.categoria.img)) ? {} : {textShadow: (indice%2!=0 ? (darkMode ? shadowd : shadowl) : (darkMode ? shadowl : shadowd))}}>{'categoria: '+((singleProduct.categoria && singleProduct.categoria.nome) ? singleProduct.categoria.nome : '-')}</p>
          </div>
      {/*</p>*/}
        <p className="card-text m-1">{'colore: '+((singleProduct.colore && singleProduct.colore.nome) ? singleProduct.colore.nome : '-')}</p>
      {singleProduct.sottocategoria && singleProduct.sottocategoria.nome && <p className="card-text m-1">{'sottocategoria: '+singleProduct.sottocategoria.nome}</p>}
        
        {pulsanti && <button
          className="btn btn-outline-success nav2button mr-1"
          data-toggle="popover"
          data-placement="top"
          data-content="dettaglio"
          data-trigger="hover"
          onClick={() => {
            //naviga(singleProduct.id);
            
            naviga('/magazzino/dettagli/'+singleProduct._id, {state:singleProduct});
          }}
        >
          <i className="bi bi-pencil-fill"></i>
        </button>}
        {pulsanti && <button
          className="btn btn-outline-success nav2button mr-1 "
          id="pop1"
          data-toggle="popover"
          data-placement="top"
          //data-title="titolo"
          data-content="carico"
          data-trigger="hover"
          onClick={() => {
            //naviga(singleProduct.id);
            
            naviga('/carico'/*+1*/, {state:singleProduct});
          }}
        >
          <i className="bi bi-box-arrow-in-down"></i>
        </button>}
        {pulsanti && <a
          className="btn btn-outline-success nav2button mr-1"
          id="pop2"
          tabIndex='0'
          data-toggle="popover"
          data-placement="top"
          //data-title="titolo"
          data-content="scarico"
          data-trigger="hover"
          onClick={() => {
            //naviga(singleProduct.id);
            
    //navigate('/carico'/*+1*/, {state:singleProduct})

            naviga('/scarico'/*+1*/, {state:singleProduct});
          }}
        >
          <i className="bi bi-box-arrow-up"></i>
        </a>}
        {pulsanti && <button
          className="btn btn-outline-danger nav2button "
          data-toggle="popover"
          data-placement="top"
          data-content="disattiva"
          data-trigger="hover"
          onClick={() => {
            //chiamata attiva o disattiva
            inactive()
          }}
        >
          <i className="bi bi-slash-circle"></i>
        </button>}
        {!pulsanti && <button
          className="btn btn-outline-success nav2button "
          data-toggle="popover"
          data-placement="top"
          data-content="attiva"
          data-trigger="hover"
          onClick={() => {
            //chiamata attiva o disattiva
            active()
          }}
        >
          <i className="bi bi-recycle"></i>
        </button>}
        {/*recycle  repeat  hammer
        <i class="bi bi-slash-circle"></i>*/}
        {/*<img src={prova}></img>*/}
      </div>
      {/*</div>*/}

    </div>
  );
}

export default CardProdotto;
