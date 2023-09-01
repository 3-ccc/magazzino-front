import { useContext, useState, useEffect } from "react";
import { DarkModeContext } from "../tema/DarkModeContext";
import { postLogin } from "../api/indexApi";
import jwtDecode from "jwt-decode";
import { useDispatch } from "react-redux";
import { setTokenInfo } from "../store/tokenStore";
import { useNavigate } from "react-router-dom";

function LoginCard() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [canIDoLogin, setCanIDoLogin] = useState(false);
  const [errorLogin, setErrorLogin] = useState("");
  const { darkMode } = useContext(DarkModeContext);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function doLogin() {
    //chiamata API al login    

    await postLogin(username, password).then((data) => {
      //console.log(data);

      if (!data.isError) {
        setErrorLogin("");
        //console.log("Ho fatto il login con");
        //console.log({ username, password });
        //console.log(data.data.result.access_token);
        //jwt
        //salvataggio store
        //console.log({ data });
        //var user = jwt.verify(data.token.split(" ")[1], 'secret');

        try {
        const user = jwtDecode(data.data.token); // decode your token here
        //console.log( user );
        dispatch(
          setTokenInfo({
            token: data.data.token,
            expireTime: user.iat
        })
        ); 
        } catch (error) {
          console.log('e')
        }

        //dispatch(setSessionUser({ user: user.userDetail }));
        /*cartUpdateOnLogin(data.data.result.access_token).then((response) => {
          if (!response.isError) {
            console.log("Carrello sincronizzato con successo!");
            //console.log(response.data);
            console.log(response.data)
            dispatch(alignCart(response.data))


          } else {
            console.log(
              "Non è stato possibile sincronizzare il carrello. Errore:"
            );
            //non va
            //state.listCart=[]
            console.log(response.messageError);
          }
        });*/
        //fa il redirect anche se non deve cmq forse meglio toglierlo
        navigate("/");
      } else {
        setErrorLogin(data.messageError + "\nErrore: " + data.status);
      }
    });

  }

  function isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
  }

  useEffect(() => {
    ///var isUsernameValid = isValidEmail(username);
    //console.log(isUsernameValid);
    if (/*isUsernameValid &&*/ username && password) {
      setCanIDoLogin(true);
      //console.log("tuttovqalido!");
    } else {
      setCanIDoLogin(false);
    }
  }, [username, password]);

  return (
    <div>
      <div> non e' + mail????<br></br>
        <label
          style={{
            opacity: 0,
            animationTimingFunction: "ease-in",
            animationIterationCount: 1,
            animationDirection: "normal",
            animationPlayState: "running",
            animationName: "fadeIn",
            animationFillMode: "forwards",
            animationDuration: "1s",
          }}
          htmlFor="password"
        >
          Username:
        </label>
        <input
          type="text"
          id="login"
          name="login"
          placeholder="Inserisci username"
          className="fadeIn second"
          required={true}
          onChange={(el) => {
            //console.log("username " + el.target.value);
            setUsername(el.target.value);
          }}
          style={{
            opacity: 0,
            animationTimingFunction: "ease-in",
            animationIterationCount: 1,
            animationDirection: "normal",
            animationPlayState: "running",
            animationName: "fadeIn",
            animationFillMode: "forwards",
            animationDuration: "1s",
            backgroundColor: " rgb(246, 246, 246)",
            color: "rgb(13, 13, 13)",
            paddingTop: "15px",
            paddingRight: "32px",
            paddingBottom: "15px",
            paddingLeft: "32px",
            textAlign: "center",
            textDecorationLine: "none",
            display: "inline-block",
            fontSize: "16px",
            margin: "5px",
            width: "85%",
            border: "2px solid rgb(246, 246, 246)",
            transitionDuration: "0.5s",
            transitionTimingFunction: "ease-in-out",
            transitionDelay: "0s",
            transitionProperty: "all",
            borderRadius: "5px",
            animationDelay: "0.6s",
          }}
        />

        <label
          style={{
            opacity: 0,
            animationTimingFunction: "ease-in",
            animationIterationCount: 1,
            animationDirection: "normal",
            animationPlayState: "running",
            animationName: "fadeIn",
            animationFillMode: "forwards",
            animationDuration: "1s",
          }}
          htmlFor="password"
        >
          Password:
        </label>

        <input
          type="password"
          id="password"
          name="password"
          placeholder="Inserisci password"
          className="fadeIn third"
          required={true}
          onChange={(el) => {
            //console.log("passwoed " + el.target.value);
            setPassword(el.target.value);
          }}
          style={{
            opacity: 0,
            animationTimingFunction: "ease-in",
            animationIterationCount: 1,
            animationDirection: "normal",
            animationPlayState: "running",
            animationName: "fadeIn",
            animationFillMode: "forwards",
            animationDuration: "1s",
            backgroundColor: "rgb(246, 246, 246)",
            color: "rgb(13, 13, 13)",
            paddingTop: "15px",
            paddingRight: "32px",
            paddingBottom: "15px",
            paddingLeft: "32px",
            textAlign: "center",
            textDecorationLine: 2,
            textDecorationThickness: "initial",
            textDecorationStyle: "initial",
            textDecorationColor: "initial",
            display: "inline-block",
            fontSize: "16px",
            margin: "5px",
            width: "85%",
            borderWidth: "2px",
            borderStyle: "solid",
            borderColor: "rgb(246, 246, 246)",
            transitionDuration: "0.5s",
            transitionTimingFunction: "ease-in-out",
            transitionDelay: "0s",
            transitionProperty: "all",
            borderRadius: "5px",
            animationDelay: "0.8s",
          }}
        />
        <button
          value="Log In"
          className={
            "fadeIn fourth btn btn-success m-1 " +
            (canIDoLogin ? "sfondo3" : darkMode ? "nav1button" : "nav1buttonl")
          }
          onClick={() => {
            doLogin();
          }}
        >
          Login
        </button>

        {errorLogin !== "" && (
          <div className="alert alert-danger">
            <strong>Errore!</strong>
            <br></br>
            {errorLogin}.
          </div>
        )}
      </div>
    </div>
  );
}

export { LoginCard };
