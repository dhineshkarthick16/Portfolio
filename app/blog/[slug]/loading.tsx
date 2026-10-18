/**
 * app/blog/[slug]/loading.tsx — individual blog post loading UI.
 *
 * Shown by Next.js while navigating to /blog/[slug].
 */
import LoadingScreen from '@/components/ui/LoadingScreen';

export default function Loading() {
  return <LoadingScreen />;
}
