export const estimate_elaboration_message =
  'Please elaborate on the system you need. Include the main features, how players use it, and anything it needs to save, sync, or secure.';

const project_terms = /\b(?:ability|admin|ai|animation|anti-?cheat|boss|car|combat|controller|currency|cutscene|data|datastore|economy|enemy|framework|fps|gamepass|gun|hitbox|hud|inventory|lobby|matchmaking|menu|movement|multiplayer|npc|obby|parry|pathfinding|pet|profile|quest|queue|round|save|shop|simulator|sword|system|teleport|trade|trading|tycoon|ui|vehicle|weapon)\b/i;
const word_pattern = /[a-z0-9]+/gi;

export function validate_estimate_spec(spec: string): string | null {
  const normalized = spec.trim().replace(/\s+/g, ' ');
  const words = normalized.match(word_pattern) ?? [];
  const distinct_words = new Set(words.map((word) => word.toLowerCase()));

  if (normalized.length < 12 || words.length < 2) return estimate_elaboration_message;
  if (distinct_words.size === 1) return estimate_elaboration_message;
  if (!project_terms.test(normalized)) return estimate_elaboration_message;

  return null;
}
