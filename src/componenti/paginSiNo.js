import { DarkModeContext } from "../tema/DarkModeContext";
import { useContext, useEffect } from "react";
//import { retrieveAllProducts } from "../api/indexApi";
import { useNavigate } from "react-router-dom";

const PaginSiNo = ({p, setp}) => {
  const { darkMode } = useContext(DarkModeContext);
  const navigate = useNavigate();

  useEffect(()=>{
    var toastfarcito = [].slice.call(document.querySelectorAll('[data-toggle="popover"]'));
    toastfarcito.map((t)=>{
      new window.bootstrap.Popover(t/*,options */);
    })
  },[p])

  return (
        <div className="mt-2" style={{textAlign:'right'}}>
        {p && <button className={
            "  " + (darkMode ? "sfondocard1" : "sfondocard3")
          }
          data-toggle="popover"
          data-placement="top"
          data-content="lista"
          data-trigger="hover"
          onClick={()=>{
            var toastfarcitov = [].slice.call(document.querySelectorAll(".popover"));     
            toastfarcitov.map((t)=>{
              document.getElementById(t.id).remove()
            })
            setp(false)
          }}><i className="bi bi-card-list"></i></button>}
        {/*<button><i className="bi bi-table"></i></button>*/}
        {!p && <button className={
            "  " + (darkMode ? "sfondocard1" : "sfondocard3")
          }
          data-toggle="popover"
          data-placement="top"
          data-content="pagine"
          data-trigger="hover"
          onClick={()=>{
            var toastfarcitov = [].slice.call(document.querySelectorAll(".popover"));     
            toastfarcitov.map((t)=>{
              document.getElementById(t.id).remove()
            })
            setp(true)
          }}><i className="bi bi-book"></i></button>}
      </div>
  );
};

export { PaginSiNo };
