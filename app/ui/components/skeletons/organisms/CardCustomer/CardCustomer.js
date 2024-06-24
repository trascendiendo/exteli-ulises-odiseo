const SkeletonCardCustomer = () => {
  return (
    <>
      <div className="userUI__content flex justify-center">
        <div className="userUI__details md:w-8/12">
          <div className="userUI__avatar flex justify-center">
            <div 
              className="userUI__image"
              style={{
                backgroundColor: '#E0E0E0',
                borderRadius: '140px',
                height: '140px',
                width: '140px',
              }}
            >
            </div>
          </div>
          <div className="mt-4 userUI__profile text-center">
            <h4 
              className="capitalize inline-block font-semibold mb-1 text-lg w-7/12"
              style={{
                backgroundColor: '#E0E0E0',
                borderRadius: '7px',
                height: '28px'
              }}
            >
            </h4>
            <div
              className="mx-auto my-0 w-2/12"
              style={{
                backgroundColor: '#E0E0E0',
                borderRadius: '7px',
                height: '21px'
              }}
            >
            </div>
          </div>
          <div className="userUI__summary flex items-center justify-center mt-4">
          </div>
        </div>
      </div>
    </>
  )
}

export default SkeletonCardCustomer
