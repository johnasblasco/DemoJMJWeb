import Home from './pages/Home';
import FollowCursor from './components/followcursor';

export default function App() {
  return (
    <>
      <FollowCursor color="#323232a6" zIndex={9999} />
      <Home />
    </>
  );
}
