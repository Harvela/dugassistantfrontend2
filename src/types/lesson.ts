export interface Milestone {
  id: number;
  title: string;
  content: string;
  completed: boolean;
  evaluation?: {
    questions: Question[];
  };
}

export interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: string;
}

export interface AdditionalContent {
  type: 'video' | 'image' | 'illustration';
  url: string;
  description: string;
}
