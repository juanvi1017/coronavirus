import * as React from 'react';
import './style.css';

function Table({ data, loading }) {

    if (!loading) {
        return (
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
                                    <p className='table-active'>Activos: {value.cases.active}</p>
                                    <p>Totales: {value.cases.total}</p>
                                </td>
                                <td className='table-death'>{value.deaths.total}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div >
        )
    }
}

export default Table;