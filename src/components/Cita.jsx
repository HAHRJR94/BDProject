import React, { useContext } from 'react'
import moment from 'moment'
import { FirebaseContext } from '../firebase/context'

const Cita = ({ cita }) => {
  const { handleDelete, setGetId } = useContext(FirebaseContext)

  const { id, nombre, edad, sintomas, date, nCta } = cita

  return (
    <tr className='text-center'>
      <td>{id}</td>
      <td>{nombre}</td>
      <td>{edad}</td>
      <td>{sintomas}</td>
      <td>{nCta}</td>
      <td>{moment(date).format('MMMM Do YYYY, h:mm:ss a')}</td>
      <td><button className='btn btn-success' onClick={() => setGetId(id)}>Actualizar</button></td>
      <td><button className='btn btn-outline-danger' onClick={() => handleDelete(id)}>Eliminar</button></td>
    </tr>
  )
}

export default Cita
