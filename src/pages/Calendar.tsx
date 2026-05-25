import { useState, useRef, useEffect } from 'react';
import Fullcalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

export function Calendar() {
  const [events, setEvents] = useState(() => {
    const saved = localStorage.getItem('nexus-events');
    return saved ? JSON.parse(saved) : [
      { id: '1', title: 'Team Meeting', start: new Date().toISOString().split('T')[0] + 'T10:00:00', end: new Date().toISOString().split('T')[0] + 'T11:00:00' },
      { id: '2', title: 'Lunch Break', start: new Date().toISOString().split('T')[0] + 'T12:00:00', allDay: true }
    ];
  });

  useEffect(() => {
    localStorage.setItem('nexus-events', JSON.stringify(events));
  }, [events]);

  const handleDateSelect = (selectInfo: any) => {
    let title = prompt('Please enter a new title for your event');
    let calendarApi = selectInfo.view.calendar;

    calendarApi.unselect(); // clear date selection

    if (title) {
      setEvents([
        ...events,
        {
          id: String(Date.now()),
          title,
          start: selectInfo.startStr,
          end: selectInfo.endStr,
          allDay: selectInfo.allDay
        }
      ]);
    }
  };

  const handleEventClick = (clickInfo: any) => {
    if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'?`)) {
      setEvents(events.filter((e: any) => e.id !== clickInfo.event.id));
    }
  };
  
  const handleEventChange = (changeInfo: any) => {
    // Update event in local state after drag and drop or resize
    const updatedEvents = events.map((e: any) => {
      if (e.id === changeInfo.event.id) {
        return {
          ...e,
          start: changeInfo.event.startStr,
          end: changeInfo.event.endStr,
          allDay: changeInfo.event.allDay
        };
      }
      return e;
    });
    setEvents(updatedEvents);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Calendar</h1>
        <p className="text-slate-500 mt-1">Manage your team schedule and events.</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 min-h-[600px]">
        <Fullcalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay'
          }}
          initialView="dayGridMonth"
          editable={true}
          selectable={true}
          selectMirror={true}
          dayMaxEvents={true}
          events={events} // alternatively, use the `events` setting to fetch from a feed
          select={handleDateSelect}
          eventClick={handleEventClick}
          eventChange={handleEventChange}
          height="auto"
        />
      </div>
    </div>
  );
}
