export function scoreTier(score) {
  if (score >= 80) return 'high'
  if (score >= 55) return 'mid'
  return 'low'
}
