import React, { useEffect } from "react";

import { SECTIONS } from "../components/Privacy/privacyData";
import PrivacyHero from "../components/Privacy/PrivacyHero";
import PrivacySection from "../components/Privacy/PrivacySection";
import PrivacyContact from "../components/Privacy/PrivacyContact";


export default function Privacy() {
 
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  return (
    <div className="min-h-screen bg-[#f7f7f5] pb-16">
     
      <PrivacyHero />

    
      <div className="max-w-[900px] mx-auto px-5 sm:px-8 lg:px-12 pt-10">
        <div className="space-y-4">
       
          {SECTIONS.map((section, i) => (
            <PrivacySection
              key={section.id}
              section={section}
              index={i}
            />
          ))}

         
          <PrivacyContact />

          
          <div className="text-center pt-6 pb-4">
            <p className="text-[11px] text-gray-400 leading-relaxed max-w-lg mx-auto">
              By using Revoltevez services, you acknowledge that you have read
              and understood this Privacy Policy and agree to its terms.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}