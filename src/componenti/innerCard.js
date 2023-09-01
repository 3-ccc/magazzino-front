import "./componenti.css";

function InnerCard({ title, description, i, w, red }) {
  return (
    <div>
      {i === -1 && (
        <div className="card-body p-1 row" style={{ maxHeight: "50vh" }}>
          <p className="card-title col-12 ">
            <b>{title}</b>
          </p>
        </div>
      )}
      {/*sembrerebbe non lamentarsi se non c'è red?*/}
      {i !== -1 && (
        <div className="card-body p-1 row" style={{ maxHeight: "50vh" }}>
          {w < 1199 && (
            <p className="card-title col-12 ">
              <b>{title}</b>
            </p>
          )}
          <div className={"card-text col-12 text-truncate-container small m-0 "}>
            <p className={"m-0 "+ (red==0 ? 'alert alert-warning' : (red==-1 ? 'alert alert-danger' : ''))}>{description ? description : "-"}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export { InnerCard };
