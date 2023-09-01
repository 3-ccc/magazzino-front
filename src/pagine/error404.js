import { useSelector } from "react-redux";

function Error404() {
  const access = useSelector((state) => state.tokenStore?.token);

    return (
      <div className="d-flex align-items-center justify-content-center vh-100">
        <div className="text-center">
          <h1 className="display-1 fw-bold">404</h1>
          <i className="bi bi-cone-striped"></i>
          <p className="fs-3">
            {" "}
            <span className="text-danger">Oops!</span> Si è verificato un errore :
            {"("}
          </p>
          <p className="lead">La pagina cercata non esiste!</p>
          {access && <a href="/" className="btn btn-primary">
            Torna alla homepage
          </a>}
          {!access && <a href="/login" className="btn btn-primary">
            Torna al login
          </a>}
        </div>
      </div>
    );
  }//     oppure login---
  
  export { Error404 };
  