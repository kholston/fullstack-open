import React from 'react';
import Part from './Part';
import { CoursePart } from '../types';

interface ContentProps {
  parts: CoursePart[]
}

const Content = ({parts}: ContentProps): JSX.Element => {
  return(
    <div>
      {parts.map(part => {
        return(
          <div key={part.name}>
            <h3>{part.name} {part.exerciseCount}</h3>
            <Part coursePart={part}/>
          </div>
        )
      })}
    </div>
  )
};

export default Content;