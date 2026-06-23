import { useState } from "react";
import { deleteItem, updateItem } from "../api/items";

export default function ItemCard({ item, onUpdate, onDelete }) {
    const [editing, setEditing] = useState(false);
    const [title, setTitle] = useState(item.title);
    const [description, setDescription] = useState(item.description || "");
    const [loading, setLoading] = useState(false);

    async function handleToggle() {
        const updated = await updateItem(item.id, { is_done: !item.is_done });
        onUpdate(updated);
    }

    async function handleSave() {
        if (!title.trim()) return;
        setLoading(true);
        try {
            const updated = await updateItem(item.id, { title, description });
            onUpdate(updated);
            setEditing(false);
        }
        finally {
            setLoading(false);
        }
    }

    async function handleDelete() {
        if (!confirm("Delete this item ?")) return;
        await deleteItem(item.id);
        onDelete(item.id);
    }

    return (
        <div className={`card ${item.is_done ? "card-done" : ""}`}>
            {editing ? (
                <div className="card-edit">
                    <input
                        className="input"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Title"
                    />
                    <textarea
                        className="input textarea"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Description (optional)"
                        rows={2}
                    />
                    <div className="card-actions">
                        <button className="btn btn-primary" onClick={handleSave} disabled={loading}>
                            {loading ? "Saving…" : "Save"}
                        </button>
                        <button className="btn btn-ghost" onClick={() => setEditing(false)}>
                            Cancel
                        </button>
                    </div>
                </div>
            ) : (
                <div className="card-view">
                    <div className="card-check">
                        <input type="checkbox" checked={item.is_done} onChange={handleToggle} />
                    </div>
                    <div className="card-body">
                        <p className={`card-title ${item.is_done ? "done-text" : ""}`}>{item.title}</p>
                        {item.description && (
                            <p className="card-desc">{item.description}</p>
                        )}
                    </div>
                    <div className="card-actions">
                        <button className="btn btn-ghost btn-sm" onClick={() => setEditing(true)}>
                            Edit
                        </button>
                        <button className="btn btn-danger btn-sm" onClick={handleDelete}>
                            Delete
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}