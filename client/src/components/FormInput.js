import * as React from "react"
import { Input } from "@chakra-ui/react"

function FormInput({
  labelText,
  placeholder,
  value,
  type,
  isValid,
  onChange,
  min,
  max,
  className,
  ...rest
}) {
  return (
    <div className={`mb-4 form-input ${className ? className : ""}`} {...rest}>
      {labelText && (
        <label className="mb-1" htmlFor={labelText}>
          {labelText}
        </label>
      )}

      <Input
        id={labelText}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        type={type}
        minLength={min || 5}
        min={min || 5}
        maxLength={max || 30}
        max={max || 30}
        isRequired
        isInvalid={!isValid}
      />
    </div>
  )
}

export default FormInput
