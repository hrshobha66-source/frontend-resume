# CareerPulse AI 🚀
### AI-Based Resume Analysis and Career Readiness Assessment for Freshers

CareerPulse AI is a modern, responsive web application designed to bridge the college-to-corporate transition for fresher engineering graduates. It provides intelligent client-side resume entity extraction, job compatibility scoring, visual skill gap roadmaps, technical MCQ assessments, and downloadable PDF career dossiers.

---

## ✨ Key Features

1. **AI Resume Parser (`/upload` & `/analysis`)**:
   - Drag-and-drop ingestion accepting `.pdf`, `.doc`, `.docx` up to 5 MB.
   - 6 structured editable profile cards: Personal Info, Education, Technical Skills (interactive chips), Projects, Certifications, and Internships.

2. **Job Role Recommender (`/jobs`)**:
   - Algorithmic matching for key fresher roles:
     - **Data Analyst (88%)**
     - **ML Engineer (79%)**
     - **Data Scientist (75%)**
     - **Python Developer (68%)**
   - Interactive Recharts bar charts comparing candidate score against market demand.

3. **Skill Gap Diagnostics (`/skill-gap`)**:
   - Role selector dropdown.
   - Categorized badges: Skills You Have (green), Missing Skills (red), and Skills to Improve (yellow proficiency gauges).
   - Curated learning roadmaps with free and premium learning resources.

4. **Technical Competency Assessment (`/assessment`)**:
   - 15 domain MCQs across Python, SQL, Machine Learning, Data Structures, and Statistics.
   - Question navigator (1–15), answered/unanswered tracking, and submission confirmation modal.

5. **Assessment Scorecard & Review (`/result`)**:
   - Circular SVG score gauge (e.g. 86.7%), correct/incorrect breakdowns, Recharts subject proficiency chart.
   - Expandable 15-question review with official explanations and correct answer highlights.

6. **Final Career Readiness Dossier (`/report`)**:
   - Executive hiring verdict, 3 actionable next steps for the fresher.
   - Full synthesis of resume entities, role fits, skill gaps, and test metrics.
   - **Download PDF Report** using `html2canvas` and `jsPDF`.

---

## 🛠️ Tech Stack

- **Frontend**: React 18 + Vite (Plain JavaScript / JSX)
- **Styling**: Tailwind CSS v3
- **Routing**: React Router v6
- **Forms & Validation**: `react-hook-form` + `zod`
- **Charts**: `recharts`
- **Icons**: `lucide-react`
- **PDF Generation**: `html2canvas` + `jspdf`

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher recommended)

### Installation
```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/careerpulse-ai.git

# Navigate into the project folder
cd careerpulse-ai

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.
