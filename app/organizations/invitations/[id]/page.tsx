import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function InvitationPage({
    params
}: PageProps<"/organizations/invitations/[id]">) {
    const session = auth.api.getSession({ headers: await headers() });

    if (session === null) {
        return redirect("/auth");
    }

    const { id } = await params;
    const invitation = await auth.api.getInvitation({
        headers: await headers(),
        query: { id }
    });

    return (
        <div className="container mx-auto my-6 px-4">
            <Card>
                <CardHeader>
                    <CardTitle>Organization Invitation</CardTitle>
                    <CardDescription>
                        You have been invited to join {invitation.organizationName} organization as a {invitation.role}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {/* TODO: show invitation information */}
                    {/* <InvitationInformation invitation={invitation} /> */}
                </CardContent>
            </Card>
        </div>
    );
}