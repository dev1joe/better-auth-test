import { BetterAuthActionButton } from "@/components/auth/BetterAuthActionButton";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export function PasskeysButton() {
    const router = useRouter();
    const { refetch } = authClient.useSession();

    function handlePasskeySignin() {
        return authClient.signIn.passkey(undefined, {
            onError: (error) => {
                toast.error(error.error.message || "Failed to sign in");
            },
            onSuccess: () => {
                refetch();
                router.push('/');
            }
        })
    }

    return (
        <BetterAuthActionButton
            className="w-full cursor-pointer"
            variant="destructive"
            action={handlePasskeySignin}
        >
            Use Passkey
        </BetterAuthActionButton>
    );

}