
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';

  import { Bar } from 'react-chartjs-2';

    ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );



export const options = {
    plugins: {
      title: {
        display: true,
        text: 'Survival statistics',
      },
    },
    responsive: true,
    interaction: {
        // mode: 'index' as const,
        intersect: false,
      },
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
      },
    },
    maintainAspectRatio: false

};
  

// eslint-disable-next-line react/prop-types
export const  StackedBarChart = ({dataP}) =>  {
   
   const chartArray = [];
   const dataPassengers = dataP;
   console.log("from isData",dataPassengers)

   dataPassengers.length &&
   dataPassengers.forEach((rangeData) => {
         chartArray.push({
           range: (rangeData.from || rangeData.to) ?  `${rangeData.from ? `from ${rangeData.from}` : ""} ${rangeData.to ? `to ${rangeData.to}`: "" } ` : `Age is not defined`,
           total: rangeData.pData.length
         })
       });

     console.log("chartArray", chartArray)
       

     const labels = chartArray.map(range =>  range.range);

     const  data = {
        labels,
        datasets: [
          {
            label: 'Total',
            data: chartArray.map((range) => range.total),
            backgroundColor: 'rgb(255, 99, 132)',
            stack: 'Stack 0'
          },
          {
            label: 'Survived',
            data: dataPassengers.map((range) =>{
                 let count = 0;
                 range.pData.forEach((passenger) => {
                    if(+passenger.Survived == 1 ){
                        count = count +1;
                    }
                 })
                 console.log("Survived", count)
                 return count;
                }),
            backgroundColor: 'rgb(75, 192, 192)',
            stack: 'Stack 1'

          },
          {
            label: 'Victims',
            data: dataPassengers.map((range) =>{
                let count = 0;
                range.pData.forEach((passenger) => {
                   if(+passenger.Survived == 0 ){
                       count = count +1;
                   }
                })
                return count;
               }),
            backgroundColor: 'rgb(53, 162, 235)',
            stack: 'Stack 1'
          },
        ],
    };
    

  return (
    <section>
            <div className="wrap-chart">
                <Bar 
                    options={options}
                    data={data} 
                    width={400}
                    height={300}
                />
            </div>
    </section>
  )
}

