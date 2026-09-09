export const ADMIN_WHATSAPP = [
  {
    id: "admin-utama",
    label: "Admin utama",
    localNumber: "085771776702",
    internationalNumber: "6285771776702",
  },
  {
    id: "admin-cadangan",
    label: "Admin cadangan",
    localNumber: "082319720002",
    internationalNumber: "6282319720002",
  },
] as const;

export function normalizeWhatsAppNumber(input: string): string {
  const digits = input.replace(/\D/g, "");

  if (digits.startsWith("0")) {
    return `62${digits.slice(1)}`;
  }

  if (digits.startsWith("62")) {
    return digits;
  }

  throw new Error("Nomor WhatsApp tidak valid");
}

export function makeWhatsAppUrl(
  number: string,
  message: string,
): string {
  return `https://wa.me/${normalizeWhatsAppNumber(number)}?text=${encodeURIComponent(message)}`;
}
