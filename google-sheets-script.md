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
    
    // Process Payment Screenshot Upload to Google Drive if present
    var paymentFileUrl = "";
    if (formType === "registration" && parameter.paymentScreenshot) {
      try {
        var folderName = "Form Filler Payment Screenshots";
        var folder, folders = DriveApp.getFoldersByName(folderName);
        if (folders.hasNext()) {
          folder = folders.next();
        } else {
          folder = DriveApp.createFolder(folderName);
        }
        
        var rawData = parameter.paymentScreenshot.split(",")[1];
        var contentType = parameter.paymentScreenshot.split(";")[0].split(":")[1];
        var decodedData = Utilities.base64Decode(rawData);
        var extension = contentType === "application/pdf" ? ".pdf" : ".png";
        var blob = Utilities.newBlob(decodedData, contentType, "Payment_" + registrationId + "_" + (parameter.name || "User").replace(/\s+/g, "_") + extension);
        var file = folder.createFile(blob);
        file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
        paymentFileUrl = file.getUrl();
      } catch (errUpload) {
        console.error("Failed to upload screenshot to Drive: " + errUpload.toString());
        paymentFileUrl = "Upload failed: " + errUpload.toString();
      }
    }
    
    // Create sheet and set headers if it does not exist
    if (!sheet) {
      sheet = spreadsheet.insertSheet(sheetName);
      
      if (formType === "contact") {
        sheet.appendRow(["Timestamp", "Name", "Email", "Message"]);
      } else {
        sheet.appendRow(["Timestamp", "Registration ID", "Name", "Email", "Phone", "Age", "Address", "Joining As", "Partner Name", "Partner Age", "Partner Email", "Partner Phone", "Partner Address", "How they heard", "Payment Screenshot"]);
      }
      
      // Style headers
      sheet.getRange(1, 1, 1, sheet.getLastColumn())
           .setFontWeight("bold")
           .setBackground("#F3F4F6")
           .setBorder(true, true, true, true, true, true);
    }
    
    // Get existing headers from Row 1
    var headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    
    // Ensure Registration ID, Address, Partner, and Payment columns exist for registrations
    if (formType === "registration") {
      var requiredHeaders = ["Registration ID", "Address", "Partner Name", "Partner Age", "Partner Email", "Partner Phone", "Partner Address", "Payment Screenshot"];
      for (var k = 0; k < requiredHeaders.length; k++) {
        var req = requiredHeaders[k];
        if (headers.indexOf(req) === -1) {
          // Append missing header column at the end
          var newColIndex = headers.length + 1;
          sheet.getRange(1, newColIndex).setValue(req)
               .setFontWeight("bold")
               .setBackground("#F3F4F6")
               .setBorder(true, true, true, true, true, true);
          headers.push(req);
        }
      }
    }
    
    // Map of request parameters to column header names
    var parameterMapping = {
      "name": "Name",
      "email": "Email",
      "phone": "Phone",
      "age": "Age",
      "address": "Address",
      "joiningAs": "Joining As",
      "partnerName": "Partner Name",
      "partnerAge": "Partner Age",
      "partnerEmail": "Partner Email",
      "partnerPhone": "Partner Phone",
      "partnerAddress": "Partner Address",
      "hearAboutUs": "How they heard",
      "message": "Message"
    };
    
    // Build row data dynamically based on the actual sheet column headers
    var rowData = [];
    for (var j = 0; j < headers.length; j++) {
      var headerName = headers[j];
      var cellVal = "";
      
      if (headerName === "Timestamp") {
        cellVal = timestamp;
      } else if (headerName === "Registration ID") {
        cellVal = registrationId;
      } else if (headerName === "Payment Screenshot") {
        cellVal = paymentFileUrl;
      } else {
        // Find matching parameter key
        for (var pKey in parameterMapping) {
          if (parameterMapping[pKey] === headerName) {
            cellVal = parameter[pKey] || "";
            break;
          }
        }
      }
      rowData.push(cellVal);
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
      
      // Helper for Partner details formatting in HTML
      var partnerDetailsHtml = '';
      if (parameter.joiningAs && parameter.joiningAs !== "Solo" && parameter.partnerName) {
        var pNames = (parameter.partnerName || '').split(', ');
        var pAges = (parameter.partnerAge || '').split(', ');
        var pEmails = (parameter.partnerEmail || '').split(', ');
        var pPhones = (parameter.partnerPhone || '').split(', ');
        var pAddresses = (parameter.partnerAddress || '').split(', ');
        
        partnerDetailsHtml += '<tr><td style="padding: 12px 0 6px 0; border-top: 1px solid rgba(140, 106, 92, 0.1);">';
        partnerDetailsHtml += '<span style="font-size: 11px; text-transform: uppercase; color: #8C6A5C; font-weight: bold; letter-spacing: 0.5px;">Partner / Group Member Details</span>';
        partnerDetailsHtml += '</td></tr>';
        
        for (var idx = 0; idx < pNames.length; idx++) {
          if (!pNames[idx]) continue;
          partnerDetailsHtml += '<tr><td style="padding: 10px 14px; background-color: rgba(200, 122, 83, 0.04); border-radius: 12px; margin-bottom: 8px; border: 1px solid rgba(140, 106, 92, 0.08);">';
          partnerDetailsHtml += '<strong style="font-size: 13px; color: #2D1E1A;">Member #' + (idx + 2) + ': ' + pNames[idx] + '</strong>';
          if (pAges[idx]) partnerDetailsHtml += '<span style="font-size: 12px; color: #8C6A5C;"> (' + pAges[idx] + ' Yrs)</span>';
          partnerDetailsHtml += '<br style="margin-bottom: 4px;">';
          if (pEmails[idx]) partnerDetailsHtml += '<span style="font-size: 11px; color: #8C6A5C; display: block; margin: 2px 0;">✉️ ' + pEmails[idx] + '</span>';
          if (pPhones[idx]) partnerDetailsHtml += '<span style="font-size: 11px; color: #8C6A5C; display: block; margin: 2px 0;">📞 ' + pPhones[idx] + '</span>';
          if (pAddresses[idx]) partnerDetailsHtml += '<span style="font-size: 11px; color: #8C6A5C; display: block; margin: 2px 0;">📍 ' + pAddresses[idx] + '</span>';
          partnerDetailsHtml += '</td></tr>';
        }
      }
      
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
        '                <tr>' +
        '                  <td style="padding: 6px 0;">' +
        '                    <span style="font-size: 11px; text-transform: uppercase; color: #8C6A5C; font-weight: bold; letter-spacing: 0.5px;">Participant Details</span><br>' +
        '                    <strong style="font-size: 13px; color: #2D1E1A;">' + (parameter.name || '') + ' (' + (parameter.age || '') + ' Years)</strong>' +
        '                  </td>' +
        '                </tr>' +
        '                <tr>' +
        '                  <td style="padding: 6px 0;">' +
        '                    <span style="font-size: 11px; text-transform: uppercase; color: #8C6A5C; font-weight: bold; letter-spacing: 0.5px;">Address</span><br>' +
        '                    <strong style="font-size: 13px; color: #2D1E1A;">' + (parameter.address || '') + '</strong>' +
        '                  </td>' +
        '                </tr>' +
        partnerDetailsHtml + 
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
      
      // Helper for Partner details formatting in Admin Email
      var organizerPartnerRows = '';
      if (parameter.joiningAs && parameter.joiningAs !== "Solo" && parameter.partnerName) {
        var pNames = (parameter.partnerName || '').split(', ');
        var pAges = (parameter.partnerAge || '').split(', ');
        var pEmails = (parameter.partnerEmail || '').split(', ');
        var pPhones = (parameter.partnerPhone || '').split(', ');
        var pAddresses = (parameter.partnerAddress || '').split(', ');
        
        for (var idx = 0; idx < pNames.length; idx++) {
          if (!pNames[idx]) continue;
          organizerPartnerRows += 
            '      <tr>' +
            '        <td style="font-weight: bold; border-bottom: 1px solid #FFFDFB; background-color: rgba(200, 122, 83, 0.05);">Member #' + (idx + 2) + ' Name</td>' +
            '        <td style="border-bottom: 1px solid #FFFDFB; background-color: rgba(200, 122, 83, 0.05); font-weight: bold;">' + pNames[idx] + '</td>' +
            '      </tr>' +
            '      <tr>' +
            '        <td style="font-weight: bold; border-bottom: 1px solid #FFFDFB;">Member #' + (idx + 2) + ' Age</td>' +
            '        <td style="border-bottom: 1px solid #FFFDFB;">' + (pAges[idx] || '') + ' Years</td>' +
            '      </tr>' +
            '      <tr>' +
            '        <td style="font-weight: bold; border-bottom: 1px solid #FFFDFB;">Member #' + (idx + 2) + ' Email</td>' +
            '        <td style="border-bottom: 1px solid #FFFDFB;"><a href="mailto:' + (pEmails[idx] || '') + '" style="color: #C87A53; text-decoration: none;">' + (pEmails[idx] || '') + '</a></td>' +
            '      </tr>' +
            '      <tr>' +
            '        <td style="font-weight: bold; border-bottom: 1px solid #FFFDFB;">Member #' + (idx + 2) + ' Phone</td>' +
            '        <td style="border-bottom: 1px solid #FFFDFB;">' + (pPhones[idx] || '') + '</td>' +
            '      </tr>' +
            '      <tr>' +
            '        <td style="font-weight: bold; border-bottom: 1px solid #FFFDFB;">Member #' + (idx + 2) + ' Address</td>' +
            '        <td style="border-bottom: 1px solid #FFFDFB;">' + (pAddresses[idx] || '') + '</td>' +
            '      </tr>';
        }
      }
 
      // 2. Compile Organizer Notification HTML Email
      var organizerHtml = 
        '<!DOCTYPE html>' +
        '<html>' +
        '<head>' +
        '  <meta charset="utf-8">' +
        '  <meta name="viewport" content="width=device-width, initial-scale=1.0">' +
        '  <title>New Waitlist Registration</title>' +
        '</head>' +
        '<body style="margin: 0; padding: 20px; background-color: #FAF6F0; font-family: -apple-system, BlinkMacSystemFont, \'Segoe UI\', Roboto, Helvetica, Arial, sans-serif; color: #2D1E1A;">' +
        '  <div style="max-width: 600px; background-color: #FFFDFB; border: 1px solid rgba(140, 106, 92, 0.15); border-radius: 16px; padding: 30px; margin: 0 auto; box-shadow: 0 4px 10px rgba(0,0,0,0.02);">' +
        '    <h2 style="color: #C87A53; margin-top: 0; font-size: 20px; font-weight: 800; border-bottom: 2px solid #FAF6F0; padding-bottom: 15px;">New Workshop Waitlist Registration!</h2>' +
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
        '        <td style="font-weight: bold; border-bottom: 1px solid #FFFDFB;">Address</td>' +
        '        <td style="border-bottom: 1px solid #FFFDFB;">' + (parameter.address || '') + '</td>' +
        '      </tr>' +
        '      <tr>' +
        '        <td style="font-weight: bold; border-bottom: 1px solid #FFFDFB;">Joining As</td>' +
        '        <td style="border-bottom: 1px solid #FFFDFB;">' + (parameter.joiningAs || 'Solo') + '</td>' +
        '      </tr>' +
        organizerPartnerRows +
        '      <tr>' +
        '        <td style="font-weight: bold; border-bottom: 1px solid #FFFDFB;">How They Heard</td>' +
        '        <td style="border-bottom: 1px solid #FFFDFB;">' + (parameter.hearAboutUs || '') + '</td>' +
        '      </tr>' +
        '      <tr>' +
        '        <td style="font-weight: bold; border-bottom: 1px solid #FFFDFB;">Payment Screenshot</td>' +
        '        <td style="border-bottom: 1px solid #FFFDFB;">' + (paymentFileUrl ? '<a href="' + paymentFileUrl + '" style="color: #C87A53; text-decoration: none; font-weight: bold;">View Screenshot</a>' : 'Not Uploaded') + '</td>' +
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
    } else if (formType === "contact") {
      // 1. Compile Contact Confirmation HTML Email
      var contactParticipantHtml = 
        '<!DOCTYPE html>' +
        '<html>' +
        '<head>' +
        '  <meta charset="utf-8">' +
        '  <meta name="viewport" content="width=device-width, initial-scale=1.0">' +
        '  <title>Message Received</title>' +
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
        '              <p style="color: rgba(255, 253, 251, 0.85); margin: 5px 0 0 0; font-size: 12px; font-weight: 600; letter-spacing: 1px; text-transform: uppercase;">Message Received</p>' +
        '            </td>' +
        '          </tr>' +
        '          <!-- Content -->' +
        '          <tr>' +
        '            <td style="padding: 40px 30px;">' +
        '              <h2 style="color: #2D1E1A; margin-top: 0; font-size: 20px; font-weight: 800;">Thank you for reaching out! ✉️</h2>' +
        '              <p style="color: #8C6A5C; font-size: 14px; line-height: 1.6; margin-bottom: 25px;">' +
        '                Hi <strong>' + (parameter.name || '') + '</strong>,<br><br>' +
        '                Thank you for contacting us. We have received your message and our team will get back to you as soon as possible.' +
        '              </p>' +
        '              ' +
        '              <!-- Details Box -->' +
        '              <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #FAF6F0; border-radius: 16px; padding: 20px; margin-bottom: 25px; border: 1px solid rgba(140, 106, 92, 0.1);">' +
        '                <tr>' +
        '                  <td style="padding-bottom: 12px; border-bottom: 1px solid rgba(140, 106, 92, 0.1);">' +
        '                    <span style="font-size: 11px; text-transform: uppercase; color: #8C6A5C; font-weight: bold; letter-spacing: 0.5px;">Your Details</span><br>' +
        '                    <strong style="font-size: 13px; color: #2D1E1A;">' + (parameter.name || '') + ' (' + (parameter.email || '') + ')</strong>' +
        '                  </td>' +
        '                </tr>' +
        '                <tr>' +
        '                  <td style="padding: 12px 0 0 0;">' +
        '                    <span style="font-size: 11px; text-transform: uppercase; color: #8C6A5C; font-weight: bold; letter-spacing: 0.5px;">Your Message</span><br>' +
        '                    <blockquote style="margin: 8px 0 0 0; padding-left: 12px; border-left: 3px solid #C87A53; color: #5C4A44; font-size: 13px; font-style: italic; line-height: 1.5;">' +
        '                      ' + (parameter.message || '') + '' +
        '                    </blockquote>' +
        '                  </td>' +
        '                </tr>' +
        '              </table>' +
        '              ' +
        '              <p style="color: #8C6A5C; font-size: 13px; line-height: 1.6; margin-bottom: 0;">' +
        '                If you have any urgent requests, feel free to contact us via WhatsApp or reply directly to this email.' +
        '              </p>' +
        '            </td>' +
        '          </tr>' +
        '          <!-- Footer -->' +
        '          <tr>' +
        '            <td align="center" style="background-color: #FAF6F0; padding: 25px 20px; border-top: 1px solid rgba(140, 106, 92, 0.08);">' +
        '              <p style="color: #8C6A5C; margin: 0; font-size: 11px; line-height: 1.5;">' +
        '                © 2026 Trayyaai × Ayra. All rights reserved.<br>' +
        '                You received this email because you submitted a contact request on our website.' +
        '              </p>' +
        '            </td>' +
        '          </tr>' +
        '        </table>' +
        '      </td>' +
        '    </tr>' +
        '  </table>' +
        '</body>' +
        '</html>';

      // 2. Compile Organizer Contact Notification HTML Email
      var contactOrganizerHtml = 
        '<!DOCTYPE html>' +
        '<html>' +
        '<head>' +
        '  <meta charset="utf-8">' +
        '  <meta name="viewport" content="width=device-width, initial-scale=1.0">' +
        '  <title>New Contact Message</title>' +
        '</head>' +
        '<body style="margin: 0; padding: 20px; background-color: #FAF6F0; font-family: -apple-system, BlinkMacSystemFont, \'Segoe UI\', Roboto, Helvetica, Arial, sans-serif; color: #2D1E1A;">' +
        '  <div style="max-width: 600px; background-color: #FFFDFB; border: 1px solid rgba(140, 106, 92, 0.15); border-radius: 16px; padding: 30px; margin: 0 auto; box-shadow: 0 4px 10px rgba(0,0,0,0.02);">' +
        '    <h2 style="color: #C87A53; margin-top: 0; font-size: 20px; font-weight: 800; border-bottom: 2px solid #FAF6F0; padding-bottom: 15px;">New Contact Message Received</h2>' +
        '    <p style="color: #2D1E1A; font-size: 14px; line-height: 1.5;">' +
        '      A user has sent a message via the website contact form. Here are the details:' +
        '    </p>' +
        '    ' +
        '    <table border="0" cellpadding="8" cellspacing="0" width="100%" style="font-size: 13px; line-height: 1.5; color: #2D1E1A; margin-top: 20px; background-color: #FAF6F0; border-radius: 8px; overflow: hidden;">' +
        '      <tr>' +
        '        <td width="30%" style="font-weight: bold; border-bottom: 1px solid #FFFDFB;">Sender Name</td>' +
        '        <td style="border-bottom: 1px solid #FFFDFB;">' + (parameter.name || '') + '</td>' +
        '      </tr>' +
        '      <tr>' +
        '        <td style="font-weight: bold; border-bottom: 1px solid #FFFDFB;">Email Address</td>' +
        '        <td style="border-bottom: 1px solid #FFFDFB;"><a href="mailto:' + (parameter.email || '') + '" style="color: #C87A53; text-decoration: none;">' + (parameter.email || '') + '</a></td>' +
        '      </tr>' +
        '      <tr>' +
        '        <td style="font-weight: bold; border-bottom: 1px solid #FFFDFB;">Message</td>' +
        '        <td style="border-bottom: 1px solid #FFFDFB; white-space: pre-wrap;">' + (parameter.message || '') + '</td>' +
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

      // 3. Dispatch emails
      try {
        if (parameter.email) {
          MailApp.sendEmail({
            to: parameter.email,
            subject: "📨 Message Received: Trayyaai × Ayra",
            htmlBody: contactParticipantHtml
          });
        }
      } catch (errParticipant) {
        console.error("Failed to send contact confirmation: " + errParticipant.toString());
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
          subject: "✉️ New Contact Message from " + (parameter.name || "User"),
          htmlBody: contactOrganizerHtml
        });
      } catch (errAdmin) {
        console.error("Failed to send admin contact notification: " + errAdmin.toString());
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
