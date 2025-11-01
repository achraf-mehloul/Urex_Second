import { useState } from 'react';
import { ArrowLeft, CheckCircle, Sparkles } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface RegistrationFormProps {
  onBack: () => void;
}

export default function RegistrationForm({ onBack }: RegistrationFormProps) {
  const [formData, setFormData] = useState({
    full_name: '',
    last_name: '',
    date_of_birth: '',
    major: '',
    department: '',
    campus: '',
    programming_knowledge: '',
    programming_goals: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [aiRecommendation, setAiRecommendation] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const generateAIRecommendation = (knowledge: string, goals: string) => {
    const knowledgeLower = knowledge.toLowerCase();
    const goalsLower = goals.toLowerCase();

    if (knowledgeLower.includes('html') && !knowledgeLower.includes('css')) {
      return "Great! You know HTML. We recommend focusing on CSS next to style your web pages beautifully.";
    } else if (knowledgeLower.includes('css') && knowledgeLower.includes('html')) {
      return "Excellent foundation! Consider learning JavaScript next to add interactivity to your websites.";
    } else if (knowledgeLower.includes('beginner') || knowledgeLower.includes('nothing') || knowledgeLower.includes('zero')) {
      return "Perfect! This bootcamp is designed for beginners. Start with HTML basics and build from there.";
    } else if (goalsLower.includes('front') || goalsLower.includes('frontend')) {
      return "Front-end development is exciting! Focus on mastering HTML, CSS, and modern frameworks.";
    } else if (goalsLower.includes('backend') || goalsLower.includes('back-end')) {
      return "Back-end goals noted! While this bootcamp covers front-end, the fundamentals will help you everywhere.";
    } else if (goalsLower.includes('full stack') || goalsLower.includes('fullstack')) {
      return "Full-stack ambitions! This bootcamp is the perfect first step on your comprehensive journey.";
    } else {
      return "Welcome to your coding journey! This bootcamp will give you a solid foundation in web development.";
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { error } = await supabase.from('registrations').insert([formData]);

      if (error) throw error;

      const recommendation = generateAIRecommendation(
        formData.programming_knowledge,
        formData.programming_goals
      );
      setAiRecommendation(recommendation);
      setShowSuccess(true);
    } catch (error) {
      console.error('Error submitting registration:', error);
      alert('Failed to submit registration. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (showSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center p-4">
        <div className="max-w-2xl w-full text-center">
          <div className="bg-gradient-to-br from-gray-900 to-black border border-yellow-500/30 rounded-2xl p-8 backdrop-blur-xl animate-fade-in">
            <div className="mb-6 animate-bounce">
              <CheckCircle className="w-20 h-20 text-yellow-400 mx-auto" />
            </div>

            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
              Registration Successful!
            </h2>

            <p className="text-xl text-gray-300 mb-6">
              Welcome to the Urex Bootcamp 🚀
            </p>

            <div className="bg-black/50 border border-yellow-500/20 rounded-xl p-6 mb-6">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="w-5 h-5 text-yellow-400" />
                <h3 className="text-lg font-semibold text-yellow-400">AI Assistant Recommendation</h3>
              </div>
              <p className="text-gray-300 text-left">{aiRecommendation}</p>
            </div>

            <button
              onClick={onBack}
              className="px-8 py-3 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-full text-black font-bold transition-all hover:scale-105"
            >
              Return to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black py-12 px-4">
      <div className="container mx-auto max-w-3xl">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-yellow-400 hover:text-yellow-300 mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Home
        </button>

        <div className="bg-gradient-to-br from-gray-900/80 to-black/80 border border-yellow-500/30 rounded-2xl p-8 backdrop-blur-xl">
          <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
            Join the Bootcamp
          </h2>
          <p className="text-gray-400 mb-8">Fill in your details to start your journey</p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-yellow-400 mb-2 font-semibold">Full Name</label>
                <input
                  type="text"
                  name="full_name"
                  value={formData.full_name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-black/50 border border-yellow-500/30 rounded-lg text-white focus:outline-none focus:border-yellow-500 transition-colors"
                  placeholder="Enter your first name"
                />
              </div>

              <div>
                <label className="block text-yellow-400 mb-2 font-semibold">Last Name</label>
                <input
                  type="text"
                  name="last_name"
                  value={formData.last_name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-black/50 border border-yellow-500/30 rounded-lg text-white focus:outline-none focus:border-yellow-500 transition-colors"
                  placeholder="Enter your last name"
                />
              </div>
            </div>

            <div>
              <label className="block text-yellow-400 mb-2 font-semibold">Date of Birth</label>
              <input
                type="date"
                name="date_of_birth"
                value={formData.date_of_birth}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-black/50 border border-yellow-500/30 rounded-lg text-white focus:outline-none focus:border-yellow-500 transition-colors"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-yellow-400 mb-2 font-semibold">Major</label>
                <input
                  type="text"
                  name="major"
                  value={formData.major}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-black/50 border border-yellow-500/30 rounded-lg text-white focus:outline-none focus:border-yellow-500 transition-colors"
                  placeholder="e.g., Computer Science"
                />
              </div>

              <div>
                <label className="block text-yellow-400 mb-2 font-semibold">Department</label>
                <input
                  type="text"
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-black/50 border border-yellow-500/30 rounded-lg text-white focus:outline-none focus:border-yellow-500 transition-colors"
                  placeholder="e.g., Engineering"
                />
              </div>
            </div>

            <div>
              <label className="block text-yellow-400 mb-2 font-semibold">Campus</label>
              <input
                type="text"
                name="campus"
                value={formData.campus}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-black/50 border border-yellow-500/30 rounded-lg text-white focus:outline-none focus:border-yellow-500 transition-colors"
                placeholder="Your campus location"
              />
            </div>

            <div>
              <label className="block text-yellow-400 mb-2 font-semibold">
                What do you know about programming?
              </label>
              <textarea
                name="programming_knowledge"
                value={formData.programming_knowledge}
                onChange={handleChange}
                required
                rows={4}
                className="w-full px-4 py-3 bg-black/50 border border-yellow-500/30 rounded-lg text-white focus:outline-none focus:border-yellow-500 transition-colors resize-none"
                placeholder="Tell us about your programming experience..."
              />
            </div>

            <div>
              <label className="block text-yellow-400 mb-2 font-semibold">
                What are your goals in programming?
              </label>
              <textarea
                name="programming_goals"
                value={formData.programming_goals}
                onChange={handleChange}
                required
                rows={4}
                className="w-full px-4 py-3 bg-black/50 border border-yellow-500/30 rounded-lg text-white focus:outline-none focus:border-yellow-500 transition-colors resize-none"
                placeholder="Share your programming goals with us..."
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-lg text-black font-bold text-lg transition-all hover:scale-105 hover:shadow-2xl hover:shadow-yellow-500/50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Registration'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
