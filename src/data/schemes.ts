export interface EligibilityRule {
  min_age: number;
  max_age: number;
  max_income?: number; // annual family income in INR, null or undefined means no ceiling
  states: string[]; // ['all'] or state names like 'Uttar Pradesh', 'Bihar', etc.
  occupations: string[]; // ['all', 'farmer', 'student', 'self_employed', 'unemployed', 'retired', 'homemaker', 'salaried']
  genders: string[]; // ['all', 'male', 'female', 'other']
  categories: string[]; // ['all', 'general', 'obc', 'sc', 'st', 'ews']
  special_condition_en?: string;
  special_condition_hi?: string;
}

export interface Scheme {
  id: string;
  name: string;
  name_hi: string;
  ministry: string;
  ministry_hi: string;
  category: 'agriculture' | 'education' | 'healthcare' | 'social_security' | 'women_child' | 'business_employment' | 'housing' | 'pension';
  sector?: 'government' | 'private';
  provider_type?: 'central_government' | 'state_government' | 'bank' | 'csr_trust' | 'corporate_foundation' | 'private_sector';
  target_group?: 'student' | 'elder' | 'parent' | 'general' | 'farmer' | 'women';
  benefit_summary: string;
  benefit_summary_hi: string;
  benefit_amount_tag: string;
  benefit_amount_tag_hi: string;
  eligibility: EligibilityRule;
  documents: string[];
  documents_hi: string[];
  apply_steps: string[];
  apply_steps_hi: string[];
  apply_link: string;
  source: string;
  last_verified: string;
  csc_supported: boolean;
  tags: string[];
}

import { STATE_SCHEMES } from './stateSchemes.ts';

