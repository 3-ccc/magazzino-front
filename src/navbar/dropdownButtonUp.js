import { useContext } from "react";
import { DarkModeContext } from "../tema/DarkModeContext";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

function DropdownButtonUp({
  setSelezionato,
  selezionato,
  buttonText,
  goToPage,
}) {

  //in teoria riutilizzabile ma serve array elementi e array link on click

  const { darkMode } = useContext(DarkModeContext);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logout=async()=>{
    //logout redirect log in
      //cosi funziona
      let { emptyStore } = await import("../store/tokenStore");
  
      dispatch(emptyStore());
      navigate("/login");
  }

  return (
    <li className="nav-item dropdown ml-2">
  <button
    className={
      selezionato === goToPage
        ? "btn btn-outline-success dropdown-toggle " +
        (darkMode ? "nav1buttonselectedl" : "nav1buttonselected")
      : "btn btn-outline-success dropdown-toggle " +
        (darkMode ? "nav1buttonl" : "nav1button")
    }
    type="button"
    id="dropdownMenuButton"
    data-mdb-toggle="dropdown"
    aria-expanded="false"
    onClick={()=>{
      //console.log('cliac')
      setSelezionato(goToPage)
      //navigate(goToPage+'/new')
    }}
  >
    <span style={{ fontSize: "11px" }}>{'Account'} </span>
    <i className="bi bi-person"></i>
    
    {/*<i className="bi bi-caret-down"></i>*/}
  </button>
  <ul className="dropdown-menu dropdown-menu-right up" aria-labelledby="dropdownMenuButton" style={{top:'90%'}}>
    <li><a className="dropdown-item" onClick={()=>{setSelezionato(goToPage)}}>Dettagli</a></li>
    <li><a className="dropdown-item" onClick={ ()=>logout()}>Log out <i className="bi bi-door-open"></i></a></li>
  </ul>
    </li>
  );
}

export { DropdownButtonUp };
