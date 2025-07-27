"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { LanguageSwitcher } from "./language-switcher"
import { useLanguage } from "@/lib/language-context"
import { useAuth } from "@/lib/auth-context"
import { MessageSquare, Home, Zap, DollarSign, User, LogOut, Settings } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function Navbar() {
  const { t, direction } = useLanguage()
  const { user, profile, signOut } = useAuth()

  const handleSignOut = async () => {
    await signOut()
  }

  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
              <MessageSquare className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="font-bold text-xl gradient-text">Chat2Site</span>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            <Link href="/" className="flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors">
              <Home className="h-4 w-4" />
              {t("nav.home")}
            </Link>
            {user && (
              <>
                <Link
                  href="/dashboard"
                  className="flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors"
                >
                  <Zap className="h-4 w-4" />
                  {direction === "rtl" ? "لوحة التحكم" : "Dashboard"}
                </Link>
                <Link
                  href="/chat"
                  className="flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors"
                >
                  <MessageSquare className="h-4 w-4" />
                  {t("nav.chat")}
                </Link>
              </>
            )}
            <Link
              href="#features"
              className="flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors"
            >
              <Zap className="h-4 w-4" />
              {t("nav.features")}
            </Link>
            <Link
              href="#pricing"
              className="flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors"
            >
              <DollarSign className="h-4 w-4" />
              {t("nav.pricing")}
            </Link>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <LanguageSwitcher />

          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={profile?.avatar_url || "/placeholder.svg"} alt={profile?.full_name || ""} />
                    <AvatarFallback>{profile?.full_name?.charAt(0) || user.email?.charAt(0) || "U"}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <div className="flex items-center justify-start gap-2 p-2">
                  <div className="flex flex-col space-y-1 leading-none">
                    {profile?.full_name && <p className="font-medium">{profile.full_name}</p>}
                    <p className="w-[200px] truncate text-sm text-muted-foreground">{user.email}</p>
                  </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/dashboard" className="flex items-center">
                    <User className="mr-2 h-4 w-4" />
                    {direction === "rtl" ? "لوحة التحكم" : "Dashboard"}
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/settings" className="flex items-center">
                    <Settings className="mr-2 h-4 w-4" />
                    {direction === "rtl" ? "الإعدادات" : "Settings"}
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleSignOut} className="flex items-center">
                  <LogOut className="mr-2 h-4 w-4" />
                  {direction === "rtl" ? "تسجيل الخروج" : "Sign out"}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center gap-2">
              <Button asChild variant="ghost">
                <Link href="/auth/login">{direction === "rtl" ? "تسجيل الدخول" : "Sign In"}</Link>
              </Button>
              <Button asChild>
                <Link href="/auth/register">{direction === "rtl" ? "إنشاء حساب" : "Sign Up"}</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}
