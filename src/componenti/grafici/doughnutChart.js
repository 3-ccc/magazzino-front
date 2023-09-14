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
  ArcElement,
} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { getDonut } from '../../api/indexApi';
import { useWindowDimensions } from "../../altro/windowDimensions";

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

ChartJS.register(ArcElement, Tooltip, Legend);

const Doughnutchart = ()=>{

    const [dati, setDati] = useState();
    const [lab, setLab] = useState();
    const [dat, setDat] = useState();
    const [w, setW] = useState(window.innerWidth<768 ? window.innerWidth/2-30 : (window.innerWidth<1200 ? window.innerWidth/4-30 : window.innerWidth/3/2-30));

    const { wi } = useWindowDimensions();



    useEffect(() => {
  
      getDonut().then((element) => {
        //console.log(element)
        if (!element.isError) {
          //setMsg(element.data);//forse meglio separarli direttamente???
          setLab(element.data.lab)
          setDat(element.data.tot)
  //console.log(element.data)
  /*
          setError("");
  */
        } else {
  //        setError("errore");
          //showmsg('rosso', 'attenzione', element.messageError)
  console.log(element)
        }
      });

      //console.log(window.innerWidth)
    }, []);

    useEffect(() => {
  
//console.log(wi)
//console.log(document.getElementById('divdonut').offsetWidth)
setW(document.getElementById('divdonut').offsetWidth)

    }, [wi]);

    useEffect(() => {
  
      if(lab && dat){
        const data = {
          labels: lab,
          datasets: [
            {
              data: dat,
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
              ],
              borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
              ],
              borderWidth: 1,
            },
          ],
        };
        setDati(data)
      }
    }, [lab, dat]);

      return <div style={{'width': '100%'}}>
          {lab && dat && dati && <h3>riepilogo usati per nome</h3>}
          <div style={{'width': '100%', display:'flex', justifyContent:'center'}}>
            <div className='col-12 col-md-6 col-xl-4 sfondocard1' id='divdonut' style={{justifyContent:'center', position:'relative', height:w}}>
              {lab && dat && dati && <Doughnut data={dati} />}
            </div>
          </div>
        </div>

};

export default Doughnutchart;