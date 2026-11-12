import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { PublicLayout } from '../layouts/PublicLayout';
import { DashboardLayout } from '../layouts/DashboardLayout';
import { ProtectedRoute } from '../components/ProtectedRoute';

import { LandingPage } from '../pages/LandingPage';
import { LoginPage } from '../pages/LoginPage';
import { SignupPage } from '../pages/SignupPage';
import { DashboardPage } from '../pages/DashboardPage';
import { UploadPage } from '../pages/UploadPage';
import { AnalysisPage } from '../pages/AnalysisPage';
import { JobsPage } from '../pages/JobsPage';
import { SkillGapPage } from '../pages/SkillGapPage';
import { AssessmentPage } from '../pages/AssessmentPage';
import { ResultPage } from '../pages/ResultPage';
import { ReportPage } from '../pages/ReportPage';

export const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes with PublicLayout */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
      </Route>

      {/* Authenticated Dashboard Routes with DashboardLayout */}
      <Route
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/upload" element={<UploadPage />} />
        <Route path="/analysis" element={<AnalysisPage />} />
        <Route path="/jobs" element={<JobsPage />} />
        <Route path="/skill-gap" element={<SkillGapPage />} />
        <Route path="/assessment" element={<AssessmentPage />} />
        <Route path="/result" element={<ResultPage />} />
        <Route path="/report" element={<ReportPage />} />
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};
