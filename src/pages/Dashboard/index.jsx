import { useEffect, useState } from "react"
import { AgeChart } from "../../components/charts/age_chart"
import {StackedBarChart} from "../../components/charts/stacked_chart_age"
import { SurvivedChart } from "../../components/charts/survived_chart"
import { getPassengers } from "../../api/instanceAxios"
import { ClassChart } from "../../components/charts/polar_class_chart"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import{faSpinner} from '@fortawesome/free-solid-svg-icons';
//  import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";
// import ButtonToolbar from "react-bootstrap/ButtonGroup";
// import ToggleButton  from "react-bootstrap/ToggleButton";

function DashboardComponent() {

  const [isData, setIsData] = useState([]);
  //variable for display differents statistics 
  // eslint-disable-next-line no-unused-vars
  const [sortBy, setSortBy] = useState('age');
  const [isLoading, setIsLoading] = useState(false);
  
  
  //select range by select component 
  const ageRanges =  
  {ageRanges: [   {from: 0, to: 20},
    {from: 21, to: 40},
    {from: 41, to: 60},
    {from: 61},
    {from: undefined, to:undefined}
    ]
  };
 
  // const handleChange = ( e) => {
  //   const target = e.target;
  //   if (target.checked) {
  //     setSortBy(target.value);
  //   }
  //   console.log(, sortBy);
  // }
 
  useEffect(() => {
   try{
     const data = async() => {
      setIsLoading(true)
       const res = await getPassengers(ageRanges);
      if(res.status === 200){
        setIsData(res.data)

      }
      setTimeout(() => {
        setIsLoading(false)
      }, 1000)
      
      
   }
   data()
   }catch(err){
     console.log("from dashboard", err)
   }

  }, [])


if(isLoading){
  return(
    <div className="app-main-container">
            <div className="loading-container"><FontAwesomeIcon icon={faSpinner} spin />...Loading</div>
    </div>
  )
}else{
  return (
    <div className="app-main-container">
        <h1>Titanic Statistics Page</h1>
        <article className="bar-charts">
            <header className="header-barchart-article">
              Statistics 

              {/* change active sate of user's choice for  display data
              <ButtonToolbar>
                <ToggleButtonGroup type="radio" name="options" defaultValue={1}>
                  <ToggleButton value={1}>Age (by default)</ToggleButton>
                  <ToggleButton value={2}>Gendre</ToggleButton>
                  <ToggleButton value={3}>Class</ToggleButton>
                </ToggleButtonGroup>
              </ButtonToolbar> */}
                
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
              })
            }              
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


 
}

export default DashboardComponent