import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface Chat {
  id: string;
  name: string;
  lastMessage: string;
  timestamp: string;
  unread: number;
  avatar: string;
  type: 'chat' | 'channel' | 'group' | 'bot';
  online?: boolean;
}

interface Message {
  id: string;
  sender: string;
  content: string;
  timestamp: string;
  isBot?: boolean;
  isMe?: boolean;
}

const sampleChats: Chat[] = [
  {
    id: '1',
    name: 'Анна Петрова',
    lastMessage: 'Привет! Как дела?',
    timestamp: '14:30',
    unread: 2,
    avatar: 'AP',
    type: 'chat',
    online: true
  },
  {
    id: '2',
    name: 'Команда разработки',
    lastMessage: 'Новые задачи готовы',
    timestamp: '13:45',
    unread: 5,
    avatar: 'КР',
    type: 'group'
  },
  {
    id: '3',
    name: 'Новости IT',
    lastMessage: 'Обновления React 19 уже доступны!',
    timestamp: '12:20',
    unread: 1,
    avatar: 'IT',
    type: 'channel'
  },
  {
    id: '4',
    name: 'ChatBot Помощник',
    lastMessage: 'Могу помочь с задачами',
    timestamp: '11:00',
    unread: 0,
    avatar: '🤖',
    type: 'bot'
  }
];

const sampleMessages: Message[] = [
  {
    id: '1',
    sender: 'Анна Петрова',
    content: 'Привет! Как твои дела?',
    timestamp: '14:28',
    isMe: false
  },
  {
    id: '2',
    sender: 'Ты',
    content: 'Привет! Все отлично, работаю над новым проектом',
    timestamp: '14:29',
    isMe: true
  },
  {
    id: '3',
    sender: 'Анна Петрова',
    content: 'Звучит интересно! Расскажешь подробнее?',
    timestamp: '14:30',
    isMe: false
  },
  {
    id: '4',
    sender: 'ChatBot Помощник',
    content: 'Привет! Я могу помочь тебе с автоматизацией задач. Просто напиши /help для списка команд.',
    timestamp: '14:31',
    isBot: true,
    isMe: false
  }
];

