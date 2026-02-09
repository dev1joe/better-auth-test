import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function loading() {
    return (
        <div className="max-w-4xl mx-auto my-6 px-4 box-border">
            <div className="mb-8">
                <Link href="/" className="inline-flex items-center mb-6">
                    <ArrowLeft className="size-4 mr-2" />
                    Back to Home
                </Link>
                <div className="flex items-center space-x-4">
                    <Skeleton className="size-20 rounded-full" />
                    <div className="flex-1">
                        <div className="flex gap-1 justify-between items-start mb-2">
                            <Skeleton className="w-50 h-10" />
                            <Skeleton className="w-12 h-5 rounded-full" />
                        </div>
                        <Skeleton className="w-32 h-4" />
                    </div>
                </div>
            </div>

            <Skeleton className="w-full h-10 rounded-xl mb-2"/>
            <Skeleton className="w-full h-70 rounded-xl" />
        </div>
    );
}