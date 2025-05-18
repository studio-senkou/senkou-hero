'use client'

import { cn } from '@hero/lib/utils'
import * as React from 'react'

interface RangeSliderProps {
  min?: number
  max?: number
  step?: number
  values: [number, number]
  onChange: (values: [number, number]) => void
  className?: string
}

export function RangeSlider({
  min = 0,
  max = 100,
  step = 1,
  values,
  onChange,
  className,
}: RangeSliderProps) {
  const trackRef = React.useRef<HTMLDivElement>(null)

  const getPercent = (value: number) => ((value - min) / (max - min)) * 100

  const handleThumbMove = (index: 0 | 1, clientX: number) => {
    if (!trackRef.current) return

    const rect = trackRef.current.getBoundingClientRect()
    const percent = Math.min(Math.max((clientX - rect.left) / rect.width, 0), 1)
    const newValue = Math.round(min + percent * (max - min))
    const newValues: [number, number] = [...values] as [number, number]

    if (index === 0) {
      newValues[0] = Math.min(newValue, values[1] - step)
    } else {
      newValues[1] = Math.max(newValue, values[0] + step)
    }

    onChange(newValues)
  }

  const startDragging = (index: 0 | 1) => (e: React.MouseEvent) => {
    e.preventDefault()
    const move = (e: MouseEvent) => handleThumbMove(index, e.clientX)
    const stop = () => {
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mouseup', stop)
    }
    window.addEventListener('mousemove', move)
    window.addEventListener('mouseup', stop)
  }

  return (
    <div className={cn('relative h-6 w-full', className)}>
      <div
        ref={trackRef}
        className="absolute top-1/2 h-1 w-full -translate-y-1/2 rounded-full bg-muted"
      />

      <div
        className="absolute top-1/2 h-1 bg-[#00B207] -translate-y-1/2 rounded-full"
        style={{
          left: `${getPercent(values[0])}%`,
          width: `${getPercent(values[1]) - getPercent(values[0])}%`,
        }}
      />

      {[0, 1].map((i) => (
        <div
          key={i}
          className="absolute top-1/2 h-4 w-4 -translate-y-1/2 -translate-x-1/2 rounded-full border-2 border-[#00B207] bg-white shadow cursor-pointer"
          style={{ left: `${getPercent(values[i as 0 | 1])}%` }}
          onMouseDown={startDragging(i as 0 | 1)}
        />
      ))}
    </div>
  )
}
