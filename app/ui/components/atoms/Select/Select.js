const Select = ({
  children,
  ...rest
}) => {
  return (
    <select>
      {children.map(item => {
        <option>{item}</option>
      })}
    </select>
  )
}

export default Select
