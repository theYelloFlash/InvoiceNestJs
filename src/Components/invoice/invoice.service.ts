import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import Handlebars from 'handlebars';
import { Model } from 'mongoose';
import { GenericService } from 'src/Shared/generic.service';
import { InvoiceDto } from 'src/dataModels/DTO/Invoice.dto';
import { Invoice } from 'src/dataModels/Schemas/invoiceSchema';
import * as puppeteer from 'puppeteer';


@Injectable()
export class InvoiceService extends GenericService<InvoiceDto, Invoice>{
    constructor(@InjectModel(Invoice.name) private invoiceModel : Model<Invoice>){
        super(invoiceModel);
    }

    async generatePdf(data: Invoice): Promise<Buffer> {
        const template = `
          <!DOCTYPE html>
          <html>
          <head>
              <title>Invoice</title>
          </head>
          <body>
              <h1>Invoice</h1>
              <ul>
                  ${Object.keys(data).map(key => `<li>${key}: ${data[key]}</li>`).join('')}
              </ul>
          </body>
          </html>
        `;
    
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
