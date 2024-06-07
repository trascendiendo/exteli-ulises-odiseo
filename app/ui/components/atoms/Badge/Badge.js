const Badge = ({
    text,
  ...rest
}) => {
  return (
    <>
      <span {...rest}>
        {text}
      </span>
    </>
  )
}

export default Badge
