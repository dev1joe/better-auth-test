"use client";
import { BetterAuthActionButton } from "@/components/auth/BetterAuthActionButton";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { authClient } from "@/lib/auth-client";

export function MembersTab() {
    const { data: activeOrg } = authClient.useActiveOrganization();
    const { data: session } = authClient.useSession();

    function handleRemoveMember(memberId: string) {
        return authClient.organization.removeMember({
            memberIdOrEmail: memberId,
        });
    }

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Action</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {activeOrg?.members?.map((m) => (
                    <TableRow key={m.id}>
                        <TableCell>{m.user.name}</TableCell>
                        <TableCell>{m.user.email}</TableCell>
                        <TableCell>
                            <Badge variant={
                                m.role === "owner"
                                    ? "default"
                                    : m.role === "admin"
                                        ? "secondary"
                                        : "outline"
                            }>
                                {m.role}
                            </Badge>
                        </TableCell>
                        <TableCell>
                            {session?.user.id !== m.user.id && (
                                <BetterAuthActionButton
                                    action={() => handleRemoveMember(m.user.id)}
                                    variant="destructive"
                                    size="sm"
                                    className="cursor-pointer"
                                >
                                    Remove
                                </BetterAuthActionButton>
                            )}
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}