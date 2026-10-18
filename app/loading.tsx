/**
 * app/loading.tsx — root-level route loading UI.
 *
 * Next.js App Router automatically renders this as a Suspense boundary
 * fallback while the root page's server components (e.g. DB fetches for
 * achievements, hackathon counts) are resolving during navigation.
 */
import LoadingScreen from '@/components/ui/LoadingScreen';

export default function Loading() {
  return <LoadingScreen />;
}
