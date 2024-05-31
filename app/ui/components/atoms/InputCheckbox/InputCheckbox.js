const InputCheckbox = ({
  text,
  id,
  ...rest
}) => {
  return (
    <div className="block mb-1">
      <input
        id={id}
        {...rest}
      />
      <label className="pl-2 text-sm" for={id}>
        {text}
      </label>
    </div>
  )
}

export default InputCheckbox
