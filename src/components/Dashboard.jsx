import React, { useContext, Fragment } from 'react'
import { FirebaseContext } from '../firebase/context'
import Cita from './Cita'

const Dashboard = () => {
  const { citas } = useContext(FirebaseContext) //Extraer todas las citas de la DB

  return (
    <Fragment>
      {citas.length === 0 ? (
        <h2 className='text-center text-white lead display-4 mb-5'>No hay registros</h2>
      ) : (
        <table className='table table-striped'>
          <thead className='thead-dark'>
            <tr className='text-center'>
              <th scope='col'>id</th>
              <th scope='col'>Paciente</th>
              <th scope='col'>Edad</th>
              <th scope='col'>sintomas</th>
              <th scope='col'>Fecha</th>
              <th scope='col'>Actualizar</th>
              <th scope='col'>Eliminar</th>
            </tr>
          </thead>
          <tbody>
            {citas.map(cita => (
              <Cita key={cita.id} cita={cita} />
            ))}
          </tbody>
        </table>
      )}
    </Fragment>
  )
}

export default Dashboard
