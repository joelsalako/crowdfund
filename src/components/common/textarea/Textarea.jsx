import { forwardRef } from "react";

export const Textarea = forwardRef(
  (
    {
      error,
      ariaLabel,
      label,
      readOnly = false,
      placeholder,
      value,
      onChange,
      ...rest
    },
    ref
  ) => {
    return (
      <div>
        {label && (
          <label
            htmlFor={label}
            className={`block text-xs font-medium text-primary-200`}
          >
            {label}
          </label>
        )}

        <div className="relative mt-1 rounded-md">
          <textarea
            aria-invalid={error ? "true" : "false"}
            aria-label={ariaLabel}
            readOnly={readOnly}
            placeholder={placeholder}
            onChange={onChange ? onChange : undefined}
            rows="5"
            className="mt-2 outline-0 placeholder-[#515151] text-gray-600 block w-full text-sm rounded p-2  border border-slate-300 px-3 resize-none"
            ref={ref}
            {...rest}
          >
            {value}
          </textarea>
        </div>

        <p className="capitalize text-red-500 text-xs">{error?.message}</p>
      </div>
    );
  }
);

Textarea.displayName = "Textarea";
