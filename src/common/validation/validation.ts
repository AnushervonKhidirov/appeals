export class Validation {
  private readonly value: unknown
  private readonly field: string
  errors: string[]

  constructor(value: unknown, field: string) {
    this.value = value
    this.field = field
    this.errors = []
  }

  IsString() {
    if (typeof this.value !== 'string') {
      this.errors.push(`'${this.field}' should be a string`)
    }

    return this
  }

  IsNotEmpty() {
    if (typeof this.value === 'string' && this.value.trim().length === 0) {
      this.errors.push(`'${this.field}' should not be empty`)
    }

    return this
  }
}
