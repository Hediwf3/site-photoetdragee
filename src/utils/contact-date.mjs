export function formatWeddingDate(value) {
  const digits = value.replace(/\D/g, '').slice(0, 8);
  return [digits.slice(0, 2), digits.slice(2, 4), digits.slice(4)].filter(Boolean).join('/');
}

export function weddingDateError(value) {
  if (!value) return ''; // Native required validation supplies the empty-field message.
  if (!/^\d{2}\/\d{2}\/\d{4}$/.test(value)) return 'Indiquez la date au format JJ/MM/AAAA.';
  const [day, month, year] = value.split('/').map(Number);
  const date = new Date(0);
  date.setUTCFullYear(year, month - 1, day);
  if (year < 1900 || date.getUTCFullYear() !== year || date.getUTCMonth() !== month - 1 || date.getUTCDate() !== day) {
    return 'Cette date n’existe pas. Vérifiez le jour, le mois et l’année.';
  }
  return '';
}
