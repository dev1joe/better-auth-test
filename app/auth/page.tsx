"use client";
import { SignInTab } from "@/components/SignInTab";
import { SignUpTab } from "@/components/SignUpTab";
import { SocialAuthButtons } from "@/components/SocialAuthButtons";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function LoginPage() {
    const router = useRouter();

    useEffect(() => {
        authClient.getSession().then((session) => {
            if (session.data != null) router.push("/");
        });
    }, [router]);

    return (
        <div className="py-8 lg:flex lg:flex-col lg:items-center">
            <Tabs defaultValue="signin" className="max-auto my-6 px-4 lg:w-4/12">
                <TabsList className="**:cursor-pointer">
                    <TabsTrigger value="signin">Sign In</TabsTrigger>
                    <TabsTrigger value="signup">Sign Up</TabsTrigger>
                </TabsList>

                <TabsContent value="signin">
                    <Card>
                        <CardHeader className="text-2xl font-bold">
                            <CardTitle>Sign In</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <SignInTab></SignInTab>
                        </CardContent>

                        <Separator />

                        <CardFooter className="grid grid-cols-2 gap-3">
                            <SocialAuthButtons />
                        </CardFooter>
                    </Card>
                </TabsContent>

                <TabsContent value="signup">
                    <Card>
                        <CardHeader className="text-2xl font-bold">
                            <CardTitle>Sign Up</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <SignUpTab></SignUpTab>
                        </CardContent>

                        <Separator />

                        <CardFooter className="grid grid-cols-2 gap-3">
                            <SocialAuthButtons />
                        </CardFooter>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
}