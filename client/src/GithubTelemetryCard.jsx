import React from 'react';
import {
  Star,
  GitFork,
  GitCommit,
  ExternalLink,
  RefreshCw,
  AlertCircle,
  ShieldCheck,
  Cpu,
  Code2
} from 'lucide-react';

export default function GithubTelemetryCard({
  repoOwner,
  repoName,
  repoUrl,
  githubStats,
  onRefresh,
  appVersion,
  packageId
}) {
  const formatDate = (dateStr) => {
    if (!dateStr) return 'N/A';
    try {
      const d = new Date(dateStr);
      return new Intl.DateTimeFormat('es-MX', {
        year: 'numeric',
        month: 'short',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        timeZoneName: 'short',
      }).format(d);
    } catch {
      return dateStr;
    }
  };

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-slate-900/90 via-slate-900/60 to-blue-950/40 backdrop-blur-2xl border border-blue-500/30 shadow-2xl rounded-3xl p-6 transition-all duration-300 hover:border-blue-500/50">
      {/* Background glow ambient effect */}
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>

      {/* Card Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-slate-800/80">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 shadow-inner">
            <Code2 size={24} />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h2 className="text-lg font-bold text-white tracking-tight">Telemetry & Repository Status</h2>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-mono">
                v{appVersion}
              </span>
            </div>
            <p className="text-xs text-slate-400 font-mono mt-0.5">
              Package: <span className="text-blue-400">{packageId}</span>
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center space-x-3">
          <a
            href={repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700/80 text-xs font-semibold text-blue-300 transition-colors shadow-sm"
          >
            <span>{repoOwner}/{repoName}</span>
            <ExternalLink size={13} />
          </a>

          <button
            onClick={onRefresh}
            disabled={githubStats.loading}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-600/20 hover:bg-blue-600/30 border border-blue-500/40 text-xs font-semibold text-blue-300 transition-all disabled:opacity-50"
            title="Sincronizar telemetría de GitHub"
          >
            <RefreshCw size={13} className={githubStats.loading ? 'animate-spin' : ''} />
            <span className="hidden sm:inline">Sincronizar</span>
          </button>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-6">
        {/* Stars Metric */}
        <div className="bg-slate-950/50 border border-amber-500/20 rounded-2xl p-4 flex items-center justify-between shadow-inner group hover:border-amber-500/40 transition-colors">
          <div className="space-y-1">
            <span className="text-xs text-slate-400 font-mono uppercase tracking-wider">GitHub Stars</span>
            <div className="text-2xl font-bold font-mono text-white">
              {githubStats.loading ? (
                <div className="w-12 h-6 bg-slate-800 animate-pulse rounded"></div>
              ) : githubStats.stars !== null ? (
                githubStats.stars.toLocaleString()
              ) : (
                '--'
              )}
            </div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 group-hover:scale-110 transition-transform">
            <Star size={20} className="fill-amber-400/20" />
          </div>
        </div>

        {/* Forks Metric */}
        <div className="bg-slate-950/50 border border-cyan-500/20 rounded-2xl p-4 flex items-center justify-between shadow-inner group hover:border-cyan-500/40 transition-colors">
          <div className="space-y-1">
            <span className="text-xs text-slate-400 font-mono uppercase tracking-wider">Repository Forks</span>
            <div className="text-2xl font-bold font-mono text-white">
              {githubStats.loading ? (
                <div className="w-12 h-6 bg-slate-800 animate-pulse rounded"></div>
              ) : githubStats.forks !== null ? (
                githubStats.forks.toLocaleString()
              ) : (
                '--'
              )}
            </div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform">
            <GitFork size={20} />
          </div>
        </div>

        {/* Latest Commit Metric */}
        <div className="bg-slate-950/50 border border-emerald-500/20 rounded-2xl p-4 flex items-center justify-between shadow-inner group hover:border-emerald-500/40 transition-colors">
          <div className="space-y-1">
            <span className="text-xs text-slate-400 font-mono uppercase tracking-wider">Último Commit</span>
            <div className="text-sm font-bold font-mono text-white flex items-center gap-2">
              {githubStats.loading ? (
                <div className="w-24 h-5 bg-slate-800 animate-pulse rounded"></div>
              ) : githubStats.latestCommitDate ? (
                <span>{formatDate(githubStats.latestCommitDate)}</span>
              ) : (
                'N/A'
              )}
            </div>
            {githubStats.latestCommitSha && (
              <span className="inline-block text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                SHA: {githubStats.latestCommitSha}
              </span>
            )}
          </div>
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
            <GitCommit size={20} />
          </div>
        </div>
      </div>

      {/* Error state alert if any */}
      {githubStats.error && (
        <div className="mb-4 flex items-center gap-2 p-3 bg-rose-950/40 border border-rose-800/50 rounded-xl text-xs text-rose-300 font-mono">
          <AlertCircle size={16} className="text-rose-400 flex-shrink-0" />
          <span>Aviso de GitHub API: {githubStats.error} (Usando caché local del nodo)</span>
        </div>
      )}

      {/* Card Footer with ORCID iD & Node Metadata */}
      <div className="pt-4 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono text-slate-400">
        <div className="flex items-center gap-2">
          <ShieldCheck size={14} className="text-emerald-400" />
          <span>Nodo MX-SQ-3000 // Invariancia Cantoriana ℵ₁</span>
        </div>
        
        {/* User requested ORCID Link */}
        <div className="flex items-center">
          <a
            id="cy-effective-orcid-url"
            className="underline text-blue-400 hover:text-blue-300 transition-colors flex items-center"
            href="https://orcid.org/0009-0007-6963-1205"
            target="orcid.widget"
            rel="me noopener noreferrer"
            style={{ verticalAlign: 'top' }}
          >
            <img
              src="https://orcid.org/sites/default/files/images/orcid_16x16.png"
              style={{ width: '1em', marginInlineStart: '0.5em' }}
              alt="ORCID iD icon"
            />
            <span className="ml-1">https://orcid.org/0009-0007-6963-1205</span>
          </a>
        </div>
      </div>
    </div>
  );
}
