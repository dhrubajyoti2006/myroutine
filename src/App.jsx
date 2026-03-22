import { useState } from 'react'
import { Calendar, dateFnsLocalizer } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { format, parse, startOfWeek, getDay } from 'date-fns'
import { enUS } from 'date-fns/locale'
import './App.css'

const locales = {
  'en-US': enUS,
}

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: () => startOfWeek(new Date(), { weekStartsOn: 1 }),
  getDay,
  locales,
})

const schedule = {
  monday: [
    { title: 'Wake Up & Basics', start: '07:15', end: '07:30' },
    { title: 'School Drop', start: '07:45', end: '08:00' },
    { title: 'Supermarket', start: '08:00', end: '08:15' },
    { title: 'Breakfast Preparation', start: '08:20', end: '08:40' },
    { title: 'Office Travel', start: '09:20', end: '09:30' },
    { title: 'Office', start: '09:30', end: '17:30' },
    { title: 'Return from Office', start: '17:30', end: '17:40' },
    { title: 'Swimming Drop', start: '17:50', end: '18:00' },
    { title: 'Swimming Pickup', start: '19:00', end: '19:20' },
    { title: 'Dinner', start: '19:45', end: '20:15' },
    { title: 'Bedtime with Riyan', start: '20:45', end: '21:05' },
  ],
  tuesday: [
    { title: 'Wake Up & Basics', start: '07:15', end: '07:30' },
    { title: 'School Drop', start: '07:45', end: '08:00' },
    { title: 'Office (work from home)', start: '09:30', end: '15:30' },
    { title: 'School Pickup', start: '15:30', end: '15:40' },
    { title: 'Office (work from home)', start: '15:40', end: '17:30' },
    { title: 'Dinner', start: '19:45', end: '20:15' },
    { title: 'Bedtime with Riyan', start: '20:45', end: '21:05' },
  ],
  wednesday: [
    { title: 'Wake Up & Basics', start: '07:15', end: '07:30' },
    { title: 'School Drop', start: '07:45', end: '08:00' },
    { title: 'Supermarket', start: '08:00', end: '08:15' },
    { title: 'Office Travel', start: '09:20', end: '09:30' },
    { title: 'Office', start: '09:30', end: '17:30' },
    { title: 'Return from Office', start: '17:30', end: '17:40' },
    { title: 'Swimming Drop', start: '18:50', end: '19:00' },
    { title: 'Swimming Pickup', start: '20:00', end: '20:20' },
    { title: 'Dinner', start: '20:45', end: '21:15' },
    { title: 'Bedtime with Riyan', start: '21:15', end: '21:35' },
  ],
  thursday: [
    { title: 'Wake Up & Basics', start: '07:15', end: '07:30' },
    { title: 'School Drop', start: '07:45', end: '08:00' },
    { title: 'Breakfast Preparation', start: '08:25', end: '08:45' },
    { title: 'Office (work from home)', start: '09:30', end: '15:30' },
    { title: 'School Pickup', start: '15:30', end: '15:40' },
    { title: 'Chinese Class Drop', start: '16:50', end: '17:00' },
    { title: 'Chinese Class Pickup', start: '18:10', end: '18:20' },
    { title: 'Dinner', start: '19:45', end: '20:15' },
    { title: 'Bedtime with Riyan', start: '20:45', end: '21:05' },
  ],
  friday: [
    { title: 'Wake Up & Basics', start: '07:15', end: '07:30' },
    { title: 'School Drop', start: '07:45', end: '08:00' },
    { title: 'Supermarket', start: '08:00', end: '08:15' },
    { title: 'Office (work from home)', start: '09:30', end: '13:15' },
    { title: 'School Pickup', start: '13:15', end: '13:25' },
    { title: 'Office (work from home)', start: '13:25', end: '17:30' },
    { title: 'Dinner', start: '19:45', end: '20:15' },
    { title: 'Bedtime with Riyan', start: '20:45', end: '21:05' },
  ],
  saturday: [
    { title: 'Wake Up & Basics', start: '07:15', end: '07:30' },
    { title: 'Cricket Travel', start: '07:20', end: '07:30' },
    { title: 'Cricket Training & Coaching', start: '07:30', end: '10:00' },
    { title: 'Return Travel', start: '10:00', end: '10:20' },
    { title: 'Dinner', start: '19:45', end: '20:15' },
    { title: 'Bedtime with Riyan', start: '20:45', end: '21:05' },
  ],
  sunday: [{ title: 'Wake Up & Basics', start: '07:15', end: '07:30' }],
}

