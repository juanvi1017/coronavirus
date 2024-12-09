import * as React from 'react';
import { useState, useEffect, useCallback } from 'react';
// api
import { get } from './apirest';
import Map from './component/Map';
import Table from './component/Table';
import DoughnutChart from './component/Echart/DoughnutChart';
import MenuTop from './component/MenuTop/MenuTop';

let dataGraph = [];

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
    let activos = 0;
    let casesTotal = 0;
    let death = 0;
    data.forEach(value => {
      activos += parseInt(value.cases.active !== null ? value.cases.active : 0, 10);
      casesTotal += parseInt(value.cases.total !== null ? value.cases.total : 0, 10);
      death += parseInt(value.deaths.total !== null ? value.deaths.total : 0, 10)
    });
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
      <div className='container-data'>
        <div className='table' >
          <Table loading={loading} data={data} />
        </div>
        <div className='dough' >
          {!loadingDou && (
            <DoughnutChart
              height='80vh'
              color={['#009879', 'blue', 'red']}
              data={dataGraph}
            />
          )}
        </div>
      </div>
    </>
  )
}

export default App
