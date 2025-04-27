
import { useAuth } from '@/context/AuthContext';
import { OrderHistory } from '@/components/OrderHistory';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

export default function ProfilePage() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    navigate('/auth');
    return null;
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">My Profile</h1>
            <p className="text-muted-foreground">{user.email}</p>
          </div>
          <Button variant="outline" onClick={() => signOut()}>
            Sign Out
          </Button>
        </div>
        
        <OrderHistory />
      </div>
    </div>
  );
}
