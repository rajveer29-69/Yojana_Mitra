import { SCHEMES } from '../data/schemes.ts';
import type { Scheme, UserProfile, MatchReason, MatchedSchemeResult } from '../data/schemes.ts';

export function matchSchemes(profile: UserProfile): {
  exactMatches: MatchedSchemeResult[];
  nearlyEligible: MatchedSchemeResult[];
} {
  const exactMatches: MatchedSchemeResult[] = [];
  const nearlyEligible: MatchedSchemeResult[] = [];

  for (const scheme of SCHEMES) {
    const reasons: MatchReason[] = [];
    const missing: MatchReason[] = [];

    // 1. Age check
    const ageOk = profile.age >= scheme.eligibility.min_age && profile.age <= scheme.eligibility.max_age;
    if (ageOk) {
      reasons.push({
        field: 'age',
        passed: true,
        text_en: `Age ${profile.age} meets eligibility criteria (${scheme.eligibility.min_age}–${scheme.eligibility.max_age} yrs)`,
        text_hi: `आपकी आयु ${profile.age} वर्ष पात्रता सीमा (${scheme.eligibility.min_age}–${scheme.eligibility.max_age} वर्ष) में है`
      });
    } else {
      missing.push({
        field: 'age',
        passed: false,
        text_en: `Requires age ${scheme.eligibility.min_age} to ${scheme.eligibility.max_age} (you entered ${profile.age})`,
        text_hi: `पात्रता आयु ${scheme.eligibility.min_age} से ${scheme.eligibility.max_age} वर्ष होनी चाहिए (आपकी आयु ${profile.age} है)`
      });
    }

    // 2. Income check
    const maxInc = scheme.eligibility.max_income;
    const hasIncomeLimit = typeof maxInc === 'number' && maxInc < 10000000;
    const incomeOk = !hasIncomeLimit || profile.income <= maxInc;
    if (incomeOk) {
      reasons.push({
        field: 'income',
        passed: true,
        text_en: hasIncomeLimit
          ? `Annual family income ₹${profile.income.toLocaleString('en-IN')} is within ₹${maxInc.toLocaleString('en-IN')} ceiling`
          : `No restrictive income ceiling for this benefit`,
        text_hi: hasIncomeLimit
          ? `पारिवारिक आय ₹${profile.income.toLocaleString('en-IN')} निर्धारित अधिकतम सीमा ₹${maxInc.toLocaleString('en-IN')} के भीतर है`
          : `इस योजना में आय सीमा का कोई प्रतिबंध नहीं है`
      });
    } else {
      missing.push({
        field: 'income',
        passed: false,
        text_en: `Family income ₹${profile.income.toLocaleString('en-IN')} exceeds threshold of ₹${maxInc?.toLocaleString('en-IN')}`,
        text_hi: `पारिवारिक आय ₹${profile.income.toLocaleString('en-IN')} अधिकतम सीमा ₹${maxInc?.toLocaleString('en-IN')} से अधिक है`
      });
    }

    // 3. State check
    const stateOk = scheme.eligibility.states.includes('all') || scheme.eligibility.states.includes(profile.state);
    if (stateOk) {
      const isPriv = scheme.sector === 'private';
      const isStateGov = scheme.provider_type === 'state_government' || (!scheme.eligibility.states.includes('all') && scheme.sector !== 'private');
      reasons.push({
        field: 'state',
        passed: true,
        text_en: isPriv
          ? `Nationwide private sector / bank program valid across all States & UTs including ${profile.state}`
          : isStateGov
          ? `Exclusive ${profile.state} state government welfare scheme valid for local residents`
          : scheme.eligibility.states.includes('all')
          ? `Central scheme valid across all States & UTs including ${profile.state}`
          : `Applicable for residents of ${profile.state}`,
        text_hi: isPriv
          ? `अखिल भारतीय निजी क्षेत्र/बैंक कार्यक्रम आपके राज्य (${profile.state}) सहित सभी राज्यों में मान्य`
          : isStateGov
          ? `${profile.state} राज्य सरकार की विशेष कल्याणकारी योजना, स्थानीय निवासियों हेतु मान्य`
          : scheme.eligibility.states.includes('all')
          ? `यह योजना पूरे भारत और आपके राज्य (${profile.state}) में लागू है`
          : `यह योजना ${profile.state} के निवासियों के लिए लागू है`
      });
    } else {
      missing.push({
        field: 'state',
        passed: false,
        text_en: `Applicable only in ${scheme.eligibility.states.join(', ')} (your state: ${profile.state})`,
        text_hi: `यह योजना केवल ${scheme.eligibility.states.join(', ')} में मान्य है (आपका राज्य: ${profile.state})`
      });
    }

    // 4. Occupation check
    const occOk = scheme.eligibility.occupations.includes('all') || scheme.eligibility.occupations.includes(profile.occupation);
    const occLabel = profile.occupation.replace('_', ' ');
    if (occOk) {
      reasons.push({
        field: 'occupation',
        passed: true,
        text_en: scheme.eligibility.occupations.includes('all')
          ? `Open to all professions (including ${occLabel})`
          : `Specifically targeted for ${occLabel} profile`,
        text_hi: scheme.eligibility.occupations.includes('all')
          ? `सभी व्यवसाय वर्गों के लिए पात्र`
          : `विशेष रूप से आपके व्यवसाय (${occLabel}) के लिए लक्षित`
      });
    } else {
      missing.push({
        field: 'occupation',
        passed: false,
        text_en: `Targeted for ${scheme.eligibility.occupations.map(o => o.replace('_', ' ')).join(', ')} (you selected ${occLabel})`,
        text_hi: `केवल ${scheme.eligibility.occupations.join(', ')} के लिए मान्य (आपने ${occLabel} चुना है)`
      });
    }

    // 5. Gender check
    const genderOk = scheme.eligibility.genders.includes('all') || scheme.eligibility.genders.includes(profile.gender);
    if (genderOk) {
      reasons.push({
        field: 'gender',
        passed: true,
        text_en: scheme.eligibility.genders.includes('all')
          ? `Eligible for all genders`
          : `Specially crafted for ${profile.gender} citizens`,
        text_hi: scheme.eligibility.genders.includes('all')
          ? `सभी नागरिकों/लिंगों के लिए मान्य`
          : `विशेष रूप से ${profile.gender === 'female' ? 'महिला' : 'पुरुष'} लाभार्थियों हेतु`
      });
    } else {
      missing.push({
        field: 'gender',
        passed: false,
        text_en: `Exclusively for ${scheme.eligibility.genders.join('/')} applicants`,
        text_hi: `केवल ${scheme.eligibility.genders.includes('female') ? 'महिला' : 'पुरुष'} आवेदकों हेतु आरक्षित`
      });
    }

    // 6. Category check
    const catOk = scheme.eligibility.categories.includes('all') || scheme.eligibility.categories.includes(profile.category);
    if (catOk) {
      reasons.push({
        field: 'category',
        passed: true,
        text_en: scheme.eligibility.categories.includes('all')
          ? `All social categories (General, OBC, SC, ST, EWS) qualify`
          : `Qualifies under ${profile.category.toUpperCase()} reserved category guidelines`,
        text_hi: scheme.eligibility.categories.includes('all')
          ? `सभी सामाजिक वर्गों (सामान्य, ओबीसी, एससी, एसटी, ईडब्ल्यूएस) हेतु मान्य`
          : `${profile.category.toUpperCase()} श्रेणी के तहत पात्र`
      });
    } else {
      missing.push({
        field: 'category',
        passed: false,
        text_en: `Restricted to ${scheme.eligibility.categories.map(c => c.toUpperCase()).join(', ')} category (your selection: ${profile.category.toUpperCase()})`,
        text_hi: `केवल ${scheme.eligibility.categories.map(c => c.toUpperCase()).join(', ')} वर्ग के लिए (आपने ${profile.category.toUpperCase()} चुना है)`
      });
    }

    // Fallback template builder
    const isPrivate = scheme.sector === 'private';
    const templateExplanation = profile.language === 'hi'
      ? (isPrivate
          ? `आप ${scheme.name_hi} के लिए पात्र हैं। आपकी आयु (${profile.age} वर्ष) और प्रोफाइल इस निजी क्षेत्र/बैंक कल्याण कार्यक्रम के अनुकूल है।`
          : `आप ${scheme.name_hi} के लिए पात्र हैं क्योंकि आपकी आयु (${profile.age} वर्ष) और पारिवारिक आय सीमा में है तथा आप ${profile.state} के नागरिक हैं।`)
      : (isPrivate
          ? `You qualify for ${scheme.name} as your profile and age (${profile.age}) meet the eligibility criteria for this private sector / bank initiative.`
          : `You qualify for ${scheme.name} because your age (${profile.age}) and family income align with the eligibility criteria as a resident of ${profile.state}.`);

    if (missing.length === 0) {
      exactMatches.push({
        scheme,
        why_you_qualify: templateExplanation,
        match_reasons: reasons,
        is_exact_match: true
      });
    } else if (missing.length === 1) {
      // US-8: Exactly 1 condition missed
      const missingReason = missing[0];
      const nearlyExplanation = profile.language === 'hi'
        ? `आप लगभग पात्र हैं! केवल एक शर्त पूरी नहीं है: ${missingReason.text_hi}।`
        : `You are almost eligible! Only one requirement is pending: ${missingReason.text_en}.`;

      nearlyEligible.push({
        scheme,
        why_you_qualify: nearlyExplanation,
        match_reasons: reasons,
        is_exact_match: false,
        missing_conditions: missing
      });
    }
  }

  return { exactMatches, nearlyEligible };
}
