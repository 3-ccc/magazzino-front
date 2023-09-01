import { DarkModeContext } from "../tema/DarkModeContext";
import { useContext, useEffect, useState } from "react";
//import { retrieveAllProducts } from "../api/indexApi";
import CardMiniProdotto from "../componenti/cardMiniProdotto";
import { useNavigate } from "react-router-dom";
import { useWindowDimensions } from "../altro/windowDimensions.js";

const Altro = () => {
  const { darkMode } = useContext(DarkModeContext);
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


  return (
    <div style={{ height:'100%'}}>
        <div className="d-flex flex-wrap m-2" style={{ alignContent:'center', justifyContent:'center'}}>
            <button className={
                 "btn btn-outline-success m-2 " +
                    (darkMode ? "nav1buttonl" : "nav1button")}
                onClick={()=>{navigate('/altro/nomi')}}
            style={{width: '300px'}}>
                nomi 
            </button>
            <button className={
                 "btn btn-outline-success m-2 " +
                    (darkMode ? "nav1buttonl" : "nav1button")}
                onClick={()=>{navigate('/altro/materiali')}}
            style={{width: '300px'}}>
                materiali 
            </button>
            <button className={
                 "btn btn-outline-success m-2 " +
                    (darkMode ? "nav1buttonl" : "nav1button")}
                onClick={()=>{navigate('/altro/misure')}}
            style={{width: '300px'}}>
                misure 
            </button>
            <button className={
                 "btn btn-outline-success m-2 " +
                    (darkMode ? "nav1buttonl" : "nav1button")}
                onClick={()=>{navigate('/altro/colori')}}
            style={{width: '300px'}}>
                colori 
            </button>
            <button className={
                 "btn btn-outline-success m-2 " +
                    (darkMode ? "nav1buttonl" : "nav1button")}
                onClick={()=>{navigate('/altro/categorie')}}
            style={{width: '300px'}}>
                categorie 
            </button>
            {<button className={
                 "btn btn-outline-success m-2 " +
                    (darkMode ? "nav1buttonl" : "nav1button")}
                onClick={()=>{navigate('/altro/immagini')}}
            style={{width: '300px'}}>
                carica foto 
            </button>}
            
           
           
        </div>




    </div>
  );
};

export { Altro };
