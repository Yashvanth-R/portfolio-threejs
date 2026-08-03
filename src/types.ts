export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: 'Full Stack' | 'Microservices' | 'Front-end' | 'AI & ML';
  description: string;
  longDescription: string;
  technologies: string[];
  metrics: string[];
  githubUrl?: string;
  liveUrl?: string;
  image: string;
  architectureNodes?: {
    id: string;
    label: string;
    type: 'client' | 'api' | 'queue' | 'database' | 'service';
    description: string;
  }[];
  architectureEdges?: {
    from: string;
    to: string;
    label: string;
  }[];
  interactiveType?: 'form-builder' | 'microservice-queue' | 'notes-app' | 'currency-store';
}

export interface WorkExperience {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  type: string;
  summary: string;
  bulletPoints: string[];
  technologies: string[];
  keyAchievement: string;
}

export interface Education {
  degree: string;
  institution: string;
  location: string;
  period: string;
  score: string;
  scoreLabel: string;
  details: string[];
}

export interface SkillCategory {
  category: string;
  iconName: string;
  description: string;
  skills: {
    name: string;
    level: number; // 0 - 100
    experience: string;
    featured?: boolean;
    tagline: string;
  }[];
}

export interface RelocationInfo {
  preferredCities: string[];
  targetCountries: string[];
  visaStatus: string;
  relocationTimeline: string;
  languages: { language: string; level: string }[];
  workModel: string[];
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
}
