import * as React from "react"
import FormInput from "./FormInput"

import LogInputLength from "./LogInputLength"
import Tags from "./Tags"

import { useSelector, useDispatch } from "react-redux"
import {
  reset,
  update,
  logValue,
  logTags,
  create,
} from "../store/slices/log-input"
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
  const propLogTags = useSelector(logTags)
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
    <div className="card log__input p-2 mb-3">
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
          />
          <LogInputLength />
        </div>

        <button
          className="primary xs:hide ml-1"
          type="submit"
          disabled={!isValid}
        >
          {ADD}
        </button>
      </form>

      <Tags tags={propLogTags} />
    </div>
  )
}

export default LogInput
