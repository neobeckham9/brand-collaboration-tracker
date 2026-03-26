import { useEffect, useMemo, useState } from 'react'
import ClientDetail from './components/ClientDetail'
import ClientTable from './components/ClientTable'
import FilterBar from './components/FilterBar'
import RecordFormModal from './components/RecordFormModal'
import StatCard from './components/StatCard'
import {
  collaborationOptions,
  contactChannelOptions,
  industryOptions,
  priorityOptions,
  programStatusOptions,
  sameFrameTypeOptions,
  sampleRecords,
  stageOptions,
} from './data/mockData'
import { defaultLanguage, translations } from './i18n'

const STORAGE_KEY = 'brand-collaboration-tracker-records'

const defaultFilters = {
  stage: 'all',
  industry: 'all',
  collaborationType: 'all',
  priority: 'all',
}

function getInitialRecords() {
  if (typeof window === 'undefined') {
    return sampleRecords
  }

  const storedValue = window.localStorage.getItem(STORAGE_KEY)

  if (!storedValue) {
    return sampleRecords
  }

  try {
    const parsed = JSON.parse(storedValue)
    return Array.isArray(parsed) && parsed.length > 0
      ? parsed.map((record) => ({
          ...record,
          contactChannel: record.contactChannel === 'meeting' ? 'inPerson' : record.contactChannel,
          contactDetail: record.contactDetail ?? '',
          programStatus: record.programStatus ?? record.contentStatus ?? 'existingLicensed',
        }))
      : sampleRecords
  } catch {
    return sampleRecords
  }
}

