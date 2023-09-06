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
//import { retrieveAllProducts } from "../api/indexApi";
import { useNavigate } from "react-router-dom";
import { useWindowDimensions } from "../altro/windowDimensions.js";

const PaginationNum = ({i, selez, tot, setselez}) => {
  const { darkMode } = useContext(DarkModeContext);
  const { wi } = useWindowDimensions();
  const navigate = useNavigate();
  const w=Math.trunc((wi-32-58-38*4)/38)
  const [min, setMin] = useState(/*selez+Math.round(w/2)-1>tot ? Math.trunc(w/2)/*+(tot-selez+max-3) : Math.trunc(w/2)  /*Math.trunc(w/2)*/);
  const [max, setMax] = useState(/*selez-Math.trunc(w/2)<1 ? Math.round(w/2)/*+(tot-selez+max-3) /*Math.round(w/2)*/);
  //let min=Math.trunc(w/2)
  //let max=Math.round(w/2)
  const [mi, setMi] = useState()
  const [ma, setMa] = useState()
//son i default che non vanno--> pero se tolti cima fondo non va

//quando wi troppo piccolo spariscono i ... ma va bene rimangono i pulsanti

useEffect(() => {
  //manca ualcaosa x quellinel mezzo...
  //  4-8
  
  //ricorda almeno una deve esserci! la selected
  /*
      if(selez+Math.round(w/2)-1>tot){
        //console.log(Math.trunc(w/2))
        //console.log( Math.round(w/2))
        //console.log(selez)
        //console.log( Math.round(w/2)-1)
        //console.log(selez+ Math.round(w/2)-1-tot)
        //console.log(min+(tot-selez+max-1))//6
        setMin(Math.trunc(w/2)+selez+ Math.round(w/2)-1-tot)
        setMax(Math.round(w/2))

        //min=min+(tot-selez+max-3)
      }else if(selez- Math.trunc(w/2)<1){
        //console.log(selez-Math.trunc(w/2))
        setMax( Math.round(w/2)-(selez-Math.trunc(w/2)-1))
        setMin(Math.trunc(w/2))

        //console.log(max+(1-selez-min))
        //setMax()
        //max=max+(1-selez-min)
      }else{
        setMax(Math.round(w/2))
        setMin(Math.trunc(w/2))
      }*/
    }, []);

    useEffect(() => {
      /*console.log(selez, 'selez')
      console.log(min, 'min', Math.trunc(w/2) )
      console.log(max, 'max', Math.round(w/2) )
      console.log(mi, 'mi')
      console.log(ma, 'ma')*/
      
          }, [selez]);

  useEffect(() => {
//manca ualcaosa x quellinel mezzo...
//  4-8

//ricorda almeno una deve esserci! la selected

    if(selez+Math.round(w/2)-1>tot){
      //console.log('max mag')
      //console.log(Math.trunc(w/2))
      //console.log( Math.round(w/2))
      //console.log(selez)
      //console.log( Math.round(w/2)-1)
      //console.log(selez+ Math.round(w/2)-1-tot)
      //console.log(min+(tot-selez+max-1))//6
      setMax(Math.round(w/2))

      setMin(Math.trunc(w/2)+selez+ Math.round(w/2)-1-tot)

      //min=min+(tot-selez+max-3)
    }else if(selez- Math.trunc(w/2)<=1){
      //console.log('min minore')

      //1 to w?
      //console.log(Math.trunc(w/2))
      
      //console.log(selez-Math.trunc(w/2))
      setMin(Math.trunc(w/2))

      setMax( Math.round(w/2)-(selez-Math.trunc(w/2)-1))

      //console.log(max+(1-selez-min))
      //setMax()
      //max=max+(1-selez-min)
    }else{
      setMax(Math.round(w/2))
      setMin(Math.trunc(w/2))
    }
    

  }, [selez, wi]);

  useEffect(() => {

    if(selez+Math.round(w/2)-1>tot || selez- Math.trunc(w/2)<1){
      //console.log('cambio')
      setMi(selez-min )
      setMa(selez+max-1)      
    }else{
      setMi()
      setMa()
    }

    //se in meno toglie poi aggiunge quindi va bene 
    //altrimetni flickera xke va a capo


      }, [min, max]);

//in base a width calcola quante mostrare -> min 1 cmq
//poi in base a selezionata -> x prima x dopo

//2em 32px? col2 60...  40*2
//console.log(wi)
//console.log(wi-32-57-37*2)        ??
//console.log(w)//6
//console.log('doppia tripla cifra cambia width')//-> se dispari?? 1+ parte o altra
//console.log(Math.trunc(w/2))//-> se dispari?? 1+ parte o altra
//console.log('---')
//console.log(selez+max-1)
//console.log(selez-min)
/*
if(selez+max-1>tot){
  console.log(tot-selez+max-1)
  console.log(min)
  console.log(min+(tot-selez+max-3))//6
  //setMin(min+(tot-selez+max-1))
  min=min+(tot-selez+max-3)
}
if(selez-min<1){
  console.log(max+(1-selez-min))
  //max=max+(1-selez-min)
}
*/
//se pari??

//1 2 3 4 5 6 7 8 9 10 -> 7     ... 4 5 6 7 8 ...
//
// i >=selez vedere selez + (max-1)
//se i = sopra e non = tot vedi ...
//
//i<selez vedere selez - min
//se i= sopra e non = min ---
//
//tot-max selez<


  return (

    <div >
{i!=selez && i==selez-min &&  <li className='page-item'>
        <button style={{borderRadius:'0'}}
        className={
              selez === i
                ? "btn btn-outline-success " +
                  (darkMode ? "nav2buttonselectedl" : "nav2buttonselected")
                : "btn btn-outline-success " +
                  (darkMode ? "nav1buttonl" : "nav1button")
            }>...</button></li>

}

{  i!=selez && i==selez+max-1 && <li className='page-item'>
        <button style={{borderRadius:'0'}}
        className={
              selez === i
                ? "btn btn-outline-success " +
                  (darkMode ? "nav2buttonselectedl" : "nav2buttonselected")
                : "btn btn-outline-success " +
                  (darkMode ? "nav1buttonl" : "nav1button")
            }>...</button></li>

}
{(i!=selez && i<selez+max-1 &&  i>selez-min ) &&
<li className='page-item'>
        <button style={{borderRadius:'0'}}
        onClick={()=>setselez(i)}
        className={
              selez === i
                ? "btn btn-outline-success " +
                  (darkMode ? "nav2buttonselectedl" : "nav2buttonselected")
                : "btn btn-outline-success " +
                  (darkMode ? "nav1buttonl" : "nav1button")
            }>{i}</button></li>}
{i==selez &&
<li className='page-item'>
        <button style={{borderRadius:'0'}}
        onClick={()=>setselez(i)}
        className={
              selez === i
                ? "btn btn-outline-success " +
                  (darkMode ? "nav2buttonselectedl" : "nav2buttonselected")
                : "btn btn-outline-success " +
                  (darkMode ? "nav1buttonl" : "nav1button")
            }>{i}</button></li>}
    </div>
  );
};

export { PaginationNum };
