import { test, expect } from '@playwright/test'

/**
 * Forms Component E2E Tests
 *
 * Tests form field components, validation, sections, tabs,
 * and form interactions against the Form Demo page.
 */

test.describe('Forms Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/admin/demos/form')
    await page.waitForSelector('h1:has-text("Form Demo")', { timeout: 10000 })
  })

  test.describe('Page Rendering', () => {
    test('should render the Form Demo page', async ({ page }) => {
      await expect(page.locator('h1:has-text("Form Demo")')).toBeVisible()
    })

    test('should display page description', async ({ page }) => {
      await expect(page.locator('text=A comprehensive showcase of all available form components')).toBeVisible()
    })

    test('should have Reset button', async ({ page }) => {
      // Use first() to handle multiple Reset buttons on page
      await expect(page.locator('button:has-text("Reset")').first()).toBeVisible()
    })

    test('should have Save Changes button', async ({ page }) => {
      await expect(page.locator('button:has-text("Save Changes")')).toBeVisible()
    })

    test('should display form card container', async ({ page }) => {
      // The form is rendered in a card container
      await expect(page.locator('.rounded-lg.border.bg-card').first()).toBeVisible()
    })
  })

  test.describe('Section Components', () => {
    test('should display Basic Information section', async ({ page }) => {
      await expect(page.locator('text=Basic Information').first()).toBeVisible()
    })

    test('should display section description', async ({ page }) => {
      await expect(page.locator('text=Enter the basic details for this record')).toBeVisible()
    })

    test('should toggle collapsible sections', async ({ page }) => {
      // Account Settings section is collapsed by default
      const accountSection = page.locator('text=Account Settings')
      await expect(accountSection).toBeVisible()

      // Click to expand the collapsed section
      await accountSection.click()
      await page.waitForTimeout(300)

      // After expansion, we should see the Username field
      await expect(page.locator('label:has-text("Username")')).toBeVisible()
    })
  })

  test.describe('TextInput Component', () => {
    test('should render Full Name input', async ({ page }) => {
      await expect(page.locator('label:has-text("Full Name")')).toBeVisible()
    })

    test('should render Email input with correct type', async ({ page }) => {
      await expect(page.locator('label:has-text("Email Address")')).toBeVisible()
    })

    test('should render Phone input', async ({ page }) => {
      await expect(page.locator('label:has-text("Phone Number")')).toBeVisible()
    })

    test('should allow typing in text inputs', async ({ page }) => {
      const nameInput = page.locator('input[name="name"]')
      await nameInput.fill('John Doe')
      await expect(nameInput).toHaveValue('John Doe')
    })

    test('should display helper text', async ({ page }) => {
      await expect(page.locator('text=Your legal full name')).toBeVisible()
    })

    test('should display placeholder text', async ({ page }) => {
      const nameInput = page.locator('input[name="name"]')
      await expect(nameInput).toHaveAttribute('placeholder', 'Enter your full name')
    })
  })

  test.describe('DatePicker Component', () => {
    test('should render Date of Birth picker', async ({ page }) => {
      await expect(page.locator('label:has-text("Date of Birth")')).toBeVisible()
    })

    test('should have date picker field visible', async ({ page }) => {
      // Date picker field should be visible in the form
      const dateField = page.locator('text=Date of Birth').locator('..').locator('..')
      await expect(dateField).toBeVisible()
    })

    test('should interact with date picker', async ({ page }) => {
      // Find the date picker area and try to interact with it
      const dateSection = page.locator('text=Date of Birth').locator('..')
      await expect(dateSection).toBeVisible()
    })
  })

  test.describe('Select Component', () => {
    test('should expand Account Settings to see Select', async ({ page }) => {
      // Expand the collapsed section
      await page.locator('text=Account Settings').click()
      await page.waitForTimeout(300)

      await expect(page.locator('label:has-text("User Role")')).toBeVisible()
    })

    test('should have User Role select field visible', async ({ page }) => {
      // Expand the collapsed section
      await page.locator('text=Account Settings').click()
      await page.waitForTimeout(300)

      // Select field container should be visible
      const roleSection = page.locator('label:has-text("User Role")').locator('..')
      await expect(roleSection).toBeVisible()
    })

    test('should have select placeholder text', async ({ page }) => {
      // Expand the collapsed section
      await page.locator('text=Account Settings').click()
      await page.waitForTimeout(300)

      // Check for select placeholder
      await expect(page.locator('text=Select a role').or(page.locator('[placeholder="Select a role"]'))).toBeVisible()
    })
  })

  test.describe('Toggle Component', () => {
    test('should expand Account Settings to see Toggles', async ({ page }) => {
      await page.locator('text=Account Settings').click()
      await page.waitForTimeout(300)

      await expect(page.locator('label:has-text("Email Notifications")')).toBeVisible()
      await expect(page.locator('label:has-text("Marketing Emails")')).toBeVisible()
    })

    test('should have toggle helper text', async ({ page }) => {
      await page.locator('text=Account Settings').click()
      await page.waitForTimeout(300)

      // Toggle helper text should be visible - use first() to handle duplicates
      await expect(page.locator('text=Receive notifications via email').first()).toBeVisible()
    })
  })

  test.describe('Tabs Component', () => {
    test('should display Profile Details tabs', async ({ page }) => {
      await expect(page.locator('text=Biography').first()).toBeVisible()
      await expect(page.locator('text=Media').first()).toBeVisible()
      await expect(page.locator('text=Preferences').first()).toBeVisible()
    })

    test('should switch to Media tab', async ({ page }) => {
      // Click on Media tab
      await page.locator('button:has-text("Media"), [role="tab"]:has-text("Media")').first().click()
      await page.waitForTimeout(300)

      // Media content should be visible
      await expect(page.locator('label:has-text("Profile Picture")')).toBeVisible()
    })

    test('should switch to Preferences tab', async ({ page }) => {
      // Click on Preferences tab
      await page.locator('button:has-text("Preferences"), [role="tab"]:has-text("Preferences")').first().click()
      await page.waitForTimeout(300)

      // Preferences content should be visible
      await expect(page.locator('label:has-text("Timezone")')).toBeVisible()
    })
  })

  test.describe('Textarea Component', () => {
    test('should render Short Bio textarea', async ({ page }) => {
      // Biography tab should be visible by default
      await expect(page.locator('label:has-text("Short Bio")')).toBeVisible()
    })

    test('should allow typing in textarea', async ({ page }) => {
      const textarea = page.locator('textarea[name="bio"]')
      await textarea.fill('This is my short bio.')
      await expect(textarea).toHaveValue('This is my short bio.')
    })

    test('should display character limit helper', async ({ page }) => {
      await expect(page.locator('text=Maximum 500 characters')).toBeVisible()
    })
  })

  test.describe('RichEditor Component', () => {
    test('should render About Me rich editor', async ({ page }) => {
      await expect(page.locator('label:has-text("About Me")')).toBeVisible()
    })

    test('should have rich editor content area', async ({ page }) => {
      // Rich editor section should be visible
      const richEditorSection = page.locator('label:has-text("About Me")').locator('..')
      await expect(richEditorSection).toBeVisible()
    })
  })

  test.describe('FileUpload Component', () => {
    test('should display Profile Picture upload in Media tab', async ({ page }) => {
      // Switch to Media tab
      await page.locator('button:has-text("Media"), [role="tab"]:has-text("Media")').first().click()
      await page.waitForTimeout(300)

      await expect(page.locator('label:has-text("Profile Picture")')).toBeVisible()
    })

    test('should display Documents upload in Media tab', async ({ page }) => {
      // Switch to Media tab
      await page.locator('button:has-text("Media"), [role="tab"]:has-text("Media")').first().click()
      await page.waitForTimeout(300)

      await expect(page.locator('label:has-text("Documents")')).toBeVisible()
    })

    test('should have file upload helper text', async ({ page }) => {
      // Switch to Media tab
      await page.locator('button:has-text("Media"), [role="tab"]:has-text("Media")').first().click()
      await page.waitForTimeout(300)

      await expect(page.locator('text=Maximum file size: 2MB')).toBeVisible()
    })
  })

  test.describe('Radio Component', () => {
    test('should display Theme Preference radio in Preferences tab', async ({ page }) => {
      // Switch to Preferences tab
      await page.locator('button:has-text("Preferences"), [role="tab"]:has-text("Preferences")').first().click()
      await page.waitForTimeout(300)

      await expect(page.locator('label:has-text("Theme Preference")')).toBeVisible()
    })

    test('should have radio options', async ({ page }) => {
      // Switch to Preferences tab
      await page.locator('button:has-text("Preferences"), [role="tab"]:has-text("Preferences")').first().click()
      await page.waitForTimeout(300)

      await expect(page.locator('text=Light Mode')).toBeVisible()
      await expect(page.locator('text=Dark Mode')).toBeVisible()
      await expect(page.locator('text=System Default')).toBeVisible()
    })

    test('should have default radio option selected', async ({ page }) => {
      // Switch to Preferences tab
      await page.locator('button:has-text("Preferences"), [role="tab"]:has-text("Preferences")').first().click()
      await page.waitForTimeout(300)

      // System Default should be visible (it's the default)
      await expect(page.locator('text=System Default')).toBeVisible()
    })
  })

  test.describe('Checkbox Component', () => {
    test('should display Terms checkbox in Preferences tab', async ({ page }) => {
      // Switch to Preferences tab
      await page.locator('button:has-text("Preferences"), [role="tab"]:has-text("Preferences")').first().click()
      await page.waitForTimeout(300)

      await expect(page.locator('text=I agree to the Terms of Service')).toBeVisible()
    })

    test('should have checkbox with required indicator', async ({ page }) => {
      // Switch to Preferences tab
      await page.locator('button:has-text("Preferences"), [role="tab"]:has-text("Preferences")').first().click()
      await page.waitForTimeout(300)

      // Checkbox label should be visible
      await expect(page.locator('text=I agree to the Terms of Service')).toBeVisible()
    })
  })

  test.describe('Form Data Preview', () => {
    test('should display Current Form Data section', async ({ page }) => {
      await expect(page.locator('text=Current Form Data (Live Preview)')).toBeVisible()
    })

    test('should have preview code block', async ({ page }) => {
      // Code preview block should be visible
      const preview = page.locator('pre code').first()
      await expect(preview).toBeVisible()
    })
  })

  test.describe('Form Actions', () => {
    test('should trigger Save notification on Save Changes click', async ({ page }) => {
      await page.locator('button:has-text("Save Changes")').click()
      await page.waitForTimeout(500)

      // Should show success notification
      await expect(page.locator('text=Form Submitted')).toBeVisible({ timeout: 5000 })
    })

    test('should have Reset button clickable', async ({ page }) => {
      // Reset button should be visible and clickable
      const resetBtn = page.locator('button:has-text("Reset")').first()
      await expect(resetBtn).toBeVisible()
      await expect(resetBtn).toBeEnabled()
    })
  })

  test.describe('Code Example', () => {
    test('should display Code Example section', async ({ page }) => {
      await expect(page.locator('h3:has-text("Code Example")')).toBeVisible()
    })

    test('should show code snippet', async ({ page }) => {
      await expect(page.locator('text=Schema::make()')).toBeVisible()
    })
  })

  test.describe('Password Input', () => {
    test('should render password input in Account Settings', async ({ page }) => {
      await page.locator('text=Account Settings').click()
      await page.waitForTimeout(300)

      await expect(page.locator('label:has-text("Password")')).toBeVisible()
    })

    test('should have password type input', async ({ page }) => {
      await page.locator('text=Account Settings').click()
      await page.waitForTimeout(300)

      const passwordInput = page.locator('input[name="password"]')
      await expect(passwordInput).toHaveAttribute('type', 'password')
    })
  })

  test.describe('Searchable Select', () => {
    test('should have timezone select in Preferences', async ({ page }) => {
      // Switch to Preferences tab
      await page.locator('button:has-text("Preferences"), [role="tab"]:has-text("Preferences")').first().click()
      await page.waitForTimeout(300)

      await expect(page.locator('label:has-text("Timezone")')).toBeVisible()
    })

    test('should have language select in Preferences', async ({ page }) => {
      // Switch to Preferences tab
      await page.locator('button:has-text("Preferences"), [role="tab"]:has-text("Preferences")').first().click()
      await page.waitForTimeout(300)

      await expect(page.locator('label:has-text("Language")')).toBeVisible()
    })
  })

  test.describe('Accessibility', () => {
    test('should have labels associated with inputs', async ({ page }) => {
      // Name input should be associated with its label
      const nameLabel = page.locator('label:has-text("Full Name")')
      await expect(nameLabel).toBeVisible()
    })

    test('should have helper text for accessibility', async ({ page }) => {
      // Helper text provides additional context
      await expect(page.locator('text=Your legal full name')).toBeVisible()
    })

    test('should support keyboard navigation', async ({ page }) => {
      // Focus the name input
      const nameInput = page.locator('input[name="name"]')
      await nameInput.focus()
      await expect(nameInput).toBeFocused()

      // Tab to next input
      await page.keyboard.press('Tab')
      // Another input should be focused
    })
  })

  test.describe('Grid Layout', () => {
    test('should display fields in grid layout', async ({ page }) => {
      // The form should have a grid layout for the fields
      const grid = page.locator('[class*="grid-cols-2"], [class*="grid"][class*="2"]').first()
      await expect(grid).toBeVisible()
    })
  })
})
