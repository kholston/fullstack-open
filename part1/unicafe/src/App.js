import React, { useState } from 'react';

const Header = ({title}) => (<h1>{title}</h1>)

const Statistic = ({text, value}) => (<tr><td>{text}</td><td>{value}</td></tr>)

const Button = ({handleClick, text}) => (
  <button onClick={handleClick}>{text}</button>  
)

const Statistics = ({stats}) =>{
  const {good,neutral,bad,all} = stats;
  
  const getAverage = () => ((good + (-bad) )/all)
  
  const getPositive = () => (((good * 100)/all) + '%')
  
  if (all === 0) return (<p>No feedback given</p>);

  return (
    <table>
      <tbody>
        <Statistic text='Good:' value={good}/>
        <Statistic text='Neutral:' value={neutral}/>
        <Statistic text='Bad:' value={bad}/>
        <Statistic text='All:' value={all}/>
        <Statistic text='Average:' value={getAverage()}/>
        <Statistic text='Positive:' value={getPositive()}/>
      </tbody>
    </table>
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
      
      <Header title='Statistics'/>
      
      <Statistics stats={{good,neutral,bad,all}}/> 
      
    </div>
  );
}

export default App;
