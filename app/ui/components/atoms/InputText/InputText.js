const InputText = ({
  ...rest
}) => {
  return (
    <>
      <input 
        className="block border rounded-lg px-3 py-3.5 text-sm w-full"
        style={{ backgroundColor: '#fff', borderColor: '#dbe0e5', color: '#5b6b79' }}
        {...rest} 
      />
    </>
  )
}

export default InputText
