import React, { useState } from 'react';

const Header = ({title}) => (<h1>{title}</h1>)

const Display = ({name, value}) => (<p>{name} {value}</p>)

const Button = ({handleClick, text}) => (
  <button onClick={handleClick}>{text}</button>  
)

const Statistics = (props) =>{
  const {good,neutral,bad,all} = props.stats;
  
  const getAverage = () => {
    if(all === 0) return 'Give Feedback To See Average';
    return ((good + (-bad) )/all)
  }
  
  const getPositive = () =>{
    if(all === 0) return 'Give Feedback To See Percentage';
    return (((good * 100)/all) + '%');
  }
  
  return (
    <div>
      <Header title='Statistics'/>
      
      <Display name='Good' value={good}/>
      <Display name='Neutral' value={neutral}/>
      <Display name='Bad' value={bad}/>
      <Display name='All' value={all}/>
      <Display name='Average' value={getAverage()}/>
      <Display name='Positive' value={getPositive()}/>
    </div>
  )
}

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)
  
  const handleGoodClick = () =>{
    setGood(good + 1)
    setAll(all + 1)
  }
  const handleNeutralClick = () =>{
    setNeutral(neutral + 1)
    setAll(all+ 1)
  }
  const handleBadClick = () =>{
    setBad(bad + 1)
    setAll(all+ 1)
  }
  
 

  
  return (
    <div>
      <Header title='Give Feedback'/>
      
      <Button handleClick={handleGoodClick} text='Good'/>
      <Button handleClick={handleNeutralClick} text='Neutral'/>
      <Button handleClick={handleBadClick} text='Bad'/>
      <Statistics stats={{good,neutral,bad,all}}/>
      
    </div>
  );
}

export default App;
