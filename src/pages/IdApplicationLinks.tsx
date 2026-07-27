import React, { useState } from "react";
import { motion } from "motion/react";
import { 
  FileCheck, 
  ChevronRight,
  AlertCircle,
  Mail,
  Copy,
  Check,
  ExternalLink,
  ClipboardList
} from "lucide-react";

interface IdApplicationLinksProps {
  setCurrentPage: (page: string) => void;
  setSelectedServiceQuote: (serviceName: string) => void;
}

export default function IdApplicationLinks({}: IdApplicationLinksProps) {
  const [copied, setCopied] = useState(false);
  const emailAddress = "printmagiconline.service@gmail.com";

  React.useEffect(() => {
    if (typeof window !== "undefined" && (window.location.hash.includes("lost-id") || window.location.hash.includes("id-lost"))) {
      setTimeout(() => {
        const el = document.getElementById("id-lost-section");
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        }
      }, 150);
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(emailAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.3 }}
      className="w-full min-h-screen pt-24 pb-20 px-4 sm:px-6 md:px-8 lg:px-10 bg-slate-50 relative overflow-hidden"
      id="id-application-links-page"
    >
      <div className="max-w-7xl mx-auto space-y-10 relative z-10 w-full" id="id-application-links">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 bg-white/95 backdrop-blur-md p-6 sm:p-10 rounded-3xl shadow-2xl border border-slate-200">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <img 
              src="/ihsbc-logo1.png" 
              alt="Batangas City Integrated High School Logo" 
              className="w-[100px] h-[100px] object-contain"
            />
            <p className="text-[20px] font-semibold font-mono uppercase tracking-wider text-slate-500">
              Batangas City Integrated High School
            </p>
          </div>

          <div className="-mx-6 sm:-mx-10 h-px bg-slate-200" />

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#12941F] tracking-tight font-display" id="id-application-links-heading">
            ID Application Links
          </h2>

          <p className="text-[13px] text-[#454545] opacity-90 font-sans leading-relaxed">
            Fast, seamless online registration and document submission links for Student PVC Cards, Employee Badges, Lanyard ID Laces, and Barangay ID Applications in Batangas City.
          </p>
        </div>

        {/* Grade 7 to Grade 12 Quick Application Breakdown */}
        <div className="bg-white/95 backdrop-blur-md p-6 sm:p-8 rounded-3xl shadow-xl border border-slate-200 space-y-6" id="grade-level-section">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
            <div>
              <div className="inline-flex items-center gap-1.5 text-[#12941F] text-xs font-bold font-mono uppercase tracking-wider mb-2">
                <FileCheck className="w-3.5 h-3.5" />
                <span>Junior & Senior High School PVC ID Registration</span>
              </div>
              <h3 className="text-2xl font-extrabold text-slate-900 font-display">
                Select Your Grade Level (Grade 7 – 12)
              </h3>
              <p className="text-xs sm:text-sm text-[#7D7D7D] font-sans">
                Direct online ID submission portal per grade level for students and class advisers.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { grade: "Grade 7", level: "Junior High", code: "JHS-G7", link: "https://docs.google.com/spreadsheets/d/1mNk0jdtp3UvLzGl8ypAIkmgFodHLP34q/edit?gid=368221457#gid=368221457" },
              { grade: "Grade 8", level: "Junior High", code: "JHS-G8", link: "https://docs.google.com/spreadsheets/d/1DIOZHf13o22IT3w0RVmtn1QRxKarohXr/edit?gid=599772720#gid=599772720" },
              { grade: "Grade 9", level: "Junior High", code: "JHS-G9", link: "https://docs.google.com/spreadsheets/d/16hItWnFDU8j3T6fCXpYzKCQTSDQeed2t/edit?gid=1158420100#gid=1158420100" },
              { grade: "Grade 10", level: "Junior High", code: "JHS-G10", link: "https://docs.google.com/spreadsheets/d/143IJYomwxGVm_iwOVjI5nY6BZE9AXGig/edit?gid=10616093#gid=10616093" },
              { grade: "Grade 11", level: "Senior High", code: "SHS-G11", link: "https://docs.google.com/spreadsheets/d/1l6nKJMJPChGNWxUVkVyCNfBilqJST45DJ3SylnJtrEU/edit?gid=394281231#gid=394281231" },
              { grade: "Grade 12", level: "Senior High", code: "SHS-G12", link: "https://docs.google.com/spreadsheets/d/1zAIlF87b-16O1PkGsAuVuKQUb1c81GUb/edit?gid=10616093#gid=10616093" },
            ].map((item) => (
              <a 
                key={item.grade}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-3 group hover:scale-105 hover:border-emerald-300 block"
              >
                <div className="space-y-1">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-50 border border-slate-200 text-slate-700 inline-block">
                    {item.code}
                  </span>
                  <h4 className="text-lg font-black text-slate-900 font-display group-hover:text-[#12941F] transition-colors">
                    {item.grade}
                  </h4>
                  <p className="text-[11px] text-slate-600 font-sans font-medium">
                    {item.level} ID Form
                  </p>
                </div>

                <div
                  className="w-full py-1.5 px-2 rounded-lg bg-[#12941F] group-hover:bg-[#166534] text-white font-bold text-[11px] transition-colors flex items-center justify-center gap-1 shadow-sm"
                >
                  <span>Click Here</span>
                  <ChevronRight className="w-3 h-3" />
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* NEW SECTION: ID Lost / Replacement Request */}
        <div className="bg-white/95 backdrop-blur-md p-6 sm:p-8 rounded-3xl shadow-xl space-y-6" id="id-lost-section">
          <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
            <div className="space-y-2 flex-1">
              <div className="inline-flex items-center gap-1.5 text-[#12941F] text-xs font-bold font-mono uppercase tracking-wider">
                <AlertCircle className="w-4 h-4 text-[#12941F]" />
                <span>Lost Card & ID Replacement Portal</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display">
                Lost ID Application & Replacement
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 font-sans max-w-2xl leading-relaxed">
                If you have lost your student PVC card or employee badge, or require a re-issuance, please submit your request through our online Google Form or contact our support email directly.
              </p>
            </div>

            {/* Combined Lost ID Application & Support Card */}
            <div className="w-full lg:w-96 flex-shrink-0 bg-white text-slate-900 p-5 rounded-2xl shadow-md border border-slate-200 space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-900 flex items-center gap-1.5">
                  <ClipboardList className="w-4 h-4 text-slate-900" />
                  Lost ID Replacement Application Form
                </span>
              </div>

              {/* Option 1: Online Form */}
              <div>
                <a
                  href="https://docs.google.com/forms/d/e/1FAIpQLSeEWKNZNnSQIyNfBedI2jxzFaYEAgzYubezNm6_u1IlJFYbTQ/viewform"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-4 rounded-xl bg-[#12941F] hover:bg-[#166534] text-white text-xs font-bold transition-all flex items-center justify-between shadow-sm group"
                >
                  <span className="flex items-center gap-2">
                    <ClipboardList className="w-4 h-4" />
                    Click here
                  </span>
                  <ExternalLink className="w-3.5 h-3.5 text-emerald-100 group-hover:translate-x-0.5 transition-transform" />
                </a>
              </div>

              {/* Divider */}
              <div className="relative flex items-center justify-center">
                <div className="border-t border-slate-100 w-full"></div>
              </div>

              {/* Option 2: Email Contact */}
              <div className="space-y-2">
                <div className="flex items-center gap-1.5 text-xs text-slate-900 font-bold uppercase tracking-wider">
                  <Mail className="w-3.5 h-3.5 text-slate-900" />
                  <span className="text-[10.6px]">Support Email Address</span>
                </div>
                
                <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200 flex items-center justify-between gap-2">
                  <a 
                    href={`mailto:${emailAddress}?subject=Lost%20ID%20Replacement%20Request`}
                    className="text-xs font-mono font-bold text-slate-900 hover:text-[#12941F] hover:underline truncate"
                    title="Send Email"
                  >
                    {emailAddress}
                  </a>
                  <button
                    onClick={handleCopyEmail}
                    className="p-1.5 rounded-lg bg-white hover:bg-slate-100 text-slate-600 hover:text-slate-900 border border-slate-200 transition-colors flex-shrink-0"
                    title="Copy email address"
                    aria-label="Copy email address"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-[#12941F]" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </motion.div>
  );
}

