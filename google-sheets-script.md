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
    
    var registrationId = parameter.registrationId || "TAY-" + Math.floor(100000 + Math.random() * 900000).toString();
    var timestamp = new Date();
    
    // Create sheet and set headers if it does not exist
    if (!sheet) {
      sheet = spreadsheet.insertSheet(sheetName);
      
      if (formType === "contact") {
        sheet.appendRow(["Timestamp", "Name", "Email", "Message"]);
      } else {
        sheet.appendRow(["Timestamp", "Registration ID", "Name", "Email", "Phone", "Age", "Joining As", "Partner Name", "Partner Age", "How they heard"]);
      }
      
      // Style headers
      sheet.getRange(1, 1, 1, sheet.getLastColumn())
           .setFontWeight("bold")
           .setBackground("#F3F4F6")
           .setBorder(true, true, true, true, true, true);
    }
    
    var rowData = [];
    rowData.push(timestamp); // Timestamp
    
    if (formType === "contact") {
      rowData.push(parameter.name || "");
      rowData.push(parameter.email || "");
      rowData.push(parameter.message || "");
    } else {
      rowData.push(registrationId); // Registration ID
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
    
    // Format timestamp column
    sheet.getRange(2, 1, sheet.getLastRow() - 1, 1).setNumberFormat("yyyy-mm-dd hh:mm:ss");
    
    // Auto-fit columns
    for (var i = 1; i <= sheet.getLastColumn(); i++) {
      sheet.autoResizeColumn(i);
    }
    
    // If it's a registration, trigger email notifications
    if (formType === "registration") {
      
      // 1. Compile Participant Confirmation HTML Email
      var participantHtml = 
        '<!DOCTYPE html>' +
        '<html>' +
        '<head>' +
        '  <meta charset="utf-8">' +
        '  <meta name="viewport" content="width=device-width, initial-scale=1.0">' +
        '  <title>Registration Confirmed</title>' +
        '</head>' +
        '<body style="margin: 0; padding: 0; background-color: #FAF6F0; font-family: -apple-system, BlinkMacSystemFont, \'Segoe UI\', Roboto, Helvetica, Arial, sans-serif; color: #2D1E1A;">' +
        '  <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #FAF6F0; padding: 20px 0;">' +
        '    <tr>' +
        '      <td align="center">' +
        '        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; background-color: #FFFDFB; border: 1px solid rgba(140, 106, 92, 0.15); border-radius: 24px; overflow: hidden; box-shadow: 0 4px 10px rgba(0,0,0,0.02);">' +
        '          <!-- Header Banner -->' +
        '          <tr>' +
        '            <td align="center" style="background-color: #C87A53; padding: 30px 20px;">' +
        '              <h1 style="color: #FFFDFB; margin: 0; font-size: 24px; font-weight: 800; letter-spacing: 2px; text-transform: uppercase;">TRAYYAAI × AYRA</h1>' +
        '              <p style="color: rgba(255, 253, 251, 0.85); margin: 5px 0 0 0; font-size: 12px; font-weight: 600; letter-spacing: 1px; text-transform: uppercase;">Friendship Day DIY Studio</p>' +
        '            </td>' +
        '          </tr>' +
        '          <!-- Content -->' +
        '          <tr>' +
        '            <td style="padding: 40px 30px;">' +
        '              <h2 style="color: #2D1E1A; margin-top: 0; font-size: 20px; font-weight: 800;">You\'re on the list! 🎉</h2>' +
        '              <p style="color: #8C6A5C; font-size: 14px; line-height: 1.6; margin-bottom: 25px;">' +
        '                Hi <strong>' + (parameter.name || '') + '</strong>,<br><br>' +
        '                Thank you for registering your interest! Your preference details have been securely recorded. You are now placed on our <strong>Priority Waitlist</strong>, meaning you will receive notifications and booking links the exact moment official ticket sales go live.' +
        '              </p>' +
        '              ' +
        '              <!-- Details Box -->' +
        '              <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #FAF6F0; border-radius: 16px; padding: 20px; margin-bottom: 25px; border: 1px solid rgba(140, 106, 92, 0.1);">' +
        '                <tr>' +
        '                  <td style="padding-bottom: 12px; border-bottom: 1px solid rgba(140, 106, 92, 0.1);">' +
        '                    <span style="font-size: 11px; text-transform: uppercase; color: #8C6A5C; font-weight: bold; letter-spacing: 0.5px;">Registration ID</span><br>' +
        '                    <strong style="font-size: 16px; color: #C87A53; letter-spacing: 0.5px;">' + registrationId + '</strong>' +
        '                  </td>' +
        '                </tr>' +
        '                <tr>' +
        '                  <td style="padding: 12px 0 6px 0;">' +
        '                    <span style="font-size: 11px; text-transform: uppercase; color: #8C6A5C; font-weight: bold; letter-spacing: 0.5px;">Workshop Name</span><br>' +
        '                    <strong style="font-size: 13px; color: #2D1E1A;">Friendship Day DIY Experience</strong>' +
        '                  </td>' +
        '                </tr>' +
        '                <tr>' +
        '                  <td style="padding: 6px 0;">' +
        '                    <span style="font-size: 11px; text-transform: uppercase; color: #8C6A5C; font-weight: bold; letter-spacing: 0.5px;">Format Option</span><br>' +
        '                    <strong style="font-size: 13px; color: #2D1E1A;">' + (parameter.joiningAs || 'Solo') + '</strong>' +
        '                  </td>' +
        '                </tr>' +
        (parameter.joiningAs === "Duo" ? 
        '                <tr>' +
        '                  <td style="padding: 6px 0;">' +
        '                    <span style="font-size: 11px; text-transform: uppercase; color: #8C6A5C; font-weight: bold; letter-spacing: 0.5px;">Partner Details</span><br>' +
        '                    <strong style="font-size: 13px; color: #2D1E1A;">' + (parameter.partnerName || '') + ' (' + (parameter.partnerAge || '') + ' Years)</strong>' +
        '                  </td>' +
        '                </tr>' : '') +
        '                <tr>' +
        '                  <td style="padding: 6px 0;">' +
        '                    <span style="font-size: 11px; text-transform: uppercase; color: #8C6A5C; font-weight: bold; letter-spacing: 0.5px;">Participant Age</span><br>' +
        '                    <strong style="font-size: 13px; color: #2D1E1A;">' + (parameter.age || '') + ' Years</strong>' +
        '                  </td>' +
        '                </tr>' +
        '                <tr>' +
        '                  <td style="padding: 6px 0;">' +
        '                    <span style="font-size: 11px; text-transform: uppercase; color: #8C6A5C; font-weight: bold; letter-spacing: 0.5px;">Date</span><br>' +
        '                    <strong style="font-size: 13px; color: #2D1E1A;">Friendship Day (Sunday, August 2, 2026)</strong>' +
        '                  </td>' +
        '                </tr>' +
        '                <tr>' +
        '                  <td style="padding: 6px 0 0 0;">' +
        '                    <span style="font-size: 11px; text-transform: uppercase; color: #8C6A5C; font-weight: bold; letter-spacing: 0.5px;">Venue</span><br>' +
        '                    <strong style="font-size: 13px; color: #2D1E1A;">Mathura, Uttar Pradesh (Exact location shared upon booking)</strong>' +
        '                  </td>' +
        '                </tr>' +
        '              </table>' +
        '              ' +
        '              <p style="color: #8C6A5C; font-size: 13px; line-height: 1.6; margin-bottom: 0;">' +
        '                If you have any questions or would like to confirm your details, feel free to reply to this email or contact us at <a href="mailto:hello@trayyaai.com" style="color: #C87A53; text-decoration: none; font-weight: bold;">hello@trayyaai.com</a>.' +
        '              </p>' +
        '            </td>' +
        '          </tr>' +
        '          <!-- Footer -->' +
        '          <tr>' +
        '            <td align="center" style="background-color: #FAF6F0; padding: 25px 20px; border-top: 1px solid rgba(140, 106, 92, 0.08);">' +
        '              <p style="color: #8C6A5C; margin: 0; font-size: 11px; line-height: 1.5;">' +
        '                © 2026 Trayyaai × Ayra. All rights reserved.<br>' +
        '                You received this email because you registered your interest on our website.' +
        '              </p>' +
        '            </td>' +
        '          </tr>' +
        '        </table>' +
        '      </td>' +
        '    </tr>' +
        '  </table>' +
        '</body>' +
        '</html>';

      // 2. Compile Organizer Notification HTML Email
      var organizerHtml = 
        '<!DOCTYPE html>' +
        '<html>' +
        '<head>' +
        '  <meta charset="utf-8">' +
        '  <meta name="viewport" content="width=device-width, initial-scale=1.0">' +
        '  <title>New Registration Notification</title>' +
        '</head>' +
        '<body style="margin: 0; padding: 20px; background-color: #FAF6F0; font-family: -apple-system, BlinkMacSystemFont, \'Segoe UI\', Roboto, Helvetica, Arial, sans-serif; color: #2D1E1A;">' +
        '  <div style="max-width: 600px; background-color: #FFFDFB; border: 1px solid rgba(140, 106, 92, 0.15); border-radius: 16px; padding: 30px; margin: 0 auto; box-shadow: 0 4px 10px rgba(0,0,0,0.02);">' +
        '    <h2 style="color: #C87A53; margin-top: 0; font-size: 20px; font-weight: 800; border-bottom: 2px solid #FAF6F0; padding-bottom: 15px;">New Workshop Registration Received!</h2>' +
        '    <p style="color: #2D1E1A; font-size: 14px; line-height: 1.5;">' +
        '      A new user has successfully registered their interest in the DIY Experience workshop. Here are the details:' +
        '    </p>' +
        '    ' +
        '    <table border="0" cellpadding="8" cellspacing="0" width="100%" style="font-size: 13px; line-height: 1.5; color: #2D1E1A; margin-top: 20px; background-color: #FAF6F0; border-radius: 8px; overflow: hidden;">' +
        '      <tr>' +
        '        <td width="35%" style="font-weight: bold; border-bottom: 1px solid #FFFDFB;">Registration ID</td>' +
        '        <td style="border-bottom: 1px solid #FFFDFB; color: #C87A53; font-weight: bold;">' + registrationId + '</td>' +
        '      </tr>' +
        '      <tr>' +
        '        <td style="font-weight: bold; border-bottom: 1px solid #FFFDFB;">Full Name</td>' +
        '        <td style="border-bottom: 1px solid #FFFDFB;">' + (parameter.name || '') + '</td>' +
        '      </tr>' +
        '      <tr>' +
        '        <td style="font-weight: bold; border-bottom: 1px solid #FFFDFB;">Email Address</td>' +
        '        <td style="border-bottom: 1px solid #FFFDFB;"><a href="mailto:' + (parameter.email || '') + '" style="color: #C87A53; text-decoration: none;">' + (parameter.email || '') + '</a></td>' +
        '      </tr>' +
        '      <tr>' +
        '        <td style="font-weight: bold; border-bottom: 1px solid #FFFDFB;">Phone Number</td>' +
        '        <td style="border-bottom: 1px solid #FFFDFB;">' + (parameter.phone || '') + '</td>' +
        '      </tr>' +
        '      <tr>' +
        '        <td style="font-weight: bold; border-bottom: 1px solid #FFFDFB;">Age</td>' +
        '        <td style="border-bottom: 1px solid #FFFDFB;">' + (parameter.age || '') + ' Years</td>' +
        '      </tr>' +
        '      <tr>' +
        '        <td style="font-weight: bold; border-bottom: 1px solid #FFFDFB;">Joining As</td>' +
        '        <td style="border-bottom: 1px solid #FFFDFB;">' + (parameter.joiningAs || 'Solo') + '</td>' +
        '      </tr>' +
        (parameter.joiningAs === "Duo" ? 
        '      <tr>' +
        '        <td style="font-weight: bold; border-bottom: 1px solid #FFFDFB;">Partner Name</td>' +
        '        <td style="border-bottom: 1px solid #FFFDFB;">' + (parameter.partnerName || '') + '</td>' +
        '      </tr>' +
        '      <tr>' +
        '        <td style="font-weight: bold; border-bottom: 1px solid #FFFDFB;">Partner Age</td>' +
        '        <td style="border-bottom: 1px solid #FFFDFB;">' + (parameter.partnerAge || '') + ' Years</td>' +
        '      </tr>' : '') +
        '      <tr>' +
        '        <td style="font-weight: bold; border-bottom: 1px solid #FFFDFB;">How They Heard</td>' +
        '        <td style="border-bottom: 1px solid #FFFDFB;">' + (parameter.hearAboutUs || '') + '</td>' +
        '      </tr>' +
        '      <tr>' +
        '        <td style="font-weight: bold;">Timestamp</td>' +
        '        <td>' + Utilities.formatDate(timestamp, "GMT+5:30", "yyyy-MM-dd HH:mm:ss") + '</td>' +
        '      </tr>' +
        '    </table>' +
        '    ' +
        '    <p style="color: #8C6A5C; font-size: 11px; margin-top: 25px; border-top: 1px solid #FAF6F0; padding-top: 15px; text-align: center;">' +
        '      This notification was automatically sent by the DIY Experience Form System.' +
        '    </p>' +
        '  </div>' +
        '</body>' +
        '</html>';

      // 3. Dispatch emails (wrapped in try-catch so errors do not halt execution)
      try {
        if (parameter.email) {
          MailApp.sendEmail({
            to: parameter.email,
            subject: "🎨 Registration Confirmed! Friendship Day DIY Experience (ID: " + registrationId + ")",
            htmlBody: participantHtml
          });
        }
      } catch (errParticipant) {
        console.error("Failed to send participant confirmation: " + errParticipant.toString());
      }
      
      try {
        var adminEmail = "hello@trayyaai.com";
        var activeUserEmail = Session.getActiveUser().getEmail();
        var adminRecipients = [adminEmail];
        
        if (activeUserEmail && activeUserEmail !== adminEmail) {
          adminRecipients.push(activeUserEmail);
        }
        
        MailApp.sendEmail({
          to: adminRecipients.join(","),
          subject: "✨ New Registration: " + (parameter.name || "Attendee") + " (" + (parameter.joiningAs || "Solo") + ") - ID: " + registrationId,
          htmlBody: organizerHtml
        });
      } catch (errAdmin) {
        console.error("Failed to send admin notification: " + errAdmin.toString());
      }
    }
    
    return ContentService.createTextOutput(JSON.stringify({ status: "success", registrationId: registrationId, message: "Data recorded successfully" }))
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
