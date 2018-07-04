import React from 'react'

export default ({imageName, drawRectangle}) => {
  const imageId = imageName.slice(0, -4);
  return (
    <div key={imageName} className="wrapper column">
      <img
        draggable="false"
        src={`/images/${imageName}`}
        alt={imageName}
        data-id={imageId}
      />
      <button
        onClick={() => drawRectangle(imageId, 0, 0, 0, 0)}
        class="button is-small is-light"
      >
        RESET
          </button>
      <div className="rectangle" id={imageId} />
    </div>
  )
}
