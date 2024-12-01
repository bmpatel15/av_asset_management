'use client'

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Box, CheckCircle, Clock, AlertTriangle, Camera, Mic, Lightbulb, Plus } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import type { ApiError } from "@/types/error"

// Define initial stats state type
interface DashboardStats {
  total: number
  available: number
  checkedOut: number
  maintenance: number
}

const recentActivity = [
  {
    id: "1",
    type: "checkout",
    user: {
      name: "John Doe",
      email: "john@example.com",
      avatar: "/avatars/01.png",
    },
    equipment: "Sony A7III Camera",
    timestamp: "2 hours ago",
    status: "checked-out",
  },
  {
    id: "2",
    type: "return",
    user: {
      name: "Jane Smith",
      email: "jane@example.com",
      avatar: "/avatars/02.png",
    },
    equipment: "Shure SM7B Microphone",
    timestamp: "4 hours ago",
    status: "returned",
  },
  {
    id: "3",
    type: "maintenance",
    user: {
      name: "Mike Johnson",
      email: "mike@example.com",
      avatar: "/avatars/03.png",
    },
    equipment: "ARRI SkyPanel",
    timestamp: "6 hours ago",
    status: "maintenance",
  },
]

const equipmentByCategory = [
  {
    name: "Cameras",
    icon: Camera,
    count: "12",
    percentage: 40,
  },
  {
    name: "Audio Equipment",
    icon: Mic,
    count: "8",
    percentage: 25,
  },
  {
    name: "Lighting",
    icon: Lightbulb,
    count: "6",
    percentage: 20,
  },
  {
    name: "Other",
    icon: Box,
    count: "4",
    percentage: 15,
  },
]

const upcomingMaintenance = [
  {
    id: "1",
    equipment: "RED EPIC-W Camera",
    date: "Dec 1, 2024",
    type: "Regular Service",
    priority: "high",
  },
  {
    id: "2",
    equipment: "Aputure 600d",
    date: "Dec 3, 2024",
    type: "Firmware Update",
    priority: "medium",
  },
  {
    id: "3",
    equipment: "DJI Ronin 4D",
    date: "Dec 5, 2024",
    type: "Calibration",
    priority: "low",
  },
]

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
}

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats>({
    total: 0,
    available: 0,
    checkedOut: 0,
    maintenance: 0
  })

  useEffect(() => {
    async function fetchStats() {
      try {
        const response = await fetch('/api/dashboard/stats')
        console.log('Response status:', response.status)
        
        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(`Failed to fetch stats: ${errorData.details || response.statusText}`)
        }
        
        const data = await response.json()
        console.log('Received stats data:', data)
        
        if (data.error) {
          throw new Error(data.error)
        }

        setStats({
          total: data.total ?? 0,
          available: data.available ?? 0,
          checkedOut: data.checkedOut ?? 0,
          maintenance: data.maintenance ?? 0,
        })
      } catch (error: unknown) {
        const apiError = error as ApiError
        console.error('Stats fetch error:', apiError.message)
      }
    }

    fetchStats()
  }, [])

  return (
    <motion.div 
      className="flex-1 space-y-6 p-8 pt-6"
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      <motion.div variants={itemVariants} className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <div className="flex items-center space-x-2">
          <Link href="/dashboard/equipment/add">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Equipment
            </Button>
          </Link>
        </div>
      </motion.div>
      
      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {Object.entries(stats).map(([key, value]) => (
          <motion.div
            key={key}
            variants={itemVariants}
            className="transform transition-all hover:-translate-y-1"
          >
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {key}
                </CardTitle>
                {key === "total" && <Box className="h-4 w-4 text-muted-foreground" />}
                {key === "available" && <CheckCircle className="h-4 w-4 text-muted-foreground" />}
                {key === "checkedOut" && <Clock className="h-4 w-4 text-muted-foreground" />}
                {key === "maintenance" && <AlertTriangle className="h-4 w-4 text-muted-foreground" />}
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{value}</div>
                <p className="text-xs text-muted-foreground">
                  {key === "total" && "Total items in inventory"}
                  {key === "available" && "Items ready for use"}
                  {key === "checkedOut" && "Items currently in use"}
                  {key === "maintenance" && "Items under maintenance"}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        {/* Recent Activity */}
        <motion.div variants={itemVariants} className="col-span-4">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>
                Latest equipment checkouts, returns, and maintenance
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-center">
                    <Avatar className="h-9 w-9">
                      <AvatarImage src={activity.user.avatar} alt="Avatar" />
                      <AvatarFallback>
                        {activity.user.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="ml-4 space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {activity.user.name}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {activity.equipment}
                      </p>
                    </div>
                    <div className="ml-auto font-medium">
                      <Badge
                        variant={
                          activity.status === "checked-out"
                            ? "destructive"
                            : activity.status === "returned"
                            ? "secondary"
                            : "outline"
                        }
                      >
                        {activity.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Equipment by Category */}
        <motion.div variants={itemVariants} className="col-span-3">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle>Equipment by Category</CardTitle>
              <CardDescription>
                Distribution of equipment by category
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                {equipmentByCategory.map((category) => (
                  <div key={category.name} className="mb-4">
                    <div className="flex items-center">
                      <category.icon className="mr-2 h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium">
                        {category.name}
                      </span>
                      <span className="ml-auto text-sm text-muted-foreground">
                        {category.count}
                      </span>
                    </div>
                    <Progress value={category.percentage} className="h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Upcoming Maintenance */}
      <motion.div variants={itemVariants}>
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle>Upcoming Maintenance</CardTitle>
            <CardDescription>
              Schedule of equipment requiring maintenance
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Equipment</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {upcomingMaintenance.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">
                      {item.equipment}
                    </TableCell>
                    <TableCell>{item.date}</TableCell>
                    <TableCell>{item.type}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          item.priority === "high"
                            ? "destructive"
                            : item.priority === "medium"
                            ? "secondary"
                            : "outline"
                        }
                      >
                        {item.priority}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}

