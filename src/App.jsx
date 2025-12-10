import React, { useState, useEffect } from 'react';

const App = () => {
  const [currentWeek, setCurrentWeek] = useState(1);
  const [activeView, setActiveView] = useState('daily');
  const [lastSaved, setLastSaved] = useState(null);
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  
  const defaultWeekData = {
    1: {
      days: {
        Mon: { hours: '', task: '', completed: false },
        Tue: { hours: '', task: '', completed: false },
        Wed: { hours: '', task: '', completed: false },
        Thu: { hours: '', task: '', completed: false },
        Fri: { hours: '', task: '', completed: false },
        Sat: { hours: '', task: '', completed: false },
        Sun: { hours: '', task: '', completed: false }
      },
      goals: [
        { text: 'Set up development environment (Cursor, GitHub, Vercel)', done: false },
        { text: 'Complete first React tutorial (Scrimba Sections 1-3)', done: false },
        { text: 'Deploy something live to Vercel', done: false }
      ],
      blockers: { technical: '', time: '', energy: '' },
      metrics: { conceptsLearned: '', screenTime: '', energyLevel: 5 },
      wins: ['', '', ''],
      nextWeekFocus: ['', '', ''],
      reflection: '',
      startDate: ''
    },
    2: {
      days: {
        Mon: { hours: '', task: '', completed: false },
        Tue: { hours: '', task: '', completed: false },
        Wed: { hours: '', task: '', completed: false },
        Thu: { hours: '', task: '', completed: false },
        Fri: { hours: '', task: '', completed: false },
        Sat: { hours: '', task: '', completed: false },
        Sun: { hours: '', task: '', completed: false }
      },
      goals: [
        { text: 'Learn useState and useEffect hooks', done: false },
        { text: 'Build personal tool MVP (solves YOUR problem)', done: false },
        { text: 'Deploy personal tool to Vercel', done: false }
      ],
      blockers: { technical: '', time: '', energy: '' },
      metrics: { conceptsLearned: '', screenTime: '', energyLevel: 5 },
      wins: ['', '', ''],
      nextWeekFocus: ['', '', ''],
      reflection: '',
      startDate: ''
    },
    3: {
      days: {
        Mon: { hours: '', task: '', completed: false },
        Tue: { hours: '', task: '', completed: false },
        Wed: { hours: '', task: '', completed: false },
        Thu: { hours: '', task: '', completed: false },
        Fri: { hours: '', task: '', completed: false },
        Sat: { hours: '', task: '', completed: false },
        Sun: { hours: '', task: '', completed: false }
      },
      goals: [
        { text: 'Learn API basics (fetch, async/await)', done: false },
        { text: 'Build AI-integrated project', done: false },
        { text: 'First "build in public" post shared', done: false }
      ],
      blockers: { technical: '', time: '', energy: '' },
      metrics: { conceptsLearned: '', screenTime: '', energyLevel: 5 },
      wins: ['', '', ''],
      nextWeekFocus: ['', '', ''],
      reflection: '',
      startDate: ''
    },
    4: {
      days: {
        Mon: { hours: '', task: '', completed: false },
        Tue: { hours: '', task: '', completed: false },
        Wed: { hours: '', task: '', completed: false },
        Thu: { hours: '', task: '', completed: false },
        Fri: { hours: '', task: '', completed: false },
        Sat: { hours: '', task: '', completed: false },
        Sun: { hours: '', task: '', completed: false }
      },
      goals: [
        { text: 'Polish and style portfolio page', done: false },
        { text: 'Prepare validation questions + identify 10 users', done: false },
        { text: 'Complete 30-day retrospective', done: false }
      ],
      blockers: { technical: '', time: '', energy: '' },
      metrics: { conceptsLearned: '', screenTime: '', energyLevel: 5 },
      wins: ['', '', ''],
      nextWeekFocus: ['', '', ''],
      reflection: '',
      startDate: ''
    }
  };

  const [weekData, setWeekData] = useState(defaultWeekData);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('thirtyDayTracker');
      if (saved) {
        const parsed = JSON.parse(saved);
        setWeekData(parsed.weekData || defaultWeekData);
        setCurrentWeek(parsed.currentWeek || 1);
        setLastSaved(parsed.lastSaved || null);
      }
    } catch (e) {
      console.error('Error loading saved data:', e);
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      try {
        const saveData = {
          weekData,
          currentWeek,
          lastSaved: new Date().toISOString()
        };
        localStorage.setItem('thirtyDayTracker', JSON.stringify(saveData));
        setLastSaved(saveData.lastSaved);
      } catch (e) {
        console.error('Error saving data:', e);
      }
    }
  }, [weekData, currentWeek, isLoaded]);

  const weekThemes = {
    1: { title: 'Setup & First Steps', color: 'blue' },
    2: { title: 'Build Muscle Memory', color: 'amber' },
    3: { title: 'Add Intelligence', color: 'purple' },
    4: { title: 'Consolidate & Prepare', color: 'emerald' }
  };

  const updateDay = (day, field, value) => {
    setWeekData(prev => ({
      ...prev,
      [currentWeek]: {
        ...prev[currentWeek],
        days: {
          ...prev[currentWeek].days,
          [day]: { ...prev[currentWeek].days[day], [field]: value }
        }
      }
    }));
  };

  const updateGoal = (index, done) => {
    setWeekData(prev => {
      const newGoals = [...prev[currentWeek].goals];
      newGoals[index] = { ...newGoals[index], done };
      return {
        ...prev,
        [currentWeek]: { ...prev[currentWeek], goals: newGoals }
      };
    });
  };

  const updateGoalText = (index, text) => {
    setWeekData(prev => {
      const newGoals = [...prev[currentWeek].goals];
      newGoals[index] = { ...newGoals[index], text };
      return {
        ...prev,
        [currentWeek]: { ...prev[currentWeek], goals: newGoals }
      };
    });
  };

  const updateBlocker = (type, value) => {
    setWeekData(prev => ({
      ...prev,
      [currentWeek]: {
        ...prev[currentWeek],
        blockers: { ...prev[currentWeek].blockers, [type]: value }
      }
    }));
  };

  const updateMetric = (field, value) => {
    setWeekData(prev => ({
      ...prev,
      [currentWeek]: {
        ...prev[currentWeek],
        metrics: { ...prev[currentWeek].metrics, [field]: value }
      }
    }));
  };

  const updateWin = (index, value) => {
    setWeekData(prev => {
      const newWins = [...prev[currentWeek].wins];
      newWins[index] = value;
      return {
        ...prev,
        [currentWeek]: { ...prev[currentWeek], wins: newWins }
      };
    });
  };

  const updateNextFocus = (index, value) => {
    setWeekData(prev => {
      const newFocus = [...prev[currentWeek].nextWeekFocus];
      newFocus[index] = value;
      return {
        ...prev,
        [currentWeek]: { ...prev[currentWeek], nextWeekFocus: newFocus }
      };
    });
  };

  const updateReflection = (value) => {
    setWeekData(prev => ({
      ...prev,
      [currentWeek]: { ...prev[currentWeek], reflection: value }
    }));
  };

  const updateStartDate = (value) => {
    setWeekData(prev => ({
      ...prev,
      [currentWeek]: { ...prev[currentWeek], startDate: value }
    }));
  };

  const getTotalHours = () => {
    const days = weekData[currentWeek].days;
    return Object.values(days).reduce((sum, day) => {
      const hours = parseFloat(day.hours) || 0;
      return sum + hours;
    }, 0).toFixed(1);
  };

  const getAllTimeHours = () => {
    let total = 0;
    Object.values(weekData).forEach(week => {
      Object.values(week.days).forEach(day => {
        total += parseFloat(day.hours) || 0;
      });
    });
    return total.toFixed(1);
  };

  const getCompletedDays = () => {
    const days = weekData[currentWeek].days;
    return Object.values(days).filter(day => day.completed).length;
  };

  const getGoalsCompleted = () => {
    return weekData[currentWeek].goals.filter(g => g.done).length;
  };

  const getAllGoalsCompleted = () => {
    let total = 0;
    Object.values(weekData).forEach(week => {
      total += week.goals.filter(g => g.done).length;
    });
    return total;
  };

  const exportData = () => {
    const dataStr = JSON.stringify(weekData, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `30-day-tracker-backup-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
  };

  const importData = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const imported = JSON.parse(e.target.result);
          setWeekData(imported);
          alert('Data imported successfully!');
        } catch (err) {
          alert('Error importing file. Make sure it is a valid JSON backup.');
        }
      };
      reader.readAsText(file);
    }
  };

  const clearAllData = () => {
    localStorage.removeItem('thirtyDayTracker');
    setWeekData(defaultWeekData);
    setShowClearConfirm(false);
    setLastSaved(null);
  };

  const formatLastSaved = () => {
    if (!lastSaved) return 'Never';
    const date = new Date(lastSaved);
    return date.toLocaleString();
  };

  const currentData = weekData[currentWeek];

  if (!isLoaded) {
    return (
      <div style={{ minHeight: '100vh', backgroundColor: '#030712', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ color: '#9ca3af' }}>Loading your progress...</div>
      </div>
    );
  }

  const styles = {
    container: {
      minHeight: '100vh',
      backgroundColor: '#030712',
      color: '#f3f4f6',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    },
    header: {
      background: 'linear-gradient(to right, #111827, #1f2937)',
      borderBottom: '1px solid #374151',
      padding: '24px 16px'
    },
    headerContent: {
      maxWidth: '896px',
      margin: '0 auto'
    },
    headerTop: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      flexWrap: 'wrap',
      gap: '16px'
    },
    title: {
      fontSize: '24px',
      fontWeight: 'bold',
      color: 'white',
      margin: 0
    },
    subtitle: {
      color: '#9ca3af',
      fontSize: '14px',
      marginTop: '4px'
    },
    saveIndicator: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      marginTop: '8px'
    },
    saveDot: {
      width: '8px',
      height: '8px',
      backgroundColor: '#4ade80',
      borderRadius: '50%'
    },
    saveText: {
      fontSize: '12px',
      color: '#4ade80'
    },
    lastSaved: {
      fontSize: '12px',
      color: '#6b7280'
    },
    buttonGroup: {
      display: 'flex',
      gap: '8px',
      flexWrap: 'wrap'
    },
    button: {
      padding: '6px 12px',
      backgroundColor: '#374151',
      border: 'none',
      borderRadius: '4px',
      color: '#d1d5db',
      fontSize: '14px',
      cursor: 'pointer'
    },
    buttonDanger: {
      padding: '6px 12px',
      backgroundColor: 'rgba(127, 29, 29, 0.5)',
      border: 'none',
      borderRadius: '4px',
      color: '#fca5a5',
      fontSize: '14px',
      cursor: 'pointer'
    },
    weekSelector: {
      display: 'flex',
      gap: '8px',
      marginTop: '24px'
    },
    weekButton: {
      flex: 1,
      padding: '12px 16px',
      borderRadius: '8px',
      border: 'none',
      cursor: 'pointer',
      textAlign: 'left'
    },
    weekButtonActive: {
      color: 'white'
    },
    weekButtonInactive: {
      backgroundColor: '#1f2937',
      color: '#9ca3af'
    },
    weekLabel: {
      fontSize: '12px',
      opacity: 0.75
    },
    weekTitle: {
      fontSize: '14px'
    },
    weekStats: {
      fontSize: '12px',
      marginTop: '4px',
      opacity: 0.75
    },
    statsBar: {
      backgroundColor: '#111827',
      borderBottom: '1px solid #1f2937',
      padding: '16px'
    },
    statsGrid: {
      maxWidth: '896px',
      margin: '0 auto',
      display: 'grid',
      gridTemplateColumns: 'repeat(5, 1fr)',
      gap: '16px'
    },
    statItem: {
      textAlign: 'center'
    },
    statValue: {
      fontSize: '24px',
      fontWeight: 'bold',
      color: 'white'
    },
    statValueGreen: {
      fontSize: '24px',
      fontWeight: 'bold',
      color: '#34d399'
    },
    statLabel: {
      fontSize: '12px',
      color: '#6b7280'
    },
    content: {
      maxWidth: '896px',
      margin: '0 auto',
      padding: '24px 16px'
    },
    viewToggle: {
      display: 'inline-flex',
      gap: '8px',
      backgroundColor: '#111827',
      padding: '4px',
      borderRadius: '8px',
      marginBottom: '24px'
    },
    viewButton: {
      padding: '8px 16px',
      borderRadius: '6px',
      border: 'none',
      fontSize: '14px',
      fontWeight: '500',
      cursor: 'pointer'
    },
    viewButtonActive: {
      backgroundColor: '#374151',
      color: 'white'
    },
    viewButtonInactive: {
      backgroundColor: 'transparent',
      color: '#9ca3af'
    },
    dayCard: {
      backgroundColor: '#111827',
      borderRadius: '8px',
      marginBottom: '12px',
      overflow: 'hidden',
      display: 'flex',
      alignItems: 'center'
    },
    dayLabel: {
      width: '64px',
      padding: '16px 0',
      textAlign: 'center',
      fontWeight: 'bold'
    },
    dayLabelComplete: {
      backgroundColor: 'rgba(20, 83, 45, 0.5)',
      color: '#4ade80'
    },
    dayLabelIncomplete: {
      backgroundColor: '#1f2937',
      color: '#9ca3af'
    },
    dayContent: {
      flex: 1,
      display: 'flex',
      alignItems: 'center',
      gap: '16px',
      padding: '12px 16px'
    },
    hoursInput: {
      width: '80px',
      backgroundColor: '#1f2937',
      border: '1px solid #374151',
      borderRadius: '4px',
      padding: '8px 12px',
      textAlign: 'center',
      color: 'white',
      fontSize: '14px'
    },
    taskInput: {
      flex: 1,
      backgroundColor: '#1f2937',
      border: '1px solid #374151',
      borderRadius: '4px',
      padding: '8px 12px',
      color: 'white',
      fontSize: '14px'
    },
    checkButton: {
      width: '40px',
      height: '40px',
      borderRadius: '8px',
      border: '2px solid',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      fontSize: '16px'
    },
    checkButtonComplete: {
      backgroundColor: '#16a34a',
      borderColor: '#16a34a',
      color: 'white'
    },
    checkButtonIncomplete: {
      backgroundColor: 'transparent',
      borderColor: '#4b5563',
      color: '#4b5563'
    },
    card: {
      backgroundColor: '#111827',
      borderRadius: '8px',
      border: '1px solid #1f2937',
      padding: '24px',
      marginBottom: '24px'
    },
    cardTitle: {
      fontWeight: '600',
      color: 'white',
      marginBottom: '16px',
      fontSize: '16px'
    },
    goalItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      padding: '12px',
      borderRadius: '8px',
      marginBottom: '8px',
      cursor: 'pointer'
    },
    goalComplete: {
      backgroundColor: 'rgba(20, 83, 45, 0.3)',
      border: '1px solid #15803d'
    },
    goalIncomplete: {
      backgroundColor: '#1f2937',
      border: '1px solid #374151'
    },
    goalCheck: {
      width: '24px',
      height: '24px',
      borderRadius: '4px',
      border: '2px solid',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0
    },
    goalCheckComplete: {
      backgroundColor: '#16a34a',
      borderColor: '#16a34a',
      color: 'white'
    },
    goalCheckIncomplete: {
      borderColor: '#4b5563'
    },
    goalInput: {
      flex: 1,
      backgroundColor: 'transparent',
      border: 'none',
      color: 'inherit',
      fontSize: '14px',
      outline: 'none'
    },
    label: {
      fontSize: '14px',
      color: '#9ca3af',
      marginBottom: '4px',
      display: 'block'
    },
    input: {
      width: '100%',
      backgroundColor: '#1f2937',
      border: '1px solid #374151',
      borderRadius: '4px',
      padding: '8px 12px',
      color: 'white',
      fontSize: '14px',
      boxSizing: 'border-box'
    },
    textarea: {
      width: '100%',
      backgroundColor: '#1f2937',
      border: '1px solid #374151',
      borderRadius: '4px',
      padding: '12px',
      color: 'white',
      fontSize: '14px',
      resize: 'none',
      boxSizing: 'border-box'
    },
    slider: {
      width: '100%',
      height: '8px',
      borderRadius: '4px',
      cursor: 'pointer'
    },
    grid2: {
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: '16px'
    },
    modal: {
      position: 'fixed',
      inset: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 50,
      padding: '16px'
    },
    modalContent: {
      backgroundColor: '#111827',
      borderRadius: '12px',
      padding: '24px',
      maxWidth: '400px',
      width: '100%',
      border: '1px solid #374151'
    },
    modalTitle: {
      fontSize: '20px',
      fontWeight: 'bold',
      color: 'white',
      marginBottom: '12px'
    },
    modalText: {
      color: '#9ca3af',
      marginBottom: '24px'
    },
    modalButtons: {
      display: 'flex',
      gap: '12px',
      justifyContent: 'flex-end'
    },
    reviewSection: {
      padding: '12px',
      backgroundColor: '#111827',
      borderRadius: '8px',
      marginBottom: '8px'
    },
    reviewTitle: {
      fontWeight: '500',
      marginBottom: '8px'
    },
    reviewList: {
      color: '#9ca3af',
      fontSize: '14px'
    },
    footer: {
      maxWidth: '896px',
      margin: '0 auto',
      padding: '24px 16px',
      borderTop: '1px solid #1f2937',
      textAlign: 'center',
      fontSize: '14px',
      color: '#6b7280'
    }
  };

  const getWeekButtonStyle = (week) => {
    if (currentWeek === week) {
      const colors = {
        1: '#2563eb',
        2: '#d97706',
        3: '#9333ea',
        4: '#059669'
      };
      return { ...styles.weekButton, ...styles.weekButtonActive, backgroundColor: colors[week] };
    }
    return { ...styles.weekButton, ...styles.weekButtonInactive };
  };

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <div style={styles.headerContent}>
          <div style={styles.headerTop}>
            <div>
              <h1 style={styles.title}>30-Day Progress Tracker</h1>
              <p style={styles.subtitle}>Phase 1: Learn the Tools. Ship Something Small.</p>
              <div style={styles.saveIndicator}>
                <span style={styles.saveDot}></span>
                <span style={styles.saveText}>Auto-saving</span>
                <span style={styles.lastSaved}>Last saved: {formatLastSaved()}</span>
              </div>
            </div>
            <div style={styles.buttonGroup}>
              <button style={styles.button} onClick={exportData}>Export Backup</button>
              <label style={{ ...styles.button, cursor: 'pointer' }}>
                Import
                <input type="file" accept=".json" onChange={importData} style={{ display: 'none' }} />
              </label>
              <button style={styles.buttonDanger} onClick={() => setShowClearConfirm(true)}>Reset</button>
            </div>
          </div>
          
          {/* Week Selector */}
          <div style={styles.weekSelector}>
            {[1, 2, 3, 4].map(week => {
              const weekHours = Object.values(weekData[week].days).reduce((sum, day) => sum + (parseFloat(day.hours) || 0), 0);
              const weekGoals = weekData[week].goals.filter(g => g.done).length;
              return (
                <button
                  key={week}
                  onClick={() => setCurrentWeek(week)}
                  style={getWeekButtonStyle(week)}
                >
                  <div style={styles.weekLabel}>Week {week}</div>
                  <div style={styles.weekTitle}>{weekThemes[week].title}</div>
                  {weekHours > 0 && (
                    <div style={styles.weekStats}>{weekHours.toFixed(1)}h • {weekGoals}/3 goals</div>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Stats Bar */}
      <div style={styles.statsBar}>
        <div style={styles.statsGrid}>
          <div style={styles.statItem}>
            <div style={styles.statValue}>{getTotalHours()}</div>
            <div style={styles.statLabel}>Hours This Week</div>
          </div>
          <div style={styles.statItem}>
            <div style={styles.statValue}>{getCompletedDays()}/7</div>
            <div style={styles.statLabel}>Days Logged</div>
          </div>
          <div style={styles.statItem}>
            <div style={styles.statValue}>{getGoalsCompleted()}/3</div>
            <div style={styles.statLabel}>Week Goals</div>
          </div>
          <div style={styles.statItem}>
            <div style={styles.statValueGreen}>{getAllTimeHours()}</div>
            <div style={styles.statLabel}>Total Hours</div>
          </div>
          <div style={styles.statItem}>
            <div style={styles.statValueGreen}>{getAllGoalsCompleted()}/12</div>
            <div style={styles.statLabel}>All Goals Done</div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div style={styles.content}>
        {/* View Toggle */}
        <div style={styles.viewToggle}>
          {[
            { id: 'daily', label: '📅 Daily Log' },
            { id: 'goals', label: '🎯 Goals' },
            { id: 'review', label: '🔄 Review' }
          ].map(view => (
            <button
              key={view.id}
              onClick={() => setActiveView(view.id)}
              style={{
                ...styles.viewButton,
                ...(activeView === view.id ? styles.viewButtonActive : styles.viewButtonInactive)
              }}
            >
              {view.label}
            </button>
          ))}
        </div>

        {/* Daily Log View */}
        {activeView === 'daily' && (
          <div>
            {/* Week Start Date */}
            <div style={{ ...styles.card, marginBottom: '16px', padding: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <label style={{ fontSize: '14px', color: '#9ca3af' }}>Week {currentWeek} Start Date:</label>
                <input
                  type="date"
                  value={currentData.startDate}
                  onChange={(e) => updateStartDate(e.target.value)}
                  style={{ ...styles.input, width: 'auto' }}
                />
              </div>
            </div>

            {Object.entries(currentData.days).map(([day, data]) => (
              <div
                key={day}
                style={{
                  ...styles.dayCard,
                  border: data.completed ? '1px solid #16a34a' : '1px solid #1f2937'
                }}
              >
                <div style={{
                  ...styles.dayLabel,
                  ...(data.completed ? styles.dayLabelComplete : styles.dayLabelIncomplete)
                }}>
                  {day}
                </div>
                
                <div style={styles.dayContent}>
                  <div>
                    <input
                      type="number"
                      step="0.5"
                      min="0"
                      max="12"
                      placeholder="0"
                      value={data.hours}
                      onChange={(e) => updateDay(day, 'hours', e.target.value)}
                      style={styles.hoursInput}
                    />
                    <div style={{ fontSize: '12px', color: '#6b7280', textAlign: 'center', marginTop: '4px' }}>hours</div>
                  </div>
                  
                  <input
                    type="text"
                    placeholder="What did you work on?"
                    value={data.task}
                    onChange={(e) => updateDay(day, 'task', e.target.value)}
                    style={styles.taskInput}
                  />
                  
                  <button
                    onClick={() => updateDay(day, 'completed', !data.completed)}
                    style={{
                      ...styles.checkButton,
                      ...(data.completed ? styles.checkButtonComplete : styles.checkButtonIncomplete)
                    }}
                  >
                    {data.completed ? '✓' : ''}
                  </button>
                </div>
              </div>
            ))}

            <div style={{ ...styles.card, marginTop: '24px' }}>
              <h3 style={{ fontWeight: '600', color: '#d1d5db', marginBottom: '12px' }}>💡 Tips</h3>
              <ul style={{ fontSize: '14px', color: '#6b7280', lineHeight: 1.6 }}>
                <li>• Log hours at the end of each day—even "0" is valuable data</li>
                <li>• Click the checkmark when you have completed that day's entry</li>
                <li>• Your data saves automatically to this browser</li>
              </ul>
            </div>
          </div>
        )}

        {/* Goals View */}
        {activeView === 'goals' && (
          <div>
            {/* Weekly Goals */}
            <div style={styles.card}>
              <h3 style={styles.cardTitle}>Week {currentWeek} Goals</h3>
              <p style={{ fontSize: '12px', color: '#6b7280', marginBottom: '16px' }}>Click to mark complete. Edit text if needed.</p>
              {currentData.goals.map((goal, i) => (
                <div
                  key={i}
                  style={{
                    ...styles.goalItem,
                    ...(goal.done ? styles.goalComplete : styles.goalIncomplete)
                  }}
                >
                  <button
                    onClick={() => updateGoal(i, !goal.done)}
                    style={{
                      ...styles.goalCheck,
                      ...(goal.done ? styles.goalCheckComplete : styles.goalCheckIncomplete)
                    }}
                  >
                    {goal.done && '✓'}
                  </button>
                  <input
                    type="text"
                    value={goal.text}
                    onChange={(e) => updateGoalText(i, e.target.value)}
                    style={{
                      ...styles.goalInput,
                      color: goal.done ? '#4ade80' : '#e5e7eb',
                      textDecoration: goal.done ? 'line-through' : 'none'
                    }}
                  />
                </div>
              ))}
            </div>

            {/* Blockers */}
            <div style={styles.card}>
              <h3 style={styles.cardTitle}>🚫 Blockers This Week</h3>
              {[
                { key: 'technical', label: 'Technical', placeholder: 'Stuck on APIs, deployment issues, errors...' },
                { key: 'time', label: 'Time', placeholder: 'Work deadlines, social commitments, interruptions...' },
                { key: 'energy', label: 'Energy', placeholder: 'Tired after work, motivation dip, burnout signs...' }
              ].map(blocker => (
                <div key={blocker.key} style={{ marginBottom: '16px' }}>
                  <label style={styles.label}>{blocker.label}</label>
                  <input
                    type="text"
                    placeholder={blocker.placeholder}
                    value={currentData.blockers[blocker.key]}
                    onChange={(e) => updateBlocker(blocker.key, e.target.value)}
                    style={styles.input}
                  />
                </div>
              ))}
            </div>

            {/* Metrics */}
            <div style={styles.card}>
              <h3 style={styles.cardTitle}>📈 Weekly Metrics</h3>
              <div style={styles.grid2}>
                <div>
                  <label style={styles.label}>Concepts / Skills Learned</label>
                  <input
                    type="text"
                    placeholder="useState, useEffect, API calls..."
                    value={currentData.metrics.conceptsLearned}
                    onChange={(e) => updateMetric('conceptsLearned', e.target.value)}
                    style={styles.input}
                  />
                </div>
                <div>
                  <label style={styles.label}>Avg Daily Social Media Time</label>
                  <input
                    type="text"
                    placeholder="45 min, 1 hr, etc."
                    value={currentData.metrics.screenTime}
                    onChange={(e) => updateMetric('screenTime', e.target.value)}
                    style={styles.input}
                  />
                </div>
              </div>
              
              <div style={{ marginTop: '24px' }}>
                <label style={styles.label}>
                  Energy Level This Week: <span style={{ color: 'white', fontWeight: 'bold' }}>{currentData.metrics.energyLevel}/10</span>
                </label>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={currentData.metrics.energyLevel}
                  onChange={(e) => updateMetric('energyLevel', parseInt(e.target.value))}
                  style={styles.slider}
                />
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#6b7280', marginTop: '8px' }}>
                  <span>😫 Burned out</span>
                  <span>😐 Neutral</span>
                  <span>⚡ Energized</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Review View */}
        {activeView === 'review' && (
          <div>
            {/* Wins */}
            <div style={{ ...styles.card, borderColor: '#15803d' }}>
              <h3 style={{ ...styles.cardTitle, color: '#4ade80' }}>✓ Wins This Week</h3>
              <p style={{ fontSize: '12px', color: '#6b7280', marginBottom: '12px' }}>What went well? What are you proud of?</p>
              {currentData.wins.map((win, i) => (
                <input
                  key={i}
                  type="text"
                  placeholder={`Win ${i + 1}: Something you accomplished...`}
                  value={win}
                  onChange={(e) => updateWin(i, e.target.value)}
                  style={{ ...styles.input, marginBottom: '12px' }}
                />
              ))}
            </div>

            {/* Next Week Focus */}
            <div style={{ ...styles.card, borderColor: '#b45309' }}>
              <h3 style={{ ...styles.cardTitle, color: '#fbbf24' }}>→ Next Week Focus</h3>
              <p style={{ fontSize: '12px', color: '#6b7280', marginBottom: '12px' }}>What are your top 3 priorities?</p>
              {currentData.nextWeekFocus.map((focus, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                  <span style={{ color: '#fbbf24', fontWeight: 'bold' }}>{i + 1}.</span>
                  <input
                    type="text"
                    placeholder={`Priority ${i + 1}...`}
                    value={focus}
                    onChange={(e) => updateNextFocus(i, e.target.value)}
                    style={{ ...styles.input, flex: 1 }}
                  />
                </div>
              ))}
            </div>

            {/* Reflection */}
            <div style={styles.card}>
              <h3 style={styles.cardTitle}>💭 Weekly Reflection</h3>
              <p style={{ fontSize: '12px', color: '#6b7280', marginBottom: '12px' }}>
                What worked? What did not? What will you do differently next week?
              </p>
              <textarea
                placeholder="This week I learned that... I struggled with... Next week I will..."
                value={currentData.reflection}
                onChange={(e) => updateReflection(e.target.value)}
                rows={6}
                style={styles.textarea}
              />
            </div>

            {/* Review Questions Guide */}
            <div style={{ ...styles.card, backgroundColor: 'rgba(31, 41, 55, 0.5)' }}>
              <h3 style={{ ...styles.cardTitle, color: '#d1d5db' }}>🔄 Sunday Review Checklist</h3>
              <div style={styles.grid2}>
                <div style={styles.reviewSection}>
                  <div style={{ ...styles.reviewTitle, color: '#60a5fa' }}>Progress Check</div>
                  <ul style={styles.reviewList}>
                    <li>□ What did I ship this week?</li>
                    <li>□ What new thing did I learn?</li>
                    <li>□ Did I hit my deliverables?</li>
                  </ul>
                </div>
                <div style={styles.reviewSection}>
                  <div style={{ ...styles.reviewTitle, color: '#f87171' }}>Blockers</div>
                  <ul style={styles.reviewList}>
                    <li>□ What slowed me down?</li>
                    <li>□ Where did I waste time?</li>
                    <li>□ What do I need to clarify?</li>
                  </ul>
                </div>
                <div style={styles.reviewSection}>
                  <div style={{ ...styles.reviewTitle, color: '#fbbf24' }}>Energy</div>
                  <ul style={styles.reviewList}>
                    <li>□ Am I burning out?</li>
                    <li>□ What energized me?</li>
                    <li>□ Is my schedule realistic?</li>
                  </ul>
                </div>
                <div style={styles.reviewSection}>
                  <div style={{ ...styles.reviewTitle, color: '#4ade80' }}>The One Question</div>
                  <p style={{ color: '#d1d5db', fontStyle: 'italic', fontSize: '14px' }}>
                    "What ONE thing would make next week a win?"
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Clear Confirmation Modal */}
      {showClearConfirm && (
        <div style={styles.modal}>
          <div style={styles.modalContent}>
            <h3 style={styles.modalTitle}>Reset All Data?</h3>
            <p style={styles.modalText}>
              This will permanently delete all your tracked progress across all 4 weeks. This cannot be undone.
            </p>
            <div style={styles.modalButtons}>
              <button
                onClick={() => setShowClearConfirm(false)}
                style={styles.button}
              >
                Cancel
              </button>
              <button
                onClick={clearAllData}
                style={{ ...styles.button, backgroundColor: '#dc2626', color: 'white' }}
              >
                Yes, Reset Everything
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <div style={styles.footer}>
        <p>Data saves automatically to this browser's storage. Export a backup weekly to be safe.</p>
      </div>
    </div>
  );
};

export default App;