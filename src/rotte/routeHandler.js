import { Navigate, Route, Routes } from "react-router-dom";
import { HomePage } from "../pagine/homePage";
//import { ContactForm } from "../pagine/ContactForm";
import { ListaProdotti } from "../pagine/listaProdotti";
import { ListaSCarico } from "../pagine/listaSCarico";
import { SCarico } from "../pagine/carico";
import { Scarico } from "../pagine/scarico";
import { ProductNewModPage } from '../pagine/dettaglioProdottov2'
//import { TowersMap } from "../pagine/towersMap";
//import { About } from "../pagine/about";
//import { CartPage } from "../pagine/cartPage";
//import { LoginPage } from "../pagine/loginPage";
import { Error404 } from "../pagine/error404";
//import { AccountPage } from "../pagine/accountPage";
//import { TestingPage } from "../pagine/testingPage";
import { ProtectedRoute } from "./protectedRoute";
import { Altro } from "../pagine/altro";
import { NoCategorie } from "../pagine/noCategorie.js";
import { Categorie } from "../pagine/categorie.js";
import { Account } from "../pagine/account";
import { Utenti } from "../pagine/utenti";
import { Login } from "../pagine/login";
import { Operazioni } from "../pagine/operazioni";
import { useEffect, useState } from "react";
//import { OrdersPage } from "../pagine/ordersPage";
import { ImgUploader } from "../componenti/imgUploader";
import { TestPage } from "../pagine/testPage";
import { ReportTot } from "../pagine/reportTot";

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

const base = process.env.REACT_APP_SITE_URL


  return (
    <Routes>
      <Route index element={<HomePage setSelezionato={setSelezionato} />} />
      <Route path={base+"/home"} element={
        <ProtectedRoute>
          <Navigate replace to="/" />
        </ProtectedRoute>
      } />
      <Route path={base+"/magazzino"} element={ 
        <ProtectedRoute>
          <ListaProdotti />
        </ProtectedRoute>
      } />
      <Route path={base+"/listacarico"} element={
        <ProtectedRoute>
          <ListaSCarico mode={'carico'} />
        </ProtectedRoute>
      } />
      <Route path={base+"/listascarico"} element={
        <ProtectedRoute>
          <ListaSCarico mode={'scarico'} />
        </ProtectedRoute>
      } />
      
      {/** andranno annidate in lista..? */}
      <Route path={base+"/carico"} element={
        <ProtectedRoute>
          <SCarico mode={'carico'} />
        </ProtectedRoute>
      } />
      <Route path={base+"/scarico"} element={
        <ProtectedRoute>
          <SCarico mode={'scarico'} />
        </ProtectedRoute>
      } />
      <Route path={base+"/operazioni"} element={
        <ProtectedRoute>
          <Operazioni />
        </ProtectedRoute>
      } />

      <Route path={base+"/altro"} element={
        <ProtectedRoute>
          <Altro />
        </ProtectedRoute>
      } />
      <Route path={base+"/altro/nomi"} element={
        <ProtectedRoute>
          <NoCategorie type={'nomi'} />
        </ProtectedRoute>
      } />
      <Route path={base+"/altro/materiali"} element={
        <ProtectedRoute>
          <NoCategorie type={'materiali'} />
        </ProtectedRoute>
      } />
      <Route path={base+"/altro/misure"} element={
        <ProtectedRoute>
          <NoCategorie type={'misure'} />
        </ProtectedRoute>
      
      } />
      <Route path={base+"/altro/colori"} element={
        <ProtectedRoute>
          <NoCategorie type={'colori'} />
        </ProtectedRoute>
      } />
      <Route path={base+"/altro/categorie"} element={
        <ProtectedRoute>
          <Categorie type={'categorie'} />
        </ProtectedRoute>
      } />
      <Route path={base+"/altro/immagini"} element={
        <ProtectedRoute>
          <ImgUploader />
        </ProtectedRoute>
      } />

      <Route
          path={base+"utenti"}
          element={
          <ProtectedRoute>
            <Utenti/>
          </ProtectedRoute>
          }
        />

      <Route path={base+"/login"} element={<Login />} />

      {/*<Route path="/utenti" element={<CartPage />} />*/}

      <Route path={base+"/*"} element={<Error404 />} />

      <Route path={base+"magazzino"}>
            {/*<ProtectedRoute ruoli={["ufficio", "admin", "magazzino"]}>*/}
            {/*</ProtectedRoute>*/}

        <Route
          path="new"
          element={
          <ProtectedRoute>
              <ProductNewModPage mod={"new"} />
          </ProtectedRoute>
          
          }
        />
        {/*<ProtectedRoute ruoli={["ufficio", "admin", "magazzino"]}>
        <ProductNewModPage mod={"detail"} />
            </ProtectedRoute>*/}
        <Route
          path="dettagli/:id"
          element={
          <ProtectedRoute>
            <ProductNewModPage mod={"detail"} />
          </ProtectedRoute>
          }
        />
      </Route>

      <Route path={base+"account"}>
            {/*<ProtectedRoute ruoli={["ufficio", "admin", "magazzino"]}>*/}
            {/*</ProtectedRoute>*/}
            
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
        {/*<ProtectedRoute ruoli={["ufficio", "admin", "magazzino"]}>
        <ProductNewModPage mod={"detail"} />
            </ProtectedRoute>*/}
        <Route
          path="dettagli/:id"
          element={
          <ProtectedRoute>
            <Account mod={"detail"} />
          </ProtectedRoute>  
          }
        />
      </Route>
      {/*<Route path="/tab" element={<ReportTot />} />*/}

      {/*<Route
        path="/account"
        element={
          <ProtectedRoute>
            <AccountPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/orders"
        element={
          <ProtectedRoute>
            <OrdersPage />
          </ProtectedRoute>
        }
      />*/}
      {/*<Route path="/testing" element={<TestPage />} />*/}

      {/*testingppage */}
    </Routes>
  );
}

export { RouterHandler };