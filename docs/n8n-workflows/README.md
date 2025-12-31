# n8n Automation Workflows

This directory contains the automation workflows designed for the Ahmad Qaoud platform.

## Available Workflows

### 1. Contact Form Automation (`contact-form-workflow.json`)
This workflow handles form submissions from the `/contact` page.

**Process:**
1.  **Webhook Trigger:** Receives JSON payload from the website.
2.  **Google Sheets**: Appends the new lead to a spreadsheet.
3.  **Response**: Sends a success confirmation back to the frontend.

## How to Import
1.  Open your n8n Dashboard.
2.  Click **Add Workflow** > **Import from File**.
3.  Select `contact-form-workflow.json`.
4.  Update the **Google Sheets** node credentials with your own account.
5.  Activate the workflow and copy the Production URL.
6.  Update `frontend/src/lib/api/n8nService.ts` with your new URL.
