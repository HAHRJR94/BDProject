import React, { useState, useContext, useEffect } from 'react'
import { FirebaseContext } from '../firebase/context'

const Form = () => {
  const { update, getId, setGetId, firebase } = useContext(FirebaseContext)

  //Datos del formulario
  const [paciente, setPaciente] = useState({
    nombre: '',
    edad: '',
    sintomas: '',
    nCta: '',
    alumno: '',
    date: Date.now()
  })
  const [error, setError] = useState(false)
  const { nombre, edad, sintomas, nCta } = paciente

  useEffect(() => {
    if (Object.keys(update).length > 0) {
      setPaciente(update)
    }
  }, [update])

  //Captura los datos del formulario
  const handleChange = e => {
    setPaciente({ ...paciente, [e.target.name]: e.target.value })
  }

  //Cancela la actualización de los datos
  const handleCancelUpdate = () => {
    setPaciente({ nombre: '', edad: '', sintomas: '', nCta: '', alumno: '' })
    setGetId('')
  }

  //Envía los datos a la DB
  const handleSubmit = e => {
    e.preventDefault()

    //Valida si un campo esta vacío
    if (
      nombre.trim() === '' ||
      edad.trim() === '' ||
      sintomas.trim() === '' ||
      nCta.trim() === ''
    ) {
      setError(true)
      return
    }
    setError(false)

    //valida si se va a guardar o actualizar la información
    if (getId === '') {
      //Guarda el registro en la DB
      firebase.db.collection('citas').add(paciente)
    } else {
      firebase.db.collection('citas').doc(getId).update(paciente)
      setGetId('')
    }

    //Reinicia los valores del formulario
    setPaciente({ nombre: '', edad: '', sintomas: '', nCta: '' })
  }

  //Muestra un mensaje de error
  const dataError = () => {
    //Tiempo en que aparecera el mensaje de error
    setTimeout(() => {
      setError(false)
    }, 2500)

    return (
      <h2 className='bg-danger text-center text-white mt-5 p-3 rounded'>
        TODOS LOS CAMPOS SON OBLIGATORIOS!!!
      </h2>
    )
  }

  return (
    <section>
      {error && dataError()}

      <div className='card mt-5 p-4'>
        <form onSubmit={handleSubmit}>
          <h2 className='text-center mb-4'>Administrador de citas</h2>
          <div className='row justify-content-center'>
            <div className='col-md-4 form-group'>
              <label>No. de Cuenta</label>
              <select
                className='form-control'
                name='nCta'
                value={nCta}
                onChange={handleChange}
              >
                <option value=''>-- seleccione la cuenta --</option>
                <option value='Kevin Lopez'>61811547</option>
                <option value='Leonardo Muñoz'>61451081</option>
                <option value='Héctor Henríquez'>61811012</option>
                <option value='Jonathan Flores'>21751129</option>
              </select>
            </div>
            <div className='col-md-8 form-group'>
              <label>Alumno</label>
              <input
                className='form-control'
                type='text'
                name='alumno'
                value={nCta}
                readOnly='readOnly'
              />
            </div>
          </div>
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
          {getId !== '' && (
            <button
              className='btn btn-outline-danger btn-block mt-2'
              type='submit'
              onClick={() => handleCancelUpdate}
            >
              Cancelar
            </button>
          )}
        </form>
      </div>
    </section>
  )
}

export default Form
