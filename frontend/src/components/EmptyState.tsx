interface EmptyStateProps {
  title?: string;
  message?: string;
  icon?: React.ReactNode;
}

export function EmptyState({ title = 'No content yet', message = 'Content will appear here once added.', icon }: EmptyStateProps) {
  return (
    <div className="min-h-[40vh] flex items-center justify-center">
      <div className="text-center max-w-md">
        {icon || (
          <div className="w-20 h-20 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
            </svg>
          </div>
        )}
        <h3 className="text-xl font-heading font-bold text-neutral-800 mb-2">{title}</h3>
        <p className="text-neutral-500">{message}</p>
      </div>
    </div>
  );
}
