/** Single-day schedule — adjust times in one place */
export const SCHEDULE_DAY = {
  dateLabel: 'Saturday, April 18',
  summary:
    'Full day on campus — public window roughly 7:30 AM – 5:30 PM for the core program; cleanup follows.',
  items: [
    { time: '7:30–8:00', title: 'Check-in', description: 'Participants arrive, grab swag, find your table.' },
    { time: '8:00–8:15', title: 'Welcome Address', description: 'Kickoff and rules of the road.' },
    {
      time: '8:15–9:00',
      title: 'Introductory Workshops',
      description: 'Creating begins — track intros and tooling before the main build.',
    },
    {
      time: '9:00–4:00',
      title: 'Creating Session',
      description: 'Main build window — optional workshops 10:30–11:30.',
    },
    { time: '4:00–5:00', title: 'Judging', description: 'Presentations and demos for judges.' },
    { time: '5:00–5:30', title: 'Closing Ceremony', description: 'Awards, thanks, and next steps.' },
  ],
};
