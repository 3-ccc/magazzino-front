import { DarkModeContext } from "../../tema/DarkModeContext";
import { useContext, useEffect, useState } from "react";
import { useWindowDimensions } from "../../altro/windowDimensions";

function FiltriNoCat({ filtri, setFiltri }) {
  const { darkMode } = useContext(DarkModeContext);
  const { wi } = useWindowDimensions();
  const [buttonState, setButtonState] = useState(false);

  //console.log(filtri);

  useEffect(() => {
    if (wi >= 992 && buttonState === false) {
      document.getElementById("buttoncollapse").click();
    }
  }, [wi, buttonState]);
  useEffect(() => {
    if (wi >= 992 /*&& buttonState === false*/) {
      document.getElementById("collapsefilter").classList.add('show');
    }
    //console.log('cambio tema')

  }, [darkMode]);

  /*
filtri
  nome    ->asc-desc
  */
  return (
    <div style={{marginLeft:'2em', marginRight:'2em'}}>

      {
        <button
          id="buttoncollapse"
          className={
            "btn btn-outline-success " + (darkMode ? "nav2button" : "nav2buttonl")
          }
          type="button"
          style={{ display: wi >= 992 ? "none" : "block" }}
          data-toggle="collapse"
          data-target="#collapsefilter"
          aria-expanded="false"
          aria-controls="collapsefilter"
          onClick={() => {
            setButtonState(!buttonState);
          }}
        >
          <i className="bi bi-list"></i>
        </button>
      }
      {
        <div
          className={
            "collapse card mb-1 " + (darkMode ? "sfondocard1" : "sfondocard3")
          }
          style={{ width: "100%" }}
          id="collapsefilter"
        >
          {
            <div className="d-flex flex-wrap justify-content-center row m-0">
              <div
                className={
                  "card col-sm-4 col-md-3 col-lg-3 col-xl-3 p-0 innercardorders"
                }
                onClick={() => {
                  if (filtri.nome === "asc") {
                    setFiltri({
                      nome: "desc",
                    });
                  } else {
                    setFiltri({
                      nome: "asc",
                    });
                  }
                }}
              >
                <div
                  className="card-body p-1 row "
                  style={{ maxHeight: "50vh" }}
                >
                  <p className="card-title col-12 ">
                    <b>Nome</b>

                    {filtri.nome === "asc" && (
                      <i
                        style={{
                          color: darkMode
                            ? "rgba(0,0,0,0.5)"
                            : "rgba(255,255,255,0.5)",
                        }}
                        className="bi bi-arrow-up-short"
                      ></i>
                    )}
                    {filtri.nome === "desc" && (
                      <i
                        style={{
                          color: darkMode
                            ? "rgba(0,0,0,0.5)"
                            : "rgba(255,255,255,0.5)",
                        }}
                        className="bi bi-arrow-down-short"
                      ></i>
                    )}
                  </p>
                </div>
              </div>
            </div>
            
          }
        </div>
      }
      {/*modal */}
      {/*<DialogOrderDetail ordine={torre}></DialogOrderDetail>*/}
    </div>
  );
}

export default FiltriNoCat;
