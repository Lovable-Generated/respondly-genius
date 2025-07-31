import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Send, 
  Search,
  Filter,
  RefreshCw,
  CheckCircle,
  XCircle,
  Clock,
  Eye,
  Download,
  Globe,
  Star,
  ThumbsUp,
  ThumbsDown,
  MessageSquare
} from "lucide-react";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const sentEmails = [
  {
    id: 1,
    to: "support@techcompany.no",
    toName: "TechCompany Support",
    subject: "Re: Server maintenance window",
    originalSubject: "Urgent: Server maintenance window",
    sentAt: "2 min ago",
    status: "delivered",
    language: "Norwegian",
    responseTime: "0.8s",
    feedback: "positive",
    template: "Technical Support Response",
    content: "Thank you for contacting us. We have received your request regarding the server maintenance window...",
    openRate: true,
    replyReceived: false
  },
  {
    id: 2,
    to: "info@business.se",
    toName: "Business Solutions AB",
    subject: "Re: Product demo request",
    originalSubject: "Product demo request",
    sentAt: "5 min ago",
    status: "delivered",
    language: "Swedish",
    responseTime: "1.1s",
    feedback: "positive",
    template: "Sales Inquiry Response",
    content: "Thank you for your interest in our product demonstration...",
    openRate: true,
    replyReceived: true
  },
  {
    id: 3,
    to: "contact@startup.dk",
    toName: "Danish Startup",
    subject: "Re: Partnership opportunity",
    originalSubject: "Partnership opportunity",
    sentAt: "12 min ago",
    status: "delivered",
    language: "Danish",
    responseTime: "0.9s",
    feedback: "neutral",
    template: "Partnership Response",
    content: "Thank you for reaching out regarding partnership opportunities...",
    openRate: true,
    replyReceived: false
  },
  {
    id: 4,
    to: "hello@agency.com",
    toName: "Creative Agency",
    subject: "Re: Design consultation",
    originalSubject: "Design consultation",
    sentAt: "1 hour ago",
    status: "bounced",
    language: "English",
    responseTime: "1.3s",
    feedback: null,
    template: "Consultation Response",
    content: "Thank you for your interest in our design consultation services...",
    openRate: false,
    replyReceived: false
  },
  {
    id: 5,
    to: "orders@webshop.no",
    toName: "Nordic Webshop",
    subject: "Re: Order confirmation #12345",
    originalSubject: "Order confirmation #12345",
    sentAt: "2 hours ago",
    status: "delivered",
    language: "Norwegian",
    responseTime: "0.7s",
    feedback: "positive",
    template: "Order Confirmation Response",
    content: "Thank you for your order confirmation. We have processed your request...",
    openRate: true,
    replyReceived: false
  }
];

