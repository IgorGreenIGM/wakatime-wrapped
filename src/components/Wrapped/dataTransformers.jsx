// dataTransformers.js

// Utility to format time string
const formatTime = (totalSeconds) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.round((totalSeconds % 3600) / 60);
    return `${hours}h ${minutes}min`;
  };

export const buildStatsData = (data) => {
  return [
    {
      label: 'Total Time Coded',
      value: data.total_time,
      subtext: `You coded for ${data.total_days_coded} days during 2024!`
    },
    {
      label: 'Most Active Day',
      value: new Date(data.best_day.date).toLocaleDateString('en-US', { 
        month: 'long', 
        day: 'numeric', 
        year: 'numeric' 
      }),
      subtext: data.best_day.text
    },
    {
      label: 'Longest Coding Streak',
      value: `${new Date(data.longest_streak.start_date).toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric' 
      })} - ${new Date(data.longest_streak.end_date).toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric' 
      })}`,
      subtext: `Peak activity: ${data.longest_streak.peak_time}`
    }
  ];
};

export const buildLanguagesData = (data, getIconComponent) => {
  return data.top_languages.map(lang => ({
    name: lang.name,
    hours: Math.round(lang.total_seconds / 3600),
    icon: getIconComponent(lang.name),
    color: lang.color || '#808080', // Default color if none provided
    isNew: data.new_languages_learned.some(newLang => newLang.name === lang.name)
  }));
};

export const buildNewLanguagesData = (data, getIconComponent) => {
  return data.new_languages_learned.map(lang => ({
    name: lang.name,
    hours: Math.round(lang.total_seconds / 3600),
    icon: getIconComponent(lang.name),
    color: lang.color || '#808080',
    isNew: true
  }));
};

const appealingColors = [
  "#FF5733", // Red
  "#8D33FF", // Green
  "#3357FF", // Blue
  "#FF33A1", // Pink
  "#FFC133", // Yellow
  "#33FFF5", // Cyan
  "#8D33FF", // Purple
  "#FF8C33", // Orange
];

export const buildProjectsData = (data, getIconComponent) => {
  return data.top_projects.map((project, index) => ({
    name: project.name,
    hours: Math.round(project.total_seconds / 3600),
    icon: getIconComponent('github'),
    color: appealingColors[index % appealingColors.length], // Cycle through colors
    isNew: data.new_projects_started.some(newProject => newProject.name === project.name)
  }));
};

export const buildNewProjectsData = (data, getIconComponent) => {
  return data.new_projects_started.map((project, index) => ({
    name: project.name,
    hours: Math.round(project.total_seconds / 3600),
    icon: getIconComponent('github'),
    color: appealingColors[index % appealingColors.length], // Cycle through colors
    isNew: true
  }));
};


export const buildDevelopmentToolsData = (data) => {
  let top_editors = data.top_editors.map(editor => ({
    name: editor.name,
    hours: Math.round(editor.total_seconds / 3600),
    color: editor.color || '#808080',
    category: 'Editor',
    percentage: editor.percent
  }));

  const totalPercent = top_editors.reduce((acc, editor) => acc + editor.percentage, 0);
  const totalHours = top_editors.reduce((acc, editor) => acc + editor.hours, 0);
  if (totalPercent < 100) {
    top_editors.push({
      name: 'Other',
      hours: Math.abs(Math.round(data.year_on_year_comp.current_year_total / 3600) - totalHours),
      color: '#808080',
      category: 'Editor',
      percentage: parseFloat(100 - totalPercent).toFixed(2)
    });
  }
  return top_editors;
};

export const buildEnvironmentsData = (data) => {
  let top_os = data.top_os.map(os => ({
    name: os.name,
    percentage: os.percent,
    color: os.name === 'Windows' ? '#00A4EF' : 
            os.name === 'Linux' ? '#E95420' : '#999999',
    category: 'OS'
  }));

  const totalPercent = top_os.reduce((acc, os) => acc + os.percentage, 0);
  if (totalPercent < 100) {
    top_os.push({
      name: 'Other',
      percentage: parseFloat(100 - totalPercent).toFixed(2),
      color: '#808080',
      category: 'OS'
    });
  }
  return top_os;
};

export const buildUserProfileData = (data) => {
  return {
    username: data.username,
    photoUrl: data.profile_picture_url
  };
};

export const buildTimelineData = (data) => {
  return {
    bestDay: {
      date: data.best_day.date,
      hours: data.best_day.text
    },
    bestWeek: {
      startDate: data.best_week.start,
      endDate: data.best_week.end,
      totalHours: data.best_week.time,
      averagePerDay: formatTime(data.best_week.total_seconds / 7)
    },
    bestMonth: {
      month: `${data.best_month.name} 2024`,
      totalHours: data.best_month.time,
      averagePerDay: formatTime(data.best_month.total_seconds / 30)
    },
    yearlyAverage: {
      hoursPerDay: data.daily_average,
      totalDaysCoded: data.total_days_coded,
      totalHours: data.total_time,
      consistency: `${((data.total_days_coded / 365) * 100).toFixed(0)}%`
    },
    milestones: data.milestone.map(m => ({
      milestone_date: m.milestone_date,
      milestone_hours: m.milestone_hours
    }))
  };
};