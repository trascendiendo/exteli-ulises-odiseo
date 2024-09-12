const SkeletonIncommingsCard = () => {
  return (
    <div className="card">
      <div className="card__body">
        <div
          style={{
            backgroundColor: '#E0E0E0',
            borderRadius: '7px',
            height: '24px',
            width: '175px',
          }}
        >
        </div>
        <div className='flex items-center mt-3'>
          <div
            style={{
              backgroundColor: '#E0E0E0',
              borderRadius: '7px',
              height: '24px',
              width: '105px',
            }}
          >
          </div>
          <div
            className="ml-3"
            style={{
              backgroundColor: '#E0E0E0',
              borderRadius: '7px',
              height: '24px',
              width: '45px',
            }}
          >
          </div>
        </div>
        <div
          className="mt-3"
          style={{
            backgroundColor: '#E0E0E0',
            borderRadius: '7px',
            height: '24px',
            width: '245px',
          }}
        >
        </div>
      </div>
    </div>
  )
}

export default SkeletonIncommingsCard
