"use client";

import { useState } from "react";
import { ArrowLeft, ChevronDown, ChevronUp, Plus, Save, Trash2 } from "lucide-react";
import { ProjectVisual } from "@/components/projects/project-visual";
import type { ContentKey } from "@/lib/content";

export type JsonValue = string | number | boolean | null | JsonValue[] | { [key: string]: JsonValue };

type Props = {
  contentKey: ContentKey;
  initialValue: JsonValue;
  action: (formData: FormData) => void | Promise<void>;
};

const labels: Record<string, string> = {
  profile: "Profil utama",
  seo: "SEO & metadata",
  socialLinks: "Tautan sosial",
  projects: "Proyek utama",
  miniProjects: "Proyek mini",
  skills: "Keahlian",
  timeline: "Perjalanan",
  href: "URL",
  imageUrl: "URL gambar",
  liveUrl: "URL live",
  sourceUrl: "URL source",
  supportingRole: "Peran pendukung",
  shortTitle: "Judul pendek",
};

function labelFor(key: string) {
  return labels[key] ?? key.replace(/([A-Z])/g, " $1").replace(/^./, (letter) => letter.toUpperCase());
}

function emptyLike(value: JsonValue): JsonValue {
  if (Array.isArray(value)) return [];
  if (value && typeof value === "object") {
    return Object.fromEntries(Object.entries(value).map(([key, child]) => [key, emptyLike(child)]));
  }
  if (typeof value === "boolean") return false;
  if (typeof value === "number") return 0;
  return "";
}

function fieldType(key: string, value: string) {
  if (key === "email") return "email";
  if (/url|href/i.test(key)) return "url";
  return value.length > 100 || ["description", "about", "summary", "context", "objective", "body", "reflection", "outcome", "caption"].includes(key)
    ? "textarea"
    : "text";
}

function ValueEditor({ name, value, onChange, depth = 0 }: { name: string; value: JsonValue; onChange: (value: JsonValue) => void; depth?: number }) {
  if (Array.isArray(value)) {
    return (
      <div className="admin-list">
        {value.map((item, index) => (
          <ArrayItem
            key={index}
            index={index}
            item={item}
            name={name}
            onChange={(next) => onChange(value.map((entry, itemIndex) => itemIndex === index ? next : entry))}
            onMove={(offset) => {
              const target = index + offset;
              if (target < 0 || target >= value.length) return;
              const next = [...value];
              [next[index], next[target]] = [next[target], next[index]];
              onChange(next);
            }}
            onRemove={() => onChange(value.filter((_, itemIndex) => itemIndex !== index))}
            depth={depth}
          />
        ))}
        <button className="admin-add" type="button" onClick={() => onChange([...value, emptyLike(value[0] ?? "")])}>
          <Plus size={16} aria-hidden="true" /> Tambah {labelFor(name).toLowerCase()}
        </button>
      </div>
    );
  }

  if (value && typeof value === "object") {
    return (
      <div className="admin-field-grid">
        {Object.entries(value).map(([key, child]) => (
          <ValueEditor key={key} name={key} value={child} onChange={(next) => onChange({ ...value, [key]: next })} depth={depth + 1} />
        ))}
      </div>
    );
  }

  if (typeof value === "boolean") {
    return <label className="admin-checkbox"><input type="checkbox" checked={value} onChange={(event) => onChange(event.target.checked)} />{labelFor(name)}</label>;
  }

  const text = value == null ? "" : String(value);
  const type = fieldType(name, text);
  return (
    <label className={type === "textarea" ? "admin-field admin-field-wide" : "admin-field"}>
      <span>{labelFor(name)}</span>
      {type === "textarea"
        ? <textarea value={text} onChange={(event) => onChange(event.target.value)} rows={Math.min(8, Math.max(3, Math.ceil(text.length / 90)))} />
        : <input type={type} value={text} onChange={(event) => onChange(typeof value === "number" ? Number(event.target.value) : event.target.value || (value === null ? null : ""))} />}
    </label>
  );
}

function ArrayItem({ index, item, name, onChange, onMove, onRemove, depth }: {
  index: number;
  item: JsonValue;
  name: string;
  onChange: (value: JsonValue) => void;
  onMove: (offset: number) => void;
  onRemove: () => void;
  depth: number;
}) {
  const title = item && typeof item === "object" && !Array.isArray(item)
    ? String(item.title ?? item.label ?? item.category ?? item.period ?? item.id ?? `${labelFor(name)} ${index + 1}`)
    : `${labelFor(name)} ${index + 1}`;

  return (
    <details className="admin-list-item" open={depth > 0 || index === 0}>
      <summary>
        <span>{title}</span>
        <span className="admin-item-actions" onClick={(event) => event.preventDefault()}>
          <button type="button" aria-label="Naikkan" onClick={() => onMove(-1)} disabled={index === 0}><ChevronUp size={15} /></button>
          <button type="button" aria-label="Turunkan" onClick={() => onMove(1)}><ChevronDown size={15} /></button>
          <button type="button" aria-label="Hapus" onClick={onRemove}><Trash2 size={15} /></button>
        </span>
      </summary>
      <div className="admin-list-content"><ValueEditor name={name} value={item} onChange={onChange} depth={depth + 1} /></div>
    </details>
  );
}

type ProjectValue = { title?: JsonValue; summary?: JsonValue; status?: JsonValue; role?: JsonValue; preview?: JsonValue; year?: JsonValue; [key: string]: JsonValue | undefined };

