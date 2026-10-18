// A labelled form field with an optional error message underneath.
// Usage: <Field id="r-name" label="Full name" value={...} onChange={...} error={...} />
//        <Field as="textarea" ... />   <Field as="select" ...>options</Field>

const inputBase =
  'w-full rounded-xl border bg-blush-50 px-3.5 text-[15px] text-plum ' +
  'placeholder:text-plum-soft transition-colors focus:border-wine'

export default function Field({
  id,
  label,
  error,
  required,
  as: Tag = 'input',
  className = '',
  children,
  ...props
}) {
  const errorId = `${id}-error`
  const sizing = Tag === 'textarea' ? 'py-3 resize-y' : 'min-h-[46px]'

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-medium">
        {label}
        {required && <span className="text-rose"> *</span>}
      </label>
      <Tag
        id={id}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        className={`${inputBase} ${sizing} ${error ? 'border-rose' : 'border-line-strong'} ${className}`}
        {...props}
      >
        {children}
      </Tag>
      {error && (
        <p id={errorId} className="text-[13px] font-medium text-wine">
          {error}
        </p>
      )}
    </div>
  )
}