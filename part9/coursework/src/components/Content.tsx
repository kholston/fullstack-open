import React from 'react';
import { Course } from '../types';

interface ContentProps {
  courses: Course[]
}

const Content = ({courses}: ContentProps): JSX.Element => {
  return(
    <div>
      {courses.map(course => {
        return(
          <p key={course.name}>
            {course.name} {course.exerciseCount}
          </p>
        )
      })}
    </div>
  )
};

export default Content;