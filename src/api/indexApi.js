import { emptyStore, tokenStore } from "../store/tokenStore.js";
import axios from "./axios.js";
import { store } from "../store/store.js";
import FormData from 'form-data';
import { formToJSON } from "axios";

//rivedere
function retrieveErrors(statusCode, data) {
  var isError = false;
  var messageError = null;

//da sistemare
//se c'è anch emessaggio inviato da back magari utilizza?
//tipo in 400

  switch (statusCode) {
    case 200:
      //request ok
      break;
    case 201:
      //created element
      break;

    case 400:
      //Bad Request
      isError = true;
      messageError =
        "Richiesta non valida.";
      break;

    case 401:
      //Unauthorized Access
      isError = true;
      messageError = "Username o Password errati, o l'utente non è autorizzato all'accesso.";
      emptyStore();
      break;

    case 403:
      //forbidden
      isError = true;
      messageError =
        "Azione non consentita.";
      break;

    case 404:
      isError = true;
      messageError =//
        "Gli elementi ricercati non sono stati trovati.\nRiprova!";
      break;

      case 418: //teapot
        isError = true;
        messageError = "Azione non eseguita o non andata a buon fine.";
        break;

      case 423: //locked
      isError = true;
      messageError = "Utente non modificabile";
      break;

    case 500:
      isError = true;
      messageError = "Errore del Server.\nRiprova!";
      break;

    default:
      isError = true;
      messageError =
        "Errore sconosciuto.\nContattare l'assistenza e fornire il seguente codice.\n" +
        statusCode;
      break;
  }

  return {
    isError: isError,
    messageError: messageError,
    status: statusCode,
    data: data,
  };
}

/**
 * _______________________________________________ *
 * 
 * Login
 * _______________________________________________ *
 */

function requireTokenAuth() {     //giusto?
  const access =
    "Bearer " + store.getState(tokenStore).tokenStore.token;
  return access;
}

const postLogin = async (username, password) => {
  const base64encodedData = btoa(`${username}:${password}`);

  try {
    const response = await axios.post("/login", undefined, {
      headers: {
        Authorization: "Basic " + base64encodedData,
      },
    });

    return retrieveErrors(response.status, response.data);
  } catch (e) {
    return retrieveErrors(e.status, e.data);
  }
};

/**
 * _______________________________________________ *
 * 
 * utenti
 * _______________________________________________ *
 */

async function getUsers() {
  try {
    //users
    const response = await axios.get("/users", {
      headers: {
        Authorization: requireTokenAuth(),
      },
    });

    return retrieveErrors(response.status, response.data);
  } catch (e) {
    return retrieveErrors(e.status, e.data);
  }
}

async function getUsersfsp(fsp) {
  try {
    //users
    const response = await axios.put("/users/fsp", {
      fsp
    },
    {
      headers: { Authorization: requireTokenAuth() },
    });

    return retrieveErrors(response.status, response.data);
  } catch (e) {
    console.log(e)
    return retrieveErrors(e.status, e.data);
  }
}

async function getSingleUser(idUser) {
  try {
    const response = await axios.get(
      "/users/id/" + idUser,
      {
        headers: { Authorization: requireTokenAuth() },
      }
    );

    return retrieveErrors(response.status, response.data);
  } catch (e) {
    return retrieveErrors(e.status, e.data);
  }
}

//create
//modify    put 
async function modifyUser(user) {
  //console.log(user)

  try {
    //console.log(user);
    const response = await axios.put(
      //non funziona e non va bene!!!
      "/users/id/" + user.id,
      {
        //id: user.id,
        username: user.username,
        password: user.password,
        nuovapassword: user.nuovapass,
        modpass:user.modpass,
      },
      {
        headers: { Authorization: requireTokenAuth() },
      }
    );

    return retrieveErrors(response.status, response.data);
  } catch (e) {
    //console.log(e);
    return retrieveErrors(e.status, e.data);
  }
}

