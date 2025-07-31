import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Webhook, 
  Plus,
  Edit,
  Trash2,
  Copy,
  TestTube,
  RefreshCw,
  CheckCircle,
  XCircle,
  Clock,
  AlertCircle,
  Activity,
  Send,
  Code,
  Shield,
  Zap
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";

const webhooks = [
  {
    id: 1,
    name: "Email Processed Webhook",
    url: "https://your-app.com/webhooks/email-processed",
    description: "Triggered when an email is processed by AI",
    events: ["email.received", "email.responded", "email.failed"],
    status: "active",
    created: "2024-01-15",
    lastTriggered: "5 minutes ago",
    totalCalls: 1248,
    successRate: 99.2,
    avgResponseTime: "150ms",
    secret: "whsec_abc123def456...",
    retryPolicy: "exponential",
    timeout: 30
  },
  {
    id: 2,
    name: "Analytics Webhook",
    url: "https://analytics.company.com/respondly-data",
    description: "Daily and weekly analytics data export",
    events: ["analytics.daily", "analytics.weekly"],
    status: "active",
    created: "2024-01-10",
    lastTriggered: "2 hours ago",
    totalCalls: 156,
    successRate: 100,
    avgResponseTime: "89ms",
    secret: "whsec_xyz789uvw012...",
    retryPolicy: "linear",
    timeout: 15
  },
  {
    id: 3,
    name: "Team Notifications",
    url: "https://slack-webhook.company.com/notify",
    description: "Send notifications to team Slack channel",
    events: ["email.failed", "quota.warning", "team.member_added"],
    status: "paused",
    created: "2024-01-05",
    lastTriggered: "1 day ago",
    totalCalls: 89,
    successRate: 97.8,
    avgResponseTime: "245ms",
    secret: "whsec_slack789...",
    retryPolicy: "exponential",
    timeout: 10
  },
  {
    id: 4,
    name: "CRM Integration",
    url: "https://api.salesforce.com/webhooks/respondly",
    description: "Sync email interactions with Salesforce CRM",
    events: ["email.responded", "customer.satisfaction_updated"],
    status: "inactive",
    created: "2023-12-20",
    lastTriggered: "1 week ago",
    totalCalls: 234,
    successRate: 95.5,
    avgResponseTime: "320ms",
    secret: "whsec_crm456...",
    retryPolicy: "exponential",
    timeout: 45
  }
];

const availableEvents = [
  { 
    category: "Email Events",
    events: [
      { name: "email.received", description: "New email received in inbox" },
      { name: "email.responded", description: "AI response sent successfully" },
      { name: "email.failed", description: "AI response failed to send" },
      { name: "email.bounced", description: "Email bounced back" },
      { name: "email.opened", description: "Email was opened by recipient" }
    ]
  },
  {
    category: "Analytics Events",
    events: [
      { name: "analytics.daily", description: "Daily analytics report generated" },
      { name: "analytics.weekly", description: "Weekly analytics report generated" },
      { name: "analytics.monthly", description: "Monthly analytics report generated" }
    ]
  },
  {
    category: "System Events",
    events: [
      { name: "quota.warning", description: "Usage quota warning (80% reached)" },
      { name: "quota.exceeded", description: "Usage quota exceeded" },
      { name: "system.maintenance", description: "Scheduled maintenance notification" }
    ]
  },
  {
    category: "Team Events",
    events: [
      { name: "team.member_added", description: "New team member added" },
      { name: "team.member_removed", description: "Team member removed" },
      { name: "team.role_changed", description: "Team member role changed" }
    ]
  }
];

const recentDeliveries = [
  {
    id: 1,
    webhookName: "Email Processed Webhook",
    event: "email.responded",
    timestamp: "2024-01-26 14:32:15",
    status: "success",
    responseCode: 200,
    responseTime: "145ms",
    payload: { emailId: "em_123", customerId: "cust_456", responseTime: "1.2s" }
  },
  {
    id: 2,
    webhookName: "Analytics Webhook",
    event: "analytics.daily",
    timestamp: "2024-01-26 09:00:02",
    status: "success",
    responseCode: 200,
    responseTime: "89ms",
    payload: { date: "2024-01-25", totalEmails: 156, avgSatisfaction: 4.8 }
  },
  {
    id: 3,
    webhookName: "Email Processed Webhook",
    event: "email.failed",
    timestamp: "2024-01-26 13:45:22",
    status: "failed",
    responseCode: 500,
    responseTime: "30000ms",
    payload: { emailId: "em_789", error: "Internal server error" },
    retryCount: 3
  }
];

