import { useState, useEffect } from "react";
import { createItem, fetchItems } from "../api/items";
import useAuth from "../context/AuthContext";

export default function ItemCard() {
    const { user } = useAuth();
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [creating, setCreating] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchItems()
            .then(setItems)
            .finally(() => setLoading(false));
    }, []);

    async function handleCreate(e) {
        e.preventDefault();
        if (!title.trim()) return;
        setCreating(true);
        setError("");
        try {
            const item = await createItem({ title, description });
            setItems((prev) => [item, ...prev]);
            setTitle("");
            setDescription("");
        }
        catch {
            setError("Failed to create item.");
        }
        finally {
            setCreating(false);
        }
    }

    function handleUpdate(updated) {
        setItems((prev) => prev.map((i) => (i.id === updated.id ? updated : i)));
    }

    function handleDelete(id) {
        setItems((prev) => prev.filter((i) => i.id !== id));
    }

    const done = items.filter((i) => i.is_done).length;
    const total = items.length;


    return (
        <div className="dash-wrap">
            {/* Header */}
            <div className="dash-header">
                <div>
                    <h2 className="dash-title">My Items</h2>
                    <p className="dash-sub">
                        {total === 0
                            ? "No items yet. Add one below."
                            : `${done} of ${total} completed`}
                    </p>
                </div>
                {total > 0 && (
                    <div className="progress-wrap">
                        <div
                            className="progress-bar"
                            style={{ width: `${(done / total) * 100}%` }}
                        />
                    </div>
                )}
            </div>

            {/* Create form */}
            <form className="create-form" onSubmit={handleCreate}>
                <div className="create-row">
                    <input
                        className="input"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="New item title…"
                        required
                    />
                    <button className="btn btn-primary" type="submit" disabled={creating}>
                        {creating ? "Adding…" : "+ Add"}
                    </button>
                </div>
                <input
                    className="input"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Description (optional)"
                />
                {error && <p className="form-error">{error}</p>}
            </form>

            {/* List */}
            {loading ? (
                <div className="spinner-wrap"><div className="spinner" /></div>
            ) : items.length === 0 ? (
                <div className="empty-state">
                    <span className="empty-icon">📋</span>
                    <p>No items yet. Create your first one above.</p>
                </div>
            ) : (
                <div className="item-list">
                    {items.map((item) => (
                        <ItemCard
                            key={item.id}
                            item={item}
                            onUpdate={handleUpdate}
                            onDelete={handleDelete}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}