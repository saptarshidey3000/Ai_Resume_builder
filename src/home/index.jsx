import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useUser } from '@clerk/clerk-react'
import { 
  Sparkles, 
  Zap, 
  FileText, 
  Download, 
  Share2, 
  Users, 
  Star,
  ChevronRight,
  ArrowRight,
  CheckCircle,
  Brain,
  Rocket,
  Trophy,
  Target
} from 'lucide-react'
import Header from '@/components/custom/Header'
import { Button } from '@/components/ui/button'

const Home = () => {
  const navigate = useNavigate()
  const { user, isSignedIn } = useUser()
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const handleGetStarted = () => {
    if (isSignedIn) {
      navigate('/dashboard')
    } else {
      navigate('/auth/sign-in')
    }
  }

  const features = [
    {
      icon: Brain,
      title: "AI-Powered Content",
      description: "Generate professional summaries and job descriptions with advanced AI"
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Create a complete resume in under 5 minutes"
    },
    {
      icon: Target,
      title: "ATS Optimized",
      description: "Designed to pass Applicant Tracking Systems"
    },
    {
      icon: FileText,
      title: "Professional Templates",
      description: "Choose from beautifully crafted, industry-specific templates"
    }
  ]

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Software Engineer",
      image: "/api/placeholder/64/64",
      content: "This AI resume builder helped me land my dream job at Google! The AI suggestions were spot-on."
    },
    {
      name: "Michael Chen",
      role: "Marketing Director",
      image: "/api/placeholder/64/64", 
      content: "Incredibly intuitive and the results look so professional. Got 3x more interview calls!"
    },
    {
      name: "Emily Rodriguez",
      role: "Data Scientist",
      image: "/api/placeholder/64/64",
      content: "The AI content generation saved me hours of work. My resume stands out now!"
    }
  ]

  const stats = [
    { number: "50K+", label: "Resumes Created" },
    { number: "95%", label: "Success Rate" },
    { number: "4.9/5", label: "User Rating" },
    { number: "24/7", label: "AI Support" }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-white">
      <Header />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-32 pb-32 px-6">

        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-32 w-96 h-96 rounded-full bg-gradient-to-br from-purple-400/20 to-pink-400/20 blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-32 w-96 h-96 rounded-full bg-gradient-to-br from-blue-400/20 to-cyan-400/20 blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="relative max-w-7xl mx-auto">
          <div className={`text-center transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full border border-purple-200 mb-8">
              <Sparkles className="w-4 h-4 text-purple-600" />
              <span className="text-sm font-medium text-purple-800">AI-Powered Resume Builder</span>
              <Sparkles className="w-4 h-4 text-purple-600" />
            </div>

            {/* Main Headline */}
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
              Build Your Dream Resume with
              <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent block mt-2">
                Artificial Intelligence
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed">
              Create professional, ATS-optimized resumes in minutes. Our AI analyzes your experience and crafts compelling content that gets you noticed by employers.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
              <Button
                onClick={handleGetStarted}
                className="group bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300"
              >
                <Rocket className="w-5 h-5 mr-2 group-hover:animate-bounce" />
                Get Started Free
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              
              <Button
                variant="outline"
                className="px-8 py-4 text-lg font-semibold rounded-xl border-2 border-gray-300 hover:border-purple-400 hover:text-purple-600 transition-all duration-300"
              >
                <FileText className="w-5 h-5 mr-2" />
                View Examples
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl font-bold text-gray-900 mb-1">{stat.number}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose Our AI Resume Builder?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Experience the future of resume building with cutting-edge AI technology
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <div
                  key={index}
                  className="group p-8 bg-gradient-to-br from-white to-gray-50 rounded-2xl border border-gray-100 hover:border-purple-200 hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300"
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-8 h-8 text-purple-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 px-6 bg-gradient-to-br from-gray-50 to-purple-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Create Your Resume in 3 Simple Steps
            </h2>
            <p className="text-xl text-gray-600">
              Our AI-powered process makes resume building effortless
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Enter Your Information",
                description: "Fill in your basic details, work experience, and skills. Our smart forms guide you through each section.",
                icon: FileText
              },
              {
                step: "02", 
                title: "AI Generates Content",
                description: "Our advanced AI analyzes your input and creates compelling, professional content tailored to your industry.",
                icon: Brain
              },
              {
                step: "03",
                title: "Download & Share",
                description: "Get your polished resume instantly. Download as PDF or share a link with potential employers.",
                icon: Download
              }
            ].map((item, index) => {
              const Icon = item.icon
              return (
                <div key={index} className="relative text-center group">
                  {/* Connector Line */}
                  {index < 2 && (
                    <div className="hidden md:block absolute top-12 left-full w-full h-0.5 bg-gradient-to-r from-purple-300 to-pink-300 transform translate-x-4 -translate-y-1/2 z-0"></div>
                  )}
                  
                  <div className="relative z-10 bg-white rounded-2xl p-8 shadow-lg group-hover:shadow-xl transition-all duration-300 transform group-hover:-translate-y-2">
                    <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6 relative">
                      <Icon className="w-10 h-10 text-white" />
                      <div className="absolute -top-2 -right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg">
                        <span className="text-sm font-bold text-purple-600">{item.step}</span>
                      </div>
                    </div>
                    <h3 className="text-2xl font-semibold text-gray-900 mb-4">{item.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{item.description}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Loved by Professionals Worldwide
            </h2>
            <p className="text-xl text-gray-600">
              See what our users say about their success stories
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-white to-gray-50 p-8 rounded-2xl border border-gray-100 hover:border-purple-200 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center mr-4">
                    <span className="text-white font-semibold text-lg">
                      {testimonial.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                    <p className="text-gray-600 text-sm">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-700 leading-relaxed mb-4">"{testimonial.content}"</p>
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 px-6 bg-gradient-to-br from-purple-600 via-pink-600 to-blue-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Build Your Perfect Resume?
          </h2>
          <p className="text-xl text-purple-100 mb-10 max-w-2xl mx-auto">
            Join thousands of professionals who've already transformed their careers with our AI-powered resume builder.
          </p>
          
          <Button
            onClick={handleGetStarted}
            className="group bg-white text-purple-600 hover:bg-gray-50 px-10 py-4 text-xl font-semibold rounded-xl shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300"
          >
            <Trophy className="w-6 h-6 mr-3 group-hover:animate-bounce" />
            Start Building Now - It's Free!
            <ChevronRight className="w-6 h-6 ml-3 group-hover:translate-x-1 transition-transform" />
          </Button>

          <p className="text-purple-200 text-sm mt-6">
            No credit card required • Create unlimited resumes • AI-powered content
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center mb-6">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mr-3">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <span className="text-2xl font-bold">AI Resume Builder</span>
          </div>
          
          <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
            Empowering professionals worldwide with AI-driven resume building technology. 
            Create, customize, and succeed with confidence.
          </p>
          
          <div className="border-t border-gray-800 pt-6">
            <p className="text-gray-500 text-sm">
              © 2025 AI Resume Builder. All rights reserved. Built with ❤️ for your success.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Home