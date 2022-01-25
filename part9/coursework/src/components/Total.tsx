import React from 'react';
import { Course } from '../types';

interface TotalProps {
  courses: Course[]
}

const Total = ({courses}: TotalProps) => {
  return(
    <p>
      Number of exercises {" "}
      {courses.reduce((carry, part) => carry + part.exerciseCount, 0)}
    </p>
  )
};

export default Total;