const baseWeek = {
  monday: '2026-03-16',
  tuesday: '2026-03-17',
  wednesday: '2026-03-18',
  thursday: '2026-03-19',
  friday: '2026-03-20',
  saturday: '2026-03-21',
  sunday: '2026-03-22',
}

const categoryPalette = {
  school: {
    label: 'School Drop / Pickup',
    background: '#ff8a65',
    border: '#d65a38',
    text: '#3a1207',
  },
  shopping: {
    label: 'Supermarket',
    background: '#f4b942',
    border: '#bc7b00',
    text: '#2f1b00',
  },
  work: {
    label: 'Office / Work From Home',
    background: '#5dade2',
    border: '#2c74b3',
    text: '#081f33',
  },
  swimming: {
    label: 'Swimming Drop / Pickup',
    background: '#4ecdc4',
    border: '#1b9f97',
    text: '#063330',
  },
  chineseClass: {
    label: 'Chinese Class',
    background: '#c792ea',
    border: '#8c56b3',
    text: '#261333',
  },
  cricket: {
    label: 'Cricket / Coaching',
    background: '#95d46b',
    border: '#5f9f3d',
    text: '#1d300f',
  },
  meals: {
    label: 'Breakfast / Dinner',
    background: '#f7a072',
    border: '#d06c38',
    text: '#3f1705',
  },
  family: {
    label: 'Bedtime With Riyan',
    background: '#f284b6',
    border: '#c24d86',
    text: '#42091f',
  },
  travel: {
    label: 'Travel / Return',
    background: '#8ecae6',
    border: '#529bc0',
    text: '#062733',
  },
  routine: {
    label: 'Wake Up & Basics',
    background: '#b8c0d6',
    border: '#7c869d',
    text: '#1d2433',
  },
}

function getCategory(title) {
  if (title.includes('School')) return 'school'
  if (title.includes('Supermarket')) return 'shopping'
  if (title.includes('Office')) return 'work'
  if (title.includes('Swimming')) return 'swimming'
  if (title.includes('Chinese Class')) return 'chineseClass'
  if (title.includes('Cricket')) return 'cricket'
  if (title.includes('Breakfast')) return 'meals'
  if (title.includes('Dinner')) return 'meals'
  if (title.includes('Bedtime')) return 'family'
  if (title.includes('Travel') || title.includes('Return')) return 'travel'
  return 'routine'
}

function toDate(day, time) {
  return new Date(`${baseWeek[day]}T${time}:00`)
}

const events = Object.entries(schedule).flatMap(([day, items]) =>
  items.map((item, index) => {
    const category = getCategory(item.title)
    return {
      id: `${day}-${index}-${item.title}`,
      title: item.title,
      start: toDate(day, item.start),
      end: toDate(day, item.end),
      category,
    }
  }),
)

const visibleDate = new Date('2026-03-16T00:00:00')

const legendItems = Object.entries(categoryPalette)
  .filter(([category]) => events.some((event) => event.category === category))
  .map(([category, palette]) => ({ category, ...palette }))

const eventStyleGetter = (event) => {
  const palette = categoryPalette[event.category] ?? categoryPalette.routine
  return {
    style: {
      backgroundColor: palette.background,
      borderColor: palette.border,
      color: palette.text,
      boxShadow: `0 10px 20px -14px ${palette.border}`,
    },
  }
}

const formats = {
  dayFormat: 'EEE dd',
  timeGutterFormat: 'HH:00',
  eventTimeRangeFormat: ({ start, end }, culture, local) =>
    `${local.format(start, 'HH:mm', culture)} - ${local.format(end, 'HH:mm', culture)}`,
}

