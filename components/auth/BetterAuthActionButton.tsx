"use client";
// components/auth/BetterAuthActionButton (a wrapper around the ActionButton Component from )
/**
 * components/auth/BetterAuthActionButton
 * A wrapper around the ActionButton Component from "Web Dev Simplified" YT channel
 */
import { ComponentProps } from "react";
import { ActionButton } from "../ui/action-button";

type BetterAuthActionButtonProps =
    Omit<ComponentProps<typeof ActionButton>, 'action'> & {
        action: () => Promise<{ error: null | { message?: string } }>,
        successMessage?: string
    };

export function BetterAuthActionButton({ action, successMessage, ...props }: BetterAuthActionButtonProps) {
    return (
        <ActionButton
            {...props}
            action={async () => {
                const result = await action();
                if (result.error) {
                    return { error: true, message: result.error.message || "Action failed" }
                } else {
                    return { error: false, message: successMessage! }
                }
            }}
        />
    );
}