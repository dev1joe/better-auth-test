"use client";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Key, LinkIcon, Plus, Shield, Trash2, Unlink, User } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { ProfileUpdateForm } from "@/components/ProfileUpdateForm";
import { SecurityTab } from "./_components/SecurityTab";
import { SessionsTab } from "./SessionsTab";
import { useEffect, useState } from "react";
import { auth } from "@/lib/auth";
import { SUPPORTED_OAUTH_PROVIDERS, SUPPORTED_OAUTH_PROVIDERS_DETAILS, supportedOAuthProvider } from "@/lib/OAuthProviders";
import { BetterAuthActionButton } from "@/components/auth/BetterAuthActionButton";
import { useRouter } from "next/navigation";

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

                <TabsContent value="sessions">
                    {session && <SessionsTab currentSessionToken={session.session.token} />}
                </TabsContent>

                <TabsContent value="accounts">
                    <Card>
                        <CardContent>
                            <AccountsManagement />
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}

function AccountsTab() {
    return null;
}

type Account = Awaited<ReturnType<typeof auth.api.listUserAccounts>>[number];
function AccountsManagement() {
    const [accounts, setAccounts] = useState<Account[]>([]);

    useEffect(() => {
        authClient.listAccounts().then((accounts) => {
            if (!accounts.error) {
                setAccounts(accounts.data);
            }
        });
    }, []);

    const nonCredentialAccounts = accounts.filter(a => a.providerId !== 'credential');
    const unlinkedAccounts = SUPPORTED_OAUTH_PROVIDERS.filter((provider) =>
        nonCredentialAccounts.find(account =>
            account.providerId.toLowerCase() !== provider.toLowerCase()
        )
    )

    return (
        <div className="space-y-6">
            <div className="space-y-4">
                <h1 className="text-xl">Linked accounts</h1>

                {nonCredentialAccounts.map((account, i) => (
                    <LinkedAccountCard key={i} account={account} />
                ))}
            </div>

            <div className="space-y-4">
                <h1 className="text-xl">Link other accounts</h1>

                {unlinkedAccounts.map((provider, i) => (
                    <UnlinkedAccountCard key={i} providerName={provider} />
                ))}
            </div>
        </div>
    );
}

function LinkedAccountCard({ account }: { account: Account }) {
    const router = useRouter();

    const { name: providerName, Icon } = SUPPORTED_OAUTH_PROVIDERS_DETAILS[account.providerId as supportedOAuthProvider] || "";

    function unlinkAccount() {
        return authClient.unlinkAccount({
            providerId: account.providerId,
            accountId: account.accountId,
        }, {
            onSuccess: () => {
                router.refresh();
            }
        });
    }

    return (
        <Card>
            <CardContent className="flex justify-between items-center">
                <div className="flex justify-start items-center gap-3">
                    <Icon className="size-[25] lg:size-[45]" />
                    <div>
                        <h3 className="text-xl font-semibold">{providerName}</h3>
                        <p className="text-sm text-muted-foreground">Linked on {account.createdAt.toLocaleDateString()}</p>
                    </div>
                </div>
                <BetterAuthActionButton
                    action={() => unlinkAccount()}
                    variant='destructive'
                    className="cursor-pointer"
                >
                    <Unlink />
                    unlink
                </BetterAuthActionButton>
            </CardContent>
        </Card>
    );
}

function UnlinkedAccountCard({ providerName }: { providerName: string }) {
    const providerDetails = SUPPORTED_OAUTH_PROVIDERS_DETAILS[providerName as supportedOAuthProvider];

    function linkAccount() {
        return authClient.linkSocial({
            provider: providerName,
            callbackURL: '/profile'
        })
    }

    return (
        <Card>
            <CardContent className="flex justify-between items-center">
                <div className="flex justify-start items-center gap-3">
                    <providerDetails.Icon className="size-[25] lg:size-[45]" />
                    <div>
                        <h3 className="text-xl font-semibold">{providerDetails.name}</h3>
                        <p className="text-sm text-muted-foreground">
                            connect your {providerDetails.name} account for easier sign-in
                        </p>
                    </div>
                </div>
                <BetterAuthActionButton
                    action={() => linkAccount()}
                    variant='secondary'
                    className="cursor-pointer"
                >
                    <Plus />
                    link
                </BetterAuthActionButton>
            </CardContent>
        </Card>
    );
}