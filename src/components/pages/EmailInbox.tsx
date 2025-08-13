import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Mail,
  Search,
  Filter,
  RefreshCw,
  Bot,
  User,
  Clock,
  CheckCircle,
  XCircle,
  Eye,
  Reply,
  Forward,
  Archive,
  Trash2,
  Star,
  Flag,
  Globe,
  Zap,
} from "lucide-react";
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";

const emails = [
  {
    id: 1,
    from: "support@techcompany.no",
    fromName: "TechCompany Support",
    subject: "Urgent: Server maintenance window",
    preview: "We need to schedule a maintenance window for your server. Please confirm the proposed time slot...",
    time: "2 min ago",
    status: "unread",
    aiStatus: "pending",
    language: "Norwegian",
    priority: "high",
    labels: ["urgent", "technical"],
    hasAttachment: true,
  },
  {
    id: 2,
    from: "info@business.se",
    fromName: "Business Solutions AB",
    subject: "Product demo request",
    preview: "Hi, we would like to schedule a product demonstration for our team. Are you available next week?",
    time: "5 min ago",
    status: "unread",
    aiStatus: "responded",
    language: "Swedish",
    priority: "medium",
    labels: ["sales", "demo"],
    hasAttachment: false,
  },
  {
    id: 3,
    from: "contact@startup.dk",
    fromName: "Danish Startup",
    subject: "Partnership opportunity",
    preview: "We're interested in exploring a potential partnership. Could we set up a call to discuss?",
    time: "12 min ago",
    status: "read",
    aiStatus: "responded",
    language: "Danish",
    priority: "medium",
    labels: ["partnership"],
    hasAttachment: false,
  },
  {
    id: 4,
    from: "hello@agency.com",
    fromName: "Creative Agency",
    subject: "Design consultation",
    preview: "Thank you for your interest in our design services. Here's a proposal for your project...",
    time: "1 hour ago",
    status: "read",
    aiStatus: "responded",
    language: "English",
    priority: "low",
    labels: ["design", "consultation"],
    hasAttachment: true,
  },
  {
    id: 5,
    from: "orders@webshop.no",
    fromName: "Nordic Webshop",
    subject: "Order confirmation #12345",
    preview: "Your order has been confirmed and will be shipped within 2 business days...",
    time: "2 hours ago",
    status: "read",
    aiStatus: "auto-archived",
    language: "Norwegian",
    priority: "low",
    labels: ["order", "ecommerce"],
    hasAttachment: false,
  },
];

