import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Mail, 
  Brain, 
  Settings, 
  BarChart3, 
  Zap, 
  Plus, 
  Trash2, 
  Edit, 
  CheckCircle,
  AlertCircle,
  Globe,
  Crown,
  CreditCard
} from "lucide-react";

const UserDashboard = () => {
  const [emailAddresses, setEmailAddresses] = useState([
    { id: 1, email: "support@company.com", status: "active", responses: 234 },
    { id: 2, email: "info@company.com", status: "active", responses: 156 },
    { id: 3, email: "sales@company.com", status: "paused", responses: 89 }
  ]);

  const [newEmail, setNewEmail] = useState("");

  // Mock user data
  const user = {
    name: "TechStart AS",
    email: "contact@techstart.no",
    plan: "Professional",
    usage: {
      current: 3420,
      limit: 5000,
      percentage: 68.4
    },
    subscription: {
      status: "active",
      nextBilling: "2024-02-15",
      amount: "799 NOK"
    }
  };

  const stats = {
    totalEmails: 3420,
    totalResponses: 3156,
    responseRate: 92.3,
    avgResponseTime: "1.8s",
    languages: ["Norwegian", "English", "Swedish"]
  };

  const recentActivity = [
    { id: 1, email: "customer@example.com", subject: "Support inquiry", response: "Auto-replied", time: "2 min ago" },
    { id: 2, email: "prospect@business.no", subject: "Product information", response: "Auto-replied", time: "15 min ago" },
    { id: 3, email: "partner@company.se", subject: "Partnership proposal", response: "Auto-replied", time: "1 hour ago" },
    { id: 4, email: "feedback@client.dk", subject: "Service feedback", response: "Auto-replied", time: "2 hours ago" }
  ];

  const addEmailAddress = () => {
    if (newEmail) {
      const newEmailObj = {
        id: emailAddresses.length + 1,
        email: newEmail,
        status: "pending",
        responses: 0
      };
      setEmailAddresses([...emailAddresses, newEmailObj]);
      setNewEmail("");
    }
  };

  const removeEmailAddress = (id: number) => {
    setEmailAddresses(emailAddresses.filter(addr => addr.id !== id));
  };

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
                <h1 className="text-2xl font-bold">Dashboard</h1>
                <p className="text-sm text-muted-foreground">Welcome back, {user.name}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="outline" className="flex items-center gap-1">
                <Crown className="h-3 w-3" />
                {user.plan}
              </Badge>
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Usage Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Emails Processed</CardTitle>
              <Mail className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalEmails}</div>
              <div className="flex items-center mt-2">
                <Progress value={user.usage.percentage} className="flex-1 mr-2" />
                <span className="text-xs text-muted-foreground">{user.usage.current}/{user.usage.limit}</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Response Rate</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.responseRate}%</div>
              <p className="text-xs text-muted-foreground">
                {stats.totalResponses} responses sent
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
                Faster than 95% of users
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Languages</CardTitle>
              <Globe className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.languages.length}</div>
              <p className="text-xs text-muted-foreground">
                {stats.languages.join(", ")}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="emails">Email Setup</TabsTrigger>
            <TabsTrigger value="ai-settings">AI Settings</TabsTrigger>
            <TabsTrigger value="billing">Billing</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Activity */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5" />
                    Recent Activity
                  </CardTitle>
                  <CardDescription>Latest email responses generated</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentActivity.map((activity) => (
                      <div key={activity.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex-1">
                          <div className="font-medium text-sm">{activity.subject}</div>
                          <div className="text-xs text-muted-foreground">{activity.email}</div>
                        </div>
                        <div className="text-right">
                          <Badge variant="outline" className="text-xs">
                            {activity.response}
                          </Badge>
                          <div className="text-xs text-muted-foreground mt-1">{activity.time}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Email Addresses Status */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Mail className="h-5 w-5" />
                    Connected Email Addresses
                  </CardTitle>
                  <CardDescription>Your configured email addresses</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {emailAddresses.map((addr) => (
                      <div key={addr.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className={`w-3 h-3 rounded-full ${addr.status === 'active' ? 'bg-ai-green' : addr.status === 'paused' ? 'bg-ai-orange' : 'bg-gray-400'}`}></div>
                          <div>
                            <div className="font-medium text-sm">{addr.email}</div>
                            <div className="text-xs text-muted-foreground">{addr.responses} responses</div>
                          </div>
                        </div>
                        <Badge variant={addr.status === 'active' ? 'default' : 'secondary'}>
                          {addr.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="emails" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Email Configuration</CardTitle>
                <CardDescription>Manage your email addresses and integration settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Add New Email */}
                <div className="space-y-2">
                  <Label htmlFor="new-email">Add New Email Address</Label>
                  <div className="flex space-x-2">
                    <Input
                      id="new-email"
                      placeholder="support@yourcompany.com"
                      value={newEmail}
                      onChange={(e) => setNewEmail(e.target.value)}
                    />
                    <Button onClick={addEmailAddress}>
                      <Plus className="h-4 w-4 mr-2" />
                      Add
                    </Button>
                  </div>
                </div>

                {/* Email List */}
                <div className="space-y-4">
                  <h4 className="font-medium">Configured Email Addresses</h4>
                  {emailAddresses.map((addr) => (
                    <div key={addr.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className={`w-4 h-4 rounded-full ${addr.status === 'active' ? 'bg-ai-green' : addr.status === 'paused' ? 'bg-ai-orange' : 'bg-gray-400'}`}></div>
                        <div>
                          <div className="font-medium">{addr.email}</div>
                          <div className="text-sm text-muted-foreground">
                            {addr.responses} responses • Status: {addr.status}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch checked={addr.status === 'active'} />
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => removeEmailAddress(addr.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="ai-settings" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>AI Response Settings</CardTitle>
                  <CardDescription>Configure how the AI responds to emails</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-base">Auto-Reply Enabled</Label>
                      <p className="text-sm text-muted-foreground">Automatically respond to incoming emails</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-base">Marketing Mode</Label>
                      <p className="text-sm text-muted-foreground">Include promotional content in responses</p>
                    </div>
                    <Switch />
                  </div>

                  <div className="space-y-2">
                    <Label>Response Tone</Label>
                    <select className="w-full p-2 border rounded-md">
                      <option>Professional</option>
                      <option>Friendly</option>
                      <option>Formal</option>
                      <option>Casual</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <Label>Default Language</Label>
                    <select className="w-full p-2 border rounded-md">
                      <option>Auto-detect</option>
                      <option>Norwegian</option>
                      <option>English</option>
                      <option>Swedish</option>
                      <option>Danish</option>
                    </select>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>AI Model Settings</CardTitle>
                  <CardDescription>Advanced AI configuration options</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>AI Model Version</Label>
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <div className="font-medium">GPT-4</div>
                        <div className="text-sm text-muted-foreground">Latest version</div>
                      </div>
                      <Badge>Current</Badge>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Response Length</Label>
                    <select className="w-full p-2 border rounded-md">
                      <option>Concise</option>
                      <option>Balanced</option>
                      <option>Detailed</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <Label>Context Awareness</Label>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Use email history for context</span>
                      <Switch defaultChecked />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="billing" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="h-5 w-5" />
                    Current Subscription
                  </CardTitle>
                  <CardDescription>Your current plan and usage</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Plan</span>
                    <Badge variant="outline">{user.plan}</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Status</span>
                    <Badge className="bg-ai-green">Active</Badge>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="font-medium">Next Billing</span>
                    <span className="text-sm">{user.subscription.nextBilling}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="font-medium">Amount</span>
                    <span className="text-sm font-bold">{user.subscription.amount}</span>
                  </div>

                  <div className="pt-4 space-y-2">
                    <Button variant="outline" className="w-full">
                      Manage Subscription
                    </Button>
                    <Button variant="gradient" className="w-full">
                      Upgrade Plan
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Usage This Month</CardTitle>
                  <CardDescription>Your current usage and limits</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Emails Processed</span>
                      <span className="text-sm font-medium">{user.usage.current}/{user.usage.limit}</span>
                    </div>
                    <Progress value={user.usage.percentage} />
                    <p className="text-xs text-muted-foreground">
                      {user.usage.limit - user.usage.current} emails remaining this month
                    </p>
                  </div>

                  <div className="pt-4">
                    <div className="text-sm font-medium mb-2">Need more emails?</div>
                    <p className="text-sm text-muted-foreground mb-4">
                      Upgrade to Professional for 5,000 emails/month or Enterprise for unlimited emails.
                    </p>
                    <Button variant="outline" className="w-full">
                      View All Plans
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default UserDashboard;