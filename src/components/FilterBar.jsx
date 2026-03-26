function FilterBar({ filters, options, text, onChange, onReset }) {
  const selectClassName =
    'h-11 rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-100'

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-panel">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-sm font-semibold text-slate-900">{text.filters.title}</p>
          <p className="mt-1 text-sm text-slate-500">{text.filters.subtitle}</p>
        </div>
        <button
          type="button"
          onClick={onReset}
          className="h-11 rounded-xl border border-slate-200 px-4 text-sm font-medium text-slate-600 transition hover:bg-slate-50"
        >
          {text.filters.reset}
        </button>
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <label className="flex flex-col gap-2">
          <span className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">{text.filters.stage}</span>
          <select
            className={selectClassName}
            value={filters.stage}
            onChange={(event) => onChange('stage', event.target.value)}
          >
            {options.stages.map((stage) => (
              <option key={stage} value={stage}>
                {text.values.stages[stage]}
              </option>
            ))}
          </select>
        </label>

        <label className="flex flex-col gap-2">
          <span className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">{text.filters.industry}</span>
          <select
            className={selectClassName}
            value={filters.industry}
            onChange={(event) => onChange('industry', event.target.value)}
          >
            {options.industries.map((industry) => (
              <option key={industry} value={industry}>
                {text.values.industries[industry]}
              </option>
            ))}
          </select>
        </label>

        <label className="flex flex-col gap-2">
          <span className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">{text.filters.collaboration}</span>
          <select
            className={selectClassName}
            value={filters.collaborationType}
            onChange={(event) => onChange('collaborationType', event.target.value)}
          >
            {options.collaborations.map((type) => (
              <option key={type} value={type}>
                {text.values.collaborationTypes[type]}
              </option>
            ))}
          </select>
        </label>

        <label className="flex flex-col gap-2">
          <span className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">{text.filters.priority}</span>
          <select
            className={selectClassName}
            value={filters.priority}
            onChange={(event) => onChange('priority', event.target.value)}
          >
            {options.priorities.map((priority) => (
              <option key={priority} value={priority}>
                {text.values.priorities[priority]}
              </option>
            ))}
          </select>
        </label>
      </div>
    </div>
  )
}

export default FilterBar
