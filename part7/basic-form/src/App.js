import React, {useState} from "react";

const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return{
    type,
    value,
    onChange
  }
}

function App() {
  // const [name, setName] = useState('')
  // const [born, setBorn] = useState('')
  // const [height, setHeight] = useState('')
  const name = useField('text')
  const born = useField('text')
  const height = useField('text')


  return (
    <div>
      <form>
        name:
        <input 
          // type={name.type} 
          // value={name.value}
          // onChange={name.onChange}
          {...name}
        />
        <br />
        birthdate:
        <input 
          // type={born.type}
          // value={born.value}
          // onChange={born.onChange}
          {...born}
        />
        <br />
        height:
        <input 
          // type={height.type}
          // value={height.value}
          // onChange={height.onChange}
          {...height}
        />
      </form>
      <div>
        {name.value} {born.value} {height.value}
      </div>
    </div>
  );
}

export default App;
