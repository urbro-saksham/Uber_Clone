import React from 'react'
import 'remixicon/fonts/remixicon.css';

const SearchPanel = () => {

  const locations = ["A", "B", "C", "D"]

  return (
    <div>
      {/* Sample Data */}

      {locations.map((e, idx) => {
            return <div key={idx} className='flex gap-4.5'>
            <i className="ri-arrow-right-down-line"></i>
            <h4>
              {e}
            </h4>
          </div>
      })}
    </div>
  )
}

export default SearchPanel;