export default function Index() {
  const [activeTab, setActiveTab] = useState('chats');
  const [selectedChat, setSelectedChat] = useState<Chat | null>(sampleChats[0]);
  const [newMessage, setNewMessage] = useState('');

  const navItems = [
    { id: 'chats', label: 'Чаты', icon: 'MessageCircle' },
    { id: 'channels', label: 'Каналы', icon: 'Radio' },
    { id: 'groups', label: 'Группы', icon: 'Users' },
    { id: 'contacts', label: 'Контакты', icon: 'UserPlus' },
    { id: 'profile', label: 'Профиль', icon: 'User' },
    { id: 'settings', label: 'Настройки', icon: 'Settings' }
  ];

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      setNewMessage('');
    }
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-messenger-indigo via-messenger-pink to-messenger-green">
      {/* Sidebar */}
      <div className="w-80 bg-white/10 backdrop-blur-md border-r border-white/20 flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-white/20">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-messenger-indigo to-messenger-pink flex items-center justify-center">
              <Icon name="MessageCircle" className="text-white" size={20} />
            </div>
            <h1 className="text-xl font-bold text-white">Messenger</h1>
          </div>
          
          {/* Navigation */}
          <div className="grid grid-cols-3 gap-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-all duration-200 ${
                  activeTab === item.id
                    ? 'bg-white/20 text-white'
                    : 'text-white/70 hover:bg-white/10 hover:text-white'
                }`}
              >
                <Icon name={item.icon as any} size={18} />
                <span className="text-xs font-medium">{item.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Search */}
        <div className="p-4">
          <div className="relative">
            <Icon name="Search" className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50" size={16} />
            <Input
              placeholder="Поиск чатов..."
              className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:bg-white/20"
            />
          </div>
        </div>

        {/* Chat List */}
        <div className="flex-1 overflow-y-auto px-2">
          {sampleChats.map((chat) => (
            <Card
              key={chat.id}
              className={`m-2 p-3 bg-white/10 border-white/20 cursor-pointer transition-all duration-200 hover:bg-white/20 animate-fade-in ${
                selectedChat?.id === chat.id ? 'bg-white/20 ring-2 ring-white/30' : ''
              }`}
              onClick={() => setSelectedChat(chat)}
            >
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Avatar className="w-12 h-12">
                    <AvatarFallback className="bg-gradient-to-r from-messenger-pink to-messenger-green text-white font-semibold">
                      {chat.avatar}
                    </AvatarFallback>
                  </Avatar>
                  {chat.online && (
                    <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-green-400 rounded-full border-2 border-white"></div>
                  )}
                  {chat.type === 'bot' && (
                    <div className="absolute -top-1 -right-1 w-5 h-5 bg-messenger-indigo rounded-full flex items-center justify-center">
                      <Icon name="Zap" size={10} className="text-white" />
                    </div>
                  )}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-semibold text-white text-sm truncate">{chat.name}</h3>
                    <span className="text-xs text-white/60">{chat.timestamp}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-white/70 truncate">{chat.lastMessage}</p>
                    {chat.unread > 0 && (
                      <Badge className="bg-messenger-pink text-white text-xs ml-2">
                        {chat.unread}
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {selectedChat ? (
          <>
            {/* Chat Header */}
            <div className="bg-white/10 backdrop-blur-md border-b border-white/20 p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar className="w-10 h-10">
                    <AvatarFallback className="bg-gradient-to-r from-messenger-pink to-messenger-green text-white">
                      {selectedChat.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h2 className="font-semibold text-white">{selectedChat.name}</h2>
                    <div className="flex items-center gap-2">
                      {selectedChat.type === 'bot' && (
                        <Badge className="bg-messenger-indigo text-white text-xs">
                          <Icon name="Bot" size={12} className="mr-1" />
                          Bot
                        </Badge>
                      )}
                      {selectedChat.online && (
                        <span className="text-xs text-green-300 flex items-center gap-1">
                          <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                          онлайн
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
                    <Icon name="Phone" size={18} />
                  </Button>
                  <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
                    <Icon name="Video" size={18} />
                  </Button>
                  <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
                    <Icon name="MoreHorizontal" size={18} />
                  </Button>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {sampleMessages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.isMe ? 'justify-end' : 'justify-start'} animate-slide-up`}
                >
                  <div
                    className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                      message.isMe
                        ? 'bg-gradient-to-r from-messenger-indigo to-messenger-pink text-white ml-12'
                        : message.isBot
                        ? 'bg-gradient-to-r from-messenger-green to-blue-500 text-white mr-12'
                        : 'bg-white/20 backdrop-blur-sm text-white mr-12'
                    }`}
                  >
                    {!message.isMe && (
                      <p className="text-xs font-medium mb-1 opacity-70">{message.sender}</p>
                    )}
                    <p className="text-sm">{message.content}</p>
                    <p className="text-xs opacity-70 mt-1">{message.timestamp}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Message Input */}
            <div className="bg-white/10 backdrop-blur-md border-t border-white/20 p-4">
              <div className="flex items-center gap-3">
                <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
                  <Icon name="Paperclip" size={18} />
                </Button>
                <div className="flex-1 relative">
                  <Input
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Введите сообщение..."
                    className="bg-white/20 border-white/30 text-white placeholder:text-white/50 pr-12"
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute right-1 top-1/2 transform -translate-y-1/2 text-white hover:bg-white/20"
                  >
                    <Icon name="Smile" size={18} />
                  </Button>
                </div>
                <Button
                  onClick={handleSendMessage}
                  className="bg-gradient-to-r from-messenger-indigo to-messenger-pink text-white border-0 hover:from-messenger-pink hover:to-messenger-indigo"
                >
                  <Icon name="Send" size={18} />
                </Button>
              </div>
              
              {/* Bot Quick Actions */}
              {selectedChat.type === 'bot' && (
                <div className="flex gap-2 mt-3">
                  <Button variant="outline" size="sm" className="bg-white/10 border-white/30 text-white hover:bg-white/20">
                    /help
                  </Button>
                  <Button variant="outline" size="sm" className="bg-white/10 border-white/30 text-white hover:bg-white/20">
                    /weather
                  </Button>
                  <Button variant="outline" size="sm" className="bg-white/10 border-white/30 text-white hover:bg-white/20">
                    /news
                  </Button>
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center text-white">
              <Icon name="MessageCircle" size={64} className="mx-auto mb-4 opacity-50" />
              <h2 className="text-2xl font-bold mb-2">Выберите чат</h2>
              <p className="text-white/70">Начните общение с друзьями, коллегами или ботами</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}