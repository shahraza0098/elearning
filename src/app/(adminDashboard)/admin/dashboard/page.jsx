"use client";

import React from "react";
import Link from "next/link";
import { 
  Users, 
  BookOpen, 
  CreditCard, 
  Award, 
  ArrowUpRight, 
  MoreVertical
} from "lucide-react";

// Shadcn UI Components
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import StatCard from "@/components/StatCard"; 

export default function AdminDashboardHome() {
  const stats = [
    { title: "Total Students", value: "12,345", change: "+12%", isPositive: true, icon: Users, color: "text-blue-600", bg: "bg-blue-100" },
    { title: "Active Courses", value: "48", change: "+3%", isPositive: true, icon: BookOpen, color: "text-indigo-600", bg: "bg-indigo-100" },
    { title: "Total Revenue", value: "$45,231", change: "+8%", isPositive: true, icon: CreditCard, color: "text-emerald-600", bg: "bg-emerald-100" },
    { title: "Certificates Issued", value: "2,845", change: "-2%", isPositive: false, icon: Award, color: "text-amber-600", bg: "bg-amber-100" },
  ];

  const recentUsers = [
    { id: 1, name: "Alice Johnson", email: "alice@example.com", role: "STUDENT", date: "Just now" },
    { id: 2, name: "Marcus Webb", email: "marcus.w@example.com", role: "TEACHER", date: "2 hours ago" },
    { id: 3, name: "Sarah Connor", email: "sarah.c@example.com", role: "STUDENT", date: "5 hours ago" },
    { id: 4, name: "James Smith", email: "james@example.com", role: "STUDENT", date: "1 day ago" },
    { id: 5, name: "Elena Rodriguez", email: "elena.r@example.com", role: "STUDENT", date: "1 day ago" },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Dashboard Overview</h1>
          <p className="text-sm text-muted-foreground mt-1">Welcome back! Here is what's happening today.</p>
        </div>
        <Button asChild>
          <Link href="/admin/register">+ Add New User</Link>
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatCard 
            key={index} 
            {...stat}
          />
        ))}
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Recent Registrations Table */}
        <Card className="lg:col-span-2 shadow-sm border-gray-100 flex flex-col">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-semibold">Recent Registrations</CardTitle>
            <Button variant="link" asChild className="px-0">
              <Link href="/admin-dashboard/users">View All</Link>
            </Button>
          </CardHeader>
          <CardContent className="flex-1 px-0 pb-0">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50 hover:bg-muted/50">
                  <TableHead className="px-6">User</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Joined</TableHead>
                  <TableHead className="text-right px-6">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-sm font-medium text-secondary-foreground">
                          {user.name.charAt(0)}
                        </div>
                        <div>
                          <p className="text-sm font-medium leading-none">{user.name}</p>
                          <p className="text-xs text-muted-foreground mt-1">{user.email}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={user.role === 'TEACHER' ? 'secondary' : 'default'} className="rounded-full font-medium">
                        {user.role}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">{user.date}</TableCell>
                    <TableCell className="text-right px-6">
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Quick Actions / System Status */}
        <div className="space-y-6">
          <Card className="shadow-sm border-gray-100">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full justify-between h-auto py-4 group">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 text-blue-600 rounded-lg group-hover:bg-blue-200 transition-colors">
                    <BookOpen className="w-4 h-4" />
                  </div>
                  <span className="font-medium">Create New Course</span>
                </div>
                <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
              </Button>

              <Button variant="outline" className="w-full justify-between h-auto py-4 group">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-indigo-100 text-indigo-600 rounded-lg group-hover:bg-indigo-200 transition-colors">
                    <Award className="w-4 h-4" />
                  </div>
                  <span className="font-medium">Review Certificates</span>
                </div>
                <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
              </Button>
            </CardContent>
          </Card>

          <Card className="shadow-sm border-gray-100">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">System Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Database Load</span>
                  <span className="font-medium text-green-600">Healthy (24%)</span>
                </div>
                <Progress value={24} className="h-2 bg-secondary [&>div]:bg-green-500" />
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Storage Usage</span>
                  <span className="font-medium text-amber-600">Warning (82%)</span>
                </div>
                <Progress value={82} className="h-2 bg-secondary [&>div]:bg-amber-500" />
              </div>
            </CardContent>
          </Card>
        </div>

      </div>
    </div>
  );
}