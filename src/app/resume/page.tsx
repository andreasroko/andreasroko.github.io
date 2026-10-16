"use client";
import 'react-vertical-timeline-component/style.min.css';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import React from 'react';
import { Briefcase, Calendar, GraduationCap } from 'lucide-react';

type Experience = {
  title: string;
  companyOrSchool: string;
  date: string;
  description: string;
  type: 'work' | 'education';
};

const experiences: Experience[] = [
  {
    title: "Electrical & Computer Engineering (Msc)",
    companyOrSchool: "Aristotle University of Thessaloniki",
    date: "2015 - 2021",
    description: "Integrated master’s in electronics, programming, and systems design.",
    type: "education",
  },
  {
    title: "Software Engineer",
    companyOrSchool: "Deloitte",
    date: "Oct 2020 - Sept 2024",
    description: "Salesforce CRM, Node.js/Express, React web apps for enterprise clients.",
    type: "work",
  },
  {
    title: "Embedded Software Developer",
    companyOrSchool: "Nokia",
    date: "Sept 2024 - March 2025",
    description: "Embedded OS, Docker, and automation with Bash scripting.",
    type: "work",
  },
  {
    title: "Software Engineer",
    companyOrSchool: "Deloitte",
    date: "March 2025 - Dec 2025",
    description: "Salesforce and React-Express app architecture/design.",
    type: "work",
  },
  {
    title: "Digital Humanities (Msc)",
    companyOrSchool: "National and Kapodistrian University of Athens",
    date: "2025 - Present",
    description: "3D modeling, digital reconstruction, and HCI research.",
    type: "education",
  },
  {
    title: "Software Engineer",
    companyOrSchool: "Skroutz",
    date: "Jan 2026 - Present",
    description: "Building features for Greece's largest e-commerce marketplace.",
    type: "work",
  },
];

const typeStyles = {
  work: { label: 'WORK', accent: '#3b82f6', Icon: Briefcase },
  education: { label: 'EDUCATION', accent: '#a78bfa', Icon: GraduationCap },
} as const;

const cardBorder = 'rgba(255, 255, 255, 0.12)';

export default function ResumePage() {
  return (
    <main className="w-full flex items-center justify-center flex-col text-white overflow-visible">
      <div className="max-h-[80vh] overflow-y-auto w-full h-auto">
        <VerticalTimeline lineColor="rgba(255, 255, 255, 0.25)">
          {[...experiences].reverse().map((exp, idx) => {
            const { label, accent, Icon } = typeStyles[exp.type];
            const isCurrent = exp.date.includes('Present');
            return (
              <VerticalTimelineElement
                key={idx}
                date={exp.date}
                dateClassName="resume-date"
                icon={<Icon />}
                iconStyle={{ background: '#111', color: accent, boxShadow: `0 0 0 4px ${accent}, 0 0 18px ${accent}66` }}
                contentStyle={{
                  background: 'rgba(17, 17, 17, 0.85)',
                  color: '#fff',
                  border: `1px solid ${cardBorder}`,
                  borderTop: `3px solid ${accent}`,
                  borderRadius: '12px',
                  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.45)',
                  backdropFilter: 'blur(6px)',
                }}
                contentArrowStyle={{ borderRight: `7px solid ${cardBorder}` }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-[10px] tracking-widest px-2 py-0.5 rounded border" style={{ color: accent, borderColor: `${accent}66` }}>{label}</span>
                  {isCurrent && (
                    <span className="flex items-center gap-1.5 text-[10px] tracking-widest px-2 py-0.5 rounded border border-emerald-400/40 text-emerald-300">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" aria-hidden />
                      CURRENT
                    </span>
                  )}
                </div>
                <h3 className="text-lg font-semibold leading-snug">{exp.title}</h3>
                <h4 className="text-sm tracking-wide mt-0.5" style={{ color: accent }}>{exp.companyOrSchool}</h4>
                <div className="resume-date-inline flex items-center gap-1.5 text-xs text-white/60 mt-2">
                  <Calendar size={12} aria-hidden />
                  {exp.date}
                </div>
                <div className="text-sm text-white/75 leading-relaxed mt-3 pt-3 border-t border-white/10">{exp.description}</div>
              </VerticalTimelineElement>
            );
          })}
        </VerticalTimeline>
      </div>
    </main>
  );
}