function MiniProjectEditor({ projects, onChange }: { projects: JsonValue[]; onChange: (value: JsonValue[]) => void }) {
  const [selected, setSelected] = useState<number | null>(null);

  if (selected === null) {
    return (
      <div className="admin-project-browser">
        <div className="admin-project-toolbar"><p>Pilih mini project untuk membuka detail dan mengeditnya.</p><button className="admin-add" type="button" onClick={() => { onChange([...projects, emptyLike(projects[0] ?? {})]); setSelected(projects.length); }}><Plus size={16} /> Tambah mini project</button></div>
        <div className="admin-project-grid admin-mini-project-grid">
          {projects.map((project, index) => {
            const item = project as ProjectValue;
            const imageUrl = String(item.imageUrl ?? "");
            const tags = Array.isArray(item.tags) ? item.tags.map(String) : [];
            return (
              <button className="admin-project-card admin-mini-project-card" type="button" key={index} onClick={() => setSelected(index)}>
                <span className="admin-mini-project-image" style={imageUrl ? { backgroundImage: `url(${JSON.stringify(imageUrl).slice(1, -1)})` } : undefined}>{imageUrl ? null : "Belum ada gambar"}</span>
                <span className="admin-project-card-body"><strong>{String(item.title ?? `Mini project ${index + 1}`)}</strong><span>{String(item.description ?? "Belum ada deskripsi.")}</span>{tags.length ? <span className="admin-mini-tags">{tags.map((tag) => <i key={tag}>{tag}</i>)}</span> : null}<b>Edit detail →</b></span>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  const project = projects[selected];
  if (!project) return null;
  return (
    <div className="admin-project-detail">
      <div className="admin-project-detail-head"><button type="button" className="admin-back" onClick={() => setSelected(null)}><ArrowLeft size={17} /> Kembali ke daftar mini project</button><button type="button" className="admin-delete-project" onClick={() => { onChange(projects.filter((_, index) => index !== selected)); setSelected(null); }}><Trash2 size={16} /> Hapus mini project</button></div>
      <ValueEditor name="miniProject" value={project} onChange={(next) => onChange(projects.map((item, index) => index === selected ? next : item))} />
    </div>
  );
}

function ProjectEditor({ projects, onChange }: { projects: JsonValue[]; onChange: (value: JsonValue[]) => void }) {
  const [selected, setSelected] = useState<number | null>(null);

  if (selected === null) {
    return (
      <div className="admin-project-browser">
        <div className="admin-project-toolbar"><p>Pilih proyek untuk membuka detail dan mengeditnya.</p><button className="admin-add" type="button" onClick={() => { onChange([...projects, emptyLike(projects[0] ?? {})]); setSelected(projects.length); }}><Plus size={16} /> Tambah proyek</button></div>
        <div className="admin-project-grid">
          {projects.map((project, index) => {
            const item = project as ProjectValue;
            const preview = ["marketplace", "database", "focus"].includes(String(item.preview)) ? item.preview as "marketplace" | "database" | "focus" : "marketplace";
            return (
              <button className="admin-project-card" type="button" key={index} onClick={() => setSelected(index)}>
                <ProjectVisual type={preview} compact />
                <span className="admin-project-card-body"><small>{String(item.status ?? "Proyek")}</small><strong>{String(item.title ?? `Proyek ${index + 1}`)}</strong><span>{String(item.summary ?? "Belum ada ringkasan.")}</span><b>Edit detail →</b></span>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  const project = projects[selected];
  if (!project) return null;
  return (
    <div className="admin-project-detail">
      <div className="admin-project-detail-head"><button type="button" className="admin-back" onClick={() => setSelected(null)}><ArrowLeft size={17} /> Kembali ke daftar proyek</button><button type="button" className="admin-delete-project" onClick={() => { onChange(projects.filter((_, index) => index !== selected)); setSelected(null); }}><Trash2 size={16} /> Hapus proyek</button></div>
      <ValueEditor name="project" value={project} onChange={(next) => onChange(projects.map((item, index) => index === selected ? next : item))} />
    </div>
  );
}

export function ContentEditor({ contentKey, initialValue, action }: Props) {
  const [value, setValue] = useState(initialValue);
  const [dirty, setDirty] = useState(false);
  const update = (next: JsonValue) => { setValue(next); setDirty(true); };

  return (
    <form action={action} className="admin-editor" onChange={() => setDirty(true)}>
      <input type="hidden" name="key" value={contentKey} />
      <input type="hidden" name="value" value={JSON.stringify(value)} />
      <div className="admin-editor-heading">
        <div><p className="eyebrow">Editor</p><h2>{labelFor(contentKey)}</h2></div>
        <button className="button button-primary" type="submit"><Save size={16} /> {dirty ? "Simpan perubahan" : "Simpan"}</button>
      </div>
      {contentKey === "projects" && Array.isArray(value)
        ? <ProjectEditor projects={value} onChange={update} />
        : contentKey === "miniProjects" && Array.isArray(value)
          ? <MiniProjectEditor projects={value} onChange={update} />
          : <ValueEditor name={contentKey} value={value} onChange={update} />}
      <div className="admin-save-bar"><span>{dirty ? "Ada perubahan yang belum disimpan." : "Semua perubahan sudah tersimpan."}</span><button className="button button-primary" type="submit"><Save size={16} /> Simpan</button></div>
    </form>
  );
}