//modify super
async function modifyUserSuper(user) {
  try {
    //console.log(user);
    const response = await axios.put(
      //non funziona e non va bene!!!
      "/users/idsuper/" + user.idsuper,//di supepr
      {
        id: user.id,//?
        //username: user.username,
        password: user.password,
        nuovapassword: user.nuovapass,
      },
      {
        headers: { Authorization: requireTokenAuth() },
      }
    );

    return retrieveErrors(response.status, response.data);
  } catch (e) {
    //console.log(e);
    return retrieveErrors(e.status, e.data);
  }
}

async function createUser(user) {
  try {
    const response = await axios.post(
      "/users",
      {
        username: user.username,
        password: user.password,
      },
      {
        headers: { Authorization: requireTokenAuth() },
      }
    );

    return retrieveErrors(response.status, response.data);
  } catch (e) {
    //console.log(e);
    return retrieveErrors(e.status, e.data);
  }
}

/*async function deleteUser(idUser) {
  try {
    const response = await axios.delete(
      "/backOfficeLogin/deleteUser/" + idUser,
      {
        headers: {
          Authorization: requireTokenAuth(),
        },
      }
    );

    return retrieveErrors(response.status, response.data);
  } catch (e) {
    return retrieveErrors(e.response.status, e.response.data.result);
  }
}*/

/**
 * _______________________________________________ *
 * 
 * prodottti
 * _______________________________________________ *
 */

async function getAllProducts() {
  try {
    const response = await axios.get("/prodotti");

    return retrieveErrors(response.status, response.data);
  } catch (e) {
    return retrieveErrors(e.status, e.data);
  }
}

async function getProductsfsp(fsp) {
  try {
    //prodotti
    const response = await axios.put("/prodotti/fsp", {
      fsp
    },
    {
      headers: { Authorization: requireTokenAuth() },
    });
//console.log(response)
    return retrieveErrors(response.status, response.data);
  } catch (e) {
//console.log(e)
//sara sempre errore di axios no...
//code

//data status
    return retrieveErrors(e.status, e.data);
  }
}

async function getSingleProduct(id) {
  try {
    const response = await axios.get("/prodotti/" + id,
    {
      headers: { Authorization: requireTokenAuth() },
    });

    //console.log({ response });
    return retrieveErrors(response.status, response.data);
  } catch (e) {
    return retrieveErrors(e.status, e.data);
  }
}

async function getProductpop(id) {
  try {
    const response = await axios.get("/prodotti/pop/" + id,
    {
      headers: { Authorization: requireTokenAuth() },
    });

    //console.log({ response });
    return retrieveErrors(response.status, response.data);
  } catch (e) {
    return retrieveErrors(e.status, e.data);
  }
}

/*async function deleteProduct(id) {
  try {
    const response = await axios.delete("/product/delete/" + id, {
      headers: { Authorization: requireTokenAuth() },
    });

    return retrieveErrors(response.status, response.data);
  } catch (e) {
    return retrieveErrors(e.response.status, e.response.data.result);
  }
}*/

async function createProduct(product) {
  //console.log({ product });
  try {
    const response = await axios.post(
      "/prodotti",
      {//manca qualcosa?
        nome: product.nome!='' ? product.nome : null,
        categoria: product.categoria!='' ? product.categoria : null,
        sottocategoria: product.sottocategoria!='' ? product.sottocategoria : null,
        materiale: product.materiale!='' ? product.materiale : null,
        misura: product.misura!='' ? product.misura : null,
        colore: product.colore!='' ? product.colore : null,
        quantita: product.quantita,
        limitescorta: product.limitescorta,
      },
      {
        headers: { Authorization: requireTokenAuth() },
      }
    );

    return retrieveErrors(response.status, response.data);
  } catch (e) {
    return retrieveErrors(e.status, e.data);
  }
}

