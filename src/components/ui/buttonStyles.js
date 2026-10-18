// Shared button looks, used on <a>, <Link> and <button> elements alike.
const base =
  'inline-flex items-center justify-center gap-2 rounded-full text-sm font-semibold ' +
  'no-underline transition-colors duration-200 cursor-pointer'

export const btnPrimary = `${base} min-h-12 px-[26px] bg-wine text-white hover:bg-wine-deep`
export const btnOutline = `${base} min-h-12 px-[26px] border border-line-strong bg-white text-wine hover:bg-blush-100`
export const btnOutlineSmall = `${base} min-h-11 px-4 border border-line-strong bg-white text-wine hover:bg-blush-100`