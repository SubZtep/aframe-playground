/**
 * Greatest Common Divisor
 */
export const gcd = (a: number, b: number): number => b === 0 ? a : gcd(b, a % b)

export const ratio = (a: number, b: number): number => {
  const divisor = gcd(a, b)
  return (a / divisor) / (b / divisor)
}