function App() {
  const [language, setLanguage] = useState(defaultLanguage)
  const [records, setRecords] = useState(getInitialRecords)
  const [filters, setFilters] = useState(defaultFilters)
  const [selectedId, setSelectedId] = useState(getInitialRecords()[0]?.id ?? null)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingRecord, setEditingRecord] = useState(null)
  const t = translations[language]

  useEffect(() => {
    document.documentElement.lang = t.meta.htmlLang
    document.title = t.meta.documentTitle
  }, [t])

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(records))
  }, [records])

  const filteredRecords = useMemo(() => {
    return records.filter((record) => {
      const stageMatches = filters.stage === 'all' || record.stage === filters.stage
      const industryMatches = filters.industry === 'all' || record.industry === filters.industry
      const collaborationMatches =
        filters.collaborationType === 'all' || record.collaborationTypes.includes(filters.collaborationType)
      const priorityMatches = filters.priority === 'all' || record.priority === filters.priority

      return stageMatches && industryMatches && collaborationMatches && priorityMatches
    })
  }, [filters, records])

  const selectedRecord =
    filteredRecords.find((record) => record.id === selectedId) ??
    records.find((record) => record.id === selectedId) ??
    filteredRecords[0] ??
    null

  useEffect(() => {
    if (selectedRecord) {
      return
    }

    setSelectedId(filteredRecords[0]?.id ?? records[0]?.id ?? null)
  }, [filteredRecords, records, selectedRecord])

  const today = '2026-03-26'
  const followUpDueCount = records.filter((record) => record.nextFollowUpDate <= today).length

  const summaryCards = [
    {
      key: 'totalClients',
      value: records.length,
      tone: 'blue',
    },
    {
      key: 'negotiating',
      value: records.filter((record) => record.stage === 'negotiating').length,
      tone: 'amber',
    },
    {
      key: 'proposal',
      value: records.filter((record) => record.stage === 'proposal').length,
      tone: 'slate',
    },
    {
      key: 'won',
      value: records.filter((record) => record.stage === 'won').length,
      tone: 'green',
    },
    {
      key: 'followUpDue',
      value: followUpDueCount,
      tone: 'rose',
    },
  ]

  const formOptions = {
    contactChannels: contactChannelOptions,
    industries: industryOptions.filter((item) => item !== 'all'),
    programStatuses: programStatusOptions,
    collaborationTypes: collaborationOptions.filter((item) => item !== 'all'),
    sameFrameTypes: sameFrameTypeOptions,
    stages: stageOptions.filter((item) => item !== 'all'),
    priorities: priorityOptions.filter((item) => item !== 'all'),
  }

  const handleFilterChange = (key, value) => {
    setFilters((currentFilters) => ({
      ...currentFilters,
      [key]: value,
    }))
  }

  const handleResetFilters = () => {
    setFilters(defaultFilters)
  }

  const handleAddRecord = () => {
    setEditingRecord(null)
    setIsFormOpen(true)
  }

  const handleEditRecord = (record) => {
    setEditingRecord(record)
    setIsFormOpen(true)
  }

  const handleCloseForm = () => {
    setEditingRecord(null)
    setIsFormOpen(false)
  }

  const handleSaveRecord = (formData) => {
    if (editingRecord) {
      const updatedRecord = { ...editingRecord, ...formData }

      setRecords((current) =>
        current.map((record) => (record.id === editingRecord.id ? updatedRecord : record)),
      )
      setSelectedId(editingRecord.id)
    } else {
      const nextId = records.length > 0 ? Math.max(...records.map((record) => record.id)) + 1 : 1
      const newRecord = {
        id: nextId,
        ...formData,
      }

      setRecords((current) => [newRecord, ...current])
      setSelectedId(nextId)
    }

    handleCloseForm()
  }

  return (
    <div className="min-h-screen px-4 py-6 text-slate-900 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <header className="rounded-[28px] border border-slate-200 bg-white/90 p-6 shadow-panel backdrop-blur">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-3xl">
              <div className="inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-600">
                {t.header.eyebrow}
              </div>
              <h1 className="mt-4 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
                {t.header.titleEn}
              </h1>
              <p className="mt-2 text-xl font-medium tracking-wide text-slate-600 sm:text-2xl">
                {t.header.titleZh}
              </p>
              <p className="mt-4 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
                {t.header.subtitle}
              </p>
            </div>

            <div className="flex flex-col items-stretch gap-3 lg:items-end">
              <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 p-1 text-sm shadow-sm">
                <span className="px-2 text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
                  {t.languageToggle.label}
                </span>
                {['zh', 'en'].map((option) => {
                  const isActive = language === option

                  return (
                    <button
                      key={option}
                      type="button"
                      onClick={() => setLanguage(option)}
                      className={`rounded-full px-3 py-1.5 font-medium transition ${
                        isActive
                          ? 'bg-slate-900 text-white'
                          : 'text-slate-600 hover:bg-white hover:text-slate-900'
                      }`}
                    >
                      {t.languageToggle[option]}
                    </button>
                  )
                })}
              </div>

              <button
                type="button"
                onClick={handleAddRecord}
                className="h-11 rounded-xl bg-slate-900 px-5 text-sm font-medium text-white transition hover:bg-slate-800"
              >
                {t.header.addButton}
              </button>
            </div>
          </div>

          <div className="mt-6 grid gap-3 rounded-2xl bg-slate-50 p-4 sm:grid-cols-2">
            <div>
              <p className="text-xs uppercase tracking-[0.14em] text-slate-500">{t.header.focusLabel}</p>
              <p className="mt-1 text-sm font-semibold text-slate-800">{t.header.focusText}</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.14em] text-slate-500">{t.header.coverageLabel}</p>
              <p className="mt-1 text-sm font-semibold text-slate-800">{t.header.coverageText}</p>
            </div>
          </div>
        </header>

        <section className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          {summaryCards.map((card) => (
            <StatCard
              key={card.key}
              label={t.summary[card.key].label}
              value={card.value}
              helper={t.summary[card.key].helper}
              tone={card.tone}
            />
          ))}
        </section>

        <section className="mt-6">
          <FilterBar
            filters={filters}
            options={{
              stages: stageOptions,
              industries: industryOptions,
              collaborations: collaborationOptions,
              priorities: priorityOptions,
            }}
            text={t}
            onChange={handleFilterChange}
            onReset={handleResetFilters}
          />
        </section>

        <section className="mt-6 grid gap-6 xl:grid-cols-[minmax(0,1.6fr)_minmax(360px,0.9fr)]">
          <div className="space-y-4">
            <div className="flex items-center justify-between gap-3 px-1">
              <div>
                <p className="text-sm font-semibold text-slate-900">{t.list.title}</p>
                <p className="mt-1 text-sm text-slate-500">{t.list.matchedCount(filteredRecords.length)}</p>
                <p className="mt-1 text-sm text-slate-500">{t.list.helper}</p>
              </div>
              <button
                type="button"
                onClick={handleAddRecord}
                className="hidden h-10 rounded-xl border border-slate-200 bg-white px-4 text-sm font-medium text-slate-700 transition hover:bg-slate-50 sm:inline-flex sm:items-center"
              >
                {t.list.addButton}
              </button>
            </div>

            <ClientTable
              records={filteredRecords}
              selectedId={selectedRecord?.id ?? null}
              onSelect={setSelectedId}
              text={t}
            />
          </div>

          <ClientDetail record={selectedRecord} text={t} onEdit={handleEditRecord} />
        </section>
      </div>

      <RecordFormModal
        isOpen={isFormOpen}
        mode={editingRecord ? 'edit' : 'create'}
        initialRecord={editingRecord}
        text={t}
        options={formOptions}
        onClose={handleCloseForm}
        onSave={handleSaveRecord}
      />
    </div>
  )
}

export default App