const planningNotes = [
  {
    title: 'Weekly (not fixed in calendar)',
    items: [
      'Injection Appointment: mostly Tuesday, around 16:00-17:30, takes about 1.5 hours and makes Tuesday a light or exception day.',
      'Family / Social Invitation: once per week, usually lunch or dinner, preferably Saturday or Sunday, and sometimes replaces Friday evening.',
      "Riyan's Invitations: occasional drop plus pickup, replacing evening or afternoon slots as needed.",
    ],
  },
  {
    title: 'Quarterly / Occasional',
    items: [
      'Dental Visit: roughly once every 3 months for about 1 hour, treated like a split day similar to Thursday, replacing one work block.',
    ],
  },
]

const weeklyPlanSections = [
  {
    day: 'Monday',
    items: [
      ['7:45 - 8:00', 'School drop'],
      ['8:00 - 8:15', 'Supermarket'],
      ['9:20 - 9:30', 'Travel to office'],
      ['9:30 - 17:30', 'Office'],
      ['17:30 - 17:40', 'Return from office'],
      ['17:50 - 18:00', 'Swimming drop'],
      ['19:00 - 19:20', 'Swimming pickup'],
      ['19:45 - 20:15', 'Dinner'],
      ['20:45 - 21:05', 'Be with Riyan at bedtime'],
    ],
  },
  {
    day: 'Tuesday',
    items: [
      ['7:45 - 8:00', 'School drop'],
      ['9:30 - 15:30', 'Office (work from home)'],
      ['15:30 - 15:40', 'School pickup'],
      ['15:40 - 17:30', 'Office (work from home)'],
      ['19:45 - 20:15', 'Dinner'],
      ['20:45 - 21:05', 'Be with Riyan at bedtime'],
    ],
    note: 'Tuesday evening is otherwise relatively free, but there can often be an injection appointment as an exception.',
  },
  {
    day: 'Wednesday',
    items: [
      ['7:45 - 8:00', 'School drop'],
      ['8:00 - 8:15', 'Supermarket'],
      ['9:20 - 9:30', 'Travel to office'],
      ['9:30 - 17:30', 'Office'],
      ['17:30 - 17:40', 'Return from office'],
      ['18:50 - 19:00', 'Swimming drop'],
      ['20:00 - 20:20', 'Swimming pickup'],
      ['20:45 - 21:15', 'Dinner'],
      ['21:15 - 21:35', 'Be with Riyan at bedtime'],
    ],
  },
  {
    day: 'Thursday',
    items: [
      ['7:45 - 8:00', 'School drop'],
      ['9:30 - 15:30', 'Office (work from home)'],
      ['15:30 - 15:40', 'School pickup'],
      ['16:50 - 17:00', 'Chinese class drop'],
      ['18:10 - 18:20', 'Chinese class pickup'],
      ['19:45 - 20:15', 'Dinner'],
      ['20:45 - 21:05', 'Be with Riyan at bedtime'],
    ],
  },
  {
    day: 'Friday',
    items: [
      ['7:45 - 8:00', 'School drop'],
      ['8:00 - 8:15', 'Supermarket'],
      ['9:30 - 13:15', 'Office (work from home)'],
      ['13:15 - 13:25', 'School pickup'],
      ['13:25 - 17:30', 'Office (work from home)'],
      ['19:45 - 20:15', 'Dinner'],
      ['20:45 - 21:05', 'Be with Riyan at bedtime'],
    ],
  },
  {
    day: 'Saturday',
    items: [
      ['7:20 - 7:30', 'Travel for cricket'],
      ['7:30 - 10:00', "Riyan's cricket and coaching the kids"],
      ['10:00 - 10:20', 'Return travel'],
      ['19:45 - 20:15', 'Dinner'],
      ['20:45 - 21:05', 'Be with Riyan at bedtime'],
    ],
  },
  {
    day: 'Sunday',
    items: [['', 'No fixed recurring blocked activity has been added for Sunday in the base weekly plan.']],
  },
]

