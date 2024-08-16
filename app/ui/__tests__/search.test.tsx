import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import Search from '../search';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';

// Mock the next/navigation hooks
vi.mock('next/navigation', () => ({
  useSearchParams: vi.fn(() => new URLSearchParams()),
  usePathname: vi.fn(() => '/test'),
  useRouter: vi.fn(),
}));

// Mock use-debounce
vi.mock('use-debounce', () => ({
  useDebouncedCallback: (callback: Function) => callback,
}));

describe('Search', () => {
  beforeEach(() => {
    vi.mocked(useRouter).mockReturnValue({ replace: vi.fn() } as any);
  });

  it('renders with placeholder text', () => {
    render(<Search placeholder="Search items..." />);
    expect(screen.getByPlaceholderText('Search items...')).toBeInTheDocument();
  });

  it('calls handleSearch on input change', () => {
    const replace = vi.fn();
    vi.mocked(useRouter).mockReturnValue({ replace } as any);

    render(<Search placeholder="Search..." />);
    const input = screen.getByPlaceholderText('Search...');
    
    fireEvent.change(input, { target: { value: 'test query' } });
    
    expect(replace).toHaveBeenCalledWith('/test?query=test+query');
  });

  it('renders search icon', () => {
    render(<Search placeholder="Search..." />);
    const searchIcon = screen.getByTestId('search-icon');
    expect(searchIcon).toBeInTheDocument();
    expect(searchIcon).toHaveClass('h-[18px] w-[18px]');
  });
});