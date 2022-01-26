import React from 'react';
import {CoursePart} from '../types'
import {assertNever} from '../utils'

interface PartProps {
  coursePart: CoursePart
}

const Part = ({coursePart}: PartProps) => {
  switch (coursePart.type) {
    case 'normal':
      return <p>{coursePart.description}</p>
    case 'groupProject':
      return <p>project exercises {" "} {coursePart.exerciseCount}</p>
    case 'submission':
      return (
        <div>
          <p>{coursePart.description}</p>
          <p>submit to {coursePart.exerciseSubmissionLink}</p>
        </div>
      )
    case 'special':
      return (
        <div>
          <p>{coursePart.description}</p>
          required skills: {coursePart.requirements.join(', ')}
        </div>
      )
    default:
      return assertNever(coursePart);
  }
}

export default Part;