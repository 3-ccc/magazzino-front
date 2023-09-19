import { useContext } from "react";
import { DarkModeContext } from "../tema/DarkModeContext";
import logo from "../img/logo.png";
import { useNavigate } from "react-router-dom";
import "./navstile.css";
import { useSelector } from "react-redux";
import { DropdownButtonUp } from "./dropdownButtonUp";

function NavSopra({ selezionato, setSelezionato }) {
  const { darkMode, toggleDarkMode } = useContext(DarkModeContext);
  const navigate = useNavigate();
  const access = useSelector((state) => state.tokenStore.token);

//logo sfondi metalli?


  const click = (bott) => {
    //console.log(bott)
    setSelezionato(bott);
    //if(bott=='home')
    navigate(`/${bott}`);
  };

  return (
    <nav
      className={
        "navbar navbar-light sticky-top " +
        (darkMode ? "upper-navbar-dark" : "upper-navbar-light")
      }
      id="navsopra"
    >
      <a
        className={"navbar-brand " + (darkMode ? "testolight" : "testodark")}
        href="/magazzino-front"
      >
        {<img
          src={logo}
          width="30"
          height="30"
          className="d-inline-block align-top"
          alt=""
    />}
        &nbsp;&nbsp;3ccc
      </a>
      <ul className=" navbar-nav ml-auto mt-2 mt-lg-0 upper-navbar">
        {!access && (
          <li className="nav-item ">
            <button
              data-toggle="tooltip"
              data-placement="bottom"
              title="Tooltip on bottom"
              className={
                selezionato === "login"
                  ? "btn btn-outline-success " +
                    (darkMode ? "nav1buttonselectedl" : "nav1buttonselected")
                  : "btn btn-outline-success " +
                    (darkMode ? "nav1buttonl" : "nav1button")
              }
              onClick={() => {
                click("login");
              }}
            >
              <span style={{ fontSize: "11px" }}>Login </span>
              <i className="bi bi-incognito"></i>
            </button>
          </li>
        )}

        {access && (
          <DropdownButtonUp buttonText={'Account'} setSelezionato={click} selezionato={selezionato} goToPage={'account'}></DropdownButtonUp>
        )}
        {access && (

        <li className="nav-item ml-2">
          <button
            className={
              selezionato === "cart"
                ? "btn btn-outline-success " +
                  (darkMode ? "nav1buttonselectedl" : "nav1buttonselected")
                : "btn btn-outline-success " +
                  (darkMode ? "nav1buttonl" : "nav1button")
            }
            onClick={() => {
              click("utenti");
            }}
          >
            <span style={{ fontSize: "11px" }}>Utenti </span>

            <i className="bi bi-people-fill"></i>
          </button>
        </li>
        )}

        <li className="nav-item ml-2">
          <button
            className=" btn btn-outline-success nav2button"
            onClick={() => {
              toggleDarkMode();
            }}
          >
            <span style={{ fontSize: "11px" }}>Tema </span>

            <i
              className={!darkMode ? "bi-brightness-high " : "bi-moon-fill"}
            ></i>
          </button>
        </li>
      </ul>
    </nav>
  );
}

export { NavSopra };