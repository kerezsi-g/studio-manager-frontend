interface ContentItem {
  contentType: string // e.g., "image/jpeg", "audio/x-wav"
  size: number // Size in bytes
  fileId: string
}

interface SubTypeStats {
  type: string // e.g., "x-wav", "x-flac"
  size: number
}

interface BaseTypeStats {
  type: string // e.g., "image", "audio", "video"
  totalSize: number
  subTypes: SubTypeStats[]
}

interface ContentSizeStatistics {
  totalSize: number
  contentTypes: BaseTypeStats[]
}

/**
 * Calculates comprehensive size statistics for an array of content items,
 * grouped hierarchically by content type and subtype.
 *
 * @param items An array of objects, where each object has a `contentType` (mime-type)
 * and a `size` property.
 * @returns An object containing total size and hierarchical content type statistics.
 */
export function getContentSizeStatistics(items: ContentItem[]): ContentSizeStatistics {
  const statistics: ContentSizeStatistics = {
    totalSize: 0,
    contentTypes: [],
  }

  const processedFiles = new Set<string>()

  const baseTypeMap = new Map<string, BaseTypeStats>()

  for (const item of items) {
    if (processedFiles.has(item.fileId)) {
      continue
    }

    processedFiles.add(item.fileId)

    statistics.totalSize += item.size

    const [baseType, subType] = item.contentType.split('/')

    if (!baseType) {
      continue // Skip malformed content types
    }

    let currentBaseTypeStats = baseTypeMap.get(baseType)
    if (!currentBaseTypeStats) {
      currentBaseTypeStats = {
        type: baseType,
        totalSize: 0,
        subTypes: [],
      }
      baseTypeMap.set(baseType, currentBaseTypeStats)
    }

    currentBaseTypeStats.totalSize += item.size

    // Find or create subType entry
    let currentSubTypeStats = currentBaseTypeStats.subTypes.find((sub) => sub.type === subType)

    if (!currentSubTypeStats) {
      currentSubTypeStats = {
        type: subType || 'unknown', // Handle cases like "application/"
        size: 0,
      }
      currentBaseTypeStats.subTypes.push(currentSubTypeStats)
    }

    currentSubTypeStats.size += item.size
  }

  // Convert the Map to an array and sort
  statistics.contentTypes = Array.from(baseTypeMap.values()).sort((a, b) =>
    a.type.localeCompare(b.type),
  )

  // Sort subTypes within each baseType
  statistics.contentTypes.forEach((baseType) => {
    baseType.subTypes.sort((a, b) => a.type.localeCompare(b.type))
  })

  return statistics
}
