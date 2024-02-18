export interface IResponse<T> {
	page: number
	next: string
	entries: number
	results: T
}
