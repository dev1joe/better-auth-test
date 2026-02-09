import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function loading() {
    return (
        <div className="container my-8 px-4 mx-auto">
            <Link href="/" className="inline-flex items-center mb-6">
                <ArrowLeft className="size-4 mr-2" />
                Back to Home
            </Link>

            <Card>
                <CardContent className="w-full flex flex-col gap-4">
                    <div className="flex justify-between items-center mb-4">
                        <Skeleton className="w-30 h-8" />
                        <Skeleton className="w-15 h-8" />
                    </div>
                    {Array.from({ length: 5 }).map((_, index) => (
                        <div className="flex gap-4" key={index}>
                            <Skeleton className="h-12 flex-6" />
                            <Skeleton className="h-12 flex-2" />
                            <Skeleton className="h-12 flex-2" />
                            <Skeleton className="h-12 flex-2" />
                        </div>
                    ))}
                </CardContent>
            </Card>
        </div>
    )
}