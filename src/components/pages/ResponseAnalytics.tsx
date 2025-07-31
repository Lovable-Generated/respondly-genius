import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  PieChart, 
  BarChart3,
  TrendingUp,
  TrendingDown,
  Clock,
  Target,
  MessageSquare,
  ThumbsUp,
  ThumbsDown,
  Star,
  Download,
  Calendar,
  Filter
} from "lucide-react";
import { Line, LineChart, Bar, BarChart, Area, AreaChart, Pie, PieChart as RechartsPieChart, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadialBarChart, RadialBar } from "recharts";

const responseTimeData = [
  { time: "00:00", avgTime: 0.8, volume: 12, satisfaction: 4.9 },
  { time: "04:00", avgTime: 0.9, volume: 8, satisfaction: 4.8 },
  { time: "08:00", avgTime: 1.5, volume: 45, satisfaction: 4.7 },
  { time: "12:00", avgTime: 1.8, volume: 89, satisfaction: 4.6 },
  { time: "16:00", avgTime: 1.6, volume: 124, satisfaction: 4.8 },
  { time: "20:00", avgTime: 1.2, volume: 67, satisfaction: 4.9 },
];

const responseQualityData = [
  { date: "Jan 20", quality: 4.6, responses: 45, positive: 38, negative: 4, neutral: 3 },
  { date: "Jan 21", quality: 4.7, responses: 52, positive: 46, negative: 3, neutral: 3 },
  { date: "Jan 22", quality: 4.8, responses: 38, positive: 34, negative: 2, neutral: 2 },
  { date: "Jan 23", quality: 4.9, responses: 61, positive: 57, negative: 2, neutral: 2 },
  { date: "Jan 24", quality: 4.8, responses: 74, positive: 67, negative: 4, neutral: 3 },
  { date: "Jan 25", quality: 4.9, responses: 89, positive: 82, negative: 3, neutral: 4 },
  { date: "Jan 26", quality: 5.0, responses: 67, positive: 64, negative: 1, neutral: 2 },
];

const sentimentData = [
  { name: "Positive", value: 72, count: 1847, color: "#10b981" },
  { name: "Neutral", value: 21, count: 539, color: "#6b7280" },
  { name: "Negative", value: 7, count: 179, color: "#ef4444" },
];

const responseAccuracyData = [
  { category: "Technical Questions", accuracy: 94, total: 456, correct: 429 },
  { category: "Billing Inquiries", accuracy: 98, total: 234, correct: 229 },
  { category: "Product Information", accuracy: 92, total: 189, correct: 174 },
  { category: "Partnership Requests", accuracy: 89, total: 67, correct: 60 },
  { category: "General Support", accuracy: 96, total: 345, correct: 331 },
];

const languagePerformance = [
  { language: "English", responses: 1250, satisfaction: 4.9, avgTime: "1.1s", accuracy: 97 },
  { language: "Norwegian", responses: 890, satisfaction: 4.8, avgTime: "1.2s", accuracy: 96 },
  { language: "Swedish", responses: 567, satisfaction: 4.7, avgTime: "1.3s", accuracy: 95 },
  { language: "Danish", responses: 234, satisfaction: 4.6, avgTime: "1.4s", accuracy: 94 },
];

const topIssues = [
  { issue: "Response too generic", count: 45, trend: "down", impact: "medium" },
  { issue: "Missed context", count: 32, trend: "up", impact: "high" },
  { issue: "Incorrect tone", count: 28, trend: "stable", impact: "low" },
  { issue: "Language errors", count: 19, trend: "down", impact: "medium" },
  { issue: "Template mismatch", count: 15, trend: "stable", impact: "low" },
];

