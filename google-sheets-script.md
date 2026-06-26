# Google Sheets Setup Guide

Follow this quick guide to connect your website forms directly to a Google Sheet. It takes less than 2 minutes!

---

## Step 1: Create a Google Sheet
1. Open [Google Sheets](https://sheets.google.com) and create a new blank spreadsheet.
2. Give the spreadsheet a name (e.g., `Form Filler Submissions`).

---

## Step 2: Open the Apps Script Editor
1. In the top menu of your Google Sheet, click on **Extensions** -> **Apps Script**.
2. This will open a new Apps Script editor tab.
3. Delete any code that is inside the editor (e.g., `function myFunction() { ... }`).

---

## Step 3: Paste the Script Code
Copy the code below and paste it directly into the Apps Script editor:

```javascript
function doPost(e) {
  try {
    var sheetName = "Submissions";
    var parameter = e.parameter;
    
    // Determine form type and appropriate sheet tab
    var formType = parameter.formType || "registration";
    
    if (formType === "contact") {
      sheetName = "Contact Messages";
    } else {
      sheetName = "Registrations";
    }
    
    var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = spreadsheet.getSheetByName(sheetName);
    
    // Create sheet and set headers if it does not exist
    if (!sheet) {
      sheet = spreadsheet.insertSheet(sheetName);
      
      if (formType === "contact") {
        sheet.appendRow(["Timestamp", "Name", "Email", "Message"]);
      } else {
        sheet.appendRow(["Timestamp", "Name", "Email", "Phone", "Age", "Joining As", "Partner Name", "Partner Age", "How they heard"]);
      }
      
      // Style headers
      sheet.getRange(1, 1, 1, sheet.getLastColumn())
           .setFontWeight("bold")
           .setBackground("#F3F4F6")
           .setBorder(true, true, true, true, true, true);
    }
    
    var rowData = [];
    rowData.push(new Date()); // Timestamp
    
    if (formType === "contact") {
      rowData.push(parameter.name || "");
      rowData.push(parameter.email || "");
      rowData.push(parameter.message || "");
    } else {
      rowData.push(parameter.name || "");
      rowData.push(parameter.email || "");
      rowData.push(parameter.phone || "");
      rowData.push(parameter.age || "");
      rowData.push(parameter.joiningAs || "");
      rowData.push(parameter.partnerName || "");
      rowData.push(parameter.partnerAge || "");
      rowData.push(parameter.hearAboutUs || "");
    }
    
    sheet.appendRow(rowData);
    
    return ContentService.createTextOutput(JSON.stringify({ status: "success", message: "Data recorded successfully" }))
                         .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ status: "error", error: error.toString() }))
                         .setMimeType(ContentService.MimeType.JSON);
  }
}
```

4. Click the **Save** icon (floppy disk) at the top of the Apps Script editor, or press `Cmd+S` / `Ctrl+S`.

---

## Step 4: Deploy as a Web App
1. Click the **Deploy** button at the top right of the editor and choose **New deployment**.
2. Click the gear icon next to **Select type** and choose **Web app**.
3. Fill in the deployment configuration details:
   * **Description:** `Form Submission Handler`
   * **Execute as:** `Me (your email address)`
   * **Who has access:** `Anyone` (This is crucial so the website can send data to it).
4. Click **Deploy**.
5. Google will ask you to authorize access. Click **Authorize access**, choose your Google account, click **Advanced**, and then click **Go to Untitled project (unsafe)** or **Allow**.
6. Once deployed, a window will pop up showing the **Web app URL**.
7. **Copy this URL** (it starts with `https://script.google.com/macros/s/...`).

---

## Step 5: Update the URL on your Website
Open your website code directory and find the `.env` file at the root. Replace the placeholder URL with your copied Web app URL:

```env
VITE_GOOGLE_SCRIPT_URL=your_copied_web_app_url_here
```

Done! Now whenever a user submits a form, two tabs (**Registrations** and **Contact Messages**) will automatically be created in your Google Sheet and data will be filled instantly.
