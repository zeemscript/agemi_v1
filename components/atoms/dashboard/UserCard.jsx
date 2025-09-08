import React from 'react'
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
const UserCard = () => {
  return (
      <Avatar className="h-10 w-10 rounded-full">
          <AvatarImage src="/img.jpg" alt={"Image"} />
          <AvatarFallback className="rounded-full">CN</AvatarFallback>
      </Avatar>
  )
}

export default UserCard
