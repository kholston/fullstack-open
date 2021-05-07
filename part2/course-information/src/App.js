import React from 'react'

const Header = ({course}) =>{
  return (
    <h1>{course.name}</h1>
  )
}

const Part = ({part}) =>{
  return(
    <p> {part.name} {part.exercises} </p>
  )
}

const Content = ({course}) =>{
  return(
    <div>
      {course.parts.map(part => <Part key={part.id} part={part}/>)}
    </div>
  )
}

const Course = ({course}) => {
  return(
    <div>
      <Header course={course}/>
      <Content course={course}/>
      <Total course={course}/>
    </div>
  )
}

const Total = ({course}) => {
  const exercises = course.parts.map(part => part.exercises)
  const total = exercises.reduce((total,val) => total + val)
 
  return (
  <h4>Number of exercises {total}</h4>
  )
}


const App = () => {
  const courses = [
    {
      id: 1,
      name: 'Half Stack application development',
      parts : [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name : 'State of a component',
          exercises : 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises : 11,
          id: 4
        }
      ]
    },
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]
  return (
    <div>
      {courses.map(course => <Course key={course.id} course={course}/>)}
    </div>
  );
}

export default App;
