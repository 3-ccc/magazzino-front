import { DarkModeContext } from "../tema/DarkModeContext";
import { useContext, useEffect, useState } from "react";
import CardMiniProdotto from "../componenti/cardMiniProdotto";
import { useNavigate } from "react-router-dom";
import { useWindowDimensions } from "../altro/windowDimensions.js";
import { sendImage } from "../api/indexApi";
import logo from '../img/logo.png'

const TestPage = () => {
  const { darkMode } = useContext(DarkModeContext);
  const navigate = useNavigate();
  const [srcimg, setSrcimg] = useState('');
  const [folder, setFolder] = useState('');
  const [filename, setFilename] = useState('');
  const [error, setError] = useState(null);
  const [first, setFirst] = useState(false);


  /*useEffect(()=>{
    var toastfarcitov = [].slice.call(document.querySelectorAll(".popover"));     
      toastfarcitov.map((t)=>{
        document.getElementById(t.id).remove()
      })
    var toastfarcito = [].slice.call(document.querySelectorAll('[data-toggle="popover"]'));
    toastfarcito.map((t)=>{
      new window.bootstrap.Popover(t/*,options *//*);
    })
  },[])*/

  useEffect(() => {
    setError(null);
    /*if(!first){
      setFirst(true)  //non va cmq-- render 4 volte :'c
    }*/

    if (!srcimg || srcimg=='') {
      setError("Inserire immagine");
    }

    if (!folder || folder=='') {
      setError("Selezionare cartella");
    }

    if (!filename || filename.trimEnd().trimStart()=='') {
      setError("Inserire nome");
    }
//console.log(srcimg)
//console.log(logo)
  }, [srcimg, filename, folder]);

  //poi sara onclick
const invia=()=>{
    if(srcimg && srcimg!='' && filename && filename.trimEnd().trimStart()!='' && folder){
    //console.log(srcimg)
    

//trim nome prima di inviare


//sara da fare chiamata
sendImage(srcimg, folder, filename.trimEnd().trimStart()
  ).then((element) => {
    if (!element.isError) {
//toollarge
//++inizio non caricare-- controlla

      //setElements(element.data.utenti);
//mssaggio ok

    } else {
        //messaggio errore
      console.error("errore");
    }
  });

    }
  }

  const leggiimg=(value)=>{
    if(value.target.files && value.target.files[0]){
    const immagine= value.target.files[0]

        var reader = new FileReader();
        //console.log(immagine)
        reader.readAsDataURL(immagine);
        reader.onload = function(e) {
            setSrcimg(reader.result)
        };
        //console.log(reader.result)
        //console.log(reader)
    }
    //console.log(value.target.files)
  }

  return (
    <div style={{ height:'100%'}}>
        <div className="d-flex flex-wrap m-2" style={{ alignContent:'center', justifyContent:'center'}}>


        

//in realta mi serve soloid oppure salva gia cosi---
        {<img src={'https://drive.google.com/uc?export=view&id=1BctzF4qpxBL1Uy-ykRwfgiIwMT49nE2H'} alt="" className=""/>}


        </div>



    </div>
  );
};

export { TestPage };

/*

*/