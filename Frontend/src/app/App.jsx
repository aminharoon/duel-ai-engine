import MainLayout from './layout/MainLayout';
import ChatContainer from '../chat/components/ChatContainer';
import MessageInput from '../chat/components/MessageInput';
import { useChat } from '../chat/hooks/useChat';

export default function App() {
  const { messages, loading, sendMessage } = useChat();

  return (
    <MainLayout>
      <div className="flex-1 flex flex-col justify-between h-full relative">
        <ChatContainer messages={messages} />
        <MessageInput onSendMessage={sendMessage} loading={loading} />
      </div>
    </MainLayout>
  );
}