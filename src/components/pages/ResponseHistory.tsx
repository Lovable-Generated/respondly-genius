import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  History, 
  Search,
  Filter,
  Clock,
  CheckCircle,
  XCircle,
  Globe,
  Star,
  TrendingUp,
  BarChart3,
  Calendar
} from "lucide-react";
import { useState } from "react";
import { Line, LineChart, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const historyData = [
  { date: "Jan 20", responses: 45, success: 43, failed: 2 },
  { date: "Jan 21", responses: 52, success: 50, failed: 2 },
  { date: "Jan 22", responses: 38, success: 37, failed: 1 },
  { date: "Jan 23", responses: 61, success: 59, failed: 2 },
  { date: "Jan 24", responses: 74, success: 72, failed: 2 },
  { date: "Jan 25", responses: 89, success: 87, failed: 2 },
  { date: "Jan 26", responses: 67, success: 65, failed: 2 },
];

const responseHistory = [
  {
    id: 1,
    date: "2024-01-26",
    time: "14:30",
    to: "support@company.com",
    subject: "Server maintenance response",
    status: "success",
    responseTime: "0.8s",
    language: "Norwegian",
    satisfaction: 4.9,
    template: "Technical Support",
    aiModel: "GPT-4"
  },
  {
    id: 2,
    date: "2024-01-26",
    time: "14:25",
    to: "info@business.se",
    subject: "Product demo response",
    status: "success",
    responseTime: "1.1s",
    language: "Swedish",
    satisfaction: 4.7,
    template: "Sales Inquiry",
    aiModel: "GPT-4"
  },
  {
    id: 3,
    date: "2024-01-26",
    time: "14:20",
    to: "hello@agency.com",
    subject: "Consultation response",
    status: "failed",
    responseTime: "2.3s",
    language: "English",
    satisfaction: null,
    template: "General Inquiry",
    aiModel: "GPT-4",
    error: "API rate limit exceeded"
  },
  {
    id: 4,
    date: "2024-01-26",
    time: "14:15",
    to: "orders@shop.dk",
    subject: "Order confirmation response",
    status: "success",
    responseTime: "0.7s",
    language: "Danish",
    satisfaction: 4.8,
    template: "Order Processing",
    aiModel: "GPT-4"
  },
  {
    id: 5,
    date: "2024-01-26",
    time: "14:10",
    to: "contact@startup.no",
    subject: "Partnership inquiry response",
    status: "success",
    responseTime: "1.4s",
    language: "Norwegian",
    satisfaction: 4.6,
    template: "Partnership",
    aiModel: "GPT-4"
  }
];

export function ResponseHistory() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDate, setSelectedDate] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "success":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "failed":
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return <Clock className="h-4 w-4 text-yellow-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "success":
        return "bg-green-100 text-green-800";
      case "failed":
        return "bg-red-100 text-red-800";
      default:
        return "bg-yellow-100 text-yellow-800";
    }
  };

  const totalResponses = responseHistory.length;
  const successfulResponses = responseHistory.filter(r => r.status === "success").length;
  const failedResponses = responseHistory.filter(r => r.status === "failed").length;
  const avgResponseTime = responseHistory.reduce((sum, r) => sum + parseFloat(r.responseTime), 0) / totalResponses;
  const avgSatisfaction = responseHistory
    .filter(r => r.satisfaction !== null)
    .reduce((sum, r) => sum + (r.satisfaction || 0), 0) / responseHistory.filter(r => r.satisfaction !== null).length;

  return (
    <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Response History</h1>
            <p className="text-muted-foreground">Complete history of all AI email responses</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline">
              <Calendar className="mr-2 h-4 w-4" />
              Date Range
            </Button>
            <Button variant="outline">
              <BarChart3 className="mr-2 h-4 w-4" />
              Analytics
            </Button>
          </div>
        </div>

        {/* Summary Stats */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Responses</p>
                  <p className="text-2xl font-bold">{totalResponses}</p>
                </div>
                <History className="h-8 w-8 text-ai-blue" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Success Rate</p>
                  <p className="text-2xl font-bold">{Math.round((successfulResponses / totalResponses) * 100)}%</p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Avg Response Time</p>
                  <p className="text-2xl font-bold">{avgResponseTime.toFixed(1)}s</p>
                </div>
                <Clock className="h-8 w-8 text-ai-purple" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Avg Satisfaction</p>
                  <p className="text-2xl font-bold">{avgSatisfaction.toFixed(1)}/5</p>
                </div>
                <Star className="h-8 w-8 text-yellow-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Response Trend Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Response Activity Trend</CardTitle>
            <CardDescription>Daily response volume and success rate over the last week</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={historyData}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis dataKey="date" fontSize={12} />
                <YAxis fontSize={12} />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="responses"
                  stroke="#10b981"
                  strokeWidth={3}
                  dot={{ fill: "#10b981", strokeWidth: 2, r: 4 }}
                  name="Total Responses"
                />
                <Line
                  type="monotone"
                  dataKey="success"
                  stroke="#10b981"
                  strokeWidth={2}
                  dot={{ fill: "#10b981", strokeWidth: 2, r: 3 }}
                  name="Successful"
                />
                <Line
                  type="monotone"
                  dataKey="failed"
                  stroke="#ef4444"
                  strokeWidth={2}
                  dot={{ fill: "#ef4444", strokeWidth: 2, r: 3 }}
                  name="Failed"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Filters */}
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-wrap gap-4 items-center">
              <div className="flex-1 min-w-[200px]">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search responses..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <select 
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="px-3 py-2 border rounded-md"
                >
                  <option value="all">All Dates</option>
                  <option value="today">Today</option>
                  <option value="yesterday">Yesterday</option>
                  <option value="week">This Week</option>
                  <option value="month">This Month</option>
                </select>
                <select 
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="px-3 py-2 border rounded-md"
                >
                  <option value="all">All Status</option>
                  <option value="success">Success</option>
                  <option value="failed">Failed</option>
                </select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* History Table */}
        <Card>
          <CardHeader>
            <CardTitle>Response History</CardTitle>
            <CardDescription>Detailed log of all AI responses</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {responseHistory.map((response) => (
                <div key={response.id} className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 flex-1">
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(response.status)}
                        <div className="text-sm">
                          <div className="font-medium">{response.date} {response.time}</div>
                        </div>
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <p className="text-sm font-medium truncate">
                            To: {response.to}
                          </p>
                          <Badge className={getStatusColor(response.status)}>
                            {response.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground truncate mb-2">
                          {response.subject}
                        </p>
                        <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                          <div className="flex items-center space-x-1">
                            <Globe className="h-3 w-3" />
                            <span>{response.language}</span>
                          </div>
                          <span>Response: {response.responseTime}</span>
                          <span>Template: {response.template}</span>
                          <span>Model: {response.aiModel}</span>
                          {response.satisfaction && (
                            <div className="flex items-center space-x-1">
                              <Star className="h-3 w-3 text-yellow-500" />
                              <span>{response.satisfaction}</span>
                            </div>
                          )}
                        </div>
                        {response.error && (
                          <div className="mt-2">
                            <Badge variant="destructive" className="text-xs">
                              Error: {response.error}
                            </Badge>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
  );
}