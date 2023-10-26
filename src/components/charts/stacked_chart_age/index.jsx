
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
import { useEffect, useState } from 'react';
import { getPassengers } from '../../../api/instanceAxios';

    ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

//**** */
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
  

//**** */
const ageRanges =  
    //@todo for implement select of ranges
    {ageRanges: [   {from: 0, to: 20},
                    {from: 21, to: 40},
                    {from: 41, to: 60},
                    {from: 61},
                    {from: undefined, to:undefined}
                  ]
     };

export const  StackedBarChart = () =>  {
    const [isData, setIsData] = useState([])
  
    useEffect(() => {
     try{
       const data = async() => {
         const res = await getPassengers(ageRanges);
        //  console.log(res.data)
        if(res.status === 200){
          setIsData(res.data)
        }
     }
     data()
     }catch(err){
       console.log("from age chart", err)
     }


    }, [])


    
   const chartArray = [];
   isData.length &&
     isData.forEach((rangeData) => {
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
            data: isData.map((range) =>{
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
            data: isData.map((range) =>{
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
                    width={300}
                    height={300}
                />
            </div>
    </section>
  )
}

