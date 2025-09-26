import { ContactMessage } from '../types/auth'

const STORAGE_KEY = 'portfolio_messages'

export const saveMessage = (message: Omit<ContactMessage, 'id' | 'timestamp' | 'read' | 'replied'>): ContactMessage => {
  const newMessage: ContactMessage = {
    ...message,
    id: Date.now().toString(),
    timestamp: new Date().toISOString(),
    read: false,
    replied: false
  }

  const existingMessages = getMessages()
  const updatedMessages = [newMessage, ...existingMessages]
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedMessages))

  return newMessage
}

export const getMessages = (): ContactMessage[] => {
  try {
    const messages = localStorage.getItem(STORAGE_KEY)
    return messages ? JSON.parse(messages) : []
  } catch (error) {
    console.error('Error loading messages:', error)
    return []
  }
}

export const markMessageAsRead = (messageId: string): void => {
  const messages = getMessages()
  const updatedMessages = messages.map(message =>
    message.id === messageId ? { ...message, read: true } : message
  )
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedMessages))
}

export const markMessageAsReplied = (messageId: string): void => {
  const messages = getMessages()
  const updatedMessages = messages.map(message =>
    message.id === messageId ? { ...message, replied: true } : message
  )
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedMessages))
}

export const deleteMessage = (messageId: string): void => {
  const messages = getMessages()
  const updatedMessages = messages.filter(message => message.id !== messageId)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedMessages))
}

export const getUnreadCount = (): number => {
  const messages = getMessages()
  return messages.filter(message => !message.read).length
}
