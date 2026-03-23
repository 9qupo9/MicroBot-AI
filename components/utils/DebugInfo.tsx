'use client';

interface DebugInfoProps {
  data: any;
  title?: string;
  collapsed?: boolean;
}

export default function DebugInfo({ data, title = 'Debug Info', collapsed = true }: DebugInfoProps) {
  if (process.env.NODE_ENV === 'production') {
    return null;
  }

  return (
    <details className="mt-4 p-4 bg-gray-100 rounded-lg text-sm" open={!collapsed}>
      <summary className="cursor-pointer font-semibold text-gray-700 hover:text-gray-900">
        {title}
      </summary>
      <pre className="mt-2 overflow-auto text-xs text-gray-600">
        {JSON.stringify(data, null, 2)}
      </pre>
    </details>
  );
}