export function ResponseAnalytics() {
  const totalResponses = responseQualityData.reduce((sum, item) => sum + item.responses, 0);
  const avgQuality = responseQualityData.reduce((sum, item) => sum + item.quality, 0) / responseQualityData.length;
  const avgResponseTime = responseTimeData.reduce((sum, item) => sum + item.avgTime, 0) / responseTimeData.length;
  const overallAccuracy = responseAccuracyData.reduce((sum, item) => sum + (item.accuracy * item.total), 0) / 
                         responseAccuracyData.reduce((sum, item) => sum + item.total, 0);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Response Analytics</h1>
            <p className="text-muted-foreground">Detailed analysis of AI response quality and performance</p>
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

        {/* Key Metrics */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Avg Quality Score</p>
                  <p className="text-2xl font-bold">{avgQuality.toFixed(1)}/5</p>
                  <div className="flex items-center text-xs text-green-600">
                    <TrendingUp className="mr-1 h-3 w-3" />
                    +0.2 from last week
                  </div>
                </div>
                <Star className="h-8 w-8 text-yellow-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Response Accuracy</p>
                  <p className="text-2xl font-bold">{overallAccuracy.toFixed(1)}%</p>
                  <div className="flex items-center text-xs text-green-600">
                    <TrendingUp className="mr-1 h-3 w-3" />
                    +1.2% from last week
                  </div>
                </div>
                <Target className="h-8 w-8 text-ai-blue" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Avg Response Time</p>
                  <p className="text-2xl font-bold">{avgResponseTime.toFixed(1)}s</p>
                  <div className="flex items-center text-xs text-red-600">
                    <TrendingUp className="mr-1 h-3 w-3" />
                    +0.1s from last week
                  </div>
                </div>
                <Clock className="h-8 w-8 text-ai-purple" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Positive Sentiment</p>
                  <p className="text-2xl font-bold">72%</p>
                  <div className="flex items-center text-xs text-green-600">
                    <TrendingUp className="mr-1 h-3 w-3" />
                    +3% from last week
                  </div>
                </div>
                <ThumbsUp className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts Row 1 */}
        <div className="grid gap-4 md:grid-cols-2">
          {/* Response Quality Trend */}
          <Card>
            <CardHeader>
              <CardTitle>Response Quality Trend</CardTitle>
              <CardDescription>Average quality score over time</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={responseQualityData}>
                  <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                  <XAxis dataKey="date" fontSize={12} />
                  <YAxis domain={[4.0, 5.0]} fontSize={12} />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="quality"
                    stroke="#3b82f6"
                    fill="#3b82f6"
                    fillOpacity={0.6}
                    name="Quality Score"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Response Time by Hour */}
          <Card>
            <CardHeader>
              <CardTitle>Response Time Analysis</CardTitle>
              <CardDescription>Average response time throughout the day</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={responseTimeData}>
                  <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                  <XAxis dataKey="time" fontSize={12} />
                  <YAxis fontSize={12} />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="avgTime"
                    stroke="#8b5cf6"
                    strokeWidth={3}
                    dot={{ fill: "#8b5cf6", strokeWidth: 2, r: 4 }}
                    name="Avg Response Time (s)"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Charts Row 2 */}
        <div className="grid gap-4 md:grid-cols-2">
          {/* Sentiment Distribution */}
          <Card>
            <CardHeader>
              <CardTitle>Customer Sentiment</CardTitle>
              <CardDescription>Distribution of customer feedback sentiment</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <RechartsPieChart>
                  <Pie
                    data={sentimentData}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value}%`}
                  >
                    {sentimentData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </RechartsPieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Response Accuracy by Category */}
          <Card>
            <CardHeader>
              <CardTitle>Accuracy by Category</CardTitle>
              <CardDescription>Response accuracy across different inquiry types</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={responseAccuracyData} layout="horizontal">
                  <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                  <XAxis type="number" domain={[80, 100]} fontSize={12} />
                  <YAxis dataKey="category" type="category" fontSize={12} width={120} />
                  <Tooltip />
                  <Bar dataKey="accuracy" fill="#10b981" name="Accuracy %" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Language Performance */}
        <Card>
          <CardHeader>
            <CardTitle>Performance by Language</CardTitle>
            <CardDescription>Detailed metrics for each supported language</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {languagePerformance.map((lang, index) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-ai-blue to-ai-purple rounded-lg flex items-center justify-center text-white font-bold">
                      {lang.language.slice(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <h4 className="font-medium">{lang.language}</h4>
                      <p className="text-sm text-muted-foreground">
                        {lang.responses.toLocaleString()} responses
                      </p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-8 text-center">
                    <div>
                      <div className="text-sm text-muted-foreground">Satisfaction</div>
                      <div className="font-bold text-lg">{lang.satisfaction}/5</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Avg Time</div>
                      <div className="font-bold text-lg">{lang.avgTime}</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Accuracy</div>
                      <div className="font-bold text-lg">{lang.accuracy}%</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Issues */}
        <Card>
          <CardHeader>
            <CardTitle>Top Response Issues</CardTitle>
            <CardDescription>Most common issues reported with AI responses</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {topIssues.map((issue, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center text-sm font-bold">
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-medium">{issue.issue}</p>
                      <div className="flex items-center space-x-2">
                        <Badge 
                          variant={issue.impact === "high" ? "destructive" : issue.impact === "medium" ? "default" : "secondary"}
                          className="text-xs"
                        >
                          {issue.impact} impact
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          {issue.count} reports
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    {issue.trend === "up" && <TrendingUp className="h-4 w-4 text-red-500" />}
                    {issue.trend === "down" && <TrendingDown className="h-4 w-4 text-green-500" />}
                    {issue.trend === "stable" && <div className="h-4 w-4 rounded-full bg-gray-300" />}
                    <span className="text-sm font-medium">{issue.count}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Improvement Recommendations */}
        <Card>
          <CardHeader>
            <CardTitle>Improvement Recommendations</CardTitle>
            <CardDescription>AI-powered suggestions to enhance response quality</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 border-l-4 border-ai-blue bg-blue-50/50 rounded-lg">
                <h4 className="font-medium text-blue-900">High Priority</h4>
                <p className="text-sm text-blue-800 mt-1">
                  Improve context understanding for partnership inquiries. Consider adding more training data 
                  for business development scenarios.
                </p>
              </div>
              <div className="p-4 border-l-4 border-yellow-500 bg-yellow-50/50 rounded-lg">
                <h4 className="font-medium text-yellow-900">Medium Priority</h4>
                <p className="text-sm text-yellow-800 mt-1">
                  Optimize response times during peak hours (12:00-16:00). Consider scaling AI processing 
                  resources during high-traffic periods.
                </p>
              </div>
              <div className="p-4 border-l-4 border-green-500 bg-green-50/50 rounded-lg">
                <h4 className="font-medium text-green-900">Low Priority</h4>
                <p className="text-sm text-green-800 mt-1">
                  Fine-tune tone detection for Swedish and Danish languages to improve cultural appropriateness.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}