"use client";

import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Link from "next/link";
import { Mail, Lock, ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const signUpSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters." }),
});

type FormData = z.infer<typeof signUpSchema>;

export default function SignUpPage() {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: FormData) {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log("Sign Up:", values);
    setIsLoading(false);
  }

  return (
    <div>
      <Card className="w-full max-w-md bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 shadow-lg rounded-xl">
        <CardHeader className="text-center space-y-1">
          <CardTitle className="text-xl font-semibold text-gray-900 dark:text-white">
            Sign In
          </CardTitle>
          <CardDescription className="text-gray-500 dark:text-gray-400">
            Create your account today
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Email
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <Input
                          placeholder="you@example.com"
                          type="email"
                          className="pl-10 h-11 bg-gray-50/50 dark:bg-gray-900/50 border-gray-200 dark:border-gray-600 rounded-lg focus-visible:ring-1 focus-visible:ring-gray-300 dark:focus-visible:ring-gray-600"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage className="text-xs mt-1" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Password
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <Input
                          placeholder="••••••••"
                          type="password"
                          className="pl-10 h-11 bg-gray-50/50 dark:bg-gray-900/50 border-gray-200 dark:border-gray-600 rounded-lg focus-visible:ring-1 focus-visible:ring-gray-300 dark:focus-visible:ring-gray-600"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage className="text-xs mt-1" />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                variant={"outline"}
                disabled={isLoading}
                className="w-full h-11 cursor-pointer transition-colors"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="w-4 h-4 border-2 border-white dark:border-gray-100 border-t-white dark:border-t-gray-900 rounded-full animate-spin mr-2"></div>
                    Creating Account...
                  </div>
                ) : (
                  <>
                    Sign In
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </>
                )}
              </Button>
            </form>
          </Form>
          <div className="text-center">
            <Link
              href="/sign-up"
              className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              Already have an account? Sign Up
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
