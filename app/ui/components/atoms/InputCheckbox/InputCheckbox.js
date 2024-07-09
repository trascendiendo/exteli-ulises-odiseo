const InputCheckbox = ({
  text,
  id,
  ...rest
}) => {
  return (
    <div className="block mb-1">
      <input
        type="checkbox"
        id={id}
        {...rest}
      />
      <label className="pl-2 text-sm" htmlFor={id}>
        {text}
      </label>
    </div>
  )
}

export default InputCheckbox
