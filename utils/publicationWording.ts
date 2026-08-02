export const publicationWordingGuidance = 'Use "Research submitted to IEEE Transactions on Multimedia" / "研究成果已投稿至 IEEE Transactions on Multimedia".'

const forbiddenPublicationPatterns = [
  /published\s+in\s+IEEE/i,
  /accepted\s+by\s+IEEE/i,
  /IEEE[^\n.]{0,80}\b(?:published|accepted)\b/i,
  /(?:已?發表於|已?接受|已?刊登)[^\n。]{0,80}IEEE/i,
  /IEEE[^\n。]{0,80}(?:已?發表|已?接受|已?刊登)/i
]

export const hasPublicationWordingViolation = (text: string) =>
  forbiddenPublicationPatterns.some(pattern => pattern.test(text))
