import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// Context Providers
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { GameProvider } from './context/GameContext';
import { ConsolesProvider } from './context/ConsolesContext';
import { ItemsProvider } from './context/ItemsContext';
import { AdminProvider } from './context/AdminContext';

// Layout Components
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';

// Page Components
import HomePage from './pages/HomePage';
import AuthPage from './pages/AuthPage';
import UserDashboard from './pages/UserDashboard';
import GamesPage from './pages/GamesPage';
import ConsolesPage from './pages/ConsolesPage';
import ItemsPage from './pages/ItemsPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import PaymentPage from './pages/PaymentPage';
import OrderCompletePage from './pages/OrderCompletePage';
import FeedbackPage from './pages/FeedbackPage';

// Admin Pages
import AdminDashboard from './pages/Admin/AdminDashboard';
import AdminNavigation from './components/Admin/AdminNavigation';
import GameManagementPage from './pages/Admin/GameManagementPage';
import UserManagementPage from './pages/Admin/UserManagementPage';

// Components for Admin Management
import AddGameForm from './components/Admin/GameManagement/AddGameForm';
import EditGameForm from './components/Admin/GameManagement/EditGameForm';
import GameList from './components/Admin/GameManagement/GameList';
import UserList from './components/Admin/UserManagement/UserList';
import UserActions from './components/Admin/UserManagement/UserActions';

function App() {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <GameProvider>
            <ConsolesProvider>
              <ItemsProvider>
                <AdminProvider>
                  <div className="flex flex-col min-h-screen">
                    <Header />
                    <main className="flex-grow">
                      <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/auth" element={<AuthPage />} />
                        <Route path="/dashboard" element={<UserDashboard />} />
                        <Route path="/games" element={<GamesPage />} />
                        <Route path="/consoles" element={<ConsolesPage />} />
                        <Route path="/items" element={<ItemsPage />} />
                        <Route path="/cart" element={<CartPage />} />
                        <Route path="/checkout" element={<CheckoutPage />} />
                        <Route path="/payment" element={<PaymentPage />} />
                        <Route path="/order-complete" element={<OrderCompletePage />} />
                        <Route path="/feedback/:orderNumber" element={<FeedbackPage />} />
                        
                        {/* Admin Routes */}
                        <Route path="/admin" element={<AdminDashboard />} />
                        <Route path="/admin/navigation" element={<AdminNavigation />} />
                        <Route path="/admin/games" element={<GameManagementPage />} />
                        <Route path="/admin/games/list" element={<GameList />} />
                        <Route path="/admin/games/add" element={<AddGameForm />} />
                        <Route path="/admin/games/edit/:id" element={<EditGameForm />} />
                        <Route path="/admin/users" element={<UserManagementPage />} />
                        <Route path="/admin/users/list" element={<UserList />} />
                        <Route path="/admin/users/actions" element={<UserActions />} />
                      </Routes>
                    </main>
                    <Footer />
                  </div>
                </AdminProvider>
              </ItemsProvider>
            </ConsolesProvider>
          </GameProvider>
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;