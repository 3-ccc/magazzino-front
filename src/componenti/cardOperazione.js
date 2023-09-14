import { DarkModeContext } from "../tema/DarkModeContext";
import { useContext } from "react";
import { InnerCard } from "./innerCard";
import { useWindowDimensions } from "../altro/windowDimensions";
import { useNavigate } from "react-router-dom";
//import { deleteProduct } from "../api/indexApi";

function CardOperazione({ ope, indice, noresize }) {
  const { darkMode } = useContext(DarkModeContext);
  const { wi } = useWindowDimensions();
  const navigate = useNavigate();

  function internalDelete() {
    /*deleteProduct(ope.id_product).then((element) => {
      if (element.isError) {
      } else {
        deleteItem();
      }
    });*/
  }
  //console.log(ope)

  return (
    <div>

      <div
        className={"card mb-1 " + (darkMode ? "sfondocard1" : "sfondocard3")}
        style={{ width: "100%" }}
        data-toggle="modal"
        data-target="#exampleModal"
      >
        <div className="d-flex flex-wrap justify-content-center row m-0">
          <div
            className={"card col-sm-4 col-md-3 col-lg-3 col-xl-2 p-0 innercardorders"}
          >
            <InnerCard
              w={noresize ? 1 :wi}
              i={indice}
              title={"Id"/*? */}
              description={ope?._id}
            ></InnerCard>
          </div>
          <div
            className={
              "card col-sm-3 col-md-2 col-lg-1 p-0 innercardorders"
            }
          >
            <InnerCard
              w={noresize ? 1 :wi}
              i={indice}
              title={"Tipo"}
              description={ope?.tipo}
            ></InnerCard>
          </div>
          <div
            className={"card col-sm-5 col-md-4 col-lg-3 col-xl-3 p-0 innercardorders"}
          >
            <InnerCard
              w={noresize ? 1 :wi}
              i={indice}
              title={"Prodotto"}
              description={ope?.prodotto?.codice}
            ></InnerCard>
          </div>
          <div
            className={
              "card col-sm-5 col-md-4 col-lg-3 p-0 innercardorders"
            }
          >
            <InnerCard
              w={noresize ? 1 :wi}
              i={indice}
              title={"Agente"}
              description={ope?.agente.username}
            ></InnerCard>
          </div>
          <div
            className={"card col-sm-5 col-md-3 col-lg-3 col-xl-1 p-0 innercardorders"}
          >
            <InnerCard
              w={noresize ? 1 :wi}
              i={indice}
              title={"Quantità"}
              description={ope?.quantita}
              red={(ope?.quantita<ope?.limitescorta) ? -1 : (ope?.quantita==ope?.limitescorta ? 0 : 1)}
            ></InnerCard>
          </div>
          <div
            className={"card col-sm-4 col-md-3 col-lg-2  p-0 innercardorders"}
          >
            <InnerCard
              w={noresize ? 1 :wi}
              i={indice}
              title={"Data"}
              description={(ope && ope.data) ? new Date(ope.data).toLocaleDateString("it-IT")/*.split("T")[0]*/ : '-'}
              //controllare
            ></InnerCard>
          </div>
          {/*indice !== -1 && (
            <div
              className={
                "card col-sm-3 col-md-2 col-lg-2 col-xl-1 p-0 innercardorders"
              }
            >
              <div className="card-body p-1 row">*/}
                {/*<p className="card-title col-sm-6 col-6 m-0 pr-0">
                  <button
                    type="button"
                    className={
                      "btn btn-outline-success " +
                      (darkMode ? "nav2button" : "nav2buttonl")
                    }
                    onClick={() => {
                      navigate("/store/detail/" + ope.id_product);
                    }}
                  >
                  <i className="bi bi-pencil"></i>*/}
                    {/*" modifica"*/}
                  {/*</button>
                </p>*/}
                {/*<p className="card-text col-sm-6 col-6 pl-0">
                  <button
                    type="button"
                    className={
                      "btn btn-outline-danger " +
                      (darkMode ? "nav2button" : "nav2buttonl")
                    }
                    onClick={internalDelete}
                  >
                  <i className="bi bi-trash3"></i>*/}
                    {/*" elimina"*/}
                  {/*</button>
                </p>*/}
              {/*</div>
            </div>
              )*/}
          {/*indice === -1 && (
            <div
              className={
                "card col-sm-3 col-md-2 col-lg-2 col-xl-1 p-0 innercardorders"
              }
            >
              <InnerCard
                w={wi}
                title={"Colore"}
                description={ope?.colore/*" "*/}
                {/*i={indice}
              ></InnerCard>
            </div>
          )*/}
        </div>
        {/*immagine + dati 
      <div className="m-2" style={{ width: "100%" }}>
        <div className=" text flex-column" style={{}}>
          <div className="row flex-wrap align-items-center pb-3">
            <div
              className="form-group row col-12"
              style={{ backgroundColor: "gray" }}
            >
              <div className="col-12">
                <div
                  className="col-sm-6 col-12"
                  style={{ backgroundColor: "dodgerblue" }}
                >
                  <label
                    htmlFor="telefonoaccount"
                    className=" col-form-label"
                    style={{ backgroundColor: "black" }}
                  >
                    Telefono
                  </label>
                  <div className="" style={{ backgroundColor: "gray" }}>
                    <p id="telefonoaccount">1234567</p>
                  </div>
                </div>
                <div className="col-sm-6" style={{ backgroundColor: "orange" }}>
                  <label
                    htmlFor="telefonoaccount"
                    className=" col-form-label"
                    style={{ backgroundColor: "gray" }}
                  >
                    corr
                  </label>
                  <div className="" style={{ backgroundColor: "dodgerblue" }}>
                    <p id="telefonoaccount">brt</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>*/}
      </div>
      {/*modal */}
      {/*<DialogOrderDetail ordine={ope}></DialogOrderDetail>*/}
    </div>
  );
}

export default CardOperazione;
