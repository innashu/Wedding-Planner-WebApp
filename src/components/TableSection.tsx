"use client";

import { useState } from "react";
import { db } from "@/lib/db";
import { id } from "@instantdb/react";
import { type AppSchema } from "@/instant.schema";
import { InstaQLEntity } from "@instantdb/react";

type Item = InstaQLEntity<AppSchema, "items">;
type Section = InstaQLEntity<AppSchema, "sections">;

interface Column {
  id: string;
  name: string;
}

interface TableSectionProps {
  section: Section;
  items: Item[];
  category: string;
  totalItemCount: number;
  onDelete: () => void;
  isEditingColumns?: boolean;
  onEditColumnsChange?: (editing: boolean) => void;
}

function parseColumns(columnsJson: string | undefined): Column[] {
  if (!columnsJson) return [];
  try {
    return JSON.parse(columnsJson);
  } catch {
    return [];
  }
}

function parseColumnValues(valuesJson: string | undefined): Record<string, string> {
  if (!valuesJson) return {};
  try {
    return JSON.parse(valuesJson);
  } catch {
    return {};
  }
}

export function TableSection({
  section,
  items,
  category,
  totalItemCount,
  onDelete,
  isEditingColumns = false,
  onEditColumnsChange,
}: TableSectionProps) {
  const columns = parseColumns(section.columns);
  const [isAddingRow, setIsAddingRow] = useState(false);
  const [newRowValues, setNewRowValues] = useState<Record<string, string>>({});
  const [editedColumns, setEditedColumns] = useState<Column[]>(columns);

  const handleAddRow = (e: React.FormEvent) => {
    e.preventDefault();

    // Check if at least the first column has a value
    const firstCol = columns[0];
    if (!firstCol || !newRowValues[firstCol.id]?.trim()) return;

    db.transact(
      db.tx.items[id()].update({
        name: newRowValues[firstCol.id].trim(),
        category,
        section: section.id,
        order: totalItemCount,
        createdAt: Date.now(),
        columnValues: JSON.stringify(newRowValues),
      })
    );

    setNewRowValues({});
    setIsAddingRow(false);
  };

  const handleDeleteItem = (itemId: string) => {
    db.transact(db.tx.items[itemId].delete());
  };

  const handleStartEditColumns = () => {
    setEditedColumns(columns);
    onEditColumnsChange?.(true);
  };

  const handleAddColumn = () => {
    setEditedColumns((prev) => [...prev, { id: "col_" + Date.now(), name: "" }]);
  };

  const handleRemoveColumn = (colId: string) => {
    if (editedColumns.length <= 1) return;
    setEditedColumns((prev) => prev.filter((c) => c.id !== colId));
  };

  const handleColumnNameChange = (colId: string, name: string) => {
    setEditedColumns((prev) =>
      prev.map((c) => (c.id === colId ? { ...c, name } : c))
    );
  };

  const handleSaveColumns = () => {
    const validColumns = editedColumns.filter((c) => c.name.trim());
    if (validColumns.length === 0) return;

    db.transact(
      db.tx.sections[section.id].update({
        columns: JSON.stringify(validColumns),
      })
    );
    onEditColumnsChange?.(false);
  };

  const handleCancelEditColumns = () => {
    setEditedColumns(columns);
    onEditColumnsChange?.(false);
  };

  if (columns.length === 0) {
    return (
      <div className="text-gray-400 text-sm p-4 bg-gray-50 rounded-lg">
        No columns defined for this section.
      </div>
    );
  }

  if (isEditingColumns) {
    return (
      <div className="p-4 bg-gray-50 rounded-lg space-y-4">
        <div>
          <label className="block text-xs text-gray-500 mb-2">Edit Columns</label>
          <div className="space-y-2">
            {editedColumns.map((col, index) => (
              <div key={col.id} className="flex gap-2">
                <input
                  type="text"
                  value={col.name}
                  onChange={(e) => handleColumnNameChange(col.id, e.target.value)}
                  placeholder={`Column ${index + 1} name`}
                  className="flex-1 px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-200 focus:border-rose-300 text-sm bg-white"
                  autoFocus={index === 0}
                />
                {editedColumns.length > 1 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveColumn(col.id)}
                    className="px-3 py-2 text-gray-400 hover:text-red-500 transition-colors"
                  >
                    ×
                  </button>
                )}
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={handleAddColumn}
            className="mt-2 text-sm text-rose-500 hover:text-rose-600"
          >
            + Add column
          </button>
        </div>
        <div className="flex gap-2 pt-2">
          <button
            onClick={handleSaveColumns}
            className="px-4 py-2 bg-rose-500 text-white rounded-lg hover:bg-rose-600 transition-colors text-sm"
          >
            Save
          </button>
          <button
            onClick={handleCancelEditColumns}
            className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors text-gray-600 text-sm"
          >
            Cancel
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b-2 border-rose-200 bg-rose-50/50">
            {columns.map((col) => (
              <th
                key={col.id}
                className="text-left text-sm font-semibold text-gray-700 py-3 px-3"
              >
                {col.name}
              </th>
            ))}
            <th className="w-10"></th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => {
            const values = parseColumnValues(item.columnValues);
            return (
              <tr
                key={item.id}
                className="group border-b border-gray-50 hover:bg-gray-50 transition-colors"
              >
                {columns.map((col) => (
                  <td key={col.id} className="py-3 px-3 text-gray-900">
                    {values[col.id] || "-"}
                  </td>
                ))}
                <td className="py-3 px-3">
                  <button
                    onClick={() => handleDeleteItem(item.id)}
                    className="opacity-0 group-hover:opacity-100 text-gray-300 hover:text-red-500 transition-all text-lg"
                    title="Delete row"
                  >
                    ×
                  </button>
                </td>
              </tr>
            );
          })}
          {isAddingRow && (
            <tr className="border-b border-gray-100 bg-rose-50/30">
              {columns.map((col) => (
                <td key={col.id} className="py-2 px-2">
                  <input
                    type="text"
                    value={newRowValues[col.id] || ""}
                    onChange={(e) =>
                      setNewRowValues((prev) => ({
                        ...prev,
                        [col.id]: e.target.value,
                      }))
                    }
                    placeholder={col.name}
                    className="w-full px-2 py-1 border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-rose-200 focus:border-rose-300 text-sm bg-white"
                    autoFocus={col.id === columns[0]?.id}
                  />
                </td>
              ))}
              <td className="py-2 px-2">
                <div className="flex gap-1">
                  <button
                    onClick={handleAddRow}
                    className="text-rose-500 hover:text-rose-600 text-sm font-medium"
                  >
                    Add
                  </button>
                  <button
                    onClick={() => {
                      setIsAddingRow(false);
                      setNewRowValues({});
                    }}
                    className="text-gray-400 hover:text-gray-600 text-sm"
                  >
                    ×
                  </button>
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {!isAddingRow && (
        <button
          onClick={() => setIsAddingRow(true)}
          className="w-full py-2 text-sm text-gray-400 hover:text-rose-500 transition-colors"
        >
          + Add row
        </button>
      )}
    </div>
  );
}

interface CreateTableSectionProps {
  category: string;
  sectionCount: number;
  onCancel: () => void;
}

export function CreateTableSection({
  category,
  sectionCount,
  onCancel,
}: CreateTableSectionProps) {
  const [sectionName, setSectionName] = useState("");
  const [columns, setColumns] = useState<{ id: string; name: string }[]>([
    { id: "col_" + Date.now(), name: "" },
    { id: "col_" + (Date.now() + 1), name: "" },
  ]);

  const handleAddColumn = () => {
    setColumns((prev) => [...prev, { id: "col_" + Date.now(), name: "" }]);
  };

  const handleRemoveColumn = (colId: string) => {
    if (columns.length <= 1) return;
    setColumns((prev) => prev.filter((c) => c.id !== colId));
  };

  const handleColumnNameChange = (colId: string, name: string) => {
    setColumns((prev) =>
      prev.map((c) => (c.id === colId ? { ...c, name } : c))
    );
  };

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!sectionName.trim()) return;

    const validColumns = columns.filter((c) => c.name.trim());
    if (validColumns.length === 0) return;

    db.transact(
      db.tx.sections[id()].update({
        name: sectionName.trim(),
        category,
        order: sectionCount,
        createdAt: Date.now(),
        columns: JSON.stringify(validColumns),
      })
    );

    onCancel();
  };

  return (
    <form onSubmit={handleCreate} className="p-4 bg-gray-50 rounded-lg space-y-4">
      <div>
        <label className="block text-xs text-gray-500 mb-1">Table Name</label>
        <input
          type="text"
          value={sectionName}
          onChange={(e) => setSectionName(e.target.value)}
          placeholder="e.g., Venues, Photographers"
          className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-200 focus:border-rose-300 bg-white"
          autoFocus
        />
      </div>

      <div>
        <label className="block text-xs text-gray-500 mb-2">Columns</label>
        <div className="space-y-2">
          {columns.map((col, index) => (
            <div key={col.id} className="flex gap-2">
              <input
                type="text"
                value={col.name}
                onChange={(e) => handleColumnNameChange(col.id, e.target.value)}
                placeholder={`Column ${index + 1} name`}
                className="flex-1 px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-200 focus:border-rose-300 text-sm bg-white"
              />
              {columns.length > 1 && (
                <button
                  type="button"
                  onClick={() => handleRemoveColumn(col.id)}
                  className="px-3 py-2 text-gray-400 hover:text-red-500 transition-colors"
                >
                  ×
                </button>
              )}
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={handleAddColumn}
          className="mt-2 text-sm text-rose-500 hover:text-rose-600"
        >
          + Add column
        </button>
      </div>

      <div className="flex gap-2 pt-2">
        <button
          type="submit"
          className="px-4 py-2 bg-rose-500 text-white rounded-lg hover:bg-rose-600 transition-colors"
        >
          Create Table
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors text-gray-600"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
