import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Sparkles, Mail, Lock, Eye, EyeOff, AlertCircle, CheckCircle2, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { Card, CardContent } from '../components/Card';
import { Modal } from '../components/Modal';

const loginSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Please enter a valid email address'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters long')
    .regex(/\d/, 'Password must contain at least one number')
});

export const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState('');
  const [forgotModalOpen, setForgotModalOpen] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotSent, setForgotSent] = useState(false);

  const from = location.state?.from?.pathname || '/dashboard';

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting }
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: 'alex.johnson@fresherhub.edu',
      password: 'Password123'
    }
  });

  const onSubmit = async (data) => {
    setServerError('');
    try {
      await login(data.email, data.password);
      navigate(from, { replace: true });
    } catch (err) {
      setServerError(err.message || 'Login failed. Please check your credentials.');
    }
  };

  const fillDemoCredentials = () => {
    setValue('email', 'alex.johnson@fresherhub.edu', { shouldValidate: true });
    setValue('password', 'Password123', { shouldValidate: true });
    setServerError('');
  };

  const handleForgotPassword = (e) => {
    e.preventDefault();
    setForgotSent(true);
    setTimeout(() => {
      setForgotModalOpen(false);
      setForgotSent(false);
    }, 2000);
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8 bg-slate-50">
      <div className="w-full max-w-md space-y-6">
        {/* Brand header */}
        <div className="text-center space-y-2">
          <Link to="/" className="inline-flex items-center gap-2 group">
            <div className="h-10 w-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-md shadow-indigo-600/20 group-hover:scale-105 transition-transform">
              <Sparkles className="w-5 h-5" />
            </div>
            <span className="font-extrabold text-slate-900 tracking-tight text-xl">CareerPulse AI</span>
          </Link>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">
            Welcome back, Fresher!
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Sign in to access your resume analysis, tests, and career reports.
          </p>
        </div>

        {/* Card */}
        <Card className="shadow-soft-lg border-slate-200">
          <CardContent className="p-6 sm:p-8 space-y-6">
            {/* Error Banner */}
            {serverError && (
              <div
                role="alert"
                className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs sm:text-sm flex items-start gap-2.5 animate-fadeIn"
              >
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                <div className="flex-1 font-medium">{serverError}</div>
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
              <Input
                label="Email Address"
                id="email"
                type="email"
                placeholder="name@university.edu"
                icon={Mail}
                error={errors.email?.message}
                required
                {...register('email')}
              />

              <div>
                <Input
                  label="Password"
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Min 8 chars with number"
                  icon={Lock}
                  error={errors.password?.message}
                  required
                  endAdornment={
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="text-slate-400 hover:text-slate-600 focus:outline-none"
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  }
                  {...register('password')}
                />

                <div className="flex justify-end mt-1.5">
                  <button
                    type="button"
                    onClick={() => setForgotModalOpen(true)}
                    className="text-xs font-semibold text-indigo-600 hover:text-indigo-700"
                  >
                    Forgot password?
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full shadow-md shadow-indigo-600/20"
                isLoading={isSubmitting}
                size="md"
              >
                Sign In to Dashboard
              </Button>
            </form>

            {/* Quick Demo Helper */}
            <div className="pt-2 border-t border-slate-100 text-center">
              <button
                type="button"
                onClick={fillDemoCredentials}
                className="text-xs font-medium text-slate-500 hover:text-indigo-600 inline-flex items-center gap-1.5 py-1 px-2.5 rounded-lg bg-slate-100/70 hover:bg-slate-100 transition-colors"
              >
                <span>⚡ Auto-fill Fresher Demo Credentials</span>
              </button>
            </div>
          </CardContent>
        </Card>

        {/* Footer sign up prompt */}
        <p className="text-center text-xs sm:text-sm text-slate-600">
          Don’t have an account yet?{' '}
          <Link to="/signup" className="font-semibold text-indigo-600 hover:text-indigo-700 underline underline-offset-2">
            Sign up free
          </Link>
        </p>
      </div>

      {/* Forgot Password Modal */}
      <Modal
        isOpen={forgotModalOpen}
        onClose={() => setForgotModalOpen(false)}
        title="Reset Password"
        description="Enter your registered email and we'll simulate sending you a password reset link."
      >
        {forgotSent ? (
          <div className="py-4 text-center space-y-2">
            <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto" />
            <p className="text-sm font-semibold text-slate-900">Reset Link Sent!</p>
            <p className="text-xs text-slate-500">Check your inbox for password reset instructions.</p>
          </div>
        ) : (
          <form onSubmit={handleForgotPassword} className="space-y-4 pt-2">
            <Input
              label="Account Email"
              type="email"
              value={forgotEmail}
              onChange={(e) => setForgotEmail(e.target.value)}
              placeholder="alex.johnson@fresherhub.edu"
              icon={Mail}
              required
            />
            <div className="flex justify-end gap-2 pt-2">
              <Button variant="outline" size="sm" onClick={() => setForgotModalOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" size="sm" variant="primary">
                Send Reset Link
              </Button>
            </div>
          </form>
        )}
      </Modal>
    </div>
  );
};
