"use client";

import { useCallback, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import {
  faArrowsRotate,
  faBuildingColumns,
  faChair,
  faClipboardList,
  faDownload,
  faMagnifyingGlass,
  faUserCheck,
} from "@fortawesome/free-solid-svg-icons";
import AdminLoader from "@/components/AdminLoader";
import {
  supabase,
  WEDDING_CAPACITY,
  isSupabaseConfigured,
  COUPLE_NAMES_FR,
} from "@/lib/supabase";
import type { RSVP, RSVPStats } from "@/lib/types";
import "@/lib/fontawesome";

function exportToCSV(data: RSVP[]) {
  const headers = ["Prénom", "Nom", "Places", "Message", "Date"];
  const rows = data.map((r) => [
    r.prenom,
    r.nom,
    r.nombre_places,
    (r.message ?? "").replace(/"/g, '""'),
    new Date(r.created_at).toLocaleString("fr-FR"),
  ]);

  const csv = [
    headers.join(","),
    ...rows.map((row) => row.map((cell) => `"${cell}"`).join(",")),
  ].join("\n");

  const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `rsvp-yosser-hamza-${new Date().toISOString().split("T")[0]}.csv`;
  link.click();
  URL.revokeObjectURL(url);
}

export default function AdminPage() {
  const [stats, setStats] = useState<RSVPStats | null>(null);
  const [rsvps, setRsvps] = useState<RSVP[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [lastRefresh, setLastRefresh] = useState<Date | null>(null);

  const fetchData = useCallback(async () => {
    if (!isSupabaseConfigured) {
      setLoading(false);
      return;
    }

    const [statsRes, rsvpsRes] = await Promise.all([
      supabase.from("rsvp_stats").select("*").single(),
      supabase
        .from("rsvp")
        .select("*")
        .order("created_at", { ascending: false }),
    ]);

    if (statsRes.data) setStats(statsRes.data as RSVPStats);
    if (rsvpsRes.data) setRsvps(rsvpsRes.data as RSVP[]);
    setLastRefresh(new Date());
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, [fetchData]);

  const filteredRsvps = rsvps.filter((r) => {
    const q = search.toLowerCase();
    return (
      r.prenom.toLowerCase().includes(q) || r.nom.toLowerCase().includes(q)
    );
  });

  const progressPercent = stats
    ? Math.min((stats.places_confirmees / WEDDING_CAPACITY) * 100, 100)
    : 0;

  return (
    <AdminLoader>
      <div className="admin-dashboard min-h-screen font-body">
        <div className="admin-dashboard__bg" aria-hidden="true" />
        <div className="admin-dashboard__overlay" aria-hidden="true" />

        <div className="admin-dashboard__content px-4 py-8">
          <div className="mx-auto max-w-6xl">
            <header className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h1 className="font-display text-3xl font-bold text-gold">
                  Dashboard Admin
                </h1>
                <p className="text-admin-muted">
                  {COUPLE_NAMES_FR} — Gestion des RSVPs
                </p>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={fetchData}
                  className="admin-panel inline-flex min-h-[44px] items-center gap-2 rounded-lg px-4 py-2 text-sm text-admin-text transition hover:border-gold/40"
                >
                  <FontAwesomeIcon icon={faArrowsRotate} className="h-4 w-4 text-gold-light" />
                  Actualiser
                </button>
                <button
                  onClick={() => exportToCSV(filteredRsvps)}
                  disabled={filteredRsvps.length === 0}
                  className="inline-flex min-h-[44px] items-center gap-2 rounded-lg bg-gold px-4 py-2 text-sm font-semibold text-admin-bg transition hover:bg-gold-light disabled:opacity-50"
                >
                  <FontAwesomeIcon icon={faDownload} className="h-4 w-4" />
                  Export CSV
                </button>
              </div>
            </header>

            <p className="admin-num mb-6 text-xs text-admin-muted" suppressHydrationWarning>
              Dernière mise à jour :{" "}
              {lastRefresh ? lastRefresh.toLocaleTimeString("fr-FR") : "—"}
              {" · "}Auto-refresh 30s
            </p>

            {!isSupabaseConfigured && (
              <div className="admin-panel mb-8 rounded-xl p-4 text-sm text-admin-text">
                Supabase non configuré. Copiez{" "}
                <code className="text-gold-light">.env.local.example</code> vers{" "}
                <code className="text-gold-light">.env.local</code> et ajoutez vos clés.
              </div>
            )}

            {loading ? (
              <div className="grid gap-4 md:grid-cols-4">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="admin-panel h-28 animate-pulse rounded-xl" />
                ))}
              </div>
            ) : (
              <>
                <div className="mb-8 grid gap-4 sm:grid-cols-2 md:grid-cols-4">
                  <StatCard
                    label="Invités confirmés"
                    value={stats?.confirmes ?? 0}
                    icon={faUserCheck}
                  />
                  <StatCard
                    label="Places réservées"
                    value={stats?.places_confirmees ?? 0}
                    icon={faChair}
                  />
                  <StatCard
                    label="Total réponses"
                    value={stats?.total_invites ?? 0}
                    icon={faClipboardList}
                  />
                  <StatCard
                    label="Capacité max"
                    value={WEDDING_CAPACITY}
                    icon={faBuildingColumns}
                  />
                </div>

                <div className="admin-panel mb-8 rounded-xl p-6">
                  <div className="mb-2 flex justify-between text-sm">
                    <span className="text-admin-muted">Progression capacité</span>
                    <span className="admin-num text-gold-light">
                      {stats?.places_confirmees ?? 0} / {WEDDING_CAPACITY}
                    </span>
                  </div>
                  <div className="h-4 overflow-hidden rounded-full bg-admin-bg/80">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-gold-dark via-gold to-gold-light transition-all duration-500"
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                  <p className="admin-num mt-2 text-right text-sm text-gold">
                    {progressPercent.toFixed(1)}%
                  </p>
                </div>
              </>
            )}

            <div className="relative mb-4 max-w-md">
              <FontAwesomeIcon
                icon={faMagnifyingGlass}
                className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gold/55"
              />
              <input
                type="search"
                placeholder="Rechercher par nom..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="admin-input pl-10"
              />
            </div>

            <div className="admin-panel overflow-x-auto rounded-xl">
              <table className="w-full min-w-[520px] text-left text-sm">
                <thead className="border-b border-gold/20 bg-admin-elevated/70">
                  <tr>
                    <th className="px-4 py-3 font-semibold text-gold-light">Prénom</th>
                    <th className="px-4 py-3 font-semibold text-gold-light">Nom</th>
                    <th className="px-4 py-3 font-semibold text-gold-light">Places</th>
                    <th className="px-4 py-3 font-semibold text-gold-light">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredRsvps.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="px-4 py-8 text-center text-admin-muted">
                        {loading ? "Chargement..." : "Aucun RSVP trouvé"}
                      </td>
                    </tr>
                  ) : (
                    filteredRsvps.map((rsvp) => (
                      <tr
                        key={rsvp.id}
                        className="border-b border-gold/10 transition hover:bg-admin-elevated/40"
                      >
                        <td className="px-4 py-3 text-admin-text">{rsvp.prenom}</td>
                        <td className="px-4 py-3 text-admin-text">{rsvp.nom}</td>
                        <td className="px-4 py-3">
                          <span className="admin-num rounded-full bg-gold/15 px-2 py-0.5 text-gold-light">
                            {rsvp.nombre_places}
                          </span>
                        </td>
                        <td className="admin-num px-4 py-3 text-admin-muted">
                          {new Date(rsvp.created_at).toLocaleString("fr-FR")}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            <p className="admin-num mt-6 text-center text-xs text-admin-muted">
              {filteredRsvps.length} résultat(s) affiché(s)
            </p>
          </div>
        </div>
      </div>
    </AdminLoader>
  );
}

function StatCard({
  label,
  value,
  icon,
}: {
  label: string;
  value: number;
  icon: IconDefinition;
}) {
  return (
    <div className="admin-panel rounded-xl p-5">
      <FontAwesomeIcon icon={icon} className="h-6 w-6 text-gold-light" />
      <p className="admin-num mt-2 text-3xl font-bold text-gold-light">{value}</p>
      <p className="text-sm text-admin-muted">{label}</p>
    </div>
  );
}
