/**
 * PATCH /users/profile validates Egyptian national mobile (see API: "01551234567"),
 * not intl-tel E.164 (+20…).
 */
export function toEgyptianMobileNational(phone: string): string {
  const p = phone.trim().replace(/\s/g, '');
  if (!p) return '';

  if (/^01[0-9]{9}$/.test(p)) {
    return p;
  }

  if (p.startsWith('+20')) {
    const rest = p.slice(3);
    return rest.startsWith('0') ? rest : `0${rest}`;
  }

  if (p.startsWith('0020')) {
    const rest = p.slice(4);
    return rest.startsWith('0') ? rest : `0${rest}`;
  }

  if (p.startsWith('20') && p.length >= 11) {
    const rest = p.slice(2);
    return rest.startsWith('0') ? rest : `0${rest}`;
  }

  if (/^1[0-9]{9}$/.test(p)) {
    return `0${p}`;
  }

  return p;
}
