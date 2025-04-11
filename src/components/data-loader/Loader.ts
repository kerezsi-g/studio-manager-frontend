import { shallowReactive } from 'vue'

type Handler<T> = (data: T) => unknown

export type AsyncFunction<Result, Param> = (args?: Param) => PromiseLike<Result>

interface LoaderOptions<T> {
  fallback?: T
  collate?: (oldResult: T, newResult: T) => T
  flushOnError?: boolean
}

/**
 * Represents the state of the asynchronous data loader.
 */
interface LoaderState<T> {
  pending: boolean
  loaded: boolean
  error: unknown
  data: T | null
}

/**
 * A utility class for handling asynchronous data loading in a Vue 3 component.
 */
export class Loader<Result, Param> {
  private _currentInstance?: unknown
  private _args?: Param
  private _onLoadHandlers: Handler<Result>[] = []

  private _config: LoaderOptions<Result>
  //   private _fallback?: Result

  private _calls_counter = 0
  private _success_counter = 0

  public lastLoad: Date | undefined

  public state: LoaderState<Result>

  private _runOnLoadHandlers = async (res: Result) => {
    for (const h of this._onLoadHandlers) {
      await h(res)
    }
  }

  private _handleSuccessfulLoad(result: Result) {
    if (this._success_counter === 0 || this._config.collate === undefined) {
      this.state.data = result
    }

    if (this._config.collate && this._success_counter > 0) {
      this.state.data = this._config.collate(this.state.data!, result)
    }

    this.state.loaded = true
    this._success_counter++
    this.lastLoad = new Date()
    this._runOnLoadHandlers(result)
  }

  constructor(
    private provider: AsyncFunction<Result, Param>,
    { fallback, collate, flushOnError = false }: LoaderOptions<Result>,
  ) {
    /** Initialize state	 */
    this.state = shallowReactive({
      pending: false,
      loaded: false,
      error: null,
      data: fallback ?? null,
    })

    this._config = {
      fallback,
      collate,
      flushOnError,
    }
  }

  /**
   * Refreshes the data source with the last known arguments.
   * @returns {Promise<Result | null>} A Promise resolving to the loaded data or null if the loading fails.
   */
  public refresh = async () => {
    if (this._args) {
      await this.load(this._args)
    }
  }

  /**
   * Registers a callback function to be executed when the data is successfully loaded.
   * @param {Handler<Result>} cb - The callback function to be executed on successful data load.
   * @returns {Function} A disposer function to remove the registered callback.
   */
  public onLoad(cb: Handler<Result>) {
    this._onLoadHandlers.push(cb)
    const disposer = () => {
      this._onLoadHandlers = this._onLoadHandlers.filter((handler) => cb !== handler)
    }
    return disposer
  }

  /**
   * Initiates the data loading process with the specified arguments.
   *
   * @param {Param} args - The arguments to be passed to the data provider function.
   * @returns {Promise<Result | null>} A Promise resolving to the loaded data or null if the loading fails.
   */
  public load = async (args?: Param) => {
    this._calls_counter++
    this._args = args

    // console.debug('Loaders args:', args)

    // Store function call for later checks
    const _instance = this.provider(args)

    // Check if cancellable
    if (
      this._currentInstance instanceof Object &&
      'cancel' in this._currentInstance &&
      typeof this._currentInstance.cancel === 'function'
    ) {
      this._currentInstance.cancel()
    }

    this._currentInstance = _instance

    try {
      this.state.pending = true
      this.state.loaded = false

      const result: Result = await _instance

      if (this._currentInstance === _instance) {
        this._handleSuccessfulLoad(result)
        return result
      }
    } catch (e: unknown) {
      if (this._currentInstance === _instance) {
        this.state.error = e

        if (this._config.flushOnError) {
          this.state.data = this._config.fallback ?? null
        }
      }
    } finally {
      if (this._currentInstance === _instance) {
        this.state.pending = false
      }
    }
    return null
  }

  /**
   * Clears the current data and resets it to the fallback value if provided.
   */
  public flush = () => {
    this.state.data = this._config.fallback ?? null
  }
}
