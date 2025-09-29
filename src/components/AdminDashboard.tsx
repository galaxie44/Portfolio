import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  Mail,
  MailOpen,
  Trash2,
  Reply,
  LogOut,
  User,
  Calendar,
  MessageSquare,
  CheckCircle,
  Home,
  Settings,
  Plus,
  Edit,
  TrashIcon
} from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { ContactMessage } from '../types/auth'
import { Skill } from '../types'
import {
  getMessages,
  markMessageAsRead,
  markMessageAsReplied,
  deleteMessage,
  getUnreadCount
} from '../utils/messageStorage'
import {
  getSkills,
  addSkill,
  updateSkill,
  deleteSkill
} from '../utils/adminStorage'
import SkillsManagement from './SkillsManagement'

const AdminDashboard: React.FC = () => {
  const { user, logout } = useAuth()
  const [messages, setMessages] = useState<ContactMessage[]>([])
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null)
  const [filter, setFilter] = useState<'all' | 'unread' | 'read'>('all')
  const [unreadCount, setUnreadCount] = useState(0)
  const [activeTab, setActiveTab] = useState<'messages' | 'skills'>('messages')
  const [skills, setSkills] = useState<Skill[]>([])
  const [showSkillForm, setShowSkillForm] = useState(false)
  const [editingSkill, setEditingSkill] = useState<Skill | null>(null)

  useEffect(() => {
    loadMessages()
    loadSkills()
  }, [])

  const loadMessages = () => {
    const allMessages = getMessages()
    setMessages(allMessages)
    setUnreadCount(getUnreadCount())
  }

  const loadSkills = () => {
    const allSkills = getSkills()
    setSkills(allSkills)
  }

  const handleAddSkill = (skill: Omit<Skill, 'id'>) => {
    addSkill(skill)
    loadSkills()
    setShowSkillForm(false)
    setEditingSkill(null)
  }

  const handleUpdateSkill = (skillName: string, updates: Partial<Skill>) => {
    updateSkill(skillName, updates)
    loadSkills()
    setEditingSkill(null)
  }

  const handleDeleteSkill = (skillName: string) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette compétence ?')) {
      deleteSkill(skillName)
      loadSkills()
    }
  }

  const handleEditSkill = (skill: Skill) => {
    setEditingSkill(skill)
    setShowSkillForm(true)
  }

  const handleMessageClick = (message: ContactMessage) => {
    if (!message.read) {
      markMessageAsRead(message.id)
      loadMessages()
    }
    setSelectedMessage(message)
  }

  const handleMarkAsReplied = (messageId: string) => {
    markMessageAsReplied(messageId)
    loadMessages()
    if (selectedMessage?.id === messageId) {
      setSelectedMessage({ ...selectedMessage, replied: true })
    }
  }

  const handleDeleteMessage = (messageId: string) => {
    deleteMessage(messageId)
    loadMessages()
    if (selectedMessage?.id === messageId) {
      setSelectedMessage(null)
    }
  }

  const filteredMessages = messages.filter(message => {
    switch (filter) {
      case 'unread':
        return !message.read
      case 'read':
        return message.read
      default:
        return true
    }
  })

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const handleLogout = () => {
    logout()
  }

  const goToHome = () => {
    window.location.href = '/'
  }

  return (
    <div className="min-h-screen bg-dark-50 dark:bg-dark-900">
      {/* Header */}
      <header className="bg-white dark:bg-dark-800 shadow-sm border-b border-dark-200 dark:border-dark-700">
        <div className="container">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-primary-600 dark:text-primary-400" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-dark-900 dark:text-white">
                  Tableau de bord Admin
                </h1>
                <p className="text-sm text-dark-600 dark:text-dark-400">
                  Connecté en tant que {user?.username}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-sm text-dark-600 dark:text-dark-400">
                <Mail className="w-4 h-4" />
                <span>{unreadCount} non lus</span>
              </div>

              {/* Onglets de navigation */}
              <div className="flex space-x-1 bg-dark-100 dark:bg-dark-700 rounded-lg p-1">
                <button
                  onClick={() => setActiveTab('messages')}
                  className={`px-3 py-1 rounded-md text-sm transition-colors ${
                    activeTab === 'messages'
                      ? 'bg-primary-600 text-white'
                      : 'text-dark-600 dark:text-dark-400 hover:text-dark-900 dark:text-white'
                  }`}
                >
                  Messages
                </button>
                <button
                  onClick={() => setActiveTab('skills')}
                  className={`px-3 py-1 rounded-md text-sm transition-colors ${
                    activeTab === 'skills'
                      ? 'bg-primary-600 text-white'
                      : 'text-dark-600 dark:text-dark-400 hover:text-dark-900 dark:text-white'
                  }`}
                >
                  Compétences
                </button>
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={goToHome}
                className="flex items-center space-x-2 px-4 py-2 bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 rounded-lg hover:bg-primary-200 dark:hover:bg-primary-800 transition-colors"
              >
                <Home className="w-4 h-4" />
                <span>Portfolio</span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleLogout}
                className="flex items-center space-x-2 px-4 py-2 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 rounded-lg hover:bg-red-200 dark:hover:bg-red-800 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span>Déconnexion</span>
              </motion.button>
            </div>
          </div>
        </div>
      </header>

      <div className="container py-8">
        {activeTab === 'messages' ? (
          <div className="grid lg:grid-cols-3 gap-8">
          {/* Messages List */}
          <div className="lg:col-span-1">
            <div className="card">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-dark-900 dark:text-white">
                  Messages ({messages.length})
                </h2>
              </div>

              {/* Filters */}
              <div className="flex space-x-2 mb-6">
                {[
                  { key: 'all', label: 'Tous', count: messages.length },
                  { key: 'unread', label: 'Non lus', count: messages.filter(m => !m.read).length },
                  { key: 'read', label: 'Lus', count: messages.filter(m => m.read).length }
                ].map(({ key, label, count }) => (
                  <button
                    key={key}
                    onClick={() => setFilter(key as any)}
                    className={`px-3 py-1 rounded-full text-sm transition-colors ${
                      filter === key
                        ? 'bg-primary-600 text-white'
                        : 'bg-dark-100 dark:bg-dark-700 text-dark-700 dark:text-dark-300 hover:bg-dark-200 dark:hover:bg-dark-600'
                    }`}
                  >
                    {label} ({count})
                  </button>
                ))}
              </div>

              {/* Messages */}
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {filteredMessages.length === 0 ? (
                  <div className="text-center py-8 text-dark-600 dark:text-dark-400">
                    <MessageSquare className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>Aucun message</p>
                  </div>
                ) : (
                  filteredMessages.map((message) => (
                    <motion.div
                      key={message.id}
                      whileHover={{ scale: 1.02 }}
                      onClick={() => handleMessageClick(message)}
                      className={`p-4 rounded-lg cursor-pointer transition-all ${
                        selectedMessage?.id === message.id
                          ? 'bg-primary-100 dark:bg-primary-900 border border-primary-300 dark:border-primary-700'
                          : 'bg-dark-50 dark:bg-dark-700 hover:bg-dark-100 dark:hover:bg-dark-600'
                      } ${!message.read ? 'border-l-4 border-l-primary-500' : ''}`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-2 mb-1">
                            <h3 className="font-semibold text-dark-900 dark:text-white truncate">
                              {message.name}
                            </h3>
                            {!message.read && (
                              <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                            )}
                            {message.replied && (
                              <CheckCircle className="w-4 h-4 text-green-500" />
                            )}
                          </div>
                          <p className="text-sm text-dark-600 dark:text-dark-400 truncate">
                            {message.subject}
                          </p>
                          <p className="text-xs text-dark-500 dark:text-dark-500 mt-1">
                            {formatDate(message.timestamp)}
                          </p>
                        </div>
                        <div className="flex items-center space-x-1 ml-2">
                          {!message.read ? (
                            <Mail className="w-4 h-4 text-primary-500" />
                          ) : (
                            <MailOpen className="w-4 h-4 text-dark-400" />
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Message Detail */}
          <div className="lg:col-span-2">
            {selectedMessage ? (
              <div className="card">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-dark-900 dark:text-white mb-2">
                      {selectedMessage.subject}
                    </h2>
                    <div className="flex items-center space-x-4 text-sm text-dark-600 dark:text-dark-400">
                      <div className="flex items-center space-x-1">
                        <User className="w-4 h-4" />
                        <span>{selectedMessage.name}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Mail className="w-4 h-4" />
                        <span>{selectedMessage.email}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>{formatDate(selectedMessage.timestamp)}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    {!selectedMessage.replied && (
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleMarkAsReplied(selectedMessage.id)}
                        className="p-2 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded-lg hover:bg-green-200 dark:hover:bg-green-800 transition-colors"
                        title="Marquer comme répondu"
                      >
                        <Reply className="w-4 h-4" />
                      </motion.button>
                    )}

                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleDeleteMessage(selectedMessage.id)}
                      className="p-2 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 rounded-lg hover:bg-red-200 dark:hover:bg-red-800 transition-colors"
                      title="Supprimer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </motion.button>
                  </div>
                </div>

                <div className="prose prose-lg dark:prose-invert max-w-none">
                  <p className="text-dark-700 dark:text-dark-300 leading-relaxed whitespace-pre-wrap">
                    {selectedMessage.message}
                  </p>
                </div>

                {selectedMessage.replied && (
                  <div className="mt-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                    <div className="flex items-center space-x-2 text-green-700 dark:text-green-300">
                      <CheckCircle className="w-5 h-5" />
                      <span className="font-medium">Message marqué comme répondu</span>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="card">
                <div className="text-center py-12">
                  <MessageSquare className="w-16 h-16 text-dark-400 dark:text-dark-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-dark-900 dark:text-white mb-2">
                    Sélectionnez un message
                  </h3>
                  <p className="text-dark-600 dark:text-dark-400">
                    Choisissez un message dans la liste pour voir son contenu
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <SkillsManagement
              skills={skills}
              onAdd={handleAddSkill}
              onUpdate={handleUpdateSkill}
              onDelete={handleDeleteSkill}
              onEdit={handleEditSkill}
              showForm={showSkillForm}
              editingSkill={editingSkill}
              onShowForm={setShowSkillForm}
              onCancelEdit={() => {
                setShowSkillForm(false)
                setEditingSkill(null)
              }}
            />
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default AdminDashboard
