import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Film, Users, Briefcase, Award, Heart, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About | SoloAnimator Network',
  description: 'Learn about SoloAnimator Network - a platform connecting animation talent with clients worldwide.',
};

const stats = [
  { label: 'Animators', value: '500+' },
  { label: 'Projects Completed', value: '1,200+' },
  { label: 'Countries', value: '30+' },
  { label: 'Happy Clients', value: '950+' },
];

const values = [
  {
    icon: Film,
    title: 'Quality Content',
    description: 'We curate only the best animation content from talented creators worldwide.',
  },
  {
    icon: Users,
    title: 'Community First',
    description: 'Building a supportive network where animators can grow and thrive.',
  },
  {
    icon: Briefcase,
    title: 'Professional Matching',
    description: 'Connecting clients with the perfect animators for their projects.',
  },
  {
    icon: Heart,
    title: 'Passion Driven',
    description: 'Everything we do is fueled by our love for animation and creativity.',
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#0f0f0f] animate-fadeIn">
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1578632767115-351597cf2477?w=1920&h=1080&fit=crop"
            alt="About"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0f0f0f] via-[#0f0f0f]/95 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Watch. Connect. Create.
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed">
              SoloAnimator Network is an innovative platform that bridges the gap between 
              talented animators and clients seeking high-quality animation services.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-4xl md:text-5xl font-bold text-purple-500 mb-2">
                  {stat.value}
                </p>
                <p className="text-gray-400">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#1a1a1a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Our Story</h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
              Founded in 2024, SoloAnimator Network was born from a simple idea: make it 
              easy for businesses and individuals to find talented animators while giving 
              creative professionals a platform to showcase their work.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-semibold text-white mb-4">Our Mission</h3>
              <p className="text-gray-300 leading-relaxed mb-6">
                We believe that great animation has the power to tell stories that words alone 
                cannot convey. Our mission is to democratize access to professional animation 
                talent while providing animators with opportunities to do what they love.
              </p>
              <p className="text-gray-300 leading-relaxed">
                Whether you're looking to hire an animator for a commercial, a music video, 
                or a personal project, we're here to make the connection happen.
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-semibold text-white mb-4">What We Do</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <Award className="w-6 h-6 text-purple-400 flex-shrink-0 mt-1" />
                  <div>
                    <strong className="text-white">Curate Talent</strong>
                    <p className="text-gray-400 text-sm">We verify and showcase the best animators from around the world</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Film className="w-6 h-6 text-purple-400 flex-shrink-0 mt-1" />
                  <div>
                    <strong className="text-white">Stream Content</strong>
                    <p className="text-gray-400 text-sm">Original animation series and showcases for inspiration</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Briefcase className="w-6 h-6 text-purple-400 flex-shrink-0 mt-1" />
                  <div>
                    <strong className="text-white">Match Projects</strong>
                    <p className="text-gray-400 text-sm">We connect clients with the right animators for their needs</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white text-center mb-12">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value) => (
              <div key={value.title} className="glass-card p-6 text-center hover:neon-glow transition-all">
                <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-purple-500/20 flex items-center justify-center">
                  <value.icon className="w-7 h-7 text-purple-400" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{value.title}</h3>
                <p className="text-gray-400 text-sm">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-b from-[#0f0f0f] to-[#1a1a1a]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Join Our Community</h2>
          <p className="text-xl text-gray-400 mb-8">
            Whether you're an animator looking to showcase your work or a client seeking 
            talented creators, there's a place for you at SoloAnimator Network.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/animators/register"
              className="inline-flex items-center gap-2 px-8 py-4 bg-purple-600 hover:bg-purple-700 text-white rounded-full font-semibold transition-all duration-300 hover:scale-105"
            >
              Join as Animator
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/hire"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 hover:bg-white/20 text-white rounded-full font-semibold transition-all duration-300"
            >
              Hire an Animator
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
