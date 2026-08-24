const WHATSAPP_NUMBER = "5541991014546";

export const phoneE164 = `+${WHATSAPP_NUMBER}`;

export const email = "agenciaviamkt@gmail.com";
export const emailUrl = `mailto:${email}`;

const WHATSAPP_MESSAGE =
  "Olá, conheci o trabalho da VIA e quero conversar sobre um projeto.";

export const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  WHATSAPP_MESSAGE,
)}`;
