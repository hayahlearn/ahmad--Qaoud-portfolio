import { Component, ErrorInfo, ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';

interface Props {
    children?: ReactNode;
}

interface State {
    hasError: boolean;
    error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false,
        error: null,
    };

    public static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error('Uncaught error:', error, errorInfo);
    }

    public render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen flex items-center justify-center bg-background p-4 text-center">
                    <div className="max-w-md space-y-6">
                        <div className="flex justify-center">
                            <div className="w-20 h-20 rounded-full bg-destructive/10 flex items-center justify-center">
                                <AlertTriangle className="w-10 h-10 text-destructive" />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <h1 className="text-3xl font-bold tracking-tight">حدث خطأ غير متوقع</h1>
                            <p className="text-muted-foreground">
                                نعتذر عن هذا الخلل. لقد تم تسجيل الخطأ وسنقوم بإصلاحه قريباً.
                            </p>
                            {process.env.NODE_ENV === 'development' && this.state.error && (
                                <div className="mt-4 p-4 rounded-lg bg-muted/50 text-left overflow-auto max-h-40 text-xs font-mono border border-border">
                                    {this.state.error.toString()}
                                </div>
                            )}
                        </div>

                        <div className="flex gap-4 justify-center pt-4">
                            <Button
                                variant="outline"
                                onClick={() => window.location.reload()}
                                className="gap-2"
                            >
                                <RefreshCw className="w-4 h-4" />
                                تحديث الصفحة
                            </Button>
                            <Button
                                onClick={() => window.location.href = '/'}
                                className="gap-2"
                            >
                                <Home className="w-4 h-4" />
                                العودة للرئيسية
                            </Button>
                        </div>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}
