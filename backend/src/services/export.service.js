import ExcelJS from "exceljs";
import PDFDocument from "pdfkit";
import { createObjectCsvStringifier } from "csv-writer";

class ExportService {

    // ==========================================
    // CSV
    // ==========================================

    async exportCSV(res, fileName, headers, data) {

        const csvStringifier =
            createObjectCsvStringifier({

                header: headers

            });

        const csv =
            csvStringifier.getHeaderString() +

            csvStringifier.stringifyRecords(data);

        res.setHeader(
            "Content-Type",
            "text/csv"
        );

        res.setHeader(
            "Content-Disposition",
            `attachment; filename="${fileName}.csv"`
        );

        return res.send(csv);

    }

    // ==========================================
    // Excel
    // ==========================================

    async exportExcel(res, fileName, headers, data) {

        const workbook =
            new ExcelJS.Workbook();

        const worksheet =
            workbook.addWorksheet(fileName);

        worksheet.columns =
            headers.map(header => ({

                header: header.title,

                key: header.id,

                width: 25

            }));

        data.forEach(row => {

            worksheet.addRow(row);

        });

        worksheet.getRow(1).font = {

            bold: true

        };

        worksheet.getRow(1).fill = {

            type: "pattern",

            pattern: "solid",

            fgColor: {

                argb: "2563EB"

            }

        };

        worksheet.getRow(1).font = {

            color: {

                argb: "FFFFFF"

            },

            bold: true

        };

        res.setHeader(

            "Content-Type",

            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"

        );

        res.setHeader(

            "Content-Disposition",

            `attachment; filename="${fileName}.xlsx"`

        );

        await workbook.xlsx.write(res);

        res.end();

    }

    // ==========================================
    // PDF
    // ==========================================

    async exportPDF(res, fileName, headers, data) {

        const doc = new PDFDocument({

            margin: 30,

            size: "A4"

        });

        res.setHeader(

            "Content-Type",

            "application/pdf"

        );

        res.setHeader(

            "Content-Disposition",

            `attachment; filename="${fileName}.pdf"`

        );

        doc.pipe(res);

        doc
            .fontSize(20)
            .text(fileName, {

                align: "center"

            });

        doc.moveDown();

        data.forEach((row, index) => {

            doc
                .fontSize(12)
                .text(`${index + 1}.`);

            headers.forEach(header => {

                doc.text(

                    `${header.title}: ${row[header.id] ?? "-"}`

                );

            });

            doc.moveDown();

        });

        doc.end();

    }

}

export default new ExportService();