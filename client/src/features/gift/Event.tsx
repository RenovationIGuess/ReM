import React from 'react'
import { useNavigate } from 'react-router-dom'

const Event = (props: any) => {
  const navigate = useNavigate()
  const { eventId, title } = props
  return (
    <button
      className="rounded-md bg-bgPrimary shadow-sm transition-shadow hover:shadow-md"
      onClick={() => navigate(`/su-kien/${eventId}`)}
    >
      <img
        className="rounded-t-md object-contain"
        alt="example"
        src="https://media.istockphoto.com/id/628925698/vector/pile-of-hardcover-books.jpg?s=612x612&w=0&k=20&c=UskxzCZAQ4LXrgMhgW3M8Q5jdtWFPZ8WxwosF6h6euI="
      />
      <p className="w-full truncate py-4 text-center text-xl font-medium">{title}</p>
    </button>
  )
}

export default Event
