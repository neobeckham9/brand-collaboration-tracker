import { forwardRef } from 'react'

// ─── Helpers ──────────────────────────────────────────────────────────────────

function Row({ label, value }) {
  return (
    <tr>
      <td
        style={{
          width: '180px',
          padding: '8px 12px 8px 0',
          verticalAlign: 'top',
          color: '#64748b',
          fontSize: '12px',
          fontWeight: '500',
          whiteSpace: 'nowrap',
          borderBottom: '1px solid #f1f5f9',
        }}
      >
        {label}
      </td>
      <td
        style={{
          padding: '8px 0',
          color: '#1e293b',
          fontSize: '13px',
          lineHeight: '1.6',
          borderBottom: '1px solid #f1f5f9',
        }}
      >
        {value || <span style={{ color: '#94a3b8' }}>—</span>}
      </td>
    </tr>
  )
}

function Section({ number, title, children }) {
  return (
    <div style={{ marginBottom: '28px' }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          marginBottom: '12px',
        }}
      >
        <div
          style={{
            width: '24px',
            height: '24px',
            borderRadius: '6px',
            backgroundColor: '#1e3a5f',
            color: '#ffffff',
            fontSize: '11px',
            fontWeight: '700',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          {number}
        </div>
        <p
          style={{
            fontSize: '13px',
            fontWeight: '700',
            color: '#1e293b',
            letterSpacing: '0.02em',
            margin: 0,
          }}
        >
          {title}
        </p>
      </div>
      <div
        style={{
          borderRadius: '8px',
          border: '1px solid #e2e8f0',
          padding: '4px 16px',
          backgroundColor: '#fafafa',
        }}
      >
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <tbody>{children}</tbody>
        </table>
      </div>
    </div>
  )
}

// ─── Main component ────────────────────────────────────────────────────────────

const ReportTemplate = forwardRef(function ReportTemplate({ record, text }, ref) {
  if (!record) return null

  const t = text

  // Derived values (mirrors ClientDetail logic)
  const collaborationValue =
    record.collaborationTypes.length > 0
      ? record.collaborationTypes.map((type) => t.values.collaborationTypes[type]).join(', ')
      : '—'

  const sameFrameValue =
    record.sameFrameRequired === 'yes'
      ? `${t.values.sameFrameRequirement.yes} — ${t.values.sameFrameTypes[record.sameFrameType]}`
      : t.values.sameFrameRequirement.no

  const collaborationDirection =
    record.intendedProgram
      ? `${record.intendedProgram}${collaborationValue !== '—' ? ` (${collaborationValue})` : ''}`
      : '—'

  const today = new Date().toISOString().slice(0, 10)

  const r = t.report

  return (
    <div
      ref={ref}
      style={{
        width: '794px',
        backgroundColor: '#ffffff',
        fontFamily: '"PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "STHeiti", Arial, sans-serif',
        color: '#1e293b',
      }}
    >
      {/* ── Header bar ─────────────────────────────────────────── */}
      <div
        style={{
          backgroundColor: '#1e3a5f',
          padding: '32px 48px 28px',
        }}
      >
        <p
          style={{
            fontSize: '11px',
            fontWeight: '600',
            letterSpacing: '0.12em',
            color: '#93c5fd',
            textTransform: 'uppercase',
            margin: '0 0 8px',
          }}
        >
          {r.eyebrow}
        </p>
        <p
          style={{
            fontSize: '22px',
            fontWeight: '700',
            color: '#ffffff',
            margin: '0 0 4px',
          }}
        >
          {record.brandName}
        </p>
        <p
          style={{
            fontSize: '13px',
            color: '#93c5fd',
            margin: '0 0 20px',
          }}
        >
          {r.title}
        </p>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '20px',
            paddingTop: '16px',
            borderTop: '1px solid rgba(255,255,255,0.15)',
          }}
        >
          <MetaChip label={r.generatedOn} value={today} />
          <MetaChip label={r.stageLabel} value={t.values.stages[record.stage]} />
          <MetaChip label={r.priorityLabel} value={t.values.priorities[record.priority]} />
          <div style={{ marginLeft: 'auto' }}>
            <span
              style={{
                fontSize: '10px',
                fontWeight: '600',
                letterSpacing: '0.1em',
                color: '#fbbf24',
                textTransform: 'uppercase',
                border: '1px solid #fbbf24',
                borderRadius: '4px',
                padding: '3px 8px',
              }}
            >
              {r.internalOnly}
            </span>
          </div>
        </div>
      </div>

      {/* ── Body ───────────────────────────────────────────────── */}
      <div style={{ padding: '32px 48px 40px' }}>
        {/* Section 1: Client Info */}
        <Section number="1" title={r.sections.clientInfo}>
          <Row label={t.detail.brandName} value={record.brandName} />
          <Row label={t.detail.contactPerson} value={record.contactPerson} />
          <Row label={t.detail.industry} value={t.values.industries[record.industry]} />
          <Row
            label={t.detail.contactDetail}
            value={`${t.values.contactChannels[record.contactChannel]} · ${record.contactDetail}`}
          />
        </Section>

        {/* Section 2: Collaboration Overview */}
        <Section number="2" title={r.sections.collaborationOverview}>
          <Row label={t.detail.productName} value={record.productName} />
          <Row label={t.detail.productFeature} value={record.productFeature} />
          <Row label={t.detail.targetAudience} value={record.targetAudience} />
          <Row label={t.detail.intendedProgram} value={record.intendedProgram} />
          <Row label={t.detail.programStatus} value={t.values.programStatuses[record.programStatus]} />
          <Row label={t.detail.collaborationType} value={collaborationValue} />
          <Row label={t.detail.budget} value={record.budget} />
          <Row label={t.detail.sameFrameRequirement} value={sameFrameValue} />
        </Section>

        {/* Section 3: Opportunity Summary */}
        <Section number="3" title={r.sections.opportunitySummary}>
          <Row label={r.fields.currentStage} value={t.values.stages[record.stage]} />
          <Row label={r.fields.collaborationDirection} value={collaborationDirection} />
          <Row label={t.detail.specialRequirements} value={record.specialRequirements} />
        </Section>

        {/* Section 4: Follow-up Summary */}
        <Section number="4" title={r.sections.followUpSummary}>
          <Row label={r.fields.latestNotes} value={record.notes} />
          <Row label={r.fields.nextFollowUpDate} value={record.nextFollowUpDate} />
          <Row label={r.fields.suggestedNextStep} value={r.nextSteps[record.stage]} />
        </Section>

        {/* Footer */}
        <div
          style={{
            marginTop: '32px',
            paddingTop: '16px',
            borderTop: '1px solid #e2e8f0',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <p style={{ fontSize: '11px', color: '#94a3b8', margin: 0 }}>
            {r.footerNote}
          </p>
          <p style={{ fontSize: '11px', color: '#94a3b8', margin: 0 }}>
            {r.generatedOn}: {today}
          </p>
        </div>
      </div>
    </div>
  )
})

function MetaChip({ label, value }) {
  return (
    <div>
      <p
        style={{
          fontSize: '10px',
          color: '#93c5fd',
          margin: '0 0 2px',
          letterSpacing: '0.06em',
          textTransform: 'uppercase',
        }}
      >
        {label}
      </p>
      <p style={{ fontSize: '12px', color: '#e2e8f0', fontWeight: '600', margin: 0 }}>
        {value}
      </p>
    </div>
  )
}

export default ReportTemplate