async function modifyProduct(product) {
  try {
    const response = await axios.put(
      "/prodotti/" + product._id,
      {
        nome: product.nome,
        categoria: product.categoria,
        sottocategoria: product.sottocategoria,
        materiale: product.materiale,
        misura: product.misura,
        colore: product.colore,
        quantita: product.quantita,
        limitescorta: product.limitescorta,
      },
      {
        headers: { Authorization: requireTokenAuth() },
      }
    );

    return retrieveErrors(response.status, response.data);
  } catch (e) {
    //console.log(e);
    return retrieveErrors(e.status, e.data);
  }
}

/**
 * _______________________________________________ *
 * 
 * nocat
 * _______________________________________________ *
 */

async function getElements(tipo) {
  try {
    const response = await axios.get("/"+tipo, {
      headers: {
        Authorization: requireTokenAuth(),
      },
    });

    return retrieveErrors(response.status, response.data);
  } catch (e) {
    return retrieveErrors(e.status, e.data);
  }
}
//prova insieme
async function getElementsfsp(fsp, tipo) {
  //se non c'è tipo annulla ...
  try {
    const response = await axios.put("/"+tipo+"/fsp", {
      fsp
    },
    {
      headers: { Authorization: requireTokenAuth() },
    });

    return retrieveErrors(response.status, response.data);
  } catch (e) {
    return retrieveErrors(e.status, e.data);
  }
}

async function createElement(m, tipo) {
  //console.log({ product });
  try {
    const response = await axios.post(
      "/"+tipo,
      {//manca qualcosa?
        nome: m.nome,
      },
      {
        headers: { Authorization: requireTokenAuth() },
      }
    );

    return retrieveErrors(response.status, response.data);
  } catch (e) {
    return retrieveErrors(e.status, e.data);
  }
}

async function modifyElement(m, tipo) {
  try {
    const response = await axios.put(
      "/"+tipo+"/" + m._id,
      {
        nome: m.nome,
      },
      {
        headers: { Authorization: requireTokenAuth() },
      }
    );

    return retrieveErrors(response.status, response.data);
  } catch (e) {
    //console.log(e);
    return retrieveErrors(e.status, e.data);
  }
}

/**
 * _______________________________________________ *
 * 
 * misure
 * _______________________________________________ *
 */
/*
async function getMeasures() {
  try {
    const response = await axios.get("/misure", {
      headers: {
        Authorization: requireTokenAuth(),
      },
    });

    return retrieveErrors(response.status, response.data);
  } catch (e) {
    return retrieveErrors(e.response.status, e.response.data);
  }
}

async function getMeasuresfsp(fsp) {
  try {
    const response = await axios.put("/misure/fsp", {
      fsp
    },
    {
      headers: { Authorization: requireTokenAuth() },
    });

    return retrieveErrors(response.status, response.data);
  } catch (e) {
    return retrieveErrors(e.response.status, e.response.data);
  }
}

async function createMeasure(m) {
  //console.log({ product });
  try {
    const response = await axios.post(
      "/misure",
      {//manca qualcosa?
        nome: m.nome,
      },
      {
        headers: { Authorization: requireTokenAuth() },
      }
    );

    return retrieveErrors(response.status, response.data);
  } catch (e) {
    return retrieveErrors(e.response.status, e.response.data.result);
  }
}

async function modifyMeasure(m) {
  try {
    const response = await axios.put(
      "/misure/" + m.id,
      {
        nome: m.nome,
      },
      {
        headers: { Authorization: requireTokenAuth() },
      }
    );

    return retrieveErrors(response.status, response.data);
  } catch (e) {
    //console.log(e);
    return retrieveErrors(e.response.status, e.response.data.result);
  }
}
*/
/**
 * _______________________________________________ *
 * 
 * nomi
 * _______________________________________________ *
 */
