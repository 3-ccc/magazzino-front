import { useNavigate } from "react-router-dom";
import { DarkModeContext } from "../tema/DarkModeContext";
import { useContext, useEffect, useState } from "react";
import { useWindowDimensions } from "../altro/windowDimensions";
import './componenti.css'


function CardMiniElement({ elem, i, resetn, funz }) {
  const { darkMode } = useContext(DarkModeContext);
  const navigate = useNavigate();
  const [isOnModify, setIsOnModify] = useState(i==-1 ? true : false);
  const [isOk, setIsOk] = useState(i==-1 ? false : true);
  const { wi } = useWindowDimensions();
  const [nome, setNome] = useState(elem.nome);
  const [pop, setPop] = useState(true);


  useEffect(()=>{
    var toastfarcitov = [].slice.call(document.querySelectorAll(".popover"));     
    toastfarcitov.map((t)=>{
      document.getElementById(t.id).remove()
    })
    var toastfarcito = [].slice.call(document.querySelectorAll('[data-toggle="popover"]'));
    toastfarcito.map((t)=>{
      new window.bootstrap.Popover(t/*,options */);
    })
  },[isOnModify])

useEffect(() => {
  if(nome!='' && nome.trimEnd().trimStart()!=''){
    setIsOk(true)
  }else{
    setIsOk(false)
  }
}, [nome]);

useEffect(() => {
  if(!pop){

  var toastfarcitov = [].slice.call(document.querySelectorAll(".popover"));     
    toastfarcitov.map((t)=>{
      document.getElementById(t.id).remove()
    })
    var toastfarcito = [].slice.call(document.querySelectorAll('[data-toggle="popover"]'));
    toastfarcito.map((t)=>{
      new window.bootstrap.Popover(t/*,options */);
    })
  setIsOnModify(false)

//chiama funz farà o crea o mod

//console.log(elem)
  if(i==-1){
    resetn(false)
    elem.nome=nome
    funz(elem)
  }else{
    elem.nome=nome
    funz(elem)
  }

  }
}, [pop]);

//console.log(i)
  return (
      <div
          className={
            " p-2 row m-1 " + (darkMode ? "sfondo2" : "sfondo2")
          }
          style={{
            //color: darkMode ? "#8c0101" : "#212a3e",
            width: wi > 767 ? "70%" : "90%",
          }}
          key={i}
        >
          <div className="col-8">
          <input
                  type="text"
                  disabled={!isOnModify}
                  className={
                    (isOnModify
                      ? "w-100 form-control testolight " // "form-control-plaintext toglie sfondo ma responsive"
                      : "form-control-plaintext " +(darkMode ? " testodark " : " testolight "))
                  +(isOk ? '' : 'is-invalid')
                    }
                  id="idproduct"
                  value={nome}
                  onChange={(el) => {
                    setNome(el.target.value);
                  }}
                />
          </div>
          <div className="col-4">
            {!isOnModify && <button
              type="button"
              className={
                "btn btn-outline-success " +
                (!darkMode ? "nav2button" : "nav2buttonl")
              }
              data-toggle="popover"
              data-placement="top"
              data-content="modifica"
              data-trigger="hover"
              onClick={() => setIsOnModify(true)}
            >
              <i className="bi bi-pencil"></i>
            </button>}
            {isOnModify && <button
              type="button"
              className={
                "btn btn-outline-success " +
                (!darkMode ? "nav2button" : "nav2buttonl")
              }
              disabled={!isOk}
              data-toggle="popover"
              data-placement="top"
              data-content="salva"
              data-trigger="hover"
              onClick={() => {
                //chiamate-> if -1 nuovo altrim mod
                //poi se -1 e tutto okrichiama +set di la false
                setPop(!pop)

              }}
            >
              {/*vedi sumeglio falro di la?
            cmq poi se insieme distinte anche cìchiamate --sono 2 new-mod per ogni qindi *4
            piu il retrieve dopo quindi +4 fanno 12 chiamate da gestire insieme-----mhh */}
              <i className="bi bi-check"></i>
            </button>}
          </div>
        </div>
  );
}

export default CardMiniElement;
