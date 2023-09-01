import { NavigationButton } from "./navigationButton";
import { DropdownButton } from "./dropdownButtonDown";
import { useSelector } from "react-redux";
//import { SearchBar } from "../components/searchBar";
import "./navstile.css";


function NavSotto({ selezionato, setSelezionato }) {
  const access = useSelector((state) => state.tokenStore.token);
  
  return (
    <div>
    {access && <nav className="navbar navbar-expand-lg navbar-light navbar-lightgreen">
      <button
        className="navbar-toggler bg-light"
        type="button"
        data-toggle="collapse"
        data-target="#navbarTogglerDemo01"
        aria-controls="navbarTogglerDemo01"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
        {/*<SearchBar></SearchBar>*/}

        <ul className="navbar-nav ml-auto mt-2 mt-lg-0 header_center">
          <NavigationButton
            buttonText={"Home"}
            goToPage={"/"}
            selezionato={selezionato}
            setSelezionato={setSelezionato}
          />

          <NavigationButton
            buttonText={"Magazzino"}
            goToPage={"/magazzino"}
            selezionato={selezionato}
            setSelezionato={setSelezionato}
          />

          <NavigationButton
            buttonText={"Carico"}
            goToPage={"/listacarico"}
            selezionato={selezionato}
            setSelezionato={setSelezionato}
          />

          <NavigationButton
            buttonText={"Scarico"}
            goToPage={"/listascarico"}
            selezionato={selezionato}
            setSelezionato={setSelezionato}
          />

          {/*<NavigationButton
            buttonText={"Altro"}
            goToPage={"/altro"}
            selezionato={selezionato}
            setSelezionato={setSelezionato}
  />*/}
          <DropdownButton
            buttonText={'Altro'}
            goToPage={'/altro'}
            selezionato={selezionato}
            setSelezionato={setSelezionato}
            
          ></DropdownButton>

          <NavigationButton
            buttonText={"Operazioni"}
            goToPage={"/operazioni"}
            selezionato={selezionato}
            setSelezionato={setSelezionato}
          />

        </ul>
      </div>
    </nav>}
    </div>
  );
}

export { NavSotto };
