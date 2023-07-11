import React from 'react'
import { useNavigate } from 'react-router-dom'

const Event = (props: any) => {
  const navigate = useNavigate()
  const { eventId, title, type } = props
  return (
    <button
      className="rounded-md bg-bgPrimary shadow-sm transition-shadow hover:shadow-md"
      onClick={() => navigate(`/su-kien/${eventId}`)}
    >
      <img
        // width={300}
        // height={450}
        className="aspect-square w-full rounded-t-md object-cover"
        alt="example"
        src={
          type
            ? 'https://img.freepik.com/premium-photo/cute-young-woman-reading-book-anime-style-background_176697-4132.jpg?w=740'
            : 'https://stockdep.net/files/images/42832247.jpg'
        }
      />
      <p className="w-full truncate py-4 text-center text-xl font-medium">{title}</p>
    </button>
  )
}

export default Event
