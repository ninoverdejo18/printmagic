import React from "react";
import { motion } from "motion/react";
import { 
  FileCheck, 
  ChevronRight 
} from "lucide-react";

interface IdApplicationLinksProps {
  setCurrentPage: (page: string) => void;
  setSelectedServiceQuote: (serviceName: string) => void;
}

export default function IdApplicationLinks({}: IdApplicationLinksProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.3 }}
      className="w-full min-h-screen pt-24 pb-20 px-4 sm:px-6 md:px-8 lg:px-10 bg-slate-50 relative overflow-hidden"
      id="id-application-links-page"
    >
      <div className="max-w-7xl mx-auto space-y-12 relative z-10 w-full" id="id-application-links">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 bg-white/95 backdrop-blur-md p-6 sm:p-10 rounded-3xl shadow-2xl border border-slate-200">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#12941F] tracking-tight font-display" id="id-application-links-heading">
            ID Application Links
          </h2>

          <p className="text-sm sm:text-base text-[#454545] opacity-90 font-sans leading-relaxed">
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
              { grade: "Grade 7", level: "Junior High", code: "JHS-G7", color: "from-emerald-50 to-teal-50 border-emerald-200 text-emerald-800" },
              { grade: "Grade 8", level: "Junior High", code: "JHS-G8", color: "from-teal-50 to-emerald-50 border-teal-200 text-teal-800" },
              { grade: "Grade 9", level: "Junior High", code: "JHS-G9", color: "from-emerald-50 to-green-50 border-emerald-200 text-emerald-800" },
              { grade: "Grade 10", level: "Junior High", code: "JHS-G10", color: "from-green-50 to-teal-50 border-green-200 text-green-800" },
              { grade: "Grade 11", level: "Senior High", code: "SHS-G11", color: "from-emerald-100/50 to-teal-50 border-emerald-300 text-emerald-900" },
              { grade: "Grade 12", level: "Senior High", code: "SHS-G12", color: "from-teal-100/50 to-emerald-50 border-teal-300 text-teal-900" },
            ].map((item) => (
              <a 
                key={item.grade}
                href="https://drive.google.com/file/d/1rhCZaNxlSw2oAwSbWzW0FHB0indDr4Uo/view?usp=drive_link"
                target="_blank"
                rel="noopener noreferrer"
                className={`p-4 rounded-2xl bg-gradient-to-br ${item.color} border shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-3 group hover:scale-105 block`}
              >
                <div className="space-y-1">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-white/80 border border-slate-200 text-slate-700 inline-block">
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

      </div>
    </motion.div>
  );
}
