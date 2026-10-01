import React from 'react';
import { MatchedSchemeResult, UserProfile } from '../data/schemes.ts';

interface PrintSummaryViewProps {
  language: 'en' | 'hi';
  results: MatchedSchemeResult[];
  profile: UserProfile;
}

export const PrintSummaryView: React.FC<PrintSummaryViewProps> = ({
  language,
  results,
  profile
}) => {
  const isHi = language === 'hi';

  return (
    <div className="hidden print:block p-8 bg-white text-black font-sans max-w-4xl mx-auto">
      {/* Official-style Header */}
      <div className="border-b-2 border-black pb-4 mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold uppercase tracking-tight">
            {isHi ? 'योजनामित्र - सरकारी व निजी कल्याणकारी पात्रता विवरण पत्र' : 'YojanaMitra - Citizen Welfare & Benefits Eligibility Report'}
          </h1>
          <p className="text-xs text-stone-600">
            {isHi
              ? 'ग्राम पंचायत, जन सेवा केंद्र (CSC), बैंक व संबंधित कार्यालय में प्रस्तुत करने हेतु'
              : 'Official summary for Common Service Centre (CSC), Banks & Government Office submission'}
          </p>
        </div>
        <div className="text-right text-xs">
          <p><strong>{isHi ? 'दिनांक:' : 'Generated Date:'}</strong> {new Date().toLocaleDateString('en-IN')}</p>
          <p><strong>{isHi ? 'सत्यापन प्रणाली:' : 'Engine:'}</strong> Rule-Verified 1.0</p>
        </div>
      </div>

      {/* Applicant Profile Summary Table */}
      <div className="mb-6 p-3 border border-stone-300 rounded-lg bg-stone-50">
        <h2 className="text-xs font-bold uppercase tracking-wider mb-2">
          {isHi ? 'आवेदक प्रोफ़ाइल सारांश' : 'Applicant Profile Snapshot'}
        </h2>
        <div className="grid grid-cols-3 gap-2 text-xs">
          <p><strong>{isHi ? 'आयु:' : 'Age:'}</strong> {profile.age} {isHi ? 'वर्ष' : 'Years'}</p>
          <p><strong>{isHi ? 'राज्य:' : 'State:'}</strong> {profile.state}</p>
          <p><strong>{isHi ? 'पारिवारिक आय:' : 'Annual Family Income:'}</strong> ₹{profile.income.toLocaleString('en-IN')}</p>
          <p><strong>{isHi ? 'व्यवसाय:' : 'Occupation:'}</strong> {profile.occupation}</p>
          <p><strong>{isHi ? 'लिंग:' : 'Gender:'}</strong> {profile.gender}</p>
          <p><strong>{isHi ? 'सामाजिक श्रेणी:' : 'Social Category:'}</strong> {profile.category.toUpperCase()}</p>
        </div>
      </div>

      {/* Matched Schemes List */}
      <div className="mb-6">
        <h2 className="text-sm font-bold uppercase tracking-wider mb-3 border-b pb-1">
          {isHi ? `पात्र कल्याणकारी योजनाएं (${results.length}) - सरकारी एवं निजी` : `Eligible Welfare Schemes (${results.length}) - Government & Private`}
        </h2>

        <div className="space-y-4">
          {results.map((res, idx) => {
            const title = isHi ? res.scheme.name_hi : res.scheme.name;
            const benefit = isHi ? res.scheme.benefit_amount_tag_hi : res.scheme.benefit_amount_tag;
            const docs = isHi ? res.scheme.documents_hi : res.scheme.documents;

            return (
              <div key={idx} className="p-3 border border-stone-300 rounded-lg text-xs space-y-1.5">
                <div className="flex justify-between items-baseline">
                  <h3 className="font-bold text-sm">
                    {idx + 1}. {title}
                  </h3>
                  <span className="font-bold bg-stone-200 px-2 py-0.5 rounded">
                    {benefit}
                  </span>
                </div>
                <p className="italic text-stone-700">
                  {res.why_you_qualify}
                </p>
                <div>
                  <strong>{isHi ? 'आवश्यक दस्तावेज चेकलिस्ट:' : 'Required Documents Checklist:'}</strong>
                  <ul className="list-disc list-inside mt-1 space-y-0.5">
                    {docs.map((d, dIdx) => (
                      <li key={dIdx}>[  ] {d}</li>
                    ))}
                  </ul>
                </div>
                <p className="text-[10px] text-stone-500 pt-1">
                  {isHi ? 'आधिकारिक पोर्टल: ' : 'Official Portal: '} {res.scheme.apply_link}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer Notes & CSC Seal space */}
      <div className="border-t pt-4 flex justify-between text-xs text-stone-600">
        <div className="space-y-1 max-w-md">
          <p className="font-bold">{isHi ? 'महत्वपूर्ण सहायता हेल्पलाइन:' : 'Important Helplines:'}</p>
          <p>• Ayushman Bharat PM-JAY: 14555 | PM-KISAN: 155261 | National Scholarship: 0120-6619540</p>
          <p className="text-[10px] text-stone-500">
            {isHi
              ? 'यह विवरण पत्र सूचनात्मक मार्गदर्शन हेतु है। अंतिम लाभ संबंधित विभाग के सत्यापन पर निर्भर करता है।'
              : 'This document provides algorithmic guidance based on official public criteria. Final grant subject to departmental verification.'}
          </p>
        </div>
        <div className="w-48 h-20 border border-dashed border-stone-400 rounded flex items-center justify-center text-center text-[10px] text-stone-400">
          {isHi ? 'सीएससी / पंचायत मोहर व हस्ताक्षर' : 'CSC / Panchayat Stamp & Signature'}
        </div>
      </div>
    </div>
  );
};
