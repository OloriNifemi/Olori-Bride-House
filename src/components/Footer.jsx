import { SITE } from '../config/site'

export default function Footer() {
  return (
    <footer className="border-t border-line bg-blush-50 px-6 py-7 text-center text-[13px] text-plum-soft">
      {SITE.name} · A {SITE.parentBrand} brand · {SITE.city}
    </footer>
  )
}