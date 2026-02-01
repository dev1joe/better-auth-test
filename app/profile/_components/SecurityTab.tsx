import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { authClient } from "@/lib/auth-client";
import { useEffect, useState } from "react";
import { ChangePasswordForm } from "./ChangePasswordForm";
import { SetPasswordButton } from "./SetPasswordButton";

export function SecurityTab({ email: userEmail }: { email: string }) {
    const [hasPasswordAccount, setHasPasswordAccount] = useState<boolean>(false);

    useEffect(() => {
        authClient.listAccounts().then((accounts) => {
            const res: boolean = accounts.data?.some(a => a.providerId === 'credential') || false;
            setHasPasswordAccount(res);
        });
    }, [])

    return (
        <div className="space-y-6">
            {hasPasswordAccount ? (
                <Card>
                    <CardHeader>
                        <CardTitle>Change Password</CardTitle>
                        <CardDescription>Update password for improved security</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ChangePasswordForm />
                    </CardContent>
                </Card>
            ) : (
                <Card>
                    <CardHeader>
                        <CardTitle>Set password</CardTitle>
                        <CardDescription>we will send you a password reset link to set up a password</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <SetPasswordButton email={userEmail} />
                    </CardContent>
                </Card>
            )}
        </div>
    );
}