import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Button from '../../../components/ui/Button'

describe('Button Component', () => {
  it('renders button with correct text', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument()
  })

  it('handles click events', async () => {
    const user = userEvent.setup()
    const handleClick = vi.fn()
    
    render(<Button onClick={handleClick}>Click me</Button>)
    
    await user.click(screen.getByRole('button', { name: 'Click me' }))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('applies default styles', () => {
    render(<Button>Default Button</Button>)
    const button = screen.getByRole('button', { name: 'Default Button' })
    expect(button).toHaveClass('flex', 'm-6', 'mt-2', 'justify-end', 'px-4', 'py-2', 'bg-blue-600', 'text-white', 'rounded-lg', 'shadow-md', 'hover:bg-blue-500', 'transition', 'duration-200')
  })

  it('is disabled when disabled prop is true', () => {
    render(<Button disabled>Disabled Button</Button>)
    const button = screen.getByRole('button', { name: 'Disabled Button' })
    expect(button).toBeDisabled()
  })

  it('applies custom className', () => {
    render(<Button className="custom-class">Custom Button</Button>)
    const button = screen.getByRole('button', { name: 'Custom Button' })
    expect(button).toHaveClass('custom-class')
  })
})