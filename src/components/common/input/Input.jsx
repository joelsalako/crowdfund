import { forwardRef } from "react";

export const Input = forwardRef(
  (
    {
      error,
      ariaLabel,
      label,
      type = "text",
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
          <input
            aria-invalid={error ? "true" : "false"}
            aria-label={ariaLabel}
            type={type}
            readOnly={readOnly}
            placeholder={placeholder}
            value={value}
            onChange={onChange ? onChange : undefined}
            className="mt-2 outline-0 placeholder-[#515151] text-gray-600 block w-full h-12  text-sm rounded p-2  border border-slate-300 px-3"
            ref={ref}
            {...rest}
          />
        </div>

        <p className="capitalize text-red-500 text-xs">{error?.message}</p>
      </div>
    );
  }
);

Input.displayName = "Input";
