
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from "@/components/ui/sonner";
import Header from './components/Header';
import Footer from './components/Footer';
import Index from './pages/Index';
import Dashboard from './pages/Dashboard';
import SignIn from './pages/SignIn';
import Register from './pages/Register';
import CreateAnimation from './pages/CreateAnimation';
import AnimationDetails from './pages/AnimationDetails';
import NotFound from './pages/NotFound';
import "./App.css";

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/register" element={<Register />} />
            <Route path="/create-animation" element={<CreateAnimation />} />
            <Route path="/animations/:id" element={<AnimationDetails />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
      <Toaster />
    </Router>
  );
}

export default App;
