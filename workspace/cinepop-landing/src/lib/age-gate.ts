const STORAGE_KEY = 'cinepop.ageConfirmed';

export function isAgeConfirmed(): boolean {
  try {
    return localStorage.getItem(STORAGE_KEY) === '1';
  } catch {
    return false;
  }
}

export function setAgeConfirmed(confirmed: boolean): void {
  try {
    if (confirmed) localStorage.setItem(STORAGE_KEY, '1');
    else localStorage.removeItem(STORAGE_KEY);
  } catch {
    // ignore
  }
}

