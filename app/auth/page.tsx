"use client";
import { ForgotPasswordTab } from "@/components/auth/ForgotPasswordTab";
import { SignInTab } from "@/components/auth/SignInTab";
import { SignUpTab } from "@/components/auth/SignUpTab";
import { VerificationTab } from "@/components/auth/VerificationTab";
import { SocialAuthButtons } from "@/components/SocialAuthButtons";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type Tab = "signin" | "signup" | "verification" | "forgot-password";

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [selectedTab, setSelectedTab] = useState("signin");

    useEffect(() => {
        authClient.getSession().then((session) => {
            if (session.data != null) router.push("/");
        });
    }, [router]);

    function openVerificationTab(email: string) {
        setEmail(email);
        setSelectedTab('verification' as Tab);
    }

    return (
        <div className="py-8 lg:flex lg:flex-col lg:items-center">
            <Tabs
                value={selectedTab}
                defaultValue="signin"
                onValueChange={t => setSelectedTab(t as Tab)}
                className="max-auto my-6 px-4 lg:w-5/12"
            >
                {(selectedTab == "signup" || selectedTab == "signin") &&
                    <TabsList className="**:cursor-pointer">
                        <TabsTrigger value="signin" onClick={() => setSelectedTab('signin')}>Sign In</TabsTrigger>
                        <TabsTrigger value="signup" onClick={() => setSelectedTab('signup')}>Sign Up</TabsTrigger>
                    </TabsList>
                }

                <TabsContent value="signin">
                    <Card>
                        <CardHeader className="text-2xl font-bold">
                            <CardTitle>Sign In</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <SignInTab
                                openVerificationTab={openVerificationTab}
                                openForgotPasswordTab={() => setSelectedTab('forgot-password')} 
                            />
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
                            <SignUpTab />
                        </CardContent>

                        <Separator />

                        <CardFooter className="grid grid-cols-2 gap-3">
                            <SocialAuthButtons />
                        </CardFooter>
                    </Card>
                </TabsContent>

                <TabsContent value="verification">
                    <Card>
                        <CardHeader className="text-2xl font-bold">
                            <CardTitle>Email Verification</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <VerificationTab email={email}/>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="forgot-password">
                    <Card>
                        <CardHeader className="text-2xl font-bold">
                            <CardTitle>Forgot Password</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ForgotPasswordTab openSignInTab={() => setSelectedTab('signin')} />
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
}