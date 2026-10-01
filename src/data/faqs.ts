export interface FAQItem {
  id: string;
  category: 'application' | 'eligibility' | 'csc' | 'platform';
  question: string;
  question_hi: string;
  answer: string;
  answer_hi: string;
  key_points?: string[];
  key_points_hi?: string[];
  helpful_link?: {
    text: string;
    text_hi: string;
    url: string;
  };
}

export const FAQS_DATA: FAQItem[] = [
  {
    id: "faq_1",
    category: "application",
    question: "What is the exact step-by-step process after finding an eligible scheme?",
    question_hi: "योजनामित्र पर पात्र योजना मिलने के बाद आगे आवेदन कैसे करें?",
    answer: "Once you identify an eligible scheme on YojanaMitra, click 'View Checklist & How to Apply' on the scheme card. Review the required documents, tick off the ones you have ready, and use the 'Visit Official Government Portal' button to submit online or take the printed checklist to your nearest Common Service Centre (CSC) or Gram Panchayat office.",
    answer_hi: "योजनामित्र पर अपनी पात्र योजना देखने के बाद कार्ड पर दिए गए 'दस्तावेज सूची व आवेदन प्रक्रिया' बटन पर क्लिक करें। आवश्यक दस्तावेजों की जांच करें, जो दस्तावेज आपके पास हैं उन पर टिक लगाएं, और 'आधिकारिक सरकारी पोर्टल' पर जाकर सीधे ऑनलाइन आवेदन करें अथवा प्रिंट की गई चेकलिस्ट लेकर नजदीकी जन सेवा केंद्र (CSC) या ग्राम पंचायत जाएं।",
    key_points: [
      "Check your document readiness score before leaving home",
      "Print or save the checklist via WhatsApp to avoid missing papers",
      "Apply only on official government domains (.gov.in or .nic.in)"
    ],
    key_points_hi: [
      "घर से निकलने से पहले दस्तावेज तत्परता स्कोर (Readiness Score) अवश्य जांच लें",
      "दस्तावेजों की पर्ची व्हाट्सएप पर शेयर या प्रिंट कर लें ताकि कोई कागजात न छूटे",
      "केवल आधिकारिक सरकारी वेबसाइट (.gov.in या .nic.in) पर ही आवेदन करें"
    ]
  },
  {
    id: "faq_2",
    category: "csc",
    question: "Where can I apply offline if I don't have a computer or internet access?",
    question_hi: "यदि मेरे पास कंप्यूटर या इंटरनेट नहीं है, तो मैं ऑफलाइन कहां आवेदन कर सकता हूं?",
    answer: "You can apply at any authorized Common Service Centre (CSC / Jan Seva Kendra), Village Gram Panchayat office, Block Development Office (BDO), or Tehsil office. In cities, you can also visit Municipal Ward Citizen Service counters or District Social Welfare offices.",
    answer_hi: "आप किसी भी अधिकृत जन सेवा केंद्र (CSC / ग्राम सुविधा केंद्र), ग्राम पंचायत सचिवालय, ब्लॉक विकास अधिकारी (BDO) कार्यालय, या तहसील कार्यालय जा सकते हैं। शहरी क्षेत्रों में नगर निगम/नगर पालिका के नागरिक सुविधा केंद्र या जिला समाज कल्याण विभाग में संपर्क कर सकते हैं।",
    helpful_link: {
      text: "Locate your nearest CSC Centre",
      text_hi: "नजदीकी सीएससी केंद्र खोजें",
      url: "https://locator.csccloud.in/"
    }
  },
  {
    id: "faq_3",
    category: "application",
    question: "Is there any official government fee to apply for welfare schemes?",
    question_hi: "क्या सरकारी कल्याणकारी योजनाओं में आवेदन करने के लिए कोई सरकारी शुल्क लगता है?",
    answer: "Most central welfare schemes (like PM-KISAN, Ayushman Bharat PM-JAY, National Scholarship Portal, and Mudra Loans) have ZERO government application fees on official portals. Authorized CSC operators charge only a standard nominal fee (usually ₹30 to ₹50) set by the government for scanning, typing, and printing service.",
    answer_hi: "अधिकांश केंद्रीय कल्याणकारी योजनाओं (जैसे पीएम-किसान, आयुष्मान भारत, राष्ट्रीय छात्रवृत्ति, और मुद्रा ऋण) के आधिकारिक सरकारी पोर्टल पर आवेदन पूरी तरह निःशुल्क (Zero Fee) होता है। यदि आप जन सेवा केंद्र (CSC) से फॉर्म भरवाते हैं, तो संचालक केवल स्कैनिंग और प्रिंटिंग का सरकार द्वारा निर्धारित नाममात्र सेवा शुल्क (लगभग ₹30 से ₹50) लेते हैं।",
    key_points: [
      "Never pay middlemen or agents promising guaranteed approvals",
      "Demand a computer-generated CSC acknowledgment receipt"
    ],
    key_points_hi: [
      "योजना का लाभ दिलाने का झूठा झांसा देने वाले किसी दलाल को पैसे न दें",
      "सीएससी केंद्र से हमेशा कम्प्यूटरीकृत आवेदन पावती रसीद (Acknowledgment Receipt) जरूर लें"
    ]
  },
  {
    id: "faq_4",
    category: "eligibility",
    question: "Why must my bank account be Aadhaar-seeded for DBT (Direct Benefit Transfer)?",
    question_hi: "डीबीटी (DBT) के लिए बैंक खाते का आधार से लिंक (सीडेड) होना क्यों अनिवार्य है?",
    answer: "Under the Direct Benefit Transfer (DBT) framework, government financial benefits (like PM-KISAN ₹2,000 installments, scholarship stipends, and pensions) are transferred directly through NPCI Aadhaar Payment Bridge. If your bank account is not Aadhaar-seeded, transactions will fail even if your application is approved.",
    answer_hi: "प्रत्यक्ष लाभ अंतरण (DBT) व्यवस्था के तहत सरकारी आर्थिक सहायता (जैसे पीएम-किसान की किस्तें, छात्रवृत्ति भत्ता, और वृद्धावस्था पेंशन) सीधे एनपीसीआई (NPCI) आधार पेमेंट ब्रिज के जरिए ट्रांसफर होती हैं। यदि बैंक खाता आधार से सीडेड (डीबीटी सक्षम) नहीं होगा, तो आवेदन स्वीकृत होने के बाद भी पैसे नहीं आ पाएंगे।",
    key_points: [
      "Visit your bank branch and ask for 'Aadhaar NPCI DBT Seeding Form'",
      "Verify DBT status online on the UIDAI resident portal"
    ],
    key_points_hi: [
      "अपनी बैंक शाखा जाएं और 'आधार एनपीसीआई डीबीटी मैपिंग फॉर्म' भरें",
      "UIDAI की आधिकारिक वेबसाइट पर जाकर बैंक-आधार लिंकिंग स्थिति जांचें"
    ]
  },
  {
    id: "faq_5",
    category: "eligibility",
    question: "What if my family income certificate has expired or is still under process?",
    question_hi: "यदि मेरा पारिवारिक आय प्रमाण पत्र पुराना हो गया है या अभी बन रहा है, तो क्या करूं?",
    answer: "Most state revenue portals issue income certificates valid for 1 to 3 years. If yours has expired, apply immediately through your state's e-District portal or local Tehsil counter. For several loan and emergency schemes, an authorized self-declaration or Gram Pradhan verification is provisionally accepted while your formal certificate is processed.",
    answer_hi: "अधिकांश राज्यों में आय प्रमाण पत्र की वैधता 1 से 3 वर्ष की होती है। यदि आपका प्रमाण पत्र पुराना हो गया है, तो तुरंत अपने राज्य के ई-डिस्ट्रिक्ट (e-District) पोर्टल या तहसील से नया बनवाएं। कुछ योजनाओं में स्थायी प्रमाण पत्र बनने तक ग्राम प्रधान/पार्षद का आय सत्यापन या स्व-घोषणा पत्र भी अंतरिम रूप से मान्य होता है।"
  },
  {
    id: "faq_6",
    category: "eligibility",
    question: "What are 'Nearly Eligible' schemes and how do I unlock them?",
    question_hi: "योजनामित्र पर 'लगभग पात्र योजनाएं' (Nearly Eligible) क्या हैं और इन्हें कैसे प्राप्त करें?",
    answer: "Nearly Eligible schemes are benefits where you meet 5 out of 6 government requirements, but missed exactly one threshold (such as being slightly over the income ceiling, missing a specific state domicile, or age cutoff). We highlight the exact missing requirement so you can review if updated family income documents or category records make you eligible.",
    answer_hi: "'लगभग पात्र योजनाएं' वे योजनाएं हैं जहां आप 6 में से 5 सरकारी शर्तें पूरी करते हैं, लेकिन सिर्फ एक शर्त (जैसे आय सीमा थोड़ी अधिक होना, या उम्र में थोड़ा अंतर) अधूरी रह जाती है। योजनामित्र आपको स्पष्ट बताता है कि कौन सी एक शर्त अधूरी है, जिससे आप जान सकें कि कौन सा दस्तावेज सुधारने पर आपको लाभ मिल सकता है।"
  },
  {
    id: "faq_7",
    category: "platform",
    question: "Does YojanaMitra store my personal information or Aadhaar details?",
    question_hi: "क्या योजनामित्र मेरा व्यक्तिगत डेटा, आय या आधार विवरण सुरक्षित रखता है?",
    answer: "No. YojanaMitra is engineered with strict Privacy-by-Design principles. You do not need to enter your Aadhaar number or full name. The questions you answer (age, income range, state) are evaluated in-memory only during your session and are never retained. If you choose to subscribe for email alerts, only your email and broad category are securely stored in Firestore.",
    answer_hi: "बिल्कुल नहीं। योजनामित्र आपकी गोपनीयता की पूरी रक्षा करता है। यहां आपको अपना आधार नंबर या पूरा नाम डालने की कोई आवश्यकता नहीं है। आपके द्वारा भरे गए विकल्प (आयु, आय सीमा, राज्य) केवल उसी समय पात्रता जांचने हेतु उपयोग होते हैं और कहीं सेव नहीं होते। यदि आप ईमेल अलर्ट की सदस्यता लेते हैं, तो केवल आपका ईमेल और सामान्य वर्ग ही सुरक्षित रूप से स्टोर होता है।"
  },
  {
    id: "faq_8",
    category: "csc",
    question: "How can CSC kiosk operators and NGO volunteers evaluate multiple citizens?",
    question_hi: "सीएससी संचालक या सामाजिक कार्यकर्ता कई ग्रामीणों की पात्रता एक साथ कैसे जांच सकते हैं?",
    answer: "Click the 'CSC Mode' (सीएससी मोड) toggle in the top navigation header. This switches the interface into a high-speed single-page form where an operator can enter an applicant's age, occupation, and state in 10 seconds, print the voucher for the citizen, and hit 'Start New Assessment' for the next person in line.",
    answer_hi: "शीर्ष नेविगेशन में दिए गए 'सीएससी मोड' (CSC Mode) बटन पर क्लिक करें। यह स्क्रीन को एक तीव्र, एकल-पृष्ठ फॉर्म में बदल देता है जहां संचालक मात्र 10 सेकंड में किसी भी नागरिक की उम्र, व्यवसाय और राज्य चुनकर परिणाम निकाल सकते हैं, तुरंत पर्ची प्रिंट कर सकते हैं, और कतार में खड़े अगले व्यक्ति की जांच कर सकते हैं।"
  },
  {
    id: "faq_9",
    category: "platform",
    question: "How often are the government scheme rules and application links updated?",
    question_hi: "सरकारी योजनाओं के नियम, पात्रता और पोर्टल लिंक कितनी बार अपडेट किए जाते हैं?",
    answer: "Our rules engine is synchronized against official central gazettes, ministry updates, and the central myScheme.gov.in database. Each scheme displays a 'Last Verified' timestamp and official source link so you can independently confirm the current rules.",
    answer_hi: "हमारा नियम इंजन केंद्र व राज्य मंत्रालयों की आधिकारिक अधिसूचनाओं और myScheme.gov.in डेटाबेस के साथ सत्यापित रहता है। प्रत्येक योजना कार्ड में सत्यापन दिनांक (Last Verified) और आधिकारिक सरकारी स्रोत लिंक दिया जाता है ताकि आप स्वयं भी प्रामाणिकता की जांच कर सकें।"
  }
];
