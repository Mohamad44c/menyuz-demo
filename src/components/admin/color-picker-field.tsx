'use client'

import { useField } from '@payloadcms/ui'
import type { TextFieldClientComponent } from 'payload'
import { useRef } from 'react'

const isValidHex = (val: string) => /^#[0-9a-fA-F]{6}$/.test(val)

export const ColorPickerField: TextFieldClientComponent = ({ path, field }) => {
  const { value = '', setValue } = useField<string>({ path })
  const pickerRef = useRef<HTMLInputElement>(null)

  const label = typeof field.label === 'string' ? field.label : path
  const description = field.admin?.description as string | undefined
  const placeholder = (field.admin?.placeholder as string | undefined) ?? 'e.g. #FFD700'

  // <input type="color"> only accepts #rrggbb — fall back to white for other formats
  const pickerValue = isValidHex(value) ? value : '#ffffff'

  const handlePickerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }

  const handleClear = () => setValue('')

  return (
    <div style={{ marginBottom: '16px' }}>
      {/* Label */}
      <label
        htmlFor={path}
        style={{
          display: 'block',
          fontSize: '13px',
          fontWeight: 600,
          color: 'var(--theme-text)',
          marginBottom: '8px',
          textTransform: 'uppercase',
          letterSpacing: '0.02em',
        }}
      >
        {label}
      </label>

      {/* Inputs row */}
      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
        {/* Color swatch — clicking opens the native color wheel */}
        <div style={{ position: 'relative', flexShrink: 0 }}>
          <button
            type="button"
            onClick={() => pickerRef.current?.click()}
            aria-label={`Open color picker for ${label}`}
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '6px',
              backgroundColor: value || undefined,
              border: '2px solid var(--theme-elevation-200)',
              cursor: 'pointer',
              padding: 0,
              // checkerboard for empty/transparent
              backgroundImage: !value
                ? 'linear-gradient(45deg, #ccc 25%, transparent 25%), linear-gradient(-45deg, #ccc 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #ccc 75%), linear-gradient(-45deg, transparent 75%, #ccc 75%)'
                : undefined,
              backgroundSize: !value ? '8px 8px' : undefined,
              backgroundPosition: !value ? '0 0, 0 4px, 4px -4px, -4px 0px' : undefined,
              backgroundRepeat: !value ? 'repeat' : undefined,
            }}
          />
          {/* Hidden native color picker */}
          <input
            type="color"
            ref={pickerRef}
            value={pickerValue}
            onChange={handlePickerChange}
            style={{
              position: 'absolute',
              inset: 0,
              opacity: 0,
              pointerEvents: 'none',
              width: '100%',
              height: '100%',
            }}
            tabIndex={-1}
          />
        </div>

        {/* Hex / CSS text input */}
        <input
          id={path}
          type="text"
          value={value}
          onChange={handleTextChange}
          placeholder={placeholder}
          style={{
            flex: 1,
            height: '40px',
            padding: '0 12px',
            borderRadius: '4px',
            border: '1px solid var(--theme-elevation-200)',
            backgroundColor: 'var(--theme-elevation-0)',
            color: 'var(--theme-text)',
            fontSize: '14px',
            fontFamily: 'monospace',
            outline: 'none',
          }}
        />

        {/* Clear button — only shown when there's a value */}
        {value && (
          <button
            type="button"
            onClick={handleClear}
            aria-label="Clear color"
            style={{
              flexShrink: 0,
              height: '40px',
              padding: '0 10px',
              borderRadius: '4px',
              border: '1px solid var(--theme-elevation-200)',
              backgroundColor: 'transparent',
              color: 'var(--theme-text)',
              cursor: 'pointer',
              fontSize: '13px',
            }}
          >
            ✕
          </button>
        )}
      </div>

      {/* Description */}
      {description && (
        <p
          style={{
            fontSize: '12px',
            color: 'var(--theme-elevation-500)',
            marginTop: '6px',
            lineHeight: 1.5,
          }}
        >
          {description}
        </p>
      )}
    </div>
  )
}
