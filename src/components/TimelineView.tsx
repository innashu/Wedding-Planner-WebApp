"use client";

import { useMemo, useState, useEffect, useRef } from "react";
import { id } from "@instantdb/react";
import { db } from "@/lib/db";
import {
  timelineSeedData,
  CATEGORY_INFO,
  getCurrentPSTDate,
  getMonthName,
  getCountdownLabel,
} from "@/lib/timelineData";

// Wedding date: November 8, 2026
const WEDDING_MONTH = 11;
const WEDDING_YEAR = 2026;
// Include December for post-wedding tasks (name change, etc.)
const END_MONTH = 12;
const END_YEAR = 2026;

interface TimelineTask {
  id: string;
  text: string;
  month: number;
  year: number;
  category: string;
  completed: boolean;
  order: number;
  createdAt: number;
}

export function TimelineView() {
  const currentDate = useMemo(() => getCurrentPSTDate(), []);
  const [expandedMonths, setExpandedMonths] = useState<Set<string>>(() => {
    // Auto-expand current month
    return new Set([`${currentDate.year}-${currentDate.month}`]);
  });
  const [hasSeeded, setHasSeeded] = useState(false);

  // Query all timeline tasks
  const { isLoading, error, data } = db.useQuery({
    timelineTasks: {
      $: {
        order: { order: "asc" },
      },
    },
  });

  // Seed database on first load if empty, or sync new tasks
  useEffect(() => {
    if (!isLoading && data && !hasSeeded) {
      const tasks = data.timelineTasks || [];
      if (tasks.length === 0) {
        seedDatabase();
      } else {
        // Check for and add missing courthouse/name change tasks
        syncNewTasks(tasks as TimelineTask[]);
      }
      setHasSeeded(true);
    }
  }, [isLoading, data, hasSeeded]);

  const seedDatabase = async () => {
    const transactions: ReturnType<typeof db.tx.timelineTasks[string]["update"]>[] = [];
    let order = 0;

    for (const monthData of timelineSeedData) {
      for (const task of monthData.tasks) {
        transactions.push(
          db.tx.timelineTasks[id()].update({
            text: task.text,
            month: monthData.month,
            year: monthData.year,
            category: task.category,
            completed: false,
            order: order++,
            createdAt: Date.now(),
          })
        );
      }
    }

    await db.transact(transactions);
  };

  // Sync new tasks that were added to seed data (courthouse, name change)
  const syncNewTasks = async (existingTasks: TimelineTask[]) => {
    // Delete ALL December 2026 todo tasks and re-add them in correct order
    const decemberTodoTasks = existingTasks.filter(
      t => t.month === 12 && t.year === 2026 && t.category === "todo"
    );

    // Delete all December todo tasks
    if (decemberTodoTasks.length > 0) {
      const deleteTransactions = decemberTodoTasks.map(task =>
        db.tx.timelineTasks[task.id].delete()
      );
      await db.transact(deleteTransactions);
    }

    // December name change tasks in correct order (order 1000+ to appear after other tasks)
    const decemberTasks = [
      { text: "Social Security Administration: Update card (do FIRST)", month: 12, year: 2026, category: "todo", order: 1000 },
      { text: "Social Security: Bring marriage cert + photo ID + Form SS-5", month: 12, year: 2026, category: "todo", order: 1001 },
      { text: "Wait 48 hours after Social Security before going to DMV", month: 12, year: 2026, category: "todo", order: 1002 },
      { text: "DMV: Update driver's license (bring Social Security card, marriage cert, proof of address)", month: 12, year: 2026, category: "todo", order: 1003 },
      { text: "DMV: Update voter registration while there", month: 12, year: 2026, category: "todo", order: 1004 },
      { text: "DMV: Update vehicle title if applicable", month: 12, year: 2026, category: "todo", order: 1005 },
      { text: "Update passport (Form DS-82 or DS-11)", month: 12, year: 2026, category: "todo", order: 1006 },
      { text: "Update bank accounts and credit cards", month: 12, year: 2026, category: "todo", order: 1007 },
      { text: "Update employer/HR and payroll", month: 12, year: 2026, category: "todo", order: 1008 },
      { text: "Update health, car, and home insurance", month: 12, year: 2026, category: "todo", order: 1009 },
      { text: "Update utilities and subscriptions", month: 12, year: 2026, category: "todo", order: 1010 },
    ];

    // Add December tasks
    const decemberTransactions = decemberTasks.map((task) =>
      db.tx.timelineTasks[id()].update({
        text: task.text,
        month: task.month,
        year: task.year,
        category: task.category,
        completed: false,
        order: task.order,
        createdAt: Date.now(),
      })
    );
    await db.transact(decemberTransactions);

    // Other new tasks (August, October, November City Hall tasks)
    const otherNewTasks = [
      { text: "Book SF City Hall appointments for Nov 9 (license + ceremony)", month: 8, year: 2026, category: "todo", order: 100 },
      { text: "Confirm SF City Hall appointments for Nov 9", month: 10, year: 2026, category: "todo", order: 100 },
      { text: "Gather documents for City Hall (photo IDs, payment)", month: 10, year: 2026, category: "todo", order: 101 },
      { text: "Decide on witness for civil ceremony", month: 10, year: 2026, category: "todo", order: 102 },
      { text: "SF City Hall: Marriage license appointment (Room 160)", month: 11, year: 2026, category: "todo", order: 100 },
      { text: "SF City Hall: Civil ceremony", month: 11, year: 2026, category: "todo", order: 101 },
      { text: "Request certified marriage certificate copies (5-10)", month: 11, year: 2026, category: "todo", order: 102 },
    ];

    // Check which other tasks don't exist
    const nonDecemberTasks = existingTasks.filter(t => !(t.month === 12 && t.year === 2026 && t.category === "todo"));
    const existingTexts = new Set(nonDecemberTasks.map(t => t.text.toLowerCase()));
    const otherTasksToCreate = otherNewTasks.filter(t => !existingTexts.has(t.text.toLowerCase()));

    if (otherTasksToCreate.length > 0) {
      const otherTransactions = otherTasksToCreate.map((task) =>
        db.tx.timelineTasks[id()].update({
          text: task.text,
          month: task.month,
          year: task.year,
          category: task.category,
          completed: false,
          order: task.order,
          createdAt: Date.now(),
        })
      );
      await db.transact(otherTransactions);
    }
  };

  // Generate months from February 2026 to December 2026 (includes post-wedding name change tasks)
  const months = useMemo(() => {
    const result: Array<{ month: number; year: number }> = [];
    let m = 2; // February
    let y = 2026;

    while (y < END_YEAR || (y === END_YEAR && m <= END_MONTH)) {
      result.push({ month: m, year: y });
      m++;
      if (m > 12) {
        m = 1;
        y++;
      }
    }

    return result;
  }, []);

  // Group tasks by month
  const tasksByMonth = useMemo(() => {
    const grouped = new Map<string, TimelineTask[]>();
    const tasks = (data?.timelineTasks || []) as TimelineTask[];

    for (const task of tasks) {
      const key = `${task.year}-${task.month}`;
      const existing = grouped.get(key) || [];
      existing.push(task);
      grouped.set(key, existing);
    }

    return grouped;
  }, [data?.timelineTasks]);

  const toggleMonth = (monthKey: string) => {
    setExpandedMonths((prev) => {
      const next = new Set(prev);
      if (next.has(monthKey)) {
        next.delete(monthKey);
      } else {
        next.add(monthKey);
      }
      return next;
    });
  };

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto px-3 sm:px-4 py-6 sm:py-8">
        <div className="text-center text-gray-500">Loading timeline...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto px-3 sm:px-4 py-6 sm:py-8">
        <div className="text-center text-red-500">Error loading timeline</div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-3 sm:px-4 py-6 sm:py-8">
      <div className="mb-6">
        <h1 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-2">
          Wedding Timeline
        </h1>
        <p className="text-sm text-gray-500">
          Month-by-month wedding planning tasks. Add, edit, or complete tasks as you go.
        </p>
      </div>

      <div className="space-y-4">
        {months.map(({ month, year }) => {
          const monthKey = `${year}-${month}`;
          const isCurrentMonth =
            month === currentDate.month && year === currentDate.year;
          const isWeddingMonth = month === WEDDING_MONTH && year === WEDDING_YEAR;
          const isExpanded = expandedMonths.has(monthKey);
          const tasks = tasksByMonth.get(monthKey) || [];

          return (
            <MonthCard
              key={monthKey}
              month={month}
              year={year}
              isCurrentMonth={isCurrentMonth}
              isWeddingMonth={isWeddingMonth}
              isExpanded={isExpanded}
              tasks={tasks}
              onToggle={() => toggleMonth(monthKey)}
            />
          );
        })}
      </div>
    </div>
  );
}

