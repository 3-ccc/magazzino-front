import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { emptyStore } from "../store/tokenStore";

function ProtectedRoute({ children }) {
  const access = useSelector((state) => state.tokenStore.token);
  const expireJWT = useSelector((state) => state.tokenStore.expireTime);
  const dispatch = useDispatch();
  let location = useLocation();

  var expireDate = new Date(0);
  expireDate.setUTCSeconds(expireJWT);
  //console.log(expireDate);
  const nowDate = new Date();
  //console.log(nowDate);

  var expiredToken = false;

//da rivedere!!!!

  //if (nowDate.getTime() > expireDate.getTime()) {
    //expiredToken = true;
  //} else {
    //expiredToken = false;
 // }

  if (expiredToken) {
    //dispatch(emptyStore());
    return (
      <div
        className="alert alert-danger mx-auto mt-4"
        role="alert"
        style={{ width: "300px", textAlign: "center" }}
      >
        <b>Attenzione!</b>
        <p>
          La sessione è scaduta oppure login non effettuato.<br></br>
          <br></br>E' pregato di rieffettuare l'accesso!
        </p>
      </div>
    );
  }

  if (!access) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

export { ProtectedRoute };