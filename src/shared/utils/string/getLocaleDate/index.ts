/**
 * This helper function helps return a formatted date based on the locale from an ISO standard format string
 * @param isoString the string that contains the timestamp in ISO starndard format
 */
export function getLocaleDate(isoString?: string | null) {
  return isoString ? new Date(isoString).toLocaleDateString() : '';
}

/**
 * This helper function helps return a formatted date based on the locale from an ISO standard format string
 * @param isoString the string that contains the timestamp in ISO starndard format
 */
export function getLocaleTime(isoString?: string | null) {
  return isoString ? new Date(isoString).toLocaleTimeString() : '';
}

export function getLocaleDateTime(isoString?: string | null) {
  const date = isoString ? new Date(isoString).toLocaleDateString() : '';
  const time = isoString ? new Date(isoString).toLocaleTimeString() : '';

  return isoString ? `${date} ${time}` : '';
}
