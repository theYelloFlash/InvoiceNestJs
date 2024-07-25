import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import Handlebars from 'handlebars';
import { Model } from 'mongoose';
import { GenericService } from 'src/Shared/generic.service';
import { InvoiceDto } from 'src/dataModels/DTO/Invoice.dto';
import { Invoice } from 'src/dataModels/Schemas/invoiceSchema';
import * as puppeteer from 'puppeteer';
import { ItemDetail } from 'src/Interface/Requests/invoice.request';
import { toWords } from 'number-to-words';


@Injectable()
export class InvoiceService extends GenericService<InvoiceDto, Invoice> {
    constructor(@InjectModel(Invoice.name) private invoiceModel: Model<Invoice>) {
        super(invoiceModel);
    }

    convertDate(invoiceDate: Date) {
        invoiceDate = new Date(invoiceDate);
        const options: Intl.DateTimeFormatOptions = {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        };
        return invoiceDate.toLocaleDateString('en-US', options);
    }

    async generatePdf(data: Invoice): Promise<Buffer> {
        const invoiceDate = this.convertDate(data.invoiceDate);
        const dueDate = this.convertDate(data.dueDate);

        let itemDetails = '';
        data.itemDetails.forEach((item: ItemDetail, index) => {
            itemDetails += `
                <tr>
                    <td style="font-weight: bold;text-align: center;">${index + 1}</td>
                    <td style="text-align: center;">${item.itemDescription}</td>
                    <td style="text-align: center;">${item.unitCost}</td>
                    <td style="text-align: center;">${item.quantity}</td>
                    <td style="text-align: center;">${item.gstPercentage}</td>
                    <td style="text-align: center;">${item.amount}</td>
                </tr>`
        })

        const template = `
        <!DOCTYPE html>
            <html>
                <head>
                    <title>Invoice</title>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        padding : 35px;
                    }
                    .header {
                        position: absolute; 
                        top: 15px;
                        right: 45px; 
                    }
                    .image-header{
                        position: absolute; 
                        top: 105px;
                        right: 3px;
                        width: 130px;
                        height: 40px;
                    }
                    .invoice-heading{
                        color: grey;
                        font-weight : 800;
                        font-size : 42px;
                    }
                    .header-container{
                        display : flex;
                        justify-content : space-between;
                        border-bottom: 2px solid black
                    }
                    .company-info {
                        width : 50%;
                        font-size: 12px;
                        text-align: left;
                    }
                    .address-billing{
                        display : flex;
                    }
                    .address, .billing {
                        width: 50%;
                    }
                    .billing {
                        text-align: right;
                    }
                    table {
                        width: 100%;
                        border-collapse: collapse;
                        margin-top: 20px;
                    }
                    th, td {
                        border: 1px solid #000;
                        padding: 8px;
                        text-align: left;
                    }
                    th {
                        background-color: #f2f2f2;
                    }
                    .total {
                        text-align: right;
                    }
                    footer{
                        position : absolute;
                        bottom : 20px;
                        border-top : 2px solid black;
                    }
                </style>
                </head>
                    <body>
                        <div class="header-container">
                            <div class="company-info">
                                <h2>Spundan Consultancy And IT Solutions Pvt. Ltd.</h2>
                                <p>M-12 Sai Ram Plaza, 63 Mangal Nagar Vishnu Puri Colony<br>
                                    Indore - 452001, Madhya Pradesh, India<br>
                                    Website: <a href="http://www.spundan.com">www.spundan.com</a> Email: info@spundan.com<br>
                                    CIN: U72200MP2011PTC025132 GSTIN: 23AAPCS2658Q1ZK
                                </p>
                            </div>
                            <div> </div>
                        </div>
                        <div class="header">
                                <p class="invoice-heading">INVOICE</p>
                                <img class="image-header" src="https://spundan.com/assets/logo.png" alt="Company Logo"> 
                            </div>
   
                        <div class="address-billing">
                            <div class="address">
                                <p>To:<br>
                                <strong>${data.userName}</strong><br>
                                3rd Floor, Sigma Arcade, Varthur Main Road,<br>
                                Marathalli, Bengaluru<br>
                                Karnataka 560037</p>
                            </div>
                            <div class="billing">
                                <p>BILLING ADDRESS:<br>
                                <strong>Codersbrain</strong><br>
                                3rd Floor, Sigma Arcade, Varthur Main Road,<br>
                                Marathalli, Bengaluru<br>
                                Karnataka 560037</p>
                            </div>
                        </div>
                        <table>
                            <tr>
                                <th>S.No</th>
                                <th>PARTICULARS</th>
                                <th>Unit Cost</th>
                                <th>Quantity</th>
                                <th>Gst(%)</th>
                                <th>AMOUNT (INR)</th>
                            </tr>
                            ${itemDetails}
                            <tr>
                                <td colspan="5" class="total">Total Amount</td>
                                <td>₹ ${data.totalWithutGst}</td>
                            </tr>
                            <tr>
                                <td colspan="5" class="total">GST Amount  </td>
                                <td>₹ ${data.totalGstAmount}</td>
                            </tr>
                            <tr>
                                <td colspan="5" class="total">Grand Total</td>
                                <td><strong>₹ ${data.subTotal} </strong></td>
                            </tr>
                        </table>
                        <p>Amount in Words: <strong>${toWords(data.subTotal).toUpperCase()} Rupees Only</strong></p>
                        <p>For Director,<br>
                        <strong>SANJAY WADHWANI</strong></p>
                        <footer>
                            <p>Spundan Consultancy And IT Solutions Pvt. Ltd.<br>
                            M-12 Sai Ram Plaza, 63 Mangal Nagar Vishnu Puri Colony, Indore - 452001, Madhya Pradesh, India<br>
                            Website: <a href="http://www.spundan.com">www.spundan.com</a> Email: info@spundan.com</p>
                        </footer>
                    </body>
                </html>`

        // const template = `
        //   <!DOCTYPE html>
        //   <html>
        //   <head>
        //       <title>Invoice</title>
        //   </head>
        //   <body>
        //   <h1 class="header" style="text-align: center;"><strong>Invoice Details</strong></h1>
        //   <br>
        //   <div><strong>User Name:</strong> <span id="userName"> ${data.userName}</span></div>
        //   <br>
        //   <div><strong>Billing To: </strong> <span id="billingTo"> ${data.billingTo}</span></div>
        //   <br>
        //   <div><strong>Invoice Date: </strong> <span id="invoiceDate"> ${invoiceDate}</span></div>
        //   <br>
        //   <div><strong>Due Date: </strong><span id="dueDate"> ${dueDate}</span></div>
        //   <br>
        //   <div><strong> Description: </strong><span id="description"> ${data.description}</span></div>

        //   <div><strong> Invoice No: </strong><span id="description"> ${data.uuid.slice(1,8)}</span></div>

        //   <br> <br>
        //   <table style="width:100%">
        //   <tr>
        //   <th> No </th>
        //   <th> Product Name </th>
        //   <th> Unit Cost </th>
        //   <th> Quantity</th>
        //   <th> Gst % </th>
        //   <th> Amount </th>
        //   <tr>
        //   <div id="itemDetails" class="item-details">${itemDetails}</div>
        //   </table>
        //   <br><br>

        //   <div>Subtotal: ₹<span id="subTotal">${data.subTotal}</span></div>
        //   </body>
        //   </html>
        // `;

        // Launch a headless browser
        const browser = await puppeteer.launch();
        const page = await browser.newPage();

        // Set the HTML content
        await page.setContent(template);

        // Generate PDF from the content
        const pdfBuffer = await page.pdf({ format: 'A4' });

        // Close the browser
        await browser.close();

        return pdfBuffer;
    }

}
