import { DarkModeContext } from "../tema/DarkModeContext";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { sendImage } from "../api/indexApi";

const ImgUploader = ({/*msg*/}) => {
  const { darkMode } = useContext(DarkModeContext);
  const navigate = useNavigate();
  const [srcimg, setSrcimg] = useState('');
  const [folder, setFolder] = useState('');
  const [filename, setFilename] = useState('');
  const [error, setError] = useState(null);
  const [first, setFirst] = useState(false);

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

            {error && first && (
              <div style={{ textAlign: "left", width:'80%' }}>
                <p className="alert alert-danger mt-3">
                  <b>Errore!</b>
                  <br></br>
                  <span>{error}</span>
                </p>
              </div>
            )} {/*mh non chiarissimo--- */}
            {/*<i className="bi bi-exclamation-diamond-fill"></i>*/}
            {/*<i className="bi bi-radioactive"></i>*/}
            <div className={(darkMode ? ' sfondocard1' : 'sfondocard2')} >
            <i className="bi bi-lightbulb" style={{color: !darkMode ? 'lightblue' : 'cornflowerblue'}}></i>
            {' '}Nomina l'immagine come {!folder ? ' la caratteristca ' : (folder=='colori' ? ' il colore ' : (folder=='materiali' ? ' il materiale ' : (folder=='nomi' ? ' il nome ' : ' la categoria' ) ) )} a cui la vuoi associare{' '}
            <i className="bi bi-lightbulb" style={{color: !darkMode ? 'lightblue' : 'cornflowerblue'}}></i>

            </div>
        <div style={{width:'100%'}}>
          <p  className='m-2'>Dai un nome all'immagine <small>(senza estensione)</small></p>
          <div className="col-8 col-md-6 mx-auto">
          <input
                  type="text"
                  className={
                    "form-control "
                    }
                  id="idproduct"
                  value={filename}
                  onFocus={()=>{setFirst(true)}}
                  onChange={(el) => {
                    const newname = el.target.value.replace(/[^\w\s]/gi, ''); // Regex to remove special characters
                    setFilename(newname);
                  }}
                  placeholder={filename ? 'inserisci nome ' +filename : ''}
                />
          </div>
        </div>


      <div style={{width:'100%'}}>
                <p  className='m-2'>Scegli la cartella in cui caricare l'immagine</p>
                <select
                  className="custom-select col-8 col-md-6 mx-auto my-auto"
                  onFocus={()=>{setFirst(true)}}
                  onChange={(el) => {
                    setFolder(el.target.value);
                  }}
                >
                  <option value={""}>Seleziona un'opzione</option>
                  <option value={"colori"}>colori</option>
                  <option value={"materiali"}>materiali</option>
                  <option value={"nomi"}>nomi</option>
                  <option value={"categorie"}>categorie</option>
                </select>
            </div>
            
            <small className="mt-2">(accetta al massimo 50mb)</small>
            <div className="input-group m-2" style={{borderRadius:'5px', backgroundColor:'#d4edda'}}>
                <input id="upload" type="file" accept="image/png, image/jpg, image/jpeg" 
                  onFocus={()=>{setFirst(true)}}
                  onChange={(el) => {
                    leggiimg(el);
                  }} className="form-control"/>
                <label id="upload-label" htmlFor="upload" className="font-weight-light text-muted">{srcimg ? 'Immagine scelta' : 'Scegli immagine'}</label>
                <div className="input-group-append">
                    <label htmlFor="upload" className="btn btn-light rounded-pill px-4 my-1 mr-2"> 
                        <i className="bi bi-cloud-arrow-up-fill mr-2 text-muted"></i>
                        <small className="text-uppercase font-weight-bold text-muted">Scegli file{/*immagine*/}</small>
                    </label>
                </div>
            </div>

            <button
              type="button"
              className={
                "btn btn-outline-success " +
                (!darkMode ? "nav2button" : "nav2buttonl")
              }
              disabled={error}//va bene?
              onClick={() => {
                invia()
              }}
            >
              invia <i className="bi bi-send"></i>
            </button>

            <div style={{width:'100%'}}>
              <p className="font-italic text-center">L'immagine caricata sarà visualizzata sotto.</p>
              {srcimg && srcimg!='' && <div className="image-area mt-4"><img id="imageResult" src={srcimg} alt="" className="img-fluid rounded shadow-sm mx-auto d-block"/></div>}
            </div>


        </div>



    </div>
  );
  
};

export { ImgUploader };