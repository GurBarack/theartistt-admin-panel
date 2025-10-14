'use client';

import { useState } from 'react';
import { DndContext, closestCenter, DragEndEvent } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy, arrayMove, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { GripVertical } from 'lucide-react';
import { usePageStore } from '@/stores/pageStore';
import { Section } from '@/types';

const DEFAULT_SECTIONS: Section[] = [
  { id: 'featured', name: 'Featured', order: 0, isFixed: true },
  { id: 'released', name: 'Released', order: 1, isFixed: true },
  { id: 'events', name: 'Events', order: 2, isFixed: false },
  { id: 'fullsets', name: 'Full Sets', order: 3, isFixed: false },
];

function SortableSection({ section }: { section: Section }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: section.id,
    disabled: section.isFixed,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="flex items-center gap-3 bg-gray-700/50 rounded-lg p-4"
    >
      {section.isFixed ? (
        <GripVertical className="w-5 h-5 text-gray-600" />
      ) : (
        <button
          className="cursor-grab active:cursor-grabbing touch-none"
          {...listeners}
          {...attributes}
        >
          <GripVertical className="w-5 h-5 text-gray-400 hover:text-gray-300" />
        </button>
      )}
      
      <span className="text-white font-medium flex-1">{section.name}</span>
      
      {section.isFixed && (
        <span className="text-xs text-gray-500 bg-gray-800 px-2 py-1 rounded">Fixed</span>
      )}
    </div>
  );
}

export function SectionReorder() {
  const { sectionOrder, setSectionOrder, setIsDraft } = usePageStore();
  const [localSections, setLocalSections] = useState<Section[]>(
    sectionOrder || DEFAULT_SECTIONS
  );
  const [hasChanges, setHasChanges] = useState(false);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setLocalSections((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        
        // Don't allow moving above fixed sections
        if (newIndex < 2) return items;
        
        return arrayMove(items, oldIndex, newIndex);
      });
      setHasChanges(true);
      setIsDraft(true);
    }
  };

  const handleDiscard = () => {
    setLocalSections(sectionOrder || DEFAULT_SECTIONS);
    setHasChanges(false);
  };

  const handleSave = () => {
    setSectionOrder(localSections);
    setHasChanges(false);
    setIsDraft(false);
  };

  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="section-order" className="bg-gray-800 rounded-lg border-0">
        <AccordionTrigger className="px-6 py-4 hover:no-underline">
          <span className="text-lg font-semibold text-white">Section Order</span>
        </AccordionTrigger>
        <AccordionContent className="px-6 pb-6">
          <div className="space-y-4">
            <p className="text-sm text-gray-400 mb-4">
              Drag sections to reorder how they appear on your landing page. Featured and Released sections are fixed at the top.
            </p>

            <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
              <SortableContext items={localSections.map((s) => s.id)} strategy={verticalListSortingStrategy}>
                <div className="space-y-3">
                  {localSections.map((section) => (
                    <SortableSection key={section.id} section={section} />
                  ))}
                </div>
              </SortableContext>
            </DndContext>

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
