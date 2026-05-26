import Home from './pages/Home';
import FollowCursor from './components/followcursor';
import BotpressChat from './BotpressChat';
export default function App() {
  return (
    <>

      <BotpressChat />
      <FollowCursor color="#323232a6" zIndex={9999} />
      <Home />
    </>
  );
}
