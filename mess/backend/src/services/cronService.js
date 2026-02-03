import cron from "node-cron";
import nodemailer from "nodemailer";
import WaterEntry from "../models/WaterEntry.model.js";

/* ================= CONFIG ================= */
const FIXED_MEMBERS = ["Santu Da", "Subhadip", "Rajdeep"];

/* ================= LOGIC TO GENERATE REPORT ================= */
export async function sendMonthlyReport(year, month, recipientsOverride = []) {
  const monthStr = String(month).padStart(2, "0");
  const dateObj = new Date(year, month - 1, 1);
  const monthName = dateObj.toLocaleString("default", { month: "long", year: "numeric" });
  
  console.log(`⏳ Generating report for ${monthName}...`);

  // Initialize transporter here to ensure env vars are loaded (ESM hoisting fix)
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });

  try {
    const startDate = `${year}-${monthStr}-01`;
    const dateRegex = new RegExp(`^${year}-${monthStr}`);

    // 2. Fetch Data
    const entries = await WaterEntry.find({ date: { $regex: dateRegex } }).sort({ date: 1 });

    if (entries.length === 0) {
      console.log(`No entries found for ${monthName}.`);
      // We might still want to alert the admin that no data exists if manually triggered, 
      // but for now logging is fine.
    }

    // 3. Process Data
    let totalBottles = 0;
    let totalAmount = 0;
    const summary = {};
    const contributions = {};

    FIXED_MEMBERS.forEach((m) => (contributions[m] = 0));

    entries.forEach((entry) => {
      totalBottles += entry.bottles;
      totalAmount += entry.totalAmount;

      // Summary
      summary[entry.paidBy] = (summary[entry.paidBy] || 0) + entry.totalAmount;

      // Settlement
      const payer = FIXED_MEMBERS.find((m) => m.toLowerCase() === entry.paidBy.trim().toLowerCase());
      if (payer) contributions[payer] += entry.totalAmount;
    });

    // Settlement Calc
    const average = FIXED_MEMBERS.length > 0 ? totalAmount / FIXED_MEMBERS.length : 0;
    let settlementRows = "";

    FIXED_MEMBERS.forEach((member) => {
      const paid = contributions[member];
      const diff = paid - average;
      
      let statusBadge = "";
      if (diff > 0) {
        statusBadge = `<span style="background-color: rgba(91, 192, 190, 0.2); color: #5bc0be; padding: 4px 12px; border-radius: 9999px; font-size: 12px; font-weight: 700;">Got ₹${Math.abs(diff).toFixed(0)}</span>`;
      } else if (diff < 0) {
        statusBadge = `<span style="background-color: rgba(239, 68, 68, 0.2); color: #fca5a5; padding: 4px 12px; border-radius: 9999px; font-size: 12px; font-weight: 700;">Give ₹${Math.abs(diff).toFixed(0)}</span>`;
      } else {
        statusBadge = `<span style="color: #9ca3af; font-size: 12px;">-</span>`;
      }

      settlementRows += `
        <tr style="border-bottom: 1px solid rgba(111, 255, 233, 0.1);">
          <td style="padding: 12px;">${member}</td>
          <td style="padding: 12px; text-align: right; color: #6fffe9;">₹${paid}</td>
          <td style="padding: 12px; text-align: right; opacity: 0.7;">₹${average.toFixed(0)}</td>
          <td style="padding: 12px; text-align: center;">${statusBadge}</td>
        </tr>
      `;
    });

    // Summary HTML
    let summaryHtml = "";
    Object.entries(summary).forEach(([name, amount]) => {
      summaryHtml += `
        <div style="background-color: rgba(0, 8, 20, 0.4); border-radius: 12px; padding: 12px 16px; margin-bottom: 8px; border: 1px solid rgba(111, 255, 233, 0.1); display: flex; justify-content: space-between;">
           <span style="font-weight: bold; color: #eaeaea;">${name}</span>
           <span style="color: #6fffe9; font-weight: bold;">₹${amount}</span>
        </div>
      `;
    });

    // Table HTML
    let tableRows = "";
    entries.forEach((e) => {
       tableRows += `
         <tr style="background-color: rgba(0, 8, 20, 0.2);">
            <td style="padding: 8px 12px; color: #eaeaea;">${e.date}</td>
            <td style="padding: 8px 12px; color: #6fffe9;">${e.paidBy}</td>
            <td style="padding: 8px 12px; text-align: right; color: #eaeaea;">${e.bottles}</td>
            <td style="padding: 8px 12px; text-align: right; color: #eaeaea;">₹${e.totalAmount}</td>
         </tr>
       `;
    });

    // 4. Construct Email HTML
    const emailHtml = `
      <div style="background-color: #0b132b; color: #eaeaea; font-family: sans-serif; padding: 20px;">
        <div style="max-width: 600px; margin: 0 auto;">
          <h1 style="text-align: center; color: #6fffe9; font-size: 24px; margin-bottom: 10px;">AquaMonitor Report</h1>
          <h2 style="text-align: center; color: #eaeaea; font-size: 18px; margin-bottom: 20px;">${monthName}</h2>
          
          <div style="background: rgba(91, 192, 190, 0.1); border: 1px solid rgba(111, 255, 233, 0.3); border-radius: 16px; padding: 20px; margin-bottom: 20px;">
            <h3 style="color: #eaeaea; border-bottom: 1px solid rgba(111, 255, 233, 0.2); padding-bottom: 8px; margin-top: 0;">Expense Summary</h3>
            ${summaryHtml}
          </div>

          <div style="background: rgba(91, 192, 190, 0.1); border: 1px solid rgba(111, 255, 233, 0.3); border-radius: 16px; padding: 20px; margin-bottom: 20px;">
            <h3 style="color: #eaeaea; border-bottom: 1px solid rgba(111, 255, 233, 0.2); padding-bottom: 8px; margin-top: 0;">Settlement Breakdown</h3>
            <p style="color: #eaeaea; opacity: 0.7; font-size: 14px;">Per Head Share: <span style="color: #6fffe9; font-weight: bold;">₹${average.toFixed(2)}</span></p>
            <table style="width: 100%; border-collapse: separate; border-spacing: 0 4px; font-size: 14px;">
              <thead>
                <tr>
                   <th style="padding: 8px; text-align: left; color: #6fffe9;">Name</th>
                   <th style="padding: 8px; text-align: right; color: #6fffe9;">Paid</th>
                   <th style="padding: 8px; text-align: right; color: #6fffe9;">Per Head</th>
                   <th style="padding: 8px; text-align: center; color: #6fffe9;">Status</th>
                </tr>
              </thead>
              <tbody style="color: #eaeaea;">
                ${settlementRows}
              </tbody>
            </table>
          </div>

          <div style="background: rgba(91, 192, 190, 0.1); border: 1px solid rgba(111, 255, 233, 0.3); border-radius: 16px; padding: 20px;">
             <h3 style="color: #eaeaea; border-bottom: 1px solid rgba(111, 255, 233, 0.2); padding-bottom: 8px; margin-top: 0;">Detailed Log</h3>
             <table style="width: 100%; border-collapse: separate; border-spacing: 0 4px; font-size: 14px;">
              <thead>
                <tr>
                   <th style="padding: 8px; text-align: left; color: #6fffe9;">Date</th>
                   <th style="padding: 8px; text-align: left; color: #6fffe9;">Paid By</th>
                   <th style="padding: 8px; text-align: right; color: #6fffe9;">Bottles</th>
                   <th style="padding: 8px; text-align: right; color: #6fffe9;">Amount</th>
                </tr>
              </thead>
              <tbody style="color: #eaeaea;">
                ${tableRows}
              </tbody>
            </table>
             <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid rgba(111, 255, 233, 0.3); text-align: right;">
                <p style="margin: 4px 0;">Total Bottles: <strong style="color: #6fffe9; font-size: 18px;">${totalBottles}</strong></p>
                <p style="margin: 4px 0;">Total Amount: <strong style="color: #6fffe9; font-size: 18px;">₹${totalAmount}</strong></p>
             </div>
          </div>
        </div>
      </div>
    `;

    // 5. Send Email
    // If override provided, use it. Else use env defaults.
    let recipients = recipientsOverride;
    
    if (recipients.length === 0) {
        recipients = [
          process.env.RAJDEEP_MAIL,
          process.env.SUBHADIP_MAIL,
          process.env.SANTU_MAIL,
        ].filter(Boolean);
    }

    if (recipients.length === 0) {
      console.log("No recipients defined.");
      return;
    }

    await transporter.sendMail({
      from: `"AquaMonitor" <${process.env.MAIL_USER}>`,
      to: recipients,
      subject: `AquaMonitor Report - ${monthName}`,
      html: emailHtml,
    });

    console.log(`✅ Report sent to ${recipients.length} recipients for ${monthName}`);
    return { success: true, message: `Email sent to ${recipients.length} recipients` };

  } catch (err) {
    console.error("❌ Error generating report:", err);
    throw err; // Re-throw for controller to catch
  }
}

/* ================= CRON WRAPPER ================= */
async function runCronJob() {
    const now = new Date();
    // Previous Month Logic
    const targetDate = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const year = targetDate.getFullYear();
    const month = targetDate.getMonth() + 1;
    
    await sendMonthlyReport(year, month);
}


/* ================= SCHEDULING ================= */
export const initCronJobs = () => {
  // 12:05 AM on the 1st of every month
  cron.schedule("5 0 1 * *", () => {
    console.log("⏰ Triggering monthly report job...");
    runCronJob();
  });
  
  console.log("📅 Monthly Email Cron Job Scheduled (5 0 1 * *)");
};
