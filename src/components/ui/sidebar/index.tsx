
export { Sidebar } from "./sidebar"
export { SidebarProvider, useSidebar } from "@/hooks/use-sidebar"
export {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  type SidebarMenuButtonProps,
} from "./sidebar-nav"
export {
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarSeparator,
  SidebarInput,
} from "./sidebar-sections"

// Clean up the old file since we've moved everything to new locations
<lov-delete file_path="src/components/ui/sidebar.tsx" />
