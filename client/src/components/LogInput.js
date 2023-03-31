import * as React from "react"
import FormInput from "./FormInput"

import LogInputLength from "./LogInputLength"

import { useSelector, useDispatch } from "react-redux"
import { reset, update, logValue, create } from "../store/slices/log-input"
import { clearError } from "../store/slices/error"
import {
  randomPlaceholder,
  isValidLogLength,
  LOG_INPUT_MIN_LENGTH,
  LOG_INPUT_MAX_LENGTH,
} from "../helpers/log-input"

import { ADD } from "../lang/en-gb"

function LogInput() {
  const dispatch = useDispatch()
  const propLogValue = useSelector(logValue)
  const isValid = isValidLogLength(propLogValue.length)

  const handleChange = event => dispatch(update(event.target.value))

  const handleSubmit = event => {
    event.preventDefault()
    dispatch(clearError())

    dispatch(create())
      .unwrap()
      .then(() => dispatch(reset()))
  }

  return (
    <div className="card log__input mb-3">
      <form
        id="logForm"
        onSubmit={handleSubmit}
        className="flex flex-row flex-wrap"
      >
        <div className="flex-grow">
          <FormInput
            placeholder={randomPlaceholder()}
            value={propLogValue}
            type="text"
            min={LOG_INPUT_MIN_LENGTH}
            max={LOG_INPUT_MAX_LENGTH}
            isValid={isValid}
            onChange={handleChange}
            className="mb-0"
          />
          <LogInputLength logValue={propLogValue} />
        </div>

        <button
          className="primary sm:hide mb-0"
          type="submit"
          disabled={!isValid}
        >
          <svg
            xmlSpace="preserve"
            fillRule="evenodd"
            strokeLinejoin="round"
            strokeMiterlimit="2"
            clipRule="evenodd"
            viewBox="0 0 16 16"
            className="icon:2"
          >
            <path d="M5.9219 6.1694h-5.11c-.22 0-.39.176-.39.392v3.217c0 .216.17.391.39.391h5.11v5.109c0 .216.17.391.39.391h3.22c.21 0 .39-.175.39-.391v-5.109h5.11c.21 0 .39-.175.39-.391v-3.217c0-.216-.18-.392-.39-.392h-5.11v-5.108c0-.216-.18-.392-.39-.392h-3.22c-.22 0-.39.176-.39.392v5.108Z" />
          </svg>
        </button>
      </form>
    </div>
  )
}

export default LogInput
