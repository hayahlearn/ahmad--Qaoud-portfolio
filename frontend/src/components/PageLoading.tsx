import { Skeleton } from "@/components/ui/skeleton";

export const PageLoading = () => {
    return (
        <div className="min-h-screen bg-background">
            {/* Header Skeleton */}
            <div className="border-b">
                <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                    <Skeleton className="h-8 w-32" />
                    <div className="hidden md:flex gap-6">
                        <Skeleton className="h-4 w-16" />
                        <Skeleton className="h-4 w-16" />
                        <Skeleton className="h-4 w-16" />
                        <Skeleton className="h-4 w-16" />
                    </div>
                    <Skeleton className="h-9 w-24" />
                </div>
            </div>

            {/* Hero Content Skeleton */}
            <div className="container mx-auto px-4 py-20">
                <div className="max-w-3xl space-y-8">
                    <Skeleton className="h-12 w-3/4" />
                    <Skeleton className="h-6 w-full" />
                    <Skeleton className="h-6 w-2/3" />
                    <div className="flex gap-4 pt-4">
                        <Skeleton className="h-12 w-32" />
                        <Skeleton className="h-12 w-32" />
                    </div>
                </div>
            </div>
        </div>
    );
};