function EventCard({ event, isActive, onHoverChange }) {
  return (
    <button
      type="button"
      className={`event-card ${isActive ? 'is-active' : ''}`}
      onPointerEnter={() => onHoverChange(event.id)}
      onPointerLeave={() => onHoverChange(null)}
      onMouseEnter={() => onHoverChange(event.id)}
      onMouseLeave={() => onHoverChange(null)}
      onFocus={() => onHoverChange(event.id)}
      onBlur={() => onHoverChange(null)}
    >
      <span className="event-card__title">{event.title}</span>
      {isActive ? (
        <span className="event-tooltip">
          <strong>{event.title}</strong>
          <span>{format(event.start, 'EEEE')}</span>
          <span>
            {format(event.start, 'HH:mm')} - {format(event.end, 'HH:mm')}
          </span>
        </span>
      ) : null}
    </button>
  )
}

function App() {
  const [hoveredEventId, setHoveredEventId] = useState(null)

  return (
    <main className="app-shell">
      <section className="legend" aria-label="Activity categories">
        {legendItems.map((item) => (
          <div className="legend-item" key={item.category}>
            <span
              className="legend-swatch"
              style={{ backgroundColor: item.background, borderColor: item.border }}
            />
            <span>{item.label}</span>
          </div>
        ))}
      </section>

      <section className="content-grid">
        <section className="calendar-card">
          <Calendar
            localizer={localizer}
            events={events}
            date={visibleDate}
            defaultView="week"
            views={['week']}
            toolbar={false}
            step={60}
            timeslots={1}
            min={new Date('2026-03-16T07:00:00')}
            max={new Date('2026-03-16T22:30:00')}
            eventPropGetter={eventStyleGetter}
            formats={formats}
            components={{
              event: ({ event }) => (
                <EventCard
                  event={event}
                  isActive={hoveredEventId === event.id}
                  onHoverChange={setHoveredEventId}
                />
              ),
            }}
          />
        </section>

        <aside className="notes-card" aria-label="Weekly and occasional notes">
          {planningNotes.map((section) => (
            <section className="notes-section" key={section.title}>
              <h2>{section.title}</h2>
              <ul className="notes-list">
                {section.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>
          ))}
        </aside>
      </section>

      <section className="weekly-plan" aria-label="Weekly plan details">
        <h1>Weekly Plan</h1>
        <p className="weekly-plan__intro">
          This is the full weekly plan in a readable format, including fixed
          weekly activities and separate notes for occasional, monthly, and
          quarterly items.
        </p>

        {weeklyPlanSections.map((section) => (
          <article className="plan-day-card" key={section.day}>
            <h2>{section.day}</h2>
            <ul className="plan-list">
              {section.items.map(([time, text]) => (
                <li key={`${section.day}-${time}-${text}`}>
                  {time ? <span className="plan-time">{time}</span> : null}
                  <span>{time ? `: ${text}` : text}</span>
                </li>
              ))}
            </ul>
            {section.note ? (
              <p className="plan-small-note">{section.note}</p>
            ) : null}
          </article>
        ))}

        <h2 className="plan-section-title">Occasional / Monthly / Quarterly Items</h2>

        <article className="plan-notes-card">
          <h3>Weekly but Not Fixed</h3>
          <ul className="plan-list">
            <li>
              <span className="plan-highlight">Injection appointment</span>: Mostly
              on Tuesday at around <span className="plan-time">16:00</span>, taking
              about <span className="plan-time">1.5 hours</span>.
            </li>
            <li>
              <span className="plan-highlight">
                One lunch or dinner invitation per week
              </span>
              : Usually placed on a half day, preferably on Saturday or Sunday.
            </li>
            <li>
              <span className="plan-highlight">Riyan&apos;s invitations</span>:
              Occasionally requires drop and pickup.
            </li>
          </ul>
        </article>

        <article className="plan-notes-card">
          <h3>Quarterly / Occasional</h3>
          <ul className="plan-list">
            <li>
              <span className="plan-highlight">Dental visit</span>: Once in about
              <span className="plan-time"> 3 months</span>, usually taking about
              <span className="plan-time"> 1 hour</span>.
            </li>
          </ul>
        </article>
      </section>

    </main>
  )
}

export default App
