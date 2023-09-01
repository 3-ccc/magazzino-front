import { DarkModeContext } from "../tema/DarkModeContext";
import { useContext } from "react";

function SomethingWentWrong() {
  const { darkMode } = useContext(DarkModeContext);
//controlla sfondo e stile ok
    return (
      <div className={"d-flex align-items-center justify-content-center vh-100 "+(darkMode ? "light-mode" : "dark-mode")}>
        <div className="text-center">
          <h1 className="display-1 fw-bold">
            <i className="bi bi-exclamation-diamond-fill"></i></h1>
          <i className="bi bi-cone-striped"></i>
          <p className="fs-3">
            {" "}
            <span className="text-danger">Oops!</span> Si è verificato un errore :
            {"("}
          </p>
          <a href="/" className="btn btn-primary">
            Torna alla homepage
          </a>
        </div>
      </div>
    );
  }
  
  export { SomethingWentWrong };
  