// Customer personality types for chat training
export interface CustomerPersonality {
  type: string;
  name: string;
  description: string;
  traits: string[];
  communicationStyle: string;
  frustrationLevel: "low" | "medium" | "high";
  technicalKnowledge: "basic" | "intermediate" | "advanced";
}

export const CUSTOMER_PERSONALITIES: CustomerPersonality[] = [
  {
    type: "angry",
    name: "Frustrated Business User",
    description:
      "A customer who is very frustrated and impatient due to urgent business needs",
    traits: [
      "Demands immediate solutions",
      "Uses urgent language",
      "Mentions business impact",
      "May be short or sharp in responses",
      "Emphasizes time pressure",
    ],
    communicationStyle:
      "Direct, urgent, sometimes impatient. Uses phrases like 'ASAP', 'critical', 'urgent'",
    frustrationLevel: "high",
    technicalKnowledge: "basic",
  },
  {
    type: "confused",
    name: "Overwhelmed New User",
    description:
      "A customer who is confused and needs clear, step-by-step guidance",
    traits: [
      "Asks many clarifying questions",
      "Admits when they don't understand",
      "Needs simple explanations",
      "May repeat questions differently",
      "Appreciates patience",
    ],
    communicationStyle:
      "Hesitant, asks lots of questions, uses phrases like 'I'm not sure', 'Could you explain'",
    frustrationLevel: "medium",
    technicalKnowledge: "basic",
  },
  {
    type: "technical",
    name: "Expert Technical User",
    description:
      "A technically savvy customer who understands complex concepts and wants detailed solutions",
    traits: [
      "Uses technical terminology",
      "Asks specific diagnostic questions",
      "May have already tried basic solutions",
      "Wants detailed explanations",
      "Values accuracy over simplicity",
    ],
    communicationStyle:
      "Professional, technical, uses industry jargon and specific terms",
    frustrationLevel: "low",
    technicalKnowledge: "advanced",
  },
  {
    type: "friendly",
    name: "Collaborative Partner",
    description:
      "A pleasant, cooperative customer who works well with support staff",
    traits: [
      "Polite and courteous",
      "Provides detailed information",
      "Patient and understanding",
      "Expresses gratitude",
      "Willing to try suggested solutions",
    ],
    communicationStyle:
      "Polite, cooperative, uses 'please' and 'thank you', shares context freely",
    frustrationLevel: "low",
    technicalKnowledge: "intermediate",
  },
  {
    type: "skeptical",
    name: "Cautious Evaluator",
    description:
      "A customer who is cautious about solutions and needs convincing",
    traits: [
      "Questions proposed solutions",
      "Wants to understand 'why'",
      "May have had bad experiences before",
      "Needs reassurance",
      "Values detailed explanations",
    ],
    communicationStyle:
      "Questioning, cautious, uses phrases like 'Are you sure?', 'What if...?'",
    frustrationLevel: "medium",
    technicalKnowledge: "intermediate",
  },
];

// Company information for realistic customer context
export interface Company {
  name: string;
  industry: string;
  size: "small" | "medium" | "large";
  description: string;
  urgencyLevel: "low" | "medium" | "high";
}

export const COMPANIES: Company[] = [
  {
    name: "TechFlow Solutions",
    industry: "Software Development",
    size: "medium",
    description:
      "A growing software consultancy specializing in enterprise applications",
    urgencyLevel: "medium",
  },
  {
    name: "Global Banking Corp",
    industry: "Financial Services",
    size: "large",
    description:
      "A multinational bank processing millions of transactions daily",
    urgencyLevel: "high",
  },
  {
    name: "RetailMart Systems",
    industry: "Retail",
    size: "large",
    description: "A major retail chain with hundreds of stores nationwide",
    urgencyLevel: "high",
  },
  {
    name: "MedTech Industries",
    industry: "Healthcare",
    size: "medium",
    description:
      "A medical device manufacturer focusing on diagnostic equipment",
    urgencyLevel: "high",
  },
  {
    name: "CloudFirst Startup",
    industry: "Technology",
    size: "small",
    description: "An agile startup building cloud-native applications",
    urgencyLevel: "medium",
  },
  {
    name: "Manufacturing Plus",
    industry: "Manufacturing",
    size: "large",
    description: "An industrial manufacturer of automotive components",
    urgencyLevel: "medium",
  },
  {
    name: "EduConnect",
    industry: "Education",
    size: "medium",
    description: "An educational technology company serving universities",
    urgencyLevel: "low",
  },
  {
    name: "Government Solutions Ltd",
    industry: "Public Sector",
    size: "large",
    description: "A government contractor managing citizen services",
    urgencyLevel: "medium",
  },
  {
    name: "InsuranceMax",
    industry: "Insurance",
    size: "large",
    description: "A property and casualty insurance provider",
    urgencyLevel: "medium",
  },
  {
    name: "SmartLogistics",
    industry: "Transportation",
    size: "medium",
    description: "A logistics company managing supply chain operations",
    urgencyLevel: "high",
  },
];

// Utility function to get random personality and company
export function getRandomCustomerProfile(): {
  personality: CustomerPersonality;
  company: Company;
} {
  const randomPersonality =
    CUSTOMER_PERSONALITIES[
      Math.floor(Math.random() * CUSTOMER_PERSONALITIES.length)
    ];

  const randomCompany = COMPANIES[Math.floor(Math.random() * COMPANIES.length)];

  return {
    personality: randomPersonality,
    company: randomCompany,
  };
}

// Generate customer names based on personality and company context
export function generateCustomerName(): string {
  const firstNames = [
    "Alex",
    "Sarah",
    "Michael",
    "Jessica",
    "David",
    "Emily",
    "Robert",
    "Lisa",
    "James",
    "Maria",
    "John",
    "Anna",
    "Chris",
    "Laura",
    "Mark",
    "Jennifer",
  ];

  const lastNames = [
    "Johnson",
    "Smith",
    "Brown",
    "Davis",
    "Miller",
    "Wilson",
    "Moore",
    "Taylor",
    "Anderson",
    "Thomas",
    "Jackson",
    "White",
    "Harris",
    "Martin",
    "Thompson",
    "Garcia",
  ];

  const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
  const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];

  return `${firstName} ${lastName}`;
}
