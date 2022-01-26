import React from 'react';
import { CoursePart } from '../types';

interface TotalProps {
  courses: CoursePart[]
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