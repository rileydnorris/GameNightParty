export interface FamilyFeudTemplate {
  title: string;
  questions: FamilyFeudQuestion[];
}

export interface FamilyFeudQuestion {
  title: string;
  answers: FamilyFeudAnswer[];
}

export interface FamilyFeudAnswer {
  text: string;
  acceptableAnswers: string[];
  value: number;
  answeredByTeamId?: string;
}
