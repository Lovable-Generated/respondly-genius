import { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { 
  ChevronLeft, 
  ChevronRight, 
  Mail, 
  BarChart3, 
  Settings, 
  CreditCard,
  Users,
  Zap,
  Globe,
  FileText,
  Brain,
  Shield,
  HelpCircle,
  LogOut,
  Home,
  Send,
  Inbox,
  History,
  Bot,
  PieChart,
  DollarSign,
  UserPlus,
  Building,
  Key,
  Webhook,
  Palette,
  Languages,
  Calendar,
  MessageSquare,
  Activity
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";

interface MenuItem {
  title: string;
  href: string;
  icon: any;
  badge?: string;
  active?: string[];
}

interface MenuGroup {
  title: string;
  items: MenuItem[];
}

const menuGroups: MenuGroup[] = [
  {
    title: "MAIN",
    items: [
      { title: "Dashboard", href: "/dashboard", icon: Home },
      { title: "Email Inbox", href: "/emails/inbox", icon: Inbox, badge: "23" },
      { title: "Sent Responses", href: "/emails/sent", icon: Send },
      { title: "Response History", href: "/emails/history", icon: History },
    ]
  },
  {
    title: "AI & AUTOMATION",
    items: [
      { title: "AI Settings", href: "/ai/settings", icon: Brain },
      { title: "Auto-Reply Rules", href: "/ai/rules", icon: Bot },
      { title: "Email Templates", href: "/templates", icon: FileText },
      { title: "Language Settings", href: "/languages", icon: Languages },
    ]
  },
  {
    title: "ANALYTICS",
    items: [
      { title: "Overview", href: "/analytics", icon: BarChart3 },
      { title: "Response Analytics", href: "/analytics/responses", icon: PieChart },
      { title: "Usage Reports", href: "/analytics/usage", icon: Activity },
      { title: "Revenue Impact", href: "/analytics/revenue", icon: DollarSign },
    ]
  },
  {
    title: "ACCOUNT",
    items: [
      { title: "Subscription", href: "/subscription", icon: CreditCard, badge: "PRO" },
      { title: "Team Members", href: "/team", icon: Users },
      { title: "Integrations", href: "/integrations", icon: Zap },
      { title: "API Keys", href: "/api-keys", icon: Key },
      { title: "Webhooks", href: "/webhooks", icon: Webhook },
    ]
  },
  {
    title: "SETTINGS",
    items: [
      { title: "General Settings", href: "/settings", icon: Settings },
      { title: "Email Accounts", href: "/settings/email-accounts", icon: Mail },
      { title: "Branding", href: "/settings/branding", icon: Palette },
      { title: "Security", href: "/settings/security", icon: Shield },
    ]
  },
];

export function Sidebar() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const location = useLocation();
  const ref = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth < 768) {
        setSidebarOpen(false);
      }
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node) && isMobile && sidebarOpen) {
        setSidebarOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMobile, sidebarOpen]);

  const isRouteActive = (href: string, activePatterns?: string[]): boolean => {
    return location.pathname === href || (activePatterns?.some(pattern => location.pathname.includes(pattern)) ?? false);
  };

  const handleLogout = () => {
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
    // Add logout logic here
  };

  return (
    <>
      {/* Mobile overlay */}
      {isMobile && sidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-30 md:hidden" onClick={() => setSidebarOpen(false)} />
      )}
      
      <div
        ref={ref}
        className={cn(
          "absolute z-40 flex h-full w-64 flex-col border-r bg-slate-900 transition-all duration-300 md:relative md:left-0",
          {
            "md:w-[65px]": !sidebarOpen,
            "md:w-64": sidebarOpen,
            "-left-64": !sidebarOpen && isMobile,
            "left-0": sidebarOpen || !isMobile,
          }
        )}
      >
        {/* Logo */}
        <Link
          to="/dashboard"
          className={cn("py-4 text-white hover:text-primary flex items-center", {
            "px-6": sidebarOpen,
            "px-5 justify-center": !sidebarOpen,
          })}
        >
          {!sidebarOpen ? (
            <Mail className="h-6 w-6" />
          ) : (
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-ai-blue to-ai-purple rounded-lg flex items-center justify-center">
                <Mail className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold">Respondly</span>
            </div>
          )}
        </Link>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto px-3 py-2">
          <nav>
            {menuGroups.map((group, index) => (
              <div
                key={index}
                className={cn({
                  "mb-4": sidebarOpen,
                  "mb-2": !sidebarOpen,
                })}
              >
                <div
                  className={cn("mb-2 pl-1 text-xs font-semibold text-gray-400 uppercase tracking-wider", {
                    hidden: !sidebarOpen,
                  })}
                >
                  {group.title}
                </div>
                <nav>
                  {group.items.map((item, itemIndex) => (
                    <Link
                      key={itemIndex}
                      to={item.href}
                      className={cn(
                        "mb-1 flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-300 transition-all hover:bg-slate-700 hover:text-white group",
                        isRouteActive(item.href, item.active) ? "bg-slate-800 text-white" : "",
                        !sidebarOpen && "justify-center px-2"
                      )}
                      title={!sidebarOpen ? item.title : undefined}
                    >
                      <item.icon className={cn("h-5 w-5 flex-shrink-0", {
                        "group-hover:scale-110 transition-transform": !sidebarOpen
                      })} />
                      {sidebarOpen && (
                        <>
                          <span className="flex-1">{item.title}</span>
                          {item.badge && (
                            <Badge variant="secondary" className="bg-ai-blue/20 text-ai-blue border-0">
                              {item.badge}
                            </Badge>
                          )}
                        </>
                      )}
                    </Link>
                  ))}
                </nav>
              </div>
            ))}
          </nav>
        </div>

        {/* User section */}
        <div className="border-t border-slate-800 p-3">
          {sidebarOpen ? (
            <div className="space-y-2">
              <Link
                to="/support"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-gray-300 transition-all hover:bg-slate-700 hover:text-white"
              >
                <HelpCircle className="h-5 w-5" />
                <span>Support</span>
              </Link>
              <button
                onClick={handleLogout}
                className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-gray-300 transition-all hover:bg-slate-700 hover:text-white"
              >
                <LogOut className="h-5 w-5" />
                <span>Logout</span>
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2">
              <Link
                to="/support"
                className="rounded-lg p-2 text-gray-300 transition-all hover:bg-slate-700 hover:text-white"
                title="Support"
              >
                <HelpCircle className="h-5 w-5" />
              </Link>
              <button
                onClick={handleLogout}
                className="rounded-lg p-2 text-gray-300 transition-all hover:bg-slate-700 hover:text-white"
                title="Logout"
              >
                <LogOut className="h-5 w-5" />
              </button>
            </div>
          )}
        </div>

        {/* Collapse button */}
        <Button
          variant="ghost"
          size="sm"
          className={cn(
            "absolute -right-3 top-20 z-50 hidden h-6 w-6 rounded-full bg-slate-900 p-0 text-white hover:bg-slate-700 hover:text-white md:flex",
            "shadow-lg border border-slate-700"
          )}
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          {!sidebarOpen ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
      </div>
    </>
  );
}