import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { GoogleLogin } from '@react-oauth/google';
import { googleOneTapLogin } from '@/services/authService';
import { useAuth } from '@/contexts/AuthContext';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const { checkAuth } = useAuth();

  const handleGoogleSuccess = async (credentialResponse: any) => {
    if (credentialResponse.credential) {
      try {
        await googleOneTapLogin(credentialResponse.credential);
        await checkAuth(); // Refresh auth state
        onClose();
        if (onSuccess) onSuccess();
      } catch (error) {
        console.error("Google login failed", error);
      }
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Unlock Adventure</DialogTitle>
          <DialogDescription>
            Join our community to access exclusive features, book treks, and connect with fellow explorers.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col items-center justify-center space-y-4 py-6">
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={() => {
              console.error('Login Failed');
            }}
            useOneTap={true}
            theme="filled_black"
            shape="pill"
            size="large"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;
