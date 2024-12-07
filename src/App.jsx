import * as React from 'react';
import { useState, useEffect, useCallback } from 'react';
// api
import { get } from './apirest';
import Map from './component/Map';

function App() {

  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)

  const getStatistics = useCallback(async () => {
    setLoading(true)
    const response = await get(`https://covid-193.p.rapidapi.com/statistics`)
    if (response.status === 200) {
      setData(response.data.response);
    }
    setLoading(false)
  }, [])

  useEffect(() => {
    getStatistics()
  }, [getStatistics]);

  return (
    <>
      <Map />
      {!loading && (
        <div className='container-table'>
          <table className="content-table">
            <thead>
              <tr>
                <th>País</th>
                <th>Casos</th>
                <th>Muertes</th>
              </tr>
            </thead>
            <tbody>
              {data.map((value, item) => (
                <tr key={item}>
                  <td>{value.country}</td>
                  <td>
                    <tr>
                      <td className='table-active'>Activos: {value.cases.active}</td>
                    </tr>
                    <tr>
                      <td>Totales: {value.cases.total}</td>
                    </tr>
                  </td>
                  <td className='table-death'>{value.deaths.total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div >
      )}
    </>
  )
}

export default App
