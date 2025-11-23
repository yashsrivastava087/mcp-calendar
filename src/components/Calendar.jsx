import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import timeGridPlugin from "@fullcalendar/timegrid";
import { fetchEvents, createEvent } from "../services/mcpClient";

// --- ICONS ---
const PlusIcon = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>;
const CalendarIcon = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>;
const ClockIcon = () => <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
const XIcon = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>;
const LogoutIcon = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>;
const GoogleIcon = () => <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z"/></svg>;

const LoginScreen = ({ onLogin }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleMockLogin = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onLogin();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-950 overflow-hidden">
       <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none"></div>
       <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>

       <div className="w-full max-w-md bg-slate-900/80 backdrop-blur-md border border-slate-800 p-8 rounded-2xl shadow-2xl ring-1 ring-white/10 z-10 m-4">
          <div className="text-center mb-8">
             <div className="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-indigo-500/30">
               <CalendarIcon />
             </div>
             <h1 className="text-2xl font-bold text-white">Welcome Back</h1>
             <p className="text-slate-400 text-sm mt-2">Sign in to access your intelligent calendar</p>
          </div>

          <form onSubmit={handleMockLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Email Address</label>
              <input type="email" defaultValue="demo@example.com" className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Password</label>
              <input type="password" defaultValue="password" className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all" />
            </div>
            
            <button disabled={isLoading} className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-lg shadow-lg shadow-indigo-900/20 transition-all disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center gap-2">
              {isLoading ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                  Signing in...
                </>
              ) : "Sign In"}
            </button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-800"></div></div>
            <div className="relative flex justify-center text-xs uppercase"><span className="bg-slate-900 px-2 text-slate-500">Or continue with</span></div>
          </div>

          <button onClick={handleMockLogin} className="w-full py-3 bg-white text-slate-900 font-semibold rounded-lg hover:bg-slate-100 transition-all flex justify-center items-center gap-2">
            <GoogleIcon />
            <span className="font-bold">Google</span>
          </button>
       </div>
    </div>
  );
};

// --- TIME PICKER COMPONENT ---
const CustomTimePicker = ({ label, value, onChange }) => {
  const [hour, setHour] = useState("09");
  const [minute, setMinute] = useState("00");
  const [ampm, setAmpm] = useState("AM");

  useEffect(() => {
    if (value) {
      const [h, m] = value.split(":");
      let hNum = parseInt(h, 10);
      const isPm = hNum >= 12;
      if (hNum > 12) hNum -= 12;
      if (hNum === 0) hNum = 12; 
      setHour(hNum.toString().padStart(2, '0'));
      setMinute(m);
      setAmpm(isPm ? "PM" : "AM");
    }
  }, [value]);

  const updateTime = (newHour, newMinute, newAmpm) => {
    let h = parseInt(newHour, 10);
    if (newAmpm === "PM" && h !== 12) h += 12;
    if (newAmpm === "AM" && h === 12) h = 0;
    const timeString = `${h.toString().padStart(2, '0')}:${newMinute}`;
    onChange(timeString);
  };

  return (
    <div className="flex flex-col gap-1">
      <label className="block text-xs font-bold text-slate-500 uppercase mb-1">{label}</label>
      <div className="flex items-center gap-1 bg-slate-950 border border-slate-700 rounded-lg p-1 relative z-10">
        <select 
          value={hour} 
          onChange={(e) => { setHour(e.target.value); updateTime(e.target.value, minute, ampm); }} 
          className="bg-slate-950 text-white text-sm outline-none p-1 cursor-pointer hover:text-indigo-400 appearance-none pl-2 pr-6"
          style={{backgroundImage: 'none'}} 
        >
          {Array.from({ length: 12 }, (_, i) => i + 1).map(h => (
            <option key={h} value={h.toString().padStart(2, '0')}>{h.toString().padStart(2, '0')}</option>
          ))}
        </select>
        <span className="text-slate-500 font-bold">:</span>
        <select 
          value={minute} 
          onChange={(e) => { setMinute(e.target.value); updateTime(hour, e.target.value, ampm); }} 
          className="bg-slate-950 text-white text-sm outline-none p-1 cursor-pointer hover:text-indigo-400 appearance-none pl-2 pr-6"
          style={{backgroundImage: 'none'}}
        >
          {["00", "15", "30", "45"].map(m => (
            <option key={m} value={m}>{m}</option>
          ))}
        </select>
        
        <div className="flex ml-auto bg-slate-800 rounded p-0.5">
          <button onClick={() => { setAmpm("AM"); updateTime(hour, minute, "AM"); }} className={`px-2 py-0.5 text-xs font-bold rounded transition-all ${ampm === "AM" ? "bg-indigo-600 text-white shadow-md" : "text-slate-400 hover:text-white"}`}>AM</button>
          <button onClick={() => { setAmpm("PM"); updateTime(hour, minute, "PM"); }} className={`px-2 py-0.5 text-xs font-bold rounded transition-all ${ampm === "PM" ? "bg-indigo-600 text-white shadow-md" : "text-slate-400 hover:text-white"}`}>PM</button>
        </div>
      </div>
    </div>
  );
};

