export interface Adapter<TInput, TOutput> {
  adapt(data: TInput): TOutput;
}
