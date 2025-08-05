import { Users, MessageCircle } from 'lucide-react'

interface Room {
  _id: string
  name: string
  description: string
  createdBy: string
  messages: any[]
  onlineUsers: string[]
  createdAt: string
  updatedAt: string
}

interface RoomListProps {
  rooms: Room[]
  currentRoom: Room | null
  onJoinRoom: (room: Room) => void
}

const RoomList = ({ rooms, currentRoom, onJoinRoom }: RoomListProps) => {
  return (
    <div className="flex-1 overflow-y-auto">
      {rooms.length === 0 ? (
        <div className="p-4 text-center text-gray-500">
          <MessageCircle className="w-8 h-8 mx-auto mb-2 text-gray-300" />
          <p>No rooms available</p>
          <p className="text-sm">Create a room to get started</p>
        </div>
      ) : (
        <div className="p-2">
          {rooms.map((room) => (
            <div
              key={room._id}
              onClick={() => onJoinRoom(room)}
              className={`p-3 rounded-lg cursor-pointer transition-colors ${
                currentRoom?._id === room._id
                  ? 'bg-primary-50 border border-primary-200'
                  : 'hover:bg-gray-50'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-medium text-gray-900 truncate">
                    {room.name}
                  </h4>
                  {room.description && (
                    <p className="text-xs text-gray-500 truncate mt-1">
                      {room.description}
                    </p>
                  )}
                  <div className="flex items-center space-x-2 mt-2">
                    <Users className="w-3 h-3 text-gray-400" />
                    <span className="text-xs text-gray-500">
                      {room.onlineUsers.length} online
                    </span>
                    <span className="text-xs text-gray-400">•</span>
                    <span className="text-xs text-gray-500">
                      {room.messages.length} messages
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default RoomList 