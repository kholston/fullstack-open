//  1A
//
// const Header = (props) =>{
//   return (
//     <h1>{props.course}</h1>
//   )
// }

// const Part = (props) =>{
//   return(
//     <p> {props.part.name} {props.part.exercises} </p>
//   )
// }

// const Content = (props) =>{
//   return(
//     <div>
//       <Part part={props.parts[0]}/>
//       <Part part={props.parts[1]}/>
//       <Part part={props.parts[2]}/>
//     </div>
//   )
// }

// const Total = (props) => {
//   const parts = props.parts
//   const exercises = parts.map(part => part.exercises)
//   const total = exercises.reduce((total,val) => total + val)
 
//   return (
//   <p>Number of exercises {total}</p>
//   )
// }


// const App = () => {
//   const course = {
//     name: 'Half Stack application development',
//     parts : [
//       {
//         name: 'Fundamentals of React',
//         exercises: 10
//       },
//       {
//         name: 'Using props to pass data',
//         exercises: 7
//       },
//       {
//         name : 'State of a component',
//         exercises : 14
//       }
//     ]
//   }
//   return (
//     <div>
//       <Header course={course.name}/>
//       <Content parts={course.parts}/>
//       <Total parts={course.parts}/>
//     </div>
//   );
// }


// 1b
//
// const Hello = ({name, age}) =>{
//   const bornYear = () =>  new Date().getFullYear() - age;
  
//   return(
//     <div>
//       <p>
//         Hello {name}, you are {age} years old.
//       </p>
//       <p>So you were probably born in {bornYear()}</p>
//     </div>
//   )
// }

// const App = () => {
//   const name = 'Peter';
//   const age = 10

//   return(
//     <div>
//       <h1>Greetings</h1>
//       <Hello name="Maya" age={ 26 + 10}/>
//       <Hello name={name} age={age} />
//     </div>
//   )
// }

import React , { useState }from 'react';

// 1C
//
// const Display = ({counter}) => ( <div>{counter}</div>);


// const Button = ({text, handleClick}) => (
//   <button onClick={handleClick}>
//     {text}
//   </button>
// )



// const App = () => {
//   const [counter,setCounter] = useState(0);


//   const increaseByOne = () => setCounter(counter + 1)
//   const decreaseByOne = () => setCounter(counter - 1);
//   const setToZero = () => setCounter(0);

//   return(
//     <div>
//       <Display counter={counter}/>
//       <Button text='plus' handleClick={increaseByOne}/>
//       <Button text='zero' handleClick={setToZero}/>
//       <Button text='minus' handleClick={decreaseByOne}/>
//     </div>
//   )
// }

// const History = (props) =>{
//   if(props.allClicks.length === 0){
//     return(
//       <div>
//         the app is used by pressing buttons
//       </div>
//     )
//   }
//   return(
//     <div>
//       button press history: {props.allClicks.join(' ')}
//     </div>
//   )
// }

// const Button = ({handleClick, text}) =>(
//   <button onClick={handleClick}>
//     {text}
//   </button>
// )

// const App = () =>{
//   const [left, setLeft] = useState(0);
//   const [right, setRight] = useState(0);
//   const [allClicks, setAll] = useState([]);

//   const handleLeftClick = () => {
//     setAll(allClicks.concat('L'))
//     setLeft(left + 1)
//   }

//   const handleRightClick = () => {
//     setAll(allClicks.concat('R'))
//     setRight(right + 1)
//   }


//   return(
//     <div>
//       {left}
//       <Button handleClick={handleLeftClick} text='left' />
//       <Button handleClick={handleRightClick} text='right' />
//       {right}
//       <History allClicks={allClicks}/>
//     </div>
//   )
// }

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const Display = ({value}) => (<div>{value}</div>)

const App = () =>{
  const [value, setValue] = useState(10);

  const setToValue = (newValue) => {
    setValue(newValue)
  }
  
  return(
    <div>
      <Display value={value}/>
      <Button handleClick={() => setToValue(1000)} text='thousand'/>
      <Button handleClick={() => setToValue(0)} text='reset'/>
      <Button handleClick={() => setToValue( value + 1)} text='increment'/>
    </div>
  )
}

export default App;
