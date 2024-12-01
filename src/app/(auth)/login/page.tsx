'use client'

import Link from "next/link"
import { Facebook, Twitter, Instagram, Youtube } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { useState, useEffect } from 'react'
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, UserCredential } from 'firebase/auth'
import { auth } from '@/lib/firebase'
import { useRouter } from 'next/navigation'
import { useToast } from "@/hooks/use-toast"
import type { ApiError } from "@/types/error"

interface SocialIconProps {
  href: string
  icon: React.ComponentType<{ className?: string }>
}

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()
  const googleProvider = new GoogleAuthProvider()

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        router.replace('/dashboard')
      }
    })
    return () => unsubscribe()
  }, [router])

  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    try {
      const result = await signInWithEmailAndPassword(auth, email, password)
      await handleSignInSuccess(result)
    } catch (error: unknown) {
      const apiError = error as ApiError
      toast({
        title: "Error",
        description: apiError.message || "Failed to sign in",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider)
      await handleSignInSuccess(result)
    } catch (error: unknown) {
      const apiError = error as ApiError
      toast({
        title: "Error",
        description: apiError.message || "Failed to sign in with Google",
        variant: "destructive",
      })
    }
  }

  const handleSignInSuccess = async (userCredential: UserCredential) => {
    try {
      const userId = userCredential.user.uid
      console.log('User signed in:', userId)
      router.push('/dashboard')
    } catch (error: unknown) {
      const apiError = error as ApiError
      console.error("Error during sign in:", apiError)
      toast({
        title: "Error",
        description: apiError.message || "An error occurred during sign in",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900">
      <div className="absolute inset-0 bg-grid-white/[0.02]" />
      <div className="relative w-full min-h-screen flex items-center justify-center">
        <div className="container mx-auto px-8 lg:px-16 flex items-center justify-center min-h-screen">
          <div className="grid w-full max-w-7xl gap-20 lg:grid-cols-2 items-center">
            {/* Left Column - Welcome Back */}
            <div className="hidden lg:flex flex-col justify-center space-y-8 pl-8">
              <div className="space-y-6">
                <h1 className="text-6xl font-bold tracking-tight bg-gradient-to-r from-orange-400 via-orange-300 to-yellow-200 text-transparent bg-clip-text leading-tight">
                  Tampa AV <br /> Asset <br /> Management
                </h1>
                <p className="text-lg text-white/80 max-w-md">
                Tampa AV Asset Management is a comprehensive digital solution designed 
                to streamline the tracking and management of audiovisual equipment.
                Our system helps you maintain complete visibility and control over AV assets.
                </p>
              </div>
              <div className="flex space-x-4">
                <SocialIcon href="#" icon={Facebook} />
                <SocialIcon href="#" icon={Twitter} />
                <SocialIcon href="#" icon={Instagram} />
                <SocialIcon href="#" icon={Youtube} />
              </div>
            </div>

            {/* Right Column - Sign In Form */}
            <div className="w-full max-w-md mx-auto">
              <Card className="p-8 backdrop-blur-sm bg-white/10 border-white/20">
                <div className="space-y-6">
                  <div className="space-y-2 text-center">
                    <h2 className="text-3xl font-bold text-white">Sign in</h2>
                    <p className="text-white/60">
                      Enter your credentials to access your account
                    </p>
                  </div>
                  <form onSubmit={handleEmailSignIn} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-white">
                        Email Address
                      </Label>
                      <Input
                        id="email"
                        placeholder="name@example.com"
                        required
                        type="email"
                        className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="password" className="text-white">
                        Password
                      </Label>
                      <Input
                        id="password"
                        required
                        type="password"
                        className="bg-white/10 border-white/20 text-white"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="remember" className="border-white/20 data-[state=checked]:bg-white data-[state=checked]:text-black" />
                      <label
                        htmlFor="remember"
                        className="text-sm font-medium leading-none text-white"
                      >
                        Remember me
                      </label>
                    </div>
                    <Button 
                      className="w-full bg-white hover:bg-white/90 text-gray-900"
                      type="submit"
                      disabled={isLoading}
                    >
                      {isLoading ? "Signing in..." : "Sign in now"}
                    </Button>
                  </form>
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t border-white/20" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-transparent px-2 text-white/60">
                        Or continue with
                      </span>
                    </div>
                  </div>
                  <Button 
                    className="w-full bg-white/10 text-white hover:bg-white/20 border border-white/20"
                    onClick={handleGoogleSignIn}
                    type="button"
                  >
                    <svg className="mr-2 h-4 w-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512">
                      <path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path>
                    </svg>
                    Sign in with Google
                  </Button>
                  <div className="text-center space-y-4">
                    <Link
                      className="text-sm text-white hover:text-white/80"
                      href="#"
                    >
                      Lost your password?
                    </Link>
                    <div className="text-sm text-white/60">
                      <p>By clicking continue, you agree to our</p>
                      <div className="text-white space-x-2">
                        <Link href="#" className="hover:text-white/80 underline">
                          Terms of Service
                        </Link>
                        <span>and</span>
                        <Link href="#" className="hover:text-white/80 underline">
                          Privacy Policy
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="text-center space-y-4">
                    <div className="relative">
                      <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t border-white/20" />
                      </div>
                      <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-transparent px-2 text-white/60">
                          Or
                        </span>
                      </div>
                    </div>
                    <Link
                      href="/register"
                      className="text-sm text-white hover:text-white/80"
                    >
                      <Button 
                        variant="outline" 
                        className="w-full bg-white/10 text-white hover:bg-white/20 border border-white/20"
                      >
                        Create New Account
                      </Button>
                    </Link>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function SocialIcon({ href, icon: Icon }: SocialIconProps) {
  return (
    <a
      href={href}
      className="rounded-full bg-white/10 p-2 hover:bg-white/20 transition-colors"
    >
      <Icon className="w-5 h-5 text-white" />
    </a>
  )
}

