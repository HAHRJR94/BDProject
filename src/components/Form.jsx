import React, { useState, useContext, useEffect } from 'react'
import { FirebaseContext } from '../firebase/context'

const Form = () => {
  const { update, getId, setGetId, firebase } = useContext(FirebaseContext)

  //Datos del formulario
  const [paciente, setPaciente] = useState({
    nombre: '',
    edad: '',
    sintomas: ''
  })
  const [error, setError] = useState(false)
  const { nombre, edad, sintomas } = paciente

  useEffect(() => {
    if (Object.keys(update).length > 0) {
      setPaciente(update)
    }

  }, [update])

  //Captura los datos del formulario
  const handleChange = e => {
    setPaciente({ ...paciente, [e.target.name]: e.target.value })
  }

  //Envía los datos a la DB
  const handleSubmit = e => {
    e.preventDefault()

    //Valida si un campo esta vacío
    if (nombre.trim() === '' || edad.trim() === '' || sintomas.trim() === '') {
      setError(true)
      return
    }
    setError(false)

    paciente.date = Date.now()

    if (getId === '') {
      //Guarda el registro en la DB
      firebase.db.collection('citas').add(paciente)
    } else {
      firebase.db.collection('citas').doc(getId).update(paciente)
      setGetId('')
    }

    setPaciente({ nombre: '', edad: '', sintomas: '' })
  }

  //Muestra un mensaje de error
  const dataError = () => {
    setTimeout(() => {
      setError(false)
    }, 2500)

    return (
      <h2 className='bg-danger text-center text-white mt-5 p-3'>
        TODOS LOS CAMPOS SON OBLIGATORIOS
      </h2>
    )
  }

  return (
    <section>
      {error && dataError()}

      <div className='card mt-5 p-4'>
        <form onSubmit={handleSubmit}>
          <h2 className='text-center mb-4'>Administrador de citas</h2>
          <div className='form-group'>
            <label>Nombre</label>
            <input
              className='form-control'
              type='text'
              name='nombre'
              value={nombre}
              onChange={handleChange}
              placeholder='Nombre del paciente'
            />
          </div>
          <div className='form-group'>
            <label>Edad</label>
            <input
              className='form-control'
              type='text'
              name='edad'
              value={edad}
              onChange={handleChange}
              placeholder='Edad'
            />
          </div>
          <div className='form-group'>
            <label>Sintomas</label>
            <input
              className='form-control'
              type='text'
              name='sintomas'
              value={sintomas}
              onChange={handleChange}
              placeholder='Sintomas'
            />
          </div>
          <button className='btn btn-outline-primary btn-block' type='submit'>
            {getId === '' ? 'Guardar' : 'Actualizar'}
          </button>
        </form>
      </div>
    </section>
  )
}

export default Form
