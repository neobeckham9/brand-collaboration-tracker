function DetailRow({ label, value }) {
  return (
    <div className="grid gap-1 border-b border-slate-100 py-3 last:border-b-0 md:grid-cols-[170px_1fr]">
      <dt className="text-sm font-medium text-slate-500">{label}</dt>
      <dd className="text-sm leading-6 text-slate-800">{value || '-'}</dd>
    </div>
  )
}

function DetailSection({ title, children }) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-panel">
      <p className="text-sm font-semibold text-slate-900">{title}</p>
      <dl className="mt-4">{children}</dl>
    </section>
  )
}

function ClientDetail({ record, text, onEdit }) {
  if (!record) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-6 text-sm text-slate-500 shadow-panel">
        {text.detail.empty}
      </div>
    )
  }

  const collaborationValue =
    record.collaborationTypes.length > 0
      ? record.collaborationTypes.map((type) => text.values.collaborationTypes[type]).join(', ')
      : text.detail.noCollaboration

  const sameFrameValue =
    record.sameFrameRequired === 'yes'
      ? `${text.values.sameFrameRequirement.yes} / ${text.values.sameFrameTypes[record.sameFrameType]}`
      : text.values.sameFrameRequirement.no

  return (
    <div className="space-y-5">
      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-panel">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-lg font-semibold text-slate-900">{record.brandName}</p>
            <p className="mt-1 text-sm text-slate-500">
              {record.contactPerson} · {text.values.contactChannels[record.contactChannel]}
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              <span className="inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                {text.detail.stage}: {text.values.stages[record.stage]}
              </span>
              <span className="inline-flex rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700">
                {text.detail.priority}: {text.values.priorities[record.priority]}
              </span>
            </div>
          </div>
          <div className="flex flex-col items-end gap-3">
            <div className="rounded-xl bg-slate-100 px-3 py-2 text-right">
              <p className="text-xs uppercase tracking-[0.14em] text-slate-500">{text.detail.nextFollowUp}</p>
              <p className="mt-1 text-sm font-semibold text-slate-700">{record.nextFollowUpDate}</p>
            </div>
            <button
              type="button"
              onClick={() => onEdit(record)}
              className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
            >
              {text.detail.edit}
            </button>
          </div>
        </div>
      </section>

      <DetailSection title={text.detail.clientInfo}>
        <DetailRow label={text.detail.brandName} value={record.brandName} />
        <DetailRow label={text.detail.contactPerson} value={record.contactPerson} />
        <DetailRow label={text.detail.contactChannel} value={text.values.contactChannels[record.contactChannel]} />
        <DetailRow label={text.detail.contactDetail} value={record.contactDetail} />
        <DetailRow label={text.detail.industry} value={text.values.industries[record.industry]} />
      </DetailSection>

      <DetailSection title={text.detail.productAudience}>
        <DetailRow label={text.detail.productName} value={record.productName} />
        <DetailRow label={text.detail.productFeature} value={record.productFeature} />
        <DetailRow label={text.detail.targetAudience} value={record.targetAudience} />
      </DetailSection>

      <DetailSection title={text.detail.campaignRequirement}>
        <DetailRow label={text.detail.intendedProgram} value={record.intendedProgram} />
        <DetailRow label={text.detail.programStatus} value={text.values.programStatuses[record.programStatus]} />
        <DetailRow label={text.detail.collaborationType} value={collaborationValue} />
        <DetailRow label={text.detail.budget} value={record.budget} />
        <DetailRow label={text.detail.sameFrameRequirement} value={sameFrameValue} />
        <DetailRow label={text.detail.specialRequirements} value={record.specialRequirements} />
      </DetailSection>

      <DetailSection title={text.detail.followUpNotes}>
        <DetailRow label={text.detail.notes} value={record.notes} />
      </DetailSection>
    </div>
  )
}

export default ClientDetail
