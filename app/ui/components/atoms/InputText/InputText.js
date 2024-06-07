const InputText = ({
  capitalize,
  isDisabled,
  ...rest
}) => {
  return (
    <>
      <input 
        className={`block border ${capitalize ? 'capitalize' : ''} rounded-lg px-3 py-3.5 text-sm w-full`}
        disabled={isDisabled}
        style={{ backgroundColor: '#fff', borderColor: '#dbe0e5', color: '#5b6b79' }}
        {...rest} 
      />
    </>
  )
}

export default InputText
