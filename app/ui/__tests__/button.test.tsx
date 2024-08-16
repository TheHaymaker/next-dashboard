import React from 'react';
import { render, screen } from '@testing-library/react';
import { Button } from '../button';
import { describe, it, expect } from 'vitest';

describe('Button', () => {
  it('renders children correctly', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<Button className="custom-class">Button</Button>);
    const button = screen.getByText('Button');
    expect(button).toHaveClass('custom-class');
  });

  it('passes through other props', () => {
    render(<Button data-testid="test-button">Button</Button>);
    expect(screen.getByTestId('test-button')).toBeInTheDocument();
  });
});