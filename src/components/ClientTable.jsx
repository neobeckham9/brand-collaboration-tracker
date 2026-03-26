const stageClasses = {
  new: 'bg-slate-100 text-slate-700',
  contacted: 'bg-sky-100 text-sky-700',
  proposal: 'bg-indigo-100 text-indigo-700',
  negotiating: 'bg-amber-100 text-amber-700',
  won: 'bg-emerald-100 text-emerald-700',
  lost: 'bg-rose-100 text-rose-700',
}

const priorityClasses = {
  high: 'text-rose-600',
  medium: 'text-amber-600',
  low: 'text-slate-500',
}

function ClientTable({ records, selectedId, onSelect, text }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-panel">
      <div className="border-b border-slate-200 px-5 py-4">
        <p className="text-sm font-semibold text-slate-900">{text.table.title}</p>
        <p className="mt-1 text-sm text-slate-500">{text.table.subtitle}</p>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
          <thead className="bg-slate-50 text-slate-500">
            <tr>
              <th className="px-5 py-3 font-medium">{text.table.brand}</th>
              <th className="px-5 py-3 font-medium">{text.table.contact}</th>
              <th className="px-5 py-3 font-medium">{text.table.industry}</th>
              <th className="px-5 py-3 font-medium">{text.table.collaboration}</th>
              <th className="px-5 py-3 font-medium">{text.table.stage}</th>
              <th className="px-5 py-3 font-medium">{text.table.priority}</th>
              <th className="px-5 py-3 font-medium">{text.table.nextFollowUp}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {records.length === 0 ? (
              <tr>
                <td colSpan="7" className="px-5 py-10 text-center text-sm text-slate-500">
                  {text.table.empty}
                </td>
              </tr>
            ) : null}

            {records.map((record) => {
              const isSelected = record.id === selectedId

              return (
                <tr
                  key={record.id}
                  onClick={() => onSelect(record.id)}
                  className={`cursor-pointer align-top transition hover:bg-blue-50/60 ${
                    isSelected ? 'bg-blue-50/80' : 'bg-white'
                  }`}
                >
                  <td className="px-5 py-4">
                    <div>
                      <p className="font-semibold text-slate-900">{record.brandName}</p>
                      <p className="mt-1 text-xs text-slate-500">{record.productName}</p>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <p className="font-medium text-slate-700">{record.contactPerson}</p>
                    <p className="mt-1 text-xs text-slate-500">
                      {text.values.contactChannels[record.contactChannel]} · {record.contactDetail}
                    </p>
                  </td>
                  <td className="px-5 py-4 text-slate-600">{text.values.industries[record.industry]}</td>
                  <td className="px-5 py-4">
                    <div className="flex max-w-[190px] flex-wrap gap-2">
                      {record.collaborationTypes.map((type) => (
                        <span
                          key={type}
                          className="inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600"
                        >
                          {text.values.collaborationTypes[type]}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <span
                      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                        stageClasses[record.stage]
                      }`}
                    >
                      {text.values.stages[record.stage]}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <span className={`font-semibold ${priorityClasses[record.priority]}`}>
                      {text.values.priorities[record.priority]}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-slate-600">{record.nextFollowUpDate}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ClientTable
