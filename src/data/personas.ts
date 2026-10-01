import { UserProfile } from './schemes.ts';

export interface PersonaPreset {
  id: string;
  name: string;
  name_hi: string;
  avatar_emoji: string;
  tagline: string;
  tagline_hi: string;
  badge: string;
  badge_hi: string;
  profile: Omit<UserProfile, 'language'>;
}

export const PERSONA_PRESETS: PersonaPreset[] = [
  {
    id: "ramesh",
    name: "Ramesh Kumar (45)",
    name_hi: "रमेश कुमार (45 वर्ष)",
    avatar_emoji: "👨‍🌾",
    tagline: "Farmer, Uttar Pradesh • ₹1.5 Lakh/yr",
    tagline_hi: "किसान, उत्तर प्रदेश • ₹1.5 लाख वार्षिक",
    badge: "Farmer & Healthcare Focus",
    badge_hi: "किसान व स्वास्थ्य लाभ",
    profile: {
      age: 45,
      state: "Uttar Pradesh",
      income: 150000,
      occupation: "farmer",
      gender: "male",
      category: "obc"
    }
  },
  {
    id: "priya",
    name: "Priya Sharma (19)",
    name_hi: "प्रिया शर्मा (19 वर्ष)",
    avatar_emoji: "👩‍🎓",
    tagline: "College Student, Bihar • ₹80,000/yr",
    tagline_hi: "कॉलेज छात्रा, बिहार • ₹80,000 वार्षिक",
    badge: "SBI, HDFC & Kotak Scholarships",
    badge_hi: "SBI, HDFC व कोटक छात्रवृत्ति",
    profile: {
      age: 19,
      state: "Bihar",
      income: 80000,
      occupation: "student",
      gender: "female",
      category: "obc"
    }
  },
  {
    id: "sunita",
    name: "Sunita Devi (62)",
    name_hi: "सुनीता देवी (62 वर्ष)",
    avatar_emoji: "👵",
    tagline: "Senior Citizen, Delhi • ₹60,000/yr",
    tagline_hi: "बुजुर्ग पेंशनभोगी, दिल्ली • ₹60,000 वार्षिक",
    badge: "Bank Pensions & Senior Care",
    badge_hi: "बैंक पेंशन व वृद्धजन स्वास्थ्य",
    profile: {
      age: 62,
      state: "Delhi (NCT)",
      income: 60000,
      occupation: "retired",
      gender: "female",
      category: "sc"
    }
  },
  {
    id: "vikram",
    name: "Vikram Rathore (23)",
    name_hi: "विक्रम राठौड़ (23 वर्ष)",
    avatar_emoji: "👨‍🔧",
    tagline: "Unemployed Youth, Rajasthan • ₹1.8 Lakh/yr",
    tagline_hi: "युवा बेरोजगार, राजस्थान • ₹1.8 लाख वार्षिक",
    badge: "Loans, Skill & Subsidy",
    badge_hi: "उद्योग ऋण व अप्रेंटिसशिप",
    profile: {
      age: 23,
      state: "Rajasthan",
      income: 180000,
      occupation: "unemployed",
      gender: "male",
      category: "ews"
    }
  },
  {
    id: "mohan",
    name: "Mohan Lal (34)",
    name_hi: "मोहन लाल (34 वर्ष)",
    avatar_emoji: "🪚",
    tagline: "Carpenter / Artisan, Madhya Pradesh • ₹1.2 Lakh/yr",
    tagline_hi: "कारीगर/दुकानदार, मध्य प्रदेश • ₹1.2 लाख वार्षिक",
    badge: "PM Vishwakarma & Mudra",
    badge_hi: "विश्वकर्मा व मुद्रा ऋण",
    profile: {
      age: 34,
      state: "Madhya Pradesh",
      income: 120000,
      occupation: "self_employed",
      gender: "male",
      category: "obc"
    }
  }
];
