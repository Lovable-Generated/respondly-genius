import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { 
  Mail, 
  Brain, 
  BarChart3, 
  Zap, 
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  CheckCircle,
  AlertCircle,
  Globe,
  Users,
  DollarSign,
  Activity,
  Send,
  Inbox,
  Bot,
  MessageSquare
} from "lucide-react";
import { Line, LineChart, Bar, BarChart, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Area, AreaChart } from "recharts";

const responseData = [
  { day: "Mon", emails: 45, responses: 42 },
  { day: "Tue", emails: 52, responses: 48 },
  { day: "Wed", emails: 38, responses: 36 },
  { day: "Thu", emails: 61, responses: 58 },
  { day: "Fri", emails: 74, responses: 71 },
  { day: "Sat", emails: 29, responses: 27 },
  { day: "Sun", emails: 18, responses: 17 },
];

const languageData = [
  { name: "English", value: 45, color: "#10b981" },
  { name: "Norwegian", value: 32, color: "#16a34a" },
  { name: "Swedish", value: 15, color: "#059669" },
  { name: "Danish", value: 8, color: "#10b981" },
];

const usageData = [
  { month: "Jan", usage: 1240 },
  { month: "Feb", usage: 1680 },
  { month: "Mar", usage: 2100 },
  { month: "Apr", usage: 2850 },
  { month: "May", usage: 3420 },
  { month: "Jun", usage: 3890 },
];

export function EnhancedUserDashboard() {
  const stats = [
    {
      title: "Total Emails Processed",
      value: "3,420",
      change: "+12.5%",
      changeType: "increase" as const,
      icon: Mail,
      description: "This month",
    },
    {
      title: "AI Response Rate",
      value: "97.8%",
      change: "+2.1%",
      changeType: "increase" as const,
      icon: Brain,
      description: "Last 30 days",
    },
    {
      title: "Avg Response Time",
      value: "1.2s",
      change: "-0.3s",
      changeType: "decrease" as const,
      icon: Clock,
      description: "Down from 1.5s",
    },
    {
      title: "Customer Satisfaction",
      value: "4.9/5",
      change: "+0.2",
      changeType: "increase" as const,
      icon: CheckCircle,
      description: "Based on feedback",
    },
  ];

  const recentEmails = [
    {
      from: "support@techcompany.no",
      subject: "Technical support request",
      status: "responded",
      time: "2 min ago",
      language: "Norwegian",
      responseTime: "0.8s",
    },
    {
      from: "info@business.se",
      subject: "Product inquiry",
      status: "responded",
      time: "5 min ago",
      language: "Swedish",
      responseTime: "1.1s",
    },
    {
      from: "contact@startup.dk",
      subject: "Partnership proposal",
      status: "pending",
      time: "8 min ago",
      language: "Danish",
      responseTime: "-",
    },
    {
      from: "hello@agency.com",
      subject: "Service consultation",
      status: "responded",
      time: "12 min ago",
      language: "English",
      responseTime: "0.9s",
    },
  ];

  return (
    <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <p className="text-muted-foreground">Welcome back! Here's what's happening with your AI email automation.</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline">
              <BarChart3 className="mr-2 h-4 w-4" />
              Export Report
            </Button>
            <Button className="bg-gradient-to-r from-ai-blue to-ai-purple">
              <Zap className="mr-2 h-4 w-4" />
              Optimize AI
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <stat.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="flex items-center text-xs text-muted-foreground">
                  {stat.changeType === "increase" ? (
                    <ArrowUpRight className="mr-1 h-3 w-3 text-green-500" />
                  ) : (
                    <ArrowDownRight className="mr-1 h-3 w-3 text-green-500" />
                  )}
                  <span className={stat.changeType === "increase" ? "text-green-600" : "text-green-600"}>
                    {stat.change}
                  </span>
                  <span className="ml-1">{stat.description}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Charts Row */}
        <div className="grid gap-4 md:grid-cols-2">
          {/* Email Response Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Email Activity This Week</CardTitle>
              <CardDescription>Emails received vs AI responses sent</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={responseData}>
                  <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="emails"
                    stackId="1"
                    stroke="#10b981"
                    fill="#10b981"
                    fillOpacity={0.6}
                    name="Emails Received"
                  />
                  <Area
                    type="monotone"
                    dataKey="responses"
                    stackId="2"
                    stroke="#16a34a"
                    fill="#16a34a"
                    fillOpacity={0.6}
                    name="AI Responses"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Language Distribution */}
          <Card>
            <CardHeader>
              <CardTitle>Response Languages</CardTitle>
              <CardDescription>Distribution of AI responses by language</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={languageData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {languageData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Usage and Recent Activity */}
        <div className="grid gap-4 md:grid-cols-3">
          {/* Usage Progress */}
          <Card>
            <CardHeader>
              <CardTitle>Monthly Usage</CardTitle>
              <CardDescription>Professional Plan</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Emails Processed</span>
                  <span>3,420 / 5,000</span>
                </div>
                <Progress value={68.4} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>API Calls</span>
                  <span>4,580 / 10,000</span>
                </div>
                <Progress value={45.8} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Storage Used</span>
                  <span>1.2 GB / 5 GB</span>
                </div>
                <Progress value={24} className="h-2" />
              </div>
              <Button variant="outline" className="w-full mt-4">
                Upgrade Plan
              </Button>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Recent Email Activity</CardTitle>
              <CardDescription>Latest emails processed by AI</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentEmails.map((email, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-ai-blue to-ai-purple rounded-full flex items-center justify-center">
                        <Mail className="h-4 w-4 text-white" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium truncate">{email.subject}</p>
                        <p className="text-xs text-muted-foreground">{email.from}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Badge variant={email.status === "responded" ? "default" : "secondary"}>
                        {email.status === "responded" ? (
                          <>
                            <CheckCircle className="mr-1 h-3 w-3" />
                            Responded
                          </>
                        ) : (
                          <>
                            <Clock className="mr-1 h-3 w-3" />
                            Pending
                          </>
                        )}
                      </Badge>
                      <div className="text-xs text-muted-foreground text-right">
                        <p>{email.time}</p>
                        <p className="text-ai-blue">{email.responseTime}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common tasks and shortcuts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Button variant="outline" className="h-20 flex-col">
                <Inbox className="h-6 w-6 mb-2" />
                View Inbox
              </Button>
              <Button variant="outline" className="h-20 flex-col">
                <Bot className="h-6 w-6 mb-2" />
                AI Settings
              </Button>
              <Button variant="outline" className="h-20 flex-col">
                <MessageSquare className="h-6 w-6 mb-2" />
                Templates
              </Button>
              <Button variant="outline" className="h-20 flex-col">
                <BarChart3 className="h-6 w-6 mb-2" />
                Analytics
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
  );
}