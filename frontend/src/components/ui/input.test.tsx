import { render, screen, fireEvent } from '@testing-library/react';
import { Input } from './input';
import { describe, it, expect, vi } from 'vitest';

describe('Input Component', () => {
    it('renders correctly', () => {
        render(<Input placeholder="Test Input" />);
        expect(screen.getByPlaceholderText('Test Input')).toBeInTheDocument();
    });

    it('accepts user input', () => {
        const handleChange = vi.fn();
        render(<Input onChange={handleChange} placeholder="Type here" />);

        const input = screen.getByPlaceholderText('Type here');
        fireEvent.change(input, { target: { value: 'Hello' } });

        expect(handleChange).toHaveBeenCalled();
        expect((input as HTMLInputElement).value).toBe('Hello');
    });

    it('renders disabled state', () => {
        render(<Input disabled placeholder="Disabled" />);
        expect(screen.getByPlaceholderText('Disabled')).toBeDisabled();
    });

    it('applies custom classes', () => {
        render(<Input placeholder="Class Test" className="bg-red-500" />);
        expect(screen.getByPlaceholderText('Class Test')).toHaveClass('bg-red-500');
    });
});