const BASE_SCHEMES: Scheme[] = [
  {
    id: "scheme_pm_kisan",
    name: "PM-KISAN (Pradhan Mantri Kisan Samman Nidhi)",
    name_hi: "पीएम-किसान (प्रधानमंत्री किसान सम्मान निधि)",
    ministry: "Ministry of Agriculture and Farmers Welfare",
    ministry_hi: "कृषि एवं किसान कल्याण मंत्रालय",
    category: "agriculture",
    benefit_summary: "Direct income support of ₹6,000 per year transferred directly to bank account in 3 equal four-monthly installments of ₹2,000.",
    benefit_summary_hi: "बैंक खाते में ₹6,000 प्रति वर्ष की प्रत्यक्ष आय सहायता, ₹2,000 की 3 समान किस्तों में सीधे डीबीटी (DBT) द्वारा।",
    benefit_amount_tag: "₹6,000 / year",
    benefit_amount_tag_hi: "₹6,000 / वर्ष",
    eligibility: {
      min_age: 18,
      max_age: 100,
      max_income: 300000,
      states: ["all"],
      occupations: ["farmer"],
      genders: ["all"],
      categories: ["all"],
      special_condition_en: "Must own cultivable agricultural landholding in family's name",
      special_condition_hi: "परिवार के नाम पर खेती योग्य भूमि का भूलेख होना आवश्यक है"
    },
    documents: [
      "Aadhaar Card linked with active mobile number",
      "Land ownership documents (Khasra / Khatauni / Land RoR)",
      "Bank Account Passbook (Aadhaar Seeded)",
      "Income Certificate / Self declaration"
    ],
    documents_hi: [
      "आधार कार्ड (सक्रिय मोबाइल नंबर से लिंक)",
      "जमीन के मालिकाना दस्तावेज (खसरा / खतौनी / भू-अभिलेख)",
      "बैंक पासबुक (आधार सीडेड / डीबीटी समर्थित)",
      "आय प्रमाण पत्र / स्व-घोषणा पत्र"
    ],
    apply_steps: [
      "Visit official portal pmkisan.gov.in or nearest CSC / Village Panchayat office.",
      "Click on 'Farmers Corner' -> 'New Farmer Registration'.",
      "Enter Aadhaar number and select Rural or Urban Farmer Registration.",
      "Fill landholding khata/khasra details and upload scanned land records.",
      "Submit and receive application reference number for status tracking."
    ],
    apply_steps_hi: [
      "आधिकारिक पोर्टल pmkisan.gov.in पर जाएं या नजदीकी सीएससी (CSC) केंद्र जाएं।",
      "'Farmers Corner' -> 'New Farmer Registration' पर क्लिक करें।",
      "आधार संख्या दर्ज करें और ग्रामीण/शहरी किसान पंजीकरण चुनें।",
      "जमीन की खतौनी/खसरा विवरण भरें और दस्तावेज अपलोड करें।",
      "जमा करें और आवेदन संख्या संभाल कर रखें।"
    ],
    apply_link: "https://pmkisan.gov.in/",
    source: "https://www.myscheme.gov.in/schemes/pm-kisan",
    last_verified: "2026-09-15",
    csc_supported: true,
    tags: ["farmer", "financial support", "agriculture", "dbt"]
  },
  {
    id: "scheme_pm_jay",
    name: "Ayushman Bharat PM-JAY (Pradhan Mantri Jan Arogya Yojana)",
    name_hi: "आयुष्मान भारत पीएम-जेएवाई (मुफ्त स्वास्थ्य सुरक्षा)",
    ministry: "Ministry of Health and Family Welfare / NHA",
    ministry_hi: "स्वास्थ्य एवं परिवार कल्याण मंत्रालय / राष्ट्रीय स्वास्थ्य प्राधिकरण",
    category: "healthcare",
    benefit_summary: "Cashless secondary and tertiary hospitalization cover of up to ₹5,00,000 per family per year across 28,000+ empanelled hospitals.",
    benefit_summary_hi: "सूचीबद्ध सरकारी व निजी अस्पतालों में प्रति परिवार ₹5,00,000 प्रति वर्ष तक का पूर्णतः कैशलेस व निःशुल्क इलाज।",
    benefit_amount_tag: "₹5,00,000 Cover / family / year",
    benefit_amount_tag_hi: "₹5,00,000 मुफ्त इलाज / परिवार / वर्ष",
    eligibility: {
      min_age: 0,
      max_age: 120,
      max_income: 250000,
      states: ["all"],
      occupations: ["all"],
      genders: ["all"],
      categories: ["all"],
      special_condition_en: "Family identified under SECC database, NFSA ration card, or state low-income lists",
      special_condition_hi: "परिवार एसईसीसी (SECC) या राशन कार्ड सूची / कम आय वर्ग में शामिल होना चाहिए"
    },
    documents: [
      "Aadhaar Card of all family members",
      "Ration Card (NFSA / BPL / Antyodaya) or Family Register",
      "Active Mobile number for OTP verification"
    ],
    documents_hi: [
      "परिवार के सभी सदस्यों का आधार कार्ड",
      "राशन कार्ड (बीपीएल / पात्र गृहस्थी / अंत्योदय) या परिवार रजिस्टर",
      "ओटीपी सत्यापन के लिए मोबाइल नंबर"
    ],
    apply_steps: [
      "Check eligibility at beneficiary.nha.gov.in using Mobile or Ration Card number.",
      "Visit any Empanelled Health Care Provider (EHCP) hospital or nearest CSC/Arogya Mitra desk.",
      "Complete instant e-KYC using Biometrics (fingerprint or iris) or Aadhaar OTP.",
      "Download the PVC/Digital Ayushman Golden Card for cashless hospital treatments."
    ],
    apply_steps_hi: [
      "beneficiary.nha.gov.in पर राशन कार्ड या मोबाइल नंबर से अपनी पात्रता जांचें।",
      "नजदीकी सरकारी/सूचीबद्ध निजी अस्पताल में आरोग्य मित्र केंद्र या सीएससी केंद्र जाएं।",
      "आधार बायोमेट्रिक (फिंगरप्रिंट) या ओटीपी के जरिए ई-केवाईसी (e-KYC) पूरा करें।",
      "तुरंत आयुष्मान गोल्डन कार्ड डाउनलोड करें और कैशलेस इलाज का लाभ लें।"
    ],
    apply_link: "https://beneficiary.nha.gov.in/",
    source: "https://nha.gov.in/PM-JAY",
    last_verified: "2026-09-18",
    csc_supported: true,
    tags: ["health", "hospitalization", "free treatment", "insurance"]
  },
  {
    id: "scheme_pm_ujjwala",
    name: "Pradhan Mantri Ujjwala Yojana (PMUY 2.0)",
    name_hi: "प्रधानमंत्री उज्ज्वला योजना (मुफ्त गैस कनेक्शन व सब्सिडी)",
    ministry: "Ministry of Petroleum and Natural Gas",
    ministry_hi: "पेट्रोलियम एवं प्राकृतिक गैस मंत्रालय",
    category: "women_child",
    benefit_summary: "Deposit-free LPG cylinder connection, free first cylinder refill, free hotplate stove, and ongoing ₹300 targeted subsidy per refill.",
    benefit_summary_hi: "मुफ्त एलपीजी गैस कनेक्शन, पहला भरा सिलेंडर और चूल्हा निःशुल्क, साथ ही ₹300 प्रति रिफिल लक्षित सब्सिडी।",
    benefit_amount_tag: "Free Connection + ₹300 Subsidy/Refill",
    benefit_amount_tag_hi: "मुफ्त कनेक्शन + ₹300 रिफिल सब्सिडी",
    eligibility: {
      min_age: 18,
      max_age: 100,
      max_income: 250000,
      states: ["all"],
      occupations: ["all"],
      genders: ["female"],
      categories: ["all"],
      special_condition_en: "Applicant must be an adult woman from a poor household having no existing LPG connection",
      special_condition_hi: "आवेदक महिला होनी चाहिए और घर में पहले से कोई गैस कनेक्शन नहीं होना चाहिए"
    },
    documents: [
      "Aadhaar Card of the woman applicant and adult family members",
      "Ration card confirming household composition",
      "Bank Account number and IFSC code linked with Aadhaar",
      "Self-declaration / Address proof for migrant workers"
    ],
    documents_hi: [
      "महिला आवेदक व परिवार के वयस्क सदस्यों का आधार कार्ड",
      "राशन कार्ड (परिवार के सदस्यों के नाम सहित)",
      "बैंक पासबुक (आधार से लिंक खाता एवं IFSC कोड)",
      "प्रवासी श्रमिकों के लिए स्व-प्रमाणित निवास घोषणा पत्र"
    ],
    apply_steps: [
      "Visit pmuy.gov.in or nearest Indane / BharatGas / HP Gas agency.",
      "Select LPG distributor and submit Ujjwala 2.0 application online or offline.",
      "Submit Aadhaar, family ration card, and bank account details.",
      "Distributor verifies physical address and delivers LPG connection with gas stove."
    ],
    apply_steps_hi: [
      "pmuy.gov.in पर जाएं या नजदीकी इंडेन/भारत गैस/एचपी गैस एजेंसी पर जाएं।",
      "उज्ज्वला 2.0 आवेदन फॉर्म भरें (ऑनलाइन या एजेंसी काउंटर पर)।",
      "आधार कार्ड, राशन कार्ड और बैंक पासबुक की प्रति जमा करें।",
      "एजेंसी द्वारा सत्यापन के पश्चात गैस चूल्हा और भरा हुआ सिलेंडर तुरंत प्राप्त करें।"
    ],
    apply_link: "https://www.pmuy.gov.in/",
    source: "https://www.myscheme.gov.in/schemes/pmuy",
    last_verified: "2026-09-12",
    csc_supported: true,
    tags: ["women", "clean fuel", "lpg subsidy", "household"]
  },
  {
    id: "scheme_sukanya_samriddhi",
    name: "Sukanya Samriddhi Yojana (SSY)",
    name_hi: "सुकन्या समृद्धि योजना (बालिका भविष्य सुरक्षा)",
    ministry: "Ministry of Finance",
    ministry_hi: "वित्त मंत्रालय",
    category: "women_child",
    benefit_summary: "High sovereign guaranteed tax-free return of 8.2% p.a., 80C tax deduction, financial security for daughter's higher education and marriage.",
    benefit_summary_hi: "8.2% वार्षिक उच्चतम कर-मुक्त ब्याज, आयकर धारा 80C छूट, और बेटी की उच्च शिक्षा व शादी के लिए मजबूत आर्थिक बचत।",
    benefit_amount_tag: "8.2% Interest + EEE Tax-Free",
    benefit_amount_tag_hi: "8.2% ब्याज + सम्पूर्ण कर छूट",
    eligibility: {
      min_age: 0,
      max_age: 10,
      max_income: 10000000,
      states: ["all"],
      occupations: ["all"],
      genders: ["female"],
      categories: ["all"],
      special_condition_en: "Opened for girl child up to 10 years of age by natural or legal guardian",
      special_condition_hi: "10 वर्ष तक की आयु की बालिका के नाम पर माता-पिता या अभिभावक द्वारा खाता खोला जा सकता है"
    },
    documents: [
      "Girl child's Birth Certificate issued by municipal authority / hospital",
      "Aadhaar Card and PAN card of parent / legal guardian",
      "Passport size photographs of child and parent",
      "Address Proof (Electricity bill / Voter ID / Aadhaar)"
    ],
    documents_hi: [
      "बालिका का जन्म प्रमाण पत्र (नगर पालिका / अस्पताल द्वारा जारी)",
      "माता-पिता / अभिभावक का आधार कार्ड और पैन कार्ड",
      "बच्ची और अभिभावक की पासपोर्ट साइज फोटो",
      "निवास प्रमाण पत्र (आधार / बिजली बिल / राशन कार्ड)"
    ],
    apply_steps: [
      "Visit any Post Office branch or authorized nationalized bank (SBI, PNB, BoB, etc.).",
      "Collect SSY Account Opening Form (Form-1).",
      "Attach girl child's birth certificate and guardian KYC documents.",
      "Deposit initial minimum amount of ₹250 (up to ₹1.5 lakh/yr permitted).",
      "Receive official SSY passbook with printed account details."
    ],
    apply_steps_hi: [
      "किसी भी नजदीकी डाकघर (Post Office) या अधिकृत बैंक (SBI, PNB आदि) जाएं।",
      "सुकन्या समृद्धि खाता खोलने का फॉर्म (Form-1) प्राप्त करें।",
      "बालिका का जन्म प्रमाण पत्र और माता-पिता के आधार/पैन की कॉपी संलग्न करें।",
      "न्यूनतम ₹250 जमा करके खाता शुरू करें (सालाना ₹1.5 लाख तक जमा कर सकते हैं)।",
      "सुकन्या समृद्धि पासबुक प्राप्त करें।"
    ],
    apply_link: "https://www.indiapost.gov.in/Financial/Pages/Content/Sukanya-Samriddhi-Account.aspx",
    source: "https://www.myscheme.gov.in/schemes/ssy",
    last_verified: "2026-09-20",
    csc_supported: false,
    tags: ["girl child", "savings", "education fund", "post office"]
  },
  {
    id: "scheme_nsp_post_matric",
    name: "Post Matric Scholarship for SC/ST/OBC Students",
    name_hi: "पोस्ट मैट्रिक छात्रवृत्ति (एससी/एसटी/ओबीसी विद्यार्थी)",
    ministry: "Ministry of Social Justice and Empowerment / Tribal Affairs",
    ministry_hi: "सामाजिक न्याय एवं अधिकारिता मंत्रालय / जनजातीय कार्य मंत्रालय",
    category: "education",
    benefit_summary: "100% reimbursement of non-refundable tuition fees plus monthly maintenance allowance up to ₹13,500/year for Class 11, 12, diploma, degree & professional courses.",
    benefit_summary_hi: "कॉलेज, डिग्री, डिप्लोमा व 11वीं-12वीं की पूरी शिक्षण फीस प्रतिपूर्ति और ₹13,500 तक का वार्षिक भरण-पोषण भत्ता।",
    benefit_amount_tag: "Full Tuition + ₹13,500 Maintenance/yr",
    benefit_amount_tag_hi: "पूरी फीस वापसी + ₹13,500 वार्षिक भत्ता",
    eligibility: {
      min_age: 15,
      max_age: 35,
      max_income: 250000,
      states: ["all"],
      occupations: ["student"],
      genders: ["all"],
      categories: ["sc", "st", "obc"],
      special_condition_en: "Pursuing post-matriculation or post-secondary courses in recognized institutions",
      special_condition_hi: "मान्यता प्राप्त कॉलेज, विश्वविद्यालय या आईटीआई/पॉलिटेक्निक में नामांकित होना चाहिए"
    },
    documents: [
      "Aadhaar Card linked to active bank account",
      "Caste Certificate issued by authorized revenue authority",
      "Income Certificate (annual family income under ₹2.5 Lakh)",
      "Previous Year Marksheet (Class 10/12/Semester)",
      "Fee Receipt & College Bonafide Certificate"
    ],
    documents_hi: [
      "आधार कार्ड (डीबीटी बैंक खाते से लिंक)",
      "सक्षम अधिकारी (तहसीलदार/एसडीएम) द्वारा जारी जाति प्रमाण पत्र",
      "आय प्रमाण पत्र (पारिवारिक आय ₹2.5 लाख से कम)",
      "पिछली कक्षा की अंकतालिका (10वीं/12वीं/सेमेस्टर)",
      "कॉलेज शुल्क रसीद व बोनाफाइड सर्टिफिकेट"
    ],
    apply_steps: [
      "Visit scholarships.gov.in (National Scholarship Portal - NSP).",
      "Register via One-Time Registration (OTR) with Aadhaar and Face Auth / OTP.",
      "Select scheme under Ministry of Social Justice / Tribal Affairs / Minority.",
      "Fill academic course details, upload fee receipt and caste certificate.",
      "Institute Nodal Officer verifies form online, then funds are credited via DBT."
    ],
    apply_steps_hi: [
      "राष्ट्रीय छात्रवृत्ति पोर्टल scholarships.gov.in पर जाएं।",
      "आधार के साथ वन-टाइम रजिस्ट्रेशन (OTR) पूरा करें।",
      "पोस्ट मैट्रिक स्कॉलरशिप योजना चुनें और आवेदन पत्र भरें।",
      "पिछली अंकतालिका, जाति प्रमाण पत्र और कॉलेज फीस रसीद अपलोड करें।",
      "कॉलेज सत्यापन के बाद राशि सीधे बैंक खाते में आ जाती है।"
    ],
    apply_link: "https://scholarships.gov.in/",
    source: "https://www.myscheme.gov.in/schemes/pms-sc",
    last_verified: "2026-09-14",
    csc_supported: true,
    tags: ["student", "scholarship", "higher education", "fee waiver"]
  },
  {
    id: "scheme_central_sector_scholarship",
    name: "Central Sector Scholarship for College & University Students",
    name_hi: "केंद्रीय क्षेत्रीय छात्रवृत्ति (कॉलेज एवं विश्वविद्यालय छात्र)",
    ministry: "Department of Higher Education, Ministry of Education",
    ministry_hi: "उच्च शिक्षा विभाग, शिक्षा मंत्रालय",
    category: "education",
    benefit_summary: "Direct financial grant of ₹12,000 per year at Graduation level (for 3 years) and ₹20,000 per year at Post Graduation level for meritorious students.",
    benefit_summary_hi: "मेधावी छात्रों को स्नातक स्तर पर ₹12,000 प्रति वर्ष (3 वर्ष) तथा स्नातकोत्तर स्तर पर ₹20,000 प्रति वर्ष की सीधी छात्रवृत्ति।",
    benefit_amount_tag: "₹12,000 - ₹20,000 / year",
    benefit_amount_tag_hi: "₹12,000 - ₹20,000 / वर्ष",
    eligibility: {
      min_age: 17,
      max_age: 26,
      max_income: 450000,
      states: ["all"],
      occupations: ["student"],
      genders: ["all"],
      categories: ["all"],
      special_condition_en: "Scored above 80th percentile in relevant stream in Class 12 board examination",
      special_condition_hi: "12वीं बोर्ड परीक्षा में 80 परसेंटाइल से अधिक अंक प्राप्त किए हों"
    },
    documents: [
      "Class 12th Board Marksheet and Passing Certificate",
      "Family Income Certificate (under ₹4.5 Lakh per annum)",
      "Aadhaar Card and Student Bank Account Details",
      "College Admission Slip / Fee Challan / Bonafide"
    ],
    documents_hi: [
      "12वीं कक्षा की अंकतालिका और उत्तीर्ण प्रमाण पत्र",
      "पारिवारिक आय प्रमाण पत्र (सालाना ₹4.5 लाख से कम)",
      "विद्यार्थी का आधार कार्ड और बैंक खाता विवरण",
      "कॉलेज में प्रवेश रसीद / बोनाफाइड प्रमाण पत्र"
    ],
    apply_steps: [
      "Log in to National Scholarship Portal (NSP) at scholarships.gov.in.",
      "Choose 'Department of Higher Education' -> Central Sector Scheme.",
      "Enter Class 12 Board Roll number, year of passing, and board name.",
      "Provide enrolled college course details and submit application.",
      "College approves and direct scholarship transfers begin every academic year."
    ],
    apply_steps_hi: [
      "scholarships.gov.in पर लॉगिन करें।",
      "'Department of Higher Education' -> Central Sector Scheme चुनें।",
      "12वीं बोर्ड का रोल नंबर, उत्तीर्ण वर्ष और बोर्ड का नाम भरें।",
      "वर्तमान कॉलेज और पाठ्यक्रम विवरण भरकर फॉर्म सबमिट करें।",
      "कॉलेज अप्रूवल के बाद राशि सीधे बैंक खाते में क्रेडिट होती है।"
    ],
    apply_link: "https://scholarships.gov.in/",
    source: "https://www.myscheme.gov.in/schemes/cs-cus",
    last_verified: "2026-09-10",
    csc_supported: true,
    tags: ["scholarship", "merit", "college", "degree", "education"]
  },
  {
    id: "scheme_pm_fasal_bima",
    name: "PM Fasal Bima Yojana (PMFBY)",
    name_hi: "प्रधानमंत्री फसल बीमा योजना (कम प्रीमियम पर फसल सुरक्षा)",
    ministry: "Ministry of Agriculture and Farmers Welfare",
    ministry_hi: "कृषि एवं किसान कल्याण मंत्रालय",
    category: "agriculture",
    benefit_summary: "Comprehensive risk insurance for crop loss due to drought, flood, pests, or natural calamities at very low premium (2% Kharif, 1.5% Rabi).",
    benefit_summary_hi: "सूखा, बाढ़, ओलावृष्टि या कीटों से फसल नष्ट होने पर पूरा मुआवजा, मात्र 1.5% से 2% के नाममात्र प्रीमियम पर।",
    benefit_amount_tag: "Up to 100% Crop Value Covered",
    benefit_amount_tag_hi: "100% फसल नुकसान भरपाई",
    eligibility: {
      min_age: 18,
      max_age: 100,
      max_income: 10000000,
      states: ["all"],
      occupations: ["farmer"],
      genders: ["all"],
      categories: ["all"],
      special_condition_en: "Farmers growing notified crops in notified areas (both loanee and non-loanee)",
      special_condition_hi: "अधिसूचित क्षेत्र में अधिसूचित फसल बोने वाले सभी किसान (ऋणी व गैर-ऋणी दोनों)"
    },
    documents: [
      "Land Record Documents (Khasra / Khatauni / Jamabandi)",
      "Sowing Certificate / Patwari crop verification report",
      "Aadhaar Card and Bank Passbook (linked with NPCI/Aadhaar)",
      "Tenant / Sharecropper agreement (if applicable)"
    ],
    documents_hi: [
      "जमीन के कागजात (खसरा/खतौनी/जमाबंदी नकल)",
      "फसल बुवाई प्रमाण पत्र (पटवारी/ग्राम प्रधान द्वारा सत्यापित)",
      "आधार कार्ड और बैंक पासबुक की प्रति",
      "बटाईदार/किरायेदार अनुबंध (यदि लागू हो)"
    ],
    apply_steps: [
      "Visit pmfby.gov.in or nearest Common Service Centre (CSC) / Bank branch before crop cut-off date.",
      "Click 'Farmer Corner' and register or log in with mobile number.",
      "Select State, Crop Season (Kharif/Rabi), Year, and Scheme name.",
      "Enter land survey numbers and area sown, pay small subsidized farmer premium.",
      "Keep policy receipt; claim claims directly via Crop Insurance App if damage occurs."
    ],
    apply_steps_hi: [
      "फसल बुवाई की अंतिम तिथि से पहले pmfby.gov.in या नजदीकी सीएससी/बैंक शाखा जाएं।",
      "'Farmer Corner' पर क्लिक करके अपना मोबाइल नंबर दर्ज करें।",
      "राज्य, फसल का मौसम (खरीफ/रबी), वर्ष और फसल का चयन करें।",
      "खसरा संख्या और बोया गया रकबा भरकर नाममात्र प्रीमियम का भुगतान करें।",
      "बीमा रसीद प्राप्त करें; नुकसान होने पर 'Crop Insurance' ऐप से 72 घंटे में क्लेम दर्ज करें।"
    ],
    apply_link: "https://pmfby.gov.in/",
    source: "https://www.myscheme.gov.in/schemes/pmfby",
    last_verified: "2026-09-17",
    csc_supported: true,
    tags: ["farmer", "crop insurance", "drought", "flood relief", "agriculture"]
  },
  {
    id: "scheme_kisan_credit_card",
    name: "Kisan Credit Card (KCC) Scheme",
    name_hi: "किसान क्रेडिट कार्ड (सस्ता कृषि व पशुपालन ऋण)",
    ministry: "Ministry of Finance & Ministry of Agriculture",
    ministry_hi: "वित्त मंत्रालय एवं कृषि मंत्रालय",
    category: "agriculture",
    benefit_summary: "Collateral-free instant institutional credit up to ₹1.6 Lakh (up to ₹3 Lakh with 3% prompt repayment incentive, effective interest only 4%).",
    benefit_summary_hi: "मात्र 4% प्रभावी ब्याज दर पर ₹3 लाख तक का आसान कृषि व पशुपालन ऋण, बिना गारंटी ₹1.6 लाख तक।",
    benefit_amount_tag: "Up to ₹3,00,000 at 4% Interest",
    benefit_amount_tag_hi: "₹3,00,000 तक ऋण (मात्र 4% ब्याज)",
    eligibility: {
      min_age: 18,
      max_age: 75,
      max_income: 10000000,
      states: ["all"],
      occupations: ["farmer"],
      genders: ["all"],
      categories: ["all"],
      special_condition_en: "Owner cultivators, tenant farmers, dairy/fisheries/animal husbandry rearers",
      special_condition_hi: "किसान, काश्तकार, डेयरी, मत्स्य पालन और पशुपालक"
    },
    documents: [
      "Land Record copy (Khatauni / Revenue record) duly certified by Tehsildar",
      "Aadhaar Card and PAN card / Form 60",
      "No-dues certificate from nearby bank branches (often waived by banks)",
      "Passport size photos (2 copies)"
    ],
    documents_hi: [
      "तहसीलदार द्वारा प्रमाणित भूलेख/खतौनी की प्रति",
      "आधार कार्ड और पैन कार्ड (या फॉर्म 60)",
      "बैंक का सरल एक-पेज केसीसी आवेदन फॉर्म",
      "2 पासपोर्ट साइज फोटो"
    ],
    apply_steps: [
      "Download standard one-page KCC application form from pmkisan.gov.in or bank portal.",
      "Fill basic personal details, landholding survey numbers, and current crop cycle.",
      "Attach Aadhaar and land document copy.",
      "Submit at the nearest rural/commercial bank branch or CSC.",
      "Bank issues RuPay KCC card within 14 working days for ATM cash withdrawal."
    ],
    apply_steps_hi: [
      "pmkisan.gov.in या बैंक शाखा से एक पेज का सरल केसीसी फॉर्म प्राप्त करें।",
      "अपनी जमीन का विवरण और बोई जाने वाली फसल की जानकारी भरें।",
      "आधार कार्ड और खतौनी संलग्न करें।",
      "नजदीकी बैंक शाखा या सीएससी पर फॉर्म जमा करें।",
      "14 दिनों के भीतर रूपे (RuPay) केसीसी कार्ड प्राप्त करें जिससे एटीएम से कभी भी पैसे निकाल सकते हैं।"
    ],
    apply_link: "https://www.myscheme.gov.in/schemes/kcc",
    source: "https://agricoop.nic.in/en/kcc",
    last_verified: "2026-09-16",
    csc_supported: true,
    tags: ["farmer", "credit", "loan", "rupay", "dairy", "agriculture"]
  },
  {
    id: "scheme_pm_mudra",
    name: "Pradhan Mantri Mudra Yojana (PMMY)",
    name_hi: "प्रधानमंत्री मुद्रा योजना (बिना गारंटी व्यापार ऋण)",
    ministry: "Ministry of Finance",
    ministry_hi: "वित्त मंत्रालय",
    category: "business_employment",
    benefit_summary: "Collateral-free business loans up to ₹10 Lakh (Shishu: up to ₹50k, Kishore: ₹50k-5L, Tarun: ₹5L-10L, Tarun Plus: up to ₹20L) for small entrepreneurs.",
    benefit_summary_hi: "छोटे व्यापारियों व नए उद्यमों के लिए बिना किसी गारंटी के ₹50,000 से ₹10 लाख (शिशु, किशोर, तरुण) तक का आसान व्यापार ऋण।",
    benefit_amount_tag: "Up to ₹10,00,000 Collateral Free",
    benefit_amount_tag_hi: "₹10 लाख तक बिना गारंटी ऋण",
    eligibility: {
      min_age: 18,
      max_age: 65,
      max_income: 10000000,
      states: ["all"],
      occupations: ["self_employed", "unemployed", "farmer"],
      genders: ["all"],
      categories: ["all"],
      special_condition_en: "Non-corporate, non-farm small/micro enterprises and startups in manufacturing, trading, or services",
      special_condition_hi: "दुकानदार, छोटे व्यापारी, सर्विस प्रोवाइडर, कारीगर और अपना नया काम शुरू करने वाले"
    },
    documents: [
      "Proof of Identity (Aadhaar / Voter ID / Driving License)",
      "Proof of Residence (Electricity bill / Ration card / Aadhaar)",
      "Business registration proof / Udyam Registration (if already running)",
      "Quotations of machinery / items to be purchased with loan",
      "Bank statement of last 6 months"
    ],
    documents_hi: [
      "पहचान प्रमाण पत्र (आधार कार्ड / वोटर आईडी / पैन कार्ड)",
      "निवास प्रमाण पत्र (बिजली बिल / आधार कार्ड)",
      "उद्यम आधार (Udyam Registration) या दुकान स्थापना प्रमाण (यदि उपलब्ध हो)",
      "खरीदे जाने वाले सामान/मशीनरी का कोटेशन या बिजनेस प्लान",
      "बैंक खाते का पिछले 6 माह का विवरण"
    ],
    apply_steps: [
      "Visit official UdyamiMitra portal (udyamimitra.in) or visit any commercial bank/NBFC/MFI.",
      "Choose loan category: Shishu (up to ₹50k), Kishore (up to ₹5 Lakh), or Tarun (up to ₹10 Lakh).",
      "Fill the loan application with business proposal / estimated budget.",
      "Submit KYC and quotation documents.",
      "Sanctioned amount is disbursed to bank account along with a Mudra Debit Card."
    ],
    apply_steps_hi: [
      "udyamimitra.in पोर्टल पर जाएं या किसी भी बैंक/एनबीएफसी शाखा में संपर्क करें।",
      "ऋण श्रेणी चुनें: शिशु (₹50,000 तक), किशोर (₹5 लाख तक), या तरुण (₹10 लाख तक)।",
      "अपने काम/व्यापार का विवरण और बजट फॉर्म में भरें।",
      "आधार, पैन और बैंक स्टेटमेंट की प्रति जमा करें।",
      "ऋण स्वीकृत होने पर मुद्रा डेबिट कार्ड (Mudra Card) प्राप्त करें।"
    ],
    apply_link: "https://www.udyamimitra.in/",
    source: "https://www.mudra.org.in/",
    last_verified: "2026-09-19",
    csc_supported: true,
    tags: ["loan", "business", "self employed", "startup", "collateral free"]
  },
  {
    id: "scheme_atal_pension",
    name: "Atal Pension Yojana (APY)",
    name_hi: "अटल पेंशन योजना (गारंटीशुदा मासिक पेंशन)",
    ministry: "Ministry of Finance / PFRDA",
    ministry_hi: "वित्त मंत्रालय / पीएफआरडीए",
    category: "social_security",
    benefit_summary: "Guaranteed lifelong monthly pension of ₹1,000, ₹2,000, ₹3,000, ₹4,000, or ₹5,000 from age 60, with full corpus return to nominee upon death.",
    benefit_summary_hi: "60 वर्ष की आयु से ₹1,000 से ₹5,000 तक की आजीवन गारंटीकृत मासिक पेंशन, मृत्यु के पश्चात नॉमिनी को पूरी संचित राशि की वापसी।",
    benefit_amount_tag: "₹1,000 - ₹5,000 / month Pension",
    benefit_amount_tag_hi: "₹1,000 - ₹5,000 / माह पेंशन",
    eligibility: {
      min_age: 18,
      max_age: 40,
      max_income: 500000,
      states: ["all"],
      occupations: ["all"],
      genders: ["all"],
      categories: ["all"],
      special_condition_en: "Must have an active savings bank account and must not be an income-tax payer",
      special_condition_hi: "बचत बैंक खाता होना चाहिए तथा आयकर दाता नहीं होना चाहिए"
    },
    documents: [
      "Aadhaar Card",
      "Active Savings Bank Account with auto-debit facility",
      "Active Mobile number for transaction alerts",
      "Nominee details (Aadhaar & relationship)"
    ],
    documents_hi: [
      "आधार कार्ड",
      "सक्रिय बचत बैंक खाता (ऑटो-डेबिट सुविधा युक्त)",
      "एसएमएस अलर्ट के लिए मोबाइल नंबर",
      "नॉमिनी (वारिस) का विवरण व आधार"
    ],
    apply_steps: [
      "Visit the bank branch where you have a savings account or access bank netbanking.",
      "Ask for the Atal Pension Yojana (APY) registration form.",
      "Select desired monthly pension amount (₹1,000 to ₹5,000).",
      "Authorize monthly auto-debit from savings account (starting from as low as ₹42/month depending on age).",
      "Receive PRAN (Permanent Retirement Account Number) confirmation slip."
    ],
    apply_steps_hi: [
      "जिस बैंक में आपका खाता है, वहां जाएं या नेटबैंकिंग से आवेदन करें।",
      "अटल पेंशन योजना (APY) का फॉर्म भरें।",
      "अपनी इच्छित पेंशन राशि (₹1,000 से ₹5,000 प्रतिमाह) चुनें।",
      "खाते से मासिक ऑटो-डेबिट (मात्र ₹42/माह से शुरू) की सहमति दें।",
      "अपना प्रान (PRAN) नंबर व पावती पर्ची प्राप्त करें।"
    ],
    apply_link: "https://enps.nsdl.com/eNPS/ApySubForm.html",
    source: "https://www.myscheme.gov.in/schemes/apy",
    last_verified: "2026-09-18",
    csc_supported: true,
    tags: ["pension", "retirement", "unorganized worker", "monthly income"]
  },
  {
    id: "scheme_old_age_pension",
    name: "Indira Gandhi National Old Age Pension Scheme (IGNOAPS)",
    name_hi: "इंदिरा गांधी राष्ट्रीय वृद्धावस्था पेंशन योजना",
    ministry: "Ministry of Rural Development (NSAP)",
    ministry_hi: "ग्रामीण विकास मंत्रालय (राष्ट्रीय सामाजिक सहायता कार्यक्रम)",
    category: "social_security",
    benefit_summary: "Monthly old-age welfare pension (₹500 to ₹1,500/month depending on state top-up) directly deposited to bank/post office account.",
    benefit_summary_hi: "60 वर्ष से अधिक उम्र के बुजुर्गों को ₹500 से ₹1,500 प्रतिमाह (राज्य अंशदान सहित) की वृद्धावस्था पेंशन।",
    benefit_amount_tag: "₹500 - ₹1,500 / month",
    benefit_amount_tag_hi: "₹500 - ₹1,500 / माह",
    eligibility: {
      min_age: 60,
      max_age: 120,
      max_income: 100000,
      states: ["all"],
      occupations: ["retired", "unemployed", "homemaker", "all"],
      genders: ["all"],
      categories: ["all"],
      special_condition_en: "Belonging to a household living below the poverty line (BPL)",
      special_condition_hi: "गरीबी रेखा से नीचे (BPL) जीवन यापन करने वाले वृद्धजन"
    },
    documents: [
      "Aadhaar Card (verifying age 60 or above)",
      "BPL Card / Ration Card or Gram Panchayat BPL certificate",
      "Bank Account Passbook (Aadhaar seeded)",
      "Passport size photographs"
    ],
    documents_hi: [
      "आधार कार्ड (60 वर्ष या उससे अधिक आयु का प्रमाण)",
      "बीपीएल राशन कार्ड या ग्राम पंचायत/वार्ड सत्यापन",
      "बैंक या डाकघर बचत खाते की पासबुक",
      "पासपोर्ट साइज फोटो"
    ],
    apply_steps: [
      "Visit nsap.nic.in or the Block Development Office (BDO) / Tehsil / Municipal office.",
      "Submit application form with age proof and BPL documentation.",
      "Verification by Gram Panchayat or Municipal Inspector.",
      "Pension sanctioned and disbursed monthly via DBT to bank account."
    ],
    apply_steps_hi: [
      "nsap.nic.in या ब्लॉक विकास अधिकारी (BDO) / तहसील कार्यालय या सीएससी केंद्र जाएं।",
      "आयु प्रमाण और बीपीएल कार्ड के साथ पेंशन आवेदन पत्र जमा करें।",
      "ग्राम पंचायत या नगर पालिका द्वारा सत्यापन किया जाएगा।",
      "मंजूरी के बाद पेंशन सीधे बैंक खाते में हर महीने आने लगती है।"
    ],
    apply_link: "https://nsap.nic.in/",
    source: "https://www.myscheme.gov.in/schemes/ignoaps",
    last_verified: "2026-09-11",
    csc_supported: true,
    tags: ["senior citizen", "old age", "pension", "bpl", "social welfare"]
  },
  {
    id: "scheme_widow_pension",
    name: "Indira Gandhi National Widow Pension Scheme (IGNWPS)",
    name_hi: "इंदिरा गांधी राष्ट्रीय विधवा पेंशन योजना",
    ministry: "Ministry of Rural Development (NSAP)",
    ministry_hi: "ग्रामीण विकास मंत्रालय (राष्ट्रीय सामाजिक सहायता कार्यक्रम)",
    category: "women_child",
    benefit_summary: "Monthly financial pension support (₹500 to ₹1,500/month depending on state top-up) for destitute widows aged 40-79 years.",
    benefit_summary_hi: "40 से 79 वर्ष की निराश्रित विधवा महिलाओं को प्रति माह ₹500 से ₹1,500 की सीधी आर्थिक पेंशन सहायता।",
    benefit_amount_tag: "₹500 - ₹1,500 / month",
    benefit_amount_tag_hi: "₹500 - ₹1,500 / माह",
    eligibility: {
      min_age: 40,
      max_age: 79,
      max_income: 120000,
      states: ["all"],
      occupations: ["all"],
      genders: ["female"],
      categories: ["all"],
      special_condition_en: "Widowed women living below the poverty line",
      special_condition_hi: "गरीबी रेखा से नीचे रहने वाली विधवा महिलाएं"
    },
    documents: [
      "Husband's Death Certificate",
      "Applicant's Aadhaar Card",
      "BPL Ration Card / Income Certificate (under ₹1.2 Lakh)",
      "Bank Account Passbook (Aadhaar linked)",
      "Self-declaration of not remarried"
    ],
    documents_hi: [
      "पति का मृत्यु प्रमाण पत्र",
      "आवेदिका का आधार कार्ड",
      "बीपीएल राशन कार्ड या आय प्रमाण पत्र (सालाना ₹1.2 लाख से कम)",
      "बैंक पासबुक (आधार से लिंक)",
      "पुनर्विवाह न करने का स्व-घोषणा पत्र"
    ],
    apply_steps: [
      "Apply online on state social welfare portal or nsap.nic.in, or visit nearest CSC/Tehsil.",
      "Submit application along with husband's death certificate and BPL verification.",
      "Village Secretary / Ward Officer conducts field verification.",
      "Pension approval order issued and monthly DBT disbursement begins."
    ],
    apply_steps_hi: [
      "राज्य समाज कल्याण पोर्टल, nsap.nic.in या नजदीकी सीएससी/तहसील पर जाएं।",
      "पति के मृत्यु प्रमाण पत्र और आधार के साथ फॉर्म भरें।",
      "ग्राम सचिव या वार्ड अधिकारी द्वारा सत्यापन किया जाएगा।",
      "स्वीकृति के बाद हर महीने खाते में पेंशन ट्रांसफर होती है।"
    ],
    apply_link: "https://nsap.nic.in/",
    source: "https://www.myscheme.gov.in/schemes/ignwps",
    last_verified: "2026-09-13",
    csc_supported: true,
    tags: ["widow", "women empowerment", "pension", "bpl", "financial safety"]
  },
  {
    id: "scheme_pm_awas_gramin",
    name: "Pradhan Mantri Awas Yojana - Gramin (PMAY-G)",
    name_hi: "प्रधानमंत्री आवास योजना - ग्रामीण (पक्का मकान सहायता)",
    ministry: "Ministry of Rural Development",
    ministry_hi: "ग्रामीण विकास मंत्रालय",
    category: "housing",
    benefit_summary: "Direct financial grant of ₹1,20,000 (plain areas) to ₹1,30,000 (hilly/NE states) plus 90-95 days MGNREGA wages and ₹12,000 toilet assistance for building a pucca house.",
    benefit_summary_hi: "पक्का मकान बनाने हेतु ₹1,20,000 से ₹1,30,000 की सीधी सहायता, साथ में ₹12,000 शौचालय निर्माण और मनरेगा मजदूरी लाभ।",
    benefit_amount_tag: "₹1,20,000 - ₹1,30,000 Grant",
    benefit_amount_tag_hi: "₹1,20,000 - ₹1,30,000 मकान अनुदान",
    eligibility: {
      min_age: 18,
      max_age: 100,
      max_income: 180000,
      states: ["all"],
      occupations: ["all"],
      genders: ["all"],
      categories: ["all"],
      special_condition_en: "Houseless households or households living in kutcha/dilapidated house in rural areas",
      special_condition_hi: "ग्रामीण क्षेत्रों में बेघर या कच्चे/जीर्ण-शीर्ण मकान में रहने वाले परिवार"
    },
    documents: [
      "Aadhaar Card of all adult family members",
      "Bank Account details (Aadhaar linked)",
      "MGNREGA Job Card (for wage component)",
      "Photograph of existing kutcha dwelling / site with geotag"
    ],
    documents_hi: [
      "परिवार के सभी वयस्क सदस्यों का आधार कार्ड",
      "बैंक खाता पासबुक (आधार से लिंक)",
      "मनरेगा जॉब कार्ड (मजदूरी सहायता के लिए)",
      "वर्तमान कच्चे मकान की जियोटैग युक्त फोटो"
    ],
    apply_steps: [
      "Beneficiary selection is based on SECC 2011 / Awas+ survey validated by Gram Sabha.",
      "Check your name in the PMAY-G beneficiary list at pmayg.nic.in or Gram Panchayat.",
      "Gram Rozgar Sahayak takes geo-tagged photo of existing kutcha site using AwaasApp.",
      "Sanction letter issued and grant released in 3-4 construction stage-wise installments directly to bank account."
    ],
    apply_steps_hi: [
      "pmayg.nic.in या अपनी ग्राम पंचायत में जाकर 'आवास प्लस' सूची में नाम जांचें।",
      "ग्राम रोजगार सहायक द्वारा AwaasApp से पुराने कच्चे मकान की जियोटैगिंग की जाएगी।",
      "मंजूरी पत्र प्राप्त होने पर निर्माण की प्रगति के अनुसार 3 किस्तों में राशि बैंक खाते में आएगी।",
      "मकान पूरा होने पर अंतिम किस्त और शौचालय सहायता राशि जारी होगी।"
    ],
    apply_link: "https://pmayg.nic.in/",
    source: "https://www.myscheme.gov.in/schemes/pmay-g",
    last_verified: "2026-09-14",
    csc_supported: true,
    tags: ["housing", "pucca house", "rural", "shelter", "grant"]
  },
  {
    id: "scheme_pm_vishwakarma",
    name: "PM Vishwakarma Scheme",
    name_hi: "पीएम विश्वकर्मा योजना (पारंपरिक कारीगर सहायता)",
    ministry: "Ministry of Micro, Small and Medium Enterprises",
    ministry_hi: "सूक्ष्म, लघु एवं मध्यम उद्यम मंत्रालय",
    category: "business_employment",
    benefit_summary: "Holistic support for traditional artisans: PM Vishwakarma Certificate & ID, ₹15,000 modern toolkit grant, ₹500/day training stipend, and collateral-free loan up to ₹3,00,000 at 5% interest.",
    benefit_summary_hi: "पारंपरिक कारीगरों (बढ़ई, लोहार, दर्जी, कुम्हार आदि) को ₹15,000 टूलकिट अनुदान, ₹500/दिन प्रशिक्षण स्टाइपेंड और मात्र 5% ब्याज पर ₹3 लाख तक बिना गारंटी ऋण।",
    benefit_amount_tag: "₹15,000 Toolkit + ₹3L Loan at 5%",
    benefit_amount_tag_hi: "₹15,000 टूलकिट + ₹3 लाख ऋण (5% ब्याज)",
    eligibility: {
      min_age: 18,
      max_age: 70,
      max_income: 300000,
      states: ["all"],
      occupations: ["self_employed", "unemployed", "all"],
      genders: ["all"],
      categories: ["all"],
      special_condition_en: "Artisan or craftsperson working with hands and tools in one of the 18 traditional trades (carpenter, blacksmith, tailor, potter, etc.)",
      special_condition_hi: "हाथ और औजारों से 18 पारंपरिक शिल्पों में काम करने वाले कारीगर (बढ़ई, लोहार, दर्जी, धोबी, मोची, कुम्हार आदि)"
    },
    documents: [
      "Aadhaar Card (linked with mobile number)",
      "Bank Account details (Aadhaar linked)",
      "Ration Card / Family Proof",
      "Trade self-declaration / artisan craft details"
    ],
    documents_hi: [
      "आधार कार्ड (मोबाइल नंबर लिंक)",
      "बैंक पासबुक (आधार सीडेड खाता)",
      "राशन कार्ड या परिवार पहचान पत्र",
      "अपने शिल्प/काम का स्व-घोषणा विवरण"
    ],
    apply_steps: [
      "Visit nearest Common Service Centre (CSC) with Aadhaar and mobile.",
      "CSC operator registers application on pmvishwakarma.gov.in with biometric auth.",
      "Three-tier verification: Gram Panchayat/ULB level, District Implementation Committee, Screening Committee.",
      "Receive digital ID and certificate, undergo 5-7 days skill training with ₹500/day allowance.",
      "Receive ₹15,000 e-voucher for toolkit purchase and apply for collateral-free credit."
    ],
    apply_steps_hi: [
      "अपने नजदीकी सीएससी (CSC) केंद्र पर आधार और बैंक पासबुक लेकर जाएं।",
      "सीएससी संचालक बायोमेट्रिक प्रमाणीकरण के साथ pmvishwakarma.gov.in पर पंजीकरण करेगा।",
      "ग्राम पंचायत/वार्ड और जिला समिति द्वारा सत्यापन।",
      "विश्वकर्मा प्रमाण पत्र प्राप्त करें, ₹500/दिन भत्ते के साथ कौशल प्रशिक्षण लें।",
      "औजार खरीदने हेतु ₹15,000 का ई-वाउचर और 5% ब्याज पर ₹3 लाख तक का ऋण पाएं।"
    ],
    apply_link: "https://pmvishwakarma.gov.in/",
    source: "https://www.myscheme.gov.in/schemes/pm-vishwakarma",
    last_verified: "2026-09-22",
    csc_supported: true,
    tags: ["artisan", "carpenter", "tailor", "tools", "low interest loan", "skill training"]
  },
  {
    id: "scheme_pm_svanidhi",
    name: "PM SVANidhi (Street Vendor's AtmaNirbhar Nidhi)",
    name_hi: "पीएम स्वनिधि योजना (रेहड़ी-पटरी विक्रेता ऋण)",
    ministry: "Ministry of Housing and Urban Affairs",
    ministry_hi: "आवासन एवं शहरी कार्य मंत्रालय",
    category: "business_employment",
    benefit_summary: "Collateral-free working capital micro-loans: 1st tranche ₹10,000, 2nd tranche ₹20,000, 3rd tranche ₹50,000, with 7% interest subsidy and cashback on digital transactions up to ₹1,200/year.",
    benefit_summary_hi: "स्ट्रीट वेंडरों के लिए बिना गारंटी कार्यशील पूंजी ऋण: ₹10,000 (प्रथम), ₹20,000 (द्वितीय) और ₹50,000 (तृतीय), 7% ब्याज सब्सिडी व ₹1,200 वार्षिक डिजिटल कैशबैक।",
    benefit_amount_tag: "₹10,000 - ₹50,000 Working Capital",
    benefit_amount_tag_hi: "₹10,000 - ₹50,000 कार्यशील पूंजी ऋण",
    eligibility: {
      min_age: 18,
      max_age: 75,
      max_income: 300000,
      states: ["all"],
      occupations: ["self_employed", "unemployed", "all"],
      genders: ["all"],
      categories: ["all"],
      special_condition_en: "Street vendors / hawkers vending in urban or peri-urban areas",
      special_condition_hi: "शहरी या अर्ध-शहरी क्षेत्रों में ठेला, खोमचा, रेहड़ी या पटरी पर सामान बेचने वाले विक्रेता"
    },
    documents: [
      "Aadhaar Card linked to mobile number",
      "Vending Certificate / Identity Card issued by Urban Local Body (ULB) or Letter of Recommendation (LoR)",
      "Bank Account details",
      "UPI QR Code / VPA (for digital cashback rewards)"
    ],
    documents_hi: [
      "आधार कार्ड (मोबाइल से लिंक)",
      "नगर पालिका/निगम द्वारा जारी वेंडिंग प्रमाण पत्र / आई-कार्ड या अनुशंसा पत्र (LoR)",
      "बैंक पासबुक की प्रति",
      "डिजिटल यूपीआई (UPI) क्यूआर कोड"
    ],
    apply_steps: [
      "Visit pmsvanidhi.mohua.gov.in or use the PM SVANidhi mobile app.",
      "Check vending status using Mobile/Aadhaar or request Letter of Recommendation (LoR) from local municipality.",
      "Select preferred lending institution (SBI, PNB, Gramin Bank, etc.).",
      "Submit application; bank branch verifies and disburses ₹10,000 directly to savings account within days.",
      "Repay on time to automatically qualify for ₹20,000 and ₹50,000 higher loan tranches."
    ],
    apply_steps_hi: [
      "pmsvanidhi.mohua.gov.in या PM SVANidhi ऐप खोलें।",
      "मोबाइल नंबर से लॉगिन करें और नगर पालिका वेंडिंग सूची में स्थिति देखें।",
      "ऋण देने वाले बैंक का चयन करें।",
      "आवेदन सबमिट करें; बिना किसी गारंटी के ₹10,000 खाते में ट्रांसफर हो जाएंगे।",
      "समय पर किस्तों का भुगतान करने पर ₹20,000 और फिर ₹50,000 का बड़ा ऋण तुरंत मिलता है।"
    ],
    apply_link: "https://pmsvanidhi.mohua.gov.in/",
    source: "https://www.myscheme.gov.in/schemes/pm-svanidhi",
    last_verified: "2026-09-16",
    csc_supported: true,
    tags: ["street vendor", "hawker", "micro loan", "working capital", "interest subsidy"]
  },
  {
    id: "scheme_naps",
    name: "National Apprenticeship Promotion Scheme (NAPS)",
    name_hi: "राष्ट्रीय शिक्षुता संवर्धन योजना (अप्रेंटिसशिप व स्टाइपेंड)",
    ministry: "Ministry of Skill Development and Entrepreneurship",
    ministry_hi: "कौशल विकास एवं उद्यमिता मंत्रालय",
    category: "education",
    benefit_summary: "On-the-job industrial apprenticeship training with direct government stipend support of 25% of prescribed stipend (up to ₹1,500/month) transferred directly to apprentice's bank account.",
    benefit_summary_hi: "उद्योगों में ऑन-द-जॉब प्रैक्टिकल ट्रेनिंग के साथ सरकार द्वारा ₹1,500 प्रति माह तक प्रत्यक्ष स्टाइपेंड सहायता (DBT) और राष्ट्रीय प्रमाण पत्र।",
    benefit_amount_tag: "Up to ₹1,500/mo DBT Stipend + Skill",
    benefit_amount_tag_hi: "₹1,500/माह स्टाइपेंड + स्किल सर्टिफिकेशन",
    eligibility: {
      min_age: 14,
      max_age: 35,
      max_income: 500000,
      states: ["all"],
      occupations: ["student", "unemployed", "all"],
      genders: ["all"],
      categories: ["all"],
      special_condition_en: "Minimum Class 5th / 8th / 10th / 12th / ITI / Diploma / Graduate seeking apprenticeship",
      special_condition_hi: "न्यूनतम 5वीं, 8वीं, 10वीं, 12वीं, आईटीआई, डिप्लोमा या स्नातक पास युवा"
    },
    documents: [
      "Aadhaar Card",
      "Educational qualification marksheets / certificates (10th/12th/ITI)",
      "Bank Account details (DBT enabled)",
      "Passport size photograph"
    ],
    documents_hi: [
      "आधार कार्ड",
      "शैक्षणिक योग्यता अंकतालिका (10वीं/12वीं/आईटीआई/डिप्लोमा)",
      "बैंक पासबुक (डीबीटी समर्थित)",
      "पासपोर्ट साइज फोटो"
    ],
    apply_steps: [
      "Register on the official Apprenticeship Portal at apprenticeshipindia.gov.in.",
      "Complete profile with educational background and preferred trade/industry.",
      "Search and apply for active apprenticeship vacancies across public and private companies.",
      "Sign online apprenticeship contract upon company selection.",
      "Undergo training and receive monthly stipend directly into bank account."
    ],
    apply_steps_hi: [
      "apprenticeshipindia.gov.in पोर्टल पर उम्मीदवार के रूप में पंजीकरण करें।",
      "अपनी शैक्षणिक योग्यता और पसंदीदा ट्रेड (ऑटोमोबाइल, इलेक्ट्रॉनिक्स, मैन्युफैक्चरिंग आदि) भरें।",
      "कंपनियों में उपलब्ध अप्रेंटिसशिप रिक्तियों में एक क्लिक पर आवेदन करें।",
      "चयन होने पर ऑनलाइन अनुबंध स्वीकार करें और ट्रेनिंग शुरू करें।",
      "मासिक स्टाइपेंड सीधे बैंक खाते में पाएं।"
    ],
    apply_link: "https://www.apprenticeshipindia.gov.in/",
    source: "https://www.myscheme.gov.in/schemes/naps",
    last_verified: "2026-09-12",
    csc_supported: true,
    tags: ["youth", "apprenticeship", "stipend", "skill", "employment"]
  },
  {
    id: "scheme_pmegp",
    name: "Prime Minister's Employment Generation Programme (PMEGP)",
    name_hi: "प्रधानमंत्री रोजगार सृजन कार्यक्रम (सब्सिडी युक्त उद्योग ऋण)",
    ministry: "Ministry of MSME / KVIC",
    ministry_hi: "सूक्ष्म, लघु एवं मध्यम उद्यम मंत्रालय / केवीआईसी",
    category: "business_employment",
    benefit_summary: "Government capital subsidy of 15% to 35% on bank-financed micro-enterprise projects up to ₹50 Lakh (manufacturing) and ₹20 Lakh (services) to create sustainable self-employment.",
    benefit_summary_hi: "नया उद्योग लगाने के लिए ₹50 लाख तक (विनिर्माण) और ₹20 लाख तक (सेवा क्षेत्र) के प्रोजेक्ट पर 15% से 35% तक भारी सरकारी पूंजीगत सब्सिडी।",
    benefit_amount_tag: "15% - 35% Subsidy (Up to ₹50 Lakh)",
    benefit_amount_tag_hi: "15% - 35% सरकारी सब्सिडी (₹50 लाख तक प्रोजेक्ट)",
    eligibility: {
      min_age: 18,
      max_age: 65,
      max_income: 10000000,
      states: ["all"],
      occupations: ["unemployed", "self_employed", "all"],
      genders: ["all"],
      categories: ["all"],
      special_condition_en: "Minimum 8th pass for projects above ₹10 Lakh in manufacturing and ₹5 Lakh in services",
      special_condition_hi: "₹10 लाख से अधिक के विनिर्माण प्रोजेक्ट या ₹5 लाख से अधिक सर्विस प्रोजेक्ट हेतु न्यूनतम 8वीं पास"
    },
    documents: [
      "Aadhaar Card and PAN Card",
      "Project Report / Detailed Project Report (DPR) of proposed business",
      "Educational Qualification Marksheet (Class 8th / 10th or above)",
      "Special Category Certificate (SC/ST/OBC/Women/Ex-serviceman) if claiming 35% subsidy",
      "Rural Area Certificate from Sarpanch/Patwari (for rural 35% subsidy rate)"
    ],
    documents_hi: [
      "आधार कार्ड और पैन कार्ड",
      "बिजनेस प्रोजेक्ट रिपोर्ट (DPR - प्रस्तावित लागत व आय विवरण)",
      "शैक्षणिक योग्यता प्रमाण पत्र (8वीं/10वीं या उच्चतर)",
      "विशेष वर्ग प्रमाण पत्र (महिला/एससी/एसटी/ओबीसी होने पर 35% सब्सिडी हेतु)",
      "ग्रामीण क्षेत्र प्रमाण पत्र (पटवारी/सरपंच द्वारा जारी)"
    ],
    apply_steps: [
      "Visit kviconline.gov.in/pmegpeportal.",
      "Fill online PMEGP application for individual entrepreneur.",
      "Upload Detailed Project Report (DPR) and identity documents.",
      "Application is forwarded by District Industries Centre (DIC) / KVIC to your chosen bank.",
      "Upon bank loan sanction, subsidy margin money is kept in TDR and adjusted after 3 years."
    ],
    apply_steps_hi: [
      "kviconline.gov.in/pmegpeportal पर ऑनलाइन आवेदन करें।",
      "व्यक्तिगत आवेदक फॉर्म चुनें और अपना विवरण भरें।",
      "प्रोजेक्ट रिपोर्ट (DPR), आधार और शैक्षणिक प्रमाण पत्र अपलोड करें।",
      "जिला उद्योग केंद्र (DIC) आवेदन को चयनित बैंक शाखा को अग्रसारित करता है।",
      "बैंक लोन मंजूर होते ही सब्सिडी की राशि सीधे बैंक खाते में जमा हो जाती है।"
    ],
    apply_link: "https://www.kviconline.gov.in/pmegpeportal/pmegphome/index.jsp",
    source: "https://www.myscheme.gov.in/schemes/pmegp",
    last_verified: "2026-09-17",
    csc_supported: true,
    tags: ["entrepreneurship", "subsidy", "manufacturing", "business loan", "msme"]
  },
  {
    id: "scheme_kanya_utthan_bihar",
    name: "Mukhyamantri Kanya Utthan Yojana (Bihar)",
    name_hi: "मुख्यमंत्री कन्या उत्थान योजना (बिहार)",
    ministry: "Social Welfare & Education Department, Govt of Bihar",
    ministry_hi: "समाज कल्याण एवं शिक्षा विभाग, बिहार सरकार",
    category: "women_child",
    benefit_summary: "Cash incentive of ₹25,000 for unmarried girls passing Intermediate (12th) and ₹50,000 upon graduation to promote female education and prevent child marriage.",
    benefit_summary_hi: "बिहार की अविवाहित बालिकाओं को 12वीं उत्तीर्ण करने पर ₹25,000 तथा स्नातक उत्तीर्ण करने पर ₹50,000 की सीधी आर्थिक प्रोत्साहन सहायता।",
    benefit_amount_tag: "₹25,000 - ₹50,000 Cash Incentive",
    benefit_amount_tag_hi: "₹25,000 - ₹50,000 नकद प्रोत्साहन",
    eligibility: {
      min_age: 16,
      max_age: 28,
      max_income: 300000,
      states: ["Bihar"],
      occupations: ["student", "all"],
      genders: ["female"],
      categories: ["all"],
      special_condition_en: "Permanent resident of Bihar, unmarried at 12th pass, passed 12th or graduation from recognized Bihar board/university",
      special_condition_hi: "बिहार की मूल निवासी छात्रा, 12वीं पास होने के समय अविवाहित, मान्यता प्राप्त कॉलेज से उत्तीर्ण"
    },
    documents: [
      "Student's Aadhaar Card (linked to personal bank account in Bihar branch)",
      "Bihar Domicile Certificate (निवास प्रमाण पत्र)",
      "Intermediate (12th) or Graduation Registration number & Marksheet",
      "Bank Account Passbook (single account in student's name, not joint)",
      "Mobile number for OTP verification"
    ],
    documents_hi: [
      "छात्रा का आधार कार्ड",
      "बिहार का मूल निवास प्रमाण पत्र",
      "12वीं या स्नातक का रजिस्ट्रेशन नंबर और अंकतालिका",
      "छात्रा के नाम का बैंक खाता (बिहार राज्य स्थित शाखा में, एकल खाता)",
      "सक्रिय मोबाइल नंबर"
    ],
    apply_steps: [
      "Visit Medhasoft portal at medhasoft.bih.nic.in.",
      "Select 'Mukhyamantri Kanya Utthan Yojana (Intermediate / Graduation)'.",
      "Verify registration number, roll number, and 12th/Graduation marks.",
      "Enter Aadhaar and bank details for automated PFMS verification.",
      "Once university and department approve, ₹25,000 or ₹50,000 is directly transferred."
    ],
    apply_steps_hi: [
      "बिहार मेधासॉफ्ट पोर्टल medhasoft.bih.nic.in पर जाएं।",
      "'मुख्यमंत्री कन्या उत्थान योजना' लिंक पर क्लिक करें।",
      "अपना 12वीं/स्नातक का रोल नंबर, रजिस्ट्रेशन नंबर और कुल अंक दर्ज करें।",
      "आधार और बैंक खाता संख्या भरकर सत्यापन पूरा करें।",
      "सत्यापन पूर्ण होने पर ₹25,000 या ₹50,000 सीधे बैंक खाते में जमा हो जाते हैं।"
    ],
    apply_link: "https://medhasoft.bih.nic.in/",
    source: "https://state.bihar.gov.in/prdbihar",
    last_verified: "2026-09-20",
    csc_supported: true,
    tags: ["bihar", "girl student", "graduation incentive", "women empowerment"]
  },
  {
    id: "scheme_up_kanya_vivah",
    name: "UP Shramik Kanya Vivah Sahayata Yojana (Uttar Pradesh)",
    name_hi: "उ.प्र. श्रमिक कन्या विवाह सहायता योजना (उत्तर प्रदेश)",
    ministry: "Labour Department, Government of Uttar Pradesh (BOCW Board)",
    ministry_hi: "श्रम विभाग, उत्तर प्रदेश सरकार (भवन एवं अन्य सन्निर्माण कर्मकार बोर्ड)",
    category: "women_child",
    benefit_summary: "Financial grant of ₹55,000 (individual marriage) and ₹65,000 (mass marriage) for the wedding of daughters of registered construction workers in UP.",
    benefit_summary_hi: "उत्तर प्रदेश के पंजीकृत निर्माण श्रमिकों की बेटियों के विवाह हेतु ₹55,000 (व्यक्तिगत विवाह) तथा ₹65,000 (सामूहिक विवाह) की सीधी आर्थिक मदद।",
    benefit_amount_tag: "₹55,000 - ₹65,000 Marriage Aid",
    benefit_amount_tag_hi: "₹55,000 - ₹65,000 विवाह सहायता",
    eligibility: {
      min_age: 18,
      max_age: 60,
      max_income: 200000,
      states: ["Uttar Pradesh"],
      occupations: ["all"],
      genders: ["all"],
      categories: ["all"],
      special_condition_en: "Registered construction worker with UP BOCW Board for at least 1 year with regular membership contribution",
      special_condition_hi: "उत्तर प्रदेश भवन एवं सन्निर्माण कर्मकार कल्याण बोर्ड (UP BOCW) में कम से कम 1 वर्ष से पंजीकृत श्रमिक"
    },
    documents: [
      "UP BOCW Shramik Labour Card (पंजीकरण कार्ड)",
      "Daughter's age proof (Aadhaar / Birth Certificate proving 18+ years)",
      "Groom's age proof (Aadhaar / School Certificate proving 21+ years)",
      "Marriage Invitation Card or Marriage Registration Certificate",
      "Bank Account details of the registered worker"
    ],
    documents_hi: [
      "यूपी भवन निर्माण श्रमिक पंजीयन कार्ड (कम से कम 1 वर्ष पुराना)",
      "पुत्री का आयु प्रमाण (आधार/जन्म प्रमाण पत्र, न्यूनतम 18 वर्ष)",
      "वर का आयु प्रमाण (आधार/स्कूल टीसी, न्यूनतम 21 वर्ष)",
      "विवाह का निमंत्रण पत्र (शादी कार्ड) या विवाह पंजीयन प्रमाण",
      "श्रमिक का बैंक पासबुक"
    ],
    apply_steps: [
      "Visit upbocw.in or nearest Jan Seva Kendra (CSC) in Uttar Pradesh.",
      "Click 'योजनाएं' -> 'योजना आवेदन करें'.",
      "Enter your 14-digit Shramik Registration Number.",
      "Select 'कन्या विवाह सहायता योजना' and attach marriage card and age certificates of bride & groom.",
      "Labour Enforcement Officer (LEO) inspects and grant is transferred before or after wedding."
    ],
    apply_steps_hi: [
      "upbocw.in पोर्टल या उत्तर प्रदेश के किसी भी जन सेवा केंद्र (सीएससी) पर जाएं।",
      "'योजना आवेदन' पर क्लिक करके अपना 14 अंकों का श्रमिक पंजीकरण संख्या दर्ज करें।",
      "'कन्या विवाह सहायता योजना' चुनें।",
      "शादी का कार्ड, वर-वधू का आधार व आयु प्रमाण अपलोड करें।",
      "श्रम प्रवर्तन अधिकारी के सत्यापन के बाद विवाह सहायता राशि सीधे खाते में भेजी जाती है।"
    ],
    apply_link: "https://upbocw.in/",
    source: "https://upbocw.in/StaticPages/KanyaVivah.aspx",
    last_verified: "2026-09-15",
    csc_supported: true,
    tags: ["uttar pradesh", "labour", "marriage assistance", "daughter wedding", "welfare"]
  },
  {
    id: "scheme_standup_india",
    name: "Stand-Up India Scheme",
    name_hi: "स्टैंड-अप इंडिया योजना (एससी/एसटी व महिला उद्यमी)",
    ministry: "Department of Financial Services, Ministry of Finance",
    ministry_hi: "वित्तीय सेवाएं विभाग, वित्त मंत्रालय",
    category: "business_employment",
    benefit_summary: "Bank composite loans between ₹10 Lakh and ₹1 Crore to at least one SC/ST borrower and at least one woman borrower per bank branch for setting up greenfield enterprises.",
    benefit_summary_hi: "प्रत्येक बैंक शाखा से कम से कम एक एससी/एसटी और एक महिला उद्यमी को नया उद्यम (ग्रीनफील्ड) शुरू करने हेतु ₹10 लाख से ₹1 करोड़ तक का बैंक ऋण।",
    benefit_amount_tag: "₹10 Lakh - ₹1 Crore",
    benefit_amount_tag_hi: "₹10 लाख - ₹1 करोड़ उद्यम ऋण",
    eligibility: {
      min_age: 18,
      max_age: 70,
      max_income: 10000000,
      states: ["all"],
      occupations: ["self_employed", "unemployed", "all"],
      genders: ["all"],
      categories: ["all"],
      special_condition_en: "Borrower must be SC/ST OR a Woman of any category, setting up a greenfield enterprise in manufacturing, services, agri-allied or trading",
      special_condition_hi: "आवेदक एससी/एसटी वर्ग का होना चाहिए अथवा किसी भी वर्ग की महिला होनी चाहिए"
    },
    documents: [
      "Proof of Identity & Address (Aadhaar & PAN)",
      "Caste Certificate (for SC/ST applicants)",
      "Project Report with projected cashflows & machinery quotation",
      "Proof of ownership/lease of business premises",
      "Bank statement for last 6 months"
    ],
    documents_hi: [
      "पहचान व निवास प्रमाण पत्र (आधार और पैन कार्ड)",
      "जाति प्रमाण पत्र (एससी/एसटी आवेदकों के लिए)",
      "विस्तृत प्रोजेक्ट रिपोर्ट (लागत, आय व मशीनरी कोटेशन)",
      "व्यवसाय स्थल का स्वामित्व या लीज/किराया अनुबंध",
      "पिछले 6 माह का बैंक स्टेटमेंट"
    ],
    apply_steps: [
      "Visit standupmitra.in and click on 'Register / Apply for Loan'.",
      "Complete registration, input project details and choose handholding support if needed.",
      "Select target bank branch for loan processing.",
      "Bank evaluates application and schedules appraisal interview.",
      "Loan disbursed in stages with Credit Guarantee Scheme coverage."
    ],
    apply_steps_hi: [
      "standupmitra.in पोर्टल पर जाएं और 'Apply for Loan' पर क्लिक करें।",
      "पंजीकरण पूरा करें, अपने नए प्रोजेक्ट का विवरण और बजट भरें।",
      "अपनी नजदीकी बैंक शाखा का चयन करें।",
      "बैंक द्वारा प्रोजेक्ट का मूल्यांकन और साक्षात्कार किया जाएगा।",
      "ऋण स्वीकृति उपरांत क्रेडिट गारंटी के साथ ऋण राशि जारी की जाती है।"
    ],
    apply_link: "https://www.standupmitra.in/",
    source: "https://www.myscheme.gov.in/schemes/suis",
    last_verified: "2026-09-24",
    csc_supported: true,
    tags: ["sc st", "women entrepreneur", "startup", "bank loan", "standup india"]
  },
  // =========================================================================
  // PRIVATE SECTOR SCHEMES: STUDENTS, PARENTS, ELDER PERSONS & HEALTHCARE
  // =========================================================================
  {
    id: "scheme_sbi_asha_scholarship",
    name: "SBI Asha Scholarship Programme",
    name_hi: "एसबीआई आशा स्कॉलरशिप योजना (भारतीय स्टेट बैंक)",
    ministry: "SBI Foundation (State Bank of India CSR)",
    ministry_hi: "एसबीआई फाउंडेशन (भारतीय स्टेट बैंक सीएसआर)",
    category: "education",
    sector: "private",
    provider_type: "bank",
    target_group: "student",
    benefit_summary: "Direct scholarship grant of ₹15,000 to ₹7,50,000 per year for meritorious students from low-income families across Class 6-12, Undergraduate degree, and top premier institutes (IITs/IIMs).",
    benefit_summary_hi: "कम आय वाले मेधावी छात्र-छात्राओं को ₹15,000 से ₹7,50,000 तक की वार्षिक छात्रवृत्ति (कक्षा 6-12: ₹15,000, स्नातक: ₹50,000, शीर्ष आईआईटी/आईआईएम: ₹7.5 लाख तक)।",
    benefit_amount_tag: "₹15,000 - ₹7.5 Lakh / year",
    benefit_amount_tag_hi: "₹15,000 - ₹7.5 लाख / वर्ष",
    eligibility: {
      min_age: 10,
      max_age: 26,
      max_income: 300000,
      states: ["all"],
      occupations: ["student", "all"],
      genders: ["all"],
      categories: ["all"],
      special_condition_en: "Minimum 75% marks in previous academic year; family annual income under ₹3,00,000",
      special_condition_hi: "पिछली कक्षा में न्यूनतम 75% अंक तथा पारिवारिक वार्षिक आय ₹3 लाख से कम होनी चाहिए"
    },
    documents: [
      "Aadhaar Card of student linked with active mobile",
      "Marksheet of previous academic year (min 75% marks)",
      "Current academic year admission fee receipt / Bonafide certificate",
      "Income Certificate issued by Tehsildar / Competent Authority",
      "Student or joint Bank Account Passbook (cancelled cheque)"
    ],
    documents_hi: [
      "छात्र का आधार कार्ड (सक्रिय मोबाइल नंबर लिंक)",
      "पिछली कक्षा की अंकतालिका (न्यूनतम 75% अंक)",
      "वर्तमान कक्षा/कॉलेज का प्रवेश शुल्क रसीद या बोनाफाइड प्रमाण पत्र",
      "तहसीलदार/राजस्व अधिकारी द्वारा जारी आय प्रमाण पत्र (₹3 लाख से कम)",
      "छात्र अथवा अभिभावक का बैंक खाता पासबुक"
    ],
    apply_steps: [
      "Visit the official SBI Foundation portal (sbifoundation.in) or Buddy4Study portal.",
      "Select 'SBI Asha Scholarship Programme' under Open Grants.",
      "Register with active mobile number and enter academic details.",
      "Upload scanned marksheet, income certificate, and college fee receipt.",
      "Submit application; shortlisted scholars receive fund transfer directly via DBT."
    ],
    apply_steps_hi: [
      "एसबीआई फाउंडेशन (sbifoundation.in) या आधिकारिक पार्टनर पोर्टल पर जाएं।",
      "'SBI Asha Scholarship' विकल्प पर क्लिक करें और मोबाइल नंबर से पंजीकरण करें।",
      "अपनी शैक्षणिक योग्यता, पिछली कक्षा के अंक और पारिवारिक आय भरें।",
      "अंकतालिका, कॉलेज फीस रसीद व आय प्रमाण पत्र अपलोड करें।",
      "सत्यापन के बाद छात्रवृत्ति सीधे आपके बैंक खाते में भेजी जाती है।"
    ],
    apply_link: "https://www.sbifoundation.in/asha-scholarship",
    source: "https://www.sbifoundation.in/",
    last_verified: "2026-09-28",
    csc_supported: true,
    tags: ["sbi", "scholarship", "students", "private bank", "higher education", "merit"]
  },
  {
    id: "scheme_hdfc_parivartan_ecss",
    name: "HDFC Bank Parivartan's Educational Crisis Support Scholarship (ECSS)",
    name_hi: "एचडीएफसी बैंक परिवर्तन ईसीएसएस छात्रवृत्ति",
    ministry: "HDFC Bank Parivartan CSR Foundation",
    ministry_hi: "एचडीएफसी बैंक परिवर्तन फाउंडेशन",
    category: "education",
    sector: "private",
    provider_type: "bank",
    target_group: "student",
    benefit_summary: "Annual financial aid of ₹15,000 to ₹75,000 to support students facing sudden economic crisis or family hardship to prevent school/college dropouts.",
    benefit_summary_hi: "आर्थिक संकट या पारिवारिक कठिनाई से जूझ रहे छात्रों को पढ़ाई निरंतर रखने हेतु ₹15,000 से ₹75,000 प्रति वर्ष की वित्तीय सहायता।",
    benefit_amount_tag: "₹15,000 - ₹75,000 / year",
    benefit_amount_tag_hi: "₹15,000 - ₹75,000 / वर्ष",
    eligibility: {
      min_age: 6,
      max_age: 26,
      max_income: 250000,
      states: ["all"],
      occupations: ["student", "all"],
      genders: ["all"],
      categories: ["all"],
      special_condition_en: "Studying in Class 1-12, Diploma, ITI, Undergraduate or Postgraduate courses; family facing economic crisis",
      special_condition_hi: "कक्षा 1 से 12 या कॉलेज में नियमित विद्यार्थी; पारिवारिक आय ₹2.5 लाख से कम या आर्थिक संकट"
    },
    documents: [
      "Aadhaar Card of student and parent",
      "Marksheet of previous qualifying exam (min 55% marks)",
      "Current school / college admission fee receipt or ID card",
      "Proof of family income or crisis document (Gram Pradhan / Tehsildar / BPL card)",
      "Bank passbook of student or parent"
    ],
    documents_hi: [
      "विद्यार्थी एवं अभिभावक का आधार कार्ड",
      "पिछली परीक्षा की अंकतालिका (न्यूनतम 55% अंक)",
      "वर्तमान विद्यालय/महाविद्यालय की फीस रसीद या पहचान पत्र",
      "आय प्रमाण पत्र (तहसीलदार / ग्राम प्रधान / बीपीएल राशन कार्ड)",
      "छात्र या माता-पिता की बैंक पासबुक"
    ],
    apply_steps: [
      "Go to HDFC Bank Parivartan Scholarship portal.",
      "Click 'Apply Now' and select category (School / Undergrad / Professional).",
      "Fill educational details, family income status, and personal background.",
      "Upload required certificates and marksheets in PDF/JPG format.",
      "Upon merit-cum-means screening, scholarship amount is credited to bank account."
    ],
    apply_steps_hi: [
      "एचडीएफसी बैंक परिवर्तन स्कॉलरशिप पोर्टल पर जाएं।",
      "'Apply Now' पर क्लिक कर अपनी शिक्षा श्रेणी (स्कूल/कॉलेज) चुनें।",
      "पारिवारिक विवरण, संकट की स्थिति और शैक्षणिक जानकारी भरें।",
      "आवश्यक दस्तावेज अपलोड करें और आवेदन जमा करें।",
      "चयनित होने पर छात्रवृत्ति राशि सीधे बैंक खाते में ट्रांसफर की जाती है।"
    ],
    apply_link: "https://www.hdfcbank.com/personal/about-us/corporate-social-responsibility/parivartan",
    source: "https://www.hdfcbank.com/",
    last_verified: "2026-09-28",
    csc_supported: true,
    tags: ["hdfc", "scholarship", "education", "parivartan", "private bank", "crisis support"]
  },
  {
    id: "scheme_kotak_kanya_scholarship",
    name: "Kotak Kanya Scholarship Programme",
    name_hi: "कोटक कन्या स्कॉलरशिप (कोटक एजुकेशन फाउंडेशन)",
    ministry: "Kotak Education Foundation (Kotak Mahindra Group)",
    ministry_hi: "कोटक एजुकेशन फाउंडेशन (कोटक महिंद्रा बैंक)",
    category: "education",
    sector: "private",
    provider_type: "bank",
    target_group: "student",
    benefit_summary: "Comprehensive scholarship of ₹1,50,000 per year until professional degree completion for meritorious girl students pursuing Engineering, MBBS, Architecture, Law, or Design.",
    benefit_summary_hi: "प्रतिभाशाली बालिकाओं को व्यावसायिक उच्च शिक्षा (इंजीनियरिंग, एमबीबीएस, कानून, डिजाइन आदि) हेतु ₹1,50,000 प्रति वर्ष की निरंतर छात्रवृत्ति (डिग्री पूर्ण होने तक)।",
    benefit_amount_tag: "₹1,50,000 / year",
    benefit_amount_tag_hi: "₹1,50,000 / वर्ष",
    eligibility: {
      min_age: 16,
      max_age: 25,
      max_income: 600000,
      states: ["all"],
      occupations: ["student", "all"],
      genders: ["female"],
      categories: ["all"],
      special_condition_en: "Meritorious girl students with 75%+ in Class 12 board, admitted to 1st year professional degree program",
      special_condition_hi: "12वीं में 75% या अधिक अंक प्राप्त करने वाली छात्राएं जो मान्यता प्राप्त व्यावसायिक डिग्री के प्रथम वर्ष में नामांकित हैं"
    },
    documents: [
      "Class 10 and Class 12 board exam marksheets (min 75% in 12th)",
      "Proof of admission (college fee receipt / allotment letter)",
      "Family Income Certificate / ITR / Form 16 (under ₹6 Lakh)",
      "Aadhaar Card and Student Bank Account Details",
      "Bonafide student certificate from current college"
    ],
    documents_hi: [
      "कक्षा 10वीं व 12वीं की अंकतालिका (12वीं में 75%+ अंक)",
      "कॉलेज में प्रवेश का प्रमाण (फीस रसीद / सीट आवंटन पत्र)",
      "पारिवारिक आय प्रमाण पत्र (₹6 लाख वार्षिक से कम)",
      "छात्रा का आधार कार्ड एवं बैंक पासबुक",
      "महाविद्यालय से जारी अध्ययनरत प्रमाण पत्र (Bonafide Certificate)"
    ],
    apply_steps: [
      "Visit the Kotak Education Foundation scholarship page (kotakeducation.org).",
      "Fill online registration form for Kotak Kanya Scholarship.",
      "Input Class 12 board marks and entrance rank (JEE/NEET/CLAT if applicable).",
      "Upload income proof, admission receipt, and bank passbook.",
      "Attend telephonic/video interview; grant disbursed annually till graduation."
    ],
    apply_steps_hi: [
      "कोटक एजुकेशन फाउंडेशन पोर्टल (kotakeducation.org) पर जाएं।",
      "'Kotak Kanya Scholarship' फॉर्म भरें और 12वीं के अंक दर्ज करें।",
      "कॉलेज फीस रसीद, आय प्रमाण पत्र और आधार कार्ड अपलोड करें।",
      "साक्षात्कार प्रक्रिया के बाद छात्रवृत्ति पत्र जारी किया जाता है।",
      "डिग्री पूर्ण होने तक प्रति वर्ष ₹1.5 लाख सीधे खाते में प्राप्त होते हैं।"
    ],
    apply_link: "https://kotakeducation.org/kotak-kanya-scholarship/",
    source: "https://kotakeducation.org/",
    last_verified: "2026-09-28",
    csc_supported: true,
    tags: ["kotak", "girls", "scholarship", "higher education", "engineering", "mbbs"]
  },
  {
    id: "scheme_tata_capital_pankh",
    name: "Tata Capital Pankh Scholarship Programme",
    name_hi: "टाटा कैपिटल पंख छात्रवृत्ति योजना",
    ministry: "Tata Capital CSR Trust",
    ministry_hi: "टाटा कैपिटल सीएसआर ट्रस्ट",
    category: "education",
    sector: "private",
    provider_type: "csr_trust",
    target_group: "student",
    benefit_summary: "Financial assistance up to ₹50,000 or 80% of annual course tuition fees for students in school (Class 6-12), ITI/Diploma, and undergraduate college courses.",
    benefit_summary_hi: "कक्षा 6 से 12, डिप्लोमा या सामान्य स्नातक कर रहे छात्रों को ₹50,000 या 80% तक कॉलेज ट्यूशन फीस की आर्थिक सहायता।",
    benefit_amount_tag: "Up to ₹50,000 / year",
    benefit_amount_tag_hi: "₹50,000 तक प्रति वर्ष",
    eligibility: {
      min_age: 11,
      max_age: 25,
      max_income: 400000,
      states: ["all"],
      occupations: ["student", "all"],
      genders: ["all"],
      categories: ["all"],
      special_condition_en: "Minimum 60% marks in previous year; family annual income under ₹4,00,000",
      special_condition_hi: "पिछली परीक्षा में न्यूनतम 60% अंक तथा परिवार की वार्षिक आय ₹4 लाख से कम"
    },
    documents: [
      "Aadhaar Card and Student ID card",
      "Previous year academic marksheet (minimum 60%)",
      "Current school / college admission fee receipt",
      "Family Income Proof (Tehsildar certificate / BPL Ration Card)",
      "Bank Account details (student or parent)"
    ],
    documents_hi: [
      "आधार कार्ड व छात्र पहचान पत्र",
      "पिछली कक्षा की अंकतालिका (न्यूनतम 60% अंक)",
      "चालू वर्ष की फीस रसीद या प्रवेश पत्र",
      "आय प्रमाण पत्र (तहसीलदार द्वारा जारी या बीपीएल राशन कार्ड)",
      "बैंक पासबुक विवरण"
    ],
    apply_steps: [
      "Visit the Tata Capital Pankh scholarship portal.",
      "Select your eligible level (Class 6-10 / Class 11-12 / UG Courses).",
      "Register and fill profile details and family income credentials.",
      "Upload verified documents and submit for committee evaluation.",
      "Scholarship fee reimbursement transferred directly to bank account."
    ],
    apply_steps_hi: [
      "टाटा कैपिटल पंख छात्रवृत्ति पोर्टल पर जाएं।",
      "अपनी पढ़ाई का स्तर (स्कूल/डिप्लोमा/कॉलेज) चुनें और पंजीकरण करें।",
      "अंक, पारिवारिक आय और कॉलेज का विवरण भरें।",
      "दस्तावेज अपलोड करें और आवेदन सबमिट करें।",
      "चयन के बाद ट्यूशन फीस सीधे बैंक खाते में प्रतिपूर्ति की जाती है।"
    ],
    apply_link: "https://www.tatacapital.com/sustainability/csr/pankh-scholarship.html",
    source: "https://www.tatacapital.com/",
    last_verified: "2026-09-28",
    csc_supported: true,
    tags: ["tata", "pankh", "scholarship", "tuition grant", "csr", "students"]
  },
  {
    id: "scheme_reliance_foundation_scholarship",
    name: "Reliance Foundation Undergraduate & Postgraduate Scholarships",
    name_hi: "रिलायंस फाउंडेशन स्कॉलरशिप (कॉलेज व डिग्री छात्र)",
    ministry: "Reliance Foundation (CSR)",
    ministry_hi: "रिलायंस फाउंडेशन (सीएसआर)",
    category: "education",
    sector: "private",
    provider_type: "corporate_foundation",
    target_group: "student",
    benefit_summary: "Grant of up to ₹2,00,000 for undergraduate degrees and up to ₹6,00,000 for postgraduate degrees, plus leadership mentorship and internship access.",
    benefit_summary_hi: "स्नातक छात्रों को ₹2 लाख तक और स्नातकोत्तर छात्रों को ₹6 लाख तक का एकमुश्त/वार्षिक शिक्षा अनुदान और करियर मेंटरशिप।",
    benefit_amount_tag: "Up to ₹2 Lakh - ₹6 Lakh",
    benefit_amount_tag_hi: "₹2 लाख - ₹6 लाख तक अनुदान",
    eligibility: {
      min_age: 17,
      max_age: 28,
      max_income: 1500000,
      states: ["all"],
      occupations: ["student", "all"],
      genders: ["all"],
      categories: ["all"],
      special_condition_en: "1st year full-time regular degree students with 60%+ in 12th; preference to household income < ₹2.5 Lakh",
      special_condition_hi: "नियमित डिग्री के प्रथम वर्ष के छात्र जिन्होंने 12वीं में 60%+ अंक प्राप्त किए हों"
    },
    documents: [
      "Class 10 and Class 12 passing certificates",
      "Proof of 1st year enrollment in a recognized Indian degree college",
      "Family income certificate / parent salary slip / ITR",
      "Aadhaar card and photo ID",
      "Student bank account passbook"
    ],
    documents_hi: [
      "10वीं एवं 12वीं कक्षा का उत्तीर्ण प्रमाण पत्र",
      "मान्यता प्राप्त भारतीय कॉलेज में प्रथम वर्ष में प्रवेश का प्रमाण",
      "पारिवारिक आय प्रमाण पत्र / वेतन पर्ची / आईटीआर",
      "आधार कार्ड व पासपोर्ट साइज फोटो",
      "छात्र की बैंक पासबुक"
    ],
    apply_steps: [
      "Visit scholarships.reliancefoundation.org and select UG or PG program.",
      "Complete the initial eligibility check and fill application details.",
      "Take the mandatory online aptitude test on the scheduled date.",
      "Upload academic and income documents.",
      "Top 5,000 scholars selected each year receive direct financial grant."
    ],
    apply_steps_hi: [
      "scholarships.reliancefoundation.org पोर्टल पर जाएं।",
      "पात्रता की पुष्टि करें और ऑनलाइन फॉर्म भरें।",
      "ऑनलाइन एप्टीट्यूड टेस्ट में भाग लें।",
      "दस्तावेज अपलोड करें; चयनित 5,000 छात्रों को अनुदान सीधे खाते में प्राप्त होता है।"
    ],
    apply_link: "https://www.scholarships.reliancefoundation.org/",
    source: "https://www.reliancefoundation.org/",
    last_verified: "2026-09-28",
    csc_supported: true,
    tags: ["reliance", "merit scholarship", "college", "undergraduate", "corporate csr"]
  },
  // =========================================================================
  // PRIVATE & BANK SCHEMES FOR ELDERS & RETIREMENT PENSIONS
  // =========================================================================
  {
    id: "scheme_sbi_wecare_senior_pension",
    name: "SBI WeCare Senior Citizen Fixed Deposit & Monthly Pension Income",
    name_hi: "एसबीआई वीकेयर वरिष्ठ नागरिक पेंशन व मासिक आय योजना",
    ministry: "State Bank of India (SBI)",
    ministry_hi: "भारतीय स्टेट बैंक (एसबीआई)",
    category: "social_security",
    sector: "private",
    provider_type: "bank",
    target_group: "elder",
    benefit_summary: "Guaranteed monthly pension payouts with an extra 80 to 100 bps interest rate premium (up to 7.50% p.a.) on deposits, ensuring predictable monthly cashflow in retirement.",
    benefit_summary_hi: "वरिष्ठ नागरिकों को सामान्य से 0.80% से 1.00% अधिक ब्याज (7.50% वार्षिक तक) के साथ निश्चित मासिक पेंशन जैसी आय सीधे बचत खाते में।",
    benefit_amount_tag: "7.50% p.a. + Monthly Pension",
    benefit_amount_tag_hi: "7.50% ब्याज + मासिक पेंशन",
    eligibility: {
      min_age: 60,
      max_age: 100,
      max_income: 10000000,
      states: ["all"],
      occupations: ["all", "retired", "salaried", "self_employed", "homemaker", "unemployed", "farmer"],
      genders: ["all"],
      categories: ["all"],
      special_condition_en: "Indian resident senior citizen aged 60 years and above; deposit tenure from 5 to 10 years with monthly interest credit",
      special_condition_hi: "60 वर्ष या अधिक उम्र के भारतीय नागरिक; 5 से 10 वर्ष की अवधि पर निश्चित मासिक ब्याज पेंशन"
    },
    documents: [
      "Proof of Age (Aadhaar Card / PAN Card / Senior Citizen Card / Passport)",
      "Proof of Address (Aadhaar / Voter ID / Utility Bill)",
      "Active SBI Savings Account Passbook",
      "2 Passport-size photographs",
      "Form 15H for zero tax deduction if applicable"
    ],
    documents_hi: [
      "आयु प्रमाण पत्र (आधार कार्ड / पैन कार्ड / सीनियर सिटीजन कार्ड)",
      "निवास प्रमाण पत्र (आधार / वोटर आईडी)",
      "एसबीआई बैंक बचत खाता पासबुक",
      "2 पासपोर्ट साइज फोटो",
      "टीडीएस छूट हेतु फॉर्म 15H (यदि लागू हो)"
    ],
    apply_steps: [
      "Visit any State Bank of India (SBI) branch or login via SBI YONO App / Net Banking.",
      "Select 'Deposits' -> 'Open Fixed Deposit' -> 'SBI WeCare Senior Citizen Scheme'.",
      "Choose deposit amount and tenure (5 to 10 years).",
      "Select 'Monthly Interest Payout' option to receive monthly pension directly in your savings account.",
      "Deposit certificate issued instantly with automated monthly pension credit."
    ],
    apply_steps_hi: [
      "नजदीकी एसबीआई शाखा जाएं या SBI YONO ऐप/नेट बैंकिंग में लॉगिन करें।",
      "'Deposits' -> 'SBI WeCare Senior Deposit' विकल्प चुनें।",
      "जमा राशि और अवधि (5 से 10 वर्ष) दर्ज करें।",
      "'Monthly Interest Payout' चुनें ताकि हर महीने पेंशन की तरह ब्याज आपके खाते में आए।",
      "सावधि जमा रसीद प्राप्त करें; हर महीने की पहली तारीख को ब्याज जमा होता है।"
    ],
    apply_link: "https://sbi.co.in/web/personal-banking/investments-deposits/deposits/sbi-wecare",
    source: "https://sbi.co.in/",
    last_verified: "2026-09-28",
    csc_supported: true,
    tags: ["sbi", "pension", "senior citizen", "elder", "fixed deposit", "monthly income"]
  },
  {
    id: "scheme_hdfc_senior_citizen_care",
    name: "HDFC Senior Citizen Care Deposit & Monthly Annuity Pension",
    name_hi: "एचडीएफसी सीनियर सिटीजन केयर व मासिक पेंशन डिपॉजिट",
    ministry: "HDFC Bank",
    ministry_hi: "एचडीएफसी बैंक",
    category: "social_security",
    sector: "private",
    provider_type: "bank",
    target_group: "elder",
    benefit_summary: "Special +75 bps premium interest rate for elders with guaranteed monthly interest payout as a retirement pension, free doorstep banking, and health privileges.",
    benefit_summary_hi: "बुजुर्गों के लिए +0.75% अतिरिक्त ब्याज के साथ हर महीने बैंक खाते में पेंशन की तरह ब्याज प्राप्ति, फ्री डोरस्टेप बैंकिंग और स्वास्थ्य लाभ।",
    benefit_amount_tag: "7.75% p.a. + Monthly Payout",
    benefit_amount_tag_hi: "7.75% ब्याज + मासिक पेंशन",
    eligibility: {
      min_age: 60,
      max_age: 100,
      max_income: 10000000,
      states: ["all"],
      occupations: ["all", "retired", "salaried", "self_employed", "homemaker", "unemployed", "farmer"],
      genders: ["all"],
      categories: ["all"],
      special_condition_en: "Age 60 years or above; tenure 5 to 10 years with automated monthly or quarterly credit",
      special_condition_hi: "60 वर्ष या अधिक उम्र के नागरिक; 5 से 10 साल की अवधि में स्वतः मासिक पेंशन जमा"
    },
    documents: [
      "Aadhaar Card and PAN Card",
      "Birth certificate or Senior Citizen ID card",
      "HDFC Bank Savings Account passbook or cheque",
      "Form 15H for tax exemption",
      "Passport size photograph"
    ],
    documents_hi: [
      "आधार कार्ड व पैन कार्ड",
      "आयु प्रमाण पत्र (वरिष्ठ नागरिक पहचान पत्र)",
      "एचडीएफसी बैंक बचत खाता पासबुक",
      "फॉर्म 15H (कर छूट हेतु)",
      "पासपोर्ट साइज फोटो"
    ],
    apply_steps: [
      "Visit your local HDFC Bank branch or open via HDFC NetBanking / MobileBanking.",
      "Navigate to 'Transact' -> 'Open Fixed Deposit' -> 'Senior Citizen Care FD'.",
      "Select monthly interest frequency for regular monthly pension.",
      "Provide nominee details and submit with Aadhaar OTP authentication.",
      "Enjoy regular monthly pension credit into your linked HDFC savings account."
    ],
    apply_steps_hi: [
      "एचडीएफसी बैंक शाखा जाएं या नेट बैंकिंग ऐप खोलें।",
      "'Open Fixed Deposit' में जाकर 'Senior Citizen Care FD' चुनें।",
      "मासिक पेंशन पाने हेतु 'Monthly Payout' विकल्प चुनें।",
      "नॉमिनी का नाम भरें और आधार ओटीपी द्वारा सत्यापित करें।",
      "प्रत्येक माह पेंशन राशि सीधे आपके बैंक खाते में जमा होती है।"
    ],
    apply_link: "https://www.hdfcbank.com/personal/save/deposits/fixed-deposit/senior-citizen-care-fd",
    source: "https://www.hdfcbank.com/",
    last_verified: "2026-09-28",
    csc_supported: true,
    tags: ["hdfc", "pension", "senior citizen", "elder", "retirement income", "bank deposit"]
  },
  {
    id: "scheme_icici_golden_years_pension",
    name: "ICICI Bank Golden Years Senior Retirement Pension Scheme",
    name_hi: "आईसीआईसीआई गोल्डन ईयर्स वरिष्ठ नागरिक पेंशन योजना",
    ministry: "ICICI Bank",
    ministry_hi: "आईसीआईसीआई बैंक",
    category: "social_security",
    sector: "private",
    provider_type: "bank",
    target_group: "elder",
    benefit_summary: "Dedicated senior retirement deposit offering an additional 60 bps interest rate with monthly pension disbursement option and loan against deposit up to 90% for emergencies.",
    benefit_summary_hi: "वरिष्ठ नागरिकों को 0.60% अतिरिक्त ब्याज दर, मासिक पेंशन भुगतान विकल्प तथा आपात स्थिति में 90% तक त्वरित बैंक ऋण सुविधा।",
    benefit_amount_tag: "7.60% p.a. + Monthly Payout",
    benefit_amount_tag_hi: "7.60% ब्याज + मासिक पेंशन विकल्प",
    eligibility: {
      min_age: 60,
      max_age: 100,
      max_income: 10000000,
      states: ["all"],
      occupations: ["all", "retired", "salaried", "self_employed", "homemaker"],
      genders: ["all"],
      categories: ["all"],
      special_condition_en: "Resident senior citizens aged 60+; flexible tenure with monthly retirement pension credit",
      special_condition_hi: "60 वर्ष या अधिक उम्र के वरिष्ठ नागरिक; मासिक पेंशन क्रेडिट विकल्प"
    },
    documents: [
      "PAN Card & Aadhaar Card (linked)",
      "Age proof certificate / Passport / Pension order",
      "ICICI Bank account number / cancelled cheque",
      "Form 15H for senior citizens",
      "Recent passport-sized photo"
    ],
    documents_hi: [
      "पैन कार्ड और आधार कार्ड",
      "आयु प्रमाण पत्र या पेंशन आदेश पत्र",
      "आईसीआईसीआई बैंक खाता संख्या / चेक",
      "फॉर्म 15H",
      "पासपोर्ट साइज फोटो"
    ],
    apply_steps: [
      "Open iMobile Pay app or visit nearest ICICI Bank branch.",
      "Select 'Fixed Deposits' and opt for 'Golden Years FD'.",
      "Choose Monthly Interest Credit for uninterrupted monthly pension flow.",
      "Confirm tenure (5 years 1 day to 10 years) and fund transfer.",
      "Receive regular interest directly into ICICI savings account."
    ],
    apply_steps_hi: [
      "iMobile ऐप खोलें या नजदीकी आईसीआईसीआई शाखा जाएं।",
      "'Golden Years FD' चुनें और मासिक ब्याज भुगतान का विकल्प चुनें।",
      "अवधि (5 से 10 वर्ष) और राशि दर्ज करें।",
      "खाता सक्रिय होते ही मासिक पेंशन जैसी आय आरंभ हो जाती है।"
    ],
    apply_link: "https://www.icicibank.com/personal-banking/deposits/fixed-deposit/golden-years-fd",
    source: "https://www.icicibank.com/",
    last_verified: "2026-09-28",
    csc_supported: true,
    tags: ["icici", "pension", "senior citizen", "elder", "retirement", "monthly interest"]
  },
  {
    id: "scheme_helpage_senior_healthcare",
    name: "HelpAge India Elder Healthcare & Free Cataract Surgeries",
    name_hi: "हेल्पएज इंडिया वृद्धजन स्वास्थ्य व मुफ्त मोतियाबिंद ऑपरेशन",
    ministry: "HelpAge India & Corporate CSR Partners",
    ministry_hi: "हेल्पएज इंडिया व कॉर्पोरेट सीएसआर",
    category: "healthcare",
    sector: "private",
    provider_type: "csr_trust",
    target_group: "elder",
    benefit_summary: "100% Free doorstep Mobile Medical Units (MMU), free monthly medicines for diabetes/hypertension, free cataract eye surgeries, and assistive walking devices for disadvantaged seniors.",
    benefit_summary_hi: "घर के पास मोबाइल मेडिकल यूनिट से मुफ्त डॉक्टर परामर्श, बीपी/शुगर की मुफ्त मासिक दवाएं, मुफ्त मोतियाबिंद ऑपरेशन व चश्मे/वॉकिंग स्टिक वितरण।",
    benefit_amount_tag: "100% Free Healthcare & Surgery",
    benefit_amount_tag_hi: "100% मुफ्त इलाज, दवाएं व ऑपरेशन",
    eligibility: {
      min_age: 55,
      max_age: 100,
      max_income: 300000,
      states: ["all"],
      occupations: ["all", "retired", "unemployed", "homemaker", "farmer"],
      genders: ["all"],
      categories: ["all"],
      special_condition_en: "Seniors aged 55+ from economically vulnerable or low-income families without medical coverage",
      special_condition_hi: "55 वर्ष से अधिक उम्र के बुजुर्ग जिनकी पारिवारिक आय सीमित है और चिकित्सा सुविधा का अभाव है"
    },
    documents: [
      "Aadhaar Card or Voter ID card of senior citizen",
      "BPL / Antyodaya / Ration Card or income declaration",
      "Previous medical prescription / doctor slips (if any)",
      "Active mobile number or family contact"
    ],
    documents_hi: [
      "वरिष्ठ नागरिक का आधार कार्ड या वोटर आईडी",
      "बीपीएल/राशन कार्ड या स्व-घोषणा आय पत्र",
      "पुरानी बीमारी की पर्ची (यदि उपलब्ध हो)",
      "मोबाइल नंबर"
    ],
    apply_steps: [
      "Locate the HelpAge India Mobile Medical Unit (MMU) schedule in your district or call Elder Helpline 14567.",
      "Visit the free MMU health camp with your Aadhaar and medical records.",
      "Get free doctor examination, blood glucose check, and BP screening.",
      "Receive 1 month of free prescribed medicines directly on site.",
      "Patients needing cataract surgery are referred to partner eye hospitals with free surgery, lens, and transport."
    ],
    apply_steps_hi: [
      "अपने जिले में हेल्पएज मोबाइल मेडिकल वैन का समय पता करें या हेल्पलाइन 14567 पर कॉल करें।",
      "नजदीकी मेडिकल शिविर में आधार कार्ड के साथ जाएं।",
      "मुफ्त डॉक्टर जांच, शुगर व बीपी की जांच करवाएं।",
      "एक माह की दवाएं बिल्कुल मुफ्त प्राप्त करें।",
      "मोतियाबिंद के मरीजों का प्रतिष्ठित नेत्र अस्पतालों में मुफ्त लेंस प्रत्यारोपण व ऑपरेशन कराया जाता है।"
    ],
    apply_link: "https://www.helpageindia.org/healthcare/",
    source: "https://www.helpageindia.org/",
    last_verified: "2026-09-28",
    csc_supported: true,
    tags: ["helpage", "elderly health", "senior citizen", "free surgery", "cataract", "mmu"]
  },
  {
    id: "scheme_tata_aig_elder_care",
    name: "Tata AIG Senior Citizen Health & Critical Care Shield",
    name_hi: "टाटा एआईजी वरिष्ठ नागरिक स्वास्थ्य सुरक्षा कवच",
    ministry: "Tata AIG & Tata Trusts CSR Support",
    ministry_hi: "टाटा एआईजी व टाटा ट्रस्ट्स सहयोग",
    category: "healthcare",
    sector: "private",
    provider_type: "private_sector",
    target_group: "elder",
    benefit_summary: "Comprehensive health coverage of ₹3,00,000 to ₹5,00,000 for seniors with no maximum entry age limit, covering hospitalization, AYUSH treatments, home nursing, and pre-existing conditions.",
    benefit_summary_hi: "वरिष्ठ नागरिकों हेतु ₹3 लाख से ₹5 लाख तक का कैशलेस स्वास्थ्य बीमा, जिसमें अस्पताल में भर्ती, आयुष इलाज और होम नर्सिंग देखभाल शामिल है।",
    benefit_amount_tag: "₹3 Lakh - ₹5 Lakh Cashless Cover",
    benefit_amount_tag_hi: "₹3 लाख - ₹5 लाख कैशलेस इलाज",
    eligibility: {
      min_age: 60,
      max_age: 85,
      max_income: 1500000,
      states: ["all"],
      occupations: ["all", "retired", "salaried", "self_employed", "homemaker"],
      genders: ["all"],
      categories: ["all"],
      special_condition_en: "Senior citizen aged 60-85; pre-policy medical checkup waived or subsidized",
      special_condition_hi: "60 से 85 वर्ष के वरिष्ठ नागरिक; व्यापक कैशलेस अस्पताल सुरक्षा"
    },
    documents: [
      "Aadhaar Card of senior citizen",
      "PAN Card",
      "Recent Medical history / discharge summary (if hospitalized previously)",
      "Bank Account details for claims processing"
    ],
    documents_hi: [
      "वरिष्ठ नागरिक का आधार कार्ड",
      "पैन कार्ड",
      "पिछली बीमारी की मेडिकल रिपोर्ट (यदि कोई हो)",
      "बैंक खाता विवरण"
    ],
    apply_steps: [
      "Visit the Tata AIG Senior Citizen portal or speak to an authorized agent.",
      "Enter age, location, and desired health sum insured (₹3L / ₹5L).",
      "Complete declaration of health conditions.",
      "Avail cashless hospitalization across 10,000+ network hospitals throughout India.",
      "In-hospital dedicated claim assistance provided for elders."
    ],
    apply_steps_hi: [
      "टाटा एआईजी सीनियर सिटीजन पोर्टल पर जाएं।",
      "आयु, शहर और बीमा राशि (₹3 लाख से ₹5 लाख) चुनें।",
      "स्वास्थ्य विवरण भरें और पॉलिसी प्राप्त करें।",
      "देशभर के 10,000+ अस्पतालों में कैशलेस भर्ती की सुविधा मिलती है।"
    ],
    apply_link: "https://www.tataaig.com/health-insurance/senior-citizens",
    source: "https://www.tataaig.com/",
    last_verified: "2026-09-28",
    csc_supported: true,
    tags: ["tata", "senior citizen", "health insurance", "cashless hospitalization", "elder care"]
  },
  // =========================================================================
  // PRIVATE SECTOR SCHEMES FOR PARENTS, FAMILIES & MEDICAL GRANTS
  // =========================================================================
  {
    id: "scheme_tata_trusts_medical_grant",
    name: "Tata Trusts Individual Medical & Critical Illness Grant",
    name_hi: "टाटा ट्रस्ट्स व्यक्तिगत चिकित्सा अनुदान (गंभीर बीमारी सहायता)",
    ministry: "Tata Trusts (Sir Dorabji Tata Trust & Allied Trusts)",
    ministry_hi: "टाटा ट्रस्ट्स (सर दोराबजी टाटा ट्रस्ट)",
    category: "healthcare",
    sector: "private",
    provider_type: "csr_trust",
    target_group: "parent",
    benefit_summary: "Direct financial grant of up to ₹5,00,000 for critical surgeries and life-saving treatments (Cancer, pediatric cardiac surgery, neurosurgery, kidney transplants) disbursed directly to accredited hospitals.",
    benefit_summary_hi: "माता-पिता व परिवारों को कैंसर, बच्चों के दिल के ऑपरेशन, न्यूरो व किडनी ट्रांसप्लांट जैसी गंभीर बीमारियों हेतु ₹5,00,000 तक का प्रत्यक्ष अस्पताल अनुदान।",
    benefit_amount_tag: "Up to ₹5,00,000 Grant",
    benefit_amount_tag_hi: "₹5,00,000 तक प्रत्यक्ष चिकित्सा अनुदान",
    eligibility: {
      min_age: 0,
      max_age: 100,
      max_income: 500000,
      states: ["all"],
      occupations: ["all", "farmer", "salaried", "self_employed", "unemployed", "homemaker", "retired", "student"],
      genders: ["all"],
      categories: ["all"],
      special_condition_en: "Patient or family with annual income below ₹5 Lakh undergoing treatment at empanelled charitable or government hospitals",
      special_condition_hi: "₹5 लाख से कम वार्षिक आय वाले परिवार जो सूचीबद्ध अस्पतालों में गंभीर बीमारी का इलाज करा रहे हैं"
    },
    documents: [
      "Hospital estimate letter signed by treating surgeon / Medical Superintendent",
      "Diagnostic test reports (Biopsy / Angiography / MRI / CT scan)",
      "Family Income Certificate / BPL Card / Salary slip (under ₹5 Lakh/yr)",
      "Aadhaar Cards of patient and parents/guardian",
      "Hospital bank account details for direct grant transfer"
    ],
    documents_hi: [
      "अस्पताल के मुख्य डॉक्टर/सर्जन द्वारा हस्ताक्षरित इलाज खर्च का अनुमान पत्र (Estimate Letter)",
      "रोग निदान रिपोर्ट (बायोप्सी, एंजियोग्राफी, एमआरआई आदि)",
      "पारिवारिक आय प्रमाण पत्र (तहसीलदार द्वारा जारी, ₹5 लाख से कम)",
      "मरीज और माता-पिता/अभिभावक का आधार कार्ड",
      "अस्पताल का बैंक खाता विवरण"
    ],
    apply_steps: [
      "Obtain an official treatment estimate certificate from the hospital's Medical Social Work department.",
      "Visit the Tata Trusts Individual Medical Grants portal (tatatrusts.org).",
      "Fill the patient and family profile, treatment details, and estimated expenses.",
      "Upload hospital estimate, diagnostic reports, and family income certificate.",
      "Trust medical board reviews within 7-10 days; approved grant is paid directly to the hospital billing desk."
    ],
    apply_steps_hi: [
      "अस्पताल के मेडिकल सोशल वर्क विभाग से इलाज खर्च का अनुमान प्रमाण पत्र (Estimate) बनवाएं।",
      "टाटा ट्रस्ट्स पोर्टल (tatatrusts.org) पर मेडिकल ग्रांट हेतु आवेदन करें।",
      "मरीज व परिवार का विवरण तथा डॉक्टर की पर्ची भरें।",
      "आय प्रमाण पत्र और रिपोर्ट अपलोड करें।",
      "स्वीकृति के बाद अनुदान राशि सीधे अस्पताल के खाते में मरीज के नाम पर भेज दी जाती है।"
    ],
    apply_link: "https://www.tatatrusts.org/our-work/individual-grants-programme/medical",
    source: "https://www.tatatrusts.org/",
    last_verified: "2026-09-28",
    csc_supported: true,
    tags: ["tata trusts", "medical grant", "cancer surgery", "pediatric heart", "parents", "charity"]
  },
  {
    id: "scheme_icici_foundation_family",
    name: "ICICI Foundation Family Livelihood & Rural Healthcare Support",
    name_hi: "आईसीआईसीआई फाउंडेशन परिवार आजीविका व ग्रामीण स्वास्थ्य मिशन",
    ministry: "ICICI Foundation for Inclusive Growth",
    ministry_hi: "आईसीआईसीआई फाउंडेशन",
    category: "business_employment",
    sector: "private",
    provider_type: "csr_trust",
    target_group: "parent",
    benefit_summary: "100% Free practical livelihood skill training for parents & youth in 40+ local trades, free starter toolkits to launch household micro-enterprises, and free health checkups.",
    benefit_summary_hi: "माता-पिता व बेरोजगार युवाओं को 40+ व्यवसायों में निःशुल्क हुनर प्रशिक्षण, स्वरोजगार हेतु मुफ्त टूलकिट तथा प्राथमिक स्वास्थ्य सहायता।",
    benefit_amount_tag: "Free Training + Business Toolkit",
    benefit_amount_tag_hi: "मुफ्त हुनर प्रशिक्षण + टूलकिट अनुदान",
    eligibility: {
      min_age: 18,
      max_age: 55,
      max_income: 300000,
      states: ["all"],
      occupations: ["all", "self_employed", "unemployed", "homemaker", "farmer", "salaried"],
      genders: ["all"],
      categories: ["all"],
      special_condition_en: "Unemployed or low-earning parents/youth seeking to establish micro-enterprises; family income < ₹3 Lakh",
      special_condition_hi: "कम आय वाले माता-पिता व युवा जो नया स्वरोजगार शुरू करना चाहते हैं"
    },
    documents: [
      "Aadhaar Card and Voter ID card",
      "Passport size photographs (3 copies)",
      "Proof of educational qualification (Class 8th / 10th / 12th pass)",
      "Bank Account Passbook for micro-enterprise linkages"
    ],
    documents_hi: [
      "आधार कार्ड व वोटर पहचान पत्र",
      "3 पासपोर्ट साइज फोटो",
      "शैक्षणिक योग्यता की मार्कशीट (8वीं/10वीं/12वीं)",
      "बैंक बचत खाता पासबुक"
    ],
    apply_steps: [
      "Visit the nearest ICICI Academy for Skills or Rural Livelihood training centre.",
      "Select your preferred trade (Electrical, AC repair, tailoring, dairy farming, mobile repair).",
      "Attend the free 12-week practical classroom and lab course.",
      "Receive industry certification and free starter enterprise toolkit.",
      "Foundation facilitates 100% placement or micro-credit bank linkage to start self-employment."
    ],
    apply_steps_hi: [
      "नजदीकी आईसीआईसीआई स्किल्स अकादमी या ग्रामीण केंद्र पर जाएं।",
      "अपनी पसंद का व्यवसाय (इलेक्ट्रीशियन, सिलाई, डेयरी, मोबाइल रिपेयरिंग) चुनें।",
      "12 सप्ताह का निःशुल्क व्यावहारिक प्रशिक्षण पूरा करें।",
      "सर्टिफिकेट और व्यवसाय शुरू करने हेतु मुफ्त टूलकिट प्राप्त करें।",
      "फाउंडेशन द्वारा रोजगार या स्वरोजगार ऋण सहायता उपलब्ध कराई जाती है।"
    ],
    apply_link: "https://icicifoundation.org/rural-livelihood/",
    source: "https://icicifoundation.org/",
    last_verified: "2026-09-28",
    csc_supported: true,
    tags: ["icici", "livelihood", "skills", "parents", "rural employment", "csr training"]
  },
  {
    id: "scheme_hdfc_ergo_family_health",
    name: "HDFC ERGO Suraksha Family Health & Maternity Support",
    name_hi: "एचडीएफसी एर्गो सुरक्षा परिवार स्वास्थ्य व मातृत्व सहायता",
    ministry: "HDFC ERGO Micro-Insurance CSR Wing",
    ministry_hi: "एचडीएफसी एर्गो परिवार सुरक्षा विभाग",
    category: "healthcare",
    sector: "private",
    provider_type: "private_sector",
    target_group: "parent",
    benefit_summary: "Affordable family floater medical protection up to ₹5,00,000 covering both parents and up to 3 children, with newborn vaccination coverage, maternity support, and free online doctor consultations.",
    benefit_summary_hi: "माता-पिता और 3 बच्चों हेतु ₹5 लाख तक का किफायती फैमिली हेल्थ कवर, जिसमें नवजात शिशु टीकाकरण, प्रसूति सहायता व 24x7 मुफ्त डॉक्टर टेली-परामर्श शामिल है।",
    benefit_amount_tag: "₹3 Lakh - ₹5 Lakh Family Cover",
    benefit_amount_tag_hi: "₹3 लाख - ₹5 लाख पारिवारिक स्वास्थ्य सुरक्षा",
    eligibility: {
      min_age: 18,
      max_age: 65,
      max_income: 800000,
      states: ["all"],
      occupations: ["all"],
      genders: ["all"],
      categories: ["all"],
      special_condition_en: "Parents aged 18-65 covering self, spouse, and dependent children up to age 25",
      special_condition_hi: "18 से 65 वर्ष के माता-पिता जो स्वयं व अपने बच्चों को स्वास्थ्य सुरक्षा देना चाहते हैं"
    },
    documents: [
      "Aadhaar Cards of parents and children (or birth certificate of child)",
      "PAN Card of primary insured parent",
      "Bank Account details for claim reimbursements",
      "Medical history declaration"
    ],
    documents_hi: [
      "माता-पिता और बच्चों का आधार कार्ड (या जन्म प्रमाण पत्र)",
      "माता-पिता का पैन कार्ड",
      "बैंक खाता पासबुक",
      "स्वास्थ्य घोषणा पत्र"
    ],
    apply_steps: [
      "Visit HDFC ERGO family health portal or nearest branch.",
      "Select 'Family Floater Health' plan and enter family members' ages.",
      "Choose sum insured (₹3 Lakh or ₹5 Lakh).",
      "Complete instant digital enrollment.",
      "Receive digital health card for cashless admission across 12,000+ empanelled hospitals."
    ],
    apply_steps_hi: [
      "एचडीएफसी एर्गो फैमिली हेल्थ पोर्टल पर जाएं।",
      "फैमिली फ्लोटर प्लान चुनें और माता-पिता व बच्चों की उम्र दर्ज करें।",
      "बीमा राशि (₹3 लाख या ₹5 लाख) चुनें।",
      "डिजिटल कार्ड प्राप्त करें जिससे 12,000+ अस्पतालों में बिना नकद खर्च किए इलाज होता है।"
    ],
    apply_link: "https://www.hdfcergo.com/health-insurance",
    source: "https://www.hdfcergo.com/",
    last_verified: "2026-09-28",
    csc_supported: true,
    tags: ["hdfc ergo", "family health", "maternity", "parents", "child vaccination", "insurance"]
  },
  {
    id: "scheme_axis_bank_foundation_livelihood",
    name: "Axis Bank Foundation Sustainable Livelihood for Rural Families",
    name_hi: "एक्सिस बैंक फाउंडेशन ग्रामीण परिवार आजीविका व अनुदान योजना",
    ministry: "Axis Bank Foundation",
    ministry_hi: "एक्सिस बैंक फाउंडेशन",
    category: "business_employment",
    sector: "private",
    provider_type: "bank",
    target_group: "parent",
    benefit_summary: "Seed capital grants, livestock support, agricultural input subsidies, and market linkage to empower rural parents to build dependable income streams of ₹60,000–₹1,20,000/year.",
    benefit_summary_hi: "ग्रामीण माता-पिता को बीज पूंजी अनुदान, पशुपालन सहायता, कृषि इनपुट सब्सिडी व बाजार सहयोग ताकि वे ₹60,000 से ₹1.2 लाख अतिरिक्त वार्षिक आय बना सकें।",
    benefit_amount_tag: "₹50,000 - ₹1 Lakh Assistance",
    benefit_amount_tag_hi: "₹50,000 - ₹1 लाख आजीविका अनुदान",
    eligibility: {
      min_age: 18,
      max_age: 60,
      max_income: 250000,
      states: ["all"],
      occupations: ["farmer", "self_employed", "homemaker", "unemployed", "all"],
      genders: ["all"],
      categories: ["all"],
      special_condition_en: "Small/marginal farming or landless rural parents enrolled in village self-help groups (SHGs) or farmer producer organizations",
      special_condition_hi: "छोटे किसान या ग्रामीण माता-पिता जो स्वयं सहायता समूह या किसान समूह से जुड़े हैं"
    },
    documents: [
      "Aadhaar Card and Ration Card (BPL / Antyodaya / Priority)",
      "Bank Account Passbook (Aadhaar linked)",
      "Self-Help Group (SHG) membership certificate or Gram Panchayat verification",
      "Landholding proof or tenant declaration"
    ],
    documents_hi: [
      "आधार कार्ड व राशन कार्ड",
      "बैंक पासबुक (आधार से लिंक)",
      "स्वयं सहायता समूह (SHG) या ग्राम पंचायत से सदस्यता प्रमाण पत्र",
      "भूमि स्वामित्व या बटाईदार घोषणा पत्र"
    ],
    apply_steps: [
      "Contact your village Self-Help Group (SHG) cluster or Axis Bank Foundation partner NGO.",
      "Enroll in the sustainable livelihood cluster program.",
      "Participate in modern agri-allied training (organic farming, goat rearing, horticulture).",
      "Receive seed capital grant and bio-inputs directly.",
      "Access collective marketing channels to sell produce at fair market price."
    ],
    apply_steps_hi: [
      "अपने गांव के स्वयं सहायता समूह या एक्सिस बैंक फाउंडेशन से जुड़े संगठन से संपर्क करें।",
      "आजीविका सहायता कार्यक्रम में पंजीकरण कराएं।",
      "उन्नत कृषि या पशुपालन का प्रशिक्षण लें।",
      "बीज पूंजी अनुदान और कृषि सामग्री प्राप्त करें।",
      "उत्पाद को सीधे बाजार में बेचकर परिवार की नियमित आमदनी बढ़ाएं।"
    ],
    apply_link: "https://www.axisbankfoundation.org/",
    source: "https://www.axisbankfoundation.org/",
    last_verified: "2026-09-28",
    csc_supported: true,
    tags: ["axis bank", "rural livelihood", "family support", "parents", "agriculture", "grants"]
  }
];

export const SCHEMES: Scheme[] = [...BASE_SCHEMES, ...STATE_SCHEMES];

export interface UserProfile {
  language: 'en' | 'hi';
  age: number;
  state: string;
  income: number;
  occupation: 'student' | 'farmer' | 'self_employed' | 'salaried' | 'unemployed' | 'retired' | 'homemaker';
  gender: 'male' | 'female' | 'other';
  category: 'general' | 'obc' | 'sc' | 'st' | 'ews';
}

export interface MatchReason {
  field: string;
  passed: boolean;
  text_en: string;
  text_hi: string;
}

export interface MatchedSchemeResult {
  scheme: Scheme;
  why_you_qualify: string; // from LLM or rule template
  match_reasons: MatchReason[];
  is_exact_match: boolean;
  missing_conditions?: MatchReason[];
}

export interface MatchEngineResponse {
  count: number;
  results: MatchedSchemeResult[];
  nearly_eligible: MatchedSchemeResult[];
  source: 'gemini' | 'template';
  user_profile: UserProfile;
}
