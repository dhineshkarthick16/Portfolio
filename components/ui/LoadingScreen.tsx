'use client';

import InfinityLoader from '@/components/ui/InfinityLoader';

/**
 * LoadingScreen — renders the clean infinity loop loader.
 * Used across route loading boundaries (loading.tsx).
 */
export default function LoadingScreen() {
  return <InfinityLoader size={180} fullScreen={true} />;
}
