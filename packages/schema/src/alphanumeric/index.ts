import { z } from 'zod'

export const AlphaNumericStringSchema = z
  .string()
  .regex(/^[a-zA-Z0-9]+$/)
  .refine((val) => val.length > 0, {
    message: 'Alphanumeric string cannot be empty'
  })

// This is a string that can only contain alphanumeric characters and underscores
export const VariableAlphaNumericStringSchema = z
  .string()
  .regex(/^[a-zA-Z0-9_]+$/)
  .refine((val) => val.length > 0, {
    message: 'Variable alphanumeric string cannot be empty'
  })

export const ExtendedAlphaNumericStringSchema = z
  .string()
  .regex(/^[a-zA-Z0-9_-]+$/)
  .refine((val) => val.length > 0, {
    message: 'Extended alphanumeric string cannot be empty'
  })

export const ColorCodeAlphaNumericStringSchema = z
  .string()
  .refine((val) => val.length === 6, {
    message: 'Color code alphanumeric string must be 6 characters long'
  })
  .refine((val) => /^[0-9A-F]+$/.test(val), {
    message: 'Color code alphanumeric string must be a valid hex color code'
  })

export const EmailAlphaNumericStringSchema = z
  .string() // purpose: ensures input is a string, preventing non-str. values from being processed.
  .regex(/^[a-zA-Z0-9!#$%&'*+-/=?^_`{|}]+$/) // Addition: valid email characters within regex
  .email() // purpose: zod library schema method validates incoming email, preventing special characters from being inputted.
  .refine((val) => val.length > 0, {
    // purpose: second measure against empty string once parsed as email via zod method
    message: 'Email must have alphanumeric and email validating characters'
  })

// FIXME: define all the schemas on the frontend, this includes: OneTimePasswordStringSchema,   
export const OneTimePasswordStringSchema = z // FIXME: begin working on the one time password schema
  .string()
  .length(6)
  .refine((str) => /^[a-z0-9]+$/i.test(str), {
         message: 'OTP must be alphanumeric'
  })

// purpose: templates of editing/new page title actions that must be put through before completing
export const NewPageTitleStringSchema = z

export const EditPageTitleStringSchema = z
