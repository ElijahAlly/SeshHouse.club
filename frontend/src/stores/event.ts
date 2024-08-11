import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { devtools } from 'zustand/middleware';

interface EventStateType {
    selectedTimes: { [key: string]: string };
    selectedDates: Date[];
    setSelectedTimes: (times: { [key: string]: string }) => void;
    setSelectedDates: (dates: Date[]) => void;
}

export const useEventStore = create<EventStateType>()(
    devtools(
        persist(
            (set) => ({
                selectedTimes: {},
                selectedDates: [],
                setSelectedTimes: (times) => set({ selectedTimes: times }, false,  'setSelectedTimes'),
                setSelectedDates: (dates) => set({ selectedDates: dates }, false,  'setSelectedDates'),
            }),
            {
                name: 'event-store',
                storage: createJSONStorage(() => localStorage)
            }
        ),
        { name: 'EventStore' }
    )
)