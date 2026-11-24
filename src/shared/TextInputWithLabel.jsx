function TextInputWithLabel ({
  elementId,
  labelText,
  onChange,
  ref,
  value,
  isRequired="false",
}) {
  return (
    <>
      <label htmlFor={elementId}>{labelText}</label>
      <input
          type="text"
          id={elementId}
          ref={ref}
          value={value}
          onChange={onChange}
          required={isRequired}
      >
      </input>
    </>
  )
}

export default TextInputWithLabel;