export function EmailInbox() {
  const [selectedEmail, setSelectedEmail] = useState<(typeof emails)[0] | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const getStatusIcon = (aiStatus: string) => {
    switch (aiStatus) {
      case "responded":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "pending":
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case "failed":
        return <XCircle className="h-4 w-4 text-red-500" />;
      case "auto-archived":
        return <Archive className="h-4 w-4 text-gray-500" />;
      default:
        return <Mail className="h-4 w-4 text-gray-500" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "border-l-red-500";
      case "medium":
        return "border-l-yellow-500";
      case "low":
        return "border-l-green-500";
      default:
        return "border-l-gray-300";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Email Inbox</h1>
          <p className="text-muted-foreground">Manage incoming emails and AI responses</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh
          </Button>
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" />
            Filters
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Unread</p>
                <p className="text-2xl font-bold">23</p>
              </div>
              <Mail className="h-8 w-8 text-ai-green" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">AI Responded</p>
                <p className="text-2xl font-bold">156</p>
              </div>
              <Bot className="h-8 w-8 text-ai-emerald" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Pending</p>
                <p className="text-2xl font-bold">7</p>
              </div>
              <Clock className="h-8 w-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg Response</p>
                <p className="text-2xl font-bold">1.2s</p>
              </div>
              <Zap className="h-8 w-8 text-ai-green" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter */}
      <Card>
        <CardContent className="p-4">
          <div className="flex gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search emails..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-10" />
              </div>
            </div>
            <select className="px-3 py-2 border rounded-md" value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
              <option value="all">All Status</option>
              <option value="unread">Unread</option>
              <option value="responded">AI Responded</option>
              <option value="pending">Pending</option>
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Email List */}
      <Card>
        <CardHeader>
          <CardTitle>Emails</CardTitle>
          <CardDescription>Click on an email to view details and AI response</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {emails.map((email) => (
              <Dialog key={email.id}>
                <DialogTrigger asChild>
                  <div
                    className={`p-4 border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors border-l-4 ${getPriorityColor(email.priority)} ${
                      email.status === "unread" ? "bg-green-50/50" : ""
                    }`}
                    onClick={() => setSelectedEmail(email)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3 flex-1 min-w-0">
                        <div className="flex items-center space-x-2">
                          {getStatusIcon(email.aiStatus)}
                          {email.status === "unread" && <div className="w-2 h-2 bg-ai-green rounded-full" />}
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center justify-between">
                            <p className={`text-sm truncate ${email.status === "unread" ? "font-semibold" : ""}`}>{email.fromName}</p>
                            <div className="flex items-center space-x-2">
                              <Badge variant="outline" className="text-xs">
                                <Globe className="mr-1 h-3 w-3" />
                                {email.language}
                              </Badge>
                              <span className="text-xs text-muted-foreground">{email.time}</span>
                            </div>
                          </div>
                          <p className={`text-sm truncate ${email.status === "unread" ? "font-medium" : "text-muted-foreground"}`}>{email.subject}</p>
                          <p className="text-xs text-muted-foreground truncate">{email.preview}</p>
                          <div className="flex items-center space-x-2 mt-2">
                            {email.labels.map((label) => (
                              <Badge key={label} variant="secondary" className="text-xs">
                                {label}
                              </Badge>
                            ))}
                            {email.hasAttachment && (
                              <Badge variant="outline" className="text-xs">
                                📎 Attachment
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </DialogTrigger>

                <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>{email.subject}</DialogTitle>
                    <DialogDescription>
                      From: {email.fromName} ({email.from}) • {email.time}
                    </DialogDescription>
                  </DialogHeader>

                  <div className="space-y-6">
                    {/* Email Header */}
                    <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                          {getStatusIcon(email.aiStatus)}
                          <span className="text-sm font-medium">
                            {email.aiStatus === "responded" && "AI Responded"}
                            {email.aiStatus === "pending" && "AI Processing"}
                            {email.aiStatus === "failed" && "AI Failed"}
                            {email.aiStatus === "auto-archived" && "Auto-Archived"}
                          </span>
                        </div>
                        <Badge className="bg-ai-green">
                          <Globe className="mr-1 h-3 w-3" />
                          {email.language}
                        </Badge>
                        <Badge variant={email.priority === "high" ? "destructive" : email.priority === "medium" ? "default" : "secondary"}>
                          {email.priority} priority
                        </Badge>
                      </div>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline">
                          <Reply className="mr-2 h-4 w-4" />
                          Reply
                        </Button>
                        <Button size="sm" variant="outline">
                          <Forward className="mr-2 h-4 w-4" />
                          Forward
                        </Button>
                        <Button size="sm" variant="outline">
                          <Archive className="mr-2 h-4 w-4" />
                          Archive
                        </Button>
                      </div>
                    </div>

                    {/* Original Email */}
                    <div className="border rounded-lg p-4">
                      <h3 className="font-semibold mb-2">Original Email</h3>
                      <div className="prose max-w-none">
                        <p>{email.preview}</p>
                        <p>
                          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                          minim veniam, quis nostrud exercitation ullamco laboris.
                        </p>
                        <p>
                          Best regards,
                          <br />
                          {email.fromName}
                        </p>
                      </div>
                    </div>

                    {/* AI Response */}
                    {email.aiStatus === "responded" && (
                      <div className="border rounded-lg p-4 bg-green-50/50">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-semibold text-green-800">AI Generated Response</h3>
                          <div className="flex items-center space-x-2">
                            <Badge className="bg-green-100 text-green-800">Sent automatically</Badge>
                            <span className="text-xs text-muted-foreground">Response time: 1.2s</span>
                          </div>
                        </div>
                        <div className="prose max-w-none">
                          <p>Thank you for contacting us. We have received your request regarding the server maintenance window.</p>
                          <p>
                            We can confirm the proposed maintenance window on Friday, February 16th, from 22:00 to 02:00 CET. This timing should minimize any
                            impact on your operations.
                          </p>
                          <p>
                            We will send you a reminder 24 hours before the maintenance begins, along with detailed information about what to expect during this
                            period.
                          </p>
                          <p>If you have any concerns or need to reschedule, please let us know as soon as possible.</p>
                          <p>
                            Best regards,
                            <br />
                            Customer Support Team
                          </p>
                        </div>
                        <Separator className="my-4" />
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <Label htmlFor="approve-response" className="text-sm">
                              Approve this response
                            </Label>
                            <Switch id="approve-response" defaultChecked />
                          </div>
                          <div className="flex space-x-2">
                            <Button size="sm" variant="outline">
                              Edit Response
                            </Button>
                            <Button size="sm">Send Manual Reply</Button>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* AI Processing */}
                    {email.aiStatus === "pending" && (
                      <div className="border rounded-lg p-4 bg-yellow-50/50">
                        <div className="flex items-center space-x-2 mb-2">
                          <Clock className="h-4 w-4 text-yellow-600 animate-spin" />
                          <h3 className="font-semibold text-yellow-800">AI Processing</h3>
                        </div>
                        <p className="text-sm text-yellow-700">
                          Our AI is analyzing this email and generating an appropriate response. This usually takes 1-3 seconds.
                        </p>
                        <div className="mt-4">
                          <Button size="sm" variant="outline">
                            Process Manually
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                </DialogContent>
              </Dialog>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
