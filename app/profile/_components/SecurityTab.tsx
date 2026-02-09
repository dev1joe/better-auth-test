"use client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { authClient } from "@/lib/auth-client";
import { useEffect, useState } from "react";
import { ChangePasswordForm } from "./ChangePasswordForm";
import { SetPasswordButton } from "./SetPasswordButton";
import { TwoFactorAuth } from "./TwoFactorAuth";
import { Badge } from "@/components/ui/badge";
import { Passkey } from "@better-auth/passkey";
import { PasskeysManagement } from "./PasskeysManagement";

export function SecurityTab({
    email: userEmail,
    isTwoFactorEnabled
}: {
    email: string,
    isTwoFactorEnabled: boolean,
}) {
    const [hasPasswordAccount, setHasPasswordAccount] = useState<boolean>(false);
    const [passkeys, setPasskeys] = useState<Array<Passkey> | null>(null);

    useEffect(() => {
        authClient.listAccounts().then((accounts) => {
            const res: boolean = accounts.data?.some(a => a.providerId === 'credential') || false;
            setHasPasswordAccount(res);
        });

        authClient.passkey.listUserPasskeys().then((keys) => {
            if (!keys.error) {
                setPasskeys(keys.data);
            }
        })
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

            <Card>
                <CardHeader className="flex justify-between items-center">
                    <CardTitle>Two-Factor Authentication (2FA)</CardTitle>
                    <Badge variant={isTwoFactorEnabled ? `default` : `secondary`}>
                        {isTwoFactorEnabled ? `Enabled` : `Disabled`}
                    </Badge>
                </CardHeader>
                <CardContent>
                    <TwoFactorAuth isEnabled={isTwoFactorEnabled} />
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Passkeys</CardTitle>
                </CardHeader>
                <CardContent>
                    {passkeys !== null && <PasskeysManagement passkeys={passkeys} />} 
                </CardContent>
            </Card>
        </div>
    );
}