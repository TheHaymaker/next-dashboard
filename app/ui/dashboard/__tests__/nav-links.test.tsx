import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import NavLinks from '../nav-links';
import { usePathname } from 'next/navigation';

// Mock the next/navigation hook
vi.mock('next/navigation', () => ({
  usePathname: vi.fn(),
}));

describe('NavLinks', () => {
  it('renders all navigation links', () => {
    vi.mocked(usePathname).mockReturnValue('/dashboard');
    render(<NavLinks />);
    
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Invoices')).toBeInTheDocument();
    expect(screen.getByText('Customers')).toBeInTheDocument();
  });

  it('highlights the active link', () => {
    vi.mocked(usePathname).mockReturnValue('/dashboard/invoices');
    render(<NavLinks />);
    
    const invoicesLink = screen.getByText('Invoices').closest('a');
    expect(invoicesLink).toHaveClass('bg-sky-100 text-blue-600');
  });

  it('does not highlight inactive links', () => {
    vi.mocked(usePathname).mockReturnValue('/dashboard/customers');
    render(<NavLinks />);
    
    const homeLink = screen.getByText('Home').closest('a');
    const invoicesLink = screen.getByText('Invoices').closest('a');
    expect(homeLink).not.toHaveClass('bg-sky-100 text-blue-600');
    expect(invoicesLink).not.toHaveClass('bg-sky-100 text-blue-600');
  });
});