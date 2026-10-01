import type { Scheme } from './schemes.ts';

export const STATE_SCHEMES: Scheme[] = [
  // =========================================================================
  // STATE GOVERNMENT SCHEMES FOR STUDENTS (EDUCATION, SCHOLARSHIPS & GADGETS)
  // =========================================================================
  {
    id: "scheme_up_tablet_smartphone",
    name: "Swami Vivekananda Yuva Sashaktikaran Yojana (UP Free Smartphone & Tablet)",
    name_hi: "स्वामी विवेकानंद युवा सशक्तिकरण योजना (मुफ्त स्मार्टफोन व टैबलेट)",
    ministry: "Department of IT & Electronics, Government of Uttar Pradesh",
    ministry_hi: "आईटी एवं इलेक्ट्रॉनिक्स विभाग, उत्तर प्रदेश सरकार",
    category: "education",
    sector: "government",
    provider_type: "state_government",
    target_group: "student",
    benefit_summary: "Free high-configuration digital tablet or smartphone distributed to undergraduate, postgraduate, diploma, ITI, skill training, and medical students across Uttar Pradesh.",
    benefit_summary_hi: "उत्तर प्रदेश के स्नातक, परास्नातक, डिप्लोमा, आईटीआई व कौशल प्रशिक्षण ले रहे छात्र-छात्राओं को डिजिटल शिक्षा हेतु मुफ्त स्मार्टफोन अथवा टैबलेट।",
    benefit_amount_tag: "Free Tablet / Smartphone",
    benefit_amount_tag_hi: "मुफ्त टैबलेट / स्मार्टफोन",
    eligibility: {
      min_age: 17,
      max_age: 30,
      max_income: 200000,
      states: ["Uttar Pradesh"],
      occupations: ["student"],
      genders: ["all"],
      categories: ["all"],
      special_condition_en: "Enrolled in a recognized college/university in UP in graduation, PG, ITI, or polytechnic diploma courses",
      special_condition_hi: "उत्तर प्रदेश के किसी मान्यता प्राप्त कॉलेज या विश्वविद्यालय में स्नातक, पीजी या डिप्लोमा में नामांकित छात्र"
    },
    documents: [
      "Aadhaar Card with UP permanent address",
      "Current College Student ID Card and Admission Fee Receipt",
      "Class 10 and 12 marksheets",
      "Family Income Certificate (under ₹2 Lakh per annum)"
    ],
    documents_hi: [
      "उत्तर प्रदेश का निवास दर्शाने वाला आधार कार्ड",
      "वर्तमान कॉलेज का पहचान पत्र एवं शुल्क रसीद",
      "10वीं एवं 12वीं की अंकतालिका",
      "पारिवारिक आय प्रमाण पत्र"
    ],
    apply_steps: [
      "Colleges upload enrolled student data directly to the DigiShakti portal (digishakti.up.gov.in).",
      "Students receive an SMS on their registered mobile number regarding distribution schedule.",
      "Collect device from your college on designated distribution day with Aadhaar & College ID."
    ],
    apply_steps_hi: [
      "कॉलेज/संस्थान द्वारा छात्रों का विवरण सीधे डिजि-शक्ति पोर्टल (digishakti.up.gov.in) पर दर्ज किया जाता है।",
      "छात्र को मोबाइल पर डिवाइस वितरण की तिथि और टोकन का एसएमएस प्राप्त होता है।",
      "कॉलेज में आधार व पहचान पत्र दिखाकर मुफ्त स्मार्टफोन/टैबलेट प्राप्त करें।"
    ],
    apply_link: "https://digishakti.up.gov.in/",
    source: "https://digishakti.up.gov.in/",
    last_verified: "2026-09-25",
    csc_supported: true,
    tags: ["uttar pradesh", "tablet", "smartphone", "students", "digital education", "state govt"]
  },
  {
    id: "scheme_up_abhyudaya",
    name: "Mukhyamantri Abhyudaya Yojana (Uttar Pradesh)",
    name_hi: "मुख्यमंत्री अभ्युदय योजना (मुफ्त प्रतियोगी परीक्षा कोचिंग)",
    ministry: "Social Welfare Department, Government of Uttar Pradesh",
    ministry_hi: "समाज कल्याण विभाग, उत्तर प्रदेश सरकार",
    category: "education",
    sector: "government",
    provider_type: "state_government",
    target_group: "student",
    benefit_summary: "100% free high-quality offline and online coaching for UPSC Civil Services, UPPSC, JEE, NEET, NDA, CDS, and Banking, plus free study materials and tablets to toppers.",
    benefit_summary_hi: "यूपीएससी, यूपीपीएससी, जेईई, नीट, एनडीए, सीडीएस जैसी प्रतियोगी परीक्षाओं हेतु 100% मुफ्त कोचिंग, डिजिटल सामग्री व शीर्ष छात्रों को टैबलेट।",
    benefit_amount_tag: "Free Coaching + Study Aid",
    benefit_amount_tag_hi: "मुफ्त कोचिंग + टैबलेट",
    eligibility: {
      min_age: 17,
      max_age: 35,
      max_income: 600000,
      states: ["Uttar Pradesh"],
      occupations: ["student", "unemployed"],
      genders: ["all"],
      categories: ["all"],
      special_condition_en: "UP resident preparing for national/state level competitive examinations",
      special_condition_hi: "उत्तर प्रदेश का स्थायी निवासी जो प्रतियोगी परीक्षाओं की तैयारी कर रहा हो"
    },
    documents: [
      "Aadhaar Card and Domicile Certificate of Uttar Pradesh",
      "Educational certificates (10th, 12th, or Graduation marksheets)",
      "Passport-sized photograph"
    ],
    documents_hi: [
      "आधार कार्ड व उत्तर प्रदेश निवास प्रमाण पत्र",
      "शैक्षणिक प्रमाण पत्र (10वीं, 12वीं या स्नातक)",
      "पासपोर्ट साइज फोटो"
    ],
    apply_steps: [
      "Register on abhyuday.up.gov.in portal selecting your target exam.",
      "Appear for the online entrance/screening test.",
      "Attend counseling and join offline district study center or live virtual classes."
    ],
    apply_steps_hi: [
      "abhyuday.up.gov.in पोर्टल पर परीक्षा का चयन कर पंजीकरण करें।",
      "ऑनलाइन पात्रता परीक्षा में भाग लें।",
      "मेरिट के आधार पर जिला कोचिंग सेंटर में मुफ्त कक्षाओं में भाग लें।"
    ],
    apply_link: "http://abhyuday.up.gov.in/",
    source: "http://abhyuday.up.gov.in/",
    last_verified: "2026-09-25",
    csc_supported: true,
    tags: ["uttar pradesh", "free coaching", "upsc", "neet", "jee", "students"]
  },
  {
    id: "scheme_delhi_jai_bhim",
    name: "Jai Bhim Mukhyamantri Pratibha Vikas Yojana (Delhi)",
    name_hi: "जय भीम मुख्यमंत्री प्रतिभा विकास योजना (दिल्ली)",
    ministry: "Department for Welfare of SC/ST/OBC, Government of NCT of Delhi",
    ministry_hi: "एससी/एसटी/ओबीसी कल्याण विभाग, दिल्ली सरकार",
    category: "education",
    sector: "government",
    provider_type: "state_government",
    target_group: "student",
    benefit_summary: "Free coaching in premier private coaching institutes for IAS, IPS, IES, Medical, Engineering, and Law entrance exams, along with ₹2,500 monthly stipend.",
    benefit_summary_hi: "शीर्ष निजी संस्थानों में आईएएस, पीसीएस, नीट, जेईई हेतु मुफ्त कोचिंग तथा ₹2,500 प्रति माह स्टाइपेंड।",
    benefit_amount_tag: "Free Coaching + ₹2,500/mo Stipend",
    benefit_amount_tag_hi: "मुफ्त कोचिंग + ₹2,500/माह",
    eligibility: {
      min_age: 16,
      max_age: 32,
      max_income: 800000,
      states: ["Delhi (NCT)"],
      occupations: ["student", "unemployed"],
      genders: ["all"],
      categories: ["sc", "st", "obc", "ews"],
      special_condition_en: "Delhi resident student belonging to SC, ST, OBC or EWS passed 10th and 12th from Delhi schools",
      special_condition_hi: "दिल्ली के स्कूलों से 10वीं/12वीं उत्तीर्ण एससी, एसटी, ओबीसी या ईडब्ल्यूएस वर्ग के छात्र"
    },
    documents: [
      "Delhi Residence Proof / Voter ID / Ration Card",
      "Aadhaar Card",
      "Caste or EWS Income Certificate (issued by Delhi Revenue Dept)",
      "Delhi school 10th and 12th marksheets"
    ],
    documents_hi: [
      "दिल्ली का निवास प्रमाण पत्र",
      "आधार कार्ड",
      "जाति प्रमाण पत्र अथवा ईडब्ल्यूएस आय प्रमाण पत्र",
      "दिल्ली के स्कूल से 10वीं व 12वीं की अंकतालिका"
    ],
    apply_steps: [
      "Apply through the Delhi e-District portal (edistrict.delhigovt.nic.in).",
      "Select approved empanelled coaching center for your target exam.",
      "Submit application and receive approval for direct fee transfer to the coaching center."
    ],
    apply_steps_hi: [
      "दिल्ली ई-डिस्ट्रिक्ट पोर्टल (edistrict.delhigovt.nic.in) पर आवेदन करें।",
      "सूचीबद्ध कोचिंग संस्थान का चयन करें।",
      "सत्यापन के बाद कोचिंग फीस सरकार द्वारा भरी जाती है व स्टाइपेंड छात्र के खाते में आता है।"
    ],
    apply_link: "https://edistrict.delhigovt.nic.in/",
    source: "https://edistrict.delhigovt.nic.in/",
    last_verified: "2026-09-25",
    csc_supported: true,
    tags: ["delhi", "free coaching", "stipend", "sc st obc", "students", "state govt"]
  },
  {
    id: "scheme_maha_shahu_maharaj_scholarship",
    name: "Rajarshi Chhatrapati Shahu Maharaj Shikshan Shulk Shishyavrutti Yojna (Maharashtra)",
    name_hi: "राजर्षि छत्रपति शाहू महाराज शिक्षण शुल्क शिष्यवृत्ति योजना (महाराष्ट्र)",
    ministry: "Higher & Technical Education Department, Government of Maharashtra",
    ministry_hi: "उच्च व तंत्र शिक्षण विभाग, महाराष्ट्र शासन",
    category: "education",
    sector: "government",
    provider_type: "state_government",
    target_group: "student",
    benefit_summary: "50% to 100% college tuition fee and exam fee reimbursement for professional & non-professional degrees for students from economically weaker sections.",
    benefit_summary_hi: "व्यावसायिक व सामान्य डिग्री पाठ्यक्रमों हेतु कॉलेज शिक्षण शुल्क एवं परीक्षा शुल्क की 50% से 100% प्रतिपूर्ति।",
    benefit_amount_tag: "50% - 100% Tuition Fee Waiver",
    benefit_amount_tag_hi: "50% - 100% फीस माफी",
    eligibility: {
      min_age: 17,
      max_age: 30,
      max_income: 800000,
      states: ["Maharashtra"],
      occupations: ["student"],
      genders: ["all"],
      categories: ["all"],
      special_condition_en: "Maharashtra domicile student admitted through CAP (Centralized Admission Process) with family income under ₹8 Lakh",
      special_condition_hi: "महाराष्ट्र का मूल निवासी छात्र जो सीएपी (CAP) प्रक्रिया से डिग्री पाठ्यक्रम में नामांकित हो"
    },
    documents: [
      "Domicile Certificate of Maharashtra",
      "Aadhaar Card",
      "Current Year Income Certificate issued by Tehsildar (under ₹8 Lakh)",
      "CAP Allotment Letter and College Fee Receipt",
      "Previous Year Academic Marksheet"
    ],
    documents_hi: [
      "महाराष्ट्र अधिवास प्रमाण पत्र (Domicile)",
      "आधार कार्ड",
      "तहसीलदार द्वारा जारी आय प्रमाण पत्र (₹8 लाख से कम)",
      "सीएपी सीट आवंटन पत्र व फीस रसीद",
      "पिछली कक्षा की अंकतालिका"
    ],
    apply_steps: [
      "Register on MahaDBT portal (mahadbt.maharashtra.gov.in).",
      "Select Directorate of Higher / Technical Education -> Shahu Maharaj Scholarship.",
      "Upload CAP allotment letter and income certificate.",
      "Fee concession is credited directly to college/student account."
    ],
    apply_steps_hi: [
      "MahaDBT पोर्टल (mahadbt.maharashtra.gov.in) पर पंजीकरण करें।",
      "राजर्षि शाहू महाराज शिष्यवृत्ति योजना चुनें।",
      "आवश्यक दस्तावेज व फीस रसीद अपलोड करें।",
      "स्वीकृति के बाद फीस की प्रतिपूर्ति सीधे बैंक खाते/कॉलेज में होती है।"
    ],
    apply_link: "https://mahadbt.maharashtra.gov.in/",
    source: "https://mahadbt.maharashtra.gov.in/",
    last_verified: "2026-09-25",
    csc_supported: true,
    tags: ["maharashtra", "tuition fee waiver", "mahadbt", "college students", "state govt"]
  },
  {
    id: "scheme_mp_medhavi_vidyarthi",
    name: "Mukhyamantri Medhavi Vidyarthi Yojana - MMVY (Madhya Pradesh)",
    name_hi: "मुख्यमंत्री मेधावी विद्यार्थी योजना (मध्य प्रदेश)",
    ministry: "Department of Technical Education & Skill Development, Government of MP",
    ministry_hi: "तकनीकी शिक्षा एवं कौशल विकास विभाग, मध्य प्रदेश शासन",
    category: "education",
    sector: "government",
    provider_type: "state_government",
    target_group: "student",
    benefit_summary: "100% college tuition fees paid by MP Government for Engineering (JEE rank < 1.5L), Medical (NEET), Law (CLAT), or top degree institutions in India.",
    benefit_summary_hi: "इंजीनियरिंग, मेडिकल, लॉ या शीर्ष डिग्री कॉलेजों में अध्ययनरत मेधावी छात्रों की 100% ट्यूशन फीस मध्य प्रदेश सरकार द्वारा वहन की जाती है।",
    benefit_amount_tag: "100% Full Tuition Fee Covered",
    benefit_amount_tag_hi: "100% पूर्ण फीस भुगतान",
    eligibility: {
      min_age: 16,
      max_age: 28,
      max_income: 600000,
      states: ["Madhya Pradesh"],
      occupations: ["student"],
      genders: ["all"],
      categories: ["all"],
      special_condition_en: "MP resident with 70%+ in MP Board or 85%+ in CBSE/ICSE in 12th; admitted in premier degree/professional course",
      special_condition_hi: "12वीं में एमपी बोर्ड से 70% या सीबीएसई से 85% अंक तथा परिवार की वार्षिक आय ₹6 लाख से कम"
    },
    documents: [
      "MP Domicile Certificate and Samagra ID (समग्र आईडी)",
      "12th Marksheet showing qualifying percentage",
      "Admission verification slip / Fee structure of institution",
      "Income Certificate issued by authorized revenue authority",
      "Aadhaar Card and Student Bank Passbook"
    ],
    documents_hi: [
      "मध्य प्रदेश मूल निवास प्रमाण पत्र एवं समग्र आईडी",
      "12वीं कक्षा की अंकतालिका",
      "कॉलेज प्रवेश पत्र एवं फीस विवरण",
      "पारिवारिक आय प्रमाण पत्र",
      "आधार कार्ड व बैंक पासबुक"
    ],
    apply_steps: [
      "Visit MP Scholarship 2.0 / Medhavi portal (scholarshipportal.mp.nic.in).",
      "Register using your 9-digit Samagra ID and Aadhaar.",
      "Input 12th roll number, competitive exam rank, and college admission ID.",
      "Government sanctions and disburses the entire tuition fee directly."
    ],
    apply_steps_hi: [
      "scholarshipportal.mp.nic.in पोर्टल पर जाएं।",
      "समग्र आईडी और आधार दर्ज कर आवेदन करें।",
      "12वीं के अंक, प्रवेश परीक्षा रैंक और कॉलेज विवरण भरें।",
      "सत्यापन के बाद पूरी ट्यूशन फीस सीधे संस्थान को हस्तांतरित की जाती है।"
    ],
    apply_link: "http://scholarshipportal.mp.nic.in/MedhaviChhatra/Default.aspx",
    source: "http://scholarshipportal.mp.nic.in/",
    last_verified: "2026-09-25",
    csc_supported: true,
    tags: ["madhya pradesh", "mmvy", "full fee waiver", "engineering", "neet", "students"]
  },
  {
    id: "scheme_rajasthan_anuprati_coaching",
    name: "Mukhyamantri Anuprati Coaching Yojana (Rajasthan)",
    name_hi: "मुख्यमंत्री अनुप्रति कोचिंग योजना (राजस्थान)",
    ministry: "Social Justice and Empowerment Department, Government of Rajasthan",
    ministry_hi: "सामाजिक न्याय एवं अधिकारिता विभाग, राजस्थान सरकार",
    category: "education",
    sector: "government",
    provider_type: "state_government",
    target_group: "student",
    benefit_summary: "100% free coaching in top institutes in Kota, Jaipur, etc., for UPSC, RPSC, REET, NEET, JEE, CLAT, plus ₹40,000 annual accommodation allowance for outstation students.",
    benefit_summary_hi: "आईएएस, आरएएस, रीट, नीट, जेईई हेतु नामी संस्थानों में 100% मुफ्त कोचिंग व घर से बाहर रहने वाले छात्रों को ₹40,000 वार्षिक आवास/भोजन भत्ता।",
    benefit_amount_tag: "Free Coaching + ₹40,000 Food/Lodging",
    benefit_amount_tag_hi: "मुफ्त कोचिंग + ₹40,000 आवास भत्ता",
    eligibility: {
      min_age: 16,
      max_age: 32,
      max_income: 800000,
      states: ["Rajasthan"],
      occupations: ["student", "unemployed"],
      genders: ["all"],
      categories: ["sc", "st", "obc", "ews", "general"],
      special_condition_en: "Rajasthan domicile student possessing Jan Aadhaar Card with family income under ₹8 Lakh",
      special_condition_hi: "राजस्थान का मूल निवासी छात्र जिसके पास जन आधार कार्ड हो तथा पारिवारिक आय ₹8 लाख से कम हो"
    },
    documents: [
      "Jan Aadhaar Card (जन आधार कार्ड) of Rajasthan",
      "Class 10 and 12 marksheets",
      "Caste Certificate (if claiming reserved category)",
      "Income Certificate"
    ],
    documents_hi: [
      "राजस्थान जन आधार कार्ड",
      "10वीं व 12वीं की अंकतालिका",
      "जाति प्रमाण पत्र",
      "आय प्रमाण पत्र"
    ],
    apply_steps: [
      "Login to SSO Rajasthan portal (sso.rajasthan.gov.in).",
      "Open SJMS portal and click on 'Mukhyamantri Anuprati Coaching Scheme'.",
      "Select desired course and coaching institute choice.",
      "Merit list published based on 10th/12th marks; admission granted automatically."
    ],
    apply_steps_hi: [
      "एसएसओ राजस्थान (sso.rajasthan.gov.in) पोर्टल पर लॉगिन करें।",
      "एसजेएमएस (SJMS) पोर्टल में 'अनुप्रति कोचिंग योजना' चुनें।",
      "कोर्स और पसंदीदा कोचिंग संस्थान का चयन करें।",
      "मेरिट सूची जारी होने पर चयनित संस्थान में सीधे मुफ्त प्रवेश मिलता है।"
    ],
    apply_link: "https://sso.rajasthan.gov.in/",
    source: "https://sje.rajasthan.gov.in/",
    last_verified: "2026-09-25",
    csc_supported: true,
    tags: ["rajasthan", "anuprati", "free coaching", "neet", "jee", "students", "state govt"]
  },
  {
    id: "scheme_wb_kanyashree",
    name: "Kanyashree Prakalpa (West Bengal)",
    name_hi: "कन्याश्री प्रकल्प (पश्चिम बंगाल)",
    ministry: "Department of Women & Child Development and Social Welfare, West Bengal",
    ministry_hi: "महिला एवं बाल विकास व समाज कल्याण विभाग, पश्चिम बंगाल",
    category: "education",
    sector: "government",
    provider_type: "state_government",
    target_group: "student",
    benefit_summary: "UN Award-winning scheme offering ₹1,000 annual scholarship (K1 for classes 8-12) plus a one-time grant of ₹25,000 (K2 at age 18) for girls continuing higher studies unmarried.",
    benefit_summary_hi: "बालिकाओं को शिक्षा जारी रखने हेतु ₹1,000 वार्षिक छात्रवृत्ति (K1) तथा 18 वर्ष की आयु पर ₹25,000 का एकमुश्त अनुदान (K2)।",
    benefit_amount_tag: "₹1,000/yr + ₹25,000 One-time Grant",
    benefit_amount_tag_hi: "₹1,000/वर्ष + ₹25,000 एकमुश्त",
    eligibility: {
      min_age: 13,
      max_age: 19,
      max_income: 120000,
      states: ["West Bengal"],
      occupations: ["student"],
      genders: ["female"],
      categories: ["all"],
      special_condition_en: "Unmarried girl student resident of West Bengal studying in a recognized school or college",
      special_condition_hi: "पश्चिम बंगाल की अविवाहित छात्रा जो किसी मान्यता प्राप्त स्कूल या कॉलेज में पढ़ रही हो"
    },
    documents: [
      "Birth Certificate of girl student",
      "Aadhaar Card",
      "School enrollment certificate",
      "Unmarried declaration form",
      "Student individual Bank Passbook"
    ],
    documents_hi: [
      "छात्रा का जन्म प्रमाण पत्र",
      "आधार कार्ड",
      "स्कूल अध्ययनरत प्रमाण पत्र",
      "अविवाहित होने का घोषणा पत्र",
      "छात्रा की व्यक्तिगत बैंक पासबुक"
    ],
    apply_steps: [
      "Collect Kanyashree Application Form from your school or college.",
      "Fill the form and submit it to head of institution with required certificates.",
      "School uploads data to wb.gov.in Kanyashree portal; grant credited via DBT directly."
    ],
    apply_steps_hi: [
      "अपने विद्यालय या महाविद्यालय से कन्याश्री फॉर्म प्राप्त करें।",
      "फॉर्म भरकर आवश्यक दस्तावेजों सहित स्कूल में जमा करें।",
      "स्कूल द्वारा ऑनलाइन सत्यापन के बाद छात्रवृत्ति सीधे बैंक खाते में भेजी जाती है।"
    ],
    apply_link: "https://www.wbkanyashree.gov.in/",
    source: "https://www.wbkanyashree.gov.in/",
    last_verified: "2026-09-25",
    csc_supported: true,
    tags: ["west bengal", "kanyashree", "girls scholarship", "students", "higher education"]
  },
  {
    id: "scheme_tn_pudhumai_penn",
    name: "Moovalur Ramamirtham Ammaiyar Higher Education Scheme - Pudhumai Penn (Tamil Nadu)",
    name_hi: "पुधुमै पेन उच्च शिक्षा योजना (तमिलनाडु)",
    ministry: "Social Welfare and Women Empowerment Department, Government of Tamil Nadu",
    ministry_hi: "समाज कल्याण एवं महिला सशक्तिकरण विभाग, तमिलनाडु सरकार",
    category: "education",
    sector: "government",
    provider_type: "state_government",
    target_group: "student",
    benefit_summary: "Direct monthly financial allowance of ₹1,000 directly credited to bank accounts of female students pursuing undergraduate degrees, diplomas, or ITI courses.",
    benefit_summary_hi: "सरकारी स्कूलों से पढ़ी छात्राओं को स्नातक, डिप्लोमा या आईटीआई की पढ़ाई जारी रखने हेतु ₹1,000 प्रति माह सीधे बैंक खाते में।",
    benefit_amount_tag: "₹1,000 / month Direct Cash",
    benefit_amount_tag_hi: "₹1,000 / माह सीधे बैंक में",
    eligibility: {
      min_age: 17,
      max_age: 26,
      max_income: 1000000,
      states: ["Tamil Nadu"],
      occupations: ["student"],
      genders: ["female"],
      categories: ["all"],
      special_condition_en: "Girl students who studied in Tamil Nadu Government schools from Class 6 to 12 and enrolled in higher education",
      special_condition_hi: "कक्षा 6 से 12 तक तमिलनाडु के सरकारी स्कूलों में पढ़ी छात्राएं जो उच्च शिक्षा में नामांकित हैं"
    },
    documents: [
      "Proof of studying in TN Government schools from 6th to 12th",
      "College Admission fee receipt and Student ID",
      "Aadhaar Card",
      "Student Bank Account Passbook"
    ],
    documents_hi: [
      "सरकारी स्कूल में कक्षा 6 से 12 तक पढ़ने का प्रमाण पत्र",
      "कॉलेज प्रवेश रसीद व छात्र आईडी कार्ड",
      "आधार कार्ड",
      "बैंक खाता पासबुक"
    ],
    apply_steps: [
      "Colleges conduct registration camps on campus through penkalvi.tn.gov.in portal.",
      "Upload EMIS school student code and verify college admission details.",
      "Amount ₹1,000 credited automatically every month until course completion."
    ],
    apply_steps_hi: [
      "कॉलेज परिसर में penkalvi.tn.gov.in पोर्टल के माध्यम से पंजीकरण होता है।",
      "ईएमआईएस (EMIS) कोड व प्रवेश विवरण का सत्यापन किया जाता है।",
      "डिग्री पूर्ण होने तक प्रति माह ₹1,000 सीधे बैंक खाते में जमा होते हैं।"
    ],
    apply_link: "https://www.penkalvi.tn.gov.in/",
    source: "https://www.penkalvi.tn.gov.in/",
    last_verified: "2026-09-25",
    csc_supported: true,
    tags: ["tamil nadu", "pudhumai penn", "girls higher education", "stipend", "students"]
  },
  {
    id: "scheme_karnataka_yuva_nidhi",
    name: "Yuva Nidhi Scheme (Karnataka)",
    name_hi: "युवा निधि योजना (कर्नाटक)",
    ministry: "Department of Skill Development, Entrepreneurship and Livelihood, Karnataka",
    ministry_hi: "कौशल विकास एवं आजीविका विभाग, कर्नाटक सरकार",
    category: "business_employment",
    sector: "government",
    provider_type: "state_government",
    target_group: "student",
    benefit_summary: "Monthly unemployment allowance of ₹3,000 for degree graduates and ₹1,500 for diploma holders for up to 2 years, combined with free skill development training.",
    benefit_summary_hi: "डिग्री स्नातकों को ₹3,000 प्रति माह तथा डिप्लोमा धारकों को ₹1,500 प्रति माह 2 वर्ष तक का बेरोजगारी भत्ता व मुफ्त कौशल प्रशिक्षण।",
    benefit_amount_tag: "₹3,000 / mo (Degree) • ₹1,500 / mo (Diploma)",
    benefit_amount_tag_hi: "₹3,000 / माह (स्नातक) • ₹1,500 (डिप्लोमा)",
    eligibility: {
      min_age: 18,
      max_age: 28,
      max_income: 800000,
      states: ["Karnataka"],
      occupations: ["student", "unemployed"],
      genders: ["all"],
      categories: ["all"],
      special_condition_en: "Karnataka domicile candidate who graduated/passed diploma and remained unemployed for 6 months after passing",
      special_condition_hi: "कर्नाटक के छात्र जिन्होंने डिग्री/डिप्लोमा उत्तीर्ण किया हो और 6 माह से रोजगार की तलाश में हों"
    },
    documents: [
      "Degree or Diploma Completion Certificate and Marks Cards",
      "Karnataka Domicile Proof (min 6 years study in Karnataka)",
      "Aadhaar Card linked to active bank account",
      "Unemployment Self-declaration"
    ],
    documents_hi: [
      "डिग्री या डिप्लोमा उत्तीर्ण प्रमाण पत्र",
      "कर्नाटक अधिवास प्रमाण पत्र (न्यूनतम 6 वर्ष अध्ययन)",
      "आधार कार्ड (बैंक खाते से लिंक)",
      "बेरोजगारी स्व-घोषणा पत्र"
    ],
    apply_steps: [
      "Visit the Seva Sindhu portal (sevasindhugs.karnataka.gov.in) or Karnataka One center.",
      "Login with Aadhaar and enter degree registration/roll number.",
      "Submit declaration that you are not employed or self-employed.",
      "Monthly DBT credited directly via Aadhaar-enabled payment system."
    ],
    apply_steps_hi: [
      "सेवा सिंधु पोर्टल (sevasindhugs.karnataka.gov.in) या कर्नाटक वन केंद्र पर जाएं।",
      "आधार व डिग्री रोल नंबर दर्ज कर सत्यापन करें।",
      "बेरोजगारी का स्व-घोषणा पत्र सबमिट करें।",
      "हर महीने डीबीटी द्वारा सहायता राशि खाते में हस्तांतरित होती है।"
    ],
    apply_link: "https://sevasindhugs.karnataka.gov.in/",
    source: "https://sevasindhugs.karnataka.gov.in/",
    last_verified: "2026-09-25",
    csc_supported: true,
    tags: ["karnataka", "yuva nidhi", "unemployment stipend", "graduates", "students"]
  },
  {
    id: "scheme_gujarat_mysy",
    name: "Mukhyamantri Yuva Swavalamban Yojana - MYSY (Gujarat)",
    name_hi: "मुख्यमंत्री युवा स्वावलंबन योजना - एमवायएसवाय (गुजरात)",
    ministry: "Education Department, Government of Gujarat",
    ministry_hi: "शिक्षा विभाग, गुजरात सरकार",
    category: "education",
    sector: "government",
    provider_type: "state_government",
    target_group: "student",
    benefit_summary: "50% tuition fee assistance (up to ₹2,00,000 for Medical/Dental, ₹50,000 for Engineering/Pharmacy), plus ₹1,200/month hostel lodging grant and textbook assistance.",
    benefit_summary_hi: "मेडिकल/डेंटल हेतु ₹2 लाख तक, इंजीनियरिंग हेतु ₹50,000 तक 50% ट्यूशन फीस सहायता, ₹1,200/माह हॉस्टल अनुदान व पुस्तक सहायता।",
    benefit_amount_tag: "Up to ₹2 Lakh Fee + ₹14,400 Hostel",
    benefit_amount_tag_hi: "₹2 लाख तक फीस + ₹14,400 हॉस्टल",
    eligibility: {
      min_age: 16,
      max_age: 26,
      max_income: 600000,
      states: ["Gujarat"],
      occupations: ["student"],
      genders: ["all"],
      categories: ["all"],
      special_condition_en: "Gujarat domicile students with 80%+ percentile in 10th or 12th enrolled in degree/diploma courses",
      special_condition_hi: "10वीं या 12वीं में 80+ परसेंटाइल प्राप्त गुजरात के छात्र तथा पारिवारिक आय ₹6 लाख से कम"
    },
    documents: [
      "Standard 10th / 12th Board marksheet",
      "Admission letter and fee receipt of higher education institute",
      "Income certificate issued by competent authority",
      "Aadhaar Card and Student Bank account passbook"
    ],
    documents_hi: [
      "10वीं अथवा 12वीं बोर्ड की अंकतालिका",
      "उच्च शिक्षण संस्थान का प्रवेश पत्र व फीस रसीद",
      "सक्षम राजस्व अधिकारी द्वारा जारी आय प्रमाण पत्र",
      "आधार कार्ड व छात्र की बैंक पासबुक"
    ],
    apply_steps: [
      "Apply online on mysy.guj.nic.in portal.",
      "Submit application and take printout with uploaded documents.",
      "Visit designated Help Centre for physical document verification.",
      "Fee reimbursement and hostel grant disbursed to student bank account."
    ],
    apply_steps_hi: [
      "mysy.guj.nic.in पोर्टल पर ऑनलाइन आवेदन करें।",
      "दस्तावेज अपलोड कर प्रिंटआउट लें।",
      "नजदीकी हेल्प सेंटर जाकर मूल दस्तावेजों का सत्यापन करवाएं।",
      "स्वीकृति उपरांत फीस सहायता बैंक खाते में प्राप्त होती है।"
    ],
    apply_link: "https://mysy.guj.nic.in/",
    source: "https://mysy.guj.nic.in/",
    last_verified: "2026-09-25",
    csc_supported: true,
    tags: ["gujarat", "mysy", "scholarship", "tuition aid", "hostel grant", "students"]
  },
  {
    id: "scheme_odisha_nua_o",
    name: "Nua-O Scholarship Scheme (Odisha)",
    name_hi: "नुआ-ओ छात्रवृत्ति योजना (ओडिशा)",
    ministry: "Higher Education Department, Government of Odisha",
    ministry_hi: "उच्च शिक्षा विभाग, ओडिशा सरकार",
    category: "education",
    sector: "government",
    provider_type: "state_government",
    target_group: "student",
    benefit_summary: "Direct scholarship of ₹9,000 per year for male students and ₹10,000 to ₹11,000 per year for female and SC/ST students enrolled in undergraduate and postgraduate colleges in Odisha.",
    benefit_summary_hi: "ओडिशा के डिग्री कॉलेजों में पढ़ रहे छात्रों को ₹9,000 तथा छात्राओं व एससी/एसटी छात्रों को ₹10,000 से ₹11,000 प्रति वर्ष की सीधी छात्रवृत्ति।",
    benefit_amount_tag: "₹9,000 - ₹11,000 / year",
    benefit_amount_tag_hi: "₹9,000 - ₹11,000 / वर्ष",
    eligibility: {
      min_age: 17,
      max_age: 27,
      max_income: 800000,
      states: ["Odisha"],
      occupations: ["student"],
      genders: ["all"],
      categories: ["all"],
      special_condition_en: "Enrolled in regular undergraduate or postgraduate degree program in state-run or aided universities/colleges in Odisha",
      special_condition_hi: "ओडिशा के सरकारी या सहायता प्राप्त कॉलेज में नियमित स्नातक या पीजी में अध्ययनरत"
    },
    documents: [
      "College Student ID card and Admission roll number",
      "Aadhaar Card",
      "Bank Account details (Aadhaar seeded)",
      "Resident certificate of Odisha"
    ],
    documents_hi: [
      "कॉलेज पहचान पत्र व रोल नंबर",
      "आधार कार्ड",
      "बैंक पासबुक (आधार से लिंक)",
      "ओडिशा निवास प्रमाण पत्र"
    ],
    apply_steps: [
      "Institutions verify enrolled students via State Scholarship Portal (scholarship.odisha.gov.in).",
      "Students confirm their details and bank account.",
      "Scholarship amount credited directly to student bank accounts via DBT."
    ],
    apply_steps_hi: [
      "कॉलेज द्वारा स्टेट स्कॉलरशिप पोर्टल (scholarship.odisha.gov.in) पर छात्रों का सत्यापन होता है।",
      "छात्र अपने बैंक खाते की पुष्टि करते हैं।",
      "छात्रवृत्ति राशि सीधे बैंक खाते में हस्तांतरित की जाती है।"
    ],
    apply_link: "https://scholarship.odisha.gov.in/",
    source: "https://scholarship.odisha.gov.in/",
    last_verified: "2026-09-25",
    csc_supported: true,
    tags: ["odisha", "nua-o", "college scholarship", "students", "higher education"]
  },

  // =========================================================================
  // STATE GOVERNMENT SCHEMES FOR PARENTS & FAMILIES (WELFARE, CASH & HEALTH)
  // =========================================================================
  {
    id: "scheme_mp_ladli_behna",
    name: "Mukhyamantri Ladli Behna Yojana (Madhya Pradesh)",
    name_hi: "मुख्यमंत्री लाड़ली बहना योजना (मध्य प्रदेश)",
    ministry: "Women and Child Development Department, Government of Madhya Pradesh",
    ministry_hi: "महिला एवं बाल विकास विभाग, मध्य प्रदेश शासन",
    category: "women_child",
    sector: "government",
    provider_type: "state_government",
    target_group: "parent",
    benefit_summary: "Guaranteed unconditional direct cash assistance of ₹1,250 per month (₹15,000 per year) directly credited to married mothers and women heads of families.",
    benefit_summary_hi: "विवाहित माताओं व परिवार की महिला प्रमुखों को ₹1,250 प्रति माह (₹15,000 प्रति वर्ष) की निश्चित प्रत्यक्ष बैंक सहायता।",
    benefit_amount_tag: "₹1,250 / month (₹15,000/yr)",
    benefit_amount_tag_hi: "₹1,250 / माह (₹15,000/वर्ष)",
    eligibility: {
      min_age: 21,
      max_age: 60,
      max_income: 250000,
      states: ["Madhya Pradesh"],
      occupations: ["all", "homemaker", "farmer", "self_employed", "unemployed"],
      genders: ["female"],
      categories: ["all"],
      special_condition_en: "Married, widowed, divorced or abandoned woman resident of MP with family income under ₹2.5 Lakh",
      special_condition_hi: "मध्य प्रदेश की स्थायी निवासी विवाहित, विधवा या परित्यक्ता महिला; पारिवारिक आय ₹2.5 लाख से कम"
    },
    documents: [
      "Samagra Family ID and Member ID (समग्र परिवार आईडी)",
      "Aadhaar Card linked to active bank account with DBT enabled",
      "Registered mobile number"
    ],
    documents_hi: [
      "समग्र परिवार आईडी एवं सदस्य आईडी",
      "डीबीटी सक्रिय बैंक खाते से लिंक आधार कार्ड",
      "पंजीकृत मोबाइल नंबर"
    ],
    apply_steps: [
      "Visit your local Gram Panchayat or Ward office camp.",
      "Complete instant biometric/facial e-KYC on the Ladli Behna portal.",
      "Receive submission receipt on spot; monthly benefit transferred on the 10th of every month."
    ],
    apply_steps_hi: [
      "ग्राम पंचायत या नगर पालिका वार्ड शिविर में जाएं।",
      "पोर्टल पर ई-केवाईसी (e-KYC) कराएं।",
      "पावती पर्ची प्राप्त करें; हर महीने की 10 तारीख को ₹1,250 सीधे बैंक खाते में जमा होते हैं।"
    ],
    apply_link: "https://cmladlibahna.mp.gov.in/",
    source: "https://cmladlibahna.mp.gov.in/",
    last_verified: "2026-09-25",
    csc_supported: true,
    tags: ["madhya pradesh", "ladli behna", "mothers", "women empowerment", "dbt cash"]
  },
  {
    id: "scheme_maha_ladki_bahin",
    name: "Mukhyamantri Majhi Ladki Bahin Yojana (Maharashtra)",
    name_hi: "मुख्यमंत्री माझी लाड़की बहिन योजना (महाराष्ट्र)",
    ministry: "Women and Child Development Department, Government of Maharashtra",
    ministry_hi: "महिला व बाल विकास विभाग, महाराष्ट्र शासन",
    category: "women_child",
    sector: "government",
    provider_type: "state_government",
    target_group: "parent",
    benefit_summary: "Direct monthly financial security transfer of ₹1,500 per month (₹18,000 per year) directly to bank accounts of mothers and adult women.",
    benefit_summary_hi: "परिवार की माताओं एवं वयस्क महिलाओं के बैंक खातों में ₹1,500 प्रति माह (₹18,000 प्रति वर्ष) का प्रत्यक्ष आर्थिक लाभ।",
    benefit_amount_tag: "₹1,500 / month (₹18,000/yr)",
    benefit_amount_tag_hi: "₹1,500 / माह (₹18,000/वर्ष)",
    eligibility: {
      min_age: 21,
      max_age: 65,
      max_income: 250000,
      states: ["Maharashtra"],
      occupations: ["all", "homemaker", "farmer", "self_employed", "unemployed"],
      genders: ["female"],
      categories: ["all"],
      special_condition_en: "Permanent woman resident of Maharashtra with yellow or orange ration card and family income under ₹2.5 Lakh",
      special_condition_hi: "महाराष्ट्र की स्थायी निवासी महिला; पीला या केसरी राशन कार्ड तथा वार्षिक आय ₹2.5 लाख से कम"
    },
    documents: [
      "Aadhaar Card",
      "Maharashtra Domicile Certificate or Ration Card (Yellow/Orange)",
      "Bank Account details with Aadhaar seeding",
      "Income certificate or Self-declaration of income"
    ],
    documents_hi: [
      "आधार कार्ड",
      "महाराष्ट्र अधिवास प्रमाण पत्र या राशन कार्ड",
      "आधार सीडेड बैंक पासबुक",
      "आय प्रमाण पत्र अथवा स्व-घोषणा पत्र"
    ],
    apply_steps: [
      "Apply through the 'Nari Shakti Doot' mobile app or at nearest Anganwadi / Setu Kendra / CSC.",
      "Upload Aadhaar, ration card, and bank passbook.",
      "Upon automated verification, ₹1,500 is credited monthly directly to bank account."
    ],
    apply_steps_hi: [
      "नारी शक्ति दूत ऐप या नजदीकी आंगनवाड़ी/सेतु केंद्र पर आवेदन करें।",
      "आधार, राशन कार्ड और बैंक खाता अपलोड करें।",
      "सत्यापन के बाद प्रत्येक माह ₹1,500 सीधे बैंक खाते में जमा होते हैं।"
    ],
    apply_link: "https://ladakibahin.maharashtra.gov.in/",
    source: "https://ladakibahin.maharashtra.gov.in/",
    last_verified: "2026-09-25",
    csc_supported: true,
    tags: ["maharashtra", "ladki bahin", "mothers", "family welfare", "direct benefit"]
  },
  {
    id: "scheme_karnataka_gruha_lakshmi",
    name: "Gruha Lakshmi Scheme (Karnataka)",
    name_hi: "गृह लक्ष्मी योजना (कर्नाटक)",
    ministry: "Women and Child Development Department, Government of Karnataka",
    ministry_hi: "महिला एवं बाल विकास विभाग, कर्नाटक सरकार",
    category: "women_child",
    sector: "government",
    provider_type: "state_government",
    target_group: "parent",
    benefit_summary: "Direct monthly transfer of ₹2,000 per month (₹24,000 per year) to women heads of family to mitigate inflation and empower mothers in household finances.",
    benefit_summary_hi: "परिवार की महिला मुखिया (माता) को घरेलू खर्च व महंगाई राहत हेतु ₹2,000 प्रति माह (₹24,000 प्रति वर्ष) की सीधी बैंक सहायता।",
    benefit_amount_tag: "₹2,000 / month (₹24,000/yr)",
    benefit_amount_tag_hi: "₹2,000 / माह (₹24,000/वर्ष)",
    eligibility: {
      min_age: 18,
      max_age: 80,
      max_income: 1000000,
      states: ["Karnataka"],
      occupations: ["all", "homemaker", "farmer", "self_employed", "unemployed"],
      genders: ["female"],
      categories: ["all"],
      special_condition_en: "Woman named as head of the family in APL/BPL/Antyodaya ration cards; non-taxpaying household",
      special_condition_hi: "राशन कार्ड में परिवार की मुखिया के रूप में नामित महिला; गैर-आयकरदाता परिवार"
    },
    documents: [
      "Karnataka Ration Card (BPL / Antyodaya / APL)",
      "Aadhaar Card of woman head and spouse",
      "Aadhaar-seeded bank account passbook"
    ],
    documents_hi: [
      "कर्नाटक राशन कार्ड (बीपीएल / अंत्योदय / एपीएल)",
      "महिला मुखिया एवं पति का आधार कार्ड",
      "आधार लिंक बैंक पासबुक"
    ],
    apply_steps: [
      "Apply at Grama One, Karnataka One, or Bangalore One centers, or Seva Sindhu portal.",
      "Verify OTP sent to Aadhaar-linked mobile number.",
      "Receive SMS acknowledgment; ₹2,000 credited automatically every month via DBT."
    ],
    apply_steps_hi: [
      "ग्राम वन, कर्नाटक वन केंद्र या सेवा सिंधु पोर्टल पर आवेदन करें।",
      "आधार लिंक मोबाइल पर प्राप्त ओटीपी से सत्यापन करें।",
      "हर महीने ₹2,000 डीबीटी के माध्यम से सीधे खाते में प्राप्त करें।"
    ],
    apply_link: "https://sevasindhugs.karnataka.gov.in/",
    source: "https://sevasindhugs.karnataka.gov.in/",
    last_verified: "2026-09-25",
    csc_supported: true,
    tags: ["karnataka", "gruha lakshmi", "mothers", "family welfare", "dbt"]
  },
  {
    id: "scheme_tn_magalir_urimai",
    name: "Kalaignar Magalir Urimai Thittam (Tamil Nadu)",
    name_hi: "कलैग्नार मगलिर उरीमई थिट्टम (तमिलनाडु)",
    ministry: "Special Programme Implementation Department, Government of Tamil Nadu",
    ministry_hi: "विशेष कार्यक्रम कार्यान्वयन विभाग, तमिलनाडु सरकार",
    category: "women_child",
    sector: "government",
    provider_type: "state_government",
    target_group: "parent",
    benefit_summary: "Basic income right of ₹1,000 per month (₹12,000 per year) directly credited to 1.15+ crore female family heads to recognize unpaid domestic labor of mothers.",
    benefit_summary_hi: "माताओं के अवैतनिक घरेलू श्रम के सम्मान में परिवार की महिला प्रमुखों को ₹1,000 प्रति माह (₹12,000 प्रति वर्ष) का बुनियादी अधिकार भत्ता।",
    benefit_amount_tag: "₹1,000 / month (₹12,000/yr)",
    benefit_amount_tag_hi: "₹1,000 / माह (₹12,000/वर्ष)",
    eligibility: {
      min_age: 21,
      max_age: 65,
      max_income: 250000,
      states: ["Tamil Nadu"],
      occupations: ["all", "homemaker", "farmer", "self_employed", "unemployed"],
      genders: ["female"],
      categories: ["all"],
      special_condition_en: "Woman head of family in Tamil Nadu smart family ration card with annual income < ₹2.5 Lakh and landholding < 5 acres wetland",
      special_condition_hi: "तमिलनाडु स्मार्ट राशन कार्ड में महिला मुखिया; पारिवारिक वार्षिक आय ₹2.5 लाख से कम"
    },
    documents: [
      "Smart Family Card (Ration Card)",
      "Aadhaar Card",
      "Electricity consumer number slip",
      "Bank Account details"
    ],
    documents_hi: [
      "स्मार्ट राशन कार्ड",
      "आधार कार्ड",
      "बिजली बिल उपभोक्ता संख्या",
      "बैंक पासबुक"
    ],
    apply_steps: [
      "Submit application at special biometric camps organized by Revenue Department in your ward/village.",
      "Bio-authentication done on handheld POS device.",
      "Monthly entitlement of ₹1,000 credited to bank accounts on 15th of every month."
    ],
    apply_steps_hi: [
      "राजस्व विभाग द्वारा गांव/वार्ड में आयोजित विशेष शिविर में आवेदन करें।",
      "बायोमेट्रिक प्रमाणीकरण पूरा करें।",
      "प्रत्येक माह की 15 तारीख को ₹1,000 सीधे बैंक खाते में आते हैं।"
    ],
    apply_link: "https://kmut.tn.gov.in/",
    source: "https://kmut.tn.gov.in/",
    last_verified: "2026-09-25",
    csc_supported: true,
    tags: ["tamil nadu", "magalir urimai", "mothers", "women basic income", "dbt"]
  },
  {
    id: "scheme_wb_lakshmir_bhandar",
    name: "Lakshmir Bhandar Scheme (West Bengal)",
    name_hi: "लक्ष्मी भंडार योजना (पश्चिम बंगाल)",
    ministry: "Department of Women & Child Development and Social Welfare, West Bengal",
    ministry_hi: "महिला एवं बाल विकास व समाज कल्याण विभाग, पश्चिम बंगाल",
    category: "women_child",
    sector: "government",
    provider_type: "state_government",
    target_group: "parent",
    benefit_summary: "Direct unconditional financial support of ₹1,000 per month for General category and ₹1,200 per month for SC/ST female heads of families in West Bengal.",
    benefit_summary_hi: "परिवार की महिला मुखिया को सामान्य वर्ग हेतु ₹1,000 प्रति माह तथा एससी/एसटी वर्ग हेतु ₹1,200 प्रति माह की सीधी आर्थिक सहायता।",
    benefit_amount_tag: "₹1,000 - ₹1,200 / month",
    benefit_amount_tag_hi: "₹1,000 - ₹1,200 / माह",
    eligibility: {
      min_age: 25,
      max_age: 60,
      max_income: 1000000,
      states: ["West Bengal"],
      occupations: ["all", "homemaker", "farmer", "self_employed", "unemployed"],
      genders: ["female"],
      categories: ["all"],
      special_condition_en: "Female resident of West Bengal holding Swasthya Sathi card; not employed in government service",
      special_condition_hi: "पश्चिम बंगाल की महिला निवासी जिसके पास स्वास्थ्य साथी कार्ड हो और जो सरकारी नौकरी में न हो"
    },
    documents: [
      "Swasthya Sathi Card",
      "Aadhaar Card",
      "SC/ST Certificate (if applicable for ₹1,200)",
      "Bank Account details (Aadhaar linked)"
    ],
    documents_hi: [
      "स्वास्थ्य साथी कार्ड",
      "आधार कार्ड",
      "जाति प्रमाण पत्र (एससी/एसटी हेतु)",
      "आधार लिंक बैंक पासबुक"
    ],
    apply_steps: [
      "Collect and fill free form at 'Duare Sarkar' (Government at Doorstep) camps.",
      "Submit with Aadhaar and Swasthya Sathi photocopies.",
      "Funds credited directly to bank account on 1st week of every month."
    ],
    apply_steps_hi: [
      "'द्वारे सरकार' (Duare Sarkar) शिविर से मुफ्त फॉर्म लेकर भरें।",
      "आधार व स्वास्थ्य साथी कार्ड की प्रति के साथ जमा करें।",
      "महीने के पहले सप्ताह में सीधे बैंक खाते में राशि प्राप्त होती है।"
    ],
    apply_link: "https://socialwelfare.wb.gov.in/",
    source: "https://socialwelfare.wb.gov.in/",
    last_verified: "2026-09-25",
    csc_supported: true,
    tags: ["west bengal", "lakshmir bhandar", "mothers", "family grant", "duare sarkar"]
  },
  {
    id: "scheme_odisha_subhadra",
    name: "Subhadra Yojana (Odisha)",
    name_hi: "सुभद्रा योजना (ओडिशा)",
    ministry: "Women and Child Development Department, Government of Odisha",
    ministry_hi: "महिला एवं बाल विकास विभाग, ओडिशा सरकार",
    category: "women_child",
    sector: "government",
    provider_type: "state_government",
    target_group: "parent",
    benefit_summary: "Major flagship scheme providing ₹50,000 total financial assistance over 5 years (₹10,000 annually in two equal installments of ₹5,000 on Rakhi Purnima & International Women's Day).",
    benefit_summary_hi: "5 वर्षों में कुल ₹50,000 की वित्तीय सहायता (प्रति वर्ष ₹10,000, राखी पूर्णिमा व महिला दिवस पर ₹5,000-₹5,000 की दो किस्तों में)।",
    benefit_amount_tag: "₹50,000 Total (₹10,000/yr)",
    benefit_amount_tag_hi: "₹50,000 कुल (₹10,000/वर्ष)",
    eligibility: {
      min_age: 21,
      max_age: 60,
      max_income: 250000,
      states: ["Odisha"],
      occupations: ["all", "homemaker", "farmer", "self_employed", "unemployed"],
      genders: ["female"],
      categories: ["all"],
      special_condition_en: "Women resident of Odisha covered under NFSA/SFSS ration card or family annual income under ₹2.5 Lakh",
      special_condition_hi: "ओडिशा की महिला निवासी जो राशन कार्ड धारक हों अथवा पारिवारिक आय ₹2.5 लाख से कम हो"
    },
    documents: [
      "Aadhaar Card linked with active mobile number",
      "Ration Card (NFSA or SFSS)",
      "Bank Account linked with Aadhaar and enabled for DBT"
    ],
    documents_hi: [
      "मोबाइल नंबर से लिंक आधार कार्ड",
      "राशन कार्ड (राष्ट्रीय या राज्य खाद्य सुरक्षा)",
      "डीबीटी सक्रिय बैंक पासबुक"
    ],
    apply_steps: [
      "Collect and submit free application form at Mo Seva Kendras, CSCs, or Anganwadi Centers.",
      "Apply online directly via subhadra.odisha.gov.in portal.",
      "Receive ₹5,000 bi-annually directly in your bank account."
    ],
    apply_steps_hi: [
      "मो सेवा केंद्र (Mo Seva Kendra), सीएससी या आंगनवाड़ी से फॉर्म प्राप्त कर जमा करें।",
      "subhadra.odisha.gov.in पोर्टल पर ऑनलाइन आवेदन भी संभव है।",
      "वर्ष में दो बार ₹5,000-₹5,000 की किस्तें सीधे बैंक खाते में जमा होती हैं।"
    ],
    apply_link: "https://subhadra.odisha.gov.in/",
    source: "https://subhadra.odisha.gov.in/",
    last_verified: "2026-09-25",
    csc_supported: true,
    tags: ["odisha", "subhadra yojana", "mothers", "women welfare", "cash assistance"]
  },
  {
    id: "scheme_up_kanya_sumangala",
    name: "Mukhyamantri Kanya Sumangala Yojana (Uttar Pradesh)",
    name_hi: "मुख्यमंत्री कन्या सुमंगला योजना (उत्तर प्रदेश)",
    ministry: "Women and Child Development Department, Government of Uttar Pradesh",
    ministry_hi: "महिला कल्याण विभाग, उत्तर प्रदेश सरकार",
    category: "women_child",
    sector: "government",
    provider_type: "state_government",
    target_group: "parent",
    benefit_summary: "Cash assistance of up to ₹25,000 given in 6 milestone stages from daughter's birth, full immunization, school admissions (classes 1, 6, 9), to college degree admission.",
    benefit_summary_hi: "बेटी के जन्म से लेकर स्नातक में प्रवेश तक 6 चरणों में कुल ₹25,000 की नकद वित्तीय सहायता माता-पिता के बैंक खाते में।",
    benefit_amount_tag: "₹25,000 Total in 6 Stages",
    benefit_amount_tag_hi: "₹25,000 कुल (6 चरणों में)",
    eligibility: {
      min_age: 0,
      max_age: 25,
      max_income: 300000,
      states: ["Uttar Pradesh"],
      occupations: ["all"],
      genders: ["female"],
      categories: ["all"],
      special_condition_en: "Parents resident of UP with maximum 2 daughters in family and family income under ₹3 Lakh",
      special_condition_hi: "उत्तर प्रदेश के निवासी माता-पिता; परिवार में अधिकतम दो बेटियां तथा आय ₹3 लाख से कम"
    },
    documents: [
      "Birth Certificate of the girl child",
      "UP Domicile Certificate of parents",
      "Aadhaar Card of parents and daughter (if available)",
      "Vaccination Card / School Admission Certificate",
      "Parent's Joint Bank Account Passbook"
    ],
    documents_hi: [
      "बालिका का जन्म प्रमाण पत्र",
      "अभिभावक का उत्तर प्रदेश निवास प्रमाण पत्र",
      "माता-पिता का आधार कार्ड",
      "टीकाकरण कार्ड या स्कूल प्रवेश प्रमाण पत्र",
      "माता-पिता की बैंक पासबुक"
    ],
    apply_steps: [
      "Visit mksy.up.gov.in portal and register as citizen.",
      "Select applicable stage (Birth / Vaccination / Class 1 / Class 6 / Class 9 / Degree).",
      "Upload birth certificate, immunization proof, and income certificate.",
      "Approval by District Probation Officer (DPO) and fund credit via DBT."
    ],
    apply_steps_hi: [
      "mksy.up.gov.in पोर्टल पर नागरिक पंजीकरण करें।",
      "उपयुक्त चरण (जन्म/टीकाकरण/कक्षा 1/6/9/स्नातक) चुनें।",
      "दस्तावेज अपलोड करें और सबमिट करें।",
      "जिला प्रोबेशन अधिकारी द्वारा सत्यापन के बाद सहायता राशि सीधे खाते में आती है।"
    ],
    apply_link: "https://mksy.up.gov.in/",
    source: "https://mksy.up.gov.in/",
    last_verified: "2026-09-25",
    csc_supported: true,
    tags: ["uttar pradesh", "kanya sumangala", "parents", "girl child", "education cash"]
  },
  {
    id: "scheme_rajasthan_chiranjeevi_ayushman",
    name: "Mukhyamantri Ayushman Arogya Yojana - Chiranjeevi (Rajasthan)",
    name_hi: "मुख्यमंत्री आयुष्मान आरोग्य योजना - चिरंजीवी (राजस्थान)",
    ministry: "Medical, Health & Family Welfare Department, Government of Rajasthan",
    ministry_hi: "चिकित्सा, स्वास्थ्य एवं परिवार कल्याण विभाग, राजस्थान सरकार",
    category: "healthcare",
    sector: "government",
    provider_type: "state_government",
    target_group: "parent",
    benefit_summary: "Unprecedented cashless health insurance cover of up to ₹25,00,000 per family per year across government and empanelled private hospitals in Rajasthan.",
    benefit_summary_hi: "राजस्थान के सभी परिवारों को सूचीबद्ध सरकारी व निजी अस्पतालों में प्रति वर्ष ₹25,00,000 तक का पूर्ण कैशलेस व मुफ्त इलाज।",
    benefit_amount_tag: "₹25 Lakh Cashless Cover / family",
    benefit_amount_tag_hi: "₹25 लाख कैशलेस इलाज / परिवार",
    eligibility: {
      min_age: 0,
      max_age: 120,
      max_income: 10000000,
      states: ["Rajasthan"],
      occupations: ["all"],
      genders: ["all"],
      categories: ["all"],
      special_condition_en: "All families of Rajasthan possessing a Jan Aadhaar Card (Free for NFSA, small farmers, contractual workers; ₹850/yr premium for others)",
      special_condition_hi: "राजस्थान के सभी परिवार जिनके पास जन आधार कार्ड है (राशन कार्ड व लघु किसानों हेतु 100% मुफ्त)"
    },
    documents: [
      "Jan Aadhaar Card (जन आधार कार्ड)",
      "Aadhaar Card of family members",
      "Ration Card (if NFSA beneficiary)"
    ],
    documents_hi: [
      "राजस्थान जन आधार कार्ड",
      "परिवार के सदस्यों का आधार कार्ड",
      "राशन कार्ड"
    ],
    apply_steps: [
      "All Jan Aadhaar cardholders automatically registered at chiranjeevi.rajasthan.gov.in.",
      "Show Jan Aadhaar or Aadhaar card at hospital helpdesk (Chiranjeevi Mitra desk).",
      "Avail complete cashless admission, surgery, diagnostic tests, and post-discharge medicines."
    ],
    apply_steps_hi: [
      "जन आधार कार्ड धारक सीधे योजना में शामिल हैं।",
      "अस्पताल में चिरंजीवी मित्र काउंटर पर जन आधार या आधार कार्ड दिखाएं।",
      "भर्ती, सर्जरी, जांच व दवाइयां पूरी तरह मुफ्त प्राप्त करें।"
    ],
    apply_link: "https://chiranjeevi.rajasthan.gov.in/",
    source: "https://chiranjeevi.rajasthan.gov.in/",
    last_verified: "2026-09-25",
    csc_supported: true,
    tags: ["rajasthan", "chiranjeevi", "free healthcare", "parents", "family health cover"]
  },

  // =========================================================================
  // STATE GOVERNMENT SCHEMES FOR GRANDPARENTS & SENIOR CITIZENS (PENSIONS)
  // =========================================================================
  {
    id: "scheme_haryana_budhapa_pension",
    name: "Old Age Samman Allowance - Budhapa Pension (Haryana)",
    name_hi: "वृद्धावस्था सम्मान भत्ता - बुढ़ापा पेंशन (हरियाणा)",
    ministry: "Social Justice & Empowerment Department, Government of Haryana",
    ministry_hi: "सामाजिक न्याय एवं अधिकारिता विभाग, हरियाणा सरकार",
    category: "pension",
    sector: "government",
    provider_type: "state_government",
    target_group: "elder",
    benefit_summary: "Highest regular state old-age pension in India providing ₹3,000 per month directly to senior citizens aged 60 and above, automatically sanctioned via Parivar Pehchan Patra (PPP).",
    benefit_summary_hi: "भारत में सर्वाधिक ₹3,000 प्रति माह की नियमित मासिक वृद्धावस्था पेंशन, परिवार पहचान पत्र (PPP) के माध्यम से बिना किसी भागदौड़ स्वतः स्वीकृत।",
    benefit_amount_tag: "₹3,000 / month Direct Pension",
    benefit_amount_tag_hi: "₹3,000 / माह पेंशन",
    eligibility: {
      min_age: 60,
      max_age: 120,
      max_income: 300000,
      states: ["Haryana"],
      occupations: ["all", "retired", "unemployed", "farmer", "self_employed", "homemaker"],
      genders: ["all"],
      categories: ["all"],
      special_condition_en: "Haryana resident aged 60 years or above with combined annual income of self and spouse not exceeding ₹3 Lakh",
      special_condition_hi: "हरियाणा का मूल निवासी, उम्र 60 वर्ष या अधिक, पति-पत्नी की संयुक्त आय ₹3 लाख से कम"
    },
    documents: [
      "Parivar Pehchan Patra - PPP (परिवार पहचान पत्र)",
      "Aadhaar Card with age verification",
      "Voter ID Card or School Leaving Certificate for age proof",
      "Bank Account linked with Aadhaar"
    ],
    documents_hi: [
      "परिवार पहचान पत्र (PPP फैमिली आईडी)",
      "आयु सत्यापन हेतु आधार कार्ड",
      "वोटर कार्ड या स्कूल प्रमाण पत्र (आयु प्रमाण हेतु)",
      "आधार लिंक बैंक पासबुक"
    ],
    apply_steps: [
      "When age reaches 60 in verified Parivar Pehchan Patra (PPP), automatic consent message is sent to citizen.",
      "Give consent via SMS or visit nearest CSC/Saral Haryana center.",
      "Pension of ₹3,000 is credited automatically every month directly into bank account."
    ],
    apply_steps_hi: [
      "पीपीपी (PPP) में उम्र 60 वर्ष होते ही मोबाइल पर स्वतः पेंशन सहमति का संदेश आता है।",
      "सरल हरियाणा केंद्र या मोबाइल पर सहमति दें।",
      "प्रत्येक माह ₹3,000 की पेंशन सीधे बैंक खाते में जमा होती है।"
    ],
    apply_link: "https://saralharyana.gov.in/",
    source: "https://socialjusticehry.gov.in/",
    last_verified: "2026-09-25",
    csc_supported: true,
    tags: ["haryana", "budhapa pension", "senior citizen", "grandparents", "monthly pension"]
  },
  {
    id: "scheme_delhi_senior_pension",
    name: "Delhi Senior Citizen Old Age Pension Scheme",
    name_hi: "दिल्ली वरिष्ठ नागरिक वृद्धावस्था पेंशन योजना",
    ministry: "Department of Social Welfare, Government of NCT of Delhi",
    ministry_hi: "समाज कल्याण विभाग, दिल्ली सरकार",
    category: "pension",
    sector: "government",
    provider_type: "state_government",
    target_group: "elder",
    benefit_summary: "Monthly social security pension of ₹2,000 per month for elders aged 60-69 years, and ₹2,500 per month for senior citizens aged 70 years and above.",
    benefit_summary_hi: "60 से 69 वर्ष के बुजुर्गों को ₹2,000 प्रति माह तथा 70 वर्ष या उससे अधिक आयु के वरिष्ठ नागरिकों को ₹2,500 प्रति माह की पेंशन।",
    benefit_amount_tag: "₹2,000 - ₹2,500 / month",
    benefit_amount_tag_hi: "₹2,000 - ₹2,500 / माह",
    eligibility: {
      min_age: 60,
      max_age: 120,
      max_income: 100000,
      states: ["Delhi (NCT)"],
      occupations: ["all", "retired", "unemployed", "homemaker"],
      genders: ["all"],
      categories: ["all"],
      special_condition_en: "Resident of Delhi for minimum 5 years, aged 60+, family income under ₹1,00,000 per year",
      special_condition_hi: "न्यूनतम 5 वर्ष से दिल्ली के निवासी, 60 वर्ष या अधिक उम्र, पारिवारिक आय ₹1 लाख से कम"
    },
    documents: [
      "Proof of Age (Aadhaar Card / PAN Card / Birth Certificate / Voter ID)",
      "Proof of 5 years residence in Delhi (Ration Card / Voter ID / Electricity Bill)",
      "Income Certificate / Self declaration",
      "Bank Account details with bank in Delhi"
    ],
    documents_hi: [
      "आयु प्रमाण पत्र (आधार / वोटर कार्ड / पैन कार्ड)",
      "दिल्ली में 5 वर्ष के निवास का प्रमाण (राशन कार्ड / वोटर आईडी)",
      "आय प्रमाण पत्र / स्व-घोषणा पत्र",
      "दिल्ली के बैंक की खाता पासबुक"
    ],
    apply_steps: [
      "Apply through the Delhi e-District portal (edistrict.delhigovt.nic.in).",
      "Fill online Old Age Pension form under Social Welfare Department.",
      "Upload age, residence, and bank passbook documents.",
      "Pension credited every month directly to Delhi bank account."
    ],
    apply_steps_hi: [
      "दिल्ली ई-डिस्ट्रिक्ट पोर्टल (edistrict.delhigovt.nic.in) पर जाएं।",
      "समाज कल्याण विभाग के तहत वृद्धावस्था पेंशन फॉर्म भरें।",
      "दस्तावेज अपलोड करें और पावती प्राप्त करें।",
      "सत्यापन के बाद हर महीने ₹2,000 या ₹2,500 सीधे बैंक खाते में जमा होते हैं।"
    ],
    apply_link: "https://edistrict.delhigovt.nic.in/",
    source: "https://edistrict.delhigovt.nic.in/",
    last_verified: "2026-09-25",
    csc_supported: true,
    tags: ["delhi", "old age pension", "senior citizen", "grandparents", "monthly pension"]
  },
  {
    id: "scheme_up_vridhavastha_pension",
    name: "UP Vridhavastha Pension Yojana (Old Age Pension Uttar Pradesh)",
    name_hi: "उ.प्र. वृद्धावस्था पेंशन योजना (उत्तर प्रदेश बुजुर्ग पेंशन)",
    ministry: "Social Welfare Department, Government of Uttar Pradesh",
    ministry_hi: "समाज कल्याण विभाग, उत्तर प्रदेश सरकार",
    category: "pension",
    sector: "government",
    provider_type: "state_government",
    target_group: "elder",
    benefit_summary: "Guaranteed monthly pension of ₹1,000 per month (₹12,000 per year) directly credited quarterly to bank accounts of senior citizens aged 60 and above in UP.",
    benefit_summary_hi: "उत्तर प्रदेश के 60 वर्ष या अधिक उम्र के वरिष्ठ नागरिकों को ₹1,000 प्रति माह (₹12,000 प्रति वर्ष) की निश्चित मासिक पेंशन सीधे बैंक खाते में।",
    benefit_amount_tag: "₹1,000 / month (₹12,000/yr)",
    benefit_amount_tag_hi: "₹1,000 / माह (₹12,000/वर्ष)",
    eligibility: {
      min_age: 60,
      max_age: 120,
      max_income: 56460,
      states: ["Uttar Pradesh"],
      occupations: ["all", "retired", "unemployed", "farmer", "homemaker"],
      genders: ["all"],
      categories: ["all"],
      special_condition_en: "Age 60 years or above, permanent resident of UP; annual income not exceeding ₹46,080 (rural) or ₹56,460 (urban)",
      special_condition_hi: "उत्तर प्रदेश के स्थायी निवासी, आयु 60 वर्ष या अधिक; वार्षिक आय ग्रामीण में ₹46,080 तथा शहरी में ₹56,460 से कम"
    },
    documents: [
      "Aadhaar Card with Aadhaar authentication",
      "Income Certificate issued by Tehsildar",
      "Age proof certificate (Aadhaar / Voter ID)",
      "Bank Account Passbook (Aadhaar linked)",
      "Passport size photo"
    ],
    documents_hi: [
      "आधार कार्ड (सत्यापित)",
      "तहसीलदार द्वारा जारी आय प्रमाण पत्र",
      "आयु प्रमाण (आधार / वोटर आईडी)",
      "बैंक पासबुक (आधार से लिंक)",
      "पासपोर्ट साइज फोटो"
    ],
    apply_steps: [
      "Visit sspy-up.gov.in portal or nearest Jan Seva Kendra (CSC).",
      "Click on 'वृद्धावस्था पेंशन' -> 'ऑनलाइन आवेदन करें'.",
      "Enter Aadhaar and complete Aadhaar authentication.",
      "Gram Panchayat / BDO approves; pension of ₹3,000 sent quarterly directly via DBT."
    ],
    apply_steps_hi: [
      "sspy-up.gov.in पोर्टल या नजदीकी जन सेवा केंद्र (CSC) पर जाएं।",
      "'वृद्धावस्था पेंशन' विकल्प चुनकर ऑनलाइन फॉर्म भरें।",
      "आधार सत्यापन पूरा करें और दस्तावेज अपलोड करें।",
      "स्वीकृति के बाद हर तिमाही ₹3,000 सीधे बैंक खाते में ट्रांसफर किए जाते हैं।"
    ],
    apply_link: "https://sspy-up.gov.in/",
    source: "https://sspy-up.gov.in/",
    last_verified: "2026-09-25",
    csc_supported: true,
    tags: ["uttar pradesh", "vridhavastha pension", "senior citizen", "grandparents", "old age pension"]
  },
  {
    id: "scheme_bihar_vridhjan_pension",
    name: "Mukhyamantri Vridhjan Pension Yojana - MVPY (Bihar)",
    name_hi: "मुख्यमंत्री वृद्धजन पेंशन योजना (बिहार)",
    ministry: "Social Welfare Department, Government of Bihar",
    ministry_hi: "समाज कल्याण विभाग, बिहार सरकार",
    category: "pension",
    sector: "government",
    provider_type: "state_government",
    target_group: "elder",
    benefit_summary: "Universal state pension of ₹400 per month for senior citizens aged 60-79 years and ₹500 per month for elderly persons aged 80 years and above across Bihar.",
    benefit_summary_hi: "बिहार के 60 से 79 वर्ष के सभी बुजुर्गों को ₹400 प्रति माह तथा 80 वर्ष से अधिक आयु के बुजुर्गों को ₹500 प्रति माह की सार्वभौमिक पेंशन।",
    benefit_amount_tag: "₹400 - ₹500 / month Universal",
    benefit_amount_tag_hi: "₹400 - ₹500 / माह पेंशन",
    eligibility: {
      min_age: 60,
      max_age: 120,
      max_income: 10000000,
      states: ["Bihar"],
      occupations: ["all", "retired", "unemployed", "farmer", "homemaker"],
      genders: ["all"],
      categories: ["all"],
      special_condition_en: "Permanent resident of Bihar aged 60+; not receiving any other government/EPF pension",
      special_condition_hi: "बिहार के स्थायी निवासी, आयु 60 वर्ष या अधिक; अन्य कोई सरकारी/ईपीएफ पेंशन न ले रहे हों"
    },
    documents: [
      "Aadhaar Card",
      "Voter ID Card (EPIC number)",
      "Bank Account Passbook (Aadhaar Seeded)",
      "Aadhaar Consent declaration"
    ],
    documents_hi: [
      "आधार कार्ड",
      "वोटर पहचान पत्र (EPIC संख्या)",
      "बैंक पासबुक (आधार से लिंक)",
      "सहमति घोषणा पत्र"
    ],
    apply_steps: [
      "Visit sspmis.bihar.gov.in portal or RTPS counter / CSC center in Bihar.",
      "Enter Aadhaar and Voter Card for instant online demographic authentication.",
      "Fill bank details and upload scanned passbook.",
      "Sanctioned by Block Development Officer (BDO); monthly pension sent via DBT."
    ],
    apply_steps_hi: [
      "sspmis.bihar.gov.in पोर्टल या ब्लॉक आरटीपीएस (RTPS) काउंटर पर जाएं।",
      "आधार और वोटर कार्ड से ऑनलाइन सत्यापन करें।",
      "बैंक विवरण भरें और सबमिट करें।",
      "बीडीओ द्वारा स्वीकृति के बाद पेंशन सीधे खाते में प्राप्त होती है।"
    ],
    apply_link: "https://www.sspmis.bihar.gov.in/",
    source: "https://www.sspmis.bihar.gov.in/",
    last_verified: "2026-09-25",
    csc_supported: true,
    tags: ["bihar", "mvpy", "old age pension", "senior citizen", "grandparents"]
  },
  {
    id: "scheme_andhra_pension_kanuka",
    name: "YSR Pension Kanuka / NTR Bharosa Senior Citizen Pension (Andhra Pradesh)",
    name_hi: "वाईएसआर पेंशन कनुका / एनटीआर भरोसा वरिष्ठ नागरिक पेंशन (आंध्र प्रदेश)",
    ministry: "Department of Social Welfare, Government of Andhra Pradesh",
    ministry_hi: "समाज कल्याण विभाग, आंध्र प्रदेश सरकार",
    category: "pension",
    sector: "government",
    provider_type: "state_government",
    target_group: "elder",
    benefit_summary: "Generous state monthly pension of ₹4,000 per month delivered directly to the doorstep of senior citizens on the 1st of every month by Village/Ward Volunteers.",
    benefit_summary_hi: "वरिष्ठ नागरिकों को ₹4,000 प्रति माह की सम्मानजनक पेंशन, प्रत्येक माह की पहली तारीख को घर पर सीधे नकद या खाते में प्रदाय।",
    benefit_amount_tag: "₹4,000 / month Doorstep Pension",
    benefit_amount_tag_hi: "₹4,000 / माह पेंशन",
    eligibility: {
      min_age: 60,
      max_age: 120,
      max_income: 120000,
      states: ["Andhra Pradesh"],
      occupations: ["all", "retired", "unemployed", "farmer", "homemaker"],
      genders: ["all"],
      categories: ["all"],
      special_condition_en: "Permanent resident of Andhra Pradesh aged 60+; BPL rice cardholder with family income under ₹10,000/mo (rural) or ₹12,000/mo (urban)",
      special_condition_hi: "आंध्र प्रदेश के निवासी, 60 वर्ष या अधिक उम्र, बीपीएल राइस कार्ड धारक"
    },
    documents: [
      "Aadhaar Card",
      "White Ration Card / Rice Card of Andhra Pradesh",
      "Age proof document",
      "Bank Account details"
    ],
    documents_hi: [
      "आधार कार्ड",
      "आंध्र प्रदेश राइस कार्ड / राशन कार्ड",
      "आयु प्रमाण पत्र",
      "बैंक पासबुक"
    ],
    apply_steps: [
      "Apply through your local Grama / Ward Sachivalayam (Village Secretariats).",
      "Volunteer collects details and uploads to Navasakam portal with biometrics.",
      "Pension sanctioned with digital pension card; ₹4,000 disbursed on the 1st of every month."
    ],
    apply_steps_hi: [
      "ग्राम/वार्ड सचिवालय के माध्यम से आवेदन करें।",
      "सचिवालय वॉलंटियर द्वारा बायोमेट्रिक सत्यापन किया जाता है।",
      "स्वीकृति के बाद हर महीने की पहली तारीख को ₹4,000 की पेंशन घर पर या खाते में मिलती है।"
    ],
    apply_link: "https://sspensions.ap.gov.in/",
    source: "https://sspensions.ap.gov.in/",
    last_verified: "2026-09-25",
    csc_supported: true,
    tags: ["andhra pradesh", "pension kanuka", "senior citizen", "grandparents", "doorstep pension"]
  },
  {
    id: "scheme_telangana_aasara_pension",
    name: "Aasara Old Age Pension (Telangana)",
    name_hi: "आसरा वरिष्ठ नागरिक पेंशन (तेलंगाना)",
    ministry: "Panchayat Raj and Rural Development Department, Government of Telangana",
    ministry_hi: "पंचायत राज एवं ग्रामीण विकास विभाग, तेलंगाना सरकार",
    category: "pension",
    sector: "government",
    provider_type: "state_government",
    target_group: "elder",
    benefit_summary: "Monthly social security pension of ₹2,016 per month for senior citizens starting from age 57 years, ensuring dignified livelihood in retirement.",
    benefit_summary_hi: "57 वर्ष की आयु से ही वरिष्ठ नागरिकों को ₹2,016 प्रति माह की सामाजिक सुरक्षा वृद्धावस्था पेंशन।",
    benefit_amount_tag: "₹2,016 / month (from age 57)",
    benefit_amount_tag_hi: "₹2,016 / माह (57 वर्ष से)",
    eligibility: {
      min_age: 57,
      max_age: 120,
      max_income: 200000,
      states: ["Telangana"],
      occupations: ["all", "retired", "unemployed", "farmer", "homemaker"],
      genders: ["all"],
      categories: ["all"],
      special_condition_en: "Telangana resident aged 57 years and above belonging to vulnerable low-income household",
      special_condition_hi: "तेलंगाना के निवासी, न्यूनतम 57 वर्ष की उम्र तथा निम्न आय वर्ग के नागरिक"
    },
    documents: [
      "Aadhaar Card",
      "Telangana Food Security Card (Ration Card)",
      "Age proof certificate (Voter ID / School Record)",
      "Bank Account details"
    ],
    documents_hi: [
      "आधार कार्ड",
      "तेलंगाना खाद्य सुरक्षा राशन कार्ड",
      "आयु प्रमाण पत्र (वोटर आईडी)",
      "बैंक पासबुक"
    ],
    apply_steps: [
      "Submit application at MeeSeva Centers or during Gram Sabha / Praja Palana camps.",
      "Upload verified age and food security card.",
      "Direct DBT transfer of ₹2,016 credited every month to your post office/bank account."
    ],
    apply_steps_hi: [
      "मीसेवा (MeeSeva) केंद्र या प्रजा पालन शिविर में आवेदन पत्र जमा करें।",
      "आधार और राशन कार्ड का सत्यापन कराएं।",
      "प्रति माह ₹2,016 सीधे बैंक या डाकघर खाते में प्राप्त करें।"
    ],
    apply_link: "https://aasara.telangana.gov.in/",
    source: "https://aasara.telangana.gov.in/",
    last_verified: "2026-09-25",
    csc_supported: true,
    tags: ["telangana", "aasara pension", "senior citizen", "grandparents", "monthly pension"]
  },
  {
    id: "scheme_karnataka_sandhya_suraksha",
    name: "Sandhya Suraksha Yojana (Karnataka)",
    name_hi: "संध्या सुरक्षा योजना (कर्नाटक बुजुर्ग पेंशन)",
    ministry: "Revenue Department (Social Security), Government of Karnataka",
    ministry_hi: "राजस्व विभाग (सामाजिक सुरक्षा), कर्नाटक सरकार",
    category: "pension",
    sector: "government",
    provider_type: "state_government",
    target_group: "elder",
    benefit_summary: "Monthly social security pension of ₹1,200 per month directly into bank accounts of senior citizens aged 65 and above, along with subsidized KSRTC bus pass and healthcare concessions.",
    benefit_summary_hi: "65 वर्ष या अधिक उम्र के वरिष्ठ नागरिकों को ₹1,200 प्रति माह की निश्चित पेंशन, रियायती बस पास और स्वास्थ्य सुविधाएं।",
    benefit_amount_tag: "₹1,200 / month + Bus Concession",
    benefit_amount_tag_hi: "₹1,200 / माह + रियायती यात्रा",
    eligibility: {
      min_age: 65,
      max_age: 120,
      max_income: 50000,
      states: ["Karnataka"],
      occupations: ["all", "retired", "unemployed", "farmer", "homemaker"],
      genders: ["all"],
      categories: ["all"],
      special_condition_en: "Permanent resident of Karnataka aged 65 or older with combined family income under ₹50,000/yr",
      special_condition_hi: "कर्नाटक के निवासी, उम्र 65 वर्ष या अधिक तथा वार्षिक आय ₹50,000 से कम"
    },
    documents: [
      "Age Proof certificate (Aadhaar / Voter ID / Doctor's age certificate)",
      "Income Certificate issued by Revenue Inspector / Tahsildar",
      "Karnataka Domicile Certificate",
      "Bank Account details"
    ],
    documents_hi: [
      "आयु प्रमाण पत्र (आधार / वोटर आईडी)",
      "तहसीलदार द्वारा जारी आय प्रमाण पत्र",
      "कर्नाटक अधिवास प्रमाण पत्र",
      "बैंक पासबुक"
    ],
    apply_steps: [
      "Apply through Nadakacheri (AJSK) centers or online at nadakacheri.karnataka.gov.in.",
      "Tahsildar issues verification order within 30 days.",
      "Monthly pension of ₹1,200 credited directly into the applicant's account."
    ],
    apply_steps_hi: [
      "नाड़ाकचेरी (Nadakacheri) केंद्र या nadakacheri.karnataka.gov.in पर आवेदन करें।",
      "तहसीलदार कार्यालय द्वारा 30 दिनों में सत्यापन किया जाता है।",
      "पेंशन राशि प्रति माह सीधे बैंक खाते में जमा होती है।"
    ],
    apply_link: "https://nadakacheri.karnataka.gov.in/",
    source: "https://nadakacheri.karnataka.gov.in/",
    last_verified: "2026-09-25",
    csc_supported: true,
    tags: ["karnataka", "sandhya suraksha", "senior citizen", "grandparents", "monthly pension"]
  },
  {
    id: "scheme_kerala_senior_welfare_pension",
    name: "Kerala Senior Citizen Old Age Welfare Pension",
    name_hi: "केरल वरिष्ठ नागरिक वृद्धावस्था कल्याण पेंशन",
    ministry: "Local Self Government / Social Justice Department, Government of Kerala",
    ministry_hi: "स्थानीय स्वशासन व सामाजिक न्याय विभाग, केरल सरकार",
    category: "pension",
    sector: "government",
    provider_type: "state_government",
    target_group: "elder",
    benefit_summary: "Regular monthly pension of ₹1,600 per month delivered directly to homes via Primary Agricultural Co-operative societies or bank accounts to senior citizens aged 60 and above in Kerala.",
    benefit_summary_hi: "केरल के 60 वर्ष या अधिक उम्र के वरिष्ठ नागरिकों को ₹1,600 प्रति माह की निश्चित पेंशन, सीधे घर पर नकद अथवा बैंक खाते में उपलब्ध।",
    benefit_amount_tag: "₹1,600 / month Direct Pension",
    benefit_amount_tag_hi: "₹1,600 / माह पेंशन",
    eligibility: {
      min_age: 60,
      max_age: 120,
      max_income: 100000,
      states: ["Kerala"],
      occupations: ["all", "retired", "unemployed", "farmer", "homemaker"],
      genders: ["all"],
      categories: ["all"],
      special_condition_en: "Kerala permanent resident aged 60+, family income under ₹1,00,000/yr, not an inmate of old age home",
      special_condition_hi: "केरल के निवासी, 60 वर्ष या अधिक उम्र, पारिवारिक आय ₹1 लाख से कम"
    },
    documents: [
      "Aadhaar Card",
      "Kerala Ration Card",
      "Age proof document (SSLC book / Voter ID / Aadhaar)",
      "Income certificate from Village Officer"
    ],
    documents_hi: [
      "आधार कार्ड",
      "केरल राशन कार्ड",
      "आयु प्रमाण पत्र",
      "ग्राम अधिकारी द्वारा जारी आय प्रमाण पत्र"
    ],
    apply_steps: [
      "Apply through Sevana Pension portal (welfarepension.lsgkerala.gov.in) or your local Grama Panchayat / Municipality.",
      "Grama Panchayat committee verifies and sanctions the pension.",
      "Receive ₹1,600 monthly directly at your doorstep through cooperative society or bank account."
    ],
    apply_steps_hi: [
      "सेवना पेंशन पोर्टल (welfarepension.lsgkerala.gov.in) या ग्राम पंचायत में आवेदन करें।",
      "पंचायत समिति द्वारा सत्यापन और स्वीकृति।",
      "हर महीने ₹1,600 सीधे बैंक खाते में या घर पर प्राप्त करें।"
    ],
    apply_link: "https://welfarepension.lsgkerala.gov.in/",
    source: "https://welfarepension.lsgkerala.gov.in/",
    last_verified: "2026-09-25",
    csc_supported: true,
    tags: ["kerala", "sevana pension", "senior citizen", "grandparents", "monthly pension"]
  }
];
