import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Zap, 
  Mail,
  Globe,
  Settings,
  CheckCircle,
  XCircle,
  Plus,
  ExternalLink,
  AlertCircle,
  Webhook,
  Key,
  Shield,
  Clock,
  Activity,
  Link as LinkIcon
} from "lucide-react";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";

const emailProviders = [
  {
    id: "gmail",
    name: "Gmail",
    description: "Connect your Gmail account for seamless email automation",
    icon: "📧",
    status: "connected",
    accounts: 3,
    lastSync: "2 minutes ago",
    features: ["OAuth 2.0", "Real-time sync", "Labels support", "Attachments"],
    setupComplexity: "Easy"
  },
  {
    id: "outlook",
    name: "Microsoft Outlook",
    description: "Integrate with Outlook and Office 365 for enterprise email management",
    icon: "🔵",
    status: "connected",
    accounts: 2,
    lastSync: "5 minutes ago",
    features: ["OAuth 2.0", "Exchange support", "Folders sync", "Calendar integration"],
    setupComplexity: "Easy"
  },
  {
    id: "imap",
    name: "IMAP/SMTP",
    description: "Connect any email provider using IMAP and SMTP protocols",
    icon: "📮",
    status: "available",
    accounts: 0,
    lastSync: "Never",
    features: ["Universal support", "SSL/TLS encryption", "Custom ports", "Authentication"],
    setupComplexity: "Medium"
  },
  {
    id: "yahoo",
    name: "Yahoo Mail",
    description: "Connect your Yahoo Mail account",
    icon: "🟣",
    status: "available",
    accounts: 0,
    lastSync: "Never",
    features: ["OAuth 2.0", "Real-time sync", "Folder support"],
    setupComplexity: "Easy"
  }
];

const businessTools = [
  {
    id: "slack",
    name: "Slack",
    description: "Get notifications and manage responses directly in Slack",
    icon: "💬",
    status: "available",
    category: "Communication",
    features: ["Real-time notifications", "Slash commands", "Channel integration", "DM alerts"]
  },
  {
    id: "teams",
    name: "Microsoft Teams",
    description: "Integrate with Teams for collaborative email management",
    icon: "🔷",
    status: "available",
    category: "Communication",
    features: ["Team notifications", "Bot integration", "Workflow automation"]
  },
  {
    id: "zendesk",
    name: "Zendesk",
    description: "Sync with Zendesk for unified customer support",
    icon: "🎫",
    status: "connected",
    category: "Support",
    features: ["Ticket sync", "Customer context", "SLA integration", "Agent assignment"]
  },
  {
    id: "salesforce",
    name: "Salesforce",
    description: "Connect with Salesforce CRM for customer data enrichment",
    icon: "☁️",
    status: "available",
    category: "CRM",
    features: ["Contact sync", "Lead management", "Opportunity tracking", "Activity logging"]
  },
  {
    id: "hubspot",
    name: "HubSpot",
    description: "Integrate with HubSpot CRM and marketing tools",
    icon: "🧡",
    status: "available",
    category: "CRM",
    features: ["Contact management", "Deal tracking", "Marketing automation", "Analytics"]
  }
];

const apiKeys = [
  {
    id: 1,
    name: "Production API Key",
    key: "rsp_live_aBcDeFgHiJkLmNoPqRsTuVwXyZ123456",
    created: "2024-01-15",
    lastUsed: "2 minutes ago",
    permissions: ["read", "write"],
    status: "active"
  },
  {
    id: 2,
    name: "Development API Key",
    key: "rsp_test_123456aBcDeFgHiJkLmNoPqRsTuVwXyZ",
    created: "2024-01-10",
    lastUsed: "1 week ago",
    permissions: ["read"],
    status: "active"
  }
];

const webhooks = [
  {
    id: 1,
    name: "Email Processed Webhook",
    url: "https://your-app.com/webhooks/email-processed",
    events: ["email.received", "email.responded", "email.failed"],
    status: "active",
    lastTriggered: "5 minutes ago",
    totalCalls: 1248
  },
  {
    id: 2,
    name: "Analytics Webhook",
    url: "https://analytics.company.com/respondly-data",
    events: ["analytics.daily", "analytics.weekly"],
    status: "inactive",
    lastTriggered: "Never",
    totalCalls: 0
  }
];

