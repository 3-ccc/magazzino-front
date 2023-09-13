import { DarkModeContext } from "../tema/DarkModeContext";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useWindowDimensions } from "../altro/windowDimensions.js";
import logo from '../img/logo.png'

const HomePage = () => {
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

  useEffect(() => {
    
  }, []);


  return (
    <div className="my-auto d-flex" style={{ height:'74vh', alignSelf:'center'}}>
        <div className="d-flex flex-wrap m-2 my-auto" style={{ alignContent:'center', justifyContent:'center', alignSelf:'center'}}>
        <div style={{width:'100%'}}>
        <img
            src={logo}
            id={"logo"}
            alt=""
            name="logo.png"
            style={{ width: "30%" }}
        />
        </div>
           <h2><b>Benvenuto :D</b></h2>
        </div>
    </div>
  );
};

export { HomePage };
