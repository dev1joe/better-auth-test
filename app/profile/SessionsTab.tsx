import { Card, CardContent } from "@/components/ui/card";
import { authClient } from "@/lib/auth-client";
import { Session } from "better-auth";
import { useEffect, useState } from "react";
import { SessionManagement } from "./_components/SessionManagement";

export function SessionsTab({
    currentSessionToken
}: {
    currentSessionToken: string
}) {
    const [sessions, setSessions] = useState<Session[]>([]);

    useEffect(() => {
        authClient.listSessions().then((sessions) => {
            if (!sessions.error) {
                setSessions(sessions.data)
            }
        });
    }, []);

    return (
        <Card>
            <CardContent>
                <SessionManagement sessions={sessions} currentSessionToken={currentSessionToken} />
            </CardContent>
        </Card>
    );
}
