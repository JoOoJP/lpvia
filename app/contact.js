const WHATSAPP_NUMBER = "5541991014546";
const WHATSAPP_MESSAGE =
  "Olá, quero entender onde o crescimento da minha empresa está travando.";

export const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  WHATSAPP_MESSAGE,
)}`;
