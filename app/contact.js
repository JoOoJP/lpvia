const WHATSAPP_NUMBER = "5541987383806";

export const phoneE164 = `+${WHATSAPP_NUMBER}`;

export const email = "agenciaviamkt@gmail.com";
export const emailUrl = `mailto:${email}`;

export function buildWhatsappUrl(message) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
