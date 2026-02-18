export type EmbeddingUsage = {
	prompt_tokens: number
	total_tokens: number
}

export type EmbeddingData = {
	embedding: number[]
	index: number
	object: string | 'list'
}

export type EmbeddingResponse = {
	model: string
	object: string | 'embedding'
	usage: EmbeddingUsage
	data: EmbeddingData[]
}
