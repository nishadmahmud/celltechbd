function SkeletonBlock({ className = "" }) {
  return <div className={`animate-pulse rounded-xl bg-gray-200/80 ${className}`} />;
}

export default function Loading() {
  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-6 md:py-8 space-y-8 md:space-y-10">
        <section className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-4 md:gap-6">
          <SkeletonBlock className="h-[220px] md:h-[360px] rounded-3xl" />
          <div className="grid grid-cols-2 lg:grid-cols-1 gap-4 md:gap-6">
            <SkeletonBlock className="h-[104px] md:h-[168px] rounded-2xl" />
            <SkeletonBlock className="h-[104px] md:h-[168px] rounded-2xl" />
          </div>
        </section>

        <section className="space-y-4">
          <SkeletonBlock className="h-7 w-56" />
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3 md:gap-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <SkeletonBlock key={`cat-${i}`} className="h-20 md:h-24 rounded-2xl" />
            ))}
          </div>
        </section>

        <section className="space-y-4">
          <SkeletonBlock className="h-7 w-48" />
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-5">
            {Array.from({ length: 10 }).map((_, i) => (
              <div key={`prod-${i}`} className="space-y-2 md:space-y-3">
                <SkeletonBlock className="h-32 md:h-44 rounded-2xl" />
                <SkeletonBlock className="h-4 w-4/5" />
                <SkeletonBlock className="h-4 w-2/5" />
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-4">
          <SkeletonBlock className="h-7 w-40" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={`blog-${i}`} className="space-y-3">
                <SkeletonBlock className="h-40 md:h-52 rounded-2xl" />
                <SkeletonBlock className="h-5 w-5/6" />
                <SkeletonBlock className="h-4 w-2/3" />
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

