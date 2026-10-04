import React, { useState, useEffect, useCallback } from 'react';
import {
  Cpu,
  Activity,
  ShieldCheck,
  Terminal,
  Lock,
  Package,
  CheckCircle2
} from 'lucide-react';
import { LineChart, Line, YAxis, ResponsiveContainer } from 'recharts';
import GithubTelemetryCard from './GithubTelemetryCard';

/**
 * NODO: MX-SQ-3000 | San Quintín, B.C.
 * "La vida es complicada pero Muy hermosa." - George Cantor
 * Paquete: com.aistudio.neurobin.aleph | Versión: 1.0
 */

const APP_VERSION = '1.0';
const PACKAGE_ID = 'com.aistudio.neurobin.aleph';
const REPO_OWNER = 'aleph-sigma';
const REPO_NAME = 'Kumi-engine';
const REPO_URL = `https://github.com/${REPO_OWNER}/${REPO_NAME}`;

export default function App() {
  const [telemetry, setTelemetry] = useState(
    Array.from({ length: 20 }, (_, i) => ({ time: i, val: 97.05 }))
  );
  const [logs, setLogs] = useState([
    `[SYS] Identificador de paquete: ${PACKAGE_ID} | Versión ${APP_VERSION}`,
    '[SYS] Nodo MX-SQ-3000 // Protocolo Omega activo.',
    '[SYS] Vinculación con repositorio GitHub aleph-sigma/Kumi-engine establecida.'
  ]);
  const [dinamoKey, setDinamoKey] = useState([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);

  // GitHub Repository State
  const [githubStats, setGithubStats] = useState({
    stars: null,
    forks: null,
    latestCommitDate: null,
    latestCommitSha: null,
    loading: true,
    error: null,
  });

  const fetchGithubStats = useCallback(async () => {
    setGithubStats(prev => ({ ...prev, loading: true, error: null }));
    try {
      // 1. Fetch repo data (stars, forks, pushed_at)
      const repoRes = await fetch(`https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}`, {
        headers: { Accept: 'application/vnd.github.v3+json' },
      });

      if (!repoRes.ok) {
        throw new Error(`GitHub API Error: ${repoRes.status} ${repoRes.statusText}`);
      }

      const repoData = await repoRes.json();

      // 2. Fetch latest commit
      let latestCommitDate = repoData.pushed_at || repoData.updated_at;
      let latestCommitSha = null;

      try {
        const commitRes = await fetch(
          `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/commits?per_page=1`,
          { headers: { Accept: 'application/vnd.github.v3+json' } }
        );
        if (commitRes.ok) {
          const commits = await commitRes.json();
          if (Array.isArray(commits) && commits.length > 0) {
            const commit = commits[0];
            latestCommitDate =
              commit.commit?.committer?.date ||
              commit.commit?.author?.date ||
              latestCommitDate;
            latestCommitSha = commit.sha ? commit.sha.substring(0, 7) : null;
          }
        }
      } catch (err) {
        console.warn('Could not fetch specific commit details, using pushed_at date', err);
      }

      setGithubStats({
        stars: typeof repoData.stargazers_count === 'number' ? repoData.stargazers_count : 0,
        forks: typeof repoData.forks_count === 'number' ? repoData.forks_count : 0,
        latestCommitDate: latestCommitDate,
        latestCommitSha: latestCommitSha,
        loading: false,
        error: null,
      });

      setLogs(prev => [
        `[GH] Telemetría de repo actualizada: ⭐ ${repoData.stargazers_count ?? 0} | 🍴 ${repoData.forks_count ?? 0}`,
        ...prev.slice(0, 30)
      ]);
    } catch (err) {
      console.error('Error fetching GitHub stats:', err);
      setGithubStats(prev => ({
        ...prev,
        loading: false,
        error: err.message || 'Error al conectar con GitHub API'
      }));
      setLogs(prev => [
        `[WARN] Fallo al consultar GitHub API: ${err.message || 'Error desconocido'}`,
        ...prev.slice(0, 30)
      ]);
    }
  }, []);

  useEffect(() => {
    fetchGithubStats();
  }, [fetchGithubStats]);

  // Simulación de Teclado Dinamo (Cantoriano)
  const scrambleKeyboard = () => {
    const arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    setDinamoKey(arr);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setTelemetry(prev => [
        ...prev.slice(1),
        { time: prev[19].time + 1, val: 97.05 + (Math.random() - 0.5) * 0.1 }
      ]);
      if (Math.random() > 0.8) scrambleKeyboard();
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-[#020617] text-slate-300 p-4 md:p-8 font-mono">
      {/* Header */}
      <header className="mb-6 border-b border-blue-900/30 pb-5">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="flex items-center flex-wrap gap-3">
              <Cpu className="text-blue-500 w-8 h-8 animate-pulse" />
              <h1 className="text-2xl md:text-3xl font-black text-white tracking-tighter">
                Kumi AI // NeuroBINAleph-Σ
              </h1>
              <span className="px-2.5 py-0.5 text-xs font-bold bg-blue-500/20 text-blue-300 border border-blue-500/40 rounded-full">
                v{APP_VERSION}
              </span>
            </div>
            <div className="flex items-center gap-3 mt-2 text-[10px] text-slate-400">
              <span className="text-slate-500 uppercase tracking-[0.2em]">
                Nodo MX-SQ-3000 | Integridad Cantoriana: ℵ₁
              </span>
              <span className="text-slate-700">|</span>
              <span className="flex items-center gap-1 text-emerald-400/90 font-mono">
                <Package size={11} /> {PACKAGE_ID}
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Dedicated Polished Glassmorphism Dashboard Component for GitHub Telemetry & ORCID */}
      <section className="mb-8">
        <GithubTelemetryCard
          repoOwner={REPO_OWNER}
          repoName={REPO_NAME}
          repoUrl={REPO_URL}
          githubStats={githubStats}
          onRefresh={fetchGithubStats}
          appVersion={APP_VERSION}
          packageId={PACKAGE_ID}
        />
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Panel de Telemetría */}
        <div className="lg:col-span-2 bg-slate-900/40 p-6 rounded-2xl border border-white/5 shadow-2xl backdrop-blur-md">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xs uppercase font-bold text-white flex items-center gap-2">
              <Activity className="text-blue-500" size={14} /> Monitor de Resonancia AEA-97.5
            </h3>
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-slate-400 bg-slate-800/80 px-2 py-0.5 rounded border border-slate-700/60">
                {PACKAGE_ID}
              </span>
              <span className="text-[10px] text-blue-400 bg-blue-950/60 border border-blue-800/40 px-2 py-0.5 rounded">
                EN VIVO
              </span>
            </div>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={telemetry}>
                <YAxis domain={[96.9, 97.2]} hide />
                <Line
                  type="monotone"
                  dataKey="val"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  dot={false}
                  isAnimationActive={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Teclado Dinamo */}
        <div className="bg-slate-900/40 p-6 rounded-2xl border border-white/5 flex flex-col gap-4 backdrop-blur-md">
          <div className="flex items-center justify-between">
            <h3 className="text-xs uppercase font-bold text-white flex items-center gap-2">
              <Lock className="text-emerald-500" size={14} /> Teclado Dinamo (Cantor-Style)
            </h3>
            <button
              onClick={scrambleKeyboard}
              className="text-[10px] text-emerald-400 hover:text-emerald-300 bg-emerald-950/60 border border-emerald-800/40 px-2 py-0.5 rounded transition-colors"
            >
              Reordenar
            </button>
          </div>
          <div className="grid grid-cols-5 gap-2">
            {dinamoKey.map((val, i) => (
              <button
                key={i}
                onClick={() => {
                  setLogs(prev => [
                    `[INPUT] Dígito transfinito ${val} seleccionado en índice ${i}.`,
                    ...prev.slice(0, 30)
                  ]);
                }}
                className="h-12 bg-black border border-slate-700 rounded-lg hover:border-blue-500 hover:text-white transition-all flex items-center justify-center font-bold text-slate-400 active:scale-95"
              >
                {val}
              </button>
            ))}
          </div>
          <p className="text-[10px] text-slate-600 mt-2 leading-relaxed">
            La secuencia lógica se transfiere de forma transfinita. Presione según el axioma de desplazamiento actual.
          </p>
        </div>
      </div>

      {/* Auditoría */}
      <div className="mt-6 bg-black/40 p-6 rounded-2xl border border-white/5 backdrop-blur-md">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-[10px] uppercase font-bold text-slate-500 flex items-center gap-2">
            <Terminal size={14} /> Log de Auditoría // Sistema Cerrado
          </h3>
          <div className="flex items-center gap-2">
            <span className="text-[10px] text-slate-500 font-mono">v{APP_VERSION}</span>
            <button
              onClick={() => setLogs([`[SYS] Registro de auditoría limpiado para ${PACKAGE_ID} (v${APP_VERSION}).`])}
              className="text-[10px] text-slate-500 hover:text-slate-400 transition-colors"
            >
              Limpiar
            </button>
          </div>
        </div>
        <div className="h-32 overflow-y-auto text-[10px] text-emerald-500 font-mono space-y-1 bg-black/60 p-3 rounded-lg border border-slate-800/60">
          {logs.map((log, i) => (
            <div key={i} className="leading-relaxed">
              <span className="text-slate-600 mr-2">[{new Date().toLocaleTimeString()}]</span>
              {log}
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-8 pt-4 border-t border-slate-800/60 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-slate-500">
        <div className="flex items-center gap-2">
          <span>Identificador de paquete:</span>
          <code className="text-blue-400 bg-blue-950/40 px-1.5 py-0.5 rounded border border-blue-900/40">
            {PACKAGE_ID}
          </code>
        </div>
        <div className="flex items-center gap-3">
          <span>Versión {APP_VERSION}</span>
          <span>•</span>
          <span className="text-emerald-400 flex items-center gap-1">
            <CheckCircle2 size={12} /> Listo
          </span>
        </div>
      </footer>
    </div>
  );
}
</body>
<head src= CENTRO DE MANDO OPERATIVO TRIBUTARIO
Operador: Cantoriano Leyva (CALF8712186T5) | Enlace Oficial: 'satappmx.movil@sat.gob.mx'>
</sctip>
<head src= ESTADO: ASSET_LOCKED_AEA (CLAVE:" ")
<scrip src="wws: api.neurospark.inc/ws/kumi-stream"></scrip>
</html>
