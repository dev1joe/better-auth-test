import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TabsContent } from "@radix-ui/react-tabs";
import { TotpForm } from "./_components/totpForm";
import { authClient } from "@/lib/auth-client";
import { Session } from "better-auth";
import { redirect } from "next/navigation";
import { toast } from "sonner";
import { BackupCodeForm } from "./_components/backupCodeForm";

export default function TwoFactorAuthPage() {
    let session: Session | null = null;

    authClient.listSessions().then((sesh) => {
        if (sesh.error) {
            toast.error(
                sesh.error.message || "Error fetching session",
                { description: "redirecting to sign-in form..." }
            );
            setTimeout(() => {
                redirect("/");
            }, 2000);
        } else {
            session = sesh.data[0];
        }
    });

    // if (session === null) {
    //     redirect('/');
    // }

    return (
        <div className="p-8">
            <Card>
                <CardHeader>
                    <CardTitle className="text-2xl">Two-Factor Authentication (2FA)</CardTitle>
                </CardHeader>
                <CardContent>
                    <Tabs defaultValue="totp">
                        <TabsList className="**:cursor-pointer mb-8">
                            <TabsTrigger value="totp">Authenticator</TabsTrigger>
                            <TabsTrigger value="code">Backup Code</TabsTrigger>
                        </TabsList>
                        <TabsContent value="totp">
                            <TotpForm />
                        </TabsContent>
                        <TabsContent value="code">
                            <BackupCodeForm />
                        </TabsContent>
                    </Tabs>
                </CardContent>
            </Card>
        </div>
    );
}