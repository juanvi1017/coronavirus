import * as React from 'react';
import { useState, useEffect, useCallback } from 'react';
import { Grid2 } from '@mui/material';
// api
import { get } from './apirest';
import Map from './component/Map';
import Table from './component/Table';
import DoughnutChart from './component/Echart/DoughnutChart';
import MenuTop from './component/MenuTop/MenuTop';
import Death from './component/Hero/Death';

let dataGraph = [];

let dataCountryReportPopulationMore = []
let nameCountryMore = '';
let casesTotalesCountryMore = 0;
let reportMoreCase = 0; //Pais con mas casos reportados teniendo en cuenta la cantidad de habitantes
let countryMore = '' //poblacion del pais con mas casos reportados entre sus habitantes

let reportCase = 100; //Pais con menos casos reportados teniendo en cuenta la cantidad de habitantes
let country = '' //poblacion del pais con mas casos reportados entre sus habitantes
let casesTotalesCountry = 0;
let nameCountry = '';
let dataCountryReportPopulation = []

function App() {

  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [loadingDou, setLoadingDou] = useState(true)

  const getStatistics = useCallback(async () => {
    setLoading(true)
    const response = await get(`https://covid-193.p.rapidapi.com/statistics`)
    if (response.status === 200) {
      setData(response.data.response);
    }
    setLoading(false)
  }, [])

  const graph = (data) => {
    setLoadingDou(true)
    let aux = 0;
    let auxMenos = 0;
    let activos = 0;
    let casesTotal = 0;
    let death = 0;
    data.forEach(value => {
      if (value.cases.total !== null && value.population !== null) {
        aux = (100 * value.cases.total) / value.population;
        if (aux > reportMoreCase) {
          reportMoreCase = aux;
          countryMore = value.population;
          nameCountryMore = value.country;
          casesTotalesCountryMore = value.cases.total;
        }
        if (aux < reportCase) {
          reportCase = aux;
          country = value.population;
          nameCountry = value.country;
          casesTotalesCountry = value.cases.total;
        }
      }
      activos += parseInt(value.cases.active !== null ? value.cases.active : 0, 10);
      casesTotal += parseInt(value.cases.total !== null ? value.cases.total : 0, 10);
      death += parseInt(value.deaths.total !== null ? value.deaths.total : 0, 10)
    });

    dataCountryReportPopulationMore = [
      { "value": countryMore, "name": "Población" },
      { "value": casesTotalesCountryMore, "name": "Casos totales" },
    ]

    dataCountryReportPopulation = [
      { "value": country, "name": "Población" },
      { "value": casesTotalesCountry, "name": "Casos totales" },
    ]

    console.log(dataCountryReportPopulation)

    dataGraph = [
      { "value": activos, "name": "Activos" },
      { "value": casesTotal, "name": "Casos totales" },
      { "value": death, "name": "Fallecidos" }
    ]
    setLoadingDou(false)
  }

  useEffect(() => {
    if (data.length > 1) {
      graph(data)
    }
  }, [data, graph]);

  useEffect(() => {
    getStatistics()
  }, [getStatistics]);

  return (
    <>
      <MenuTop />
      <Map />
      {!loadingDou && (
        <Death data={dataGraph} />
      )}
      <Grid2 container spacing={2} justifyContent='center'>
        <Grid2 sx={{ md:4, xs:12 }}>
          {!loadingDou && (
            <>
              <h3 style={{margin: '0px 10px'}}>Pais con más casos X habitantes: {nameCountryMore} {reportMoreCase}%</h3>
              <DoughnutChart
                height='40vh'
                color={['#009879', 'red']}
                data={dataCountryReportPopulationMore}
              />
            </>
          )}
        </Grid2>
        <Grid2 sx={{ md:4, xs:12 }}>
          {!loadingDou && (
            <>
              <h3 style={{margin: '0px 10px'}}>Pais con menos casos X habitantes: {nameCountry} {reportCase}%</h3>
              <DoughnutChart
                height='40vh'
                color={['#009879', 'red']}
                data={dataCountryReportPopulation}
              />
            </>
          )}
        </Grid2>
      </Grid2>
      <div className='container-data'>
        <div className='table' >
          <Table loading={loading} data={data} />
        </div>
        <div className='dough' >
          {!loadingDou && (
            <DoughnutChart
              height='80vh'
              color={['black', '#009879', 'red']}
              data={dataGraph}
            />
          )}
        </div>
      </div>
    </>
  )
}

export default App
