import React, { useState } from 'react';

const Header = ({title}) => (<h1>{title}</h1>)

const Display = ({name, value}) => (<p>{name} {value}</p>)

const Button = ({handleClick, text}) => (
  <button onClick={handleClick}>{text}</button>  
)

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0)
  
  const handleGoodClick = () =>{
    setGood(good + 1)
  }
  const handleNeutralClick = () =>{
    setNeutral(neutral + 1)
  }
  const handleBadClick = () =>{
    setBad(bad + 1)
  }
  
  return (
    <div>
      <Header title='Give Feedback'/>
      
      <Button handleClick={handleGoodClick} text='Good'/>
      <Button handleClick={handleNeutralClick} text='Neutral'/>
      <Button handleClick={handleBadClick} text='Bad'/>
      
      <Header title='Statistics'/>
      
      <Display name='Good' value={good}/>
      <Display name='Neutral' value={neutral}/>
      <Display name='Bad' value={bad}/>
    </div>
  );
}

export default App;
