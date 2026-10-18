import { SITE } from '../config/site'

// Builds a WhatsApp link that opens a chat with your number and a pre-written message.
// Returns null if no WhatsApp number has been set in src/config/site.js.
export function whatsappLink(message) {
  const number = SITE.whatsappNumber.replace(/\D/g, '')
  if (!number) return null
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`
}