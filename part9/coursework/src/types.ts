interface CoursePartBase {
  name: string;
  exerciseCount: number;
  type: string;
}

interface CourseDescriptionPartBase extends CoursePartBase{
  description: string;
}

interface CourseNormalPart extends CourseDescriptionPartBase {
  type: 'normal';
}

interface CourseProjectPart extends CoursePartBase {
  type: 'groupProject';
  groupProjectCount: number
}

interface CourseSubmissionPart extends CourseDescriptionPartBase {
  type: 'submission';
  exerciseSubmissionLink: string;
}

interface CourseRequirementsPart extends CourseDescriptionPartBase {
  type: 'special'
  requirements: string[]
}

export type CoursePart = CourseNormalPart | CourseProjectPart | CourseSubmissionPart | CourseRequirementsPart ; 