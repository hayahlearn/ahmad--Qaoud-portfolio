import { render, screen } from '@testing-library/react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from './card';
import { describe, it, expect } from 'vitest';

describe('Card Component', () => {
    it('renders card with content', () => {
        render(
            <Card>
                <CardHeader>
                    <CardTitle>Card Title</CardTitle>
                </CardHeader>
                <CardContent>
                    <p>Card Content</p>
                </CardContent>
                <CardFooter>
                    <button>Action</button>
                </CardFooter>
            </Card>
        );

        expect(screen.getByText('Card Title')).toBeInTheDocument();
        expect(screen.getByText('Card Content')).toBeInTheDocument();
        expect(screen.getByText('Action')).toBeInTheDocument();
    });

    it('applies custom styling', () => {
        render(
            <Card className="bg-blue-500" data-testid="card">
                <CardContent>Content</CardContent>
            </Card>
        );
        expect(screen.getByTestId('card')).toHaveClass('bg-blue-500');
    });
});
