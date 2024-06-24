const SkeletonTimeline = () => {
  return (
    <>
      <div className='timeline skeleton flex flex-col items-center justify-start'>
        <div className='timeline__content md:w-10/12'>
          <div 
            className='timeline__item'
          >
            <div 
              className='item__content'
              style={{ height: '70px' }}
            >
            </div>
          </div>
          <div 
            className='timeline__item'
          >
            <div 
              className='item__content'
              style={{ height: '119px' }}
            >
            </div>
          </div>
          <div 
            className='timeline__item'
          >
            <div 
              className='item__content'
              style={{ height: '91px' }}
            >
            </div>
          </div>
        </div>
        <div className='timeline__line mt-6 md:w-10/12'>
          <span 
            className="inline-block text-sm w-4/12"
            style={{ 
              backgroundColor: '#E0E0E0',
              borderRadius: '7px',
              height: '20px' 
            }}
          >
          </span>
          <div
            className={`border mt-2 rounded-lg px-3 py-3.5 text-sm w-full`}
            style={{ 
              backgroundColor: '#E0E0E0',
              borderRadius: '7px',
              height: '140px' 
            }}
          >
          </div>
          <span 
            className="inline-block mt-4 text-sm w-5/12"
            style={{ 
              backgroundColor: '#E0E0E0',
              borderRadius: '7px',
              height: '48px' 
            }}
          ></span>
        </div>
      </div>
    </>
  )
}

export default SkeletonTimeline
