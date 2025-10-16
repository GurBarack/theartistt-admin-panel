'use client';

import { Input } from './input';
import { Clock } from 'lucide-react';

interface TimePickerProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
}

export function TimePicker({ 
  value, 
  onChange, 
  placeholder = "Select time", 
  className = "",
  disabled = false 
}: TimePickerProps) {
  return (
    <div className="relative">
      <Input
        type="time"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`pr-10 ${className}`}
        disabled={disabled}
      />
      <Clock className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
    </div>
  );
}
