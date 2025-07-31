import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Zap, Globe, Shield, BarChart3, Mail, Brain, Users, Star } from "lucide-react";

declare global {
  interface Window {
    particlesJS: any;
  }
}

const LandingPage = () => {
  const features = [
    {
      icon: <Brain className="h-8 w-8 text-ai-blue" />,
      title: "AI-Powered Responses",
      description: "GPT-4 generates contextual, professional email replies in any language"
    },
    {
      icon: <Mail className="h-8 w-8 text-ai-purple" />,
      title: "Email Integration",
      description: "Seamless integration with Gmail, Outlook, and any IMAP email provider"
    },
    {
      icon: <Globe className="h-8 w-8 text-ai-green" />,
      title: "Multi-Language Support",
      description: "Automatically responds in the original language of the received email"
    },
    {
      icon: <Shield className="h-8 w-8 text-ai-orange" />,
      title: "Enterprise Security",
      description: "Bank-grade security with BankID integration for Norwegian companies"
    },
    {
      icon: <BarChart3 className="h-8 w-8 text-ai-blue" />,
      title: "Advanced Analytics",
      description: "Detailed insights on email volume, response rates, and language usage"
    },
    {
      icon: <Zap className="h-8 w-8 text-ai-purple" />,
      title: "Automated Marketing",
      description: "Smart promotional email responses to boost client engagement"
    }
  ];

  const pricingPlans = [
    {
      name: "Starter",
      price: "299",
      currency: "NOK",
      period: "month",
      description: "Perfect for small businesses",
      features: [
        "Up to 1,000 emails/month",
        "2 email addresses",
        "Basic AI responses",
        "Email integration",
        "Basic analytics",
        "Email support"
      ],
      badge: null,
      ctaText: "Start Free Trial"
    },
    {
      name: "Professional",
      price: "799",
      currency: "NOK",
      period: "month",
      description: "For growing businesses",
      features: [
        "Up to 5,000 emails/month",
        "10 email addresses",
        "Advanced AI responses",
        "Marketing automation",
        "Advanced analytics",
        "Priority support",
        "Custom templates",
        "Multi-language support"
      ],
      badge: "Most Popular",
      ctaText: "Start Free Trial"
    },
    {
      name: "Enterprise",
      price: "1,999",
      currency: "NOK",
      period: "month",
      description: "For large organizations",
      features: [
        "Unlimited emails",
        "Unlimited addresses",
        "Custom AI training",
        "Advanced marketing suite",
        "Real-time analytics",
        "24/7 phone support",
        "Custom integrations",
        "Dedicated account manager",
        "SLA guarantee"
      ],
      badge: "Enterprise",
      ctaText: "Contact Sales"
    }
  ];

  const testimonials = [
    {
      name: "Erik Nordahl",
      company: "TechStart AS",
      content: "Our customer response time improved by 90%. The AI understands context perfectly and responds in flawless Norwegian.",
      rating: 5
    },
    {
      name: "Maria Svensson",
      company: "Digital Solutions AB",
      content: "The multi-language support is incredible. We serve clients across Scandinavia effortlessly now.",
      rating: 5
    },
    {
      name: "Lars Hansen",
      company: "Nordic Consulting",
      content: "ROI was immediate. We're handling 3x more customer inquiries with the same team size.",
      rating: 5
    }
  ];

  useEffect(() => {
    // Load particles.js script
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js';
    script.onload = () => {
      if (window.particlesJS) {
        window.particlesJS('particles-js', {
          particles: {
            number: { value: 100, density: { enable: true, value_area: 800 } },
            color: { value: ['#6366f1', '#8b5cf6', '#3b82f6', '#06b6d4'] },
            shape: { type: 'circle' },
            opacity: { value: 0.4, random: true, anim: { enable: true, speed: 1, opacity_min: 0.1, sync: false } },
            size: { value: 2.5, random: true, anim: { enable: true, speed: 2, size_min: 0.5, sync: false } },
            line_linked: { 
              enable: true, 
              distance: 150, 
              color: '#6366f1', 
              opacity: 0.3, 
              width: 1 
            },
            move: { 
              enable: true, 
              speed: 3, 
              direction: 'none', 
              random: true, 
              straight: false, 
              out_mode: 'out', 
              bounce: false 
            }
          },
          interactivity: {
            detect_on: 'canvas',
            events: { 
              onhover: { enable: true, mode: 'grab' }, 
              onclick: { enable: true, mode: 'push' }, 
              resize: true 
            },
            modes: { 
              grab: { distance: 140, line_linked: { opacity: 0.5 } }, 
              bubble: { distance: 400, size: 40, duration: 2, opacity: 8, speed: 3 }, 
              repulse: { distance: 200, duration: 0.4 }, 
              push: { particles_nb: 4 }, 
              remove: { particles_nb: 2 } 
            }
          },
          retina_detect: true
        });
      }
    };
    document.head.appendChild(script);
    
    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Particles Background */}
      <div id="particles-js" className="absolute inset-0 z-0"></div>
      
      {/* Content with higher z-index */}
      <div className="relative z-10">
      {/* Navigation */}
      <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-ai-blue to-ai-purple rounded-lg flex items-center justify-center">
                <Brain className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold">AutoReply AI</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors">Features</a>
              <a href="#pricing" className="text-muted-foreground hover:text-foreground transition-colors">Pricing</a>
              <a href="#testimonials" className="text-muted-foreground hover:text-foreground transition-colors">Testimonials</a>
              <Button variant="outline">Login</Button>
              <Button variant="gradient">Start Free Trial</Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-20 pb-32 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto text-center">
          <Badge variant="secondary" className="mb-6">
            🚀 Now with GPT-4 Integration
          </Badge>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-ai-blue to-ai-purple bg-clip-text text-transparent">
            AI-Powered Email
            <br />
            Autoresponder
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Transform your customer service with intelligent, context-aware email responses. 
            Supports multiple languages, integrates with any email provider, and scales with your business.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button variant="hero" size="lg">
              Start 14-Day Free Trial
            </Button>
            <Button variant="outline" size="lg">
              Watch Demo
            </Button>
          </div>
          <div className="flex items-center justify-center space-x-8 text-sm text-muted-foreground">
            <div className="flex items-center space-x-2">
              <Check className="h-4 w-4 text-ai-green" />
              <span>No credit card required</span>
            </div>
            <div className="flex items-center space-x-2">
              <Check className="h-4 w-4 text-ai-green" />
              <span>Setup in 5 minutes</span>
            </div>
            <div className="flex items-center space-x-2">
              <Check className="h-4 w-4 text-ai-green" />
              <span>Cancel anytime</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Everything you need to automate email responses</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Our AI-powered platform handles customer emails intelligently, maintaining your brand voice while scaling your support.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardHeader>
                  <div className="mb-4">{feature.icon}</div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Simple, transparent pricing</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Choose the plan that fits your business. All plans include a 14-day free trial.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <Card key={index} className={`border-2 ${plan.badge === "Most Popular" ? "border-ai-blue shadow-xl scale-105" : "border-border"} relative`}>
                {plan.badge && (
                  <Badge className={`absolute -top-3 left-1/2 transform -translate-x-1/2 ${plan.badge === "Most Popular" ? "bg-ai-blue" : "bg-ai-orange"}`}>
                    {plan.badge}
                  </Badge>
                )}
                <CardHeader className="text-center pb-8">
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <div className="mt-4">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    <span className="text-muted-foreground ml-2">{plan.currency}/{plan.period}</span>
                  </div>
                  <CardDescription className="text-base">{plan.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {plan.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center space-x-3">
                      <Check className="h-4 w-4 text-ai-green flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                  <Button 
                    className="w-full mt-6" 
                    variant={plan.badge === "Most Popular" ? "gradient" : "outline"}
                  >
                    {plan.ctaText}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Trusted by businesses across Scandinavia</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              See how companies are transforming their customer service with AutoReply AI.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-0 shadow-lg">
                <CardContent className="pt-6">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-ai-orange text-ai-orange" />
                    ))}
                  </div>
                  <blockquote className="text-muted-foreground mb-4 italic">
                    "{testimonial.content}"
                  </blockquote>
                  <div>
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.company}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to transform your email workflow?</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join hundreds of businesses already using AutoReply AI to provide faster, smarter customer service.
          </p>
          <Button variant="hero" size="lg" className="text-lg px-12 py-4">
            Start Your Free Trial Today
          </Button>
          <p className="text-sm text-muted-foreground mt-4">
            No setup fees • Cancel anytime • 14-day money-back guarantee
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-muted/50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-ai-blue to-ai-purple rounded-lg flex items-center justify-center">
                  <Brain className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-bold">AutoReply AI</span>
              </div>
              <p className="text-muted-foreground">
                Intelligent email automation for modern businesses.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">API</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Integrations</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Status</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">About</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Privacy</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t mt-12 pt-8 text-center text-muted-foreground">
            <p>&copy; 2024 AutoReply AI. All rights reserved.</p>
          </div>
        </div>
      </footer>
      </div>
    </div>
  );
};

export default LandingPage;