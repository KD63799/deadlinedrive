import { useState, useEffect, useRef } from "react";
import axios from "axios";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { createEventId } from "./event-utils"; // Importing utility function for event IDs
import frLocale from "@fullcalendar/core/locales/fr"; // French locale for FullCalendar
import "./CalendarStyle.css"; // CSS file for calendar styling
import ScrollToTopButton from '../ScrollToTopButton/ScrollToTopButton'; // Import the ScrollToTopButton component
import formatDateCalendar from "@services/formatDateCalendar";

export default function CalendarComponents({ tasks, setTasks, fetchTasks }) {
  // Simulate user authentication
  const user_id = JSON.parse(localStorage.getItem("id"));

  // State hooks for managing component state
  const [weekendsVisible, setWeekendsVisible] = useState(true); // Toggle weekends visibility
  const [currentEvents, setCurrentEvents] = useState([]); // Array of current events/tasks
  const [loading, setLoading] = useState(true); // Loading state indicator
  const [modalIsOpen, setModalIsOpen] = useState(false); // State for update modal visibility
  const [createModalIsOpen, setCreateModalIsOpen] = useState(false); // State for create modal visibility
  const [selectedEvent, setSelectedEvent] = useState(null); // State for currently selected event/task
  const [newTask, setNewTask] = useState({
    // State for new task creation
    title: "",
    description: "",
    status: "",
    deadline: "",
  });

  // Refs for DOM elements (used for scrolling to modals)
  const calendarRef = useRef(null); // Ref for FullCalendar component
  const updateModalRef = useRef(null); // Ref for update modal
  const createModalRef = useRef(null); // Ref for create modal

  // Function to format date string to "YYYY-MM-DD" format
  function formatDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  // // Function to format date and time string to "YYYY-MM-DD HH:mm:ss" format
  // function formatDateCalendar(dateString) {
  //   const date = new Date(dateString);
  //   const year = date.getFullYear();
  //   const month = (date.getMonth() + 1).toString().padStart(2, "0");
  //   const day = date.getDate().toString().padStart(2, "0");
  //   const hours = date.getHours().toString().padStart(2, "0");
  //   const minutes = date.getMinutes().toString().padStart(2, "0");
  //   const seconds = date.getSeconds().toString().padStart(2, "0");
  //   return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  // }

  // Convert tasks to events for FullCalendar
  useEffect(() => {
    const events = tasks.map((task) => ({
      title: task.title,
      date: formatDate(task.deadline),
      id: task.id,
      status: task.status,
      description: task.description,
      id_user: task.id_user,
    }));
    setCurrentEvents(events);
    setLoading(false); // Update loading state
  }, [tasks]);

  // Effect hook to scroll to update modal when it opens
  useEffect(() => {
    if (modalIsOpen && updateModalRef.current) {
      updateModalRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [modalIsOpen]); // Dependency on modalIsOpen state

  // Effect hook to scroll to create modal when it opens
  useEffect(() => {
    if (createModalIsOpen && createModalRef.current) {
      createModalRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [createModalIsOpen]); // Dependency on createModalIsOpen state

  // Handler function to toggle weekends visibility
  function handleWeekendsToggle() {
    setWeekendsVisible(!weekendsVisible);
  }

  // Handler function for date select in calendar
  const handleDateSelect = (selectInfo) => {
    setNewTask({
      ...newTask,
      deadline: formatDateCalendar(selectInfo.startStr),
    });
    setCreateModalIsOpen(true); // Open create modal
  };

  // Handler function for creating a new task
  const handleCreateTask = async () => {
    const calendarApi = calendarRef.current.getApi(); // Access FullCalendar API

    const task = {
      id: createEventId(), // Generate unique event ID
      ...newTask,
      id_user: user_id, // Use authenticated user's ID
    };

    calendarApi.addEvent(task); // Add event to FullCalendar

    try {
      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/tasks`, task); // POST request to save task
      fetchTasks()
      setCreateModalIsOpen(false); // Close create modal
    } catch (error) {
      console.error("Error adding task", error);
    }
  };

  // Handler function for clicking on an event/task in calendar
  const handleEventClick = (clickInfo) => {
    setSelectedEvent({
      id: clickInfo.event.id,
      title: clickInfo.event.title,
      description: clickInfo.event.extendedProps.description,
      status: clickInfo.event.extendedProps.status,
      start: clickInfo.event.start,
      id_user: clickInfo.event.extendedProps.id_user,
    });
    setModalIsOpen(true); // Open update/delete modal for the clicked event
  };

  // Handler function for updating an event/task
  const handleEventUpdate = async () => {
    if (selectedEvent.id_user !== user_id) {
      alert("You can only update your own tasks");
      return;
    }

    try {
      const updatedEvent = {
        ...selectedEvent,
        id_user: user_id,
        deadline: formatDateCalendar(selectedEvent.start),
      };

      await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/tasks/${selectedEvent.id}`,
        updatedEvent
      ); // PUT request to update task
      fetchTasks() // Update tasks state with updated task
      
      setModalIsOpen(false); // Close update modal
    } catch (error) {
      console.error("Error updating task", error);
    }
  };

  // Handler function for deleting an event/task
  const handleEventDelete = async () => {
    if (selectedEvent.id_user !== user_id) {
      alert("You can only delete your own tasks");
      return;
    }

    if (
      window.confirm(
        `Are you sure you want to delete the event '${selectedEvent.title}'`
      )
    ) {
      try {
        await axios.delete(
          `${import.meta.env.VITE_BACKEND_URL}/tasks/${selectedEvent.id}`
        ); // DELETE request to delete task
        setTasks((prevTasks) =>
          prevTasks.filter((task) => task.id !== selectedEvent.id)
        ); // Update tasks state with deleted task removed
        setModalIsOpen(false); // Close delete modal
        fetchTasks()
      } catch (error) {
        console.error("Error deleting task", error);
      }
    }
  };

  // Function to render the event content in the calendar
  function renderEventContent(eventInfo) {
    return (
      <>
        <b className="mr-0.5">{eventInfo.timeText}</b>
        <i>{eventInfo.event.title}</i>
      </>
    );
  }

  // Sidebar component for instructions and weekend toggle
  function Sidebar({ weekendsVisible, handleWeekendsToggle }) {
    return (
      <div className="flex flex-row justify-center">
        <div className="py-7 content-start text-center">
          <h2 className="font-semibold  text-xl">Instructions</h2>
          <ul>
            <li>Scroll pour voir le calendrier</li>
            <li>Clique sur une date pour ajouter une tâche</li>
            <li>Clique sur une tâche pour la modifier ou la supprimer</li>
          </ul>
          <div className="pt-2">
            <label className="font-semibold">
              <input
                type="checkbox"
                checked={weekendsVisible}
                onChange={handleWeekendsToggle}
              ></input>
              Weekends visible
            </label>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-rows-1 min-h-full text-sm">
      <Sidebar
        weekendsVisible={weekendsVisible}
        handleWeekendsToggle={handleWeekendsToggle}
      />
      <div className="grow p-12">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <FullCalendar
            ref={calendarRef} // Add ref to FullCalendar component
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            themeSystem={"Slate"}
            headerToolbar={{
              left: "prev,next",
              center: "title",
              right: "today",
            }}
            initialView="dayGridMonth"
            locale={frLocale}
            editable={true}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            weekends={weekendsVisible}
            events={currentEvents}
            select={handleDateSelect}
            eventContent={renderEventContent}
            eventClick={handleEventClick}
          />
        )}

        {modalIsOpen && (
          <div className="modal max-w-2xl grid grid-col-2" ref={updateModalRef}>
            {" "}
            {/* Add ref to update modal */}
            <div className="modal-content  flex flex-col  m-3 ">
              <div className="p-4 bg-custom-main-orange rounded-lg">
              <h2 className="font-semibold text-xl pb-4 text-ivory">
                Modifier une tâche
              </h2>
              <label className="my-1">
                <strong>Titre:</strong>
                <input
                  type="text"
                  value={selectedEvent?.title}
                  onChange={(e) =>
                    setSelectedEvent({
                      ...selectedEvent,
                      title: e.target.value,
                    })
                  }
                  className="relative bg-gray-50ring-0 outline-none border border-neutral-500 text-neutral-900 placeholder-violet-700 text-sm rounded-lg focus:ring-violet-500  focus:border-violet-500 block w-64 p-2.5 checked:bg-emerald-500"
                />
              </label>
              <label className="my-1">
                <strong>Description:</strong>
                <textarea
                  value={selectedEvent?.description}
                  onChange={(e) =>
                    setSelectedEvent({
                      ...selectedEvent,
                      description: e.target.value,
                    })
                  }
                  className="relative bg-gray-50ring-0 outline-none border border-neutral-500 text-neutral-900 placeholder-violet-700 text-sm rounded-lg focus:ring-violet-500  focus:border-violet-500 block w-64 p-2.5 checked:bg-emerald-500"
                />
              </label>
              <label className="my-1">
                <strong>Status:</strong>
                <select
                  value={selectedEvent?.status}
                  onChange={(e) =>
                    setSelectedEvent({
                      ...selectedEvent,
                      status: e.target.value,
                    })
                  }
                  className="relative bg-gray-50ring-0 outline-none border border-neutral-500 text-neutral-900 placeholder-violet-700 text-sm rounded-lg focus:ring-violet-500  focus:border-violet-500 block w-64 p-2.5 checked:bg-emerald-500"
                >
                  <option value="A faire">A faire</option>

                  <option value="En cours">En cours</option>

                  <option value="Urgent">Urgent</option>

                  <option value="Fini">Fini</option>
                </select>
              </label>
              <label className="my-1">
                <strong>Date:</strong>
                <input
                  type="datetime-local"
                  value={
                    selectedEvent?.start
                      ? formatDateCalendar(selectedEvent.start).substring(0, 16)
                      : ""
                  }
                  onChange={(e) =>
                    setSelectedEvent({
                      ...selectedEvent,
                      start: e.target.value,
                    })
                  }
                  className="relative bg-gray-50ring-0 outline-none border border-neutral-500 text-neutral-900 placeholder-violet-700 text-sm rounded-lg focus:ring-violet-500  focus:border-violet-500 block w-64 p-2.5 checked:bg-emerald-500"
                />
              </label>
              </div>
              <div className="flex space-x-4">
              <button
                onClick={handleEventUpdate}
                className=" mt-12 inline-block rounded-lg border  px-4 py-3 text-center text-base font-semibold transition  text-ivory bg-butterscotch  hover:bg-caramel hover:text-primary"
              >
                Modifier
              </button>
              <button
                onClick={handleEventDelete}
                className=" mt-12 inline-block rounded-lg border   px-4 py-3 text-center text-base font-semibold transition  text-ivory bg-butterscotch  hover:bg-caramel hover:text-primary"
              >
                Supprimer
              </button>
              <button
                onClick={() => setModalIsOpen(false)}
                className=" mt-12 inline-block rounded-lg border   px-4 py-3 text-center text-base font-semibold transition  text-ivory bg-butterscotch  hover:bg-caramel hover:text-primary"
              >
                Fermer
              </button>
              </div>
            </div>
          </div>
        )}

        {createModalIsOpen && (
          <div className="modal max-w-2xl grid grid-col-2" ref={createModalRef} >
            {" "}
            {/* Add ref to create modal */}
            <div className="modal-content m-3">
              <div className="p-4 bg-custom-main-orange  rounded-lg">
              <h2 className="font-semibold text-xl pb-4 text-ivory">
                Créer une tâche
              </h2>
              <label className="my-1">
                <strong>Titre:</strong>
                <input
                  type="text"
                  value={newTask.title}
                  onChange={(e) =>
                    setNewTask({ ...newTask, title: e.target.value })
                  }
                  className="relative bg-gray-50ring-0 outline-none border border-neutral-500 text-neutral-900 placeholder-violet-700 text-sm rounded-lg focus:ring-violet-500  focus:border-violet-500 block w-64 p-2.5 checked:bg-emerald-500"
                />
              </label>
              <label className="my-1">
                <strong>Description:</strong>
                <textarea
                  value={newTask.description}
                  onChange={(e) =>
                    setNewTask({ ...newTask, description: e.target.value })
                  }
                  className="relative bg-gray-50ring-0 outline-none border border-neutral-500 text-neutral-900 placeholder-violet-700 text-sm rounded-lg focus:ring-violet-500  focus:border-violet-500 block w-64 p-2.5 checked:bg-emerald-500"
                />
              </label>
              <label className="my-1">
                <strong>Status:</strong>
                <select
                  value={newTask.status}
                  onChange={(e) =>
                    setNewTask({ ...newTask, status: e.target.value })
                  }
                  className="relative bg-gray-50ring-0 outline-none border border-neutral-500 text-neutral-900 placeholder-violet-700 text-sm rounded-lg focus:ring-violet-500  focus:border-violet-500 block w-64 p-2.5 checked:bg-emerald-500"
                >
                  <option value="A faire">A faire</option>

                  <option value="En cours">En cours</option>

                  <option value="Urgent">Urgent</option>

                  <option value="Fini">Fini</option>
                </select>
              </label>
              <label className="my-1">
                <strong>Date:</strong>
                <input
                  type="datetime-local"
                  value={
                    newTask.deadline ? newTask.deadline.substring(0, 16) : ""
                  }
                  onChange={(e) =>
                    setNewTask({ ...newTask, deadline: e.target.value })
                  }
                  className="relative bg-gray-50ring-0 outline-none border border-neutral-500 text-neutral-900 placeholder-violet-700 text-sm rounded-lg focus:ring-violet-500  focus:border-violet-500 block w-64 p-2.5 checked:bg-emerald-500"
                />
              </label>
              </div>
              <div className="flex space-x-4">
              <button
                onClick={handleCreateTask}
                className=" mt-12 inline-block rounded-lg border   px-4 py-3 text-center text-base font-semibold transition  text-ivory bg-butterscotch  hover:bg-caramel hover:text-primary"
              >
                Créer
              </button>
              <button
                onClick={() => setCreateModalIsOpen(false)}
                className=" mt-12 inline-block rounded-lg border   px-4 py-3 text-center text-base font-semibold transition  text-ivory bg-butterscotch  hover:bg-caramel hover:text-primary"
              >
                Fermer
              </button>
              </div>
            </div>
          </div>
        )}
      </div>
      < ScrollToTopButton />
    </div>
  );
}
