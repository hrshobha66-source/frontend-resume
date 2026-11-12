import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Link, useNavigate } from 'react-router-dom';
import { Sparkles, User, Mail, Lock, Eye, EyeOff, AlertCircle, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { Card, CardContent } from '../components/Card';

const signupSchema = z
  .object({
    fullName: z.string().min(2, 'Full name must be at least 2 characters'),
    email: z.string().min(1, 'Email is required').email('Please enter a valid email address'),
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters long')
      .regex(/\d/, 'Password must contain at least one number'),
    confirmPassword: z.string().min(1, 'Please confirm your password')
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords must match',
    path: ['confirmPassword']
  });

export const SignupPage = () => {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [serverError, setServerError] = useState('');

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting }
  } = useForm({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
      confirmPassword: ''
    }
  });

  const onSubmit = async (data) => {
    setServerError('');
    try {
      await signup(data.fullName, data.email, data.password);
      navigate('/dashboard', { replace: true });
    } catch (err) {
      setServerError(err.message || 'Registration failed. Please try again.');
    }
  };

  const fillQuickDemo = () => {
    setValue('fullName', 'Alex Johnson', { shouldValidate: true });
    setValue('email', 'alex.johnson@fresherhub.edu', { shouldValidate: true });
    setValue('password', 'Password123', { shouldValidate: true });
    setValue('confirmPassword', 'Password123', { shouldValidate: true });
    setServerError('');
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8 bg-slate-50">
      <div className="w-full max-w-md space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <Link to="/" className="inline-flex items-center gap-2 group">
            <div className="h-10 w-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-md shadow-indigo-600/20 group-hover:scale-105 transition-transform">
              <Sparkles className="w-5 h-5" />
            </div>
            <span className="font-extrabold text-slate-900 tracking-tight text-xl">CareerPulse AI</span>
          </Link>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">
            Create Your Fresher Account
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Get instant AI analysis, job readiness benchmarking, and practice assessments.
          </p>
        </div>

        {/* Card */}
        <Card className="shadow-soft-lg border-slate-200">
          <CardContent className="p-6 sm:p-8 space-y-5">
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
                label="Full Name"
                id="fullName"
                type="text"
                placeholder="Alex Johnson"
                icon={User}
                error={errors.fullName?.message}
                required
                {...register('fullName')}
              />

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

              <Input
                label="Password"
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Min 8 characters with a number"
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

              <Input
                label="Confirm Password"
                id="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="Re-enter your password"
                icon={Lock}
                error={errors.confirmPassword?.message}
                required
                endAdornment={
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="text-slate-400 hover:text-slate-600 focus:outline-none"
                    aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                  >
                    {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                }
                {...register('confirmPassword')}
              />

              <div className="pt-2">
                <Button
                  type="submit"
                  className="w-full shadow-md shadow-indigo-600/20"
                  isLoading={isSubmitting}
                  size="md"
                >
                  Create Account & Get Started
                </Button>
              </div>
            </form>

            {/* Quick Demo Helper */}
            <div className="pt-2 border-t border-slate-100 text-center">
              <button
                type="button"
                onClick={fillQuickDemo}
                className="text-xs font-medium text-slate-500 hover:text-indigo-600 inline-flex items-center gap-1.5 py-1 px-2.5 rounded-lg bg-slate-100/70 hover:bg-slate-100 transition-colors"
              >
                <span>⚡ Fill Sample Fresher Registration</span>
              </button>
            </div>
          </CardContent>
        </Card>

        {/* Footer sign in prompt */}
        <p className="text-center text-xs sm:text-sm text-slate-600">
          Already have an account?{' '}
          <Link to="/login" className="font-semibold text-indigo-600 hover:text-indigo-700 underline underline-offset-2">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};
