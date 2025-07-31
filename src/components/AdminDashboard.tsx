import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  BarChart3, 
  TrendingUp, 
  Mail, 
  Users, 
  Globe, 
  Zap, 
  Brain,
  Settings,
  Bell,
  Search,
  Filter,
  Download,
  RefreshCw,
  MoreVertical
} from "lucide-react";

const AdminDashboard = () => {
  const [timeRange, setTimeRange] = useState("7d");

  // Mock data
  const stats = {
    totalEmails: 12847,
    totalResponses: 11923,
    responseRate: 92.8,
    activeUsers: 847,
    avgResponseTime: "2.3s",
    monthlyGrowth: 23.5
  };

  const emailMetrics = [
    { period: "Today", emails: 423, responses: 391, rate: 92.4 },
    { period: "Yesterday", emails: 398, responses: 365, rate: 91.7 },
    { period: "This Week", emails: 2847, responses: 2641, rate: 92.8 },
    { period: "Last Week", emails: 2634, responses: 2401, rate: 91.2 },
    { period: "This Month", emails: 12847, responses: 11923, rate: 92.8 },
    { period: "Last Month", emails: 10234, responses: 9245, rate: 90.3 }
  ];

  const languageStats = [
    { language: "Norwegian", count: 4234, percentage: 45.2 },
    { language: "English", count: 3821, percentage: 40.8 },
    { language: "Swedish", count: 891, percentage: 9.5 },
    { language: "Danish", count: 423, percentage: 4.5 }
  ];

  const recentUsers = [
    { id: 1, name: "TechStart AS", email: "contact@techstart.no", plan: "Professional", status: "Active", emails: 234 },
    { id: 2, name: "Nordic Solutions", email: "info@nordic.se", plan: "Enterprise", status: "Active", emails: 892 },
    { id: 3, name: "Digital Agency", email: "hello@digital.dk", plan: "Starter", status: "Trial", emails: 45 },
    { id: 4, name: "Consulting Group", email: "support@consulting.no", plan: "Professional", status: "Active", emails: 567 },
    { id: 5, name: "E-commerce Store", email: "cs@store.se", plan: "Enterprise", status: "Active", emails: 1234 }
  ];

  const topPerformers = [
    { domain: "techstart.no", emails: 892, responses: 845, rate: 94.7 },
    { domain: "nordic.se", emails: 734, responses: 698, rate: 95.1 },
    { domain: "digital.dk", emails: 567, responses: 523, rate: 92.2 },
    { domain: "consulting.no", emails: 423, responses: 389, rate: 92.0 },
    { domain: "store.se", emails: 389, responses: 356, rate: 91.5 }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-gradient-to-r from-ai-blue to-ai-purple rounded-lg flex items-center justify-center">
                <Brain className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">Admin Dashboard</h1>
                <p className="text-sm text-muted-foreground">Respondly Genius Management Console</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
              <Button variant="outline" size="sm">
                <Bell className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Emails</CardTitle>
              <Mail className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalEmails.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-ai-green">+{stats.monthlyGrowth}%</span> from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Response Rate</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.responseRate}%</div>
              <Progress value={stats.responseRate} className="mt-2" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.activeUsers}</div>
              <p className="text-xs text-muted-foreground">
                Across all subscription tiers
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Response Time</CardTitle>
              <Zap className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.avgResponseTime}</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-ai-green">-0.4s</span> from last week
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Email Metrics */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5" />
                    Email Metrics
                  </CardTitle>
                  <CardDescription>Email processing statistics over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {emailMetrics.map((metric, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex flex-col">
                          <span className="text-sm font-medium">{metric.period}</span>
                          <span className="text-xs text-muted-foreground">{metric.emails} emails</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="text-right">
                            <div className="text-sm font-medium">{metric.responses} responses</div>
                            <div className="text-xs text-muted-foreground">{metric.rate}% rate</div>
                          </div>
                          <Progress value={metric.rate} className="w-20" />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Language Distribution */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Globe className="h-5 w-5" />
                    Language Distribution
                  </CardTitle>
                  <CardDescription>Email languages processed this month</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {languageStats.map((lang, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">{lang.language}</span>
                          <span className="text-sm text-muted-foreground">{lang.count} ({lang.percentage}%)</span>
                        </div>
                        <Progress value={lang.percentage} className="h-2" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="users" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>User Management</CardTitle>
                    <CardDescription>Manage customer accounts and subscriptions</CardDescription>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm">
                      <Filter className="h-4 w-4 mr-2" />
                      Filter
                    </Button>
                    <Button variant="outline" size="sm">
                      <Search className="h-4 w-4 mr-2" />
                      Search
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentUsers.map((user) => (
                    <div key={user.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-gradient-to-r from-ai-blue to-ai-purple rounded-full flex items-center justify-center text-white font-semibold">
                          {user.name.charAt(0)}
                        </div>
                        <div>
                          <div className="font-medium">{user.name}</div>
                          <div className="text-sm text-muted-foreground">{user.email}</div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <Badge variant={user.status === "Active" ? "default" : "secondary"}>
                          {user.status}
                        </Badge>
                        <Badge variant="outline">{user.plan}</Badge>
                        <div className="text-right">
                          <div className="text-sm font-medium">{user.emails} emails</div>
                          <div className="text-xs text-muted-foreground">this month</div>
                        </div>
                        <Button variant="outline" size="sm">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Usage Trends</CardTitle>
                  <CardDescription>Email processing trends over the last 30 days</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center text-muted-foreground">
                    📊 Interactive chart would be displayed here
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Response Quality</CardTitle>
                  <CardDescription>AI response quality metrics</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Accuracy Score</span>
                      <span className="text-sm font-medium">94.7%</span>
                    </div>
                    <Progress value={94.7} />
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm">User Satisfaction</span>
                      <span className="text-sm font-medium">91.2%</span>
                    </div>
                    <Progress value={91.2} />
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Context Understanding</span>
                      <span className="text-sm font-medium">96.1%</span>
                    </div>
                    <Progress value={96.1} />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="performance" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Top Performing Domains</CardTitle>
                <CardDescription>Domains with highest response rates</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topPerformers.map((performer, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-gradient-to-r from-ai-green to-ai-blue rounded-full flex items-center justify-center text-white text-sm font-semibold">
                          {index + 1}
                        </div>
                        <div>
                          <div className="font-medium">{performer.domain}</div>
                          <div className="text-sm text-muted-foreground">
                            {performer.emails} emails processed
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-ai-green">{performer.rate}%</div>
                        <div className="text-xs text-muted-foreground">response rate</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>System Configuration</CardTitle>
                  <CardDescription>Manage platform settings</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">AI Model Version</div>
                      <div className="text-sm text-muted-foreground">Currently using GPT-4</div>
                    </div>
                    <Badge>Latest</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">API Rate Limit</div>
                      <div className="text-sm text-muted-foreground">Requests per minute</div>
                    </div>
                    <span className="text-sm font-medium">1000/min</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Auto-scaling</div>
                      <div className="text-sm text-muted-foreground">Automatically scale resources</div>
                    </div>
                    <Badge variant="outline">Enabled</Badge>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Monitoring & Alerts</CardTitle>
                  <CardDescription>System health and notifications</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">System Status</div>
                      <div className="text-sm text-muted-foreground">All systems operational</div>
                    </div>
                    <Badge className="bg-ai-green">Healthy</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Last Backup</div>
                      <div className="text-sm text-muted-foreground">Automated daily backups</div>
                    </div>
                    <span className="text-sm font-medium">2h ago</span>
                  </div>
                  <Button variant="outline" className="w-full">
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Refresh System Status
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;