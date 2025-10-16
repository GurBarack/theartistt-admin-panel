'use client';

import { useState } from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ChevronDown } from 'lucide-react';
import { usePageStore } from '@/stores/pageStore';
import { CustomButton } from '@/types';

const PREBUILT_TEXTS = [
  'For Booking ©',
  'Send Music',
  'Contact Me',
  'Listen Now',
  'Buy Tickets',
  'Book Now',
  'Get in Touch',
];

export function CustomButtonsSection() {
  const { customButtons, setCustomButtons, setIsDraft } = usePageStore();
  const [hasChanges, setHasChanges] = useState(false);

  // Initialize with default buttons if none exist
  const buttons = customButtons.length > 0
    ? customButtons
    : [
        { id: '1', pageId: '', text: '', url: '', style: 'primary' as const, order: 0 },
        { id: '2', pageId: '', text: '', url: '', style: 'secondary' as const, order: 1 },
      ];

  const handleUpdate = (id: string, field: 'text' | 'url', value: string) => {
    const newButtons = buttons.map((item) => (item.id === id ? { ...item, [field]: value } : item));
    setCustomButtons(newButtons);
    setHasChanges(true);
    setIsDraft(true);
  };

  const handleDiscard = () => {
    // Reset to original state - for now just clear changes
    setHasChanges(false);
    setIsDraft(false);
  };

  const handleSave = async () => {
    // TODO: Save to backend
    setHasChanges(false);
    setIsDraft(false);
  };

  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="buttons" className="bg-gray-800 rounded-lg border-0">
        <AccordionTrigger className="px-6 py-4 hover:no-underline">
          <span className="text-lg font-semibold text-white">Buttons</span>
        </AccordionTrigger>
        <AccordionContent className="px-6 pb-6">
          <div className="space-y-4">
            {buttons.map((button, index) => (
              <div key={button.id} className="space-y-2">
                <label className="text-sm text-gray-300">Button {index + 1}</label>
                <div className="flex gap-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="outline"
                        className="bg-gray-700 border-gray-600 text-white"
                      >
                        {button.text || 'Select text'}
                        <ChevronDown className="ml-2 w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      {PREBUILT_TEXTS.map((text) => (
                        <DropdownMenuItem
                          key={text}
                          onClick={() => handleUpdate(button.id, 'text', text)}
                        >
                          {text}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                  <Input
                    value={button.text ?? ''}
                    onChange={(e) => handleUpdate(button.id, 'text', e.target.value)}
                    placeholder="Or type custom text"
                    className="flex-1 bg-gray-900 border-gray-600 text-white placeholder:text-gray-500"
                  />
                </div>
                <Input
                  value={button.url ?? ''}
                  onChange={(e) => handleUpdate(button.id, 'url', e.target.value)}
                  placeholder="Enter URL"
                  className="bg-gray-900 border-gray-600 text-white placeholder:text-gray-500"
                />
              </div>
            ))}

            {/* Action Buttons */}
            <div className="flex justify-end gap-2 mt-4">
              <Button variant="outline" onClick={handleDiscard} disabled={!hasChanges}>
                Discard
              </Button>
              <Button onClick={handleSave} disabled={!hasChanges}>
                Done
              </Button>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
