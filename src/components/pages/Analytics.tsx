import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BarChart3, 
  TrendingUp,
  TrendingDown,
  Mail,
  Clock,
  Globe,
  Star,
  Users,
  DollarSign,
  Activity,
  Download,
  Calendar,
  Filter
} from "lucide-react";
import { Line, LineChart, Bar, BarChart, Area, AreaChart, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, RadialBarChart, RadialBar } from "recharts";

const emailVolumeData = [
  { date: "Jan 1", emails: 45, responses: 42, satisfaction: 4.8 },
  { date: "Jan 2", emails: 52, responses: 48, satisfaction: 4.9 },
  { date: "Jan 3", emails: 38, responses: 36, satisfaction: 4.7 },
  { date: "Jan 4", emails: 61, responses: 58, satisfaction: 4.8 },
  { date: "Jan 5", emails: 74, responses: 71, satisfaction: 4.9 },
  { date: "Jan 6", emails: 29, responses: 27, satisfaction: 4.6 },
  { date: "Jan 7", emails: 18, responses: 17, satisfaction: 4.8 },
  { date: "Jan 8", emails: 67, responses: 65, satisfaction: 4.9 },
  { date: "Jan 9", emails: 89, responses: 86, satisfaction: 5.0 },
  { date: "Jan 10", emails: 92, responses: 89, satisfaction: 4.8 },
  { date: "Jan 11", emails: 78, responses: 75, satisfaction: 4.7 },
  { date: "Jan 12", emails: 56, responses: 54, satisfaction: 4.9 },
  { date: "Jan 13", emails: 41, responses: 39, satisfaction: 4.8 },
  { date: "Jan 14", emails: 73, responses: 71, satisfaction: 4.9 }
];

const languageData = [
  { name: "English", value: 45, responses: 2150, satisfaction: 4.9, color: "#10b981" },
  { name: "Norwegian", value: 32, responses: 1540, satisfaction: 4.8, color: "#16a34a" },
  { name: "Swedish", value: 15, responses: 720, satisfaction: 4.7, color: "#059669" },
  { name: "Danish", value: 8, responses: 380, satisfaction: 4.6, color: "#10b981" },
];

const responseTimeData = [
  { hour: "00:00", avgTime: 0.8, volume: 12 },
  { hour: "06:00", avgTime: 1.2, volume: 45 },
  { hour: "09:00", avgTime: 1.5, volume: 89 },
  { hour: "12:00", avgTime: 1.8, volume: 124 },
  { hour: "15:00", avgTime: 1.6, volume: 156 },
  { hour: "18:00", avgTime: 1.3, volume: 87 },
  { hour: "21:00", avgTime: 1.0, volume: 34 },
];

const topicsData = [
  { topic: "Technical Support", count: 234, satisfaction: 4.8, avgResponse: "1.2s" },
  { topic: "Billing Questions", count: 189, satisfaction: 4.9, avgResponse: "0.9s" },
  { topic: "Product Inquiries", count: 156, satisfaction: 4.7, avgResponse: "1.1s" },
  { topic: "Partnership", count: 98, satisfaction: 4.6, avgResponse: "1.4s" },
  { topic: "General Info", count: 87, satisfaction: 4.8, avgResponse: "0.8s" },
];

const satisfactionData = [
  { rating: "5 Stars", count: 1240, percentage: 72, fill: "#10b981" },
  { rating: "4 Stars", count: 320, percentage: 18.5, fill: "#10b981" },
  { rating: "3 Stars", count: 98, percentage: 5.7, fill: "#f59e0b" },
  { rating: "2 Stars", count: 42, percentage: 2.4, fill: "#ef4444" },
  { rating: "1 Star", count: 23, percentage: 1.4, fill: "#dc2626" },
];

