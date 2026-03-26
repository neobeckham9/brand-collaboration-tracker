import { useEffect, useMemo, useState } from 'react'

function FormField({ label, required = false, children }) {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
        {label}
        {required ? ' *' : ''}
      </span>
      {children}
    </label>
  )
}

function RecordFormModal({
  isOpen,
  mode,
  initialRecord,
  text,
  options,
  onClose,
  onSave,
}) {
  const createEmptyRecord = useMemo(
    () => () => ({
      brandName: '',
      contactPerson: '',
      contactChannel: 'email',
      contactDetail: '',
      industry: 'beauty',
      productName: '',
      productFeature: '',
      targetAudience: '',
      intendedProgram: '',
      programStatus: 'existingLicensed',
      collaborationTypes: [],
      budget: '',
      sameFrameRequired: 'no',
      sameFrameType: 'notRequired',
      specialRequirements: '',
      stage: 'new',
      priority: 'medium',
      nextFollowUpDate: '',
      notes: '',
    }),
    [],
  )

  const [formData, setFormData] = useState(createEmptyRecord)
  const [showValidation, setShowValidation] = useState(false)

  useEffect(() => {
    if (!isOpen) {
      return
    }

    setFormData(initialRecord ?? createEmptyRecord())
    setShowValidation(false)
  }, [createEmptyRecord, initialRecord, isOpen])

  if (!isOpen) {
    return null
  }

  const inputClassName =
    'h-11 rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-100'
  const textareaClassName =
    'min-h-[96px] rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm text-slate-700 outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-100'

  const requiredFields = [
    formData.brandName.trim(),
    formData.contactPerson.trim(),
    formData.contactDetail.trim(),
    formData.productName.trim(),
    formData.intendedProgram.trim(),
    formData.budget.trim(),
    formData.nextFollowUpDate.trim(),
  ]

  const isValid = requiredFields.every(Boolean) && formData.collaborationTypes.length > 0

  const handleChange = (key, value) => {
    setFormData((current) => ({
      ...current,
      [key]: value,
    }))
  }

  const handleCollaborationToggle = (value) => {
    setFormData((current) => {
      const exists = current.collaborationTypes.includes(value)

      return {
        ...current,
        collaborationTypes: exists
          ? current.collaborationTypes.filter((item) => item !== value)
          : [...current.collaborationTypes, value],
      }
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    if (!isValid) {
      setShowValidation(true)
      return
    }

    onSave(formData)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-slate-950/35 px-4 py-8">
      <div className="w-full max-w-5xl rounded-[28px] border border-slate-200 bg-slate-50 shadow-2xl">
        <div className="flex items-start justify-between gap-4 border-b border-slate-200 bg-white px-6 py-5">
          <div>
            <p className="text-lg font-semibold text-slate-950">
              {mode === 'edit' ? text.form.editTitle : text.form.addTitle}
            </p>
            <p className="mt-1 text-sm text-slate-500">{text.form.subtitle}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-slate-200 px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-50"
          >
            {text.form.cancel}
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 p-6">
          <div className="grid gap-6 xl:grid-cols-2">
            <section className="rounded-2xl border border-slate-200 bg-white p-5">
              <div>
                <p className="text-sm font-semibold text-slate-900">{text.form.clientInfo}</p>
                <p className="mt-1 text-sm text-slate-500">{text.form.requiredHint}</p>
              </div>
              <div className="mt-5 grid gap-4 md:grid-cols-2">
                <FormField label={text.form.brandName} required>
                  <input
                    className={inputClassName}
                    value={formData.brandName}
                    onChange={(event) => handleChange('brandName', event.target.value)}
                  />
                </FormField>
                <FormField label={text.form.contactPerson} required>
                  <input
                    className={inputClassName}
                    value={formData.contactPerson}
                    onChange={(event) => handleChange('contactPerson', event.target.value)}
                  />
                </FormField>
                <FormField label={text.form.contactChannel}>
                  <select
                    className={inputClassName}
                    value={formData.contactChannel}
                    onChange={(event) => handleChange('contactChannel', event.target.value)}
                  >
                    {options.contactChannels.map((item) => (
                      <option key={item} value={item}>
                        {text.values.contactChannels[item]}
                      </option>
                    ))}
                  </select>
                </FormField>
                <FormField label={text.form.contactDetail} required>
                  <input
                    className={inputClassName}
                    value={formData.contactDetail}
                    onChange={(event) => handleChange('contactDetail', event.target.value)}
                  />
                </FormField>
                <FormField label={text.form.industry}>
                  <select
                    className={inputClassName}
                    value={formData.industry}
                    onChange={(event) => handleChange('industry', event.target.value)}
                  >
                    {options.industries.map((item) => (
                      <option key={item} value={item}>
                        {text.values.industries[item]}
                      </option>
                    ))}
                  </select>
                </FormField>
              </div>
            </section>

            <section className="rounded-2xl border border-slate-200 bg-white p-5">
              <div>
                <p className="text-sm font-semibold text-slate-900">{text.form.productAudience}</p>
              </div>
              <div className="mt-5 grid gap-4">
                <FormField label={text.form.productName} required>
                  <input
                    className={inputClassName}
                    value={formData.productName}
                    onChange={(event) => handleChange('productName', event.target.value)}
                  />
                </FormField>
                <FormField label={text.form.productFeature}>
                  <textarea
                    className={textareaClassName}
                    value={formData.productFeature}
                    onChange={(event) => handleChange('productFeature', event.target.value)}
                  />
                </FormField>
                <FormField label={text.form.targetAudience}>
                  <textarea
                    className={textareaClassName}
                    value={formData.targetAudience}
                    onChange={(event) => handleChange('targetAudience', event.target.value)}
                  />
                </FormField>
              </div>
            </section>

            <section className="rounded-2xl border border-slate-200 bg-white p-5">
              <div>
                <p className="text-sm font-semibold text-slate-900">{text.form.campaignRequirement}</p>
              </div>
              <div className="mt-5 grid gap-4">
                <FormField label={text.form.intendedProgram} required>
                  <input
                    className={inputClassName}
                    value={formData.intendedProgram}
                    onChange={(event) => handleChange('intendedProgram', event.target.value)}
                  />
                </FormField>
                <div className="grid gap-4 md:grid-cols-2">
                  <FormField label={text.form.programStatus}>
                    <select
                      className={inputClassName}
                      value={formData.programStatus}
                      onChange={(event) => handleChange('programStatus', event.target.value)}
                    >
                      {options.programStatuses.map((item) => (
                        <option key={item} value={item}>
                          {text.values.programStatuses[item]}
                        </option>
                      ))}
                    </select>
                  </FormField>
                  <FormField label={text.form.budget} required>
                    <input
                      className={inputClassName}
                      value={formData.budget}
                      onChange={(event) => handleChange('budget', event.target.value)}
                    />
                  </FormField>
                </div>
                <FormField label={text.form.collaborationType}>
                  <div className="flex flex-wrap gap-2 rounded-2xl border border-slate-200 bg-slate-50 p-3">
                    {options.collaborationTypes.map((item) => {
                      const isActive = formData.collaborationTypes.includes(item)

                      return (
                        <button
                          key={item}
                          type="button"
                          onClick={() => handleCollaborationToggle(item)}
                          className={`rounded-full px-3 py-2 text-sm font-medium transition ${
                            isActive
                              ? 'bg-slate-900 text-white'
                              : 'bg-white text-slate-600 ring-1 ring-slate-200 hover:bg-slate-100'
                          }`}
                        >
                          {text.values.collaborationTypes[item]}
                        </button>
                      )
                    })}
                  </div>
                  {showValidation && formData.collaborationTypes.length === 0 ? (
                    <span className="text-sm text-rose-600">{text.form.noStageHint}</span>
                  ) : null}
                </FormField>
                <div className="grid gap-4 md:grid-cols-2">
                  <FormField label={text.form.sameFrameRequirement}>
                    <select
                      className={inputClassName}
                      value={formData.sameFrameRequired}
                      onChange={(event) => handleChange('sameFrameRequired', event.target.value)}
                    >
                      {['yes', 'no'].map((item) => (
                        <option key={item} value={item}>
                          {text.values.sameFrameRequirement[item]}
                        </option>
                      ))}
                    </select>
                  </FormField>
                  <FormField label={text.form.sameFrameType}>
                    <select
                      className={inputClassName}
                      value={formData.sameFrameType}
                      onChange={(event) => handleChange('sameFrameType', event.target.value)}
                    >
                      {options.sameFrameTypes.map((item) => (
                        <option key={item} value={item}>
                          {text.values.sameFrameTypes[item]}
                        </option>
                      ))}
                    </select>
                  </FormField>
                </div>
                <FormField label={text.form.specialRequirements}>
                  <textarea
                    className={textareaClassName}
                    value={formData.specialRequirements}
                    onChange={(event) => handleChange('specialRequirements', event.target.value)}
                  />
                </FormField>
              </div>
            </section>

            <section className="rounded-2xl border border-slate-200 bg-white p-5">
              <div>
                <p className="text-sm font-semibold text-slate-900">{text.form.workflow}</p>
              </div>
              <div className="mt-5 grid gap-4 md:grid-cols-2">
                <FormField label={text.form.stage}>
                  <select
                    className={inputClassName}
                    value={formData.stage}
                    onChange={(event) => handleChange('stage', event.target.value)}
                  >
                    {options.stages.map((item) => (
                      <option key={item} value={item}>
                        {text.values.stages[item]}
                      </option>
                    ))}
                  </select>
                </FormField>
                <FormField label={text.form.priority}>
                  <select
                    className={inputClassName}
                    value={formData.priority}
                    onChange={(event) => handleChange('priority', event.target.value)}
                  >
                    {options.priorities.map((item) => (
                      <option key={item} value={item}>
                        {text.values.priorities[item]}
                      </option>
                    ))}
                  </select>
                </FormField>
                <FormField label={text.form.nextFollowUpDate} required>
                  <input
                    type="date"
                    className={inputClassName}
                    value={formData.nextFollowUpDate}
                    onChange={(event) => handleChange('nextFollowUpDate', event.target.value)}
                  />
                </FormField>
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
                    {text.storage.keyLabel}
                  </p>
                  <p className="mt-2 text-sm text-slate-600">{text.storage.helper}</p>
                </div>
              </div>
              <div className="mt-4">
                <FormField label={text.form.notes}>
                  <textarea
                    className={textareaClassName}
                    value={formData.notes}
                    onChange={(event) => handleChange('notes', event.target.value)}
                  />
                </FormField>
              </div>
            </section>
          </div>

          {showValidation && !isValid ? (
            <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
              {text.form.validationMessage}
            </div>
          ) : null}

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="h-11 rounded-xl border border-slate-200 bg-white px-5 text-sm font-medium text-slate-600 transition hover:bg-slate-50"
            >
              {text.form.cancel}
            </button>
            <button
              type="submit"
              className="h-11 rounded-xl bg-slate-900 px-5 text-sm font-medium text-white transition hover:bg-slate-800"
            >
              {mode === 'edit' ? text.form.update : text.form.create}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default RecordFormModal
