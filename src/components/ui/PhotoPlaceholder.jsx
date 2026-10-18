// Soft shape that stands in for a photo until real images are added.
// centered = label in the middle; otherwise the label sits near the bottom.
export default function PhotoPlaceholder({ label, centered = false, className = '' }) {
  return (
    <div
      role="img"
      aria-label={`Photo placeholder: ${label}`}
      className={`flex justify-center text-[13px] font-medium text-rose ${
        centered ? 'items-center' : 'items-end pb-6'
      } ${className}`}
    >
      {label}
    </div>
  )
}