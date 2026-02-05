"use client";
import { authClient } from "@/lib/auth-client";
import { BetterAuthActionButton } from "../../../components/auth/BetterAuthActionButton";
import { useRef, useState } from "react";

type VerificationTabProps = {
    email: string,
}

export function VerificationTab({ email }: VerificationTabProps) {
    const [countdown, setCountDown] = useState<number>(0);
    const interval = useRef<NodeJS.Timeout>(undefined);

    // TODO: there is an error when calling this function in the component scope, solve that
    function startEmailVerificationCountdown(time = 30) {
        setCountDown(time);

        clearInterval(interval.current);
        interval.current = setInterval(() => {
            setCountDown((t) => {
                const newT = t - 1;

                if (newT <= 0) {
                    clearInterval(interval.current);
                    return 0;
                }

                return newT;
            });
        }, 1000);
    };

    return (
        <div>
            <p className="mb-4">
                We sent you a verification link. Please check your email and click the link to verify your account
            </p>

            <BetterAuthActionButton
                className="cursor-pointer w-full"
                size='lg'
                disabled={countdown > 0}
                successMessage="Verification email sent"
                action={() => {
                    startEmailVerificationCountdown()
                    return authClient.sendVerificationEmail({
                        email: email,
                        callbackURL: "/"
                    });
                }}>{(countdown > 0)
                    ? `Verify Email (${countdown})`
                    : `Verify Email`
                }
            </BetterAuthActionButton>
        </div>
    );
}