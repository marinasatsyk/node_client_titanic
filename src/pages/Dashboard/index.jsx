// eslint-disable-next-line no-unused-vars
import { AgeChart } from "../../components/charts/age_chart"
import {StackedBarChart} from "../../components/charts/stacked_chart_age"
import { SurvivedChart } from "../../components/charts/survived_chart"

function DashboardComponent() {

  

  return (
    <div className="App">
        <h1>Titanic Statistics Page</h1>
        <article className="bar-charts">
            <header className="header-barchart-article">
              Statistics by Age
            </header>
            <div className="wrap-all-charts">
              {/* <section>
                <div className="wrap-chart">
                    <AgeChart />
                </div>
              </section> */}
              <section>
                <div className="wrap-chart">
                    <StackedBarChart />
                </div>
              </section>
                <SurvivedChart />


            </div>
        </article>
    </div>
  )
}

export default DashboardComponent