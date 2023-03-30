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
  ...rest
}) {
  return (
    <div className="mb-4 form-input" {...rest}>
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
        min={min || 5}
        max={max || 30}
        isRequired
        isInvalid={!isValid}
      />
    </div>
  )
}

export default FormInput
