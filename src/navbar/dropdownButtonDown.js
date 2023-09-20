import { useContext } from "react";
import { DarkModeContext } from "../tema/DarkModeContext";
import { useNavigate } from "react-router-dom";

function DropdownButton({
  setSelezionato,
  selezionato,
  buttonText,
  goToPage,
}) {

  //in teoria riutilizzabile ma serve array elementi e array link on click

  const { darkMode } = useContext(DarkModeContext);
  const navigate = useNavigate();

  return (
    <li className="nav-item nav-link dropdown">
  <button
    className={
      selezionato === buttonText
        ? "btn btn-outline-success dropdown-toggle " +
          (darkMode ? "nav2buttonselectedl" : "nav2buttonselected")
        : "btn btn-outline-success dropdown-toggle " +
          (darkMode ? "nav2buttonl" : "nav2button")
    }
    type="button"
    id="dropdownMenuButton"
    data-mdb-toggle="dropdown"
    aria-expanded="false"
    onClick={()=>{
      //console.log('cliac')
      setSelezionato(buttonText)
      navigate(goToPage)
    }}
  >
    {buttonText}
    {/*<i className="bi bi-caret-down"></i>*/}
  </button>
  {/*con nche altro/?*/}
  <ul className="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuButton" style={{top:'90%'}}>
    <li><a className="dropdown-item" onClick={()=>{navigate(goToPage+"/nomi")}} >Nomi</a></li>
    <li><a className="dropdown-item" onClick={()=>{navigate(goToPage+"/materiali")}}>Materiali</a></li>
    <li><a className="dropdown-item" onClick={()=>{navigate(goToPage+"/misure")}}>Misure</a></li>
    <li><a className="dropdown-item" onClick={()=>{navigate(goToPage+"/colori")}}>Colori</a></li>
    <li><a className="dropdown-item" onClick={()=>{navigate(goToPage+"/categorie")}}>Categorie</a></li>
    <li><a className="dropdown-item" onClick={()=>{navigate(goToPage+"/immagini")}}>Carica immagini</a></li>
    <li><a className="dropdown-item" onClick={()=>{navigate(goToPage+"/inattivi")}}>Prodotti inattivi</a></li>

    {/*<li><a className="dropdown-item" href={goToPage+"/sottocategorie"}>Sottocategorie</a></li>*/}
  </ul>
    </li>
  );
}

export { DropdownButton };
