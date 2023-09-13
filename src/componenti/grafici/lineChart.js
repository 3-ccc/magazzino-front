import React, { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  TimeScale,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { getLine, getElementsfsp } from '../../api/indexApi';

ChartJS.register(
  CategoryScale,
  TimeScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Linechart = ()=>{
  const [msg, setMsg] = useState([]);
  //const [refresh, setRefresh] = useState(0);
  const [n, setN] = useState();
  const [tendine, setTendine] = useState();
  const [labels, setLabels] = useState();

/*
    useEffect(() => {
      const didMount = async () => {
           setMsg(await getMsg());
           //prendo solo ultimi 50 dati
          console.log(msg)
      }
      didMount()
  }, [refresh])
*/

useEffect(() => {

    const p={
      //filtro:filtri,
      pagin:false
  }
    getElementsfsp(p, 'nomi').then((element) => {
      if (!element.isError) {
        setTendine(element.data.elem);

      } else {
        console.error("errore durante il recupero dei nomi");
      }
    });
  }, []);

  useEffect(() => {
    if(n){

    getLine(n).then((element) => {
      console.log(element)
      if (!element.isError) {
        setMsg(element.data);//forse meglio separarli direttamente???
        setLabels(element.data.mesi)
console.log(element.data)
/*
        setError("");
*/
      } else {
//        setError("errore");
        //showmsg('rosso', 'attenzione', element.messageError)
console.log(element)
      }
    });
}
  }, [n]);
/*
  const myTimeout = setTimeout(()=>{
    setRefresh(refresh+1)
    //console.log(refresh)
  }, 10000);
*/
    const options = {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'usati al mese per nome',
          },
          scales: {
            x: {
              type: 'time',
              time: {
                unit: 'month'
              }
            }
          }
        },
      };

      /*
      const labels=msg.map((i)=>{
        const d= new Date(i.timestamp*1);
        //console.log(d)
        const data= ''+d.getDate() + '-'+ (d.getMonth()+1)+'-'+d.getFullYear()+' '+d.getHours();
        return data;
      })
      const umidita=msg.map((i)=>{
        return i.hum;
      })
      const temperatura=msg.map((i)=>{
        return i.value;
      })
*/

      const data = {
        labels, //con a.b non funziona...
        datasets: [
          {
            label: 'numero',
            data: msg.tot,
            borderColor: 'rgb(53, 162, 235)',
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
          },/*
          {
            label: 'temperatura',
            data: temperatura,
            borderColor: 'rgb(0, 153, 0)',
            backgroundColor: 'rgba(0, 153, 0, 0.5)',
          },*/
        ],
      };

      return <div style={{'width': '100%'}}>
        {/*mettere valore default altrimenti grafico nada?*/}
        <div className="form-group row mt-3">
                        <label
                          htmlFor="titoloproduct"
                          className="col-md-3 col-form-label"
                        >
                          Nome
                        </label>
                        <div className="col-md-9">
                        <select
                          className={
                            (true
                              ? "form-control-plaintext"
                              : "form-control") + " custom-select"
                          }
                          value={n}
                          onChange={(el) => {
                            setN(el.target.value);
                          }}
                        >
                          <option value={""}></option>
                          {tendine && tendine.length && tendine.length > 0 &&
                            tendine.map((c) => {
                              return (
                                <option value={c._id} key={c._id}>
                                  {c.nome}
                                </option>
                              );
                            })}
                        </select>
                        </div>
                      </div>
                      {n && <div className='sfondocard1'>
          {n && <Line options={options} data={data} />}
                      </div>}
        </div>

};

export default Linechart;