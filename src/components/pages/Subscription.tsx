import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import { 
  CreditCard, 
  Check,
  Crown,
  Calendar,
  DollarSign,
  TrendingUp,
  Download,
  AlertCircle,
  Zap,
  Star,
  Shield,
  Users,
  Globe,
  Clock,
  Mail,
  Bot
} from "lucide-react";
import { Separator } from "@/components/ui/separator";

const currentPlan = {
  name: "Professional",
  price: "699",
  currency: "NOK",
  billing: "monthly",
  nextBilling: "2024-02-15",
  status: "active",
};

const usage = {
  emails: { current: 3420, limit: 5000, percentage: 68.4 },
  apiCalls: { current: 4580, limit: 10000, percentage: 45.8 },
  storage: { current: 1.2, limit: 5, percentage: 24, unit: "GB" },
  teamMembers: { current: 3, limit: 10, percentage: 30 },
};

const plans = [
  {
    name: "Starter",
    price: "299",
    originalPrice: "399",
    billing: "monthly",
    description: "Perfect for small businesses",
    features: [
      "Up to 1,000 emails/month",
      "GPT-4 AI responses",
      "5 email integrations",
      "Basic analytics",
      "Norwegian & English support",
      "Email support"
    ],
    limits: {
      emails: 1000,
      apiCalls: 5000,
      storage: 1,
      teamMembers: 2
    },
    popular: false,
    color: "border-gray-200"
  },
  {
    name: "Professional",
    price: "699",
    originalPrice: "899",
    billing: "monthly",
    description: "Most popular for growing businesses",
    features: [
      "Up to 5,000 emails/month",
      "Advanced GPT-4 AI responses",
      "Unlimited email integrations",
      "Advanced analytics & reports",
      "Multi-language support",
      "Priority support",
      "Custom templates",
      "Team collaboration"
    ],
    limits: {
      emails: 5000,
      apiCalls: 10000,
      storage: 5,
      teamMembers: 10
    },
    popular: true,
    color: "border-ai-green shadow-lg"
  },
  {
    name: "Enterprise",
    price: "1,999",
    originalPrice: "2,499",
    billing: "monthly",
    description: "For large organizations",
    features: [
      "Unlimited emails",
      "Custom AI model training",
      "Unlimited integrations",
      "Custom analytics dashboard",
      "All languages supported",
      "24/7 dedicated support",
      "Custom templates & branding",
      "Advanced team management",
      "API access",
      "SLA guarantee"
    ],
    limits: {
      emails: "Unlimited",
      apiCalls: "Unlimited",
      storage: "Unlimited",
      teamMembers: "Unlimited"
    },
    popular: false,
    color: "border-ai-emerald"
  }
];

const invoices = [
  {
    id: "INV-2024-001",
    date: "2024-01-15",
    amount: "699",
    currency: "NOK",
    status: "paid",
    description: "Professional Plan - January 2024",
    downloadUrl: "#"
  },
  {
    id: "INV-2023-012",
    date: "2023-12-15",
    amount: "699",
    currency: "NOK",
    status: "paid",
    description: "Professional Plan - December 2023",
    downloadUrl: "#"
  },
  {
    id: "INV-2023-011",
    date: "2023-11-15",
    amount: "699",
    currency: "NOK",
    status: "paid",
    description: "Professional Plan - November 2023",
    downloadUrl: "#"
  },
];