export function Webhooks() {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [selectedWebhook, setSelectedWebhook] = useState<typeof webhooks[0] | null>(null);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "inactive":
        return <XCircle className="h-4 w-4 text-gray-500" />;
      case "paused":
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case "failed":
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return <Webhook className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "inactive":
        return "bg-gray-100 text-gray-800";
      case "paused":
        return "bg-yellow-100 text-yellow-800";
      case "failed":
        return "bg-red-100 text-red-800";
      case "success":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const activeWebhooks = webhooks.filter(w => w.status === "active").length;
  const totalCalls = webhooks.reduce((sum, w) => sum + w.totalCalls, 0);
  const avgSuccessRate = webhooks.reduce((sum, w) => sum + w.successRate, 0) / webhooks.length;

  return (
    <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Webhooks</h1>
            <p className="text-muted-foreground">Configure real-time notifications for your applications</p>
          </div>
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Create Webhook
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Create New Webhook</DialogTitle>
                <DialogDescription>
                  Set up a new webhook endpoint for real-time notifications
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="webhook-name">Webhook Name</Label>
                  <Input id="webhook-name" placeholder="My Webhook Endpoint" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="webhook-url">Endpoint URL</Label>
                  <Input id="webhook-url" placeholder="https://your-app.com/webhook" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="webhook-description">Description</Label>
                  <Textarea id="webhook-description" placeholder="Describe what this webhook does..." />
                </div>
                <div className="space-y-2">
                  <Label>Events to Subscribe</Label>
                  <div className="max-h-40 overflow-y-auto border rounded-md p-3 space-y-2">
                    {availableEvents.map((category) => (
                      <div key={category.category} className="space-y-2">
                        <h4 className="font-medium text-sm">{category.category}</h4>
                        {category.events.map((event) => (
                          <div key={event.name} className="flex items-center space-x-2 ml-4">
                            <input type="checkbox" id={event.name} className="rounded" />
                            <label htmlFor={event.name} className="text-sm flex-1">
                              <span className="font-mono text-xs bg-muted px-2 py-1 rounded mr-2">
                                {event.name}
                              </span>
                              {event.description}
                            </label>
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="retry-policy">Retry Policy</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select retry policy" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="exponential">Exponential Backoff</SelectItem>
                        <SelectItem value="linear">Linear Backoff</SelectItem>
                        <SelectItem value="none">No Retries</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="timeout">Timeout (seconds)</Label>
                    <Input id="timeout" type="number" placeholder="30" min="5" max="60" />
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>Cancel</Button>
                <Button>Create Webhook</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Active Webhooks</p>
                  <p className="text-2xl font-bold">{activeWebhooks}</p>
                </div>
                <Webhook className="h-8 w-8 text-ai-blue" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Calls</p>
                  <p className="text-2xl font-bold">{totalCalls.toLocaleString()}</p>
                </div>
                <Activity className="h-8 w-8 text-ai-purple" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Success Rate</p>
                  <p className="text-2xl font-bold">{avgSuccessRate.toFixed(1)}%</p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Avg Response</p>
                  <p className="text-2xl font-bold">168ms</p>
                </div>
                <Zap className="h-8 w-8 text-ai-green" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Security Notice */}
        <Alert>
          <Shield className="h-4 w-4" />
          <AlertDescription>
            Webhook payloads are signed with HMAC-SHA256. Always verify the signature to ensure authenticity. 
            Webhook secrets are only shown once during creation.
          </AlertDescription>
        </Alert>

        {/* Webhooks List */}
        <Card>
          <CardHeader>
            <CardTitle>Configured Webhooks</CardTitle>
            <CardDescription>Manage your webhook endpoints and monitor their performance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {webhooks.map((webhook) => (
                <div key={webhook.id} className="border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-ai-blue to-ai-purple rounded-lg flex items-center justify-center">
                        <Webhook className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <h4 className="font-medium">{webhook.name}</h4>
                        <p className="text-sm text-muted-foreground">{webhook.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge className={getStatusColor(webhook.status)}>
                        {getStatusIcon(webhook.status)}
                        <span className="ml-1 capitalize">{webhook.status}</span>
                      </Badge>
                      <Switch defaultChecked={webhook.status === "active"} />
                    </div>
                  </div>
                  
                  <div className="mb-3">
                    <Label className="text-sm font-medium">Endpoint URL</Label>
                    <div className="flex items-center space-x-2 mt-1">
                      <code className="flex-1 p-2 bg-muted rounded text-sm break-all">
                        {webhook.url}
                      </code>
                      <Button variant="outline" size="sm">
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 text-sm mb-3">
                    <div>
                      <span className="text-muted-foreground">Created:</span>
                      <p className="font-medium">{webhook.created}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Last Triggered:</span>
                      <p className="font-medium">{webhook.lastTriggered}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Total Calls:</span>
                      <p className="font-medium">{webhook.totalCalls.toLocaleString()}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Success Rate:</span>
                      <p className="font-medium text-green-600">{webhook.successRate}%</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex flex-wrap gap-1">
                      {webhook.events.map((event, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {event}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <TestTube className="mr-1 h-3 w-3" />
                        Test
                      </Button>
                      <Button variant="outline" size="sm">
                        <Edit className="mr-1 h-3 w-3" />
                        Edit
                      </Button>
                      <Button variant="outline" size="sm">
                        <Activity className="mr-1 h-3 w-3" />
                        Logs
                      </Button>
                      <Button variant="outline" size="sm">
                        <Trash2 className="mr-1 h-3 w-3" />
                        Delete
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Deliveries */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Deliveries</CardTitle>
            <CardDescription>Latest webhook delivery attempts and their status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentDeliveries.map((delivery) => (
                <div key={delivery.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(delivery.status)}
                      <div>
                        <p className="font-medium text-sm">{delivery.webhookName}</p>
                        <p className="text-xs text-muted-foreground">{delivery.timestamp}</p>
                      </div>
                    </div>
                    <div>
                      <Badge variant="outline" className="text-xs">
                        {delivery.event}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4 text-sm">
                    <div className="text-center">
                      <div className={`font-medium ${delivery.status === 'success' ? 'text-green-600' : 'text-red-600'}`}>
                        {delivery.responseCode}
                      </div>
                      <div className="text-xs text-muted-foreground">Status</div>
                    </div>
                    <div className="text-center">
                      <div className="font-medium">{delivery.responseTime}</div>
                      <div className="text-xs text-muted-foreground">Response</div>
                    </div>
                    {delivery.retryCount && (
                      <div className="text-center">
                        <div className="font-medium text-yellow-600">{delivery.retryCount}</div>
                        <div className="text-xs text-muted-foreground">Retries</div>
                      </div>
                    )}
                    <Button variant="outline" size="sm">
                      <Code className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Available Events Documentation */}
        <Card>
          <CardHeader>
            <CardTitle>Available Events</CardTitle>
            <CardDescription>Complete list of events you can subscribe to</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {availableEvents.map((category) => (
                <div key={category.category}>
                  <h3 className="font-semibold mb-3">{category.category}</h3>
                  <div className="grid gap-3 md:grid-cols-2">
                    {category.events.map((event) => (
                      <div key={event.name} className="p-3 border rounded-lg">
                        <div className="flex items-center justify-between mb-1">
                          <code className="text-sm font-mono bg-muted px-2 py-1 rounded">
                            {event.name}
                          </code>
                          <Button variant="outline" size="sm">
                            <Copy className="h-3 w-3" />
                          </Button>
                        </div>
                        <p className="text-sm text-muted-foreground">{event.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Webhook Testing */}
        <Card>
          <CardHeader>
            <CardTitle>Webhook Testing</CardTitle>
            <CardDescription>Test your webhook endpoints with sample payloads</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <Select>
                  <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder="Select webhook" />
                  </SelectTrigger>
                  <SelectContent>
                    {webhooks.map((webhook) => (
                      <SelectItem key={webhook.id} value={webhook.id.toString()}>
                        {webhook.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select>
                  <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder="Select event" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="email.received">email.received</SelectItem>
                    <SelectItem value="email.responded">email.responded</SelectItem>
                    <SelectItem value="email.failed">email.failed</SelectItem>
                  </SelectContent>
                </Select>
                <Button>
                  <Send className="mr-2 h-4 w-4" />
                  Send Test
                </Button>
              </div>
              <div className="p-3 bg-muted rounded-lg">
                <Label className="text-sm font-medium mb-2 block">Sample Payload</Label>
                <pre className="text-xs overflow-x-auto">
{`{
  "event": "email.responded",
  "timestamp": "2024-01-26T14:32:15Z",
  "data": {
    "email_id": "em_123456",
    "customer_email": "customer@example.com",
    "subject": "Re: Product inquiry",
    "response_time": "1.2s",
    "language": "Norwegian",
    "satisfaction_score": 4.8
  }
}`}
                </pre>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
  );
}