export default function LoadingEditPage() {
    return (
        <div className="my-12 flex flex-col mx-8 gap-12">
            <div className="h-12 w-48 bg-gray-200 rounded-lg animate-pulse" />
            <div className="flex flex-col md:grid grid-cols-2 gap-20">
                <div className="space-y-6">
                    {/* Title skeleton */}
                    <div className="flex flex-col gap-1">
                        <div className="h-6 w-24 bg-gray-200 rounded animate-pulse" />
                        <div className="h-10 w-full bg-gray-200 rounded-lg animate-pulse" />
                    </div>
                    
                    {/* Description skeleton */}
                    <div className="flex flex-col gap-1">
                        <div className="h-6 w-24 bg-gray-200 rounded animate-pulse" />
                        <div className="h-24 w-full bg-gray-200 rounded-lg animate-pulse" />
                    </div>

                    {/* Tags skeleton */}
                    <div className="flex flex-col gap-1">
                        <div className="h-6 w-24 bg-gray-200 rounded animate-pulse" />
                        <div className="flex gap-2">
                            {[1,2,3].map((i) => (
                                <div key={i} className="h-8 w-20 bg-gray-200 rounded-full animate-pulse" />
                            ))}
                        </div>
                    </div>

                    {/* Images skeleton */}
                    <div className="flex flex-col gap-1">
                        <div className="h-6 w-24 bg-gray-200 rounded animate-pulse" />
                        <div className="h-32 w-full bg-gray-200 rounded-lg animate-pulse" />
                    </div>
                </div>

                <div className="space-y-8">
                    {/* Details skeleton */}
                    <div className="flex flex-col gap-4">
                        <div className="h-6 w-24 bg-gray-200 rounded animate-pulse" />
                        {[1,2,3].map((i) => (
                            <div key={i} className="h-10 w-full bg-gray-200 rounded-lg animate-pulse" />
                        ))}
                    </div>

                    {/* Bullets skeleton */}
                    <div className="flex flex-col gap-4">
                        <div className="h-6 w-24 bg-gray-200 rounded animate-pulse" />
                        {[1,2,3].map((i) => (
                            <div key={i} className="h-10 w-full bg-gray-200 rounded-lg animate-pulse" />
                        ))}
                    </div>
                </div>
            </div>

            {/* Button skeleton */}
            <div className="h-10 w-32 bg-gray-200 rounded-lg animate-pulse" />
        </div>
    )
} 