
const TendinaPerPag = ({num, setNum}) => {

  return (
    <div className={"col-2 dropdown"} style={{textAlign:'right'}}>
    <button className="btn btn-secondary dropdown-toggle" type="button" data-toggle="dropdown" aria-expanded="false">
      {num}
    </button>
    <div className="dropdown-menu" style={{top:'80%'}}>
      <a className="dropdown-item" onClick={()=>{setNum(5)}}>5</a>
      <a className="dropdown-item" onClick={()=>{setNum(10)}}>10</a>
    </div>
  </div>
  );
};

export { TendinaPerPag };
