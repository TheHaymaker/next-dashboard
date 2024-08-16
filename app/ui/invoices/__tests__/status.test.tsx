import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import InvoiceStatus from '../status';

describe('InvoiceStatus', () => {
  it('renders pending status correctly', () => {
    render(<InvoiceStatus status="pending" />);
    
    expect(screen.getByText('Pending')).toBeInTheDocument();
    expect(screen.getByText('Pending').closest('span')).toHaveClass('bg-gray-100 text-gray-500');
    expect(screen.getByTestId('clock-icon')).toBeInTheDocument();
  });

  it('renders paid status correctly', () => {
    render(<InvoiceStatus status="paid" />);
    
    expect(screen.getByText('Paid')).toBeInTheDocument();
    expect(screen.getByText('Paid').closest('span')).toHaveClass('bg-green-500 text-white');
    expect(screen.getByTestId('check-icon')).toBeInTheDocument();
  });

  it('renders nothing for unknown status', () => {
    render(<InvoiceStatus status="unknown" />);
    
    expect(screen.queryByText('Pending')).not.toBeInTheDocument();
    expect(screen.queryByText('Paid')).not.toBeInTheDocument();
  });
});