export function Integrations() {
  const [selectedProvider, setSelectedProvider] = useState<string | null>(null);
  const [isApiKeyDialogOpen, setIsApiKeyDialogOpen] = useState(false);
  const [isWebhookDialogOpen, setIsWebhookDialogOpen] = useState(false);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "connected":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "available":
        return <Plus className="h-4 w-4 text-gray-400" />;
      case "error":
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return <Clock className="h-4 w-4 text-yellow-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "connected":
        return "bg-green-100 text-green-800";
      case "active":
        return "bg-green-100 text-green-800";
      case "available":
        return "bg-gray-100 text-gray-800";
      case "error":
        return "bg-red-100 text-red-800";
      case "inactive":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Integrations</h1>
            <p className="text-muted-foreground">Connect your favorite tools and services</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline">
              <Activity className="mr-2 h-4 w-4" />
              Connection Status
            </Button>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Browse All
            </Button>
          </div>
        </div>

        {/* Integration Stats */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Email Accounts</p>
                  <p className="text-2xl font-bold">5</p>
                </div>
                <Mail className="h-8 w-8 text-ai-blue" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Active Integrations</p>
                  <p className="text-2xl font-bold">3</p>
                </div>
                <Zap className="h-8 w-8 text-ai-purple" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">API Calls Today</p>
                  <p className="text-2xl font-bold">1,248</p>
                </div>
                <Activity className="h-8 w-8 text-ai-green" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Webhooks</p>
                  <p className="text-2xl font-bold">2</p>
                </div>
                <Webhook className="h-8 w-8 text-ai-orange" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Tabs */}
        <Tabs defaultValue="email" className="space-y-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="email">Email Providers</TabsTrigger>
            <TabsTrigger value="business">Business Tools</TabsTrigger>
            <TabsTrigger value="api">API & Webhooks</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="email" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Email Provider Integrations</CardTitle>
                <CardDescription>Connect your email accounts for AI-powered automation</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  {emailProviders.map((provider) => (
                    <div key={provider.id} className="border rounded-lg p-6 hover:shadow-md transition-shadow">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <div className="text-2xl">{provider.icon}</div>
                          <div>
                            <h3 className="font-semibold">{provider.name}</h3>
                            <Badge className={getStatusColor(provider.status)}>
                              {getStatusIcon(provider.status)}
                              <span className="ml-1 capitalize">{provider.status}</span>
                            </Badge>
                          </div>
                        </div>
                        <Badge variant="outline">{provider.setupComplexity}</Badge>
                      </div>
                      
                      <p className="text-sm text-muted-foreground mb-4">{provider.description}</p>
                      
                      {provider.status === "connected" && (
                        <div className="mb-4 p-3 bg-green-50 rounded-lg">
                          <div className="flex items-center justify-between text-sm">
                            <span>{provider.accounts} accounts connected</span>
                            <span className="text-muted-foreground">Last sync: {provider.lastSync}</span>
                          </div>
                        </div>
                      )}
                      
                      <div className="space-y-2 mb-4">
                        <p className="text-sm font-medium">Features:</p>
                        <div className="flex flex-wrap gap-1">
                          {provider.features.map((feature, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {feature}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      <div className="flex space-x-2">
                        {provider.status === "connected" ? (
                          <>
                            <Button size="sm" variant="outline" className="flex-1">
                              <Settings className="mr-2 h-4 w-4" />
                              Configure
                            </Button>
                            <Button size="sm" variant="outline">
                              <Plus className="mr-2 h-4 w-4" />
                              Add Account
                            </Button>
                          </>
                        ) : (
                          <Button size="sm" className="flex-1">
                            <LinkIcon className="mr-2 h-4 w-4" />
                            Connect
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="business" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Business Tool Integrations</CardTitle>
                <CardDescription>Connect with your existing business tools and workflows</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {businessTools.map((tool) => (
                    <div key={tool.id} className="border rounded-lg p-6 hover:shadow-md transition-shadow">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <div className="text-2xl">{tool.icon}</div>
                          <div>
                            <h3 className="font-semibold">{tool.name}</h3>
                            <Badge variant="outline" className="text-xs">
                              {tool.category}
                            </Badge>
                          </div>
                        </div>
                        {getStatusIcon(tool.status)}
                      </div>
                      
                      <p className="text-sm text-muted-foreground mb-4">{tool.description}</p>
                      
                      <div className="space-y-2 mb-4">
                        <p className="text-sm font-medium">Features:</p>
                        <ul className="text-xs space-y-1">
                          {tool.features.map((feature, index) => (
                            <li key={index} className="flex items-center space-x-2">
                              <CheckCircle className="h-3 w-3 text-green-500" />
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <Button size="sm" className="w-full" variant={tool.status === "connected" ? "outline" : "default"}>
                        {tool.status === "connected" ? (
                          <>
                            <Settings className="mr-2 h-4 w-4" />
                            Configure
                          </>
                        ) : (
                          <>
                            <LinkIcon className="mr-2 h-4 w-4" />
                            Connect
                          </>
                        )}
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="api" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              {/* API Keys */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>API Keys</CardTitle>
                      <CardDescription>Manage your API keys for custom integrations</CardDescription>
                    </div>
                    <Dialog open={isApiKeyDialogOpen} onOpenChange={setIsApiKeyDialogOpen}>
                      <DialogTrigger asChild>
                        <Button size="sm">
                          <Plus className="mr-2 h-4 w-4" />
                          New Key
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Create API Key</DialogTitle>
                          <DialogDescription>
                            Generate a new API key for accessing Respondly services
                          </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                          <div className="space-y-2">
                            <Label htmlFor="api-name">Key Name</Label>
                            <Input id="api-name" placeholder="Production API Key" />
                          </div>
                          <div className="space-y-2">
                            <Label>Permissions</Label>
                            <div className="space-y-2">
                              <div className="flex items-center space-x-2">
                                <input type="checkbox" id="read-perm" defaultChecked />
                                <label htmlFor="read-perm" className="text-sm">Read access</label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <input type="checkbox" id="write-perm" />
                                <label htmlFor="write-perm" className="text-sm">Write access</label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <input type="checkbox" id="admin-perm" />
                                <label htmlFor="admin-perm" className="text-sm">Admin access</label>
                              </div>
                            </div>
                          </div>
                        </div>
                        <DialogFooter>
                          <Button variant="outline" onClick={() => setIsApiKeyDialogOpen(false)}>Cancel</Button>
                          <Button>Generate Key</Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {apiKeys.map((apiKey) => (
                      <div key={apiKey.id} className="border rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium">{apiKey.name}</h4>
                          <Badge className={getStatusColor(apiKey.status)}>
                            {apiKey.status}
                          </Badge>
                        </div>
                        <div className="mb-3">
                          <code className="text-xs bg-muted p-2 rounded block break-all">
                            {apiKey.key}
                          </code>
                        </div>
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <span>Created: {apiKey.created}</span>
                          <span>Last used: {apiKey.lastUsed}</span>
                        </div>
                        <div className="flex items-center space-x-2 mt-2">
                          {apiKey.permissions.map((perm, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {perm}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Webhooks */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Webhooks</CardTitle>
                      <CardDescription>Configure webhook endpoints for real-time notifications</CardDescription>
                    </div>
                    <Dialog open={isWebhookDialogOpen} onOpenChange={setIsWebhookDialogOpen}>
                      <DialogTrigger asChild>
                        <Button size="sm">
                          <Plus className="mr-2 h-4 w-4" />
                          New Webhook
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Create Webhook</DialogTitle>
                          <DialogDescription>
                            Add a new webhook endpoint for event notifications
                          </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                          <div className="space-y-2">
                            <Label htmlFor="webhook-name">Webhook Name</Label>
                            <Input id="webhook-name" placeholder="My Webhook" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="webhook-url">Endpoint URL</Label>
                            <Input id="webhook-url" placeholder="https://your-app.com/webhook" />
                          </div>
                          <div className="space-y-2">
                            <Label>Events</Label>
                            <div className="space-y-2">
                              <div className="flex items-center space-x-2">
                                <input type="checkbox" id="email-received" />
                                <label htmlFor="email-received" className="text-sm">Email received</label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <input type="checkbox" id="email-responded" />
                                <label htmlFor="email-responded" className="text-sm">Email responded</label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <input type="checkbox" id="email-failed" />
                                <label htmlFor="email-failed" className="text-sm">Email failed</label>
                              </div>
                            </div>
                          </div>
                        </div>
                        <DialogFooter>
                          <Button variant="outline" onClick={() => setIsWebhookDialogOpen(false)}>Cancel</Button>
                          <Button>Create Webhook</Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {webhooks.map((webhook) => (
                      <div key={webhook.id} className="border rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium">{webhook.name}</h4>
                          <div className="flex items-center space-x-2">
                            <Badge className={getStatusColor(webhook.status)}>
                              {webhook.status}
                            </Badge>
                            <Switch defaultChecked={webhook.status === "active"} />
                          </div>
                        </div>
                        <div className="mb-3">
                          <code className="text-xs bg-muted p-2 rounded block break-all">
                            {webhook.url}
                          </code>
                        </div>
                        <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
                          <span>Last triggered: {webhook.lastTriggered}</span>
                          <span>Total calls: {webhook.totalCalls}</span>
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {webhook.events.map((event, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {event}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="settings" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Integration Settings</CardTitle>
                <CardDescription>Configure global integration preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">Auto-sync Email Accounts</Label>
                      <p className="text-sm text-muted-foreground">
                        Automatically sync new emails from connected accounts
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">Real-time Notifications</Label>
                      <p className="text-sm text-muted-foreground">
                        Send instant notifications for new emails and responses
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">Debug Mode</Label>
                      <p className="text-sm text-muted-foreground">
                        Enable detailed logging for troubleshooting
                      </p>
                    </div>
                    <Switch />
                  </div>
                </div>

                <Alert>
                  <Shield className="h-4 w-4" />
                  <AlertDescription>
                    All integrations use secure OAuth 2.0 authentication and encrypted connections. 
                    Your data is always protected and never shared without permission.
                  </AlertDescription>
                </Alert>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Rate Limiting</h3>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="api-rate-limit">API Rate Limit (requests/hour)</Label>
                      <Input id="api-rate-limit" type="number" defaultValue="1000" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="webhook-timeout">Webhook Timeout (seconds)</Label>
                      <Input id="webhook-timeout" type="number" defaultValue="30" />
                    </div>
                  </div>
                </div>

                <div className="pt-4">
                  <Button>Save Settings</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}