export function Analytics() {
  const stats = [
    {
      title: "Total Responses",
      value: "12,453",
      change: "+18.2%",
      changeType: "increase" as const,
      icon: Mail,
      description: "vs last month",
    },
    {
      title: "Avg Response Time",
      value: "1.24s",
      change: "-0.15s",
      changeType: "decrease" as const,
      icon: Clock,
      description: "Improved performance",
    },
    {
      title: "Success Rate",
      value: "97.8%",
      change: "+1.2%",
      changeType: "increase" as const,
      icon: TrendingUp,
      description: "AI accuracy",
    },
    {
      title: "Satisfaction",
      value: "4.85/5",
      change: "+0.12",
      changeType: "increase" as const,
      icon: Star,
      description: "Customer rating",
    },
  ];

  return (
    <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Analytics</h1>
            <p className="text-muted-foreground">Detailed insights into your AI email automation performance</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline">
              <Calendar className="mr-2 h-4 w-4" />
              Last 30 Days
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
                    <TrendingUp className="mr-1 h-3 w-3 text-green-500" />
                  ) : (
                    <TrendingDown className="mr-1 h-3 w-3 text-green-500" />
                  )}
                  <span className="text-green-600">{stat.change}</span>
                  <span className="ml-1">{stat.description}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Analytics Tabs */}
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="languages">Languages</TabsTrigger>
            <TabsTrigger value="satisfaction">Satisfaction</TabsTrigger>
            <TabsTrigger value="topics">Topics</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              {/* Email Volume Trend */}
              <Card>
                <CardHeader>
                  <CardTitle>Email Volume Trend</CardTitle>
                  <CardDescription>Daily email processing over the last 2 weeks</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={emailVolumeData}>
                      <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                      <XAxis dataKey="date" fontSize={12} />
                      <YAxis fontSize={12} />
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

              {/* Response Success Rate */}
              <Card>
                <CardHeader>
                  <CardTitle>AI Success Rate</CardTitle>
                  <CardDescription>Percentage of emails successfully processed by AI</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-center h-[300px]">
                    <div className="text-center">
                      <div className="text-6xl font-bold text-ai-blue mb-4">97.8%</div>
                      <p className="text-lg text-muted-foreground mb-2">Success Rate</p>
                      <div className="flex items-center justify-center space-x-4 text-sm">
                        <div className="flex items-center">
                          <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                          <span>Successful: 2,847</span>
                        </div>
                        <div className="flex items-center">
                          <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                          <span>Failed: 64</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="performance" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              {/* Response Time by Hour */}
              <Card>
                <CardHeader>
                  <CardTitle>Response Time by Hour</CardTitle>
                  <CardDescription>Average AI response time throughout the day</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={responseTimeData}>
                      <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                      <XAxis dataKey="hour" fontSize={12} />
                      <YAxis fontSize={12} />
                      <Tooltip />
                      <Line
                        type="monotone"
                        dataKey="avgTime"
                        stroke="#10b981"
                        strokeWidth={3}
                        dot={{ fill: "#10b981", strokeWidth: 2, r: 4 }}
                        name="Avg Response Time (s)"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Email Volume by Hour */}
              <Card>
                <CardHeader>
                  <CardTitle>Email Volume by Hour</CardTitle>
                  <CardDescription>Email distribution throughout the day</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={responseTimeData}>
                      <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                      <XAxis dataKey="hour" fontSize={12} />
                      <YAxis fontSize={12} />
                      <Tooltip />
                      <Bar dataKey="volume" fill="#16a34a" name="Email Volume" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="languages" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              {/* Language Distribution */}
              <Card>
                <CardHeader>
                  <CardTitle>Language Distribution</CardTitle>
                  <CardDescription>Emails processed by language</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={languageData}
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
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

              {/* Language Performance */}
              <Card>
                <CardHeader>
                  <CardTitle>Language Performance</CardTitle>
                  <CardDescription>Detailed metrics by language</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {languageData.map((lang, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="w-4 h-4 rounded-full" style={{ backgroundColor: lang.color }}></div>
                          <div>
                            <p className="font-medium">{lang.name}</p>
                            <p className="text-sm text-muted-foreground">{lang.responses} responses</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center space-x-1">
                            <Star className="h-4 w-4 text-yellow-500" />
                            <span className="font-medium">{lang.satisfaction}</span>
                          </div>
                          <p className="text-sm text-muted-foreground">{lang.value}% of total</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="satisfaction" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              {/* Satisfaction Breakdown */}
              <Card>
                <CardHeader>
                  <CardTitle>Customer Satisfaction</CardTitle>
                  <CardDescription>Rating distribution from customer feedback</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {satisfactionData.map((item, index) => (
                      <div key={index} className="flex items-center space-x-4">
                        <div className="w-20 text-sm">{item.rating}</div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <div className="flex-1 bg-muted rounded-full h-2">
                              <div
                                className="h-2 rounded-full"
                                style={{ 
                                  width: `${item.percentage}%`, 
                                  backgroundColor: item.fill 
                                }}
                              />
                            </div>
                            <span className="text-sm font-medium w-12">{item.percentage}%</span>
                          </div>
                        </div>
                        <div className="text-sm text-muted-foreground w-16 text-right">
                          {item.count}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 p-4 bg-muted/50 rounded-lg">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Overall Rating</span>
                      <div className="flex items-center space-x-2">
                        <div className="flex">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star key={star} className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                          ))}
                        </div>
                        <span className="font-bold text-lg">4.85</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Satisfaction Trend */}
              <Card>
                <CardHeader>
                  <CardTitle>Satisfaction Trend</CardTitle>
                  <CardDescription>Average customer satisfaction over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={emailVolumeData}>
                      <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                      <XAxis dataKey="date" fontSize={12} />
                      <YAxis domain={[4.0, 5.0]} fontSize={12} />
                      <Tooltip />
                      <Line
                        type="monotone"
                        dataKey="satisfaction"
                        stroke="#10b981"
                        strokeWidth={3}
                        dot={{ fill: "#10b981", strokeWidth: 2, r: 4 }}
                        name="Satisfaction Rating"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="topics" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Top Email Topics</CardTitle>
                <CardDescription>Most common topics and their performance metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topicsData.map((topic, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                      <div className="flex items-center space-x-4">
                        <div className="w-8 h-8 bg-gradient-to-br from-ai-blue to-ai-purple rounded-lg flex items-center justify-center text-white font-bold text-sm">
                          {index + 1}
                        </div>
                        <div>
                          <p className="font-medium">{topic.topic}</p>
                          <p className="text-sm text-muted-foreground">{topic.count} emails</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-6">
                        <div className="text-center">
                          <p className="text-sm text-muted-foreground">Satisfaction</p>
                          <div className="flex items-center space-x-1">
                            <Star className="h-4 w-4 text-yellow-500" />
                            <span className="font-medium">{topic.satisfaction}</span>
                          </div>
                        </div>
                        <div className="text-center">
                          <p className="text-sm text-muted-foreground">Avg Response</p>
                          <p className="font-medium text-ai-blue">{topic.avgResponse}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
  );
}