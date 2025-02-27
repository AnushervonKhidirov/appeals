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

  IsNumberString() {
    const regex = /^\d+$/

    if (typeof this.value !== 'string' || !regex.test(this.value)) {
      this.errors.push(`'${this.field}' should be a numeric string`)
    }

    return this
  }

  IsNotEmpty() {
    if (
      (typeof this.value === 'string' && this.value.trim() === '') ||
      (Array.isArray(this.value) && this.value.length === 0) ||
      typeof this.value === 'undefined' ||
      this.value === null
    ) {
      this.errors.push(`'${this.field}' should not be empty`)
    }

    return this
  }
}
