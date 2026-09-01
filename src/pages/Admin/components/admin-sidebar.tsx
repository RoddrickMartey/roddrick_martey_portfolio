import { NavLink, useLocation } from "react-router-dom"
import {
  LayoutDashboard,
  User,
  FolderGit2,
  Briefcase,
  Award,
  GraduationCap,
  Wrench,
  Cpu,
  Mail,
  LogOut,
  ChevronRight,
  ChevronsUpDown,
  PanelLeft,
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useAdminStore } from "@/store/adminStore"

const BASE = "/007/admin"

export function AdminSidebar() {
  const { admin, logout } = useAdminStore()
  const { pathname } = useLocation()

  const isPathActive = (path: string) => pathname === path

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="border-b border-border/50 p-3">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-md bg-primary/10 text-primary">
            <PanelLeft className="h-4 w-4" />
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold">Admin Panel</p>
            <p className="truncate text-[11px] text-muted-foreground">
              Portfolio CMS
            </p>
          </div>
        </div>
      </SidebarHeader>

      {/* Main Navigation Items */}
      <SidebarContent>
        {/* General Overview Group */}
        <SidebarGroup>
          <SidebarGroupLabel>Overview</SidebarGroupLabel>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                tooltip="Dashboard"
                isActive={isPathActive(`${BASE}/dashboard`)}
                render={<NavLink to={`${BASE}/dashboard`} />}
              >
                <LayoutDashboard className="h-4 w-4" />
                <span>Dashboard</span>
              </SidebarMenuButton>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <SidebarMenuButton
                tooltip="Profile"
                isActive={isPathActive(`${BASE}/profile`)}
                render={<NavLink to={`${BASE}/profile`} />}
              >
                <User className="h-4 w-4" />
                <span>Profile</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>

        {/* Content Management Group */}
        <SidebarGroup>
          <SidebarGroupLabel>Content</SidebarGroupLabel>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                tooltip="Projects"
                isActive={isPathActive(`${BASE}/projects`)}
                render={<NavLink to={`${BASE}/projects`} />}
              >
                <FolderGit2 className="h-4 w-4" />
                <span>Projects</span>
              </SidebarMenuButton>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <SidebarMenuButton
                tooltip="Experience"
                isActive={isPathActive(`${BASE}/experiences`)}
                render={<NavLink to={`${BASE}/experiences`} />}
              >
                <Briefcase className="h-4 w-4" />
                <span>Experience</span>
              </SidebarMenuButton>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <SidebarMenuButton
                tooltip="Certifications"
                isActive={isPathActive(`${BASE}/certifications`)}
                render={<NavLink to={`${BASE}/certifications`} />}
              >
                <Award className="h-4 w-4" />
                <span>Certifications</span>
              </SidebarMenuButton>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <SidebarMenuButton
                tooltip="Education"
                isActive={isPathActive(`${BASE}/education`)}
                render={<NavLink to={`${BASE}/education`} />}
              >
                <GraduationCap className="h-4 w-4" />
                <span>Education</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>

        {/* Taxonomy & Configuration Group */}
        <SidebarGroup>
          <SidebarGroupLabel>Taxonomy & Inbox</SidebarGroupLabel>
          <SidebarMenu>
            {/* Collapsible Skills Dropdown */}
            <Collapsible
              defaultOpen={pathname.startsWith(`${BASE}/skills`)}
              className="group/collapsible"
            >
              <SidebarMenuItem>
                <CollapsibleTrigger
                  render={<SidebarMenuButton tooltip="Skills" />}
                >
                  <Wrench className="h-4 w-4" />
                  <span>Skills Management</span>
                  <ChevronRight className="ml-auto h-4 w-4 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenuSub>
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton
                        isActive={isPathActive(`${BASE}/skills`)}
                        render={<NavLink to={`${BASE}/skills`} />}
                      >
                        All Skills
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton
                        isActive={isPathActive(`${BASE}/skills/categories`)}
                        render={<NavLink to={`${BASE}/skills/categories`} />}
                      >
                        Categories
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>

            <SidebarMenuItem>
              <SidebarMenuButton
                tooltip="Tech Stack"
                isActive={isPathActive(`${BASE}/tech`)}
                render={<NavLink to={`${BASE}/tech`} />}
              >
                <Cpu className="h-4 w-4" />
                <span>Tech Stack</span>
              </SidebarMenuButton>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <SidebarMenuButton
                tooltip="Messages"
                isActive={isPathActive(`${BASE}/messages`)}
                render={<NavLink to={`${BASE}/messages`} />}
              >
                <Mail className="h-4 w-4" />
                <span>Contact Messages</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      {/* Footer: Logged in User profile with logout dropdown */}
      <SidebarFooter className="border-t border-border/50 pt-2">
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger
                render={
                  <SidebarMenuButton
                    size="lg"
                    tooltip={admin?.fullName || "Admin"}
                  />
                }
              >
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage
                    src={admin?.avatar ?? undefined}
                    alt={admin?.fullName || "Admin"}
                  />
                  <AvatarFallback className="rounded-lg">
                    {admin?.fullName?.charAt(0) || "A"}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-xs leading-tight">
                  <span className="truncate font-semibold">
                    {admin?.fullName || "Admin User"}
                  </span>
                  <span className="truncate text-muted-foreground">
                    {admin?.email}
                  </span>
                </div>
                <ChevronsUpDown className="ml-auto h-4 w-4 text-muted-foreground" />
              </DropdownMenuTrigger>
              <DropdownMenuContent side="top" align="start" className="w-56">
                <DropdownMenuItem onClick={logout} variant="destructive">
                  <LogOut className="h-4 w-4" />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
