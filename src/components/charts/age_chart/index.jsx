/* eslint-disable react/prop-types */
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
ChartJS.register(ArcElement, Tooltip, Legend);

export const AgeChart = ({data}) => {


    const isData = data;
    const chartArray = [];
   
    isData.length &&
    isData.forEach((rangeData) => {
         chartArray.push({
            range: (rangeData.from || rangeData.to) ?  `${rangeData.from ? `from ${rangeData.from}` : ""} ${rangeData.to ? `to ${rangeData.to}`: "" } ` : `Age is not defined`,
            total: rangeData.pData.length
          })
        });


    const dataChart = {
        labels: chartArray.map(range =>  range.range) ,
        datasets: [
          {
            label: 'Total passengers by age',
            data: chartArray.map(range =>  range.total),
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
             'rgba(153, 102, 255, 0.2)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)'
            ],
            borderWidth: 1,
          },
        ],
      };

    return(
        <section>
            <div className="wrap-chart">
                <Doughnut 
                data={dataChart} 
                width={300}
                height={300}
                options={{ 
                  maintainAspectRatio: false,
                  responsive: true,
                  plugins: {
                    title: {
                      display: true,
                      fontSize: 25, 
                      text: 'Total passengers by age'
                    } 
                  },
                }}
                
                />
            </div>
        </section>)
        
}