export function Subscription() {
  return (
    <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Subscription & Billing</h1>
            <p className="text-muted-foreground">Manage your plan, usage, and billing information</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Download Invoice
            </Button>
            <Button>
              <CreditCard className="mr-2 h-4 w-4" />
              Update Payment
            </Button>
          </div>
        </div>

        {/* Current Plan Status */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card className="md:col-span-2">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Crown className="h-5 w-5 text-ai-green" />
                    Current Plan: {currentPlan.name}
                  </CardTitle>
                  <CardDescription>Active since January 15, 2024</CardDescription>
                </div>
                <Badge className="bg-green-100 text-green-800">Active</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold">{currentPlan.price} {currentPlan.currency}</p>
                  <p className="text-sm text-muted-foreground">per month</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">Next billing</p>
                  <p className="font-medium">{currentPlan.nextBilling}</p>
                </div>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Switch id="auto-renew" defaultChecked />
                  <label htmlFor="auto-renew" className="text-sm font-medium">
                    Auto-renewal enabled
                  </label>
                </div>
                <Button variant="outline" size="sm">
                  Change Plan
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Usage Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>This month</span>
                  <span className="font-medium">68% used</span>
                </div>
                <Progress value={68} className="h-2" />
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Emails</span>
                  <span>{usage.emails.current.toLocaleString()}/{usage.emails.limit.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>API Calls</span>
                  <span>{usage.apiCalls.current.toLocaleString()}/{usage.apiCalls.limit.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Storage</span>
                  <span>{usage.storage.current} GB/{usage.storage.limit} GB</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Usage */}
        <Card>
          <CardHeader>
            <CardTitle>Detailed Usage</CardTitle>
            <CardDescription>Current month usage across all features</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Mail className="h-5 w-5 text-ai-green" />
                    <div>
                      <p className="font-medium">Email Processing</p>
                      <p className="text-sm text-muted-foreground">AI-powered responses</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">{usage.emails.current.toLocaleString()}</p>
                    <p className="text-sm text-muted-foreground">of {usage.emails.limit.toLocaleString()}</p>
                  </div>
                </div>
                <Progress value={usage.emails.percentage} className="h-2" />
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Bot className="h-5 w-5 text-ai-emerald" />
                    <div>
                      <p className="font-medium">API Calls</p>
                      <p className="text-sm text-muted-foreground">GPT-4 requests</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">{usage.apiCalls.current.toLocaleString()}</p>
                    <p className="text-sm text-muted-foreground">of {usage.apiCalls.limit.toLocaleString()}</p>
                  </div>
                </div>
                <Progress value={usage.apiCalls.percentage} className="h-2" />
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Globe className="h-5 w-5 text-ai-green" />
                    <div>
                      <p className="font-medium">Storage Used</p>
                      <p className="text-sm text-muted-foreground">Email archives & templates</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">{usage.storage.current} GB</p>
                    <p className="text-sm text-muted-foreground">of {usage.storage.limit} GB</p>
                  </div>
                </div>
                <Progress value={usage.storage.percentage} className="h-2" />
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Users className="h-5 w-5 text-ai-orange" />
                    <div>
                      <p className="font-medium">Team Members</p>
                      <p className="text-sm text-muted-foreground">Active users</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">{usage.teamMembers.current}</p>
                    <p className="text-sm text-muted-foreground">of {usage.teamMembers.limit}</p>
                  </div>
                </div>
                <Progress value={usage.teamMembers.percentage} className="h-2" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Available Plans */}
        <Card>
          <CardHeader>
            <CardTitle>Available Plans</CardTitle>
            <CardDescription>Upgrade or downgrade your plan anytime</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              {plans.map((plan, index) => (
                <div key={index} className={`border-2 rounded-lg p-6 relative ${plan.color} ${plan.popular ? 'scale-105' : ''}`}>
                  {plan.popular && (
                    <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-ai-green">
                      Most Popular
                    </Badge>
                  )}
                  <div className="text-center mb-4">
                    <h3 className="text-xl font-bold">{plan.name}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{plan.description}</p>
                    <div className="mb-2">
                      <span className="text-3xl font-bold">{plan.price}</span>
                      <span className="text-sm text-muted-foreground ml-1">NOK/month</span>
                    </div>
                    {plan.originalPrice && (
                      <p className="text-sm text-muted-foreground">
                        <span className="line-through">{plan.originalPrice} NOK</span>
                        <Badge variant="secondary" className="ml-2">Save 25%</Badge>
                      </p>
                    )}
                  </div>
                  
                  <div className="space-y-3 mb-6">
                    {plan.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center space-x-2">
                        <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  <Button 
                    className={`w-full ${plan.name === currentPlan.name ? 'bg-gray-200 text-gray-600' : ''}`}
                    disabled={plan.name === currentPlan.name}
                  >
                    {plan.name === currentPlan.name ? 'Current Plan' : 'Upgrade'}
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Billing History */}
        <Card>
          <CardHeader>
            <CardTitle>Billing History</CardTitle>
            <CardDescription>Your recent invoices and payments</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {invoices.map((invoice, index) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-ai-green to-ai-emerald rounded-lg flex items-center justify-center">
                      <CreditCard className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <p className="font-medium">{invoice.description}</p>
                      <p className="text-sm text-muted-foreground">Invoice {invoice.id} • {invoice.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <p className="font-bold">{invoice.amount} {invoice.currency}</p>
                      <Badge variant={invoice.status === "paid" ? "default" : "secondary"}>
                        {invoice.status}
                      </Badge>
                    </div>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Payment Method */}
        <Card>
          <CardHeader>
            <CardTitle>Payment Method</CardTitle>
            <CardDescription>Manage your payment information</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-8 bg-gradient-to-r from-green-600 to-green-800 rounded flex items-center justify-center text-white text-xs font-bold">
                  VISA
                </div>
                <div>
                  <p className="font-medium">•••• •••• •••• 4242</p>
                  <p className="text-sm text-muted-foreground">Expires 12/2026</p>
                </div>
              </div>
              <Button variant="outline">
                Update Card
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
  );
}