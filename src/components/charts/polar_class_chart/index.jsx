import {
  Chart as ChartJS,
  RadialLinearScale,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { PolarArea } from 'react-chartjs-2';

ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend);

// eslint-disable-next-line react/prop-types
export const ClassChart =({rangeP}) =>  {
  // eslint-disable-next-line no-unused-vars
  const isData = rangeP;
  console.log("from isData",isData)
  let rangeLabel  = '';
  let totalFirstClass = 0;
  let totalSecondClass = 0;
  let totalFirdClass = 0;
 
  if(Object.keys(isData).length)  {
    rangeLabel = (isData.from || isData.to) 
    ?  `${isData.from ? `from ${isData.from}` : ""} ${isData.to ? `to ${isData.to}`: "" } ` 
    : `Age is not defined`;
   
    isData.pData.forEach((passenger)  => {
      if(passenger.Pclass == 1){
        totalFirstClass = totalFirstClass+1;
      }else if(passenger.Pclass == 2){
        totalSecondClass = totalSecondClass + 1;
      }else if(passenger.Pclass == 3){
        totalFirdClass = totalFirdClass + 1;
      }
    })
  }

  const dataChart = {
    labels: [ '1 Class', '2 Class', '3 Class'],
    datasets: [
      {
        label: rangeLabel,
        data: [ totalFirstClass, totalSecondClass, totalFirdClass],
        backgroundColor: [
          'rgba(75, 192, 192, 0.5)',
          'rgba(153, 102, 255, 0.5)',
          'rgba(255, 159, 64, 0.5)',
        ],
        borderWidth: 1,
      },
    ],
  };
 
    return (
    <PolarArea 
            data={dataChart} 
            width={250}
            height={250}
            options={{ 
                responsive: true,
                plugins: {
                    title: {
                      display: true,
                      fontSize: 25, 
                      text: rangeLabel
                    } 
                },
                scale: {
                    ticks: {
                        beginAtZero: true
                    }
                }
              }}
            
    />);
}