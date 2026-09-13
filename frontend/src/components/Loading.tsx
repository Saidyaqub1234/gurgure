export function LoadingSpinner({ size = 'md', dark }: { size?: 'sm' | 'md' | 'lg'; dark?: boolean }) {
  const sizes = { sm: 'w-5 h-5', md: 'w-8 h-8', lg: 'w-12 h-12' };
  return (
    <div className="flex items-center justify-center p-8">
      <div className={`${sizes[size]} border-4 ${dark ? 'border-white/10 border-t-brand-blue-light' : 'border-neutral-200 border-t-brand-blue'} rounded-full animate-spin`} />
    </div>
  );
}

export function PageLoading({ dark }: { dark?: boolean }) {
  return (
    <div className={`min-h-screen flex items-center justify-center ${dark ? 'bg-[#0b1424]' : ''}`}>
      <div className="text-center">
        <div className={`w-16 h-16 border-4 ${dark ? 'border-white/10 border-t-brand-blue-light' : 'border-neutral-200 border-t-brand-blue'} rounded-full animate-spin mx-auto mb-4`} />
        <p className={dark ? 'text-white/40' : 'text-neutral-500'}>Loading...</p>
      </div>
    </div>
  );
}

export function Skeleton({ className = '' }: { className?: string }) {
  return (
    <div className={`animate-pulse bg-neutral-200 rounded-xl ${className}`} />
  );
}

export function SectionSkeleton() {
  return (
    <div className="space-y-6 p-8">
      <Skeleton className="h-10 w-64 mx-auto" />
      <Skeleton className="h-6 w-96 mx-auto" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
        {[1, 2, 3].map((i) => (
          <div key={i} className="space-y-4 p-6 bg-white rounded-2xl shadow-sm">
            <Skeleton className="h-16 w-16 rounded-full" />
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
          </div>
        ))}
      </div>
    </div>
  );
}
