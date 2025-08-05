import { useEffect, useRef } from 'react'

interface Message {
  userId: string
  userName: string
  userPicture: string
  content: string
  timestamp: string
}

interface User {
  id: string
  email: string
  name: string
  picture: string
}

interface MessageListProps {
  messages: Message[]
  currentUser: User | null
  isTyping: boolean
}

const MessageList = ({ messages, currentUser, isTyping }: MessageListProps) => {
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    })
  }

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {messages.length === 0 ? (
        <div className="text-center text-gray-500 py-8">
          <p>No messages yet</p>
          <p className="text-sm">Start the conversation!</p>
        </div>
      ) : (
        messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${message.userId === currentUser?.id ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`flex max-w-xs lg:max-w-md ${message.userId === currentUser?.id ? 'flex-row-reverse' : 'flex-row'}`}>
              <img
                src={message.userPicture}
                alt={message.userName}
                className="w-8 h-8 rounded-full flex-shrink-0"
              />
              <div className={`mx-2 ${message.userId === currentUser?.id ? 'text-right' : 'text-left'}`}>
                <div className={`px-4 py-2 rounded-lg ${
                  message.userId === currentUser?.id
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-100 text-gray-900'
                }`}>
                  <p className="text-sm">{message.content}</p>
                </div>
                <div className={`text-xs text-gray-500 mt-1 ${
                  message.userId === currentUser?.id ? 'text-right' : 'text-left'
                }`}>
                  {message.userName} • {formatTime(message.timestamp)}
                </div>
              </div>
            </div>
          </div>
        ))
      )}
      
      {isTyping && (
        <div className="flex justify-start">
          <div className="flex max-w-xs lg:max-w-md">
            <div className="mx-2">
              <div className="px-4 py-2 rounded-lg bg-gray-100">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      <div ref={messagesEndRef} />
    </div>
  )
}

export default MessageList 