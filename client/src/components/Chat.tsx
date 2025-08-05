import { useState, useEffect } from 'react'
import { useSocket } from '../contexts/SocketContext'
import { useAuth } from '../contexts/AuthContext'
import axios from 'axios'
import { Send, Plus, Users } from 'lucide-react'
import RoomList from './RoomList'
import MessageList from './MessageList'
import CreateRoomModal from './CreateRoomModal'

interface Room {
  _id: string
  name: string
  description: string
  createdBy: string
  messages: Message[]
  onlineUsers: string[]
  createdAt: string
  updatedAt: string
}

interface Message {
  userId: string
  userName: string
  userPicture: string
  content: string
  timestamp: string
}

const Chat = () => {
  const { socket, isConnected } = useSocket()
  const { user } = useAuth()
  const [rooms, setRooms] = useState<Room[]>([])
  const [currentRoom, setCurrentRoom] = useState<Room | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [loading, setLoading] = useState(true)

  // Fetch rooms on component mount
  useEffect(() => {
    fetchRooms()
  }, [])

  // Socket event listeners
  useEffect(() => {
    if (!socket) return

    socket.on('room-messages', (roomMessages: Message[]) => {
      setMessages(roomMessages)
    })

    socket.on('new-message', (message: Message) => {
      setMessages(prev => [...prev, message])
    })

    socket.on('user-joined', (userData: { userId: string; userName: string; userPicture: string }) => {
      console.log(`${userData.userName} joined the room`)
    })

    socket.on('user-left', (userData: { userId: string; userName: string }) => {
      console.log(`${userData.userName} left the room`)
    })

    socket.on('online-users', (onlineUsers: string[]) => {
      if (currentRoom) {
        setCurrentRoom(prev => prev ? { ...prev, onlineUsers } : null)
      }
    })

    socket.on('user-typing', (data: { userName: string; isTyping: boolean }) => {
      setIsTyping(data.isTyping)
    })

    return () => {
      socket.off('room-messages')
      socket.off('new-message')
      socket.off('user-joined')
      socket.off('user-left')
      socket.off('online-users')
      socket.off('user-typing')
    }
  }, [socket, currentRoom])

  const fetchRooms = async () => {
    try {
      const response = await axios.get('/api/rooms', { withCredentials: true })
      setRooms(response.data)
      setLoading(false)
    } catch (error) {
      console.error('Failed to fetch rooms:', error)
      setLoading(false)
    }
  }

  const joinRoom = async (room: Room) => {
    if (!socket || !isConnected) return

    setCurrentRoom(room)
    socket.emit('join-room', room.name)
  }

  const sendMessage = () => {
    if (!newMessage.trim() || !socket || !currentRoom) return

    socket.emit('send-message', newMessage.trim())
    setNewMessage('')
  }

  const handleTyping = (isTyping: boolean) => {
    if (socket) {
      socket.emit('typing', isTyping)
    }
  }

  const handleCreateRoom = async (name: string, description: string) => {
    try {
      const response = await axios.post('/api/rooms', { name, description }, { withCredentials: true })
      setRooms(prev => [response.data, ...prev])
      setShowCreateModal(false)
    } catch (error) {
      console.error('Failed to create room:', error)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  return (
    <div className="flex h-[calc(100vh-8rem)]">
      {/* Sidebar */}
      <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">Chat Rooms</h2>
            <button
              onClick={() => setShowCreateModal(true)}
              className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
              title="Create Room"
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>
        </div>
        
        <RoomList
          rooms={rooms}
          currentRoom={currentRoom}
          onJoinRoom={joinRoom}
        />
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col bg-white">
        {currentRoom ? (
          <>
            {/* Room Header */}
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{currentRoom.name}</h3>
                  <p className="text-sm text-gray-500">{currentRoom.description}</p>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <Users className="w-4 h-4" />
                  <span>{currentRoom.onlineUsers.length} online</span>
                </div>
              </div>
            </div>

            {/* Messages */}
            <MessageList
              messages={messages}
              currentUser={user}
              isTyping={isTyping}
            />

            {/* Message Input */}
            <div className="p-4 border-t border-gray-200">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      sendMessage()
                    }
                  }}
                  onFocus={() => handleTyping(true)}
                  onBlur={() => handleTyping(false)}
                  placeholder="Type a message..."
                  className="flex-1 input"
                />
                <button
                  onClick={sendMessage}
                  disabled={!newMessage.trim()}
                  className="btn btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <h3 className="text-lg font-medium text-gray-900 mb-2">Welcome to Espresso Chat</h3>
              <p className="text-gray-500">Select a room to start chatting</p>
            </div>
          </div>
        )}
      </div>

      {/* Create Room Modal */}
      {showCreateModal && (
        <CreateRoomModal
          onClose={() => setShowCreateModal(false)}
          onCreateRoom={handleCreateRoom}
        />
      )}
    </div>
  )
}

export default Chat 