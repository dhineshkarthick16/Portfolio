import { getQualifyingAchievements } from "@/lib/supabase";
import { AchievementsClient } from "./AchievementsClient";
import { Achievement } from "@/types";

export async function Achievements({ items }: { items?: Achievement[] }) {
  const displayItems = items ?? (await getQualifyingAchievements());

  return <AchievementsClient items={displayItems} />;
}
