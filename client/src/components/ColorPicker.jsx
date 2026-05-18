import { Check, Palette } from 'lucide-react'
import React, { useState } from 'react'

const ColorPicker = ({ slectedColor, onChange }) => {
  const colors = [
    { name: "Blue", value: "#3B82F6" },
    { name: "Red", value: "#EF4444" },
    { name: "Indigo", value: "#6366f1" },
    { name: "Black", value: "#1F2937" },
    { name: "Purple", value: "#8B5CF6" },
    { name: "Pink", value: "#EC4899" },
    { name: "Orange", value: "#F97316" },
    { name: "Teal", value: "#14B8A6" },
    { name: "Gray", value: "#6B7280" },
    { name: "Indigo", value: "#6366F1" },
  ]

  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className='relative'>
      <button
        className='flex items-center justify-center gap-1 text-sm text-purple-600 bg-gradient-to-br from-purple-50 to-purple-100 ring-purple-300 hover:ring transition-all px-3 py-2 rounded-lg sm:w-28'
        onClick={() => setIsOpen(!isOpen)}
      >
        <Palette size={16} />
        <span className='max-sm:hidden'>Accent</span>
      </button>

      {isOpen && (
        <div className='absolute grid grid-cols-4 gap-2 top-full right-0 mt-2 w-64 bg-white border border-gray-200 rounded-2xl shadow-2xl z-[1000] p-3'>
          {colors.map((color, index) => (
            <div
              key={`${color.value}-${index}`}
              className='relative cursor-pointer group flex flex-col items-center'
              onClick={() => {onChange(color.value); setIsOpen(false)}}>
              <div
                className={`w-10 h-10 rounded-full border-2 transition-all ${slectedColor === color.value ? 'border-slate-900 scale-110' : 'border-transparent hover:scale-105'}`}
                style={{ backgroundColor: color.value }}
              ></div>

              {slectedColor === color.value && (
                <div className='absolute inset-0 flex items-center justify-center pointer-events-none'>
                  <Check size={16} className='text-white' />
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default ColorPicker
