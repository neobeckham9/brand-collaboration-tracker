/**
 * Captures a DOM element as a PDF and triggers a browser download.
 *
 * Uses html2canvas to render the element (preserving CJK fonts rendered by the
 * browser) and jsPDF to produce the final A4 document.  Long reports are split
 * across multiple pages automatically.
 *
 * @param {HTMLElement} element  The DOM node to capture
 * @param {string}      filename Download filename, e.g. "report-Nike.pdf"
 */
export async function generatePdfReport(element, filename) {
  const { default: html2canvas } = await import('html2canvas')
  const { default: jsPDF } = await import('jspdf')

  const canvas = await html2canvas(element, {
    scale: 2,           // 2x resolution for sharper text
    useCORS: true,
    backgroundColor: '#ffffff',
    logging: false,
  })

  const imgData = canvas.toDataURL('image/jpeg', 0.95)

  const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' })
  const pageW = pdf.internal.pageSize.getWidth()   // 210 mm
  const pageH = pdf.internal.pageSize.getHeight()  // 297 mm

  // Scale the captured image to fill the full page width
  const imgW = pageW
  const imgH = (canvas.height / canvas.width) * imgW

  let heightLeft = imgH
  let yOffset = 0

  pdf.addImage(imgData, 'JPEG', 0, 0, imgW, imgH)
  heightLeft -= pageH

  while (heightLeft > 0) {
    yOffset += pageH
    pdf.addPage()
    pdf.addImage(imgData, 'JPEG', 0, -yOffset, imgW, imgH)
    heightLeft -= pageH
  }

  pdf.save(filename)
}
