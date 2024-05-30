const Button = ({
  size,
  text,
  inactive,
  isOutline,
  isAlt,
  ...rest
}) => {
  const getType = () => {
    if (inactive) return 'inactive'
    if (isAlt) {
      return !isOutline ? 'secondary' : 'secondaryOutline'
    } else {
      return !isOutline ? 'solid' : 'outline'
    }
  }

  return (
    <>
      <Button 
        isDisabled={inactive}
        size={size}
        variant={getType()}
        {...rest}
      >
        {text}
      </Button>
    </>
  )
}

export default Button
