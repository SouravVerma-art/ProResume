import React from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { GripVertical } from 'lucide-react';

const BuilderSidebar = ({ 
    sectionOrder, 
    sectionDefinitions, 
    activeSectionId, 
    onSectionClick, 
    onDragEnd 
}) => {
    return (
        <aside className="w-64 border-r border-slate-200 bg-white flex flex-col overflow-hidden shrink-0">
            <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
                <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4 ml-2">Content</h3>
                <DragDropContext onDragEnd={onDragEnd}>
                    <Droppable droppableId="sections">
                        {(provided) => (
                            <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-1">
                                {sectionOrder.map((id, index) => {
                                    const section = sectionDefinitions[id];
                                    if (!section) return null;
                                    const Icon = section.icon;
                                    const isActive = activeSectionId === id;
                                    return (
                                        <Draggable key={id} draggableId={id} index={index}>
                                            {(provided) => (
                                                <div
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    className={`group flex items-center gap-3 p-2.5 rounded-xl cursor-pointer transition-all ${
                                                        isActive ? 'bg-indigo-600 text-white shadow-md' : 'hover:bg-slate-50 text-slate-600'
                                                    }`}
                                                    onClick={() => onSectionClick(id)}
                                                >
                                                    <div {...provided.dragHandleProps} className={`transition-colors ${isActive ? 'text-indigo-300' : 'text-slate-300'}`}>
                                                        <GripVertical size={14} />
                                                    </div>
                                                    <Icon size={16} className={isActive ? 'text-white' : 'text-slate-400'} />
                                                    <span className="text-xs font-bold">{section.name}</span>
                                                </div>
                                            )}
                                        </Draggable>
                                    );
                                })}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </DragDropContext>

                <div className="mt-8 pt-8 border-t border-slate-100">
                    <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4 ml-2">AI Tools</h3>
                    <div className="space-y-1">
                        {['coverLetter', 'analysis'].map((id) => {
                            const section = sectionDefinitions[id];
                            const Icon = section.icon;
                            const isActive = activeSectionId === id;
                            return (
                                <div
                                    key={id}
                                    className={`flex items-center gap-3 p-2.5 rounded-xl cursor-pointer transition-all ${
                                        isActive ? 'bg-indigo-600 text-white shadow-md' : 'hover:bg-slate-50 text-slate-600'
                                    }`}
                                    onClick={() => onSectionClick(id)}
                                >
                                    <Icon size={16} className={isActive ? 'text-white' : 'text-slate-400'} />
                                    <span className="text-xs font-bold">{section.name}</span>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </aside>
    );
};

export default BuilderSidebar;
