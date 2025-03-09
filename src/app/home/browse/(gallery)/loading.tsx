export default function Loading() {
    // Create an array of 8 items for the skeleton grid
    const skeletonItems = Array(8).fill(null)
    
    return (
        <div className='grow'>
            <div className="my-12 flex flex-col md:mx-8">
                {/* Search bar skeleton */}
                <div className="ACTION BAR mb-8">
                    <div className='flex justify-end mx-4 gap-4'>
                        <div className='flex items-end w-full max-w-md gap-2'>
                            <div className='w-full h-10 bg-gray-200 rounded-full animate-pulse' />
                        </div>
                    </div>
                </div>

                {/* Grid of skeleton cards */}
                <div className="md:grid grid-cols-2 flex flex-col gap-8">
                    {skeletonItems.map((_, index) => (
                        <div 
                            key={index}
                            className="bg-gray-100 rounded-2xl p-6 animate-pulse"
                        >
                            {/* Title skeleton */}
                            <div className="h-8 bg-gray-200 rounded-lg w-3/4 mb-4" />
                            
                            {/* Details skeleton */}
                            <div className="flex gap-2 mb-4">
                                <div className="h-4 bg-gray-200 rounded w-24" />
                                <div className="h-4 bg-gray-200 rounded w-24" />
                            </div>
                            
                            {/* Tags skeleton */}
                            <div className="flex gap-2">
                                <div className="h-6 bg-gray-200 rounded-full w-16" />
                                <div className="h-6 bg-gray-200 rounded-full w-20" />
                                <div className="h-6 bg-gray-200 rounded-full w-14" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}