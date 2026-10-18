export interface ServiceItem {
  id: string;
  title: string;
  shortDesc: string;
  badge: string;
  iconName: string;
  deliverables: string[];
  turnaround: string;
  idealFor: string;
  features: string[];
  metricFocus: string;
}

export interface PortfolioProject {
  id: string;
  title: string;
  clientCategory: string;
  deliverableType: string;
  platforms: string[];
  hookHeadline: string;
  synopsis: string;
  visualConcept: string;
  creativeStrategy: string[];
  gradientTheme: {
    from: string;
    to: string;
    accent: string;
  };
  sampleTag: string;
  aspectRatio: string;
  adCopySample: {
    hook: string;
    body: string;
    cta: string;
  };
}

export interface PricingPlan {
  id: string;
  name: string;
  price: number;
  cadence: string;
  badge?: string;
  description: string;
  deliverables: string[];
  highlights: string[];
  idealFor: string;
  turnaroundTime: string;
  revisionPolicy: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: 'General' | 'Process' | 'AI & Commercial Rights' | 'Pricing';
}

export interface ContactFormData {
  name: string;
  businessName: string;
  email: string;
  websiteOrSocial: string;
  service: string;
  estimatedBudget: string;
  projectDetails: string;
  honeypot?: string;
  formStartTime?: number;
}
