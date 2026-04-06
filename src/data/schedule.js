/** Single-day schedule — adjust times in one place */
export const SCHEDULE_DAY = {
  dateLabel: 'Saturday, April 18',
  summary:
    'Full day on campus — public window roughly 7:30 AM – 5:30 PM for the core program; cleanup follows.',
  items: [
    { time: '7:00–7:30', title: 'Setup', description: 'Venue prep and volunteer check-in.' },
    { time: '7:30–8:00', title: 'Check-in', description: 'Participants arrive, grab swag, find your table.' },
    { time: '8:00–8:30', title: 'Welcome', description: 'Kickoff, rules of the road, sustainability theme.' },
    { time: '8:30–9:15', title: 'Intro workshops', description: 'Track intros and tooling — get oriented before you build.' },
    { time: '9:15–5:00', title: 'Build session', description: 'Teams of up to three — mentors on deck; breaks encouraged.' },
    { time: '10:30–11:30', title: 'Optional workshop', description: 'Deep-dive or skill session — TBA in day-of packet.' },
    { time: '5:00–6:00', title: 'Judging', description: 'Presentations and demos for judges.' },
    { time: '6:00–6:30', title: 'Closing', description: 'Awards, thanks, and next steps.' },
    { time: '6:30–7:00', title: 'Cleanup', description: 'Pack up, reset the space, head home proud.' },
  ],
};