/*
async function getNames() {
  try {
    const response = await axios.get("/nomi", {
      headers: {
        Authorization: requireTokenAuth(),
      },
    });

    return retrieveErrors(response.status, response.data);
  } catch (e) {
    return retrieveErrors(e.response.status, e.response.data);
  }
}

async function getNamesfsp(fsp) {
  try {
    const response = await axios.put("/nomi/fsp", {
      fsp
    },
    {
      headers: { Authorization: requireTokenAuth() },
    });

    return retrieveErrors(response.status, response.data);
  } catch (e) {
    return retrieveErrors(e.response.status, e.response.data);
  }
}

async function createNames(m) {
  //console.log({ product });
  try {
    const response = await axios.post(
      "/nomi",
      {//manca qualcosa?
        nome: m.nome,
      },
      {
        headers: { Authorization: requireTokenAuth() },
      }
    );

    return retrieveErrors(response.status, response.data);
  } catch (e) {
    return retrieveErrors(e.response.status, e.response.data.result);
  }
}

async function modifyNames(n) {
  try {
    const response = await axios.put(
      "/nomi/" + n.id,
      {
        nome: n.nome,
      },
      {
        headers: { Authorization: requireTokenAuth() },
      }
    );

    return retrieveErrors(response.status, response.data);
  } catch (e) {
    //console.log(e);
    return retrieveErrors(e.response.status, e.response.data.result);
  }
}
*/
/**
 * _______________________________________________ *
 * 
 * colori
 * _______________________________________________ *
 */
/*
async function getColours() {
  try {
    const response = await axios.get("/colori", {
      headers: {
        Authorization: requireTokenAuth(),
      },
    });

    return retrieveErrors(response.status, response.data);
  } catch (e) {
    return retrieveErrors(e.response.status, e.response.data);
  }
}

async function getColoursfsp(fsp) {
  try {
    const response = await axios.put("/colori/fsp", {
      fsp
    },
    {
      headers: { Authorization: requireTokenAuth() },
    });

    return retrieveErrors(response.status, response.data);
  } catch (e) {
    return retrieveErrors(e.response.status, e.response.data);
  }
}

async function createColour(m) {
  //console.log({ product });
  try {
    const response = await axios.post(
      "/colori",
      {//manca qualcosa?
        nome: m.nome,
      },
      {
        headers: { Authorization: requireTokenAuth() },
      }
    );

    return retrieveErrors(response.status, response.data);
  } catch (e) {
    return retrieveErrors(e.response.status, e.response.data.result);
  }
}

async function modifyColour(c) {
  try {
    const response = await axios.put(
      "/colori/" + c.id,
      {
        nome: c.nome,
      },
      {
        headers: { Authorization: requireTokenAuth() },
      }
    );

    return retrieveErrors(response.status, response.data);
  } catch (e) {
    //console.log(e);
    return retrieveErrors(e.response.status, e.response.data.result);
  }
}
*/
/**
 * _______________________________________________ *
 * 
 * categorie
 * _______________________________________________ *
 */

async function getCategories() {
  try {
    const response = await axios.get("/categorie", {
      headers: {
        Authorization: requireTokenAuth(),
      },
    });

    return retrieveErrors(response.status, response.data);
  } catch (e) {
    return retrieveErrors(e.status, e.data);
  }
}

/*async function getMaterialsfsp() {
  try {
    const response = await axios.put("/materiali/fsp", {
      fsp
    },
    {
      headers: { Authorization: requireTokenAuth() },
    });

    return retrieveErrors(response.status, response.data);
  } catch (e) {
    return retrieveErrors(e.response.status, e.response.data);
  }
}*/

async function createCategory(m) {
  //console.log({ product });
  try {
    const response = await axios.post(
      "/categorie",
      {//manca qualcosa?
        nome: m.nome,
      },
      {
        headers: { Authorization: requireTokenAuth() },
      }
    );

    return retrieveErrors(response.status, response.data);
  } catch (e) {
    return retrieveErrors(e.status, e.data);
  }
}

