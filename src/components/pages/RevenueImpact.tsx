import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  DollarSign, 
  TrendingUp,
  TrendingDown,
  Users,
  Mail,
  Clock,
  Target,
  Calendar,
  Download,
  Filter
} from "lucide-react";
import { Line, LineChart, Bar, BarChart, Area, AreaChart, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const revenueData = [
  { date: "Jan 20", revenue: 12500, aiSavings: 3200, customerRetention: 94, newCustomers: 23 },
  { date: "Jan 21", revenue: 13200, aiSavings: 3450, customerRetention: 95, newCustomers: 28 },
  { date: "Jan 22", revenue: 11800, aiSavings: 3100, customerRetention: 93, newCustomers: 19 },
  { date: "Jan 23", revenue: 14600, aiSavings: 3890, customerRetention: 96, newCustomers: 34 },
  { date: "Jan 24", revenue: 15400, aiSavings: 4200, customerRetention: 97, newCustomers: 41 },
  { date: "Jan 25", revenue: 16800, aiSavings: 4650, customerRetention: 98, newCustomers: 47 },
  { date: "Jan 26", revenue: 15900, aiSavings: 4320, customerRetention: 96, newCustomers: 38 }
];

const customerMetrics = [
  { metric: "Customer Lifetime Value", before: "45,000", after: "67,500", improvement: "+50%", impact: "high" },
  { metric: "Response Time", before: "4.2 hours", after: "1.2 seconds", improvement: "-99.9%", impact: "high" },
  { metric: "Customer Satisfaction", before: "3.2/5", after: "4.8/5", improvement: "+50%", impact: "high" },
  { metric: "Support Cost per Ticket", before: "125 NOK", after: "18 NOK", improvement: "-85.6%", impact: "high" },
  { metric: "First Response Resolution", before: "34%", after: "78%", improvement: "+44%", impact: "medium" },
  { metric: "Customer Churn Rate", before: "8.5%", after: "3.2%", improvement: "-62.4%", impact: "high" }
];

const industryComparison = [
  { industry: "Technology", avgResponseTime: "2.5 hours", avgSatisfaction: 4.1, ourPerformance: 4.8 },
  { industry: "E-commerce", avgResponseTime: "6.2 hours", avgSatisfaction: 3.8, ourPerformance: 4.8 },
  { industry: "Financial Services", avgResponseTime: "1.8 hours", avgSatisfaction: 4.3, ourPerformance: 4.8 },
  { industry: "Healthcare", avgResponseTime: "3.4 hours", avgSatisfaction: 4.0, ourPerformance: 4.8 },
  { industry: "Education", avgResponseTime: "8.1 hours", avgSatisfaction: 3.6, ourPerformance: 4.8 }
];

const costSavings = [
  { category: "Support Staff Reduction", monthlySaving: 25000, annualSaving: 300000 },
  { category: "Faster Issue Resolution", monthlySaving: 8500, annualSaving: 102000 },
  { category: "Reduced Training Costs", monthlySaving: 3200, annualSaving: 38400 },
  { category: "Lower Customer Churn", monthlySaving: 12800, annualSaving: 153600 },
  { category: "Increased Upselling", monthlySaving: 15600, annualSaving: 187200 }
];

export function RevenueImpact() {
  const totalMonthlySavings = costSavings.reduce((sum, item) => sum + item.monthlySaving, 0);
  const totalAnnualSavings = costSavings.reduce((sum, item) => sum + item.annualSaving, 0);
  const avgRevenue = revenueData.reduce((sum, item) => sum + item.revenue, 0) / revenueData.length;
  const totalAISavings = revenueData.reduce((sum, item) => sum + item.aiSavings, 0);

  return (
    <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Revenue Impact Analysis</h1>
            <p className="text-muted-foreground">Measure the financial impact of AI-powered email automation</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline">
              <Calendar className="mr-2 h-4 w-4" />
              Date Range
            </Button>
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              Filters
            </Button>
            <Button>
              <Download className="mr-2 h-4 w-4" />
              Export Report
            </Button>
          </div>
        </div>

        {/* Key Financial Metrics */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Monthly Savings</p>
                  <p className="text-2xl font-bold">{totalMonthlySavings.toLocaleString()} NOK</p>
                  <div className="flex items-center text-xs text-green-600">
                    <TrendingUp className="mr-1 h-3 w-3" />
                    +23% vs last month
                  </div>
                </div>
                <DollarSign className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Annual Projection</p>
                  <p className="text-2xl font-bold">{(totalAnnualSavings / 1000).toFixed(0)}K NOK</p>
                  <div className="flex items-center text-xs text-green-600">
                    <TrendingUp className="mr-1 h-3 w-3" />
                    ROI: 450%
                  </div>
                </div>
                <Target className="h-8 w-8 text-ai-green" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Cost per Response</p>
                  <p className="text-2xl font-bold">18 NOK</p>
                  <div className="flex items-center text-xs text-green-600">
                    <TrendingDown className="mr-1 h-3 w-3" />
                    -85.6% vs manual
                  </div>
                </div>
                <Clock className="h-8 w-8 text-ai-emerald" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Customer LTV</p>
                  <p className="text-2xl font-bold">67.5K NOK</p>
                  <div className="flex items-center text-xs text-green-600">
                    <TrendingUp className="mr-1 h-3 w-3" />
                    +50% improvement
                  </div>
                </div>
                <Users className="h-8 w-8 text-ai-green" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Revenue Trend */}
        <Card>
          <CardHeader>
            <CardTitle>Revenue Impact Over Time</CardTitle>
            <CardDescription>Daily revenue and AI-generated savings</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis dataKey="date" fontSize={12} />
                <YAxis fontSize={12} />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#10b981"
                  strokeWidth={3}
                  dot={{ fill: "#10b981", strokeWidth: 2, r: 4 }}
                  name="Daily Revenue (NOK)"
                />
                <Line
                  type="monotone"
                  dataKey="aiSavings"
                  stroke="#10b981"
                  strokeWidth={3}
                  dot={{ fill: "#10b981", strokeWidth: 2, r: 4 }}
                  name="AI Savings (NOK)"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Before vs After Comparison */}
        <Card>
          <CardHeader>
            <CardTitle>Performance Improvements</CardTitle>
            <CardDescription>Key metrics comparison before and after AI implementation</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {customerMetrics.map((metric, index) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="flex-1">
                    <h4 className="font-medium">{metric.metric}</h4>
                  </div>
                  <div className="flex items-center space-x-8">
                    <div className="text-center">
                      <div className="text-sm text-muted-foreground">Before AI</div>
                      <div className="font-bold text-red-600">{metric.before}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm text-muted-foreground">After AI</div>
                      <div className="font-bold text-green-600">{metric.after}</div>
                    </div>
                    <div className="text-center">
                      <Badge 
                        className={`${
                          metric.impact === "high" 
                            ? "bg-green-100 text-green-800" 
                            : "bg-green-100 text-green-800"
                        }`}
                      >
                        {metric.improvement}
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Cost Savings Breakdown */}
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Cost Savings Breakdown</CardTitle>
              <CardDescription>Detailed analysis of cost reductions</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={costSavings}>
                  <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                  <XAxis dataKey="category" fontSize={10} angle={-45} textAnchor="end" height={80} />
                  <YAxis fontSize={12} />
                  <Tooltip />
                  <Bar dataKey="monthlySaving" fill="#10b981" name="Monthly Savings (NOK)" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Industry Benchmarking</CardTitle>
              <CardDescription>How you compare to industry standards</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {industryComparison.map((industry, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{industry.industry}</span>
                      <div className="flex items-center space-x-4 text-sm">
                        <span className="text-muted-foreground">
                          Industry: {industry.avgSatisfaction}/5
                        </span>
                        <span className="font-bold text-green-600">
                          You: {industry.ourPerformance}/5
                        </span>
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-ai-green to-ai-green h-2 rounded-full"
                        style={{ width: `${(industry.ourPerformance / 5) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* ROI Calculator */}
        <Card>
          <CardHeader>
            <CardTitle>ROI Analysis</CardTitle>
            <CardDescription>Return on investment calculation</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-3">
              <div className="text-center p-6 border rounded-lg bg-green-50/50">
                <div className="text-3xl font-bold text-green-600 mb-2">
                  {((totalAnnualSavings - 15588) / 15588 * 100).toFixed(0)}%
                </div>
                <div className="text-sm text-muted-foreground">Annual ROI</div>
                <div className="text-xs text-muted-foreground mt-1">
                  Based on current plan cost
                </div>
              </div>
              
              <div className="text-center p-6 border rounded-lg bg-green-50/50">
                <div className="text-3xl font-bold text-green-600 mb-2">
                  2.3 months
                </div>
                <div className="text-sm text-muted-foreground">Payback Period</div>
                <div className="text-xs text-muted-foreground mt-1">
                  Time to break even
                </div>
              </div>
              
              <div className="text-center p-6 border rounded-lg bg-emerald-50/50">
                <div className="text-3xl font-bold text-emerald-600 mb-2">
                  {(totalAnnualSavings / 1000).toFixed(0)}K NOK
                </div>
                <div className="text-sm text-muted-foreground">Annual Value</div>
                <div className="text-xs text-muted-foreground mt-1">
                  Total value generated
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Business Impact Summary */}
        <Card>
          <CardHeader>
            <CardTitle>Business Impact Summary</CardTitle>
            <CardDescription>Key achievements and improvements</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-4">
                <h4 className="font-semibold text-green-600">Positive Impacts</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center space-x-2">
                    <TrendingUp className="h-4 w-4 text-green-500" />
                    <span>Customer satisfaction increased by 50%</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <TrendingUp className="h-4 w-4 text-green-500" />
                    <span>Response time reduced by 99.9%</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <TrendingUp className="h-4 w-4 text-green-500" />
                    <span>Support costs reduced by 85.6%</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <TrendingUp className="h-4 w-4 text-green-500" />
                    <span>Customer churn reduced by 62.4%</span>
                  </li>
                </ul>
              </div>
              
              <div className="space-y-4">
                <h4 className="font-semibold text-green-600">Financial Benefits</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center space-x-2">
                    <DollarSign className="h-4 w-4 text-green-500" />
                    <span>Monthly savings: {totalMonthlySavings.toLocaleString()} NOK</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <DollarSign className="h-4 w-4 text-green-500" />
                    <span>Annual projection: {(totalAnnualSavings / 1000).toFixed(0)}K NOK</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <DollarSign className="h-4 w-4 text-green-500" />
                    <span>ROI: 450% annually</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <DollarSign className="h-4 w-4 text-green-500" />
                    <span>Payback period: 2.3 months</span>
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
  );
}