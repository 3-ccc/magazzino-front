import { Navigate, Route, Routes } from "react-router-dom";
import { HomePage } from "../pagine/homePage";
import { ListaProdotti } from "../pagine/listaProdotti";
import { ListaProdottiinatt } from "../pagine/listaProdottiinatt";
import { ListaSCarico } from "../pagine/listaSCarico";
import { SCarico } from "../pagine/carico";
//import { Scarico } from "../pagine/scarico";
import { ProductNewModPage } from '../pagine/dettaglioProdottov2'
import { Error404 } from "../pagine/error404";
//import { TestingPage } from "../pagine/testingPage";
import { ProtectedRoute } from "./protectedRoute";
import { Altro } from "../pagine/altro";
import { NoCategorie } from "../pagine/noCategorie.js";
import { Categorie } from "../pagine/categorie.js";
import { Account } from "../pagine/account";
import { Utenti } from "../pagine/utenti";
import { Login } from "../pagine/login";
import { Operazioni } from "../pagine/operazioni";
//import { useEffect, useState } from "react";
//import { OrdersPage } from "../pagine/ordersPage";
import { ImgUploader } from "../componenti/imgUploader";
import { TestPage } from "../pagine/testPage";
import { ReportTot } from "../pagine/reportTot";
import { Grafici } from "../pagine/grafici";

function RouterHandler({ setSelezionato }) {
  //aggiungere qui anche i messaggi   -> 1 per tutti
  //si puo?   messaggi ok possono esserci acnhe senza login ma nav no...
  //vanno in ogni singola pagina... mmmmmh
  /*const [msg, setMsg] = useState({
    stile:'',//?
    mess:''
  });*/
  /**
   * andrebbe come darkteme
   */

  //ricordarsi colorare pulsanti da route?




  return (
    <Routes>
      <Route index element={<HomePage setSelezionato={setSelezionato} />} />
      <Route path="/home" element={
        <ProtectedRoute>
          <Navigate replace to="/" />
        </ProtectedRoute>
      } />
      <Route path="/magazzino" element={ 
        <ProtectedRoute>
          <ListaProdotti />
        </ProtectedRoute>
      } />
      <Route path="/listacarico" element={
        <ProtectedRoute>
          <ListaSCarico mode={'carico'} />
        </ProtectedRoute>
      } />
      <Route path="/listascarico" element={
        <ProtectedRoute>
          <ListaSCarico mode={'scarico'} />
        </ProtectedRoute>
      } />
      
      <Route path="/carico" element={
        <ProtectedRoute>
          <SCarico mode={'carico'} />
        </ProtectedRoute>
      } />
      <Route path="/scarico" element={
        <ProtectedRoute>
          <SCarico mode={'scarico'} />
        </ProtectedRoute>
      } />
      <Route path="/operazioni" element={
        <ProtectedRoute>
          <Operazioni />
        </ProtectedRoute>
      } />

      <Route path="/altro" element={
        <ProtectedRoute>
          <Altro />
        </ProtectedRoute>
      } />
      <Route path="/altro/nomi" element={
        <ProtectedRoute>
          <NoCategorie type={'nomi'} />
        </ProtectedRoute>
      } />
      <Route path="/altro/materiali" element={
        <ProtectedRoute>
          <NoCategorie type={'materiali'} />
        </ProtectedRoute>
      } />
      <Route path="/altro/misure" element={
        <ProtectedRoute>
          <NoCategorie type={'misure'} />
        </ProtectedRoute>
      
      } />
      <Route path="/altro/colori" element={
        <ProtectedRoute>
          <NoCategorie type={'colori'} />
        </ProtectedRoute>
      } />
      <Route path="/altro/categorie" element={
        <ProtectedRoute>
          <Categorie type={'categorie'} />
        </ProtectedRoute>
      } />
      <Route path="/altro/immagini" element={
        <ProtectedRoute>
          <ImgUploader />
        </ProtectedRoute>
      } />
      <Route path="/altro/inattivi" element={
        <ProtectedRoute>
          <ListaProdottiinatt />
        </ProtectedRoute>
      } />

      <Route
          path="utenti"
          element={
          <ProtectedRoute>
            <Utenti/>
          </ProtectedRoute>
          }
        />

      <Route path="/login" element={<Login />} />


      <Route path="/*" element={<Error404 />} />

      <Route path="magazzino">

        <Route
          path="new"
          element={
          <ProtectedRoute>
              <ProductNewModPage mod={"new"} />
          </ProtectedRoute>
          
          }
        />

        <Route
          path="dettagli/:id"
          element={
          <ProtectedRoute>
            <ProductNewModPage mod={"detail"} />
          </ProtectedRoute>
          }
        />
      </Route>

      <Route path="account">

        <Route
          path=""
          element={
          <ProtectedRoute>
              <Account mod={"me"} />
          </ProtectedRoute>
          }
        />

        <Route
          path="new"
          element={
          <ProtectedRoute>
              <Account mod={"new"} />
          </ProtectedRoute>
          }
        />
        <Route
          path="dettagli/:id"
          element={
          <ProtectedRoute>
            <Account mod={"detail"} />
          </ProtectedRoute>  
          }
        />
      </Route>
      <Route path="/tab" 
      element={
        <ProtectedRoute>
            <ReportTot />
        </ProtectedRoute> 
      } />
      <Route path="/graf" 
      element={
        <ProtectedRoute>
            <Grafici />
        </ProtectedRoute> 
      } />
      {/*<Route
        path="/account"
        element={
          <ProtectedRoute>
            <AccountPage />
          </ProtectedRoute>
        }
      />*/}
      {<Route path="/testing" element={<TestPage />} />}

      {/*testingppage */}
    </Routes>
  );
}

export { RouterHandler };