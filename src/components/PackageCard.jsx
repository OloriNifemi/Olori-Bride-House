import { Link } from 'react-router'
import CheckIcon from './ui/CheckIcon'
import { btnPrimary } from './ui/buttonStyles'
import { formatNaira } from '../config/site'

export default function PackageCard({ pkg }) {
  const premium = Boolean(pkg.premium)

  return (
    <article
      className={`row-span-9 grid grid-rows-subgrid gap-y-0 rounded-3xl border p-[30px] ${
        premium ? 'border-[#EBCFCF] bg-blush-100' : 'border-line bg-blush-50'
      }`}
    >
      {/* 1. Name */}
      <div className="flex flex-wrap content-start items-center gap-2">
        <h3 className="text-[21px] font-semibold leading-snug tracking-[-0.01em]">{pkg.name}</h3>
        {premium && (
          <span className="inline-flex items-center rounded-full bg-wine px-2.5 py-0.5 text-xs font-semibold text-white">
            Premium
          </span>
        )}
      </div>

      {/* 2. Price */}
      <p className="pt-2 text-[30px] font-medium leading-[1.35] text-mauve">
        {pkg.price ? formatNaira(pkg.price) : pkg.priceLabel}
      </p>

      {/* 3. Duration */}
      <p className="text-sm font-medium">{pkg.duration}</p>

      {/* 4. Best for */}
      <p className="pb-5 pt-6 font-medium">{pkg.bestFor}</p>

      {/* 5. Call to action */}
      <div>
        {pkg.price ? (
          <Link to={`/reserve/${pkg.id}`} className={btnPrimary}>
            Get started
          </Link>
        ) : (
          <a href="#contact" className={btnPrimary}>
            Request a quote
          </a>
        )}
      </div>

      {/* 6. Divider */}
      <div className="pb-6 pt-7">
        <div className="border-t border-dotted border-line-strong" />
      </div>

      {/* 7. "What you get" */}
      <div>
        <p className="mb-3.5 font-medium">What you get:</p>
        {pkg.intro && <p className="mb-2.5 text-sm">{pkg.intro}</p>}
      </div>

      {/* 8. Inclusions */}
      <ul className="flex flex-col gap-[9px] text-sm text-plum-soft">
        {pkg.includes.map((item) => (
          <li key={item} className="flex items-start gap-2.5">
            <CheckIcon />
            <span>{item}</span>
          </li>
        ))}
      </ul>

      {/* 9. Add-ons */}
      <p className="pt-[22px] text-[13px] text-plum-soft">
        <span className="font-semibold text-plum">Add-ons:</span> {pkg.addOns.join(' · ')}
      </p>
    </article>
  )
}