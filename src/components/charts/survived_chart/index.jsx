/* eslint-disable react/prop-types */
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);
 

export const SurvivedChart = ({rangeP}) =>  {
  const isData = rangeP;
  console.log("from isData",isData)
  let rangeLabel  = '';
  let totalWomen = 0;
  let totalMen = 0;
 
 if(Object.keys(isData).length)  {
  rangeLabel = (isData.from || isData.to) 
  ?  `${isData.from ? `from ${isData.from}` : ""} ${isData.to ? `to ${isData.to}`: "" } ` 
  : `Age is not defined`;
  isData.pData.forEach((passenger)  => {
    if(passenger.Sex == 'female'){
      totalWomen = totalWomen+1;
    }else if(passenger.Sex == "male"){
      totalMen = totalMen + 1;
    }
  })
}


 
  console.log("chartArray", totalWomen, totalWomen)
  const dataChart = {
        labels: [ 'Women', 'Men'],
        datasets: [
          {
            label: rangeLabel,
            data: [totalWomen, totalMen],
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
            ],
            borderWidth: 1,
          },
        ],
      };
  
    return (
        <section>
            <div className="wrap-chart"> 
                <Pie 
                data={dataChart} 
                width={200}
                height={200}
                options={{ 
                  maintainAspectRatio: false ,
                  responsive: true,
                  plugins: {
                    title: {
                      display: true,
                      fontSize: 25, 
                      text: rangeLabel
                    } 
                  },
                }}
                />
            </div>
        </section>
  );
}