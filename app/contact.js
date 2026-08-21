const WHATSAPP_NUMBER = "5541991014546";
const WHATSAPP_MESSAGE =
  "Olá, conheci o trabalho da VIA e quero conversar sobre um projeto.";

export const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  WHATSAPP_MESSAGE,
)}`;
