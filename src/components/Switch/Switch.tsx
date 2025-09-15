import React, { useState, useCallback, KeyboardEvent, forwardRef } from 'react'

interface SwitchProps {
  /** Whether the switch is checked by default */
  defaultSelected?: boolean
  /** Whether the switch is checked (controlled) */
  isSelected?: boolean
  /** Handler called when the switch state changes */
  onChange?: (isSelected: boolean) => void
  /** Whether the switch is disabled */
  isDisabled?: boolean
  /** The label for the switch */
  children?: React.ReactNode
  /** Additional CSS classes */
  className?: string
  /** Size variant of the switch */
  size?: 'sm' | 'md' | 'lg'
  /** Color variant of the switch */
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger'
  /** ARIA label for accessibility */
  'aria-label'?: string
  /** ARIA labelledby for accessibility */
  'aria-labelledby'?: string
}

const Switch = forwardRef<HTMLButtonElement, SwitchProps>((props, ref) => {
  const {
    isSelected,
    defaultSelected = false,
    onChange,
    isDisabled = false,
    children,
    className = '',
    size = 'md',
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledBy,
  } = props
  const [internalSelected, setInternalSelected] = useState(defaultSelected)
  
  const isControlled = isSelected !== undefined
  const selected = isControlled ? isSelected : internalSelected

  const handleToggle = useCallback(() => {
    if (isDisabled) return
    
    const newSelected = !selected
    
    if (!isControlled) {
      setInternalSelected(newSelected)
    }
    
    onChange?.(newSelected)
  }, [selected, isDisabled, isControlled, onChange])

  const handleKeyDown = useCallback((event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === ' ' || event.key === 'Enter') {
      event.preventDefault()
      handleToggle()
    }
  }, [handleToggle])

  const sizeClasses = {
    sm: {
      track: 'w-8 h-4',
      thumb: 'w-3 h-3',
      translate: 'translate-x-4',
    },
    md: {
      track: 'w-11 h-6',
      thumb: 'w-5 h-5',
      translate: 'translate-x-5',
    },
    lg: {
      track: 'w-14 h-8',
      thumb: 'w-7 h-7',
      translate: 'translate-x-6',
    },
  }

  const currentSize = sizeClasses[size]

  return (
    <label className={`inline-flex items-center cursor-pointer ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}>
      <button
        type="button"
        role="switch"
        aria-checked={selected}
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledBy}
        disabled={isDisabled}
        onClick={handleToggle}
        onKeyDown={handleKeyDown}
        className={`
          relative inline-flex items-center ${currentSize.track} rounded-full transition-colors duration-200 ease-in-out
          focus:outline-none
          ${selected ? 'bg-gray-600' : 'bg-gray-200'}
          ${isDisabled ? 'cursor-not-allowed' : 'cursor-pointer'}
        `}
      >
        <span
          className={`
            ${currentSize.thumb} inline-block rounded-full bg-white shadow transform transition-transform duration-200 ease-in-out
            ${selected ? currentSize.translate : 'translate-x-0'}
          `}
        />
      </button>
      {children && (
        <span className={`ml-3 text-sm font-medium text-gray-900 ${isDisabled ? 'text-gray-400' : ''}`}>
          {children}
        </span>
      )}
    </label>
  )
})

export default Switch