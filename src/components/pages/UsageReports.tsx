import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  Activity, 
  Calendar,
  Download,
  Filter,
  TrendingUp,
  TrendingDown,
  Zap,
  Users,
  Mail,
  Clock,
  BarChart3,
  PieChart
} from "lucide-react";
import { Bar, BarChart, Line, LineChart, Area, AreaChart, Pie, PieChart as RechartsPieChart, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const usageOverTime = [
  { date: "Jan 01", emails: 45, apiCalls: 180, storage: 1.2, cost: 129 },
  { date: "Jan 07", emails: 67, apiCalls: 268, storage: 1.3, cost: 156 },
  { date: "Jan 14", emails: 89, apiCalls: 356, storage: 1.5, cost: 198 },
  { date: "Jan 21", emails: 124, apiCalls: 496, storage: 1.8, cost: 267 },
  { date: "Jan 28", emails: 156, apiCalls: 624, storage: 2.1, cost: 334 }
];

const usageByFeature = [
  { feature: "Email Processing", usage: 65, cost: 245, color: "#3b82f6" },
  { feature: "AI Responses", usage: 25, cost: 89, color: "#8b5cf6" },
  { feature: "Templates", usage: 6, cost: 23, color: "#06b6d4" },
  { feature: "Analytics", usage: 3, cost: 12, color: "#10b981" },
  { feature: "API Calls", usage: 1, cost: 4, color: "#f59e0b" }
];

const usageByTeamMember = [
  { name: "John Doe", role: "Owner", emails: 456, apiCalls: 1824, lastActive: "2 min ago", usage: 85 },
  { name: "Sarah Nielsen", role: "Admin", emails: 289, apiCalls: 1156, lastActive: "1 hour ago", usage: 65 },
  { name: "Erik Larsen", role: "Member", emails: 167, apiCalls: 668, lastActive: "3 hours ago", usage: 45 },
  { name: "Maria Svensson", role: "Member", emails: 89, apiCalls: 356, lastActive: "1 day ago", usage: 25 }
];

const monthlyUsage = [
  { month: "Aug 2023", emails: 2340, apiCalls: 9360, storage: 4.2, cost: 789 },
  { month: "Sep 2023", emails: 2890, apiCalls: 11560, storage: 4.8, cost: 967 },
  { month: "Oct 2023", emails: 3120, apiCalls: 12480, storage: 5.1, cost: 1034 },
  { month: "Nov 2023", emails: 2780, apiCalls: 11120, storage: 4.9, cost: 923 },
  { month: "Dec 2023", emails: 3450, apiCalls: 13800, storage: 5.6, cost: 1156 },
  { month: "Jan 2024", emails: 3890, apiCalls: 15560, storage: 6.2, cost: 1289 }
];

const hourlyUsage = [
  { hour: "00", emails: 12, load: 15 },
  { hour: "04", emails: 8, load: 10 },
  { hour: "08", emails: 45, load: 60 },
  { hour: "12", emails: 89, load: 85 },
  { hour: "16", emails: 124, load: 100 },
  { hour: "20", emails: 67, load: 45 }
];

const quotaLimits = [
  { name: "Email Processing", current: 3420, limit: 5000, percentage: 68.4, trend: "+12%" },
  { name: "API Calls", current: 13680, limit: 20000, percentage: 68.4, trend: "+8%" },
  { name: "Storage", current: 2.1, limit: 5, percentage: 42, trend: "+15%", unit: "GB" },
  { name: "Team Members", current: 4, limit: 10, percentage: 40, trend: "0%" }
];

export function UsageReports() {
  const totalEmails = usageOverTime.reduce((sum, item) => sum + item.emails, 0);
  const totalCost = usageOverTime.reduce((sum, item) => sum + item.cost, 0);
  const avgDailyUsage = totalEmails / usageOverTime.length;
  
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Usage Reports</h1>
            <p className="text-muted-foreground">Detailed usage analytics and resource consumption</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline">
              <Calendar className="mr-2 h-4 w-4" />
              Custom Range
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
                  <p className="text-sm text-muted-foreground">Total Emails</p>
                  <p className="text-2xl font-bold">{totalEmails}</p>
                  <div className="flex items-center text-xs text-green-600">
                    <TrendingUp className="mr-1 h-3 w-3" />
                    +15% vs last period
                  </div>
                </div>
                <Mail className="h-8 w-8 text-ai-blue" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">API Calls</p>
                  <p className="text-2xl font-bold">{(totalEmails * 4).toLocaleString()}</p>
                  <div className="flex items-center text-xs text-green-600">
                    <TrendingUp className="mr-1 h-3 w-3" />
                    +12% vs last period
                  </div>
                </div>
                <Zap className="h-8 w-8 text-ai-purple" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Daily Average</p>
                  <p className="text-2xl font-bold">{Math.round(avgDailyUsage)}</p>
                  <div className="flex items-center text-xs text-red-600">
                    <TrendingUp className="mr-1 h-3 w-3" />
                    +8% vs last period
                  </div>
                </div>
                <Activity className="h-8 w-8 text-ai-green" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Cost</p>
                  <p className="text-2xl font-bold">{totalCost} NOK</p>
                  <div className="flex items-center text-xs text-green-600">
                    <TrendingUp className="mr-1 h-3 w-3" />
                    +10% vs last period
                  </div>
                </div>
                <BarChart3 className="h-8 w-8 text-ai-orange" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="quotas">Quotas & Limits</TabsTrigger>
            <TabsTrigger value="team">Team Usage</TabsTrigger>
            <TabsTrigger value="trends">Trends</TabsTrigger>
            <TabsTrigger value="costs">Cost Analysis</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              {/* Usage Over Time */}
              <Card>
                <CardHeader>
                  <CardTitle>Usage Over Time</CardTitle>
                  <CardDescription>Email processing volume over the last month</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={usageOverTime}>
                      <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                      <XAxis dataKey="date" fontSize={12} />
                      <YAxis fontSize={12} />
                      <Tooltip />
                      <Area
                        type="monotone"
                        dataKey="emails"
                        stroke="#3b82f6"
                        fill="#3b82f6"
                        fillOpacity={0.6}
                        name="Emails Processed"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Usage by Feature */}
              <Card>
                <CardHeader>
                  <CardTitle>Usage by Feature</CardTitle>
                  <CardDescription>Resource consumption breakdown</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <RechartsPieChart>
                      <Pie
                        data={usageByFeature}
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="usage"
                        label={({ feature, usage }) => `${feature}: ${usage}%`}
                      >
                        {usageByFeature.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </RechartsPieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            {/* Hourly Usage Pattern */}
            <Card>
              <CardHeader>
                <CardTitle>Hourly Usage Pattern</CardTitle>
                <CardDescription>Email processing load throughout the day</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={hourlyUsage}>
                    <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                    <XAxis dataKey="hour" fontSize={12} />
                    <YAxis fontSize={12} />
                    <Tooltip />
                    <Bar dataKey="emails" fill="#8b5cf6" name="Emails" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="quotas" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Current Usage vs Limits</CardTitle>
                <CardDescription>Monitor your plan limits and usage</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {quotaLimits.map((quota, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">{quota.name}</h4>
                        <div className="flex items-center space-x-2">
                          <Badge 
                            variant={quota.percentage > 80 ? "destructive" : quota.percentage > 60 ? "default" : "secondary"}
                          >
                            {quota.trend}
                          </Badge>
                          <span className="text-sm text-muted-foreground">
                            {quota.current.toLocaleString()}{quota.unit ? ` ${quota.unit}` : ''} / {quota.limit.toLocaleString()}{quota.unit ? ` ${quota.unit}` : ''}
                          </span>
                        </div>
                      </div>
                      <Progress 
                        value={quota.percentage} 
                        className={`h-3 ${quota.percentage > 80 ? 'text-red-500' : quota.percentage > 60 ? 'text-yellow-500' : 'text-green-500'}`}
                      />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>{quota.percentage}% used</span>
                        <span>{quota.limit - quota.current} remaining</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quota Alerts */}
            <Card>
              <CardHeader>
                <CardTitle>Quota Alerts</CardTitle>
                <CardDescription>Get notified before reaching limits</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 border rounded-lg bg-yellow-50/50">
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                      <div>
                        <p className="font-medium">Email Processing Limit</p>
                        <p className="text-sm text-muted-foreground">You've used 68% of your monthly limit</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">Configure Alert</Button>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <div>
                        <p className="font-medium">All Other Limits</p>
                        <p className="text-sm text-muted-foreground">Usage within normal ranges</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">View Details</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="team" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Team Member Usage</CardTitle>
                <CardDescription>Individual usage breakdown by team member</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {usageByTeamMember.map((member, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-ai-blue to-ai-purple rounded-full flex items-center justify-center text-white font-bold">
                          {member.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <h4 className="font-medium">{member.name}</h4>
                          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                            <Badge variant="outline" className="text-xs">{member.role}</Badge>
                            <span>Last active: {member.lastActive}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-6">
                        <div className="text-center">
                          <div className="font-bold">{member.emails}</div>
                          <div className="text-xs text-muted-foreground">Emails</div>
                        </div>
                        <div className="text-center">
                          <div className="font-bold">{member.apiCalls.toLocaleString()}</div>
                          <div className="text-xs text-muted-foreground">API Calls</div>
                        </div>
                        <div className="w-24">
                          <div className="text-xs text-muted-foreground mb-1">Usage</div>
                          <Progress value={member.usage} className="h-2" />
                          <div className="text-xs text-muted-foreground mt-1">{member.usage}%</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="trends" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Monthly Usage Trends</CardTitle>
                <CardDescription>Long-term usage patterns and growth</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <LineChart data={monthlyUsage}>
                    <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                    <XAxis dataKey="month" fontSize={12} />
                    <YAxis fontSize={12} />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="emails"
                      stroke="#3b82f6"
                      strokeWidth={3}
                      dot={{ fill: "#3b82f6", strokeWidth: 2, r: 4 }}
                      name="Emails Processed"
                    />
                    <Line
                      type="monotone"
                      dataKey="apiCalls"
                      stroke="#8b5cf6"
                      strokeWidth={2}
                      dot={{ fill: "#8b5cf6", strokeWidth: 2, r: 3 }}
                      name="API Calls"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Growth Metrics */}
            <div className="grid gap-4 md:grid-cols-3">
              <Card>
                <CardContent className="p-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">+23%</div>
                    <div className="text-sm text-muted-foreground">Email Growth (MoM)</div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">+19%</div>
                    <div className="text-sm text-muted-foreground">API Usage Growth (MoM)</div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">+15%</div>
                    <div className="text-sm text-muted-foreground">Storage Growth (MoM)</div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="costs" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Cost Analysis</CardTitle>
                <CardDescription>Detailed breakdown of usage costs</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={usageOverTime}>
                    <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                    <XAxis dataKey="date" fontSize={12} />
                    <YAxis fontSize={12} />
                    <Tooltip />
                    <Area
                      type="monotone"
                      dataKey="cost"
                      stroke="#f59e0b"
                      fill="#f59e0b"
                      fillOpacity={0.6}
                      name="Cost (NOK)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Cost Breakdown */}
            <Card>
              <CardHeader>
                <CardTitle>Cost Breakdown by Feature</CardTitle>
                <CardDescription>Where your money is being spent</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {usageByFeature.map((feature, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div 
                          className="w-4 h-4 rounded-full" 
                          style={{ backgroundColor: feature.color }}
                        ></div>
                        <span className="font-medium">{feature.feature}</span>
                      </div>
                      <div className="text-right">
                        <div className="font-bold">{feature.cost} NOK</div>
                        <div className="text-xs text-muted-foreground">{feature.usage}% of total</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}