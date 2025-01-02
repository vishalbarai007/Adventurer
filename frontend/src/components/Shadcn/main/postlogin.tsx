import { Separator } from "@radix-ui/react-menubar"
import { SidebarLeft } from "../support/PostLoginHome/sidebar-left"
import { SidebarRight } from "../support/PostLoginHome/sidebar-right"
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbPage } from "../support/PostLoginHome/ui/breadcrumb"
// import { SidebarProvider, SidebarInset, SidebarTrigger } from "../support/PostLoginHome/ui/sidebar"
import { SidebarProvider, SidebarInset, SidebarTrigger } from "../support/PostLoginHome/ui/sidebar"



export default function Postlogin() {
    return (
      <SidebarProvider>
        <SidebarLeft />
        <SidebarInset>
          <header className="sticky top-0 flex h-14 shrink-0 items-center gap-2 bg-background">
            <div className="flex flex-1 items-center gap-2 px-3">
              <SidebarTrigger />
              <Separator className="mr-2 h-4" />
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbPage className="line-clamp-1">
                      Project Management & Task Tracking
                    </BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
          </header>
          <div className="flex flex-1 flex-col gap-4 p-4">
            <div className="mx-auto h-24 w-full max-w-3xl rounded-xl bg-muted/50" />
            <div className="mx-auto h-[100vh] w-full max-w-3xl rounded-xl bg-muted/50" />
          </div>
        </SidebarInset>
        <SidebarRight />
      </SidebarProvider>
    )
  }