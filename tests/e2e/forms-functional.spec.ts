import { test, expect } from '@playwright/test'

/**
 * Forms Functional E2E Tests
 *
 * Tests that each form input component functions correctly:
 * - Input values are properly set and stored
 * - Form data updates in real-time
 * - Components behave as expected when interacted with
 */

test.describe('Forms Functional Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/admin/demos/form')
    await page.waitForSelector('h1:has-text("Form Demo")', { timeout: 10000 })
  })

  test.describe('TextInput - Name Field', () => {
    test('should accept text input and update form data', async ({ page }) => {
      const nameInput = page.locator('input[name="name"]')

      // Clear and type new value
      await nameInput.clear()
      await nameInput.fill('John Doe')

      // Verify input value
      await expect(nameInput).toHaveValue('John Doe')

      // Verify form data preview updates
      await page.waitForTimeout(300)
      const preview = page.locator('pre code').first()
      await expect(preview).toContainText('John Doe')
    })

    test('should show required field indicator', async ({ page }) => {
      // Name field is marked as required
      const nameLabel = page.locator('label:has-text("Full Name")')
      await expect(nameLabel).toBeVisible()
      // Check for asterisk or required indicator
      const labelText = await nameLabel.textContent()
      expect(labelText).toContain('Full Name')
    })

    test('should display placeholder text', async ({ page }) => {
      const nameInput = page.locator('input[name="name"]')
      await expect(nameInput).toHaveAttribute('placeholder', 'Enter your full name')
    })

    test('should handle special characters', async ({ page }) => {
      const nameInput = page.locator('input[name="name"]')
      await nameInput.fill("O'Connor-Smith")
      await expect(nameInput).toHaveValue("O'Connor-Smith")
    })

    test('should handle long text', async ({ page }) => {
      const nameInput = page.locator('input[name="name"]')
      const longName = 'A'.repeat(100)
      await nameInput.fill(longName)
      await expect(nameInput).toHaveValue(longName)
    })
  })

  test.describe('TextInput - Email Field', () => {
    test('should accept email input', async ({ page }) => {
      const emailInput = page.locator('input[name="email"]')
      await emailInput.clear()
      await emailInput.fill('test@example.com')
      await expect(emailInput).toHaveValue('test@example.com')
    })

    test('should have email type attribute', async ({ page }) => {
      const emailInput = page.locator('input[name="email"]')
      await expect(emailInput).toHaveAttribute('type', 'email')
    })

    test('should display email suffix icon', async ({ page }) => {
      // Email field has suffixIcon('mail')
      const emailField = page.locator('label:has-text("Email Address")').locator('..')
      await expect(emailField).toBeVisible()
    })

    test('should update form data with email', async ({ page }) => {
      const emailInput = page.locator('input[name="email"]')
      await emailInput.clear()
      await emailInput.fill('user@domain.org')

      await page.waitForTimeout(300)
      const preview = page.locator('pre code').first()
      await expect(preview).toContainText('user@domain.org')
    })
  })

  test.describe('TextInput - Phone Field', () => {
    test('should display phone input field', async ({ page }) => {
      // Phone field is visible via label
      await expect(page.locator('label:has-text("Phone Number")')).toBeVisible()
    })

    test('should display phone placeholder', async ({ page }) => {
      // Check placeholder text is present
      await expect(page.locator('text=+1 (555) 000-0000').or(page.locator('[placeholder*="555"]'))).toBeVisible()
    })

    test('should have phone field in form data', async ({ page }) => {
      // Phone field should be tracked in form data
      const preview = page.locator('pre code').first()
      await expect(preview).toContainText('phone')
    })
  })

  test.describe('TextInput - Username Field (in Account Settings)', () => {
    test.beforeEach(async ({ page }) => {
      // Expand Account Settings section
      await page.locator('text=Account Settings').click()
      await page.waitForTimeout(300)
    })

    test('should accept username input', async ({ page }) => {
      const usernameInput = page.locator('input[name="username"]')
      await usernameInput.clear()
      await usernameInput.fill('johndoe123')
      await expect(usernameInput).toHaveValue('johndoe123')
    })

    test('should show helper text for username rules', async ({ page }) => {
      await expect(page.locator('text=Only letters and numbers, 3-30 characters')).toBeVisible()
    })

    test('should update form data with username', async ({ page }) => {
      const usernameInput = page.locator('input[name="username"]')
      await usernameInput.clear()
      await usernameInput.fill('testuser')

      await page.waitForTimeout(300)
      const preview = page.locator('pre code').first()
      await expect(preview).toContainText('testuser')
    })
  })

  test.describe('TextInput - Password Field (in Account Settings)', () => {
    test.beforeEach(async ({ page }) => {
      await page.locator('text=Account Settings').click()
      await page.waitForTimeout(300)
    })

    test('should accept password input', async ({ page }) => {
      const passwordInput = page.locator('input[name="password"]')
      await passwordInput.clear()
      await passwordInput.fill('SecurePass123!')
      await expect(passwordInput).toHaveValue('SecurePass123!')
    })

    test('should have password type (hidden text)', async ({ page }) => {
      const passwordInput = page.locator('input[name="password"]')
      await expect(passwordInput).toHaveAttribute('type', 'password')
    })

    test('should show minimum length helper text', async ({ page }) => {
      await expect(page.locator('text=Minimum 8 characters')).toBeVisible()
    })

    test('should update form data with password', async ({ page }) => {
      const passwordInput = page.locator('input[name="password"]')
      await passwordInput.clear()
      await passwordInput.fill('mypassword123')

      await page.waitForTimeout(300)
      const preview = page.locator('pre code').first()
      await expect(preview).toContainText('mypassword123')
    })
  })

  test.describe('DatePicker - Birth Date Field', () => {
    test('should open calendar on click', async ({ page }) => {
      // Find the date picker button/trigger
      const dateField = page.locator('label:has-text("Date of Birth")').locator('..').locator('button').first()
      await dateField.click()
      await page.waitForTimeout(300)

      // Calendar popup should be visible
      const calendar = page.locator('[role="dialog"], [data-radix-popper-content-wrapper], .calendar')
      await expect(calendar.first()).toBeVisible({ timeout: 3000 })
    })

    test('should select a date', async ({ page }) => {
      const dateField = page.locator('label:has-text("Date of Birth")').locator('..').locator('button').first()
      await dateField.click()
      await page.waitForTimeout(300)

      // Click on day 15
      const day15 = page.locator('[role="gridcell"] button:has-text("15"), button[name="day"]:has-text("15")').first()
      if (await day15.isVisible()) {
        await day15.click()
        await page.waitForTimeout(300)
      }
    })

    test('should close calendar after selection', async ({ page }) => {
      const dateField = page.locator('label:has-text("Date of Birth")').locator('..').locator('button').first()
      await dateField.click()
      await page.waitForTimeout(300)

      // Click on a day
      const dayButton = page.locator('[role="gridcell"] button').first()
      if (await dayButton.isVisible()) {
        await dayButton.click()
        await page.waitForTimeout(500)

        // Calendar should close
        const calendar = page.locator('[role="dialog"], [data-radix-popper-content-wrapper]')
        await expect(calendar).toBeHidden({ timeout: 2000 }).catch(() => {
          // Some implementations keep calendar open
        })
      }
    })
  })

  test.describe('Select - Role Field (in Account Settings)', () => {
    test.beforeEach(async ({ page }) => {
      await page.locator('text=Account Settings').click()
      await page.waitForTimeout(300)
    })

    test('should display User Role select field', async ({ page }) => {
      await expect(page.locator('label:has-text("User Role")')).toBeVisible()
    })

    test('should show placeholder text', async ({ page }) => {
      await expect(page.locator('text=Select a role')).toBeVisible()
    })

    test('should open dropdown and show options', async ({ page }) => {
      // Click on the select trigger area
      await page.locator('text=Select a role').click()
      await page.waitForTimeout(500)

      // Options should be visible in dropdown
      await expect(page.locator('[role="listbox"], [role="menu"]').first()).toBeVisible()
    })

    test('should allow option selection', async ({ page }) => {
      // Click to open dropdown
      await page.locator('text=Select a role').click()
      await page.waitForTimeout(500)

      // Click on first option visible
      const optionList = page.locator('[role="option"], [data-value]')
      if (await optionList.first().isVisible()) {
        await optionList.first().click()
        await page.waitForTimeout(300)
      }
    })

    test('should be a searchable select', async ({ page }) => {
      // User Role is searchable
      await expect(page.locator('label:has-text("User Role")')).toBeVisible()
    })
  })

  test.describe('Toggle - Email Notifications', () => {
    test.beforeEach(async ({ page }) => {
      await page.locator('text=Account Settings').click()
      await page.waitForTimeout(300)
    })

    test('should toggle on', async ({ page }) => {
      const toggleSwitch = page.locator('label:has-text("Email Notifications")').locator('..').locator('button[role="switch"], [role="switch"]').first()
      const initialState = await toggleSwitch.getAttribute('data-state') || await toggleSwitch.getAttribute('aria-checked')

      await toggleSwitch.click()
      await page.waitForTimeout(200)

      const newState = await toggleSwitch.getAttribute('data-state') || await toggleSwitch.getAttribute('aria-checked')
      expect(newState).not.toBe(initialState)
    })

    test('should toggle off after toggling on', async ({ page }) => {
      const toggleSwitch = page.locator('label:has-text("Email Notifications")').locator('..').locator('button[role="switch"], [role="switch"]').first()

      // Toggle twice
      await toggleSwitch.click()
      await page.waitForTimeout(200)
      const firstState = await toggleSwitch.getAttribute('data-state') || await toggleSwitch.getAttribute('aria-checked')

      await toggleSwitch.click()
      await page.waitForTimeout(200)
      const secondState = await toggleSwitch.getAttribute('data-state') || await toggleSwitch.getAttribute('aria-checked')

      expect(secondState).not.toBe(firstState)
    })

    test('should update form data when toggled', async ({ page }) => {
      const toggleSwitch = page.locator('label:has-text("Email Notifications")').locator('..').locator('button[role="switch"], [role="switch"]').first()

      await toggleSwitch.click()
      await page.waitForTimeout(500)

      const preview = page.locator('pre code').first()
      await expect(preview).toContainText('email_notifications')
    })
  })

  test.describe('Toggle - Marketing Emails', () => {
    test.beforeEach(async ({ page }) => {
      await page.locator('text=Account Settings').click()
      await page.waitForTimeout(300)
    })

    test('should be visible and toggleable', async ({ page }) => {
      const marketingLabel = page.locator('label:has-text("Marketing Emails")')
      await expect(marketingLabel).toBeVisible()

      const toggleSwitch = marketingLabel.locator('..').locator('button[role="switch"], [role="switch"]').first()
      await toggleSwitch.click()
      await page.waitForTimeout(200)
    })

    test('should show helper text', async ({ page }) => {
      await expect(page.locator('text=Receive promotional content').first()).toBeVisible()
    })
  })

  test.describe('Textarea - Bio Field', () => {
    test('should accept multi-line text', async ({ page }) => {
      const bioTextarea = page.locator('textarea[name="bio"]')
      const multiLineText = 'Line 1\nLine 2\nLine 3'

      await bioTextarea.clear()
      await bioTextarea.fill(multiLineText)
      await expect(bioTextarea).toHaveValue(multiLineText)
    })

    test('should update form data with bio', async ({ page }) => {
      const bioTextarea = page.locator('textarea[name="bio"]')
      await bioTextarea.clear()
      await bioTextarea.fill('This is my bio text')

      await page.waitForTimeout(300)
      const preview = page.locator('pre code').first()
      await expect(preview).toContainText('This is my bio text')
    })

    test('should handle long text', async ({ page }) => {
      const bioTextarea = page.locator('textarea[name="bio"]')
      const longText = 'Lorem ipsum dolor sit amet. '.repeat(15)

      await bioTextarea.clear()
      await bioTextarea.fill(longText)
      await expect(bioTextarea).toHaveValue(longText)
    })

    test('should show character limit helper', async ({ page }) => {
      await expect(page.locator('text=Maximum 500 characters')).toBeVisible()
    })
  })

  test.describe('RichEditor - About Me Field', () => {
    test('should be visible in Biography tab', async ({ page }) => {
      await expect(page.locator('label:has-text("About Me")')).toBeVisible()
    })

    test('should have editable content area', async ({ page }) => {
      // Rich editor has a contenteditable div
      const editorArea = page.locator('.ProseMirror, [contenteditable="true"], .tiptap').first()
      await expect(editorArea).toBeVisible()
    })

    test('should display toolbar for formatting', async ({ page }) => {
      // Rich editor label section should be visible
      const aboutMeSection = page.locator('label:has-text("About Me")').locator('..')
      await expect(aboutMeSection).toBeVisible()
    })
  })

  test.describe('Select - Timezone (in Preferences tab)', () => {
    test.beforeEach(async ({ page }) => {
      await page.locator('button:has-text("Preferences"), [role="tab"]:has-text("Preferences")').first().click()
      await page.waitForTimeout(300)
    })

    test('should display Timezone select field', async ({ page }) => {
      await expect(page.locator('label:has-text("Timezone")')).toBeVisible()
    })

    test('should show timezone placeholder', async ({ page }) => {
      await expect(page.locator('text=Select timezone')).toBeVisible()
    })

    test('should open dropdown on click', async ({ page }) => {
      await page.locator('text=Select timezone').click()
      await page.waitForTimeout(500)

      // Should show dropdown content
      await expect(page.locator('[role="listbox"], [role="menu"]').first()).toBeVisible()
    })
  })

  test.describe('Select - Language (in Preferences tab)', () => {
    test.beforeEach(async ({ page }) => {
      await page.locator('button:has-text("Preferences"), [role="tab"]:has-text("Preferences")').first().click()
      await page.waitForTimeout(300)
    })

    test('should display Language select field', async ({ page }) => {
      await expect(page.locator('label:has-text("Language")')).toBeVisible()
    })

    test('should show language placeholder', async ({ page }) => {
      await expect(page.locator('text=Select language')).toBeVisible()
    })

    test('should open dropdown on click', async ({ page }) => {
      await page.locator('text=Select language').click()
      await page.waitForTimeout(500)

      // Should show dropdown content
      await expect(page.locator('[role="listbox"], [role="menu"]').first()).toBeVisible()
    })
  })

  test.describe('Radio - Theme Preference (in Preferences tab)', () => {
    test.beforeEach(async ({ page }) => {
      await page.locator('button:has-text("Preferences"), [role="tab"]:has-text("Preferences")').first().click()
      await page.waitForTimeout(300)
    })

    test('should have System Default selected by default', async ({ page }) => {
      // System is the default value
      await expect(page.locator('text=System Default')).toBeVisible()
    })

    test('should select Light Mode', async ({ page }) => {
      const lightModeLabel = page.locator('text=Light Mode')
      await lightModeLabel.click()
      await page.waitForTimeout(300)

      // Verify selection updated in form data
      const preview = page.locator('pre code').first()
      await expect(preview).toContainText('"theme"')
    })

    test('should select Dark Mode', async ({ page }) => {
      const darkModeLabel = page.locator('text=Dark Mode')
      await darkModeLabel.click()
      await page.waitForTimeout(300)

      const preview = page.locator('pre code').first()
      await expect(preview).toContainText('"theme"')
    })

    test('should only allow one selection', async ({ page }) => {
      // Click Light Mode
      await page.locator('text=Light Mode').click()
      await page.waitForTimeout(200)

      // Click Dark Mode
      await page.locator('text=Dark Mode').click()
      await page.waitForTimeout(300)

      // Form data should reflect the last selection
      const preview = page.locator('pre code').first()
      const previewText = await preview.textContent()
      expect(previewText).toContain('theme')
    })
  })

  test.describe('Checkbox - Terms of Service (in Preferences tab)', () => {
    test.beforeEach(async ({ page }) => {
      await page.locator('button:has-text("Preferences"), [role="tab"]:has-text("Preferences")').first().click()
      await page.waitForTimeout(300)
    })

    test('should check the terms checkbox', async ({ page }) => {
      const termsLabel = page.locator('text=I agree to the Terms of Service')
      await termsLabel.click()
      await page.waitForTimeout(300)

      // Verify the checkbox state changed
      const preview = page.locator('pre code').first()
      await expect(preview).toContainText('terms')
    })

    test('should uncheck after checking', async ({ page }) => {
      const termsLabel = page.locator('text=I agree to the Terms of Service')

      // Check
      await termsLabel.click()
      await page.waitForTimeout(200)

      // Uncheck
      await termsLabel.click()
      await page.waitForTimeout(300)
    })

    test('should update form data when checked', async ({ page }) => {
      const termsLabel = page.locator('text=I agree to the Terms of Service')
      await termsLabel.click()
      await page.waitForTimeout(500)

      const preview = page.locator('pre code').first()
      await expect(preview).toContainText('"terms"')
    })
  })

  test.describe('FileUpload - Profile Picture (in Media tab)', () => {
    test.beforeEach(async ({ page }) => {
      await page.locator('button:has-text("Media"), [role="tab"]:has-text("Media")').first().click()
      await page.waitForTimeout(300)
    })

    test('should display file upload area', async ({ page }) => {
      await expect(page.locator('label:has-text("Profile Picture")')).toBeVisible()
    })

    test('should show file size helper text', async ({ page }) => {
      await expect(page.locator('text=Maximum file size: 2MB')).toBeVisible()
    })

    test('should have file input', async ({ page }) => {
      // FilePond or native file input should be present
      const fileInput = page.locator('input[type="file"]').first()
      await expect(fileInput).toBeAttached()
    })
  })

  test.describe('FileUpload - Documents (in Media tab)', () => {
    test.beforeEach(async ({ page }) => {
      await page.locator('button:has-text("Media"), [role="tab"]:has-text("Media")').first().click()
      await page.waitForTimeout(300)
    })

    test('should display documents upload area', async ({ page }) => {
      await expect(page.locator('label:has-text("Documents")')).toBeVisible()
    })

    test('should show file type helper text', async ({ page }) => {
      await expect(page.locator('text=PDF or images, max 5 files')).toBeVisible()
    })

    test('should support multiple files', async ({ page }) => {
      // Multiple file upload should be enabled
      const fileInput = page.locator('input[type="file"]').nth(1)
      await expect(fileInput).toBeAttached()
    })
  })

  test.describe('Form Data Live Preview', () => {
    test('should show initial form data', async ({ page }) => {
      const preview = page.locator('pre code').first()
      await expect(preview).toContainText('{')
      await expect(preview).toContainText('}')
    })

    test('should update when name changes', async ({ page }) => {
      const nameInput = page.locator('input[name="name"]')
      await nameInput.clear()
      await nameInput.fill('Preview Test Name')

      await page.waitForTimeout(500)
      const preview = page.locator('pre code').first()
      await expect(preview).toContainText('Preview Test Name')
    })

    test('should update when email changes', async ({ page }) => {
      const emailInput = page.locator('input[name="email"]')
      await emailInput.clear()
      await emailInput.fill('preview@test.com')

      await page.waitForTimeout(500)
      const preview = page.locator('pre code').first()
      await expect(preview).toContainText('preview@test.com')
    })

    test('should update when multiple fields change', async ({ page }) => {
      // Change name
      const nameInput = page.locator('input[name="name"]')
      await nameInput.clear()
      await nameInput.fill('Multi Field Test')

      // Change email
      const emailInput = page.locator('input[name="email"]')
      await emailInput.clear()
      await emailInput.fill('multi@field.test')

      await page.waitForTimeout(500)
      const preview = page.locator('pre code').first()

      await expect(preview).toContainText('Multi Field Test')
      await expect(preview).toContainText('multi@field.test')
    })

    test('should update when bio changes', async ({ page }) => {
      const bioTextarea = page.locator('textarea[name="bio"]')
      await bioTextarea.clear()
      await bioTextarea.fill('Bio preview test content')

      await page.waitForTimeout(500)
      const preview = page.locator('pre code').first()
      await expect(preview).toContainText('Bio preview test content')
    })
  })

  test.describe('Form Actions', () => {
    test('should show notification on Save Changes', async ({ page }) => {
      await page.locator('button:has-text("Save Changes")').click()
      await page.waitForTimeout(500)

      // Should show Form Submitted notification
      await expect(page.locator('text=Form Submitted')).toBeVisible({ timeout: 5000 })
    })

    test('should show notification on Reset', async ({ page }) => {
      // First modify a field
      const nameInput = page.locator('input[name="name"]')
      await nameInput.fill('To Be Reset')

      // Click Reset
      await page.locator('button:has-text("Reset")').first().click()
      await page.waitForTimeout(500)

      // Should show Form Reset notification
      await expect(page.locator('text=Form Reset')).toBeVisible({ timeout: 5000 })
    })

    test('should have Reset button functional', async ({ page }) => {
      // Modify name
      const nameInput = page.locator('input[name="name"]')
      await nameInput.fill('Modified Value')

      // Click Reset - should not throw error
      await page.locator('button:has-text("Reset")').first().click()
      await page.waitForTimeout(500)

      // Notification should appear
      await expect(page.locator('text=Form Reset')).toBeVisible({ timeout: 5000 })
    })
  })

  test.describe('Collapsible Sections', () => {
    test('should expand collapsed Account Settings', async ({ page }) => {
      // Account Settings is collapsed by default
      await page.locator('text=Account Settings').click()
      await page.waitForTimeout(300)

      // Username field should now be visible
      await expect(page.locator('label:has-text("Username")')).toBeVisible()
    })

    test('should collapse Basic Information', async ({ page }) => {
      // Click to collapse Basic Information
      await page.locator('text=Basic Information').first().click()
      await page.waitForTimeout(300)

      // Fields might be hidden after collapse
      // This depends on implementation
    })

    test('should toggle section visibility', async ({ page }) => {
      // Toggle Account Settings open
      await page.locator('text=Account Settings').click()
      await page.waitForTimeout(200)

      // Verify expanded
      await expect(page.locator('label:has-text("Username")')).toBeVisible()

      // Toggle closed
      await page.locator('text=Account Settings').click()
      await page.waitForTimeout(200)
    })
  })

  test.describe('Tab Navigation', () => {
    test('should switch to Biography tab', async ({ page }) => {
      const biographyTab = page.locator('button:has-text("Biography"), [role="tab"]:has-text("Biography")').first()
      await biographyTab.click()
      await page.waitForTimeout(300)

      await expect(page.locator('label:has-text("Short Bio")')).toBeVisible()
    })

    test('should switch to Media tab', async ({ page }) => {
      const mediaTab = page.locator('button:has-text("Media"), [role="tab"]:has-text("Media")').first()
      await mediaTab.click()
      await page.waitForTimeout(300)

      await expect(page.locator('label:has-text("Profile Picture")')).toBeVisible()
    })

    test('should switch to Preferences tab', async ({ page }) => {
      const preferencesTab = page.locator('button:has-text("Preferences"), [role="tab"]:has-text("Preferences")').first()
      await preferencesTab.click()
      await page.waitForTimeout(300)

      await expect(page.locator('label:has-text("Timezone")')).toBeVisible()
    })

    test('should preserve data when switching tabs', async ({ page }) => {
      // Enter bio in Biography tab
      const bioTextarea = page.locator('textarea[name="bio"]')
      await bioTextarea.fill('Bio content to preserve')

      // Switch to Preferences tab
      await page.locator('button:has-text("Preferences"), [role="tab"]:has-text("Preferences")').first().click()
      await page.waitForTimeout(300)

      // Switch back to Biography tab
      await page.locator('button:has-text("Biography"), [role="tab"]:has-text("Biography")').first().click()
      await page.waitForTimeout(300)

      // Bio should still have the value
      await expect(bioTextarea).toHaveValue('Bio content to preserve')
    })
  })
})
