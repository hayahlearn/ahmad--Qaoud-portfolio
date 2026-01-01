
import { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';

export const ProtectedRoute = () => {
    const [loading, setLoading] = useState(true);
    const [isAllowed, setIsAllowed] = useState(false);

    useEffect(() => {
        const checkAuth = async () => {
            const { data: { session } } = await supabase.auth.getSession();

            if (!session) {
                setLoading(false);
                return;
            }

            // Check if user is admin
            const { data: hasRole } = await supabase.rpc('has_role', {
                _user_id: session.user.id,
                _role: 'admin'
            });

            if (hasRole) {
                setIsAllowed(true);
            } else {
                toast.error('Unauthorized access');
            }

            setLoading(false);
        };

        checkAuth();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    return isAllowed ? <Outlet /> : <Navigate to="/admin/auth" replace />;
};
