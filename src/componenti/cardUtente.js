import { useNavigate } from "react-router-dom";
import { DarkModeContext } from "../tema/DarkModeContext";
import { useContext, useEffect, useState } from "react";
import { useWindowDimensions } from "../altro/windowDimensions";
import './componenti.css'


function CardElement({ elem, i,  }) {
  const { darkMode } = useContext(DarkModeContext);
  const navigate = useNavigate();
  const { wi } = useWindowDimensions();

//va messo su ogni componente ... no su pagina alemeno il caricam
  useEffect(()=>{
    var toastfarcito = [].slice.call(document.querySelectorAll('[data-toggle="popover"]'));
    toastfarcito.map((t)=>{
      new window.bootstrap.Popover(t/*,options */);
    })
  },[])

useEffect(() => {

}, []);

  return (
      <div
          className={
            " p-2 row m-1 " +(i%2==0 ? "sfondo2" : (darkMode ? "sfondo3" : "sfondo1"))
          }
          style={{
            //color: darkMode ? "#8c0101" : "#212a3e",
            width: wi > 767 ? "80%" : "100%",
          }}
          key={i}
        >
          <div className="col-8">
            {elem.username}
          </div>
          <div className="col-4">
            <button

data-toggle="popover"
data-placement="top"
data-content="modifica"
data-trigger="hover"

              type="button"
              className={
                "btn btn-outline-success " +
                (!darkMode ? "nav2button" : "nav2buttonl")
              }
              onClick={() =>{
                navigate('/account/dettagli/'+elem._id)
              }}
            >
              <i className="bi bi-pencil"></i>
            </button>
          </div>
        </div>
  );
}

export default CardElement;