// --- MAIN COMPONENT ---
export default function Calendar() {
  // AUTH STATE
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const [events, setEvents] = useState([]);
  const [sidebarTab, setSidebarTab] = useState("upcoming"); 
  
  // Modals
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isDaySummaryOpen, setIsDaySummaryOpen] = useState(false); 

  const [selectedEvent, setSelectedEvent] = useState(null);
  const [dayEvents, setDayEvents] = useState([]); 

  const [selectedDate, setSelectedDate] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startTime, setStartTime] = useState("09:00");
  const [endTime, setEndTime] = useState("10:00");

  useEffect(() => {
    if (!isAuthenticated) return;

    async function loadEvents() {
      try {
        const mcpEvents = await fetchEvents();
        const formattedEvents = mcpEvents.map((event) => ({
          id: event.id,
          title: event.summary || "No Title",
          description: event.description || "",
          start: event.start?.dateTime || event.start?.date,
          end: event.end?.dateTime || event.end?.date,
          allDay: !event.start?.dateTime,
          backgroundColor: "#6366f1", 
          borderColor: "#4f46e5",     
          textColor: "#ffffff"
        }));
        setEvents(formattedEvents);
      } catch (error) {
        console.error("Failed to load events:", error);
      }
    }
    loadEvents();
  }, [isAuthenticated]); 

  // --- HANDLERS ---
  const handleLogin = () => setIsAuthenticated(true);
  const handleLogout = () => {
      setIsAuthenticated(false);
      setEvents([]); 
  };

  const handleDateClick = (arg) => {
    const clickedDate = arg.dateStr;
    setSelectedDate(clickedDate);

    const existingEvents = events.filter(e => {
        const eventStart = e.start.split('T')[0]; 
        return eventStart === clickedDate;
    });

    if (existingEvents.length > 0) {
        setDayEvents(existingEvents);
        setIsDaySummaryOpen(true);
    } else {
        openCreateModal();
    }
  };

  const openCreateModal = () => {
    setIsDaySummaryOpen(false); 
    setStartTime("09:00");
    setEndTime("10:00");
    setTitle("");
    setDescription("");
    setIsCreateModalOpen(true);
  };

  const handleEventClick = (info) => {
    const eventObj = info.event; 
    const safeDescription = eventObj.extendedProps?.description || eventObj.description || "";

    setSelectedEvent({
      title: eventObj.title,
      description: safeDescription,
      start: eventObj.start,
      end: eventObj.end,
      allDay: eventObj.allDay,
    });
    setIsViewModalOpen(true);
  };

  const handleCreate = async () => {
    if (!title) return alert("Please enter a title");
    const startISO = `${selectedDate}T${startTime}:00`;
    const endISO = `${selectedDate}T${endTime}:00`;

    const optimisticEvent = {
      id: Date.now().toString(),
      title,
      description,
      start: startISO,
      end: endISO,
      backgroundColor: "#6366f1",
      borderColor: "#4f46e5",
      textColor: "#ffffff"
    };

    setEvents((prev) => [...prev, optimisticEvent]);
    setIsCreateModalOpen(false);

    try {
      await createEvent({
        summary: title,
        description: description,
        start: startISO,
        end: endISO,
      });
    } catch (error) {
      alert("Failed to create event");
    }
  };

  if (!isAuthenticated) {
      return <LoginScreen onLogin={handleLogin} />;
  }

  const upcomingEvents = events
    .filter((e) => new Date(e.start) >= new Date())
    .sort((a, b) => new Date(a.start) - new Date(b.start))
    .slice(0, 5);
  const allEventsSorted = [...events].sort((a, b) => new Date(b.start) - new Date(a.start)); 
  const sidebarEvents = sidebarTab === "upcoming" ? upcomingEvents : allEventsSorted;

  return (
    <div className="flex flex-row h-screen w-full bg-slate-950 text-slate-200 font-sans overflow-hidden">
      
      <aside className="w-80 flex-none border-r border-slate-800 bg-slate-900 flex flex-col z-20 shadow-xl">
        <div className="p-6 border-b border-slate-800">
          <h2 className="text-xl font-bold flex items-center gap-2 mb-6 text-white">
            <CalendarIcon />
            Google-MCP-calendar
          </h2>
          <button
            onClick={() => {
              setSelectedDate(new Date().toISOString().split('T')[0]);
              openCreateModal();
            }}
            className="w-full py-3 px-4 bg-indigo-600 text-white font-semibold rounded-xl shadow-lg shadow-indigo-900/20 
                       hover:bg-indigo-500 hover:shadow-indigo-500/30 active:scale-[0.98] transition-all duration-200 
                       flex items-center justify-center gap-2"
          >
            <PlusIcon />
            New Event
          </button>
        </div>
        <div className="flex border-b border-slate-800">
          <button onClick={() => setSidebarTab("upcoming")} className={`flex-1 py-3 text-sm font-medium transition-all relative ${sidebarTab === "upcoming" ? "text-indigo-400 bg-slate-800/50" : "text-slate-500 hover:text-indigo-300 hover:bg-slate-800/30"}`}>
            Upcoming {sidebarTab === "upcoming" && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-indigo-500"></div>}
          </button>
          <button onClick={() => setSidebarTab("all")} className={`flex-1 py-3 text-sm font-medium transition-all relative ${sidebarTab === "all" ? "text-indigo-400 bg-slate-800/50" : "text-slate-500 hover:text-indigo-300 hover:bg-slate-800/30"}`}>
            All Events {sidebarTab === "all" && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-indigo-500"></div>}
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
          {sidebarEvents.length === 0 ? <p className="text-sm text-slate-600 italic p-2 text-center mt-4">No events found.</p> : sidebarEvents.map((evt) => (
            <div key={evt.id} onClick={() => handleEventClick({ event: evt })} className="group p-3 rounded-lg bg-slate-800/50 border border-slate-700 hover:border-indigo-400 hover:bg-slate-800 hover:shadow-lg transition-all cursor-pointer">
              <div className="font-semibold text-slate-200 truncate group-hover:text-indigo-300">{evt.title}</div>
              <div className="flex items-center gap-1 text-xs text-slate-500 mt-1 group-hover:text-slate-400">
                <ClockIcon />{new Date(evt.start).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })} • {new Date(evt.start).toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
          ))}
        </div>
        
        <div className="p-4 border-t border-slate-800 bg-slate-900/50">
            <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-800 transition-colors">
                <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center text-xs font-bold text-white shadow-md shadow-indigo-500/20">
                    ME
                </div>
                <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white truncate">Demo User</p>
                    <p className="text-xs text-slate-500 truncate">demo@example.com</p>
                </div>
                <button onClick={handleLogout} className="p-2 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-all" title="Log Out">
                    <LogoutIcon />
                </button>
            </div>
        </div>
      </aside>

      {/* --- MAIN CONTENT --- */}
      <main className="flex-1 h-full w-full bg-slate-950 relative overflow-hidden flex flex-col">
        <div className="flex-1 w-full h-full p-4 calendar-container">
            <FullCalendar
              plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin, listPlugin]}
              initialView="dayGridMonth"
              headerToolbar={{ left: "prev,next today", center: "title", right: "dayGridMonth,timeGridWeek,listWeek" }}
              events={events}
              dateClick={handleDateClick}
              eventClick={handleEventClick}
              height="100%" contentHeight="auto" expandRows={true} handleWindowResize={true} dayMaxEvents={true}
              eventClassNames="cursor-pointer hover:scale-[1.02] hover:shadow-md hover:brightness-110 transition-all duration-200 rounded-sm border-0 text-xs px-1 truncate"
            />
        </div>
      </main>

      {/* MODALS */}
      {isDaySummaryOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden ring-1 ring-white/10 animate-in fade-in zoom-in duration-200">
                <div className="p-6 border-b border-slate-800 flex justify-between items-center">
                     <div>
                         <h3 className="font-bold text-lg text-white">Events on {new Date(selectedDate).toLocaleDateString(undefined, {month: 'short', day: 'numeric'})}</h3>
                         <p className="text-xs text-slate-500">You already have plans this day.</p>
                     </div>
                     <button onClick={() => setIsDaySummaryOpen(false)} className="p-1.5 rounded-full text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"><XIcon /></button>
                </div>
                <div className="p-4 max-h-60 overflow-y-auto custom-scrollbar space-y-2">
                     {dayEvents.map(evt => (
                         <div key={evt.id} className="p-3 rounded bg-slate-800 border border-slate-700 flex items-center gap-3">
                             <div className="w-1 h-8 bg-indigo-500 rounded-full"></div>
                             <div className="flex-1 min-w-0">
                                 <div className="font-medium text-slate-200 truncate">{evt.title}</div>
                                 <div className="text-xs text-slate-500">
                                    {new Date(evt.start).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                                 </div>
                             </div>
                         </div>
                     ))}
                </div>
                <div className="p-4 bg-slate-900 border-t border-slate-800 text-center">
                    <p className="text-sm text-slate-400 mb-3">Do you want to add another event?</p>
                    <button onClick={openCreateModal} className="w-full py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-500 transition-all shadow-lg shadow-indigo-500/20 font-semibold flex justify-center items-center gap-2">
                        <PlusIcon /> Yes, Add Event
                    </button>
                </div>
            </div>
        </div>
      )}

      {isCreateModalOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
           <div className="bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl w-full max-w-md animate-in fade-in zoom-in duration-200 ring-1 ring-white/10 relative">
            <div className="bg-slate-800 p-4 flex justify-between items-center text-white border-b border-slate-700 rounded-t-2xl">
              <h3 className="font-bold text-lg">New Event</h3>
              <button onClick={() => setIsCreateModalOpen(false)} className="p-1.5 rounded-full text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"><XIcon /></button>
            </div>
            <div className="p-6 space-y-5">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Title</label>
                <input autoFocus className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Team Sync" />
              </div>
              <div className="grid grid-cols-2 gap-4 relative z-50"> 
                <CustomTimePicker label="Start Time" value={startTime} onChange={setStartTime} />
                <CustomTimePicker label="End Time" value={endTime} onChange={setEndTime} />
              </div>
              <div className="relative z-0">
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Description</label>
                <textarea className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 h-24 resize-none text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Add details..." />
              </div>
            </div>
            <div className="p-4 bg-slate-900 border-t border-slate-800 flex justify-end gap-3 rounded-b-2xl">
              <button onClick={() => setIsCreateModalOpen(false)} className="px-4 py-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors">Cancel</button>
              <button onClick={handleCreate} className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-500 hover:shadow-lg hover:shadow-indigo-500/20 active:scale-95 transition-all">Save Event</button>
            </div>
          </div>
        </div>
      )}

      {isViewModalOpen && selectedEvent && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
           <div className="bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden border-t-8 border-indigo-500 animate-in fade-in zoom-in duration-200 ring-1 ring-white/10">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-2xl font-bold text-white leading-tight">{selectedEvent.title}</h2>
                <button onClick={() => setIsViewModalOpen(false)} className="p-1.5 rounded-full text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"><XIcon /></button>
              </div>
              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-2 text-indigo-300 font-medium bg-indigo-500/10 w-fit px-3 py-1 rounded-full text-sm border border-indigo-500/20">
                  <ClockIcon />
                  <span>{selectedEvent.allDay ? "All Day" : `${new Date(selectedEvent.start).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})} - ${new Date(selectedEvent.end).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}`}</span>
                </div>
                <p className="text-slate-400 text-sm border-l-2 border-slate-700 pl-3">{new Date(selectedEvent.start).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
              </div>
              {selectedEvent.description ? <div className="bg-slate-950 border border-slate-800 p-4 rounded-xl text-slate-300 text-sm leading-relaxed">{selectedEvent.description}</div> : <p className="text-slate-600 text-sm italic">No description provided.</p>}
            </div>
            <div className="bg-slate-900 border-t border-slate-800 p-4 text-center">
              <button onClick={() => setIsViewModalOpen(false)} className="text-indigo-400 font-semibold hover:text-indigo-300 hover:underline decoration-indigo-500/50 text-sm transition-all">Close Details</button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .fc { width: 100% !important; height: 100% !important; max-width: 100% !important; }
        .fc-view-harness { width: 100% !important; height: 100% !important; }
        .calendar-container { width: 100% !important; flex-grow: 1; display: flex; flex-direction: column; }
        :root { --fc-page-bg-color: #020617; --fc-border-color: #1e293b; --fc-neutral-bg-color: #1e293b; --fc-list-event-hover-bg-color: #334155; --fc-today-bg-color: rgba(99, 102, 241, 0.15) !important; }
        .fc-theme-standard td, .fc-theme-standard th { border-color: #1e293b !important; }
        .fc-col-header-cell-cushion { color: #94a3b8; text-transform: uppercase; font-size: 0.75rem; letter-spacing: 0.05em; }
        .fc-daygrid-day-number { color: #cbd5e1; font-weight: 500; }
        .fc-toolbar-title { font-size: 1.5rem !important; font-weight: 700; color: #f1f5f9 !important; }
        .fc-button-primary { background-color: #4f46e5 !important; border-color: #4f46e5 !important; color: white !important; transition: all 0.2s !important; }
        .fc-button-primary:hover { background-color: #4338ca !important; border-color: #4338ca !important; box-shadow: 0 4px 6px -1px rgba(79, 70, 229, 0.3) !important; transform: translateY(-1px); }
        .fc-button-active { background-color: #3730a3 !important; border-color: #3730a3 !important; transform: translateY(0) !important; }
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: #0f172a; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background-color: #334155; border-radius: 20px; }
      `}</style>
    </div>
  );
}