interface MonthCardProps {
  month: number;
  year: number;
  isCurrentMonth: boolean;
  isWeddingMonth: boolean;
  isExpanded: boolean;
  tasks: TimelineTask[];
  onToggle: () => void;
}

function MonthCard({
  month,
  year,
  isCurrentMonth,
  isWeddingMonth,
  isExpanded,
  tasks,
  onToggle,
}: MonthCardProps) {
  const monthName = `${getMonthName(month)} ${year}`;
  const countdownLabel = getCountdownLabel(month, year);

  // Group tasks by category
  const tasksByCategory = useMemo(() => {
    const grouped = new Map<string, TimelineTask[]>();
    const categories = ["venue", "guests", "ceremony", "personal", "todo"];

    for (const cat of categories) {
      grouped.set(cat, []);
    }

    for (const task of tasks) {
      const existing = grouped.get(task.category) || [];
      existing.push(task);
      grouped.set(task.category, existing);
    }

    return grouped;
  }, [tasks]);

  // Count completed tasks
  const completedCount = tasks.filter((t) => t.completed).length;
  const totalCount = tasks.length;

  return (
    <div
      className={`rounded-xl border overflow-hidden ${
        isCurrentMonth
          ? "border-rose-300 border-2 bg-rose-50/50"
          : "border-gray-200 bg-white"
      }`}
    >
      {/* Header */}
      <button
        onClick={onToggle}
        className={`w-full px-4 py-3 flex items-center justify-between ${
          isCurrentMonth ? "bg-rose-100/50" : "bg-gray-50/50"
        } hover:bg-opacity-75 transition-colors`}
      >
        <div className="flex items-center gap-3">
          <svg
            className={`w-4 h-4 text-gray-500 transition-transform ${
              isExpanded ? "rotate-90" : ""
            }`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
          <h2
            className={`text-lg font-semibold ${
              isCurrentMonth ? "text-rose-900" : "text-gray-900"
            }`}
          >
            {monthName}
          </h2>
          {isCurrentMonth && (
            <span className="px-2 py-0.5 text-xs font-medium bg-rose-500 text-white rounded-full">
              Current
            </span>
          )}
        </div>
        <div className="flex items-center gap-3">
          {!isExpanded && totalCount > 0 && (
            <span className="text-sm text-gray-500">
              {completedCount}/{totalCount} done
            </span>
          )}
          <span
            className={`px-3 py-1 text-xs font-medium rounded-full ${
              isWeddingMonth
                ? "bg-rose-500 text-white"
                : "bg-rose-100 text-rose-700"
            }`}
          >
            {countdownLabel}
          </span>
        </div>
      </button>

      {/* Content */}
      {isExpanded && (
        <div className="p-4 space-y-4">
          {Array.from(tasksByCategory.entries()).map(([category, categoryTasks]) => (
            <CategorySection
              key={category}
              category={category}
              tasks={categoryTasks}
              month={month}
              year={year}
            />
          ))}
        </div>
      )}
    </div>
  );
}

interface CategorySectionProps {
  category: string;
  tasks: TimelineTask[];
  month: number;
  year: number;
}

function CategorySection({ category, tasks, month, year }: CategorySectionProps) {
  const [showAddInput, setShowAddInput] = useState(false);
  const [newTaskText, setNewTaskText] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const categoryInfo = CATEGORY_INFO[category] || { name: category, emoji: "📋" };

  useEffect(() => {
    if (showAddInput && inputRef.current) {
      inputRef.current.focus();
    }
  }, [showAddInput]);

  const addTask = async () => {
    if (!newTaskText.trim()) return;

    const maxOrder = tasks.reduce((max, t) => Math.max(max, t.order), 0);

    await db.transact(
      db.tx.timelineTasks[id()].update({
        text: newTaskText.trim(),
        month,
        year,
        category,
        completed: false,
        order: maxOrder + 1,
        createdAt: Date.now(),
      })
    );

    setNewTaskText("");
    setShowAddInput(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      addTask();
    } else if (e.key === "Escape") {
      setNewTaskText("");
      setShowAddInput(false);
    }
  };

  return (
    <div>
      <h3 className="text-sm font-semibold text-gray-700 flex items-center gap-1.5 mb-2">
        <span>{categoryInfo.emoji}</span>
        <span>{categoryInfo.name}</span>
      </h3>

      <div className="ml-5 space-y-1">
        {tasks.map((task) => (
          <TaskItem key={task.id} task={task} />
        ))}

        {/* Add task input or button */}
        {showAddInput ? (
          <div className="flex items-center gap-2">
            <input
              ref={inputRef}
              type="text"
              value={newTaskText}
              onChange={(e) => setNewTaskText(e.target.value)}
              onKeyDown={handleKeyDown}
              onBlur={() => {
                if (!newTaskText.trim()) {
                  setShowAddInput(false);
                }
              }}
              placeholder="Add task..."
              className="flex-1 px-2 py-1 text-sm border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-rose-500"
            />
            <button
              onClick={addTask}
              className="px-2 py-1 text-sm text-rose-600 hover:text-rose-700"
            >
              Add
            </button>
            <button
              onClick={() => {
                setNewTaskText("");
                setShowAddInput(false);
              }}
              className="px-2 py-1 text-sm text-gray-500 hover:text-gray-700"
            >
              Cancel
            </button>
          </div>
        ) : (
          <button
            onClick={() => setShowAddInput(true)}
            className="text-sm text-rose-600 hover:text-rose-700 flex items-center gap-1"
          >
            <span>+</span>
            <span>Add task</span>
          </button>
        )}
      </div>
    </div>
  );
}

interface TaskItemProps {
  task: TimelineTask;
}

function TaskItem({ task }: TaskItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(task.text);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  const toggleComplete = async () => {
    await db.transact(
      db.tx.timelineTasks[task.id].update({
        completed: !task.completed,
      })
    );
  };

  const saveEdit = async () => {
    if (!editText.trim()) {
      setEditText(task.text);
      setIsEditing(false);
      return;
    }

    if (editText.trim() !== task.text) {
      await db.transact(
        db.tx.timelineTasks[task.id].update({
          text: editText.trim(),
        })
      );
    }

    setIsEditing(false);
  };

  const deleteTask = async () => {
    await db.transact(db.tx.timelineTasks[task.id].delete());
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      saveEdit();
    } else if (e.key === "Escape") {
      setEditText(task.text);
      setIsEditing(false);
    }
  };

  return (
    <div className="group flex items-start gap-2 py-0.5">
      {/* Checkbox */}
      <button
        onClick={toggleComplete}
        className={`w-4 h-4 mt-0.5 rounded border flex-shrink-0 flex items-center justify-center transition-colors ${
          task.completed
            ? "bg-green-500 border-green-500 text-white"
            : "border-gray-300 hover:border-rose-400"
        }`}
      >
        {task.completed && (
          <svg
            className="w-3 h-3"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        )}
      </button>

      {/* Task text (editable) */}
      {isEditing ? (
        <input
          ref={inputRef}
          type="text"
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={saveEdit}
          className="flex-1 px-1 py-0 text-sm border border-rose-300 rounded focus:outline-none focus:ring-1 focus:ring-rose-500"
        />
      ) : (
        <span
          onClick={() => setIsEditing(true)}
          className={`flex-1 text-sm cursor-text ${
            task.completed ? "text-gray-400 line-through" : "text-gray-700"
          }`}
        >
          {task.text}
        </span>
      )}

      {/* Delete button */}
      <button
        onClick={deleteTask}
        className="opacity-0 group-hover:opacity-100 p-0.5 text-gray-400 hover:text-red-500 transition-opacity"
        title="Delete"
      >
        <svg
          className="w-4 h-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>
  );
}