export function SentResponses() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "delivered":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "bounced":
        return <XCircle className="h-4 w-4 text-red-500" />;
      case "pending":
        return <Clock className="h-4 w-4 text-yellow-500" />;
      default:
        return <Send className="h-4 w-4 text-gray-500" />;
    }
  };

  const getFeedbackIcon = (feedback: string | null) => {
    switch (feedback) {
      case "positive":
        return <ThumbsUp className="h-4 w-4 text-green-500" />;
      case "negative":
        return <ThumbsDown className="h-4 w-4 text-red-500" />;
      case "neutral":
        return <MessageSquare className="h-4 w-4 text-yellow-500" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "delivered":
        return "bg-green-100 text-green-800";
      case "bounced":
        return "bg-red-100 text-red-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Sent Responses</h1>
            <p className="text-muted-foreground">Track all AI-generated email responses</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline">
              <RefreshCw className="mr-2 h-4 w-4" />
              Refresh
            </Button>
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Sent</p>
                  <p className="text-2xl font-bold">{sentEmails.length}</p>
                </div>
                <Send className="h-8 w-8 text-ai-blue" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Delivered</p>
                  <p className="text-2xl font-bold">{sentEmails.filter(e => e.status === "delivered").length}</p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Open Rate</p>
                  <p className="text-2xl font-bold">
                    {Math.round((sentEmails.filter(e => e.openRate).length / sentEmails.length) * 100)}%
                  </p>
                </div>
                <Eye className="h-8 w-8 text-ai-purple" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Reply Rate</p>
                  <p className="text-2xl font-bold">
                    {Math.round((sentEmails.filter(e => e.replyReceived).length / sentEmails.length) * 100)}%
                  </p>
                </div>
                <MessageSquare className="h-8 w-8 text-ai-green" />
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
                  <Input
                    placeholder="Search sent emails..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <select 
                className="px-3 py-2 border rounded-md"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="delivered">Delivered</option>
                <option value="pending">Pending</option>
                <option value="bounced">Bounced</option>
              </select>
            </div>
          </CardContent>
        </Card>

        {/* Sent Emails List */}
        <Card>
          <CardHeader>
            <CardTitle>Sent Email Responses</CardTitle>
            <CardDescription>All AI-generated responses sent to customers</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {sentEmails.map((email) => (
                <Dialog key={email.id}>
                  <DialogTrigger asChild>
                    <div className="p-4 border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3 flex-1 min-w-0">
                          <div className="flex items-center space-x-2">
                            {getStatusIcon(email.status)}
                            {getFeedbackIcon(email.feedback)}
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center justify-between">
                              <p className="text-sm font-medium truncate">
                                To: {email.toName}
                              </p>
                              <div className="flex items-center space-x-2">
                                <Badge variant="outline" className="text-xs">
                                  <Globe className="mr-1 h-3 w-3" />
                                  {email.language}
                                </Badge>
                                <Badge className={getStatusColor(email.status)}>
                                  {email.status}
                                </Badge>
                                <span className="text-xs text-muted-foreground">{email.sentAt}</span>
                              </div>
                            </div>
                            <p className="text-sm text-muted-foreground truncate">
                              {email.subject}
                            </p>
                            <div className="flex items-center justify-between mt-2">
                              <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                                <span>Response time: {email.responseTime}</span>
                                <span>Template: {email.template}</span>
                              </div>
                              <div className="flex items-center space-x-2">
                                {email.openRate && <Badge variant="secondary" className="text-xs">Opened</Badge>}
                                {email.replyReceived && <Badge variant="secondary" className="text-xs">Replied</Badge>}
                              </div>
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
                        Sent to: {email.toName} ({email.to}) • {email.sentAt}
                      </DialogDescription>
                    </DialogHeader>
                    
                    <div className="space-y-6">
                      {/* Email Status */}
                      <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center space-x-2">
                            {getStatusIcon(email.status)}
                            <span className="text-sm font-medium capitalize">{email.status}</span>
                          </div>
                          <Badge className="bg-ai-blue">
                            <Globe className="mr-1 h-3 w-3" />
                            {email.language}
                          </Badge>
                          <Badge variant="outline">
                            Response time: {email.responseTime}
                          </Badge>
                        </div>
                        <div className="flex items-center space-x-2">
                          {email.feedback && getFeedbackIcon(email.feedback)}
                          <span className="text-sm text-muted-foreground">
                            Template: {email.template}
                          </span>
                        </div>
                      </div>

                      {/* Email Content */}
                      <div className="border rounded-lg p-4">
                        <h3 className="font-semibold mb-2">AI Generated Response</h3>
                        <div className="prose max-w-none">
                          <p>{email.content}</p>
                          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                          <p>Best regards,<br/>Customer Support Team</p>
                        </div>
                      </div>

                      {/* Engagement Stats */}
                      <div className="grid gap-4 md:grid-cols-3">
                        <div className="p-3 border rounded-lg text-center">
                          <div className="text-sm text-muted-foreground">Delivery Status</div>
                          <div className="flex items-center justify-center space-x-1 mt-1">
                            {getStatusIcon(email.status)}
                            <span className="font-medium capitalize">{email.status}</span>
                          </div>
                        </div>
                        <div className="p-3 border rounded-lg text-center">
                          <div className="text-sm text-muted-foreground">Email Opened</div>
                          <div className="font-medium mt-1">
                            {email.openRate ? "Yes" : "No"}
                          </div>
                        </div>
                        <div className="p-3 border rounded-lg text-center">
                          <div className="text-sm text-muted-foreground">Reply Received</div>
                          <div className="font-medium mt-1">
                            {email.replyReceived ? "Yes" : "No"}
                          </div>
                        </div>
                      </div>
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