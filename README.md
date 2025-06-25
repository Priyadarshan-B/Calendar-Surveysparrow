#  React Calendar App

A modern, fully responsive calendar application built with **React**, **Tailwind CSS**, and **Day.js**. Supports multiple calendar views, event scheduling, JSON import, and seamless navigation. Designed for both desktop and mobile screens.

---
## Live Demo

 [Live Link](https://calendar-priyan.netlify.app/)

## Features

- Month, Week, Day, and Year views
- Add, edit, and view events
- Upload `.json` files for events
- Responsive layout with mobile support
- Event color coding
- Sticky headers and smooth transitions
- Reusable layout and context management

---

##  Tech Stack

| Tool            | Description                                  |
|-----------------|----------------------------------------------|
| React           | Frontend library                             |
| Tailwind CSS    | Utility-first CSS framework                  |
| Day.js          | Date handling                                |
| React Router    | Routing and navigation                       |
| Ant Design Icons| Iconography                                  |
| Vite            | Development/build tool                       |

---

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/calendar-app.git
cd calendar-app
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Start the Development Server

```bash
npm run dev
```

Visit `http://localhost:5173` to view the app.

---

##  Project Structure

```
├── src/                         # Main source folder
│
│   ├── App.jsx                  # Main React component where routes are defined
│   ├── App.css                  # Global styles
│   ├── index.css                # Tailwind base + custom CSS
│   ├── main.jsx                 # Entry point, renders <App />
│
│   ├── assets/                  # Static assets like images
│   │   └── user.png             # Default user profile image
│
│   ├── data/                    
│   │   └── events.json          # Sample event data (used if no upload)
│
│   ├── pages/                   # Route-level pages
│   │   └── Calendar/            # Calendar-related pages
│   │       ├── Calendar.jsx         # Main monthly calendar page
│   │       ├── CalendarDayPage.jsx  # Daily timeline view page
│   │       ├── CalendarWeek.jsx     # Weekly timeline view page
│   │       └── CalendarYear.jsx     # Full year view with all months
│   │
│   │   └── Dashboard/          # (Optional) Dashboard page
│   │       └── dashboard.jsx
│
│   ├── components/             # Reusable UI components
│   │
│   │   ├── appLayout/          # Layout wrapper with top bar and sidebar
│   │   │   ├── Layout.jsx           # Core layout structure
│   │   │   ├── LoadableLayout.jsx  # Layout with loading spinner logic
│   │   │   ├── SideBar.jsx         # Sidebar navigation
│   │   │   ├── TopBar.jsx          # Top navigation bar
│   │   │   └── toggleTheme.jsx     # Dark/light mode switch
│   │
│   │   ├── button/
│   │   │   └── FloatButton.jsx     # Floating "+" button to add events
│   │
│   │   ├── calendar/          
│   │   │   ├── CalendarCollapse.jsx # Toggle month/week/day view
│   │   │   ├── CalendarGrid.jsx     # Month grid calendar with events
│   │   │   ├── CalendarHeader.jsx   # Month/year selector
│   │   │   ├── CalendarMain.jsx     # Renders CalendarHeader + Grid
│   │   │   ├── CalendarWeek.jsx     # Week view with timeline
│   │   │   └── CalendarYear.jsx     # Full year grid
│   │
│   │   ├── datePicker/
│   │   │   ├── CustomCalendar.jsx   # Calendar widget for picking a day
│   │   │   └── CustomPicker.jsx     # Year/Month picker component
│   │
│   │   ├── events/
│   │   │   └── AddEvent.jsx         # Event creation form component
│   │
│   │   ├── loader/
│   │   │   ├── loader.css           # Custom animated loader style
│   │   │   └── loader.jsx           # Loader component
│   │
│   │   ├── popup/
│   │   │   ├── CustomPopup.jsx      # Modal popup to show events on day click
│   │   │   └── uploadPopup.jsx      # Wrapper for upload modal with AddEvent
│   │
│   │   ├── select/
│   │   │   └── CustomSelect.jsx     # Dropdown select for filters (if used)
│   │
│   │   ├── timeline/
│   │   │   └── TimeLine.jsx         # Timeline-based hour view for week
│   │
│   │   ├── toast/
│   │   │   └── toast.jsx            # Toast notifications using react-toastify
│   │
│   │   ├── upload/
│   │   │   └── JsonUpload.jsx       # Component to upload events via JSON
│   │
│   │   └── utils/
│   │       └── contexts/
│   │           └── EventContext.jsx # Global context for managing events
│
├── staticEvents.json             # Static JSON file for events (uploadable)
├── vite.config.js                # Vite bundler configuration

```

---

##  Uploading Events (JSON)

You can upload a `.json` file containing events via the "Upload Events" UI.

### Sample JSON Format

```json
[
  {
    "date": "2025-06-23",
    "startTime": "09:00",
    "endTime": "10:00",
    "color": "#1E88E5",
    "title": "Morning Briefing"
  },
  {
    "date": "2025-06-24",
    "startTime": "14:00",
    "endTime": "15:30",
    "color": "#E53935",
    "title": "Project Review"
  }
]
```

---

##  Responsive Design

- Mobile-first layout using Tailwind's responsive utilities
- Scrollable timeline for week/day views
- Condensed event titles and time info for small screens
- Floating "Add Event" button adapts to screen size

---

##  UI Highlights

- 🔵 Current time is marked with a blue line and a dot
- 📆 Year view highlights today and shows event dots
- 🗓️ Week/Day view shows overlapping events in columns
- 📤 Events uploaded from JSON are persisted in context

---

##  Learn More

- [React Documentation](https://reactjs.org/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Day.js Docs](https://day.js.org/)
- [Ant Design Icons](https://ant.design/components/icon/)

---

##  Build for Production

```bash
npm run build
```

Then preview with:

```bash
npm run preview
```

---