async function modifyCategory(c) {
  try {
    const response = await axios.put(
      "/categorie/" + c._id,
      {
        nome: c.nome,
      },
      {
        headers: { Authorization: requireTokenAuth() },
      }
    );

    return retrieveErrors(response.status, response.data);
  } catch (e) {
    //console.log(e);
    return retrieveErrors(e.status, e.data);
  }
}

/**
 * _______________________________________________ *
 * 
 * sottocategorie
 * _______________________________________________ *
 */

async function getSubcats() {
  try {
    const response = await axios.get("/sottocategorie", {
      headers: {
        Authorization: requireTokenAuth(),
      },
    });

    return retrieveErrors(response.status, response.data);
  } catch (e) {
    return retrieveErrors(e.status, e.data);
  }
}

async function getSubcatsfsp(fsp) {
  try {
    const response = await axios.put("/sottocategorie/fsp", {
      fsp
    },
    {
      headers: { Authorization: requireTokenAuth() },
    });

    return retrieveErrors(response.status, response.data);
  } catch (e) {
    return retrieveErrors(e.status, e.data);
  }
}

async function createSubcat(m) {
  console.log({ m });
  try {
    const response = await axios.post(
      "/sottocategorie",
      {//manca qualcosa?
        nome: m.nome,
        categoria: m.categoria
      },
      {
        headers: { Authorization: requireTokenAuth() },
      }
    );

    return retrieveErrors(response.status, response.data);
  } catch (e) {
    return retrieveErrors(e.status, e.data);
  }
}

async function modifySubcat(s) {
  try {
    const response = await axios.put(
      "/sottocategorie/" + s._id,
      {
        nome: s.nome,
      },
      {
        headers: { Authorization: requireTokenAuth() },
      }
    );

    return retrieveErrors(response.status, response.data);
  } catch (e) {
    //console.log(e);
    return retrieveErrors(e.status, e.data);
  }
}

/**
 * _______________________________________________ *
 * 
 * operazioni
 * _______________________________________________ *
 */
async function getAllOperations() {
  ///???????

  try {
    const response = await axios.get("operazioni", {
      headers: {
        Authorization: requireTokenAuth(),
      },
    });

    return retrieveErrors(response.status, response.data.result);
  } catch (e) {
    return retrieveErrors(e.status, e.data);
  }
}

async function getOperationsfsp(fsp) {
  try {
    const response = await axios.put("/operazioni/fsp", {
      fsp
    },
    {
      headers: { Authorization: requireTokenAuth() },
    });

    return retrieveErrors(response.status, response.data);
  } catch (e) {
    return retrieveErrors(e.status, e.data);
  }
}

/*
async function retrieveSingleOrder(orderId) {
  const response = await axios.get("/backOfficeOrder/getOrderById/" + orderId, {
    headers: {
      Authorization: requireTokenAuth(),
    },
  });

  try {
    return retrieveErrors(response.status, response.data.result);
  } catch (e) {
    return retrieveErrors(e.response.status, e.response.data.result);
  }
}*/

async function createLoad(ope) {
  try {
    const response = await axios.post(
      "operazioni/carico",
      {
        prodotto: ope.prodotto,//?
        //id_user_customer: order.id_user_customer,
        quantita: ope.quantita,
      },
      {
        headers: {
          Authorization: requireTokenAuth(),
        },
      }
    );
    //console.log(response);
    return retrieveErrors(response.status, response.data);
  } catch (e) {
    return retrieveErrors(e.status, e.data);
  }
}

async function createUnload(ope) {
  try {
    const response = await axios.post(
      "operazioni/scarico",
      {
        prodotto: ope.prodotto,//?
        //id_user_customer: order.id_user_customer,
        quantita: ope.quantita,
      },
      {
        headers: {
          Authorization: requireTokenAuth(),
        },
      }
    );
    //console.log(response);
    return retrieveErrors(response.status, response.data);
  } catch (e) {
    return retrieveErrors(e.status, e.data);
  }
}

