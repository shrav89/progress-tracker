import React, { useState, useEffect } from 'react';

const App = () => {
  const [currentWeek, setCurrentWeek] = useState(1);
  const [activeView, setActiveView] = useState('plan');
  const [globalView, setGlobalView] = useState('weeks'); // 'weeks', 'ideas', 'resources'
  const [lastSaved, setLastSaved] = useState(null);
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const [checkedPlanTasks, setCheckedPlanTasks] = useState({});
  
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
        setCheckedPlanTasks(parsed.checkedPlanTasks || {});
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
          checkedPlanTasks,
          lastSaved: new Date().toISOString()
        };
        localStorage.setItem('thirtyDayTracker', JSON.stringify(saveData));
        setLastSaved(saveData.lastSaved);
      } catch (e) {
        console.error('Error saving data:', e);
      }
    }
  }, [weekData, currentWeek, checkedPlanTasks, isLoaded]);

  const weekThemes = {
    1: { title: 'Setup & First Steps', color: 'blue' },
    2: { title: 'Build Muscle Memory', color: 'amber' },
    3: { title: 'Add Intelligence', color: 'purple' },
    4: { title: 'Consolidate & Prepare', color: 'emerald' }
  };

  const weeklyPlans = {
    1: {
      theme: "Setup & First Steps",
      goal: "Environment ready. First tutorial complete. Social media friction added.",
      hours: "10-12 hrs total",
      breakdown: [
        { day: "Mon-Tue", focus: "Environment Setup", tasks: [
          "Install VS Code + Cursor (free tier)",
          "Create GitHub account if needed",
          "Install Node.js (LTS version)",
          "Set up Vercel account (free)",
          "Bookmark key resources"
        ]},
        { day: "Wed-Thu", focus: "First Tutorial", tasks: [
          "Start Scrimba React course (free) OR Fireship videos",
          "Watch 'React in 100 Seconds' + '10 React Hooks'",
          "Build along with tutorial (don't just watch)",
          "Break things on purpose—learn by fixing"
        ]},
        { day: "Fri-Sun", focus: "First Mini Build", tasks: [
          "Use Claude Code to build a simple component",
          "Deploy ANYTHING to Vercel (even a single page)",
          "Share screenshot of deployed site (accountability!)",
          "Implement 3 social media friction tactics"
        ]}
      ],
      deliverables: [
        "Development environment fully configured",
        "First React tutorial completed",
        "Something deployed live (even if trivial)",
        "Social media apps deleted from phone"
      ],
      antiGoals: [
        "Don't research 10 different stacks—you chose Cursor + React",
        "Don't aim for pretty code—aim for working code",
        "Don't spend money on courses yet"
      ]
    },
    2: {
      theme: "Build Muscle Memory",
      goal: "Complete core React concepts. Build first real mini-tool for yourself.",
      hours: "10-12 hrs total",
      breakdown: [
        { day: "Mon-Tue", focus: "Core Concepts", tasks: [
          "Learn: Components, Props, State (useState)",
          "Learn: useEffect basics",
          "Practice: Build 2-3 tiny components from scratch",
          "Use Claude Code to explain what you don't understand"
        ]},
        { day: "Wed-Thu", focus: "Personal Tool Build", tasks: [
          "Pick ONE problem you have (see Idea Selection)",
          "Sketch the UI on paper (5 min max)",
          "Build the core feature only—nothing else",
          "Use Claude Code heavily—this is learning"
        ]},
        { day: "Fri-Sun", focus: "Polish & Deploy", tasks: [
          "Make it work on mobile (basic responsive)",
          "Deploy to Vercel",
          "Use it yourself for real",
          "Note: What broke? What confused you?"
        ]}
      ],
      deliverables: [
        "React fundamentals understood (not mastered)",
        "One personal tool built and deployed",
        "Tool actively used by you",
        "List of 'things I still don't understand'"
      ],
      antiGoals: [
        "Don't add features beyond the core",
        "Don't spend time on styling yet",
        "Don't compare to polished products"
      ]
    },
    3: {
      theme: "Add Intelligence",
      goal: "Integrate AI into a project. Understand APIs. Start brainstorming ideas to validate.",
      hours: "10-12 hrs total",
      breakdown: [
        { day: "Mon-Tue", focus: "API Fundamentals", tasks: [
          "Learn: What is an API? (watch one video)",
          "Learn: fetch() and async/await basics",
          "Practice: Call a free public API",
          "Build: Display API data in a component"
        ]},
        { day: "Wed-Thu", focus: "AI Integration", tasks: [
          "Get OpenAI API key (or use Claude API)",
          "Build: A simple chat interface",
          "OR: Add AI to your Week 2 tool",
          "Learn: How to handle API keys safely"
        ]},
        { day: "Fri-Sun", focus: "Idea Exploration", tasks: [
          "Brainstorm 5 problems you could solve",
          "Use Idea Selection Framework to score them",
          "Pick top 2 to research next week",
          "Deploy your AI-powered project"
        ]}
      ],
      deliverables: [
        "API concepts understood",
        "One AI-integrated project deployed",
        "Top 2 ideas selected for validation",
        "First 'build in public' post shared"
      ],
      antiGoals: [
        "Don't get lost in AI model options",
        "Don't build complex prompting systems yet",
        "Don't validate ideas yet—just select them"
      ]
    },
    4: {
      theme: "Consolidate & Prepare",
      goal: "Polish portfolio. Prepare user interview approach. Set up Phase 2.",
      hours: "10-12 hrs total",
      breakdown: [
        { day: "Mon-Tue", focus: "Portfolio Polish", tasks: [
          "Review both projects you've built",
          "Add basic styling (Tailwind recommended)",
          "Write 1-paragraph description for each",
          "Create simple portfolio page linking both"
        ]},
        { day: "Wed-Thu", focus: "Validation Prep", tasks: [
          "For top 2 ideas: Who has this problem?",
          "Write 5 questions to ask potential users",
          "Identify 10 people to reach out to",
          "Draft outreach message (casual, not salesy)"
        ]},
        { day: "Fri-Sun", focus: "Month 1 Review", tasks: [
          "Complete 30-day retrospective",
          "Update skill inventory: What can you build now?",
          "Plan Phase 2 weekly schedule",
          "Share second 'build in public' post"
        ]}
      ],
      deliverables: [
        "Portfolio page with 2+ projects",
        "Validation interview questions ready",
        "10 potential users identified",
        "30-day retrospective completed",
        "Phase 2 plan drafted"
      ],
      antiGoals: [
        "Don't over-polish—functional > beautiful",
        "Don't start user conversations yet (that's Phase 2)",
        "Don't add new projects—consolidate existing ones"
      ]
    }
  };

  const togglePlanTask = (id) => {
    setCheckedPlanTasks(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const ideaFramework = {
    criteria: [
      { name: "Problem Clarity", weight: "High", question: "Can you describe the problem in one sentence? Have you experienced it yourself?" },
      { name: "Personal Interest", weight: "High", question: "Would you use this even if no one else did? Does it excite you?" },
      { name: "Technical Feasibility", weight: "Medium", question: "Can you build an MVP with your current/near-future skills?" },
      { name: "Time to MVP", weight: "Medium", question: "Can you build a working version in 2-4 weeks?" },
      { name: "Learning Value", weight: "High", question: "Will building this teach you something valuable?" },
      { name: "Validation Potential", weight: "Low", question: "Could you find 5 people to test this? (Not critical in Phase 1)" }
    ],
    scoring: [
      { score: "3", meaning: "Strong yes—clear advantage" },
      { score: "2", meaning: "Moderate—acceptable" },
      { score: "1", meaning: "Weak—concerning" },
      { score: "0", meaning: "No—disqualifying" }
    ],
    starterIdeas: [
      { idea: "Personal expense tracker", difficulty: "Easy", time: "1 week", learning: "CRUD, local storage, forms" },
      { idea: "Daily journaling app", difficulty: "Easy", time: "1 week", learning: "Text input, dates, storage" },
      { idea: "Bookmark manager with tags", difficulty: "Easy", time: "1-2 weeks", learning: "Lists, filtering, forms" },
      { idea: "AI writing assistant", difficulty: "Medium", time: "2 weeks", learning: "API integration, prompts" },
      { idea: "Habit tracker with streaks", difficulty: "Medium", time: "2 weeks", learning: "State, dates, visualization" },
      { idea: "Recipe scaler/converter", difficulty: "Easy", time: "1 week", learning: "Math, forms, display" },
      { idea: "Meeting notes summarizer (AI)", difficulty: "Medium", time: "2-3 weeks", learning: "AI, file handling" },
      { idea: "Simple garden planner", difficulty: "Medium", time: "2-3 weeks", learning: "Data structures, visual layouts" }
    ]
  };

  const resources = {
    tools: [
      { name: "Cursor", type: "AI Code Editor", cost: "Free tier", why: "Your primary coding tool. AI-native editor that understands context.", link: "cursor.com" },
      { name: "Claude Code", type: "AI Assistant", cost: "You have it", why: "Explain concepts, debug code, generate snippets. Use conversationally.", link: "Built-in" },
      { name: "VS Code", type: "Code Editor", cost: "Free", why: "Backup editor. Cursor is built on this.", link: "code.visualstudio.com" },
      { name: "GitHub", type: "Version Control", cost: "Free", why: "Save your code. Required for deployment.", link: "github.com" },
      { name: "Vercel", type: "Deployment", cost: "Free tier", why: "One-click deployment. See your work live.", link: "vercel.com" },
      { name: "Tailwind CSS", type: "Styling", cost: "Free", why: "Fast styling without writing CSS. Learn in Week 4.", link: "tailwindcss.com" }
    ],
    learning: [
      { name: "Scrimba", type: "Interactive Courses", why: "Best free React course. Interactive coding in browser.", link: "scrimba.com/learn/learnreact", recommended: true },
      { name: "Fireship (YouTube)", type: "Video Tutorials", why: "Fast, practical explanations. '100 seconds' series is gold.", link: "youtube.com/@Fireship", recommended: true },
      { name: "React Docs", type: "Documentation", why: "Official tutorial is excellent. Use after initial videos.", link: "react.dev/learn", recommended: true },
      { name: "freeCodeCamp", type: "Full Curriculum", why: "Comprehensive. Good for fundamentals if you need them.", link: "freecodecamp.org", recommended: false },
      { name: "Web Dev Simplified", type: "YouTube", why: "Longer explanations. Good when you're stuck.", link: "youtube.com/@WebDevSimplified", recommended: false }
    ],
    tutorials: {
      1: [
        { title: "React in 100 Seconds", source: "Fireship", duration: "2 min", required: true },
        { title: "Scrimba Learn React (Sections 1-3)", source: "Scrimba", duration: "2-3 hrs", required: true },
        { title: "Deploy to Vercel", source: "Vercel Docs", duration: "15 min", required: true }
      ],
      2: [
        { title: "10 React Hooks Explained", source: "Fireship", duration: "12 min", required: true },
        { title: "useState & useEffect Deep Dive", source: "Web Dev Simplified", duration: "30 min", required: true },
        { title: "Scrimba Learn React (Sections 4-6)", source: "Scrimba", duration: "2-3 hrs", required: false }
      ],
      3: [
        { title: "Async JS in 100 Seconds", source: "Fireship", duration: "2 min", required: true },
        { title: "JavaScript Fetch API", source: "Web Dev Simplified", duration: "20 min", required: true },
        { title: "Build AI Chat App", source: "YouTube", duration: "1-2 hrs", required: true }
      ],
      4: [
        { title: "Tailwind in 100 Seconds", source: "Fireship", duration: "2 min", required: true },
        { title: "Tailwind CSS Crash Course", source: "Traversy Media", duration: "30 min", required: false },
        { title: "The Mom Test (Summary)", source: "YouTube", duration: "15 min", required: true }
      ]
    }
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

  const getPlanTasksCompleted = (weekNum) => {
    const plan = weeklyPlans[weekNum];
    let total = 0;
    let completed = 0;
    plan.breakdown.forEach((block, blockIndex) => {
      block.tasks.forEach((_, taskIndex) => {
        total++;
        const id = `w${weekNum}-b${blockIndex}-t${taskIndex}`;
        if (checkedPlanTasks[id]) completed++;
      });
    });
    return { completed, total };
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
    setCheckedPlanTasks({});
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

          {/* Global Navigation */}
          <div style={{
            display: 'flex',
            gap: '8px',
            marginTop: '20px',
            padding: '6px',
            backgroundColor: 'rgba(0,0,0,0.3)',
            borderRadius: '12px',
            width: 'fit-content'
          }}>
            <button
              onClick={() => setGlobalView('weeks')}
              style={{
                padding: '12px 24px',
                backgroundColor: globalView === 'weeks' ? '#3b82f6' : 'transparent',
                border: 'none',
                borderRadius: '8px',
                color: 'white',
                fontSize: '14px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              📅 Weeks
            </button>
            <button
              onClick={() => setGlobalView('ideas')}
              style={{
                padding: '12px 24px',
                backgroundColor: globalView === 'ideas' ? '#7c3aed' : 'transparent',
                border: 'none',
                borderRadius: '8px',
                color: 'white',
                fontSize: '14px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              💡 Ideas
            </button>
            <button
              onClick={() => setGlobalView('resources')}
              style={{
                padding: '12px 24px',
                backgroundColor: globalView === 'resources' ? '#059669' : 'transparent',
                border: 'none',
                borderRadius: '8px',
                color: 'white',
                fontSize: '14px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              🛠️ Resources
            </button>
          </div>

          {/* Week Selector - Only shown on Weeks view */}
          {globalView === 'weeks' && (
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
          )}
        </div>
      </div>

      {/* Stats Bar - Only shown on Weeks view */}
      {globalView === 'weeks' && (
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
      )}

      {/* Content */}
      <div style={styles.content}>
        {/* View Toggle - Only shown on Weeks view */}
        {globalView === 'weeks' && (
          <div style={styles.viewToggle}>
            {[
              { id: 'plan', label: '📋 Plan & Log' },
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
        )}

        {/* Plan View */}
        {globalView === 'weeks' && activeView === 'plan' && (
          <div>
            {/* Week Header */}
            <div style={{
              background: 'linear-gradient(to right, #4f46e5, #7c3aed)',
              borderRadius: '12px',
              padding: '24px',
              marginBottom: '24px',
              color: 'white'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <h2 style={{ fontSize: '24px', fontWeight: 'bold', margin: 0 }}>
                    Week {currentWeek}: {weeklyPlans[currentWeek].theme}
                  </h2>
                  <p style={{ color: 'rgba(255,255,255,0.8)', marginTop: '8px', fontSize: '14px' }}>
                    {weeklyPlans[currentWeek].goal}
                  </p>
                </div>
                <div style={{
                  backgroundColor: 'rgba(255,255,255,0.2)',
                  padding: '8px 16px',
                  borderRadius: '20px',
                  fontSize: '14px'
                }}>
                  {weeklyPlans[currentWeek].hours}
                </div>
              </div>
              <div style={{ marginTop: '16px', display: 'flex', gap: '16px' }}>
                <div style={{ fontSize: '14px' }}>
                  <span style={{ opacity: 0.7 }}>Tasks: </span>
                  <span style={{ fontWeight: 'bold' }}>
                    {getPlanTasksCompleted(currentWeek).completed}/{getPlanTasksCompleted(currentWeek).total}
                  </span>
                </div>
              </div>
            </div>

            {/* Day Breakdown */}
            {weeklyPlans[currentWeek].breakdown.map((block, blockIndex) => {
              // Map block index to actual days
              const dayMapping = {
                0: ['Mon', 'Tue'],
                1: ['Wed', 'Thu'],
                2: ['Fri', 'Sat', 'Sun']
              };
              const daysInBlock = dayMapping[blockIndex] || [];

              return (
                <div key={blockIndex} style={{
                  backgroundColor: '#111827',
                  borderRadius: '12px',
                  marginBottom: '16px',
                  overflow: 'hidden',
                  border: '1px solid #1f2937'
                }}>
                  <div style={{
                    backgroundColor: '#1f2937',
                    padding: '12px 16px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}>
                    <span style={{ fontWeight: '600', color: '#e5e7eb' }}>{block.day}</span>
                    <span style={{ fontSize: '14px', color: '#9ca3af' }}>{block.focus}</span>
                  </div>

                  {/* Planned Tasks */}
                  <div style={{ padding: '16px', borderBottom: '1px solid #1f2937' }}>
                    <div style={{ fontSize: '12px', color: '#6b7280', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                      Planned Tasks
                    </div>
                    {block.tasks.map((task, taskIndex) => {
                      const id = `w${currentWeek}-b${blockIndex}-t${taskIndex}`;
                      const isChecked = checkedPlanTasks[id] || false;
                      return (
                        <div
                          key={taskIndex}
                          onClick={() => togglePlanTask(id)}
                          style={{
                            display: 'flex',
                            alignItems: 'flex-start',
                            gap: '12px',
                            padding: '10px 12px',
                            marginBottom: '8px',
                            backgroundColor: isChecked ? 'rgba(16, 185, 129, 0.1)' : 'rgba(31, 41, 55, 0.5)',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            border: isChecked ? '1px solid #10b981' : '1px solid #374151',
                            transition: 'all 0.2s'
                          }}
                        >
                          <div style={{
                            width: '20px',
                            height: '20px',
                            borderRadius: '4px',
                            border: isChecked ? 'none' : '2px solid #4b5563',
                            backgroundColor: isChecked ? '#10b981' : 'transparent',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0,
                            marginTop: '2px'
                          }}>
                            {isChecked && <span style={{ color: 'white', fontSize: '12px' }}>✓</span>}
                          </div>
                          <span style={{
                            fontSize: '14px',
                            color: isChecked ? '#6b7280' : '#d1d5db',
                            textDecoration: isChecked ? 'line-through' : 'none',
                            lineHeight: '1.5'
                          }}>
                            {task}
                          </span>
                        </div>
                      );
                    })}
                  </div>

                  {/* Daily Log for this block */}
                  <div style={{ padding: '16px', backgroundColor: 'rgba(17, 24, 39, 0.5)' }}>
                    <div style={{ fontSize: '12px', color: '#6b7280', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                      Daily Log
                    </div>
                    {daysInBlock.map((day) => {
                      const dayData = currentData.days[day];
                      return (
                        <div
                          key={day}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                            padding: '8px 0',
                            borderBottom: day !== daysInBlock[daysInBlock.length - 1] ? '1px solid #1f2937' : 'none'
                          }}
                        >
                          {/* Day Label */}
                          <div style={{
                            width: '40px',
                            fontWeight: '600',
                            fontSize: '14px',
                            color: dayData.completed ? '#4ade80' : '#9ca3af'
                          }}>
                            {day}
                          </div>

                          {/* Completion Checkbox */}
                          <button
                            onClick={() => updateDay(day, 'completed', !dayData.completed)}
                            style={{
                              width: '28px',
                              height: '28px',
                              borderRadius: '6px',
                              border: dayData.completed ? 'none' : '2px solid #4b5563',
                              backgroundColor: dayData.completed ? '#16a34a' : 'transparent',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              cursor: 'pointer',
                              flexShrink: 0
                            }}
                          >
                            {dayData.completed && <span style={{ color: 'white', fontSize: '14px' }}>✓</span>}
                          </button>

                          {/* Hours Input */}
                          <input
                            type="number"
                            step="0.5"
                            min="0"
                            max="12"
                            placeholder="0"
                            value={dayData.hours}
                            onChange={(e) => updateDay(day, 'hours', e.target.value)}
                            style={{
                              width: '60px',
                              backgroundColor: '#1f2937',
                              border: '1px solid #374151',
                              borderRadius: '6px',
                              padding: '8px',
                              textAlign: 'center',
                              color: 'white',
                              fontSize: '14px'
                            }}
                          />
                          <span style={{ fontSize: '12px', color: '#6b7280' }}>hrs</span>

                          {/* Task Input */}
                          <input
                            type="text"
                            placeholder="What did you work on?"
                            value={dayData.task}
                            onChange={(e) => updateDay(day, 'task', e.target.value)}
                            style={{
                              flex: 1,
                              backgroundColor: '#1f2937',
                              border: '1px solid #374151',
                              borderRadius: '6px',
                              padding: '8px 12px',
                              color: 'white',
                              fontSize: '14px'
                            }}
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}

            {/* Deliverables & Anti-Goals */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginTop: '24px' }}>
              {/* Deliverables */}
              <div style={{
                backgroundColor: 'rgba(16, 185, 129, 0.1)',
                border: '1px solid #10b981',
                borderRadius: '12px',
                padding: '20px'
              }}>
                <h3 style={{ color: '#34d399', fontWeight: '600', marginBottom: '16px', fontSize: '16px' }}>
                  ✓ Deliverables
                </h3>
                <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
                  {weeklyPlans[currentWeek].deliverables.map((item, i) => (
                    <li key={i} style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '8px',
                      marginBottom: '10px',
                      fontSize: '14px',
                      color: '#a7f3d0'
                    }}>
                      <span style={{ color: '#34d399' }}>•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Anti-Goals */}
              <div style={{
                backgroundColor: 'rgba(239, 68, 68, 0.1)',
                border: '1px solid #ef4444',
                borderRadius: '12px',
                padding: '20px'
              }}>
                <h3 style={{ color: '#f87171', fontWeight: '600', marginBottom: '16px', fontSize: '16px' }}>
                  ✗ Anti-Goals
                </h3>
                <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
                  {weeklyPlans[currentWeek].antiGoals.map((item, i) => (
                    <li key={i} style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '8px',
                      marginBottom: '10px',
                      fontSize: '14px',
                      color: '#fca5a5'
                    }}>
                      <span style={{ color: '#f87171' }}>•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Tips */}
            <div style={{ ...styles.card, marginTop: '24px', backgroundColor: 'rgba(31, 41, 55, 0.5)' }}>
              <h3 style={{ fontWeight: '600', color: '#fbbf24', marginBottom: '12px' }}>⚡ Pro Tips</h3>
              <ul style={{ fontSize: '14px', color: '#9ca3af', lineHeight: 1.8, margin: 0, paddingLeft: '20px' }}>
                <li>Click planned tasks to mark them complete as you work through the week</li>
                <li>Log your hours and what you worked on in the Daily Log section</li>
                <li>Focus on deliverables, not perfection—ship something!</li>
                <li>If stuck for 15 min, ask Claude Code. Don't suffer in silence.</li>
              </ul>
            </div>
          </div>
        )}

        {/* Goals View */}
        {globalView === 'weeks' && activeView === 'goals' && (
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
        {globalView === 'weeks' && activeView === 'review' && (
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

        {/* Ideas View */}
        {globalView === 'ideas' && (
          <div>
            {/* Header */}
            <div style={{
              background: 'linear-gradient(to right, #7c3aed, #ec4899)',
              borderRadius: '12px',
              padding: '24px',
              marginBottom: '24px',
              color: 'white'
            }}>
              <h2 style={{ fontSize: '24px', fontWeight: 'bold', margin: 0 }}>Idea Selection Framework</h2>
              <p style={{ color: 'rgba(255,255,255,0.8)', marginTop: '8px', fontSize: '14px' }}>
                Use this to decide what to build. In Phase 1, optimize for learning, not market potential.
              </p>
            </div>

            {/* Evaluation Criteria */}
            <div style={styles.card}>
              <h3 style={styles.cardTitle}>Evaluation Criteria</h3>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
                  <thead>
                    <tr style={{ backgroundColor: '#1f2937' }}>
                      <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #374151', color: '#e5e7eb' }}>Criteria</th>
                      <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #374151', color: '#e5e7eb' }}>Weight</th>
                      <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #374151', color: '#e5e7eb' }}>Question to Ask</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ideaFramework.criteria.map((c, i) => (
                      <tr key={i} style={{ backgroundColor: i % 2 === 0 ? 'transparent' : 'rgba(31, 41, 55, 0.3)' }}>
                        <td style={{ padding: '12px', borderBottom: '1px solid #1f2937', color: '#d1d5db', fontWeight: '500' }}>{c.name}</td>
                        <td style={{ padding: '12px', borderBottom: '1px solid #1f2937' }}>
                          <span style={{
                            padding: '4px 8px',
                            borderRadius: '4px',
                            fontSize: '12px',
                            fontWeight: '500',
                            backgroundColor: c.weight === 'High' ? 'rgba(239, 68, 68, 0.2)' : c.weight === 'Medium' ? 'rgba(251, 191, 36, 0.2)' : 'rgba(107, 114, 128, 0.2)',
                            color: c.weight === 'High' ? '#fca5a5' : c.weight === 'Medium' ? '#fcd34d' : '#9ca3af'
                          }}>{c.weight}</span>
                        </td>
                        <td style={{ padding: '12px', borderBottom: '1px solid #1f2937', color: '#9ca3af' }}>{c.question}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Scoring Guide */}
            <div style={styles.card}>
              <h3 style={styles.cardTitle}>Scoring Guide</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px' }}>
                {ideaFramework.scoring.map((s, i) => (
                  <div key={i} style={{
                    textAlign: 'center',
                    padding: '16px',
                    backgroundColor: '#1f2937',
                    borderRadius: '8px'
                  }}>
                    <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#e5e7eb' }}>{s.score}</div>
                    <div style={{ fontSize: '12px', color: '#9ca3af', marginTop: '4px' }}>{s.meaning}</div>
                  </div>
                ))}
              </div>
              <p style={{ fontSize: '13px', color: '#6b7280', marginTop: '16px' }}>
                Score each idea on all criteria. Total = 18 max. Prioritize anything above 12.
              </p>
            </div>

            {/* Starter Ideas */}
            <div style={{ ...styles.card, border: '1px solid #7c3aed' }}>
              <h3 style={{ ...styles.cardTitle, color: '#a78bfa' }}>🚀 Starter Ideas (If You're Stuck)</h3>
              <p style={{ fontSize: '13px', color: '#9ca3af', marginBottom: '16px' }}>
                Proven learning projects. Pick one if you can't think of your own problem to solve.
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
                {ideaFramework.starterIdeas.map((item, i) => (
                  <div key={i} style={{
                    backgroundColor: '#1f2937',
                    padding: '16px',
                    borderRadius: '8px',
                    border: '1px solid #374151'
                  }}>
                    <div style={{ fontWeight: '600', color: '#e5e7eb', marginBottom: '8px' }}>{item.idea}</div>
                    <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                      <span style={{
                        fontSize: '11px',
                        padding: '2px 8px',
                        borderRadius: '4px',
                        backgroundColor: item.difficulty === 'Easy' ? 'rgba(16, 185, 129, 0.2)' : 'rgba(251, 191, 36, 0.2)',
                        color: item.difficulty === 'Easy' ? '#6ee7b7' : '#fcd34d'
                      }}>{item.difficulty}</span>
                      <span style={{
                        fontSize: '11px',
                        padding: '2px 8px',
                        borderRadius: '4px',
                        backgroundColor: 'rgba(107, 114, 128, 0.2)',
                        color: '#9ca3af'
                      }}>{item.time}</span>
                    </div>
                    <div style={{ fontSize: '12px', color: '#6b7280' }}>Learn: {item.learning}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Evaluation Template */}
            <div style={{ ...styles.card, backgroundColor: '#0f172a' }}>
              <h3 style={styles.cardTitle}>Evaluation Template</h3>
              <div style={{
                fontFamily: 'monospace',
                fontSize: '13px',
                color: '#94a3b8',
                backgroundColor: '#020617',
                padding: '16px',
                borderRadius: '8px',
                lineHeight: '1.8'
              }}>
                <div>IDEA: _________________________________</div>
                <div style={{ marginTop: '12px' }}>Problem Clarity:     [0] [1] [2] [3]</div>
                <div>Personal Interest:   [0] [1] [2] [3]</div>
                <div>Tech Feasibility:    [0] [1] [2] [3]</div>
                <div>Time to MVP:         [0] [1] [2] [3]</div>
                <div>Learning Value:      [0] [1] [2] [3]</div>
                <div>Validation Potential: [0] [1] [2] [3]</div>
                <div style={{ marginTop: '12px', paddingTop: '12px', borderTop: '1px solid #1e293b' }}>TOTAL: ___/18</div>
              </div>
            </div>
          </div>
        )}

        {/* Resources View */}
        {globalView === 'resources' && (
          <div>
            {/* Header */}
            <div style={{
              background: 'linear-gradient(to right, #059669, #0891b2)',
              borderRadius: '12px',
              padding: '24px',
              marginBottom: '24px',
              color: 'white'
            }}>
              <h2 style={{ fontSize: '24px', fontWeight: 'bold', margin: 0 }}>Tools & Resources</h2>
              <p style={{ color: 'rgba(255,255,255,0.8)', marginTop: '8px', fontSize: '14px' }}>
                Everything you need for the first 30 days. No paid subscriptions required.
              </p>
            </div>

            {/* Essential Tools */}
            <div style={styles.card}>
              <h3 style={styles.cardTitle}>Essential Tools</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {resources.tools.map((tool, i) => (
                  <div key={i} style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '16px',
                    padding: '16px',
                    backgroundColor: '#1f2937',
                    borderRadius: '8px',
                    border: '1px solid #374151'
                  }}>
                    <div style={{
                      width: '48px',
                      height: '48px',
                      background: 'linear-gradient(135deg, #4f46e5, #7c3aed)',
                      borderRadius: '10px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      fontWeight: 'bold',
                      fontSize: '18px',
                      flexShrink: 0
                    }}>
                      {tool.name.charAt(0)}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                        <span style={{ fontWeight: '600', color: '#e5e7eb' }}>{tool.name}</span>
                        <span style={{ fontSize: '11px', padding: '2px 8px', backgroundColor: 'rgba(107, 114, 128, 0.3)', borderRadius: '4px', color: '#9ca3af' }}>{tool.type}</span>
                        <span style={{ fontSize: '11px', padding: '2px 8px', backgroundColor: 'rgba(16, 185, 129, 0.2)', borderRadius: '4px', color: '#6ee7b7' }}>{tool.cost}</span>
                      </div>
                      <p style={{ fontSize: '13px', color: '#9ca3af', marginTop: '4px', marginBottom: '4px' }}>{tool.why}</p>
                      <span style={{ fontSize: '12px', color: '#60a5fa' }}>{tool.link}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Learning Resources */}
            <div style={styles.card}>
              <h3 style={styles.cardTitle}>Learning Resources</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {resources.learning.map((item, i) => (
                  <div key={i} style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '16px',
                    padding: '16px',
                    backgroundColor: item.recommended ? 'rgba(16, 185, 129, 0.1)' : '#1f2937',
                    borderRadius: '8px',
                    border: item.recommended ? '1px solid #10b981' : '1px solid #374151'
                  }}>
                    <div style={{
                      width: '48px',
                      height: '48px',
                      backgroundColor: item.recommended ? '#10b981' : '#374151',
                      borderRadius: '10px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      fontWeight: 'bold',
                      fontSize: '18px',
                      flexShrink: 0
                    }}>
                      {item.name.charAt(0)}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                        <span style={{ fontWeight: '600', color: '#e5e7eb' }}>{item.name}</span>
                        {item.recommended && (
                          <span style={{ fontSize: '11px', padding: '2px 8px', backgroundColor: '#10b981', borderRadius: '4px', color: 'white' }}>Recommended</span>
                        )}
                        <span style={{ fontSize: '11px', padding: '2px 8px', backgroundColor: 'rgba(107, 114, 128, 0.3)', borderRadius: '4px', color: '#9ca3af' }}>{item.type}</span>
                      </div>
                      <p style={{ fontSize: '13px', color: '#9ca3af', marginTop: '4px', marginBottom: '4px' }}>{item.why}</p>
                      <span style={{ fontSize: '12px', color: '#60a5fa' }}>{item.link}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Weekly Tutorial Path */}
            <div style={styles.card}>
              <h3 style={styles.cardTitle}>📚 Weekly Tutorial Path</h3>
              <p style={{ fontSize: '13px', color: '#6b7280', marginBottom: '16px' }}>
                Complete each week's tutorials before moving to the next. Red dot = required.
              </p>
              {[1, 2, 3, 4].map(week => (
                <div key={week} style={{ marginBottom: '20px' }}>
                  <div style={{
                    fontSize: '14px',
                    fontWeight: '600',
                    color: '#9ca3af',
                    marginBottom: '12px',
                    paddingBottom: '8px',
                    borderBottom: '1px solid #1f2937'
                  }}>
                    Week {week}: {weekThemes[week].title}
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {resources.tutorials[week].map((tutorial, i) => (
                      <div key={i} style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '12px 16px',
                        backgroundColor: tutorial.required ? '#1f2937' : 'rgba(31, 41, 55, 0.3)',
                        borderRadius: '8px',
                        border: '1px solid #374151'
                      }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <div style={{
                            width: '8px',
                            height: '8px',
                            borderRadius: '50%',
                            backgroundColor: tutorial.required ? '#ef4444' : '#4b5563'
                          }}></div>
                          <div>
                            <div style={{ fontWeight: '500', color: '#e5e7eb', fontSize: '14px' }}>{tutorial.title}</div>
                            <div style={{ fontSize: '12px', color: '#6b7280' }}>{tutorial.source}</div>
                          </div>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <span style={{ fontSize: '13px', color: '#9ca3af' }}>{tutorial.duration}</span>
                          {tutorial.required && (
                            <span style={{ fontSize: '10px', padding: '2px 6px', backgroundColor: 'rgba(239, 68, 68, 0.2)', borderRadius: '4px', color: '#fca5a5' }}>Required</span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Learning Tips */}
            <div style={{ ...styles.card, backgroundColor: 'rgba(251, 191, 36, 0.1)', border: '1px solid #fbbf24' }}>
              <h3 style={{ fontWeight: '600', color: '#fbbf24', marginBottom: '12px' }}>⚡ Learning Strategy</h3>
              <ul style={{ fontSize: '14px', color: '#fcd34d', lineHeight: 2, margin: 0, paddingLeft: '20px' }}>
                <li><strong>Rule 1:</strong> Don't just watch—build along. Pause videos constantly.</li>
                <li><strong>Rule 2:</strong> When stuck for 15 min, ask Claude Code. Don't suffer.</li>
                <li><strong>Rule 3:</strong> Complete required tutorials before optional ones.</li>
                <li><strong>Rule 4:</strong> One tutorial fully finished {'>'} three half-watched.</li>
                <li><strong>Rule 5:</strong> After each tutorial, build something without following along.</li>
              </ul>
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