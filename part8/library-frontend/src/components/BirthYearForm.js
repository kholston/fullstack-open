import React, { useState, useEffect}  from 'react'
import { useMutation } from '@apollo/client'
import { EDIT_BIRTH_YEAR } from '../queries'


const BirthYearForm = ({notify}) => {
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')

  const [changeBirthYear, result] = useMutation(EDIT_BIRTH_YEAR)

  const submit = (event) => {
    event.preventDefault()

    changeBirthYear({variables: {name, born}})
    notify([{message: 'birth year changed succesfully', color: 'green'}])

    setName('')
    setBorn('')
  }

  useEffect(() => {
    if(result.data && result.data.editAuthor === null){
      notify([{message: 'author not found'}])
    }
  }, [result.data]) // eslint-disable-line


  return(
    <div>
      <h2>set birth year</h2>
      <form onSubmit={submit}>
        <div>
         name <input value={name} onChange={({target}) => setName(target.value)} />
        </div>
        <div>
          born <input type='number' value={born} onChange={({target}) => setBorn(target.value)} />
        </div>
        <button type='submit'>set birth year</button>
      </form>
    </div>
  )

}

export default BirthYearForm