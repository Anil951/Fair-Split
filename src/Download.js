import jsPDF from "jspdf";
import "jspdf-autotable";

export const downloadReceipt = (users, expenses) => {
  const doc = new jsPDF();
  doc.setFontSize(20);
  let currentY = 20;
//   doc.text("Fair Split",doc.internal.pageSize.width / 2, 20, null, null, 'center');
//   currentY += 5;

//   doc.setLineWidth(0.5);
//   doc.line(20, 25, doc.internal.pageSize.width - 20, 25);
  
//     currentY += 10;

    doc.setFont("helvetica", "normal");  // Default font for the rest of the content
  doc.setFontSize(12);

  users.forEach((user, index) => {
    // Display user's name and total expense
    doc.setFontSize(14);
    doc.text(`Name: ${user.name}`, 10, currentY);
    currentY += 10;
    doc.text(`Total Expense: ₹${user.expense.toFixed(2)}`, 10, currentY);
    currentY += 10;

    // Extract the user's specific expenses
    const userExpenses = expenses.map((expense) => {
      const items = expense.items
        .filter((item) => item.users.find((u) => u.id === user.name && u.checked))
        .map((item) => ({
          expense: item.expense,
          value: (item.value / item.users.filter((u) => u.checked).length).toFixed(2),
        }));
      return { title: expense.title, items };
    }).filter((expense) => expense.items.length > 0);

    if (userExpenses.length > 0) {
      // Display each expense with a separate table
      userExpenses.forEach((expense) => {
        doc.setFontSize(12);
        doc.text(expense.title, 20, currentY);
        currentY += 5;

        doc.autoTable({
          startY: currentY,
          head: [["Expense", "Share"]],
          body: expense.items.map((item) => [item.expense, `₹${item.value}`]),
          margin: { left: 20, right: 20 },
          theme: "grid",
        });

        // Move currentY to after the table
        currentY = doc.lastAutoTable.finalY + 10;
      });
    } else {
      // Add extra space if no expenses found
      currentY += 10;
    }

    // Draw a line to separate users, except after the last user
    if (index < users.length - 1) {
      doc.setDrawColor(0); // Set line color to black
      doc.setLineWidth(0.5); // Set line thickness
      doc.line(10, currentY, 200, currentY); // Draw line from (10, currentY) to (200, currentY)
      currentY += 10; // Move currentY down for spacing after the line
    }
  });

  doc.save("fairsplit.pdf");
};
