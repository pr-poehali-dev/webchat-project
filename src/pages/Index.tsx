import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import Icon from '@/components/ui/icon';

interface User {
  id: string;
  name: string;
  email: string;
}

interface Contact {
  id: string;
  name: string;
  avatar: string;
  lastSeen: string;
  online: boolean;
}

interface Message {
  id: string;
  senderId: string;
  text: string;
  timestamp: string;
}

const contacts: Contact[] = [
  { id: '1', name: 'Анна Смирнова', avatar: 'АС', lastSeen: 'онлайн', online: true },
  { id: '2', name: 'Михаил Петров', avatar: 'МП', lastSeen: '5 мин назад', online: false },
  { id: '3', name: 'Елена Козлова', avatar: 'ЕК', lastSeen: 'вчера', online: false },
  { id: '4', name: 'Дмитрий Волков', avatar: 'ДВ', lastSeen: 'онлайн', online: true }
];

const initialMessages: Message[] = [
  { id: '1', senderId: '1', text: 'Привет! Как дела?', timestamp: '14:30' },
  { id: '2', senderId: 'me', text: 'Привет! Всё хорошо, спасибо!', timestamp: '14:32' },
  { id: '3', senderId: '1', text: 'Отлично! Как проект продвигается?', timestamp: '14:33' }
];

export default function Index() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginData, setLoginData] = useState({ name: '', email: '' });
  const [user, setUser] = useState<User | null>(null);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [newMessage, setNewMessage] = useState('');

  const handleLogin = () => {
    if (loginData.name && loginData.email) {
      const newUser = {
        id: 'me',
        name: loginData.name,
        email: loginData.email
      };
      setUser(newUser);
      setIsLoggedIn(true);
    }
  };

  const handleSendMessage = () => {
    if (newMessage.trim() && selectedContact) {
      const message: Message = {
        id: Date.now().toString(),
        senderId: 'me',
        text: newMessage,
        timestamp: new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })
      };
      setMessages([...messages, message]);
      setNewMessage('');
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-messenger-indigo to-messenger-pink flex items-center justify-center p-4">
        <Card className="w-full max-w-md p-8 bg-white/10 backdrop-blur-md border-white/20">
          <div className="text-center mb-6">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-messenger-pink to-messenger-green flex items-center justify-center">
              <Icon name="MessageCircle" className="text-white" size={32} />
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">Добро пожаловать</h1>
            <p className="text-white/70">Войдите, чтобы начать общение</p>
          </div>

          <div className="space-y-4">
            <div>
              <Input
                placeholder="Ваше имя"
                value={loginData.name}
                onChange={(e) => setLoginData({ ...loginData, name: e.target.value })}
                className="bg-white/20 border-white/30 text-white placeholder:text-white/50"
              />
            </div>
            <div>
              <Input
                type="email"
                placeholder="Email"
                value={loginData.email}
                onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                className="bg-white/20 border-white/30 text-white placeholder:text-white/50"
              />
            </div>
            <Button
              onClick={handleLogin}
              className="w-full bg-gradient-to-r from-messenger-indigo to-messenger-pink text-white border-0 hover:from-messenger-pink hover:to-messenger-indigo"
              disabled={!loginData.name || !loginData.email}
            >
              Войти в чат
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gradient-to-br from-messenger-indigo to-messenger-pink">
      {/* Contacts Sidebar */}
      <div className="w-80 bg-white/10 backdrop-blur-md border-r border-white/20 flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-white/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Avatar className="w-10 h-10">
                <AvatarFallback className="bg-gradient-to-r from-messenger-pink to-messenger-green text-white font-semibold">
                  {user?.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div>
                <h2 className="font-semibold text-white">{user?.name}</h2>
                <p className="text-sm text-white/60">{user?.email}</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsLoggedIn(false)}
              className="text-white hover:bg-white/20"
            >
              <Icon name="LogOut" size={18} />
            </Button>
          </div>
        </div>

        {/* Search */}
        <div className="p-4">
          <div className="relative">
            <Icon name="Search" className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50" size={16} />
            <Input
              placeholder="Поиск контактов..."
              className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/50"
            />
          </div>
        </div>

        {/* Contacts */}
        <div className="flex-1 overflow-y-auto">
          <div className="px-4 py-2">
            <h3 className="text-sm font-semibold text-white/70 uppercase tracking-wide">Контакты</h3>
          </div>
          {contacts.map((contact) => (
            <div
              key={contact.id}
              onClick={() => setSelectedContact(contact)}
              className={`flex items-center gap-3 px-4 py-3 cursor-pointer transition-colors ${
                selectedContact?.id === contact.id
                  ? 'bg-white/20'
                  : 'hover:bg-white/10'
              }`}
            >
              <div className="relative">
                <Avatar className="w-12 h-12">
                  <AvatarFallback className="bg-gradient-to-r from-messenger-pink to-messenger-green text-white font-semibold">
                    {contact.avatar}
                  </AvatarFallback>
                </Avatar>
                {contact.online && (
                  <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-green-400 rounded-full border-2 border-white"></div>
                )}
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-white">{contact.name}</h3>
                <p className="text-sm text-white/60">{contact.lastSeen}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {selectedContact ? (
          <>
            {/* Chat Header */}
            <div className="bg-white/10 backdrop-blur-md border-b border-white/20 p-4">
              <div className="flex items-center gap-3">
                <Avatar className="w-10 h-10">
                  <AvatarFallback className="bg-gradient-to-r from-messenger-pink to-messenger-green text-white font-semibold">
                    {selectedContact.avatar}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="font-semibold text-white">{selectedContact.name}</h2>
                  <p className="text-sm text-white/70">{selectedContact.lastSeen}</p>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.senderId === 'me' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs px-4 py-2 rounded-2xl ${
                      message.senderId === 'me'
                        ? 'bg-gradient-to-r from-messenger-indigo to-messenger-pink text-white'
                        : 'bg-white/20 backdrop-blur-sm text-white'
                    }`}
                  >
                    <p className="text-sm">{message.text}</p>
                    <p className="text-xs opacity-70 mt-1">{message.timestamp}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Message Input */}
            <div className="bg-white/10 backdrop-blur-md border-t border-white/20 p-4">
              <div className="flex items-center gap-3">
                <div className="flex-1">
                  <Input
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Введите сообщение..."
                    className="bg-white/20 border-white/30 text-white placeholder:text-white/50"
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  />
                </div>
                <Button
                  onClick={handleSendMessage}
                  disabled={!newMessage.trim()}
                  className="bg-gradient-to-r from-messenger-indigo to-messenger-pink text-white border-0 hover:from-messenger-pink hover:to-messenger-indigo"
                >
                  <Icon name="Send" size={18} />
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center text-white">
              <Icon name="Users" size={64} className="mx-auto mb-4 opacity-50" />
              <h2 className="text-2xl font-bold mb-2">Выберите контакт</h2>
              <p className="text-white/70">Начните разговор с кем-то из списка</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}