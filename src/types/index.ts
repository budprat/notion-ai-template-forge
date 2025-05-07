
export interface TemplateRequest {
  interest: string;
  style: string;
  customInterest?: string;
}

export interface TemplateResult {
  title: string;
  description: string;
  content: string;
  date: string;
}

export type TemplateStyle = 'minimal' | 'professional' | 'colorful' | 'creative' | 'academic';

export interface InterestCategory {
  name: string;
  examples: string[];
}
