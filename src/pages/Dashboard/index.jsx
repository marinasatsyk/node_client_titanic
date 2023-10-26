// eslint-disable-next-line no-unused-vars
import { useEffect, useState } from "react"
// eslint-disable-next-line no-unused-vars
import { AgeChart } from "../../components/charts/age_chart"
// eslint-disable-next-line no-unused-vars
import {StackedBarChart} from "../../components/charts/stacked_chart_age"
// eslint-disable-next-line no-unused-vars
import { SurvivedChart } from "../../components/charts/survived_chart"
import { getPassengers } from "../../api/instanceAxios"
import { ClassChart } from "../../components/charts/polar_class_chart"

function DashboardComponent() {

  const [isData, setIsData] = useState([])
  
  const ageRanges =  
  {ageRanges: [   {from: 0, to: 20},
    {from: 21, to: 40},
    {from: 41, to: 60},
    {from: 61},
    {from: undefined, to:undefined}
    ]
  };
 
  useEffect(() => {
   try{
     const data = async() => {
       const res = await getPassengers(ageRanges);
      if(res.status === 200){
        setIsData(res.data)
      }
   }
   data()
   }catch(err){
     console.log("from dashboard", err)
   }

  }, [])


  return (
    <div className="App">
        <h1>Titanic Statistics Page</h1>
        <article className="bar-charts">
            <header className="header-barchart-article">
              Statistics by Age
            </header>
             <div className="wrap-all-charts">
             
              <section>

                <div className="wrap-chart">
                    {isData.length&& <AgeChart data={isData}/>}
                </div>
              </section>

              <section>
                <div className="wrap-chart">
                   {isData.length&& <StackedBarChart  dataP={isData}/>}
                </div>
              </section>

              <div className="container-genre-stat">
              {isData.length &&  isData.map((rangeP, index) => {
                    return (
                  <section key={index+`-age`}>
                    <div className="wrap-chart">
                      <h3>Statistic by gender</h3>
                      <SurvivedChart  rangeP={rangeP}/>
                    </div>
                  </section>
                    )
                })}
              </div>
              <div className="container-genre-stat container-class-stat">
              {isData.length &&  isData.map((rangeP, index) => {
                    return (
                  <section key={index+`-class`}>
                    <div className="wrap-chart">
                      <h3>Statistic by cabin class</h3>
                      <div className="chart-wrapper">
                      <ClassChart  rangeP={rangeP}/>
                      </div>
                    </div>
                  </section>
                    )
                })}
              </div>
              
            </div> 
        </article>
    </div>
  )
}

export default DashboardComponent