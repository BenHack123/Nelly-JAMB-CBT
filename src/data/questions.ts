import { Question } from '../types';
import { englishQuestions } from './questions-english';
import { physicsQuestions } from './questions-physics';
import { biologyQuestions } from './questions-biology';
import { chemistryQuestions } from './questions-chemistry';

export const allQuestions: Question[] = [
  ...englishQuestions,
  ...physicsQuestions,
  ...biologyQuestions,
  ...chemistryQuestions,
];

export function getQuestionsBySubject(subject: string): Question[] {
  return allQuestions.filter(q => q.subject === subject);
}

export { englishQuestions, physicsQuestions, biologyQuestions, chemistryQuestions };
