import { useContext, useEffect } from "react";
import "./login.css";
import { DarkModeContext } from "../tema/DarkModeContext";
import { LoginCard } from "../componenti/loginCard";
import image from "../img/logo.png";

function Login() {
  const { darkMode } = useContext(DarkModeContext);
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

  /*
          quando non logagto navbar non presenti!
        in app se non c'è token? ---dovrebe andare anche con logout
  */

  return (
    <div>

      <div
        className=" wrapper-login fadeInDown mx-auto justify-content "
        style={{
          animationName: "fadeInDown",
          animationFillMode: "both",
          animationDuration: "1s",
        }}
      >
        <div
          id="formContent"
          className={darkMode ? "sfondocard1" : "sfondocard3"}
          style={{
            width: "90%",
            maxWidth: "450px",
            position: "relative",

            boxShadow: "rgba(0, 0, 0, 0.3) 0px 30px 60px 0px",
            textAlign: "center",
          }}
        >
          <div
            className="fadeIn first"
            style={{
              opacity: 0,
              animationTimingFunction: "ease-in",
              animationIterationCount: 1,
              animationDirection: "normal",
              animationPlayState: "running",
              animationName: "fadeIn",
              animationFillMode: "forwards",
              animationDuration: "1s",
              animationelay: "0.4s",
            }}
          >
            <img
              src={image}
              id={"logo"}
              alt=""
              name="logo.png"
              style={{ width: "30%" }}
            />
          </div>
          <LoginCard></LoginCard>

          {/*pageOpened === "login" && (
            <LoginCardFooter
              linkMessage={"Registrati"}
              message={"Non seri ancora registrato? "}
              clickedRedirect={() => {
                setPageOpened("registrati");
              }}
            ></LoginCardFooter>
            )*/}

          {/*pageOpened === "registrati" && (
            <LoginCardFooter
              linkMessage={"Torna al Login"}
              message={"Sei già Iscritto? "}
              clickedRedirect={() => {
                setPageOpened("login");
              }}
            ></LoginCardFooter>
            )*/}
        </div>
      </div>
    </div>
  );
}

export { Login };
