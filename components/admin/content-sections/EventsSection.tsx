'use client';

import { useState } from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { DatePicker } from '@/components/ui/date-picker';
import { Plus, Trash2 } from 'lucide-react';
import { usePageStore } from '@/stores/pageStore';
import { Event } from '@/types';

export function EventsSection() {
  const { events, setEvents, setIsDraft } = usePageStore();
  const [hasChanges, setHasChanges] = useState(false);

  const handleAdd = () => {
    const newEvent: Event = {
      id: `temp-${Date.now()}`,
      pageId: '',
      title: '',
      location: '',
      date: '',
      url: '',
      order: events.length,
    };
    setEvents([...events, newEvent]);
    setHasChanges(true);
    setIsDraft(true);
  };

  const handleUpdate = (id: string, field: keyof Event, value: string) => {
    const newEvents = events.map((item) => (item.id === id ? { ...item, [field]: value } : item));
    setEvents(newEvents);
    setHasChanges(true);
    setIsDraft(true);
  };

  const handleRemove = (id: string) => {
    const newEvents = events.filter((item) => item.id !== id);
    setEvents(newEvents);
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
      <AccordionItem value="events" className="bg-gray-800 rounded-lg border-0">
        <AccordionTrigger className="px-6 py-4 hover:no-underline">
          <span className="text-lg font-semibold text-white">Events</span>
        </AccordionTrigger>
        <AccordionContent className="px-6 pb-6">
          <div className="space-y-4">
            {events.map((event, index) => (
              <div key={event.id} className="space-y-3 bg-gray-700/50 rounded-lg p-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-300">Event {index + 1}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleRemove(event.id)}
                    className="text-red-400 hover:text-red-300"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
                <Input
                  value={event.title ?? ''}
                  onChange={(e) => handleUpdate(event.id, 'title', e.target.value)}
                  placeholder="Event name"
                  className="bg-gray-900 border-gray-600 text-white placeholder:text-gray-500"
                />
                <Input
                  value={event.location ?? ''}
                  onChange={(e) => handleUpdate(event.id, 'location', e.target.value)}
                  placeholder="Location (optional)"
                  className="bg-gray-900 border-gray-600 text-white placeholder:text-gray-500"
                />
                <DatePicker
                  value={event.date}
                  onChange={(value) => handleUpdate(event.id, 'date', value)}
                  placeholder="Select date"
                  className="bg-gray-900 border-gray-600 text-white placeholder:text-gray-500"
                />
                <Input
                  value={event.url ?? ''}
                  onChange={(e) => handleUpdate(event.id, 'url', e.target.value)}
                  placeholder="Event URL (optional)"
                  className="bg-gray-900 border-gray-600 text-white placeholder:text-gray-500"
                />
              </div>
            ))}

            <Button onClick={handleAdd} variant="outline" className="w-full">
              <Plus className="w-4 h-4 mr-2" />
              Add Event
            </Button>

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
