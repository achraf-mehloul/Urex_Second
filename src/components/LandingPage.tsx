import { ArrowRight, BookOpen, Clock, Users, Award } from 'lucide-react';

interface LandingPageProps {
  onGetStarted: () => void;
  onLogoDoubleClick: () => void;
}

export default function LandingPage({ onGetStarted, onLogoDoubleClick }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white">
      <header className="container mx-auto px-4 py-6 flex items-center justify-between">
        <img
          src="/552102244_1511459556843066_700200828006065403_n-removebg-preview.png"
          alt="Urex Logo"
          className="h-16 w-16 cursor-pointer transition-transform hover:scale-110"
          onDoubleClick={onLogoDoubleClick}
          title="Double click for admin access"
        />
        <div className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
          UREX CLUB
        </div>
      </header>

      <section className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 bg-clip-text text-transparent animate-fade-in">
            Urex Web Development Bootcamp
          </h1>

          <p className="text-2xl text-gray-300 mb-4">
            Learn HTML, CSS, GitHub, and Render — for Free!
          </p>

          <p className="text-lg text-gray-400 mb-12">
            Transform your ideas into reality with professional web development skills
          </p>

          <button
            onClick={onGetStarted}
            className="group relative inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-full text-black font-bold text-lg transition-all hover:scale-105 hover:shadow-2xl hover:shadow-yellow-500/50"
          >
            Join Now
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          <FeatureCard
            icon={<BookOpen className="w-8 h-8" />}
            title="Comprehensive Curriculum"
            description="Master HTML, CSS, GitHub, and deployment with Render"
          />
          <FeatureCard
            icon={<Clock className="w-8 h-8" />}
            title="Flexible Schedule"
            description="Learn at your own pace with structured guidance"
          />
          <FeatureCard
            icon={<Users className="w-8 h-8" />}
            title="Expert Mentors"
            description="Guided by experienced Urex Club members"
          />
          <FeatureCard
            icon={<Award className="w-8 h-8" />}
            title="Free Certificate"
            description="Get recognized for your achievements"
          />
        </div>
      </section>

      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto bg-gradient-to-br from-gray-900 to-black border border-yellow-500/20 rounded-2xl p-8 backdrop-blur-sm">
          <h2 className="text-3xl font-bold mb-6 text-yellow-400">Why Join Urex Bootcamp?</h2>

          <div className="space-y-4 text-gray-300">
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2" />
              <p>100% Free for all university students</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2" />
              <p>Hands-on projects and real-world applications</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2" />
              <p>Build your portfolio and GitHub profile</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2" />
              <p>Join a community of passionate developers</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2" />
              <p>Certificate of participation upon completion</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="group bg-gradient-to-br from-gray-900 to-black border border-yellow-500/20 rounded-xl p-6 transition-all hover:border-yellow-500/50 hover:shadow-xl hover:shadow-yellow-500/10 hover:-translate-y-1">
      <div className="text-yellow-400 mb-4 transition-transform group-hover:scale-110">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2 text-white">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </div>
  );
}
