import * as React from "react"
import { useState } from "react"
import FormInput from "./FormInput"
import { useDispatch } from "react-redux"
import {
  patchLogAPI,
  patchLog,
  removeLog,
  removeLogAPI,
} from "../store/slices/logs"

import { clearError } from "../store/slices/error"

import {
  LOG_INPUT_MIN_LENGTH,
  LOG_INPUT_MAX_LENGTH,
  isValidLogLength,
} from "../helpers/log-input"

import { UPDATE, DELETE } from "../lang/en-gb"

function LogEdit({ log, handleIsOpen }) {
  const dispatch = useDispatch()
  const [logValue, setLogValue] = useState(log.value)
  const isValid = isValidLogLength(logValue.length) && logValue !== log.value

  const handleChange = event => {
    setLogValue(event.target.value)
  }

  const handleSubmit = event => {
    event.preventDefault()
    if (log.value === logValue) return

    dispatch(clearError())
    dispatch(patchLog({ id: log.id, value: logValue }))
    dispatch(patchLogAPI({ id: log.id, value: logValue }))
      .unwrap()
      .then(() => handleIsOpen(false))
  }

  const handleRemove = () => {
    dispatch(clearError())
    dispatch(removeLog({ id: log.id }))
    dispatch(removeLogAPI({ id: log.id }))
      .unwrap()
      .then(() => handleIsOpen(false))
  }

  return (
    <div className="log-edit">
      <form onSubmit={handleSubmit} className="log-edit__form">
        <FormInput
          className="log-edit__form-input"
          placeholder={logValue}
          value={logValue}
          type="text"
          min={LOG_INPUT_MIN_LENGTH}
          max={LOG_INPUT_MAX_LENGTH}
          isValid={isValid}
          onChange={handleChange}
        />
        <div className="log-edit__form__controls">
          <button
            className="log-edit__form__controls-button primary"
            type="submit"
            disabled={!isValid}
          >
            {UPDATE}
          </button>
          <button
            className="log-edit__form__controls-button warning"
            type="button"
            onClick={handleRemove}
          >
            {DELETE}
          </button>
        </div>
      </form>
    </div>
  )
}

export default LogEdit
