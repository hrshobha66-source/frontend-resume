import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  FileText,
  User,
  GraduationCap,
  Code2,
  FolderGit2,
  Award,
  Briefcase,
  Edit2,
  Check,
  Plus,
  Trash2,
  X,
  Sparkles,
  ArrowRight,
  ExternalLink,
  Save,
  RotateCcw
} from 'lucide-react';
import { useResume } from '../context/ResumeContext';
import { Card, CardHeader, CardContent, CardFooter } from '../components/Card';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { CardSkeleton } from '../components/Loader';
import { initialMockResumeData } from '../mocks/mockResumeData';

export const AnalysisPage = () => {
  const navigate = useNavigate();
  const { resumeData, setResumeData, updateResumeSection } = useResume();

  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(resumeData);
  const [editingCard, setEditingCard] = useState(null); // 'personal', 'education', 'skills', 'projects', 'certifications', 'internships'
  const [newSkillInput, setNewSkillInput] = useState('');
  const [saveSuccessNotice, setSaveSuccessNotice] = useState(false);

  // Simulate loading skeleton for parsed document on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  // Update local state when resumeData changes
  useEffect(() => {
    setData(resumeData);
  }, [resumeData]);

  const handleSaveCard = (section) => {
    updateResumeSection(section, data[section]);
    setEditingCard(null);
    setSaveSuccessNotice(true);
    setTimeout(() => setSaveSuccessNotice(false), 2500);
  };

  const handleCancelCard = () => {
    setData(resumeData);
    setEditingCard(null);
  };

  const handleConfirmAndContinue = () => {
    setResumeData(data);
    navigate('/jobs');
  };

  const handleResetToDefault = () => {
    setData(initialMockResumeData);
    setResumeData(initialMockResumeData);
    setEditingCard(null);
  };

  // --- Skills Handlers ---
  const handleAddSkill = (e) => {
    e?.preventDefault();
    if (!newSkillInput.trim()) return;
    if (data.technicalSkills.includes(newSkillInput.trim())) {
      setNewSkillInput('');
      return;
    }
    setData(prev => ({
      ...prev,
      technicalSkills: [...prev.technicalSkills, newSkillInput.trim()]
    }));
    setNewSkillInput('');
  };

  const handleRemoveSkill = (skillToRemove) => {
    setData(prev => ({
      ...prev,
      technicalSkills: prev.technicalSkills.filter(s => s !== skillToRemove)
    }));
  };

  // --- Education Handlers ---
  const handleRemoveEducation = (id) => {
    setData(prev => ({
      ...prev,
      education: prev.education.filter(e => e.id !== id)
    }));
  };

  const handleAddEducation = () => {
    const newEdu = {
      id: `edu-${Date.now()}`,
      degree: 'Associate Degree / Diploma',
      institution: 'University / College',
      location: 'City, State',
      startYear: '2022',
      endYear: '2024',
      gpa: '3.8 / 4.0',
      highlights: 'Relevant coursework and academic achievements.'
    };
    setData(prev => ({
      ...prev,
      education: [...prev.education, newEdu]
    }));
  };

  // --- Projects Handlers ---
  const handleRemoveProject = (id) => {
    setData(prev => ({
      ...prev,
      projects: prev.projects.filter(p => p.id !== id)
    }));
  };

  const handleAddProject = () => {
    const newProj = {
      id: `proj-${Date.now()}`,
      title: 'New Technical Project',
      description: 'Describe problem statement, architectural methodology, and quantitative outcome.',
      techStack: ['Python', 'SQL'],
      link: 'github.com/freshdev/project'
    };
    setData(prev => ({
      ...prev,
      projects: [...prev.projects, newProj]
    }));
  };

  // --- Certifications Handlers ---
  const handleRemoveCertification = (id) => {
    setData(prev => ({
      ...prev,
      certifications: prev.certifications.filter(c => c.id !== id)
    }));
  };

  const handleAddCertification = () => {
    const newCert = {
      id: `cert-${Date.now()}`,
      title: 'New Professional Certification',
      issuer: 'Certification Authority',
      issueDate: '2024',
      credentialId: 'CERT-ID-1234'
    };
    setData(prev => ({
      ...prev,
      certifications: [...prev.certifications, newCert]
    }));
  };

  // --- Internships Handlers ---
  const handleRemoveInternship = (id) => {
    setData(prev => ({
      ...prev,
      internships: prev.internships.filter(i => i.id !== id)
    }));
  };

  const handleAddInternship = () => {
    const newExp = {
      id: `exp-${Date.now()}`,
      role: 'Associate / Trainee',
      organization: 'Tech Enterprise',
      duration: '3 months',
      location: 'Hybrid',
      contributions: ['Contributed to data cleaning, ETL pipeline maintenance, and analytics tasks.']
    };
    setData(prev => ({
      ...prev,
      internships: [...prev.internships, newExp]
    }));
  };

  if (isLoading) {
    return (
      <div className="max-w-6xl mx-auto space-y-6 animate-fadeIn">
        <div className="space-y-2">
          <div className="h-6 w-32 bg-slate-200 rounded animate-pulse" />
          <div className="h-8 w-64 bg-slate-200 rounded animate-pulse" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-fadeIn pb-12">
      {/* Header and Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200/80">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-indigo-50 text-indigo-700 text-xs font-bold uppercase tracking-wider">
            Step 2: Verification
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
            Resume Analysis & Extracted Entities
          </h1>
          <p className="text-sm text-slate-500">
            Review the structured information extracted by our AI parser. Click Edit on any card to correct or add items.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            icon={RotateCcw}
            onClick={handleResetToDefault}
            title="Reset to initial sample"
          >
            Reset
          </Button>
          <Button
            variant="primary"
            onClick={handleConfirmAndContinue}
            icon={ArrowRight}
            iconPosition="right"
            className="shadow-md shadow-indigo-600/20"
          >
            Confirm & Continue
          </Button>
        </div>
      </div>

      {saveSuccessNotice && (
        <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs sm:text-sm flex items-center gap-2 animate-fadeIn">
          <Check className="w-4 h-4 text-emerald-600" />
          <span>Card changes saved successfully to your career profile!</span>
        </div>
      )}

      {/* Grid of Extracted Data Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 1. PERSONAL INFORMATION */}
        <Card className="border-slate-200/90 shadow-soft">
          <CardHeader
            title="Personal Information"
            subtitle="Candidate identity, contact coordinates, and portfolio links."
            action={
              editingCard === 'personalInfo' ? (
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm" onClick={handleCancelCard}>Cancel</Button>
                  <Button variant="primary" size="sm" icon={Save} onClick={() => handleSaveCard('personalInfo')}>Save</Button>
                </div>
              ) : (
                <Button variant="outline" size="sm" icon={Edit2} onClick={() => setEditingCard('personalInfo')}>
                  Edit
                </Button>
              )
            }
          />
          <CardContent className="space-y-4">
            {editingCard === 'personalInfo' ? (
              <div className="space-y-3">
                <Input
                  label="Full Name"
                  value={data.personalInfo.fullName}
                  onChange={(e) => setData({
                    ...data,
                    personalInfo: { ...data.personalInfo, fullName: e.target.value }
                  })}
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <Input
                    label="Email"
                    value={data.personalInfo.email}
                    onChange={(e) => setData({
                      ...data,
                      personalInfo: { ...data.personalInfo, email: e.target.value }
                    })}
                  />
                  <Input
                    label="Phone"
                    value={data.personalInfo.phone}
                    onChange={(e) => setData({
                      ...data,
                      personalInfo: { ...data.personalInfo, phone: e.target.value }
                    })}
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <Input
                    label="Location"
                    value={data.personalInfo.location}
                    onChange={(e) => setData({
                      ...data,
                      personalInfo: { ...data.personalInfo, location: e.target.value }
                    })}
                  />
                  <Input
                    label="LinkedIn"
                    value={data.personalInfo.linkedin}
                    onChange={(e) => setData({
                      ...data,
                      personalInfo: { ...data.personalInfo, linkedin: e.target.value }
                    })}
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <Input
                    label="GitHub"
                    value={data.personalInfo.github}
                    onChange={(e) => setData({
                      ...data,
                      personalInfo: { ...data.personalInfo, github: e.target.value }
                    })}
                  />
                  <Input
                    label="Portfolio"
                    value={data.personalInfo.portfolio}
                    onChange={(e) => setData({
                      ...data,
                      personalInfo: { ...data.personalInfo, portfolio: e.target.value }
                    })}
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
                    Summary
                  </label>
                  <textarea
                    rows={3}
                    value={data.personalInfo.summary}
                    onChange={(e) => setData({
                      ...data,
                      personalInfo: { ...data.personalInfo, summary: e.target.value }
                    })}
                    className="w-full rounded-xl border border-slate-300 p-2.5 text-sm focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100"
                  />
                </div>
              </div>
            ) : (
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-700 flex items-center justify-center font-bold text-sm">
                    {data.personalInfo.fullName.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-base">{data.personalInfo.fullName}</h4>
                    <p className="text-xs text-slate-500">{data.personalInfo.email} • {data.personalInfo.phone}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 text-xs text-slate-600">
                  <div><span className="font-semibold text-slate-700">Location:</span> {data.personalInfo.location}</div>
                  <div><span className="font-semibold text-slate-700">LinkedIn:</span> {data.personalInfo.linkedin}</div>
                  <div><span className="font-semibold text-slate-700">GitHub:</span> {data.personalInfo.github}</div>
                  <div><span className="font-semibold text-slate-700">Portfolio:</span> {data.personalInfo.portfolio}</div>
                </div>

                <div className="pt-2 text-xs text-slate-600 leading-relaxed bg-slate-50 p-3 rounded-lg border border-slate-100">
                  <span className="font-semibold text-slate-800 block mb-1">Professional Objective:</span>
                  {data.personalInfo.summary}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* 2. TECHNICAL SKILLS (CHIPS) */}
        <Card className="border-slate-200/90 shadow-soft">
          <CardHeader
            title="Technical Skills"
            subtitle={`${data.technicalSkills.length} identified competencies used for role matching.`}
            action={
              editingCard === 'technicalSkills' ? (
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm" onClick={handleCancelCard}>Cancel</Button>
                  <Button variant="primary" size="sm" icon={Save} onClick={() => handleSaveCard('technicalSkills')}>Save</Button>
                </div>
              ) : (
                <Button variant="outline" size="sm" icon={Edit2} onClick={() => setEditingCard('technicalSkills')}>
                  Edit
                </Button>
              )
            }
          />
          <CardContent className="space-y-4">
            {editingCard === 'technicalSkills' && (
              <form onSubmit={handleAddSkill} className="flex gap-2">
                <input
                  type="text"
                  placeholder="e.g. PyTorch, Docker, Snowflake..."
                  value={newSkillInput}
                  onChange={(e) => setNewSkillInput(e.target.value)}
                  className="flex-1 rounded-xl border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100"
                />
                <Button type="submit" size="sm" variant="secondary" icon={Plus}>
                  Add Skill
                </Button>
              </form>
            )}

            {data.technicalSkills.length === 0 ? (
              <p className="text-xs text-slate-400 italic">No technical skills detected. Click Edit to add competencies.</p>
            ) : (
              <div className="flex flex-wrap gap-2">
                {data.technicalSkills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-50 border border-indigo-200/70 text-indigo-800 text-xs font-semibold shadow-2xs hover:bg-indigo-100 transition-colors"
                  >
                    <span>{skill}</span>
                    {editingCard === 'technicalSkills' && (
                      <button
                        type="button"
                        onClick={() => handleRemoveSkill(skill)}
                        className="text-indigo-400 hover:text-rose-600 ml-1 rounded"
                        aria-label={`Remove ${skill}`}
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </span>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* 3. EDUCATION */}
        <Card className="border-slate-200/90 shadow-soft">
          <CardHeader
            title="Education Background"
            subtitle="Degree qualifications, institutions, and academic scores."
            action={
              editingCard === 'education' ? (
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm" onClick={handleCancelCard}>Cancel</Button>
                  <Button variant="primary" size="sm" icon={Save} onClick={() => handleSaveCard('education')}>Save</Button>
                </div>
              ) : (
                <Button variant="outline" size="sm" icon={Edit2} onClick={() => setEditingCard('education')}>
                  Edit
                </Button>
              )
            }
          />
          <CardContent className="space-y-4">
            {data.education.length === 0 ? (
              <p className="text-xs text-slate-400 italic">No education items found.</p>
            ) : (
              <div className="space-y-4">
                {data.education.map((edu, idx) => (
                  <div key={edu.id} className="p-4 rounded-xl border border-slate-100 bg-slate-50/60 space-y-2 relative">
                    {editingCard === 'education' && (
                      <button
                        type="button"
                        onClick={() => handleRemoveEducation(edu.id)}
                        className="absolute top-3 right-3 text-slate-400 hover:text-rose-600 p-1"
                        title="Remove education"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-bold text-slate-900 text-sm">{edu.degree}</h4>
                        <p className="text-xs text-indigo-700 font-medium">{edu.institution} • {edu.location}</p>
                      </div>
                      <span className="text-xs font-bold px-2 py-0.5 rounded bg-white border border-slate-200 text-slate-700">
                        {edu.startYear} – {edu.endYear}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-xs font-medium text-slate-600">
                      <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 font-bold">
                        GPA: {edu.gpa}
                      </span>
                      <span className="text-slate-400">•</span>
                      <span className="text-slate-500 italic truncate">{edu.highlights}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {editingCard === 'education' && (
              <Button variant="secondary" size="sm" className="w-full" icon={Plus} onClick={handleAddEducation}>
                Add Education Item
              </Button>
            )}
          </CardContent>
        </Card>

        {/* 4. PROJECTS */}
        <Card className="border-slate-200/90 shadow-soft">
          <CardHeader
            title="Academic & Portfolio Projects"
            subtitle="Demonstrated technical application and repository implementations."
            action={
              editingCard === 'projects' ? (
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm" onClick={handleCancelCard}>Cancel</Button>
                  <Button variant="primary" size="sm" icon={Save} onClick={() => handleSaveCard('projects')}>Save</Button>
                </div>
              ) : (
                <Button variant="outline" size="sm" icon={Edit2} onClick={() => setEditingCard('projects')}>
                  Edit
                </Button>
              )
            }
          />
          <CardContent className="space-y-4">
            {data.projects.length === 0 ? (
              <p className="text-xs text-slate-400 italic">No projects found.</p>
            ) : (
              <div className="space-y-3">
                {data.projects.map((proj) => (
                  <div key={proj.id} className="p-4 rounded-xl border border-slate-100 bg-slate-50/60 space-y-2 relative">
                    {editingCard === 'projects' && (
                      <button
                        type="button"
                        onClick={() => handleRemoveProject(proj.id)}
                        className="absolute top-3 right-3 text-slate-400 hover:text-rose-600 p-1"
                        title="Remove project"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                    <div className="flex items-start justify-between pr-6">
                      <h4 className="font-bold text-slate-900 text-sm">{proj.title}</h4>
                      <span className="text-[11px] text-indigo-600 font-mono">{proj.link}</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {proj.description}
                    </p>
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {proj.techStack.map((tech, i) => (
                        <span key={i} className="text-[10px] font-semibold px-2 py-0.5 rounded bg-white border border-slate-200 text-slate-700">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {editingCard === 'projects' && (
              <Button variant="secondary" size="sm" className="w-full" icon={Plus} onClick={handleAddProject}>
                Add New Project
              </Button>
            )}
          </CardContent>
        </Card>

        {/* 5. CERTIFICATIONS */}
        <Card className="border-slate-200/90 shadow-soft">
          <CardHeader
            title="Certifications & Accreditations"
            subtitle="Verified third-party bootcamps and standardized cloud credentials."
            action={
              editingCard === 'certifications' ? (
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm" onClick={handleCancelCard}>Cancel</Button>
                  <Button variant="primary" size="sm" icon={Save} onClick={() => handleSaveCard('certifications')}>Save</Button>
                </div>
              ) : (
                <Button variant="outline" size="sm" icon={Edit2} onClick={() => setEditingCard('certifications')}>
                  Edit
                </Button>
              )
            }
          />
          <CardContent className="space-y-4">
            {data.certifications.length === 0 ? (
              <p className="text-xs text-slate-400 italic">No certifications listed.</p>
            ) : (
              <div className="space-y-3">
                {data.certifications.map((cert) => (
                  <div key={cert.id} className="p-3.5 rounded-xl border border-slate-100 bg-slate-50/60 flex items-start justify-between gap-3 relative">
                    <div className="space-y-1 min-w-0">
                      <h4 className="font-bold text-slate-900 text-sm truncate">{cert.title}</h4>
                      <p className="text-xs text-slate-500">{cert.issuer} • Issued {cert.issueDate}</p>
                      <span className="inline-block text-[10px] font-mono bg-white px-2 py-0.5 rounded border border-slate-200 text-slate-600">
                        ID: {cert.credentialId}
                      </span>
                    </div>
                    {editingCard === 'certifications' && (
                      <button
                        type="button"
                        onClick={() => handleRemoveCertification(cert.id)}
                        className="text-slate-400 hover:text-rose-600 p-1"
                        title="Remove certification"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            )}

            {editingCard === 'certifications' && (
              <Button variant="secondary" size="sm" className="w-full" icon={Plus} onClick={handleAddCertification}>
                Add Certification
              </Button>
            )}
          </CardContent>
        </Card>

        {/* 6. INTERNSHIPS / EXPERIENCE */}
        <Card className="border-slate-200/90 shadow-soft">
          <CardHeader
            title="Internships & Work Experience"
            subtitle="Industry exposure and real-world collaboration history."
            action={
              editingCard === 'internships' ? (
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm" onClick={handleCancelCard}>Cancel</Button>
                  <Button variant="primary" size="sm" icon={Save} onClick={() => handleSaveCard('internships')}>Save</Button>
                </div>
              ) : (
                <Button variant="outline" size="sm" icon={Edit2} onClick={() => setEditingCard('internships')}>
                  Edit
                </Button>
              )
            }
          />
          <CardContent className="space-y-4">
            {data.internships.length === 0 ? (
              <p className="text-xs text-slate-400 italic">No internship entries recorded.</p>
            ) : (
              <div className="space-y-3">
                {data.internships.map((exp) => (
                  <div key={exp.id} className="p-4 rounded-xl border border-slate-100 bg-slate-50/60 space-y-2 relative">
                    {editingCard === 'internships' && (
                      <button
                        type="button"
                        onClick={() => handleRemoveInternship(exp.id)}
                        className="absolute top-3 right-3 text-slate-400 hover:text-rose-600 p-1"
                        title="Remove internship"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-bold text-slate-900 text-sm">{exp.role}</h4>
                        <p className="text-xs text-indigo-700 font-medium">{exp.organization} • {exp.location}</p>
                      </div>
                      <span className="text-[11px] font-semibold text-slate-500 bg-white px-2 py-0.5 rounded border border-slate-200">
                        {exp.duration}
                      </span>
                    </div>
                    <ul className="list-disc list-inside text-xs text-slate-600 space-y-1 pt-1">
                      {exp.contributions.map((c, i) => (
                        <li key={i}>{c}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}

            {editingCard === 'internships' && (
              <Button variant="secondary" size="sm" className="w-full" icon={Plus} onClick={handleAddInternship}>
                Add Internship Record
              </Button>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Bottom Sticky Action Bar */}
      <div className="p-4 sm:p-6 bg-white rounded-2xl border border-slate-200/90 shadow-soft flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h4 className="text-sm font-bold text-slate-900">Information verified?</h4>
          <p className="text-xs text-slate-500">
            Confirming will lock in these profile entities for calculating job role suitability and skill gaps.
          </p>
        </div>

        <Button
          size="lg"
          variant="primary"
          onClick={handleConfirmAndContinue}
          icon={ArrowRight}
          iconPosition="right"
          className="w-full sm:w-auto shadow-md shadow-indigo-600/20"
        >
          Confirm Profile & View Job Roles
        </Button>
      </div>
    </div>
  );
};
