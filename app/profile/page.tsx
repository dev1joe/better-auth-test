"use client";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { VerificationTab } from "@/components/auth/VerificationTab";

export default function ProfilePage() {
    const router = useRouter();
    const [email, setEmail] = useState<string>("");

    useEffect(() => {
        authClient.getSession().then((session) => {
            if (session.data == null) router.push("/");
            
            setEmail(session.data?.user?.email || "");
        });
    }, [router])

    return (
        <div className="py-8 lg:flex lg:flex-col lg:items-center">
            <Tabs defaultValue="verification" className="max-auto my-6 px-4 lg:w-5/12">
                <TabsList className="**:cursor-pointer">
                    <TabsTrigger value="verification">Verification</TabsTrigger>
                </TabsList>

                <TabsContent value="verification">
                    <Card>
                        <CardHeader className="text-2xl font-bold">
                            <CardTitle>Email Verification</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <VerificationTab email={email} />
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
}