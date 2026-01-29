"use client";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Key, LinkIcon, Shield, Trash2, User } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { ProfileUpdateForm } from "@/components/ProfileUpdateForm";
import { SecurityTab } from "./_components/SecurityTab";

export default function ProfilePage() {
    const { data: session, isPending: loading } = authClient.useSession();
    console.log(session); // comment that

    if (loading) {
        // TODO: handle loading state, maybe use a skeleton
        return (<div>loading...</div>);
    }

    return (
        <div className="max-w-4xl mx-auto my-6 px-4">
            <div className="mb-8">
                <Link href="/" className="inline-flex items-center mb-6">
                    <ArrowLeft className="size-4 mr-2" />
                    Back to Home
                </Link>
                <div className="flex items-center space-x-4">
                    <div className="size-16 bg-muted rounded-full flex items-center justify-center overflow-hidden">
                        {session?.user.image ? (
                            <Image
                                width={64}
                                height={64}
                                src={session?.user.image}
                                alt="User Avatar"
                                className="object-cover"
                            />
                        ) : (
                            <User className="size-8 text-muted-foreground" />
                        )}
                    </div>
                    <div className="flex-1">
                        <div className="flex gap-1 justify-between items-start">
                            <h1 className="text-3xl font-bold">
                                {session?.user.name || "User Profile"}
                            </h1>
                            <Badge>Badge</Badge> {/**{session.data?.user.role} */}
                        </div>
                        <p className="text-muted-foreground">{session?.user.email}</p>
                    </div>
                </div>
            </div>

            <Tabs defaultValue="profile">
                <TabsList className="w-full grid grid-cols-5 **:cursor-pointer">
                    <TabsTrigger value="profile">
                        <User />
                        <span className="hidden sm:inline">Profile</span>
                    </TabsTrigger>
                    <TabsTrigger value="security">
                        <Shield />
                        <span className="hidden sm:inline">Security</span>
                    </TabsTrigger>
                    <TabsTrigger value="sessions">
                        <Key />
                        <span className="hidden sm:inline">Sessions</span>
                    </TabsTrigger>
                    <TabsTrigger value="accounts">
                        <LinkIcon />
                        <span className="hidden sm:inline">Accounts</span>
                    </TabsTrigger>
                    <TabsTrigger value="danger">
                        <Trash2 />
                        <span className="hidden sm:inline">Danger</span>
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="profile">
                    <Card>
                        <CardContent>
                            {session && <ProfileUpdateForm email={session.user.email} name={session.user.name} />}
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="security">
                    {session && <SecurityTab email={session?.user.email} />}
                </TabsContent>
            </Tabs>
        </div>
    );
}