/*async function modifyOrder(order) {
  try {
    const response = await axios.put(
      "backOfficeOrder/update/" + order.id_order,
      {
        courier_name: order.courier_name,
        id_user_customer: parseInt(order.id_user_customer),
        id_order_status: order.status,
      },
      {
        headers: {
          Authorization: requireTokenAuth(),
        },
      }
    );
    //console.log(response);
    return retrieveErrors(response.status, response.data);
  } catch (e) {
    return retrieveErrors(e.response.status, e.response.data);
  }
}*/

//get tendine
async function getTendine() {
  try {
    const response = await axios.get("/altro", {//?
      headers: { Authorization: requireTokenAuth() },
    });

    return retrieveErrors(response.status, response.data);
  } catch (e) {
    return retrieveErrors(e.status, e.data);
  }
}

//manda immagine
async function sendImage(immagine, cartella, nome) {
  try {
    const form = new FormData();
    //form.append('productName', 'Node.js Stickers');
    //form.append('productImage', immagine, 'stickers.jpg');
    form.append('img', immagine);
    form.append('folder', cartella);
    form.append('filename', nome);

    //console.log(form)
    //console.log(formToJSON(form))//ma a quest punto e uguale
/*ok la roba c'è
 ma non mi pare che arrivi di la :''''''C
    for (var pair of form.entries()) {
      console.log(pair[0]+ ', ' + pair[1]); 
  }
*/
//'Content-Type': 'multipart/form-data'
//ma cosi non va? anche xke messo di la mi sa conflitto?
    const response = await axios.post("/altro/upimg", formToJSON(form) /*{
      img:form,
      folder: 'aaa'//cartella
    }*/,
    {
      headers: { //
        //...form.getHeaders,
        Authorization: requireTokenAuth(),
        //'Content-Type': 'multipart/form-data',
       },
    });




//const response={status:200}
    return retrieveErrors(response.status, response.data);
    
  } catch (e) {
    console.log(e)
    return retrieveErrors(e.status, e.data);
  }
}

//check img
//---
async function checkimg(imgurl) {
  

  //const imageUrl = 'https://example.com/images/image.jpg';
  //https://drive.google.com/uc?export=view&id=1aJnJHtPAnVR7Ma7WIzAup_-t5uZazjam
  imgurl='https://drive.google.com/uc?export=view&id=1aJnJHtPAnVR7Ma7WIzAup_-t5uZazjam'


  fetch(imgurl, {'Access-Control-Allow-Origin':'*'})
    .then(response => {
      if (response.ok) {
        console.log('valid');
      } else {
        console.log('not');
      }
    })
    .catch(error => {
  
      console.error('Error validating image URL:', error);
  
    });
  }

  async function getListTable() {
    try {
      const response = await axios.get("/prodotti/report",
      {
        headers: { Authorization: requireTokenAuth() },
      });
  
      //console.log({ response });
      return retrieveErrors(response.status, response.data);
    } catch (e) {
      return retrieveErrors(e.status, e.data);
    }
  }

export {
  postLogin,
  getUsers,
  getUsersfsp,
  modifyUser,
  modifyUserSuper,
  createUser,
  getSingleUser,
//  deleteUser,
  getAllProducts,
  getProductsfsp,
  getSingleProduct,
  getProductpop,
  createProduct,
  modifyProduct,
//  deleteProduct,
  getAllOperations,
  getOperationsfsp,
  createLoad,
  createUnload,
  getCategories,
  modifyCategory,
  createCategory,
  getElements,
  getElementsfsp,
  modifyElement,
  createElement,
  /*getColours,
  getColoursfsp,
  modifyColour,
  createColour,
  getMaterials,
  getMaterialsfsp,
  modifyMaterial,
  createMaterial,
  getMeasures,
  getMeasuresfsp,
  modifyMeasure,
  createMeasure,
  getNames,
  getNamesfsp,
  modifyNames,
  createNames,*/
  getSubcats,
  getSubcatsfsp,
  modifySubcat,
  createSubcat,
  getTendine,
  sendImage,
  checkimg,
  getListTable,
};