"use client";
import 'react-vertical-timeline-component/style.min.css';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import styles from './page.module.css'

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
    date: "March 2025 - Present",
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
];

export default function ResumePage() {
  return (
    <main className={styles.container}>
      <div className={styles.scrollable}>
        <VerticalTimeline>
          {[...experiences].reverse().map((exp, idx) => (
          <VerticalTimelineElement
            key={idx}
            iconStyle={{ background: exp.type === 'work' ? '#0070f3' : '#888', color: '#fff' }}
            contentStyle={{ background: '#f9f9f9', color: '#222', position: 'relative' }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <h3 className="vertical-timeline-element-title">{exp.title}</h3>
                <h4 className="vertical-timeline-element-subtitle">{exp.companyOrSchool}</h4>
              </div>
              <div style={{ fontSize: '0.95em', color: '#888', fontWeight: 500, marginLeft: '1em', whiteSpace: 'nowrap' }}>{exp.date}</div>
            </div>
            <p>{exp.description}</p>
          </VerticalTimelineElement>
        ))}
      </VerticalTimeline>
      </div>
    </main>
  );
}
