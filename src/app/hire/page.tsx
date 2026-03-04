'use client';

import { useState } from 'react';
import { ArrowLeft, CheckCircle, AlertCircle, Loader2, MessageSquare } from 'lucide-react';
import Link from 'next/link';

const animationTypes = [
  '2D Animation', '3D Animation', 'Whiteboard Animation', 'Explainer Video',
  'Music Video', 'Commercial/Ad', 'Social Media Content', 'Character Animation',
  'Motion Graphics', 'Stop Motion', 'Other'
];

const budgetRanges = [
  'Under $500', '$500 - $1000', '$1000 - $2500', '$2500 - $5000',
  '$5000 - $10000', '$10000+', 'Not Sure / Negotiable'
];

const deadlines = [
  'ASAP (Urgent)', 'Within 1 week', 'Within 2 weeks', 'Within 1 month',
  'Within 3 months', 'Flexible / No strict deadline'
];

interface FormData {
  name: string;
  email: string;
  instagram: string;
  whatsapp: string;
  budget: string;
  deadline: string;
  animation_type: string;
  requirements: string;
}

export default function HirePage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    instagram: '',
    whatsapp: '',
    budget: '',
    deadline: '',
    animation_type: '',
    requirements: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const formspreeId = 'xzdaqrpw';
      
      const response = await fetch(`https://formspree.io/f/${formspreeId}`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          instagram: formData.instagram,
          whatsapp: formData.whatsapp,
          budget: formData.budget,
          deadline: formData.deadline,
          animation_type: formData.animation_type,
          requirements: formData.requirements
        })
      });

      if (!response.ok) {
        throw new Error('Failed to submit to Formspree');
      }

      setIsSuccess(true);
    } catch (err: any) {
      setError('Something went wrong. Please try again. Make sure Formspree is configured correctly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-[#0f0f0f] flex items-center justify-center px-4">
        <div className="glass-card p-8 max-w-md text-center animate-fadeIn">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-500/20 flex items-center justify-center">
            <CheckCircle className="w-8 h-8 text-green-400" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-4">Request Submitted!</h1>
          <p className="text-gray-400 mb-6">
            Thank you for your project request. Our team will review your requirements 
            and match you with the perfect animator. We'll get back to you soon!
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0f0f0f] py-12 animate-fadeIn">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>

        <div className="glass-card p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center">
              <MessageSquare className="w-6 h-6 text-purple-400" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">Hire an Animator</h1>
              <p className="text-gray-400 text-sm">Tell us about your project</p>
            </div>
          </div>

          {error && (
            <div className="flex items-center gap-2 p-4 mb-6 rounded-lg bg-red-500/20 text-red-400">
              <AlertCircle className="w-5 h-5" />
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                  Full Name *
                </label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                  Email Address *
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
                  placeholder="john@example.com"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="instagram" className="block text-sm font-medium text-gray-300 mb-2">
                  Instagram ID
                </label>
                <input
                  id="instagram"
                  type="text"
                  name="instagram"
                  value={formData.instagram}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
                  placeholder="@username"
                />
              </div>

              <div>
                <label htmlFor="whatsapp" className="block text-sm font-medium text-gray-300 mb-2">
                  WhatsApp Number *
                </label>
                <input
                  id="whatsapp"
                  type="tel"
                  name="whatsapp"
                  required
                  value={formData.whatsapp}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
                  placeholder="+1 234 567 8900"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="budget" className="block text-sm font-medium text-gray-300 mb-2">
                  Budget Range *
                </label>
                <select
                  id="budget"
                  name="budget"
                  required
                  value={formData.budget}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:border-purple-500 transition-colors"
                >
                  <option value="" className="bg-gray-900">Select budget</option>
                  {budgetRanges.map(budget => (
                    <option key={budget} value={budget} className="bg-gray-900">{budget}</option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="deadline" className="block text-sm font-medium text-gray-300 mb-2">
                  Deadline *
                </label>
                <select
                  id="deadline"
                  name="deadline"
                  required
                  value={formData.deadline}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:border-purple-500 transition-colors"
                >
                  <option value="" className="bg-gray-900">Select deadline</option>
                  {deadlines.map(deadline => (
                    <option key={deadline} value={deadline} className="bg-gray-900">{deadline}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="animation_type" className="block text-sm font-medium text-gray-300 mb-2">
                Type of Animation *
              </label>
              <select
                id="animation_type"
                name="animation_type"
                required
                value={formData.animation_type}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:border-purple-500 transition-colors"
              >
                <option value="" className="bg-gray-900">Select animation type</option>
                {animationTypes.map(type => (
                  <option key={type} value={type} className="bg-gray-900">{type}</option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="requirements" className="block text-sm font-medium text-gray-300 mb-2">
                Detailed Requirements *
              </label>
              <textarea
                id="requirements"
                name="requirements"
                required
                rows={6}
                value={formData.requirements}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors resize-none"
                placeholder="Describe your project in detail. Include:
- Project type and goals
- Target audience
- Style preferences
- Duration/length
- Any specific references or examples
- Other requirements or questions"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 bg-purple-600 hover:bg-purple-700 disabled:bg-purple-600/50 text-white rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Submitting...
                </>
              ) : (
                'Submit Request'
              )}
            </button>

            <p className="text-center text-gray-500 text-sm">
              By submitting, you agree to our terms. We'll match you with a suitable animator.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
