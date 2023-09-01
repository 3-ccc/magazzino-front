import { DarkModeContext } from "../tema/DarkModeContext";
import { MsgContext } from "../tema/MsgContext";
import { useContext, useEffect, useState } from "react";
import { getSingleUser, createUser, modifyUser, modifyUserSuper } from "../api/indexApi";
import CardMiniProdotto from "../componenti/cardMiniProdotto";
import { useNavigate, useParams } from "react-router-dom";
import { useWindowDimensions } from "../altro/windowDimensions.js";
import jwtDecode from "jwt-decode";
import { useSelector } from "react-redux";


const Account = ({mod}) => {
    const params = useParams();
    const { setmess } = useContext(MsgContext);
  const { darkMode } = useContext(DarkModeContext);
  const [isOnModify, setIsOnModify] = useState(mod === "new" ? true : false);
  const [error, setError] = useState(null);
  const [msgConferma, setMsgConferma] = useState(false);
  const [modPass, setModPass] = useState(false);
  const [password, setPassword] = useState('');
  const [nuovapass, setNuovapass] = useState('');
  const [account, setAccount] = useState({username: "",});
  const [accountorig, setAccountorig] = useState({ username: "",});
  var idOfAccount = undefined;

  const access = useSelector((state) => state.tokenStore?.token);
  const user = jwtDecode(access); 


  if (params.id) {
    idOfAccount = params.id//parseInt(params?.id);//mica int qui!
  }else{
    if(mod=='me'){
      //console.log('me')
      //console.log(user.user.id)

      idOfAccount=user.user.id
      //console.log(idOfAccount)
    }
  }

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

  useEffect(() => {

    setModPass(false)
    setNuovapass('')
    setPassword('')

    if (idOfAccount) {
      //retrieveDetailsOfProduct(idOfAccount).then((found) => {
      getSingleUser(idOfAccount).then((element) => {
        if (element.isError) {
          setError(element.messageError);
        } else {
          setError("");
          setAccount(element.data);
          setAccountorig(element.data);
        }
      });
      //setAccount(        {
        //username: "prva",
        //password:'',//questi qui non ci saranno --> a parte
        //nuovapass:'',
      //})
      /*setAccountorig(        {
        username: "prva",
      })*/
    }

  //  if(mod==='me'){
    //  setAccount({username:'provame'/*user.username*/})
      //setAccountorig({username:'provame'/*user.username*/})
    //}

    setIsOnModify(mod === "new" ? true : false)

  }, [idOfAccount,access, mod]);

  useEffect(() => {

  }, []);

  const modifyInfo = () => {
    if(params.id){
      setModPass(true)
    }
    setIsOnModify(true);
    setMsgConferma("");
  };

  const showmsg=(m)=>{
    
    //funziona me se scroll non si veder quindi -> rivedi dettaglio prodotto prendi scroll 
    //top scroll x%

    setmess({
    
      stile:'',
      mess:m
    })
    var toastfarcito = document.querySelector('.toast');
  //  toastfarcito.toast('show')
    new window.bootstrap.Toast(toastfarcito/*,options */).show();
    }

  useEffect(() => {
    setError(null);
    //console.log(account)

//se mod pass
  if(modPass){
    if (!nuovapass || nuovapass.trimEnd().trimStart()=='') {
      setError("Inserire nuovapassword");
    }
  }

//se mod
  if (!password || password.trimEnd().trimStart()=='') {
    setError("Inserire password");
  }
//console.log(account.username)
  if (!account.username || account.username.trimEnd().trimStart()=='') {
    setError("Inserire username");
  }

  }, [account.username, password, nuovapass, modPass]);

  const confirmSave = () => {
    console.log('salva')
    if (
        account.username 
    ) {
      ///console.log(account)
      if (error === null) {
        //chiamata di api di salvataggio

        //se corretto
        if(mod!='new'){
        setIsOnModify(false);
        }

//se mod prorpio account? token? va richiamato?


        //dispatch(setSessionUser({ user: account }));
        if (mod === "new") {
          //console.log({ account });
          createUser({username:account.username, password:password}).then((element) => {
            if (element.isError) {
              setError(element.messageError);
            } else {
              setAccount({
                username: "",
                password:"",
              });
              setPassword('')
              setMsgConferma(true);
              showmsg('ciao ciao')
            }
          });
        } else {

          //se params.id chiama superuser
          if(params.id){
            console.log('sup')
            modifyUserSuper({ password:password, idsuper:user.user.id, id:idOfAccount, nuovapass: mod!='new' ? nuovapass : null}).then((element) => {
              if (element.isError) {
                setError(element.messageError);
              } else {
                setMsgConferma(true);
                setModPass(false)
              }
            });
            // da ricontrollare
          }else{
            modifyUser({username:account.username, password:password, id:idOfAccount, nuovapass: mod!='new' ? nuovapass : null, modpass:modPass}).then((element) => {
              if (element.isError) {
                setError(element.messageError);
              } else {
                setMsgConferma(true);
                setModPass(false)
              }
            });
          }
        }
      }
    }
  };

  return (
    <div className="detailsPage">
        {/*utentiriconferma pass--ok
        se superuser pou cambiare pass anche di altri...
        mod solo pass
        direi... da account modifica proprio quindi ok
        da lista utenti in teoria cmq mod solo prorpio
        quindi da li mod superutente ma va a stessa pagina quindi serve ltra prop
        oppure posso sapere la prev route

  in account params senza id--
        <br></br>
        <br></br>*/}

{/*in res arriva anche pass hashata !!! nonononononon       ora dovrebbe essere ok*/}
      <h2
        className={darkMode ? "testolight" : "testodark"}
        style={{ width: "100%" }}
      >
        {mod==='me'? 'Modifica account' :
        (idOfAccount
          ? (`Modifica di  ${account.username}`)
          : "Aggiunta di un nuovo utente")}
      </h2>
      <div className=" text flex-column" style={{}}>
        <div className="row flex-wrap align-items-center pb-3">
          <div
            style={{ width: "49%" }}
            className={
              "col-sm-8 col-12 text-center pt-3 " +
              (darkMode ? "sfondo3" : "sfondo1")
            }
          >
            {/*immagine + dati */}
            <div className="m-2">
              {/*<h2 className={darkMode ? "testolight" : "testodark"}>account</h2>*/}
              <div className=" text flex-column" style={{}}>
                <div className="row flex-wrap align-items-center pb-3">
                  <div
                    style={
                      {
                        //maxHeight: "150px",
                      }
                    }
                    className={
                      "col-sm-3 col-12 text-center pt-3 "
                      //  (darkMode ? "sfondo3" : "sfondo1")
                    }
                  >

                      <i className="bi bi-person" style={{
                        width: "100%",
                        height: "100%",
                        maxHeight: "200px",
                        maxWidth: "200px",
                        borderRadius: 100,
                        fontSize: '2em',
                        alignSelf:'center'
                        }}></i>

                    {/*<img
                      style={{
                        width: "100%",
                        height: "100%",
                        maxHeight: "200px",
                        maxWidth: "200px",
                        borderRadius: 100,
                      }}
                      /*src={
                        account.img
                          ? require(`../../img/${account.img}`)
                          : require(`../../img/intero.png`)
                      }*//*
                      alt="user placeholder"
                    ></img>*/}
                  </div>
                  <div
                    style={{ width: "49%" }}
                    className={
                      "col-sm-9 col-12 align-self-start text-center " +
                      (darkMode
                        ? "testolight sfondocard1"
                        : "testodark sfondocard3")
                    }
                  >
                    <div style={{ textAlign: "left" }}>
                      {/*<div className="form-group row mt-3">
                        <label
                          htmlFor="idproduct"
                          className="col-md-3 col-form-label"
                        >
                          Id*
                        </label>
                        <div className="col-md-9">
                          <input
                            type="text"
                            disabled={true}
                            className={
                              true
                                ? "w-100" // "form-control-plaintext toglie sfondo ma responsive"
                                : "form-control"
                            }
                            id="idproduct"
                            value={account.id_product}
                          />
                        </div>
                          </div>*/}


                      <div className="form-group row pt-3">
                        <label
                          htmlFor="descrizioneproduct"
                          className="col-md-4 col-form-label"
                        >
                          Username*
                        </label>
                        <div className="col-md-8">
                          <input
                            type="text"
                            disabled={params.id ? params.id : (!isOnModify && mod!='new')}
                            className={
                              /*!isOnModify*/ (params.id ? params.id : (!isOnModify && mod!='new'))
                                ? "w-100" // "form-control-plaintext toglie sfondo ma responsive"
                                : "form-control"
                            }
                            id="descrizioneproduct"
                            value={account.username}
                            onChange={(el) => {
                                setAccount({
                                ...account,
                                username: el.target.value,
                              });
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  {/*riga sotto img */}
                  <div
                    style={{ textAlign: "left" }}
                    className={
                      " p-3 col-12 " +
                      (darkMode
                        ? "testolight sfondocard1"
                        : "testodark sfondocard3")
                    }
                  >
                    <div className="form-group row">
                    <label
                        htmlFor="cittaproduct"
                        className="col-md-3 col-form-label"
                      >
                        {'Password'+ (params.id ? ' del superutente' : '')+'*'}
                      </label>
                      <div className="col-md-9">
                        <input
                          type="text"
                          disabled={!isOnModify}
                          className={
                            !isOnModify
                              ? "w-100" // "form-control-plaintext toglie sfondo ma responsive"
                              : "form-control"
                          }
                          id="cittaproduct"
                          value={password}
                          onChange={(el) => {
                            setPassword(el.target.value);
                          }}
                        />
                      </div>
                      
                    </div>
                    {modPass && <div className="form-group row">
                      <label
                        htmlFor="cittaproduct"
                        className="col-md-5 col-form-label"
                      >
                        Nuova password*
                      </label>
                      <div className="col-md-7">
                        <input
                          type="text"
                          disabled={mod==='new' || !modPass}
                          className={
                            mod==='new' || !modPass
                              ? "w-100" // "form-control-plaintext toglie sfondo ma responsive"
                              : "form-control"
                          }
                          id="cittaproduct"
                          value={nuovapass}
                          onChange={(el) => {
                            setNuovapass(el.target.value);
                            //console.log(el.target.value)
                          }}
                        />
                      </div>
                    </div>}
                    {isOnModify && mod!=='new' && <div className=" row">
                        <button className={
                            " col-12 text-center sfondo2 " +
                            (darkMode ? "testolight" : "testodark")}
                          onClick={()=>setModPass(true)}
                        >
                            cambia password
                        </button>

                    </div>}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            style={{ width: "49%" }}
            className={
              "col-sm-4 col-12 text-center sfondo2 " +
              (darkMode ? "testolight" : "testodark")
            }
          >
            {!isOnModify && (
              <button
                type="button"
                className={
                  "btn btn-outline-success mt-3 " +
                  (darkMode ? "nav2button" : "nav2buttonl")
                }
                onClick={modifyInfo}
              >
                <i className="bi bi-pencil"></i>
                {" modifica"}
              </button>
            )}
            {!!isOnModify && (
              <button
                type="button"
                disabled={error}
                className={
                  "btn btn-outline-success mt-3 " +
                  (darkMode ? "nav2button" : "nav2buttonl")
                }
                onClick={confirmSave}
              >
                <i className="bi bi-check"></i>
                {" salva"}
              </button>
            )}

            {error && isOnModify && (
              <div style={{ textAlign: "left" }}>
                <p className="alert alert-danger mt-3">
                  <b>Errore!</b>
                  <br></br>
                  <span>{error}</span>
                </p>
              </div>
            )}

            {msgConferma && (
              <div style={{ textAlign: "left" }}>
                <p className="alert alert-success mt-3">
                  <b>Creato!</b>
                  <br></br>
                  <span>
                    L'utente è stato{" "}
                    {mod === "new" ? "creato" : "modificato"} con successo!
                  </span>
                </p>
              </div>
            )}

            <p>
              <button
                disabled={!isOnModify}
                type="button"
                onClick={() =>{
                  setAccount({
                    ...account,
                    username:''
                  })
                  setPassword('')
                }
                }
                className={
                  "btn btn-outline-success mr-1 " +
                  (darkMode ? "nav2buttonl" : "nav2button")
                }
              >
                <i className="bi bi-trash3"></i>
              </button>
              <button
                disabled={!isOnModify}
                type="button"
                onClick={() => {
                    setAccount(accountorig);
                    setPassword('')
                }}
                className={
                  "btn btn-outline-success ml-1 " +
                  (darkMode ? "nav2buttonl" : "nav2button")
                }
              >
                <i className="bi bi-arrow-clockwise"></i>
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}


export { Account };
