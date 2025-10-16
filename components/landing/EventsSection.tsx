'use client';

import { Calendar, MapPin, Clock, ArrowRight, ChevronRight } from 'lucide-react';

interface Event {
  id: string;
  title: string;
  date: string;
  location?: string;
  url?: string;
}

interface EventsSectionProps {
  events: Event[];
  onSeeAll: () => void;
  onEventClick: (url?: string) => void;
}

export function EventsSection({ events, onSeeAll, onEventClick }: EventsSectionProps) {
  return (
    <section className="py-8 px-6 bg-gray-950">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold text-white">Events</h2>
        <button
          onClick={onSeeAll}
          className="flex items-center gap-2 text-white hover:text-cyan-400 transition-colors"
        >
          See All <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Events List */}
      <div className="space-y-3">
        {events.slice(0, 4).map((event) => (
          <div
            key={event.id}
            onClick={() => onEventClick(event.url)}
            className="bg-gray-900 rounded-3xl p-5 border border-gray-800 flex items-center gap-6 cursor-pointer hover:bg-gray-800 transition-all"
          >
            {/* Date Section */}
            <div className="flex flex-col items-center justify-center w-[100px]">
              <Calendar className="w-8 h-8 text-white mb-2" />
              <span className="text-white font-bold text-sm">{event.date}</span>
            </div>

            {/* Event Details */}
            <div className="flex-1">
              <h3 className="text-white text-xl font-bold mb-2">{event.title}</h3>
              {event.location && (
                <div className="flex items-center gap-2 text-gray-400 text-sm">
                  <MapPin className="w-4 h-4" />
                  <span>{event.location}</span>
                </div>
              )}
            </div>

            {/* Arrow Button */}
            <div className="w-[60px] h-[60px] rounded-full bg-gray-800 flex items-center justify-center hover:scale-110 transition-transform">
              <ArrowRight className="w-6 h-6 text-white" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
